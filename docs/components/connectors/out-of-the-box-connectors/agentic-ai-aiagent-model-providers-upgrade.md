---
id: agentic-ai-aiagent-model-providers-upgrade
sidebar_label: Upgrading from v1
title: Upgrade from v1 to v2 model providers
description: Migrate AI Agent Task and AI Agent Sub-process model provider configuration from the legacy (v1) element templates to the native v2 provider configuration.
---

Starting with Camunda 8.10, the AI Agent Task and AI Agent Sub-process connectors are available as new, native (`v2`) element templates with a redesigned [model provider configuration](./agentic-ai-aiagent-model-providers.md). This guide explains why and how to move an existing AI Agent implementation from the original (`v1`) element templates to `v2`.

## Why upgrade

The `v2` element templates give the AI Agent connector native, first-class access to each LLM provider's own SDK and wire format, instead of going through a common-denominator abstraction. This unlocks capabilities the `v1` element templates don't expose at all, such as:

- Reasoning/extended thinking configuration (Anthropic's **Effort**/**Thinking mode**, OpenAI's **Effort**, Google Gemini's **Thinking budget**/**Thinking level**).
- Prompt caching configuration (Anthropic, AWS Bedrock Converse).
- New backends, such as [Microsoft Foundry](./agentic-ai-aiagent-model-providers.md#microsoft-foundry-azure) for OpenAI, and [AWS Bedrock Mantle](./agentic-ai-aiagent-model-providers.md#aws-bedrock-mantle) for Anthropic Claude models.
- A [custom chat model provider](./agentic-ai-aiagent-model-providers.md#custom-implementation) option, for Self-Managed/hybrid deployments.

As of Camunda 8.10, `v1` job workers already run internally on the same native provider SDKs that back `v2`. This is a transparent runtime change, so existing `v1` configurations keep working and benefit from it automatically. However, the `v1` element templates' fields don't expose any of the new configuration described above. To use it, apply the `v2` element template.

`v1` element templates are deprecated as of Camunda 8.10 and will not receive new provider capabilities going forward. New AI Agent implementations should use the `v2` element templates directly.

## How to upgrade

`v1` and `v2` are separate element templates backed by separate connector types (job types), not two versions of the same template. This means upgrading is a manual, per-element operation:

1. Open the AI Agent Task or AI Agent Sub-process element in Camunda Modeler.
2. Change the applied element template from **AI Agent Task**/**AI Agent Sub-process** (`v1`) to the `v2` variant of the same name.
3. Re-enter the model provider configuration using the [mapping tables](#provider-configuration-mapping) below.
4. Review the rest of the element's configuration. Tools, memory, limits, response, and error handling are conceptually unchanged, but re-check any values lost when the template was swapped.
5. Redeploy the process definition.

Swapping the element template only affects the process definition you redeploy. Already-deployed process definitions, and any process instances already running against them, keep executing on the `v1` job worker until you deploy a new version with the `v2` template applied. This isn't a live migration of in-flight instances.

## Provider configuration mapping

The tables below map each `v1` provider's fields to their `v2` equivalent, by field label. Enter the same values into the new fields unless a note says otherwise.

### Anthropic

`v1` **Provider**: Anthropic → `v2` **Provider**: [Anthropic](./agentic-ai-aiagent-model-providers.md#anthropic), **Backend**: Anthropic API.

| `v1` field        | `v2` field                           |
| :---------------- | :----------------------------------- |
| Anthropic API key | Anthropic API key                    |
| Endpoint          | API endpoint (advanced/hidden field) |
| Timeout           | Timeout                              |
| Model             | Model                                |
| Maximum tokens    | Maximum tokens                       |
| Temperature       | Temperature                          |
| top P             | top P                                |
| top K             | top K                                |

`v2` additionally exposes **Effort**, **Thinking mode**, and **Enable prompt caching**. None of these have a `v1` equivalent.

### AWS Bedrock

`v1`'s **AWS Bedrock Converse** provider was also commonly used to run **Anthropic Claude** models. In `v2`, decide which provider matches your use case:

- **Running Claude models**: migrate to `v2` **Anthropic**, backend **AWS Bedrock Mantle**, to keep access to Anthropic-specific configuration (reasoning, prompt caching). See the [Anthropic provider](./agentic-ai-aiagent-model-providers.md#anthropic) above.
- **Running any other model family** (Amazon Nova, Meta Llama, Mistral, and so on): migrate to `v2` **AWS Bedrock Converse**, a direct equivalent of the `v1` provider.

#### Migrating to Anthropic + AWS Bedrock Mantle

| `v1` field (AWS Bedrock Converse) | `v2` field (Anthropic → AWS Bedrock Mantle) |
| :-------------------------------- | :------------------------------------------ |
| Region                            | AWS region                                  |
| Endpoint                          | Custom endpoint                             |
| Authentication                    | Authentication                              |
| Timeout                           | Timeout                                     |
| Model                             | Model                                       |
| Maximum tokens                    | Maximum tokens                              |
| Temperature                       | Temperature                                 |
| top P                             | top P                                       |

:::important
**Custom endpoint** expects the full Bedrock Mantle base URL, including the `/anthropic` path segment (for example, `https://your-vpce-host/anthropic`). This is a different shape than the Bedrock Runtime endpoint you may have configured in `v1`.

**Model** is interpreted by Anthropic's own model ID scheme (as used by the native Anthropic API), not the AWS Bedrock model ID format you used in `v1`. Check the model ID against the [Claude models overview](https://docs.anthropic.com/en/docs/about-claude/models/all-models).
:::

#### Migrating to AWS Bedrock Converse

| `v1` field     | `v2` field      |
| :------------- | :-------------- |
| Region         | AWS region      |
| Endpoint       | Custom endpoint |
| Authentication | Authentication  |
| Timeout        | Timeout         |
| Model          | Model           |
| Maximum tokens | Maximum tokens  |
| Temperature    | Temperature     |
| top P          | top P           |

`v2` additionally exposes **Enable prompt caching** on the AWS Bedrock Converse provider.

### Azure OpenAI

`v1` **Provider**: Azure OpenAI → `v2` **Provider**: [OpenAI](./agentic-ai-aiagent-model-providers.md#openai), **Backend**: Microsoft Foundry (Azure).

The provider itself changes from **Azure OpenAI** to **OpenAI**. Azure/Microsoft Foundry is now a backend of the general-purpose OpenAI provider rather than its own top-level provider.

| `v1` field                                                                               | `v2` field                                                                                         |
| :--------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------- |
| Endpoint                                                                                 | API endpoint                                                                                       |
| Authentication: API key                                                                  | Authentication: API key                                                                            |
| Authentication: Client credentials (Client ID, Client secret, Tenant ID, Authority host) | Authentication: Entra ID: Client credentials (Client ID, Client secret, Tenant ID, Authority host) |
| Model deployment name                                                                    | Model                                                                                              |
| Timeout                                                                                  | Timeout                                                                                            |
| Maximum tokens                                                                           | Max output tokens (Responses API) or Max completion tokens (Chat Completions API)                  |
| Temperature                                                                              | Temperature                                                                                        |
| top P                                                                                    | top P                                                                                              |

`v2` additionally offers an **Entra ID: Managed identity** authentication option (Hybrid/Self-Managed only), an optional **Entra ID scope** override, and the **Effort** reasoning parameter.

:::note
A multi-replica connectors runtime setup means each replica acquires and caches its own Entra ID token independently. Expect parallel credential/token requests against Entra ID rather than a single shared token.
:::

### OpenAI

`v1` **Provider**: OpenAI → `v2` **Provider**: [OpenAI](./agentic-ai-aiagent-model-providers.md#openai), **Backend**: OpenAI API.

| `v1` field                | `v2` field                                                                                                            |
| :------------------------ | :-------------------------------------------------------------------------------------------------------------------- |
| OpenAI API key            | OpenAI API key                                                                                                        |
| Organization ID           | Organization ID                                                                                                       |
| Project ID                | Project ID                                                                                                            |
| Timeout                   | Timeout                                                                                                               |
| Model                     | Model                                                                                                                 |
| Maximum completion tokens | Max completion tokens (if you keep **API**: Chat Completions) or Max output tokens (if you switch **API**: Responses) |
| Temperature               | Temperature                                                                                                           |
| top P                     | top P                                                                                                                 |

`v1` always used the Chat Completions API. `v2` defaults its **API** field to the newer **Responses** API; select **Chat Completions** instead if you need closer parity with your `v1` behavior. `v2` additionally exposes the **Effort** reasoning parameter on both API families.

### OpenAI-compatible

`v1` **Provider**: OpenAI-compatible → `v2` **Provider**: [OpenAI](./agentic-ai-aiagent-model-providers.md#openai), **Backend**: Custom / compatible endpoint.

| `v1` field                | `v2` field                                                                |
| :------------------------ | :------------------------------------------------------------------------ |
| API endpoint              | API endpoint                                                              |
| API key                   | API key                                                                   |
| Headers                   | Headers                                                                   |
| Query Parameters          | Query parameters                                                          |
| Timeout                   | Timeout                                                                   |
| Model                     | Model                                                                     |
| Maximum completion tokens | Max completion tokens (Chat Completions) or Max output tokens (Responses) |
| Temperature               | Temperature                                                               |
| top P                     | top P                                                                     |
| Custom parameters         | Body properties                                                           |

:::important
`v2`'s **API key** field is required, unlike `v1`'s optional **API key**. Resolve your effective credential as follows before entering it:

- If your `v1` **Headers** included an `Authorization` header, it always took precedence over the **API key** field in `v1`. Carry that behavior forward manually:
  - If the header value was a `Bearer <token>`, move `<token>` into the `v2` **API key** field, and remove the `Authorization` header from `v2` **Headers**.
  - For any other scheme (for example `Basic ...`), keep the header as-is in `v2` **Headers**, and enter any non-blank placeholder value in **API key** (it's otherwise unused for authentication).
- Otherwise, carry your `v1` **API key** value over directly. If you had neither an `Authorization` header nor an API key configured, enter any non-blank placeholder value.
  :::

Also double-check the resulting request path: `v2` appends `/chat/completions` or `/responses` to **API endpoint** depending on the selected **API**, which may differ from what your `v1` endpoint pointed at.

### Google Vertex AI

`v1` **Provider**: Google Vertex AI → `v2` **Provider**: [Google Gemini](./agentic-ai-aiagent-model-providers.md#google-gemini), **Backend**: Google Vertex AI.

The provider itself changes from **Google Vertex AI** to **Google Gemini**. Vertex AI is now a backend of the general-purpose Google Gemini provider. A new [Google Gemini API](./agentic-ai-aiagent-model-providers.md#google-gemini-api) backend is also available if you'd rather not manage a Google Cloud project.

| `v1` field                                            | `v2` field                                      |
| :---------------------------------------------------- | :---------------------------------------------- |
| Project ID                                            | Project ID                                      |
| Region                                                | Region                                          |
| Endpoint                                              | API endpoint (advanced/hidden field)            |
| Authentication: Service Account Credentials           | Authentication: Service account credentials     |
| Authentication: Application Default Credentials (ADC) | Authentication: Application default credentials |
| Model                                                 | Model                                           |
| Maximum output tokens                                 | Maximum tokens                                  |
| Temperature                                           | Temperature                                     |
| top P                                                 | top P                                           |
| top K                                                 | top K                                           |

`v2` additionally exposes **Thinking budget**/**Thinking level** for reasoning configuration.
