---
id: hugging-face
title: Hugging Face Connector
sidebar_label: Hugging Face
description: Interact with Hugging Face models from your BPMN process.
---

The **Hugging Face Connector** is an outbound Connector that allows you to interact with
[Hugging Face](https://huggingface.co/) models from your BPMN processes.

## Prerequisites

To begin using the **Hugging Face Connector**, you need to have a valid
[API key](https://huggingface.co/docs/api-inference/quicktour#get-your-api-token),
and a model deployed with [Inference API](https://huggingface.co/docs/api-inference/index).

## Create a Hugging Face Connector task

import ConnectorTask from '../../../components/react-components/connector-task.md'

<ConnectorTask/>

## Make your Hugging Face Connector executable

To work with the **Hugging Face Connector**, fill all mandatory fields.

## Authentication

Fill the **Hugging Face API key** field with a valid Hugging Face API key.

### Create a new Connector secret

Keep your **API key** safe and avoid exposing it in the BPMN `xml` file by creating a secret:

1. Follow our [guide for creating secrets](/components/console/manage-clusters/manage-secrets.md).
2. Name your secret (for example, `HUGGING_FACE_SECRET`) so you can reference it later in the Connector.

## Payload

In the **Model** field, enter a model name you wish to use in your BPMN process, for example, `gpt2` if you wish to use
the [GPT2 model](https://huggingface.co/openai-community/gpt2).

In the **Input** field, enter input parameters for your model, for example, `{"inputs":"What is the Capital of Germany?"}`.

## Handle Connector response

The **Hugging Face Connector** is a protocol Connector, meaning it is built on top of the **HTTP REST Connector**. Therefore,
handling response is still applicable [as described](/components/connectors/protocol/rest.md#response).

## Usage example

Let's assume you want to use the [BART (large-sized model), fine-tuned on CNN Daily Mail](https://huggingface.co/facebook/bart-large-cnn) model,
and created the `HUGGING_FACE_SECRET` secret containing your Hugging Face API key.

Consider the following input:

- **Hugging Face API key**: `{{secrets.HUGGING_FACE_SECRET}}`
- **Model**: `facebook/bart-large-cnn`
- **Input**:

```json
{
  "inputs": "Java is a high-level, class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible. It is a general-purpose programming language intended to let programmers write once, run anywhere (WORA), meaning that compiled Java code can run on all platforms that support Java without the need to recompile. Java applications are typically compiled to bytecode that can run on any Java virtual machine (JVM) regardless of the underlying computer architecture. The syntax of Java is similar to C and C++, but has fewer low-level facilities than either of them. The Java runtime provides dynamic capabilities (such as reflection and runtime code modification) that are typically not available in traditional compiled languages. As of March 2024, Java 22 is the latest version. Java 8, 11, 17, and 21 are previous LTS versions still officially supported.",
  "parameters": { "max_length": 75, "temperature": 10 },
  "options": { "use_cache": "false" }
}
```

- **Result variable**: `myHuggingFaceResponse`.

In the `myHuggingFaceResponse` you will find the following result:

```json
{
   "status":200,
   "headers":{
...
   },
   "body":[
      {
         "summary_text":" Java is a high-level, class-based, object-oriented programming language. It is intended to let programmers write once, run anywhere. Java applications are typically compiled to bytecode that can run on any Java virtual machine (JVM) regardless of the underlying computer architecture. As of March 2024, Java 22 is the latest version."
      }
   ]
}
```
