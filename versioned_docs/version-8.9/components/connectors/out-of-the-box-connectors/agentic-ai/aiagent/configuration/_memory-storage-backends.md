Depending on your use case, you can store the conversation memory in different storage backends.

| Field               | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| :------------------ | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Memory storage type | Yes      | <p>Specify how the conversation memory should be stored.</p><ul><li>In Process (part of agent context): conversation messages will be stored as process variable and be subject to [variable size limitations](../../../../../concepts/variables.md). This is the default value.</li><li>Camunda Document Storage: messages will be stored as a JSON document in [document storage](../../../../../document-handling/getting-started.md).</li><li>Custom Implementation (Hybrid/Self-Managed only): a custom storage implementation using a customized connector runtime.</li></ul> |
| Context window size | No       | <p>Specify the maximum number of messages to pass to the LLM on every call. Defaults to `20` if not configured.</p><ul><li>Configuring this is a trade-off between cost/tokens and the context window supported by the used model.</li><li>When the conversation exceeds the configured context window size, the oldest messages from past feedback loops are omitted from the model API call first.</li><li>The system prompt is always kept in the list of messages passed to the LLM.</li></ul>                                                                                  |

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

#### Custom implementation

:::info
This option is only supported if you are using a customized AI Agent connector in a Self-Managed or hybrid setup.
See [customization](../../../agentic-ai-aiagent-customization.md) for more details.
:::

| Field               | Required | Description                                                                                                                                                                         |
| :------------------ | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Implementation type | Yes      | <p>The **type** identifier of your custom storage implementation. See [customization](../../../agentic-ai-aiagent-customization.md#custom-conversation-storage) for an example.</p> |
| Parameters          | No       | <p>Optional map of parameters to be passed to the storage implementation.</p>                                                                                                       |
