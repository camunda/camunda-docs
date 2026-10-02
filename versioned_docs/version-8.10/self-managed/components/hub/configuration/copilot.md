---
id: copilot
title: "Copilot"
description: "Configure Copilot in Web Modeler with a custom LLM provider."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

<span class="badge badge--alpha">Alpha</span>

Web Modeler supports using large language models (LLMs) to help users create BPMN diagrams, write FEEL expressions, and build forms. You can configure the default LLM provider for BPMN, FEEL, and form copilots.

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

To enable Copilot, set the AI feature flag (`FEATURE_AI_ENABLED` / `camunda.modeler.feature.ai-enabled`) to `true`.
Then configure the default LLM provider for BPMN, FEEL, and form copilots.
Each provider has its own configuration options described below.

<Tabs groupId="copilot-general" defaultValue="envVars" queryString values={[
{label: 'Environment variables', value: 'envVars' },
{label: 'application.yml', value: 'applicationYaml' },
]}>

<TabItem value="envVars">

| Environment variable                        | Description                                                                    | Example value | Default value |
| ------------------------------------------- | ------------------------------------------------------------------------------ | ------------- | ------------- |
| `FEATURE_AI_ENABLED`                        | Enables Copilot.                                                               | `true`        | `false`       |
| `RESTAPI_BPMN_COPILOT_DEFAULT_LLM_PROVIDER` | Default provider for BPMN Copilot.                                             | `BEDROCK`     | –             |
| `RESTAPI_FEEL_COPILOT_DEFAULT_LLM_PROVIDER` | Default provider for FEEL Copilot.                                             | `OPENAI`      | –             |
| `RESTAPI_FORM_COPILOT_DEFAULT_LLM_PROVIDER` | Default provider for form Copilot.                                             | `VERTEX_AI`   | –             |
| `RESTAPI_COPILOT_REQUEST_TIMEOUT`           | [optional] Overall request timeout in milliseconds for Copilot requests in UI. | `200000`      | `300000`      |

</TabItem>

<TabItem value="applicationYaml">

```yaml
camunda.modeler:
  feature.ai-enabled: true

  copilot:
    default-bpmn-copilot-llm-provider: BEDROCK
    default-feel-copilot-llm-provider: OPENAI
    default-form-copilot-llm-provider: VERTEX_AI
  client.copilot-request-timeout: 200s # optional, default: 300s
```

</TabItem>

</Tabs>

### BPMN Copilot

<Tabs groupId="copilot-bpmn" defaultValue="envVars" queryString values={[
{label: 'Environment variables', value: 'envVars' },
{label: 'application.yml', value: 'applicationYaml' },
]}>

<TabItem value="envVars">

| Environment Variable                                  | Description                                                               | Example Value        | Default Value |
| ----------------------------------------------------- | ------------------------------------------------------------------------- | -------------------- | ------------- |
| `RESTAPI_BPMN_COPILOT_TEMPERATURE`                    | [optional] Sampling temperature.                                          | `0.2`                | `0.3`         |
| `RESTAPI_BPMN_COPILOT_TOP_P`                          | [optional] Nucleus sampling probability.                                  | `0.90`               | `0.95`        |
| `RESTAPI_BPMN_COPILOT_TOP_K`                          | [optional] Top-K sampling (if supported by the model).                    | `100`                | `64`          |
| `RESTAPI_BPMN_COPILOT_MAX_TOKENS`                     | [optional] Maximum new tokens per responses.                              | `4096`               | `8192`        |
| `RESTAPI_BPMN_COPILOT_TIMEOUT`                        | [optional] Overall request timeout.                                       | `45s`                | `60s`         |
| `RESTAPI_BPMN_COPILOT_LOG_REQUEST`                    | [optional] Log raw requests (not recommended in production).              | `true`               | `false`       |
| `RESTAPI_BPMN_COPILOT_LOG_RESPONSE`                   | [optional] Log raw responses (not recommended in production).             | `true`               | `false`       |
| `RESTAPI_BPMN_COPILOT_CONNECTION_ACQUISITION_TIMEOUT` | [optional] Connection pool acquisition timeout.                           | `10s`                | `30s`         |
| `RESTAPI_BPMN_COPILOT_LOGIT_BIAS`                     | [optional] JSON object mapping token IDs to bias values (model-specific). | `{"123":-2,"456":3}` | `{}`          |
| `RESTAPI_BPMN_COPILOT_MAX_CONNECTIONS`                | [optional] Maximum HTTP connections.                                      | `300`                | `200`         |
| `RESTAPI_BPMN_COPILOT_READ_TIMEOUT`                   | [optional] Read timeout per request.                                      | `120s`               | `60s`         |

