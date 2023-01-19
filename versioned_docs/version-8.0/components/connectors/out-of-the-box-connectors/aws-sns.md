---
id: aws-sns
title: Amazon Simple Notification Service Connector
sidebar_label: Amazon SNS Connector
description: Publish messages to Amazon Simple Notification Service (SNS) from your BPMN process.
---

The **Amazon Simple Notification Service (SNS)** Connector allows you to connect your BPMN service with [Amazon Simple Notification Service (SNS)](https://aws.amazon.com/sns/).

## Prerequisites

To use the **Amazon SNS Connector**, you need to have an SNS Topic, IAM key, and secret pair with the `sns:Publish` policy relative to your SNS.

:::note
It is highly recommended not to expose your AWS IAM credentials as plain text. Instead, use Camunda secrets. See an [appendix entry](#how-do-i-store-aws-iam-secrets-for-my-sns-connector) and the [SNS Developer Guide](https://docs.aws.amazon.com/sns/latest/dg/sns-using-identity-based-policies.html#sns-policy-keys) to learn more.
:::

## Create an Amazon SNS Connector task

To use the **Amazon SNS Connector** in your process, either change the type of existing task by clicking on it and using the wrench-shaped **Change type** context menu icon, or create a new Connector task by using the **Append Connector** context menu. Follow our [guide to using Connectors](../use-connectors.md) to learn more.

## Make your Amazon SNS Connector for sending messages executable

![AWS SNS Filled](../img/connectors-aws-sns-filled.png)

To make your Amazon SNS Connector for sending messages executable, take the following steps:

1. Set the relevant IAM key and secret pair in the **Authentication** section. For example, `secrets.MY_AWS_ACCESS_KEY`. The value can be plain text, but this is not recommended due to security concerns.
2. In the **Topic Properties** section, set the topic ARN of your SNS topic as well as its region.
3. In the **Input message data** section, fill out the field **Message** with the data you would like to publish to the topic. The field requires FEEL input.
4. (Optional) In the **Input message data** section, fill out the field **Message attributes** to set optional message metadata. This field requires FEEL input. See the relevant [appendix](#what-are-the-message-attributes-and-how-can-i-set-them) section to find out more about this field.
5. (Optional) In the **Input message data** section, fill out the field **Subject** to set optional message subject. FEEL input of the field is optional. Length must be less than 100 characters.

## Amazon SNS Connector response

The **Amazon SNS Connector** returns the SNS message identifier of a newly created message.
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

Amazon SNS lets you include structured metadata (such as timestamps, geospatial data, signatures, and identifiers) with messages using message attributes.
The **Amazon SNS Connector** allows you to include non-binary message attributes in the **Input message data** section. The message attribute value must be composed to be compliant with Amazon SNS [message attribute data format](https://docs.aws.amazon.com/sns/latest/dg/sns-message-attributes.html).

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

### How do I store AWS IAM secrets for my SNS Connector?

It is highly recommended storing your secret AWS IAM credentials as Camunda secrets. Follow our documentation on [managing secrets](../../../components/console/manage-clusters/manage-secrets.md) to learn more.
