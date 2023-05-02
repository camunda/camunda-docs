---
id: twilio
title: Twilio Connector
sidebar_label: Twilio Connector
description: Integrate your BPMN service with Twilio's messaging API to send SMS messages, get messages, and more.
---

The **Twilio Connector** allows you to integrate your BPMN service with Twilio's messaging API. With this Connector, you can send SMS messages, get messages, and more. This documentation will guide you through the process of setting up and using the **Twilio Connector**.

## Prerequisites

Before you can use the Twilio Connector, create a Twilio account and obtain an account SID and auth token from the [Twilio Console](https://www.twilio.com/console). You will also need to have a phone number to use as the sender for your SMS messages.

:::note
It is highly recommended to use Camunda secrets to store your account SID and auth token, so you don't expose sensitive information directly from the process. See [managing secrets](https://docs.camunda.org/manual/latest/user-guide/process-engine/secrets/) to learn more.
:::

## Create a Twilio Connector task

To use the Twilio Connector in your process, either change the type of existing task by clicking on it and using the wrench-shaped **Change type** context menu icon, or create a new Connector task by using the **Append Connector** context menu. Follow our [guide to using Connectors](https://docs.camunda.org/manual/latest/user-guide/process-engine/connectors/) to learn more.

## Make your Twilio Connector executable

To work with the Twilio Connector, choose the required operation type in the **Operation** section and complete the mandatory fields highlighted in red in the Connector properties panel.

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

- `Date sent after`: (Optional) The date and time to start retrieving messages from. Messages sent on or after this date and time will be included in the results. The date and time should be in ISO 8601 format, such as `2023-04-19T08:30:00Z`.
- `Date sent before`: (Optional) The date and time to stop retrieving messages at. Messages sent before this date and time will be included in the results. The date and time should be in ISO 8601 format, such as `2023-04-19T08:30:00Z`.
- `From`: (Optional) The phone number that the message was sent from. Only messages sent from this phone number will be included in the results.
- `To`: (Optional) The phone number that the message was sent to. Only messages sent to this phone number will be included in the results.
- `Page size`: (Optional) The maximum number of messages to retrieve per page. This value must be between 1 and 1000.

:::note
See the Twilio documentation on [filtering by date sent](https://www.twilio.com/docs/sms/api/message-resource?code-sample=code-read-list-messages-filter-by-before-sent-date&code-language=curl&code-sdk-version=json) and [getting filters](https://www.twilio.com/docs/sms/api/message-resource?code-sample=code-read-list-messages-matching-filter-criteria&code-language=curl&code-sdk-version=json) for more information.
:::

### getMessage operation

- `Message SID`: The SID of the message you want to retrieve. See the [Twilio documentation](https://www.twilio.com/docs/sms/api/message-resource?code-sample=code-fetch-message&code-language=curl&code-sdk-version=json) for more details.

## Handle Connector response

The **Twilio Connector** is a protocol Connector built on top of the HTTP REST Connector. Therefore, handling the response is still applicable and can be done as described in the [HTTP REST Connector response documentation](./rest.md#response).

When using the **Twilio connector**, the response from the Twilio API will be available in a temporary local response variable. This variable can be mapped to the process by specifying the Result Variable.

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
