---
id: agentic-ai-aiagent-migration
sidebar_label: Process instance migration
title: AI Agent process instance migration
description: Learn which process instance migration scenarios are supported for running AI Agent connector instances, and how to handle changed tool definitions.
---

Learn which process instance migration scenarios are supported for running AI Agent connector instances.

:::warning

Process instance migration is a powerful feature that should be used with caution. [Use at your own risk](../../concepts/process-instance-migration.md#use-at-your-own-risk).

:::

Because AI agent implementations are closely tied to the underlying process definition that determines which tools are available, carefully consider the impact of applying [process instance migrations](../../concepts/process-instance-migration.md) to instances using the AI Agent connector while the agent is mid‑conversation. As a result, some migration scenarios are not supported.

## Supported migration scenarios

The following migration scenarios are supported for running AI Agent process instances:

| Migration scenario                                              | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| :-------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Adding a new tool                                               | Adding a new activity to the ad-hoc sub-process. The new tool is picked up on the next AI Agent execution and added to the agent context.                                                                                                                                                                                                                                                                                                                                  |
| Changing an existing tool without affecting the tool definition | For example, updating a form linked to a user task, or changing a script task implementation. No agent changes are necessary because the tool definition remains unchanged.                                                                                                                                                                                                                                                                                                |
| Changing an existing tool definition                            | Updating a tool's description or `fromAi()` parameters is supported, but proceed carefully. See [Considerations when changing tool definitions](#considerations-when-changing-tool-definitions) for details.                                                                                                                                                                                                                                                               |
| Changing AI Agent configuration (AI Agent Task only)            | Updating the system prompt or model parameters on an [AI Agent Task](./agentic-ai-aiagent-task.md). These changes are picked up on the next execution as input mappings are re-evaluated for each loop iteration. This is **not supported** for the [AI Agent Sub-process](./agentic-ai-aiagent-subprocess.md) implementation because the parameters are applied via input mappings to the ad-hoc sub-process which are evaluated only once when entering the sub-process. |

## Unsupported migration scenarios

The following migration scenarios are **not supported** and will result in an error:

| Migration scenario                                                                                                                            | Description                                                                                                                                                                                                                                                                                             |
| :-------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Removing or renaming tools                                                                                                                    | Removing an existing tool or changing its element ID can lead to stuck executions or validation errors if the agent references tools that no longer exist. The agent throws a `MIGRATION_MISSING_TOOLS` error when it detects a removed tool.                                                           |
| Adding or removing [gateway tool definitions](./agentic-ai-aiagent-tool-definitions.md#gateway-tool-definitions) (such as MCP or A2A clients) | Gateway tools require a tool discovery flow during initialization. Adding or removing gateway tool definitions to a running agent is not supported as it would require re-executing tool discovery. The agent throws a `MIGRATION_GATEWAY_TOOL_DEFINITIONS_CHANGED` error when it detects such changes. |

## Considerations when changing tool definitions

:::info
When you change an existing tool definition (such as updating a tool's description or adding/modifying `fromAi()` parameters), the AI Agent detects the change and updates its tool definitions on the next execution.
:::

Because a migration can occur between an AI Agent execution and the actual tool call, tools may receive parameters based on the previous definition. Ensure your tool implementations handle this scenario gracefully.

- **Description changes**: Updates to tool or parameter descriptions take effect on the next AI Agent execution. The LLM uses the updated descriptions when deciding which tools to call.
- **Parameter changes**: Adding, removing, or modifying `fromAi()` parameters is supported. However, the tool implementation must handle potentially missing or changed parameters.

For example:

- A script task should implement a null-check to return an error message if a newly required parameter is missing from an in-flight tool call.
- When changing an input parameter from a numeric type to a complex type (such as an object), the implementation should handle cases where the parameter is still provided using the numeric type.

When a tool receives a parameter in a different format than expected, it can either handle the situation gracefully (for example, by using a default value or converting to a suitable format), or return an actionable error message that can instruct the LLM to provide the correct parameters.
