---
id: amazon-eventbridge-inbound
sidebar_label: AWS EventBridge inbound
title: Amazon EventBridge Webhook connector
description: Start or continue a BPMN process from an Amazon EventBridge event.
---

import InboundConnectorBasics from '../../../components/react-components/\_connector-inbound-basics.md'
import ErrorHandling from '../../../components/react-components/\_connector-error-handling.md'

Start a process instance or continue a running one when an event from [Amazon EventBridge](https://aws.amazon.com/eventbridge/) arrives at a webhook.

## About this connector

The **Amazon EventBridge Webhook connector** is an inbound connector that receives events from [Amazon EventBridge](https://aws.amazon.com/eventbridge/) through a webhook. You can use it with the following BPMN elements:

- Start event
- Message start event
- Intermediate catch event
- Boundary event
- Receive task

To send events to Amazon EventBridge from a process, see the [Amazon EventBridge connector](./amazon-eventbridge-outbound.md).

## Prerequisites

To use the **Amazon EventBridge Webhook connector**, you need an AWS account with the permissions to configure Amazon EventBridge, as described in [Configure Amazon EventBridge](#configure-amazon-eventbridge). In EventBridge, an API destination sends events to the webhook URL of the connector.

<InboundConnectorBasics />

## Configuration

Some properties apply only to certain BPMN elements. The **Description** column notes where a property is limited to specific elements.

### Webhook

| Property       | Type     | Required | Description                                                                                                                                                                                                                                                                               | Example |
| :------------- | :------- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| Webhook method | Dropdown | Yes      | The HTTP method that triggers the webhook: **Any** (default), **Get**, **Post**, **Put**, or **Delete**. Select **Any** if it is not essential to specify a method for the webhook trigger.                                                                                               |         |
| Webhook ID     | String   | Yes      | The ID is part of the webhook URL. The URL has the pattern `http(s)://<base URL>/webhooks/<webhook ID>`. Learn how to [find the webhook URL](/components/connectors/protocol/http-webhook.md#activate-the-http-webhook-connector-by-deploying-your-diagram) after deploying your diagram. |         |

### Authorization

| Property                     | Type     | Required             | Description                                                                                                                                                                 | Example                                                                           |
| :--------------------------- | :------- | :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------- |
| Authorization type           | Dropdown | Yes                  | The authorization type of the webhook: **None** (default, anyone can trigger the webhook without credentials), **JWT**, **Basic**, or **API key**.                          |                                                                                   |
| JWK URL                      | String   | No, for **JWT**      | A link to the JSON Web Key (JWK) Set that contains the public keys used to verify the JWT signature. [Learn more about JWK](https://datatracker.ietf.org/doc/html/rfc7517). |                                                                                   |
| Issuer                       | String   | Yes, for **JWT**     | The expected value of the JWT `iss` claim.                                                                                                                                  |                                                                                   |
| Audience                     | String   | Yes, for **JWT**     | The expected value of the JWT `aud` claim.                                                                                                                                  |                                                                                   |
| JWT role property expression | String   | No, for **JWT**      | An expression to extract the roles from the JWT. The roles are checked against **Required roles**.                                                                          | `=if admin = true then ["admin"] else roles`                                      |
| Required roles               | String   | No, for **JWT**      | A list of roles to test the JWT roles against. If set, the webhook triggers only if the JWT contains at least one of the required roles.                                    | `["admin"]`                                                                       |
| Username                     | String   | Yes, for **Basic**   | The username to authenticate the webhook.                                                                                                                                   |                                                                                   |
| Password                     | String   | Yes, for **Basic**   | The password for the username.                                                                                                                                              |                                                                                   |
| API key                      | String   | Yes, for **API key** | The API key that the request must provide to authenticate the webhook.                                                                                                      |                                                                                   |
| API key locator              | String   | Yes, for **API key** | A FEEL expression that extracts the API key from the request. It is evaluated in the connector runtime. The template default is `=request.headers.apikey`.                  | `=split(request.headers.authorization, " ")[2]`, `request.headers.mycustomapikey` |

### Activation

| Property  | Type   | Required | Description                                                                                                                                                                             | Example                                                                                         |
| :-------- | :----- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------- |
| Condition | String | No       | A FEEL condition to filter the incoming events. The connector triggers only if the condition is met. Leave empty to catch all events. See the [example](#activation-condition-example). | `=(get value(request.body, "detail-type")="MyEvent" and request.body.detail.status="received")` |

#### Activation condition example

Given an incoming Amazon EventBridge event with the following body:

```json
{
  "version": "0",
  "id": "6d3d35b7-5bf2-43ec-9e55-5cfb27ad31b4",
  "detail-type": "MyEvent",
  "source": "custom.application",
  "account": "123456789012",
  "time": "2023-07-25T12:34:56Z",
  "region": "us-west-2",
  "resources": [],
  "detail": {
    "shipment": "123456789",
    "status": "received"
  }
}
```

The following **Condition** triggers the connector only when the `detail-type` is `MyEvent` and the `status` is `received`:

```feel
=(get value(request.body, "detail-type")="MyEvent" and request.body.detail.status="received")
```

### Correlation

The properties apply only to elements that correlate events to a running process instance, or to a message start event with correlation enabled.

| Property                  | Type     | Required | Description                                                                                                                                                                                                     | Example                              |
| :------------------------ | :------- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------- |
| Correlation required      | Dropdown | Yes      | Whether correlation is required: **Correlation not required** (default) or **Correlation required**. Message start event only. Select **Correlation required** for event-based subprocess message start events. |                                      |
| Correlation key (process) | String   | Yes      | A FEEL expression that defines the correlation key of the subscription. Intermediate catch event, boundary event, and receive task. For a message start event, shown when **Correlation required** is selected. | `=myCorrelationKey`                  |
| Correlation key (payload) | String   | Yes      | A FEEL expression that extracts the correlation key from the incoming message. It is evaluated in the connector runtime. Same elements as **Correlation key (process)**.                                        | `=request.body.detail.shipment`      |
| Message ID expression     | String   | No       | An expression that extracts a unique identifier from the incoming message. Not available for the start event.                                                                                                   | `=request.body.detail.transactionId` |

For example, if your correlation key is a process variable `myCorrelationKey`, and you want to correlate by the `shipment` property in the event `detail` shown in the [activation condition example](#activation-condition-example), set **Correlation key (process)** to `=myCorrelationKey` and **Correlation key (payload)** to `=request.body.detail.shipment`.

Learn more about how message IDs influence message correlation in the [messages guide](/components/concepts/messages.md#message-correlation-overview).

## Output

The connector makes the received event available as `request.body`. Use **Result variable** or **Result expression** in the **Output mapping** section to map it to process variables. For example, given an event with this payload:

```json
{
  "id": "6d3d35b7-5bf2-43ec-9e55-5cfb27ad31b4",
  "detail-type": "MyEvent",
  "source": "custom.application",
  "region": "us-west-2",
  "resources": [],
  "detail": {
    "event": "order_created",
    "customer_id": "12345",
    "order_total": 100.5
  }
}
```

the following **Result expression** extracts the `customer_id` and `order_total` as the process variables `customerId` and `orderTotal`:

```feel
= {
  customerId: request.body.detail.customer_id,
  orderTotal: request.body.detail.order_total
}
```

## Configure Amazon EventBridge

To configure Amazon EventBridge to send events to the connector, follow these steps:

1. Go to the [AWS Management Console](https://aws.amazon.com/console/).
2. Set the required permissions for EventBridge by navigating to: https://aws.permissions.cloud/iam/events.
3. Access Amazon EventBridge service by going to [Amazon EventBridge](https://aws.amazon.com/eventbridge/).
4. Click **Integration > API Destination**.
5. Switch to the **Connection** tab.
6. Create a new connection with the required authorization type (basic, API key, OAuth).
7. Create a new API destination with the following information:
   - Select the previously created **connection**.
   - Choose the appropriate **HTTP method**.
   - Specify the **API destination endpoint**, which should be the webhook URL generated after deploying the BPMN diagram.
8. Create a new event bus by following the [Amazon EventBridge documentation](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-create-event-bus.html).
9. Create a rule using the **API destination** that you already created. Refer to the [documentation](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-get-started.html) for guidance.

<ErrorHandling />

## Further resources

- [Amazon EventBridge documentation](https://docs.aws.amazon.com/eventbridge/)
- [Amazon EventBridge connector](./amazon-eventbridge-outbound.md)
- [Available connectors](./available-connectors-overview.md)
- [Use an inbound connector](../use-connectors/inbound.md)
