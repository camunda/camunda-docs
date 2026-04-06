---
id: long-term-memory-ai-agents
title: Add long-term memory to your AI agents
sidebar_label: Add long-term memory
description: "Add long-term memory to your AI agents using RAG and the vector database connector."
keywords: ["agentic ai", "AI agents", "RAG", "vector database", "long-term memory"]
toc_max_heading_level: 2
---

Add long-term memory to your AI agents using Retrieval-Augmented Generation (RAG) and the [vector database connector](/components/connectors/out-of-the-box-connectors/embeddings-vector-db.md).

## About

In this guide, you will:

- Add a vector database query tool to an AI agent so it can search for relevant information using natural language.
- Add a human-in-the-loop tool that allows a clerk to answer questions the agent cannot resolve on its own.
- Store clerk-provided answers in long-term memory using the vector database connector, gated by human approval.
- Verify that the agent learns over time by answering previously unknown questions from memory.

After completing this guide, your AI agent will be able to query a vector database for policy or product-specific information, escalate to a human when needed, and grow its knowledge base over time.

## Prerequisites

- You have access to [Modeler](/components/modeler/about-modeler.md) and [Operate](/components/operate/operate-introduction.md).
- You have a deployed AI agent process, such as the [AI Agent Chat Quick Start](https://marketplace.camunda.com/en-US/apps/587865) model blueprint.
- You have access to a supported [vector database](/components/connectors/out-of-the-box-connectors/embeddings-vector-db.md#vector-stores) and a supported [embedding model](/components/connectors/out-of-the-box-connectors/embeddings-vector-db.md#embedding-models).

:::important
This guide builds on [Build your first AI agent](../../guides/getting-started-agentic-orchestration.md). We recommend completing that guide first. However, you can also apply the concepts here to other AI agent process implementations.
:::

## Why use a vector database for long-term memory

A vector database is ideal for giving an AI agent access to large amounts of domain-specific data — such as company policies, product catalogs, or internal procedures — without loading all of that data into the agent's context window.

Using the [vector database connector](/components/connectors/out-of-the-box-connectors/embeddings-vector-db.md), the agent can query the database in natural language and retrieve only the most relevant results. This is known as **Retrieval-Augmented Generation (RAG)**.

Key benefits include:

- **Scalability**: The agent can access a large knowledge base without exceeding context window limits.
- **Dynamic knowledge**: The knowledge base can grow over time as new information is stored.
- **Natural language queries**: The LLM generates search queries automatically, so no structured query language is needed.

## Step 1: Add a vector database query tool

Add a [vector database connector](/components/connectors/out-of-the-box-connectors/embeddings-vector-db.md) as a new tool inside the AI Agent's [ad-hoc sub-process](/components/modeler/bpmn/ad-hoc-subprocesses/ad-hoc-subprocesses.md). This tool allows the agent to search for relevant information stored in the vector database.

1. Open your AI agent process in [Modeler](/components/modeler/about-modeler.md).
1. Inside the AI Agent connector's ad-hoc sub-process, add a new **vector database connector** task. Ensure it has **no incoming flows** so the AI Agent recognizes it as an available [tool](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-tool-definitions.md).
1. Set the task **Name** to something descriptive, for example `Query policy`.
1. Set the **Element documentation** to describe when the agent should use this tool. For example:

   > Use this tool to get any information on policy or product-specific questions you might have.

   :::note
   The element documentation is passed to the LLM as the [tool description](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-tool-definitions.md#tool-definitions). Be as descriptive as possible to help the LLM select the right tool.
   :::

1. Configure the connector **Properties**:
   - Set **Operation** to **Retrieve document**.
   - Set **Search query** to use the [`fromAi()`](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-tool-definitions.md#ai-generated-parameters-via-fromai) function so the LLM generates the query dynamically:

     ```feel
     fromAi(toolCall.query, "The query you're making to the vector database.")
     ```

   - Set **Max results** to `5` (the default). The agent can re-trigger the tool with different query parameters if it doesn't find what it needs on the first attempt.
   - Configure the [**Embedding model**](/components/connectors/out-of-the-box-connectors/embeddings-vector-db.md#embedding-models) with your provider credentials.
   - Configure the [**Vector store**](/components/connectors/out-of-the-box-connectors/embeddings-vector-db.md#vector-stores) with your database connection details and **index name**.
   - Set the output **Result variable** to `toolCallResult`.

1. Add an **error boundary event** to handle cases where the index is not found:
   - Attach an error boundary event to the vector database connector task.
   - Set the error code to match an `index not found` error.
   - In the error boundary event's output, set `toolCallResult` to `"Nothing was found"` so the agent is informed gracefully.

:::note
The **index name** identifies where your data is stored in the vector database. You can use different indexes for different types of data. The index could even be set dynamically using `fromAi()` if the agent needs to choose between multiple knowledge bases.
:::

## Step 2: Test the query tool

Deploy and run your process to verify that the agent can query the vector database.

1. Click **Deploy and run**.
1. Enter a prompt that requires information from your vector database. For example: `I would like an iPhone. Can I get a student discount?`
1. Open [Operate](/components/operate/operate-introduction.md) and locate the process instance.
1. Observe the execution flow:
   - The agent queries its existing tools (for example, a product list).
   - The agent triggers the **Query policy** tool to search the vector database for relevant policies.
   - If the vector database contains relevant data (for example, a student discount policy), the agent combines both sources of information in its response.
1. Open [Tasklist](/components/tasklist/introduction-to-tasklist.md) and review the agent's answer to verify it includes information retrieved from the vector database.

:::note
If the vector database does not contain relevant information for the query, the agent will inform the user that it couldn't find an answer. This is expected before populating the database with data. The next steps show how to populate it.
:::

## Step 3: Add a human-in-the-loop tool

For questions the agent cannot answer from its existing tools or the vector database, add a **user task** tool that escalates to a human clerk.

1. Inside the AI Agent's ad-hoc sub-process, add a new [user task](/components/modeler/bpmn/user-tasks/user-tasks.md). Ensure it has **no incoming flows**.
1. Set the task **Name** to `Ask clerk`.
1. Set the **Element documentation** to:

   > Use this tool to answer any questions you have about the company or the product on offer.

1. Create and link a [form](/components/modeler/forms/camunda-forms-reference.md) with the following fields:
   - **Question for clerk** (text, read-only) — displays the agent's question to the clerk.
   - **Answer to question** (text, editable) — the clerk's answer.
   - **Store in memory** (checkbox) — lets the clerk decide whether this answer should be saved for future use.

1. Configure the task **Input mappings** to populate the question field using `fromAi()`:

   ```feel
   fromAi(toolCall.questionForClerk, "The question for the human clerk to answer. Format in markdown.")
   ```

1. Configure the **Output mappings**:
   - Set `toolCallResult` to the clerk's answer variable (for example, `answerToQuestion`).
   - Set a local variable `storeInMemory` to the value of the **Store in memory** checkbox.

## Step 4: Store answers in long-term memory

After the clerk answers a question, use an exclusive gateway to decide whether to store the answer in the vector database for future use.

1. After the **Ask clerk** user task, add an [exclusive gateway](/components/modeler/bpmn/exclusive-gateways/exclusive-gateways.md).
1. Add two outgoing sequence flows:
   - **Yes** (condition: `storeInMemory = true`) — routes to a vector database connector task.
   - **No** (condition: `storeInMemory = false`) — continues without storing.
1. On the **Yes** path, add a [vector database connector](/components/connectors/out-of-the-box-connectors/embeddings-vector-db.md) task:
   - Set **Operation** to **Embed document**.
   - Set **Document source** to **Plain text**.
   - Set the text to embed to the clerk's answer, for example: `toolCallResult.answerToQuestion`.
   - Configure the [**Embedding model**](/components/connectors/out-of-the-box-connectors/embeddings-vector-db.md#embedding-models) and [**Vector store**](/components/connectors/out-of-the-box-connectors/embeddings-vector-db.md#vector-stores) with the same settings used in [Step 1](#step-1-add-a-vector-database-query-tool).
1. Join both paths after the gateway and connect them to continue the process flow.

:::important
It is recommended to always involve a human when storing data in long-term memory. Allowing an agent to both query and populate its own knowledge base without oversight can lead to irrelevant or incorrect data being stored, which degrades the quality of future answers.
:::

## Step 5: Verify the learning loop

Run the same query again to verify that the agent can now answer from long-term memory without escalating to the clerk.

1. Click **Deploy and run**.
1. Enter the same prompt as before, for example: `I would like a Samsung phone. I live in Berlin. Can I get it delivered today?`
1. Open [Operate](/components/operate/operate-introduction.md) and observe the execution flow:
   - On the **first run**, the agent cannot find the answer in the vector database. It escalates to the clerk via the **Ask clerk** tool. The clerk provides an answer and checks **Store in memory**.
   - On the **second run** with the same or similar query, the agent finds the answer in the vector database and responds directly, **without** involving the clerk.

This demonstrates the learning pattern: as the agent encounters new questions and clerks store relevant answers, the agent's knowledge base grows, and human escalations decrease over time.

## Next steps

Now that you know how to add long-term memory to your AI agents, you can:

- [Monitor your AI agents](./monitor-ai-agents.md) with Operate.
- [Analyze your AI agents](./analyze-ai-agents.md) with Optimize — measure KPIs such as clerk contact frequency over time to track whether long-term memory is reducing human escalations.
- Learn more about the [vector database connector](/components/connectors/out-of-the-box-connectors/embeddings-vector-db.md) and [AI Agent tool definitions](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-tool-definitions.md).
- Learn more about [Camunda agentic orchestration](/components/agentic-orchestration/agentic-orchestration-overview.md) and the [AI Agent connector](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent.md).
