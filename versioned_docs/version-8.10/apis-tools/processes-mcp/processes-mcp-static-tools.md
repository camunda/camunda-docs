---
id: processes-mcp-static-tools
title: "Static tools"
sidebar_label: "Static tools"
description: "Static tools always available on the Processes MCP Server for inspecting running process instances."
---

The Processes MCP Server exposes the following static tools alongside dynamically registered process tools.

These tools let an MCP agent inspect the process instance it just started, including its variables, state, and incidents, without switching to a different MCP server.

| Tool                 | Description                                                 |
| :------------------- | :---------------------------------------------------------- |
| `searchVariables`    | Search and inspect variables of a running process instance. |
| `getProcessInstance` | Retrieve the state and details of a process instance.       |
| `searchIncidents`    | Inspect incidents raised on a running process instance.     |

:::note
These tools are a subset of the [Orchestration Cluster MCP Server tools](../orchestration-cluster-api-mcp/orchestration-cluster-api-mcp-tools.md). Refer to that page for full parameter and response schema details.
:::
