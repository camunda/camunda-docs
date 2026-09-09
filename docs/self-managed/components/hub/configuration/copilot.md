---
id: copilot
title: "Copilot"
description: "Configure Copilot in Camunda Hub with a custom LLM provider."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

<span class="badge badge--alpha">Alpha</span>

Camunda Hub supports using large language models (LLMs) to help users create BPMN diagrams, write FEEL expressions, and build forms. You can configure the default LLM provider for BPMN, FEEL, and form copilots.

Copilot supports the following LLM providers:

| LLM provider     | Configuration value |
| ---------------- | ------------------- |
| Anthropic        | `ANTHROPIC`         |
| AWS Bedrock      | `BEDROCK`           |
| Azure AI         | `AZURE_AI`          |
| Azure OpenAI     | `AZURE_OPENAI`      |
| Google Vertex AI | `VERTEX_AI`         |
| Hugging Face     | `HUGGING_FACE`      |
| Ollama           | `OLLAMA`            |
| OpenAI           | `OPENAI`            |

## Configuration

To enable Copilot, set the AI feature flag (`camunda.hub.feature.ai-enabled` / `CAMUNDA_HUB_FEATURE_AIENABLED`) to `true`.
Then configure the default LLM provider for BPMN, FEEL, and form copilots.
Each provider has its own configuration options described below.

<Tabs groupId="copilot-general" defaultValue="applicationYaml" queryString values={[
{label: 'Application properties', value: 'applicationYaml' },
{label: 'Environment variables', value: 'envVars' },
]}>

<TabItem value="applicationYaml">

| Property                                                | Description                                                    | Example value | Default value |
| ------------------------------------------------------- | -------------------------------------------------------------- | ------------- | ------------- |
| `camunda.hub.feature.ai-enabled`                        | Enables Copilot.                                               | `true`        | `false`       |
| `camunda.hub.copilot.default-bpmn-copilot-llm-provider` | Default provider for BPMN Copilot.                             | `BEDROCK`     | –             |
| `camunda.hub.copilot.default-feel-copilot-llm-provider` | Default provider for FEEL Copilot.                             | `OPENAI`      | –             |
| `camunda.hub.copilot.default-form-copilot-llm-provider` | Default provider for form Copilot.                             | `VERTEX_AI`   | –             |
| `camunda.hub.client.copilot-request-timeout`            | [optional] Overall request timeout for Copilot requests in UI. | `200s`        | `300s`        |

</TabItem>

<TabItem value="envVars">

| Environment variable                                | Description                                                                    | Example value | Default value |
| --------------------------------------------------- | ------------------------------------------------------------------------------ | ------------- | ------------- |
| `CAMUNDA_HUB_FEATURE_AIENABLED`                     | Enables Copilot.                                                               | `true`        | `false`       |
| `CAMUNDA_HUB_COPILOT_DEFAULTBPMNCOPILOTLLMPROVIDER` | Default provider for BPMN Copilot.                                             | `BEDROCK`     | –             |
| `CAMUNDA_HUB_COPILOT_DEFAULTFEELCOPILOTLLMPROVIDER` | Default provider for FEEL Copilot.                                             | `OPENAI`      | –             |
| `CAMUNDA_HUB_COPILOT_DEFAULTFORMCOPILOTLLMPROVIDER` | Default provider for form Copilot.                                             | `VERTEX_AI`   | –             |
| `CAMUNDA_HUB_CLIENT_COPILOTREQUESTTIMEOUT`          | [optional] Overall request timeout in milliseconds for Copilot requests in UI. | `200000`      | `300000`      |

</TabItem>

</Tabs>

### BPMN Copilot

<Tabs groupId="copilot-bpmn" defaultValue="applicationYaml" queryString values={[
{label: 'Application properties', value: 'applicationYaml' },
{label: 'Environment variables', value: 'envVars' },
]}>

<TabItem value="applicationYaml">

