---
id: workflow-patterns
title: Workflow Patterns
sidebar_label: Workflow Patterns
slug: /components/concepts/workflow-patterns/
---

For true end-to-end process orchestration, you must be able to accurately express all the things happening in your business processes, which will pretty require simple and advances workflow patterns. This page describes how Camunda and BPMN can implement typical patterns, using the scientific background of the [Workflow Patterns Initiative](http://www.workflowpatterns.com/).

If you want to understand, why the process modeling language and the support for those patterns is very relevant, you can read our blog post about [Advanced Workflow Patterns](https://docs.google.com/document/d/1lu0V4q6xE7zT4aKVM9xmcD9c9PaxBltN59_BzCL47qY/edit#heading=h.d4xwt0gq03os).

## Routing

### Sequence

See also [Workflow Pattern 1: Sequence](http://www.workflowpatterns.com/patterns/control/basic/wcp1.php): "A task in a process in enabled after the completion of a preceding task in the same process".

This is implemented by a [Sequence Flow](/docs/components/modeler/bpmn/bpmn-primer/#sequence-flow-controlling-the-flow-of-execution) that connects two activities:

<div bpmn="workflow-patterns/sequence.bpmn" callouts="sequenceFlow1,sequenceFlow2,sequenceFlow3" />

The first sequence flow (<span className="callout">1</span>) connects the start event with Task A. Task B is connected using another sequence flow (<span className="callout">2</span>), meaning that it can only happen if Task A was completed.

You can read more about it in [our BPMN primer - sequence flows: Controlling the flow of execution](/docs/components/modeler/bpmn/bpmn-primer/#sequence-flow-controlling-the-flow-of-execution).

### Conditions (if/then)

See [Workflow Pattern 4: Exclusive Choice](http://www.workflowpatterns.com/patterns/control/basic/wcp4.php): "The thread of control is immediately passed to precisely one of the outgoing branches".

This is implemented by an [exclusive gateway (XOR)](/docs/components/modeler/bpmn/exclusive-gateways/):

<div bpmn="workflow-patterns/xor.bpmn" callouts="xorGateway,taskB,taskC" />

All outgoing sequence flows of the XOR Gatewy (<span className="callout">1</span>) have a [condition](/docs/components/concepts/expressions/#boolean-expressions) configured, which decides if the process continues in Task B (<span className="callout">2</span>if `x>42`) or Task C (<span className="callout">3</span>if `not(x>42)`).

You can read more about it in [our BPMN primer - gateways: Steering flow](/docs/components/modeler/bpmn/bpmn-primer/#gateways-steering-flow).

### Invoke subworkflows

You need to invoke another process as part of your process.

This is implemented by a [call activity](/docs/components/modeler/bpmn/call-activities/):

<div bpmn="workflow-patterns/call-activity.bpmn" callouts="taskA" />

<span className="callout">1</span>

When the call activity is entered, a new process instance of the referenced process is created. Only when the created process instance is completed, the call activity is left and the outgoing sequence flow is taken. You can reference any other BPMN process, for example:

<div bpmn="workflow-patterns/call-activity-child.bpmn" />

### Loop

See [Workflow Pattern 21: Structured Loop](http://www.workflowpatterns.com/patterns/control/basic/wcp21.php): "The ability to execute a task or sub-process repeatedly. The loop has either a pre-test or post-test condition associated with it".

In BPMN you can simply model a loop:

<div bpmn="workflow-patterns/loop.bpmn"  callouts="xor"/>

There is also a specific loop task marker in BPMN (but please note, that this [is not yet supported in Zeebe](/docs/components/modeler/bpmn/bpmn-coverage/)):

<div bpmn="workflow-patterns/loop-marker.bpmn" callouts="taskA" />

### Static parallel branches

You want some pre-modelled tasks to be carried out in parallel. See [Workflow Pattern 2: Parallel Split](http://www.workflowpatterns.com/patterns/control/new/wcp2.php) and [Workflow Pattern 33: Generalized AND-Join](http://www.workflowpatterns.com/patterns/control/new/wcp33.php): "The divergence of a branch into two or more parallel branches each of which execute concurrently". Plus "the convergence of two or more branches into a single subsequent branch".

In BPMN this is typically implemented using [parallel gateways](/docs/components/modeler/bpmn/parallel-gateways/), also called AND-gateways:

<div bpmn="workflow-patterns/and.bpmn" callouts="andSplit, andJoin" />

<span className="callout">1</span>

This AND-gateway splits the flow into concurrent paths, so that Task A, B, and C are executed in parallel.

<span className="callout">2</span>

This AND-gateway waits for Task A, B, and C to complete, before the flow can move on.

You can read more about it in [our BPMN primer - gateways: Steering flow](/docs/components/modeler/bpmn/bpmn-primer/#gateways-steering-flow).

### Dynamic parallel branches

You want execute some tasks for every element of a list, like the `for each` construct in programming languages. See [Workflow Pattern 14: Multiple Instances with a priori Run-Time Knowledge](http://www.workflowpatterns.com/patterns/control/new/wcp14.php): "Multiple instances of a task can be created. The required number of instances may depend on a number of runtime factors, but is known before the task instances must be created. Once initiated, these instances are independent of each other and run concurrently. It is necessary to synchronize the instances at completion before any subsequent tasks can be triggered".

In BPMN this is implemented using [multiple instance activities](/docs/components/modeler/bpmn/multi-instance/):

<div bpmn="workflow-patterns/multi-instance.bpmn" callouts="subprocess" />

<span className="callout">1</span>

The parallel multiple instance marker defines, that this subprocess is executed multiple times - once for each element of a given collection (like a foreach loop in a programming language).

### Wait

A typical situation is that a process needs to wait for some event to happen, e.g. some time to pass or some external trigger to arrive. This is related to [Workflow Pattern 23: Transient Trigger](http://www.workflowpatterns.com/patterns/control/new/wcp23.php).

In BPMN this is implemented using [events](/docs/components/modeler/bpmn/events/) or [receive tasks](/docs/components/modeler/bpmn/receive-tasks/):

<div bpmn="workflow-patterns/wait.bpmn" callouts="timer, message" />

<span className="callout">1</span>

The timer event causes the process to wait, in this case until a specific point in time is due. You could also specify durations. See [timer events](/docs/components/modeler/bpmn/timer-events/).

<span className="callout">2</span>

The process will wait for a message to arrive. The message is an external trigger provided by API and can technically be anything, from a callback (e.g. via REST), over real messaging (like AMQP), to notifications within your system. See [message events](/docs/components/modeler/bpmn/message-events/).

You can read more about it in [our BPMN primer - events: Waiting for something to happen](/docs/components/modeler/bpmn/bpmn-primer/#events-waiting-for-something-to-happen).

## Reacting to events

The above mentioned waiting for events is a special case of generally reacting to events. You might also want to react to events, even if the process is doing something else at the moment. Typical examples are customer cancelation requests coming in for running order fulfillment processes, or timeouts if parts of the process take too long.

In both cases, the process might be doing something else, but still needs to be able to react to those events, which turns out to be rarely supported well amonst workflow engines. Let's explore this, by looking at specific features and examples.

### Time based

You want to react if a certain point in time is due or a specific time duration has passed. This is related to [Workflow Pattern 23: Transient Trigger](http://www.workflowpatterns.com/patterns/control/new/wcp23.php).

In BPMN, you cannot only wait for the timer event within a flow, but also leverage [boundary events](/docs/components/modeler/bpmn/events/#boundary-events) or [event subprocesses](/docs/components/modeler/bpmn/event-subprocesses/).

Those events can be interrupting, or non-interrupting, meaning that you will either interrupt the current activity, or start something in parallel.

<div bpmn="workflow-patterns/reactive-events-timer.bpmn" callouts="boundaryTimerNonInterrupting, boundaryTimerInterrupting, eventSubprocess, eventTimerNonInterrupting" />

<span className="callout">1</span>

This timer is non-interrupting (dashed line), so the "Escalate request approval" task is started in parallel, additionally to the "Approve request" task. The idea is, that the escalation task might make a manager to double-check the original task does not slip. Non-interrupting events can also be recurring, so you could also escalate "every two hours".

<span className="callout">2</span>

This timer is interrupting (solid line). Once it fires, the "Approve request" task will be canceled and the process continues on the alternative path, in this case to automatically reject the request. Note that both timers so far can only happen if the task "Approve request" is active

<span className="callout">3</span>

This is an event subprocess (dotted line). This can be activated from everywhere in the current scope. In this example, the scope is the whole process.

<span className="callout">4</span>

So if the process is not completed within the defined SLA, the timer fires and the event subprocess is started. As the timer is non-interrupting (dashed line again), it does not intervene with the normal flow of operations, but starts something additionally in parallel.

Please note, that the above process is not necessarily modeled following all of our [modeling best practices](/docs/components/best-practices/modeling/creating-readable-process-models/), but intentionally shows different ways to use BPMN to implement certain workflow patterns.

### External messages/events

You might also want to react to certain incoming messages or event in an existing process. The prime example is a customer canceling the current order fulfillment process. This might be possible only in a certain process phase, and even lead to different actions. This is related to [Workflow Pattern 23: Transient Trigger](http://www.workflowpatterns.com/patterns/control/new/wcp23.php) and [Workflow Pattern 24: Persistent Trigger](http://www.workflowpatterns.com/patterns/control/new/wcp24.php).

As with timers, you can leverage [boundary events](/docs/components/modeler/bpmn/events/#boundary-events) or [event subprocesses](/docs/components/modeler/bpmn/event-subprocesses/).

<div bpmn="workflow-patterns/reactive-message-events.bpmn" callouts="event1, subprocess1, event2, event3" />

<span className="callout">1</span>

An order cancelation message comes in for the current process instance using [message correlation](/docs/components/concepts/messages/). This cancelation cancels the current subprocess to do something else instead.

<span className="callout">2</span>

Subprocesses can be easily used to define phases of a process, as the cancellation is treated differently depending on the current process phase.

<span className="callout">3</span>

Because, for example, in preparation we might already have to clean up certain things.

<span className="callout">4</span>

And probably during delivery we do not allow any cancelations any more. This is also why this event is non-interrupting (dashed line), so we keep doing "Delivery".

### Correlation mechansisms

Mapping external messages to an existing process instance is called [message correlation](/docs/components/concepts/messages/). This is a crucial functionality to make sure you can communicate with process instances from the outside.

There are two main problems to solve:

1. How to find the right process instance? This is solved by a `message name` and a `correlation key` (e.g. `orderCanceled` and `order-42`).

2. How to persist messages if a process instance is not yet ready to receive that message just yet? This is solved by having an internal message store and a `time to live` attached to messages. This is relateed to [Workflow Pattern 24: Persistent Trigger](http://www.workflowpatterns.com/patterns/control/new/wcp24.php)

You can find more information in [our documentation about messages](/docs/components/concepts/messages/).

### Events from subprocesses

Sometimes, you want to communicate from a subprocess to its parent, without ending the subprocess. BPMN allows this by an [escalation event](/docs/components/modeler/bpmn/bpmn-coverage/).

:::note
The escalation event is supported in Camunda Platform 7, but not yet in Camunda Platform 8. It is on the roadmap and will eventually be available in version 8.
:::

<div bpmn="workflow-patterns/escalation.bpmn" callouts="event" />

<span className="callout">1</span>

An escalation event can be thrown from any of the called subprocesses and will be picked up by his parent to start something in parallel, as this is an non interupting event (dashed line).

The subprocess can raise the escalation any time:

<div bpmn="workflow-patterns/escalation-sub.bpmn" callouts="event" />

### Broadcasts and engine-wide events

While messages are always targeted at one specific process instance, you might also want to inform many processes about an event at once. For example, you might regularly adjust certain customer scoring rules that always should be taken into account immediately. This can be implemented using the [signal event](/docs/components/modeler/bpmn/bpmn-coverage/).

:::note
The escalation event is supported in Camunda Platform 7, but not yet in Camunda Platform 8. It is on the roadmap and will eventually be available in version 8.
:::

<div bpmn="workflow-patterns/signal-catch.bpmn"/>

## Handling errors

Handling exceptions well is one of the most imporant capabilities of a workflow engine, and it needs built-in support from the modeling language.

You might also want to look into our [best practice - modeling beyond the happy path](/docs/components/best-practices/modeling/modeling-beyond-the-happy-path/) to understand possibilities.

### Error scopes

The reaction to errors might need to be different depending on the current state of the process. This can be achieved by using [subprocesses](h/docs/components/modeler/bpmn/embedded-subprocesses/) in combination with either [boundary events](/docs/components/modeler/bpmn/events/#boundary-events) or [event subprocesses](/docs/components/modeler/bpmn/event-subprocesses/).

<div bpmn="workflow-patterns/subprocess-error.bpmn" callouts="errorEvent, errorEventSubprocess" />

<span className="callout">1</span>

This error event only catches errors from the subprocess "clearing". The idea here would be, that in case of any clearing service not being available, the order is assumed cleared. Note, that this example is mainly built for illustration, and does not necessarily mean this is the best way to solve this business requirement.

<span className="callout">2</span>

In contrast, this error event subprocess is triggered whenever there is a fraud detected, independant where this error is raised.

### Catch errors per type

You might need to react to different event types differently, which is possible by using the error type known to BPMN:

<div bpmn="workflow-patterns/error-type.bpmn" callouts="error1, error2" />

Now there is a different reaction if fraud was detected (<span className="callout">1</span>) or the address was found to contain an error (<span className="callout">2</span>).

## Business transactions

Modern systems are highly distributed accross the network. In such systems, you cannot rely on technical ACID transactions for consistency, but need to elevate decisions around consistency or regaining consistency to the business level. See [Achieving consistency without transaction managers](https://blog.bernd-ruecker.com/achieving-consistency-without-transaction-managers-7cb480bd08c) for some more background on this.

### Compensation

An important problem to solve is how to rollback a business transaction in case of problems. In other words: How to restore business consistency. One interesting strategy is to leverage compensating activities to undo the original actions whenever the problem occurs. This is also known as the [Saga Pattern](https://blog.bernd-ruecker.com/saga-how-to-implement-complex-business-transactions-without-two-phase-commit-e00aa41a1b1b).

In BPMN, you can use [compensation events](/docs/components/modeler/bpmn/bpmn-coverage/) to easily implement compensations in your processes.

:::note
The compensation event is supported in Camunda Platform 7, but not yet in Camunda Platform 8. It is on the roadmap and will eventually be available in version 8.
:::

<div bpmn="workflow-patterns/compensation.bpmn" callouts="comp1task, comp3task, comp1, compThrow" />

<span className="callout">1</span>

For every task in a process model, you can define a compensation task. This can be any valid BPMN task, this is a service task, but it could also be a a human task (<span className="callout">2</span>), a subprocess, or anything else.

The compensation task gets only executed if the original task was executed.

<span className="callout">3</span>

This compensation tasks gets connected to the original task by a dedicated compensation event.

<span className="callout">4</span>

Within your process model, you can define when it is time to compensate. Whenever you trigger the compensation event, all tasks of the current scope that where executed, will be automatically compensated.

The big feature here is that you don't have to rebuild the routing logic to compensate correctly, like checking again if the customer balance was used. The workflow engine will take care automatically, also in more complicated situations like multiple instance activities.
