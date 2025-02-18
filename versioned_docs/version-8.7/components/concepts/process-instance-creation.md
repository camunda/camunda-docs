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
  <summary>Code example</summary>
  <p>
Create a process instance:

```
zbctl create instance "order-process"
```

Response:

```
{
  "processKey": 2251799813685249,
  "bpmnProcessId": "order-process",
  "version": 1,
  "processInstanceKey": 2251799813686019
}

```

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
  <summary>Code example</summary>
  <p>
Create a process instance and await results:

```
zbctl create instance "order-process" --withResult --variables '{"orderId": "1234"}'
```

Response:

:::note
The variables in the response depend on the process.
:::

```
{
  "processKey": 2251799813685249,
  "bpmnProcessId": "order-process",
  "version": 1,
  "processInstanceKey": 2251799813686045,
  "variables": "{\"orderId\":\"1234\"}"
}
```

  </p>
</details>

Failure scenarios applicable to other commands are applicable to this command as well. Clients may not get a response in the following cases even if the process execution is completed successfully:

- **Connection timeout**: If the gRPC deadlines are not configured for long request timeout, the connection may be closed before the process is completed.
- **Network connection loss**: This can occur at several steps in the communication chain.
- **Failover**: When the node processing this process crashes, another node continues the processing. The other node does not send the response because the request is registered on the first one.
- **Gateway failure**: If the gateway the client is connected to fails, nodes inside the cluster cannot send the response to the client.

### Create and start at a user-defined element

The [`create and execute asynchronously`](#create-and-execute-asynchronously) and [`create and await results`](#create-and-await-results) commands both start the process instance at their default initial element: the single [none start event](/components/modeler/bpmn/none-events/none-events.md#none-start-events). Camunda 8 also provides a way to create a process instance starting at user-defined element(s).

:::info
This is an advanced feature. Camunda recommends to only use this functionality for testing purposes. The none start event is the defined beginning of your process. Most likely the process is modeled with the intent to start all instances from the beginning.
:::

To start the process instance at a user-defined element, you need to provide start instructions along with the command. Each instruction describes how and where to start a single element.

By default, the instruction starts before the given element. This means input mappings of that element are applied as usual.

Multiple instructions can be provided to start the process instance at more than one element.
You can activate the same element multiple times inside the created process instance by referring to the same element ID in more than one instruction.

:::note
Start instructions have the same [limitations as process instance modification](/components/concepts/process-instance-modification.md#limitations), e.g., it is not possible to start at a sequence flow.
:::

Start instructions are supported for both `CreateProcessInstance` commands.

<details>
  <summary>Code example</summary>
  <p>
Create a process instance starting before the 'ship_parcel' element:

```java
client.newCreateInstanceCommand()
  .bpmnProcessId("order-process")
  .latestVersion()
  .variables(Map.of("orderId", "1234"))
  .startBeforeElement("ship_parcel")
  .send()
  .join();
```

  </p>
</details>

## Events

Process instances are also created implicitly via various start events. Camunda 8 supports message start events and timer start events.

### Message event

A process with a [message start event](/components/modeler/bpmn/message-events/message-events.md#message-start-events) can be started by publishing a message with the name that matches the message name of the start event.

For each new message a new instance is created.

### Timer event

A process can also have one or more [timer start events](/components/modeler/bpmn/timer-events/timer-events.md#timer-start-events). An instance of the process is created when the associated timer is triggered. Timers can also trigger periodically.

## Next steps

- [About Modeler](/components/modeler/about-modeler.md)
- [Automating a process using BPMN](/guides/automating-a-process-using-bpmn.md)
