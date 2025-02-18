---
id: twilio
title: Twilio Connector
sidebar_label: Twilio
description: Integrate your BPMN service with Twilio's messaging API to send SMS messages, get messages, and more.
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

<Tabs groupId="twilio" defaultValue="outbound" queryString values={
[
{label: 'Outbound', value: 'outbound' },
{label: 'Inbound', value: 'inbound' }
]}>

<TabItem value='outbound'>

The **Twilio Connector** allows you to integrate your BPMN service with Twilio's messaging API. With this Connector, you can send SMS messages, get messages, and more. This documentation will guide you through the process of setting up and using the **Twilio Connector**.

## Prerequisites

Before you can use the Twilio Connector, create a Twilio account and obtain an account SID and auth token from the [Twilio Console](https://www.twilio.com/console). You will also need to have a phone number to use as the sender for your SMS messages.

:::note
Use Camunda secrets to store your account SID and auth token so you don't expose sensitive information directly from the process. See [managing secrets](https://docs.camunda.org/manual/latest/user-guide/process-engine/secrets/) to learn more.
:::

## Create a Twilio Connector task

import ConnectorTask from '../../../components/react-components/connector-task.md'

<ConnectorTask/>

## Make your Twilio Connector executable

To work with the Twilio Connector, choose the required operation type in the **Operation** section and complete the mandatory fields highlighted in red in the Connector properties panel on the right side of the screen.

### Operation

Choose an operation type of either sendSms, listMessages, or getMessage in the **Operation** section:

- **Send SMS**: Send an SMS message to a specified phone number from your Twilio account.
- **List messages**: Retrieve a list of messages sent from your Twilio account within specified filters.
- **Get message**: Retrieve the details of a specific message sent from your Twilio account.

## Authentication

To access the Twilio API, the Connector needs the appropriate credentials. The following authentication options are available:

- **Account SID**: Provide the Account SID for your Twilio account.
- **Auth Token**: Provide the Auth Token for your Twilio account.

**OR**

- **API Key**: Provide the API Key for your Twilio account.
- **API Secret**: Provide the API Secret for your Twilio account.

The Account SID and Auth Token or API Key and API secret are required properties and must be provided to use the Connector. If these properties are not set, the Connector will not be able to authenticate with the Twilio API.

For more information on authentication and security in Twilio, refer to the [Twilio documentation](https://www.twilio.com/docs/usage/security).

## Required fields

### Send SMS operation

- `Body`: The content of the SMS message.
- `To number`: The phone number that you want to send the SMS message to.
- `From number`: The phone number to use as the sender of the SMS message.

:::note
See the [Twilio documentation](https://www.twilio.com/docs/sms/send-messages) for more details.
:::

### List messages operation

- `Date sent after`: (Optional) The date and time to start retrieving messages from. Messages sent on or after this date and time will be included in the results. The date and time must be in ISO 8601 format, such as `2023-04-19T08:30:00Z`.
- `Date sent before`: (Optional) The date and time to stop retrieving messages at. Messages sent before this date and time will be included in the results. The date and time must be in ISO 8601 format, such as `2023-04-19T08:30:00Z`.
- `From`: (Optional) The phone number that the message was sent from. Only messages sent from this phone number will be included in the results.
- `To`: (Optional) The phone number that the message was sent to. Only messages sent to this phone number will be included in the results.
- `Page size`: (Optional) The maximum number of messages to retrieve per page. This value must be between 1 and 1000.

:::note
See the Twilio documentation on [filtering by date sent](https://www.twilio.com/docs/sms/api/message-resource?code-sample=code-read-list-messages-filter-by-before-sent-date&code-language=curl&code-sdk-version=json) and [getting filters](https://www.twilio.com/docs/sms/api/message-resource?code-sample=code-read-list-messages-matching-filter-criteria&code-language=curl&code-sdk-version=json) for more information.
:::

### getMessage operation

- `Message SID`: The SID of the message you want to retrieve. See the [Twilio documentation](https://www.twilio.com/docs/sms/api/message-resource?code-sample=code-fetch-message&code-language=curl&code-sdk-version=json) for more details.

## Handle Connector response

The **Twilio Connector** is a protocol Connector built on top of the HTTP REST Connector. Therefore, handling the response is still applicable and can be done as described in the [HTTP REST Connector response documentation](/components/connectors/protocol/rest.md#response).

When using the **Twilio Connector**, the response from the Twilio API will be available in a temporary local response variable. This variable can be mapped to the process by specifying the Result Variable.

For example, if you use the **Send SMS Message** method in the Twilio Connector, the response may look like this:

```json
{
  "status": 201,
  "headers": {
    "content-type": "application/json"
  },
  "response": {
    "sid": "SM1234567890",
    "date_created": "2023-04-18T15:30:00Z",
    "date_updated": "2023-04-18T15:30:00Z",
    "date_sent": null,
    "account_sid": "AC1234567890",
    "from": "+1234567890",
    "to": "+0987654321",
    "body": "Hello, World!",
    "status": "queued",
    "num_segments": "1",
    "direction": "outbound-api",
    "api_version": "2010-04-01",
    "price": null,
    "price_unit": "USD",
    "error_code": null,
    "error_message": null,
    "uri": "/2010-04-01/Accounts/AC1234567890/Messages/SM1234567890.json",
    "subresource_uris": {
      "media": "/2010-04-01/Accounts/AC1234567890/Messages/SM1234567890/Media.json"
    }
  }
}
```

In this example, the response variable contains an SID attribute that uniquely identifies the message that was sent.

You can choose to unpack the content of your response into multiple process variables using the **Result Expression**, which is a FEEL Context Expression.

The Result Expression allows you to access specific attributes from the response and assign them to process variables that can be used in subsequent steps of your process.

```feel
= {
    sid: response.body.sid,
    date_created: response.body.date_created,
    from: response.body.from,
    to: response.body.to,
    body: response.body.body
}
```

In this example, we are using the Result Expression to extract the `sid`, `date_created`, `from`, `to`, and `body` attributes from the response variable and assign them to process variables with the same name. You can then use these variables in subsequent steps of your process.

:::note
The syntax for accessing attributes in the Result Expression may vary depending on the structure of your response object. You can refer to the [FEEL Context Expression](/components/modeler/feel/language-guide/feel-context-expressions.md) documentation for more information on how to use the **Result Expression**.
:::

## Troubleshooting

If you are having issues with the Twilio Connector, try the following:

- Ensure your Twilio credentials are correct.
- Ensure you have set up your Twilio account and have a valid phone number.
- Ensure your configuration properties are set correctly.
- Check the logs for any error messages.
- Contact [Camunda support](https://camunda.com/services/support/) if you need further assistance.

For more information on using Twilio, visit the [official documentation](https://www.twilio.com/docs).

## Using Twilio Connector Best Practices

When using the Twilio Connector in a BPMN process, it is important to keep in mind that there may be delays in message delivery or processing, and that some messages may fail to be delivered due to various reasons such as invalid phone numbers, network issues, etc. To ensure that messages are sent and delivered reliably, it is recommended to build your BPMN diagram to handle retries and error scenarios.

One way to achieve this is by using an intermediate timer event to trigger a retry after a certain amount of time has elapsed, or by using an error boundary event to catch and handle errors in the process.

:::note
To avoid performance issues, it is recommended to limit the number of retries and to implement proper error handling mechanisms in your process.
:::

To learn more about implementing retry and error handling logic in your BPMN diagram, you can refer to the [Camunda BPMN examples](https://camunda.com/bpmn/examples/) page, which includes examples of BPMN diagrams with timer and error configurations.

</TabItem>

<TabItem value='inbound'>

The **Twilio Webhook Connector** is an inbound Connector that enables you to start a BPMN process instance triggered by a [Twilio event](https://www.twilio.com/docs/usage/webhooks).

## Create a Twilio Webhook Connector task

1. Start building your BPMN diagram. You can use the **Twilio Webhook Connector** with either a **Start Event** or an **Intermediate Catch Event** building block.
2. Select the applicable element and change its template to a **Twilio Webhook Connector**.
3. Fill in all required properties.
4. Complete your BPMN diagram.
5. Deploy the diagram to activate the webhook.
6. Navigate to the **Webhooks** tab in the properties panel to see the webhook URL.
7. Run the process if you use the **Twilio Webhook Intermediate Catch Event Connector**, and only deploy the process if the diagram starts from the **Start Event**.

## Make your Twilio Webhook Connector for receiving messages executable

### Fill properties in the Webhook Configuration section

1. Choose one of the required methods in the **Webhook method** property. For example, if you know the webhook will be triggered by the **POST** method, choose **POST**. Alternatively, if it is not essential to specify a specific method for the webhook trigger, select **ANY**.
2. Configure the **Webhook ID**. By default, the **Webhook ID** is pre-filled with a random value. This value will be part of the Webhook URL. For more details about Twilio Webhook URLs, refer to the section below on [activating the Twilio Webhook Connector by deploying your diagram](#activate-the-twilio-webhook-connector-by-deploying-your-diagram).
3. Select **Enabled** in **HMAC authentication** if you want to use HMAC authentication. After that, set the [Twilio Auth Token](https://support.twilio.com/hc/en-us/articles/223136027-Auth-Tokens-and-How-to-Change-Them) as the shared secret key in the **HMAC secret key** field property.

:::note
Use Camunda secrets to store your credentials securely. Refer to the [Camunda secrets documentation](/components/console/manage-clusters/manage-secrets.md) for more details.
:::

### Fill in the properties in the **Activation** and **Correlation** sections

#### Activation condition

Optionally, configure the **Activation Condition**. For example, if an external message has the body:

```
{
  "body": {
    "ApiVersion": "2010-04-01",
    "FromCountry": "EU",
    "Body": "Hello world",
    "SmsStatus": "received"
    ...
  }
  ...
}
```

The **Activation Condition** value might look like this:

```
=(request.body.SmsStatus="received")
```

Leave this field empty to receive all messages every time.

:::note
The **Correlation** section is not applicable for the plain **start event** element template of the Twilio Connector. Plain **start events** are triggered by process instance creation and do not rely on message correlation.
:::

#### Correlation keys

- **Correlation key (process)** is a FEEL expression that defines the correlation key for the subscription. This corresponds to the **Correlation key** property of a regular **Message Intermediate Catch Event**.
- **Correlation key (payload)** is a FEEL expression used to extract the correlation key from the incoming message. This expression is evaluated in the Connector Runtime, and the result is used to correlate the message.

For example, if your correlation key is defined with a process variable named `myCorrelationKey`, and you want to correlate by the `Body` property in the request body, which contains:

```
{
  "body": {
    "ApiVersion": "2010-04-01",
    "FromCountry": "EU",
    "Body": "Continue process",
    "SmsStatus": "received"
    ...
  }
  ...
}
```

your correlation key settings will look like this:

- **Correlation key (process)**: `=myCorrelationKey`
- **Correlation key (payload)**: `=request.body.Body`

Learn more about correlation keys in the [messages guide](../../../concepts/messages).

#### Message ID expression

The **Message ID expression** is an optional field that allows you to extract the message ID from the incoming request. The message ID serves as a unique identifier for the message and is used for message correlation.
This expression is evaluated in the Connector Runtime and the result is used to correlate the message.

In most cases, it is not necessary to configure the **Message ID expression**. However, it is useful if you want to ensure message deduplication or achieve a certain message correlation behavior.
Learn more about how message IDs influence message correlation in the [messages guide](../../../concepts/messages#message-correlation-overview).

#### Message TTL

The **Message TTL** is an optional field that allows you to set the time-to-live (TTL) for the correlated messages. TTL defines the time for which the message is buffered in Zeebe before being correlated to the process instance (if it can't be correlated immediately).
The value is specified as an ISO 8601 duration. For example, `PT1H` sets the TTL to one hour. Learn more about the TTL concept in Zeebe in the [message correlation guide](../../../concepts/messages#message-buffering).

## Activate the Twilio Webhook Connector by deploying your diagram

Once you click the **Deploy** button, your Twilio Webhook will be activated and publicly available.

The URLs of the exposed Twilio Webhooks adhere to the following pattern:

`http(s)://<base URL>/inbound/<webhook ID>`

- `<base URL>` is the URL of the Connectors component deployment. When using the Camunda 8 SaaS offering, this will typically contain your **region Id** and **cluster Id**, found in your client credentials under the **API** tab within your cluster.
- `<webhook ID>` is the ID (path) you configured in the properties of your Twilio Webhook Connector.

:::note
If you make changes to your Twilio Webhook Connector configuration, you need to redeploy the BPMN diagram for the changes to take effect.
:::

When you click on the event with the Twilio Webhook Connector applied to it, a new **Webhooks** tab will appear in the properties panel.
This tab displays the URL of the Twilio Webhook Connector for every cluster where you have deployed your BPMN diagram.

:::note
The **Webhooks** tab is only supported in Web Modeler as part of the Camunda 8 SaaS offering.
You can still use the Twilio Webhook Connector in the Desktop Modeler or with Camunda 8 Self-Managed.
In that case, Twilio Webhook Connector deployments and URLs will not be displayed in the Modeler.
:::

## Variable mapping

The **Variable mapping** section allows you to configure the mapping of the webhook request to the process variables.

- Use the **Result variable** to store the response in a process variable. For example, `myResultVariable`.
- Use the **Result expression** to map specific fields from the response into process variables using [FEEL](/components/modeler/feel/what-is-feel.md). For example, given that the **Twilio Webhook Connector** is triggered with the webhook:

  ```
  {
    "body": {
      "ApiVersion": "2010-04-01",
      "FromCountry": "EU",
      "Body": "Hello world",
      "SmsStatus": "received"
      ...
    }
    ...
  }
  ```

  and you would like to extract the `SmsStatus` as a process variable `mySmsStatus`, the **Result Expression** might look like this:

  ```
  = {
    mySmsStatus: request.body.SmsStatus
  }
  ```

## Configure your Twilio account

To set a webhook URL in Twilio for SMS, follow these steps:

1. Log in to your Twilio account at [www.twilio.com/console](https://www.twilio.com/console).
2. Navigate to the **Phone Numbers** section, which you can find in the left-hand side menu.
3. Click on the phone number for which you want to set the webhook URL.
4. Scroll down to the **Messaging** section and locate the **A message comes in** field.
5. In the input box next to **A message comes in**, enter the URL where you want Twilio to send incoming SMS messages and choose the required method.
6. Save your changes.

Once you have set the webhook URL, Twilio will send a `POST` or `GET` request to that URL whenever an incoming SMS message is received on the specified phone number.

## Next steps

- Learn more about [Twilio webhooks](https://docs.github.com/en/developers/webhooks-and-events/webhooks/about-webhooks).
- Read the [Twilio webhooks FAQ](https://www.twilio.com/docs/usage/webhooks/webhooks-faq).
- Understand [Twilio webhooks security](https://www.twilio.com/docs/usage/webhooks/webhooks-security).
- Learn about [other Connectors available](./available-connectors-overview.md) in Camunda to integrate with different systems and services.
- Learn more about using Connectors [here](../use-connectors/index.md).
- Learn more about inbound Connectors [here](../use-connectors/inbound.md).

</TabItem>

</Tabs>
