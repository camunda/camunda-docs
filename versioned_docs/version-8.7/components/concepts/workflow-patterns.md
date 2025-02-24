---
id: workflow-patterns
title: Workflow patterns
sidebar_label: Workflow patterns
slug: /components/concepts/workflow-patterns/
description: "For end-to-end process orchestration, you must accurately express the things happening in your business processes, requiring workflow patterns."
---

For true end-to-end process orchestration, you must be able to accurately express all the things happening in your business processes which will require simple and advanced workflow patterns. This page describes typical patterns and how you can implement them using Camunda and BPMN.

## The power of BPMN

Let's discuss the ISO standard [Business Process Model and Notation (BPMN)](https://camunda.com/bpmn/) first, as this is really a great workflow language to express workflow patterns. BPMN was developed as a collaboration of different vendors rooted in real-life industry experience. It happened during a time when the scientific background of workflow patterns was already well researched, for example by the [Workflow Patterns Initiative](http://www.workflowpatterns.com/).

In other words, scientists already wrote down all the patterns that are important to express any problem you might get in a workflow, and BPMN used this knowledge to design a language that implemented all the relevant patterns (refer to this [evaluation](http://www.workflowpatterns.com/evaluations/standard/bpmn.php), for example). Essentially, BPMN is feature complete and will always be able to express what you need to orchestrate your processes.

Additionally, BPMN has expressed all real-life problems rather easily when reflecting on our more than 15 years of hands-on experience with the language.

If you now try to rely on workflow languages that promise to be simpler than BPMN, what it really means is that they lack important workflow patterns. You might want to look in the blog post on [why process orchestration needs advanced workflow patterns](https://camunda.com/blog/2022/07/why-process-orchestration-needs-advanced-workflow-patterns/), showing exemplary workarounds that are necessary if the language cannot express certain patterns.

Typically, this involves emulating advanced patterns with basic constructs plus programming code so that your development takes longer, your solution becomes more brittle, and the resulting process model can't serve as a communication vehicle for business and IT as the model will be contaminated with technical details.

## Routing

The most basic workflow patterns are (excuse the play on words) around the basic flow of work.

### Sequence

Refer to [Workflow Pattern 1: Sequence](http://www.workflowpatterns.com/patterns/control/basic/wcp1.php): "A task in a process is enabled after the completion of a preceding task in the same process."

This is implemented by a [sequence flow](/components/modeler/bpmn/bpmn-primer.md#sequence-flow-controlling-the-flow-of-execution) connecting two activities:

<div bpmn="workflow-patterns/sequence.bpmn" callouts="BeforeSequenceFlow1" />

The first sequence flow (<span className="callout">1</span>) connects the start event with **Task A**. Then, **Task B** is connected using another sequence flow, meaning that it can only happen if **Task A** was completed. If **Task B** completes, the sequence flow routes to the end event so that the process instance can complete.

You can read more about it in [our BPMN primer: sequence flows - controlling the flow of execution](/components/modeler/bpmn/bpmn-primer.md#sequence-flow-controlling-the-flow-of-execution).

### Conditions (if/then)

Refer to [Workflow Pattern 4: Exclusive Choice](http://www.workflowpatterns.com/patterns/control/basic/wcp4.php): "The thread of control is immediately passed to precisely one of the outgoing branches."

This is implemented by an [exclusive gateway (XOR)](/components/modeler/bpmn/exclusive-gateways/exclusive-gateways.md):

<div bpmn="workflow-patterns/xor.bpmn" callouts="xorGateway,taskB,taskC" />

All outgoing sequence flows of the XOR gateway (<span className="callout">1</span>) have a [condition](/components/modeler/feel/language-guide/feel-boolean-expressions.md) configured, which decides if the process continues in **Task B** (<span className="callout">2</span> if `x>42`) or **Task C** (<span className="callout">3</span>if `not(x>42)`).

You can read more about it in [our BPMN primer: gateways - steering flow](/components/modeler/bpmn/bpmn-primer.md#gateways-steering-flow).

### Invoke subworkflows

You need to invoke another process as part of your process.

This is implemented by a [call activity](/components/modeler/bpmn/call-activities/call-activities.md):

<div bpmn="workflow-patterns/call-activity.bpmn" callouts="taskA" />

<span className="callout">1</span>

When the call activity is entered, a new process instance of the referenced process is created. Only when the created process instance is completed is the call activity left and the outgoing sequence flow taken.

You can reference any other BPMN process, for example:

<div bpmn="workflow-patterns/call-activity-child.bpmn" />

### Loop

Refer to [Workflow Pattern 21: Structured Loop](http://www.workflowpatterns.com/patterns/control/basic/wcp21.php): "The ability to execute a task or subprocess repeatedly. The loop has either a pre-test or post-test condition associated with it."

In BPMN, you can simply model a loop:

<div bpmn="workflow-patterns/loop.bpmn" callouts="xor"/>

<span className="callout">1</span>

This exclusive gateway contains the expression to decide if to continue or exit the loop. The gateway can be before or after the loop.

There is also a specific loop task marker in BPMN:

<div bpmn="workflow-patterns/loop-marker.bpmn" />

:::note
The loop task marker event is supported in Camunda 7, but not yet in Camunda 8. It is on the roadmap and will eventually be available in Camunda 8.
:::

### Static parallel branches

Imagine you want some tasks known during design time to be carried out in parallel. Refer to [Workflow Pattern 2: Parallel Split](http://www.workflowpatterns.com/patterns/control/new/wcp2.php) and [Workflow Pattern 33: Generalized AND-Join](http://www.workflowpatterns.com/patterns/control/new/wcp33.php): "The divergence of a branch into two or more parallel branches each of which execute concurrently" plus "the convergence of two or more branches into a single subsequent branch."

In BPMN, this is implemented using [parallel gateways (AND)](/components/modeler/bpmn/parallel-gateways/parallel-gateways.md):

<div bpmn="workflow-patterns/and.bpmn" callouts="andSplit, andJoin" />

<span className="callout">1</span>

This AND-gateway splits the flow into concurrent paths so that Task A, B, and C are executed in parallel.

<span className="callout">2</span>

This AND-gateway waits for Task A, B, and C to complete before the flow can move on.

You can read more about it in [our BPMN primer: gateways - steering flow](/components/modeler/bpmn/bpmn-primer.md#gateways-steering-flow).

### Dynamic parallel branches

You might want to execute some tasks for every element of a list, like the `for each` construct in programming languages. Refer to [Workflow Pattern 14: Multiple Instances with a priori Run-Time Knowledge](http://www.workflowpatterns.com/patterns/control/new/wcp14.php): "Multiple instances of a task can be created. The required number of instances may depend on a number of runtime factors, but is known before the task instances must be created. Once initiated, these instances are independent of each other and run concurrently. It is necessary to synchronize the instances at completion before any subsequent tasks can be triggered."

In BPMN, this is implemented using [multiple instance activities](/components/modeler/bpmn/multi-instance/multi-instance.md):

<div bpmn="workflow-patterns/multi-instance.bpmn" callouts="subprocess" />

<span className="callout">1</span>

The parallel multiple instance marker defines that this subprocess is executed multiple times - once for each element of a given collection (like a `for each` loop in a programming language).

### Wait

A typical situation is that a process needs to wait for some event to happen, e.g. some time to pass or some external message to arrive. This is related to [Workflow Pattern 23: Transient Trigger](http://www.workflowpatterns.com/patterns/control/new/wcp23.php).

In BPMN, this is implemented using [events](/components/modeler/bpmn/events.md) (or [receive tasks](/components/modeler/bpmn/receive-tasks/receive-tasks.md)):

<div bpmn="workflow-patterns/wait.bpmn" callouts="timer, message" />

<span className="callout">1</span>

The timer event causes the process to wait, in this case until a specific point in time is due or some duration has elapsed. Refer to [timer events](/components/modeler/bpmn/timer-events/timer-events.md) for more details.

<span className="callout">2</span>

The process will wait for a message to arrive. The message is an external trigger provided by API and can technically be anything, from a callback (e.g. via REST), over real messaging (like AMQP), or to notifications within your system. Refer to [message events](/components/modeler/bpmn/message-events/message-events.md) for more details.

You can read more about events in [our BPMN primer: events - waiting for something to happen](/components/modeler/bpmn/bpmn-primer.md#events-waiting-for-something-to-happen).

## Reacting to events

The waiting mentioned above is a special case where you react to events while not doing anything else. Oftentimes, you want to react to events even if the process is doing something else at the moment. This is described in this section.

Typical examples are customer cancelation requests coming in for running order fulfillment processes, or timeouts if parts of the process take too long.

### Time based

You want to react if a certain point in time is due or a specific time duration has passed. This is related to [Workflow Pattern 23: Transient Trigger](http://www.workflowpatterns.com/patterns/control/new/wcp23.php).

In BPMN, you can leverage [boundary events](/components/modeler/bpmn/events.md#boundary-events) or [event subprocesses](/components/modeler/bpmn/event-subprocesses/event-subprocesses.md).

Those events can be interrupting or non-interrupting, meaning you will either interrupt the current activity, or start something in parallel.

<div bpmn="workflow-patterns/reactive-events-timer.bpmn" callouts="boundaryTimerNonInterrupting, boundaryTimerInterrupting, eventSubprocess, eventTimerNonInterrupting" />

<span className="callout">1</span>

This timer is non-interrupting (dashed line), so the **Escalate request approval** task is started in parallel, additionally to the **Approve request** task. The idea is that the escalation task might make a manager double-checking the original task does not slip. Non-interrupting events can also be recurring, so you could also escalate "every two hours".

<span className="callout">2</span>

This timer is interrupting (solid line). Once it fires, the **Approve request** task is canceled and the process continues on the alternative path, in this case to automatically reject the request. Note that both timers so far can only happen if the task **Approve request** is active.

<span className="callout">3</span>

This is an event subprocess (dotted line). This can be activated from everywhere in the current scope. In this example, the scope is the whole process.

<span className="callout">4</span>

So if the process is not completed within the defined SLA, the timer fires and the event subprocess is started. As the timer is non-interrupting (dashed line again), it does not intervene with the typical flow of operations, but starts something additionally in parallel.

:::note
The above process is not necessarily modeled following all of our [modeling best practices](/components/best-practices/modeling/creating-readable-process-models.md), but intentionally shows different ways to use BPMN to implement certain workflow patterns.
:::

### External messages/events

You might also want to react to certain incoming messages or events in an existing process. A good example is a customer canceling the current order fulfillment process. This might be possible only in a certain process phase and lead to different actions. This is related to [Workflow Pattern 23: Transient Trigger](http://www.workflowpatterns.com/patterns/control/new/wcp23.php) and [Workflow Pattern 24: Persistent Trigger](http://www.workflowpatterns.com/patterns/control/new/wcp24.php).

As with timers, you can leverage [boundary events](/components/modeler/bpmn/events.md#boundary-events) or [event subprocesses](/components/modeler/bpmn/event-subprocesses/event-subprocesses.md).

<div bpmn="workflow-patterns/reactive-message-events.bpmn" callouts="subprocess1, event1, event2, event3" />

Assume that an order cancelation message comes in for the current process instance using [message correlation](/components/concepts/messages.md).

<span className="callout">1</span>

Subprocesses can be easily used to define phases of a process, as the cancelation is treated differently depending on the current process phase.

<span className="callout">2</span>

For example, a cancelation during the clearing phase has no consequences and can simply be executed.

<span className="callout">3</span>

But when the process is already in the preparation phase it might need to clean up certain things properly.

<span className="callout">4</span>

During delivery, it does not even allow cancelations anymore. This is also why this event is non-interrupting (dashed line), so we keep doing **Delivery**.

### Correlation mechanisms

Mapping external messages to an existing process instance is called [message correlation](/components/concepts/messages.md). This is a crucial functionality to ensure you can communicate with process instances from the outside.

There are two main problems to solve:

1. How to find the right process instance? In Camunda, this is solved by a `message name` and a `correlation key` (e.g. `orderCanceled` and `order-42`).

2. How to persist messages if a process instance is not yet ready to receive that message yet? In Camunda, this is solved by having an internal message store and a `time to live` attached to messages. This is related to [Workflow Pattern 24: Persistent Trigger](http://www.workflowpatterns.com/patterns/control/new/wcp24.php)

You can find more information in [our documentation about messages](/components/concepts/messages.md).

### Events from subprocesses

Sometimes, a subprocess needs to communicate with its parent process without ending the subprocess yet. BPMN allows this by an [escalation event](/components/modeler/bpmn/bpmn-coverage.md).

:::note
The escalation event is supported in Camunda 7, but not yet in Camunda 8. It is on the roadmap and will eventually be available in Camunda 8.
:::

<div bpmn="workflow-patterns/escalation.bpmn" callouts="event" />

<span className="callout">1</span>

An escalation event can be thrown from any of the called subprocesses and is picked up by its parent to start something in parallel, as this is a non-interrupting event (dashed line).

The subprocess can raise the escalation any time:

<div bpmn="workflow-patterns/escalation-sub.bpmn" callouts="event" />

### Broadcasts and engine-wide events

While messages are always targeted at one specific process instance, you might also want to inform many processes about an event at once. For example, you might regularly adjust certain customer scoring rules that always should be taken into account immediately. This can be implemented using the [signal event](/components/modeler/bpmn/bpmn-coverage.md).

:::note
The escalation event is supported in Camunda 7, but not yet in Camunda 8. It is on the roadmap and will eventually be available in Camunda 8.
:::

<div bpmn="workflow-patterns/signal-catch.bpmn" callouts="signal"/>

<span className="callout">1</span>

The signal event is caught and in this case interrupts the onboarding to go back to score the customer again.

## Handling errors

Handling exceptions well is one of the most important capabilities of a workflow engine, and it needs built-in support from the modeling language.

You might also want to look into our [best practice: modeling beyond the happy path](/components/best-practices/modeling/modeling-beyond-the-happy-path.md) to understand possibilities.

### Error scopes

The reaction to errors might need to be different depending on the current state of the process. This can be achieved by using [subprocesses](/components/modeler/bpmn/embedded-subprocesses/embedded-subprocesses.md) in combination with either [boundary events](/components/modeler/bpmn/events.md#boundary-events) or [event subprocesses](/components/modeler/bpmn/event-subprocesses/event-subprocesses.md).

<div bpmn="workflow-patterns/subprocess-error.bpmn" callouts="errorEvent, errorEventSubprocess" />

<span className="callout">1</span>

This boundary error event is attached to the subprocess "clearing" and only catches errors within that subprocess. The idea here would be that in case of any clearing service not being available, the order is assumed cleared. Note that this example is mainly built for illustration, and does not necessarily mean this is the best way to solve this business requirement.

<span className="callout">2</span>

Alternatively, this error event subprocess is triggered whenever there is a fraud detected, independent of whether the error occurs in any of the subprocesses or the main process.

### Catch errors per type

You might need to react to different event types differently, which is possible by using the [error type](/components/modeler/bpmn/error-events/error-events.md#defining-the-error) known to BPMN:

<div bpmn="workflow-patterns/error-type.bpmn" callouts="error1, error2" />

Now there is a different reaction if fraud was detected (<span className="callout">1</span>) or the address was found to contain an error (<span className="callout">2</span>).

## Business transactions

Modern systems are highly distributed across the network. In such systems, you cannot rely on technical ACID transactions for consistency, but need to elevate decisions around consistency or regaining consistency to the business level. Refer to [Achieving consistency without transaction managers](https://blog.bernd-ruecker.com/achieving-consistency-without-transaction-managers-7cb480bd08c) for additional background on this.

### Compensation

An important problem to solve is how to roll back a business transaction in case of problems. In other words, how to restore business consistency. One strategy is to leverage compensating activities to undo the original actions whenever the problem occurs. This is also known as the [Saga Pattern](https://blog.bernd-ruecker.com/saga-how-to-implement-complex-business-transactions-without-two-phase-commit-e00aa41a1b1b).

In BPMN, you can use [compensation events](/components/modeler/bpmn/bpmn-coverage.md) to easily implement compensations in your processes.

<div bpmn="workflow-patterns/compensation.bpmn" callouts="comp1task, comp3task, comp1, compThrow" />

<span className="callout">1</span>

For every task in a process model, you can define a compensation task. This can be any valid BPMN task, like a service task, a human task (<span className="callout">2</span>), or a subprocess, for example.

<span className="callout">3</span>

This compensation task is connected to the original task by a dedicated compensation event.

<span className="callout">4</span>

Within your process model, you can define when it is time to compensate. Whenever you trigger the compensation event, all tasks of the current scope that were executed are automatically compensated. This means that their configured compensation task is executed.

The big advantage is that you don't have to remodel the routing logic to compensate correctly, like checking again if the customer balance was used. The workflow engine will take care automatically, also in more complicated situations like multiple instance activities.
