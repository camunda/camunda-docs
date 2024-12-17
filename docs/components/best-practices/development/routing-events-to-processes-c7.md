---
title: Routing events to processes in Camunda 7
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

<span class="badge badge--platform">Camunda 7 only</span>

To start a new process instance or to route a message to an already running instance, you have to choose the appropriate technology option to do so, like using the existing API or using customized possibilities including SOAP, AMQP, or Kafka. Leverage the possibilities of the universe of your runtime (like Java or Node.js) and the frameworks of your choice to support the technologies or protocols you need.

## Choosing the right BPMN event

### Start events

Several BPMN start events can be used to start a new process instance.

|                         | None Event                                                                    | Message Event                                                           | Timer Event                                                            | Signal Event                                                          | Conditional Event                                                                |
| ----------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
|                         | ![none start](/img/bpmn-elements/none-start.svg)                              | ![message start](/img/bpmn-elements/message-start.svg)                  | ![timer start](/img/bpmn-elements/timer-start.svg)                     | ![signal start](/img/bpmn-elements/signal-start.svg)                  | ![conditional start](/img/bpmn-elements/conditional-start.svg)                   |
| Use when                | You have only **one start event** or a start event which is clearly standard. | You have to differentiate **several start events**.                     | You want to automatically start process instances **time controlled**. | You need to start **several process instances** at once. Rarely used. | When a specific **condition** is met, a process instance is created.             |
| Supported for Execution | &#10004;                                                                      | &#10004;                                                                | &#10004;                                                               | &#10004;                                                              | Determine occurrence of condition externally yourself and use the message event. |
|                         | [Learn more](/components/modeler/bpmn/none-events/none-events.md)             | [Learn more](/components/modeler/bpmn/message-events/message-events.md) | [Learn more](/components/modeler/bpmn/timer-events/timer-events.md)    |                                                                       |                                                                                  |

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
| Supported for Execution | &#10004                                                                      | &#10004;                                                                                | &#10004;                                                                       | &#10004;                                                                  | &#10004;                                                                     |
|                         | [Learn more](/components/modeler/bpmn/message-events/message-events.md)      | [Learn more](/components/modeler/bpmn/receive-tasks/receive-tasks.md)                   | [Learn more](/components/modeler/bpmn/timer-events/timer-events.md)            |                                                                           |

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

A conditional event's condition expression is evaluated at it's "scope" creation time, too, and not just when variable data changes. For our example of a boundary conditional event, that means that the activity it is attached to could principally be left immediately via the boundary event. However, our process example evaluates the data via the exclusive gateway - therefore such a scenario is semantically impossible.

## Routing events from the outside to the workflow engine

Most events actually occur somewhere external to the workflow engine and need to be routed to it. The core workflow engine is by design not concerned with the technical part of receiving external messages, but you can receive messages and route them to the workflow engine by the following ways:

- Using API: Receive the message by means of your platform-specific activities such as connecting to a AMQP queue or processing a REST request and then route it to the process.
- Using Connectors: Configure a Connector to receive messages such as Kafka records and rote it to the process. Note that this possibility works for Camunda 8 only.

#### Starting process instances by key

If you have only one starting point in a process diagram, you reference the process definition by the ID in the BPMN XML file. This is the most common case.

```java
  processEngine.getRuntimeService().startProcessInstanceByKey('invoice'); // <1>
```

<span className="callout">1</span>

Process _ID_ defined in the BPMN. The API calls this ID the "Key" of the process.

