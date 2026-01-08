### Model provider

Select and configure authentication for the LLM model **Provider** you want to use, from the following supported providers:

- [Anthropic](http://anthropic.com/) (Claude models)
- [Amazon Bedrock](https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html)
- [Azure OpenAI](https://learn.microsoft.com/en-us/azure/ai-foundry/openai/overview)
- [Google Vertex AI](https://cloud.google.com/vertex-ai)
- [OpenAI](http://openai.com/)
- OpenAI-compatible

:::note

- Different setup/authentication fields are shown depending on the provider you select.
- Use [connector secrets](/components/console/manage-clusters/manage-secrets.md) to store credentials and avoid exposing sensitive information directly from the process.

:::

#### Timeout handling

The default timeout for model API calls is set by the runtime to 3 minutes. Self-managed Spring connector runtime instances provide the ability to override this value by setting the `camunda.connector.agenticai.aiagent.chat-model.api.default-timeout` property in the Spring application properties file.

Furthermore, you can specify a custom timeout per provider in the **Timeout** field below. Setting this value will take precedence over the default timeout.

All values must be provided in the [ISO-8601 Duration Format](https://en.wikipedia.org/wiki/ISO_8601#Durations), for example, `PT60S` for a 60-second timeout.

Check the individual provider sections below for more details, especially if there are any provider-specific limitations.

:::note
The timeout setting must not be greater than the job worker timeout, otherwise the job might be reassigned by the engine while the model call is still in progress.
:::

#### Anthropic

Select this option to use an Anthropic Claude LLM model (uses the [Anthropic Messages API](https://docs.anthropic.com/en/api/messages)).

| Field                 | Required | Description                                                                                                                                                                                                             |
| :-------------------- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Anthropic API key** | Yes      | Your Anthropic account API key for authorization to the [Anthropic Messages API](https://docs.anthropic.com/en/api/messages).                                                                                           |
| **Timeout**           | No       | Provide a timeout for Model API calls in the [ISO-8601 Duration Format](https://en.wikipedia.org/wiki/ISO_8601#Durations), for example, `PT60S` for a 60-second timeout. If left unspecified, system defaults are used. |

:::info
For more information about Anthropic Claude LLM models, refer to the [Claude models overview](https://docs.anthropic.com/en/docs/about-claude/models/all-models).
:::

#### Amazon Bedrock

Select this option to use a model provided by the [Amazon Bedrock](https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html) service, using the
[Converse](https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_Converse.html) API.

| Field              | Required | Description                                                                                                                                                                                                             |
| :----------------- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Region**         | Yes      | The AWS region. For example, `us-east-1`.                                                                                                                                                                               |
| **Authentication** | Yes      | Select the authentication method you want to use for the connector to authenticate with AWS. See [Amazon Bedrock connector authentication](../../../amazon-bedrock.md#authentication) for more details.                 |
| **Timeout**        | No       | Provide a timeout for Model API calls in the [ISO-8601 Duration Format](https://en.wikipedia.org/wiki/ISO_8601#Durations), for example, `PT60S` for a 60-second timeout. If left unspecified, system defaults are used. |

To authenticate, choose one of the methods from the **Authentication** dropdown. The supported options are:

- Use **Credentials** if you have a valid pair of access and secret keys provided by your AWS account administrator. The access key provides permissions to the Amazon Bedrock `InvokeModel` actions, as mentioned in the [AWS documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/security_iam_id-based-policy-examples.html#security_iam_id-based-policy-examples-perform-actions-pt).

:::note
This option is applicable for both SaaS and Self-Managed users.
:::

- Use **API Key** if you have a valid long-term API key for Amazon Bedrock. The associated IAM user also requires the `CallWithBearerToken` action to be attached. See [Amazon Bedrock API keys](https://docs.aws.amazon.com/bedrock/latest/userguide/api-keys.html) and [Amazon Bedrock API keys permissions](https://docs.aws.amazon.com/bedrock/latest/userguide/api-keys-modify.html) for more details.

:::note
This option is applicable for both SaaS and Self-Managed users.
:::

- Use **Default Credentials Chain** if your system is configured as an implicit authentication mechanism, such as role-based authentication, credentials supplied via environment variables, or files on target host. This approach uses the [Default Credential Provider Chain](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/credentials.html) to resolve required credentials.

:::note
This option is applicable only for Self-Managed or hybrid distributions.
:::

For more information on authentication and security in Amazon Bedrock, see [Amazon Bedrock security and privacy](https://aws.amazon.com/bedrock/security-compliance/).

Model availability depends on the region and model you use. You might need to request a model is made available for your account. To learn more about configuring access to foundation models, refer to [access to Amazon Bedrock foundation models](https://docs.aws.amazon.com/bedrock/latest/userguide/model-access-modify.html).

:::info
For a list of Amazon Bedrock LLM models, refer to [supported foundation models in Amazon Bedrock](https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html).
:::

#### Azure OpenAI

Select this option to use [Azure OpenAI models](https://learn.microsoft.com/en-us/azure/ai-foundry/openai/overview).

| Field              | Required | Description                                                                                                                                                                                                             |
| ------------------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Endpoint**       | Yes      | The Azure OpenAI endpoint URL. For example, `https://<your-resource-name>.openai.azure.com/`                                                                                                                            |
| **Authentication** | Yes      | Select the authentication method you want to use for the connector to authenticate with Azure OpenAI.                                                                                                                   |
| **Timeout**        | No       | Provide a timeout for Model API calls in the [ISO-8601 Duration Format](https://en.wikipedia.org/wiki/ISO_8601#Durations), for example, `PT60S` for a 60-second timeout. If left unspecified, system defaults are used. |

Two authentication methods are currently supported:

- **API key**: Authenticate using an Azure OpenAI API key, available in the [Azure AI Foundry portal](https://ai.azure.com/).

- **Client credentials**: Authenticate using a client ID and secret. This method requires registering an application in [Microsoft Entra ID](https://go.microsoft.com/fwlink/?linkid=2083908). Provide the following fields:
  - **Client ID** – The Microsoft Entra application ID.
  - **Client secret** – The application’s client secret.
  - **Tenant ID** – The Microsoft Entra tenant ID.
  - **Authority host** – (Optional) The authority host URL. Defaults to `https://login.microsoftonline.com/`. This can also be an OAuth 2.0 token endpoint.

:::note
To use an Azure OpenAI model, you must first deploy it in the Azure AI Foundry portal. For details, see [Deploy a model in Azure OpenAI](https://learn.microsoft.com/en-us/azure/ai-foundry/openai/how-to/create-resource#deploy-a-model). The deployment ID must then be provided in the **Model** field.
:::

#### Google Vertex AI

Select this option to use [Google Vertex AI](https://cloud.google.com/vertex-ai) models.

| Field              | Required | Description                                                                                                                        |
| ------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **Project ID**     | Yes      | The Google Cloud project ID.                                                                                                       |
| **Region**         | Yes      | The [region](https://cloud.google.com/vertex-ai/docs/general/locations#feature-availability) where AI inference should take place. |
| **Authentication** | Yes      | Select the authentication method you want to use for the connector to authenticate with Google Cloud.                              |

:::note
Timeout settings are currently not supported for Google Vertex AI models.
:::

Two authentication methods are currently supported:

- **Service Account Credentials**: Authenticate using a [service account](https://cloud.google.com/iam/docs/service-account-overview) key in JSON format.
- **Application Default Credentials (ADC)**: Authenticate using the default credentials available in your environment.  
  This method is only supported in Self-Managed or hybrid environments.  
  To set up ADC in a local development environment, follow the instructions [here](https://cloud.google.com/docs/authentication/set-up-adc-local-dev-environment).

:::info
For more information about Google Vertex AI models, see the [Vertex AI documentation](https://cloud.google.com/vertex-ai/generative-ai/docs/models).
:::

#### OpenAI

Select this option to use the [OpenAI Chat Completion API](https://platform.openai.com/docs/api-reference/chat).

| Field               | Required | Description                                                                                                                                                                                                             |
| ------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **OpenAI API key**  | Yes      | Your OpenAI account API key for authorization.                                                                                                                                                                          |
| **Organization ID** | No       | For members of multiple organizations. If you belong to multiple organizations, specify the organization ID to use for API requests with this connector.                                                                |
| **Project ID**      | No       | If you access projects through a legacy user API key, specify the project ID to use for API requests made with this connector.                                                                                          |
| **Timeout**         | No       | Provide a timeout for Model API calls in the [ISO-8601 Duration Format](https://en.wikipedia.org/wiki/ISO_8601#Durations), for example, `PT60S` for a 60-second timeout. If left unspecified, system defaults are used. |

:::info
To learn more about authentication to the OpenAPI API, refer to [OpenAPI platform API reference](https://platform.openai.com/docs/api-reference/introduction).
:::

#### OpenAI-compatible

Select this option to use an LLM provider that provides OpenAI-compatible endpoints.

| Field                | Required | Description                                                                                                                                                                                                             |
| :------------------- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **API endpoint**     | Yes      | The base URL of the OpenAI-compatible endpoint. For example, `https://api.your-llm-provider.com/v1`                                                                                                                     |
| **API key**          | No       | The API key for authentication. Leave blank if you are using HTTP headers for authentication. If an <b>Authorization</b> header is specified in the headers, the API key is ignored.                                    |
| **Headers**          | No       | Optional HTTP headers to include in the request to the OpenAI-compatible endpoint.                                                                                                                                      |
| **Query Parameters** | No       | Optional query parameters to include in the request URL to the OpenAI-compatible endpoint.                                                                                                                              |
| **Timeout**          | No       | Provide a timeout for Model API calls in the [ISO-8601 Duration Format](https://en.wikipedia.org/wiki/ISO_8601#Durations), for example, `PT60S` for a 60-second timeout. If left unspecified, system defaults are used. |

:::note
A **Custom parameters** field is available in the model parameters to provide any additional parameters supported by your OpenAI-compatible provider.
:::
