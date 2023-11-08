---
id: amazon-sqs
title: Amazon Simple Queue Service Connector
sidebar_label: AWS SQS Connector
description: Send messages to Amazon Simple Queue Service (SQS) from your BPMN process.
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

<Tabs groupId="amazonsqs" defaultValue="outbound" queryString values={
[
{label: 'Outbound', value: 'outbound' },
{label: 'Inbound', value: 'inbound' }
]}>

<TabItem value='outbound'>

The **Amazon SQS Connector** is an outbound Connector that allows you to connect your BPMN service with [Amazon Simple Queue Service (SQS)](https://aws.amazon.com/sqs/) to send messages.

## Prerequisites

To use the **Amazon SQS Connector**, you need to have an SQS Queue, IAM key, and secret pair with the `sqs:SendMessage` policy relative to your SQS.
It is highly recommended not to expose your AWS IAM credentials as plain text but rather use Camunda secrets. Refer to an [appendix entry](#how-do-i-store-aws-iam-secrets-for-my-sqs-connector) and the [SQS Developer Guide](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-basic-examples-of-iam-policies.html) to learn more.

## Create an Amazon SQS Connector task

To use the **Amazon SQS Connector** in your process, either change the type of existing task by clicking on it and using the wrench-shaped **Change type** context menu icon, or create a new Connector task by using the **Append Connector** context menu. Follow our [guide on using Connectors](/components/connectors/use-connectors/index.md) to learn more.

## Make your Amazon SQS Connector for sending messages executable

To make your Amazon SQS Connector for sending messages executable, take the following steps:

1. Set the relevant IAM key and secret pair in the **Authentication** section. For example, `{{secrets.MY_AWS_ACCESS_KEY}}`. The value can be plain text, but this is not recommended due to security concerns.
2. In the **Queue Properties** section, set the URL of your SQS queue, its region, and its type.
3. In the **Input message data** section, fill out the field **Message body** with the data you would like to submit to the queue. The field requires FEEL input.
4. (Optional) In the **Input message data** section, fill out the field **Message attributes** to set optional message metadata. This field requires FEEL input. Refer to the relevant [appendix](#what-are-the-message-attributes-and-how-can-i-set-them) section to find out more about this field.
5. (FIFO only) If you are using a queue of type **FIFO**, a **Message Group ID** must be [provided](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/using-messagegroupid-property.html). An optional **Message Deduplication ID** can be provided as well, depending on how you [configured](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/using-messagededuplicationid-property.html) the message deduplication of the queue.

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

### How do I store AWS IAM Secrets for my SQS Connector?

It is highly recommended storing your secret AWS IAM credentials as Camunda secrets. Follow our documentation on [managing secrets](/components/console/manage-clusters/manage-secrets.md) to learn more.

</TabItem>

<TabItem value='inbound'>

The **Amazon SQS Inbound Connector** is an inbound Connector that allows you to start or continue
a BPMN process triggered by [Amazon Simple Queue Service (SQS)](https://aws.amazon.com/sqs/).

## Prerequisites

Before using the Amazon SQS inbound Connector, ensure you have the following:

1. An active SQS Queue in your AWS account.
2. IAM credentials with the necessary permissions to receive messages from the SQS Queue. It is recommended to use Camunda secrets to store your AWS IAM credentials securely. Refer to the [Camunda secrets documentation](/components/console/manage-clusters/manage-secrets.md) for more details.

## Create an SQS inbound Connector task

To receive messages from Amazon SQS in your process, follow these steps:

1. Start building your BPMN diagram. You can use the **Amazon SNS Inbound Connector** with either **Start Event** or **Intermediate Catch Event** building blocks.
2. Select the appropriate element and change its template to an SQS inbound Connector.
3. Fill in all the required properties for the Connector, such as the AWS region, SQS Queue URL, and the visibility timeout.
4. Complete your BPMN diagram by adding other necessary elements and connectors.
5. Deploy the diagram to activate the SQS Inbound Connector.

## Configure the SQS inbound Connector

To configure the SQS inbound Connector and receive messages from your SQS Queue, follow these steps:

1. Set the relevant IAM key and secret pair in the **Authentication** section. For example, `{{secrets.MY_AWS_ACCESS_KEY}}`. The value can be plain text, but this is not recommended due to security concerns.
2. In the **Queue Properties** section, set the URL of your SQS Queue and its region.
3. In the **Message polling properties** section, set the polling wait time. This is the duration (in seconds) for which the call waits for a message to arrive in the queue before returning. Refer to the [official documentation](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-short-and-long-polling.html) for more details.
4. (Optional) In the **Use next attribute names for activation condition** section, set an array of **Attribute names** or **Message attribute name** (e.g., `["attributeName1", "attributeName2"]`) to receive messages from the queue with specific metadata. Alternatively, you can leave it empty to get results with all available attributes. Learn more about message metadata [here](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-message-metadata.html).
5. (Optional) Configure the **Activation Condition**. For example, if an external message has the body `{"messageId": 1, "body": "Hi team", "messageAttributes":{"key":{"stringValue":"value"}}...}`, the **Activation Condition** value might look like `=(messageAttributes.key.stringValue="value")`. Leave this field empty to receive all messages every time.
6. Set **Variable mapping**. For example, to get only the message body, you can set `{resultBody: body}` in the **Result expression**. Learn more about **Variable mapping** [here](../use-connectors/index.md).

When using the **Amazon SQS inbound Connector** with an **Intermediate Catch Event**, fill in the **Correlation key (process)** and **Correlation key (payload)**.

- **Correlation key (process)** is a FEEL expression that defines the correlation key for the subscription. This corresponds to the **Correlation key** property of a regular **Message Intermediate Catch Event**.
- **Correlation key (payload)** is a FEEL expression used to extract the correlation key from the incoming message. This expression is evaluated in the Connector Runtime and the result is used to correlate the message.

For example, given that your correlation key is defined with `myCorrelationKey` process variable, and the request body contains `"messageAttributes":{"key":{"stringValue":"value"}}`, your correlation key settings will look like this:

- **Correlation key (process)**: `=myCorrelationKey`
- **Correlation key (payload)**: `=body.messageAttributes.key.stringValue`

Learn more about correlation keys in the [messages guide](../../../concepts/messages).

## Activate the SQS inbound Connector

Once you click the **Deploy** button, your SQS inbound Connector will be activated and publicly available. Whenever the SQS inbound Connector receives a new message, a new BPMN process will be created.

## Amazon SQS Connector response

The **Amazon SQS Connector** returns the SQS message.

You can use an output mapping to map the response:

1. Use **Result Variable** to store the response in a process variable. For example, `myResultVariable`.
2. Use **Result Expression** to map fields from the response into process variables. For example:

```
= `{resultBody:body}`
```

<!--- How does this section differ from the Amazon SQS Connector response section above the appendix? --->

Learn more about **Variable mapping** [here](../use-connectors/index.md).

## Next Steps

- Explore more about [Amazon Simple Queue Service (SQS)](https://aws.amazon.com/sqs/) and its capabilities.
- Learn about [other Connectors available](./available-connectors-overview.md) in Camunda to integrate with different systems and services.
- Learn more about [using Connectors](../use-connectors/index.md).
- Learn more about [inbound Connectors](../use-connectors/inbound.md).

</TabItem>

</Tabs>
