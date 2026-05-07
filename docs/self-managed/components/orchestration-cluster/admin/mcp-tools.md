---
id: mcp-tools
title: MCP tools
sidebar_label: MCP tools
description: "Monitor which processes are registered as MCP tools in the Orchestration Cluster admin UI."
---

The Orchestration Cluster admin UI provides an overview of the processes currently registered as MCP tools in the [Processes MCP Server](/apis-tools/processes-mcp/processes-mcp-overview.md).

## View registered MCP tools

Navigate to **MCP tools** in the Orchestration Cluster admin UI to see all processes currently exposed as MCP tools.

![Admin UI page listing processes registered as MCP tools, showing tool name, process definition key, version, and status](img/mcp-tools-admin.png)

The following information is displayed for each registered tool:

| Column                     | Description                                                                                       |
| :------------------------- | :------------------------------------------------------------------------------------------------ |
| **Tool name**              | The MCP tool identifier configured in the MCP start event element template.                       |
| **Process definition key** | The unique key of the process definition in the Orchestration Cluster.                            |
| **Version**                | The process definition version currently registered. Only the latest deployed version is exposed. |
| **Status**                 | Whether the tool is active and accepting calls.                                                   |

## Troubleshoot

**A process is not appearing after deployment.** Verify that the process was deployed successfully and that the MCP start event element template is applied to the start event. Check for deployment errors in Operate.

**A tool shows an unexpected version.** The Processes MCP Server always exposes the latest deployed version. If a previous version is showing, a newer deployment may have failed. See [Version binding](/apis-tools/processes-mcp/processes-mcp-version-binding.md).
