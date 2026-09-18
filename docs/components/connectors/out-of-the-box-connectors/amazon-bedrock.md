---
id: amazon-bedrock
sidebar_label: Amazon Bedrock
title: Amazon Bedrock connector
description: Interact with the Amazon Bedrock connector from your BPMN process.
---

The **Amazon Bedrock connector** is an outbound connector that allows you to interact with
[Amazon Bedrock](https://aws.amazon.com/bedrock/) from your BPMN process.

## Prerequisites

To use the **Amazon Bedrock connector**, you need to have an AWS account with an access key and secret key to
execute [`InvokeModel`](https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_InvokeModel.html) or
[`Converse`](https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_Converse.html) actions.

The necessary models must be enabled beforehand on the region you are operating from. See more about
this [in the Amazon Bedrock user guide](https://docs.aws.amazon.com/bedrock/latest/userguide/model-access.html).

Learn more about Amazon bedrock in
the [official Bedrock documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html).

:::note
Use secrets to store credentials and avoid exposing sensitive information directly from the process. Refer
to [managing secrets](/components/hub/organization/manage-clusters/manage-secrets.md) to learn more.
:::

## Create an Amazon Bedrock connector task

import ConnectorTask from '../../../components/react-components/connector-task.md'

<ConnectorTask/>

## Authentication

To authenticate, choose one of the methods from the **Authentication** dropdown. The supported options are:

- Use **Credentials** if you have a valid pair of access and secret keys provided by your AWS account administrator. The access key provides permissions to the Amazon Bedrock `InvokeModel` and/or `Converse` actions, as mentioned in the [AWS documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/security_iam_id-based-policy-examples.html#security_iam_id-based-policy-examples-perform-actions-pt).

:::note
This option is applicable for both SaaS and Self-Managed users.
:::

- Use **Default Credentials Chain** if your system is configured as an implicit authentication mechanism, such as role-based authentication, credentials supplied via environment variables, or files on target host. This approach uses the [Default Credential Provider Chain](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/credentials.html) to resolve required credentials.

:::note
This option is applicable only for Self-Managed or hybrid distributions.
:::

For more information on authentication and security in Amazon Bedrock, see [Amazon Bedrock security and privacy](https://aws.amazon.com/bedrock/security-compliance/).

## Region

In the **Region** field write the region of the deployed endpoint.

## Action

There are two possible actions with the Amazon Bedrock connector: `InvokeModel` and `Converse`.

### InvokeModel

This action is meant to invoke a model with a raw payload.

A model ID must be specified. Find all the available options for Amazon
Bedrock [in the model ID documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/model-ids.html).

:::note
Ensure the model is available in your region, that your model can invoke the `Invoke Model` action, and you are a user with adequate rights.
:::

The payload is dependent on the model used, and you can find the different
payloads [in the model parameters documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/model-parameters.html).

1. Use **Result Variable** to store the response in a process variable. For example, `myResultVariable`.
2. Use **Result Expression** to map fields from the response into process variables.

The response is dependent on the model used, and you can find the different
responses [in the model parameters documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/model-parameters.html).

#### Example

If using the model `Jamba-instruct` with model ID `ai21.jamba-instruct-v1:0`, and looking at the [model parameters Jamba documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/model-parameters-jamba.html), the payload could be as follows:

```json
{
  "messages": [{ "role": "user", "content": "Hello" }],
  "max_tokens": 256,
  "top_p": 0.8,
  "temperature": 0.7
}
```

The FEEL mapping could be as follows:

```feel
= { AIResponse: response.body.choices[1].message.content }
```

### Converse

This action is meant to start or continue a conversation with a model.

A model ID must be specified. Find all available model IDs for Amazon
Bedrock [in the model ID documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/model-ids.html).

:::note
Ensure the model is available in your region, that your model can invoke the `Converse` action, and you are a user with adequate rights.
:::

- `New Message` is either the first message (to start a conversation) or is the next message from an already started conversation.
- `Documents` is a list of documents to include as part of your **new message**.
  - Each document uses a [document source](/components/document-handling/send-document-to-external-system.md#document-sources): a **Camunda document** reference, **inline content** built from process data, or an **external document** URL. Use the **Single/Multiple** toggle to provide one document or a FEEL array of documents.
  - See [Amazon Bedrock supported document formats](https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-ds.html) for currently supported file formats.
  - To use a **Camunda document**, upload it first — [using the Orchestration Cluster REST API](/apis-tools/orchestration-cluster-api-rest/specifications/create-document.api.mdx) for example — and assign the result to a variable in **Start Process instance** so you can reference it in the **Documents** field.
- `Message History` is the history of the conversation that should always be passed. If not set, this will be a new conversation.

1. Use **Result Variable** to store the response in a process variable. For example, `myResultVariable`.
2. Use **Result Expression** to map fields from the response into process variables.

The **Response** is a list of consecutive messages of the user and the assistant.

:::info important
The current implementation supports the assistant's responses only in text format.
:::

Ideally, the message's history must transit within the process and be the input of this `Converse` task with the new message.

:::note
Starting from version 8.7.0, the Amazon Bedrock connector supports consuming documents as inputs for conversations. Review the **Document** field in the properties panel where the document reference can be provided. See additional details and limitations in [document handling](/components/document-handling/getting-started.md).
:::

## Extract data from the response

The `InvokeModel` and `Converse` actions return different response shapes, so the FEEL expression you write in **Result Expression** differs between them. The following examples use an Anthropic Claude model and assume the reserved `response` variable, which holds the connector's raw output.

### InvokeModel response shape

The connector wraps the raw AWS response in a `body` field without changing it, so `response.body` holds exactly what the model returns. For Anthropic Claude models, `response.body` follows the [Anthropic Claude Messages API response format](https://docs.aws.amazon.com/bedrock/latest/userguide/model-parameters-anthropic-claude-messages-request-response.html):

| Field            | Description                                    |
| ---------------- | ---------------------------------------------- |
| `content`        | Array of content blocks generated by the model |
| `content[].type` | Content block type, typically `text`           |
| `content[].text` | Generated text for a `text` content block      |

For a simple text prompt, the model returns a single content block, so you can extract the assistant's reply into a process variable named `AIResponse` as follows:

```feel
= { AIResponse: response.body.content[1].text }
```

:::note
Other model families, such as Amazon Titan and Nova, Meta Llama, and Cohere, return a different `InvokeModel` response shape. Check the [model parameters documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/model-parameters.html) for the model you use before writing a Result Expression.
:::

### Converse response shape

The `Converse` action doesn't return the raw AWS Converse API response. Instead, it returns the full, updated conversation as an array of messages, adding the assistant's reply to any message history you passed in. Each message has a `role` (`user` or `assistant`) and a `contentList` array, and each item in `contentList` has a `text` field.

The assistant's reply is always the last message in the returned array. Use FEEL's negative indexing to reference it regardless of how many prior messages the conversation contains:

```feel
= { AIResponse: response[-1].contentList[1].text }
```

AWS recommends the [Converse API](https://docs.aws.amazon.com/bedrock/latest/userguide/model-parameters-anthropic-claude-messages.html#model-parameters-anthropic-claude-messages-overview) over `InvokeModel` when you want a process to work with more than one model family, because it uses one request and response shape across all Bedrock model families.

### Configure a system prompt

For the `InvokeModel` action, you build the request yourself in the **Payload** field, so you can add a system prompt exactly as the model's native API expects. For Anthropic Claude models, add a top-level `system` field to the payload, as described in [system prompts for Anthropic Claude models](https://docs.aws.amazon.com/bedrock/latest/userguide/model-parameters-anthropic-claude-messages.html#model-parameters-anthropic-claude-messages-system-prompts).

The `Converse` action doesn't currently expose a system prompt field in the connector's element template.
