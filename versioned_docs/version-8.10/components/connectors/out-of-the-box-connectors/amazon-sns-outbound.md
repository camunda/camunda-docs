---
id: amazon-sns-outbound
title: Amazon SNS connector
sidebar_label: AWS SNS outbound
description: Publish messages to Amazon Simple Notification Service (SNS) topics from your BPMN process.
---

import OutboundConnectorBasics from '../../../components/react-components/\_connector-outbound-basics.md'
import ErrorHandling from '../../../components/react-components/\_connector-error-handling.md'

Use the Amazon SNS outbound connector to publish messages to an [Amazon Simple Notification Service (SNS)](https://aws.amazon.com/sns/) topic from your BPMN process.

## About this connector

The **Amazon SNS outbound connector** publishes a message to a standard or FIFO SNS topic and returns the SNS message ID. To start or continue a process when a topic sends a notification, use the [Amazon SNS inbound connector](./amazon-sns-inbound.md).

## Prerequisites

To use the **Amazon SNS outbound connector**, you need an SNS topic and an IAM access key and secret key pair with the `sns:Publish` permission for that topic.

Learn more about SNS permissions in the [SNS Developer Guide](https://docs.aws.amazon.com/sns/latest/dg/sns-using-identity-based-policies.html#sns-policy-keys).

:::note
Use secrets to store credentials and avoid exposing sensitive information from the process.
See [managing secrets](/components/saas/clusters/manage-secrets.md).
:::

<OutboundConnectorBasics />

## Configuration

### Authentication

| Property       | Type          | Required                                      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Example                         |
| :------------- | :------------ | :-------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------ |
| AWS credential | Configuration | No                                            | Select a saved AWS credential with an optional default region, or enter the authentication details and a region in the fields below. Learn more about [credentials](/components/hub/organization/credentials/index.md).                                                                                                                                                                                                                                                                                                                                                                                                                                                  |                                 |
| Authentication | Dropdown      | Yes, if no AWS credential is set              | <p>The AWS authentication strategy:</p><ul><li><p>**Credentials** (SaaS/Self-Managed): Use this option if you have a valid pair of access and secret keys provided by your AWS account administrator.</p></li><li><p>**Default Credentials Chain** (Hybrid/Self-Managed only): Use this option if your system is configured for implicit authentication, such as role-based authentication, credentials supplied through environment variables, or files on the target host. This approach uses the [Default Credential Provider Chain](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/credentials.html) to resolve the required credentials.</p></li></ul> |                                 |
| Access key     | String        | Yes, if **Authentication** is **Credentials** | The access key of an IAM user with permission to publish to the SNS topic. The value can be plain text, but this is not recommended due to security concerns.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | `{{secrets.MY_AWS_ACCESS_KEY}}` |
| Secret key     | String        | Yes, if **Authentication** is **Credentials** | The secret key of the IAM user with the access key above.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |                                 |

### Topic properties

| Property   | Type     | Required                                     | Description                                                                                                                                                         | Example                                      |
| :--------- | :------- | :------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------- |
| Topic ARN  | String   | Yes                                          | The Amazon Resource Name (ARN) of the SNS topic to publish to.                                                                                                      | `arn:aws:sns:us-east-1:123456789012:MyTopic` |
| Topic type | Dropdown | Yes                                          | The type of the topic: **Standard** or **FIFO**. Standard topics maximize throughput; FIFO topics preserve ordering and deduplication. The default is **Standard**. |                                              |
| Region     | String   | Yes, if no AWS credential is set             | The region of the SNS topic.                                                                                                                                        | `us-east-1`                                  |
| Region     | String   | Yes, if the credential has no default region | Overrides the default region of the selected AWS credential. Shown when an **AWS credential** is selected.                                                          |                                              |

## Operations

### Publish message

Publish a message to an Amazon SNS topic.

#### Input parameters

| Property                 | Type   | Required                 | Description                                                                                                                                                                                                                                                                                                                                                                         | Example |
| :----------------------- | :----- | :----------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| Message group ID         | String | Yes, for **FIFO** topics | The ID that groups messages in a FIFO topic. Messages within the same group are delivered in sequence. Learn more about [message grouping for FIFO topics](https://docs.aws.amazon.com/sns/latest/dg/fifo-message-grouping.html). Shown when **Topic type** is **FIFO**.                                                                                                            |         |
| Message deduplication ID | String | No, for **FIFO** topics  | A token that prevents duplicate messages in a FIFO topic. Amazon SNS does not deliver messages with the same deduplication ID again within the five-minute deduplication interval. Whether you need it depends on the [deduplication settings of your FIFO topic](https://docs.aws.amazon.com/sns/latest/dg/sns-message-deduplication.html). Shown when **Topic type** is **FIFO**. |         |
| Subject                  | String | No                       | The subject of the message. The length must be less than 100 characters.                                                                                                                                                                                                                                                                                                            |         |
| Message                  | Text   | Yes                      | The data to publish to the topic. You can enter text or a [FEEL](/components/modeler/feel/what-is-feel.md) expression. If the value is not a string, for example a FEEL context, the connector serializes it to JSON.                                                                                                                                                               |         |
| messageAttributes        | String | No                       | A FEEL expression that returns the message attributes, which are optional structured metadata for the message. See [message attributes](#message-attributes).                                                                                                                                                                                                                       |         |

#### Message attributes

Amazon SNS lets you include structured metadata, such as timestamps, geospatial data, signatures, and identifiers, with messages using message attributes. The connector supports non-binary message attributes. Compose each attribute value to comply with the Amazon SNS [message attribute data format](https://docs.aws.amazon.com/sns/latest/dg/sns-message-attributes.html).

Example of valid message attributes as a FEEL value:

```feel
= {
  "timestamp": {
    "StringValue": today(),
    "DataType": "String"
  },
  "messageSubmittedBy": {
    "StringValue": "user12345",
    "DataType": "String"
  }
}
```

#### Output

The connector returns the SNS identifier of the published message:

- `messageId`: The SNS message ID.

Example response:

```json
{
  "messageId": "2e062e6b-a527-5e68-b69b-72a8e42add60"
}
```

To use the message ID in your process, store the response with **Result variable**, or map it with **Result expression**. For example, the following expression stores the ID in the `createdMessageID` process variable:

```feel
= {
  "createdMessageID": response.messageId
}
```

<ErrorHandling />
