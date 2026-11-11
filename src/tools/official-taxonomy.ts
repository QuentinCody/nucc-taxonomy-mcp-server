import {buildCitation} from "@bio-mcp/shared";
import type {McpServer} from "@bio-mcp/shared/mcp";
import {z} from "zod";
import {CSV_LISTING, installedDataset} from "../lib/dataset";
import {compareEmbedded, readOfficialRelease} from "../lib/official-release";

const schema = z.object({
  operation: z.enum(["metadata", "lookup", "search"]),
  code: z.string().regex(/^[0-9A-Za-z]{9}[xX]$/).optional(),
  query: z.string().trim().min(1).max(200).optional(),
  grouping: z.string().trim().min(1).max(200).optional(),
  offset: z.number().int().min(0).max(10_000).optional(),
  limit: z.number().int().min(1).max(50).optional(),
  expected_version: z.string().regex(/^\d{2}\.\d$/).optional(),
  expected_csv_sha256: z.string().regex(/^[a-f0-9]{64}$/).optional(),
}).strict();

function validate(raw: Record<string, unknown>) {
  const parsed = schema.safeParse(raw);
  if (!parsed.success) throw new Error("Invalid official-taxonomy arguments; use the published tool schema");
  const args = parsed.data;
  if ((args.operation === "lookup") !== (args.code !== undefined) || (args.operation !== "search" && [args.query, args.grouping, args.offset, args.limit].some(value => value !== undefined))) throw new Error("code is required only for lookup; query/grouping/paging are search-only");
  if ((args.offset ?? 0) > 0 && (!args.expected_csv_sha256 || !args.expected_version)) throw new Error("Continuation requires expected_version and expected_csv_sha256 from the first page");
  return args;
}

function page(rows: Record<string, string>[], args: z.infer<typeof schema>) {
  const terms = (args.query ?? "").toLowerCase().split(/\s+/).filter(Boolean);
  const matches = rows.filter(row => terms.every(term => Object.values(row).some(value => value.toLowerCase().includes(term))) && (!args.grouping || row.Grouping.toLowerCase().includes(args.grouping.toLowerCase())));
  const offset = args.offset ?? 0;
  if (offset > matches.length) throw new Error("offset exceeds matching record count");
  const records: Record<string, string>[] = [];
  let bytes = 2;
  for (const row of matches.slice(offset, offset + (args.limit ?? 20))) {
    const size = new TextEncoder().encode(JSON.stringify(row)).length + 1;
    if (bytes + size > 20 * 1024) break;
    records.push(row); bytes += size;
  }
  const next = offset + records.length;
  return {records, total: matches.length, total_scope: "matching_records_in_complete_downloaded_csv", offset, returned: records.length, next_offset: next < matches.length ? next : null, complete: next === matches.length};
}

async function response(query: Record<string, unknown>, root: Record<string, unknown>, sourceUrl: string, failed = false) {
  const citation = await buildCitation({source: {id: "nucc-taxonomy", name: "NUCC official CSV", url: sourceUrl, license: "AMA copyright; NUCC use/distribution terms"}, server: "nucc-taxonomy", tool: "nucc_official_taxonomy", query, queryScope: "tool_arguments", result: root, resultScope: "structured_content:root_without_meta", retrievedAt: new Date().toISOString()});
  const structuredContent = {...root, _meta: {citation}};
  if (new TextEncoder().encode(JSON.stringify(structuredContent)).length > 30 * 1024) throw new Error("NUCC result exceeds inline response budget");
  return {content: [{type: "text" as const, text: failed ? "Official NUCC CSV query failed; no local-subset fallback was used." : "Official NUCC CSV query complete. Native records, release evidence and continuation are in structuredContent."}], structuredContent, ...(failed ? {isError: true} : {})};
}

export function registerOfficialTaxonomy(server: McpServer) {
  const handler = async (raw: Record<string, unknown>) => {
    try {
      const args = validate(raw);
      const {rows, dataset} = await readOfficialRelease(args.expected_version, args.expected_csv_sha256);
      let data: Record<string, unknown>;
      if (args.operation === "metadata") data = {embedded_dataset: await installedDataset(), subset_comparison: compareEmbedded(rows)};
      else if (args.operation === "lookup") {
        const record = rows.find(row => row.Code === args.code?.toUpperCase());
        data = {records: record ? [record] : [], found: !!record, absence_scope: "downloaded_csv_only", historical_validity: "unassessed"};
      } else data = page(rows, args);
      return await response(raw, {success: true, operation: args.operation, dataset, data}, dataset.source_url);
    } catch (error) {
      return response(raw, {success: false, error: {code: "OFFICIAL_CSV_ERROR", message: error instanceof Error ? error.message : "NUCC CSV query failed"}}, CSV_LISTING, true);
    }
  };
  for (const name of ["nucc_official_taxonomy", "mcp_nucc_official_taxonomy"]) server.registerTool(name, {
    title: "Query official NUCC taxonomy CSV",
    description: "Read the complete currently advertised official NUCC CSV for release metadata/subset comparison, exact code lookup, or paged keyword search. Preserves all native fields. Empty search filters browse every row. Searches cap at 50 rows/20 KiB; use next_offset plus expected_version/expected_csv_sha256 and repeat filters for continuation. Two bounded public reads per call; no persisted import or subset fallback. Membership is not service-date validity or professional credential verification. Commercial use requires the NUCC/AMA license.",
    inputSchema: schema.shape,
  }, handler);
}