| Property                                                                                    | Description                                                               | Example value        | Default value |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | -------------------- | ------------- |
| `camunda.hub.copilot.default-bpmn-copilot-llm-configuration.temperature`                    | [optional] Sampling temperature.                                          | `0.2`                | `0.3`         |
| `camunda.hub.copilot.default-bpmn-copilot-llm-configuration.top-p`                          | [optional] Nucleus sampling probability.                                  | `0.90`               | `0.95`        |
| `camunda.hub.copilot.default-bpmn-copilot-llm-configuration.top-k`                          | [optional] Top-K sampling (if supported by the model).                    | `100`                | `64`          |
| `camunda.hub.copilot.default-bpmn-copilot-llm-configuration.max-tokens`                     | [optional] Maximum new tokens per response.                               | `4096`               | `8192`        |
| `camunda.hub.copilot.default-bpmn-copilot-llm-configuration.timeout`                        | [optional] Overall request timeout.                                       | `45s`                | `60s`         |
| `camunda.hub.copilot.default-bpmn-copilot-llm-configuration.log-requests`                   | [optional] Log raw requests (not recommended in production).              | `true`               | `false`       |
| `camunda.hub.copilot.default-bpmn-copilot-llm-configuration.log-responses`                  | [optional] Log raw responses (not recommended in production).             | `true`               | `false`       |
| `camunda.hub.copilot.default-bpmn-copilot-llm-configuration.connection-acquisition-timeout` | [optional] Connection pool acquisition timeout.                           | `10s`                | `30s`         |
| `camunda.hub.copilot.default-bpmn-copilot-llm-configuration.logit-bias`                     | [optional] JSON object mapping token IDs to bias values (model-specific). | `{"123":-2,"456":3}` | `{}`          |
| `camunda.hub.copilot.default-bpmn-copilot-llm-configuration.max-connections`                | [optional] Maximum HTTP connections.                                      | `300`                | `200`         |
| `camunda.hub.copilot.default-bpmn-copilot-llm-configuration.read-timeout`                   | [optional] Read timeout per request.                                      | `120s`               | `60s`         |

</TabItem>

<TabItem value="envVars">

| Environment Variable                                                                  | Description                                                               | Example Value        | Default Value |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | -------------------- | ------------- |
| `CAMUNDA_HUB_COPILOT_DEFAULTBPMNCOPILOTLLMCONFIGURATION_TEMPERATURE`                  | [optional] Sampling temperature.                                          | `0.2`                | `0.3`         |
| `CAMUNDA_HUB_COPILOT_DEFAULTBPMNCOPILOTLLMCONFIGURATION_TOPP`                         | [optional] Nucleus sampling probability.                                  | `0.90`               | `0.95`        |
| `CAMUNDA_HUB_COPILOT_DEFAULTBPMNCOPILOTLLMCONFIGURATION_TOPK`                         | [optional] Top-K sampling (if supported by the model).                    | `100`                | `64`          |
| `CAMUNDA_HUB_COPILOT_DEFAULTBPMNCOPILOTLLMCONFIGURATION_MAXTOKENS`                    | [optional] Maximum new tokens per responses.                              | `4096`               | `8192`        |
| `CAMUNDA_HUB_COPILOT_DEFAULTBPMNCOPILOTLLMCONFIGURATION_TIMEOUT`                      | [optional] Overall request timeout.                                       | `45s`                | `60s`         |
| `CAMUNDA_HUB_COPILOT_DEFAULTBPMNCOPILOTLLMCONFIGURATION_LOGREQUESTS`                  | [optional] Log raw requests (not recommended in production).              | `true`               | `false`       |
| `CAMUNDA_HUB_COPILOT_DEFAULTBPMNCOPILOTLLMCONFIGURATION_LOGRESPONSES`                 | [optional] Log raw responses (not recommended in production).             | `true`               | `false`       |
| `CAMUNDA_HUB_COPILOT_DEFAULTBPMNCOPILOTLLMCONFIGURATION_CONNECTIONACQUISITIONTIMEOUT` | [optional] Connection pool acquisition timeout.                           | `10s`                | `30s`         |
| `CAMUNDA_HUB_COPILOT_DEFAULTBPMNCOPILOTLLMCONFIGURATION_LOGITBIAS`                    | [optional] JSON object mapping token IDs to bias values (model-specific). | `{"123":-2,"456":3}` | `{}`          |
| `CAMUNDA_HUB_COPILOT_DEFAULTBPMNCOPILOTLLMCONFIGURATION_MAXCONNECTIONS`               | [optional] Maximum HTTP connections.                                      | `300`                | `200`         |
| `CAMUNDA_HUB_COPILOT_DEFAULTBPMNCOPILOTLLMCONFIGURATION_READTIMEOUT`                  | [optional] Read timeout per request.                                      | `120s`               | `60s`         |

</TabItem>

</Tabs>

### FEEL Copilot

<Tabs groupId="copilot-feel" defaultValue="applicationYaml" queryString values={[
{label: 'Application properties', value: 'applicationYaml' },
{label: 'Environment variables', value: 'envVars' },
]}>

<TabItem value="applicationYaml">