</TabItem>

<TabItem value="applicationYaml">

```yaml
camunda.modeler.default-bpmn-copilot-llm-configuration:
  temperature: 0.2 # optional, default: 0.3
  top-p: 0.90 # optional, default: 0.95
  top-k: 100 # optional, default: 64
  max-tokens: 4096 # optional, default: 8192
  timeout: 45s # optional, default: 60s
  log-request: true # optional, default: false
  log-response: true # optional, default: false
  connection-acquisition-timeout: 10s # optional, default: 30s
  logit-bias: '{"123":-2,"456":3}' # optional, default: {}
  max-connections: 300 # optional, default: 200
  read-timeout: 120s # optional, default: 60s
```

</TabItem>

</Tabs>

### FEEL Copilot

<Tabs groupId="copilot-feel" defaultValue="envVars" queryString values={[
{label: 'Environment variables', value: 'envVars' },
{label: 'application.yml', value: 'applicationYaml' },
]}>

<TabItem value="envVars">

| Environment variable                                  | Description                                                               | Example value        | Default value |
| ----------------------------------------------------- | ------------------------------------------------------------------------- | -------------------- | ------------- |
| `RESTAPI_FEEL_COPILOT_TEMPERATURE`                    | [optional] Sampling temperature.                                          | `0.2`                | `0.3`         |
| `RESTAPI_FEEL_COPILOT_TOP_P`                          | [optional] Nucleus sampling probability.                                  | `0.90`               | `0.95`        |
| `RESTAPI_FEEL_COPILOT_TOP_K`                          | [optional] Top-K sampling (if supported by the model).                    | `100`                | `64`          |
| `RESTAPI_FEEL_COPILOT_MAX_TOKENS`                     | [optional] Maximum new tokens per response.                               | `4096`               | `8192`        |
| `RESTAPI_FEEL_COPILOT_TIMEOUT`                        | [optional] Overall request timeout.                                       | `45s`                | `60s`         |
| `RESTAPI_FEEL_COPILOT_LOG_REQUEST`                    | [optional] Log raw requests (not recommended in production).              | `true`               | `false`       |
| `RESTAPI_FEEL_COPILOT_LOG_RESPONSE`                   | [optional] Log raw responses (not recommended in production).             | `true`               | `false`       |
| `RESTAPI_FEEL_COPILOT_CONNECTION_ACQUISITION_TIMEOUT` | [optional] Connection pool acquisition timeout.                           | `10s`                | `30s`         |
| `RESTAPI_FEEL_COPILOT_LOGIT_BIAS`                     | [optional] JSON object mapping token IDs to bias values (model-specific). | `{"123":-2,"456":3}` | `{}`          |
| `RESTAPI_FEEL_COPILOT_MAX_CONNECTIONS`                | [optional] Maximum HTTP connections.                                      | `300`                | `200`         |
| `RESTAPI_FEEL_COPILOT_READ_TIMEOUT`                   | [optional] Read timeout per request.                                      | `120s`               | `60s`         |

</TabItem>

<TabItem value="applicationYaml">

```yaml
camunda.modeler.default-feel-copilot-llm-configuration:
  temperature: 0.2 # optional, default: 0.3
  top-p: 0.90 # optional, default: 0.95
  top-k: 100 # optional, default: 64
  max-tokens: 4096 # optional, default: 8192
  timeout: 45s # optional, default: 60s
  log-request: true # optional, default: false
  log-response: true # optional, default: false
  connection-acquisition-timeout: 10s # optional, default: 30s
  logit-bias: '{"123":-2,"456":3}' # optional, default: {}
  max-connections: 300 # optional, default: 200
  read-timeout: 120s # optional, default: 60s
```

</TabItem>

</Tabs>

