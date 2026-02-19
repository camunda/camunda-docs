---
id: orchestration-cluster-api-mcp-overview
title: "MCP gateway"
sidebar_label: "Overview"
description: "Enable AI agents and LLM-powered applications to interact with Camunda 8 through the Model Context Protocol (MCP)."
---

The MCP server is an API surface of the Orchestration Cluster that exposes Camunda's operational capabilities through the [Model Context Protocol](https://modelcontextprotocol.io/) (MCP). It enables AI agents and LLM-powered applications to discover and invoke Camunda tools using a standardized interface — without custom API integration code.

Like the [Orchestration Cluster API](../orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md), the MCP gateway is built into the Orchestration Cluster and shares the same [authentication](../orchestration-cluster-api-rest/orchestration-cluster-api-rest-authentication.md) and [authorization](/components/concepts/access-control/authorizations.md) model. It can be enabled independently.

:::note
This is the Orchestration Cluster MCP _server_. If you are looking to connect an AI agent running in a BPMN process to an external MCP server, see the [MCP Client connector](/components/early-access/alpha/mcp-client/mcp-client.md).
:::

## Why use the MCP gateway?

Building AI-powered applications that interact with Camunda traditionally requires writing custom client code to call REST APIs, handle authentication, parse responses, and format data for AI consumption. The MCP gateway removes this by providing:

- **Standardized access** – AI agents discover and invoke Camunda capabilities through the MCP protocol, without bespoke integration code.
- **Tool discovery** – MCP clients automatically discover available tools and their schemas at runtime.
- **Broad compatibility** – Works with any MCP-compliant client, including VS Code (GitHub Copilot), Claude Code, Cursor, and custom AI applications.
- **Consistent security** – Inherits the same authentication and authorization model as the REST API.

## Available capabilities

The MCP gateway exposes tools across the following domains:

| Domain              | Capabilities                                                    |
| :------------------ | :-------------------------------------------------------------- |
| Cluster             | Check cluster health and retrieve topology information.         |
| Incidents           | Search, retrieve, and resolve incidents.                        |
| Process definitions | Search process definitions and retrieve BPMN XML.               |
| Process instances   | Search, retrieve, and create process instances.                 |
| User tasks          | Search, retrieve, and assign user tasks. Search task variables. |
| Variables           | Search and retrieve variables.                                  |

For the full list of available tools, see [Available tools](./orchestration-cluster-api-mcp-tools.md).

## Transport

The MCP gateway uses the [Streamable HTTP](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports#streamable-http) transport and is served at the `/mcp/cluster` endpoint. It is stateless — no session management is required.

## Authentication

The MCP gateway uses the same authentication model as the [Orchestration Cluster REST API](../orchestration-cluster-api-rest/orchestration-cluster-api-rest-authentication.md). OAuth tokens obtained for the REST API work with the MCP gateway without changes.

For SaaS environments:

1. [Create API client credentials](/components/console/manage-clusters/manage-api-clients.md#create-a-client) in the Camunda Console.
2. Use the generated **Client ID**, **Client secret**, **OAuth token endpoint**, and **audience** to obtain an access token via the [OAuth 2.0 client credentials flow](../orchestration-cluster-api-rest/orchestration-cluster-api-rest-authentication.md#using-a-token-oidcjwt).
3. Pass the token in the `Authorization: Bearer <token>` header, or use [`c8ctl mcp-proxy`](./orchestration-cluster-api-mcp-setup.md#using-c8ctl-mcp-proxy) to handle this automatically.

For the full authentication reference, including Self-Managed OIDC and basic authentication setup, see [Authentication](../orchestration-cluster-api-rest/orchestration-cluster-api-rest-authentication.md).

## Availability

The MCP gateway is available from Camunda 8.9 onwards. It must be explicitly enabled on your cluster before use. See [Enable and connect](./orchestration-cluster-api-mcp-setup.md) for instructions per deployment type.

## Quick start

If you have a local Orchestration Cluster running with [Camunda 8 Run](/self-managed/quickstart/developer-quickstart/c8run.md), the MCP gateway is enabled by default. Connect any MCP client using this configuration:

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

For production environments and other deployment types, see [Enable and connect](./orchestration-cluster-api-mcp-setup.md).
