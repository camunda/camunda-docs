---
id: agentic-ai-aiagent-model-providers
sidebar_label: Model Providers
title: AI Agent model providers
description: Configure the LLM model provider used by the AI Agent Task and AI Agent Sub-process connectors.
---

The [AI Agent Sub-process](./agentic-ai-aiagent-subprocess.md) and [AI Agent Task](./agentic-ai-aiagent-task.md) connectors share the same **Model provider** configuration. This page documents that configuration in detail.

:::info
This page documents the **native provider configuration** shipped with the `v2` AI Agent element templates (Camunda 8.10+). If you are still using the original (`v1`) AI Agent element templates, see [Upgrading from v1](./agentic-ai-aiagent-model-providers-upgrade.md) to move to the native providers described here.
:::

## Provider and backend

Model provider configuration is split into two independent choices:

- **Provider** selects the wire format the AI Agent uses to talk to the LLM. For example, the Anthropic Messages API, or the OpenAI Responses/Chat Completions API. This determines which provider-specific capabilities are available, such as Anthropic's extended thinking or Gemini's thinking level.
- **Backend** (where more than one is available for a provider) selects which infrastructure actually serves that API: the vendor's own hosted API, a hyperscaler platform that exposes a compatible endpoint, or a custom/self-hosted endpoint.

These two choices are independent, so the same model family can be reached through more than one backend. For example:

- **Anthropic** Claude models can be reached through the native **Anthropic API** backend, or through **AWS Bedrock Mantle** (Anthropic's Claude models hosted on Amazon Bedrock, exposed through Anthropic's own Messages API rather than the Bedrock Converse API). Pick **Anthropic** as the provider either way, and use the **Backend** field to say where it's hosted.
- **OpenAI** models can be reached through the native **OpenAI API**, through **Microsoft Foundry** (Azure OpenAI), or through any custom OpenAI-compatible endpoint.
- **Google Gemini** models can be reached through the direct **Google Gemini API**, or through **Google Vertex AI**.

Prefer selecting the **Provider** that matches the model's native wire format (for example, Anthropic for Claude models, even when hosted on Bedrock) rather than a generic hyperscaler provider. This gives you access to that provider's own configuration surface, such as Anthropic's reasoning/extended thinking settings and prompt caching, regardless of where the model is actually hosted. See [AWS Bedrock Converse](#aws-bedrock-converse) below for when the generic Bedrock provider is still the right choice.

## Providers

Select and configure the model **Provider** you want to use from the following supported providers:

