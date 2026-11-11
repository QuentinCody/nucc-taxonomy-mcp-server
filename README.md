# Nucc Taxonomy MCP Server

This is a [Model Context Protocol](https://modelcontextprotocol.io) (MCP) server. It supports an offline curated NUCC taxonomy subset and explicit queries against the complete currently advertised official CSV. It does not assume a public NUCC taxonomy query API. It belongs to the [Bio MCP](../../README.md) monorepo.

## Connect

The server is deployed and ready at:

```
https://nucc-taxonomy-mcp-server.quentincody.workers.dev/mcp
```

Add it to your MCP client (Claude Desktop → Settings → Developer → Edit Config):

```json
{
  "mcpServers": {
    "nucc-taxonomy": {
      "command": "npx",
      "args": ["mcp-remote", "https://nucc-taxonomy-mcp-server.quentincody.workers.dev/mcp"]
    }
  }
}
```

For local development the server runs at `http://localhost:8876/mcp` (start it with `./scripts/dev-servers.sh nucc-taxonomy`):

```json
{
  "mcpServers": {
    "nucc-taxonomy-local": {
      "command": "npx",
      "args": ["mcp-remote", "http://localhost:8876/mcp"]
    }
  }
}
```

## Tools

- `nucc_lookup`
- `nucc_search`
- `nucc_dataset_info` — inspect installed coverage/fingerprint and dated official release observations; optionally refresh the official CSV listing
- `nucc_official_taxonomy` — read the official current CSV for metadata/comparison, exact lookup or paginated search

Every tool returns both a human-readable `content` summary and a structured `structuredContent` payload.

## Development

```bash
./scripts/dev-servers.sh nucc-taxonomy            # run locally (port 8876)
pnpm --filter nucc-taxonomy-mcp-server run deploy   # deploy to Cloudflare Workers
```

See [`docs/adding-mcp-servers.md`](../../docs/adding-mcp-servers.md) and the root [README](../../README.md) for the full architecture (Code Mode, staging, portals).

---

*Auto-generated baseline README — refine with server-specific detail as needed.*

## Installed data and release provenance

The installed file is a curated subset with abbreviated descriptions, not a verified
import of an official release. Its release version, publication date, effective date
and official CSV checksum are **unknown**. `nucc_dataset_info` derives the row count
and SHA-256 of canonical local rows; the same dataset context accompanies search,
lookup and error results. Every result includes a citation/result hash. Both normal
and `mcp_` aliases are registered for all four tools. Official CSV results carry their
own release and file provenance; the offline tools keep the installed-subset context.

The [official CSV listing](https://www.nucc.org/index.php/code-sets-mainmenu-41/provider-taxonomy-mainmenu-40/csv-mainmenu-57)
observed September 28, 2026 advertises **26.1**, published July 1, 2026. Its October 1,
2026 effective-use date is derived from NUCC's [publication policy](https://www.nucc.org/index.php/code-sets-mainmenu-41/provider-taxonomy-mainmenu-40/more-information-mainmenu-55/102-when-is-the-code-list-published),
not an individual code's activation date. This is not proof the local subset matches
26.1. The [revision FAQ](https://www.nucc.org/index.php/code-sets-mainmenu-41/provider-taxonomy-mainmenu-40/more-information-mainmenu-55/103-when-was-the-last-revision)
still reports 26.0 / January 2026; that discrepancy is retained separately. NUCC's
July new-code and modification pages report no changes.

`nucc_dataset_info({check_latest:true})` rereads only the official CSV listing, with a
20-second timeout and 512 KiB ceiling. It does not fetch/import the CSV. A failed live
check returns an error while retaining explicitly dated observations; it never calls
cached metadata current. Default inspection is offline.

Lookups missing from this subset report official validity as undetermined. Search
counts concern only the subset; an empty result is not evidence a code is invalid.
`expected_version` fails because the installed release cannot be verified;
`expected_content_sha256` can pin the actual local data instead. Neither taxonomy
classification nor a match validates a provider's professional credentials.

Search projects at most 50 rows with bounded query/grouping strings. All embedded
lookups and broad/grouping searches are tested below 30 KiB with provenance. A future
oversized result fails explicitly rather than silently dropping data. These small
static tools do not provision a staging Durable Object.

## Official release queries

`nucc_official_taxonomy` reads the current listing and its advertised CSV on each call.
It validates the complete file in memory without replacing the installed subset or
persisting a copy. Both requests share a 25-second deadline, with 512 KiB listing and
2 MiB CSV limits, no redirects/retries and no fallback to the subset. Parsing preserves
all native columns, whitespace, quoted newlines and empty strings. Malformed rows,
duplicate codes, unsupported headers and exceeded bounds fail explicitly.

```javascript
// Observe release/checksum, full-file count and exact-code/hierarchy subset comparison.
nucc_official_taxonomy({operation: "metadata"})
// Exact native record, including Definition, Notes, Display Name and Section.
nucc_official_taxonomy({operation: "lookup", code: "106S00000X"})
// Search every native field; omit query/grouping to browse the entire file.
nucc_official_taxonomy({operation: "search", query: "behavior", grouping: "Behavioral", limit: 20})
```

Use `data.next_offset` for continuation and repeat the original filters. Every nonzero
offset requires `expected_version` and `expected_csv_sha256` from the preceding page.
The file must still have those exact bytes; release/file drift returns an error. Each
page preserves complete rows, stopping at 50 rows or 20 KiB of row JSON. Response
metadata/citations remain below 30 KiB, so these bounded pages do not need a staging DO.
Absence means absent from the downloaded file; historical code validity and provider
credentials remain unassessed. The checksum is locally computed over all source bytes,
not a provider signature. Commercial use, including sales or licensing, requires a
license under the [NUCC/AMA terms on the CSV listing](https://www.nucc.org/index.php/code-sets-mainmenu-41/provider-taxonomy-mainmenu-40/csv-mainmenu-57).

October 3, 2026 acceptance observed release **26.1**, **883 unique records**, eight
columns and **529,245 bytes**; SHA-256:
`0615cce1dac2fae75e8a0497657fd3ad81f9505c829fb6129a6551583f4fe0fb`.
Comparison finds 447 shared codes, 436 official-only codes, four subset-only codes
and 45 differing hierarchy strings among shared codes. It does not establish why
those differences exist or historical invalidity. Independent Python CSV parsing
agrees with all 7,064 native cells, and a bundled local Worker recovers all rows
through MCP pagination. Local Workerd required the installed Node public CA roots
in its test configuration to trust this provider's TLS chain; verification remained
enabled. Default Wrangler's upstream path still fails that trust check. Production
deployment and production TLS acceptance remain separate from these local checks.

<!-- license-and-data-terms:start -->
## License and data terms

The code in this repository is licensed under the Apache License 2.0 (see `LICENSE`).
If you use it in your work, please cite it (see `CITATION.cff`). Citation is requested, not required.

The license covers the code only. Data that this server returns comes from NUCC Provider Taxonomy and stays under the terms of that source: AMA copyright; commercial use needs a license (no fee).
You are responsible for your use of the data under those terms.
<!-- license-and-data-terms:end -->
