---
id: copilot
title: "Copilot"
description: "Configure Copilot in Web Modeler with a custom LLM provider."
---

Web Modeler supports using large language models (LLMs) to help users create BPMN diagrams, write FEEL expressions, and build forms. You can configure the default LLM provider for BPMN, FEEL, and form copilots.

Copilot supports the following LLM providers:

| LLM provider     | Environment variable value |
| ---------------- | -------------------------- |
| Anthropic        | `ANTHROPIC`                |
| AWS Bedrock      | `BEDROCK`                  |
| Azure AI         | `AZURE_AI`                 |
| Azure OpenAI     | `AZURE_OPENAI`             |
| Google Vertex AI | `VERTEX_AI`                |
| Hugging Face     | `HUGGING_FACE`             |
| Ollama           | `OLLAMA`                   |
| OpenAI           | `OPENAI`                   |

## Configuration

To enable Copilot, set the `FEATURE_AI_ENABLED` environment variable to `true`. Then configure the default LLM provider for BPMN, FEEL and form copilots using the respective environment variables. Each provider has its own configuration options, described below.

| Environment variable                        | Description                                                                    | Example value | Default value |
| ------------------------------------------- | ------------------------------------------------------------------------------ | ------------- | ------------- |
| `FEATURE_AI_ENABLED`                        | Enables Copilot.                                                               | `true`        | `false`       |
| `RESTAPI_BPMN_COPILOT_DEFAULT_LLM_PROVIDER` | Default provider for BPMN Copilot.                                             | `BEDROCK`     | –             |
| `RESTAPI_FEEL_COPILOT_DEFAULT_LLM_PROVIDER` | Default provider for FEEL Copilot.                                             | `OPENAI`      | –             |
| `RESTAPI_FORM_COPILOT_DEFAULT_LLM_PROVIDER` | Default provider for form Copilot.                                             | `VERTEX_AI`   | –             |
| `RESTAPI_COPILOT_REQUEST_TIMEOUT`           | [optional] Overall request timeout in milliseconds for Copilot requests in UI. | `200000`      | `300000`      |

### BPMN Copilot

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

### FEEL Copilot

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

### Form Copilot

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

### AWS Bedrock

:::caution
When configuring AWS Bedrock, make sure the model is available in the provided AWS region.
:::

| Environment Variable                    | Description                                                                    | Example Value                               |
| --------------------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------- |
| `RESTAPI_COPILOT_AWS_DEFAULT_MODEL_ID`  | Default model ID for AWS Bedrock provider.                                     | `anthropic.claude-3-5-sonnet-20240620-v1:0` |
| `RESTAPI_COPILOT_AWS_REGION`            | AWS region for Bedrock.                                                        | `us-east-1`                                 |
| `RESTAPI_BPMNCOPILOT_ACCESS_KEY_ID`     | AWS access key ID for Bedrock (if not using instance or role credentials).     | `AKIA...`                                   |
| `RESTAPI_BPMNCOPILOT_SECRET_ACCESS_KEY` | AWS secret access key for Bedrock (if not using instance or role credentials). | `wJalrXUtnFEMI/K7MDENG/bPxRfiCY...`         |

### OpenAI

:::note
This configuration applies to OpenAI and OpenAI-compatible providers.

Provide exactly one of:

- `RESTAPI_FEELCOPILOT_API_KEY` for OpenAI’s public API (no custom endpoint needed), or
- `RESTAPI_COPILOT_OPENAI_ENDPOINT` for OpenAI‑compatible providers or proxies.

For OpenAI‑compatible providers, you can authenticate with:

- `RESTAPI_COPILOT_OPENAI_BEARER`
- `RESTAPI_COPILOT_OPENAI_USERNAME` and `RESTAPI_COPILOT_OPENAI_PASSWORD` (basic authentication)
- `RESTAPI_COPILOT_OPENAI_HEADERS` (custom authentication headers)
  :::

| Environment variable                       | Description                                                                                   | Example value                        |
| ------------------------------------------ | --------------------------------------------------------------------------------------------- | ------------------------------------ |
| `RESTAPI_COPILOT_OPEN_AI_DEFAULT_MODEL_ID` | Default model ID for OpenAI provider.                                                         | `gpt-4.1`                            |
| `RESTAPI_FEELCOPILOT_API_KEY`              | [conditionally required] API key for OpenAI public API.                                       | `sk-live-********`                   |
| `RESTAPI_COPILOT_OPENAI_ENDPOINT`          | [conditionally required] Custom endpoint for OpenAI-compatible APIs (proxies or self-hosted). | `https://my-proxy.example.com/v1`    |
| `RESTAPI_COPILOT_OPENAI_BEARER`            | [optional] Bearer token header to use instead of `api-key` with compatible gateways.          | `my-shared-bearer-token`             |
| `RESTAPI_COPILOT_OPENAI_USERNAME`          | [optional] Username to authenticate with an OpenAI-compatible gateway.                        | `api_user`                           |
| `RESTAPI_COPILOT_OPENAI_PASSWORD`          | [optional] Password to authenticate with an OpenAI-compatible gateway.                        | `s3cr3t`                             |
| `RESTAPI_COPILOT_OPENAI_HEADERS`           | [optional] Extra HTTP headers as a JSON map (string).                                         | `{"X-Org":"camunda","X-Trace":"on"}` |

### Azure OpenAI