| Property                                                                                    | Description                                                               | Example value        | Default value |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | -------------------- | ------------- |
| `camunda.hub.copilot.default-feel-copilot-llm-configuration.temperature`                    | [optional] Sampling temperature.                                          | `0.2`                | `0.3`         |
| `camunda.hub.copilot.default-feel-copilot-llm-configuration.top-p`                          | [optional] Nucleus sampling probability.                                  | `0.90`               | `0.95`        |
| `camunda.hub.copilot.default-feel-copilot-llm-configuration.top-k`                          | [optional] Top-K sampling (if supported by the model).                    | `100`                | `64`          |
| `camunda.hub.copilot.default-feel-copilot-llm-configuration.max-tokens`                     | [optional] Maximum new tokens per response.                               | `4096`               | `8192`        |
| `camunda.hub.copilot.default-feel-copilot-llm-configuration.timeout`                        | [optional] Overall request timeout.                                       | `45s`                | `60s`         |
| `camunda.hub.copilot.default-feel-copilot-llm-configuration.log-requests`                   | [optional] Log raw requests (not recommended in production).              | `true`               | `false`       |
| `camunda.hub.copilot.default-feel-copilot-llm-configuration.log-responses`                  | [optional] Log raw responses (not recommended in production).             | `true`               | `false`       |
| `camunda.hub.copilot.default-feel-copilot-llm-configuration.connection-acquisition-timeout` | [optional] Connection pool acquisition timeout.                           | `10s`                | `30s`         |
| `camunda.hub.copilot.default-feel-copilot-llm-configuration.logit-bias`                     | [optional] JSON object mapping token IDs to bias values (model-specific). | `{"123":-2,"456":3}` | `{}`          |
| `camunda.hub.copilot.default-feel-copilot-llm-configuration.max-connections`                | [optional] Maximum HTTP connections.                                      | `300`                | `200`         |
| `camunda.hub.copilot.default-feel-copilot-llm-configuration.read-timeout`                   | [optional] Read timeout per request.                                      | `120s`               | `60s`         |

</TabItem>

<TabItem value="envVars">

| Environment variable                                                                  | Description                                                               | Example value        | Default value |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | -------------------- | ------------- |
| `CAMUNDA_HUB_COPILOT_DEFAULTFEELCOPILOTLLMCONFIGURATION_TEMPERATURE`                  | [optional] Sampling temperature.                                          | `0.2`                | `0.3`         |
| `CAMUNDA_HUB_COPILOT_DEFAULTFEELCOPILOTLLMCONFIGURATION_TOPP`                         | [optional] Nucleus sampling probability.                                  | `0.90`               | `0.95`        |
| `CAMUNDA_HUB_COPILOT_DEFAULTFEELCOPILOTLLMCONFIGURATION_TOPK`                         | [optional] Top-K sampling (if supported by the model).                    | `100`                | `64`          |
| `CAMUNDA_HUB_COPILOT_DEFAULTFEELCOPILOTLLMCONFIGURATION_MAXTOKENS`                    | [optional] Maximum new tokens per response.                               | `4096`               | `8192`        |
| `CAMUNDA_HUB_COPILOT_DEFAULTFEELCOPILOTLLMCONFIGURATION_TIMEOUT`                      | [optional] Overall request timeout.                                       | `45s`                | `60s`         |
| `CAMUNDA_HUB_COPILOT_DEFAULTFEELCOPILOTLLMCONFIGURATION_LOGREQUESTS`                  | [optional] Log raw requests (not recommended in production).              | `true`               | `false`       |
| `CAMUNDA_HUB_COPILOT_DEFAULTFEELCOPILOTLLMCONFIGURATION_LOGRESPONSES`                 | [optional] Log raw responses (not recommended in production).             | `true`               | `false`       |
| `CAMUNDA_HUB_COPILOT_DEFAULTFEELCOPILOTLLMCONFIGURATION_CONNECTIONACQUISITIONTIMEOUT` | [optional] Connection pool acquisition timeout.                           | `10s`                | `30s`         |
| `CAMUNDA_HUB_COPILOT_DEFAULTFEELCOPILOTLLMCONFIGURATION_LOGITBIAS`                    | [optional] JSON object mapping token IDs to bias values (model-specific). | `{"123":-2,"456":3}` | `{}`          |
| `CAMUNDA_HUB_COPILOT_DEFAULTFEELCOPILOTLLMCONFIGURATION_MAXCONNECTIONS`               | [optional] Maximum HTTP connections.                                      | `300`                | `200`         |
| `CAMUNDA_HUB_COPILOT_DEFAULTFEELCOPILOTLLMCONFIGURATION_READTIMEOUT`                  | [optional] Read timeout per request.                                      | `120s`               | `60s`         |

</TabItem>

</Tabs>

### Form Copilot

<Tabs groupId="copilot-form" defaultValue="applicationYaml" queryString values={[
{label: 'Application properties', value: 'applicationYaml' },
{label: 'Environment variables', value: 'envVars' },
]}>

<TabItem value="applicationYaml">

