Depending on your use case, you can store the conversation memory in different storage backends.

| Field               | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| :------------------ | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Memory storage type | Yes      | <p>Specify how the conversation memory should be stored.</p><ul><li>In Process (part of agent context): conversation messages will be stored as process variable and be subject to [variable size limitations](../../../../../concepts/variables.md). This is the default value.</li><li>Camunda Document Storage: messages will be stored as a JSON document in [document storage](../../../../../document-handling/getting-started.md).</li><li>AWS AgentCore Memory: messages will be stored as events in [Amazon Bedrock AgentCore Memory](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/memory.html), an AWS-managed memory service with built-in long-term memory extraction.</li><li>Custom Implementation (Hybrid/Self-Managed only): a custom storage implementation using a customized connector runtime.</li></ul> |
| Context window size | No       | <p>Specify the maximum number of messages to pass to the LLM on every call. Defaults to `20` if not configured.</p><ul><li>Configuring this is a trade-off between cost/tokens and the context window supported by the used model.</li><li>When the conversation exceeds the configured context window size, the oldest messages from past feedback loops are omitted from the model API call first.</li><li>The system prompt is always kept in the list of messages passed to the LLM.</li></ul>                                                                                                                                                                                                                                                                                                                                            |

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

#### AWS AgentCore Memory

Messages passed between the AI agent and the model are stored as events in [Amazon Bedrock AgentCore Memory](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/memory.html). In addition to short-term conversation replay, AgentCore Memory automatically extracts long-term memory insights from conversational messages, enabling your agent to build up knowledge across sessions.

You must [create an AgentCore Memory resource](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/memory-create-a-memory-store.html) in your AWS account before configuring this storage type.

| Field          | Required | Description                                                                                                                                                                     |
| :------------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Region         | Yes      | The AWS region where the AgentCore Memory resource is located. For example, `us-east-1`.                                                                                        |
| Endpoint       | No       | Custom API endpoint for VPC/PrivateLink configurations, AWS GovCloud, or other non-standard deployments.                                                                        |
| Authentication | Yes      | Select the authentication method for AgentCore Memory access.                                                                                                                   |
| Memory ID      | Yes      | The ID of the pre-provisioned AgentCore Memory resource.                                                                                                                        |
| Actor ID       | Yes      | Identifier of the actor associated with memory events (for example, end-user or agent/user combination). Supports [FEEL expressions](/components/modeler/feel/what-is-feel.md). |

To authenticate, choose one of the methods from the **Authentication** dropdown:

- Use **Credentials** if you have a valid pair of access and secret keys. The IAM user requires permissions for the `bedrock-agentcore:CreateEvent` and `bedrock-agentcore:ListEvents` actions.

:::note
This option is applicable for both SaaS and Self-Managed users.
:::

- Use **Default Credentials Chain** if your system is configured with an implicit authentication mechanism, such as role-based authentication, credentials supplied via environment variables, or files on target host. This approach uses the [Default Credential Provider Chain](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/credentials.html) to resolve required credentials.

:::note
This option is applicable only for Self-Managed or hybrid distributions.
:::

#### Custom implementation

:::info
This option is only supported if you are using a customized AI Agent connector in a Self-Managed or hybrid setup.
See [customization](../../../agentic-ai-aiagent-customization.md) for more details.
:::

| Field               | Required | Description                                                                                                                                                                         |
| :------------------ | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Implementation type | Yes      | <p>The **type** identifier of your custom storage implementation. See [customization](../../../agentic-ai-aiagent-customization.md#custom-conversation-storage) for an example.</p> |
| Parameters          | No       | <p>Optional map of parameters to be passed to the storage implementation.</p>                                                                                                       |
