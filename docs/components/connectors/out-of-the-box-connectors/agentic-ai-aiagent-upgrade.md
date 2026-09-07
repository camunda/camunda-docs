---
id: agentic-ai-aiagent-upgrade
sidebar_label: Upgrade from the legacy connector
title: Upgrade AI Agent element templates from the legacy connector
description: Upgrade AI Agent connectors from the legacy element templates to the new native element templates and migrate their model provider configurations.
---

Upgrade AI Agent connectors from the legacy element templates to the new native element templates, and migrate their model provider configurations.

## Why upgrade

Starting with Camunda 8.10, the [AI Agent Task](./agentic-ai-aiagent-task.md) and [AI Agent Sub-process](./agentic-ai-aiagent-subprocess.md) connectors are available as new element templates, running on new job types. The redesign gives each LLM provider native, first-class access to its own SDK and wire format, replacing the previous common abstraction, and unlocks capabilities the legacy templates can't expose:

- Reasoning and extended thinking configuration (Anthropic's **Effort**/**Thinking mode**, OpenAI's **Effort**, and Google Gemini's **Thinking budget**/**Thinking level**).
- Prompt caching configuration (Anthropic, AWS Bedrock Converse).
- A new backend for Anthropic Claude models: [AWS Bedrock Mantle](./agentic-ai-aiagent-model-providers.md#anthropic). Microsoft Foundry itself isn't new (it was already reachable as **Azure OpenAI** in the legacy templates), but it's now a backend of the general-purpose OpenAI provider instead of its own top-level provider.
- A [custom chat model provider](./agentic-ai-aiagent-model-providers.md#custom-implementation) option, for Self-Managed/hybrid deployments.

As of Camunda 8.10, legacy job workers already run internally on the same native provider SDKs that back the new templates (the legacy templates were themselves backed by a "native" element template style; what's changed is the abstraction underneath, not that distinction). This is a transparent runtime change, so existing legacy configurations keep working and benefit from it automatically. However, the legacy element templates' fields don't expose any of the new configuration described above. To use it, apply the new element template.

:::important
The legacy element templates are deprecated as of Camunda 8.10 and will not receive new provider capabilities going forward, but they keep working. New AI Agent implementations should use the new element templates directly.
:::

## How to upgrade

The legacy and new element templates are separate templates backed by separate connector types (job types), not two versions of the same template. This means upgrading is a manual, per-element operation:

1. Open the AI Agent Task or AI Agent Sub-process element in Camunda Modeler, and set the process' modeler/execution version to Camunda 8.10 or later, so the new element template is available to select.
2. In the element's **Template** panel, **Unlink** the applied legacy template. This clears the template binding but keeps the element's existing field values.
3. Select the element and choose **+ Select** on the **Template** field to apply the latest version of the same element template (**AI Agent Task**/**AI Agent Sub-process**). Since the legacy template is deprecated, it's no longer selectable from the template picker; only the new one is offered.
4. Re-enter the model provider configuration using the [mapping tables](#model-provider-configuration-mapping) below. This is where the bulk of the migration work is, since the provider fields were restructured the most.
5. Review the rest of the element's configuration. Tools, memory, limits, response, and error handling are conceptually unchanged, but re-check any values lost when the template was swapped.
6. Deploy the new process definition version to a non-production environment first, and run a representative prompt and tool-call path through it to confirm authentication, endpoint, and model behavior before promoting it. See [testing process definitions](/components/best-practices/development/testing-process-definitions.md) for how to structure that verification. The prior version keeps running until you deploy this one, so it stays available as a rollback path.
7. Once verified, promote the new version to production through your normal release process.

:::important
Swapping the element template only affects the process definition you redeploy. Already-deployed process definitions, and any process instances already running against them, keep executing on the legacy job worker until you deploy a new version with the new template applied.
:::

## Model provider configuration mapping

Model provider configuration changed the most in this redesign, since providers and backends are now decoupled (see [choose a provider and backend](./agentic-ai-aiagent-model-providers.md#choose-a-provider-and-backend)).
The sections below cover only the fields that changed, using `v1`/`v2` to distinguish the legacy and new template fields precisely where the mapping itself is the point. Any fields not mentioned carry over unchanged under the same field label.

### Anthropic

`v1` **Provider**: Anthropic → `v2` **Provider**: [Anthropic](./agentic-ai-aiagent-model-providers.md#anthropic), **Backend**: Anthropic API.

**Anthropic API key**, **Timeout**, **Model**, **Maximum tokens**, **Temperature**, **top P**, and **top K** carry over unchanged.

If you had a custom `v1` **Endpoint** configured:

| `v1` field | What to do in `v2`                                                                                                                                   |
| :--------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| Endpoint   | Select **Backend**: [Anthropic](./agentic-ai-aiagent-model-providers.md#anthropic) > Custom / compatible endpoint, and enter it as **API endpoint**. |

`v2` additionally exposes **Effort**, **Thinking mode**, and **Enable prompt caching**. None of these have a `v1` equivalent.

### AWS Bedrock

`v1`'s **AWS Bedrock Converse** provider was also commonly used to run **Anthropic Claude** models. In `v2`, decide which provider matches your use case:

- **Running Claude models**: migrate to `v2` **Anthropic**, backend **AWS Bedrock Mantle**, to keep access to Anthropic-specific configuration (reasoning, prompt caching). See the [Anthropic provider](./agentic-ai-aiagent-model-providers.md#anthropic) above.
- **Running any other model family** (Amazon Nova, Meta Llama, Mistral, and so on): migrate to `v2` **AWS Bedrock Converse**, a direct equivalent of the `v1` provider.

#### Migrating to Anthropic + AWS Bedrock Mantle

**Authentication**, **Timeout**, **Maximum tokens**, **Temperature**, and **top P** carry over unchanged.

| `v1` field | `v2` field      |
| :--------- | :-------------- |
| Region     | AWS region      |
| Endpoint   | Custom endpoint |

:::important
**Custom endpoint** expects the full Bedrock Mantle base URL, including the `/anthropic` path segment (for example, `https://your-vpce-host/anthropic`). This is a different shape than the Bedrock Runtime endpoint you may have configured in `v1`.

**Model** carries over the same field label, but is now interpreted by Anthropic's own model ID scheme (as used by the native Anthropic API), not the AWS Bedrock model ID format you used in `v1`. Check the model ID against the [Claude models overview](https://docs.anthropic.com/en/docs/about-claude/models/all-models).

Bedrock Mantle requires a different IAM permission policy than Bedrock Runtime. Reusing your `v1` Bedrock Runtime policy as-is will surface as an authentication or permission error on the first model call, not as a silent failure, so update the policy for the new endpoint before migrating.
:::

#### Migrating to AWS Bedrock Converse

**Authentication**, **Timeout**, **Model**, **Maximum tokens**, **Temperature**, and **top P** carry over unchanged.

| `v1` field | `v2` field      |
| :--------- | :-------------- |
| Region     | AWS region      |
| Endpoint   | Custom endpoint |

`v2` additionally exposes **Enable prompt caching** on the AWS Bedrock Converse provider.

### Azure OpenAI

`v1` **Provider**: Azure OpenAI → `v2` **Provider**: [OpenAI](./agentic-ai-aiagent-model-providers.md#openai), **Backend**: Microsoft Foundry (Azure).

The provider itself changes from **Azure OpenAI** to **OpenAI**. Azure/Microsoft Foundry is now a backend of the general-purpose OpenAI provider rather than its own top-level provider.

**Authentication: API key**, **Timeout**, **Temperature**, and **top P** carry over unchanged.

| `v1` field                                                                               | `v2` field                                                                                         |
| :--------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------- |
| Endpoint                                                                                 | API endpoint                                                                                       |
| Authentication: Client credentials (Client ID, Client secret, Tenant ID, Authority host) | Authentication: Entra ID: Client credentials (Client ID, Client secret, Tenant ID, Authority host) |
| Model deployment name                                                                    | Model                                                                                              |
| Maximum tokens                                                                           | Max output tokens (Responses API) or Max completion tokens (Chat Completions API)                  |

`v2` additionally offers an **Entra ID: Managed identity** authentication option (Hybrid/Self-Managed only), an optional **Entra ID scope** override, and the **Effort** reasoning parameter.

:::note
A multi-replica connectors runtime setup means each replica acquires and caches its own Entra ID token independently. Expect parallel credential/token requests against Entra ID rather than a single shared token.
:::

### OpenAI

`v1` **Provider**: OpenAI → `v2` **Provider**: [OpenAI](./agentic-ai-aiagent-model-providers.md#openai), **Backend**: OpenAI API.

**OpenAI API key**, **Organization ID**, **Project ID**, **Timeout**, **Model**, **Temperature**, and **top P** carry over unchanged.

| `v1` field                | `v2` field                                                                                                            |
| :------------------------ | :-------------------------------------------------------------------------------------------------------------------- |
| Maximum completion tokens | Max completion tokens (if you keep **API**: Chat Completions) or Max output tokens (if you switch **API**: Responses) |

`v1` always used the Chat Completions API. `v2` defaults its **API** field to the newer **Responses** API; select **Chat Completions** instead if you need closer parity with your `v1` behavior. `v2` additionally exposes the **Effort** reasoning parameter on both API families.

### OpenAI-compatible

`v1` **Provider**: OpenAI-compatible → `v2` **Provider**: [OpenAI](./agentic-ai-aiagent-model-providers.md#openai), **Backend**: Custom / compatible endpoint.

**API endpoint**, **API key**, **Headers**, **Query parameters**, **Timeout**, **Model**, **Temperature**, and **top P** carry over unchanged, subject to the notes below.

| `v1` field                | `v2` field                                                                |
| :------------------------ | :------------------------------------------------------------------------ |
| Maximum completion tokens | Max completion tokens (Chat Completions) or Max output tokens (Responses) |
| Custom parameters         | Body properties                                                           |

:::important
`v2`'s **API key** field is required, unlike `v1`'s optional **API key**. Resolve your effective credential as follows before entering it:

- If your `v1` **Headers** included an `Authorization` header, it always took precedence over the **API key** field in `v1`. Carry that behavior forward manually:
  - If the header used `Bearer <token>`, move the token value without the `Bearer` prefix into the `v2` **API key** field, and remove the `Authorization` header from `v2` **Headers**.
  - For any other scheme (for example `Basic ...`), keep the header in `v2` **Headers**, and enter any non-blank placeholder value in **API key** (it's otherwise unused for authentication).
- Otherwise, carry your `v1` **API key** value over directly. If neither an `Authorization` header nor an API key was configured, enter any non-blank placeholder value.
  :::

Also double-check the resulting request path: `v2` appends `/chat/completions` or `/responses` to **API endpoint** depending on the selected **API**, which may differ from what your `v1` endpoint pointed at.

### Google Vertex AI

`v1` **Provider**: Google Vertex AI → `v2` **Provider**: [Google Gemini](./agentic-ai-aiagent-model-providers.md#google-gemini), **Backend**: Enterprise Agent Platform (Vertex AI).

The provider itself changes from **Google Vertex AI** to **Google Gemini**. Vertex AI is now the Enterprise Agent Platform backend of the general-purpose Google Gemini provider. A new [Google Gemini API](./agentic-ai-aiagent-model-providers.md#google-gemini) backend is also available if you'd rather not manage a Google Cloud project.

**Project ID**, **Region**, **Authentication** (**Service account credentials** / **Application default credentials**), **Model**, **Temperature**, **top P**, and **top K** carry over unchanged.

| `v1` field            | What to do in `v2`                                                                                                       |
| :-------------------- | :----------------------------------------------------------------------------------------------------------------------- |
| Maximum output tokens | Enter the same value as **Maximum tokens**.                                                                              |
| Endpoint              | Not available. There's no custom/compatible endpoint backend for Google Gemini to switch to, unlike Anthropic or OpenAI. |

`v2` additionally exposes **Thinking budget**/**Thinking level** for reasoning configuration.
