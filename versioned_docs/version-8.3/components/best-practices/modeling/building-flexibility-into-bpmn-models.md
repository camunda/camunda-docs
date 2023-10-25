---
title: Building flexibility into BPMN models
tags:
  - BPMN
description: "Sometimes we need ways to build flexibility into process models to deal with operational problems or to allow for humans to intervene."
---

BPMN modeling primarily targets structured processes, often with the goal to automate as many steps as possible, increase efficiency, and decrease process execution costs. But sometimes we need ways to build flexibility into such process models to deal with expected or unexpected operational problems or to allow for humans to intervene.

## Understanding the required symbols

To build flexibility into BPMN process models, one must understand BPMN symbols and modeling techniques. After introducing the main symbols, we can demonstrate more concrete examples.

### Use events as triggers

BPMN events allow us to react to all kinds of information. We can use them to trigger flexible activities. In particular, BPMN events **catching** **messages**, **conditions**, and **timeouts** are useful in that context.

<div bpmn="best-practices/building-flexibility-into-bpmn-models-assets/events.bpmn" />

:::caution Camunda 7 Only
Condition events are [not yet supported in Camunda 8](/components/modeler/bpmn/bpmn-coverage.md).
:::

### Boundary events to add activities on triggers

BPMN allows us to attach events to the boundary of activities to trigger some follow-up action. By modeling such an event as either **interrupting** or **non-interrupting**, we can decide to do the activities either _instead of_ the activity we attach the event to, or _in addition to_ it.

<div bpmn="best-practices/building-flexibility-into-bpmn-models-assets/boundary.bpmn" />

### Subprocesses with boundary events

By attaching boundary events not just to individual activities, but also to subprocesses, we can flexibly define the area or scope for which we want to trigger some flexible activities.

<div bpmn="best-practices/building-flexibility-into-bpmn-models-assets/subprocess.bpmn" callouts="subprocess,condition,activity" />

<span className="callout">1</span>

While we are occupied with carrying out some area of activities, in a scope of our process...

<span className="callout">2</span>

...an event might occur, which causes us...

<span className="callout">3</span>

...to carry out this activity in addition to continuing with ordinary work.

### Event subprocesses

Sometimes we need to build in flexible activities which are carried out at any point in time. In such cases, we can leverage BPMN's event-based subprocesses.

<div bpmn="best-practices/building-flexibility-into-bpmn-models-assets/event-subprocess.bpmn" />

### Escalation events

Sometimes we need highly flexible means to cancel scopes or trigger additional activities from within a scope. The BPMN escalation events can be particularly useful to implement such requirements.

<div bpmn="best-practices/building-flexibility-into-bpmn-models-assets/escalation.bpmn" callouts="escalation,boundary,activity,followup" />

<span className="callout">1</span>

As soon as we are finished with the first activity inside the scope...

<span className="callout">2</span>

...we inform the surrounding scope about that and trigger an additional, essential activity...

<span className="callout">3</span>

...but also continue with our second activity to complete the subprocess.

<span className="callout">4</span>

We can then already continue with the follow-up work regardless of whether that additional activity is already finished.

### Terminate end events

To build flexibility into process models, it is also useful to remember that the termination end event just terminates the scope within which it is defined and therefore _not_ always the whole process instance. With that technique, it becomes possible to cancel some activities inside a subprocess while completing it successfully and leaving it via the typical outgoing path.

<div bpmn="best-practices/building-flexibility-into-bpmn-models-assets/termination.bpmn" callouts="termination,followup" />

<span className="callout">1</span>

As soon as one of our two activities achieves the result, we can cancel the other one...

<span className="callout">2</span>

...and successfully complete the subprocess and normally continue with our follow-up work.

## Examples

### Allow proactive order status communication

Assume that for an order to be validated, the customer must determine the delivery date before we can confirm the order. If the order is not acceptable—due to consistency issues or customer related issues—it is declined.

Some of our orders might be so important that we want to ensure we keep customers happy, even if not everything runs smoothly on our side.

<div bpmn="best-practices/building-flexibility-into-bpmn-models-assets/example-order-proactive-communication.bpmn" callouts="on-demand,on-a-regular-basis" />

<span className="callout">1</span>

Order managers can request proactive customer communication on demand. Assume they can communicate the reasons via a form, whereas the communication as such is carried out by the call center.

<span className="callout">2</span>

On a regular basis, we check based on some rules, whether the order is so important that we proactively communicate why the order is not yet confirmed. Again, the communication is carried out by the call center.

### Allow for order cancellation any time

The customer might be allowed to request a cancellation until the order is confirmed. This request would have to be reviewed to determine whether we must accept the cancellation.

<div bpmn="best-practices/building-flexibility-into-bpmn-models-assets/example-cancel-order.bpmn" callouts="cancellation,error_throw,error_catch" />

<span className="callout">1</span>

Whenever the customer requests a cancellation until the order is confirmed, we review that request and decide whether we have to accept the cancellation or not.

<span className="callout">2</span>

If we accept the cancellation, we must terminate the entire process. To do so, we need to use one trick: throw an error event that will end the current event subprocess, but not yet the order process.

<span className="callout">3</span>

This leads to another subprocess to be triggered, and this one is interrupting. Now, the process instance is really cancelled.

### Allow for order details to change, but repeat order validation

:::caution Camunda 7 Only
Condition events are [not yet supported in Camunda 8](/components/modeler/bpmn/bpmn-coverage.md)
:::

If the customer changes the order details, the order must be validated again.

<div bpmn="best-practices/building-flexibility-into-bpmn-models-assets/example-revalidate-order.bpmn" />