### Form Copilot

<Tabs groupId="copilot-form" defaultValue="envVars" queryString values={[
{label: 'Environment variables', value: 'envVars' },
{label: 'application.yml', value: 'applicationYaml' },
]}>

<TabItem value="envVars">

| Environment variable                                  | Description                                                               | Example value        | Default value |
| ----------------------------------------------------- | ------------------------------------------------------------------------- | -------------------- | ------------- |
| `RESTAPI_FORM_COPILOT_TEMPERATURE`                    | [optional] Sampling temperature.                                          | `0.2`                | `0.3`         |
| `RESTAPI_FORM_COPILOT_TOP_P`                          | [optional] Nucleus sampling probability.                                  | `0.90`               | `0.95`        |
| `RESTAPI_FORM_COPILOT_TOP_K`                          | [optional] Top-K sampling (if supported by the model).                    | `100`                | `64`          |
| `RESTAPI_FORM_COPILOT_MAX_TOKENS`                     | [optional] Maximum new tokens per response.                               | `4096`               | `8192`        |
| `RESTAPI_FORM_COPILOT_TIMEOUT`                        | [optional] Overall request timeout.                                       | `45s`                | `60s`         |
| `RESTAPI_FORM_COPILOT_LOG_REQUEST`                    | [optional] Log raw requests (not recommended in production).              | `true`               | `false`       |
| `RESTAPI_FORM_COPILOT_LOG_RESPONSE`                   | [optional] Log raw responses (not recommended in production).             | `true`               | `false`       |
| `RESTAPI_FORM_COPILOT_CONNECTION_ACQUISITION_TIMEOUT` | [optional] Connection pool acquisition timeout.                           | `10s`                | `30s`         |
| `RESTAPI_FORM_COPILOT_LOGIT_BIAS`                     | [optional] JSON object mapping token IDs to bias values (model-specific). | `{"123":-2,"456":3}` | `{}`          |
| `RESTAPI_FORM_COPILOT_MAX_CONNECTIONS`                | [optional] Maximum HTTP connections.                                      | `300`                | `200`         |
| `RESTAPI_FORM_COPILOT_READ_TIMEOUT`                   | [optional] Read timeout per request.                                      | `120s`               | `60s`         |

</TabItem>

<TabItem value="applicationYaml">

```yaml
camunda.modeler.default-form-copilot-llm-configuration:
  temperature: 0.2 # optional, default: 0.3
  top-p: 0.90 # optional, default: 0.95
  top-k: 100 # optional, default: 64
  max-tokens: 4096 # optional, default: 8192
  timeout: 45s # optional, default: 60s
  log-request: true # optional, default: false
  log-response: true # optional, default: false
  connection-acquisition-timeout: 10s # optional, default: 30s
  logit-bias: '{"123":-2,"456":3}' # optional, default: {}
  max-connections: 300 # optional, default: 200
  read-timeout: 120s # optional, default: 60s
```

</TabItem>

</Tabs>

### AWS Bedrock

:::warning
When configuring AWS Bedrock, make sure the model is available in the provided AWS region.
:::

<Tabs groupId="copilot-aws" defaultValue="envVars" queryString values={[
{label: 'Environment variables', value: 'envVars' },
{label: 'application.yml', value: 'applicationYaml' },
]}>

<TabItem value="envVars">

| Environment Variable                    | Description                                                                    | Example Value                               |
| --------------------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------- |
| `RESTAPI_COPILOT_AWS_DEFAULT_MODEL_ID`  | Default model ID for AWS Bedrock provider.                                     | `anthropic.claude-3-5-sonnet-20240620-v1:0` |
| `RESTAPI_COPILOT_AWS_REGION`            | AWS region for Bedrock.                                                        | `us-east-1`                                 |
| `RESTAPI_BPMNCOPILOT_ACCESS_KEY_ID`     | AWS access key ID for Bedrock (if not using instance or role credentials).     | `AKIA...`                                   |
| `RESTAPI_BPMNCOPILOT_SECRET_ACCESS_KEY` | AWS secret access key for Bedrock (if not using instance or role credentials). | `wJalrXUtnFEMI/K7MDENG/bPxRfiCY...`         |

</TabItem>

