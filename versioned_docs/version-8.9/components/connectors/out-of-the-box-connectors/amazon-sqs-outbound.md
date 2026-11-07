---
id: amazon-sqs-outbound
title: Amazon SQS outbound connector
sidebar_label: AWS SQS outbound
description: Send messages to Amazon Simple Queue Service (SQS) from your BPMN process.
---

import OutboundConnectorBasics from '../../../components/react-components/\_connector-outbound-basics.md'
import ErrorHandling from '../../../components/react-components/\_connector-error-handling.md'

Use the Amazon SQS outbound connector to send messages to a queue in [Amazon Simple Queue Service (Amazon SQS)](https://aws.amazon.com/sqs/) from your BPMN process.

## About this connector

The **Amazon SQS outbound connector** sends a message to a standard or FIFO queue and returns the SQS message identifier of the new message.

To start or continue a process when a message arrives in a queue, use the [Amazon SQS inbound connector](./amazon-sqs-inbound.md).

## Prerequisites

To use the **Amazon SQS outbound connector**, you need an SQS queue and an IAM access key and secret key pair with the `sqs:SendMessage` permission for that queue. Learn more in the [SQS Developer Guide](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-basic-examples-of-iam-policies.html).

:::note
Use secrets to avoid exposing your AWS IAM credentials as plain text. See [managing secrets](/components/console/manage-clusters/manage-secrets.md).
:::

<OutboundConnectorBasics />

## Configuration

### Authentication

| Property       | Type     | Required                                      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Example                         |
| :------------- | :------- | :-------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------ |
| Authentication | Dropdown | Yes                                           | <p>The AWS authentication strategy:</p><ul><li><p>**Credentials** (SaaS/Self-Managed): Use this option if you have a valid pair of access and secret keys provided by your AWS account administrator.</p></li><li><p>**Default Credentials Chain** (Hybrid/Self-Managed only): Use this option if your system is configured for implicit authentication, such as role-based authentication, credentials supplied through environment variables, or files on the target host. This approach uses the [Default Credential Provider Chain](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/credentials.html) to resolve the required credentials.</p></li></ul> |                                 |
| Access key     | String   | Yes, if **Authentication** is **Credentials** | The access key of an IAM user with permission to send messages to the queue.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | `{{secrets.MY_AWS_ACCESS_KEY}}` |
| Secret key     | String   | Yes, if **Authentication** is **Credentials** | The secret key of the IAM user with the access key above.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |                                 |

### Queue properties

| Property   | Type     | Required | Description                                                                                                                                                                                                                                                                                               | Example     |
| :--------- | :------- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------- |
| URL        | String   | Yes      | The URL of the SQS queue to send the message to.                                                                                                                                                                                                                                                          |             |
| Queue type | Dropdown | Yes      | Whether the queue is a [standard](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/standard-queues.html) or a [FIFO](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/FIFO-queues.html) queue: **Standard** or **FIFO**. The default is **Standard**. |             |
| Region     | String   | Yes      | The AWS region of the queue.                                                                                                                                                                                                                                                                              | `us-east-1` |

## Operations

### Send message

Send a message to an Amazon SQS queue.

#### Input parameters

| Property                 | Type   | Required             | Description                                                                                                                                                                                                                                                                                         | Example |
| :----------------------- | :----- | :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| Message body             | Text   | Yes                  | The data to send to the queue. The field requires a FEEL expression.                                                                                                                                                                                                                                |         |
| Message attributes       | Text   | No                   | Optional message metadata, as a FEEL map keyed by attribute name. Each value contains a `StringValue` and a `DataType`. See [message attributes](#message-attributes).                                                                                                                              |         |
| Message group ID         | String | Yes, for FIFO queues | The [message group ID](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/using-messagegroupid-property.html) of the message. Shown when **Queue type** is **FIFO**.                                                                                                        |         |
| Message deduplication ID | String | No, for FIFO queues  | The [message deduplication ID](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/using-messagededuplicationid-property.html) of the message. Shown when **Queue type** is **FIFO**. Whether you need it depends on how you configured message deduplication for the queue. |         |

To learn more about Friendly Enough Expression Language (FEEL) expressions, see [what is FEEL?](/components/modeler/feel/what-is-feel.md).

#### Message attributes

Amazon SQS lets you include structured metadata, such as timestamps, geospatial data, signatures, and identifiers, with messages using message attributes. The connector supports non-binary message attributes. Compose the value to comply with the Amazon SQS [message attribute data format](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-message-metadata.html#sqs-message-attributes).

Example of valid message attributes as a FEEL value:

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

#### Output

The connector returns the SQS message identifier of the new message in a `messageId` field.

Example response:

```json
{
  "messageId": "5fea7756-0ea4-451a-a703-a558b933e274"
}
```

To use the message identifier in your process, map it with a **Result expression**, for example:

```
= {
  "createdMessageID": response.messageId
}
```

<ErrorHandling />

## Further resources

- [Amazon Simple Queue Service documentation](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html)
