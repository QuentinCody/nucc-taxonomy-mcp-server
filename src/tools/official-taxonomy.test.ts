import {createHash} from "node:crypto";
import {afterEach, expect, it, vi} from "vitest";
import {hashCanonicalJson} from "@bio-mcp/provenance-core";
import {McpServer} from "@bio-mcp/shared/mcp";
import {registerOfficialTaxonomy} from "./official-taxonomy";

const listing = '<a href="/images/stories/CSV/nucc_taxonomy_261.csv">Version 26.1 7/1/26</a><p>Previous versions:</p>';
const header = "Code,Grouping,Classification,Specialization,Definition,Notes,Display Name,Section\r\n";
const row = (code: string, definition = "Native definition") => `${code},Group,Class,,${definition}, Native notes ,Name,Individual\r\n`;
const csv = header + row("101Y00000X") + row("193200000X", "Definition 2");
const digest = (text: string) => createHash("sha256").update(text).digest("hex");
const server = new McpServer({name: "test", version: "1"});
registerOfficialTaxonomy(server);
type Result = {content: unknown[]; structuredContent: Record<string, any>; isError?: boolean};
const registered = (server as unknown as {_registeredTools: Record<string, {handler: (args: Record<string, unknown>, extra: unknown) => Promise<Result>}>})._registeredTools;
const call = (args: Record<string, unknown>, name = "nucc_official_taxonomy") => registered[name].handler(args, {});
function source(text = csv) {
  const fetcher = vi.fn().mockImplementation(async (url: string) => new Response(url.endsWith(".csv") ? text : listing));
  vi.stubGlobal("fetch", fetcher);
  return fetcher;
}
afterEach(() => vi.unstubAllGlobals());

