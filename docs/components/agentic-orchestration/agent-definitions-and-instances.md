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

An agent is not the same as the BPMN element that hosts it, and it does not have the same lifecycle as an element instance.

- A single [AI agent sub-process](/reference/glossary.md#ad-hoc-sub-process) or [AI Agent Task](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent.md) element defines one agent.
- Each time the process activates that element, Camunda creates an agent instance.
- The agent definition can be **reused across several agent instances** within the same process instance.

For example, in a process where the flow returns to the agent element after a user reply, the agent element is activated more than once. Each activation is a separate agent instance, but they share the same agent definition so the agent keeps its memory and continues the same conversation.
This reuse is what allows an agent to hold a multi-turn conversation across a loop in the process.

## Agent definitions

An agent definition is a first-class, queryable resource that Camunda creates when you deploy a process containing one or more agents.

Camunda creates one agent definition per agent element in a deployed process, analogous to how a DMN deployment creates one decision definition per decision. An agent definition is a **structural descriptor** of the agent, not a store of its runtime configuration.

An agent definition identifies an agent across process versions through a stable agent definition key. With this key, you can inventory deployed agents, aggregate per-agent metrics in Optimize, and confirm that an agent exists before starting one of its instances.

### What an agent definition contains

An agent definition contains the following data:

- **Agent definition key**: Stable identifier for the agent across process definition versions.
- **Agent type**: One of ad-hoc sub-process, AI Agent Task, or external agent.
- **Name**: Human-readable name of the agent element.
- **Process definition key**: The process definition the agent belongs to.
- **Tenant**: The tenant the agent definition belongs to.

The system prompt and model are [FEEL expressions](/components/modeler/feel/what-is-feel.md) evaluated when an instance is created. They are not stored in the agent definition, because they can resolve to different values for each instance.

### Agent types

Camunda creates an agent definition for each of the following agent types:

| Agent type           | How it is defined                                                                                                                          |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| AI agent sub-process | An [AI Agent Sub-process](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-subprocess.md) using the AI Agent connector. |
| AI Agent Task        | An [AI Agent Task](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent.md) service task using the AI Agent connector.      |
| External agent       | An [external agent](/reference/glossary.md#external-agent) that runs its loop in an external runtime, such as LangGraph or CrewAI.         |

For an element to be recognized as an agent, it **must be marked** in the BPMN model with the `zeebe:agentDefinition` extension element. This works differently depending on your agent type:

1. **Native agents**: Camunda's own AI Agent connector templates add this marker for you.
2. **External agents**: You must add the marker explicitly so that Camunda registers it as an agent.

### Reuse an agent across processes

To reuse the same agent across multiple process definitions, use a [call activity](/components/modeler/bpmn/call-activities/call-activities.md). Place the agent in one process definition and call it from the parent processes. This produces a single agent definition for the reused agent, so its metrics aggregate into one registry entry.

Duplicating the same element template directly across several process definitions creates a separate agent definition for each copy, with no cross-definition aggregation.

## Agent instances

An agent instance is a specific runtime execution of an agent, created when a process instance first activates the agent element.

When an agent instance is created, Camunda generates an agent instance key that identifies it. For [Camunda AI agents](/reference/glossary.md#camunda-ai-agent), the engine creates the instance. For [external agents](/reference/glossary.md#external-agent), the external runtime creates it by calling the [Agent Instance API](/apis-tools/orchestration-cluster-api-rest/specifications/create-agent-instance.api.mdx).

### Agent context and memory

An agent instance keeps its state in an agent context object. The context holds the conversation, tool calls and their results, reasoning traces, and metadata such as token usage. It also records the agent instance key, which links the context back to its agent instance.

By default, the agent context is stored as a process variable, typically named `agent`, and is available both on the agent element and on the process instance. When the process returns to the agent element, the agent evaluates a FEEL expression (for example, `agent.context`) to load the existing context and continue the conversation with the same agent instance.

You control this behavior through the agent's memory configuration:

- **Reuse the context** to continue an existing conversation. The process passes the stored context back to the agent element, and the same agent instance handles each activation.
- **Start with a fresh context** on each activation. The agent element receives an empty context, so Camunda creates a new agent instance every time the element is entered, and no memory carries over.

Where the context is stored depends on the memory storage type. With **In Process** storage, the full context lives in process variables. With **Camunda Document Storage**, the context is stored as a document and the process variable holds only a reference and metadata. See [memory](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-subprocess.md#memory) for configuration details.

### Data available in Operate

Operate surfaces agent instance data so you can monitor an agent as part of its process instance. See [monitor your AI agents with Operate](/components/agentic-orchestration/evaluate-agents/monitor-ai-agents.md) for a hands-on guide to inspecting this data.

The following data is available for an agent instance in Operate:

| Data                 | Description                                                                                                                                                                 |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Agent state          | The current execution state of the agent, such as initializing, tool discovery, thinking, tool calling, or idle. The state is also highlighted on the BPMN diagram.         |
| Usage metrics        | Token consumption, tool call count, and model call count. Model calls are shown against the configured limit, so you can see how close the agent is to its guardrail.       |
| Model                | The LLM the agent is running against.                                                                                                                                       |
| System prompt        | The system prompt the agent was configured with.                                                                                                                            |
| Conversation history | The decision trail of the agent execution: user prompts, assistant messages, the tools the agent selected with its reasoning, and tool calls with their inputs and results. |

#### Agent states

The agent state tells you whether an agent is actively working or stuck. Camunda exposes agent state through the agent instance record, fed by status updates as the agent runs.

| State          | Meaning                                                                         |
| -------------- | ------------------------------------------------------------------------------- |
| Initializing   | The agent instance is being set up.                                             |
| Tool discovery | The agent is resolving which tools are available to it.                         |
| Thinking       | The agent is reasoning with the model to decide its next step.                  |
| Tool calling   | The agent is calling one or more tools.                                         |
| Idle           | The agent is not currently working, for example while waiting for a user reply. |

#### Conversation history and loops

The conversation history captures the full reasoning chain of an agent execution, grouped by loop. A loop is one pass of the agent's feedback cycle: the model reasons over the current messages, optionally calls tools, and receives the tool results that become the input for the next loop.

Grouping the history by loop makes it easier to reference a specific point in an agent's execution. Rather than describing a moment in time, you can refer to a loop by its iteration, for example "on loop 5 the agent called this tool."

#### Visibility for external agents

Agents built with external frameworks get the same visibility in Operate as Camunda AI agents. An external agent reports its system prompt, available tools, tool calls, and conversation history through the [Agent Instance API](/apis-tools/orchestration-cluster-api-rest/specifications/create-agent-instance.api.mdx), and Operate displays that data alongside the process instance.
