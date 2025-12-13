---
id: mcp-client
title: MCP Client
sidebar_label: MCP Client
description: "Integrate MCP (Model Context Protocol) clients with agentic orchestration."
---

import AoGrid from '../../../react-components/\_ao-card';
import { fundamentalCards } from '../../../react-components/\_mcp-card-data';

Integrate [MCP (Model Context Protocol)](https://modelcontextprotocol.io/) clients with [agentic orchestration](../../../agentic-orchestration/agentic-orchestration-overview.md).

## About

Camunda's MCP Client enables you to use the [AI Agent connector](../../../connectors/out-of-the-box-connectors/agentic-ai-aiagent.md) together with MCP clients to access tools provided by MCP servers.

:::info
The MCP Client supports only tool-related functionality. Other MCP features, such as resources or prompts, are not currently supported.
:::

This includes:

- Locally started standard input/output servers [STDIO](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports#stdio). These are operating system processes launched and managed by the connector runtime.
- Remote MCP servers using the [Streamable HTTP](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports#streamable-http) and [HTTP with SSE](https://modelcontextprotocol.io/specification/2024-11-05/basic/transports#http-with-sse) transports.

:::tip
Camunda recommends the Streamable HTTP transport protocol over HTTP with SSE.
:::

See the MCP Client architecture below:

![MCP Client architecture](img/mcp-clients-architecture.png)

## MCP Client connectors

Camunda provides two MCP connectors with distinct purposes.

| Connector                                                       | STDIO | Remote/HTTP | Configuration                        | Availability                                                                                                | Description                                                                                                            |
| :-------------------------------------------------------------- | :---- | :---------- | :----------------------------------- | :---------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------- |
| [MCP Remote Client connector](./mcp-remote-client-connector.md) | ❌    | ✅          | Properties panel                     | Available on SaaS                                                                                           | Suitable for prototyping with remote MCP servers. Uses on-demand HTTP connections instead of persistent ones.          |
| [MCP Client connector](./mcp-client-connector.md)               | ✅    | ✅          | Connector runtime + properties panel | Not directly available on SaaS, but a custom runtime running the client connector can be connected to SaaS. | Flexible MCP integration based on persistent connections managed by the connector runtime. Supports STDIO MCP servers. |

:::info
They are not mutually exclusive and can be used together as long as your environment is configured accordingly.
:::

### Common configuration options

The MCP Client connectors share a set of common options for configuring tool access and availability.

#### Connector mode

Choose how the connector operates based on your use case.

##### AI Agent tool mode

Use when the connector is invoked as a tool from within an AI Agent ad-hoc sub-process. This is the default mode.

The **Method** and **Parameters** fields accept FEEL expressions and default to `toolCall.method` and `toolCall.params`, which are automatically populated by the AI Agent connector during tool discovery and tool calling.

##### Standalone mode

Use when invoking MCP operations directly from a BPMN process without an AI Agent. This mode allows you to call MCP servers independently of the agentic orchestration flow.

Select the operation to perform:

| Operation  | Description                                              | Configuration                                                                                                  |
| :--------- | :------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------- |
| List tools | Retrieves the list of tools available on the MCP server. | No additional configuration required.                                                                          |
| Call tool  | Invokes a specific tool on the MCP server.               | **Tool name**: The name of the tool to invoke.<br/>**Arguments**: Tool arguments as a FEEL context expression. |

#### Tools

Filter the list of tools provided by the MCP server. If not configured, all tools provided by the MCP server will be available to the AI agent.

| Field          | Required | Description                                             | Example                                |
| :------------- | :------- | :------------------------------------------------------ | :------------------------------------- |
| Included tools | No       | List of allowed tools provided by the MCP server.       | `["read_file", "read_multiple_files"]` |
| Excluded tools | No       | List of tools to exclude. Overrides any included tools. | `["write_file"]`                       |

For example, an MCP client connected to
a [file system MCP server](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem) could be configured
with `["read_file", "read_multiple_files"]` as included tools to only allow read-only operations to the file system.
Alternatively, it could be configured with `["write_file"]` as a list of excluded tools to prevent write operations.

#### Operation

Configure the operation to execute on the MCP server. You typically only need to change the default value if the ad-hoc sub-process multi-instance uses an input element other than `toolCall`.

| Field      | Required | Description                                                                                                                                       |
| :--------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| Method     | Yes      | The [MCP method](https://modelcontextprotocol.io/specification/2025-06-18/server/tools#protocol-messages) to call. Defaults to `toolCall.method`. |
| Parameters | Yes      | The parameters to pass with the MCP client execution. Defaults to `toolCall.params`.                                                              |

#### Output mapping

Specify the process variables to map and export the tool calling response into.

| Field             | Required | Description                                                                                                                                                                                                                                                                                                                              |
| :---------------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Result variable   | Yes      | Defaults to `toolCallResult`. Change only if using the AI Agent Task connector and the output mapping of the ad-hoc sub-process multi-instance is configured to use a different variable for the [content mapping](../../../connectors/out-of-the-box-connectors/agentic-ai-aiagent-task-example.md#configure-multi-instance-execution). |
| Result expression | No       | Optionally unpack the response content into multiple process variables using the **Result expression** field as a [FEEL context expression](../../../concepts/expressions.md).                                                                                                                                                           |

## Learn the fundamentals

Understand the fundamental concepts of the MCP Client.

<AoGrid ao={fundamentalCards} columns={2}/>

## Explore further resources

Dive into practical resources to see the MCP Client in action.

<p><a href="https://github.com/camunda/connectors/tree/main/connectors/agentic-ai/examples/ai-agent/ad-hoc-sub-process/ai-agent-chat-mcp#readme" class="link-arrow" target="_blank">Try out this example</a></p>

<p><a href="https://page.camunda.com/webinar-using-mcp-with-camunda-success" class="link-arrow" target="_blank"> Watch this webinar on using MCP with Camunda</a></p>
