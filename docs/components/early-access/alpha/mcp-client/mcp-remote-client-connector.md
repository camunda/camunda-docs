---
id: mcp-remote-client-connector
title: MCP Remote Client connector
sidebar_label: MCP Remote Client connector
---

:::note
Due to the overhead of managing HTTP connections described below, the MCP Remote Client connector is primarily intended
for prototyping and testing purposes. Consider using the MCP Client connector instead.
:::

The MCP Remote Client connector allows you to connect to a remote MCP client by configuring
an [HTTP with SSE](https://modelcontextprotocol.io/specification/2024-11-05/basic/transports#http-with-sse) (Server-Sent
Events) endpoint provided by an MCP server.

As the MCP client functionality is handled by a stateless [Job Worker](../../../concepts/job-workers.md), each
activation of an activity using the MCP Remote Client demands to open a dedicated HTTP connection/SSE subscription to
the MCP server.

For example, each action in a process would open/close a dedicarted MCP client connection to the remote
server:

1. tool discovery
2. tool call
3. every subsequent tool calls

## Client/connection caching

To avoid the unnecessary overhead described above, the MCP Remote Client connector will keep MCP clients/HTTP connection
in a cache for a configured amount of time and re-use these connections for calls to the same MCP server. On a
[custom connector runtime](../../../connectors/custom-built-connectors/connector-sdk.md#runtime-environments), this
behavior can be configured with the following properties:

```properties
camunda.connector.agenticai.mcp.remote-client.client.cache.enabled=true
camunda.connector.agenticai.mcp.remote-client.client.cache.expire-after=PT10M
camunda.connector.agenticai.mcp.remote-client.client.cache.maximum-size=15
```

## Usage

1. Configure an AI agent tools feedback loop as described in
   the [example integration](../../../connectors/out-of-the-box-connectors/agentic-ai-aiagent-example.md). Do not
   configure any tools within the ad-hoc sub-process yet.
2. Install
   the [MCP Remote Client element template](https://raw.githubusercontent.com/camunda/connectors/refs/tags/8.8.0-alpha6/connectors/agentic-ai/element-templates/agenticai-mcp-remote-client-outbound-connector.json)
3. Create a service task within the ad-hoc sub-process and apply the **MCP Remote Client** element template you
   installed in step 2.
4. In the **HTTP Connection** section of the properties panel, configure the **SSE URL** to point to the HTTP with SSE
   endpoint of your MCP server (typically ending in `/sse`)
5. Execute your process. The tool definitions provided by the MCP server should be listed in the agent context variable,
   and requests to the agent should be able to call the tools provided by the MCP server.
