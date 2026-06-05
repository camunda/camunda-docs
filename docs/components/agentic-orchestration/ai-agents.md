---
id: ai-agents
title: AI agents
description: "Start building and integrating AI agents into your end-to-end processes. An AI agent is a software program that autonomously gathers data and carries out tasks using this information, independently or on behalf of another system or person."
keywords: ["agentic ai", "AI agents"]
---

import ExampleImg from '../connectors/img/ai-agent-subprocess.png';
import AgentImg from './img/ao-ai-agent.png';

Start building and integrating AI agents into your end-to-end processes.

## About AI agents

<p><img src={AgentImg} title="An AI agent in a process" alt="An AI agent in a process"  className="img-transparent" style={{border:0,padding:0,paddingLeft:30,paddingTop:10,margin:0,marginLeft:10,float: 'right', width: '45%'}}/>An AI agent is a software program that autonomously gathers data and carries out tasks using this information, independently or on behalf of another system or person.</p>

AI agents can perform a variety of functions, including making decisions, solving problems, interacting with external environments, and taking actions.

For example, you can use an AI agent to select and execute tasks within an ad-hoc sub-process, by evaluating the current process context and determining the relevant tasks and tools to use in response.

## AI Agent connector

The [AI Agent connector](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent.md) is the primary Camunda connector for building AI agents. It integrates an LLM with your BPMN process, enabling the agent to reason over context, select tools, and respond to users or process events.

Key capabilities include:

- **LLM provider support**: Connects to a range of providers, such as Anthropic, Amazon Bedrock, Google Gemini, and OpenAI.
- **Tool calling**: Exposes BPMN activities inside an [ad-hoc sub-process](/components/modeler/bpmn/ad-hoc-subprocesses/ad-hoc-subprocesses.md) as tools the LLM can call and execute.
- **Memory**: Short-term conversational memory enables multi-turn interactions and follow-up questions within a process instance.

### How the feedback loop works

The AI Agent connector operates in a feedback loop between the LLM and Camunda:

1. A user prompt is sent to the connector. The LLM evaluates the prompt, the system prompt, and the available tool definitions.
1. If the LLM determines that a tool call is needed, Camunda activates the corresponding BPMN activity in the ad-hoc sub-process.
1. The tool result is passed back to the LLM, which decides whether more tool calls are needed.
1. The loop continues until the LLM returns a final response, which can then be routed to the next step in the process.

Decision-making and execution are intentionally split:

- **LLM decides**: Which tool to call next, in what order, and with which parameters.
- **Camunda orchestrates**: Executes the selected BPMN activity, stores variables, applies retries and incident handling, and routes human tasks and events.

### Choose an implementation

The connector is available in two variants suited for different use cases:

| Implementation                                                                                            | Best for                   | Description                                                                                                                                                           |
| :-------------------------------------------------------------------------------------------------------- | :------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [AI Agent Sub-process](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-subprocess.md) | Most use cases             | Handles tool resolution and the feedback loop automatically inside an ad-hoc sub-process. **Recommended for the majority of agentic workflows.**                      |
| [AI Agent Task](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-task.md)              | Advanced or one-shot tasks | Uses a service task with a manually modeled feedback loop. Use this when you need to intercept tool calls, add approval steps, or perform a simple one-shot LLM call. |

:::tip
See the [AI Agent connector](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent.md) documentation for full configuration details, implementation examples, and reference.
:::

## Why tool documentation in ad-hoc sub-processes matters

In an AI agent model, each BPMN activity inside an ad-hoc sub-process is effectively a tool exposed to the LLM.
The activity name and its documentation are used by the LLM to decide what to do next.

Clear, behavior-oriented descriptions help the LLM:

- Select the right tool for the current goal.
- Pass the right parameters in the expected format.
- Avoid unsafe, redundant, or nonsensical actions.

Poor or missing documentation increases the risk of:

- Incorrect or ambiguous tool selection.
- Repeated tool calls or skipped required steps.
- Hallucinated behavior and responses that do not match process intent.

### Example: weak vs strong tool definition

| Tool definition | Example                                                                                                                                                                                                                                           |
| :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Weak            | **Name**: `Lookup`<br/>**Documentation**: `Find customer data`                                                                                                                                                                                    |
| Strong          | **Name**: `Resolve customer by legal company name`<br/>**Documentation**: `Use this tool when a document mentions a company and you need its internal customer ID. If multiple matches are returned, request human validation before continuing.` |

A clear tool name and precise documentation make the expected behavior explicit, improving reliability during tool selection and execution.

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

## Integrate an AI agent into your process

A common model for AI agent integration uses an ad-hoc sub-process and AI Agent connector in a [tools feedback loop](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-subprocess-example.md).

In this model, an AI agent is defined using an AI Agent connector, with the tools available to the agent defined in an ad-hoc sub-process. The AI agent is able to understand the context and process goal, and uses the available tools to complete the goal.

<p><img src={ExampleImg} title="Example AI agent integration diagram" alt="Get started" className="img-700"/></p>

:::tip
Learn more about this model in the [example AI Agent Sub-process connector integration](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-subprocess-example.md) and [guide to adding a tool for an AI agent](https://camunda.com/blog/2025/05/guide-to-adding-tool-ai-agent/).
:::

:::info further resources

Learn more about building and integrating AI agents in Camunda 8:

- [Building Your First AI Agent in Camunda](https://camunda.com/blog/2025/05/step-by-step-guide-ai-task-agents-camunda/)
- [Test your AI agents](/components/agentic-orchestration/evaluate-agents/test-ai-agents.md)
- [Intelligent by Design: A Step-by-Step Guide to AI Task Agents in Camunda](https://camunda.com/blog/2025/05/step-by-step-guide-ai-task-agents-camunda/)
- [Artificial Intelligence (AI) Agents: What You Need to Know](https://camunda.com/blog/2024/08/ai-agents-what-you-need-to-know/)
- [Camunda AI agents](https://camunda.com/blog/tag/ai-agent/)

:::
