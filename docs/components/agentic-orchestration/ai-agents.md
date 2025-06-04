---
id: ai-agents
title: Integrate AI agents
description: ""
keywords: ["agentic ai", "AI agents"]
---

import ExampleImg from './img/ao-example-integration.png';

Start building and integrating AI agents into your end-to-end processes.

## About AI agents

An AI agent is a software program that autonomously gathers data and carries out tasks using this information, independently or on behalf of another system or person. 

- AI agents can perform a variety of functions, including making decisions, solving problems, interacting with external environments, and taking actions. 
- For example, you can use an AI agent to select and execute tasks within an ad-hoc sub-process, by evaluating the current process context and determining the relevant tasks and tools to use in response.

## AI agent integration components

Camunda 8 offers the following features to support agentic orchestration and AI agents:

| Feature | Description |
|:-- |:-- |
| [Ad-hoc sub-process](/components/modeler/bpmn/ad-hoc-subprocesses/ad-hoc-subprocesses.md) | A special kind of embedded subprocess with an ad-hoc marker that allows a small part of your process decision-making to be handed over to a human or agent. |
| [AI agent connector](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent.md) | Enables AI agents to integrate with an LLM to provide interaction/reasoning capabilities. This connector is designed for use with an ad-hoc sub-process in a feedback loop, providing automated user interaction and tool selection. |
| [Ad-Hoc Tools Schema Resolver connector](/components/connectors/out-of-the-box-connectors/agentic-ai-ahsp-tools-schema-resolver.md) | Can be used independently in combination with other AI connectors for direct LLM interaction (if you don't want to use the AI Agent connector but still want to resolve tools for an ad-hoc sub-process) and debugging tool definitions. |
| [Vector database connector](/components/connectors/out-of-the-box-connectors/embeddings-vector-db.md) | This connector allows embedding, storing, and retrieving Large Language Model (LLM) embeddings. Use for building AI-based solutions, such as context document search, long-term LLM memory, and agentic AI interaction. |

## Integrate an AI agent into your process

A common model for AI agent integration uses an ad-hoc sub-process and AI agent connector in a [tools feedback loop](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-example.md).

<p><img src={ExampleImg} title="Orchestrate and integrate artificial intelligence (AI) agents into your end-to-end processes" alt="Get started" className="img-800"/></p>

In this model, an AI agent is defined using an AI agent connector, with the tools available to the agent defined in an ad-hoc sub-process. The AI agent is able to understand the context and process goal, and uses the available tools to complete the goal.

:::tip
Learn more about this example model in the [guide to adding a tool for an AI agent](https://camunda.com/blog/2025/05/guide-to-adding-tool-ai-agent/).
:::

:::info further resources

Learn more about building and integrating AI agents in Camunda 8:

- [Building Your First AI Agent in Camunda](https://camunda.com/blog/2025/02/building-ai-agent-camunda/)
- [Intelligent by Design: A Step-by-Step Guide to AI Task Agents in Camunda](https://camunda.com/blog/2025/05/step-by-step-guide-ai-task-agents-camunda/)
- [Artificial Intelligence (AI) Agents: What You Need to Know](https://camunda.com/blog/2024/08/ai-agents-what-you-need-to-know/)
- [Camunda AI agents](https://camunda.com/blog/tag/ai-agent/)

:::