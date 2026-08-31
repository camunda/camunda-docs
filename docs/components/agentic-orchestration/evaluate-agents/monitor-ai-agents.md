---
id: monitor-ai-agents
title: Monitor your AI agents with Operate
sidebar_label: Monitor with Operate
description: "Monitor and troubleshoot your AI agent process instances in real time using Operate"
keywords:
  ["agentic ai", "AI agents", "Operate", "agent instance", "decision trail"]
---

import ProcessInstance from '../img/process-instance-overview.png';
import AgentState from '../img/agent-state.png';
import AgentPanel from '../img/agent-panel.png';
import AgentConversationHistory from '../img/agent-conversation-history.png';

Monitor and troubleshoot your AI agent process instances in real time using Operate.

## About

In this guide, you will:

- Inspect an AI agent's real-time state and usage metrics from its process instance in Operate.
- Review the agent's decision trail: the conversation history grouped by loop iteration, including the tools it selected and the results it received.
- Understand how the agent's conversation memory is stored.

:::note
Operate surfaces the agent's state, metrics, and conversation history directly, so you rarely need to inspect raw process variables. Some runtime artifacts, such as document storage contents, may still require additional configuration to view. See [agent context and memory](/components/agentic-orchestration/agent-definitions-and-instances.md#agent-context-and-memory) for how the underlying data is stored.
:::

After completing this guide, you will be able to monitor, debug, and troubleshoot AI agent executions in Operate, including agents built with external frameworks such as LangGraph or CrewAI. See [connect an external agent](/components/agentic-orchestration/connect-external-agent.md) for how those agents report the same data.

## Prerequisites

- You have access to [Operate](/components/operate/operate-introduction.md) on Camunda 8.10 or later.
- You have the [AI Agent Chat Quick Start](https://marketplace.camunda.com/en-US/apps/587865) model blueprint deployed in [Modeler](/components/modeler/about-modeler.md).

:::important
This guide is a follow-up to [build your first AI agent](/guides/getting-started-agentic-orchestration.md), where you use the same example AI agent process. We recommend completing that guide first. However, you can also apply this guide to other AI agent process implementations.
:::

## Step 1: Run your AI agent process

Run your process instance using a prompt to trigger the AI Agent connector.
For example:

1. Enter "Tell me a joke" in the **How can I help you today?** field.
1. Click **Start instance**.

## Step 2: Open the process instance in Operate

1. Open [Operate](/components/operate/operate-introduction.md).
2. Locate the process instance created by your prompt. See [view a deployed process](/components/operate/userguide/basic-operate-navigation.md#view-a-deployed-process) for more details.
3. Open your process instance view by clicking on its process instance key.

At this point, you should see the process progressing through your model:

<img src={ProcessInstance} alt="Process instance overview"/>

Operate highlights the agent element's current [state](/components/agentic-orchestration/agent-states-and-metrics.md#agent-states). For example, `Thinking` while the agent reasons, or `Tool calling` while it calls the **Jokes API** tool. A simple prompt like this one moves through its loop quickly, so the agent instance may already show `Idle` or `Completed` by the time you look.

<img src={AgentState} alt="Agent state overview" width="50%"/>

## Step 3: Inspect the agent's state and usage metrics

Select the agent element on the diagram. Operate shows the [data available](/components/agentic-orchestration/agent-definitions-and-instances.md#data-available-in-operate) for its agent instance, including:

- Its current state, model, and system prompt.
- The tools resolved for it.
- Its usage metrics: token consumption, tool call count, and model call count against the configured limit.


<img src={AgentPanel} alt="Agent panel overview"/>

For guidance on reading these signals to catch a stuck or looping agent, see [detect off-rail agents](./detect-off-rail-agents.md).

## Step 4: Review the conversation history

The conversation history is the agent's decision trail, grouped by [loop iteration](/components/agentic-orchestration/agent-definitions-and-instances.md#conversation-history-and-loop-iterations). Operate labels each group simply as `iteration`, for example `1.loop iteration`.

For this example, the first iteration shows:

- The user prompt, "Tell me a joke."
- The assistant message where the agent selects the **Jokes API** tool, along with its reasoning.
- The tool result containing the joke text.

<img src={AgentConversationHistory} alt="Agent conversation history overview"/>

If a tool maps to a BPMN element in your process, Operate links the tool call in the conversation history to that element on the diagram, so you can navigate straight from the decision trail to the execution step it produced.

## Step 5: Understand how agent memory is stored

In Modeler, within the AI Agent sub-process, you can define how the conversation memory is stored using the **Memory storage type** field.

By default, agent memory uses the **In Process** type, which stores it as part of the agent context, the same underlying data the conversation history in [step 4](#step-4-review-the-conversation-history) is built from.

Other available options include **Camunda Document Storage**, **AWS AgentCore Memory**, and a custom implementation. See [memory](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-subprocess.md#memory) for more details.

:::note Advanced: inspect the raw agent context
For a Camunda AI agent, this data is stored in the `agentContext` process variable. Open the element's **Variables** tab to inspect it directly, for example to check a runtime artifact not surfaced in the conversation history. See [agent context and memory](/components/agentic-orchestration/agent-definitions-and-instances.md#agent-context-and-memory) for how it's structured.
:::

## Step 6: Review the results

Go back to Operate. In the **User Feedback** element, you will see the execution count in green. This means the process instance execution is stopped there and waiting for action.

In this case, the required action is to provide feedback on the agent results. To do so:

1. Select the **User Feedback** element.
2. Open [Tasklist](/components/tasklist/introduction-to-tasklist.md).
3. Select the user feedback task and assign to yourself by clicking **Assign to me**.
4. Analyze the result. You will see a joke, as requested in the prompt.
5. You can follow up with more prompts to continue testing your AI agent.
6. Select the **Are you satisfied with the result?** checkbox when you want to finish the process, then click **Complete task**.
7. Go back to Operate. You will see the process instance is now completed, and the end event has been triggered.

## Next steps

Now that you know how to monitor your AI agents, you can:

- [Analyze your AI agents](./analyze-ai-agents.md) with Optimize.
- [Test your AI agents](./test-ai-agents.md) with Camunda Process Test, including handling non-deterministic flows and verifying AI-generated output.
- Learn more about [Camunda agentic orchestration](/components/agentic-orchestration/agentic-orchestration-overview.md) and the [AI Agent connector](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent.md).