Refer to the [Process Engine API](https://docs.camunda.org/manual/latest/user-guide/process-engine/process-engine-api/) for more details.

#### Starting process instances by message

As soon as you have multiple possible starting points in a process diagram, you have to use named messages to start process instances.

```java
processEngine.getRuntimeService()
  .createMessageCorrelation('message_invoiceReceived') // <1>
  .setVariable("invoiceId", "123456") // <2>
  .correlate();
```

<span className="callout">1</span>

Message _Name_ defined in the BPMN

<span className="callout">2</span>

_Payload_ delivered with the message

On one hand, now you do not have to know the key of the BPMN process. On the other hand, you cannot influence the version of the process definition used when starting a process instance by message.

The message name for start events has to be _unique_ to the whole workflow engine - otherwise the engine will not know which process to start.

#### Starting specific versions of process instances by ID

Refer to [versioning process definitions](../../operations/versioning-process-definitions/) for details on versioning of process definitions.

By default, the workflow engine always starts the newest version of a process definition. You can start a specific version of a process definition by referencing the _ID_ (primary key) of that definition in the engine's database.

```java
ProcessDefinition processDefinition = processEngine().getRepositoryService()
  .createProcessDefinitionQuery()
  .processDefinitionKey("invoice")
  .processDefinitionVersion(17)
  .singleResult();
processEngine().getRuntimeService()
  .startProcessInstanceById(processDefinition.getId()); // <1>
```

<span className="callout">1</span>

"By ID" does _NOT_ relate to the ID in the BPMN XML file (which is known as "Key" in the process engine). Instead, ID relates to the _primary key_ in the Camunda database. You don't have influence on this ID - it will be created during deployment time.

#### Correlating messages to running process instances

In case you want to route an event to a process instance already started, you will need to _correlate_ the message to the specific process instance waiting for it by matching some properties of the incoming message to some properties of your process instance:

```java
runtimeService
  .createMessageCorrelation("myMessage") // <1>
  .processInstanceBusinessKey(myMessage.getOrderId().toString()) // <2>
  .processInstanceVariableEquals("customerId", myMessage.getCustomerId()) // <3>
  .correlate();
```

<span className="callout">1</span>

A process instance matches if it is waiting for a message _named_ myMessage...

<span className="callout">2</span>

...if it carries the orderId of the message as its _business key_...

<span className="callout">3</span>

...and if a _process variable_ "customerId" also matches the expectations.

As a best practice, correlate incoming messages based on _one_ unique artificial attribute (e.g. `correlationIdMyMessage`) created specifically for this communication:

```java
runtimeService
  .createMessageCorrelation("myMessage")
  .processInstanceVariableEquals("correlationIdMyMessage", myMessage.getCustomCorrelationId())
  .correlate();
```

Alternatively, you also have the option to select the process instance targeted by a message based on a query involving complex criteria, and then as a second step explicitly correlate the message to the selected process instance.

The [API docs](https://docs.camunda.org/manual/latest/reference/bpmn20/events/message-events/#explicitly-triggering-a-message) show more details about the possibilities to trigger message events.

#### Routings signals to process instances

In the case of a [BPMN signal](https://docs.camunda.org/manual/latest/reference/bpmn20/events/signal-events/), a correlation to a specific process instance is neither necessary nor possible, as the mechanism is meant to inform _all_ process instances "subscribing" to a specific signal event:

```java
runtimeService
  .createSignalEvent("mySignal") // <1>
  .setVariables(variables) // pass variables (optional)
  .send();
```

<span className="callout">1</span>

A process instance matches if it is waiting for or started by a signal _named_ `mySignal`.

#### Starting process instances at arbitrary nodes

There are use cases when you want to start a process instance at some point
other than the modeled start event:

- **Testing**: It's always best to test a process instances in chunks, so you don't always need to start at the beginning.

- **Migration**: When migrating to Camunda, you might have existing process
  instances you want to migrate to a new Camunda process instances **in a defined state**.

In these cases, you can start a process instance in arbitrary activities using the API.

<div bpmn="best-practices/routing-events-to-processes-assets/start-events.bpmn" callouts="service_task_publish_on_twitter" />

<span className="callout">1</span>

This example starts the Twitter process directly before the "Publish on Twitter" service task, meaning the service task will be executed:

```java
processEngine.getRuntimeService().createProcessInstanceByKey("twitter")
  .startBeforeActivity("service_task_publish_on_twitter")
  .setVariable("content", "Know how to circumvent the review!")
  .execute();
```

Refer to [User Guide: Starting a Process Instance at Any Set of Activities](https://docs.camunda.org/manual/latest/user-guide/process-engine/process-engine-concepts/#start-a-process-instance-at-any-set-of-activities).

## Technology examples for messages sent by external systems

In this section, we give examples for _technical messages_, which are received from
other systems, typically by leveraging technologies like e.g. SOAP, REST, JMS or
other.

<div bpmn="best-practices/routing-events-to-processes-assets/invoice-external-system.bpmn" callouts="start_event_invoice_received" />

<span className="callout">1</span>

You will need a mechanism receiving that message and routing it to the workflow engine. That could be a direct API call to Camunda. It could also be a AMQP or Kafka consumer or a SOAP endpoint using the Camunda API internally. It could even be a hotfolder polled by some framework like Apache Camel.

### SOAP

To start a process instance via a SOAP web service, write some Java code, e.g. by leveraging the @WebService annotation.

```java
@WebService(name = "InvoiceService") <1>
public class InvoiceService {

  @Inject
  private RuntimeService runtimeService; <2>

  public void startInvoice(String invoiceId) {  <3>
    Map<String, Object> variables = new HashMap<String, Object>();
    variables.put("invoiceId", invoiceId);
    runtimeService.startProcessInstanceByKey("invoiceId", variables);
  }

}
```

<span className="callout">1</span>

The @WebService annotation is sufficient to provide the SOAP web service.

<span className="callout">2</span>

You can inject the process engine or the process engine services when using
a proper dependency injection container like Spring or CDI.

<span className="callout">3</span>

Decide if you prefer to use a business interface (like shown here) or a generic one like `startProcessInstance`.

### Messages

To start a process instance by AMQP messages, write some Java code, e.g. using Spring to connect to RabbitMQ:

```java
@RabbitListener(queues="invoice")
public void messageReceived(String invoiceId) {
	Map<String, Object> variables = new HashMap<String, Object>();
	variables.put("invoiceId", invoiceId);
	runtimeService.startProcessInstanceByKey("invoice", variables);
}
```

Or to start a process instance by a JMS message, you could use a message-driven bean in a Java EE container:

```java
@MessageDriven(name = "InvoiceMDB", activationConfig = {
    @ActivationConfigProperty(propertyName = "destinationType",
                              propertyValue = "javax.jms.Queue"),
    @ActivationConfigProperty(propertyName = "destination",
                              propertyValue = "queue/invoice")
  }
)
public class InvoiceMDB implements MessageListener {

  @Inject
  private RuntimeService runtimeService;

  @Override
  public void onMessage(Message message) {
    try {
      String invoiceId = ((TextMessage) message).getText();
      Map<String, Object> variables = new HashMap<String, Object>();
      variables.put("invoiceId", invoiceId);
      runtimeService.startProcessInstanceByKey("invoice", variables);
    } catch (Exception ex) {
      throw new RuntimeException("Could not process JMS message", ex);
    }
  }
}
```

### REST

The provided REST API can be directly used to communicate with the workflow engine remotely.

POST /process-definition/key/invoice/start

Request body:

```
{
  "variables": {
      "invoiceId" : {"value" : "123456", "type": "String"}
  }
}
```

More information can be found in the [Camunda 7 REST API Reference](https://docs.camunda.org/manual/latest/reference/rest/process-definition/post-start-process-instance/).

### Apache Camel (e.g. files in a drop folder)

Use [Apache Camel](http://camel.apache.org/) if you want to use one of the existing [Camel Components](http://camel.apache.org/components.html) (a huge list). Consider leveraging the
[Camunda 7 Camel Community Extension](https://github.com/camunda-community-hub/camunda-bpm-camel).

Starting a process instance can be done by a Camel route, e.g. when a file was placed into a drop folder:

```java
from("file://c:/tmp") // some drop folder
    .routeId("file")
    .convertBodyTo(String.class) // convert content of file into String
    .to("log:org.camunda.demo.camel?level=INFO&showAll=true&multiline=true") // optional logging
    .to("camunda-bpm:start?processDefinitionKey=invoice"); // and start new process instance
```

In this case, the message transported within the Camel route is handed over to the process instance as a variable named `camelBody` by default, refer to [documentation](https://github.com/camunda-community-hub/camunda-bpm-camel#camunda-bpmstart-start-a-process-instance).

### Messages sent via an Enterprise Service Bus (ESB)

If you have an ESB in your architecture, you may want to start process instances from your ESB. The best approach to do this depends on the concrete product you use. There are two basic possibilities how you do this:

- **Java**: You call the engine inside the VM via the Java API, like it is done in
  the Camel community extension mentioned above.
- **Remote**: You call the remote API (e.g. Camunda REST) to communicate with the
  engine. You might also build your own endpoint (e.g. JMS or SOAP) as described
  above.

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

Use some simple code on the sending side to route the message to a new process instance, e.g. by starting a new process instance by the BPMN ID in Java using a JavaDelegate:

```java
public class SendOrderReceivedMessageDelegate implements JavaDelegate {

  public void execute(DelegateExecution execution) throws Exception {
    Map<String, Object> variables = new HashMap<String, Object>();
    variables.put("invoiceId", execution.getVariable("invoiceId"));
    execution.getProcessEngineServices().getRuntimeService()
      .startProcessInstanceByKey("invoice", variables);
  }

}
```

<span className="callout">2</span>

Use some simple code on the sending side to correlate the message to a running process instance, for example in Java:

```java
public class SendPaymentReceivedMessageDelegate implements JavaDelegate {

  public void execute(DelegateExecution execution) throws Exception {
    Map<String, Object> variables = new HashMap<String, Object>();
    variables.put("paymentInformation", execution.getVariable("paymentInformation"));

    String orderId = execution.getVariable("orderId");

    execution.getProcessEngineServices().getRuntimeService()
      .createMessageCorrelation("MsgPaymentReceived")
      .processInstanceVariableEquals("orderId", orderId)
      .setVariables(variables)
      .correlate();
  }

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
