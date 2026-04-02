import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod/v3";
import { TAXONOMY_CODES } from "../lib/data/taxonomy-codes";

/** Build a lookup map once for O(1) access */
const CODE_MAP = new Map(TAXONOMY_CODES.map((tc) => [tc.code.toUpperCase(), tc]));

export function registerNuccLookup(server: McpServer): void {
    const schema = {
        code: z.string().describe(
            "The 10-character NUCC taxonomy code to look up. " +
            "Examples: '207RC0000X' (Cardiovascular Disease), '363L00000X' (Nurse Practitioner), " +
            "'282N00000X' (General Acute Care Hospital).",
        ),
    };

    const handler = async (rawArgs: Record<string, unknown>) => {
        try {
            const code = String(rawArgs.code ?? "").toUpperCase().trim();

            if (!code) {
                return {
                    content: [{ type: "text" as const, text: "Error: code parameter is required." }],
                    isError: true,
                    structuredContent: {
                        success: false,
                        error: { code: "MISSING_CODE", message: "code parameter is required" },
                    },
                };
            }

            const tc = CODE_MAP.get(code);

            if (!tc) {
                // Try partial match to suggest alternatives
                const partial = TAXONOMY_CODES.filter(
                    (t) => t.code.startsWith(code.slice(0, 4)),
                ).slice(0, 5);

                const suggestions = partial.length > 0
                    ? `\n\nSimilar codes:\n${partial.map((t) => `  ${t.code} — ${t.classification}${t.specialization ? ` > ${t.specialization}` : ""}`).join("\n")}`
                    : "";

                const msg = `Taxonomy code "${code}" not found in the embedded dataset.${suggestions}\n\nTip: Use nucc_search to find codes by keyword.`;
                return {
                    content: [{ type: "text" as const, text: msg }],
                    isError: true,
                    structuredContent: {
                        success: false,
                        error: { code: "NOT_FOUND", message: msg },
                        suggestions: partial.map((t) => ({
                            code: t.code,
                            classification: t.classification,
                            specialization: t.specialization,
                        })),
                    },
                };
            }

            const spec = tc.specialization ? `\nSpecialization: ${tc.specialization}` : "";
            const text =
                `NUCC Taxonomy Code: ${tc.code}\n` +
                `Grouping: ${tc.grouping}\n` +
                `Classification: ${tc.classification}` +
                spec +
                `\n\nDefinition: ${tc.definition}`;

            return {
                content: [{ type: "text" as const, text }],
                structuredContent: {
                    success: true,
                    data: {
                        code: tc.code,
                        grouping: tc.grouping,
                        classification: tc.classification,
                        specialization: tc.specialization,
                        definition: tc.definition,
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
                    error: { code: "LOOKUP_ERROR", message },
                },
            };
        }
    };

    const description =
        "Look up a specific NUCC Health Care Provider Taxonomy code. " +
        "Returns the full details: grouping (Level 1), classification (Level 2), " +
        "specialization (Level 3), and definition. " +
        "These are the taxonomy codes used in the NPI Registry. " +
        "If the code is not found, suggestions for similar codes are provided.";

    server.registerTool("nucc_lookup", {
        title: "Look Up NUCC Taxonomy Code",
        description,
        inputSchema: schema,
    }, handler);

    server.registerTool("mcp_nucc_lookup", {
        title: "Look Up NUCC Taxonomy Code",
        description,
        inputSchema: schema,
    }, handler);
}
