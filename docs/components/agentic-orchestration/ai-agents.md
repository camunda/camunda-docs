---
id: ai-agents
title: AI agents
description: "Start building and integrating AI agents into your end-to-end processes. An AI agent is a software program that autonomously gathers data and carries out tasks using this information, independently or on behalf of another system or person."
keywords: ["agentic ai", "AI agents"]
---

import ExampleImg from './img/ao-example-integration.png';
import AgentImg from './img/ao-ai-agent.png';

Start building and integrating AI agents into your end-to-end processes.

## About AI agents

<p><img src={AgentImg} title="An AI agent in a process" alt="An AI agent in a process"  className="img-transparent" style={{border:0,padding:0,paddingLeft:30,paddingTop:10,margin:0,marginLeft:10,float: 'right', width: '45%'}}/>An AI agent is a software program that autonomously gathers data and carries out tasks using this information, independently or on behalf of another system or person.</p>

- AI agents can perform a variety of functions, including making decisions, solving problems, interacting with external environments, and taking actions.

- For example, you can use an AI agent to select and execute tasks within an ad-hoc sub-process, by evaluating the current process context and determining the relevant tasks and tools to use in response.

## AI agent integration features

Use the following Camunda 8 features to integrate AI agents into your processes:

| Type                | Feature                                                                                                                             | Description                                                                                                                                                                                                                |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **BPMN subprocess** | [Ad-hoc sub-process](/components/modeler/bpmn/ad-hoc-subprocesses/ad-hoc-subprocesses.md)                                           | A special kind of embedded subprocess with an ad-hoc marker that allows a small part of your process decision-making to be handed over to a human or agent.                                                                |
| **Connector**       | [AI agent connector](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent.md)                                        | Enables AI agents to integrate with an LLM to provide interaction and reasoning capabilities. Use with an ad-hoc sub-process in a feedback loop to provide automated user interaction and tool selection.                  |
| **Connector**       | [MCP Client connector](/components/early-access/alpha/mcp-client/mcp-client.md) _(early access)_                                    | Allows connecting an AI agent connector to tools exposed by [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) servers.                                                                                      |
| **Connector**       | [Ad-hoc tools schema resolver connector](/components/connectors/out-of-the-box-connectors/agentic-ai-ahsp-tools-schema-resolver.md) | Can be used independently with other AI connectors for direct LLM interaction. Useful if you don’t want to use the AI agent connector but still want to resolve tools for an ad-hoc sub-process or debug tool definitions. |
| **Connector**       | [Vector database connector](/components/connectors/out-of-the-box-connectors/embeddings-vector-db.md)                               | Allows embedding, storing, and retrieving LLM embeddings. Use this for building AI-based solutions such as context document search, long-term memory for LLMs, and agentic AI interaction.                                 |

## Integrate an AI agent into your process

A common model for AI agent integration uses an ad-hoc sub-process and AI agent connector in a [tools feedback loop](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-example.md).

In this model, an AI agent is defined using an AI agent connector, with the tools available to the agent defined in an ad-hoc sub-process. The AI agent is able to understand the context and process goal, and uses the available tools to complete the goal.

<p><img src={ExampleImg} title="Example AI agent integration diagram" alt="Get started" className="img-800"/></p>

:::tip
Learn more about this model in the [example AI Agent connector integration](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-example.md) and [guide to adding a tool for an AI agent](https://camunda.com/blog/2025/05/guide-to-adding-tool-ai-agent/).
:::

:::info further resources

Learn more about building and integrating AI agents in Camunda 8:

- [Building Your First AI Agent in Camunda](https://camunda.com/blog/2025/02/building-ai-agent-camunda/)
- [Intelligent by Design: A Step-by-Step Guide to AI Task Agents in Camunda](https://camunda.com/blog/2025/05/step-by-step-guide-ai-task-agents-camunda/)
- [Artificial Intelligence (AI) Agents: What You Need to Know](https://camunda.com/blog/2024/08/ai-agents-what-you-need-to-know/)
- [Camunda AI agents](https://camunda.com/blog/tag/ai-agent/)

:::
