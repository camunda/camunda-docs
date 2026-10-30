---
id: amazon-eventbridge-inbound
sidebar_label: AWS EventBridge inbound
title: Amazon EventBridge Webhook connector
description: Start a BPMN process instance or continue a running one from an event in Amazon EventBridge.
---

import InboundConnectorBasics from '../../../components/react-components/\_connector-inbound-basics.md'
import ErrorHandling from '../../../components/react-components/\_connector-error-handling.md'

Start a process instance, or continue a running one, when an event arrives from [Amazon EventBridge](https://aws.amazon.com/eventbridge/).

## About this connector

The **Amazon EventBridge Webhook connector** is an inbound connector that exposes a webhook endpoint. Amazon EventBridge sends events to this endpoint through an API destination, which triggers your BPMN process. For example, use it to start a process instance when an EventBridge rule detects a new shipment.

You can use the connector with the following BPMN elements:

- **Start event**
- **Message start event**
- **Intermediate catch event**
- **Boundary event**
- **Receive task**

To send events from your process to Amazon EventBridge, see the [Amazon EventBridge connector](./amazon-eventbridge-outbound.md).

## Prerequisites

To send events to the webhook, you need an Amazon EventBridge setup with an API destination that points to the webhook URL. See [example of configuring Amazon EventBridge](#example-of-configuring-amazon-eventbridge).

<InboundConnectorBasics />

## Configuration

Some properties apply only to specific BPMN elements. The description of these properties names the elements they apply to. All other properties apply to all elements.

### Webhook configuration

| Property       | Type     | Required | Description                                                                                                                                                                                                                                                | Example |
| :------------- | :------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| Webhook method | Dropdown | Yes      | The HTTP method of the webhook: **Any**, **Get**, **Post**, **Put**, or **Delete**. Select **Any** if it isn't essential to specify a method for the webhook trigger. **Any** is selected by default.                                                      |         |
| Webhook ID     | String   | Yes      | The ID that is part of the webhook URL. By default, it's pre-filled with a random value. See [webhook activation](/components/connectors/protocol/http-webhook.md#activate-the-http-webhook-connector-by-deploying-your-diagram) for how the URL is built. |         |

### Authorization

| Property                     | Type     | Required             | Description                                                                                                                                                                  | Example |
| :--------------------------- | :------- | :------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| Authorization type           | Dropdown | Yes                  | The authorization type of the webhook: **None**, **JWT**, **Basic**, or **API key**. **None** is selected by default, so anyone can trigger the webhook without credentials. |         |
| JWK URL                      | String   | No, for **JWT**      | A link to the JSON Web Key (JWK) Set containing the public keys used to verify the JWT signature. [Learn more about JWK](https://datatracker.ietf.org/doc/html/rfc7517).     |         |
| Issuer                       | String   | Yes, for **JWT**     | The expected value of the JWT `iss` claim.                                                                                                                                   |         |
| Audience                     | String   | Yes, for **JWT**     | The expected value of the JWT `aud` claim.                                                                                                                                   |         |
| JWT role property expression | String   | No, for **JWT**      | A FEEL expression to extract the roles from the JWT. These roles are checked against **Required roles**. For example, `=if admin = true then ["admin"] else roles`.          |         |
| Required roles               | String   | No, for **JWT**      | A list of roles to test the JWT roles against. If provided, the webhook is only triggered if the JWT contains at least one of the required roles. For example, `["admin"]`.  |         |
| Username                     | String   | Yes, for **Basic**   | The username to authenticate the webhook.                                                                                                                                    |         |
| Password                     | String   | Yes, for **Basic**   | The password associated with the username.                                                                                                                                   |         |
| API key                      | String   | Yes, for **API key** | The API key that must be provided in the request to authenticate the webhook.                                                                                                |         |
| API key locator              | String   | Yes, for **API key** | A FEEL expression that extracts the API key from the request. The default is `=request.headers.apikey`. For example, `=split(request.headers.authorization, " ")[2]`.        |         |

The **Required** column for the properties of an authorization type refers to the matching selection in **Authorization type**.

### Activation

| Property              | Type   | Required | Description                                                                                                                                                       | Example |
| :-------------------- | :----- | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| Condition             | String | No       | A FEEL condition under which the connector triggers. Leave it empty to catch all events. See the [activation condition example](#activation-condition-example).   |         |
| Message ID expression | String | No       | A FEEL expression that extracts the unique identifier of the message. Applies to message start event, intermediate catch event, boundary event, and receive task. |         |

#### Activation condition example

If an incoming Amazon EventBridge event has the following body:

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

the **Condition** value might look like this:

```feel
=(get value(request.body, "detail-type")="MyEvent" and request.body.detail.status="received")
```

This condition triggers the Amazon EventBridge Webhook connector only when the `detail-type` is `MyEvent` and the `status` is `received`.

### Correlation

| Property                  | Type     | Required | Description                                                                                                                                                                                                                                                    | Example |
| :------------------------ | :------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| Correlation required      | Dropdown | Yes      | Indicates whether correlation is required: **Correlation not required** or **Correlation required**. This is needed for event-based subprocess message start events. Applies to message start event only. **Correlation not required** is selected by default. |         |
| Correlation key (process) | String   | Yes      | A FEEL expression that sets up the correlation key from process variables. Applies to intermediate catch event, boundary event, and receive task, and to message start event if **Correlation required** is selected.                                          |         |
| Correlation key (payload) | String   | Yes      | A FEEL expression that extracts the correlation key from the incoming message payload. Applies to intermediate catch event, boundary event, and receive task, and to message start event if **Correlation required** is selected.                              |         |

For example, if your correlation key is defined with a process variable named `myCorrelationKey`, and you want to correlate by the `shipment` property in the event detail of the [example event](#activation-condition-example), your correlation key settings look like this:

- **Correlation key (process)**: `=myCorrelationKey`
- **Correlation key (payload)**: `=request.body.detail.shipment`

### Output mapping

| Property          | Type   | Required | Description                                                        | Example |
| :---------------- | :----- | :------- | :----------------------------------------------------------------- | :------ |
| Result variable   | String | No       | The name of the variable to store the result of the connector in.  |         |
| Result expression | String | No       | A FEEL expression to map the inbound payload to process variables. |         |

For example, given an event payload like the following:

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

to extract `customer_id` and `order_total` as process variables `customerId` and `orderTotal`, the **Result expression** looks like this:

```feel
= {
  customerId: request.body.detail.customer_id,
  orderTotal: request.body.detail.order_total
}
```

## Example of configuring Amazon EventBridge

To configure Amazon EventBridge, follow the steps below:

1. Go to the [AWS Management Console](https://aws.amazon.com/console/).
2. Set the required permissions for EventBridge by navigating to [EventBridge permissions](https://aws.permissions.cloud/iam/events).
3. Access Amazon EventBridge service by going to [Amazon EventBridge](https://aws.amazon.com/eventbridge/).
4. Select **Integration > API Destination**.
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

- Learn more about [Amazon EventBridge](https://aws.amazon.com/eventbridge/) and its capabilities.
- Explore other [connectors available](./available-connectors-overview.md) in Camunda to integrate with different systems and services.
- Learn more about [inbound connectors](../use-connectors/inbound.md).
