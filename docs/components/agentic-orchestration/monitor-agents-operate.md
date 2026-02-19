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
- In the bottom-right pane, the element details are displayed, including the [**Variables**](/components/concepts/execution-listeners/) and [**Input/Output Mappings**](/components/concepts/variables/#inputoutput-variable-mappings) columns, among others.
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
3. Click the two-squares icon to open the JSON editor modal. With this, you can inspect the full payload of the variable value. The result is a reference to a document where the actual output is stored.

:::note
If a tool is executed more than once, select the desired tool invocation in **Instance History**, then open the corresponding inner instance to view the actual inputs and results.
:::

## Step 5: Review the agent context variable (conversation and tool-call metadata)

Many implementations store an “agent context” as a process variable. When this is the case, you can inspect it in Operate to see:

- The conversation (user prompts and agent replies).
- Tool calls invoked by the agent.
- Tool call inputs and outputs (depending on what your agent stores).
- Additional metadata used for debugging (for example, reasoning traces, planning artifacts, token usage).

### Tip: the agent context may be large

In Operate, large JSON variables can be hard to read. Expand the variable view and use search (browser search can help) to locate:

- Tool name / tool call identifier
- Input payload fields
- Output payload fields
- “messages” or conversation entries

:::note
Be mindful of sensitive data: agent context may contain user prompts, customer metadata, or tool outputs.
:::

## Step 7: Know the current limitation with Document Storage

If your agent memory is stored in **Camunda Document Storage** instead of a process variable:

- Operate may show only a **document reference** and metadata.
- You may not be able to view the full conversation, chain-of-thought-like traces, or full tool outputs from within Operate.

This is especially relevant because storing agent memory in Document Storage can be a better technical default for long conversations:

- Process variables have size and performance constraints.
- Longer conversations can exceed variable limits, potentially causing failures.
- Document Storage keeps process variables smaller and avoids those limits.

### Trade-off

- **Process variable storage**: better visibility in Operate (today), but may hit size limits.
- **Document Storage**: better runtime behavior for long contexts, but reduced visibility in Operate (today).

## Step 8: Test a “missing knowledge” path (human-in-the-loop) to validate behavior

To test escalation behavior, ask something your knowledge base likely does not contain (for example, a new city):

1. Ask: “Do you support loans in Barcelona?”
2. Observe the agent trying multiple knowledge-base queries (different search terms).
3. Confirm that the agent escalates to a human specialist.
4. Provide the human response (example: “Yes, we do support loans in Barcelona.”).
5. If your flow supports it, store the confirmation back into the knowledge base.

Then rerun the same question to confirm the agent can answer without escalation.

## Troubleshooting and common pitfalls

### “I can’t find the tool input/output”

- Look for **inner instances** created by the agent’s tool calls.
- The BPMN element’s local variables may only show configuration (vector store, embedding model, connector config), not the actual payload.

### “I only see technical variables”

- You may be looking at a connector’s local scope. Navigate up/down the scope tree and check the parent/inner instances.

### “I don’t see knowledge-base documents”

Some tool results may be stored as documents. If Operate does not display document contents, you may only see references.

### “My agent context is missing”

- If agent memory was stored in Document Storage or a custom memory integration, Operate may not have the full content.
- Consider temporarily storing a debugging-friendly subset of context as process variables in lower environments.

## Next steps

- Decide on a debugging strategy for your environment:
  - Use process variables for agent context in development/test.
  - Use Document Storage in production for long-running conversations, and implement an alternate “trace view” (outside Operate) if needed.
- If you use Optimize, consider extracting key metrics (for example, token usage and tool-call counts) to process-level variables so they can be aggregated and visualized.
