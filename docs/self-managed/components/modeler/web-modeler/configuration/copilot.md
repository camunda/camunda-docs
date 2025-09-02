---
id: copilot
title: "Copilot"
description: "Read details on how to configure Copilot in Web Modeler to a custom provider."
---

Web Modeler supports using LLMs to assist users in creating BPMN diagrams, writing FEEL expressions and building forms. You can choose the default LLM provider for BPMN, FEEL and FORM copilots.
Copilot supports the following LLM providers:

| LLM Provider     | Environment Variable Value |
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

To enable Copilot, set the `FEATURE_AI_ENABLED` environment variable to `true`. You can then configure the default LLM provider for BPMN, FEEL and Form copilots using the respective environment variables. Each provider has its own configuration options, which are detailed below.

| Environment Variable                        | Description                                                   | Example Value | Default Value |
| ------------------------------------------- | ------------------------------------------------------------- | ------------- | ------------- |
| `FEATURE_AI_ENABLED`                        | Switch to use for enabling Copilot.                           | `true`        | `false`       |
| `RESTAPI_BPMN_COPILOT_DEFAULT_LLM_PROVIDER` | Provider to use for BPMN Copilot.                             | `BEDROCK`     | -             |
| `RESTAPI_FEEL_COPILOT_DEFAULT_LLM_PROVIDER` | Provider to use for FEEL Copilot.                             | `OPENAI`      | \_            |
| `RESTAPI_FORM_COPILOT_DEFAULT_LLM_PROVIDER` | Provider to use for Form Copilot.                             | `VERTEX_AI`   | \_            |
| `RESTAPI_COPILOT_REQUEST_TIMEOUT`           | [optional] Overall request timeout for Copilot request in UI. | `200000`      | `300000`      |

### BPMN Copilot Configuration

| Environment Variable                                  | Description                                                               | Example Value        | Default Value |
| ----------------------------------------------------- | ------------------------------------------------------------------------- | -------------------- | ------------- |
| `RESTAPI_BPMN_COPILOT_TEMPERATURE`                    | [optional] Sampling temperature for BPMN Copilot.                         | `0.2`                | `0.3`         |
| `RESTAPI_BPMN_COPILOT_TOP_P`                          | [optional] Nucleus sampling probability for BPMN Copilot.                 | `0.90`               | `0.95`        |
| `RESTAPI_BPMN_COPILOT_TOP_K`                          | [optional] Top-K sampling for BPMN Copilot (if supported by the model).   | `100`                | `64`          |
| `RESTAPI_BPMN_COPILOT_MAX_TOKENS`                     | [optional] Max new tokens for BPMN Copilot responses.                     | `4096`               | `8192`        |
| `RESTAPI_BPMN_COPILOT_TIMEOUT`                        | [optional] Overall request timeout for BPMN Copilot.                      | `45s`                | `60s`         |
| `RESTAPI_BPMN_COPILOT_LOG_REQUEST`                    | [optional] Log raw requests for BPMN Copilot (avoid in production).       | `true`               | `false`       |
| `RESTAPI_BPMN_COPILOT_LOG_RESPONSE`                   | [optional] Log raw responses for BPMN Copilot (avoid in production).      | `true`               | `false`       |
| `RESTAPI_BPMN_COPILOT_CONNECTION_ACQUISITION_TIMEOUT` | [optional] Connection pool acquisition timeout for BPMN Copilot.          | `10s`                | `30s`         |
| `RESTAPI_BPMN_COPILOT_LOGIT_BIAS`                     | [optional] JSON map of token-ID → bias for BPMN Copilot (model-specific). | `{"123":-2,"456":3}` | `{}`          |
| `RESTAPI_BPMN_COPILOT_MAX_CONNECTIONS`                | [optional] Max HTTP connections for BPMN Copilot.                         | `300`                | `200`         |
| `RESTAPI_BPMN_COPILOT_READ_TIMEOUT`                   | [optional] Read timeout per request for BPMN Copilot.                     | `120s`               | `60s`         |

### FEEL Copilot Configuration

