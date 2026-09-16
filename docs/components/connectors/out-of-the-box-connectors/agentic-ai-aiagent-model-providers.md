---
id: agentic-ai-aiagent-model-providers
sidebar_label: Model providers
title: AI Agent model providers
description: Configure the LLM model provider used by the AI Agent Task and AI Agent Sub-process connectors.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Configure the LLM model provider used by the AI Agent connectors. Both the [AI Agent Sub-process](./agentic-ai-aiagent-subprocess.md) and [AI Agent Task](./agentic-ai-aiagent-task.md) connectors use the same **Model provider** configuration.

:::info
This page documents the **native provider configuration** shipped with the new AI Agent element templates (Camunda 8.10+). If you are still using the legacy AI Agent element templates, see [upgrade from the legacy connector](./agentic-ai-aiagent-upgrade.md) to move to the new element templates and their native providers.
:::

## Choose a provider and backend

Start from where your organization already permits LLM traffic to be routed, not from a model's native wire format. Security, data residency, procurement, networking, and audit requirements often determine which **backend** (Amazon Bedrock, Microsoft Foundry, Google Cloud, or an internal gateway) is actually available to you. Once you know which backends are approved, pick the **provider** that gives that model the most capable configuration surface:

- **Provider** selects the wire format the AI Agent uses to talk to the LLM. For example, the Anthropic Messages API, or the OpenAI Responses/Chat Completions API. This determines which provider-specific capabilities are available, such as Anthropic's extended thinking or Gemini's thinking level.
- **Backend** (where more than one is available for a provider) selects which infrastructure actually serves that API: the vendor's own hosted API, a hyperscaler platform that exposes a compatible endpoint, or a custom/self-hosted endpoint.

These two choices are independent, so the same model family may be available through multiple backends. Within your approved backend, select the provider that matches the model's native wire format (for example, Anthropic for Claude models, even when hosted on Bedrock) rather than a generic hyperscaler provider: it gives you that provider's own configuration surface, such as reasoning/extended thinking and prompt caching, regardless of where the model is actually hosted.