| Environment variable                             | Description                                       | Example value                      |
| ------------------------------------------------ | ------------------------------------------------- | ---------------------------------- |
| `RESTAPI_COPILOT_AZURE_OPEN_AI_DEFAULT_MODEL_ID` | Default model (deployment name) for Azure OpenAI. | `gpt-4o`                           |
| `RESTAPI_COPILOT_AZURE_OPENAI_API_KEY`           | Azure OpenAI API key.                             | `az-aoai-key-**\*\*\*\***`         |
| `RESTAPI_COPILOT_AZURE_OPENAI_ENDPOINT`          | Azure OpenAI endpoint.                            | `https://my-aoai.openai.azure.com` |

### Azure AI

:::note
Azure AI supports authentication with an API key or Microsoft Entra ID (formerly Azure AD) using the OAuth 2.0 client credentials flow.
:::

| Environment variable                        | Description                                                                       | Example value                                              |
| ------------------------------------------- | --------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `RESTAPI_COPILOT_AZURE_AI_DEFAULT_MODEL_ID` | Default model for Azure AI (Inference).                                           | `gpt-4o-mini`                                              |
| `RESTAPI_COPILOT_AZURE_AI_ENDPOINT`         | Endpoint for Azure AI (Inference).                                                | `https://my-azure-ai-endpoint.cognitiveservices.azure.com` |
| `RESTAPI_COPILOT_AZURE_AI_API_KEY`          | [conditionally required] API key for Azure AI (alternative to OAuth credentials). | `az-ai-key-**\*\*\*\***`                                   |
| `RESTAPI_COPILOT_AZURE_AI_CLIENT_ID`        | [conditionally required] Azure AI OAuth client ID.                                | `00000000-0000-0000-0000-000000000000`                     |
| `RESTAPI_COPILOT_AZURE_AI_CLIENT_SECRET`    | [conditionally required] Azure AI OAuth client secret.                            | `**\*\*\*\***`                                             |
| `RESTAPI_COPILOT_AZURE_AI_TENANT_ID`        | [conditionally required] Azure AD tenant ID for OAuth.                            | `11111111-2222-3333-4444-555555555555`                     |
| `RESTAPI_COPILOT_AZURE_AI_AUTHORITY_HOST`   | [conditionally required] Authority host for Azure OAuth.                          | `https://login.microsoftonline.com`                        |

### Google Vertex AI

| Environment variable                         | Description                                     | Example value                                                                                |
| -------------------------------------------- | ----------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `RESTAPI_COPILOT_VERTEX_AI_DEFAULT_MODEL_ID` | Default model ID for Google Vertex AI (Gemini). | `gemini-1.5-pro-002`                                                                         |
| `RESTAPI_COPILOT_VERTEX_AI_PROJECT_ID`       | GCP project ID for Vertex AI.                   | `my-gcp-project`                                                                             |
| `RESTAPI_COPILOT_VERTEX_AI_LOCATION`         | Vertex AI location or region.                   | `us-central1`                                                                                |
| `RESTAPI_COPILOT_VERTEX_AI_CREDENTIALS_JSON` | Vertex AI service account JSON (string).        | `{"type":"service_account","project_id":"my-proj","client_email":"...","private_key":"..."}` |

### Anthropic

| Environment variable                              | Description                                                              | Example value                | Default value |
| ------------------------------------------------- | ------------------------------------------------------------------------ | ---------------------------- | ------------- |
| `RESTAPI_COPILOT_ANTHROPIC_DEFAULT_MODEL_ID`      | Default model ID for Anthropic.                                          | `claude-3-5-sonnet-20240620` | -             |
| `RESTAPI_COPILOT_ANTHROPIC_API_KEY`               | Anthropic API key.                                                       | `sk-ant-**\*\*\*\***`        | -             |
| `RESTAPI_COPILOT_ANTHROPIC_CACHE_SYSTEM_MESSAGES` | [optional] Enable client-side caching of system messages (if supported). | `false`                      | `true`        |
| `RESTAPI_COPILOT_ANTHROPIC_CACHE_TOOLS`           | [optional] Enable client-side caching of tool schemas (if supported).    | `false`                      | `true`        |

### Ollama

| Environment variable                      | Description                                                   | Example value                        |
| ----------------------------------------- | ------------------------------------------------------------- | ------------------------------------ |
| `RESTAPI_COPILOT_OLLAMA_DEFAULT_MODEL_ID` | Default model ID for Ollama.                                  | `llama3.1`                           |
| `RESTAPI_COPILOT_OLLAMA_BASE_URL`         | Ollama server base URL.                                       | `http://localhost:11434`             |
| `RESTAPI_COPILOT_OLLAMA_HEADERS`          | [optional] Extra HTTP headers to send as a JSON map (string). | `{"X-Org":"camunda","X-Trace":"on"}` |

### Hugging Face

| Environment variable                            | Description                                                              | Example value                                 | Default value |
| ----------------------------------------------- | ------------------------------------------------------------------------ | --------------------------------------------- | ------------- |
| `RESTAPI_COPILOT_HUGGING_FACE_DEFAULT_MODEL_ID` | Default model ID for Hugging Face Inference.                             | `mistralai/Mixtral-8x7B-Instruct-v0.1`        | -             |
| `RESTAPI_COPILOT_HUGGING_FACE_BASE_URL`         | Base URL for Hugging Face Inference endpoint (if self-hosted or custom). | `https://api-inference.huggingface.co/models` | -             |
| `RESTAPI_COPILOT_HUGGING_FACE_ACCESS_TOKEN`     | Access token for Hugging Face.                                           | `hf\_**\*\*\*\***`                            | -             |
| `RESTAPI_COPILOT_HUGGING_FACE_WAIT_FOR_MODEL`   | [optional] Wait for model to warm up before responding.                  | `false`                                       | `true`        |
| `RESTAPI_COPILOT_HUGGING_FACE_RETURN_FULL_TEXT` | [optional] Return the full generated text (not just the completion).     | `true`                                        | `true`        |
