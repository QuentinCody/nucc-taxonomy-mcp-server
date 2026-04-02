import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod/v3";
import { TAXONOMY_CODES } from "../lib/data/taxonomy-codes";

export function registerNuccSearch(server: McpServer): void {
    const schema = {
        query: z.string().describe(
            "Search term to match against classification, specialization, grouping, or definition. " +
            "Examples: 'cardiology', 'nurse practitioner', 'pharmacy', 'surgery'.",
        ),
        grouping: z
            .string()
            .optional()
            .describe(
                "Optional: filter results to a specific grouping. Examples: " +
                "'Allopathic & Osteopathic Physicians', 'Hospitals', 'Pharmacy Service Providers'.",
            ),
    };

    const handler = async (rawArgs: Record<string, unknown>) => {
        try {
            const query = String(rawArgs.query ?? "").toLowerCase().trim();
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

            const terms = query.split(/\s+/);

            let results = TAXONOMY_CODES.filter((tc) => {
                const searchable = `${tc.classification} ${tc.specialization} ${tc.grouping} ${tc.definition}`.toLowerCase();
                return terms.every((term) => searchable.includes(term));
            });

            if (groupingFilter) {
                results = results.filter(
                    (tc) => tc.grouping.toLowerCase().includes(groupingFilter),
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

            let text = `Found ${total} taxonomy code${total !== 1 ? "s" : ""} matching "${query}"`;
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

    const description =
        "Search NUCC Health Care Provider Taxonomy codes by keyword. " +
        "Searches across classification, specialization, grouping, and definition fields. " +
        "These are the taxonomy codes used in the NPI Registry to classify healthcare providers. " +
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
