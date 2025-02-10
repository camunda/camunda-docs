---
title: Routing events to processes
tags:
  - Event Handling
  - Process Instantiation
  - Message Handling
  - Correlation
  - SOAP
  - JMS
  - REST
  - Camel
  - ESB
  - API
  - BPMN Message Event
  - BPMN Signal Event
  - BPMN Timer Event
description: "To start a new process instance or to route a message to a running instance, choose the appropriate technology option to do so."
---

To start a new process instance or to route a message to an already running instance, you have to choose the appropriate technology option to do so, like using the existing API or using customized possibilities including SOAP, AMQP, or Kafka. Leverage the possibilities of the universe of your runtime (like Java or Node.js) and the frameworks of your choice to support the technologies or protocols you need.

## Choosing the right BPMN event

### Start events

Several BPMN start events can be used to start a new process instance.

|                         | None Event                                                                    | Message Event                                                           | Timer Event                                                            | Signal Event                                                          | Conditional Event                                                                |
| ----------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
|                         | ![none start](/img/bpmn-elements/none-start.svg)                              | ![message start](/img/bpmn-elements/message-start.svg)                  | ![timer start](/img/bpmn-elements/timer-start.svg)                     | ![signal start](/img/bpmn-elements/signal-start.svg)                  | ![conditional start](/img/bpmn-elements/conditional-start.svg)                   |
| Use when                | You have only **one start event** or a start event which is clearly standard. | You have to differentiate **several start events**.                     | You want to automatically start process instances **time controlled**. | You need to start **several process instances** at once. Rarely used. | When a specific **condition** is met, a process instance is created.             |
| Supported for Execution | ✔                                                                            | ✔                                                                      | ✔                                                                     | ✔                                                                    | Determine occurrence of condition externally yourself and use the message event. |
|                         | [Learn more](/components/modeler/bpmn/none-events/none-events.md)             | [Learn more](/components/modeler/bpmn/message-events/message-events.md) | [Learn more](/components/modeler/bpmn/timer-events/timer-events.md)    | [Learn more](/components/modeler/bpmn/signal-events/signal-events.md) |                                                                                  |

<div bpmn="best-practices/routing-events-to-processes-assets/start-events.bpmn" callouts="NoneStartEvent,MessageStartEvent1,MessageStartEvent2" />

<span className="callout">1</span>

This none start event indicates the typical starting point. Note that only _one_ such start event can exist in one process definition.

<span className="callout">2</span>

This message start event is defined to react to a specific message type...

<span className="callout">3</span>

...hence you can have _multiple_ message start events in a process definition. In this example, both message start events seems to be exceptional cases - for equivalent cases we recommend to just use message instead of none start events.

### Intermediate events

Several BPMN intermediate events (and the receive task) can be used to make a process instance _wait_ for and _react_ to certain triggers.

|                         | Message Event                                                                | Receive Task                                                                            | Timer Event                                                                    | Signal Event                                                              | Conditional Event                                                            |
| ----------------------- | ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
|                         | ![message intermediate](/img/bpmn-elements/message-intermediate.svg)         | ![task receive](/img/bpmn-elements/task-receive.svg)                                    | ![timer intermediate](/img/bpmn-elements/timer-intermediate.svg)               | ![signal intermediate](/img/bpmn-elements/signal-intermediate.svg)        | ![conditional intermediate](/img/bpmn-elements/conditional-intermediate.svg) |
| Use when                | You route an incoming **message** to a specific and unique process instance. | As alternative to message events (to leverage BPMN boundary events, e.g. for timeouts). | You want to make your process instance wait for a certain (point in) **time**. | You route an incoming **signal** to all process instances waiting for it. | When a specific **condition** is met, the waiting process instance moves on. |
| Supported for Execution | ✔                                                                           | ✔                                                                                      | ✔                                                                             | ✔                                                                        | Not yet supported in Camunda 8                                               |
|                         | [Learn more](/components/modeler/bpmn/message-events/message-events.md)      | [Learn more](/components/modeler/bpmn/receive-tasks/receive-tasks.md)                   | [Learn more](/components/modeler/bpmn/timer-events/timer-events.md)            | [Learn more](/components/modeler/bpmn/signal-events/signal-events.md)     |                                                                              |

Consider this example:

