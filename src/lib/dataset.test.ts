import {afterEach, expect, it, vi} from "vitest";
import {hashCanonicalJson} from "@bio-mcp/provenance-core";
import {McpServer} from "@bio-mcp/shared/mcp";
import {installedDataset, LAST_OBSERVED_RELEASE, latestAdvertisedRelease, parseCurrentRelease, withDatasetProvenance} from "./dataset";
import {TAXONOMY_CODES} from "./data/taxonomy-codes";
import {registerNuccLookup} from "../tools/lookup";
import {registerNuccSearch} from "../tools/search";
import {registerDatasetInfo} from "../tools/dataset-info";
const html = '<a href="/images/stories/CSV/nucc_taxonomy_261.csv">Version 26.1 7/1/26</a><p>Previous versions:</p><a href="/images/stories/CSV/nucc_taxonomy_251.csv">Version 25.1 7/1/25</a>';
const server = new McpServer({name: "fixture", version: "1"});
registerNuccLookup(server); registerNuccSearch(server); registerDatasetInfo(server);
type Result = {content: Array<{type: string; text: string}>; isError?: boolean; structuredContent: Record<string, unknown>};
const tools = (server as unknown as {_registeredTools: Record<string, {handler: (args: Record<string, unknown>, extra: unknown) => Promise<Result>}>})._registeredTools;
const call = (name: string, args: Record<string, unknown>) => tools[name].handler(args, {});
afterEach(() => vi.unstubAllGlobals());
it("reports actual subset counts/hash without inventing a release or import date", async () => {
  expect(await installedDataset()).toMatchObject({record_count: TAXONOMY_CODES.length, unique_code_count: new Set(TAXONOMY_CODES.map(row => row.code)).size, version: null, effective_date: null, official_csv_sha256: null, content_sha256: await hashCanonicalJson(TAXONOMY_CODES), complete_official_codeset: false});
});
it("separates July publication from October effective-use policy and the contradictory FAQ", () => {
  expect(LAST_OBSERVED_RELEASE).toMatchObject({version: "26.1", publication_date: "2026-07-01", effective_date: "2026-10-01", csv_bytes_verified: false, revision_faq: {version: "26.0"}, announcements: {new_codes: false, modified_codes: false}});
});
it("parses current CSV metadata without accidentally selecting a previous release", () => {
  expect(parseCurrentRelease(html)).toMatchObject({version: "26.1", publication_date: "2026-07-01", effective_date: "2026-10-01", csv_bytes_verified: false});
});
it("supports January dates using the same provider publication policy", () => {
  expect(parseCurrentRelease('<a href="/images/stories/CSV/nucc_taxonomy_270.csv">Version 27.0, 1/1/2027</a>')).toMatchObject({publication_date: "2027-01-01", effective_date: "2027-04-01"});
});
it.each([
  "Previous versions:" + html,
  '<a href="https://evil.test/nucc_taxonomy_261.csv">Version 26.1 7/1/26</a>',
  '<a href="/images/stories/CSV/nucc_taxonomy_251.csv">Version 26.1 7/1/26</a>',
  '<a href="/images/stories/CSV/nucc_taxonomy_261.csv">Version 26.1 7/1/25</a>',
  '<a href="/images/stories/CSV/nucc_taxonomy_261.csv?x=1">Version 26.1 7/1/26</a>',
  '<a href="/images/stories/CSV/nucc_taxonomy_261.csv">Version 26.1 2/1/26</a>',
  html.split("<p>")[0].repeat(2),
])("refuses unsafe, ambiguous or inconsistent release listings", input => { expect(() => parseCurrentRelease(input)).toThrow(); });
it("checks the fixed listing without fetching CSV bytes", async () => {
  const fetcher = vi.fn().mockResolvedValue(new Response(html)); vi.stubGlobal("fetch", fetcher);
  expect(await latestAdvertisedRelease()).toMatchObject({version: "26.1", csv_bytes_verified: false, listing_sha256: await hashCanonicalJson(html)});
  expect(fetcher).toHaveBeenCalledTimes(1); expect(fetcher.mock.calls[0][1]).toMatchObject({redirect: "manual"});
});
it("bounds listing bytes", async () => {
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("x".repeat(512 * 1024 + 1))));
  await expect(latestAdvertisedRelease()).rejects.toThrow("512 KiB");
});
it.each(["lookup", "search", "dataset_info"])("registers both %s aliases", name => {
  expect(tools[`nucc_${name}`]).toBeDefined(); expect(tools[`mcp_nucc_${name}`]).toBeDefined();
});
it("does not label an embedded lookup as the newly advertised release", async () => {
  const result = await call("nucc_lookup", {code: "207RC0000X"});
  expect(result).toMatchObject({structuredContent: {success: true, data: {code: "207RC0000X"}, dataset: {version: null, version_verified: false}}});
  const {_meta, ...root} = result.structuredContent;
  expect(_meta).toMatchObject({citation: {result_hash: await hashCanonicalJson(root), result_scope: "structured_content:root_without_meta"}});
});
it("an absent code is not classified as officially invalid", async () => {
  expect(await call("mcp_nucc_lookup", {code: "999999999X"})).toMatchObject({isError: true, content: expect.any(Array), structuredContent: {success: false, not_found_scope: "embedded_subset", official_code_validity: "undetermined", dataset: {complete_official_codeset: false}, _meta: {citation: {result_hash: expect.any(String)}}}});
});
it.each(["nucc_lookup", "mcp_nucc_lookup", "nucc_search", "mcp_nucc_search"])("rejects an unverified expected version for %s", async name => {
  expect(await call(name, {code: "207RC0000X", query: "cardio", expected_version: "26.1"})).toMatchObject({isError: true, structuredContent: {success: false, dataset: {version: null}}});
});
it("supports pinning the actual local content fingerprint", async () => {
  const hash = (await installedDataset()).content_sha256;
  expect(await call("nucc_lookup", {code: "207RC0000X", expected_content_sha256: hash})).toMatchObject({structuredContent: {success: true}});
  expect(await call("nucc_lookup", {code: "207RC0000X", expected_content_sha256: "0".repeat(64)})).toMatchObject({isError: true});
});
it("does not treat zero subset search matches as complete official absence", async () => {
  expect(await call("nucc_search", {query: "no such synthetic provider"})).toMatchObject({structuredContent: {success: true, data: {total: 0, total_scope: "matches_in_embedded_subset"}, dataset: {complete_official_codeset: false}}});
});
it("offline metadata inspection makes no network request", async () => {
  const fetcher = vi.fn(); vi.stubGlobal("fetch", fetcher);
  expect(await call("nucc_dataset_info", {})).toMatchObject({structuredContent: {success: true, data: {installed_matches_upstream: "unknown", live_advertised: null, installed: {version: null}}}});
  expect(fetcher).not.toHaveBeenCalled();
});
it("a failed live check remains an error with installed and last-observed provenance", async () => {
  vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network")));
  expect(await call("mcp_nucc_dataset_info", {check_latest: true})).toMatchObject({isError: true, content: expect.any(Array), structuredContent: {success: false, dataset: {version: null}, last_observed_upstream: {observed_on: "2026-09-28"}, _meta: {citation: {result_hash: expect.any(String)}}}});
});
it.each([{code: "x".repeat(100000)}, {code: 123}])("bounds invalid lookup inputs before echoing them", async input => {
  const result = await call("nucc_lookup", input); expect(result.isError).toBe(true); expect(JSON.stringify(result).length).toBeLessThan(10000);
});
it("all embedded lookups fit below staging threshold with provenance", async () => {
  for (const code of TAXONOMY_CODES) {
    const result = await call("nucc_lookup", {code: code.code});
    expect(result.isError).not.toBe(true);
    expect(new TextEncoder().encode(JSON.stringify(result.structuredContent)).length).toBeLessThan(30 * 1024);
  }
});
it("broad searches and all grouping searches fit below staging threshold", async () => {
  for (const query of ["a", "provider", ...new Set(TAXONOMY_CODES.map(row => row.grouping))]) {
    const result = await call("nucc_search", {query});
    expect(result.isError).not.toBe(true);
    expect(new TextEncoder().encode(JSON.stringify(result.structuredContent)).length).toBeLessThan(30 * 1024);
  }
});
it("fails an oversized future result explicitly rather than returning dropped data", async () => {
  const result = await withDatasetProvenance("fixture", {}, {content: [{type: "text", text: "fixture"}], structuredContent: {success: true, data: "x".repeat(100000)}});
  expect(result).toMatchObject({isError: true, content: expect.any(Array), structuredContent: {success: false, error: {code: "RESULT_TOO_LARGE"}, _meta: {citation: {result_hash: expect.any(String)}}}});
  expect(JSON.stringify(result).length).toBeLessThan(30000);
});
