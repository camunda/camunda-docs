---
id: amazon-sqs-inbound
title: Amazon SQS inbound connector
sidebar_label: AWS SQS inbound
description: Receive messages from Amazon Simple Queue Service (SQS) to start or continue a BPMN process.
---

import InboundConnectorBasics from '../../../components/react-components/\_connector-inbound-basics.md'
import ErrorHandling from '../../../components/react-components/\_connector-error-handling.md'

Use the Amazon SQS inbound connector to receive messages from a queue in [Amazon Simple Queue Service (Amazon SQS)](https://aws.amazon.com/sqs/) and start or continue a BPMN process.

## About this connector

The **Amazon SQS inbound connector** polls an SQS queue and correlates each message it receives to a process. You can use it with the following elements:

- Message start event
- Intermediate message catch event
- Boundary event
- Receive task

:::note
The **Amazon SQS Start Event** connector, which uses a none start event, is deprecated. Use the message start event variant instead.
:::

To send messages to a queue from a process, use the [Amazon SQS outbound connector](./amazon-sqs-outbound.md).

## Prerequisites

To use the **Amazon SQS inbound connector**, you need an SQS queue in your AWS account and IAM credentials that can read from it. The connector calls `sqs:GetQueueAttributes`, `sqs:ReceiveMessage`, and `sqs:DeleteMessage` on the queue.

:::note
Use secrets to avoid exposing your AWS IAM credentials as plain text. See [managing secrets](/components/saas/clusters/manage-secrets.md).
:::

<InboundConnectorBasics />

## Configuration

### Authentication

| Property       | Type          | Required                                      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Example                         |
| :------------- | :------------ | :-------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------ |
| AWS credential | Configuration | No                                            | Select a saved AWS credential with an optional default region, or enter the authentication details and a region in the fields below. Learn more about [credentials](/components/hub/organization/credentials/index.md).                                                                                                                                                                                                                                                                                                                                                                                                                                                  |                                 |
| Authentication | Dropdown      | Yes, if no AWS credential is set              | <p>The AWS authentication strategy:</p><ul><li><p>**Credentials** (SaaS/Self-Managed): Use this option if you have a valid pair of access and secret keys provided by your AWS account administrator.</p></li><li><p>**Default Credentials Chain** (Hybrid/Self-Managed only): Use this option if your system is configured for implicit authentication, such as role-based authentication, credentials supplied through environment variables, or files on the target host. This approach uses the [Default Credential Provider Chain](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/credentials.html) to resolve the required credentials.</p></li></ul> |                                 |
| Access key     | String        | Yes, if **Authentication** is **Credentials** | The access key of an IAM user with permission to receive messages from the queue.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `{{secrets.MY_AWS_ACCESS_KEY}}` |
| Secret key     | String        | Yes, if **Authentication** is **Credentials** | The secret key of the IAM user with the access key above.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |                                 |

### Queue

| Property  | Type   | Required                                     | Description                                                                                                | Example     |
| :-------- | :----- | :------------------------------------------- | :--------------------------------------------------------------------------------------------------------- | :---------- |
| Region    | String | Yes, if no AWS credential is set             | The AWS region of the queue.                                                                               | `us-east-1` |
| Region    | String | Yes, if the credential has no default region | Overrides the default region of the selected AWS credential. Shown when an **AWS credential** is selected. |             |
| Queue URL | String | Yes                                          | The URL of the SQS queue to subscribe to.                                                                  |             |

### Message polling

| Property                | Type   | Required | Description                                                                                                                                                                                                                                                                                                                                                                | Example                       |
| :---------------------- | :----- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------- |
| Polling wait time       | String | Yes      | The duration, in seconds, for which the call waits for a message to arrive in the queue before it returns. The default is `20`. A value of `0` is overridden with `1` at runtime. Learn more about [short and long polling](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-short-and-long-polling.html) in the Amazon SQS Developer Guide. |                               |
| Attribute names         | String | No       | An array of queue attribute names to return in the `attributes` field of the message. If you leave it empty, all attributes are returned.                                                                                                                                                                                                                                  | `["ApproximateReceiveCount"]` |
| Message attribute names | String | No       | An array of message attribute names to return in the `messageAttributes` field of the message. If you leave it empty, all message attributes are returned. Learn more about [message metadata](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-message-metadata.html) in the Amazon SQS Developer Guide.                                    | `["attributeName1"]`          |

### Activation

| Property                 | Type    | Required | Description                                                                                                                                                                                                                                                             | Example                                        |
| :----------------------- | :------ | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------- |
| Activation condition     | String  | No       | A FEEL expression evaluated against the message. The connector only triggers when it evaluates to `true`. Leave it empty to trigger for all messages. Learn more about the [activation condition](/components/connectors/use-connectors/index.md#activation-condition). | `=(messageAttributes.key.stringValue="value")` |
| Consume unmatched events | Boolean | No       | Whether to delete messages that do not match the activation condition from the queue. See [unmatched messages](#unmatched-messages). The default is selected.                                                                                                           |                                                |

#### Unmatched messages

When **Consume unmatched events** is cleared, messages that do not match the **Activation condition** are not deleted from the queue. They become available to consumers again after the visibility timeout expires. To forward them after a number of delivery attempts, set up a [dead-letter queue](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html) on the queue.

When **Consume unmatched events** is selected, the connector deletes messages that do not match the activation condition from the queue. These messages then do not end up in the dead-letter queue. Learn more about [consuming unmatched events](/components/connectors/use-connectors/inbound.md#consume-unmatched-events).

| **Consume unmatched events** | Activation condition | Outcome                                                                                      |
| :--------------------------- | :------------------- | :------------------------------------------------------------------------------------------- |
| Selected                     | Matched              | Message is removed from the queue.                                                           |
| Cleared                      | Matched              | Message is removed from the queue.                                                           |
| Selected                     | Unmatched            | Message is removed from the queue.                                                           |
| Cleared                      | Unmatched            | Message is not removed from the queue and is redelivered or placed in the dead-letter queue. |

### Correlation

| Property                        | Type     | Required                                                                                                | Description                                                                                                                                                                                                                                          | Example               |
| :------------------------------ | :------- | :------------------------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------- |
| Subprocess correlation required | Dropdown | Yes, for message start events                                                                           | Whether correlation is required: **Correlation not required** or **Correlation required**. Select **Correlation required** for message start events in an event-based subprocess.                                                                    |                       |
| Correlation key (process)       | String   | Yes. For message start events, only if **Subprocess correlation required** is **Correlation required**. | A FEEL expression that defines the correlation key for the subscription. Learn more about the [correlation key (process)](/components/connectors/use-connectors/index.md#correlation-key-process).                                                   | `=4567`               |
| Correlation key (payload)       | String   | Yes. For message start events, only if **Subprocess correlation required** is **Correlation required**. | A FEEL expression that extracts the correlation key from the incoming message. Learn more about the [correlation key (payload)](/components/connectors/use-connectors/index.md#correlation-key-payload).                                             | `=body.id`            |
| Message ID expression           | String   | No                                                                                                      | A FEEL expression that extracts a unique identifier from the incoming message. Learn more about the [message ID expression](/components/connectors/use-connectors/index.md#message-id-expression).                                                   | `=body.transactionId` |
| Message TTL                     | String   | No                                                                                                      | The time-to-live of the correlated message, as an ISO 8601 duration. It defines how long Zeebe buffers the message if it cannot be correlated immediately. Learn more about [message buffering](/components/concepts/messages.md#message-buffering). | `PT1H`                |
| Message name                    | String   | No                                                                                                      | The name of the message. By default, a random UUID is generated. Use a unique message name for each connector element in the diagram. Learn more about [message subscriptions](/components/concepts/messages.md#message-subscriptions).              |                       |

### Deduplication

| Property         | Type    | Required                       | Description                                                                                                                                                                                                                                                                            | Example |
| :--------------- | :------ | :----------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| Manual mode      | Boolean | No                             | Customize the deduplication ID instead of using the automatic deduplication. By default, connector elements with the same subscription properties share one subscription. Learn more about [inbound connector deduplication](/components/connectors/advanced-topics/deduplication.md). |         |
| Deduplication ID | String  | Yes, if **Manual mode** is set | The custom deduplication ID. It can only contain alphanumeric characters, dashes, and underscores.                                                                                                                                                                                     |         |

## Output

The connector provides the SQS message as the response. The `body` is parsed as JSON if possible, otherwise it contains the raw string. For example, a message with a JSON body looks as follows:

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
  "mD5OfMessageAttributes": "9de691a346c79e4fda4af06248aa9dfc"
}
```

Use **Result variable** to store the entire message in a process variable, or **Result expression** to map fields into separate process variables. For example, to store the entire body in `resultBody`, the ID from the body in `bodyId`, and the message ID in `messageId`, use:

```
= {resultBody: body, bodyId: body.id, messageId: messageId}
```

Use the same message to define the correlation and the activation condition. With the message above:

- **Correlation key (process)**: `=4567`
- **Correlation key (payload)**: `=body.id`
- **Activation condition**: `=messageAttributes.messageName.stringValue="myProcess"`

Learn more about [variable and response mapping](/components/connectors/use-connectors/index.md#variable-and-response-mapping).

<ErrorHandling />

## Further resources

- [Amazon Simple Queue Service documentation](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html)
