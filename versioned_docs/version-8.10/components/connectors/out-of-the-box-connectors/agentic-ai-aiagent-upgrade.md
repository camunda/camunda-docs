---
id: agentic-ai-aiagent-upgrade
sidebar_label: Upgrade from the legacy connector
title: Upgrade AI Agent element templates
description: Upgrade AI Agent connectors from the legacy element templates to the new element templates with c8ctl or manually, and migrate their model provider configurations.
---

Upgrade AI Agent connectors from the legacy element templates to the new element templates, and migrate their model provider configurations. Use c8ctl to do most of the upgrade automatically, or upgrade each element manually in Modeler.

## Legacy and new element templates

Camunda 8.10 provides two generations of AI Agent element templates, and each generation runs on its own job types. This page uses the following terms:

- **Legacy element templates** are the AI Agent Task and AI Agent Sub-process templates available before Camunda 8.10. Modeler marks them as **(Deprecated)**. They run on the legacy job types.
- **New element templates** are the AI Agent Task and AI Agent Sub-process templates introduced in Camunda 8.10 (template ID suffix `.v2`). They run on new job types.

| Element              | Template generation | Element template ID                                      | Job type                                    |
| :------------------- | :------------------ | :------------------------------------------------------- | :------------------------------------------ |
| AI Agent Task        | Legacy              | `io.camunda.connectors.agenticai.aiagent.v1`             | `io.camunda.agenticai:aiagent:1`            |
| AI Agent Task        | New                 | `io.camunda.connectors.agenticai.ai-agent-task.v2`       | `io.camunda.agenticai:aiagent:task:2`       |
| AI Agent Sub-process | Legacy              | `io.camunda.connectors.agenticai.aiagent.jobworker.v1`   | `io.camunda.agenticai:aiagent-job-worker:1` |
| AI Agent Sub-process | New                 | `io.camunda.connectors.agenticai.ai-agent-subprocess.v2` | `io.camunda.agenticai:aiagent:subprocess:2` |

The job type in a process definition determines which connector implementation executes the element. A process definition that was deployed with a legacy template keeps using the legacy job type until you deploy a new version with the new template.

## Why upgrade

Starting with Camunda 8.10, new element templates are available for the [AI Agent Task](./agentic-ai-aiagent-task.md) and [AI Agent Sub-process](./agentic-ai-aiagent-subprocess.md) connectors. These templates broaden the ways you can connect AI agents to LLMs. You can select from more model providers and backends to use an LLM route that meets your organization's requirements. The new templates also expose provider-specific capabilities that can support cheaper, faster, and more transparent agent behavior:

