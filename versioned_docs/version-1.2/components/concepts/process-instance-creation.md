---
id: process-instance-creation
title: "Process instance creation"
---

Depending on the process definition, an instance of it can be created in several ways.

At Camunda, this includes the following:

- `CreateProcessInstance` commands
- Timer event handler
- Message event

## Commands

A process instance is created by sending a command specifying the BPMN process id, or the unique key of the process.

There are two commands to create a process instance, outlined in the sections below.

### Create and execute asynchronously

A process that has a [none start event](/reference/bpmn-processes/none-events/none-events.md#none-start-events) is started explicitly using **[CreateProcessInstance](/apis-tools/grpc.md#createprocessinstance-rpc)**.

This command creates a new process instance and immediately responds with the process instance id. The execution of the process occurs after the response is sent.

![create-process](assets/create-process.png)

 <details>
   <summary>Code example</summary>
   <p>Create a process instance:

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

**[CreateProcessInstanceWithResult](/apis-tools/grpc.md#createprocessinstancewithresult-rpc)** allows you to “synchronously” execute processes and receive the results via a set of variables. The response is sent when the process execution is complete.

![create-process](assets/create-process-with-result.png)

This command is typically useful for short-running processes and processes that collect information.

If the process mutates system state, or further operations rely on the process outcome response to the client, consider designing your system for failure states and retries.

**NOTE**: When the client resends the command, it creates a new process instance.

<details>
  <summary>Code example</summary>
  <p>Create a process instance and await results:

```
zbctl create instance "order-process" --withResult --variables '{"orderId": "1234"}'
```

Response: (Note that the variables in the response depend on the process.)

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

## Events

Process instances are also created implicitly via various start events. Camunda Cloud supports message start events and timer start events.

### Message event

A process with a [message start event](/reference/bpmn-processes/message-events/message-events.md#message-start-events) can be started by publishing a message with the name that matches the message name of the start event.

For each new message a new instance is created.

### Timer event

A process can also have one or more [timer start events](/reference/bpmn-processes/timer-events/timer-events.md#timer-start-events). An instance of the process is created when the associated timer is triggered. Timers can also trigger periodically.
