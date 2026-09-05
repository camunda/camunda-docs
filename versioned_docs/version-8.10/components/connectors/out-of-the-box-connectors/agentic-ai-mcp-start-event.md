---
id: agentic-ai-mcp-start-event
title: MCP start event
sidebar_label: MCP start event
description: "Reference for the MCP start event element template, which registers a BPMN process as a callable MCP tool in the Processes MCP Server."
---

The **MCP start event** is an [element template](/reference/glossary.md#element-template) applied to a BPMN message start event. When deployed, it registers the process as an MCP tool in the [Processes MCP Server](/apis-tools/processes-mcp/processes-mcp-overview.md).

:::note
The MCP start event is not handled by the Connector Runtime like other Connectors. The element template configures the start event metadata that the Processes MCP Server uses to expose the process as a tool to MCP clients.
:::

## Apply the template

1. Open your BPMN process in Modeler or Modeler.
2. Select a start event (or add a new one).
3. In the properties panel, click the element template picker.
4. Select **MCP start event** from the **AI Tools** category.

## Properties

| Property                  | Required | Description                                                                                                                                                                 |
| :------------------------ | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Name**                  | Yes      | The MCP tool identifier. Alphanumeric characters, hyphens (`-`), underscores (`_`), and dots (`.`) **only**. Maximum 100 characters. Used by MCP clients to call this tool. |
| **What it does**          | Yes      | A plain-language description of the process function. Shown to LLMs as tool metadata.                                                                                       |
| **Which inputs it needs** | Yes      | A plain-language description of required and optional input parameters, their types, and any constraints. Shown to LLMs as tool metadata.                                   |
| **When to use**           | No       | Specific situations or user intents that should trigger this tool.                                                                                                          |
| **When not to use**       | No       | Conditions or situations where this tool should not be invoked.                                                                                                             |
| **What the tool returns** | No       | The outcomes, results, and variable names the process produces on completion.                                                                                               |

A hidden `messageNameUuid` property is auto-generated and binds the start event to its BPMN message name. No user action is required for this property.

## How it works

When the process is deployed:

1. The Processes MCP Server reads the element template metadata and registers the process as an MCP tool.
2. MCP clients can discover the tool by name and call it.
3. Each tool invocation starts a new process instance with the tool call arguments mapped as process variables.
4. The MCP Server returns the key of the started process instance to the client, which can use it to track execution status or retrieve results.

:::important
Only the latest deployed version of a process is exposed. See [version binding](/apis-tools/processes-mcp/processes-mcp-version-binding.md) for more details.
:::
