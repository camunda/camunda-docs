---
id: agentic-ai-aiagent-upgrade
title: Upgrade AI Agent element templates
description: Move AI Agent Task and AI Agent Sub-process elements from the legacy to the new element templates.
---

<!--
DRAFT NOTES (remove before publishing). Markers below:
- DRAFT-MODELER-UI: no Modeler release offering template migration was found. Confirm the version and UI wording.
- DRAFT-C8CTL-PARITY: c8ctl reads only its own `metadata.migratesFrom` recipe, not the bpmn-js `migratesFrom` declarations.
  The c8ctl notes below describe the published recipe. Drop them if that recipe is aligned with the Modeler declarations.
-->

Move AI Agent elements from the legacy element templates to the new ones. The new templates contain a migration recipe that carries your configuration over, including the model provider. In most cases you migrate, deploy, and run.

## Legacy and new element templates

Camunda 8.10 provides two generations of AI Agent element templates. Each generation runs on its own job type.

| Element              | Generation | Element template ID                                      | Job type                                    |
| -------------------- | ---------- | -------------------------------------------------------- | ------------------------------------------- |
| AI Agent Task        | Legacy     | `io.camunda.connectors.agenticai.aiagent.v1`             | `io.camunda.agenticai:aiagent:1`            |
| AI Agent Task        | New        | `io.camunda.connectors.agenticai.ai-agent-task.v2`       | `io.camunda.agenticai:aiagent:task:2`       |
| AI Agent Sub-process | Legacy     | `io.camunda.connectors.agenticai.aiagent.jobworker.v1`   | `io.camunda.agenticai:aiagent-job-worker:1` |
| AI Agent Sub-process | New        | `io.camunda.connectors.agenticai.ai-agent-subprocess.v2` | `io.camunda.agenticai:aiagent:subprocess:2` |

For hybrid templates, add the `-hybrid` suffix to both IDs.

## Why upgrade

The legacy templates are deprecated in 8.10. They keep working, but they receive no new provider capabilities. The new templates add:

