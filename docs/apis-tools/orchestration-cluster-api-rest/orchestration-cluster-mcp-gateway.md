---
id: orchestration-cluster-mcp-gateway
title: "MCP Gateway"
description: "Connect AI applications and MCP clients to Camunda 8 using the Model Context Protocol (MCP)."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

The MCP Gateway exposes the Orchestration Cluster through the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/), enabling AI applications, AI agents, and MCP-compatible clients to interact with Camunda 8 processes programmatically.

## What is the MCP Gateway?

The MCP Gateway is a gateway service (similar to the [REST API gateway](./orchestration-cluster-api-rest-overview.md)) that allows external systems to interact with the Orchestration Cluster using the Model Context Protocol. MCP is an open-source standard that provides a unified way for AI applications to connect to external tools and data sources.

**Key use cases:**

- **AI-driven process automation** – Enable AI agents and LLMs to start processes, complete tasks, and manage process instances.
- **Integrate Camunda with AI development tools** – Connect IDEs like VSCode with Claude Code or other MCP-enabled AI assistants to Camunda workflows.
- **Build AI applications with process context** – Allow AI applications to access and manipulate process data through a standardized protocol.

:::info MCP Gateway vs. MCP Client Connector
The **MCP Gateway** exposes Camunda to MCP clients, allowing external AI applications to interact with Camunda processes. The [**MCP Client Connector**](/components/early-access/alpha/mcp-client/mcp-client.md) does the opposite—it allows Camunda to connect **to** external MCP servers as a client, enabling processes to use tools provided by external MCP servers.
:::

## Availability

The MCP Gateway is available starting with Camunda 8.9.0.

| Distribution                                                                      | Availability |
| --------------------------------------------------------------------------------- | ------------ |
| [Camunda 8 SaaS](https://camunda.io)                                              | ✅ 8.9.0+    |
| [Self-Managed](/self-managed/deployment/helm/install/quick-install.md)            | ✅ 8.9.0+    |
| [Camunda 8 Run](/self-managed/quickstart/developer-quickstart/c8run.md)           | ✅ 8.9.0+    |
| [Docker Compose](/self-managed/quickstart/developer-quickstart/docker-compose.md) | ✅ 8.9.0+    |

## Enable the MCP Gateway

### Camunda 8 SaaS

For Camunda 8 SaaS, enable the MCP Gateway through the Console:

1. Navigate to **Console** → **Cluster Settings**
2. Enable **MCP Support**
3. The MCP Gateway will be available at the `/mcp` endpoint on your cluster

:::note
MCP Support must be enabled on clusters running version 8.9.0 or later.
:::

### Self-Managed

For Self-Managed deployments, enable the MCP Gateway by setting an environment variable:

<Tabs groupId="deployment" defaultValue="helm" queryString values={[
{label: 'Helm/Kubernetes', value: 'helm' },
{label: 'Docker Compose', value: 'docker-compose' },
{label: 'Camunda 8 Run', value: 'c8run' },
]}>

<TabItem value="helm">

Set the `CAMUNDA_MCP_ENABLED` environment variable to `true` in your Helm values:

```yaml
zeebe-gateway:
  env:
    - name: CAMUNDA_MCP_ENABLED
      value: "true"
```

Apply the configuration:

```bash
helm upgrade <release-name> camunda/camunda-platform \
  --values values.yaml
```

</TabItem>

<TabItem value="docker-compose">

Add the environment variable to your `docker-compose.yml`:

```yaml
services:
  zeebe:
    environment:
      - CAMUNDA_MCP_ENABLED=true
```

Restart your containers:

```bash
docker-compose up -d
```

</TabItem>

<TabItem value="c8run">

Set the environment variable before starting Camunda 8 Run:

```bash
export CAMUNDA_MCP_ENABLED=true
./c8run start
```

Alternatively, add it to your `application.yaml`:

```yaml
camunda:
  mcp:
    enabled: true
```

</TabItem>

</Tabs>

After enabling, the MCP Gateway will be available at the `/mcp` endpoint (e.g., `http://localhost:8080/mcp` for local deployments).

## Connect MCP clients to the MCP Gateway

### Authentication

The MCP Gateway uses the same authentication mechanisms as the Orchestration Cluster REST API. OAuth 2.0 tokens (OIDC/JWT) are required for SaaS and recommended for production Self-Managed deployments.

For detailed authentication information, see [Orchestration Cluster API Authentication](./orchestration-cluster-api-rest-authentication.md).

**Quick summary:**

- **SaaS**: Requires OAuth 2.0 client credentials flow with access tokens
- **Self-Managed (Production)**: Supports OAuth 2.0, Basic Auth, or no authentication (depending on configuration)
- **Local Development**: Typically no authentication required (Camunda 8 Run, Docker Compose)

### Using c8ctl mcp-proxy for OAuth 2.0 client credentials

Many MCP clients (such as those integrated into IDEs) use the STDIO transport and don't natively support OAuth 2.0 client credentials flows. For these clients, use [`c8ctl mcp-proxy`](https://github.com/camunda/c8ctl) to create a bridge between STDIO and the remote HTTP MCP Gateway with automatic OAuth 2.0 token management.

**How it works:**

`c8ctl mcp-proxy` acts as a local MCP server that:

1. Accepts STDIO connections from your MCP client (e.g., VSCode, Claude Code)
2. Handles OAuth 2.0 authentication with your Camunda cluster
3. Forwards MCP requests to the remote Camunda MCP Gateway over HTTP

#### Prerequisites

- Node.js installed (for using `npx`)
- Camunda cluster with MCP Gateway enabled
- OAuth 2.0 client credentials (client ID, client secret, OAuth URL, audience)

For SaaS clusters, obtain client credentials by [creating an API client](/components/console/manage-clusters/manage-api-clients.md#create-a-client) in the Camunda Console.

#### Configure MCP client with c8ctl mcp-proxy

**Example configuration for VSCode or Claude Code:**

Add the following to your MCP client configuration file (e.g., `~/.vscode/mcp-settings.json` or Claude Desktop's `claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "camunda-mcp": {
      "command": "npx",
      "args": ["c8ctl", "mcp-proxy", "/mcp"],
      "env": {
        "CAMUNDA_BASE_URL": "https://your-cluster-base-url",
        "CAMUNDA_CLIENT_ID": "your-client-id",
        "CAMUNDA_CLIENT_SECRET": "your-client-secret",
        "CAMUNDA_OAUTH_URL": "https://your-oauth-url/oauth/token",
        "CAMUNDA_TOKEN_AUDIENCE": "your-token-audience"
      }
    }
  }
}
```

**Environment variables:**

| Variable                 | Description                                                                     | Required |
| ------------------------ | ------------------------------------------------------------------------------- | -------- |
| `CAMUNDA_BASE_URL`       | Base URL of your Camunda cluster (e.g., `https://cluster-id.region.camunda.io`) | ✅       |
| `CAMUNDA_CLIENT_ID`      | OAuth 2.0 client ID                                                             | ✅       |
| `CAMUNDA_CLIENT_SECRET`  | OAuth 2.0 client secret                                                         | ✅       |
| `CAMUNDA_OAUTH_URL`      | OAuth 2.0 token endpoint (e.g., `https://login.cloud.camunda.io/oauth/token`)   | ✅       |
| `CAMUNDA_TOKEN_AUDIENCE` | OAuth 2.0 token audience                                                        | ✅       |

