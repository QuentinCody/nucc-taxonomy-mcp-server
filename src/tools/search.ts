import type { McpServer } from "@bio-mcp/shared/mcp";
import { z } from "zod";
import { TAXONOMY_CODES } from "../lib/data/taxonomy-codes";
import {checkDatasetExpectation, withDatasetProvenance} from "../lib/dataset";

export function registerNuccSearch(server: McpServer): void {
    const schema = {
        expected_version: z.string().min(1).max(40).optional().describe("Require a verified installed release; currently fails because the embedded release is unknown"),
        expected_content_sha256: z.string().regex(/^[a-f0-9]{64}$/).optional().describe("Pin the local content fingerprint; not an official CSV checksum"),
        query: z.string().min(1).max(200).describe(
            "Search term to match against classification, specialization, grouping, or definition. " +
            "Examples: 'cardiology', 'nurse practitioner', 'pharmacy', 'surgery'.",
        ),
        grouping: z
            .string().max(200)
            .optional()
            .describe(
                "Optional: filter results to a specific grouping. Examples: " +
                "'Allopathic & Osteopathic Physicians', 'Hospitals', 'Pharmacy Service Providers'.",
            ),
    };

    const coreHandler = async (rawArgs: Record<string, unknown>) => {
        try {
            await checkDatasetExpectation(rawArgs);
            if (typeof rawArgs.query !== "string" || rawArgs.query.length > 200 || (rawArgs.grouping !== undefined && (typeof rawArgs.grouping !== "string" || rawArgs.grouping.length > 200))) throw new Error("query/grouping must be strings of at most 200 characters");
            const query = rawArgs.query.toLowerCase().trim();
            const groupingFilter = rawArgs.grouping
                ? String(rawArgs.grouping).toLowerCase().trim()
                : undefined;

            if (!query) {
                return {
                    content: [{ type: "text" as const, text: "Error: query parameter is required." }],
                    isError: true,
                    structuredContent: {
                        success: false,
                        error: { code: "MISSING_QUERY", message: "query parameter is required" },
                    },
                };
            }

            return searchLocalTaxonomy(query, groupingFilter, rawArgs);
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : String(err);
            return {
                content: [{ type: "text" as const, text: `Error: ${message}` }],
                isError: true,
                structuredContent: {
                    success: false,
                    error: { code: "SEARCH_ERROR", message },
                },
            };
        }
    };

    const handler = async (args: Record<string, unknown>) => withDatasetProvenance("nucc_search", args, await coreHandler(args));

    const description =
        "Search NUCC Health Care Provider Taxonomy codes by keyword. " +
        "Searches across classification, specialization, grouping, and definition fields. " +
        "These are the taxonomy codes used in the NPI Registry to classify healthcare providers. " +
        "Searches the offline unversioned subset; use nucc_official_taxonomy for the complete currently advertised official CSV. " +
        "Returns matching codes with their hierarchy (grouping > classification > specialization). " +
        "Optionally filter by grouping (e.g., 'Hospitals', 'Allopathic & Osteopathic Physicians').";

    server.registerTool("nucc_search", {
        title: "Search NUCC Taxonomy Codes",
        description,
        inputSchema: schema,
    }, handler);

    server.registerTool("mcp_nucc_search", {
        title: "Search NUCC Taxonomy Codes",
        description,
        inputSchema: schema,
    }, handler);
}

function searchLocalTaxonomy(query: string, groupingFilter: string | undefined, rawArgs: Record<string, unknown>) {
  const terms = query.split(/\s+/);

  let results = TAXONOMY_CODES.filter((tc) => {
    const searchable = `${tc.classification} ${tc.specialization} ${tc.grouping} ${tc.definition}`.toLowerCase();
    return terms.every((term) => searchable.includes(term));
  });

  if (groupingFilter) {
    results = results.filter(
      (tc) => tc.grouping.toLowerCase().includes(groupingFilter)
    );
  }

  // Cap results to avoid oversized responses
  const MAX_RESULTS = 50;
  const total = results.length;
  const truncated = total > MAX_RESULTS;
  const displayed = results.slice(0, MAX_RESULTS);

  const lines = displayed.map((tc) => {
    const spec = tc.specialization ? ` > ${tc.specialization}` : "";
    return `${tc.code}  ${tc.classification}${spec} (${tc.grouping})`;
  });

  let text = `Found ${total} local-subset taxonomy code${total !== 1 ? "s" : ""} matching "${query}"`;
  if (groupingFilter) text += ` (grouping: "${rawArgs.grouping}")`;
  text += ":\n\n" + lines.join("\n");
  if (truncated) text += `\n\n(Showing first ${MAX_RESULTS} of ${total} results)`;

  // List unique groupings for discoverability
  const groupings = [...new Set(results.map((tc) => tc.grouping))].sort();

  return {
    content: [{ type: "text" as const, text }],
    structuredContent: {
      success: true,
      data: {
        total,
        total_scope: "matches_in_embedded_subset",
        truncated,
        groupings,
        results: displayed.map((tc) => ({
          code: tc.code,
          grouping: tc.grouping,
          classification: tc.classification,
          specialization: tc.specialization,
        })),
      },
      _meta: {},
    },
  };
}