<div bpmn="best-practices/routing-events-to-processes-assets/intermediate-events.bpmn" callouts="payment-received,order-canceled" />

<span className="callout">1</span>

This intermediate message event causes the process instance to wait unconditionally for a _specific_ event...

<span className="callout">2</span>

...whereas the intermediate message event attached to the boundary of an activity waits for an _optional_ event, potentially arriving while we are occupied with the activity.

## Reacting to process-internal events

Events relevant for the process execution can occur from within the workflow engine itself.

Consider the following loan application process - or at least the initial part with which the applicant's income is confirmed either via the employer or via the last income tax statement.

<div bpmn="best-practices/routing-events-to-processes-assets/loan-application.bpmn" callouts="timer-event,human-task,conditional-event" />

<span className="callout">1</span>

In case the employer does not confirm the income within three business days, a **timer event** triggers and a human clerk now tries to contact the employer and investigate the situation.

<span className="callout">2</span>

This could end with a successful income confirmation. However, it could also end with new findings regarding the applicant's employment status. We learn that the applicant is actually unemployed.

<span className="callout">3</span>

In this case, a **conditional event** watching this data (e.g. a process variable changed by the user task) triggers and causes the process to reconsider the consequences of the new findings.

:::caution Camunda 8
Camunda 8 does not yet [support a **conditional event**](/components/modeler/bpmn/bpmn-coverage.md).
:::

A conditional event's condition expression is evaluated at it's "scope" creation time, too, and not just when variable data changes. For our example of a boundary conditional event, that means that the activity it is attached to could principally be left immediately via the boundary event. However, our process example evaluates the data via the exclusive gateway - therefore such a scenario is semantically impossible.

## Routing events from the outside to the workflow engine

Most events actually occur somewhere external to the workflow engine and need to be routed to it. The core workflow engine is by design not concerned with the technical part of receiving external messages, but you can receive messages and route them to the workflow engine by the following ways:

- Using API: Receive the message by means of your platform-specific activities such as connecting to a AMQP queue or processing a REST request and then route it to the process.
- Using Connectors: Configure a Connector to receive messages such as Kafka records and rote it to the process. Note that this possibility works for Camunda 8 only.

### Starting process instance by BPMN process ID

If you have only one starting point (none start event) in your process definition, you reference the process definition by the ID in the BPMN XML file.

