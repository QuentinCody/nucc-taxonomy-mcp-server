import {hashCanonicalJson} from "@bio-mcp/provenance-core";
import {CSV_LISTING, parseCurrentRelease} from "./dataset";
import {TAXONOMY_CODES} from "./data/taxonomy-codes";
import {parseOfficialCsv} from "./official-csv";

async function readBytes(url: string, accept: string, cap: number, signal: AbortSignal) {
  const response = await fetch(url, {headers: {Accept: accept}, redirect: "manual", signal});
  if (!response.ok) { await response.body?.cancel(); throw new Error(`NUCC source HTTP ${response.status}`); }
  const reader = response.body?.getReader();
  if (!reader) throw new Error("NUCC source has no body");
  const chunks: Uint8Array[] = [];
  let count = 0;
  try {
    while (true) {
      const next = await reader.read();
      if (next.done) break;
      count += next.value.byteLength;
      if (count > cap) throw new Error(`NUCC source exceeds ${cap} bytes`);
      chunks.push(next.value);
    }
  } finally { await reader.cancel().catch(() => {}); reader.releaseLock(); }
  const bytes = new Uint8Array(count);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  return {bytes, headers: {etag: response.headers.get("etag"), last_modified: response.headers.get("last-modified")}};
}

async function sha256(bytes: Uint8Array) {
  return Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", bytes)), byte => byte.toString(16).padStart(2, "0")).join("");
}

export function compareEmbedded(rows: Record<string, string>[]) {
  const official = new Map(rows.map(row => [row.Code, row]));
  const embedded = new Set(TAXONOMY_CODES.map(row => row.code));
  let matchingHierarchy = 0;
  let shared = 0;
  for (const row of TAXONOMY_CODES) {
    const match = official.get(row.code);
    if (!match) continue;
    shared++;
    if (match.Grouping === row.grouping && match.Classification === row.classification && match.Specialization === row.specialization) matchingHierarchy++;
  }
  return {embedded_records: TAXONOMY_CODES.length, shared_codes: shared, only_embedded: TAXONOMY_CODES.length - shared, only_official: rows.filter(row => !embedded.has(row.Code)).length, identical_hierarchy: matchingHierarchy, different_hierarchy: shared - matchingHierarchy, interpretation: "Exact code/string comparison only; differences do not establish historical validity or a provider's credentials. Embedded definitions remain abbreviated and unversioned."};
}

export async function readOfficialRelease(expectedVersion?: string, expectedSha256?: string) {
  // Both requests, including their bodies, share one deadline. No retries or redirects.
  const signal = AbortSignal.timeout(25_000);
  const listing = await readBytes(CSV_LISTING, "text/html", 512 * 1024, signal);
  const release = parseCurrentRelease(new TextDecoder("utf-8", {fatal: true}).decode(listing.bytes));
  if (expectedVersion !== undefined && release.version !== expectedVersion) throw new Error("Advertised NUCC release does not match expected_version");
  const csv = await readBytes(release.csv_url, "text/csv", 2 * 1024 * 1024, signal);
  const csvSha256 = await sha256(csv.bytes);
  if (expectedSha256 !== undefined && expectedSha256 !== csvSha256) throw new Error("NUCC CSV bytes do not match expected_csv_sha256");
  const rows = parseOfficialCsv(new TextDecoder("utf-8", {fatal: true}).decode(csv.bytes));
  const dataset = {
    ...release, coverage: "complete_downloaded_csv", csv_bytes_verified: true,
    official_csv_sha256: csvSha256, hash_scope: "SHA-256 of all downloaded CSV bytes; locally computed, not a provider checksum or signature",
    csv_byte_count: csv.bytes.byteLength, record_count: rows.length, columns: Object.keys(rows[0]),
    source_url: release.csv_url, listing_url: CSV_LISTING, listing_sha256: await sha256(listing.bytes),
    content_sha256: await hashCanonicalJson(rows), content_hash_scope: "Canonical JSON of all parsed native records in file order",
    retrieved_at: new Date().toISOString(), response_headers: csv.headers,
    release_basis: "Version/date advertised by the current NUCC listing; file contents do not independently attest the release label",
    license: "Copyright American Medical Association; NUCC requires a license for commercial use including sales or licensing",
    interpretation: "Release effective-use dates are not individual code activation dates; taxonomy membership does not validate professional credentials or eligibility on a service date",
  };
  return {rows, dataset};
}