<TabItem value="applicationYaml">

```yaml
camunda.modeler.copilot.providers.bedrock:
  default-model-id: anthropic.claude-3-5-sonnet-20240620-v1:0
  region: us-east-1
  access-key-id: AKIA... # optional, if not using instance or role credentials
  secret-access-key: "wJalrXUtnFEMI/K7MDENG/bPxRfiCY..." # optional, if not using instance or role credentials
```

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

<Tabs groupId="copilot-openai" defaultValue="envVars" queryString values={[
{label: 'Environment variables', value: 'envVars' },
{label: 'application.yml', value: 'applicationYaml' },
]}>

<TabItem value="envVars">

| Environment variable                       | Description                                                                                   | Example value                        |
| ------------------------------------------ | --------------------------------------------------------------------------------------------- | ------------------------------------ |
| `RESTAPI_COPILOT_OPEN_AI_DEFAULT_MODEL_ID` | Default model ID for OpenAI provider.                                                         | `gpt-4.1`                            |
| `RESTAPI_FEELCOPILOT_API_KEY`              | [conditionally required] API key for OpenAI public API.                                       | `sk-live-********`                   |
| `RESTAPI_COPILOT_OPENAI_ENDPOINT`          | [conditionally required] Custom endpoint for OpenAI-compatible APIs (proxies or self-hosted). | `https://my-proxy.example.com/v1`    |
| `RESTAPI_COPILOT_OPENAI_BEARER`            | [optional] Bearer token header to use instead of `api-key` with compatible gateways.          | `my-shared-bearer-token`             |
| `RESTAPI_COPILOT_OPENAI_USERNAME`          | [optional] Username to authenticate with an OpenAI-compatible gateway.                        | `api_user`                           |
| `RESTAPI_COPILOT_OPENAI_PASSWORD`          | [optional] Password to authenticate with an OpenAI-compatible gateway.                        | `s3cr3t`                             |
| `RESTAPI_COPILOT_OPENAI_HEADERS`           | [optional] Extra HTTP headers as a JSON map (string).                                         | `{"X-Org":"camunda","X-Trace":"on"}` |

</TabItem>

<TabItem value="applicationYaml">

```yaml
camunda.modeler.copilot.openai:
  default-model-id: gpt-4.1
  api-key: sk-live-******** # conditionally required
  endpoint: https://my-proxy.example.com/v1 # conditionally required
  bearer: my-shared-bearer-token # optional
  username: api_user # optional
  password: s3cr3t # optional
  headers: '{"X-Org":"camunda","X-Trace":"on"}' # optional
```

</TabItem>

</Tabs>

### Azure OpenAI

<Tabs groupId="copilot-azure-openai" defaultValue="envVars" queryString values={[
{label: 'Environment variables', value: 'envVars' },
{label: 'application.yml', value: 'applicationYaml' },
]}>

<TabItem value="envVars">

| Environment variable                             | Description                                       | Example value                      |
| ------------------------------------------------ | ------------------------------------------------- | ---------------------------------- |
| `RESTAPI_COPILOT_AZURE_OPEN_AI_DEFAULT_MODEL_ID` | Default model (deployment name) for Azure OpenAI. | `gpt-4o`                           |
| `RESTAPI_COPILOT_AZURE_OPENAI_API_KEY`           | Azure OpenAI API key.                             | `az-aoai-key-**\*\*\*\***`         |
| `RESTAPI_COPILOT_AZURE_OPENAI_ENDPOINT`          | Azure OpenAI endpoint.                            | `https://my-aoai.openai.azure.com` |

</TabItem>

<TabItem value="applicationYaml">

```yaml
camunda.modeler.copilot.azure-open-ai:
  default-model-id: gpt-4o
  api-key: "az-aoai-key-***"
  endpoint: https://my-aoai.openai.azure.com
```

</TabItem>

</Tabs>

### Azure AI

:::note
Azure AI supports authentication with an API key or Microsoft Entra ID (formerly Azure AD) using the OAuth 2.0 client credentials flow.
:::

<Tabs groupId="copilot-azure-ai" defaultValue="envVars" queryString values={[
{label: 'Environment variables', value: 'envVars' },
{label: 'application.yml', value: 'applicationYaml' },
]}>

