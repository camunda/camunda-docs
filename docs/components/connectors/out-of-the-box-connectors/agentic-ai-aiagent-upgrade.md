---
id: agentic-ai-aiagent-upgrade
sidebar_label: Upgrade from the legacy connector
title: Upgrade AI Agent element templates
description: Upgrade AI Agent connectors from the legacy element templates to the new element templates and migrate their model provider configurations.
---

Upgrade AI Agent connectors from the legacy element templates to the new element templates, and migrate their model provider configurations.

## Why upgrade

Starting with Camunda 8.10, new element templates are available for the [AI Agent Task](./agentic-ai-aiagent-task.md) and [AI Agent Sub-process](./agentic-ai-aiagent-subprocess.md) connectors. These templates broaden the ways you can connect AI agents to LLMs. You can select from more model providers and backends to use an LLM route that meets your organization's requirements. The new templates also expose provider-specific capabilities that can support cheaper, faster, and more transparent agent behavior:

- Reasoning and extended thinking configuration (Anthropic's **Effort**/**Thinking mode**, OpenAI's **Effort**, and Google Gemini's **Thinking budget**/**Thinking level**).
- Prompt caching configuration (Anthropic, AWS Bedrock Converse).
- New backend options: [AWS Bedrock Mantle](./agentic-ai-aiagent-model-providers.md#anthropic) for Anthropic Claude models and [Google Gemini API](./agentic-ai-aiagent-model-providers.md#google-gemini) for direct Gemini access. Microsoft Foundry was already available as **Azure OpenAI** in the legacy templates. It is now a backend of the general-purpose OpenAI provider, rather than its own top-level provider.
- A [custom chat model provider](./agentic-ai-aiagent-model-providers.md#custom-implementation) option, for Self-Managed/hybrid deployments.

The legacy element templates keep working, and existing implementations don't need to migrate immediately. However, they don't expose the new provider and backend choices or provider-specific configuration described above. Apply a new element template to use these capabilities.

:::important
Camunda deprecates the legacy element templates in 8.10. They will not receive new provider capabilities. They keep working. New AI Agent implementations should use the new element templates directly.
:::

## How to upgrade

The legacy and new element templates are separate templates, not two versions of the same template. This means upgrading is a manual, per-element operation:

1. Open the AI Agent Task or AI Agent Sub-process element in Camunda Modeler. Set the process' modeler/execution version to Camunda 8.10 or later. This makes the new element template available to select.
2. Select the element in the diagram. Choose **Change element**, then apply the new **AI Agent Task** or **AI Agent Sub-process** template. Camunda deprecates the legacy template. The template picker offers the new template for that element.
3. Re-enter the model provider configuration with the [mapping tables](#model-provider-configuration-mapping) below. The provider fields require the most migration work.
4. Review the rest of the element's configuration. Tools, memory, limits, response, and error handling are conceptually unchanged, but re-check any values that need to be re-entered after you apply the new template.
5. Deploy the new process definition version to a non-production environment first. Test a representative prompt and tool-call path. Make sure authentication, endpoint, and model behavior are correct before you promote it. See [testing process definitions](/components/best-practices/development/testing-process-definitions.md) for a test approach. The prior version keeps running until you deploy this one. It remains available as a rollback path.
6. Once verified, promote the new version to production through your normal release process.

:::important
Swapping the element template affects only the process definition you redeploy. Already-deployed process definitions and their running process instances keep executing on the legacy job worker. They switch only after you deploy a new version with the new template.
:::

## Model provider configuration mapping

Model provider configuration changed the most in this redesign, since providers and backends are now decoupled (see [choose a provider and backend](./agentic-ai-aiagent-model-providers.md#choose-a-provider-and-backend)).
The sections below cover only the fields that changed, comparing legacy and new template fields. Any fields not mentioned carry over unchanged under the same field label.

### Anthropic

**Legacy template Provider**: Anthropic → **New template Provider**: [Anthropic](./agentic-ai-aiagent-model-providers.md#anthropic), **Backend**: Anthropic API.

**Anthropic API key**, **Timeout**, **Model**, **Maximum tokens**, **Temperature**, **top P**, and **top K** carry over unchanged.

If you had a custom **Endpoint** configured in the legacy template:

| Legacy field | New template guidance                                                                                                                                |
| :----------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| Endpoint     | Select **Backend**: [Anthropic](./agentic-ai-aiagent-model-providers.md#anthropic) > Custom / compatible endpoint, and enter it as **API endpoint**. |

The new template additionally exposes **Effort**, **Thinking mode**, and **Enable prompt caching**. None of these have a legacy equivalent.

### AWS Bedrock

The legacy **AWS Bedrock Converse** provider was also commonly used to run **Anthropic Claude** models. In the new template, decide which provider matches your use case:

- **Running Claude models**: Migrate to the new template's **Anthropic** provider and **AWS Bedrock Mantle** backend. This keeps access to Anthropic-specific configuration, such as reasoning and prompt caching. See the [Anthropic provider](./agentic-ai-aiagent-model-providers.md#anthropic) above.
- **Running any other model family** (Amazon Nova, Meta Llama, Mistral, and so on): Migrate to the new template's **AWS Bedrock Converse** provider. It directly replaces the legacy provider.

#### Migrating to Anthropic + AWS Bedrock Mantle

**Authentication**, **Timeout**, **Maximum tokens**, **Temperature**, and **top P** carry over unchanged.

| Legacy field | New template field |
| :----------- | :----------------- |
| Region       | AWS region         |
| Endpoint     | Custom endpoint    |

:::important
**Custom endpoint** expects the full Bedrock Mantle base URL, including the `/anthropic` path segment (for example, `https://your-vpce-host/anthropic`). This is a different shape than the Bedrock Runtime endpoint you may have configured in the legacy template.

**Model** carries over under the same field label. The new template uses Anthropic's model ID scheme, not the AWS Bedrock model ID format from the legacy template. Check the model ID against the [Claude models overview](https://docs.anthropic.com/en/docs/about-claude/models/all-models).

Bedrock Mantle requires a different IAM permission policy than Bedrock Runtime. Do not reuse the legacy Bedrock Runtime policy unchanged. Update the policy for the new endpoint before you migrate. Otherwise, the first model call returns an authentication or permission error.
:::

#### Migrating to AWS Bedrock Converse

**Authentication**, **Timeout**, **Model**, **Maximum tokens**, **Temperature**, and **top P** carry over unchanged.

| Legacy field | New template field |
| :----------- | :----------------- |
| Region       | AWS region         |
| Endpoint     | Custom endpoint    |

The new template additionally exposes **Enable prompt caching** on the AWS Bedrock Converse provider.

### Azure OpenAI

**Legacy template Provider**: Azure OpenAI → **New template Provider**: [OpenAI](./agentic-ai-aiagent-model-providers.md#openai), **Backend**: Microsoft Foundry (Azure).

The provider itself changes from **Azure OpenAI** to **OpenAI**. Azure/Microsoft Foundry is now a backend of the general-purpose OpenAI provider rather than its own top-level provider.

**Authentication: API key**, **Timeout**, **Temperature**, and **top P** carry over unchanged.

| Legacy field                                                                             | New template field                                                                                 |
| :--------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------- |
| Endpoint                                                                                 | API endpoint                                                                                       |
| Authentication: Client credentials (Client ID, Client secret, Tenant ID, Authority host) | Authentication: Entra ID: Client credentials (Client ID, Client secret, Tenant ID, Authority host) |
| Model deployment name                                                                    | Model                                                                                              |
| Maximum tokens                                                                           | Max output tokens (Responses API) or Max completion tokens (Chat Completions API)                  |

The new template additionally offers an **Entra ID: Managed identity** authentication option (Hybrid/Self-Managed only), an optional **Entra ID scope** override, and the **Effort** reasoning parameter.

:::note
A multi-replica connectors runtime setup means each replica acquires and caches its own Entra ID token independently. Expect parallel credential/token requests against Entra ID rather than a single shared token.
:::

### OpenAI

**Legacy template Provider**: OpenAI → **New template Provider**: [OpenAI](./agentic-ai-aiagent-model-providers.md#openai), **Backend**: OpenAI API.

**OpenAI API key**, **Organization ID**, **Project ID**, **Timeout**, **Model**, **Temperature**, and **top P** carry over unchanged.

| Legacy field              | New template field                                                                                                    |
| :------------------------ | :-------------------------------------------------------------------------------------------------------------------- |
| Maximum completion tokens | Max completion tokens (if you keep **API**: Chat Completions) or Max output tokens (if you switch **API**: Responses) |

The legacy template always used the Chat Completions API. The new template defaults its **API** field to the newer **Responses** API. Select **Chat Completions** instead if you need closer parity with legacy behavior. The new template additionally exposes the **Effort** reasoning parameter on both API families.

### OpenAI-compatible

**Legacy template Provider**: OpenAI-compatible → **New template Provider**: [OpenAI](./agentic-ai-aiagent-model-providers.md#openai), **Backend**: Custom / compatible endpoint.

**API endpoint**, **API key**, **Headers**, **Query parameters**, **Timeout**, **Model**, **Temperature**, and **top P** carry over unchanged, subject to the notes below.

| Legacy field              | New template field                                                        |
| :------------------------ | :------------------------------------------------------------------------ |
| Maximum completion tokens | Max completion tokens (Chat Completions) or Max output tokens (Responses) |
| Custom parameters         | Body properties                                                           |

:::important
You must enter an **API key** in the new template. The legacy template made the **API key** optional. Resolve your effective credential as follows before you enter it:

- If your legacy template's **Headers** contained an `Authorization` header, it took precedence over the **API key** field. Carry this behavior forward manually:
  - If the header used `Bearer <token>`, move the token value without the `Bearer` prefix into the new template's **API key** field. Remove the `Authorization` header from **Headers**.
  - For any other scheme, such as `Basic ...`, keep the header in **Headers**. Enter any non-blank placeholder value in **API key**. The connector does not use it for authentication.
- Otherwise, carry your legacy **API key** value over directly. If you did not configure an `Authorization` header or an API key, enter any non-blank placeholder value.

:::

Also check the resulting request path. The new template appends `/chat/completions` or `/responses` to **API endpoint** for the selected **API**. This may differ from your legacy endpoint.

### Google Vertex AI

**Legacy template Provider**: Google Vertex AI → **New template Provider**: [Google Gemini](./agentic-ai-aiagent-model-providers.md#google-gemini), **Backend**: Enterprise Agent Platform (Vertex AI).

The provider itself changes from **Google Vertex AI** to **Google Gemini**. Vertex AI is now the Enterprise Agent Platform backend of the general-purpose Google Gemini provider. A new [Google Gemini API](./agentic-ai-aiagent-model-providers.md#google-gemini) backend is also available if you'd rather not manage a Google Cloud project.

**Project ID**, **Region**, **Authentication** (**Service account credentials** / **Application default credentials**), **Model**, **Temperature**, **top P**, and **top K** carry over unchanged.

| Legacy field          | New template guidance                                                                                                    |
| :-------------------- | :----------------------------------------------------------------------------------------------------------------------- |
| Maximum output tokens | Enter the same value as **Maximum tokens**.                                                                              |
| Endpoint              | Not available. There's no custom/compatible endpoint backend for Google Gemini to switch to, unlike Anthropic or OpenAI. |

The new template additionally exposes **Thinking budget**/**Thinking level** for reasoning configuration.
