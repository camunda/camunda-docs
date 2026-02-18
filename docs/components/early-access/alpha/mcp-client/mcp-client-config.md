---
id: mcp-client-config
title: Configure MCP Client connectors
sidebar_label: Configure
description: "Learn how to configure MCP Client connectors, including connector mode, tool access, and availability."
---

Learn how to configure MCP Client connectors, including connector mode, tool access, and availability.

## Connector mode

Choose how the connector operates based on your use case.

### AI Agent tool mode

Use when the connector is invoked as a tool from within an AI Agent ad-hoc sub-process. This is the default mode.

The **Method** and **Parameters** fields accept FEEL expressions and default to `toolCall.method` and `toolCall.params`, which are automatically populated by the AI Agent connector during tool discovery and tool calling.

#### Operation

Configure the operation to execute on the MCP server. You typically only need to change the default value if the ad-hoc sub-process multi-instance uses an input element other than `toolCall`.

| Field      | Required | Description                                                                                                                                       |
| :--------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| Method     | Yes      | The [MCP method](https://modelcontextprotocol.io/specification/2025-06-18/server/tools#protocol-messages) to call. Defaults to `toolCall.method`. |
| Parameters | Yes      | The parameters to pass with the MCP client execution. Defaults to `toolCall.params`.                                                              |

### Standalone mode

Use when invoking MCP operations directly from a BPMN process without an AI Agent. This mode allows you to call MCP servers independently of the agentic orchestration flow.

Select the operation to perform:

| Operation               | Description                                                                                                                                                                   | Configuration                                                                                                                                           |
| :---------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| List tools              | Retrieves a list of tools available on the MCP server.                                                                                                                        | No additional configuration required.                                                                                                                   |
| Call tool               | Invokes a specific tool on the MCP server.                                                                                                                                    | <p><ul><li>**Tool name**: The name of the tool to invoke.</li><li><p>**Tool arguments**: Tool arguments as a FEEL context expression.</p></li></ul></p> |
| List resources          | Retrieves a list of available resources on the MCP server.                                                                                                                    | No additional configuration required.                                                                                                                   |
| List resource templates | <p>Retrieves a list of available resource templates on the MCP server.</p><p>These are similar to resources, but include a set of parameters for dynamic resource access.</p> | No additional configuration required.                                                                                                                   |
| Read resource           | Retrieves the content of a specific resource defined by its URI.                                                                                                              | **Resource URI**: The URI of the resource to read.                                                                                                      |
| List prompts            | Retrieves a list of available prompts on the MCP server.                                                                                                                      | No additional configuration required.                                                                                                                   |
| Get prompt              | Retrieves a specific prompt and its messages, potentially customized based on the provided input arguments.                                                                   | No additional configuration required.                                                                                                                   |

## Filters

Filter the list of available data provided by the MCP server, such as tools, resources, or prompts. If not configured, all tools provided by the MCP server will be available to the AI agent.
Filters can also prevent operations from being executed when applied to retrieval or execution operations, such as tool calls.

Below is an example of tool filtering. The same approach applies to resources and prompts:

| Field          | Required | Description                                             | Example                                |
| :------------- | :------- | :------------------------------------------------------ | :------------------------------------- |
| Included tools | No       | List of allowed tools provided by the MCP server.       | `["read_file", "read_multiple_files"]` |
| Excluded tools | No       | List of tools to exclude. Overrides any included tools. | `["write_file"]`                       |

For example, an MCP client connected to
a [file system MCP server](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem) could be configured
with `["read_file", "read_multiple_files"]` as included tools to only allow read-only operations to the file system.
Alternatively, it could be configured with `["write_file"]` as a list of excluded tools to prevent write operations.

## Output mapping

Specify the process variables to map and export the tool calling response into.

| Field             | Required | Description                                                                                                                                                                                                                                                                                                                              |
| :---------------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Result variable   | Yes      | Defaults to `toolCallResult`. Change only if using the AI Agent Task connector and the output mapping of the ad-hoc sub-process multi-instance is configured to use a different variable for the [content mapping](../../../connectors/out-of-the-box-connectors/agentic-ai-aiagent-task-example.md#configure-multi-instance-execution). |
| Result expression | No       | Optionally unpack the response content into multiple process variables using the **Result expression** field as a [FEEL context expression](../../../concepts/expressions.md).                                                                                                                                                           |
