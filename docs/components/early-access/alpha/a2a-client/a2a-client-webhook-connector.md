---
id: a2a-client-webhook-connector
title: A2A Client Webhook connector
sidebar_label: A2A Client Webhook connector
description: "The A2A Client Webhook connector receives callbacks from remote A2A agents via HTTP webhooks. It is typically paired with the A2A Client connector when using."
---

The A2A Client Webhook connector receives callbacks from remote A2A agents via HTTP webhooks.

It is typically paired with the [A2A Client connector](./a2a-client-connector.md) when using the `Notification` response retrieval method.
This connector is based on the [HTTP Webhook connector](../../../connectors/protocol/http-webhook.md) and shares most of its configuration options.

## Create an A2A Client Webhook connector task

1. Start building your BPMN diagram. You can use the A2A Client Webhook connector with an **Intermediate Catch Event** or with a **Receive Task**.
2. Select the applicable element and change its template to a **A2A Client Webhook connector**.
3. Fill in all required properties.
4. Complete your BPMN diagram.
5. Deploy the diagram to activate the A2A Client Webhook connector.
6. Navigate to the **Webhooks** tab in the properties panel to see the webhook URL.

:::warning
Use the URL from step 6 in the A2A Client connector configuration, then redeploy your BPMN diagram. There’s currently no automatic way to inject the webhook URL into the A2A Client connector configuration.
:::

:::note
In Camunda 8 Self-Managed, you must construct the webhook URL manually. See [HTTP webhook connector documentation](../../../connectors/protocol/http-webhook.md#activate-the-http-webhook-connector-by-deploying-your-diagram) for more information.
:::

## Make the A2A Client Webhook connector executable

To make the A2A Client Webhook connector executable, fill out the mandatory fields highlighted in red in the properties panel on the right.

Configure the following:

- **Webhook ID** (required): Unique identifier for the webhook endpoint. This ID becomes part of the webhook URL.
- **A2A Client Response** (required): FEEL expression referencing the response from the A2A Client connector.

:::note
For authentication and authorization, see [HTTP Webhook connector documentation](../../../connectors/protocol/http-webhook.md) for more information.
:::

- **Activation condition**: FEEL expression to determine if the payload meets the criteria to activate the intermediate catch event. In most cases, the default value is sufficient; it checks whether the received task is in a final state.
- **Message ID expression** (optional): Extract the message ID from the incoming request. The message ID uniquely identifies the message, is evaluated in the connector runtime, and the result is used to correlate the message. In most cases you don’t need to configure this, but it’s useful for deduplication or specific correlation behavior. See [Message correlation](../../../concepts/messages.md#message-correlation-overview) for more details.
- **Message TTL** (optional): Sets the time-to-live (TTL) for correlated messages. TTL defines the time a message is buffered in Zeebe before correlation (if it can't be correlated immediately). The value is specified as an ISO-8601 duration. For example, `PT1H` sets the TTL to one hour. See [Message buffering](../../../concepts/messages.md#message-buffering) for more details.

:::note
**Correlation key (process)** and **Correlation key (payload)** are prefilled with the required values and hidden; there’s no need to modify them.
:::

- **Result variable** (optional): Typically leave empty.
- **Result expression**: FEEL expression to extract the result from the payload. Typically, extract the `request.body` field using a FEEL expression such as `= {a2aAgentResponse: request.body}` or `= {toolCallResult: request.body}`.

:::tip
As in the HTTP Webhook connector, the payload is accessible via the `request` variable. Use the following references to access data:

- Body: `request.body.`.
- Headers: `request.headers.`.
- URL parameters: `request.params.`.
  :::