it.each(["nucc_official_taxonomy", "mcp_nucc_official_taxonomy"])("preserves complete native fields and verifiable source/result hashes through %s", async name => {
  const fetcher = source();
  const result = await call({operation: "lookup", code: "101y00000x"}, name);
  expect(result).toMatchObject({content: expect.any(Array), structuredContent: {success: true, dataset: {version: "26.1", official_csv_sha256: digest(csv), csv_byte_count: Buffer.byteLength(csv), record_count: 2, effective_date: "2026-10-01"}, data: {found: true, records: [{Code: "101Y00000X", Notes: " Native notes ", Specialization: ""}]}}});
  const {_meta, ...root} = result.structuredContent;
  expect(_meta.citation.result_hash).toBe(await hashCanonicalJson(root));
  expect(_meta.citation.source.url).toBe("https://www.nucc.org/images/stories/CSV/nucc_taxonomy_261.csv");
  expect(fetcher).toHaveBeenCalledTimes(2);
  expect(fetcher.mock.calls[0][1]).toMatchObject({redirect: "manual"});
  expect(fetcher.mock.calls[0][1].signal).toBe(fetcher.mock.calls[1][1].signal);
});
it("pins continuation bytes and preserves row order without duplicating or losing records", async () => {
  source();
  const first = await call({operation: "search", limit: 1});
  expect(first.structuredContent.data).toMatchObject({total: 2, returned: 1, next_offset: 1, complete: false, records: [{Code: "101Y00000X"}]});
  const second = await call({operation: "search", offset: 1, limit: 1, expected_version: "26.1", expected_csv_sha256: first.structuredContent.dataset.official_csv_sha256});
  expect(second.structuredContent.data).toMatchObject({total: 2, returned: 1, next_offset: null, complete: true, records: [{Code: "193200000X"}]});
});
it("searches native fields with grouping filters and explicit complete-file match counts", async () => {
  source();
  expect((await call({operation: "search", query: "definition 2", grouping: "group"})).structuredContent.data).toMatchObject({total: 1, records: [{Code: "193200000X"}]});
  expect((await call({operation: "search", query: "absent"})).structuredContent.data).toMatchObject({total: 0, records: [], next_offset: null});
  expect((await call({operation: "lookup", code: "999999999X"})).structuredContent.data).toMatchObject({found: false, records: [], absence_scope: "downloaded_csv_only", historical_validity: "unassessed"});
});
it("reports subset comparison without relabeling the embedded release", async () => {
  source();
  const result = await call({operation: "metadata"});
  expect(result.structuredContent.data.subset_comparison).toMatchObject({embedded_records: 451, shared_codes: 2, only_embedded: 449, only_official: 0, identical_hierarchy: 0, different_hierarchy: 2});
});
it.each([
  {operation: "search", offset: 1}, {operation: "lookup"}, {operation: "metadata", code: "101Y00000X"},
  {operation: "lookup", code: "101Y00000X", query: "test"}, {operation: "search", limit: 51},
  {operation: "search", offset: -1}, {operation: "search", expected_csv_sha256: "bad"}, {operation: "metadata", url: "https://example.org"},
])("rejects invalid/ambiguous requests before upstream access", async args => {
  const fetcher = source();
  expect(await call(args)).toMatchObject({content: expect.any(Array), isError: true, structuredContent: {success: false, error: {code: "OFFICIAL_CSV_ERROR"}}});
  expect(fetcher).not.toHaveBeenCalled();
});
it("rejects version drift before fetching the CSV and checksum drift before returning rows", async () => {
  const fetcher = source();
  expect((await call({operation: "metadata", expected_version: "25.1"})).structuredContent.error.message).toContain("expected_version");
  expect(fetcher).toHaveBeenCalledTimes(1);
  expect((await call({operation: "search", expected_csv_sha256: "0".repeat(64)})).structuredContent.error.message).toContain("expected_csv_sha256");
});
it("bounds full Unicode pages and returns every remaining row through pinned continuation", async () => {
  const text = header + Array.from({length: 50}, (_, i) => row(`${String(i).padStart(9, "0")}X`, "🧬".repeat(700))).join("");
  source(text);
  const recovered: string[] = [];
  let offset = 0;
  do {
    const result = await call({operation: "search", offset, limit: 50, expected_version: "26.1", expected_csv_sha256: digest(text)});
    expect(result.isError).not.toBe(true);
    expect(Buffer.byteLength(JSON.stringify(result))).toBeLessThan(30 * 1024);
    recovered.push(...result.structuredContent.data.records.map((record: Record<string, string>) => record.Code));
    offset = result.structuredContent.data.next_offset;
  } while (offset !== null);
  expect(recovered).toEqual(Array.from({length: 50}, (_, i) => `${String(i).padStart(9, "0")}X`));
});
it.each([302, 403, 429, 500])("retains HTTP %s as failure without retry/fallback", async status => {
  const fetcher = vi.fn().mockResolvedValue(new Response("failure", {status})); vi.stubGlobal("fetch", fetcher);
  const result = await call({operation: "metadata"});
  expect(result).toMatchObject({isError: true, structuredContent: {success: false, error: {message: `NUCC source HTTP ${status}`}}});
  expect(fetcher).toHaveBeenCalledTimes(1);
});
it.each(["oversize", "utf8", "malformed", "empty"])("fails a %s CSV without partial data", async kind => {
  vi.stubGlobal("fetch", vi.fn().mockImplementation(async (url: string) => {
    if (!url.endsWith(".csv")) return new Response(listing);
    if (kind === "utf8") return new Response(new Uint8Array([255]));
    return new Response(kind === "oversize" ? "x".repeat(2 * 1024 * 1024 + 1) : kind === "malformed" ? `${csv}broken` : "");
  }));
  const result = await call({operation: "search"});
  expect(result).toMatchObject({isError: true, content: expect.any(Array), structuredContent: {success: false}});
  expect(result.structuredContent.data).toBeUndefined();
  expect(Buffer.byteLength(JSON.stringify(result))).toBeLessThan(30 * 1024);
});