| Property                                                                                    | Description                                                               | Example value        | Default value |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | -------------------- | ------------- |
| `camunda.hub.copilot.default-form-copilot-llm-configuration.temperature`                    | [optional] Sampling temperature.                                          | `0.2`                | `0.3`         |
| `camunda.hub.copilot.default-form-copilot-llm-configuration.top-p`                          | [optional] Nucleus sampling probability.                                  | `0.90`               | `0.95`        |
| `camunda.hub.copilot.default-form-copilot-llm-configuration.top-k`                          | [optional] Top-K sampling (if supported by the model).                    | `100`                | `64`          |
| `camunda.hub.copilot.default-form-copilot-llm-configuration.max-tokens`                     | [optional] Maximum new tokens per response.                               | `4096`               | `8192`        |
| `camunda.hub.copilot.default-form-copilot-llm-configuration.timeout`                        | [optional] Overall request timeout.                                       | `45s`                | `60s`         |
| `camunda.hub.copilot.default-form-copilot-llm-configuration.log-requests`                   | [optional] Log raw requests (not recommended in production).              | `true`               | `false`       |
| `camunda.hub.copilot.default-form-copilot-llm-configuration.log-responses`                  | [optional] Log raw responses (not recommended in production).             | `true`               | `false`       |
| `camunda.hub.copilot.default-form-copilot-llm-configuration.connection-acquisition-timeout` | [optional] Connection pool acquisition timeout.                           | `10s`                | `30s`         |
| `camunda.hub.copilot.default-form-copilot-llm-configuration.logit-bias`                     | [optional] JSON object mapping token IDs to bias values (model-specific). | `{"123":-2,"456":3}` | `{}`          |
| `camunda.hub.copilot.default-form-copilot-llm-configuration.max-connections`                | [optional] Maximum HTTP connections.                                      | `300`                | `200`         |
| `camunda.hub.copilot.default-form-copilot-llm-configuration.read-timeout`                   | [optional] Read timeout per request.                                      | `120s`               | `60s`         |

</TabItem>

<TabItem value="envVars">

| Environment variable                                                                  | Description                                                               | Example value        | Default value |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | -------------------- | ------------- |
| `CAMUNDA_HUB_COPILOT_DEFAULTFORMCOPILOTLLMCONFIGURATION_TEMPERATURE`                  | [optional] Sampling temperature.                                          | `0.2`                | `0.3`         |
| `CAMUNDA_HUB_COPILOT_DEFAULTFORMCOPILOTLLMCONFIGURATION_TOPP`                         | [optional] Nucleus sampling probability.                                  | `0.90`               | `0.95`        |
| `CAMUNDA_HUB_COPILOT_DEFAULTFORMCOPILOTLLMCONFIGURATION_TOPK`                         | [optional] Top-K sampling (if supported by the model).                    | `100`                | `64`          |
| `CAMUNDA_HUB_COPILOT_DEFAULTFORMCOPILOTLLMCONFIGURATION_MAXTOKENS`                    | [optional] Maximum new tokens per response.                               | `4096`               | `8192`        |
| `CAMUNDA_HUB_COPILOT_DEFAULTFORMCOPILOTLLMCONFIGURATION_TIMEOUT`                      | [optional] Overall request timeout.                                       | `45s`                | `60s`         |
| `CAMUNDA_HUB_COPILOT_DEFAULTFORMCOPILOTLLMCONFIGURATION_LOGREQUESTS`                  | [optional] Log raw requests (not recommended in production).              | `true`               | `false`       |
| `CAMUNDA_HUB_COPILOT_DEFAULTFORMCOPILOTLLMCONFIGURATION_LOGRESPONSES`                 | [optional] Log raw responses (not recommended in production).             | `true`               | `false`       |
| `CAMUNDA_HUB_COPILOT_DEFAULTFORMCOPILOTLLMCONFIGURATION_CONNECTIONACQUISITIONTIMEOUT` | [optional] Connection pool acquisition timeout.                           | `10s`                | `30s`         |
| `CAMUNDA_HUB_COPILOT_DEFAULTFORMCOPILOTLLMCONFIGURATION_LOGITBIAS`                    | [optional] JSON object mapping token IDs to bias values (model-specific). | `{"123":-2,"456":3}` | `{}`          |
| `CAMUNDA_HUB_COPILOT_DEFAULTFORMCOPILOTLLMCONFIGURATION_MAXCONNECTIONS`               | [optional] Maximum HTTP connections.                                      | `300`                | `200`         |
| `CAMUNDA_HUB_COPILOT_DEFAULTFORMCOPILOTLLMCONFIGURATION_READTIMEOUT`                  | [optional] Read timeout per request.                                      | `120s`               | `60s`         |

</TabItem>

</Tabs>

### AWS Bedrock

:::warning
When configuring AWS Bedrock, make sure the model is available in the provided AWS region.
:::

<Tabs groupId="copilot-aws" defaultValue="applicationYaml" queryString values={[
{label: 'Application properties', value: 'applicationYaml' },
{label: 'Environment variables', value: 'envVars' },
]}>

<TabItem value="applicationYaml">

| Property                                                  | Description                                                                    | Example value                               |
| --------------------------------------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------- |
| `camunda.hub.copilot.providers.bedrock.default-model-id`  | Default model ID for AWS Bedrock provider.                                     | `anthropic.claude-3-5-sonnet-20240620-v1:0` |
| `camunda.hub.copilot.providers.bedrock.region`            | AWS region for Bedrock.                                                        | `us-east-1`                                 |
| `camunda.hub.copilot.providers.bedrock.access-key-id`     | AWS access key ID for Bedrock (if not using instance or role credentials).     | `AKIA...`                                   |
| `camunda.hub.copilot.providers.bedrock.secret-access-key` | AWS secret access key for Bedrock (if not using instance or role credentials). | `wJalrXUtnFEMI/K7MDENG/bPxRfiCY...`         |

