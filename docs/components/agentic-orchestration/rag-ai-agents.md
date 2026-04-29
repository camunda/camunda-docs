---
id: rag-ai-agents
title: Add long-term memory to your AI agents
sidebar_label: Add long-term memory
description: "Add long-term memory to your AI agents using RAG and the Vector Database connector."
keywords:
  ["agentic ai", "AI agents", "RAG", "vector database", "long-term memory"]
toc_max_heading_level: 2
---

Use Retrieval-Augmented Generation (RAG) with the [Vector Database connector](/components/connectors/out-of-the-box-connectors/embeddings-vector-db.md) to give your AI agents access to persistent, domain-specific knowledge that grows over time.

## When to use long-term memory

A standard AI agent operates within a fixed context window. This works well for many tasks, but becomes limiting when the agent needs access to large or frequently updated knowledge.

Long-term memory solves this by storing knowledge outside the agent in a vector database and retrieving only the most relevant fragments at runtime. Common use cases include:

- **Policy and procedure lookup**: The agent answers questions about internal rules or processes by retrieving the relevant document sections on demand.
- **Product and catalog search**: The agent finds product details, specifications, or pricing from a large catalog without loading it all into context.
- **Support knowledge base**: Answers to previously resolved questions are stored and surfaced automatically when similar questions arise in the future.
- **Compliance and audit**: The agent retrieves the exact policy text needed to justify or explain a decision, making its reasoning traceable.

## How it works

The [Vector Database connector](/components/connectors/out-of-the-box-connectors/embeddings-vector-db.md) supports two operations that together implement long-term memory:

- **Retrieve document**: Performs a semantic similarity search and returns the most relevant results from a vector index. Use this to let the agent query its knowledge base.
- **Embed document**: Converts text into a vector embedding and stores it in the vector index. Use this to add new knowledge to the agent's memory.

The LLM is responsible for generating natural language queries when retrieving, and for deciding what content is worth storing. The actual vector operations (encoding, indexing, and searching) are handled by the connector and the underlying vector store.

To configure either operation, you need:

