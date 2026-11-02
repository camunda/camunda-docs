---
id: build-agents
title: Build AI agents
sidebar_label: Build AI agents
description: "Find the right guide for building an AI agent in Camunda, from choosing an agent type and LLM to adding tools, memory, and external agents."
keywords:
  ["build AI agent", "AI agent", "agentic orchestration", "tools", "MCP", "LLM"]
---

import PageDescription from '@site/src/components/PageDescription';

<PageDescription />

To build an AI agent in Camunda, you model the agent in BPMN, connect it to an LLM, and give it the tools it needs to reach its goal. Use this page to find the guide for each part of that work.

If you're new to agentic orchestration, start with [build your first AI agent](/guides/getting-started-agentic-orchestration.md).

## Choose an agent type

Decide where the agent loop runs before you build. Camunda supports two agent types, described in [AI agents](/components/agentic-orchestration/ai-agents.md#agent-types).

| If you want to                                                             | Build a                                                                                                                                         |
| :------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------- |
| Run the agent loop in Camunda's engine, with each tool call as a BPMN task | Camunda AI agent, using the [AI Agent Sub-process connector](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-subprocess.md) |
| Use an agent built with LangGraph, Amazon Bedrock, or custom code          | External agent, using [connect an external agent](/components/agentic-orchestration/connect-external-agent.md)                                  |

## Build a Camunda AI agent

Follow these steps in order to build a Camunda AI agent. Each step links to the guide for that part of the agent.

| Step                             | What you do                                                                                                         | Guides                                                                                                                                                                                                                                                                                                                                                                                    |
| :------------------------------- | :------------------------------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Choose an LLM                 | Pick a model that fits your task and cost requirements, and connect it to the agent.                                | [Choose the right LLM](/components/agentic-orchestration/choose-right-model-agentic.md), [LLM recommendations](/components/agentic-orchestration/model-recommendations-agentic.md), [Camunda-provided LLM](/components/agentic-orchestration/camunda-provided-llm.md), [AI Agent model providers](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-model-providers.md) |
| 2. Add the agent to your process | Model the agent as an ad-hoc sub-process with the AI Agent connector, and write its system and user prompts.        | [AI agents](/components/agentic-orchestration/ai-agents.md#integrate-an-ai-agent-into-your-process), [AI Agent connector](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent.md)                                                                                                                                                                                         |
| 3. Give the agent tools          | Add BPMN elements and MCP servers as tools the agent can call.                                                      | [Add tools to an AI agent](/components/agentic-orchestration/add-tool-to-ai-agent.md), [AI agent tool definitions](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-tool-definitions.md), [MCP Client connector](/components/connectors/out-of-the-box-connectors/agentic-ai-mcp-client.md)                                                                            |
| 4. Add memory and context        | Give the agent long-term memory with retrieval-augmented generation (RAG), or pass documents and images to the LLM. | [Add long-term memory](/components/agentic-orchestration/rag-ai-agents.md), [AI Agent document support](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-documents.md)                                                                                                                                                                                                 |
| 5. Keep a human in the loop      | Route sensitive tool calls to a person for approval before the agent runs them.                                     | [Human in the loop](/components/connectors/out-of-the-box-connectors/agentic-ai-mcp-client-human-in-the-loop.md)                                                                                                                                                                                                                                                                          |
| 6. Evaluate the agent            | Test the agent, then monitor and analyze it in Operate and Optimize.                                                | [Evaluate AI agents](/components/agentic-orchestration/evaluate-agents/evaluate-ai-agents.md)                                                                                                                                                                                                                                                                                             |

## Connect an external agent

If your agent runs outside Camunda, connect it so the process can orchestrate it and Camunda can show its activity.

- [Connect an external agent](/components/agentic-orchestration/connect-external-agent.md) built with a framework such as LangGraph or CrewAI.
- [Amazon Bedrock AgentCore Runtime connector](/components/connectors/out-of-the-box-connectors/amazon-bedrock-agentcore-runtime.md) to invoke agents deployed on AWS Bedrock AgentCore Runtime.

## Expose a process to other agents

Make your BPMN processes available as tools to agents built in Camunda or elsewhere.

- [Expose a process as an MCP tool](/components/agentic-orchestration/expose-process-as-mcp-tool.md) through the Processes MCP Server.
- [MCP start event](/components/connectors/out-of-the-box-connectors/agentic-ai-mcp-start-event.md) reference for registering a process as a callable tool.

## Next steps

- [Evaluate your AI agents](/components/agentic-orchestration/evaluate-agents/evaluate-ai-agents.md) with testing, monitoring, and analysis.
- Review the [best practices](/components/agentic-orchestration/best-practices-agentic.md) for designing reliable and responsible agents.
