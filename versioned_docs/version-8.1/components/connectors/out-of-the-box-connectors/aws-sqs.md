---
id: aws-sqs
title: Amazon Simple Queue Service Connector
sidebar_label: Amazon SQS Connector
description: Send messages to Amazon Simple Queue Service (SQS) from your BPMN process.
---

The **Amazon SQS Connector** allows you to connect your BPMN service with [Amazon Simple Queue Service (SQS)](https://aws.amazon.com/sqs/).

## Prerequisites

To use the **Amazon SQS Connector**, you need to have an SQS Queue, IAM key, and secret pair with the `sqs:SendMessage` policy relative to your SQS.

:::note
It is highly recommended not to expose your AWS IAM credentials as plain text. Instead, use Camunda secrets. See this [appendix entry](#how-do-i-store-aws-iam-secrets-for-my-sqs-connector) and the [SQS Developer Guide](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-basic-examples-of-iam-policies.html) to learn more.
:::

## Create an Amazon SQS Connector task

To use the **Amazon SQS Connector** in your process, either change the type of existing task by clicking on it and using the wrench-shaped **Change type** context menu icon, or create a new Connector task by using the **Append Connector** context menu. Follow our [guide on using Connectors](../use-connectors.md) to learn more.

## Make your Amazon SQS Connector for sending messages executable

![AWS SQS Filled](../img/connectors-aws-sqs-filled.png)

To make your Amazon SQS Connector for sending messages executable, take the following steps:

1. Set the relevant IAM key and secret pair in the **Authentication** section. For example, `secrets.MY_AWS_ACCESS_KEY`. The value can be plain text, but this is not recommended due to security concerns.
2. In the **Queue Properties** section, set the URL of your SQS queue as well as its region.
3. In the **Input message data** section, fill out the field **Message body** with the data you would like to submit to the queue. The field requires FEEL input.
4. (Optional) In the **Input message data** section, fill out the field **Message attributes** to set optional message metadata. This field requires FEEL input. See the relevant [appendix](#what-are-the-message-attributes-and-how-can-i-set-them) section to find out more about this field.

## Amazon SQS Connector response

The **Amazon SQS Connector** returns the SQS message identifier of a newly created message.
The response contains a `messageId` variable.

You can use an output mapping to map the response:

1. Use **Result Variable** to store the response in a process variable. For example, `myResultVariable`.
2. Use **Result Expression** to map fields from the response into process variables. For example:

```
= {
  "createdMessageID": response.messageId
}
```

## Appendix & FAQ

### What are the message attributes and how can I set them?

Amazon SQS lets you include structured metadata (such as timestamps, geospatial data, signatures, and identifiers) with messages using message attributes.
The **Amazon SQS Connector** allows you to include non-binary message attributes in the section **Input message data**. The message attribute value must be composed to be compliant with Amazon SQS [message attribute data format](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-message-metadata.html#sqs-message-attributes).

Example of a valid message attribute as a FEEL value:

```
= {
  "timestamp":{
    "StringValue":today(),
    "DataType":"String"
  },
  "messageSubmittedBy":{
    "StringValue":"user12345",
    "DataType":"String"
  }
}
```

![AWS SQS Message Attributes](../img/connectors-aws-sqs-message-attributes.png)

### How do I store AWS IAM Secrets for my SQS Connector?

It is highly recommended storing your secret AWS IAM credentials as Camunda secrets. Follow our documentation on [managing secrets](../../../components/console/manage-clusters/manage-secrets.md) to learn more.
