---
id: ai-agents
title: AI agents
description: "Build and integrate AI agents into your end-to-end processes. "
keywords: ["agentic ai", "AI agents"]
---

import ExampleImg from '../connectors/img/ai-agent-subprocess.png';

Build and integrate AI agents into your end-to-end processes.

## About AI agents

An AI agent is an addressable execution of an LLM-driven loop with shared memory context across iterations. An agent runs a loop where the model decides what to do next, which tools to invoke, and when to stop — the loop is what makes it an agent. A standalone LLM call with no loop and no autonomous tool selection, such as a single connector call that returns output along a fixed execution path, is not an agent.

AI agents can perform a variety of functions, including making decisions, solving problems, interacting with external environments, and taking actions.

Camunda supports two types of agents:

- **Camunda AI agents** are native: tool orchestration is executed by Camunda's engine, which activates each tool call as a governed BPMN activity, maintains memory across iterations, and emits lifecycle events. The rest of this page describes how to build a Camunda AI agent using the AI Agent connector.
- **External agents** run their loop in an external runtime (for example, LangGraph, Amazon Bedrock, or custom code) instead of Camunda's engine. See [External agents](#external-agents) below.

### External agents

An external agent's tool orchestration runs outside Camunda — the loop lives in the external runtime, not in Camunda's engine. Camunda orchestrates when and how the agent acts within the broader process, and observes its execution through the [Agent Instance API](/apis-tools/orchestration-cluster-api-rest/specifications/create-agent-instance.api.mdx), even though it does not execute the agent's reasoning loop itself. The process record, governance, and audit trail for that participation live in Camunda.

External agents are not Camunda AI agents. Both are AI agents, but "Camunda AI agent" refers specifically to the native type described in this guide.

## The AI Agent connector

The AI Agent connector is the primary Camunda connector for building Camunda AI agents. It integrates an LLM with your BPMN process, enabling the agent to reason over context, select tools, and respond to users or process events.

Key capabilities include:

- **LLM provider support**: Connects to a range of providers, such as Anthropic, Amazon Bedrock, Google Gemini, and OpenAI.
- **Tool calling**: Exposes BPMN activities inside an [ad-hoc sub-process](/reference/glossary.md#ad-hoc-sub-process) as tools the LLM can select.
- **Memory**: Short-term conversational memory enables multi-turn interactions and follow-up questions within a process instance.

See the [AI Agent connector](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent.md) documentation for full configuration details, implementation examples, and reference.

### Integrate an AI agent into your process

The recommended approach for most use cases is to use the [AI Agent Sub-process](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-subprocess.md) implementation due to its simplified configuration and support for event sub-processes.

In this approach, you integrate the agent using an [ad-hoc sub-process](/components/modeler/bpmn/ad-hoc-subprocesses/ad-hoc-subprocesses.md) and the AI Agent connector in a tool feedback loop, where the agent understands the process goal and uses the available tools to complete it.

<p><img src={ExampleImg} title="Example AI agent integration diagram" alt="Example AI agent integration diagram" className="img-700"/></p>

#### How the feedback loop works

The AI Agent connector operates in a feedback loop between the LLM and Camunda:

1. A user prompt is sent to the connector. The LLM evaluates the prompt, the system prompt, and the available tool definitions.
1. If the LLM determines that a tool call is needed, Camunda activates the corresponding BPMN activity in the ad-hoc sub-process.
1. The tool result is passed back to the LLM, which decides whether more tool calls are needed.
1. The loop continues until the LLM returns a final response, which can then be routed to the next step in the process.

Decision-making and execution are intentionally split:

- **LLM decides**: Which tool to call next, in what order, and with which parameters.
- **Camunda orchestrates**: Executes the selected BPMN activity, stores variables, applies retries and incident handling, and routes human tasks and events.

:::tip
Learn more in the [example AI Agent Sub-process connector integration](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-subprocess-example.md) and [guide to adding a tool for an AI agent](https://camunda.com/blog/2025/05/guide-to-adding-tool-ai-agent/).
:::

## AI agent integration features

Use the following Camunda 8 features to integrate AI agents into your processes:

<table className="table-callout">
<tr>
    <td width="30%">**Feature**</td>
    <td>**Description**</td>
</tr>
<tr>
    <td>[Ad-hoc sub-process](/components/modeler/bpmn/ad-hoc-subprocesses/ad-hoc-subprocesses.md)</td>
    <td>A special kind of embedded BPMN subprocess with an ad-hoc marker that allows a small part of your process decision-making to be handed over to a human or agent.</td>
</tr>
<tr>
    <td>[AI Agent connector](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent.md)</td>
    <td>Enables AI agents to integrate with an LLM to provide interaction/reasoning capabilities. This connector is designed for use with an ad-hoc sub-process in a feedback loop, providing automated user interaction and tool selection.</td>
</tr>
<tr>
    <td>[MCP Client connector](/components/connectors/out-of-the-box-connectors/agentic-ai-mcp-client.md)</td>
    <td>Connect an AI agent connector to tools exposed by [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) servers.</td>
</tr>
<tr>
    <td>[Ad-hoc tools schema resolver connector](/components/connectors/out-of-the-box-connectors/agentic-ai-ahsp-tools-schema-resolver.md)</td>
    <td>Can be used independently with other AI connectors for direct LLM interaction. Use this connector if you don't want to use the AI agent connector but still want to resolve tools for an ad-hoc sub-process or debug tool definitions.</td>
</tr>
<tr>
    <td>[Vector database connector](/components/connectors/out-of-the-box-connectors/embeddings-vector-db.md)</td>
    <td>Allows embedding, storing, and retrieving LLM embeddings. Use this connector to build AI-based solutions such as context document search, long-term memory for LLMs, and agentic AI interaction.</td>
</tr>
</table>