<TabItem value="envVars">

| Environment variable                        | Description                                                                        | Example value                                                                     |
| ------------------------------------------- | ---------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `RESTAPI_COPILOT_AZURE_AI_DEFAULT_MODEL_ID` | Default model for Azure AI (Inference).                                            | `gpt-4o-mini`                                                                     |
| `RESTAPI_COPILOT_AZURE_AI_ENDPOINT`         | Endpoint for Azure AI (Inference). Use the endpoint from `Azure AI Inference SDK`. | `https://********-resource.cognitiveservices.azure.com/openai/deployments/gpt-4o` |
| `RESTAPI_COPILOT_AZURE_AI_API_KEY`          | [conditionally required] API key for Azure AI (alternative to OAuth credentials).  | `az-ai-key-**\*\*\*\***`                                                          |
| `RESTAPI_COPILOT_AZURE_AI_CLIENT_ID`        | [conditionally required] Azure AI OAuth client ID.                                 | `00000000-0000-0000-0000-000000000000`                                            |
| `RESTAPI_COPILOT_AZURE_AI_CLIENT_SECRET`    | [conditionally required] Azure AI OAuth client secret.                             | `**\*\*\*\***`                                                                    |
| `RESTAPI_COPILOT_AZURE_AI_TENANT_ID`        | [conditionally required] Azure AD tenant ID for OAuth.                             | `11111111-2222-3333-4444-555555555555`                                            |
| `RESTAPI_COPILOT_AZURE_AI_AUTHORITY_HOST`   | [conditionally required] Authority host for Azure OAuth.                           | `https://login.microsoftonline.com`                                               |

</TabItem>

<TabItem value="applicationYaml">

```yaml
camunda.modeler.copilot.azure-ai:
  default-model-id: gpt-4o-mini
  endpoint: https://my-resource.cognitiveservices.azure.com/openai/deployments/gpt-4o
  api-key: "az-ai-key-***" # conditionally required (alternative to OAuth)
  client-id: 00000000-0000-0000-0000-000000000000 # conditionally required (OAuth)
  client-secret: "***" # conditionally required (OAuth)
  tenant-id: 11111111-2222-3333-4444-555555555555 # conditionally required (OAuth)
  authority-host: https://login.microsoftonline.com # conditionally required (OAuth)
```

</TabItem>

</Tabs>

### Google Vertex AI

<Tabs groupId="copilot-vertex" defaultValue="envVars" queryString values={[
{label: 'Environment variables', value: 'envVars' },
{label: 'application.yml', value: 'applicationYaml' },
]}>

<TabItem value="envVars">

| Environment variable                         | Description                                     | Example value                                                                                |
| -------------------------------------------- | ----------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `RESTAPI_COPILOT_VERTEX_AI_DEFAULT_MODEL_ID` | Default model ID for Google Vertex AI (Gemini). | `gemini-1.5-pro-002`                                                                         |
| `RESTAPI_COPILOT_VERTEX_AI_PROJECT_ID`       | GCP project ID for Vertex AI.                   | `my-gcp-project`                                                                             |
| `RESTAPI_COPILOT_VERTEX_AI_LOCATION`         | Vertex AI location or region.                   | `us-central1`                                                                                |
| `RESTAPI_COPILOT_VERTEX_AI_CREDENTIALS_JSON` | Vertex AI service account JSON (string).        | `{"type":"service_account","project_id":"my-proj","client_email":"...","private_key":"..."}` |

</TabItem>

<TabItem value="applicationYaml">

```yaml
camunda.modeler.copilot.vertex-ai:
  default-model-id: gemini-1.5-pro-002
  project-id: my-gcp-project
  location: us-central1
  credentials-json: '{"type":"service_account","project_id":"my-proj","client_email":"...","private_key":"..."}'
```

</TabItem>

</Tabs>

### Anthropic

<Tabs groupId="copilot-anthropic" defaultValue="envVars" queryString values={[
{label: 'Environment variables', value: 'envVars' },
{label: 'application.yml', value: 'applicationYaml' },
]}>

<TabItem value="envVars">