</TabItem>

<TabItem value="envVars">

| Environment Variable                                    | Description                                                                    | Example Value                               |
| ------------------------------------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------- |
| `CAMUNDA_HUB_COPILOT_PROVIDERS_BEDROCK_DEFAULTMODELID`  | Default model ID for AWS Bedrock provider.                                     | `anthropic.claude-3-5-sonnet-20240620-v1:0` |
| `CAMUNDA_HUB_COPILOT_PROVIDERS_BEDROCK_REGION`          | AWS region for Bedrock.                                                        | `us-east-1`                                 |
| `CAMUNDA_HUB_COPILOT_PROVIDERS_BEDROCK_ACCESSKEYID`     | AWS access key ID for Bedrock (if not using instance or role credentials).     | `AKIA...`                                   |
| `CAMUNDA_HUB_COPILOT_PROVIDERS_BEDROCK_SECRETACCESSKEY` | AWS secret access key for Bedrock (if not using instance or role credentials). | `wJalrXUtnFEMI/K7MDENG/bPxRfiCY...`         |

</TabItem>

</Tabs>

### OpenAI

:::note
This configuration applies to OpenAI and OpenAI-compatible providers.
:::

Provide exactly one of the following:

- An API key for OpenAI's public API (no custom endpoint needed).
- A custom endpoint for OpenAI-compatible providers or proxies.

For OpenAI-compatible providers, you can authenticate with:

- A bearer token.
- Username and password (Basic authentication).
- Custom authentication headers.

When using the Bring your own model option in Self-Managed, results may vary depending on your chosen LLM's capabilities.

If a weaker or smaller model is used, it may fail to generate a valid BPMN XML. In such cases, the Copilot library attempts automatic repair up to three times. If those attempts fail, the system will return an empty XML and an optional chat message instead of a model.

:::tip
Camunda recommends using a stronger model, such as GPT-4 or comparable, for reliable BPMN generation.
:::

<Tabs groupId="copilot-openai" defaultValue="applicationYaml" queryString values={[
{label: 'Application properties', value: 'applicationYaml' },
{label: 'Environment variables', value: 'envVars' },
]}>

<TabItem value="applicationYaml">

| Property                                                 | Description                                                                                   | Example value                        |
| -------------------------------------------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------ |
| `camunda.hub.copilot.providers.open-ai.default-model-id` | Default model ID for OpenAI provider.                                                         | `gpt-4.1`                            |
| `camunda.hub.copilot.providers.open-ai.api-key`          | [conditionally required] API key for OpenAI public API.                                       | `sk-live-********`                   |
| `camunda.hub.copilot.providers.open-ai.endpoint`         | [conditionally required] Custom endpoint for OpenAI-compatible APIs (proxies or self-hosted). | `https://my-proxy.example.com/v1`    |
| `camunda.hub.copilot.providers.open-ai.bearer`           | [optional] Bearer token header to use instead of `api-key` with compatible gateways.          | `my-shared-bearer-token`             |
| `camunda.hub.copilot.providers.open-ai.username`         | [optional] Username to authenticate with an OpenAI-compatible gateway.                        | `api_user`                           |
| `camunda.hub.copilot.providers.open-ai.password`         | [optional] Password to authenticate with an OpenAI-compatible gateway.                        | `s3cr3t`                             |
| `camunda.hub.copilot.providers.open-ai.headers`          | [optional] Extra HTTP headers as a JSON map (string).                                         | `{"X-Org":"camunda","X-Trace":"on"}` |

</TabItem>

<TabItem value="envVars">

| Environment variable                                  | Description                                                                                   | Example value                        |
| ----------------------------------------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------ |
| `CAMUNDA_HUB_COPILOT_PROVIDERS_OPENAI_DEFAULTMODELID` | Default model ID for OpenAI provider.                                                         | `gpt-4.1`                            |
| `CAMUNDA_HUB_COPILOT_PROVIDERS_OPENAI_APIKEY`         | [conditionally required] API key for OpenAI public API.                                       | `sk-live-********`                   |
| `CAMUNDA_HUB_COPILOT_PROVIDERS_OPENAI_ENDPOINT`       | [conditionally required] Custom endpoint for OpenAI-compatible APIs (proxies or self-hosted). | `https://my-proxy.example.com/v1`    |
| `CAMUNDA_HUB_COPILOT_PROVIDERS_OPENAI_BEARER`         | [optional] Bearer token header to use instead of `api-key` with compatible gateways.          | `my-shared-bearer-token`             |
| `CAMUNDA_HUB_COPILOT_PROVIDERS_OPENAI_USERNAME`       | [optional] Username to authenticate with an OpenAI-compatible gateway.                        | `api_user`                           |
| `CAMUNDA_HUB_COPILOT_PROVIDERS_OPENAI_PASSWORD`       | [optional] Password to authenticate with an OpenAI-compatible gateway.                        | `s3cr3t`                             |
| `CAMUNDA_HUB_COPILOT_PROVIDERS_OPENAI_HEADERS`        | [optional] Extra HTTP headers as a JSON map (string).                                         | `{"X-Org":"camunda","X-Trace":"on"}` |

