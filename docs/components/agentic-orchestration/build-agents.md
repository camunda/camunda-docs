---
id: build-agents
title: Build AI agents
sidebar_label: Build AI agents
description: "Find the right guide for building an AI agent in Camunda, from choosing an agent type and LLM to adding tools, memory, and external agents."
keywords:
  ["build AI agent", "AI agent", "agentic orchestration", "tools", "MCP", "LLM"]
---

import PageDescription from '@site/src/components/PageDescription';
import AoGrid from '../react-components/\_ao-card';
import { buildModelCards, buildAgentCards, buildExternalAgentCards, buildExposeCards } from '../react-components/\_ao-card-data';

<PageDescription />

To build an AI agent in Camunda, you model the agent in BPMN, connect it to an LLM, and give it the tools it needs to reach its goal. Use this page to find the guide for each part of that work.

If you're new to agentic orchestration, [build your first AI agent](/guides/getting-started-agentic-orchestration.md).

## Choose an LLM

Pick a model that fits your task and cost requirements, and connect it to your agent.

<AoGrid ao={buildModelCards} columns={3}/>

## Build a Camunda AI agent

Camunda AI agents run their agent loop in Camunda's engine, with each tool call as a governed BPMN activity. Model the agent with the AI Agent connector, then give it tools, memory, and human oversight. See [AI agents](/components/agentic-orchestration/ai-agents.md#agent-types) to compare agent types.

<AoGrid ao={buildAgentCards} columns={3}/>

## Connect an external agent

If your agent runs outside Camunda, for example in LangGraph or on Amazon Bedrock, connect it so the process can orchestrate it.

<AoGrid ao={buildExternalAgentCards} columns={3}/>

## Expose a process to other agents

Make your BPMN processes available as tools to agents built in Camunda or elsewhere.

<AoGrid ao={buildExposeCards} columns={3}/>

## Next steps

- [Evaluate your AI agents](/components/agentic-orchestration/evaluate-agents/evaluate-ai-agents.md) with testing, monitoring, and analysis.
- Review the [best practices](/components/agentic-orchestration/best-practices-agentic.md) for designing reliable and responsible agents.
