---
id: message-send
title: Message Send Connector
sidebar_label: Message Send
description: Send Camunda BPMN Messages.
---

# Message Sending Connector

This connector can publish or correlate BPMN messages.
The connector calls either the [PublishMessage RPC](/apis-tools/zeebe-api/gateway-service.md#publishmessage-rpc)
of the Zeebe API to send messages buffered by Zeebe or calls the [Correlate a message REST API](/apis-tools/camunda-api-rest/specifications/correlate-a-message.api.mdx) to get the ID of the process instance that received the message without buffering.

The element template allows to select the mode `publish message (with buffer)` or `correlate message (with result)` and fill all parameters in the modeler.

:::note
This connector is available since Camunda 8.7.2
:::

## Publish message (buffered) parameters

- **Message name**:
  The name of the message. It must be defined in the [receiving message event](/components/modeler/bpmn/message-events/message-events.md#messages).

- **Correlation key**:
  The value of the [correlation key](/components/modeler/bpmn/message-events/message-events.md#message-correlation) of the receiving process instance. It can be empty to send a message start event. Starting a process instance with a correlation key prevent starting new process instance s with the same correlation key.

- **Payload**:
  The variables that are transferred from the sending to the receiving process instance. The payload must be given as a JSON object, for example `{"customerName": cust_name}`, where the value `cust_name` is a process variable of the sending process. You can define multiple variables in this JSON object.

- **Time to live**:
  This is the time to buffer the message in milliseconds. Default value is no buffer.

- **Message ID**:
  The unique ID of the message. It can be omitted. It is useful to provide idempotency and guarantee, that the message is only once delivered until it is consumed by a receiving process instance. Subsequent sendings will be dropped until it is correlated to a receiving process instance.

- **Tenant ID**:
  The tenant ID of the receiving process instance. If left empty, the message is published to the `<default>` tenant.

- **Request timeout**:
  The timeout to buffer the publish message command. The default value is given from the connector configuration.

### Response

- **messageKey** (int64): The unique ID of the published message.
- **tenantId**: The tenant ID of the message.

## Correlate message (with result) parameters

- **Message name**:
  The name of the message. It must be defined in the [receiving message event](/components/modeler/bpmn/message-events/message-events.md#messages)

- **Correlation key**:
  The value of the [correlation key](/components/modeler/bpmn/message-events/message-events.md#message-correlation) of the receiving process instance. It can be empty to send a message start event.

- **Payload**:
  The variables that are transferred from the sending to the receiving process instance. The payload must be given as a JSON object, for example `{"customerName": cust_name}`, where the value `cust_name` is a process variable of the sending process. You can define multiple variables in this JSON object.

- **Tenant ID**:
  The tenant ID of the receiving process instance. If left empty, the message is published to the `<default>` tenant.

- **Request timeout**:
  The timeout to buffer the publish message command. The default value is given from the connector configuration.

### Response

- **messageKey** (int64): The unique ID of the correlated message.
- **processInstanceKey** (int64): The key of the first process instance that the message correlated with.
- **tenantId**: The tenant ID of the message.

The connector raises an incident with a detailed error message containing the 404 status `Not found` response from the API call if the message could not be correlated.
