---
id: a2a-client-webhook-connector
title: A2A Client Webhook connector
sidebar_label: A2A Client Webhook connector
description: "Enables interaction with remote agents using the Agent-to-Agent (A2A) protocol."
---

The **A2A Client Webhook connector** receives callbacks from remote A2A agents via HTTP webhooks. It is typically paired with the **A2A Client connector** when using the **Notification** response retrieval method.
This connector is based on the [HTTP Webhook connector](../../../connectors/protocol/http-webhook.md) and shares most of its configuration options.

## Create an A2A Client Webhook connector task

1. Start building your BPMN diagram. You can use the **A2A Client Webhook connector** with an **Intermediate Catch Event** or with a **Receive Task**.
2. Select the applicable element and change its template to a **A2A Client Webhook connector**.
3. Fill in all required properties.
4. Complete your BPMN diagram.
5. Deploy the diagram to activate the **A2A Client Webhook connector**.
6. Navigate to the **Webhooks** tab in the properties panel to see the webhook URL.

:::warning
The webhook URL obtained in step 6 should be used in the **A2A Client connector** configuration. After this step you need to redeploy your BPMN diagram.
Currently, there is no automatic way to inject the webhook URL into the **A2A Client connector** configuration.
:::

:::note
In a Camunda 8 Self-Managed environment you need to construct the Webhook URL manually. See the [HTTP Webhook connector documentation](../../../connectors/protocol/http-webhook.md#activate-the-http-webhook-connector-by-deploying-your-diagram) for more information.
:::

## Make your A2A Client Webhook connector executable

To make the **A2A Client Webhook connector** executable, fill out the mandatory fields highlighted in red in the properties panel on the right side of the screen.

The **A2A Client Webhook connector** requires the following configuration:

- Webhook ID
  - **Webhook ID** (required): Unique identifier for the webhook endpoint. This ID will be part of the webhook URL.

- Client Response
  - **A2A Client Response** (required): FEEL expression referencing the response from the **A2A Client connector**

- Authentication
  - See the [HTTP Webhook connector documentation](../../../connectors/protocol/http-webhook.md) for more information.
- Authorization
  - See the [HTTP Webhook connector documentation](../../../connectors/protocol/http-webhook.md) for more information.
- Activation
  - **Activation condition**: FEEL expression to determine if the payload meet the criteria to activate the intermediate catch event
    - In most cases the default value is sufficient. The default expression checks if the received task is in a final state.

- Correlation
  - **Message ID expression** (optional): Allows you to extract the message ID from the incoming request. The message ID serves as a unique identifier for the message and is used for message correlation.
    This expression is evaluated in the connector Runtime and the result is used to correlate the message.
    - In most cases, it is not necessary to configure the **Message ID expression**. However, it is useful if you want to ensure message deduplication or achieve a certain message correlation behavior.
      Learn more about how message IDs influence message correlation in the [messages guide](../../../concepts/messages#message-correlation-overview).
  - **Message TTL** (optional): Allows you to set the time-to-live (TTL) for the correlated messages. TTL defines the time for which the message is buffered in Zeebe before being correlated to the process instance (if it can't be correlated immediately).
    The value is specified as an ISO 8601 duration. For example, `PT1H` sets the TTL to one hour. Learn more about the TTL concept in Zeebe in the [message correlation guide](../../../concepts/messages#message-buffering).

    :::info
    **Correlation key (process)** and **Correlation key (payload)** are pre-filled with the required values. They are hidden since there is no need to modify them.
    :::

- Output mapping
  - **Result variable** (optional): You can typically leave empty
  - **Result expression**: FEEL expression to extract the result from the payload
    - Typically, we need to extract the `request.body` field using a FEEL expression like `= {a2aAgentResponse: request.body}` or `= {toolCallResult: request.body}`

:::tip
As in the **HTTP Webhook connector**, the payload is accessible via the `request` variable. Use the following references to access data:

- Body: `request.body.`.
- Headers: `request.headers.`.
- URL parameters: `request.params.`.
  :::
