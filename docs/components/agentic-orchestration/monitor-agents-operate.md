---
id: monitor-agents-operate
title: Monitor your AI agents with Operate
sidebar_label: Monitor your AI agents
description: "Monitor and troubleshoot your AI agent process instances in Camunda 8 using Operate."
keywords: ["agentic ai", "AI agents"]
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Monitor and troubleshoot your AI agent process instances in Camunda 8 using Operate.

## About

In this guide, you will:

- Inspect an AI agent process instance in Operate.
- Understand agent’s relevant variables such as tool call inputs and results.
- Analyze the agent context and how it is stored.

After completing it, you will better understand how to debug your AI agents with Operate.

## Prerequisites

- You have the [AI Agent Chat Quick Start](https://marketplace.camunda.com/en-US/apps/587865) model blueprint deployed in [Modeler](/components/modeler/about-modeler.md).
- You are familiar with [Operate](/components/operate/operate-introduction.md).

:::important
This guide is a follow-up to [Build your first AI agent](../../guides/getting-started-agentic-orchestration.md), where you will use the same example AI agent process. Therefore, the same [prerequisites apply](../..//guides/getting-started-agentic-orchestration.md#prerequisites). However, it can be applied to other AI agent process implementations.
:::

## Step 1: Run your AI agent process

Run your process instance using a prompt to trigger the AI Agent connector.

For example, enter "Visit _docs.camunda.io_ and tell me about it" in the **How can I help you today?** field, and click **Start instance**.

## Step 2: Open the process instance in Operate

1. Open [Operate](/components/operate/operate-introduction.md). If working locally with Self-Managed, open it in your browser at http://localhost:8080/operate.
2. Locate the process instance created by your prompt. See [View a deployed process](/components/operate/userguide/basic-operate-navigation.md#view-a-deployed-process) for more details.
3. Open your process instance view by clicking on its process instance key.

At this point, you should see the process progressing through your model.

## Step 3: Understand what Operate shows

With Operate, you can track the agent activity and see which tool tasks are called.

1. To show how many times each BPMN element is triggered, select **Execution count**.

For this particular prompt example, you can see:

- The AI Agent connector was triggered once.
- Within it, the agent executed the **Fetch URL** tool. This aligns with your prompt example: Visit a website URL and extract information from it.

2. Select the **Fetch URL** tool element.

- In the bottom-left pane, you can see where the element belongs in the execution tree.
- In the bottom-right pane, the element details are displayed, including the [**Variables**](components/concepts/variables.md) and [**Input/Output Mappings**](/components/concepts/variables.md#inputoutput-variable-mappings) columns, among others.
  However, the actual tool inputs and results are stored in a **parent scope** and are accessible via the element's inner instance in the execution tree.

## Step 4: Inspect tool calls

Each tool execution produces an inner instance where you can find:

- The inputs passed into the tool.
- The results.

To see the **Fetch URL** tool input and results:

1. In the execution tree, select the **AI_Agent#innerInstance** parent element of the **Fetch URL** tool. You will see:

- The **toolCall** variable (the _input_). In its value field, you can see the URL you asked the agent to fetch information from.
- The **toolCallResult** variable (the _results_). See [Tool call responses](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-tool-definitions.md#tool-call-responses) for more details.

2. To better inspect the results, click the pencil icon to enter edit mode for **toolCallResult**.
3. Click the two-squares icon to open the JSON editor modal. With this, you can inspect the full payload of the variable value. The result is a reference to a document where the actual output is stored. See [**TBD - Add link**] to other section/explanation within this guide Camunda Document Storage.

:::note
If a tool is executed more than once, select the desired tool invocation in **Instance History**, then open the corresponding inner instance to view the actual inputs and results.
:::

## Step 5: Analyze the agent context

Within the AI Agent connector, you can examine the agent context.
To view it:

1. Select the **AI Agent** element in the execution tree.
2. To better inspect the value, click the pencil icon to enter edit mode for the **agentContext** variable.
3. Click the two-squares icon to open the JSON editor modal. With this, you can inspect the full payload of the variable value.

In the JSON payload, you can find information about:

- Defined tools.
- The conversation, including your prompts and agent's replies.
- Tool calls invoked by the agent.
- Tool call inputs and results.
- Additional metadata, such as reasoning traces and token usage.

## Step 6: Understand how agent memory is stored

In Modeler, within the AI Agent sub-process, you can define how the conversation memory is stored using the **Memory storage type** field.

By default, agent memory uses the **In Process** type, which stores it as part of the agent context.
With this option, you can view it in Operate within the agent context, as you did in the previous step, [Analyze the agent context](#step-5-analyze-the-agent-context).

With the **Camunda Document Storage** option instead:

- You can't view the full conversation and chain-of-thought traces in Operate. Operate only show a **document reference** and metadata.
- Use this option for long conversations, where Operate variable limits might be exceeded.

See [Memory](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-subprocess.md#memory) for more details.

:::note Agent memory storage

- Use **In Process** for testing and debugging scenarios: Better visibility in Operate.
- Use **Camunda Document Storage** for production scenarios: Better runtime behavior for long contexts.
  :::

## Step 7: Review the results

In the **User Feedback** element, you will see the execution count in green. This means the process instance execution is stopped there and waiting for action.

In this case, the required action is to provide feedback on the agent results. To do so:

1. Select the **User Feedback** element.
2. Open [Tasklist](/components/tasklist/introduction-to-tasklist.md).
3. Select the User Feedback task and assign to yourself by clicking **Assign to me**.
4. Analyze the result. You will see an overview of the website URL requested in the prompt.
5. You can follow up with more prompts to continue testing your AI agent.
6. Select the **Are you satisfied with the result?** checkbox when you want to finish the process, then click **Complete task**.
7. Go back to Operate. You will see the process instance is now completed, and the end event has been triggered.

## Next steps

Now that you know how to monitor your AI agents with Operate, you can:

- Learn more about [Camunda agentic orchestration](/components/agentic-orchestration/agentic-orchestration-overview.md) and the [AI Agent connector](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent.md).
- Explore other [AI agent model blueprints](https://marketplace.camunda.com/en-US/listing?q=ai&cat=107793&locale=en-US) from Camunda marketplace.