</TabItem>

</Tabs>

### Azure OpenAI

<Tabs groupId="copilot-azure-openai" defaultValue="applicationYaml" queryString values={[
{label: 'Application properties', value: 'applicationYaml' },
{label: 'Environment variables', value: 'envVars' },
]}>

<TabItem value="applicationYaml">

| Property                                                       | Description                                       | Example value                      |
| -------------------------------------------------------------- | ------------------------------------------------- | ---------------------------------- |
| `camunda.hub.copilot.providers.azure-open-ai.default-model-id` | Default model (deployment name) for Azure OpenAI. | `gpt-4o`                           |
| `camunda.hub.copilot.providers.azure-open-ai.api-key`          | Azure OpenAI API key.                             | `az-aoai-key-***`                  |
| `camunda.hub.copilot.providers.azure-open-ai.endpoint`         | Azure OpenAI endpoint.                            | `https://my-aoai.openai.azure.com` |

</TabItem>

<TabItem value="envVars">

| Environment variable                                       | Description                                       | Example value                      |
| ---------------------------------------------------------- | ------------------------------------------------- | ---------------------------------- |
| `CAMUNDA_HUB_COPILOT_PROVIDERS_AZUREOPENAI_DEFAULTMODELID` | Default model (deployment name) for Azure OpenAI. | `gpt-4o`                           |
| `CAMUNDA_HUB_COPILOT_PROVIDERS_AZUREOPENAI_APIKEY`         | Azure OpenAI API key.                             | `az-aoai-key-**\*\*\*\***`         |
| `CAMUNDA_HUB_COPILOT_PROVIDERS_AZUREOPENAI_ENDPOINT`       | Azure OpenAI endpoint.                            | `https://my-aoai.openai.azure.com` |

</TabItem>

</Tabs>

### Azure AI

:::note
Azure AI supports authentication with an API key or Microsoft Entra ID (formerly Azure AD) using the OAuth 2.0 client credentials flow.
:::

<Tabs groupId="copilot-azure-ai" defaultValue="applicationYaml" queryString values={[
{label: 'Application properties', value: 'applicationYaml' },
{label: 'Environment variables', value: 'envVars' },
]}>

<TabItem value="applicationYaml">

| Property                                                  | Description                                                                        | Example value                                                                     |
| --------------------------------------------------------- | ---------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `camunda.hub.copilot.providers.azure-ai.default-model-id` | Default model for Azure AI (Inference).                                            | `gpt-4o-mini`                                                                     |
| `camunda.hub.copilot.providers.azure-ai.endpoint`         | Endpoint for Azure AI (Inference). Use the endpoint from `Azure AI Inference SDK`. | `https://********-resource.cognitiveservices.azure.com/openai/deployments/gpt-4o` |
| `camunda.hub.copilot.providers.azure-ai.api-key`          | [conditionally required] API key for Azure AI (alternative to OAuth credentials).  | `az-ai-key-***`                                                                   |
| `camunda.hub.copilot.providers.azure-ai.client-id`        | [conditionally required] Azure AI OAuth client ID.                                 | `00000000-0000-0000-0000-000000000000`                                            |
| `camunda.hub.copilot.providers.azure-ai.client-secret`    | [conditionally required] Azure AI OAuth client secret.                             | `***`                                                                             |
| `camunda.hub.copilot.providers.azure-ai.tenant-id`        | [conditionally required] Azure AD tenant ID for OAuth.                             | `11111111-2222-3333-4444-555555555555`                                            |
| `camunda.hub.copilot.providers.azure-ai.authority-host`   | [conditionally required] Authority host for Azure OAuth.                           | `https://login.microsoftonline.com`                                               |

</TabItem>

<TabItem value="envVars">

