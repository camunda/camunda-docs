---
id: process-instance-creation
title: "Process instance creation"
description: "Depending on the process definition, an instance of it can be created in several ways."
---

Depending on the process definition, an instance of it can be created in several ways.

Camunda 8 supports the following ways to create a process instance:

- [`CreateProcessInstance` commands](#commands)
- [Message event](#message-event)
- [Timer event](#timer-event)

## Commands

A process instance is created by sending a command specifying the BPMN process ID, or the unique key of the process.

There are two commands to create a process instance, outlined in the sections below.

### Create and execute asynchronously

A process that has a [none start event](/components/modeler/bpmn/none-events/none-events.md#none-start-events) is started explicitly using **[CreateProcessInstance](/apis-tools/zeebe-api/gateway-service.md#createprocessinstance-rpc)**.

This command creates a new process instance and immediately responds with the process instance ID. The execution of the process occurs after the response is sent.

![create-process](assets/create-process.png)

<details>
   <summary>Create a process instance via Orchestration Cluster REST API</summary>
   <p>

```
curl -L 'http://localhost:8080/v2/process-instances' \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-d '{
  "processDefinitionKey": "2251799813685249”,
  "processDefinitionVersion": 1
}'
```

Response:

```
{
  "processDefinitionId": "order-process",
  "processDefinitionVersion": 1,
  "processDefinitionKey": "2251799813685249",
  "processInstanceKey": "2251799813686019"
}
```

See the [API reference for process instance creation](/apis-tools/orchestration-cluster-api-rest/specifications/create-process-instance.api.mdx) for more information, including additional request fields and code samples.

   </p>
 </details>

### Create and await results

Typically, process creation and execution are decoupled. However, there are use cases that need to collect the results of a process when its execution is complete.

**[CreateProcessInstanceWithResult](/apis-tools/zeebe-api/gateway-service.md#createprocessinstancewithresult-rpc)** allows you to “synchronously” execute processes and receive the results via a set of variables. The response is sent when the process execution is complete.

![create-process](assets/create-process-with-result.png)

This command is typically useful for short-running processes and processes that collect information.

If the process mutates system state, or further operations rely on the process outcome response to the client, consider designing your system for failure states and retries.

:::note
When the client resends the command, it creates a new process instance.
:::

<details>
   <summary>Create a process instance and await results via Orchestration Cluster REST API</summary>
   <p>

```
curl -L 'http://localhost:8080/v2/process-instances' \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-d '{
  "processDefinitionId": "order-process”,
  "processDefinitionVersion": 1,
  "awaitCompletion": true,
  "variables": { "orderId": "1234" }
}'
```

Response:

```
{
  "processDefinitionId": "order-process",
  "processDefinitionVersion": 1,
  "variables": { "orderId": "1234" }
  "processDefinitionKey": "2251799813685249",
  "processInstanceKey": "2251799813686019",
}
```

See the [API reference for process instance creation](/apis-tools/orchestration-cluster-api-rest/specifications/create-process-instance.api.mdx) for more information, including additional request fields and code samples.

   </p>
 </details>

Failure scenarios applicable to other commands are applicable to this command as well. Clients may not get a response in the following cases even if the process execution is completed successfully:

- **Connection timeout**: If the gRPC deadlines are not configured for long request timeout, the connection may be closed before the process is completed.
- **Network connection loss**: This can occur at several steps in the communication chain.
- **Failover**: When the node processing this process crashes, another node continues the processing. The other node does not send the response because the request is registered on the first one.
- **Gateway failure**: If the gateway the client is connected to fails, nodes inside the cluster cannot send the response to the client.

### Run process segment

The [`create and execute asynchronously`](#create-and-execute-asynchronously) and [`create and await results`](#create-and-await-results) commands both start the process instance at their default initial element: the single [none start event](/components/modeler/bpmn/none-events/none-events.md#none-start-events). Camunda 8 also provides a way to create a process instance starting or ending at user-defined element(s).

:::info
This is an advanced feature. Camunda recommends to only use this functionality for testing purposes. The none start event is the defined beginning of your process. Most likely the process is modeled with the intent to start all instances from the beginning.
:::

#### Start instructions

To start the process instance at a user-defined element, you need to provide start instructions along with the command. Each instruction describes how and where to start a single element.

By default, the instruction starts before the given element. This means input mappings of that element are applied as usual.

Multiple instructions can be provided to start the process instance at more than one element.
You can activate the same element multiple times inside the created process instance by referring to the same element ID in more than one instruction.

#### Runtime instructions

By default, the process execution continues normally until the end of the process. To change this behavior and end the process instance after a specific element completes or terminates, provide runtime instructions. Each runtime instruction specifies the ID of one element whose completion or termination ends the process instance.

You can provide multiple runtime instructions to terminate the process instance after multiple elements—for example, when a process has multiple parallel flows.

:::note
Start and runtime instructions have the same [limitations as process instance modification](/components/concepts/process-instance-modification.md#limitations), e.g., it is not possible to start or end at a sequence flow.
:::

Start and runtime instructions are supported for both `CreateProcessInstance` commands. Both instruction sets can be used separately or together to achieve different scenarios.

<details>
   <summary>Create a process instance with a start and a runtime instruction</summary>
   <p>

The example below shows how to create a process instance that starts at a user-defined element and terminates after it, so that only the specified segment of the process is executed.

```
curl -L 'http://localhost:8080/v2/process-instances' \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-d '{
  "processDefinitionId": "order-process”,
  "processDefinitionVersion": -1,
  "startInstructions": [
    {
      "elementId": "ship_parcel"
    }
  ],
  "runtimeInstructions": [
    {
      "type": "TERMINATE_PROCESS_INSTANCE",
      "afterElementId": "ship_parcel"
    }
  ]
  "variables": { "orderId": "1234" }
}'
```

See the [API reference for process instance creation](/apis-tools/orchestration-cluster-api-rest/specifications/create-process-instance.api.mdx) for more information, including additional request fields and code samples.

   </p>
 </details>

## Events

Process instances are also created implicitly via various start events. Camunda 8 supports message start events and timer start events.

### Message event

A process with a [message start event](/components/modeler/bpmn/message-events/message-events.md#message-start-events) can be started by publishing a message with the name that matches the message name of the start event.

For each new message a new instance is created.

### Timer event

A process can also have one or more [timer start events](/components/modeler/bpmn/timer-events/timer-events.md#timer-start-events). An instance of the process is created when the associated timer is triggered. Timers can also trigger periodically.

## Tags (8.8+)

Process instance tags are lightweight, immutable labels you can attach when creating a process instance via the API or SDK. They help downstream workers and external systems make quick routing or decision choices without inspecting the full variable payloads.

### Definition

- A tag is a case-sensitive string.
- Format (regex): `^[A-Za-z][A-Za-z0-9_\-:.]{0,99}$`
  - Must start with a letter (A–Z or a–z).
  - Remaining characters may be alphanumeric, underscore (`_`), hyphen (`-`), colon (`:`), or dot (`.`).
- Length: 1–100 characters.
- Maximum of 10 unique tags per process instance (duplicates are ignored).
- Order is not guaranteed; treat the set as unordered.

If validation fails during process instance creation (e.g., too many tags, invalid pattern, or length), the create request is rejected with a 4xx error.

### Semantics

- Tags are included in process instance search responses and in activated job payloads.
- Tags are immutable after creation (they cannot be added, changed, or removed later).
- Search filtering uses AND semantics: an instance must contain all requested tags (it may contain additional tags). Partial or wildcard matching is not supported.
- Tags are exported with the process instance and with job entities starting in 8.8 by the default exporters.
- Tags are not shown in web applications (e.g., Operate, Tasklist) in 8.8 — they are API/SDK-only metadata.

### Use cases

- Routing and prioritization (e.g., `priority:high`)
- Business or domain identifiers from internal or third-party systems (e.g., `businessKey:1234`, `customerId:7890`, `orderId:4567`)
- Cross-system correlation keys without exposing full variable payloads (e.g., `traceId:abcd-1234`, `crmId:3004`)
- Analytics segmentation (e.g., `region:emea`, `channel:web`)
- Feature rollout or experiment grouping (e.g., `experiment:checkout-v2`)
- Environment or tenant-like labeling where full multi-tenancy isn’t required (e.g., `env:staging`)

### Guidelines

- Do not store secrets or PII; tags propagate with jobs and exports.
- Prefer concise `key:value` or `key` patterns for consistency.
- Use variables (not tags) for mutable or large data.
- Establish internal naming conventions (e.g., prefixes like `env:` or `dept:`) for governance.

### Examples

Create with tags:

```bash
curl -L 'http://localhost:8080/v2/process-instances' \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{
    "processDefinitionId": "order-process",
    "processDefinitionVersion": 3,
    "tags": ["priority:high","businessKey:1234","region:emea"],
    "variables": { "orderId": "1234" }
  }'
```

## Next steps

- [About Modeler](/components/modeler/about-modeler.md)
- [Automating a process using BPMN](/components/modeler/bpmn/automating-a-process-using-bpmn.md)
