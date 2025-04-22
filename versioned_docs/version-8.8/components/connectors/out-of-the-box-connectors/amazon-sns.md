---
id: amazon-sns
title: Amazon Simple Notification Service Connector
sidebar_label: AWS SNS
description: Publish messages to Amazon Simple Notification Service (SNS) from your BPMN process.
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

<Tabs groupId="amazonsns" defaultValue="outbound" queryString values={
[
{label: 'Outbound', value: 'outbound' },
{label: 'Inbound', value: 'inbound' }
]}>

<TabItem value='outbound'>

The **Amazon Simple Notification Service (SNS)** Connector is an outbound Connector that allows you to connect your BPMN service with [Amazon Simple Notification Service (SNS)](https://aws.amazon.com/sns/) to send messages.

## Prerequisites

To use the **Amazon SNS Connector**, you need to have an SNS Topic, IAM key, and secret pair with the `sns:Publish` policy relative to your SNS.

:::note
Use Camunda secrets to avoid exposing your AWS IAM credentials as plain text. Refer to our [appendix entry](#how-do-i-store-aws-iam-secrets-for-my-sns-connector) and the [SNS Developer Guide](https://docs.aws.amazon.com/sns/latest/dg/sns-using-identity-based-policies.html#sns-policy-keys) to learn more.
:::

## Create an Amazon SNS Connector task

import ConnectorTask from '../../../components/react-components/connector-task.md'

<ConnectorTask/>

## Make your Amazon SNS Connector for sending messages executable

To make your Amazon SNS Connector for sending messages executable, take the following steps:

1. Choose an applicable authentication type from the **Authentication** dropdown. Learn more about authentication types in the related [appendix entry](#aws-authentication-types).
2. Set the relevant IAM key and secret pair in the **Authentication** section. For example, `{{secrets.MY_AWS_ACCESS_KEY}}`. The value can be plain text, but this is not recommended due to security concerns.
3. In the **Topic Properties** section, set the topic ARN of your SNS topic as well as its region.
4. In the **Input message data** section, fill out the field **Message** with the data you would like to publish to the topic. The field requires FEEL input.
5. (Optional) In the **Input message data** section, fill out the field **Message attributes** to set optional message metadata. This field requires FEEL input. Refer to the relevant [appendix](#what-are-the-message-attributes-and-how-can-i-set-them) section to find out more about this field.
6. (Optional) In the **Input message data** section, fill out the field **Subject** to set optional message subject. FEEL input of the field is optional. Length must be less than 100 characters.
7. (FIFO only) For a FIFO type topic in Amazon SNS, a **Message Group ID** is required. This ID ensures that messages within the same group are delivered in sequence. The [Amazon SNS documentation on FIFO topics](https://docs.aws.amazon.com/sns/latest/dg/sns-fifo-topics.html) provides more details on Message Group ID usage. Additionally, an optional **Message Deduplication ID** can be provided. This is useful for message deduplication in FIFO topics and its necessity depends on the [deduplication settings of your SNS FIFO topic](https://docs.aws.amazon.com/sns/latest/dg/sns-message-deduplication.html). The Message Deduplication ID helps ensure Amazon SNS does not resend the same message within the deduplication interval.

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

Use Camunda secrets to avoid exposing your AWS IAM credentials. Follow our documentation on [managing secrets](/components/console/manage-clusters/manage-secrets.md) to learn more.

### AWS authentication types

There are two options to authenticate the Connector with AWS:

- Choose **Credentials** in the **Authentication** dropdown if you have a valid pair of access and secret keys provided by your AWS account administrator. This option is applicable for both SaaS and Self-Managed users.
- Choose **Default Credentials Chain (Hybrid/Self-Managed only)** in the **Authentication** dropdown if your system is configured as an implicit authentication mechanism, such as role-based authentication, credentials supplied via environment variables, or files on target host. This option is applicable only for Self-Managed or hybrid distribution. This approach uses the [Default Credential Provider Chain](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/credentials.html) to resolve required credentials.

</TabItem>

<TabItem value='inbound'>

The **Amazon Simple Notification Service (SNS) inbound Connector** is a Connector that allows you to start or continue
a BPMN process triggered by an [Amazon SNS](https://console.aws.amazon.com/sns/home) notification.

## Create an Amazon SNS inbound Connector task

1. Start building your BPMN diagram. You can use the **Amazon SNS inbound Connector** with either a **Start Event** or **Intermediate Catch Event**.
2. Select the applicable element and change its template to an **Amazon SNS Connector**.
3. Fill in all required properties.
4. Complete your BPMN diagram.
5. Deploy the diagram to activate the webhook.
6. Navigate to the **Webhooks** tab in the properties panel on the right side of the screen to observe the webhook URL.

## Make your Amazon SNS inbound Connector for receiving notifications executable

1. In the **Subscription Configuration** section, configure the **Subscription ID**. By default, **Subscription ID** is pre-filled with a random value. This value will be a part of the topic subscription URL.
2. Set the **Allow to receive messages from topic(s)** value to **any** if the process may be triggered by any topic, or **Specific topic(s)** if you wish to allow-list only certain topics to start a new BPMN process.
3. If you have chosen the **Specific topic(s)**, you have to list comma-separated topics in the field **Topic ARN(s)** as well. In that case, the **Amazon SNS inbound Connector** will auto-approve each qualified subscription request.
4. In the section **Activation**, configure **Condition** when the Amazon SNS topic can trigger a new BPMN process. The following example will trigger a new BPMN process for every notification with a subject _Start BPMN_: `=(request.body.Subject = "Start BPMN")`.
5. In the **Output mapping** section, fill in the **Result variable** field to store the response in a process variable. For example, `myResultVariable`. Alternatively, fill in the **Result expression** field to map specific fields from the response into process variables using [FEEL](/components/modeler/feel/what-is-feel.md).
   The following example will extract both the message and subject from an Amazon SNS message: `={message: request.body.Message, subject: request.body.Subject}`.

### Correlation

The **Correlation** section allows you to configure the message correlation parameters.

:::note
The **Correlation** section is not applicable for the plain **start event** element template of the Amazon SNS Connector. Plain **start events** are triggered by process instance creation and do not rely on message correlation.
:::

#### Correlation key

- **Correlation key (process)** is a FEEL expression that defines the correlation key for the subscription. This corresponds to the **Correlation key** property of a regular **Message Intermediate Catch Event**.
- **Correlation key (payload)** is a FEEL expression used to extract the correlation key from the incoming message. This expression is evaluated in the Connector Runtime and the result is used to correlate the message.

For example, given that your correlation key is defined with `myCorrelationKey` process variable, and the request body contains `"MessageAttributes": {"attrName1" : {"Type":"String","Value":"attrVal"}}`, your correlation key settings will look like this:

- **Correlation key (process)**: `=myCorrelationKey`
- **Correlation key (payload)**: `=request.body.MessageAttributes.attrName1.Value`

Learn more about correlation keys in the [messages guide](../../../concepts/messages).

#### Message ID expression

The **Message ID expression** is an optional field that allows you to extract the message ID from the incoming message. Message ID serves as a unique identifier for the message and is used for message correlation.
This expression is evaluated in the Connector Runtime and the result is used to correlate the message.

In most cases, it is not necessary to configure the **Message ID expression**. However, it is useful if you want to ensure message deduplication or achieve certain message correlation behavior.
Learn more about how message IDs influence message correlation in the [messages guide](../../../concepts/messages#message-correlation-overview).

For example, if you want to set the message ID to the value of the `attrName1` attribute in the incoming event, configure the **Message ID expression** as follows:

```
= request.body.MessageAttributes.attrName1.Value
```

#### Message TTL

The **Message TTL** is an optional field that allows you to set the time-to-live (TTL) for the correlated messages. TTL defines the time for which the message is buffered in Zeebe before being correlated to the process instance (if it can't be correlated immediately).
The value is specified as an ISO 8601 duration. For example, `PT1H` sets the TTL to one hour. Learn more about the TTL concept in Zeebe in the [message correlation guide](../../../concepts/messages#message-buffering).

## Activate the Amazon SNS inbound Connector by deploying your diagram

Once you click the **Deploy** button, your **Amazon SNS inbound Connector** will be activated and publicly available.

URLs of the exposed **Amazon SNS Inbound Connector** adhere to the following pattern:

`https://<base URL>/inbound/<subscription ID>`

- `<base URL>` is the URL of Connectors component deployment. When using the Camunda 8 SaaS offering, this will typically contain your **region Id** and **cluster Id**, found in your client credentials under the **API** tab within your cluster.
- `<subscription ID>` is the ID (path) you configured in the properties of your **Amazon SNS inbound Connector**.

If you make changes to your **Amazon SNS inbound Connector** configuration, you need to redeploy the BPMN diagram for the changes to take effect.

When you click on the event with **Amazon SNS inbound Connector** applied to it, a new **Webhooks** tab will appear in the properties panel.
This tab displays the URL of the **Amazon SNS inbound Connector** for every cluster where you have deployed your BPMN diagram.

:::note
The **Webhooks** tab is only supported in Web Modeler as part of the Camunda 8 SaaS offering.
You can still use Amazon SNS inbound Connectors in Desktop Modeler, or with Camunda 8 Self-Managed.
In that case, Amazon SNS inbound Connector deployments and URLs will not be displayed in Modeler.
:::

## Wiring with Amazon SNS

1. Sign in to the [Amazon SNS console](https://console.aws.amazon.com/sns/home).
2. On the navigation panel, choose **Topics**.
3. Choose the **Create** subscription.
4. In the **Protocol** drop-down list, select **HTTPS**.
5. In the **Endpoint** box, paste in the URL of the subscription found in at the **Webhooks** tab of your BPMN
   diagram that you want the topic to send messages. Then, choose **Create subscription**.
6. The confirmation message is displayed. Choose **Close**. Your new subscription's **Subscription ID**
   displays **PendingConfirmation**. Shortly after it will be confirmed by the BPMN process assuming **Allow to receive messages from topic(s)** contains the SNS topic ARN.

## Security considerations

### Access control

The field **Allow to receive messages from topic(s)** and related **Topic ARN(s)** allows you to control which Amazon SNS topics can trigger a BPMN process.
You can also achieve the same outcome by specifying **Condition** in the **Activation** section. For example, given **Topic ARN(s)** equals `arn:aws:sns:eu-central-1:1234567890:SNSWebhook`,
is the same as **Condition** equals `=(request.body.TopicArn = "arn:aws:sns:eu-central-1:1234567890:SNSWebhook")`.

### Integrity

Each Amazon SNS message is digitally signed with an AWS private key. The body of a message contains a digital signature of
the entire content. The **Amazon Simple Notification Service (SNS) Inbound Connector** verifies every message against
the Amazon SNS public certificate to ensure the message is of known origin and has not been tampered with.

## Appendix

### Amazon SNS Subscription message example

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

### Amazon SNS Notification message example

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

</TabItem>

</Tabs>