| If your organization requires...       | Start with...                                                       | Prefer instead when...                                                                                                                 |
| :------------------------------------- | :------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------- |
| Traffic routed through Amazon Bedrock  | [AWS Bedrock Converse](#aws-bedrock-converse)                       | Running **Claude** models: use [Anthropic](#anthropic)'s AWS Bedrock Mantle backend instead, to keep Anthropic-specific configuration. |
| Traffic routed through Microsoft Azure | [OpenAI](#openai)'s Microsoft Foundry (Azure) backend               | No exception; Foundry is the only approved route for OpenAI models on Azure.                                                           |
| Traffic routed through Google Cloud    | [Google Gemini](#google-gemini)'s Enterprise Agent Platform backend | No exception for Gemini models; use the direct Gemini API only if Google Cloud isn't mandated.                                         |
| No specific cloud mandate              | The provider matching the model's native wire format                | N/A                                                                                                                                    |

The most capable option within your organization's approved boundary is the correct choice; the native wire format alone doesn't determine it.

## Configure reusable credentials

The new native AI Agent element templates require a reusable credential for each built-in model backend in Camunda 8.10 or later.

This applies to AI Agent Task and AI Agent Sub-process, including their hybrid templates. Authentication and shared connection settings belong in the credential, not inline on the task. Custom provider implementations and conversation-memory connections are unchanged.

1. Select the **Provider**, **Backend**, and, for OpenAI, **API** on the task. New templates default to **OpenAI**, **Custom / compatible endpoint**, and **Responses**.
2. [Create or select a credential](/components/hub/organization/credentials/modeling-interface.md) of the type required by that backend. The chooser lists only matching credential types.
3. Configure the **Model** and its parameters on the task. Review any endpoint or region overrides before deploying.

| Provider and backend                                                                 | Credential type                   | Settings stored in the credential                                                                                |
| :----------------------------------------------------------------------------------- | :-------------------------------- | :--------------------------------------------------------------------------------------------------------------- |
| Anthropic > Anthropic API                                                            | Anthropic API Credential          | API key.                                                                                                         |
| OpenAI > OpenAI API                                                                  | OpenAI API Credential             | API key, optional organization ID, and optional project ID.                                                      |
| OpenAI > Microsoft Foundry (Azure)                                                   | Microsoft Foundry Credential      | Resource endpoint and authentication.                                                                            |
| Anthropic or OpenAI > Custom / compatible endpoint                                   | AI Gateway Credential             | Gateway endpoint and API key or OAuth 2.0 client credentials.                                                    |
| Anthropic > AWS Bedrock Mantle, or AWS Bedrock Converse, with AWS IAM authentication | AWS Credential                    | AWS authentication and optional default region. This is the shared credential type used by other AWS connectors. |
| Anthropic > AWS Bedrock Mantle, or AWS Bedrock Converse, with API key authentication | Amazon Bedrock API Key Credential | Bedrock API key and AWS region.                                                                                  |
| Google Gemini > Google Gemini API                                                    | Google Gemini API Credential      | API key.                                                                                                         |
| Google Gemini > Enterprise Agent Platform (Vertex AI)                                | Vertex AI Credential              | Project ID, region, and authentication.                                                                          |

Use [connector secrets](/components/hub/organization/manage-clusters/manage-secrets.md) for sensitive values. In credential fields, reference a secret as `camunda.secrets.MY_API_KEY`, without braces. This differs from the `{{secrets.MY_API_KEY}}` syntax used in connector fields.

### AI Gateway authentication

The AI Gateway Credential supports both Anthropic- and OpenAI-compatible endpoints. Choose the authentication method inside the credential.

| Authentication | Required settings                                                                     | Optional settings    |
| :------------- | :------------------------------------------------------------------------------------ | :------------------- |
| **API key**    | API key.                                                                              | None.                |
| **OAuth 2.0**  | OAuth 2.0 token endpoint, client ID, client secret, and client authentication method. | Audience and scopes. |

OAuth 2.0 uses the client credentials grant. **Client authentication** defaults to **Send as Basic Auth header**; select **Send client credentials in body** if your authorization server requires it. The connector obtains and caches access tokens and sends them as bearer tokens to the gateway.

Authentication fields appear only for the selected method. The task exposes only the credential chooser, not inline API-key or OAuth fields. The credential doesn't offer a no-authentication option.

### Connection overrides

The selected credential supplies authentication and shared connection settings, with these task-level exceptions:

| Task field                                                  | Behavior                                                                                                               |
| :---------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------- |
| **API endpoint override** for a custom / compatible backend | A non-blank value overrides the gateway endpoint from the credential. Leave it empty to use the credential's endpoint. |
| **AWS region override** for Bedrock Mantle or Converse      | A non-blank value overrides the credential's region. Required if the AWS credential has no default region.             |
| **Custom endpoint** for Bedrock Mantle or Converse          | Overrides the default service endpoint for the effective AWS region.                                                   |

All other authentication and shared connection settings come from the credential. Provider, backend, API, model, and model parameters remain task-specific.

## Supported providers

Select and configure the model **Provider** you want to use from the following supported providers. Each section below covers that provider's available backends, authentication, model settings, and provider-specific parameters:

- [Anthropic](#anthropic) (Claude models, directly or via AWS Bedrock Mantle).
- [AWS Bedrock Converse](#aws-bedrock-converse).
- [OpenAI](#openai) (directly, via Microsoft Foundry/Azure, or via a custom OpenAI-compatible endpoint).
- [Google Gemini](#google-gemini) (directly, or via Google Enterprise Agent Platform).
- [Custom implementation](#custom-implementation) (Self-Managed/Hybrid only).

### Anthropic

Select this provider to use an Anthropic Claude LLM model. Choose a **Backend** to specify how to access the [Anthropic Messages API](https://docs.anthropic.com/en/api/messages):

<Tabs groupId="anthropic-backend" defaultValue="api" values={[
{label: 'Anthropic API', value: 'api'},
{label: 'AWS Bedrock Mantle', value: 'bedrock-mantle'},
{label: 'Custom / compatible endpoint', value: 'custom'},
]}>
<TabItem value="api">

The native, hosted Anthropic API.

| Field                        | Required | Description                                                                   |
| :--------------------------- | :------- | :---------------------------------------------------------------------------- |
| **Anthropic API credential** | Yes      | Select an Anthropic API Credential containing your Anthropic account API key. |

</TabItem>
<TabItem value="bedrock-mantle">

Run Anthropic Claude models hosted on Amazon Bedrock while keeping access to Anthropic-specific configuration (reasoning/extended thinking, prompt caching) that the generic [AWS Bedrock Converse](#aws-bedrock-converse) provider doesn't expose.

| Field                                 | Required    | Description                                                                                                                                                                                                                                                                                                          |
| :------------------------------------ | :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Authentication family**             | Yes         | Select **AWS IAM** or **Amazon Bedrock API key**, then select the matching reusable credential.                                                                                                                                                                                                                      |
| **AWS credential**                    | For AWS IAM | Select an AWS Credential containing your AWS authentication settings. The default credentials chain is available in hybrid/Self-Managed deployments only.                                                                                                                                                            |
| **Amazon Bedrock API key credential** | For API key | Select an Amazon Bedrock API Key Credential containing your API key and region.                                                                                                                                                                                                                                      |
| **AWS region override**               | Depends     | Overrides the credential's region. Required if the AWS credential has no default region. For example, `eu-west-1`.                                                                                                                                                                                                   |
| **Custom endpoint**                   | No          | Custom API endpoint for VPC/PrivateLink configurations or other non-standard deployments. Must be the full Bedrock Mantle base URL, including the `/anthropic` path segment (for example, `https://your-vpce-host/anthropic`). It replaces the default `https://bedrock-mantle.<region>.api.aws/anthropic` verbatim. |

Bedrock Mantle supports a different set of models than Bedrock Runtime, and model availability also varies by AWS Region. Before selecting a model, check [Amazon Bedrock endpoint availability](https://docs.aws.amazon.com/bedrock/latest/userguide/models-endpoint-availability.html) and the linked model details for current endpoint and regional support.

</TabItem>
<TabItem value="custom">

Any endpoint implementing the Anthropic Messages API, such as a proxy or gateway in front of Anthropic.

| Field                     | Required | Description                                                                                   |
| :------------------------ | :------- | :-------------------------------------------------------------------------------------------- |
| **AI Gateway credential** | Yes      | Select an AI Gateway Credential for the Anthropic-compatible endpoint.                        |
| **API endpoint override** | No       | Overrides the gateway endpoint from the credential. `/v1/messages` is appended automatically. |

</TabItem>
</Tabs>

#### Anthropic model and parameters

| Field                      | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| :------------------------- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Model**                  | Yes      | The model ID to use. See the [Claude models overview](https://docs.anthropic.com/en/docs/about-claude/models/all-models).                                                                                                                                                                                                                                                                                                                                 |
| **Effort**                 | No       | Controls how many tokens the model spends when responding, trading thoroughness against speed and cost. Not supported on all models. See the [effort documentation](https://platform.claude.com/docs/en/build-with-claude/effort).                                                                                                                                                                                                                        |
| **Thinking mode**          | No       | Extended thinking mechanism: `enabled` uses a manual token budget (older models), `adaptive` lets the model manage it (newer models), `disabled` turns it off. Support varies by model.                                                                                                                                                                                                                                                                   |
| **Thinking budget tokens** | Depends  | Maximum number of tokens the model may spend on extended thinking (minimum 1024). Shown only when **Thinking mode** is `enabled`.                                                                                                                                                                                                                                                                                                                         |
| **Thinking display**       | No       | Controls how extended thinking is returned when **Thinking mode** is `adaptive`: `summarized` includes a plain-text summary in the response, `omitted` leaves it out.                                                                                                                                                                                                                                                                                     |
| **Enable prompt caching**  | No       | Enables Anthropic's automatic prompt caching. See the [prompt caching documentation](https://platform.claude.com/docs/en/build-with-claude/prompt-caching#automatic-caching).                                                                                                                                                                                                                                                                             |
| **Maximum tokens**         | No       | The maximum number of tokens per request to generate before stopping.                                                                                                                                                                                                                                                                                                                                                                                     |
| **Temperature**            | No       | Primary response-variation control from 0 to 1. Lower values favor likely tokens more strongly; higher values increase variation.                                                                                                                                                                                                                                                                                                                         |
| **top P**                  | No       | Advanced nucleus-sampling control from 0 to 1. Limits selection to likely tokens whose cumulative probability reaches this value.                                                                                                                                                                                                                                                                                                                         |
| **top K**                  | No       | Advanced sampling control configured as a positive integer. Limits selection to this number of the most likely tokens.                                                                                                                                                                                                                                                                                                                                    |
| **Timeout**                | No       | Maximum time to wait for the model API call, in [ISO-8601 duration format](https://en.wikipedia.org/wiki/ISO_8601#Durations) (for example, `PT60S`). Defaults to three minutes; must not exceed the job worker timeout, or the job may be reassigned while the call is still in progress. Self-Managed Spring connector runtime instances can override the default via the `camunda.connector.agenticai.aiagent.chat-model.api.default-timeout` property. |

### AWS Bedrock Converse

Select this provider to use a model provided by the [Amazon Bedrock](https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html) service through the generic [Converse](https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_Converse.html) API.

:::tip
This is the right choice for non-Anthropic model families available on Bedrock. For example, Amazon Nova, Meta Llama, or Mistral models. If you're running **Anthropic Claude** models on Bedrock, use the [Anthropic provider](#anthropic)'s AWS Bedrock Mantle backend to access Anthropic-specific configuration.
:::

| Field                                 | Required    | Description                                                                                                                                               |
| :------------------------------------ | :---------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Authentication family**             | Yes         | Select **AWS IAM** or **Amazon Bedrock API key**, then select the matching reusable credential.                                                           |
| **AWS credential**                    | For AWS IAM | Select an AWS Credential containing your AWS authentication settings. The default credentials chain is available in hybrid/Self-Managed deployments only. |
| **Amazon Bedrock API key credential** | For API key | Select an Amazon Bedrock API Key Credential containing your API key and region.                                                                           |
| **AWS region override**               | Depends     | Overrides the credential's region. Required if the AWS credential has no default region. For example, `eu-west-1`.                                        |
| **Custom endpoint**                   | No          | Custom API endpoint for VPC/PrivateLink configurations or other non-standard deployments. Overrides the default Bedrock Runtime endpoint for the region.  |

Model availability depends on the region and model. See [supported foundation models in Amazon Bedrock](https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html) and [access to Amazon Bedrock foundation models](https://docs.aws.amazon.com/bedrock/latest/userguide/model-access-modify.html).

#### AWS Bedrock Converse model and parameters

| Field                     | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| :------------------------ | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Model**                 | Yes      | The model ID to use. See [inference profile support](https://docs.aws.amazon.com/bedrock/latest/userguide/inference-profiles-support.html).                                                                                                                                                                                                                                                                                                               |
| **Enable prompt caching** | No       | Enables Bedrock's automatic prompt caching. See the [prompt caching documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-caching.html).                                                                                                                                                                                                                                                                                             |
| **Maximum tokens**        | No       | The maximum number of tokens per request to generate before stopping. Leave unset to use the model default.                                                                                                                                                                                                                                                                                                                                               |
| **Temperature**           | No       | Primary response-variation control. Lower values favor likely tokens more strongly; higher values increase variation. Supported ranges vary by model.                                                                                                                                                                                                                                                                                                     |
| **top P**                 | No       | Advanced nucleus-sampling control from 0 to 1. Limits selection to likely tokens whose cumulative probability reaches this value.                                                                                                                                                                                                                                                                                                                         |
| **Timeout**               | No       | Maximum time to wait for the model API call, in [ISO-8601 duration format](https://en.wikipedia.org/wiki/ISO_8601#Durations) (for example, `PT60S`). Defaults to three minutes; must not exceed the job worker timeout, or the job may be reassigned while the call is still in progress. Self-Managed Spring connector runtime instances can override the default via the `camunda.connector.agenticai.aiagent.chat-model.api.default-timeout` property. |

Bedrock Converse doesn't support a **Reasoning**/**Effort** configuration or a **top K** parameter.

### OpenAI

Select this provider to use OpenAI models. Two independent choices apply:

- **API**: which OpenAI API family to use. **Responses** (default, recommended for new configurations) or **Chat Completions**.
- **Backend**: how the API is accessed.

:::tip
Use **Responses** by default. It's OpenAI's current API and designed for newer reasoning models. Use **Chat Completions** if your backend doesn't support **Responses**, such as an older Microsoft Foundry/Azure OpenAI deployment or a self-hosted OpenAI-compatible backend serving models such as Qwen, Llama, or Mistral through Ollama.
:::

<Tabs groupId="openai-backend" defaultValue="api" values={[
{label: 'OpenAI API', value: 'api'},
{label: 'Microsoft Foundry (Azure)', value: 'foundry'},
{label: 'Custom / compatible endpoint', value: 'custom'},
]}>
<TabItem value="api">

The native, hosted OpenAI API.

| Field                     | Required | Description                                                                                                                                                                                                      |
| :------------------------ | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **OpenAI API credential** | Yes      | Select an OpenAI API Credential containing your API key and optional organization and project IDs. See the [OpenAI authentication documentation](https://platform.openai.com/docs/api-reference/authentication). |

</TabItem>
<TabItem value="foundry">

OpenAI models deployed through [Microsoft Foundry](https://ai.azure.com/) or Azure OpenAI.

| Field                            | Required | Description                                                                                |
| :------------------------------- | :------- | :----------------------------------------------------------------------------------------- |
| **Microsoft Foundry credential** | Yes      | Select a Microsoft Foundry Credential containing the resource endpoint and authentication. |

In the credential, set **Resource endpoint** to the full resource endpoint, for example `https://your-resource.openai.azure.com` or `https://your-resource.services.ai.azure.com`. Configure authentication in the credential using one of these methods:

- **API key**: an API key for the resource, available in the [Azure AI Foundry portal](https://ai.azure.com/).
- **Entra ID: Client credentials**: registers an application in [Microsoft Entra ID](https://go.microsoft.com/fwlink/?linkid=2083908) and authenticates with it.
  - **Client ID**: the Microsoft Entra application (client) ID.
  - **Client secret**: the application's client secret.
  - **Tenant ID**: the Microsoft Entra tenant (directory) ID.
  - **Authority host**: (optional) overrides the Microsoft Entra authority host, for example for sovereign clouds. Leave unset for the public cloud authority.
- **Entra ID: Managed identity** (Hybrid/Self-Managed only): authenticates using the environment's managed identity.
  - **Client ID**: (optional) the client ID of a user-assigned managed identity. Leave unset to use the system-assigned managed identity.

:::note
To use an OpenAI model deployed through Azure, deploy it first in the Azure AI Foundry portal. See [deploy a model in Azure OpenAI](https://learn.microsoft.com/en-us/azure/ai-foundry/openai/how-to/create-resource#deploy-a-model), and enter the deployment name in the **Model** field below.

A multi-replica connectors runtime setup means each replica also acquires and caches its own Entra ID token independently. Expect multiple, parallel credential/token requests against Entra ID under load, rather than a single shared token, and size any Entra ID application throttling limits accordingly.
:::

</TabItem>
<TabItem value="custom">

Connect to any LLM that exposes an OpenAI-compatible API, including open-weight models such as Qwen, Llama, and Mistral, hosted through Ollama or any compatible inference platform.

| Field                     | Required | Description                                                                                                                                           |
| :------------------------ | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **AI Gateway credential** | Yes      | Select an AI Gateway Credential for the OpenAI-compatible endpoint.                                                                                   |
| **API endpoint override** | No       | Overrides the gateway endpoint from the credential. `/chat/completions` or `/responses` is appended automatically, depending on the selected **API**. |

</TabItem>
</Tabs>

#### OpenAI model and parameters

| Field                                                                            | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| :------------------------------------------------------------------------------- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Model**                                                                        | Yes      | The model ID to use. See the [OpenAI models documentation](https://platform.openai.com/docs/models).                                                                                                                                                                                                                                                                                                                                                      |
| **Effort**                                                                       | No       | Controls how many tokens the model spends when responding, trading thoroughness against speed and cost. Not supported on all models. See the [Responses](https://developers.openai.com/api/reference/resources/responses/methods/create) or [Chat Completions](https://developers.openai.com/api/reference/resources/chat/subresources/completions/methods/create) API reference.                                                                         |
| **Max output tokens** (Responses) / **Max completion tokens** (Chat Completions) | No       | The maximum number of tokens per request to generate before stopping. The field name depends on the selected **API**.                                                                                                                                                                                                                                                                                                                                     |
| **Temperature**                                                                  | No       | Primary response-variation control from 0 to 2. Lower values favor likely tokens more strongly; higher values increase variation.                                                                                                                                                                                                                                                                                                                         |
| **top P**                                                                        | No       | Advanced nucleus-sampling control from 0 to 1. Limits selection to likely tokens whose cumulative probability reaches this value.                                                                                                                                                                                                                                                                                                                         |
| **Timeout**                                                                      | No       | Maximum time to wait for the model API call, in [ISO-8601 duration format](https://en.wikipedia.org/wiki/ISO_8601#Durations) (for example, `PT60S`). Defaults to three minutes; must not exceed the job worker timeout, or the job may be reassigned while the call is still in progress. Self-Managed Spring connector runtime instances can override the default via the `camunda.connector.agenticai.aiagent.chat-model.api.default-timeout` property. |

OpenAI doesn't support a **top K** parameter. Prompt caching is automatic when the request meets OpenAI's caching requirements and isn't user-configurable.

### Google Gemini

Select this provider to use Google's Gemini models. Choose a **Backend** to specify how to access the API:

<Tabs groupId="gemini-backend" defaultValue="api" values={[
{label: 'Google Gemini API', value: 'api'},
{label: 'Google Enterprise Agent Platform', value: 'eap'},
]}>
<TabItem value="api">

The direct, hosted Gemini API.

| Field                            | Required | Description                                                                     |
| :------------------------------- | :------- | :------------------------------------------------------------------------------ |
| **Google Gemini API credential** | Yes      | Select a Google Gemini API Credential containing your Google AI Studio API key. |

</TabItem>
<TabItem value="eap">

Gemini models through Google Cloud's Enterprise Agent Platform (formerly Vertex AI).

| Field                    | Required | Description                                                                                        |
| :----------------------- | :------- | :------------------------------------------------------------------------------------------------- |
| **Vertex AI credential** | Yes      | Select a Vertex AI Credential containing your Google Cloud project ID, region, and authentication. |

Set the inference [region](https://cloud.google.com/vertex-ai/docs/general/locations#feature-availability) in the credential. For authentication, configure **Service account credentials** with a [service account](https://cloud.google.com/iam/docs/service-account-overview) key in JSON format, or **Application default credentials** in hybrid/Self-Managed deployments. Application default credentials use the credentials available in the runtime environment; see [setting up ADC locally](https://cloud.google.com/docs/authentication/set-up-adc-local-dev-environment).

</TabItem>
</Tabs>

#### Google Gemini model and parameters

| Field                        | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| :--------------------------- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Model**                    | Yes      | The model ID to use. See the [Gemini models documentation](https://ai.google.dev/gemini-api/docs/models).                                                                                                                                                                                                                                                                                                                                                 |
| **Thinking budget (tokens)** | No       | Gemini 2.5 models: token budget for extended thinking. `-1` = dynamic, `0` = disabled. Mutually exclusive with **Thinking level**. See the [thinking documentation](https://ai.google.dev/gemini-api/docs/thinking).                                                                                                                                                                                                                                      |
| **Thinking level**           | No       | Gemini 3.x models: qualitative thinking effort (`default`/`minimal`/`low`/`medium`/`high`). Mutually exclusive with **Thinking budget**.                                                                                                                                                                                                                                                                                                                  |
| **Maximum tokens**           | No       | The maximum number of tokens to generate before stopping.                                                                                                                                                                                                                                                                                                                                                                                                 |
| **Temperature**              | No       | Primary response-variation control. Lower values favor likely tokens more strongly; higher values increase variation. Supported ranges vary by model.                                                                                                                                                                                                                                                                                                     |
| **top P**                    | No       | Advanced nucleus-sampling control from 0 to 1. Limits selection to likely tokens whose cumulative probability reaches this value.                                                                                                                                                                                                                                                                                                                         |
| **top K**                    | No       | Advanced sampling control configured as a positive integer. Limits selection to this number of the most likely tokens.                                                                                                                                                                                                                                                                                                                                    |
| **Timeout**                  | No       | Maximum time to wait for the model API call, in [ISO-8601 duration format](https://en.wikipedia.org/wiki/ISO_8601#Durations) (for example, `PT60S`). Defaults to three minutes; must not exceed the job worker timeout, or the job may be reassigned while the call is still in progress. Self-Managed Spring connector runtime instances can override the default via the `camunda.connector.agenticai.aiagent.chat-model.api.default-timeout` property. |

:::note
Prompt caching is automatic when the request meets Gemini's caching requirements and isn't user-configurable.
:::

### Custom implementation

:::important
Available in Self-Managed or [hybrid](/reference/glossary.md#hybrid-mode) deployments only.
:::

Select this provider to use a custom chat model provider implementation that you've registered with the connector runtime, instead of one of the built-in providers above.

| Field                   | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| :---------------------- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Provider type**       | Yes      | Identifier for the custom chat model provider. Must match the identifier configured for the custom implementation.                                                                                                                                                                                                                                                                                                                                        |
| **Provider parameters** | No       | Parameters for the custom chat model provider implementation, as a FEEL context.                                                                                                                                                                                                                                                                                                                                                                          |
| **Model**               | Yes      | Identifier of the model to use, interpreted by the custom implementation.                                                                                                                                                                                                                                                                                                                                                                                 |
| **Timeout**             | No       | Maximum time to wait for the model API call, in [ISO-8601 duration format](https://en.wikipedia.org/wiki/ISO_8601#Durations) (for example, `PT60S`). Defaults to three minutes; must not exceed the job worker timeout, or the job may be reassigned while the call is still in progress. Self-Managed Spring connector runtime instances can override the default via the `camunda.connector.agenticai.aiagent.chat-model.api.default-timeout` property. |

Implementing a custom provider requires building and registering a chat model provider with your Self-Managed or hybrid connector runtime, similar to how [custom conversation storage backends](./agentic-ai-aiagent-customization.md#custom-conversation-storage) are registered.

## Missing a field?

Most backends also provide advanced, low-level customization fields: **HTTP headers**, **query parameters**, and **body properties**. With these fields, you can add or override values in the outgoing HTTP request.

If you don't see these fields on the provider or backend you selected, that's expected for backends with a well-known REST-style API surface, such as the native Anthropic API, OpenAI API, and Google Gemini or Enterprise Agent Platform backends: the fields are reserved for internal or future use and aren't exposed in the properties panel there. For backends without a fixed request structure, such as AWS Bedrock Converse and custom or compatible endpoints, the fields are exposed as editable [FEEL](/components/modeler/feel/what-is-feel.md) map expressions, which you can use to adapt the request to your deployment.
