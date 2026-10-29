---
id: amazon-eventbridge-inbound
sidebar_label: AWS EventBridge inbound
title: Amazon EventBridge Webhook connector
description: Start or continue a BPMN process when an event arrives from Amazon EventBridge.
---

import InboundConnectorBasics from '../../../components/react-components/\_connector-inbound-basics.md'
import ErrorHandling from '../../../components/react-components/\_connector-error-handling.md'

Start a BPMN process instance, or continue a running one, when an event arrives from [Amazon EventBridge](https://aws.amazon.com/eventbridge/).

## About this connector

The **Amazon EventBridge Webhook connector** is an inbound connector that exposes a webhook URL. Amazon EventBridge delivers events to this URL through an API destination, and the connector triggers your process with the event.

You can use the connector with the following BPMN elements:

- **Start event**
- **Message start event**
- **Intermediate catch event**
- **Boundary event**
- **Receive task**

To send events from a process to Amazon EventBridge, see the [Amazon EventBridge connector](./amazon-eventbridge-outbound.md).

## Prerequisites

- An AWS account with access to [Amazon EventBridge](https://aws.amazon.com/eventbridge/) and permission to create an event bus, a connection, an API destination, and a rule. Refer to the [Amazon EventBridge documentation](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-get-started.html) to learn more.
- A webhook URL that Amazon EventBridge can reach. The URL is generated when you deploy your BPMN diagram. Learn more in [Activate the connector](#activate-the-connector).

<InboundConnectorBasics />

## Configuration

Some properties apply only to certain BPMN elements. These are marked in the **Description** column.

### Webhook configuration

| Property       | Type     | Required | Description                                                                                                                                                                          | Example  |
| :------------- | :------- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------- |
| Webhook method | Dropdown | Yes      | The HTTP method the webhook accepts: **Any**, **Get**, **Post**, **Put**, or **Delete**. Select **Any** if it is not essential to specify a method. Defaults to **Any**.             | **Post** |
| Webhook ID     | String   | Yes      | The ID (path) of the webhook. It becomes part of the webhook URL. By default, the Modeler pre-fills a random value. Learn more in [Activate the connector](#activate-the-connector). |          |

### Authorization

Select how the webhook authorizes incoming requests.

| Property                     | Type     | Required | Description                                                                                                                                                                                                                                                                                                                                    | Example                                         |
| :--------------------------- | :------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------- |
| Authorization type           | Dropdown | Yes      | The authorization type: **None**, **JWT**, **Basic**, or **API key**. With **None**, anyone can trigger the webhook without credentials. Defaults to **None**.                                                                                                                                                                                 | **API key**                                     |
| JWK URL                      | String   | No       | The well-known URL of the JSON Web Key (JWK) set that contains the public keys used to verify the JWT signature. [Learn more about JWK](https://datatracker.ietf.org/doc/html/rfc7517). Shown when **Authorization type** is **JWT**.                                                                                                          |                                                 |
| Issuer                       | String   | Yes      | The expected value of the JWT `iss` claim. Shown when **Authorization type** is **JWT**.                                                                                                                                                                                                                                                       |                                                 |
| Audience                     | String   | Yes      | The expected value of the JWT `aud` claim. Shown when **Authorization type** is **JWT**.                                                                                                                                                                                                                                                       |                                                 |
| JWT role property expression | String   | No       | A FEEL expression to extract the roles from the JWT. The roles are checked against **Required roles**. Shown when **Authorization type** is **JWT**. Learn more in [How to extract roles from JWT data](../protocol/http-webhook.md#how-to-extract-roles-from-jwt-data).                                                                       | `=if admin = true then ["admin"] else roles`    |
| Required roles               | String   | No       | A FEEL expression for a list of roles to test the JWT roles against. If set, the webhook triggers only if the JWT contains at least one of the required roles. Shown when **Authorization type** is **JWT**.                                                                                                                                   | `["admin"]`                                     |
| Username                     | String   | Yes      | The username to authenticate the webhook. Shown when **Authorization type** is **Basic**.                                                                                                                                                                                                                                                      |                                                 |
| Password                     | String   | Yes      | The password for the username. Shown when **Authorization type** is **Basic**.                                                                                                                                                                                                                                                                 |                                                 |
| API key                      | String   | Yes      | The API key the request must provide to authenticate. Shown when **Authorization type** is **API key**.                                                                                                                                                                                                                                        |                                                 |
| API key locator              | String   | Yes      | A FEEL expression that extracts the API key from the request. The connector runtime evaluates it on the incoming request. Shown when **Authorization type** is **API key**. Defaults to `=request.headers.apikey`. Learn more in [How to configure API key authorization](../protocol/http-webhook.md#how-to-configure-api-key-authorization). | `=split(request.headers.authorization, " ")[2]` |

### Activation

| Property              | Type   | Required | Description                                                                                                                                                                                                    | Example                                                                                         |
| :-------------------- | :----- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------- |
| Condition             | String | No       | A FEEL condition under which the connector triggers. Leave empty to catch all events.                                                                                                                          | `=(get value(request.body, "detail-type")="MyEvent" and request.body.detail.status="received")` |
| Message ID expression | String | No       | A FEEL expression to extract a unique identifier of the message from the incoming event. Use it for message deduplication or to achieve a certain correlation behavior. Not available for the **Start event**. | `=request.body.detail.transactionId`                                                            |

For example, if an incoming Amazon EventBridge event has the following body:

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

the **Condition** `=(get value(request.body, "detail-type")="MyEvent" and request.body.detail.status="received")` triggers the connector only when the `detail-type` is `MyEvent` and the `status` is `received`.

Learn more about activation conditions and message IDs in [HTTP Webhook connector](../protocol/http-webhook.md).

### Correlation

Correlation applies to the **Message start event** (optional), **Intermediate catch event**, **Boundary event**, and **Receive task**. It does not apply to the **Start event**.

| Property                  | Type     | Required | Description                                                                                                                                                                                                                                            | Example                         |
| :------------------------ | :------- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------ |
| Correlation required      | Dropdown | Yes      | Indicates whether correlation is required: **Correlation not required** or **Correlation required**. Defaults to **Correlation not required**. Needed for event-based subprocess message start events. Available for the **Message start event** only. | **Correlation required**        |
| Correlation key (process) | String   | Yes      | A FEEL expression that sets up the correlation key from process variables. It corresponds to the **Correlation key** property of a regular message catch event. For the **Message start event**, shown when **Correlation required** is selected.      | `=myCorrelationKey`             |
| Correlation key (payload) | String   | Yes      | A FEEL expression that extracts the correlation key from the incoming event. The connector runtime evaluates it, and uses the result to correlate the message. For the **Message start event**, shown when **Correlation required** is selected.       | `=request.body.detail.shipment` |

For example, if your correlation key is a process variable named `myCorrelationKey`, and you want to correlate by the `shipment` property in the event `detail` shown in the previous example, set **Correlation key (process)** to `=myCorrelationKey` and **Correlation key (payload)** to `=request.body.detail.shipment`.

Learn more about correlation in [HTTP Webhook connector](../protocol/http-webhook.md#correlation).

## Activate the connector

When you deploy your BPMN diagram, the connector is activated and ready to receive events. The webhook URL follows this pattern:

`http(s)://<base URL>/webhooks/<webhook ID>`

- `<base URL>` is the URL of the connectors component deployment. In Camunda 8 SaaS, it typically contains your **region ID** and **cluster ID**, found in your client credentials under the **API** tab of your cluster.
- `<webhook ID>` is the **Webhook ID** you configured.

If you change the connector configuration, redeploy the BPMN diagram for the changes to take effect.

After you select the element, a **Webhooks** tab appears in the properties panel. It shows the webhook URL for every cluster where you deployed the diagram.

:::note
The **Webhooks** tab is only supported in Camunda Hub as part of the Camunda 8 SaaS offering. You can still use the connector in Desktop Modeler or with Camunda 8 Self-Managed, but webhook deployments and URLs aren't displayed in Desktop Modeler.
:::

## Output

The event body is available in your process as `request.body`. Use **Result variable** to store it, or **Result expression** to map specific fields into process variables. For example, for an event with this `detail`:

```json
{
  "detail": {
    "event": "order_created",
    "customer_id": "12345",
    "order_total": 100.5
  }
}
```

to extract `customer_id` and `order_total` as `customerId` and `orderTotal`, use this **Result expression**:

```feel
= {
  customerId: request.body.detail.customer_id,
  orderTotal: request.body.detail.order_total
}
```

## Example: configure Amazon EventBridge

To configure Amazon EventBridge to send events to the connector, follow these steps:

1. Go to the [AWS Management Console](https://aws.amazon.com/console/).
2. Set the required permissions for EventBridge by navigating to: https://aws.permissions.cloud/iam/events.
3. Access the [Amazon EventBridge](https://aws.amazon.com/eventbridge/) service.
4. Click **Integration > API Destination**.
5. Switch to the **Connection** tab.
6. Create a new connection with the required authorization type (basic, API key, OAuth).
7. Create a new API destination with the following information:
   - Select the previously created **connection**.
   - Choose the appropriate **HTTP method**.
   - Specify the **API destination endpoint**, which is the webhook URL generated after deploying the BPMN diagram.
8. Create a new event bus by following the [Amazon EventBridge documentation](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-create-event-bus.html).
9. Create a rule using the **API destination** you created. Refer to the [documentation](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-get-started.html) for guidance.

<ErrorHandling />

## Further resources

- [Amazon EventBridge](https://aws.amazon.com/eventbridge/)
- [Amazon EventBridge Connector](./amazon-eventbridge-outbound.md)
- [HTTP Webhook connector](../protocol/http-webhook.md)
