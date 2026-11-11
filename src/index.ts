import { buildHealthResponse, configureCitationSigning } from "@bio-mcp/shared";
import {registerDatasetInfo} from "./tools/dataset-info";
import { StatelessMcpWorker } from "@bio-mcp/shared/mcp";
import { McpServer } from "@bio-mcp/shared/mcp";
import { registerNuccSearch } from "./tools/search";
import { registerNuccLookup } from "./tools/lookup";
import { registerOfficialTaxonomy } from "./tools/official-taxonomy";

export class MyMCP extends StatelessMcpWorker {
    server = new McpServer({ name: "nucc-taxonomy", version: "1.0.0" });

    async init() {
        configureCitationSigning(this.env);
        registerDatasetInfo(this.server);
        registerNuccSearch(this.server);
        registerNuccLookup(this.server);
        registerOfficialTaxonomy(this.server);
    }
}

export default {
    fetch(request: Request, env: Env, ctx: ExecutionContext) {
        const url = new URL(request.url);

        if (url.pathname === "/health") {
            return buildHealthResponse("nucc-taxonomy");
        }

        if (url.pathname === "/readyz") {
            // Deep check: builds the MCP server the way a real request does, so a
            // factory that throws is a 503 here instead of a green /health over a
            // server that 500s every MCP call.
            return MyMCP.readiness(env, "nucc-taxonomy");
        }

        if (url.pathname === "/mcp") {
            return MyMCP.serve("/mcp").fetch(request, env, ctx);
        }

        return new Response("Not found", { status: 404 });
    },
};
