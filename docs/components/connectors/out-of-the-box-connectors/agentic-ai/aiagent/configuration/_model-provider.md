### Model Provider

Select and configure authentication for the LLM model **Provider** you want to use, from the following supported
providers:

- [Anthropic](http://anthropic.com/) (Claude models)
- [Amazon Bedrock](https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html)
- [Azure OpenAI](https://learn.microsoft.com/en-us/azure/ai-foundry/openai/overview)
- [Google Vertex AI](https://cloud.google.com/vertex-ai)
- [OpenAI](http://openai.com/)
- OpenAI-compatible

:::note

- Different setup/authentication fields are shown depending on the provider you select.
- Use [connector secrets](/components/console/manage-clusters/manage-secrets.md) to store credentials and avoid exposing
  sensitive information directly from the process.

:::

#### Anthropic

Select this option to use an Anthropic Claude LLM model (uses
the [Anthropic Messages API](https://docs.anthropic.com/en/api/messages)).

| Field                 | Required | Description                                                                                                                                                                                                         |
| :-------------------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Anthropic API key** | Yes      | Your Anthropic account API key for authorization to the [Anthropic Messages API](https://docs.anthropic.com/en/api/messages).                                                                                       |
| **Timeout**           | No       | Provide a timeout for Model API calls in the [ISO-8601 Duration Format](https://en.wikipedia.org/wiki/ISO_8601#Durations), e.g. `PT60S` for a 60-second timeout. System defaults will be used, if left unspecified. |

:::info
For more information about Anthropic Claude LLM models, refer to
the [Claude models overview](https://docs.anthropic.com/en/docs/about-claude/models/all-models).
:::

#### Bedrock

Select this option to use a model provided by
the [Amazon Bedrock](https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html) service, using the
[Converse](https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_Converse.html) API.

| Field              | Required | Description                                                                                                                                                                                                                          |
| :----------------- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Region**         | Yes      | The AWS region. Example: `us-east-1`                                                                                                                                                                                                 |
| **Authentication** | Yes      | Select the authentication type you want to use to authenticate the connector with AWS. To learn more about configuring AWS authentication, see [Amazon Bedrock connector authentication](../../../amazon-bedrock.md#authentication). |
| **Timeout**        | No       | Provide a timeout for Model API calls in the [ISO-8601 Duration Format](https://en.wikipedia.org/wiki/ISO_8601#Durations), e.g. `PT60S` for a 60-second timeout. System defaults will be used, if left unspecified.                  |

Model availability depends on the region and model you use. You might need to request a model is made available for your
account. To learn more about configuring access to foundation models, refer
to [access to Amazon Bedrock foundation models](https://docs.aws.amazon.com/bedrock/latest/userguide/model-access-modify.html).

:::info
For a list of Amazon Bedrock LLM models, refer
to [supported foundation models in Amazon Bedrock](https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html).
:::

#### Azure OpenAI

Select this option to use [Azure OpenAI models](https://learn.microsoft.com/en-us/azure/ai-foundry/openai/overview).

| Field              | Required | Description                                                                                                                                                                                                         |
| ------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Endpoint**       | Yes      | The Azure OpenAI endpoint URL. Example: `https://<your-resource-name>.openai.azure.com/`                                                                                                                            |
| **Authentication** | Yes      | Select the authentication type you want to use to authenticate the connector with Azure OpenAI.                                                                                                                     |
| **Timeout**        | No       | Provide a timeout for Model API calls in the [ISO-8601 Duration Format](https://en.wikipedia.org/wiki/ISO_8601#Durations), e.g. `PT60S` for a 60-second timeout. System defaults will be used, if left unspecified. |

Two authentication methods are currently supported:

- **API key**: Authenticate using an Azure OpenAI API key, available in
  the [Azure AI Foundry portal](https://ai.azure.com/).

- **Client credentials**: Authenticate using a client ID and secret. This method requires registering an application
  in [Microsoft Entra ID](https://go.microsoft.com/fwlink/?linkid=2083908). Provide the following fields:
  - **Client ID** – The Microsoft Entra application ID.
  - **Client secret** – The application’s client secret.
  - **Tenant ID** – The Microsoft Entra tenant ID.
  - **Authority host** – (Optional) The authority host URL. Defaults to `https://login.microsoftonline.com/`. This can
    also be an OAuth 2.0 token endpoint.

:::note
To use an Azure OpenAI model, you must first deploy it in the Azure AI Foundry portal. For details,
see [Deploy a model in Azure OpenAI](https://learn.microsoft.com/en-us/azure/ai-foundry/openai/how-to/create-resource#deploy-a-model).
The deployment ID must then be provided in the **Model** field.
:::

#### Google Vertex AI

Select this option to use [Google Vertex AI](https://cloud.google.com/vertex-ai) models.

| Field              | Required | Description                                                                                                                        |
| ------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **Project ID**     | Yes      | The Google Cloud project ID.                                                                                                       |
| **Region**         | Yes      | The [region](https://cloud.google.com/vertex-ai/docs/general/locations#feature-availability) where AI inference should take place. |
| **Authentication** | Yes      | Select the authentication type to use for connecting to Google Cloud.                                                              |

:::note
Timeout settings are currently not supported for Google Vertex AI models.
:::

Two authentication methods are currently supported:

- **Service Account Credentials**: Authenticate using
  a [service account](https://cloud.google.com/iam/docs/service-account-overview) key in JSON format.
- **Application Default Credentials (ADC)**: Authenticate using the default credentials available in your environment.  
  This method is only supported in Self-Managed or hybrid environments.  
  To set up ADC in a local development environment, follow the
  instructions [here](https://cloud.google.com/docs/authentication/set-up-adc-local-dev-environment).

:::info
For more information about Google Vertex AI models, see
the [Vertex AI documentation](https://cloud.google.com/vertex-ai/generative-ai/docs/models).
:::

#### OpenAI

Select this option to use the [OpenAI Chat Completion API](https://platform.openai.com/docs/api-reference/chat).

| Field               | Required | Description                                                                                                                                                                                                         |
| ------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **OpenAI API key**  | Yes      | Your OpenAI account API key for authorization.                                                                                                                                                                      |
| **Organization ID** | No       | For members of multiple organizations. If you belong to multiple organizations, specify the organization ID to use for API requests with this connector.                                                            |
| **Project ID**      | No       | If you access projects through a legacy user API key, specify the project ID to use for API requests with this connector.                                                                                           |
| **Timeout**         | No       | Provide a timeout for Model API calls in the [ISO-8601 Duration Format](https://en.wikipedia.org/wiki/ISO_8601#Durations), e.g. `PT60S` for a 60-second timeout. System defaults will be used, if left unspecified. |

:::info
To learn more about authentication to the OpenAPI API, refer
to [OpenAPI platform API reference](https://platform.openai.com/docs/api-reference/introduction).
:::

#### OpenAI-compatible

Select this option to use an LLM provider that provides OpenAI-compatible endpoints.

| Field                | Required | Description                                                                                                                                                                                                         |
| :------------------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **API endpoint**     | Yes      | The base URL of the OpenAI-compatible endpoint. Example value: `https://api.your-llm-provider.com/v1`                                                                                                               |
| **API key**          | No       | The API key for authentication. Leave blank if using HTTP headers for authentication. If an <b>Authorization</b> header is specified in the headers, then the API key is ignored.                                   |
| **Headers**          | No       | Optional HTTP headers to include in the request to the OpenAI-compatible endpoint.                                                                                                                                  |
| **Query Parameters** | No       | Optional query parameters to include in the request URL to the OpenAI-compatible endpoint.                                                                                                                          |
| **Timeout**          | No       | Provide a timeout for Model API calls in the [ISO-8601 Duration Format](https://en.wikipedia.org/wiki/ISO_8601#Durations), e.g. `PT60S` for a 60-second timeout. System defaults will be used, if left unspecified. |

:::note
A **Custom parameters** field is available in the model parameters to provide any additional parameters supported by
your OpenAI-compatible provider.
:::
