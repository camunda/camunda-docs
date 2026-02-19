---
id: orchestration-cluster-api-mcp-setup
title: "Enable and connect"
sidebar_label: "Enable and connect"
description: "Enable the Orchestration Cluster MCP Server and configure MCP clients to connect."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

This page explains how to enable the MCP server on your Orchestration Cluster and configure MCP clients to consume it.

## Enable the Orchestration Cluster MCP Server

The MCP server is opt-in and must be enabled before MCP clients can connect. How to enable it depends on your deployment type.

<Tabs groupId="deployment" defaultValue="c8run" queryString values={[
{label: 'Camunda 8 Run', value: 'c8run' },
{label: 'Docker Compose', value: 'docker-compose' },
{label: 'Helm / Kubernetes', value: 'helm' },
{label: 'SaaS', value: 'saas' },
]}>

<TabItem value="c8run">

The MCP server is **enabled by default** in Camunda 8 Run. No additional configuration is needed.

</TabItem>

<TabItem value="docker-compose">

Set the `CAMUNDA_MCP_ENABLED` environment variable on the Orchestration Cluster container:

```yaml
services:
  camunda:
    environment:
      CAMUNDA_MCP_ENABLED: "true"
```

</TabItem>

<TabItem value="helm">

Set `orchestration.mcp.enabled` in your Helm chart values:

```yaml
orchestration:
  mcp:
    enabled: true
```

</TabItem>

<TabItem value="saas">

In the Camunda Console, navigate to your cluster, open **Cluster Settings**, and enable **MCP Support**.

:::info
MCP server support is available on SaaS clusters running Camunda 8.9.0 or later.
:::

</TabItem>

</Tabs>

