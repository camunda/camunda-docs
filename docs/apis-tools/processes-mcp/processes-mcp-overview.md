---
id: processes-mcp-overview
title: "Processes MCP Server"
sidebar_label: "Overview"
description: "Enable AI agents to discover and call your deployed BPMN processes as MCP tools."
---

import PageDescription from '@site/src/components/PageDescription';

<PageDescription />

## About

The Processes MCP Server is a capability of the Orchestration Cluster that exposes your deployed BPMN processes as callable tools through the [Model Context Protocol](https://modelcontextprotocol.io/) (MCP).

- Any process equipped with an [MCP start event](/components/connectors/out-of-the-box-connectors/agentic-ai-mcp-start-event.md) element template is automatically registered as an MCP tool when deployed.
- MCP clients discover these tools at runtime and invoke them by name. Each invocation starts a new process instance and returns the started process instance key immediately.
- The server shares the same [authentication](../orchestration-cluster-api-rest/orchestration-cluster-api-rest-authentication.md) and [authorization](/components/concepts/access-control/authorizations.md) model as the Orchestration Cluster REST API.

:::important Camunda 8 public API
The Processes MCP Server is not part of the [Camunda 8 public API](/reference/public-api.md).
:::

:::note
This is the Processes MCP Server documentation. If you are looking to:

- Give AI agents access to Camunda's operational capabilities, such as incidents, user tasks, and process instances, see the [Orchestration Cluster MCP Server](../orchestration-cluster-api-mcp/orchestration-cluster-api-mcp-overview.md).
- Connect an AI agent running inside a BPMN process to an external MCP server, see the [MCP Client connector](/components/connectors/out-of-the-box-connectors/agentic-ai-mcp-client.md).
  :::

### Key features

| Feature                   | Description                                                                                                                                                  |
| :------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Process tool registration | Processes with an MCP start event are automatically registered as MCP tools on deployment.                                                                   |
| Tool discovery            | MCP clients discover available process tools and their schemas at runtime.                                                                                   |
| Static tools              | The server also exposes a set of [static tools](#static-tools) for inspecting running process instances.                                                     |
| Version binding           | Only the latest deployed version of a process is exposed. See [Version binding](./processes-mcp-version-binding.md).                                         |
| Standard transport        | Uses [Streamable HTTP](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports#streamable-http), compatible with any MCP-compliant client. |

### Authentication

The Processes MCP Server uses the same authentication model as the [Orchestration Cluster REST API](../orchestration-cluster-api-rest/orchestration-cluster-api-rest-authentication.md). OAuth tokens obtained for the REST API work without changes.

For the full authentication reference, including SaaS and Self-Managed setup, see [Authentication](../orchestration-cluster-api-rest/orchestration-cluster-api-rest-authentication.md).

### Transport

The Processes MCP Server uses [Streamable HTTP](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports#streamable-http) and is served at the `/mcp/processes` endpoint on the Orchestration Cluster. It is stateless; no session management is required.

### Audit logging for MCP operations

Operations triggered through the Processes MCP Server are recorded in the [audit log](/components/audit-log/overview.md), like any other operation. Because the tool call enters through MCP, each resulting record has an inbound channel of `MCP` and captures the name of the MCP tool that triggered it, so you can distinguish operations initiated by AI agents through MCP from those performed directly by users or clients.

See [inbound channel](/components/audit-log/overview/operation-structure.md#inbound-channel) for details on how this is presented in the applications and the REST API.

:::note
The Processes MCP Server uses the same authentication as the REST API, so a tool call is attributed to the authenticated user or client.

By default, [only user operations are recorded](/components/audit-log/overview/recorded-operations.md#limitations-and-constraints), not client operations. To capture MCP tool calls made by a client, configure the audit log to also track client operations.
:::

## Get started

:::important Camunda 8.10
The Processes MCP Server is only available from Camunda 8.10 onwards.
:::

To expose a BPMN process as an MCP tool, see [Expose a process as an MCP tool](/components/agentic-orchestration/expose-process-as-mcp-tool.md).

If you have a local Orchestration Cluster running with [Camunda 8 Run](/self-managed/quickstart/developer-quickstart/c8run.md) or [Docker Compose](/self-managed/quickstart/developer-quickstart/docker-compose.md), the Processes MCP Server is enabled by default. Connect any MCP client using this configuration:

```json
{
  "servers": {
    "camunda-processes": {
      "type": "http",
      "url": "http://localhost:8080/mcp/processes"
    }
  }
}
```

For production environments and other deployment types, the Processes MCP Server must be explicitly enabled before use. See [Enable and connect](./processes-mcp-setup.md) for more details.

## Static tools

In addition to dynamically registered process tools, the Processes MCP Server exposes a set of static tools for inspecting the process instances it starts.
See [static tools](./processes-mcp-static-tools.md) for more details.
