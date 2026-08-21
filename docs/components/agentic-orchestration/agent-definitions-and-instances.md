---
id: agent-definitions-and-instances
title: Agent definitions and instances
sidebar_label: Definitions and instances
description: "Understand agent definitions and agent instances, the entities Camunda uses to model AI agents."
keywords: ["agentic ai", "AI agents", "agent definition", "agent instance"]
---

Understand agent definitions and agent instances, the entities Camunda uses to model AI agents.

## About

Camunda models AI agents using the same definition-and-instance relationship as [processes](/components/concepts/processes.md).

An **agent definition** describes a deployed agent, while an **agent instance** represents a specific running execution of that agent.

### Why definitions and instances are separate

An AI agent is not the same as the BPMN element that defines it, and it does not have the same lifecycle as an element instance.

- A single agent element defines one agent, whether it is an [AI Agent Sub-process](/reference/glossary.md#ad-hoc-sub-process), an [AI Agent Task](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent.md), or an [external agent](/reference/glossary.md#external-agent).
- Each time the process activates that element, Camunda creates an element instance.
- The agent instance can be **reused across several element instances** within the same process instance.

For example, in a process where the execution returns to the agent element after a user reply, the agent element is activated more than once. Each activation is a separate element instance, but they share the same agent instance so the agent keeps its memory and continues the same conversation.
This reuse is what allows an agent to hold a multi-turn conversation across a loop in the process.

## Agent definitions

An AI agent definition is a first-class, queryable resource that Camunda creates when you deploy a process containing one or more agents. Use the [Agent Definition API](/apis-tools/orchestration-cluster-api-rest/specifications/get-agent-definition.api.mdx) to get an agent definition by key, or the [search endpoint](/apis-tools/orchestration-cluster-api-rest/specifications/search-agent-definitions.api.mdx) to list agent definitions filtered by any of their properties.

Camunda creates one agent definition per agent element in a deployed process, analogous to how a [DRD](/reference/glossary.md#drd-decision-requirements-diagram) deployment creates one decision definition per decision. An agent definition is a **structural descriptor** of the agent, not a store of its runtime configuration.

An agent definition is bound to a specific process definition version. Deploying a new version of a process creates a new agent definition for each of its agent elements, in the same way that each process version has its own process definition. With agent definitions, you can inventory the agents deployed to your cluster, aggregate per-agent metrics in Optimize, and confirm that an agent exists before starting one of its instances.

### What an agent definition contains

An agent definition contains the following data:

| Property                      | Description                                                                                                                                                                                                       |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `agentDefinitionKey`          | The unique key for this agent definition. A new key is assigned for the same process element on every process definition version.                                                                                 |
| `agentType`                   | The [agent type](/components/agentic-orchestration/ai-agents.md#agent-types): either a [Camunda AI agent](/reference/glossary.md#camunda-ai-agent) or an [external agent](/reference/glossary.md#external-agent). |
| `name`                        | The human-readable name of the process element that owns the agent definition. Falls back to `elementId` when the element has no BPMN name configured.                                                            |
| `elementId`                   | The BPMN element ID of the process element that owns the agent definition.                                                                                                                                        |
| `processDefinitionId`         | The BPMN process ID of the process definition that owns the agent definition.                                                                                                                                     |
| `processDefinitionKey`        | The key of the process definition that owns the agent definition.                                                                                                                                                 |
| `processDefinitionVersion`    | The version of the process definition that owns the agent definition.                                                                                                                                             |
| `processDefinitionVersionTag` | The version tag of the process definition that owns the agent definition.                                                                                                                                         |
| `tenantId`                    | The tenant ID of this agent definition.                                                                                                                                                                           |

### Mark an element as an agent

For Camunda to recognize an element as an agent, the element **must be marked** in the BPMN model with the `zeebe:agentDefinition` extension element.

If you model in Camunda Modeler, the element templates add the marker for you:

- **[Camunda AI agents](/reference/glossary.md#camunda-ai-agent)**: The AI Agent Sub-process and AI Agent Task templates add the marker.
- **[External agents](/reference/glossary.md#external-agent)**: The External Agent template adds the marker.

If you model outside Camunda Modeler, add the marker to the BPMN XML yourself.

#### Mark an element as an agent in XML

The marker is an extension element on the [ad-hoc sub-process](/components/modeler/bpmn/ad-hoc-subprocesses/ad-hoc-subprocesses.md) or [service task](/components/modeler/bpmn/service-tasks/service-tasks.md) that hosts the agent. Its `agentType` attribute declares the [agent type](#what-an-agent-definition-contains), and accepts `aiAgentSubProcess`, `aiAgentTask`, or `external`.

An AI Agent Sub-process marked as an agent:

```xml
<bpmn:adHocSubProcess id="research-agent" name="Research agent">
  <bpmn:extensionElements>
    <zeebe:agentDefinition agentType="aiAgentSubProcess" />
  </bpmn:extensionElements>
</bpmn:adHocSubProcess>
```

An external agent marked as an agent:

```xml
<bpmn:serviceTask id="research-agent" name="Research agent">
  <bpmn:extensionElements>
    <zeebe:agentDefinition agentType="external" />
  </bpmn:extensionElements>
</bpmn:serviceTask>
```

### Reuse an agent across processes

To reuse the same agent across multiple process definitions, use a [call activity](/components/modeler/bpmn/call-activities/call-activities.md). Place the agent in one process definition and call it from the [parent process instances](/reference/glossary.md#parent-process-instance). This produces a single agent definition for the reused agent, so its metrics aggregate into one registry entry.

Duplicating the same BPMN element directly across several process definitions creates a separate agent definition for each copy, with no cross-definition aggregation.

## Agent instances

An agent instance is a specific runtime execution of an agent definition that can be created for an active agent element. It is identified by an agent instance key, which the [Agent Instance API](/apis-tools/orchestration-cluster-api-rest/specifications/get-agent-instance.api.mdx) uses to represent the agent's state, including conversation, tool calls, and reasoning, for visibility and explainability in tools like Operate.

This representation is not the source of truth for the agent's runtime execution; how an agent's actual state is stored depends on its type, as described in [Agent context and memory](#agent-context-and-memory).

For [Camunda AI agents](/reference/glossary.md#camunda-ai-agent), both the AI agent Sub-process and AI Agent Task types, the AI Agent connector automatically creates the agent instance through the [Agent Instance API](/apis-tools/orchestration-cluster-api-rest/specifications/create-agent-instance.api.mdx) as the first step in handling the job for an active agent element. For [external agents](/reference/glossary.md#external-agent), the external runtime creates the instance itself by calling the same API, which can happen at any point while the element is active.

You can reuse an agent instance across multiple element instances within the same process instance, allowing the agent to maintain a multi-turn conversation when the process loops back to it.

Use the [search endpoint](/apis-tools/orchestration-cluster-api-rest/specifications/search-agent-instances.api.mdx) to list agent instances filtered by any of their properties, including their agent definition key. For example, you can find every runtime instance created from a specific process definition version.

### Agent context and memory

For [Camunda AI agents](/reference/glossary.md#camunda-ai-agent), the AI Agent connector keeps the agent's runtime state in an agent context object. The context holds the conversation, tool calls and their results, reasoning traces, and metadata such as token usage. It also records the agent instance key, which links the context back to its agent instance.

[External agents](/reference/glossary.md#external-agent) don't use this agent context. Their runtime manages the agent's actual state independently of Camunda, and reports only what it chooses through the [Agent Instance API](/apis-tools/orchestration-cluster-api-rest/specifications/create-agent-instance.api.mdx) for visibility.

By default, the agent context is stored as a process variable, typically named `agent`, and is available both on the agent element and on the process instance. When the process returns to the agent element, the agent evaluates a FEEL expression (for example, `agent.context`) to load the existing context and continue the conversation with the same agent instance.

You control this behavior through the agent's memory configuration:

- **Reuse the context** to continue an existing conversation. The process passes the stored context back to the agent element, and the same agent instance handles each activation.
- **Start with a fresh context** on each activation. The agent element receives an empty context, so Camunda creates a new agent instance every time the element is entered, and no memory carries over.

Where the context is stored depends on the memory storage type. See [memory](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-subprocess.md#memory) for more details.

### Data available in Operate

Operate surfaces agent instance data so you can monitor an agent as part of its process instance. See [monitor your AI agents with Operate](/components/agentic-orchestration/evaluate-agents/monitor-ai-agents.md) for a hands-on guide to inspecting this data.

The following data is available for an agent instance in Operate:

| Data                 | Description                                                                                                                                                                                                                                                                                                            |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Agent instance key   | The unique identifier of the agent instance. Use it to look up or interact with the agent through the [Agent Instance API](/apis-tools/orchestration-cluster-api-rest/specifications/create-agent-instance.api.mdx).                                                                                                   |
| Agent state          | The current execution state of the agent, such as initializing, tool discovery, thinking, tool calling, or idle. The state is also highlighted on the BPMN diagram. See [states](/components/agentic-orchestration/agent-states-and-metrics.md#agent-states) for what each state means and what triggers a transition. |
| Usage metrics        | Token consumption, tool call count, and model call count. Model calls are shown against the configured limit, so you can see how close the agent is to its limit. See [usage metrics](/components/agentic-orchestration/agent-states-and-metrics.md#usage-metrics) for details.                                        |
| Model                | The LLM the agent is running against.                                                                                                                                                                                                                                                                                  |
| System prompt        | The system prompt the agent was configured with.                                                                                                                                                                                                                                                                       |
| Tool definitions     | The [tools](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-tool-definitions.md) available to the agent, resolved from the agent's ad-hoc sub-process.                                                                                                                                             |
| Conversation history | The decision trail of the agent execution: initial configuration, user prompts, assistant messages, the tools the agent selected with its reasoning, and tool calls with their inputs and results.                                                                                                                     |

#### Conversation history and loop iterations

The conversation history captures the full reasoning chain of an agent execution, grouped by loop iteration. A loop iteration is one pass through the agent's feedback loop: the model reasons over the current messages, optionally calls tools, and receives the tool results that become the input for the next loop iteration.

Grouping the history by loop iteration makes it easier to reference a specific point in an agent's execution. Rather than describing a moment in time, you can refer to a specific loop iteration, for example "on loop iteration five the agent called this tool."

Operate labels each entry in the conversation history simply as `iteration` (for example, `5. iteration`) as shorthand for loop iteration.

#### Visibility for external agents

Agents built with external frameworks get the same visibility in Operate as Camunda AI agents. An external agent reports its system prompt, available tools, tool calls, and conversation history through the [Agent Instance API](/apis-tools/orchestration-cluster-api-rest/specifications/create-agent-instance.api.mdx), and Operate displays that data alongside the process instance.
