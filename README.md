# Nucc Taxonomy MCP Server

This is a [Model Context Protocol](https://modelcontextprotocol.io) (MCP) server. It lets MCP clients (Claude Desktop, Claude Code, Continue, etc.) query the upstream Nucc Taxonomy API in natural language. It is one of 100+ servers in the [Bio MCP](../../README.md) monorepo.

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

Every tool returns both a human-readable `content` summary and a structured `structuredContent` payload.

## Development

```bash
./scripts/dev-servers.sh nucc-taxonomy            # run locally (port 8876)
pnpm --filter nucc-taxonomy-mcp-server run deploy   # deploy to Cloudflare Workers
```

See [`docs/adding-mcp-servers.md`](../../docs/adding-mcp-servers.md) and the root [README](../../README.md) for the full architecture (Code Mode, staging, portals).

---

*Auto-generated baseline README — refine with server-specific detail as needed.*
