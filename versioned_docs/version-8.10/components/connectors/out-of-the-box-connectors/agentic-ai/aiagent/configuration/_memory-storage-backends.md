#### Choose a memory storage backend

These are the available storage backend options:

- **[In-process storage](#in-process-storage)** is the default option and stores conversation messages as part of the agent context process variable, subject to [variable size limitations](../../../../../concepts/variables.md#variable-size-limitation).
- **[Camunda document storage](#camunda-document-storage)** stores conversation messages as a JSON document in [document storage](../../../../../document-handling/getting-started.md). This avoids the process variable size limitation, but you must configure a time-to-live (TTL) that matches your process's expected lifetime to avoid losing history.
- **[AWS AgentCore Memory](#aws-agentcore-memory)** stores conversation messages as events in [Amazon Bedrock AgentCore Memory](https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/memory.html), an AWS-managed memory service with built-in long-term memory extraction. This offloads storage to an AWS-managed service, but adds an external dependency and its own setup and authentication requirements.
- Custom implementation uses a custom storage implementation through a customized connector runtime, available only in Self-Managed or hybrid setups. This gives you full control over how messages are stored, at the cost of building and maintaining the implementation yourself.

Evaluate these trade-offs against your process's expected lifetime, conversation size, and external dependencies to choose the backend that fits your use case.

:::note
Operate's conversation history comes from the [Agent Instance API](/apis-tools/orchestration-cluster-api-rest/specifications/get-agent-instance.api.mdx), a separate representation from wherever the agent context itself is stored. See [agent context and memory](/components/agentic-orchestration/agent-definitions-and-instances.md#agent-context-and-memory) for how the two relate. The backend you choose here only changes where the messages are durably stored for the agent's own context window, and whether you can also inspect them directly, for example as a raw process variable.
:::

#### In-process storage

Messages passed between the AI agent and the model are stored within the agent context process variable, so you can also inspect them directly as raw JSON in the element's **Variables** tab in Operate.

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
