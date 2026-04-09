### Model provider

:::note

- Different setup/authentication fields are shown depending on the provider you select.
- Use [connector secrets](/components/console/manage-clusters/manage-secrets.md) to store credentials and avoid exposing sensitive information directly from the process.

:::

#### Timeout handling

The default timeout for model API calls is set to three minutes by the runtime. Self-managed Spring connector runtime instances allow you to override this value by setting the `camunda.connector.agenticai.aiagent.chat-model.api.default-timeout` property in the Spring application properties file.

You can also specify a custom timeout per provider in the **Timeout** field below. This value takes precedence over the default timeout.

All values must be provided in the [ISO-8601 duration format](https://en.wikipedia.org/wiki/ISO_8601#Durations), for example, `PT60S` for a 60-second timeout.

For more details, see the individual provider sections below, especially for any provider-specific limitations.

:::important
The timeout setting must not exceed the job worker timeout; otherwise, the job may be reassigned by the engine while the model call is still in progress.
:::

#### General Properties

| Property | Type     | Required | Description                      | Binding                                            |
| :------- | :------- | :------- | :------------------------------- | :------------------------------------------------- |
| Provider | Dropdown | False    | Specify the LLM provider to use. | `{'name': 'provider.type', 'type': 'zeebe:input'}` |

#### Anthropic

| Property          | Type   | Required | Description                                                                                                           | Binding                                                                       |
| :---------------- | :----- | :------- | :-------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------- |
| Endpoint          | String | False    | Optional custom API endpoint                                                                                          | `{'name': 'provider.anthropic.endpoint', 'type': 'zeebe:input'}`              |
| Anthropic API key | String | True     | None                                                                                                                  | `{'name': 'provider.anthropic.authentication.apiKey', 'type': 'zeebe:input'}` |
| Timeout           | String | False    | Timeout specification for API calls to the model provider defined as ISO-8601 duration (example: <code>PT60S</code>). | `{'name': 'provider.anthropic.timeouts.timeout', 'type': 'zeebe:input'}`      |

#### Bedrock

| Property       | Type     | Required | Description                                                                                                                                                                                                             | Binding                                                                   |
| :------------- | :------- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------ |
| Region         | String   | True     | Specify the AWS region (example: <code>eu-west-1</code>)                                                                                                                                                                | `{'name': 'provider.bedrock.region', 'type': 'zeebe:input'}`              |
| Endpoint       | String   | False    | Optional custom API endpoint                                                                                                                                                                                            | `{'name': 'provider.bedrock.endpoint', 'type': 'zeebe:input'}`            |
| Authentication | Dropdown | False    | Specify the AWS authentication strategy. Learn more at the <a href="https://docs.camunda.io/docs/components/connectors/out-of-the-box-connectors/amazon-bedrock/#authentication" target="_blank">documentation page</a> | `{'name': 'provider.bedrock.authentication.type', 'type': 'zeebe:input'}` |
| Timeout        | String   | False    | Timeout specification for API calls to the model provider defined as ISO-8601 duration (example: <code>PT60S</code>).                                                                                                   | `{'name': 'provider.bedrock.timeouts.timeout', 'type': 'zeebe:input'}`    |

#### Credentials And Bedrock

| Property   | Type   | Required | Description                                                                             | Binding                                                                        |
| :--------- | :----- | :------- | :-------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------- |
| Access key | String | True     | Provide an IAM access key tailored to a user, equipped with the necessary permissions   | `{'name': 'provider.bedrock.authentication.accessKey', 'type': 'zeebe:input'}` |
| Secret key | String | True     | Provide a secret key of a user with permissions to invoke specified AWS Lambda function | `{'name': 'provider.bedrock.authentication.secretKey', 'type': 'zeebe:input'}` |

#### Apikey And Bedrock

| Property | Type   | Required | Description                                                                    | Binding                                                                     |
| :------- | :----- | :------- | :----------------------------------------------------------------------------- | :-------------------------------------------------------------------------- |
| API Key  | String | True     | Provide an API Key with permissions to interact with your AWS Bedrock Instance | `{'name': 'provider.bedrock.authentication.apiKey', 'type': 'zeebe:input'}` |

#### Azureopenai

| Property       | Type     | Required | Description                                                                                                                                                    | Binding                                                                       |
| :------------- | :------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------- |
| Endpoint       | String   | True     | Specify Azure OpenAI endpoint. Details in the <a href="https://learn.microsoft.com/en-us/azure/ai-foundry/openai/reference" target="_blank">documentation</a>. | `{'name': 'provider.azureOpenAi.endpoint', 'type': 'zeebe:input'}`            |
| Authentication | Dropdown | False    | Specify the Azure OpenAI authentication strategy.                                                                                                              | `{'name': 'provider.azureOpenAi.authentication.type', 'type': 'zeebe:input'}` |
| Timeout        | String   | False    | Timeout specification for API calls to the model provider defined as ISO-8601 duration (example: <code>PT60S</code>).                                          | `{'name': 'provider.azureOpenAi.timeouts.timeout', 'type': 'zeebe:input'}`    |

#### Apikey And Azureopenai

| Property | Type   | Required | Description | Binding                                                                         |
| :------- | :----- | :------- | :---------- | :------------------------------------------------------------------------------ |
| API key  | String | True     | None        | `{'name': 'provider.azureOpenAi.authentication.apiKey', 'type': 'zeebe:input'}` |

#### Clientcredentials And Azureopenai

| Property       | Type   | Required | Description                                                                                                                                                            | Binding                                                                                |
| :------------- | :----- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------- |
| Client ID      | String | True     | ID of a Microsoft Entra application                                                                                                                                    | `{'name': 'provider.azureOpenAi.authentication.clientId', 'type': 'zeebe:input'}`      |
| Client secret  | String | True     | Secret of a Microsoft Entra application                                                                                                                                | `{'name': 'provider.azureOpenAi.authentication.clientSecret', 'type': 'zeebe:input'}`  |
| Tenant ID      | String | True     | ID of a Microsoft Entra tenant. Details in the <a href="https://learn.microsoft.com/en-us/entra/fundamentals/how-to-find-tenant" target="_blank">documentation</a>.    | `{'name': 'provider.azureOpenAi.authentication.tenantId', 'type': 'zeebe:input'}`      |
| Authority host | String | False    | Authority host URL for the Microsoft Entra application. Defaults to <code>https://login.microsoftonline.com</code>. This can also contain an OAuth 2.0 token endpoint. | `{'name': 'provider.azureOpenAi.authentication.authorityHost', 'type': 'zeebe:input'}` |

#### Google-Vertex-Ai

| Property       | Type     | Required | Description                                             | Binding                                                                          |
| :------------- | :------- | :------- | :------------------------------------------------------ | :------------------------------------------------------------------------------- |
| Project ID     | String   | True     | Specify Google Cloud project ID                         | `{'name': 'provider.googleVertexAi.projectId', 'type': 'zeebe:input'}`           |
| Region         | String   | True     | Specify the region where AI inference should take place | `{'name': 'provider.googleVertexAi.region', 'type': 'zeebe:input'}`              |
| Authentication | Dropdown | False    | Specify the Google Vertex AI authentication strategy.   | `{'name': 'provider.googleVertexAi.authentication.type', 'type': 'zeebe:input'}` |

#### Serviceaccountcredentials And Google-Vertex-Ai

| Property                        | Type   | Required | Description                                            | Binding                                                                             |
| :------------------------------ | :----- | :------- | :----------------------------------------------------- | :---------------------------------------------------------------------------------- |
| JSON key of the service account | String | True     | This is the key of the service account in JSON format. | `{'name': 'provider.googleVertexAi.authentication.jsonKey', 'type': 'zeebe:input'}` |

#### Openai

| Property        | Type   | Required | Description                                                                                                                                                      | Binding                                                                            |
| :-------------- | :----- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------- |
| OpenAI API key  | String | True     | None                                                                                                                                                             | `{'name': 'provider.openai.authentication.apiKey', 'type': 'zeebe:input'}`         |
| Organization ID | String | False    | For members of multiple organizations. Details in the <a href="https://platform.openai.com/docs/api-reference/authentication" target="_blank">documentation</a>. | `{'name': 'provider.openai.authentication.organizationId', 'type': 'zeebe:input'}` |
| Project ID      | String | False    | For accounts with multiple projects. Details in the <a href="https://platform.openai.com/docs/api-reference/authentication" target="_blank">documentation</a>.   | `{'name': 'provider.openai.authentication.projectId', 'type': 'zeebe:input'}`      |
| Timeout         | String | False    | Timeout specification for API calls to the model provider defined as ISO-8601 duration (example: <code>PT60S</code>).                                            | `{'name': 'provider.openai.timeouts.timeout', 'type': 'zeebe:input'}`              |

#### Openaicompatible

| Property         | Type   | Required | Description                                                                                                           | Binding                                                                              |
| :--------------- | :----- | :------- | :-------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------- |
| API endpoint     | String | True     | None                                                                                                                  | `{'name': 'provider.openaiCompatible.endpoint', 'type': 'zeebe:input'}`              |
| API key          | String | False    | None                                                                                                                  | `{'name': 'provider.openaiCompatible.authentication.apiKey', 'type': 'zeebe:input'}` |
| Headers          | String | False    | Map of HTTP headers to add to the request.                                                                            | `{'name': 'provider.openaiCompatible.headers', 'type': 'zeebe:input'}`               |
| Query Parameters | String | False    | Map of query parameters to add to the request URL.                                                                    | `{'name': 'provider.openaiCompatible.queryParameters', 'type': 'zeebe:input'}`       |
| Timeout          | String | False    | Timeout specification for API calls to the model provider defined as ISO-8601 duration (example: <code>PT60S</code>). | `{'name': 'provider.openaiCompatible.timeouts.timeout', 'type': 'zeebe:input'}`      |

Some content after the section...

### Model

#### Anthropic

| Property       | Type   | Required | Description                                                                                                                                         | Binding                                                                              |
| :------------- | :----- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------- |
| Model          | String | True     | Specify the model ID. Details in the <a href="https://docs.anthropic.com/en/docs/about-claude/models/all-models" target="_blank">documentation</a>. | `{'name': 'provider.anthropic.model.model', 'type': 'zeebe:input'}`                  |
| Maximum tokens | Number | False    | None                                                                                                                                                | `{'name': 'provider.anthropic.model.parameters.maxTokens', 'type': 'zeebe:input'}`   |
| Temperature    | Number | False    | None                                                                                                                                                | `{'name': 'provider.anthropic.model.parameters.temperature', 'type': 'zeebe:input'}` |
| top P          | Number | False    | None                                                                                                                                                | `{'name': 'provider.anthropic.model.parameters.topP', 'type': 'zeebe:input'}`        |
| top K          | Number | False    | None                                                                                                                                                | `{'name': 'provider.anthropic.model.parameters.topK', 'type': 'zeebe:input'}`        |

#### Bedrock

| Property       | Type   | Required | Description                                                                                                                                           | Binding                                                                            |
| :------------- | :----- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------- |
| Model          | String | True     | Specify the model ID. Details in the <a href="https://docs.aws.amazon.com/bedrock/latest/userguide/model-ids.html" target="_blank">documentation</a>. | `{'name': 'provider.bedrock.model.model', 'type': 'zeebe:input'}`                  |
| Maximum tokens | Number | False    | None                                                                                                                                                  | `{'name': 'provider.bedrock.model.parameters.maxTokens', 'type': 'zeebe:input'}`   |
| Temperature    | Number | False    | None                                                                                                                                                  | `{'name': 'provider.bedrock.model.parameters.temperature', 'type': 'zeebe:input'}` |
| top P          | Number | False    | None                                                                                                                                                  | `{'name': 'provider.bedrock.model.parameters.topP', 'type': 'zeebe:input'}`        |

#### Azureopenai

| Property              | Type   | Required | Description                                                                                                                                                        | Binding                                                                                |
| :-------------------- | :----- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------- |
| Model deployment name | String | True     | Specify the model deployment name. Details in the <a href="https://learn.microsoft.com/en-us/azure/ai-foundry/openai/reference" target="_blank">documentation</a>. | `{'name': 'provider.azureOpenAi.model.deploymentName', 'type': 'zeebe:input'}`         |
| Maximum tokens        | Number | False    | None                                                                                                                                                               | `{'name': 'provider.azureOpenAi.model.parameters.maxTokens', 'type': 'zeebe:input'}`   |
| Temperature           | Number | False    | None                                                                                                                                                               | `{'name': 'provider.azureOpenAi.model.parameters.temperature', 'type': 'zeebe:input'}` |
| top P                 | Number | False    | None                                                                                                                                                               | `{'name': 'provider.azureOpenAi.model.parameters.topP', 'type': 'zeebe:input'}`        |

#### Google-Vertex-Ai

| Property              | Type   | Required | Description                                                                                                                                    | Binding                                                                                       |
| :-------------------- | :----- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------- |
| Model                 | String | True     | Specify the model ID. Details in the <a href="https://cloud.google.com/vertex-ai/docs/generative-ai/models" target="_blank">documentation</a>. | `{'name': 'provider.googleVertexAi.model.model', 'type': 'zeebe:input'}`                      |
| Maximum output tokens | Number | False    | None                                                                                                                                           | `{'name': 'provider.googleVertexAi.model.parameters.maxOutputTokens', 'type': 'zeebe:input'}` |
| Temperature           | Number | False    | None                                                                                                                                           | `{'name': 'provider.googleVertexAi.model.parameters.temperature', 'type': 'zeebe:input'}`     |
| top P                 | Number | False    | None                                                                                                                                           | `{'name': 'provider.googleVertexAi.model.parameters.topP', 'type': 'zeebe:input'}`            |
| top K                 | Number | False    | None                                                                                                                                           | `{'name': 'provider.googleVertexAi.model.parameters.topK', 'type': 'zeebe:input'}`            |

#### Openai

| Property                  | Type   | Required | Description                                                                                                               | Binding                                                                                   |
| :------------------------ | :----- | :------- | :------------------------------------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------- |
| Model                     | String | True     | Specify the model ID. Details in the <a href="https://platform.openai.com/docs/models" target="_blank">documentation</a>. | `{'name': 'provider.openai.model.model', 'type': 'zeebe:input'}`                          |
| Maximum completion tokens | Number | False    | None                                                                                                                      | `{'name': 'provider.openai.model.parameters.maxCompletionTokens', 'type': 'zeebe:input'}` |
| Temperature               | Number | False    | None                                                                                                                      | `{'name': 'provider.openai.model.parameters.temperature', 'type': 'zeebe:input'}`         |
| top P                     | Number | False    | None                                                                                                                      | `{'name': 'provider.openai.model.parameters.topP', 'type': 'zeebe:input'}`                |

#### Openaicompatible

| Property                  | Type   | Required | Description                                                                                                               | Binding                                                                                             |
| :------------------------ | :----- | :------- | :------------------------------------------------------------------------------------------------------------------------ | :-------------------------------------------------------------------------------------------------- |
| Model                     | String | True     | Specify the model ID. Details in the <a href="https://platform.openai.com/docs/models" target="_blank">documentation</a>. | `{'name': 'provider.openaiCompatible.model.model', 'type': 'zeebe:input'}`                          |
| Maximum completion tokens | Number | False    | None                                                                                                                      | `{'name': 'provider.openaiCompatible.model.parameters.maxCompletionTokens', 'type': 'zeebe:input'}` |
| Temperature               | Number | False    | None                                                                                                                      | `{'name': 'provider.openaiCompatible.model.parameters.temperature', 'type': 'zeebe:input'}`         |
| top P                     | Number | False    | None                                                                                                                      | `{'name': 'provider.openaiCompatible.model.parameters.topP', 'type': 'zeebe:input'}`                |
| Custom parameters         | String | False    | Map of additional request parameters to include.                                                                          | `{'name': 'provider.openaiCompatible.model.parameters.customParameters', 'type': 'zeebe:input'}`    |

<!-- No hook found. Expected location: out-of-the-box-connectors/reference_partial_hooks/_agenticai-aiagent-outbound-connector__after_model.md -->

### System prompt

A system prompt is a set of foundational instructions given to a model before any user interaction begins. It defines the AI agent’s role, behavior, tone, and communication style, ensuring that responses remain consistent and aligned with the AI agent’s intended purpose. These instructions help shape how the model interprets and responds to user input throughout the conversation.

#### General Properties

| Property      | Type | Required | Description | Binding                                                       |
| :------------ | :--- | :------- | :---------- | :------------------------------------------------------------ |
| System prompt | Text | True     | None        | `{'name': 'data.systemPrompt.prompt', 'type': 'zeebe:input'}` |

<!-- No hook found. Expected location: out-of-the-box-connectors/reference_partial_hooks/_agenticai-aiagent-outbound-connector__after_systemPrompt.md -->

### User prompt

A user prompt is the message or question you give to the AI to start or continue a conversation. It tells the AI what you need, whether it's information, help with a task, or just a chat. The AI uses your prompt to understand how to respond.

#### General Properties

| Property    | Type   | Required | Description                                  | Binding                                                        |
| :---------- | :----- | :------- | :------------------------------------------- | :------------------------------------------------------------- |
| User prompt | Text   | True     | None                                         | `{'name': 'data.userPrompt.prompt', 'type': 'zeebe:input'}`    |
| Documents   | String | False    | Documents to be included in the user prompt. | `{'name': 'data.userPrompt.documents', 'type': 'zeebe:input'}` |

<!-- No hook found. Expected location: out-of-the-box-connectors/reference_partial_hooks/_agenticai-aiagent-outbound-connector__after_userPrompt.md -->

### Tools

Tools are optional features the AI Agent can use to perform specific tasks. Configure this if the agent should participate in a tools feedback loop.

#### General Properties

| Property              | Type   | Required | Description                                                         | Binding                                                            |
| :-------------------- | :----- | :------- | :------------------------------------------------------------------ | :----------------------------------------------------------------- |
| Ad-hoc sub-process ID | String | False    | ID of the sub-process that contains the tools the AI agent can use. | `{'name': 'data.tools.containerElementId', 'type': 'zeebe:input'}` |
| Tool call results     | Text   | False    | Tool call results as returned by the sub-process.                   | `{'name': 'data.tools.toolCallResults', 'type': 'zeebe:input'}`    |

<!-- No hook found. Expected location: out-of-the-box-connectors/reference_partial_hooks/_agenticai-aiagent-outbound-connector__after_tools.md -->

### Memory

Configuration of the Agent's short-term/conversational memory.

#### General Properties

| Property            | Type     | Required | Description                                                                                     | Binding                                                            |
| :------------------ | :------- | :------- | :---------------------------------------------------------------------------------------------- | :----------------------------------------------------------------- |
| Agent context       | Text     | True     | Avoid reusing context variables across agents to prevent issues with stale data or tool access. | `{'name': 'data.context', 'type': 'zeebe:input'}`                  |
| Memory storage type | Dropdown | False    | Specify how to store the conversation memory.                                                   | `{'name': 'data.memory.storage.type', 'type': 'zeebe:input'}`      |
| Context window size | Number   | True     | Maximum number of recent conversation messages which are passed to the model.                   | `{'name': 'data.memory.contextWindowSize', 'type': 'zeebe:input'}` |

#### Camunda-Document

| Property                   | Type   | Required | Description                                                                                     | Binding                                                                   |
| :------------------------- | :----- | :------- | :---------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------ |
| Document TTL               | String | False    | How long to retain the conversation document as ISO-8601 duration (example: <code>P14D</code>). | `{'name': 'data.memory.storage.timeToLive', 'type': 'zeebe:input'}`       |
| Custom document properties | String | False    | An optional map of custom properties to be stored with the conversation document.               | `{'name': 'data.memory.storage.customProperties', 'type': 'zeebe:input'}` |

#### Custom

| Property            | Type   | Required | Description                                              | Binding                                                             |
| :------------------ | :----- | :------- | :------------------------------------------------------- | :------------------------------------------------------------------ |
| Implementation type | String | True     | None                                                     | `{'name': 'data.memory.storage.storeType', 'type': 'zeebe:input'}`  |
| Parameters          | String | False    | Parameters for the custom memory storage implementation. | `{'name': 'data.memory.storage.parameters', 'type': 'zeebe:input'}` |

<!-- No hook found. Expected location: out-of-the-box-connectors/reference_partial_hooks/_agenticai-aiagent-outbound-connector__after_memory.md -->

### Limits

#### General Properties

| Property            | Type   | Required | Description                                                                       | Binding                                                        |
| :------------------ | :----- | :------- | :-------------------------------------------------------------------------------- | :------------------------------------------------------------- |
| Maximum model calls | Number | True     | Maximum number of calls to the model as a safety limit to prevent infinite loops. | `{'name': 'data.limits.maxModelCalls', 'type': 'zeebe:input'}` |

<!-- No hook found. Expected location: out-of-the-box-connectors/reference_partial_hooks/_agenticai-aiagent-outbound-connector__after_limits.md -->

### Response

Configuration of the model response format and how to map the model response to the connector result.<br /><br />Depending on the selection, the model response will be available as <code>response.responseText</code> or <code>response.responseJson</code>.<br /><br />See <a href="https://docs.camunda.io/docs/8.9/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-task/#response">documentation</a> for details.

#### General Properties

| Property                  | Type     | Required | Description                                                            | Binding                                                                    |
| :------------------------ | :------- | :------- | :--------------------------------------------------------------------- | :------------------------------------------------------------------------- |
| Response format           | Dropdown | False    | Specify the response format. Support for JSON mode varies by provider. | `{'name': 'data.response.format.type', 'type': 'zeebe:input'}`             |
| Include assistant message | Boolean  | False    | Include the full assistant message as part of the result object.       | `{'name': 'data.response.includeAssistantMessage', 'type': 'zeebe:input'}` |

#### Text

| Property           | Type    | Required | Description                                          | Binding                                                             |
| :----------------- | :------ | :------- | :--------------------------------------------------- | :------------------------------------------------------------------ |
| Parse text as JSON | Boolean | False    | Tries to parse the LLM response text as JSON object. | `{'name': 'data.response.format.parseJson', 'type': 'zeebe:input'}` |

#### Json

| Property                  | Type   | Required | Description                                                                                                                                     | Binding                                                              |
| :------------------------ | :----- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------- |
| Response JSON schema      | String | False    | An optional response <a href="https://json-schema.org/" target="_blank">JSON Schema</a> to instruct the model how to structure the JSON output. | `{'name': 'data.response.format.schema', 'type': 'zeebe:input'}`     |
| Response JSON schema name | String | False    | An optional name for the response JSON Schema to make the model aware of the expected output.                                                   | `{'name': 'data.response.format.schemaName', 'type': 'zeebe:input'}` |

<!-- No hook found. Expected location: out-of-the-box-connectors/reference_partial_hooks/_agenticai-aiagent-outbound-connector__after_response.md -->

### Connector

#### General Properties

| Property | Type   | Required | Description                     | Binding                                                         |
| :------- | :----- | :------- | :------------------------------ | :-------------------------------------------------------------- |
| Version  | Hidden | False    | Version of the element template | `{'key': 'elementTemplateVersion', 'type': 'zeebe:taskHeader'}` |
| ID       | Hidden | False    | ID of the element template      | `{'key': 'elementTemplateId', 'type': 'zeebe:taskHeader'}`      |

<!-- No hook found. Expected location: out-of-the-box-connectors/reference_partial_hooks/_agenticai-aiagent-outbound-connector__after_connector.md -->

### Output mapping

#### General Properties

| Property          | Type   | Required | Description                                           | Binding                                                   |
| :---------------- | :----- | :------- | :---------------------------------------------------- | :-------------------------------------------------------- |
| Result variable   | String | False    | Name of variable to store the response in             | `{'key': 'resultVariable', 'type': 'zeebe:taskHeader'}`   |
| Result expression | Text   | False    | Expression to map the response into process variables | `{'key': 'resultExpression', 'type': 'zeebe:taskHeader'}` |

<!-- No hook found. Expected location: out-of-the-box-connectors/reference_partial_hooks/_agenticai-aiagent-outbound-connector__after_output.md -->

### Error handling

#### General Properties

| Property         | Type | Required | Description                                                                                                                                                 | Binding                                                  |
| :--------------- | :--- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------- |
| Error expression | Text | False    | Expression to handle errors. Details in the <a href="https://docs.camunda.io/docs/components/connectors/use-connectors/" target="_blank">documentation</a>. | `{'key': 'errorExpression', 'type': 'zeebe:taskHeader'}` |

In the error expression, you can handle the following error codes emitted by the AI Agent connector to respond to specific situations. For example, you can map a specific error code to a BPMN error and model
your process accordingly.

| Error code                                   | Description                                                                                                                                                                                       |
| :------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `FAILED_MODEL_CALL`                          | The call to the LLM API failed, for example, due to misconfiguration or invalid credentials. The error message contains additional details.                                                       |
| `FAILED_TO_PARSE_RESPONSE_CONTENT`           | The AI Agent was configured to parse the LLM response as JSON, but parsing failed.                                                                                                                |
| `MAXIMUM_NUMBER_OF_MODEL_CALLS_REACHED`      | The AI Agent reached the configured maximum number of model calls.                                                                                                                                |
| `MIGRATION_MISSING_TOOLS`                    | Tools referenced by the AI Agent were removed after a process instance migration. Removing or renaming tools is not supported. See process instance migrations for more details.                  |
| `MIGRATION_GATEWAY_TOOL_DEFINITIONS_CHANGED` | Gateway tool definitions have changed after a process instance migration. Adding or removing gateway tools to a running agent is not supported. See process instance migrations for more details. |
| `NO_USER_MESSAGE_CONTENT`                    | No user message content, either from a user prompt or a document, was provided to the agent.                                                                                                      |
| `TOOL_CALL_RESULTS_ON_EMPTY_CONTEXT`         | Tool call results were passed to the AI Agent despite an empty context, which typically indicates a misconfiguration of the agent context.                                                        |

### Retries

#### General Properties

| Property      | Type   | Required | Description                               | Binding                                                   |
| :------------ | :----- | :------- | :---------------------------------------- | :-------------------------------------------------------- |
| Retries       | String | False    | Number of retries                         | `{'property': 'retries', 'type': 'zeebe:taskDefinition'}` |
| Retry backoff | String | False    | ISO-8601 duration to wait between retries | `{'key': 'retryBackoff', 'type': 'zeebe:taskHeader'}`     |

<!-- No hook found. Expected location: out-of-the-box-connectors/reference_partial_hooks/_agenticai-aiagent-outbound-connector__after_retries.md -->
