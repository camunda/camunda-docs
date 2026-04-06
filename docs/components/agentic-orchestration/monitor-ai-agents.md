---
id: monitor-ai-agents
title: Monitor your AI agents with Operate
sidebar_label: Monitor your AI agents
description: "Monitor and troubleshoot your AI agent process instances in real time using Operate."
keywords: ["agentic ai", "AI agents", "Operate"]
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import ProcessInstance from './img/process-instance-overview.png';
import InstanceHistory from './img/instance-history.png';
import Variables from './img/variables.png';

Monitor and troubleshoot your AI agent process instances in real time using Operate.

## About

In this guide, you will:

- Inspect an AI agent process instance in Operate.
- Understand agent’s tool usage and metadata such as tool call inputs and results.
- Analyze the agent context and how it is stored.

:::note
Operate enables inspection of execution paths, tool usage, and agent metadata. However, certain runtime artifacts, such as document storage contents, may require additional configuration.
:::

After completing this guide, you will be able to inspect, debug, and monitor AI agent executions in Camunda 8.

## Prerequisites

- You have access to [Operate](/components/operate/operate-introduction.md).
- You have the [AI Agent Chat Quick Start](https://marketplace.camunda.com/en-US/apps/587865) model blueprint deployed in [Modeler](/components/modeler/about-modeler.md).

:::important
This guide is a follow-up to [Build your first AI agent](../../guides/getting-started-agentic-orchestration.md), where you will use the same example AI agent process. It is recommended going through that guide first. However, it can be applied to other AI agent process implementations.
:::

## Step 1: Run your AI agent process

Run your process instance using a prompt to trigger the AI Agent connector.
For example:

1. Enter "Tell me a joke" in the **How can I help you today?** field.
1. Click **Start instance**.

## Step 2: Open the process instance in Operate

1. Open [Operate](/components/operate/operate-introduction.md).
2. Locate the process instance created by your prompt. See [View a deployed process](/components/operate/userguide/basic-operate-navigation.md#view-a-deployed-process) for more details.
3. Open your process instance view by clicking on its process instance key.

At this point, you should see the process progressing through your model:

<img src={ProcessInstance} alt="Process instance overview"/>

## Step 3: Understand what Operate shows

With Operate, you can track the agent activity and see which tool tasks are called.

1. To show how many times each BPMN element is triggered, select **Execution count** in the **Instance History** section. For this particular prompt example, you can see:
   - The AI Agent connector was triggered once.
   - Within it, the agent executed the **Jokes API** tool.

2. Select the **Jokes API** tool element:
   - In the bottom-left pane, you can see where the element belongs in the execution tree:
     <img src={InstanceHistory} alt="Jokes API execution tree" width="80%"/>

- In the bottom-right pane, the element details are displayed, including the [**Variables**](components/concepts/variables.md) and [**Input/Output Mappings**](/components/concepts/variables.md#inputoutput-variable-mappings) columns, among others.
  However, the actual tool inputs and results are stored in a **parent scope** and are accessible via the element's inner instance in the execution tree. See [Step 4: Inspect tool calls](#step-4-inspect-tool-calls) for more details.

## Step 4: Inspect tool calls

Each tool execution produces an inner instance where you can find:

- The inputs passed into the tool.
- The results.

To see the **Jokes API** tool input and results:

1. In the execution tree, select the **AI_Agent#innerInstance** parent element of the **Jokes API** tool. You will see:
   - The `toolCall` variable (the _input_).
   - The `toolCallResult` variable (the _results_). See [Tool call responses](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-tool-definitions.md#tool-call-responses) for more details.

  <img src={Variables} alt="Jokes API variable details"/>

2. To better inspect the results, click the pencil icon to enter edit mode for `toolCallResult`.
3. Click the two-arrow icon to open the JSON editor modal. With this, you can inspect the full payload of the variable value:

```json
{
  "Java and C were telling jokes. It was C's turn, so he writes something on the wall, points to it and says \"Do you get the reference?\" But Java didn't."
}
```

:::note
If a tool is executed more than once, select the desired tool invocation in **Instance History**, then open the corresponding inner instance to view the actual inputs and results.
:::

## Step 5: Analyze the agent context

Within the AI Agent connector, you can examine the agent context.
To view it:

1. Select the **AI Agent** element in the execution tree.
2. To better inspect the value, click the pencil icon to enter edit mode for the `agentContext` variable.
3. Click the two-arrow icon to open the JSON editor modal. With this, you can inspect the full payload of the variable value.

In the JSON payload, you can find information about:

- Defined tools.
- The conversation, including your prompts and agent's replies.
- Tool calls invoked by the agent.
- Tool call inputs and results.
- Additional metadata, such as reasoning traces and token usage.

Here’s a snippet of the example conversation stored in the agent’s context:

```json
"type": "in-process",
"conversationId": "3889288d-5904-485f-bdca-48ad1f1ef679",
"messages": [
  {
    "role": "system",
    "content": [
      {
        "type": "text",
        "text": "You are a helpful, generic chat agent which can answer a wide amount of questions based on your knowledge and an optional set of available tools.\n\nIf tools are provided, you should prefer them instead of guessing an answer. You can call the same tool multiple times by providing different input values. Don't guess any tools which were not explicitely configured. If no tool matches the request, try to generate an answer. If you're not able to find a good answer, return with a message stating why you're not able to.\n\nIf you are prompted to interact with a person, never guess contact details, but use available user/person lookup tools instead and return with an error if you're not able to look up appropriate data.\n\nThinking, step by step, before you execute your tools, you think using the template `<thinking><context></context><reflection></reflection></thinking>`"
      }
    ]
  },
  {
    "role": "user",
    "content": [
      {
        "type": "text",
        "text": "Tell me a joke"
      }
    ],
    "metadata": {
      "timestamp": "2026-04-06T09:53:19.224987296Z"
    }
  },
  {
    "role": "assistant",
    "content": [
      {
        "type": "text",
        "text": "<thinking>\n<context>\nThe user is asking for a joke. I have access to a Jokes_API function that can fetch a random joke from a REST API. This seems like the perfect tool to use for this request. The function doesn't require any parameters, so I can call it directly.\n</context>\n<reflection>\nThis is a straightforward request that matches exactly with one of my available tools. I should use the Jokes_API function to get a random joke for the user.\n</reflection>\n</thinking>"
      }
    ],
    "toolCalls": [
      {
        "id": "tooluse_x83f1Vaj62lgkT9PMo6oqB",
        "name": "Jokes_API",
        "arguments": {}
      }
    ],
```

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
- Use **Camunda Document Storage** for production scenarios: Better scalability and runtime behavior for long contexts.

:::

## Step 7: Review the results

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
- Learn more about [Camunda agentic orchestration](/components/agentic-orchestration/agentic-orchestration-overview.md) and the [AI Agent connector](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent.md).
