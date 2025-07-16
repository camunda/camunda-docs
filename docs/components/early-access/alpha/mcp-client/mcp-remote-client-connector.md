---
id: mcp-remote-client-connector
title: MCP Remote Client connector
sidebar_label: MCP Remote Client connector
---

The MCP Remote Client connector allows connecting an AI agent to a remote MCP server by configuring a connection to a [HTTP with SSE](https://modelcontextprotocol.io/specification/2024-11-05/basic/transports#http-with-sse) (Server-Sent Events) endpoint.

## Limitations

Since the MCP client functionality is handled by a stateless [job worker](../../../concepts/job-workers.md), each activation of an activity using the MCP Remote Client requires opening a dedicated HTTP connection/SSE subscription to the MCP server.

For example, each of the following actions in an agentic AI feedback loop opens and closes a dedicated MCP client connection to the remote server:

1. Tool discovery  
2. Tool call  
3. Every subsequent tool call  

Due to this overhead, the MCP Remote Client connector is primarily intended for prototyping and testing purposes. For production or more efficient usage, consider using the [MCP Client](./mcp-client-connector.md) connector instead.

## Modeling

1. Configure an AI agent tools feedback loop as described in the [example integration](../../../connectors/out-of-the-box-connectors/agentic-ai-aiagent-example.md). Do not configure any tools within the ad-hoc sub-process yet.  
2. Install the [MCP Remote Client element template](https://raw.githubusercontent.com/camunda/connectors/refs/tags/8.8.0-alpha6/connectors/agentic-ai/element-templates/agenticai-mcp-remote-client-outbound-connector.json).  
3. Create a service task within the ad-hoc sub-process and apply the **MCP Remote Client** element template you installed in step 2.  
4. In the **HTTP Connection** section of the properties panel, configure the **SSE URL** to point to the HTTP with SSE endpoint of your MCP server (typically ending in `/sse`).  
5. Execute your process. You should see tool discovery calls routed to the MCP client service task, and tool definitions provided by the MCP server listed in the agent context variable. As a result, the agent should be able to call the tools provided by the MCP server.

## Client/connection caching

:::note
Configuration properties can be defined as environment variables using [Spring Boot conventions](https://docs.spring.io/spring-boot/reference/features/external-config.html#features.external-config.typesafe-configuration-properties.relaxed-binding.environment-variables). To define an environment variable, convert the configuration property to uppercase, remove any dashes `-`, and replace any delimiters `.` with underscores `_`.

For example, the property `camunda.connector.agenticai.mcp.remote-client.client.cache.expire-after` is represented by the environment variable `CAMUNDA_CONNECTOR_AGENTICAI_MCP_REMOTECLIENT_CLIENT_CACHE_EXPIREAFTER`.
:::

To reduce the overhead described above, the MCP Remote Client connector caches MCP clients/HTTP connections for a configurable amount of time and reuses these connections for calls to the same MCP server. In a **Camunda 8 Self-Managed** setup or a [custom connector runtime](../../../connectors/custom-built-connectors/connector-sdk.md#runtime-environments), this behavior can be configured with the following properties:

```properties
camunda.connector.agenticai.mcp.remote-client.client.cache.enabled=true
camunda.connector.agenticai.mcp.remote-client.client.cache.expire-after=PT10M
camunda.connector.agenticai.mcp.remote-client.client.cache.maximum-size=15
```
