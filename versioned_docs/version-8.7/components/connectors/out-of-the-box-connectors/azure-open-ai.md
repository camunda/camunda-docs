---
id: azure-open-ai
title: Azure OpenAI Connector
sidebar_label: Azure OpenAI
description: Interact with Azure OpenAI from your BPMN process.
---

The **Azure OpenAI Connector** is an outbound Connector that allows you to interact with
[Azure OpenAI](https://azure.microsoft.com/en-us/products/ai-services/openai-service) models from your BPMN processes.

The **Azure OpenAI Connector** currently supports only prompt operations:
[`completions`](https://learn.microsoft.com/en-us/azure/ai-services/openai/reference#completions),
[`chat completions`](https://learn.microsoft.com/en-us/azure/ai-services/openai/reference#chat-completions), and
[`completions extensions`](https://learn.microsoft.com/en-us/azure/ai-services/openai/reference#completions-extensions).

Refer the [official models documentation](https://learn.microsoft.com/en-us/azure/ai-services/openai/concepts/models)
to find out if a desired model supports the operations mentioned.

## Prerequisites

To begin using the **Azure OpenAI Connector**, ensure you have created and deployed an Azure OpenAI resource.
A valid Azure OpenAI API key is also required.

Learn more at the [official Azure OpenAI portal entry](https://learn.microsoft.com/en-us/azure/ai-services/openai/how-to/create-resource).

## Create an Azure OpenAI Connector task

import ConnectorTask from '../../../components/react-components/connector-task.md'

<ConnectorTask/>

## Make your Azure OpenAI Connector executable

To work with the **Azure OpenAI Connector**, fill all mandatory fields.

## Authentication

Fill the **API key** field with a valid Azure OpenAI API key.
[Learn more](https://learn.microsoft.com/en-us/azure/ai-services/openai/quickstart?tabs=command-line%2Cpython-new&pivots=rest-api#retrieve-key-and-endpoint) about obtaining a key.

### Create a new Connector secret

Keep your **API key** safe and avoid exposing it in the BPMN `xml` file by creating a secret:

1. Follow our [guide for creating secrets](/components/console/manage-clusters/manage-secrets.md).
2. Name your secret (for example, `AZURE_OAI_SECRET`) so you can reference it later in the Connector.

## Operation

Select the desired operation from the **Operation** dropdown.
Fill in the **Resource name**, the **Deployment ID**, and the **API version** related to your operation. Ensure the
deployed [model](https://learn.microsoft.com/en-us/azure/ai-services/openai/concepts/models) supports the selected operation.

### Completion, chat completion, and completion extension

- For **completion** details, refer to the related [Microsoft reference documentation](https://learn.microsoft.com/en-us/azure/ai-services/openai/reference#completions).
- For **chat completion** details, refer to the related [Microsoft reference documentation](https://learn.microsoft.com/en-us/azure/ai-services/openai/reference#chat-completions).
- For **completion extension** details, refer to the related [Microsoft reference documentation](https://learn.microsoft.com/en-us/azure/ai-services/openai/reference#completions-extensions).

## Handle Connector response

The **Azure OpenAI Connector** is a protocol Connector, meaning it is built on top of the **HTTP REST Connector**. Therefore,
handling response is still applicable [as described](/components/connectors/protocol/rest.md#response).

## Usage example

### Chat completions

Assume you have deployed a `gpt-35-turbo` model with the following URL:
`https://myresource.openai.azure.com/openai/deployments/mydeployment/completions?api-version=2024-02-01`, and created a
Connector secret with the name `AZURE_OAI_SECRET`.

Consider the following input:

- **API key**: `{{secrets.AZURE_OAI_SECRET}}`
- **Operation**: `Chat completion`
- **Resource name**: `myresource`
- **Deployment ID**: `mydeployment`
- **API version**: `2024-02-01`
- **Message role**: `User`
- **Message content**: `What is the age of the Universe?`
- **Message context**: `=[{"role": "system", "content": "You are helpful assistant."}]`
- Leave the rest of the params blank or default
- **Result variable**: `myOpenAIResponse`

In the `myOpenAIResponse` you will find the following result:

```json
{
   "status": 200,
   "headers": {
    ...
   },
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
      "created": "...",
      "id": "...",
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
