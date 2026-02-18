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

## Step 1: Trigger the AI Agent connector

Run your process instance using a prompt to trigger the AI Agent connector.

For example, enter "Visit _docs.camunda.io_ and tell me about it" in the **How can I help you today?** field, and click **Start instance**.

## Step 2: Open the process instance in Operate

1. Open [Operate](/components/operate/operate-introduction.md). If working with Self-Managed, open it in your browser at http://localhost:8080/operate.
2. Locate the process instance created by your prompt. See [View a deployed process](/components/operate/userguide/basic-operate-navigation.md#view-a-deployed-process) for more details.
3. Open your process instance view by clicking on its process instance key.

At this point, you should see the process progressing through your model.

## Step 3: Understand what Operate shows (and what it doesn’t)

Operate can show that an agent activity executed and that a tool task was triggered multiple times. However, the **inputs and outputs of tool calls are not always visible where you expect them**.

In particular:

- Clicking the BPMN element that represents the tool (for example, _query knowledge base_) may show **technical variables** and **mapping rules**, but not the actual input/output payload you want for debugging.
- The data you want (tool inputs/results) is often stored in a **parent scope** and is accessible via **inner instances** in the execution tree.

## Step 4: Inspect tool calls using the execution tree (inner instances)

To see tool call inputs and results, use the execution tree:

1. In the process instance view, locate the agent/tool activity that ran.
2. Open the **execution tree** (the call hierarchy / inner instances).
3. Select the **inner instance** representing a specific tool invocation.

In many agent setups, each tool execution produces an inner instance. The inner instance is usually where you can find:

- The _query_ passed into the tool (for example: “Do you support loans in Madrid, Spain…”).
- The tool result (for example, documents retrieved from a knowledge base).

### Why this is confusing today

A common stumbling block is that:

- Clicking the “tool element” in the diagram does not directly reveal the tool call payload.
- The tool call payload is attached to a different scope (often the parent), so you must know to navigate via inner instances.

If you see a tool invoked “twice,” you may need to select the correct tool invocation in **instance history** and then open the **corresponding inner instance** to get the actual inputs and outputs.

## Step 5: Validate whether you’re seeing mapping rules or live values

Operate may show:

- **Input mappings**: how values are assigned (the rules).
- **Variables**: the values at runtime (what you usually need for debugging).

A practical rule of thumb:

- If you only see _how_ something is mapped, you are looking at **mapping rules**.
- If you see the concrete query, retrieved documents, or tool outputs, you are looking at **runtime values** (typically attached to the inner instance / parent scope).

## Step 6: Review the agent context variable (conversation and tool-call metadata)

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
