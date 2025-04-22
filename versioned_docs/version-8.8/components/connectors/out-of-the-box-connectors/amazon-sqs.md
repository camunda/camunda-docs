---
id: amazon-sqs
title: Amazon Simple Queue Service Connector
sidebar_label: AWS SQS
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

:::note

Use Camunda secrets to avoid exposing your AWS IAM credentials as plain text. Refer to an [appendix entry](#how-do-i-store-aws-iam-secrets-for-my-sqs-connector) and the [SQS Developer Guide](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-basic-examples-of-iam-policies.html) to learn more.

:::

## Create an Amazon SQS Connector task

import ConnectorTask from '../../../components/react-components/connector-task.md'

<ConnectorTask/>

## Make your Amazon SQS Connector for sending messages executable

To make your Amazon SQS Connector for sending messages executable, take the following steps:

1. Choose an applicable authentication type from the **Authentication** dropdown. Learn more about authentication types in the related [appendix entry](#aws-authentication-types).
2. Set the relevant IAM key and secret pair in the **Authentication** section. For example, `{{secrets.MY_AWS_ACCESS_KEY}}`. The value can be plain text, but this is not recommended due to security concerns.
3. In the **Queue Properties** section, set the URL of your SQS queue, its region, and its type.
4. In the **Input message data** section, fill the **Message body** with the data you would like to submit to the queue. The field requires FEEL input.
5. (Optional) In the **Input message data** section, fill out the field **Message attributes** to set optional message metadata. This field requires FEEL input. Refer to the relevant [appendix](#what-are-the-message-attributes-and-how-can-i-set-them) section to find out more about this field.
6. (FIFO only) If you are using a queue of type **FIFO**, a [**Message Group ID** must be provided](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/using-messagegroupid-property.html). An optional **Message Deduplication ID** can be provided as well, depending on how you [configured](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/using-messagededuplicationid-property.html) the message deduplication of the queue.

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

Store your AWS IAM credentials as Camunda secrets to avoid exposing sensitive information. Follow our documentation on [managing secrets](/components/console/manage-clusters/manage-secrets.md) to learn more.

### AWS authentication types

There are two options to authenticate the Connector with AWS:

- Choose **Credentials** in the **Authentication** dropdown if you have a valid pair of access and secret keys provided by your AWS account administrator. This option is applicable for both SaaS and Self-Managed users.
- Choose **Default Credentials Chain (Hybrid/Self-Managed only)** in the **Authentication** dropdown if your system is configured as an implicit authentication mechanism, such as role-based authentication, credentials supplied via environment variables, or files on target host. This option is applicable only for Self-Managed or hybrid distribution. This approach uses the [Default Credential Provider Chain](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/credentials.html) to resolve required credentials.

</TabItem>

<TabItem value='inbound'>

The **Amazon SQS Inbound Connector** is an inbound Connector that allows you to start or continue
a BPMN process triggered by [Amazon Simple Queue Service (SQS)](https://aws.amazon.com/sqs/).

## Prerequisites

Before using the Amazon SQS inbound Connector, ensure you have the following:

1. An active SQS Queue in your AWS account.
2. IAM credentials with the necessary permissions to receive messages from the SQS Queue. Use Camunda secrets to store your AWS IAM credentials securely. Refer to the [Camunda secrets documentation](/components/console/manage-clusters/manage-secrets.md) for more details.

## Create an SQS inbound Connector task

To receive messages from Amazon SQS in your process, follow these steps:

1. Start building your BPMN diagram. You can use the **Amazon SNS Inbound Connector** with either **Start Event** or **Intermediate Catch Event** building blocks.
2. Select the appropriate element and change its template to an SQS inbound Connector.
3. Fill in all the required properties for the Connector, such as the AWS region, SQS Queue URL, and the visibility timeout.
4. Complete your BPMN diagram by adding other necessary elements and connectors.
5. Deploy the diagram to activate the SQS Inbound Connector.

## Configure the SQS inbound Connector

To configure the SQS inbound Connector and receive messages from your SQS Queue, follow these steps:

1. Choose an applicable authentication type from the **Authentication** dropdown. Learn more about authentication types in the related [appendix entry](#aws-authentication-types-1).
2. Set the relevant IAM key and secret pair in the **Authentication** section. For example, `{{secrets.MY_AWS_ACCESS_KEY}}`. The value can be plain text, but this is not recommended due to security concerns.
3. In the **Queue Properties** section, set the URL of your SQS Queue and its region.
4. In the **Message polling properties** section, set the polling wait time. This is the duration (in seconds) for which the call waits for a message to arrive in the queue before returning. Refer to the [Amazon documentation](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-short-and-long-polling.html) for more details. Be aware that setting the value to 0 will not take effect, as it will automatically be overridden
   with a value of 1 during runtime.
5. (Optional) In the **Use next attribute names for activation condition** section, set an array of **Attribute names** or **Message attribute name** (e.g., `["attributeName1", "attributeName2"]`) to receive messages from the queue with specific metadata. Alternatively, you can leave it empty to get results with all available attributes. Learn more about message metadata [here](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-message-metadata.html).
6. (Optional) Configure the **Activation Condition**. For example, if an external message has the body `{"messageId": 1, "body": "Hi team", "messageAttributes":{"key":{"stringValue":"value"}}...}`, the **Activation Condition** value might look like `=(messageAttributes.key.stringValue="value")`. Leave this field empty to receive all messages every time.
7. Set the **Output mapping**. For example, to get only the message body, you can set `{resultBody: body}` in the **Result expression** field. Learn more about **Output mapping** [here](../use-connectors/index.md).

### Activation condition

**Activation condition** is an optional FEEL expression field that allows for fine-tuning of the Connector activation.
For example, if an external message has the body `{"messageId": 1, "body": "Hi team", "messageAttributes":{"key":{"stringValue":"value"}}...}`, the **Activation Condition** value might look like `=(messageAttributes.key.stringValue="value")`. Leave this field empty to receive all messages every time.

By default, messages with unmatched activation conditions are not deleted from the queue. They become available for consumers again after the visibility timeout expires. You can set up a dead-letter queue where messages are forwarded after a certain number of delivery attempts.

You can also configure the Amazon SQS inbound Connector to delete messages from the queue if they don't match the activation condition. In this case, the message will not end up in the dead-letter queue.
To delete messages that don't match the activation condition, check the **Consume unmatched events** box.

| **Consume unmatched events** box | Activation condition | Outcome                                                                                          |
| -------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------ |
| Checked                          | Matched              | Message is removed from the queue                                                                |
| Unchecked                        | Matched              | Message is removed from the queue                                                                |
| Checked                          | Unmatched            | Message is removed from the queue                                                                |
| Unchecked                        | Unmatched            | Message is not removed from the queue and will be redelivered or placed in the dead-letter queue |

### Correlation

The **Correlation** section allows you to configure the message correlation parameters.

:::note
The **Correlation** section is not applicable for the plain **start event** element template of the Amazon SQS Connector. Plain **start events** are triggered by process instance creation and do not rely on message correlation.
:::

#### Correlation key

- **Correlation key (process)** is a FEEL expression that defines the correlation key for the subscription. This corresponds to the **Correlation key** property of a regular **Message Intermediate Catch Event**.
- **Correlation key (payload)** is a FEEL expression used to extract the correlation key from the incoming message. This expression is evaluated in the Connector Runtime and the result is used to correlate the message.

Example for correlation and activation condition properties (correlation by ID in the body and activation condition by message attribute):

SQS message:

```json
{
  "messageId": "12345",
  "receiptHandle": "ABCDE",
  "mD5OfBody": "1c6bb59997376e5182a88a6f582cd92a",
  "body": {
    "id": 4567,
    "value": "Hello world"
  },
  "attributes": {
    "ApproximateReceiveCount": "1",
    "SentTimestamp": "1703062074171",
    "SenderId": "333293239507",
    "ApproximateFirstReceiveTimestamp": "1703062074185"
  },
  "messageAttributes": {
    "messageName": {
      "stringValue": "myProcess",
      "binaryValue": null,
      "stringListValues": [],
      "binaryListValues": [],
      "dataType": "String"
    }
  },
  "md5OfMessageAttributes": "9de691a346c79e4fda4af06248aa9dfc"
}
```

- **Correlation key (process)**: `=4567`
- **Correlation key (payload)**: `=body.id`
- **Activation condition**: `=messageAttributes.key.stringValue="myProcess"`

Learn more about correlation keys in the [messages guide](../../../concepts/messages).

#### Message ID expression

The **Message ID expression** is an optional field that allows you to extract the message ID from the incoming message. The message ID serves as a unique identifier for the message and is used for message correlation.
This expression is evaluated in the Connector Runtime and the result is used to correlate the message.

In most cases, it is not necessary to configure the **Message ID expression**. However, it is useful if you want to ensure message deduplication or achieve certain message correlation behavior.
Learn more about how message IDs influence message correlation in the [messages guide](../../../concepts/messages#message-correlation-overview).

For example, if you want to set the message ID to the value of the `transactionId` field in the incoming message, you can configure the **Message ID expression** as follows:

```
= body.transactionId
```

#### Message TTL

The **Message TTL** is an optional field that allows you to set the time-to-live (TTL) for the correlated messages. TTL defines the time for which the message is buffered in Zeebe before being correlated to the process instance (if it can't be correlated immediately).
The value is specified as an ISO 8601 duration. For example, `PT1H` sets the TTL to one hour. Learn more about the TTL concept in Zeebe in the [message correlation guide](../../../concepts/messages#message-buffering).

### Deduplication

The **Deduplication** section allows you to configure the Connector deduplication parameters.

Not to be confused with **message deduplication**, **Connector deduplication** is a mechanism in the Connector Runtime that determines how many SQS subscriptions are created if there are multiple occurrences of the **Amazon SQS Consumer Connector** in the BPMN diagram.

By default, the Connector runtime deduplicates Connectors based on properties, so elements with the same subscription properties only result in one subscription. Learn more about deduplication in the [deduplication guide](../use-connectors/inbound.md#connector-deduplication).

To customize the deduplication behavior, check the **Manual mode** checkbox and configure the custom deduplication ID.

## Activate the SQS inbound Connector

Once you click the **Deploy** button, your SQS inbound Connector will be activated and publicly available. Whenever the SQS inbound Connector receives a new message, a new BPMN process will be created.

## Amazon SQS Connector response

The **Amazon SQS Connector** provides the SQS message as a response. Utilize output mapping to align this response with process variables:

1. Use **Result Variable** to store the response in a process variable. For example, `myResultVariable`. This approach stores the entire SQS message as a process variable named `myResultVariable`.
2. Use **Result Expression** to map fields from the response into process variables. This approach allows for more granularity. Instead of storing the entire response in one variable, you can extract specific fields from the SQS message and assign them to different process variables. This is particularly useful when you are only interested in certain parts of the message, or when different parts of the message need to be used separately in your process.
   Example:

SQS message :

```json
{
  "messageId": "12345",
  "receiptHandle": "ABCDE",
  "mD5OfBody": "1c6bb59997376e5182a88a6f582cd92a",
  "body": {
    "id": 4567,
    "value": "Hello world"
  },
  "attributes": {
    "ApproximateReceiveCount": "1",
    "SentTimestamp": "1703062074171",
    "SenderId": "33333333333",
    "ApproximateFirstReceiveTimestamp": "1703062074185"
  },
  "messageAttributes": {
    "messageName": {
      "stringValue": "myProcess",
      "binaryValue": null,
      "stringListValues": [],
      "binaryListValues": [],
      "dataType": "String"
    }
  },
  "md5OfMessageAttributes": "9de691a346c79e4fda4af06248aa9dfc"
}
```

To store the entire body in a process variable `resultBody`, ID from body to `bodyId`, and messageId to `messageId`, use:

```
= `{resultBody:body, bodyId:body.id, messageId: messageId}`
```

Learn more about **Variable mapping** [here](../use-connectors/index.md).

## Appendix

### AWS authentication types

There are two options to authenticate the Connector with AWS:

- Choose **Credentials** in the **Authentication** dropdown if you have a valid pair of access and secret keys provided by your AWS account administrator. This option is applicable for both SaaS and Self-Managed users.
- Choose **Default Credentials Chain (Hybrid/Self-Managed only)** in the **Authentication** dropdown if your system is configured as an implicit authentication mechanism, such as role-based authentication, credentials supplied via environment variables, or files on target host. This option is applicable only for Self-Managed or hybrid distribution. This approach uses the [Default Credential Provider Chain](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/credentials.html) to resolve required credentials.

## Next Steps

- Explore more about [Amazon Simple Queue Service (SQS)](https://aws.amazon.com/sqs/) and its capabilities.
- Learn about [other Connectors available](./available-connectors-overview.md) in Camunda to integrate with different systems and services.
- Learn more about [using Connectors](../use-connectors/index.md).
- Learn more about [inbound Connectors](../use-connectors/inbound.md).

</TabItem>

</Tabs>