- [Anthropic](#anthropic) (Claude models, directly or via AWS Bedrock Mantle)
- [AWS Bedrock Converse](#aws-bedrock-converse)
- [OpenAI](#openai) (directly, via Microsoft Foundry/Azure, or via a custom OpenAI-compatible endpoint)
- [Google Gemini](#google-gemini) (directly, or via Google Vertex AI)
- [Custom implementation](#custom-implementation) (Self-Managed/Hybrid only)

:::note
Use [connector secrets](/components/hub/organization/manage-clusters/manage-secrets.md) to store credentials and avoid exposing sensitive information directly in the process.
:::

### Timeout handling

Every provider exposes a **Timeout** field. The default timeout for model API calls is three minutes, set by the runtime. Self-managed Spring connector runtime instances can override this default by setting the `camunda.connector.agenticai.aiagent.chat-model.api.default-timeout` property.

The **Timeout** field on a provider takes precedence over the default timeout. Values must be provided in [ISO-8601 duration format](https://en.wikipedia.org/wiki/ISO_8601#Durations), for example, `PT60S` for a 60-second timeout.

:::important
The timeout setting must not exceed the job worker timeout; otherwise, the job may be reassigned by the engine while the model call is still in progress.
:::

### Advanced provider options

Most backends also expose a set of advanced, low-level customization fields: **HTTP headers**, **query parameters**, and **body properties**, letting you add or override values on the outgoing HTTP request. On backends with a well-known REST-style API surface (for example, the native Anthropic API, OpenAI API, and Google Gemini/Vertex AI backends), these fields are reserved for internal/future use and aren't exposed in the properties panel. For backends without a fixed request shape (AWS Bedrock Converse, AWS Bedrock Mantle, and any custom/compatible endpoint), they're exposed as editable [FEEL](/components/modeler/feel/what-is-feel.md) map expressions so you can adapt the request to your specific deployment.

## Anthropic

Select this provider to use an Anthropic Claude LLM model. Choose a **Backend** to specify how the [Anthropic Messages API](https://docs.anthropic.com/en/api/messages) is reached:

- [Anthropic API](#anthropic-api): the native, hosted Anthropic API.
- [AWS Bedrock Mantle](#aws-bedrock-mantle): Claude models hosted on Amazon Bedrock, reached through Anthropic's own Messages API.
- [Custom / compatible endpoint](#anthropic-custom--compatible-endpoint): any endpoint implementing the Anthropic Messages API.

#### Anthropic API

| Field                 | Required | Description                                                                                                                   |
| :-------------------- | :------- | :---------------------------------------------------------------------------------------------------------------------------- |
| **Anthropic API key** | Yes      | Your Anthropic account API key for authorization to the [Anthropic Messages API](https://docs.anthropic.com/en/api/messages). |

#### AWS Bedrock Mantle

Use this backend to run Anthropic Claude models hosted on Amazon Bedrock while keeping access to Anthropic-specific configuration (reasoning/extended thinking, prompt caching) that the generic [AWS Bedrock Converse](#aws-bedrock-converse) provider doesn't expose.

| Field               | Required | Description                                                                                                                                                                                                                                                                                                          |
| :------------------ | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **AWS region**      | Yes      | The AWS region. For example, `eu-west-1`.                                                                                                                                                                                                                                                                            |
| **Custom endpoint** | No       | Custom API endpoint for VPC/PrivateLink configurations or other non-standard deployments. Must be the full Bedrock Mantle base URL, including the `/anthropic` path segment (for example, `https://your-vpce-host/anthropic`). It replaces the default `https://bedrock-mantle.<region>.api.aws/anthropic` verbatim. |
| **Authentication**  | Yes      | Select the authentication method used to authenticate with AWS: **Credentials** (access key/secret key), **API key**, or **Default Credentials Chain** (Hybrid/Self-Managed only). See [Amazon Bedrock connector authentication](./amazon-bedrock.md#authentication) for details on each method.                     |

Model availability depends on the region. You may need to request access to Anthropic models made available through Bedrock; see [access to Amazon Bedrock foundation models](https://docs.aws.amazon.com/bedrock/latest/userguide/model-access-modify.html).

#### Anthropic custom / compatible endpoint

Use this backend for any endpoint implementing the Anthropic Messages API, such as a proxy or gateway in front of Anthropic.

| Field              | Required | Description                                                                         |
| :----------------- | :------- | :---------------------------------------------------------------------------------- |
| **API endpoint**   | Yes      | Base URL of the Anthropic-compatible API. `/v1/messages` is appended automatically. |
| **Authentication** | No       | **None**, or **API key** to send an API key with the request.                       |

#### Anthropic model and parameters

| Field                      | Required | Description                                                                                                                                                                                                                        |
| :------------------------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Model**                  | Yes      | The model ID to use. See the [Claude models overview](https://docs.anthropic.com/en/docs/about-claude/models/all-models).                                                                                                          |
| **Effort**                 | No       | Controls how many tokens the model spends when responding, trading thoroughness against speed and cost. Not supported on all models. See the [effort documentation](https://platform.claude.com/docs/en/build-with-claude/effort). |
| **Thinking mode**          | No       | Extended thinking mechanism: `enabled` uses a manual token budget (older models), `adaptive` lets the model manage it (newer models), `disabled` turns it off. Support varies by model.                                            |
| **Thinking budget tokens** | Depends  | Maximum number of tokens the model may spend on extended thinking (minimum 1024). Shown only when **Thinking mode** is `enabled`.                                                                                                  |
| **Thinking display**       | No       | Controls how extended thinking is returned when **Thinking mode** is `adaptive`: `summarized` includes a plain-text summary in the response, `omitted` leaves it out.                                                              |
| **Enable prompt caching**  | No       | Enables Anthropic's automatic prompt caching. See the [prompt caching documentation](https://platform.claude.com/docs/en/build-with-claude/prompt-caching#automatic-caching).                                                      |
| **Maximum tokens**         | No       | The maximum number of tokens per request to generate before stopping.                                                                                                                                                              |
| **Temperature**            | No       | Floating point number between 0 and 1. The higher the number, the more randomness is injected into the response.                                                                                                                   |
| **top P**                  | No       | Floating point number between 0 and 1. Recommended for advanced use cases only.                                                                                                                                                    |
| **top K**                  | No       | Integer greater than 0. Recommended for advanced use cases only.                                                                                                                                                                   |

## AWS Bedrock Converse

Select this provider to use a model provided by the [Amazon Bedrock](https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html) service through the generic [Converse](https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_Converse.html) API. This is the right choice for non-Anthropic model families available on Bedrock (for example Amazon Nova, Meta Llama, or Mistral models). If you're running **Anthropic Claude** models on Bedrock, use the [Anthropic provider's AWS Bedrock Mantle backend](#aws-bedrock-mantle) instead to access Anthropic-specific configuration.

| Field               | Required | Description                                                                                                                                                                                                                                                                                      |
| :------------------ | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **AWS region**      | Yes      | The AWS region. For example, `eu-west-1`.                                                                                                                                                                                                                                                        |
| **Custom endpoint** | No       | Custom API endpoint for VPC/PrivateLink configurations or other non-standard deployments. Overrides the default Bedrock Runtime endpoint for the region.                                                                                                                                         |
| **Authentication**  | Yes      | Select the authentication method used to authenticate with AWS: **Credentials** (access key/secret key), **API key**, or **Default Credentials Chain** (Hybrid/Self-Managed only). See [Amazon Bedrock connector authentication](./amazon-bedrock.md#authentication) for details on each method. |

Model availability depends on the region and model. See [supported foundation models in Amazon Bedrock](https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html) and [access to Amazon Bedrock foundation models](https://docs.aws.amazon.com/bedrock/latest/userguide/model-access-modify.html).

#### AWS Bedrock Converse model and parameters

| Field                     | Required | Description                                                                                                                                                   |
| :------------------------ | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Model**                 | Yes      | The model ID to use. See [inference profile support](https://docs.aws.amazon.com/bedrock/latest/userguide/inference-profiles-support.html).                   |
| **Enable prompt caching** | No       | Enables Bedrock's automatic prompt caching. See the [prompt caching documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-caching.html). |
| **Maximum tokens**        | No       | The maximum number of tokens per request to generate before stopping. Leave unset to use the model default.                                                   |
| **Temperature**           | No       | Floating point number. The higher the number, the more randomness is injected into the response. Supported ranges vary by model.                              |
| **top P**                 | No       | Floating point number between 0 and 1. Recommended for advanced use cases only.                                                                               |

Bedrock Converse doesn't support a **Reasoning**/**Effort** configuration or a **top K** parameter.

## OpenAI

Select this provider to use OpenAI models. Two independent choices apply:

- **API**: which OpenAI API family to use, **Responses** (default, recommended for new configurations) or **Chat Completions**.
- **Backend**: how the API is reached.
  - [OpenAI API](#openai-api): the native, hosted OpenAI API.
  - [Microsoft Foundry (Azure)](#microsoft-foundry-azure): OpenAI models deployed through Microsoft Foundry/Azure OpenAI.
  - [Custom / compatible endpoint](#openai-custom--compatible-endpoint): any endpoint implementing the OpenAI API.

#### OpenAI API

| Field               | Required | Description                                                                                                                                                                                |
| :------------------ | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **OpenAI API key**  | Yes      | Your OpenAI account API key for authorization.                                                                                                                                             |
| **Organization ID** | No       | For members of multiple organizations, the organization ID to use for API requests. See the [authentication documentation](https://platform.openai.com/docs/api-reference/authentication). |
| **Project ID**      | No       | For accounts with multiple projects, the project ID to use for API requests. See the [authentication documentation](https://platform.openai.com/docs/api-reference/authentication).        |

#### Microsoft Foundry (Azure)

Use this backend for OpenAI models deployed through [Microsoft Foundry](https://ai.azure.com/) or Azure OpenAI.

| Field              | Required | Description                                                                                                                                                   |
| :----------------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **API endpoint**   | Yes      | The full resource endpoint, for example `https://your-resource.openai.azure.com` or a Foundry endpoint such as `https://your-resource.services.ai.azure.com`. |
| **Authentication** | Yes      | **API key**, **Entra ID: Client credentials**, or **Entra ID: Managed identity** (Hybrid/Self-Managed only).                                                  |

Authentication fields per method:

- **API key**: an API key for the resource, available in the [Azure AI Foundry portal](https://ai.azure.com/).
- **Entra ID: Client credentials**: registers an application in [Microsoft Entra ID](https://go.microsoft.com/fwlink/?linkid=2083908) and authenticates with it.
  - **Client ID**: the Microsoft Entra application (client) ID.
  - **Client secret**: the application's client secret.
  - **Tenant ID**: the Microsoft Entra tenant (directory) ID.
  - **Authority host**: (optional) overrides the Microsoft Entra authority host, for example for sovereign clouds. Leave unset for the public cloud authority.
- **Entra ID: Managed identity** (Hybrid/Self-Managed only): authenticates using the environment's managed identity.
  - **Client ID**: (optional) the client ID of a user-assigned managed identity. Leave unset to use the system-assigned managed identity.

:::note
To use an OpenAI model deployed through Azure, deploy it first in the Azure AI Foundry portal. See [Deploy a model in Azure OpenAI](https://learn.microsoft.com/en-us/azure/ai-foundry/openai/how-to/create-resource#deploy-a-model), and enter the deployment name in the **Model** field below.

A multi-replica connectors runtime setup means each replica also acquires and caches its own Entra ID token independently. Expect multiple, parallel credential/token requests against Entra ID under load, rather than a single shared token, and size any Entra ID application throttling limits accordingly.
:::

#### OpenAI custom / compatible endpoint

Use this backend to connect to any LLM that exposes an OpenAI-compatible API, including open-weight models such as Qwen, Llama, and Mistral, hosted through Ollama or any compatible inference platform.

| Field            | Required | Description                                                                                                                              |
| :--------------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| **API endpoint** | Yes      | Base URL of the OpenAI-compatible API. `/chat/completions` or `/responses` is appended automatically, depending on the selected **API**. |
| **API key**      | Yes      | The API key for authentication.                                                                                                          |

#### OpenAI model and parameters

| Field                                                                            | Required | Description                                                                                                                                                                                                                                                                                                                                                                       |
| :------------------------------------------------------------------------------- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Model**                                                                        | Yes      | The model ID to use. See the [OpenAI models documentation](https://platform.openai.com/docs/models).                                                                                                                                                                                                                                                                              |
| **Effort**                                                                       | No       | Controls how many tokens the model spends when responding, trading thoroughness against speed and cost. Not supported on all models. See the [Responses](https://developers.openai.com/api/reference/resources/responses/methods/create) or [Chat Completions](https://developers.openai.com/api/reference/resources/chat/subresources/completions/methods/create) API reference. |
| **Max output tokens** (Responses) / **Max completion tokens** (Chat Completions) | No       | The maximum number of tokens per request to generate before stopping. The field name depends on the selected **API**.                                                                                                                                                                                                                                                             |
| **Temperature**                                                                  | No       | Floating point number between 0 and 2. The higher the number, the more randomness is injected into the response.                                                                                                                                                                                                                                                                  |
| **top P**                                                                        | No       | Recommended for advanced use cases only.                                                                                                                                                                                                                                                                                                                                          |

OpenAI doesn't support a **top K** parameter or prompt caching configuration.

## Google Gemini

Select this provider to use Google's Gemini models. Choose a **Backend** to specify how the API is reached:

- [Google Gemini API](#google-gemini-api): the direct, hosted Gemini API.
- [Google Vertex AI](#google-vertex-ai): Gemini models through Google Cloud's Vertex AI.

#### Google Gemini API

| Field              | Required | Description                    |
| :----------------- | :------- | :----------------------------- |
| **Gemini API key** | Yes      | Your Google AI Studio API key. |

#### Google Vertex AI

| Field              | Required | Description                                                                                                                                                                                                                                                                                                                                                                      |
| :----------------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Project ID**     | Yes      | The Google Cloud project ID.                                                                                                                                                                                                                                                                                                                                                     |
| **Region**         | Yes      | The [region](https://cloud.google.com/vertex-ai/docs/general/locations#feature-availability) where AI inference should take place.                                                                                                                                                                                                                                               |
| **Authentication** | Yes      | **Service account credentials** (a [service account](https://cloud.google.com/iam/docs/service-account-overview) key in JSON format), or **Application default credentials** (Hybrid/Self-Managed only; uses the default credentials available in the environment; see [setting up ADC locally](https://cloud.google.com/docs/authentication/set-up-adc-local-dev-environment)). |

#### Google Gemini model and parameters

| Field                        | Required | Description                                                                                                                                                                                                          |
| :--------------------------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Model**                    | Yes      | The model ID to use. See the [Gemini models documentation](https://ai.google.dev/gemini-api/docs/models).                                                                                                            |
| **Thinking budget (tokens)** | No       | Gemini 2.5 models: token budget for extended thinking. `-1` = dynamic, `0` = disabled. Mutually exclusive with **Thinking level**. See the [thinking documentation](https://ai.google.dev/gemini-api/docs/thinking). |
| **Thinking level**           | No       | Gemini 3.x models: qualitative thinking effort (`default`/`minimal`/`low`/`medium`/`high`). Mutually exclusive with **Thinking budget**.                                                                             |
| **Maximum tokens**           | No       | The maximum number of tokens to generate before stopping.                                                                                                                                                            |
| **Temperature**              | No       | Controls the randomness of the output. The higher the number, the more randomness is injected into the response.                                                                                                     |
| **top P**                    | No       | Floating point number between 0 and 1. Recommended for advanced use cases only.                                                                                                                                      |
| **top K**                    | No       | Integer greater than 0. Recommended for advanced use cases only.                                                                                                                                                     |

Google Gemini doesn't support prompt caching configuration.

## Custom implementation

:::note
Available in Self-Managed or [hybrid](/reference/glossary.md#hybrid-mode) deployments only.
:::

Select this provider to use a custom chat model provider implementation that you've registered with the connector runtime, instead of one of the built-in providers above.

| Field                   | Required | Description                                                                                                        |
| :---------------------- | :------- | :----------------------------------------------------------------------------------------------------------------- |
| **Provider type**       | Yes      | Identifier for the custom chat model provider. Must match the identifier configured for the custom implementation. |
| **Provider parameters** | No       | Parameters for the custom chat model provider implementation, as a FEEL context.                                   |
| **Model**               | Yes      | Identifier of the model to use, interpreted by the custom implementation.                                          |

Implementing a custom provider requires building and registering a chat model provider with your Self-Managed or hybrid connector runtime, similar to how [custom conversation storage backends](./agentic-ai-aiagent-customization.md#custom-conversation-storage) are registered.