| Environment Variable                                  | Description                                                               | Example Value        | Default Value |
| ----------------------------------------------------- | ------------------------------------------------------------------------- | -------------------- | ------------- |
| `RESTAPI_FEEL_COPILOT_TEMPERATURE`                    | [optional] Sampling temperature for FEEL Copilot.                         | `0.2`                | `0.3`         |
| `RESTAPI_FEEL_COPILOT_TOP_P`                          | [optional] Nucleus sampling probability for FEEL Copilot.                 | `0.90`               | `0.95`        |
| `RESTAPI_FEEL_COPILOT_TOP_K`                          | [optional] Top-K sampling for FEEL Copilot (if supported by the model).   | `100`                | `64`          |
| `RESTAPI_FEEL_COPILOT_MAX_TOKENS`                     | [optional] Max new tokens for FEEL Copilot responses.                     | `4096`               | `8192`        |
| `RESTAPI_FEEL_COPILOT_TIMEOUT`                        | [optional] Overall request timeout for FEEL Copilot.                      | `45s`                | `60s`         |
| `RESTAPI_FEEL_COPILOT_LOG_REQUEST`                    | [optional] Log raw requests for FEEL Copilot (avoid in production).       | `true`               | `false`       |
| `RESTAPI_FEEL_COPILOT_LOG_RESPONSE`                   | [optional] Log raw responses for FEEL Copilot (avoid in production).      | `true`               | `false`       |
| `RESTAPI_FEEL_COPILOT_CONNECTION_ACQUISITION_TIMEOUT` | [optional] Connection pool acquisition timeout for FEEL Copilot.          | `10s`                | `30s`         |
| `RESTAPI_FEEL_COPILOT_LOGIT_BIAS`                     | [optional] JSON map of token-ID → bias for FEEL Copilot (model-specific). | `{"123":-2,"456":3}` | `{}`          |
| `RESTAPI_FEEL_COPILOT_MAX_CONNECTIONS`                | [optional] Max HTTP connections for FEEL Copilot.                         | `300`                | `200`         |
| `RESTAPI_FEEL_COPILOT_READ_TIMEOUT`                   | [optional] Read timeout per request for FEEL Copilot.                     | `120s`               | `60s`         |

### Form Copilot Configuration

| Environment Variable                                  | Description                                                               | Example Value        | Default Value |
| ----------------------------------------------------- | ------------------------------------------------------------------------- | -------------------- | ------------- |
| `RESTAPI_FORM_COPILOT_TEMPERATURE`                    | [optional] Sampling temperature for Form Copilot.                         | `0.2`                | `0.3`         |
| `RESTAPI_FORM_COPILOT_TOP_P`                          | [optional] Nucleus sampling probability for Form Copilot.                 | `0.90`               | `0.95`        |
| `RESTAPI_FORM_COPILOT_TOP_K`                          | [optional] Top-K sampling for Form Copilot (if supported by the model).   | `100`                | `64`          |
| `RESTAPI_FORM_COPILOT_MAX_TOKENS`                     | [optional] Max new tokens for Form Copilot responses.                     | `4096`               | `8192`        |
| `RESTAPI_FORM_COPILOT_TIMEOUT`                        | [optional] Overall request timeout for Form Copilot.                      | `45s`                | `60s`         |
| `RESTAPI_FORM_COPILOT_LOG_REQUEST`                    | [optional] Log raw requests for Form Copilot (avoid in production).       | `true`               | `false`       |
| `RESTAPI_FORM_COPILOT_LOG_RESPONSE`                   | [optional] Log raw responses for Form Copilot (avoid in production).      | `true`               | `false`       |
| `RESTAPI_FORM_COPILOT_CONNECTION_ACQUISITION_TIMEOUT` | [optional] Connection pool acquisition timeout for Form Copilot.          | `10s`                | `30s`         |
| `RESTAPI_FORM_COPILOT_LOGIT_BIAS`                     | [optional] JSON map of token-ID → bias for Form Copilot (model-specific). | `{"123":-2,"456":3}` | `{}`          |
| `RESTAPI_FORM_COPILOT_MAX_CONNECTIONS`                | [optional] Max HTTP connections for Form Copilot.                         | `300`                | `200`         |
| `RESTAPI_FORM_COPILOT_READ_TIMEOUT`                   | [optional] Read timeout per request for Form Copilot.                     | `120s`               | `60s`         |

### AWS Bedrock Configuration

:::caution
When configuring AWS Bedrock, make sure the model is available in the provided AWS region.
:::

| Environment Variable                    | Description                                                                 | Example Value                               |
| --------------------------------------- | --------------------------------------------------------------------------- | ------------------------------------------- |
| `RESTAPI_COPILOT_AWS_DEFAULT_MODEL_ID`  | Default model ID for AWS Bedrock provider.                                  | `anthropic.claude-3-5-sonnet-20240620-v1:0` |
| `RESTAPI_COPILOT_AWS_REGION`            | AWS region for Bedrock.                                                     | `us-east-1`                                 |
| `RESTAPI_BPMNCOPILOT_ACCESS_KEY_ID`     | AWS access key ID for Bedrock (if not using instance/role credentials).     | `AKIA...`                                   |
| `RESTAPI_BPMNCOPILOT_SECRET_ACCESS_KEY` | AWS secret access key for Bedrock (if not using instance/role credentials). | `wJalrXUtnFEMI/K7MDENG/bPxRfiCY...`         |