| Environment variable                                   | Description                                                                        | Example value                                                                     |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `CAMUNDA_HUB_COPILOT_PROVIDERS_AZUREAI_DEFAULTMODELID` | Default model for Azure AI (Inference).                                            | `gpt-4o-mini`                                                                     |
| `CAMUNDA_HUB_COPILOT_PROVIDERS_AZUREAI_ENDPOINT`       | Endpoint for Azure AI (Inference). Use the endpoint from `Azure AI Inference SDK`. | `https://********-resource.cognitiveservices.azure.com/openai/deployments/gpt-4o` |
| `CAMUNDA_HUB_COPILOT_PROVIDERS_AZUREAI_APIKEY`         | [conditionally required] API key for Azure AI (alternative to OAuth credentials).  | `az-ai-key-**\*\*\*\***`                                                          |
| `CAMUNDA_HUB_COPILOT_PROVIDERS_AZUREAI_CLIENTID`       | [conditionally required] Azure AI OAuth client ID.                                 | `00000000-0000-0000-0000-000000000000`                                            |
| `CAMUNDA_HUB_COPILOT_PROVIDERS_AZUREAI_CLIENTSECRET`   | [conditionally required] Azure AI OAuth client secret.                             | `**\*\*\*\***`                                                                    |
| `CAMUNDA_HUB_COPILOT_PROVIDERS_AZUREAI_TENANTID`       | [conditionally required] Azure AD tenant ID for OAuth.                             | `11111111-2222-3333-4444-555555555555`                                            |
| `CAMUNDA_HUB_COPILOT_PROVIDERS_AZUREAI_AUTHORITYHOST`  | [conditionally required] Authority host for Azure OAuth.                           | `https://login.microsoftonline.com`                                               |

</TabItem>

</Tabs>

### Google Vertex AI

<Tabs groupId="copilot-vertex" defaultValue="applicationYaml" queryString values={[
{label: 'Application properties', value: 'applicationYaml' },
{label: 'Environment variables', value: 'envVars' },
]}>

<TabItem value="applicationYaml">

| Property                                                   | Description                                     | Example value                                                                                |
| ---------------------------------------------------------- | ----------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `camunda.hub.copilot.providers.vertex-ai.default-model-id` | Default model ID for Google Vertex AI (Gemini). | `gemini-1.5-pro-002`                                                                         |
| `camunda.hub.copilot.providers.vertex-ai.project-id`       | GCP project ID for Vertex AI.                   | `my-gcp-project`                                                                             |
| `camunda.hub.copilot.providers.vertex-ai.location`         | Vertex AI location or region.                   | `us-central1`                                                                                |
| `camunda.hub.copilot.providers.vertex-ai.credentials-json` | Vertex AI service account JSON (string).        | `{"type":"service_account","project_id":"my-proj","client_email":"...","private_key":"..."}` |

</TabItem>

<TabItem value="envVars">

| Environment variable                                     | Description                                     | Example value                                                                                |
| -------------------------------------------------------- | ----------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `CAMUNDA_HUB_COPILOT_PROVIDERS_VERTEXAI_DEFAULTMODELID`  | Default model ID for Google Vertex AI (Gemini). | `gemini-1.5-pro-002`                                                                         |
| `CAMUNDA_HUB_COPILOT_PROVIDERS_VERTEXAI_PROJECTID`       | GCP project ID for Vertex AI.                   | `my-gcp-project`                                                                             |
| `CAMUNDA_HUB_COPILOT_PROVIDERS_VERTEXAI_LOCATION`        | Vertex AI location or region.                   | `us-central1`                                                                                |
| `CAMUNDA_HUB_COPILOT_PROVIDERS_VERTEXAI_CREDENTIALSJSON` | Vertex AI service account JSON (string).        | `{"type":"service_account","project_id":"my-proj","client_email":"...","private_key":"..."}` |

</TabItem>

</Tabs>

### Anthropic

<Tabs groupId="copilot-anthropic" defaultValue="applicationYaml" queryString values={[
{label: 'Application properties', value: 'applicationYaml' },
{label: 'Environment variables', value: 'envVars' },
]}>

<TabItem value="applicationYaml">

| Property                                                        | Description                                                              | Example value                | Default value |
| --------------------------------------------------------------- | ------------------------------------------------------------------------ | ---------------------------- | ------------- |
| `camunda.hub.copilot.providers.anthropic.default-model-id`      | Default model ID for Anthropic.                                          | `claude-3-5-sonnet-20240620` | -             |
| `camunda.hub.copilot.providers.anthropic.api-key`               | Anthropic API key.                                                       | `sk-ant-***`                 | -             |
| `camunda.hub.copilot.providers.anthropic.cache-system-messages` | [optional] Enable client-side caching of system messages (if supported). | `false`                      | `true`        |
| `camunda.hub.copilot.providers.anthropic.cache-tools`           | [optional] Enable client-side caching of tool schemas (if supported).    | `false`                      | `true`        |

</TabItem>

<TabItem value="envVars">