:::note
This is the most common case and requires using the [`CreateProcessInstance`](/apis-tools/zeebe-api/gateway-service.md#createprocessinstance-rpc) API.
:::

Example in Java:

```java
processInstance = zeebeClient.newCreateInstanceCommand()
  .bpmnProcessId("invoice").latestVersion()
  .send()
  .exceptionally( throwable -> { throw new RuntimeException("Could not create new process instance", throwable); });
```

Example in Node.js:

```js
zbc.createWorkflowInstance({
  bpmnProcessId: "invoice",
});
```

This starts a new process instance in the latest version of the process definition. You can also start a specific version of a process definition:

```java
processInstance = zeebeClient.newCreateInstanceCommand()
  .bpmnProcessId("invoice").version(5)
  //...
```

or

```js
zbc.createWorkflowInstance({
  bpmnProcessId: "invoice",
  version: 6,
});
```

You can also use [`CreateProcessInstanceWithResult`](/apis-tools/zeebe-api/gateway-service.md#createprocessinstancewithresult-rpc) instead, if you want to block the execution until the process instance has completed.

### Starting process instance by message

As soon as you have multiple possible starting points, you have to use named messages to start process instances. The API method is [`PublishMessage`](/apis-tools/zeebe-api/gateway-service.md#publishmessage-rpc):

```java
client.newPublishMessageCommand()
  .messageName("message_invoiceReceived") // <1>
  .corrlationKey(invoiceId) // <2>
  .variables( // <3>
	  //...
  ).send()
  .exceptionally( throwable -> { throw new RuntimeException("Could not publish message", throwable); });
```

<span className="callout">1</span>

Message name as defined in the BPMN.

<span className="callout">2</span>

Correlation key has to be provided, even if a start event does not require correlation.

<span className="callout">3</span>

_Payload_ delivered with the message.

On one hand, now you do not have to know the key of the BPMN process. On the other hand, you cannot influence the version of the process definition used when starting a process instance by message.

The message name for start events should be unique for the whole workflow engine - otherwise you might experience side effects you did not intend (like starting other processes too).

## Technology examples for messages sent by external systems

In this section, we give examples for _technical messages_, which are received from
other systems, typically by leveraging technologies like e.g. SOAP, REST, JMS or
other.

<div bpmn="best-practices/routing-events-to-processes-assets/invoice-external-system.bpmn" callouts="start_event_invoice_received" />

<span className="callout">1</span>

You will need a mechanism receiving that message and routing it to the workflow engine. That could be a direct API call to Camunda. It could also be a AMQP or Kafka consumer or a SOAP endpoint using the Camunda API internally. It could even be a hotfolder polled by some framework like Apache Camel.

API examples for REST, AMQP, and Kafka are shown in [connecting the workflow engine with your world](../connecting-the-workflow-engine-with-your-world/).

## Using the Camunda BPMN framework

If you use the **Camunda BPMN Framework** as described in the book ["Real Life BPMN"](https://www.amazon.de/dp/B07XC6R17R/) you will typically have message start events (even if you only have a single start event) to connect the surrounding human flows to the technical flow via messages:

<div bpmn="best-practices/routing-events-to-processes-assets/collaboration.bpmn" callouts="MessageStartEvent1" />

<span className="callout">1</span>

This is a message start event, which allows you to show the collaboration between the human and the technical flows. However, it is the only the starting point of the technical pool and could be a none start event in terms of execution.

If there is _exactly one message start event_ for the whole process definition, it can also be treated as if it were a none start event when starting a process instance.

## Sending messages to other processes

If messages are exchanged between different processes deployed in the workflow engine you have to implement the communication yourself by writing some code that starts a new process instance.

<div bpmn="best-practices/routing-events-to-processes-assets/invoice-another-process.bpmn" callouts="send_task_route_event, send_task_2" />

<span className="callout">1</span>

Use some simple code on the sending side to route the message to a new process instance, e.g. by starting a new process instance by the BPMN ID in Java:

```java
@JobWorker(type="routeInput")
public void routeInput(@Variable String invoiceId) {
  Map<String, Object> variables = new HashMap<String, Object>();
  variables.put("invoiceId", execution.getVariable("invoiceId"));
  zeebeClient.newCreateInstanceCommand()
    .bpmnProcessId("invoice").latestVersion()
	.variables(variables)
    .send()
    .exceptionally( throwable -> { throw new RuntimeException("Could not create new process instance", throwable); });
}
```

<span className="callout">2</span>

Use some simple code on the sending side to correlate the message to a running process instance, for example in Java:

```java
@JobWorker(type="notifyOrder")
public void notifyOrder(@Variable String orderId, @Variable String paymentInformation) {
  Map<String, Object> variables = new HashMap<String, Object>();
  variables.put("paymentInformation", paymentInformation);

  execution.getProcessEngineServices().getRuntimeService()
    .createMessageCorrelation("MsgPaymentReceived")
    .processInstanceVariableEquals("orderId", orderId)
    .setVariables(variables)
    .correlate();
}
```

## Handling messages sent by a user

Sometimes explicit "user tasks" are not an appropriate choice to involve a human user to participate in a process: the user does not want to observe a task in Tasklist, but rather have the possibility to actively trigger some action right at the time when it becomes necessary from a business perspective. The difference is which event gives the _active trigger_.

<div bpmn="best-practices/routing-events-to-processes-assets/invoice-human-user.bpmn" callouts="intermediate_event_order_paid,task_check_payments,task_mark_order_as_paid" />

<span className="callout">1</span>

We did not model a user task in this process, as the user will not immediately be triggered. The user cannot do anything at the moment when the process enters this event. Instead, we made it wait for a "message" which is later triggered by a human user.

<span className="callout">2</span>

The accountant actually receives the "external trigger" by actively looking at new payments in the bank account.

<span className="callout">3</span>

Every new payment now has to be correlated to the right waiting process instance manually. In this situation it is often the better choice not to model a user task, but let the process wait for a "message" generated from a user.

These scenarios are not directly supported by Camunda Tasklist. A custom search screen built for the accountant might allow you to observe and find orders waiting for a payment. By interacting with such a screen, the accountant communicates with those process instances all at once. When hitting a 'Paid' button, a piece of custom code using the API must now correlate the user's message to the affected process instance(s).