### OpenAI Configuration

:::note
Use this interface for OpenAI itself **and** OpenAI‑compatible providers.\
**Requirement:** Provide **exactly one** of `RESTAPI_FEELCOPILOT_API_KEY` **or** `RESTAPI_COPILOT_OPENAI_ENDPOINT`.

• Use `RESTAPI_FEELCOPILOT_API_KEY` for OpenAI’s public API (no custom endpoint needed).\
• Use `RESTAPI_COPILOT_OPENAI_ENDPOINT` for OpenAI‑compatible providers/proxies. Authenticate with\
&emsp;• `RESTAPI_COPILOT_OPENAI_BEARER` **or**\
&emsp;• Basic authentication via `RESTAPI_COPILOT_OPENAI_USERNAME`/`RESTAPI_COPILOT_OPENAI_PASSWORD`) **or**\
&emsp;• Passing custom authentication header using `RESTAPI_COPILOT_OPENAI_HEADERS`.
:::

| Environment Variable                       | Description                                                                                     | Example Value                        |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------- | ------------------------------------ |
| `RESTAPI_COPILOT_OPEN_AI_DEFAULT_MODEL_ID` | Default model ID for OpenAI provider.                                                           | `gpt-4.1`                            |
| `RESTAPI_FEELCOPILOT_API_KEY`              | **\[conditionally required]** API key for OpenAI. Use this when calling OpenAI’s public API.    | `sk-live-********`                   |
| `RESTAPI_COPILOT_OPENAI_ENDPOINT`          | **\[conditionally required]** Custom endpoint for OpenAI‑compatible APIs (proxies/self‑hosted). | `https://my-proxy.example.com/v1`    |
| `RESTAPI_COPILOT_OPENAI_BEARER`            | \[optional] Bearer token header to use instead of `api-key` with compatible gateways.           | `my-shared-bearer-token`             |
| `RESTAPI_COPILOT_OPENAI_USERNAME`          | \[optional] Username for Basic auth to an OpenAI‑compatible gateway.                            | `api_user`                           |
| `RESTAPI_COPILOT_OPENAI_PASSWORD`          | \[optional] Password for Basic auth to an OpenAI‑compatible gateway.                            | `s3cr3t`                             |
| `RESTAPI_COPILOT_OPENAI_HEADERS`           | \[optional] Extra HTTP headers as a JSON map (string).                                          | `{"X-Org":"camunda","X-Trace":"on"}` |

### Azure OpenAI Configuration

| Environment Variable                             | Description                                       | Example Value                      |
| ------------------------------------------------ | ------------------------------------------------- | ---------------------------------- |
| `RESTAPI_COPILOT_AZURE_OPEN_AI_DEFAULT_MODEL_ID` | Default model (deployment name) for Azure OpenAI. | `gpt-4o`                           |
| `RESTAPI_COPILOT_AZURE_OPENAI_API_KEY`           | API key for Azure OpenAI.                         | `az-aoai-key-**\*\*\*\***`         |
| `RESTAPI_COPILOT_AZURE_OPENAI_ENDPOINT`          | Endpoint for Azure OpenAI.                        | `https://my-aoai.openai.azure.com` |

### Azure AI Configuration

:::note
Azure AI supports authentication via an API key or Microsoft Entra ID (formerly Azure AD) using the OAuth 2.0 client-credentials flow.
:::

