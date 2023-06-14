---
id: aws-sqs-inbound
title: Amazon SQS inbound Connector
sidebar_label: Amazon SQS inbound Connector
description: Learn how to receive messages from [Amazon Simple Queue Service (SQS)](https://aws.amazon.com/sqs/) in your BPMN process using the SQS inbound Connector.
---

The **Amazon SQS Inbound Connector** is an inbound Connector that allows you to start or continue
a BPMN process triggered by [Amazon Simple Queue Service (SQS)](https://aws.amazon.com/sqs/).

## Prerequisites

Before using the Amazon SQS inbound Connector, ensure you have the following:

1. An active SQS Queue in your AWS account.
2. IAM credentials with the necessary permissions to receive messages from the SQS Queue. It is recommended to use Camunda secrets to store your AWS IAM credentials securely. Refer to the [Camunda secrets documentation](/components/console/manage-clusters/manage-secrets.md) for more details.

## Create an SQS inbound Connector task

To receive messages from Amazon SQS in your process, follow these steps:

1. Start building your BPMN diagram. You can use the **AWS SNS Inbound Connector** with either **Start Event** or **Intermediate Catch Event** building blocks.
2. Select the appropriate element and change its template to an SQS inbound Connector.
   ![the appropriate element](../img/connectors-aws-sqs-start-event-choose-connector.png)
   ![the appropriate element](../img/connectors-aws-sqs-catch-event-choose-connector.png)
3. Fill in all the required properties for the Connector, such as the AWS region, SQS Queue URL, and the visibility timeout.
4. Complete your BPMN diagram by adding other necessary elements and connectors.
5. Deploy the diagram to activate the SQS Inbound Connector.

## Configure the SQS inbound Connector

To configure the SQS inbound Connector and receive messages from your SQS Queue, follow these steps:

1. Set the relevant IAM key and secret pair in the **Authentication** section. For example, `secrets.MY_AWS_ACCESS_KEY`. The value can be plain text, but this is not recommended due to security concerns.
2. In the **Queue Properties** section, set the URL of your SQS Queue and its region.
3. In the **Message polling properties** section, set the polling wait time. This is the duration (in seconds) for which the call waits for a message to arrive in the queue before returning. See the [official documentation](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-short-and-long-polling.html) for more details.
4. (Optional) In the **Use next attribute names for activation condition** section, set an array of **Attribute names** or **Message attribute name** (e.g., `["attributeName1", "attributeName2"]`) to receive messages from the queue with specific metadata. Learn more about message metadata [here](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-message-metadata.html).
5. (Optional) Configure the **Activation Condition**. For example, if an external message has the body `{"messageId": 1, "body": "Hi team", "messageAttributes":{"key":{"stringValue":"value"}}...}`, the **Activation Condition** value might look like `=(messageAttributes.key.stringValue="value")`. Leave this field empty to receive all messages every time.

   ![activation condition](../img/connectors-aws-sqs-start-event-activation.png)

6. Set **Variable mapping**. For example, to get only the message body, you can set `{resultBody: body}` in the **Result expression**. Learn more about **Variable mapping** [here](../use-connectors/index.md).

When using the **AWS SQS Inbound Connector** with an **Intermediate Catch Event**, fill in the **Correlation key (process)** and **Correlation key (payload)**.

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

Learn more about **Variable mapping** [here](../use-connectors/index.md).

## Next Steps

- Explore more about [Amazon Simple Queue Service (SQS)](https://aws.amazon.com/sqs/) and its capabilities.
- Learn about [other connectors available](./available-connectors-overview.md) in Camunda to integrate with different systems and services.
- Learn more about using connectors [here](../use-connectors/index.md).
- Learn more about inbound connectors [here](../use-connectors/inbound.md).
