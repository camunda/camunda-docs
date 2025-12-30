---
id: message-send
title: Message Send connector
sidebar_label: Message Send
description: "Send BPMN messages in Camunda by publishing buffered messages or correlating messages directly with a process instance. The Message Send connector can publis..."
---

The Message Send connector can **publish** or **correlate** BPMN messages.  
It either calls the [PublishMessage RPC](/apis-tools/zeebe-api/gateway-service.md#publishmessage-rpc) of the Zeebe API to send messages buffered by Zeebe, or the [Correlate a message REST API](/apis-tools/orchestration-cluster-api-rest/specifications/correlate-message.api.mdx) to get the ID of the process instance that received the message without buffering.

The element template allows you to select the mode:

- `publish message (with buffer)`
- `correlate message (with result)`

and fill all parameters directly in the modeler.

## Publish message (buffered) parameters

| Parameter       | Type   | Description                                                                                                                         | Default / Optional |
| --------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| Message name    | string | Name of the message. Must match a receiving message event.                                                                          | Required           |
| Correlation key | string | Value for correlating with a process instance. Can be empty to start a new instance.                                                | Optional           |
| Payload         | JSON   | Variables to transfer to the receiving process instance. Example: `{"customerName": cust_name}`. Multiple variables can be defined. | Required           |
| Time to live    | int    | Time in milliseconds to buffer the message.                                                                                         | No buffer          |
| Message ID      | string | Unique message ID for idempotency. Ensures the message is delivered only once until correlated.                                     | Optional           |
| Tenant ID       | string | Tenant ID of the receiving instance.                                                                                                | `<default>`        |
| Request timeout | int    | Timeout for the publish message command.                                                                                            | Connector default  |

### Response

| Field      | Type   | Description                        |
| ---------- | ------ | ---------------------------------- |
| messageKey | int64  | Unique ID of the published message |
| tenantId   | string | Tenant ID of the message           |

## Correlate message (with result) parameters

| Parameter       | Type   | Description                                                                                                                         | Default / Optional |
| --------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| Message name    | string | Name of the message. Must match a receiving message event.                                                                          | Required           |
| Correlation key | string | Value for correlating with a process instance. Can be empty to start a new instance.                                                | Optional           |
| Payload         | JSON   | Variables to transfer to the receiving process instance. Example: `{"customerName": cust_name}`. Multiple variables can be defined. | Required           |
| Tenant ID       | string | Tenant ID of the receiving instance.                                                                                                | `<default>`        |
| Request timeout | int    | Timeout for the correlate message command.                                                                                          | Connector default  |

### Response

| Field              | Type   | Description                                                   |
| ------------------ | ------ | ------------------------------------------------------------- |
| messageKey         | int64  | Unique ID of the correlated message                           |
| processInstanceKey | int64  | Key of the first process instance the message correlated with |
| tenantId           | string | Tenant ID of the message                                      |

> The connector raises an incident with a detailed error message containing the 404 status `Not found` if the message could not be correlated.