- Reasoning and extended thinking configuration (Anthropic's **Effort**/**Thinking mode**, OpenAI's **Effort**, and Google Gemini's **Thinking budget**/**Thinking level**).
- Prompt caching configuration (Anthropic, AWS Bedrock Converse).
- New backend options: [AWS Bedrock Mantle](./agentic-ai-aiagent-model-providers.md#anthropic) for Anthropic Claude models and [Google Gemini API](./agentic-ai-aiagent-model-providers.md#google-gemini) for direct Gemini access. Microsoft Foundry was already available as **Azure OpenAI** in the legacy templates. It is now a backend of both the OpenAI and Anthropic providers, rather than its own top-level provider. Your AI agents can therefore also use Claude models served by Foundry.
- A [custom chat model provider](./agentic-ai-aiagent-model-providers.md#custom-implementation) option, for Self-Managed/hybrid deployments.

The legacy element templates keep working, and existing implementations don't need to migrate immediately. However, they don't expose the new provider and backend choices or provider-specific configuration described above. Apply a new element template to use these capabilities.

:::important
Camunda deprecates the legacy element templates in 8.10. They will not receive new provider capabilities. They keep working. New AI Agent implementations should use the new element templates directly.
:::

## How to upgrade

The legacy and new element templates are separate templates, not two versions of the same template. You can upgrade an element in one of two ways:

- [Upgrade with c8ctl](#upgrade-with-c8ctl) (recommended). c8ctl moves the values of all legacy AI Agent elements in a BPMN file to the new template and reports each change.
- [Upgrade manually in Modeler](#upgrade-manually-in-modeler). You apply the new template to each element and enter the values again.

After the upgrade, [complete the upgrade](#complete-the-upgrade) for both ways.

### Upgrade with c8ctl

Use the `c8ctl element-template update` command to move legacy AI Agent elements to the new element templates. The new templates contain a migration recipe. The recipe tells c8ctl how each legacy field maps to the new fields, including the model provider configuration.

Prerequisites:

- [c8ctl](/apis-tools/c8ctl/getting-started.md#install) 4.4.0 or later.
- The BPMN file sets the execution platform version to Camunda 8.10 or later. c8ctl does not change this version. Set it in Modeler or in the `modeler:executionPlatformVersion` attribute of the BPMN file.

Each legacy template has one new template as its target:

| Element                       | Legacy template ID (`<legacy-id>`)                            | New template ID (`<new-id>`)                                    |
| :---------------------------- | :------------------------------------------------------------ | :-------------------------------------------------------------- |
| AI Agent Sub-process          | `io.camunda.connectors.agenticai.aiagent.jobworker.v1`        | `io.camunda.connectors.agenticai.ai-agent-subprocess.v2`        |
| AI Agent Task                 | `io.camunda.connectors.agenticai.aiagent.v1`                  | `io.camunda.connectors.agenticai.ai-agent-task.v2`              |
| AI Agent Sub-process (hybrid) | `io.camunda.connectors.agenticai.aiagent.jobworker.v1-hybrid` | `io.camunda.connectors.agenticai.ai-agent-subprocess.v2-hybrid` |
| AI Agent Task (hybrid)        | `io.camunda.connectors.agenticai.aiagent.v1-hybrid`           | `io.camunda.connectors.agenticai.ai-agent-task.v2-hybrid`       |

The `update` command selects elements by their legacy template ID:

| Command                                                      | Elements that c8ctl updates                                                                                     |
| :----------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------- |
| `update <legacy-id> process.bpmn --to <new-id>`              | All elements in the file that use `<legacy-id>`, in any version. The elements of other templates do not change. |
| `update <legacy-id> <element-id> process.bpmn --to <new-id>` | Only the element with the ID `<element-id>`. The command fails if this element does not use `<legacy-id>`.      |

One command accepts one legacy template ID only. If a file contains AI Agent Sub-process elements and AI Agent Task elements, run the command one time for each legacy template ID.

To upgrade all legacy AI Agent elements in a BPMN file:

1. Refresh the local element template cache, so c8ctl uses the newest templates and their recipes:

   ```shell
   c8ctl element-template sync
   ```

2. Preview the upgrade. The `--dry-run` option prints a report and does not change the file:

   ```shell
   c8ctl element-template update io.camunda.connectors.agenticai.aiagent.jobworker.v1 process.bpmn \
     --to io.camunda.connectors.agenticai.ai-agent-subprocess.v2 --dry-run
   ```

   :::note
   Look for moved values (marked `>`) and values that the recipe sets (marked `set by recipe`) in the report. If the report shows neither, your local template cache might not contain the newest template version with the migration recipe. In this case, c8ctl copies only the values with the same key. Run `c8ctl element-template sync`, then run the dry run again.
   :::

3. Read the report for each element. The report shows each added, changed, moved, and dropped value. It also shows the notes of the recipe, for example when the recipe turns on prompt caching. Compare the report with the **With c8ctl** notes in the [model provider configuration mapping](#model-provider-configuration-mapping).
4. Write the upgrade to the file:

   ```shell
   c8ctl element-template update io.camunda.connectors.agenticai.aiagent.jobworker.v1 process.bpmn \
     --to io.camunda.connectors.agenticai.ai-agent-subprocess.v2 --in-place
   ```

   The command upgrades all elements that use the legacy template ID. c8ctl writes the file only if all these elements migrate without data loss. If the report lists dropped values, set them manually after the upgrade, or add the `--allow-lossy` option to accept the loss. Use `--allow-lossy` only after you read the dropped values in the report.

5. If the file also contains elements of the other legacy template, do steps 2 to 4 again. Use that legacy template ID and its new template ID from the table above. For example, use `io.camunda.connectors.agenticai.aiagent.v1` with `--to io.camunda.connectors.agenticai.ai-agent-task.v2`.

An element can use an older version of a legacy template. Then c8ctl first moves it to the newest legacy version, and then to the new template. If c8ctl cannot use the recipe for an element, the report gives the reason. c8ctl then copies only the values with the same key, and the write requires `--allow-lossy`.

Run `c8ctl element-template update --help` to see all options.

#### Update to the newest legacy template version

If you are not ready to move to the new templates, you can keep your elements on the legacy template. You can still update them to its newest version. To do this, run the `update` command without the `--to` option:

```shell
c8ctl element-template update io.camunda.connectors.agenticai.aiagent.jobworker.v1 process.bpmn --dry-run
```

Without an element ID, c8ctl updates each element that uses the legacy template ID. It moves the element to the newest legacy template version that is compatible with the execution platform version of the BPMN file. The elements keep the legacy job type. The report shows that the template is deprecated and lists the new template as the target for a later upgrade. Read the report, then run the command again with `--in-place` to write the file.

### Upgrade manually in Modeler

:::important
The new templates require Desktop Modeler 5.51.0 or later. Earlier versions show them as **Not found**.
:::

To upgrade an element manually, apply the new template and enter its values again:

1. Open the AI Agent Task or AI Agent Sub-process element in [Camunda Hub](/components/hub/workspace/modeler/index.md) or [Desktop Modeler](/components/modeler/desktop-modeler/index.md). Set the process' modeler/execution version to Camunda 8.10 or later. This makes the new element template available to select.
2. Select the element in the diagram. Choose **Change element**, then apply the new **AI Agent Task** or **AI Agent Sub-process** template. Camunda deprecates the legacy template. The template picker offers the new template for that element.
3. Re-enter the model provider configuration with the [mapping tables](#model-provider-configuration-mapping) below. The provider fields require the most migration work.
4. Review the rest of the element's configuration. Tools, memory, limits, response, and error handling are conceptually unchanged, but re-check any values that need to be re-entered after you apply the new template.

### Complete the upgrade

Do these steps after you upgrade with c8ctl or manually:

1. If you upgrade an AI Agent Task, [update its tools ad-hoc sub-process](#ai-agent-task-tools-sub-process). The new AI Agent Task template and c8ctl do not change this sub-process.
2. Deploy the new process definition version to a non-production environment first. Test a representative prompt and tool-call path. Make sure authentication, endpoint, and model behavior are correct before you promote it. See [testing process definitions](/components/best-practices/development/testing-process-definitions.md) for a test approach. The prior version keeps running until you deploy this one. It remains available as a rollback path.
3. Once verified, promote the new version to production through your normal release process.

:::important
Swapping the element template affects only the process definition you redeploy. Already-deployed process definitions and their running process instances keep executing on the legacy job worker. They switch only after you deploy a new version with the new template.
:::

## Other changes in the new templates

### Agent definition

The new templates mark the element as an agent with the `zeebe:agentDefinition` extension element, so Camunda recognizes it as an [agent definition](/components/agentic-orchestration/agent-definitions-and-instances.md). The template writes this element when you apply it, and you don't need to configure it.

### Job type overrides

If you [override the AI Agent job types](./agentic-ai-aiagent-customization.md) with environment variables, for example in a hybrid setup, the legacy variables don't apply to the new job types. The legacy and new job workers are registered separately, so each variable only affects its own job worker. Set the new variables to use your custom type with the new templates:

| Element              | Legacy variable                      | New variable                         |
| :------------------- | :----------------------------------- | :----------------------------------- |
| AI Agent Task        | `CONNECTOR_AI_AGENT_TYPE`            | `CONNECTOR_AI_AGENT_TASK_TYPE`       |
| AI Agent Sub-process | `CONNECTOR_AI_AGENT_JOB_WORKER_TYPE` | `CONNECTOR_AI_AGENT_SUBPROCESS_TYPE` |

The element template must reference the same custom job type. Keep the legacy variables set for as long as process definitions that use the legacy templates are deployed or running.

### AI Agent Task: tools sub-process {#ai-agent-task-tools-sub-process}

The AI Agent Sub-process template configures its own ad-hoc sub-process. The AI Agent Task is a service task that references a separate ad-hoc sub-process containing the tools, and the new AI Agent Task template does not manage that sub-process. After you apply the new template to an AI Agent Task, update the tools sub-process manually:

1. Mark the ad-hoc sub-process as a tool container. Open the **Extension properties** section of the sub-process and add a property named `io.camunda.agenticai.toolContainer` with the value `true`. See [declare a sub-process as agentic](/components/modeler/reference/modeling-guidance/rules/agent-fromai-contract.md#declare-a-sub-process-as-agentic). Without this property, the Modeler's agent tool configuration features, such as linting and autofill, are not available for the sub-process.
2. Add `completedAt: now()` to the **Output element** of the sub-process' multi-instance configuration:

   ```feel
   {
     id: toolCall._meta.id,
     name: toolCall._meta.name,
     content: toolCallResult,
     completedAt: now()
   }
   ```

   The agent uses `completedAt` as the time the tool call completed. If it is missing, the AI Agent connector uses the time at which it processes the tool call results instead, which can be later than the actual completion time for slow or parallel tool calls.

## Update custom extensions {#custom-extensions}

If you extend the AI Agent connector in a Self-Managed or hybrid deployment, for example with a custom conversation store or chat model, the Java APIs also changed in Camunda 8.10. See the [breaking changes for custom extensions](https://github.com/camunda/connectors/blob/main/connectors/agentic-ai/docs/breaking-changes.md).

## Model provider configuration mapping

Model provider configuration changed the most in this redesign, since providers and backends are now decoupled (see [choose a provider and backend](./agentic-ai-aiagent-model-providers.md#choose-a-provider-and-backend)).
The sections below cover only the fields that changed, comparing legacy and new template fields. Any fields not mentioned carry over unchanged under the same field label.
Each section ends with a **With c8ctl** note. The note tells you which values the c8ctl migration recipe sets and which steps you must still do manually.

### Anthropic

**Legacy template Provider**: Anthropic → **New template Provider**: [Anthropic](./agentic-ai-aiagent-model-providers.md#anthropic), **Backend**: Anthropic API.

**Anthropic API key**, **Timeout**, **Model**, **Maximum tokens**, **Temperature**, **top P**, and **top K** carry over unchanged.

If you had a custom **Endpoint** configured in the legacy template:

| Legacy field                                                                 | New template guidance                                                                                                                                                                                                                                                                                                                                                  |
| :--------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Endpoint on Microsoft Foundry (`*.azure.com`, `*.azure.us`, or `*.azure.cn`) | Select **Backend**: [Anthropic](./agentic-ai-aiagent-model-providers.md#anthropic) > Microsoft Foundry (Azure), and enter it as **API endpoint**. Use **API key** authentication with your legacy **Anthropic API key**. Remove a trailing `/anthropic/v1` or `/v1` from the endpoint. The new template adds `/anthropic` if it is missing and appends `/v1/messages`. |
| Any other endpoint                                                           | Select **Backend**: [Anthropic](./agentic-ai-aiagent-model-providers.md#anthropic) > Custom / compatible endpoint, and enter it as **API endpoint**. Remove a trailing `/v1` from the endpoint. The new template appends `/v1/messages`.                                                                                                                               |

The custom or compatible backend also supports **OAuth 2.0 client credentials** for gateways in front of Anthropic that require a bearer token.

The new template additionally exposes **Effort**, **Thinking mode**, and **Enable prompt caching**. None of these have a legacy equivalent.

**With c8ctl**: The recipe selects the backend from the legacy endpoint, as the table shows. It copies the endpoint unchanged, so remove a trailing path segment manually. The recipe also turns on **Enable prompt caching**. **Effort** and **Thinking mode** use the model default.

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

**With c8ctl**: The recipe keeps all elements on the **AWS Bedrock Converse** provider and turns on **Enable prompt caching**. To run Claude models on **Anthropic** with the **AWS Bedrock Mantle** backend, change the provider manually after the upgrade. See [Migrating to Anthropic + AWS Bedrock Mantle](#migrating-to-anthropic--aws-bedrock-mantle).

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

**With c8ctl**: The recipe sets **API** to **Chat Completions**, as in the legacy template. It moves **Maximum tokens** to **Max completion tokens**. To use the **Responses** API, change **API** manually and enter the value in **Max output tokens**.

### OpenAI

**Legacy template Provider**: OpenAI → **New template Provider**: [OpenAI](./agentic-ai-aiagent-model-providers.md#openai), **Backend**: OpenAI API.

**OpenAI API key**, **Organization ID**, **Project ID**, **Timeout**, **Model**, **Temperature**, and **top P** carry over unchanged.

| Legacy field              | New template field                                                                                                    |
| :------------------------ | :-------------------------------------------------------------------------------------------------------------------- |
| Maximum completion tokens | Max completion tokens (if you keep **API**: Chat Completions) or Max output tokens (if you switch **API**: Responses) |

The legacy template always used the Chat Completions API. The new template defaults its **API** field to the newer **Responses** API. Select **Chat Completions** instead if you need closer parity with legacy behavior. The new template additionally exposes the **Effort** reasoning parameter on both API families.

**With c8ctl**: The recipe sets **API** to **Chat Completions**, as in the legacy template. To use the **Responses** API, change **API** manually and enter the value in **Max output tokens**.

### OpenAI-compatible

**Legacy template Provider**: OpenAI-compatible → **New template Provider**: [OpenAI](./agentic-ai-aiagent-model-providers.md#openai), **Backend**: Custom / compatible endpoint.

**API endpoint**, **Headers**, **Query parameters**, **Timeout**, **Model**, **Temperature**, and **top P** carry over unchanged. The legacy **API key** field now sits behind the **Authentication** selector, as described in the notes below.

| Legacy field              | New template field                                                        |
| :------------------------ | :------------------------------------------------------------------------ |
| Maximum completion tokens | Max completion tokens (Chat Completions) or Max output tokens (Responses) |
| Custom parameters         | Body properties                                                           |

:::important
The new template replaces the legacy **API key** field with an **Authentication** selector. Resolve your effective credential as follows before you configure it:

- If your legacy template's **Headers** contained an `Authorization` header, it took precedence over the **API key** field. Carry this behavior forward manually:
  - If the header used `Bearer <token>`, select **API key** and move the token value without the `Bearer` prefix into the **API key** field. Remove the `Authorization` header from **Headers**.
  - For any other scheme, such as `Basic ...`, keep the header in **Headers** and select **None**.
- Otherwise, select **API key** and carry your legacy **API key** value over directly. If you did not configure an `Authorization` header or an API key, select **None**.

The new template additionally supports **OAuth 2.0** client credentials, for a gateway that issues bearer tokens through the client-credentials flow.
:::

Also check the resulting request path. The new template appends `/chat/completions` or `/responses` to **API endpoint** for the selected **API**. This may differ from your legacy endpoint.

**With c8ctl**: The recipe sets **API** to **Chat Completions**. It selects **API key** if the legacy **API key** field has a value, and **None** if not. The recipe does not read an `Authorization` header in **Headers**. If your legacy **Headers** contain an `Authorization` header, apply the rules above manually after the upgrade.

### Google Vertex AI

**Legacy template Provider**: Google Vertex AI → **New template Provider**: [Google Gemini](./agentic-ai-aiagent-model-providers.md#google-gemini), **Backend**: Enterprise Agent Platform (Vertex AI).

The provider itself changes from **Google Vertex AI** to **Google Gemini**. Vertex AI is now the Enterprise Agent Platform backend of the general-purpose Google Gemini provider. A new [Google Gemini API](./agentic-ai-aiagent-model-providers.md#google-gemini) backend is also available if you'd rather not manage a Google Cloud project.

**Project ID**, **Region**, **Authentication** (**Service account credentials** / **Application default credentials**), **Model**, **Temperature**, **top P**, and **top K** carry over unchanged.

| Legacy field          | New template guidance                                                                                                                                                       |
| :-------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Maximum output tokens | Enter the same value as **Maximum tokens**.                                                                                                                                 |
| Endpoint              | Not available in Modeler. There's no custom/compatible endpoint backend for Google Gemini to switch to, unlike Anthropic or OpenAI. c8ctl keeps the value (see note below). |

The new template additionally exposes **Thinking budget**/**Thinking level** for reasoning configuration.

**With c8ctl**: The recipe moves a custom **Endpoint** to a hidden field of the new template. The connector uses this endpoint at runtime, but Modeler does not show it and you cannot edit it there.
