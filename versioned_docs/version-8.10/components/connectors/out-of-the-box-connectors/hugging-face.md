---
id: hugging-face
title: Hugging Face connector
sidebar_label: Hugging Face
description: Interact with Hugging Face models from your BPMN process.
---

The **Hugging Face connector** is an outbound connector that allows you to interact with
[Hugging Face](https://huggingface.co/) models from your BPMN processes.

## Prerequisites

To begin using the **Hugging Face connector**, you need to have a valid
[API key](https://huggingface.co/settings/tokens),
and a model available through [Hugging Face Inference Providers](https://huggingface.co/docs/inference-providers/index).

## Create a Hugging Face connector task

import ConnectorTask from '../../../components/react-components/connector-task.md'

<ConnectorTask/>

## Make your Hugging Face connector executable

To work with the **Hugging Face connector**, fill all mandatory fields.

## Authentication

Fill the **Hugging Face API key** field with a valid Hugging Face API key.

### Create a new connector secret

Keep your **API key** safe and avoid exposing it in the BPMN `xml` file by creating a secret:

1. Follow our [guide for creating secrets](/components/saas/clusters/manage-secrets.md).
2. Name your secret (for example, `HUGGING_FACE_SECRET`) so you can reference it later in the connector.

## Payload

The connector sends a chat completion request to the Hugging Face router endpoint `https://router.huggingface.co/v1/chat/completions`.

| Field        | Description                                                                                                                                                                                    |
| :----------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Model ID** | The full model repository ID, for example, `meta-llama/Llama-3.2-3B-Instruct`. Browse models on [Hugging Face](https://huggingface.co/models).                                                 |
| **Messages** | A FEEL expression that returns the chat messages array, in the format `[{"role": "user", "content": "Your message"}]`. Use the `system` role for instructions and the `user` role for queries. |

## Handle connector response

The **Hugging Face connector** is a protocol connector, meaning it is built on top of the **HTTP REST connector**. Therefore,
handling response is still applicable [as described](/components/connectors/protocol/rest.md#response).

## Usage example

Let's assume you want to summarize a text with the `meta-llama/Llama-3.2-3B-Instruct` model, and you created the `HUGGING_FACE_SECRET` secret containing your Hugging Face API key.

Consider the following input:

- **Hugging Face API key**: `{{secrets.HUGGING_FACE_SECRET}}`
- **Model ID**: `meta-llama/Llama-3.2-3B-Instruct`
- **Messages**, where `inputText` is a process variable that holds the text to summarize:

```feel
=[
  {"role": "system", "content": "Summarize the text in one sentence."},
  {"role": "user", "content": inputText}
]
```

- **Result variable**: `myHuggingFaceResponse`

The connector stores the whole HTTP response in `myHuggingFaceResponse`. To store only the generated text, use the following **Result expression**:

```feel
={summary: response.body.choices[1].message.content}
```
