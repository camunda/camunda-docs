---
id: amazon-sns-inbound
title: Amazon SNS connector
sidebar_label: AWS SNS inbound
description: Start or continue a BPMN process when an Amazon Simple Notification Service (SNS) topic sends a notification.
---

import InboundConnectorBasics from '../../../components/react-components/\_connector-inbound-basics.md'
import ErrorHandling from '../../../components/react-components/\_connector-error-handling.md'

Use the Amazon SNS inbound connector to start a process instance, or continue a running one, when an [Amazon Simple Notification Service (SNS)](https://aws.amazon.com/sns/) topic sends a notification.

## About this connector

The **Amazon SNS inbound connector** receives messages from Amazon SNS through an HTTPS subscription. It exposes a webhook URL that you register as the endpoint of an SNS subscription, and it can start or continue a process when a notification arrives.

You can use the connector with a **Start Event**, **Message Start Event**, **Intermediate Catch Event**, **Boundary Event**, or **Receive Task**. To publish messages to a topic from a process, use the [Amazon SNS outbound connector](./amazon-sns-outbound.md).

## Prerequisites

To use the **Amazon SNS inbound connector**, you need an Amazon SNS topic and permission to create a subscription for it. Amazon SNS must be able to reach the connector runtime over HTTPS.

<InboundConnectorBasics />

## Configuration

### Subscription configuration

| Property                                | Type     | Required                       | Description                                                                                                                                                                                                               | Example                                          |
| :-------------------------------------- | :------- | :----------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :----------------------------------------------- |
| Subscription ID                         | String   | Yes                            | The ID of the subscription. It becomes the path of the webhook URL. By default, the field is prefilled with a random value.                                                                                               |                                                  |
| Allow to receive messages from topic(s) | Dropdown | Yes                            | Controls which topics can trigger the connector: **Any**, or **Specific topic(s)** to allow only the topics you list. The default is **Specific topic(s)**.                                                               |                                                  |
| Topic ARN(s)                            | String   | Yes, for **Specific topic(s)** | A comma-separated list of the Amazon Resource Names (ARNs) of the topics that can trigger the connector. The connector automatically approves each qualified subscription request. See [access control](#access-control). | `arn:aws:sns:eu-central-1:1234567890:SNSWebhook` |

### Activation

| Property                 | Type    | Required | Description                                                                                                                                                                                                                                                                                                        | Example                                  |
| :----------------------- | :------ | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------- |
| Activation condition     | String  | No       | A FEEL condition that defines when a notification triggers the connector. Leave it empty to catch all events. Learn more about [activation conditions](/components/connectors/use-connectors/index.md#activation).                                                                                                 | `=(request.body.Subject = "Start BPMN")` |
| Consume unmatched events | Boolean | Yes      | Whether the connector consumes events that don't match the activation condition and returns a success response. By default, unmatched events are rejected. Not available for the plain **Start Event**. See [consume unmatched events](/components/connectors/use-connectors/inbound.md#consume-unmatched-events). |                                          |

### Correlation

The **Correlation** section configures message correlation. It is not available for the plain **Start Event** template, because plain start events are triggered by process instance creation and don't rely on message correlation.

| Property                        | Type     | Required | Description                                                                                                                                                                                                                                                                                              | Example                                           |
| :------------------------------ | :------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------ |
| Subprocess correlation required | Dropdown | Yes      | Whether correlation is required: **Correlation not required** or **Correlation required**. Only shown for the **Message Start Event**, where it is needed for event-based sub-processes.                                                                                                                 |                                                   |
| Correlation key (process)       | String   | Yes      | A FEEL expression that defines the correlation key of the subscription. It corresponds to the **Correlation key** of a regular message catch event. For the **Message Start Event**, it is required only if **Subprocess correlation required** is **Correlation required**.                             | `=myCorrelationKey`                               |
| Correlation key (payload)       | String   | Yes      | A FEEL expression that extracts the correlation key from the incoming message. For the **Message Start Event**, it is required only if **Subprocess correlation required** is **Correlation required**.                                                                                                  | `=request.body.MessageAttributes.attrName1.Value` |
| Message ID expression           | String   | No       | A FEEL expression that extracts the message ID from the incoming message. The message ID is a unique identifier that Zeebe uses for message correlation. In most cases, you don't need to set it. Learn more about [message correlation](/components/concepts/messages.md#message-correlation-overview). | `=request.body.MessageAttributes.attrName1.Value` |
| Message TTL                     | String   | No       | The time-to-live of the correlated message, as an ISO 8601 duration. It defines how long Zeebe buffers the message if it can't be correlated immediately. Learn more about [message buffering](/components/concepts/messages.md#message-buffering).                                                      | `PT1H`                                            |
| Message name                    | String   | Yes      | The name of the message. By default, it's an auto-generated random UUID. Use a unique message name for each connector element in the diagram, or override the value to set a custom name.                                                                                                                |                                                   |

For example, if your process defines the correlation key in the `myCorrelationKey` process variable and the request body contains `"MessageAttributes": {"attrName1" : {"Type":"String","Value":"attrVal"}}`, set the following values:

- **Correlation key (process)**: `=myCorrelationKey`
- **Correlation key (payload)**: `=request.body.MessageAttributes.attrName1.Value`

Learn more about correlation keys in the [messages guide](/components/concepts/messages.md) and in [correlation](/components/connectors/use-connectors/index.md#correlation).

### Deduplication

Not available for the plain **Start Event**.

| Property         | Type    | Required                  | Description                                                                                                            | Example |
| :--------------- | :------ | :------------------------ | :--------------------------------------------------------------------------------------------------------------------- | :------ |
| Manual mode      | Boolean | Yes                       | By default, similar connectors receive the same deduplication ID. Select this option to set a custom deduplication ID. |         |
| Deduplication ID | String  | Yes, if manual mode is on | The custom deduplication ID of the connector.                                                                          |         |

## Activate the connector

When you deploy your diagram, the **Amazon SNS inbound connector** is activated and publicly available. The URL of the connector follows this pattern:

`https://<base URL>/inbound/<subscription ID>`

- `<base URL>` is the URL of the connectors component deployment. In Camunda 8 SaaS, it typically contains your **region ID** and **cluster ID**, which you find in your client credentials on the **API** tab of your cluster.
- `<subscription ID>` is the **Subscription ID** you configured in the connector properties.

If you change the connector configuration, redeploy the BPMN diagram for the changes to take effect.

When you select an element with the **Amazon SNS inbound connector** applied, a **Webhooks** tab appears in the properties panel. It shows the connector URL for every cluster where you deployed the diagram.

:::note
The **Webhooks** tab is only supported in Web Modeler as part of the Camunda 8 SaaS offering.
You can still use Amazon SNS inbound connectors in Desktop Modeler or with Camunda 8 Self-Managed.
In that case, Modeler doesn't display the connector deployments and URLs.
:::

## Subscribe to the connector in Amazon SNS

1. Sign in to the [Amazon SNS console](https://console.aws.amazon.com/sns/home).
2. In the navigation panel, select **Topics**.
3. Select the topic, and then select **Create subscription**.
4. In the **Protocol** dropdown list, select **HTTPS**.
5. In the **Endpoint** field, paste the URL from the **Webhooks** tab of your BPMN diagram, and then select **Create subscription**.
6. A confirmation message is displayed. Select **Close**. The **Status** of your new subscription shows **PendingConfirmation**. Shortly after, the connector confirms the subscription, assuming **Allow to receive messages from topic(s)** allows the SNS topic ARN.

## Security considerations

### Access control

**Allow to receive messages from topic(s)** and **Topic ARN(s)** control which Amazon SNS topics can trigger a process. You can achieve the same outcome with an **Activation condition**. For example, **Topic ARN(s)** set to `arn:aws:sns:eu-central-1:1234567890:SNSWebhook` is equivalent to an **Activation condition** set to `=(request.body.TopicArn = "arn:aws:sns:eu-central-1:1234567890:SNSWebhook")`.

### Integrity

Amazon SNS signs each message with an AWS private key, and the message body contains a digital signature of its entire content. The **Amazon SNS inbound connector** verifies every message against the Amazon SNS public certificate to ensure the message has a known origin and has not been tampered with.

## Output

The connector returns the incoming HTTP request. Use **Result variable** to store the response in a process variable, for example `myResultVariable`. Use **Result expression** to map specific fields into process variables with [FEEL](/components/modeler/feel/what-is-feel.md).

The response contains the following fields:

- `request.body`: The body of the SNS message, with fields such as `Type`, `MessageId`, `TopicArn`, `Subject`, `Message`, and `MessageAttributes`.
- `request.headers`: The HTTP headers of the request, for example `x-amz-sns-topic-arn`.
- `request.params`: The query parameters of the request.

For example, the following expression extracts the message and the subject of an Amazon SNS notification:

```feel
= {
  message: request.body.Message,
  subject: request.body.Subject
}
```

### Example messages

The following example shows a subscription confirmation request that Amazon SNS sends when you create a subscription:

```
POST https://<base URL>/inbound/<subscription ID>

connection: close
accept-encoding: gzip,deflate
user-agent: Amazon Simple Notification Service Agent
host: <base URL>
content-length: 9999
content-type: text/plain; charset=UTF-8
x-amz-sns-topic-arn: arn:aws:sns:eu-central-1:1234567890:SNSWebhook
x-amz-sns-message-id: b9b4574f-b4ab-4c03-ac14-a3145896747f
x-amz-sns-message-type: SubscriptionConfirmation

{
  "Type": "SubscriptionConfirmation",
  "MessageId": "b9b4574f-b4ab-4c03-ac14-a3145896747f",
  "Token": "233...18b",
  "TopicArn": "arn:aws:sns:eu-central-1:1234567890:SNSWebhook",
  "Message": "You have chosen to subscribe to the topic arn:aws:sns:eu-central-1:1234567890:SNSWebhook.\nTo confirm the subscription, visit the SubscribeURL included in this message.",
  "SubscribeURL": "https://sns.eu-central-1.amazonaws.com/?Action=ConfirmSubscription&TopicArn=arn:aws:sns:eu-central-1:1234567890:SNSWebhook&Token=233...18b",
  "Timestamp": "2023-04-26T15:04:47.883Z",
  "SignatureVersion": "1",
  "Signature": "u+0i/F/+qew...zw==",
  "SigningCertURL": "https://sns.eu-central-1.amazonaws.com/SimpleNotificationService-56e67fcb41f6fec09b0196692625d385.pem"
}
```

The following example shows a notification:

```
POST https://<base URL>/inbound/<subscription ID>

connection: close
accept-encoding: gzip,deflate
user-agent: Amazon Simple Notification Service Agent
host: webhook.site
content-length: 1046
x-amzn-trace-id: Root=1-64493ecd-dcfadf2f053429acb884eee3;Sampled=1
content-type: text/plain; charset=UTF-8
x-amz-sns-subscription-arn: arn:aws:sns:eu-central-1:1234567890:SNSWebhook:4aa14ec3-a492-4a8e-8247-ea658d1aad96
x-amz-sns-topic-arn: arn:aws:sns:eu-central-1:1234567890:SNSWebhook
x-amz-sns-message-id: 2e062e6b-a527-5e68-b69b-72a8e42add60
x-amz-sns-message-type: Notification

{
  "Type" : "Notification",
  "MessageId" : "2e062e6b-a527-5e68-b69b-72a8e42add60",
  "TopicArn" : "arn:aws:sns:eu-central-1:1234567890:SNSWebhook",
  "Subject" : "Subject - test",
  "Message" : "Hello, world",
  "Timestamp" : "2023-04-26T15:10:05.479Z",
  "SignatureVersion" : "1",
  "Signature" : "a2w...A==",
  "SigningCertURL" : "https://sns.eu-central-1.amazonaws.com/SimpleNotificationService-56e67fcb41f6fec09b0196692625d385.pem",
  "UnsubscribeURL" : "https://sns.eu-central-1.amazonaws.com/?Action=Unsubscribe&SubscriptionArn=arn:aws:sns:eu-central-1:1234567890:SNSWebhook:4aa14ec3-a492-4a8e-8247-ea658d1aad96",
  "MessageAttributes" : {
    "attrName1" : {"Type":"String","Value":"attrVal"}
  }
}
```

<ErrorHandling />
