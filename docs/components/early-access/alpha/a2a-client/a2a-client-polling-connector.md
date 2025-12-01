---
id: a2a-client-polling-connector
title: A2A Client Polling connector
sidebar_label: A2A Client Polling connector
description: "Enables interaction with remote agents using the Agent-to-Agent (A2A) protocol."
---

The **A2A Client Polling connector** is used to poll for responses from asynchronous A2A tasks. It is typically paired with the **A2A Client connector** when using the **Polling** response retrieval method.

## Create an A2A Client Polling connector task

1. Start building your BPMN diagram. You can use the **A2A Client Polling connector** with an **Intermediate Catch Event** or with a **Receive Task**.
2. Select the applicable element and change its template to a **A2A Client Polling connector**.
3. Fill in all required properties.
4. Complete your BPMN diagram.
5. Deploy the diagram to activate the **A2A Client Polling connector**.

## Make your A2A Client Polling connector executable

To make the **A2A Client Polling connector** executable, fill out the mandatory fields highlighted in red in the properties panel on the right side of the screen.

The **A2A Client Polling connector** requires the following configuration:

- Connection: Values should match those used in the **A2A Client connector**
  - **A2A server URL** (required): The base URL of the A2A server
  - **Agent card location** (optional): Path to the agent card endpoint

- Client Response
  - **A2A Client Response** (required): FEEL expression referencing the response from the **A2A Client connector**

- Options
  - **History length** (optional): Number of messages to return as part of the history when polling
    - Default: `3`

- Polling
  - **Task polling interval** (optional): Delay between polling requests as ISO-8601 duration
    - Default: `PT10S` (10 seconds)

- Activation
  - **Activation condition**: FEEL expression to determine if the polled data meet the criteria to activate the intermediate catch event
    - In most cases the default value is sufficient. The default expression checks if the polled task is in a final state.

- Correlation
  - **Message ID expression** (optional): Allows you to extract the message ID from the incoming request. The message ID serves as a unique identifier for the message and is used for message correlation.
    This expression is evaluated in the connector Runtime and the result is used to correlate the message. - In most cases, it is not necessary to configure the **Message ID expression**. However, it is useful if you want to ensure message deduplication or achieve a certain message correlation behavior.
    Learn more about how message IDs influence message correlation in the [messages guide](../../../concepts/messages#message-correlation-overview).
  - **Message TTL** (optional): Allows you to set the time-to-live (TTL) for the correlated messages. TTL defines the time for which the message is buffered in Zeebe before being correlated to the process instance (if it can't be correlated immediately).
    The value is specified as an ISO 8601 duration. For example, `PT1H` sets the TTL to one hour. Learn more about the TTL concept in Zeebe in the [message correlation guide](../../../concepts/messages#message-buffering).

    :::info
    **Correlation key (process)** and **Correlation key (payload)** are pre-filled with the required values. They are hidden since there is no need to modify them.
    :::

- Output mapping
  - **Result variable** (optional): You can typically leave empty
  - **Result expression**: FEEL expression to extract the result from the polled response
    - Typically, we need to extract the `result` field from the [response](./?a2a=outbound#response-structure) using a FEEL expression like `= {a2aAgentResponse: result}` or `= {toolCallResult: result}`
