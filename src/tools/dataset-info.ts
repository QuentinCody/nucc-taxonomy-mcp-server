import type {McpServer} from "@bio-mcp/shared/mcp";
import {z} from "zod";
import {installedDataset, LAST_OBSERVED_RELEASE, latestAdvertisedRelease, withDatasetProvenance} from "../lib/dataset";
export function registerDatasetInfo(server: McpServer) {
  const handler = async (args: Record<string, unknown>) => {
    try {
      if (args.check_latest !== undefined && typeof args.check_latest !== "boolean") throw new Error("check_latest must be boolean");
      const data = {installed: await installedDataset(), last_observed_upstream: LAST_OBSERVED_RELEASE, live_advertised: args.check_latest === true ? await latestAdvertisedRelease() : null, installed_matches_upstream: "unknown", interpretation: "Advertised CSV release is distinct from the installed unversioned subset. Neither publication nor a local lookup establishes individual code validity on a service date."};
      return withDatasetProvenance("nucc_dataset_info", args, {content: [{type: "text", text: "Installed data is an unversioned curated subset. Official CSV release observation and effective-use policy are reported separately."}], structuredContent: {success: true, data}});
    } catch (error) {
      return withDatasetProvenance("nucc_dataset_info", args, {content: [{type: "text", text: "NUCC release discovery failed; installed data has not changed."}], isError: true, structuredContent: {success: false, error: {code: "RELEASE_DISCOVERY_ERROR", message: error instanceof Error ? error.message : "Release discovery failed"}, last_observed_upstream: LAST_OBSERVED_RELEASE}});
    }
  };
  for (const name of ["nucc_dataset_info", "mcp_nucc_dataset_info"]) server.registerTool(name, {title: "Inspect NUCC Dataset Provenance", description: "Report installed subset coverage/fingerprint and unknown release/effective date separately from observed official release metadata. Optionally recheck the official CSV listing; no CSV is imported and no code validity is inferred.", inputSchema: {check_latest: z.boolean().optional().describe("Fetch the official CSV listing now; default false uses explicitly dated observations")}}, handler);
}
