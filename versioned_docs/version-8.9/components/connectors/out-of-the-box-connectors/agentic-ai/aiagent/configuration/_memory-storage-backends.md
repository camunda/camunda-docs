#### Choose a memory storage backend

These are the available storage backend options:

- **[In-process storage](#in-process-storage)** is the default option and stores conversation messages as part of the agent context process variable. It keeps the conversation directly visible in Operate, which is useful when inspecting agent behavior, but is subject to [variable size limitations](../../../../../concepts/variables.md#variable-size-limitation).
- **[Camunda document storage](#camunda-document-storage)** stores conversation messages as a JSON document in [document storage](../../../../../document-handling/getting-started.md). This avoids the process variable size limitation, but the conversation isn't directly visible in Operate, and you must configure a time-to-live (TTL) that matches your process's expected lifetime to avoid losing history.
- Custom implementation uses a custom storage implementation through a customized connector runtime, available only in Self-Managed or hybrid setups. This gives you full control over how messages are stored, at the cost of building and maintaining the implementation yourself.

Evaluate these trade-offs against your process's expected lifetime, conversation size, and observability needs to choose the backend that fits your use case.

#### In-process storage

Messages passed between the AI agent and the model are stored within the agent context variable and directly visible in Operate.

This is suitable for many use cases, but you must be aware of the [variable size limitations](../../../../../concepts/variables.md) that limit the amount of data that can be stored in the process variable.

#### Camunda document storage

Messages passed between the AI agent and the model are not directly available as process variable but reference a JSON document stored in [document storage](../../../../../document-handling/getting-started.md).

As documents are subject to expiration, to avoid losing the conversation history you must be able to predict the expected lifetime of your process, so you can correctly configure the document time-to-live (TTL).

| Field                      | Required | Description                                                                                                                                                                                                                                                                                 |
| :------------------------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Document TTL               | No       | <p>Time-to-live (TTL) for documents containing the conversation history. Use this field to set a custom TTL matching your expected process lifetime.</p><p>The [default cluster TTL](../../../../../document-handling/getting-started.md#saas) is used if this value is not configured.</p> |
| Custom document properties | No       | <p>Optional map of properties to store with the document.</p><p>Use this option to reference custom metadata you might want to use when further processing conversation documents.</p>                                                                                                      |
