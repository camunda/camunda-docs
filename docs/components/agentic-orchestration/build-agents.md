---
id: build-agents
title: Build AI agents
sidebar_label: Build AI agents
description: "Build AI agents in Camunda by modeling a Camunda AI agent or connecting an external agent."
keywords:
  ["build AI agent", "AI agent", "agentic orchestration", "tools", "MCP", "LLM"]
---

import PageDescription from '@site/src/components/PageDescription';
import AoGrid from '../react-components/\_ao-card';
import { buildLlmCards, buildCapabilityCards, buildExternalAgentCards, buildExposeCards } from '../react-components/\_ao-card-data';

<PageDescription />

Use this page to learn how to build an [AI agent](/reference/glossary.md#ai-agent).
You can follow one of two paths:

1. [Build a Camunda AI agent](#build-a-camunda-ai-agent): Model the agent in BPMN, connect it to an LLM, and give it tools and memory.
2. [Connect an external agent](#connect-an-external-agent): Orchestrate an agent that runs outside Camunda, such as in LangGraph or on Amazon Bedrock.

## Build a Camunda AI agent

A [Camunda AI agent](/reference/glossary.md#camunda-ai-agent) runs its [agent loop](/reference/glossary.md#agent-loop) in Camunda's engine, which activates each tool call as a governed BPMN activity. You model the agent with the [AI Agent connector](/components/connectors/out-of-the-box-connectors/).

:::tip
Get started by [building your first AI agent](/guides/getting-started-agentic-orchestration.md).
:::

### Connect an LLM

A [large language model (LLM)](/reference/glossary.md#large-language-model-llm) provides the agent's reasoning. The agent sends it a [prompt](/reference/glossary.md#prompt) and the available tools, and the LLM decides what to do next. To get started quickly in Camunda SaaS, use the [Camunda-provided LLM](/components/agentic-orchestration/camunda-provided-llm.md).

To choose a model, compare recommendations, and write effective prompts, see the [best practices](/components/agentic-orchestration/best-practices-agentic.md) for agentic orchestration.

<AoGrid ao={buildLlmCards} columns={3}/>

### Give the agent tools and memory

Tools are the BPMN activities an agent can call to act on your systems, such as service tasks, [human tasks](/reference/glossary.md#human-task), and sub-processes. The agent selects which tools to run, and Camunda applies retries and incident handling to each call.

By default, an agent only knows what is in its conversation context. To give it access to knowledge beyond that, store [embeddings](/reference/glossary.md#embedding-vector-embedding) in a vector database and retrieve them when the agent needs them.

<AoGrid ao={buildCapabilityCards} columns={3}/>

## Connect an external agent

An [external agent](/reference/glossary.md#external-agent) runs its agent loop in an external runtime instead of Camunda's engine. Camunda orchestrates when the agent runs as part of your process, and you connect it so its activity is visible in Camunda.

<AoGrid ao={buildExternalAgentCards} columns={3}/>

## Expose a process to other agents

Agents built in Camunda or elsewhere can also call your processes. With the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/), you can expose a BPMN process as a tool that agents discover and run.

<AoGrid ao={buildExposeCards} columns={3}/>
