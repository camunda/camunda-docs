---
id: ai-agents
title: AI agents
description: "Build and integrate AI agents into your end-to-end processes."
keywords: ["agentic ai", "AI agents"]
---

import AgentImg from './img/ao-ai-agent.png';

Build and integrate AI agents into your end-to-end processes.

## About AI agents

An AI agent is an addressable execution of an LLM-driven loop with shared memory context across iterations. An agent runs a loop where the model decides what to do next, which tools to invoke, and when to stop. The loop is what makes it an agent. A standalone LLM call with no loop and no autonomous tool selection, such as a single connector call that returns output along a fixed execution path, is not an agent.

AI agents can perform a variety of functions, including making decisions, solving problems, interacting with external environments, and taking actions.

## AI agent integration features

Use the following Camunda 8 features to integrate AI agents into your processes:

| Type            | Feature                                                                                   | Description                                                                                                                                                 |
| :-------------- | :---------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BPMN subprocess | [Ad-hoc sub-process](/components/modeler/bpmn/ad-hoc-subprocesses/ad-hoc-subprocesses.md) | A special kind of embedded subprocess with an ad-hoc marker that allows a small part of your process decision-making to be handed over to a human or agent. |

Get started with [building Your First AI Agent in Camunda](https://camunda.com/blog/2025/05/step-by-step-guide-ai-task-agents-camunda/).

:::tip
Explore the version 8.8 documentation to learn more about the additional AI agent features available in Camunda 8.8, such as the new AI Agent connector.
:::

:::info further resources

Learn more about building and integrating AI agents in Camunda 8:

- [Intelligent by Design: A Step-by-Step Guide to AI Task Agents in Camunda](https://camunda.com/blog/2025/05/step-by-step-guide-ai-task-agents-camunda/)
- [Artificial Intelligence (AI) Agents: What You Need to Know](https://camunda.com/blog/2024/08/ai-agents-what-you-need-to-know/)
- [Camunda AI agents](https://camunda.com/blog/tag/ai-agent/)

:::
