---
id: orchestration-cluster-api-mcp-tools
title: "Available tools"
sidebar_label: "Available tools"
description: "List of MCP tools exposed by the Orchestration Cluster MCP Server."
---

The following tools are available through the Orchestration Cluster MCP server, grouped by domain.

:::info
Tool names, parameters, and response schemas are fully discoverable by MCP clients at runtime. The exact tool signatures may evolve across versions.
:::

## Cluster

| Tool               | Description                                                                           |
| :----------------- | :------------------------------------------------------------------------------------ |
| `getClusterStatus` | Returns whether the cluster is healthy (at least one partition has a healthy leader). |
| `getTopology`      | Returns cluster topology including brokers, partitions, roles, health, and versions.  |

## Incidents

| Tool              | Description                                                                                                                                 |
| :---------------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| `searchIncidents` | Search incidents with filters such as state, error type, element ID, creation time range, process definition key, and process instance key. |
| `getIncident`     | Retrieve an incident by key.                                                                                                                |
| `resolveIncident` | Resolve an incident. For job-related incidents, job retries are automatically updated.                                                      |

## Process definitions

| Tool                       | Description                                                   |
| :------------------------- | :------------------------------------------------------------ |
| `searchProcessDefinitions` | Search process definitions with filters such as name and key. |
| `getProcessDefinition`     | Retrieve a process definition by key.                         |
| `getProcessDefinitionXml`  | Retrieve the BPMN XML of a process definition.                |

## Process instances

| Tool                     | Description                                                                      |
| :----------------------- | :------------------------------------------------------------------------------- |
| `searchProcessInstances` | Search process instances with filters.                                           |
| `getProcessInstance`     | Retrieve a process instance by key.                                              |
| `createProcessInstance`  | Create a new process instance, optionally with variables or awaiting completion. |

## User tasks

| Tool                      | Description                                                                         |
| :------------------------ | :---------------------------------------------------------------------------------- |
| `searchUserTasks`         | Search user tasks with filters such as assignee, state, and process definition key. |
| `getUserTask`             | Retrieve a user task by key.                                                        |
| `assignUserTask`          | Update the assignment of a user task.                                               |
| `searchUserTaskVariables` | Search variables scoped to a specific user task.                                    |

## Variables

| Tool              | Description                    |
| :---------------- | :----------------------------- |
| `searchVariables` | Search variables with filters. |
| `getVariable`     | Retrieve a variable by key.    |