:::note
The supported environment variables are defined by [`c8ctl`](https://github.com/camunda/c8ctl) and the underlying [`orchestration-cluster-api-js`](https://github.com/camunda/orchestration-cluster-api-js) library.
:::

After configuration, restart your MCP client to apply the changes.

### Direct HTTP connection (for clients with OAuth 2.0 support)

MCP clients that natively support OAuth 2.0 and HTTP transports can connect directly to the MCP Gateway without using `c8ctl mcp-proxy`.

**Connection details:**

- **Endpoint**: `{CAMUNDA_BASE_URL}/mcp`
- **Transport**: HTTP with Server-Sent Events (SSE) or Streamable HTTP (depending on MCP client support)
- **Authentication**: OAuth 2.0 Bearer token in `Authorization` header

**Example MCP client configuration (direct HTTP):**

```json
{
  "mcpServers": {
    "camunda-mcp": {
      "url": "https://your-cluster-base-url/mcp",
      "transport": "sse",
      "headers": {
        "Authorization": "Bearer YOUR_ACCESS_TOKEN"
      }
    }
  }
}
```

:::info
Most MCP clients use STDIO transport and will require `c8ctl mcp-proxy` for OAuth 2.0 authentication.
:::

## Supported MCP features

The MCP Gateway currently supports the following MCP features:

- **Tools**: Execute operations on the Orchestration Cluster (start processes, complete tasks, query instances, etc.)

:::note
Other MCP features such as resources and prompts are not currently supported by the MCP Gateway.
:::

## Learn more

- [Model Context Protocol documentation](https://modelcontextprotocol.io/)
- [Orchestration Cluster API REST Overview](./orchestration-cluster-api-rest-overview.md)
- [Orchestration Cluster API Authentication](./orchestration-cluster-api-rest-authentication.md)
- [MCP Client Connector](/components/early-access/alpha/mcp-client/mcp-client.md) (for connecting Camunda to external MCP servers)
- [c8ctl GitHub repository](https://github.com/camunda/c8ctl)
