---
id: amazon-eventbridge-webhook
title: Amazon EventBridge Webhook Connector
sidebar_label: Amazon EventBridge Webhook Connector
description: Learn how the Amazon EventBridge Connector allows you to start a BPMN process instance triggered by an Amazon EventBridge event.
---

The **Amazon EventBridge Webhook Connector** is an inbound Connector enabling you to start a BPMN process instance triggered by an event from [Amazon EventBridge](https://aws.amazon.com/eventbridge/).

:::note
If you have used the **Amazon EventBridge Webhook Connector** with a Self-Managed Camunda 8 configuration before the Connector SDK [0.7.0 release](https://github.com/camunda/connector-sdk/releases/tag/0.7.0), you might need to manually replace the element template. Refer to the [update guide](/guides/update-guide/connectors/060-to-070.md) for more details.
:::

## Create an Amazon EventBridge Webhook Connector task

1. Start building your BPMN diagram. You can use the **Amazon EventBridge Webhook Connector** with either a **Start Event** or an **Intermediate Catch Event** building block.
2. Select the applicable element and change its template to an **Amazon EventBridge Connector**.
3. Fill in all required properties.
4. Complete your BPMN diagram.
5. Deploy the diagram to activate the event trigger.

## Configure the Amazon EventBridge Webhook Connector

### Fill properties in the Webhook Configuration section

1. Choose one of the required methods in the **Webhook method** property. For example, if you know the webhook will be triggered by the **POST** method, choose **POST**. Alternatively, if it is not essential to specify a specific method for the webhook trigger, select **ANY**.
2. Configure the **Webhook ID**. By default, the **Webhook ID** is pre-filled with a random value. This value will be part of the Webhook URL. For more details about Webhook URLs, refer to the section below on [activating the Amazon EventBridge Webhook Connector by deploying your diagram](#activate-the-amazon-eventbridge-connector-by-deploying-your-diagram).
3. (Optional) Fill in the **Event Bus Name** property if you want to specify a specific event bus to subscribe to. If left empty, the default event bus will be used.

### Fill properties in the Authorization section

The Amazon EventBridge Webhook Connector supports four types of authorization:

- **None (without authorization)**: No authentication is required for the webhook. Anyone can trigger the webhook without any credentials.

- **JWT (JSON Web Token)**: This authorization type requires the following properties to be filled:

  - **JWK URL**: A link to the JSON Web Key (JWK) Set containing the public keys used to verify the JWT signature. [Learn more about JWK](https://datatracker.ietf.org/doc/html/rfc7517).
  - **JWT Role Property Expression** (optional): An expression to extract the roles from the JWT token. These roles will be used to check against the **Required Roles** property. For example, the expression could be:

  ```
  =if admin = true then ["admin"] else roles
  ```

  - **Required Roles** (optional): A list of roles to test JWT roles against. If provided, the webhook will only be triggered if the JWT token contains at least one of the required roles. For example, if the required role is "admin", the property could be:

  ```
  ["admin"]
  ```

- **Basic**: This authorization type requires the following properties to be filled:

  - **Username**: The username to authenticate the webhook.
  - **Password**: The password associated with the provided username.

- **API Key**: This authorization type requires the following properties to be filled:
  - **API Key**: The API key that needs to be provided in the request to authenticate the webhook.
  - **API Key Locator**: A FEEL expression that extracts the API key from the request. This expression is evaluated in the Connector Runtime to retrieve the API key from the incoming request. For example, the API Key Locator could be:
  ```
  =split(request.headers.authorization, " ")[2]
  ```
  or
  ```
  request.headers.mycustomapikey
  ```

Select the appropriate authorization type based on your security requirements and fill in the corresponding properties accordingly.

### Fill properties in the **Activation** section

1. (Optional) Configure the **Activation Condition**. This condition will be used to filter the events from the specified event source. For example, if an incoming Amazon EventBridge event has the following body:

```
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

the Activation Condition value might look like this:

```
=(get value(request.body, "detail-type")="MyEvent" and request.body.detail.status="received")
```

This condition will trigger the Amazon EventBridge Webhook Connector only when the detail-type is "MyEvent" and the status is "received".

2. When using the **Amazon EventBridge Webhook Connector** with an **Intermediate Catch Event**, fill in the **Correlation key (process)** and **Correlation key (payload)**.

- **Correlation key (process)** is a FEEL expression that defines the correlation key for the subscription. This corresponds to the **Correlation key** property of a regular **Message Intermediate Catch Event**.

- **Correlation key (payload)** is a FEEL expression used to extract the correlation key from the incoming message. This expression is evaluated in the Connector Runtime, and the result is used to correlate the message.

For example, if your correlation key is defined with a process variable named `myCorrelationKey`, and you want to correlate by the `shipment` property in the request detail, which contains:

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

your correlation key settings will look like this:

- **Correlation key (process)**: `=myCorrelationKey`
- **Correlation key (payload)**: `=request.body.detail.shipment`

## Activate the Amazon EventBridge Connector by deploying your diagram

Once you click **Deploy**, your Amazon EventBridge Webhook Connector will be activated and ready to receive events.

The URLs of the exposed Amazon EventBridge Webhooks adhere to the following pattern:

`http(s)://<base URL>/webhooks/<webhook ID>`

- `<base URL>` is the URL of the Connectors component deployment. When using the Camunda 8 SaaS offering, this will typically contain your cluster region and cluster ID.
- `<webhook ID>` is the ID (path) you configured in the properties of your Amazon EventBridge Webhook Connector.

:::note
If you make changes to your Amazon EventBridge Webhook Connector configuration, redeploy the BPMN diagram for the changes to take effect.
:::

When you click on the event with the Amazon EventBridge Webhook Connector applied to it, a new **Webhooks** tab will appear in the properties panel.
This tab displays the URL of the Amazon EventBridge Webhook Connector for every cluster where you have deployed your BPMN diagram.

:::note
The **Webhooks** tab is only supported in Web Modeler as part of the Camunda 8 SaaS offering.
You can still use the Amazon EventBridge Webhook Connector in Desktop Modeler or with Camunda 8 Self-Managed.
In that case, Amazon EventBridge Webhook Connector deployments and URLs will not be displayed in Modeler.
:::

## Variable mapping

The **Variable mapping** section allows you to configure the mapping of the event payload to the process variables.

- Use the **Result variable** to store the event data in a process variable. For example, `myEventPayload`.
- Use the **Result expression** to map specific fields from the event payload into process variables using [FEEL](/components/modeler/feel/what-is-feel.md). For example, given the Amazon EventBridge Connector is triggered with an event payload like:

```
{
    "id": "6d3d35b7-5bf2-43ec-9e55-5cfb27ad31b4",
    "detail-type": "MyEvent",
    "source": "custom.application",
    "region": "us-west-2",
    "resources": [],
    "detail": {
        "event": "order_created",
        "customer_id": "12345",
        "order_total": 100.50
    }
}
```

and you would like to extract the `customer_id` and `order_total` as process variables `customerId` and `orderTotal`, the **Result Expression** might look like this:

```
= {
customerId: request.body.detail.customer_id,
orderTotal: request.body.detail.order_total
}
```

## Example of configuring Amazon EventBridge

To configure Amazon EventBridge, follow the steps below:

1. Go to the [AWS Management Console](https://aws.amazon.com/console/).
2. Set the required permissions for EventBridge by navigating to: https://aws.permissions.cloud/iam/events.
3. Access Amazon EventBridge service by going to [Amazon EventBridge](https://aws.amazon.com/eventbridge/).
4. Click **Integration > API Destination**.
5. Switch to the **Connection** tab.
6. Create a new connection with the required authorization type (basic, API key, OAuth).
7. Now, create a new API destination with the following information:
   - Select the previously created **connection**.
   - Choose the appropriate **HTTP method**.
   - Specify the **API destination endpoint**, which should be the webhook URL generated after deploying the BPMN diagram.
8. Create a new event bus by following the documentation [here](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-create-event-bus.html).
9. Lastly, create a rule using the **API destination** that you already created. Refer to the [documentation](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-get-started.html) for guidance.

## Next steps

- Learn more about [Amazon EventBridge](https://aws.amazon.com/eventbridge/) and its capabilities.
- Explore other [Connectors available](./available-connectors-overview.md) in Camunda to integrate with different systems and services.
- Learn more about using Connectors [here](../use-connectors/index.md).
- Learn more about inbound Connectors [here](../use-connectors/inbound.md).