| Environment Variable                        | Description                                                                            | Example Value                                              |
| ------------------------------------------- | -------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `RESTAPI_COPILOT_AZURE_AI_DEFAULT_MODEL_ID` | Default model for Azure AI (Inference).                                                | `gpt-4o-mini`                                              |
| `RESTAPI_COPILOT_AZURE_AI_ENDPOINT`         | Endpoint for Azure AI (Inference).                                                     | `https://my-azure-ai-endpoint.cognitiveservices.azure.com` |
| `RESTAPI_COPILOT_AZURE_AI_API_KEY`          | **\[conditionally required]** API key for Azure AI (alternative to OAuth credentials). | `az-ai-key-**\*\*\*\***`                                   |
| `RESTAPI_COPILOT_AZURE_AI_CLIENT_ID`        | **\[conditionally required]** OAuth client ID for Azure AI.                            | `00000000-0000-0000-0000-000000000000`                     |
| `RESTAPI_COPILOT_AZURE_AI_CLIENT_SECRET`    | **\[conditionally required]** OAuth client secret for Azure AI.                        | `**\*\*\*\***`                                             |
| `RESTAPI_COPILOT_AZURE_AI_TENANT_ID`        | **\[conditionally required]** Azure AD tenant ID for OAuth.                            | `11111111-2222-3333-4444-555555555555`                     |
| `RESTAPI_COPILOT_AZURE_AI_AUTHORITY_HOST`   | **\[conditionally required]** Authority host for Azure OAuth.                          | `https://login.microsoftonline.com`                        |

### Google Vertex AI Configuration

| Environment Variable                         | Description                                     | Example Value                                                                                |
| -------------------------------------------- | ----------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `RESTAPI_COPILOT_VERTEX_AI_DEFAULT_MODEL_ID` | Default model ID for Google Vertex AI (Gemini). | `gemini-1.5-pro-002`                                                                         |
| `RESTAPI_COPILOT_VERTEX_AI_PROJECT_ID`       | GCP project ID for Vertex AI.                   | `my-gcp-project`                                                                             |
| `RESTAPI_COPILOT_VERTEX_AI_LOCATION`         | Vertex AI location/region.                      | `us-central1`                                                                                |
| `RESTAPI_COPILOT_VERTEX_AI_CREDENTIALS_JSON` | Service account JSON (string) for Vertex AI.    | `{"type":"service_account","project_id":"my-proj","client_email":"...","private_key":"..."}` |

### Anthropic Configuration

| Environment Variable                              | Description                                                              | Example Value                | Default Value |
| ------------------------------------------------- | ------------------------------------------------------------------------ | ---------------------------- | ------------- |
| `RESTAPI_COPILOT_ANTHROPIC_DEFAULT_MODEL_ID`      | Default model ID for Anthropic.                                          | `claude-3-5-sonnet-20240620` | -             |
| `RESTAPI_COPILOT_ANTHROPIC_API_KEY`               | API key for Anthropic.                                                   | `sk-ant-**\*\*\*\***`        | -             |
| `RESTAPI_COPILOT_ANTHROPIC_CACHE_SYSTEM_MESSAGES` | [optional] Enable client-side caching of system messages (if supported). | `false`                      | `true`        |
| `RESTAPI_COPILOT_ANTHROPIC_CACHE_TOOLS`           | [optional] Enable client-side caching of tool schemas (if supported).    | `false`                      | `true`        |

### Ollama Configuration

| Environment Variable                      | Description                                                               | Example Value                        |
| ----------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------ |
| `RESTAPI_COPILOT_OLLAMA_DEFAULT_MODEL_ID` | Default model ID for Ollama.                                              | `llama3.1`                           |
| `RESTAPI_COPILOT_OLLAMA_BASE_URL`         | Base URL for Ollama server.                                               | `http://localhost:11434`             |
| `RESTAPI_COPILOT_OLLAMA_HEADERS`          | [optional] Extra HTTP headers for Ollama requests as a JSON map (string). | `{"X-Org":"camunda","X-Trace":"on"}` |

### Hugging Face Configuration

| Environment Variable                            | Description                                                              | Example Value                                 | Default Value |
| ----------------------------------------------- | ------------------------------------------------------------------------ | --------------------------------------------- | ------------- |
| `RESTAPI_COPILOT_HUGGING_FACE_DEFAULT_MODEL_ID` | Default model ID for Hugging Face Inference.                             | `mistralai/Mixtral-8x7B-Instruct-v0.1`        | -             |
| `RESTAPI_COPILOT_HUGGING_FACE_BASE_URL`         | Base URL for Hugging Face Inference endpoint (if self-hosted or custom). | `https://api-inference.huggingface.co/models` | -             |
| `RESTAPI_COPILOT_HUGGING_FACE_ACCESS_TOKEN`     | Access token for Hugging Face.                                           | `hf\_**\*\*\*\***`                            | -             |
| `RESTAPI_COPILOT_HUGGING_FACE_WAIT_FOR_MODEL`   | [optional] Wait for model to warm up before responding.                  | `false`                                       | `true`        |
| `RESTAPI_COPILOT_HUGGING_FACE_RETURN_FULL_TEXT` | [optional] Return the full generated text (not just the completion).     | `true`                                        | `true`        |