| Environment variable                              | Description                                                              | Example value                | Default value |
| ------------------------------------------------- | ------------------------------------------------------------------------ | ---------------------------- | ------------- |
| `RESTAPI_COPILOT_ANTHROPIC_DEFAULT_MODEL_ID`      | Default model ID for Anthropic.                                          | `claude-3-5-sonnet-20240620` | -             |
| `RESTAPI_COPILOT_ANTHROPIC_API_KEY`               | Anthropic API key.                                                       | `sk-ant-**\*\*\*\***`        | -             |
| `RESTAPI_COPILOT_ANTHROPIC_CACHE_SYSTEM_MESSAGES` | [optional] Enable client-side caching of system messages (if supported). | `false`                      | `true`        |
| `RESTAPI_COPILOT_ANTHROPIC_CACHE_TOOLS`           | [optional] Enable client-side caching of tool schemas (if supported).    | `false`                      | `true`        |

</TabItem>

<TabItem value="applicationYaml">

```yaml
camunda.modeler.copilot.anthropic:
  default-model-id: claude-3-5-sonnet-20240620
  api-key: "sk-ant-***"
  cache-system-messages: false # optional, default: true
  cache-tools: false # optional, default: true
```

</TabItem>

</Tabs>

### Ollama

<Tabs groupId="copilot-ollama" defaultValue="envVars" queryString values={[
{label: 'Environment variables', value: 'envVars' },
{label: 'application.yml', value: 'applicationYaml' },
]}>

<TabItem value="envVars">

| Environment variable                      | Description                                                   | Example value                        |
| ----------------------------------------- | ------------------------------------------------------------- | ------------------------------------ |
| `RESTAPI_COPILOT_OLLAMA_DEFAULT_MODEL_ID` | Default model ID for Ollama.                                  | `llama3.1`                           |
| `RESTAPI_COPILOT_OLLAMA_BASE_URL`         | Ollama server base URL.                                       | `http://localhost:11434`             |
| `RESTAPI_COPILOT_OLLAMA_HEADERS`          | [optional] Extra HTTP headers to send as a JSON map (string). | `{"X-Org":"camunda","X-Trace":"on"}` |

</TabItem>

<TabItem value="applicationYaml">

```yaml
camunda.modeler.copilot.ollama:
  default-model-id: llama3.1
  base-url: http://localhost:11434
  headers: '{"X-Org":"camunda","X-Trace":"on"}' # optional
```

</TabItem>

</Tabs>

### Hugging Face

<Tabs groupId="copilot-huggingface" defaultValue="envVars" queryString values={[
{label: 'Environment variables', value: 'envVars' },
{label: 'application.yml', value: 'applicationYaml' },
]}>

<TabItem value="envVars">

| Environment variable                            | Description                                                              | Example value                                 | Default value |
| ----------------------------------------------- | ------------------------------------------------------------------------ | --------------------------------------------- | ------------- |
| `RESTAPI_COPILOT_HUGGING_FACE_DEFAULT_MODEL_ID` | Default model ID for Hugging Face Inference.                             | `mistralai/Mixtral-8x7B-Instruct-v0.1`        | -             |
| `RESTAPI_COPILOT_HUGGING_FACE_BASE_URL`         | Base URL for Hugging Face Inference endpoint (if self-hosted or custom). | `https://api-inference.huggingface.co/models` | -             |
| `RESTAPI_COPILOT_HUGGING_FACE_ACCESS_TOKEN`     | Access token for Hugging Face.                                           | `hf\_**\*\*\*\***`                            | -             |
| `RESTAPI_COPILOT_HUGGING_FACE_WAIT_FOR_MODEL`   | [optional] Wait for model to warm up before responding.                  | `false`                                       | `true`        |
| `RESTAPI_COPILOT_HUGGING_FACE_RETURN_FULL_TEXT` | [optional] Return the full generated text (not just the completion).     | `true`                                        | `true`        |

</TabItem>

<TabItem value="applicationYaml">

```yaml
camunda.modeler.copilot.hugging-face:
  default-model-id: mistralai/Mixtral-8x7B-Instruct-v0.1
  base-url: https://api-inference.huggingface.co/models
  access-token: "hf_***"
  wait-for-model: false # optional, default: true
  return-full-text: true # optional, default: true
```

</TabItem>

</Tabs>
