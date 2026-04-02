import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerNuccSearch } from "./tools/search";
import { registerNuccLookup } from "./tools/lookup";

export class MyMCP extends McpAgent {
    server = new McpServer({ name: "nucc-taxonomy", version: "1.0.0" });

    async init() {
        registerNuccSearch(this.server);
        registerNuccLookup(this.server);
    }
}

export default {
    fetch(request: Request, env: Env, ctx: ExecutionContext) {
        const url = new URL(request.url);

        if (url.pathname === "/health") {
            return new Response("ok", {
                status: 200,
                headers: { "content-type": "text/plain" },
            });
        }

        if (url.pathname === "/mcp") {
            return MyMCP.serve("/mcp", { binding: "MCP_OBJECT" }).fetch(request, env, ctx);
        }

        return new Response("Not found", { status: 404 });
    },
};
