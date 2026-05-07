---
id: expose-process-as-mcp-tool
title: Expose a process as an MCP tool
sidebar_label: Expose a process as an MCP tool
description: "Configure a BPMN process to register as a callable MCP tool for AI agents using the MCP start event element template."
keywords:
  [
    "MCP",
    "MCP start event",
    "processes MCP server",
    "agentic orchestration",
    "AI agent",
  ]
---

Expose a deployed BPMN process as a callable [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) tool so that AI agents and LLM-powered applications can discover and invoke it.

The [Processes MCP Server](/apis-tools/processes-mcp/processes-mcp-overview.md) is built into the Orchestration Cluster and automatically registers processes as MCP tools when they are deployed with the MCP start event element template.

## Prerequisites

- Access to [Web Modeler](/components/hub/workspace/modeler/launch-modeler.md) or [Desktop Modeler](/components/modeler/desktop-modeler/install-the-modeler.md).
- An Orchestration Cluster running Camunda 8.10 or later.

## Step 1: Add an MCP start event to your process

The MCP start event is an element template from the **AI Tools** category applied to a BPMN message start event. It registers the process as an MCP tool when deployed.

1. Open your BPMN process in Web Modeler or Desktop Modeler.
2. Select the start event (or add a new one).
3. In the properties panel, click the element template picker and select **MCP start event** from the **AI Tools** category.

![A BPMN message start event in Web Modeler with the MCP start event element template applied, showing the properties panel](img/mcp-start-event-modeler.png)

## Step 2: Configure the MCP tool metadata

The properties you fill in become the MCP tool's metadata, which AI agents and LLMs use to decide when and how to call your process.

| Property                  | Required | Description                                                                                                                                                       |
| :------------------------ | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Name**                  | Yes      | The MCP tool identifier used by clients to call this process. Alphanumeric characters, hyphens (`-`), underscores (`_`), and dots (`.`) only; max 100 characters. |
| **What it does**          | Yes      | A plain-language description of the process function, shown to LLMs as tool metadata.                                                                             |
| **Which inputs it needs** | Yes      | A plain-language description of required and optional input parameters, their types, and any constraints.                                                         |
| **When to use**           | No       | Specific situations or user intents that should trigger this tool.                                                                                                |
| **When not to use**       | No       | Conditions or situations where this tool should not be invoked.                                                                                                   |
| **What the tool returns** | No       | The outcomes, results, and variable names the process produces on completion.                                                                                     |

:::tip Write clear metadata for LLMs
LLMs use the **What it does**, **Which inputs it needs**, **When to use**, and **When not to use** fields to decide whether to call your tool and what arguments to pass. Write these fields in plain language as if explaining the process to a colleague. Vague or incomplete metadata leads to incorrect tool selection or missing arguments.
:::

## Step 3: Design the process body

The rest of the process runs as normal after the MCP start event. When an MCP client calls the tool:

1. The Processes MCP Server starts a new process instance with the tool call arguments mapped as process variables.
2. The server immediately returns the started process instance key to the MCP client.

:::tip Align LLM inputs with process variables
You can map the incoming tool call arguments from the LLM to the process variables your process expects using **Output mapping**. If you don't define any explicit output mapping, all incoming tool call arguments become process variables with the same names.
:::

## Step 4: Deploy the process

Deploy the process to your Orchestration Cluster. On deployment, the Processes MCP Server automatically registers the process as an MCP tool using the metadata you configured.

:::note Version binding
Only the latest deployed version of a process is exposed as an MCP tool. If you redeploy the process with a changed interface, existing MCP clients holding a cached reference to the old tool will receive a stale-tool error and must re-fetch the tool list. See [Version binding](/apis-tools/processes-mcp/processes-mcp-version-binding.md) for more details.
:::

## Step 5: Connect an MCP client

Connect any MCP-compliant client to the Processes MCP Server. See [Enable and connect](/apis-tools/processes-mcp/processes-mcp-setup.md) for endpoint URLs, authentication options, and `c8ctl mcp-proxy` configuration.

## Observability

After deploying, you can verify that your process is registered as an MCP tool in the Orchestration Cluster admin UI. See [MCP Processes](/self-managed/components/orchestration-cluster/admin/mcp-processes.md).