- Reasoning configuration: Anthropic **Effort**/**Thinking mode**, OpenAI **Effort**, Google Gemini **Thinking budget**/**Thinking level**.
- Prompt caching for Anthropic and AWS Bedrock Converse.
- More backends: [AWS Bedrock Mantle](agentic-ai-aiagent-model-providers.md#anthropic) for Claude, the [Google Gemini API](agentic-ai-aiagent-model-providers.md#google-gemini), and Microsoft Foundry for both OpenAI and Anthropic models.
- A [custom chat model provider](agentic-ai-aiagent-model-providers.md#custom-implementation) for Self-Managed and hybrid deployments.

New AI Agent implementations should use the new templates directly.

## Upgrade

### 1. Migrate the elements

Use Modeler or c8ctl. Both carry your configuration over. They differ in a few details, noted under [With c8ctl](#with-c8ctl).

**What the Modeler migration does for you:**

- Maps each legacy provider to its new provider and backend. See [provider mapping](#provider-mapping).
- Carries over credentials, supported endpoints, model, model parameters, headers, query parameters, timeouts, prompts, memory, limits, events, response settings, and AI Agent Task tool inputs.
- Selects the Anthropic API, Microsoft Foundry, or Custom backend from the stored legacy endpoint and normalizes applicable trailing `/v1` or `/anthropic/v1` suffixes.
- Keeps OpenAI-family providers on the Chat Completions API and leaves prompt caching off.

If a required field is empty after the migration, Modeler marks it. Fill it in before you deploy.

#### In Modeler

<!-- DRAFT-MODELER-UI: confirm the minimum Modeler version for migration and the UI wording of the steps below. 5.51.0 is only confirmed for showing the new templates. -->

Requires a Modeler version that offers template migration, and the process execution platform version set to Camunda 8.10 or later.

1. Select a legacy AI Agent element. The migration declaration requires legacy template version 13; if the element uses an earlier version, update it to version 13 first.
2. Apply the offered migration to the new AI Agent Task or AI Agent Sub-process template.
3. Review the listed next steps.

#### With c8ctl

Requires c8ctl 4.6.1 or later, and the BPMN execution platform version (`modeler:executionPlatformVersion`) set to Camunda 8.10 or later. c8ctl does not change this version.

```shell
# Refresh the local template cache so c8ctl has the recipe
c8ctl element-template sync

# Preview: prints a report, writes nothing
c8ctl element-template update io.camunda.connectors.agenticai.aiagent.jobworker.v1 process.bpmn \
  --to io.camunda.connectors.agenticai.ai-agent-subprocess.v2 --dry-run

# Apply
c8ctl element-template update io.camunda.connectors.agenticai.aiagent.jobworker.v1 process.bpmn \
  --to io.camunda.connectors.agenticai.ai-agent-subprocess.v2 --in-place
```

- One command handles one legacy template ID. If the file also has AI Agent Task elements, run it again with `io.camunda.connectors.agenticai.aiagent.v1` and `--to io.camunda.connectors.agenticai.ai-agent-task.v2`.
- To migrate a single element, add its ID before the file: `update <legacy-id> <element-id> process.bpmn --to <new-id>`.
- Elements below legacy version 12 are first updated to version 12. The report shows this step.
- The report marks moved values with `>` and recipe-set values with `set by recipe`. If it shows neither, c8ctl did not use the recipe. The report gives the reason, which is usually an outdated cache. Run `sync` and try again.
- c8ctl writes only if no values are lost. If the report lists dropped values, set them after the upgrade, or pass `--allow-lossy` once you have read them.
- Add `--json` for machine-readable output. Run `c8ctl element-template update --help` for all options.

<!-- DRAFT-C8CTL-PARITY: remove this list if the published c8ctl recipe is aligned with the Modeler declarations. -->

c8ctl differs from Modeler as follows. The report notes each difference.

- It turns on prompt caching for Anthropic and AWS Bedrock.
- It copies Anthropic endpoints as-is. Remove a trailing `/v1` or `/anthropic/v1` yourself.
- It moves a custom Google Vertex AI endpoint to a hidden field. See [Vertex AI custom endpoint](#edge-cases).

### 2. Deploy and run

1. Make sure a connectors runtime with the new AI Agent job worker is available.
2. AI Agent Task only: [update the tools sub-process](#ai-agent-task-tools-sub-process).
3. Deploy the new process version to a non-production environment. Run a representative prompt and tool call. See [testing process definitions](/components/best-practices/development/testing-process-definitions.md).
4. If the agent does not behave as before, see [edge cases](#edge-cases).
5. Promote the new version to production.

Deployed process definitions and their running instances keep using the legacy job type. Keep the legacy job worker running while they need it. The earlier process version remains your rollback path.

### AI Agent Task: tools sub-process

The AI Agent Task references a separate ad-hoc sub-process for its tools. Neither the new template nor the migration changes that sub-process. Update it by hand:

1. In **Extension properties**, add `io.camunda.agenticai.toolContainer` with the value `true`. This enables Modeler's agent tool features, such as linting and autofill. See [declare a sub-process as agentic](/components/modeler/reference/modeling-guidance/rules/agent-fromai-contract.md#declare-a-sub-process-as-agentic).
2. Set the multi-instance **Output element** to:

   ```feel
   {
     id: toolCall._meta.id,
     name: toolCall._meta.name,
     content: toolCallResult,
     completedAt: now()
   }
   ```

   Without `completedAt`, the connector uses the time it processes the results, which can be later than the actual completion time for slow or parallel tool calls.

The AI Agent Sub-process manages its own ad-hoc sub-process and needs no extra step.

## Provider mapping

The migration applies this mapping. Use it to read the report, or to configure the new template by hand if you apply it without the migration. Fields not listed keep their label and value.

| Legacy provider   | New provider / backend                         | Renamed or moved fields                                                                                                   |
| ----------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Anthropic         | Anthropic / Anthropic API, Microsoft Foundry, or Custom, based on **Endpoint** | **Endpoint** → **API endpoint**, without a trailing `/v1` or `/anthropic/v1`; **Anthropic API key** → **API key** |
| AWS Bedrock       | AWS Bedrock Converse                           | **Region** → **AWS region**; **Endpoint** → **Custom endpoint**                                                           |
| OpenAI            | OpenAI / OpenAI API, **API**: Chat Completions | **Maximum completion tokens** → **Max completion tokens**                                                                 |
| Azure OpenAI      | OpenAI / Microsoft Foundry, **API**: Chat Completions | **Endpoint** → **API endpoint**; **Model deployment name** → **Model**; **Maximum tokens** → **Max completion tokens**; **Client credentials** → **Entra ID: Client credentials** |
| OpenAI-compatible | OpenAI / Custom, **API**: Chat Completions     | **Maximum completion tokens** → **Max completion tokens**; **Custom parameters** → **Body properties**; **API key** → **Authentication**: API key, or None if the key is empty |
| Google Vertex AI  | Google Gemini / Enterprise Agent Platform (Vertex AI) | **Maximum output tokens** → **Maximum tokens**                                                                   |

After the upgrade, you can opt in to new capabilities, such as **Effort**, **Thinking mode**, prompt caching, or the OpenAI **Responses** API (enter the token limit in **Max output tokens**). See [model providers](agentic-ai-aiagent-model-providers.md).

## Other changes

- **Agent definition:** The new templates add a `zeebe:agentDefinition` extension element, so Camunda recognizes the element as an [agent definition](/components/agentic-orchestration/agent-definitions-and-instances.md). Nothing to configure.
- **Job type overrides:** If you [override the AI Agent job types](agentic-ai-aiagent-customization.md), set the new variables too. Keep the legacy ones while legacy process definitions are deployed or running.

  | Element              | Legacy variable                      | New variable                         |
  | -------------------- | ------------------------------------ | ------------------------------------ |
  | AI Agent Task        | `CONNECTOR_AI_AGENT_TYPE`            | `CONNECTOR_AI_AGENT_TASK_TYPE`       |
  | AI Agent Sub-process | `CONNECTOR_AI_AGENT_JOB_WORKER_TYPE` | `CONNECTOR_AI_AGENT_SUBPROCESS_TYPE` |

- **Custom extensions:** If you extend the connector with a custom conversation store or chat model, the Java APIs changed. See the [breaking changes for custom extensions](https://github.com/camunda/connectors/blob/stable/8.10/connectors/agentic-ai/docs/breaking-changes.md).

## Stay on the legacy templates

To update elements to the newest legacy version without switching templates, run `sync`, then `update` without `--to`:

```shell
c8ctl element-template update io.camunda.connectors.agenticai.aiagent.jobworker.v1 process.bpmn --in-place
```

The elements keep the legacy job type.

## Edge cases

These apply to a small number of configurations. Check them if the agent does not behave as before.

<details>
<summary>OpenAI-compatible: both an API key and an <code>Authorization</code> header</summary>

In the legacy template, an `Authorization` header in **Headers** overrode the **API key**. The migration selects **Authentication** from the API key and keeps the header, so the credential that wins can change. Fix it after the migration:

- `Bearer <token>`: put `<token>`, without `Bearer `, in **API key**, and remove the `Authorization` header.
- Any other scheme, such as `Basic`: keep the header and set **Authentication** to **None**.

If the legacy API key was empty, the migration already selects **None** and keeps the header. Nothing to do.

</details>

<details>
<summary>Google Vertex AI: custom endpoint</summary>

The new template does not support a custom Vertex AI endpoint. Modeler does not carry it over, so requests go to the default endpoint for **Region**. c8ctl moves it to a hidden field, which is not a supported configuration. If your endpoint was the regional default, nothing changes. Otherwise:

- Forward proxy: configure the connectors runtime HTTP proxy instead.
- Private hostname for Google APIs: resolve the default `*aiplatform.googleapis.com` host to your private endpoint through DNS. See [Private Service Connect for Google APIs](https://cloud.google.com/vpc/docs/configure-private-service-connect-apis).
- Neither works: keep the element on the legacy template.

</details>

<details>
<summary>Anthropic: endpoint from a secret or FEEL expression</summary>

The migration chooses the backend from the endpoint text without resolving secrets or FEEL. A Microsoft Foundry endpoint that is only visible at runtime is migrated to the **Custom** backend. A `/v1` suffix appended inside a FEEL expression is removed when it is visible in the expression, but not when it comes from the secret value. If the endpoint resolves to Foundry, change **Backend** to **Microsoft Foundry (Azure)**. Make sure the resolved endpoint has no trailing `/v1` or `/anthropic/v1`.

</details>

<details>
<summary>OpenAI-compatible: request path</summary>

The new template appends `/chat/completions` to **API endpoint**. If your gateway expects a different path, adjust **API endpoint**.

</details>

<details>
<summary>AWS Bedrock: run Claude on Bedrock Mantle</summary>

The migration keeps Bedrock elements on **AWS Bedrock Converse**. To use Anthropic-specific features for Claude models, switch by hand to **Anthropic** with the **AWS Bedrock Mantle** backend:

- **Custom endpoint** expects the full Mantle base URL, including `/anthropic`, for example `https://your-vpce-host/anthropic`.
- **Model** uses Anthropic model IDs, not Bedrock model IDs. See the [Claude models overview](https://docs.anthropic.com/en/docs/about-claude/models/all-models).
- Mantle needs a different IAM policy than Bedrock Runtime. Update it before you switch. Otherwise, the first call fails with a permission error.

</details>
