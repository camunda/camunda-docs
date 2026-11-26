---
id: message-send
title: Message Send connector
sidebar_label: Message Send
description: Send BPMN messages in Camunda by publishing buffered messages or correlating messages directly with a process instance.
---

The Message Send connector can **publish** or **correlate** BPMN messages.  
It either calls the [PublishMessage RPC](/apis-tools/zeebe-api/gateway-service.md#publishmessage-rpc) of the Zeebe API to send messages buffered by Zeebe, or the [Correlate a message REST API](/apis-tools/orchestration-cluster-api-rest/specifications/correlate-message.api.mdx) to get the ID of the process instance that received the message without buffering.

The element template allows you to select the mode:

- `publish message (with buffer)`
- `correlate message (with result)`

and fill all parameters directly in the modeler.

The element template is available for send tasks, intermediate throw events, and message end events.

## Tenants

The connector always publishes or correlates the message in the tenant of the process instance that runs it. It can't send messages to another tenant.

Older versions of the element template have a **Tenant ID** field:

- If the field is empty or set to the tenant of the process instance, the message is sent to that tenant.
- If the field is set to any other tenant, the job fails with an incident that names both tenants. The job isn't retried.

To remove the field from an existing diagram, upgrade the element to the latest template version.

## Publish message (buffered) parameters

| Parameter       | Type              | Description                                                                                                                         | Default / Optional |
| --------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| Message name    | string            | Name of the message. Must match a receiving message event.                                                                          | Required           |
| Correlation key | string            | Value for correlating with a process instance. Can be empty to start a new instance.                                                | Optional           |
| Payload         | JSON              | Variables to transfer to the receiving process instance. Example: `{"customerName": cust_name}`. Multiple variables can be defined. | Optional           |
| Time to live    | ISO 8601 duration | Duration for which the message remains buffered, for example `PT1H`.                                                                | Optional           |
| Message ID      | string            | Unique message ID for idempotency. Ensures the message is delivered only once until correlated.                                     | Optional           |
| Request timeout | ISO 8601 duration | Timeout for the publish message command, for example `PT30S`.                                                                       | Connector default  |

### Response

| Field      | Type   | Description                        |
| ---------- | ------ | ---------------------------------- |
| messageKey | int64  | Unique ID of the published message |
| tenantId   | string | Tenant ID of the message           |

## Correlate message (with result) parameters

| Parameter       | Type              | Description                                                                                                                         | Default / Optional |
| --------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| Message name    | string            | Name of the message. Must match a receiving message event.                                                                          | Required           |
| Correlation key | string            | Value for correlating with a process instance. Can be empty to start a new instance.                                                | Optional           |
| Payload         | JSON              | Variables to transfer to the receiving process instance. Example: `{"customerName": cust_name}`. Multiple variables can be defined. | Optional           |
| Request timeout | ISO 8601 duration | Timeout for the correlate message command, for example `PT30S`.                                                                     | Connector default  |

### Response

| Field              | Type   | Description                                                   |
| ------------------ | ------ | ------------------------------------------------------------- |
| messageKey         | int64  | Unique ID of the correlated message                           |
| processInstanceKey | int64  | Key of the first process instance the message correlated with |
| tenantId           | string | Tenant ID of the message                                      |

> The connector raises an incident with a detailed error message containing the 404 status `Not found` if the message could not be correlated.
