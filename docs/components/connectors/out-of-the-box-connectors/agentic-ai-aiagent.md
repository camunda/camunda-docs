---
id: agentic-ai-aiagent
sidebar_label: AI Agent
title: AI Agent connector
description: AI agent connector implementing an agent loop for tool calls with an LLM, with support for response follow-up interactions.
---

import AoGrid from '../../react-components/\_ao-card';
import { connectorCards, fundamentalCards } from '../../react-components/\_aiagent-card-data';

Use the **AI Agent** connector to integrate Large Language Models (LLMs) with AI agents to build solutions using [agentic orchestration](../../agentic-orchestration/agentic-orchestration-overview.md).

## About

The AI Agent connector enables AI agents to integrate with an LLM to provide interaction/reasoning capabilities. This connector is designed for use with an ad-hoc sub-process in an [agent loop](/reference/glossary.md#agent-loop), providing automated tool selection.

For example, use this connector to enable an AI agent to autonomously select and execute tasks within ad-hoc sub-processes by evaluating the current process context and determining the relevant tasks and tools to use in response.

:::note
You can also use the AI Agent connector independently, although it is designed to be used with an ad-hoc sub-process.
:::

Core features include:

| Feature              | Description                                                                                                                                                                                                                                                                         |
| :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| LLM provider support | Supports a range of [model providers](./agentic-ai-aiagent-model-providers.md), such as Anthropic, AWS Bedrock, Google Gemini, and OpenAI.                                                                                                                                          |
| Memory               | Provides conversational/short-term memory handling to enable multi-turn conversations. For example, this allows a user to ask follow-up questions to an AI agent response.                                                                                                          |
| Tool calling         | Support for an AI agent to interact with tasks within an ad-hoc sub-process, allowing use of all Camunda features such as connectors and user tasks (human-in-the-loop). Automatic **tool resolution** allows an AI agent to identify the tools available in an ad-hoc sub-process. |

:::tip

New to [agentic orchestration](../../agentic-orchestration/agentic-orchestration-overview.md)?

- The [Build your first AI Agent](../../../guides/getting-started-agentic-orchestration.md) guide provides a quick introduction to agentic orchestration and how to use the AI Agent Sub-process connector using a blueprint.
- See [further resources](#explore-further-resources) for examples of how you can use the AI Agent connector.

:::

## AI Agent connectors

### Prerequisites

The following prerequisites are required to use this connector:

| Prerequisite                                      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| :------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Set up your LLM model provider and authentication | <p>Prior to using this connector, you must have previously set up an account with access and authentication details for the supported LLM model provider you want to use.</p><p>For example:<ul><li><p>To use an LLM model provided by Amazon Bedrock, you must have an AWS account with an access key and secret key to execute `Converse` actions.</p></li><li><p>For OpenAI, you must configure the [OpenAI model](https://platform.openai.com/docs/models) and obtain an OpenAI API key to use for authentication.</p></li></ul></p> |

### Choose an implementation

The AI Agent connector is available in two variants, each with different capabilities, suited for different use cases, and available with a dedicated element template:

<AoGrid ao={connectorCards} columns={2}/>

The right implementation depends on your use case.

| Use case                                                                                                      | Implementation                                              | Description                                                                                                                                                                                                |
| ------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Agentic workflow with automatic tool calling (most use cases)                                                 | [AI Agent Sub-process](./agentic-ai-aiagent-subprocess.md)  | It handles tool resolution and the [agent loop](/reference/glossary.md#agent-loop) automatically. No explicit loop modeling is needed. You must include at least one activity/tool inside the sub-process. |
| Inference tasks that don't require tool calling                                                               | [AI Agent Task](./agentic-ai-aiagent-task.md) without tools | A single, one-shot LLM call with no ad-hoc sub-process.                                                                                                                                                    |
| Intercepting tool calls, for example, to add a human approval step or run PII detection before tool execution | [AI Agent Task](./agentic-ai-aiagent-task.md) with tools    | Tools are provided by an external ad-hoc sub-process that you model explicitly, giving you full control over the agent loop. This is the most complex configuration.                                       |

:::info
The **recommended approach** for most use cases is to use the **AI Agent Sub-process** implementation due to the simplified configuration and support for event sub-processes.
:::

### Compare configuration

The following table summarizes the key configuration differences between the two implementations.

| Configuration field    | AI Agent Sub-process                                                      | AI Agent Task                                                     |
| :--------------------- | :------------------------------------------------------------------------ | :---------------------------------------------------------------- |
| Model provider         | Yes                                                                       | Yes                                                               |
| Model                  | Yes                                                                       | Yes                                                               |
| System prompt          | Yes                                                                       | Yes                                                               |
| User prompt            | Yes                                                                       | Yes                                                               |
| Tools                  | Automatic (resolved from activities inside the sub-process)               | Optional. Requires ad-hoc sub-process ID and tool call results    |
| Agent context (memory) | Optional. Only needed when re-entering the agent for a response follow-up | Required. Must be aligned with the output mapping result variable |
| Limits                 | Yes                                                                       | Yes                                                               |
| Event handling         | Yes                                                                       | No                                                                |
| Response               | Yes                                                                       | Yes                                                               |
| `toolCalls` in output  | No                                                                        | Yes. Returned for routing to the ad-hoc sub-process               |
| Error handling         | Yes                                                                       | Yes                                                               |
| Retries                | Yes                                                                       | Yes                                                               |
| Execution listeners    | Yes                                                                       | Yes                                                               |

:::note
Execution listeners behave differently between the two implementations. On the AI Agent Sub-process, they only run when entering and exiting the ad-hoc sub-process, not on every loop iteration. On the AI Agent Task, they are triggered on every job execution.
:::

## Learn the fundamentals

Understand the fundamental concepts of the AI Agent connector.

<AoGrid ao={fundamentalCards} columns={3}/>

## Explore further resources

Dive into practical resources to see the AI Agent connector in action.

- [AI Agent Sub-process example](./agentic-ai-aiagent-subprocess-example.md): Model an agent with tool calling and a user feedback loop.
- [AI Agent Task example](./agentic-ai-aiagent-task-example.md): Model an agent loop explicitly with the AI Agent Task.
- [Intelligent by design: A step-by-step guide to AI task agents in Camunda](https://camunda.com/blog/2025/05/building-your-first-ai-agent-with-camunda-s-new-agentic-ai/).
- [AI Agent Chat Quick Start blueprint](https://marketplace.camunda.com/en-US/apps/587865/ai-agent-chat-quick-start) on the Camunda Marketplace.
- [Working examples](https://github.com/camunda/connectors/tree/main/connectors/agentic-ai/examples) in the agentic AI examples GitHub repository.
- The [MCP Client connector](/components/connectors/out-of-the-box-connectors/agentic-ai-mcp-client.md) can be used in combination with the AI Agent connector to connect to tools exposed by Model Context Protocol (MCP) servers.