- A supported [vector store](/components/connectors/out-of-the-box-connectors/embeddings-vector-db.md#vector-stores) and connection credentials.
- A supported [embedding model](/components/connectors/out-of-the-box-connectors/embeddings-vector-db.md#embedding-models) and its provider credentials.
- An index name that identifies the collection to read from or write to.

## Add a vector database query tool

To let an agent query a vector database, add a Vector Database connector task inside the AI Agent's [ad-hoc sub-process](/components/modeler/bpmn/ad-hoc-subprocesses/ad-hoc-subprocesses.md) with no incoming sequence flows. Tasks with no incoming flows are treated as available [tools](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-tool-definitions.md) by the AI Agent connector.

Configure the task as follows:

1. Give the task a clear **Name** and write a descriptive **Element documentation** to help the LLM understand when to use this tool. The element documentation is passed to the LLM as the [tool description](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-tool-definitions.md#tool-definitions).
2. Set **Operation** to **Retrieve document**.
3. Set **Search query** using the [`fromAi()`](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-tool-definitions.md#ai-generated-parameters-via-fromai) function so the LLM generates the query dynamically at runtime:

```feel
fromAi(toolCall.query, "The query you're making to the vector database.")
```

4. Set **Max results** to control the maximum number of documents returned. For example, set it to five.
5. Configure the [**Embedding model**](/components/connectors/out-of-the-box-connectors/embeddings-vector-db.md#embedding-models) with your provider credentials.
6. Configure the [**Vector store**](/components/connectors/out-of-the-box-connectors/embeddings-vector-db.md#vector-stores) with your database connection details and **index name**. The index name identifies the collection of documents the agent searches. You can use different indexes for different knowledge domains.

:::tip
You can make the index name dynamic using `fromAi()` so the agent selects the appropriate knowledge base for each query. For example:

```
**Index name**: fromAi("indexName", "The name of the knowledge base index to search, e.g. 'support-kb' or 'product-docs'")
```

:::

7. In the **Output mapping** section, set the output **Result variable** to `toolCallResult`.

### Handle missing or empty results

To prevent process failures when no results are retrieved, you can set an error handler to inform the agent as follows.

1. In the **Error handling** section, set the **Error expression** to handle these scenarios. For example:

```
if contains(error.message, "index_not_found") then bpmnError("index_not_found", "The index does not exist") else null
```

2. Add an [**error boundary event**](/components/modeler/bpmn/call-activities/call-activities.md#boundary-events) to the Vector Database connector:
3. In the boundary event's **Output mapping** section, add an output variable as follows:

- Set **Process variable name** to `toolCallResult`.
- Set **Variable assignment value** to:
  ```
  {
    "searchResult": "Nothing was found"
  }
  ```

## Populate the vector database

Knowledge can be loaded into the vector database in two ways:

- **Batch import**: Documents are embedded and stored before the agent starts processing, typically as part of a data preparation process. Use a Vector Database connector task configured with **Operation: Embed document** in a separate BPMN process or script.
- **Runtime ingestion**: New knowledge is added to the vector database as the agent encounters it. For example, when a human provides an answer that did not previously exist in the database.

For both approaches, configure the embed task as follows:

1. Set **Operation** to **Embed document**.
1. Set **Document source** to **Plain text** (or another supported source type).
1. Provide the text to embed. This can be a process variable, a form output, or any string value.
1. Configure the same [**Embedding model**](/components/connectors/out-of-the-box-connectors/embeddings-vector-db.md#embedding-models) and [**Vector store**](/components/connectors/out-of-the-box-connectors/embeddings-vector-db.md#vector-stores) settings used by the [retrieval tool](#add-a-vector-database-query-tool) so both operations target the same index.

## Gate memory writes with human approval

Allowing an agent to write to its own knowledge base without human oversight can lead to incorrect or irrelevant data being stored, which degrades future retrieval quality.

:::tip
It is recommended to involve a human in the decision to store new information.
:::

A common pattern is to use a [user task](/components/modeler/bpmn/user-tasks/user-tasks.md) that presents the proposed content to a reviewer, who can approve or reject storing it. To implement this:

1. After the content to be stored is available as a process variable, add a user task with a [form](/components/modeler/forms/camunda-forms-reference.md) that displays the content and includes a checkbox or approval field.
1. Add an [exclusive gateway](/components/modeler/bpmn/exclusive-gateways/exclusive-gateways.md) after the user task with two outgoing paths:
   - **Approved**: Routes to a vector database connector task with **Operation: Embed document**.
   - **Rejected**: Skips the embed step and continues the process.
1. Use the reviewer's output variable as the gateway condition.

This pattern ensures a human remains in the loop for all knowledge base updates, keeping the agent's memory accurate and trustworthy over time.

## Human escalation as a memory source

A particularly effective pattern for building long-term memory is to combine a human escalation tool with runtime knowledge ingestion. When the agent cannot find an answer in the vector database, it escalates to a human via a user task. The human's response is returned to the agent as `toolCallResult`, and if the reviewer decides it’s worth keeping, it’s also stored in the vector database for future queries.

Over time, this creates a self-improving knowledge base: as humans answer previously unknown questions, the agent's ability to resolve those questions autonomously increases and the rate of human escalations decreases.

To implement this pattern:

1. Add a [user task](/components/modeler/bpmn/user-tasks/user-tasks.md) with **no incoming flows** inside the ad-hoc sub-process. The agent will invoke it as a tool when it cannot resolve a query from its existing knowledge.
2. Configure the task's **Input mappings** to pass the agent's question to the form using `fromAi()`:

```feel
fromAi(toolCall.question, "The question the agent needs a human to answer.")
```

3. The task form should capture the human's answer and a decision about whether to store it in long-term memory.
4. Use the human's answer as `toolCallResult` so it is returned directly to the agent.
5. After the user task completes, apply the [gated memory write](#gate-memory-writes-with-human-approval) pattern described above to conditionally store the answer in the vector database.
