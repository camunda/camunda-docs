---
id: openai
title: OpenAI Connector
sidebar_label: OpenAI
description: Send messages to OpenAI from your BPMN process using the OpenAI Connector Connector.
---

The **OpenAI Connector** is an outbound Connector that allows you to use [ChatGPT](https://platform.openai.com/docs/guides/chat/chat-completions-beta)
or [Moderation API](https://platform.openai.com/docs/guides/moderation/moderation) in your BPMN process.

## Prerequisites

To use the **OpenAI Connector**, create an OpenAI account and create an API key.

Refer to the [OpenAI Platform](https://platform.openai.com/docs/quickstart) documentation for a detailed setup guide.

:::note
Use Camunda secrets to avoid exposing your sensitive data, such as your OpenAI API key, as plain text. Follow our documentation on [managing secrets](/components/console/manage-clusters/manage-secrets.md) to learn more.
:::note

## Create an OpenAI Connector task

import ConnectorTask from '../../../components/react-components/connector-task.md'

<ConnectorTask/>

## Make your OpenAI Connector executable

To work with the **OpenAI Connector**, fill all mandatory fields.

## Authentication

To use the **OpenAI Connector**, obtain an API key from OpenAI. To create an OpenAI account and learn more about API keys, visit the [OpenAI Platform](https://platform.openai.com/) documentation.

### Create a new Connector secret

Keep your **API key** safe and avoid exposing it in the BPMN `xml` file by creating a secret:

1. Follow our [guide for creating secrets](/components/console/manage-clusters/manage-secrets.md).
2. Name your secret (i.e `OPENAI_API_KEY`) so you can reference it later in the Connector.

### Configure the API key

Select the **OpenAI API key** field in the **Authentication** section and set it to the secret you created (e.g. `{{secrets.OPENAI_API_TOKEN}}`).

## Operations

The **OpenAI Connector** currently supports two operation types in the **Operation** dropdown list: **Chat** and **Moderation**.

## Chat

With the **Chat** operation, you can interact with OpenAI chat-based language models.

### Model

The **Model** dropdown list allows you to select the model.

Refer to the [Models](https://platform.openai.com/docs/models/models) section of OpenAI documentation for detailed information about models.

#### Custom model version

The **Model** dropdown list does not contain all available models.

To use a model that is not listed, use the **Custom** option and provide the model name in the **Custom model version** field that appears.

:::note
Selection of models is user-specific and depends on your account privileges. For this reason, GPT-4
may appear as non-existing when you attempt to use it, although it is defined in the element template.
:::

### Temperature

The **Temperature** field controls the randomness of the model's output. Lower temperatures make the model more deterministic and less random, while higher temperatures make the model more random.

Accepted values are between `0` and `2` (add a leading `0` for values less than `1`), and you can use two digits after the decimal point.

### System message

The **System message** field allows you to provide initial instructions for the model, and helps set the behavior of the assistant.

For example, if you want ChatGPT to translate the prompt into a different language instead of interpreting the questions contained in the prompt, you can set the **System message** to
`You are a translator bot. You provide literal translation of inputs from English into German. You do not interpret the input.`

### Chat history

OpenAI API doesn't store message history for ChatGPT. Therefore, it is up to you as a process developer to decide if and how you should retain the chat history.

The **Chat history** input field may contain the history of previous messages or examples of the desired behavior.
Following the translation example above, you can provide some translation examples to make the expectations clearer.

Chat history consumed by this Connector follows the chat format described in the corresponding part of [OpenAI documentation](https://platform.openai.com/docs/guides/chat/introduction).

### Prompt

While **System message** and **Chat history** fields are optional and provide the model with additional context, **Prompt** is the actual input.
This is the query that is used to trigger the model output.

To use the **System message**, **Chat history**, and **Prompt** together, you would follow this format:

The example below illustrates how you can use **System message**, **Chat history**, and **Prompt** together.

**System message**

```text
You are a helpful assistant.
```

**Chat history**

```
= [
{"role": "user", "content": "Who won the world series in 2020?"},
{"role": "assistant", "content": "The Los Angeles Dodgers the World series in 2020."}
]
```

**Prompt**

```text
Where was it played?
```

In this example, the chat history provides the context of a user asking who won the World Series in 2020, and the assistant providing the correct answer that the Los Angeles Dodgers won. The prompt, "Where was it played?" is the follow-up question that seeks additional information about the location where the World Series took place in 2020.

:::note
Find more complex examples of prompt engineering and sample real-life use cases of ChatGPT on the OpenAI [examples](https://platform.openai.com/examples) page.
:::

### Choices to generate

The numeric **Choices to generate** field determines how many alternative answers the model returns in the API response.

### Sample chat output

You can use an output mapping to map the response:

1. Use **Result Variable** to store the response in a process variable. For example, `myResultVariable`.
2. Use **Result Expression** to map fields from the response into process variables.

```
{
    "status": 200,
    "headers": {
        # response headers
    },
    "body": {
        "id": "chatcmpl-6ws27w7nADFLWp7KD3dhjiUmP0kfu",
        "object": "chat.completion",
        "created": 1679488747,
        "model": "gpt-3.5-turbo-0301",
        "usage": {
            "prompt_tokens": 16,
            "completion_tokens": 79,
            "total_tokens": 95
        },
        "choices": [
            {
                "message": {
                    "role": "assistant",
                    "content": "ChatGPT has gained significant attention in recent years, especially with the development and advancement of Natural Language Processing (NLP) tools used in chatbots and virtual assistants."
                },
                "finish_reason": "stop",
                "index": 0
            }
        ]
    }
}
```

## Moderation

It is recommended to use the Moderation API to sanitize inputs and outputs of the language model. You will be able to prevent violation of OpenAI policies and displaying the potentially unsafe content in your system.

### Evaluation input

### Sample moderation output

Output contains the evaluation result broken down by violation categories. To learn more about Moderation output, visit the [OpenAI documentation](https://platform.openai.com/docs/guides/moderation/moderation).

```
{
    "status": 200,
    "headers": {
        # response headers
    },
    "body": {
        "id": "modr-6wtH8E1f2W533qdQAzq8dUpmKRVCV",
        "model": "text-moderation-004",
        "results": [
            {
                "flagged": false,
                "categories": {
                    "sexual": false,
                    "hate": false,
                    "violence": false,
                    "self-harm": false,
                    "sexual/minors": false,
                    "hate/threatening": false,
                    "violence/graphic": false
                },
                "category_scores": {
                    "sexual": 1.0084246241603978E-5,
                    "hate": 5.5422344303224236E-5,
                    "violence": 8.184280159184709E-5,
                    "self-harm": 1.3117542607687938E-7,
                    "sexual/minors": 4.457491709075612E-9,
                    "hate/threatening": 9.144552337581047E-10,
                    "violence/graphic": 1.770446012017146E-8
                }
            }
        ]
    }
}
```