| Environment variable                                          | Description                                                              | Example value                | Default value |
| ------------------------------------------------------------- | ------------------------------------------------------------------------ | ---------------------------- | ------------- |
| `CAMUNDA_HUB_COPILOT_PROVIDERS_ANTHROPIC_DEFAULTMODELID`      | Default model ID for Anthropic.                                          | `claude-3-5-sonnet-20240620` | -             |
| `CAMUNDA_HUB_COPILOT_PROVIDERS_ANTHROPIC_APIKEY`              | Anthropic API key.                                                       | `sk-ant-**\*\*\*\***`        | -             |
| `CAMUNDA_HUB_COPILOT_PROVIDERS_ANTHROPIC_CACHESYSTEMMESSAGES` | [optional] Enable client-side caching of system messages (if supported). | `false`                      | `true`        |
| `CAMUNDA_HUB_COPILOT_PROVIDERS_ANTHROPIC_CACHETOOLS`          | [optional] Enable client-side caching of tool schemas (if supported).    | `false`                      | `true`        |

</TabItem>

</Tabs>

### Ollama

<Tabs groupId="copilot-ollama" defaultValue="applicationYaml" queryString values={[
{label: 'Application properties', value: 'applicationYaml' },
{label: 'Environment variables', value: 'envVars' },
]}>

<TabItem value="applicationYaml">

| Property                                                | Description                                                   | Example value                        |
| ------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------ |
| `camunda.hub.copilot.providers.ollama.default-model-id` | Default model ID for Ollama.                                  | `llama3.1`                           |
| `camunda.hub.copilot.providers.ollama.base-url`         | Ollama server base URL.                                       | `http://localhost:11434`             |
| `camunda.hub.copilot.providers.ollama.headers`          | [optional] Extra HTTP headers to send as a JSON map (string). | `{"X-Org":"camunda","X-Trace":"on"}` |

</TabItem>

<TabItem value="envVars">

| Environment variable                                  | Description                                                   | Example value                        |
| ----------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------ |
| `CAMUNDA_HUB_COPILOT_PROVIDERS_OLLAMA_DEFAULTMODELID` | Default model ID for Ollama.                                  | `llama3.1`                           |
| `CAMUNDA_HUB_COPILOT_PROVIDERS_OLLAMA_BASEURL`        | Ollama server base URL.                                       | `http://localhost:11434`             |
| `CAMUNDA_HUB_COPILOT_PROVIDERS_OLLAMA_HEADERS`        | [optional] Extra HTTP headers to send as a JSON map (string). | `{"X-Org":"camunda","X-Trace":"on"}` |

</TabItem>

</Tabs>

### Hugging Face

<Tabs groupId="copilot-huggingface" defaultValue="applicationYaml" queryString values={[
{label: 'Application properties', value: 'applicationYaml' },
{label: 'Environment variables', value: 'envVars' },
]}>

<TabItem value="applicationYaml">

| Property                                                      | Description                                                              | Example value                                 | Default value |
| ------------------------------------------------------------- | ------------------------------------------------------------------------ | --------------------------------------------- | ------------- |
| `camunda.hub.copilot.providers.hugging-face.default-model-id` | Default model ID for Hugging Face Inference.                             | `mistralai/Mixtral-8x7B-Instruct-v0.1`        | -             |
| `camunda.hub.copilot.providers.hugging-face.base-url`         | Base URL for Hugging Face Inference endpoint (if self-hosted or custom). | `https://api-inference.huggingface.co/models` | -             |
| `camunda.hub.copilot.providers.hugging-face.access-token`     | Access token for Hugging Face.                                           | `hf_***`                                      | -             |
| `camunda.hub.copilot.providers.hugging-face.wait-for-model`   | [optional] Wait for model to warm up before responding.                  | `false`                                       | `true`        |
| `camunda.hub.copilot.providers.hugging-face.return-full-text` | [optional] Return the full generated text (not just the completion).     | `true`                                        | `true`        |

</TabItem>

<TabItem value="envVars">

| Environment variable                                       | Description                                                              | Example value                                 | Default value |
| ---------------------------------------------------------- | ------------------------------------------------------------------------ | --------------------------------------------- | ------------- |
| `CAMUNDA_HUB_COPILOT_PROVIDERS_HUGGINGFACE_DEFAULTMODELID` | Default model ID for Hugging Face Inference.                             | `mistralai/Mixtral-8x7B-Instruct-v0.1`        | -             |
| `CAMUNDA_HUB_COPILOT_PROVIDERS_HUGGINGFACE_BASEURL`        | Base URL for Hugging Face Inference endpoint (if self-hosted or custom). | `https://api-inference.huggingface.co/models` | -             |
| `CAMUNDA_HUB_COPILOT_PROVIDERS_HUGGINGFACE_ACCESSTOKEN`    | Access token for Hugging Face.                                           | `hf\_**\*\*\*\***`                            | -             |
| `CAMUNDA_HUB_COPILOT_PROVIDERS_HUGGINGFACE_WAITFORMODEL`   | [optional] Wait for model to warm up before responding.                  | `false`                                       | `true`        |
| `CAMUNDA_HUB_COPILOT_PROVIDERS_HUGGINGFACE_RETURNFULLTEXT` | [optional] Return the full generated text (not just the completion).     | `true`                                        | `true`        |

</TabItem>

</Tabs>
