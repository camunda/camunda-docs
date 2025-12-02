---
id: a2a-client-polling-connector
title: A2A Client Polling connector
sidebar_label: A2A Client Polling connector
description: "Poll for responses from asynchronous A2A tasks."
---

The A2A Client Polling connector polls for responses from asynchronous A2A tasks. It is typically paired with the [A2A Client connector](./a2a-client-connector.md) when using the `Polling` response retrieval method.

## Create an A2A Client Polling connector task

1. Start building your BPMN diagram. You can use the A2A Client Polling connector with an Intermediate Catch Event or with a Receive Task.
2. Select the applicable element and change its template to a A2A Client Polling connector.
3. Fill in all required properties.
4. Complete your BPMN diagram.
5. Deploy the diagram to activate the A2A Client Polling connector.

## Make the A2A Client Polling connector executable

To make the A2A Client Polling connector executable, fill out the mandatory fields highlighted in red in the properties panel on the right.

Configure the following:

- Connection: Match values used in the A2A Client connector:
  - **A2A server URL** (required): Base URL of the A2A server.
  - **Agent card location** (optional): Path to the agent card endpoint.
- **A2A Client response** (required): FEEL expression referencing the response from the A2A Client connector.
- **History length** (optional): Number of messages to return as part of the history when polling. By default, it is three.
- **Task polling interval** (optional): Delay between polling requests as ISO-8601 duration. By default, `PT10S` is 10 seconds.
- **Activation condition**: FEEL expression to determine whether the polled data meet the criteria to activate the intermediate catch event. In most cases, the default value is sufficient; it checks if the polled task is in a final state.
- **Message ID expression** (optional): Extracts the message ID from the incoming request. The message ID uniquely identifies the message, is evaluated in the connector runtime, and the result is used to correlate the message. In most cases, you don’t need to configure it, but it’s useful for message deduplication or specific correlation behavior. See [Message correlation](../../../concepts/messages.md#message-correlation-overview) for more details.
- **Message TTL** (optional): Sets the time-to-live (TTL) for correlated messages. TTL defines the time a message is buffered in Zeebe before correlation (if it can't be correlated immediately). The value is specified as an ISO-8601 duration. For example, `PT1H` sets the TTL to one hour. See [Message buffering](../../../concepts/messages.md#message-buffering) for more details.

:::note
**Correlation key (process)** and **Correlation key (payload)** are prefilled with the required values and hidden; there’s no need to modify them.
:::

- **Result variable** (optional): Typically leave empty.
- **Result expression**: FEEL expression to extract the result from the polled response. Typically extract the `result` field from the [response](./a2a-client-connector.md#response-structure) using a FEEL expression such as `= {a2aAgentResponse: result}` or `= {toolCallResult: result}`.
