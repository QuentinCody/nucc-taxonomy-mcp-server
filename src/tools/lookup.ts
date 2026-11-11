import type { McpServer } from "@bio-mcp/shared/mcp";
import { z } from "zod";
import { TAXONOMY_CODES } from "../lib/data/taxonomy-codes";
import {checkDatasetExpectation, withDatasetProvenance} from "../lib/dataset";

/** Build a lookup map once for O(1) access */
const CODE_MAP = new Map(TAXONOMY_CODES.map((tc) => [tc.code.toUpperCase(), tc]));

export function registerNuccLookup(server: McpServer): void {
    const schema = {
        expected_version: z.string().min(1).max(40).optional().describe("Require a verified installed release; currently fails because the embedded release is unknown"),
        expected_content_sha256: z.string().regex(/^[a-f0-9]{64}$/).optional().describe("Pin the local content fingerprint; not an official CSV checksum"),
        code: z.string().min(1).max(10).describe(
            "The 10-character NUCC taxonomy code to look up. " +
            "Examples: '207RC0000X' (Cardiovascular Disease), '363L00000X' (Nurse Practitioner), " +
            "'282N00000X' (General Acute Care Hospital).",
        ),
    };

    const coreHandler = async (rawArgs: Record<string, unknown>) => {
        try {
            await checkDatasetExpectation(rawArgs);
            if (typeof rawArgs.code !== "string" || rawArgs.code.length > 10) throw new Error("code must be a string of at most 10 characters");
            const code = rawArgs.code.toUpperCase().trim();

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
                return missingTaxonomyCode(code);
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

    const handler = async (args: Record<string, unknown>) => withDatasetProvenance("nucc_lookup", args, await coreHandler(args));

    const description =
        "Look up a specific NUCC Health Care Provider Taxonomy code. " +
        "Returns the full details: grouping (Level 1), classification (Level 2), " +
        "specialization (Level 3), and definition. " +
        "Searches an unversioned curated subset, not the complete official release. These are taxonomy codes used in the NPI Registry. " +
        "Use nucc_official_taxonomy for a native lookup in the complete currently advertised official CSV. " +
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

function missingTaxonomyCode(code: string) {
  const partial = TAXONOMY_CODES.filter(
    (t) => t.code.startsWith(code.slice(0, 4))
  ).slice(0, 5);

  const suggestions = partial.length > 0
    ? `\n\nSimilar codes:\n${partial.map((t) => `  ${t.code} — ${t.classification}${t.specialization ? ` > ${t.specialization}` : ""}`).join("\n")}`
    : "";

  const msg = `Taxonomy code "${code}" not found in the local curated subset; this does not establish official invalidity.${suggestions}\n\nTip: Use nucc_search to find codes by keyword.`;
  return {
    content: [{ type: "text" as const, text: msg }],
    isError: true,
    structuredContent: {
      success: false,
      error: { code: "NOT_FOUND", message: msg },
      not_found_scope: "embedded_subset", official_code_validity: "undetermined",
      suggestions: partial.map((t) => ({
        code: t.code,
        classification: t.classification,
        specialization: t.specialization,
      })),
    },
  };
}
