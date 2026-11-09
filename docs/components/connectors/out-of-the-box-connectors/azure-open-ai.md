---
id: azure-open-ai
title: Azure OpenAI connector
sidebar_label: Azure OpenAI
description: Send prompts to Azure OpenAI models from your BPMN process and use the response in later steps.
---

import OutboundConnectorBasics from '../../../components/react-components/\_connector-outbound-basics.md'
import ErrorHandling from '../../../components/react-components/\_connector-error-handling.md'

Send prompts to [Azure OpenAI](https://azure.microsoft.com/en-us/products/ai-services/openai-service) models from your BPMN process and use the response in later steps.

## About this connector

The **Azure OpenAI connector** is an outbound connector that calls the REST API of your Azure OpenAI resource. Use it to generate text with a deployed model as part of a process, for example to summarize a document or answer a question.

The connector is a [protocol connector](/components/connectors/protocol/rest.md) built on top of the REST connector, and supports the following prompt operations:

- [**Completion**](https://learn.microsoft.com/en-us/azure/ai-services/openai/reference#completions): Generates a text completion for a prompt.
- [**Chat completion**](https://learn.microsoft.com/en-us/azure/ai-services/openai/reference#chat-completions): Generates a response to a conversation made of messages.
- [**Completions extension**](https://learn.microsoft.com/en-us/azure/ai-services/openai/reference#completions-extensions): Generates a response to a conversation and can use additional data sources.

Not every model supports every operation. Refer to the [Azure OpenAI models documentation](https://learn.microsoft.com/en-us/azure/ai-services/openai/concepts/models) to check which operations your model supports.

## Prerequisites

To use the Azure OpenAI connector, you need the following:

| Prerequisite                                                                                                                                                               | Description                                                                                                                     |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------ |
| [Azure OpenAI resource](https://learn.microsoft.com/en-us/azure/ai-services/openai/how-to/create-resource)                                                                 | A created Azure OpenAI resource with a deployed model that supports the operation you want to use.                              |
| [API key](https://learn.microsoft.com/en-us/azure/ai-services/openai/quickstart?tabs=command-line%2Cpython-new&pivots=rest-api#retrieve-key-and-endpoint) for the resource | A valid key for your Azure OpenAI resource. Not required if you use an authentication credential (available from Camunda 8.11). |

:::note
Use secrets to store your API key and avoid exposing sensitive information directly from the process. Refer to [managing secrets](/components/saas/clusters/manage-secrets.md) to learn more.
:::

<OutboundConnectorBasics />

## Configuration

### Authentication

| Property                  | Type          | Required | Description                                                                                                                                                                                                                                                | Example                        |
| :------------------------ | :------------ | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------- |
| Authentication credential | Configuration | No       | Select a reusable authentication credential, or leave it empty to configure a one-time API key. When you select a credential, the **API key** field is hidden. Available from Camunda 8.11. See [Using an authentication credential](#using-a-credential). |                                |
| API key                   | String        | Yes      | The API key of your Azure OpenAI resource. Shown only when no credential is selected.                                                                                                                                                                      | `{{secrets.AZURE_OAI_SECRET}}` |

#### Using an authentication credential {#using-a-credential}

In Camunda 8.11 and later, you can select a reusable authentication credential instead of entering an API key on each element. For more information, see [using credentials](/components/connectors/use-connectors/index.md#using-credentials) and [credentials](/components/hub/organization/credentials/index.md).

Azure OpenAI accepts only the following credential types:

- An **API key** credential that sends the key in a header, with the key name exactly `api-key`.
- A **Bearer** (OAuth 2.0) credential sent as a standard `Authorization: Bearer` header, which is the only option if local API key authentication is disabled on your resource. It must use the scope `https://cognitiveservices.azure.com/.default`.

:::warning
Basic credentials are not supported. An API key credential that sends the key as a query parameter or uses a different key name, and a Basic credential, pass validation in the Modeler but send a malformed request, so the request fails at runtime. The connector doesn't use the URL field of the credential.
:::

### Job timeout

| Property    | Type   | Required | Description                                                                                                                            | Example |
| :---------- | :----- | :------- | :------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| Job timeout | String | No       | An ISO-8601 duration after which Zeebe considers the job timed out if it is not completed yet. Leave empty to use the default timeout. | `PT5M`  |

## Operations

Select the operation in the **Operation** dropdown. The **Operation** property determines which of the following properties appear.

### Completion

Generate a completion for a prompt. Select **Completion** in **Operation**. Learn more in the [Azure OpenAI completions documentation](https://learn.microsoft.com/en-us/azure/ai-services/openai/reference#completions).

#### Input parameters

| Property              | Type     | Required | Description                                                                                                     | Example                       |
| :-------------------- | :------- | :------- | :-------------------------------------------------------------------------------------------------------------- | :---------------------------- |
| Resource name         | String   | Yes      | The name of your Azure OpenAI resource.                                                                         | `myresource`                  |
| Deployment ID         | String   | Yes      | The deployment name you chose when you deployed the model.                                                      | `mydeployment`                |
| API version           | String   | Yes      | The API version to use for this operation. The default is `2024-02-01`.                                         | `2024-02-01`                  |
| Prompt                | Text     | Yes      | The prompt or prompts to generate completions for, encoded as a string or an array of strings.                  | `Write a haiku about the sea` |
| Max tokens            | String   | No       | The maximum number of tokens to generate in the completion. The default is `16`.                                |                               |
| Temperature           | String   | No       | The sampling temperature to use, between 0 and 2. The default is `1`.                                           |                               |
| Top P                 | String   | No       | An alternative to sampling with temperature, also known as nucleus sampling. The default is `1`.                |                               |
| Logit bias            | Text     | No       | Modifies the likelihood of specified tokens appearing in the completion.                                        |                               |
| User                  | String   | No       | A unique identifier representing your end user.                                                                 |                               |
| Number of completions | String   | No       | How many completions to generate for each prompt. The default is `1`.                                           |                               |
| Stream                | Dropdown | Yes      | Whether to stream back partial progress: **False** or **True**. The default is **False**.                       | **False**                     |
| Log probabilities     | String   | No       | Includes the log probabilities on the most likely tokens, as well as the chosen tokens.                         |                               |
| Suffix                | String   | No       | The suffix that comes after a completion of inserted text.                                                      |                               |
| Echo                  | Dropdown | No       | Whether to echo back the prompt in addition to the completion: **False** or **True**. The default is **False**. | **False**                     |
| Stop                  | String   | No       | Up to four sequences where the API stops generating further tokens.                                             |                               |
| Presence penalty      | String   | No       | Positive values penalize new tokens based on whether they appear in the text so far. The default is `0`.        |                               |
| Frequency penalty     | String   | No       | Positive values penalize new tokens based on their existing frequency in the text so far. The default is `0`.   |                               |
| Best of               | String   | No       | Generates the given number of completions server-side and returns the best one. The default is `1`.             |                               |

#### Output

The connector returns the HTTP response of the Azure OpenAI REST API as an object with the `status`, `headers`, and `body` fields. The `body` field contains the response of the model. Learn more about the response format in [REST connector response](/components/connectors/protocol/rest.md#response).

### Chat completion

Generate a response to a conversation. Select **Chat completion** in **Operation**. Learn more in the [Azure OpenAI chat completions documentation](https://learn.microsoft.com/en-us/azure/ai-services/openai/reference#chat-completions).

The connector sends the **Message content** as the last message of the conversation. To add earlier messages, such as a system message, use **Messages context**.

#### Input parameters

| Property              | Type     | Required | Description                                                                                                             | Example                                                          |
| :-------------------- | :------- | :------- | :---------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------- |
| Resource name         | String   | Yes      | The name of your Azure OpenAI resource.                                                                                 | `myresource`                                                     |
| Deployment ID         | String   | Yes      | The deployment name you chose when you deployed the model.                                                              | `mydeployment`                                                   |
| API version           | String   | Yes      | The API version to use for this operation. The default is `2024-02-01`.                                                 | `2024-02-01`                                                     |
| Message role          | Dropdown | Yes      | Who gives the current message: **User**, **System**, **Assistant**, **Tool**, or **Function**. The default is **User**. | **User**                                                         |
| Message content       | Text     | Yes      | The content of the message.                                                                                             | `What is the age of the Universe?`                               |
| Messages context      | Text     | No       | The array of messages associated with this chat completion request, sent before the current message.                    | `=[{"role": "system", "content": "You are helpful assistant."}]` |
| Content part          | String   | No       | Part of a user's multi-modal message.                                                                                   |                                                                  |
| Enhancements          | String   | No       | The Vision enhancement features requested for the chat.                                                                 |                                                                  |
| Temperature           | String   | No       | The sampling temperature to use, between 0 and 2. The default is `1`.                                                   |                                                                  |
| Number of completions | String   | No       | How many completions to generate for each prompt. The default is `1`.                                                   |                                                                  |
| Stream                | Dropdown | Yes      | Whether to stream back partial progress: **False** or **True**. The default is **False**.                               | **False**                                                        |
| Stop                  | String   | No       | Up to four sequences where the API stops generating further tokens.                                                     |                                                                  |
| Max tokens            | String   | No       | The maximum number of tokens to generate in the completion.                                                             |                                                                  |
| Presence penalty      | String   | No       | Positive values penalize new tokens based on whether they appear in the text so far.                                    |                                                                  |
| Frequency penalty     | String   | No       | Positive values penalize new tokens based on their existing frequency in the text so far.                               |                                                                  |
| Logit bias            | String   | No       | Modifies the likelihood of specified tokens appearing in the completion.                                                |                                                                  |
| User                  | String   | No       | A unique identifier representing your end user.                                                                         |                                                                  |
| Tools                 | String   | No       | A list of tools the model can call.                                                                                     |                                                                  |
| Data sources          | String   | No       | Additional resource data.                                                                                               |                                                                  |

#### Output {#chat-completion-output}

The connector returns the HTTP response of the Azure OpenAI REST API as an object with the `status`, `headers`, and `body` fields. For example, for the input in [Usage example](#usage-example):

```json
{
  "status": 200,
  "headers": {},
  "body": {
    "choices": [
      {
        "content_filter_results": {
          "hate": {
            "filtered": false,
            "severity": "safe"
          },
          "self_harm": {
            "filtered": false,
            "severity": "safe"
          },
          "sexual": {
            "filtered": false,
            "severity": "safe"
          },
          "violence": {
            "filtered": false,
            "severity": "safe"
          }
        },
        "finish_reason": "stop",
        "index": 0,
        "message": {
          "content": "The age of the universe is estimated to be around 13.8 billion years. This age is determined through various scientific methods, such as measuring the cosmic microwave background radiation and studying the expansion rate of the universe.",
          "role": "assistant"
        }
      }
    ],
    "created": 1700000000,
    "id": "chatcmpl-123",
    "model": "gpt-35-turbo",
    "object": "chat.completion",
    "prompt_filter_results": [
      {
        "prompt_index": 0,
        "content_filter_results": {
          "hate": {
            "filtered": false,
            "severity": "safe"
          },
          "self_harm": {
            "filtered": false,
            "severity": "safe"
          },
          "sexual": {
            "filtered": false,
            "severity": "safe"
          },
          "violence": {
            "filtered": false,
            "severity": "safe"
          }
        }
      }
    ],
    "usage": {
      "completion_tokens": 43,
      "prompt_tokens": 24,
      "total_tokens": 67
    }
  }
}
```

To store only the text of the answer in a process variable, use **Result expression**. FEEL lists start at index 1:

```feel
= {
  "answer": response.body.choices[1].message.content
}
```

### Completions extension

Generate a response to a conversation, optionally using additional data sources. Select **Completions extension** in **Operation**. Learn more in the [Azure OpenAI completions extensions documentation](https://learn.microsoft.com/en-us/azure/ai-services/openai/reference#completions-extensions).

#### Input parameters

| Property              | Type     | Required | Description                                                                               | Example              |
| :-------------------- | :------- | :------- | :---------------------------------------------------------------------------------------- | :------------------- |
| Resource name         | String   | Yes      | The name of your Azure OpenAI resource.                                                   | `myresource`         |
| Deployment ID         | String   | Yes      | The deployment name you chose when you deployed the model.                                | `mydeployment`       |
| API version           | String   | Yes      | The API version to use for this operation. The default is `2023-12-01-preview`.           | `2023-12-01-preview` |
| Messages              | String   | Yes      | The array of messages associated with this chat completion request.                       |                      |
| Content part          | String   | No       | Part of a user's multi-modal message.                                                     |                      |
| Enhancements          | String   | No       | The Vision enhancement features requested for the chat.                                   |                      |
| Temperature           | String   | No       | The sampling temperature to use, between 0 and 2. The default is `1`.                     |                      |
| Number of completions | String   | No       | How many completions to generate for each prompt. The default is `1`.                     |                      |
| Stream                | Dropdown | Yes      | Whether to stream back partial progress: **False** or **True**. The default is **False**. | **False**            |
| Stop                  | String   | No       | Up to four sequences where the API stops generating further tokens.                       |                      |
| Max tokens            | String   | No       | The maximum number of tokens to generate in the completion.                               |                      |
| Presence penalty      | String   | No       | Positive values penalize new tokens based on whether they appear in the text so far.      |                      |
| Frequency penalty     | String   | No       | Positive values penalize new tokens based on their existing frequency in the text so far. |                      |
| Logit bias            | String   | No       | Modifies the likelihood of specified tokens appearing in the completion.                  |                      |
| User                  | String   | No       | A unique identifier representing your end user.                                           |                      |
| Tools                 | String   | No       | A list of tools the model can call.                                                       |                      |
| Data sources          | String   | No       | Additional resource data.                                                                 |                      |

#### Output

The connector returns the HTTP response of the Azure OpenAI REST API as an object with the `status`, `headers`, and `body` fields. The `body` field contains the response of the model. Learn more about the response format in [REST connector response](/components/connectors/protocol/rest.md#response).

## Usage example

Assume you deployed a `gpt-35-turbo` model as `mydeployment` on the resource `myresource`, and created a connector secret named `AZURE_OAI_SECRET` that holds your API key. To get an answer to a question, configure the connector as follows:

| Property         | Value                                                            |
| :--------------- | :--------------------------------------------------------------- |
| API key          | `{{secrets.AZURE_OAI_SECRET}}`                                   |
| Operation        | **Chat completion**                                              |
| Resource name    | `myresource`                                                     |
| Deployment ID    | `mydeployment`                                                   |
| API version      | `2024-02-01`                                                     |
| Message role     | **User**                                                         |
| Message content  | `What is the age of the Universe?`                               |
| Messages context | `=[{"role": "system", "content": "You are helpful assistant."}]` |
| Result variable  | `myOpenAIResponse`                                               |

Leave the other properties empty or at their default values. The connector sends the request to `https://myresource.openai.azure.com/openai/deployments/mydeployment/chat/completions?api-version=2024-02-01`, and stores the response in `myOpenAIResponse`. See the [chat completion output](#chat-completion-output) for the response.

<ErrorHandling />

## Further resources

- [Azure OpenAI documentation](https://learn.microsoft.com/en-us/azure/ai-services/openai/)
- [Azure OpenAI models](https://learn.microsoft.com/en-us/azure/ai-services/openai/concepts/models)
- [Create an Azure OpenAI resource](https://learn.microsoft.com/en-us/azure/ai-services/openai/how-to/create-resource)