For a full reference of MCP configuration properties, see [Property reference](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#mcp-server).

## Connect an MCP client

Once the MCP server is enabled, you can connect any MCP-compliant client. The approach depends on your client's capabilities and your authentication requirements.

### MCP endpoint URL

The MCP server is served at `/mcp/cluster` on the Orchestration Cluster. The full endpoint URL depends on your deployment type:

| Deployment                     | MCP endpoint URL                                                  |
| :----------------------------- | :---------------------------------------------------------------- |
| Camunda 8 Run / Docker Compose | `http://localhost:8080/mcp/cluster`                               |
| SaaS                           | `https://${REGION_ID}.zeebe.camunda.io/${CLUSTER_ID}/mcp/cluster` |
| Self-Managed (custom)          | `https://<your-host>/mcp/cluster`                                 |

For SaaS, find your **Region Id** and **Cluster Id** in the Camunda Console under **Cluster Details**.

### Direct HTTP connection

If your Orchestration Cluster does not require authentication — for example, when running locally with [Camunda 8 Run](/self-managed/quickstart/developer-quickstart/c8run.md) or [Docker Compose](/self-managed/quickstart/developer-quickstart/docker-compose.md) — you can connect directly to the MCP server endpoint without any additional tooling.

Any MCP client that supports [Streamable HTTP](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports#streamable-http) can be used. For authenticated environments, use [`c8ctl mcp-proxy`](#using-c8ctl-mcp-proxy) instead.

```json
{
  "servers": {
    "camunda": {
      "type": "http",
      "url": "http://localhost:8080/mcp/cluster"
    }
  }
}
```

### Using c8ctl mcp-proxy

Many MCP clients, such as VS Code (GitHub Copilot) and Claude Code, do not natively support the OAuth 2.0 client credentials flow required for authenticated environments. The [`c8ctl`](https://github.com/camunda/c8ctl) `mcp-proxy` command bridges this gap by providing a local STDIO-to-Remote HTTP proxy that handles authentication transparently.

The proxy authenticates to the MCP server using OAuth 2.0 client credentials, and exposes a local STDIO MCP interface that your client connects to.

#### Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- [Client credentials](/components/console/manage-clusters/manage-api-clients.md#create-a-client) for your Camunda cluster

#### Configuration

Add the following to your MCP client configuration (for example, `.vscode/mcp.json` for VS Code, or `claude_desktop_config.json` for Claude Code):

```json
{
  "servers": {
    "camunda-mcp": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@camunda8/cli", "mcp-proxy"],
      "env": {
        "CAMUNDA_BASE_URL": "https://<cluster-base-url>",
        "CAMUNDA_CLIENT_ID": "<client-id>",
        "CAMUNDA_CLIENT_SECRET": "<client-secret>",
        "CAMUNDA_OAUTH_URL": "https://<token-url>/oauth/token",
        "CAMUNDA_TOKEN_AUDIENCE": "<token-audience>"
      }
    }
  }
}
```

| Variable                 | Description                                                                                                              |
| :----------------------- | :----------------------------------------------------------------------------------------------------------------------- |
| `CAMUNDA_BASE_URL`       | Base URL of your Orchestration Cluster, **without** the `/mcp/cluster` path (see [MCP endpoint URL](#mcp-endpoint-url)). |
| `CAMUNDA_CLIENT_ID`      | OAuth client ID from your API client credentials.                                                                        |
| `CAMUNDA_CLIENT_SECRET`  | OAuth client secret from your API client credentials.                                                                    |
| `CAMUNDA_OAUTH_URL`      | OAuth token endpoint URL.                                                                                                |
| `CAMUNDA_TOKEN_AUDIENCE` | Token audience for the Orchestration Cluster API.                                                                        |

:::tip Where to find these values
When you [create API client credentials](/components/console/manage-clusters/manage-api-clients.md#create-a-client) in the Camunda Console, all required connection details — including the base URL, OAuth endpoint, client ID, and audience — are displayed on the credentials page. Copy them into the configuration above.
:::

For the full list of supported environment variables, see the [`c8ctl` documentation](https://github.com/camunda/c8ctl).

### Use with the MCP Client connectors

You can also connect to the MCP server from within a BPMN process using Camunda's [MCP Client connectors](/components/early-access/alpha/mcp-client/mcp-client.md). This allows an AI agent running in an agentic orchestration workflow to interact with Camunda's own operational data — for example, to query incidents or start processes as part of an automated workflow.

<Tabs groupId="mcp-connector" defaultValue="remote" queryString values={[
{label: 'MCP Remote Client connector', value: 'remote' },
{label: 'MCP Client connector', value: 'client' },
]}>

<TabItem value="remote">

The [MCP Remote Client connector](/components/early-access/alpha/mcp-client/mcp-remote-client-connector.md) connects to remote MCP servers over HTTP. Configure it in the properties panel with the following settings:

- **Transport type**: Streamable HTTP
- **URL**: Your MCP endpoint URL (see [above](#mcp-endpoint-url))
- **Authentication**: OAuth 2.0

| Field                    | Value                                                                                                                                          |
| :----------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| OAuth 2.0 token endpoint | Your OAuth token endpoint (`https://login.cloud.camunda.io/oauth/token` for SaaS)                                                              |
| Client ID                | Your OAuth client ID                                                                                                                           |
| Client secret            | Your OAuth client secret. Use [secrets](/components/console/manage-clusters/manage-secrets.md) (for example, `{{secrets.MCP_CLIENT_SECRET}}`). |
| Audience                 | The audience for your cluster API (`zeebe.camunda.io` for SaaS)                                                                                |
| Client authentication    | Send client credentials in body                                                                                                                |

For more details, see [MCP Remote Client connector](/components/early-access/alpha/mcp-client/mcp-remote-client-connector.md).

</TabItem>

<TabItem value="client">

The [MCP Client connector](/components/early-access/alpha/mcp-client/mcp-client-connector.md) manages persistent MCP connections through the connector runtime. Configure the Camunda MCP server as a remote HTTP client in your connector runtime configuration (for example, `application.yml`):

```yaml
camunda:
  connector:
    agenticai:
      mcp:
        client:
          enabled: true
          clients:
            camunda-mcp:
              type: http
              http:
                url: https://${REGION_ID}.zeebe.camunda.io/${CLUSTER_ID}/mcp/cluster
                authentication:
                  type: oauth
                  oauth:
                    oauth-token-endpoint: https://login.cloud.camunda.io/oauth/token
                    client-id: <your-client-id>
                    client-secret: <your-client-secret>
                    audience: zeebe.camunda.io
                    client-authentication: credentials-body
```

The example above shows a SaaS configuration. Replace the URL and OAuth values with your cluster's connection details. For local unauthenticated setups, you can omit the `authentication` block and use `http://localhost:8080/mcp/cluster` as the URL.

Then reference the client ID `camunda-mcp` in the MCP Client connector element template within your BPMN process. For more details, see [MCP Client connector](/components/early-access/alpha/mcp-client/mcp-client-connector.md).

</TabItem>

</Tabs>
