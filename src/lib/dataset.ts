import {hashCanonicalJson} from "@bio-mcp/provenance-core";
import {buildCitation} from "@bio-mcp/shared";
import {TAXONOMY_CODES} from "./data/taxonomy-codes";

export const CSV_LISTING = "https://www.nucc.org/index.php/code-sets-mainmenu-41/provider-taxonomy-mainmenu-40/csv-mainmenu-57";
export const PUBLICATION_POLICY = "https://www.nucc.org/index.php/code-sets-mainmenu-41/provider-taxonomy-mainmenu-40/more-information-mainmenu-55/102-when-is-the-code-list-published";
export const LAST_OBSERVED_RELEASE = {
  version: "26.1", publication_date: "2026-07-01", effective_date: "2026-10-01",
  effective_date_basis: "Derived from NUCC's July publication / October 1 effective-use policy; not an individual code activation date",
  csv_url: "https://www.nucc.org/images/stories/CSV/nucc_taxonomy_261.csv",
  source_url: CSV_LISTING, publication_policy_url: PUBLICATION_POLICY,
  observed_on: "2026-09-28", csv_bytes_verified: false,
  revision_faq: {version: "26.0", publication: "January 2026", source_url: "https://www.nucc.org/index.php/code-sets-mainmenu-41/provider-taxonomy-mainmenu-40/more-information-mainmenu-55/103-when-was-the-last-revision"},
  announcements: {new_codes: false, modified_codes: false, date: "2026-07-01", sources: ["https://www.nucc.org/index.php/code-sets-mainmenu-41/provider-taxonomy-mainmenu-40/new-codes-mainmenu-79", "https://www.nucc.org/index.php/code-sets-mainmenu-41/provider-taxonomy-mainmenu-40/modifications-mainmenu-80"]},
};
let fingerprint: Promise<string> | undefined;
export async function installedDataset() {
  fingerprint ??= hashCanonicalJson(TAXONOMY_CODES);
  return {
    coverage: "curated_subset", record_count: TAXONOMY_CODES.length, unique_code_count: new Set(TAXONOMY_CODES.map(row => row.code)).size,
    version: null, publication_date: null, effective_date: null, official_csv_sha256: null,
    content_sha256: await fingerprint, hash_scope: "Canonical JSON of the embedded rows, not an official CSV checksum",
    version_verified: false, complete_official_codeset: false,
    missing_code_meaning: "Not present in this subset; official code validity is undetermined",
    definition_scope: "Local abbreviated descriptions, not verified verbatim official definitions",
    source_url: "https://taxonomy.nucc.org/", license: "AMA copyright; see NUCC use/distribution terms",
  };
}
export async function checkDatasetExpectation(args: Record<string, unknown>) {
  if (args.expected_version !== undefined) throw new Error("Installed NUCC release is unknown; cannot satisfy expected_version");
  if (args.expected_content_sha256 !== undefined && args.expected_content_sha256 !== (await installedDataset()).content_sha256) throw new Error("Embedded NUCC content fingerprint does not match expected_content_sha256");
}
type ToolResult = {content: Array<{type: "text"; text: string}>; structuredContent: Record<string, unknown>; isError?: boolean};
export async function withDatasetProvenance(tool: string, query: Record<string, unknown>, result: ToolResult): Promise<ToolResult> {
  const { _meta: _oldMeta, ...root } = result.structuredContent;
  const structuredContent = {...root, dataset: await installedDataset()};
  const citation = await buildCitation({source: {id: "nucc-taxonomy", name: "NUCC taxonomy — local curated subset, release unverified", url: "https://taxonomy.nucc.org/", license: "AMA copyright; NUCC use/distribution terms"}, server: "nucc-taxonomy", tool, query, queryScope: "tool_arguments", result: structuredContent, resultScope: "structured_content:root_without_meta", retrievedAt: new Date().toISOString()});
  const final = {...structuredContent, _meta: {citation}};
  // Static subset responses are bounded by inputs and a 50-row projection, not full definitions.
  // Fail before transport if a future dataset expansion breaks that bound; do not silently omit data.
  if (new TextEncoder().encode(JSON.stringify(final)).length > 30 * 1024) return withDatasetProvenance(tool, query, {
    content: [{type: "text", text: "Result exceeds the inline limit; narrow the search."}], isError: true,
    structuredContent: {success: false, error: {code: "RESULT_TOO_LARGE", message: "Narrow the search"}},
  });
  return {...result, structuredContent: final};
}

export function parseCurrentRelease(html: string) {
  // Do not select a prior release simply because it happens to be the first matched URL.
  const section = html.split(/Previous versions\s*:/i)[0];
  const releases = [];
  for (const match of section.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)) {
    const label = match[2].replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ");
    const version = /Version\s+(\d{2})\.(\d)\s*,?\s*([17])\/1\/(\d{2}|\d{4})\b/i.exec(label);
    if (!version) continue;
    let url: URL; try { url = new URL(match[1], CSV_LISTING); } catch { continue; }
    if (url.origin !== "https://www.nucc.org" || url.search || url.hash || url.username || url.password || url.pathname !== `/images/stories/CSV/nucc_taxonomy_${version[1]}${version[2]}.csv`) continue;
    const year = version[4].length === 2 ? `20${version[4]}` : version[4];
    if (year.slice(-2) !== version[1]) continue;
    releases.push({version: `${version[1]}.${version[2]}`, publication_date: `${year}-${version[3] === "7" ? "07" : "01"}-01`, effective_date: `${year}-${version[3] === "7" ? "10" : "04"}-01`, effective_date_basis: "Derived from NUCC publication-cycle policy", publication_policy_url: PUBLICATION_POLICY, csv_url: url.href, csv_bytes_verified: false});
  }
  if (releases.length !== 1) throw new Error("NUCC current-release listing is missing or ambiguous");
  return releases[0];
}
export async function latestAdvertisedRelease() {
  let response: Response;
  try { response = await fetch(CSV_LISTING, {headers: {Accept: "text/html"}, redirect: "manual", signal: AbortSignal.timeout(20_000)}); }
  catch { throw new Error("NUCC release listing unavailable or timed out"); }
  if (!response.ok) { await response.body?.cancel().catch(() => {}); throw new Error(`NUCC listing HTTP ${response.status}`); }
  const reader = response.body?.getReader(); if (!reader) throw new Error("NUCC listing is empty");
  let html = ""; let bytes = 0; const decoder = new TextDecoder("utf-8", {fatal: true});
  try { while (true) { const part = await reader.read(); if (part.done) break; bytes += part.value.byteLength; if (bytes > 512 * 1024) throw new Error("NUCC listing exceeds 512 KiB"); html += decoder.decode(part.value, {stream: true}); } html += decoder.decode(); }
  finally { await reader.cancel().catch(() => {}); reader.releaseLock(); }
  return {...parseCurrentRelease(html), source_url: CSV_LISTING, retrieved_at: new Date().toISOString(), listing_sha256: await hashCanonicalJson(html), hash_scope: "Canonical JSON string of listing HTML, not CSV bytes"};
}
