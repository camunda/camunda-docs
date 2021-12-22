---
id: building-flexibility-into-bpmn-models
title: Building Flexibility into BPMN Models
date: 2017-12-07
stakeholders: Modeling
tags:
    - BPMN
topics:
    - Modeling Guidelines
weight: 30
---

BPMN modeling primarily targets structured processes, often with the goal to automate as many steps as possible, increase efficiency and decrease process execution costs. But sometimes we need ways to build flexibility into such process models to deal with expected or unexpected operational problems or to allow for humans to intervene.

## Understanding the required symbols

In order to build flexibility into BPMN process models, one need to understand BPMN symbols and modeling techniques. After introducing the main symbols we show more concrete examples.


### Use events as triggers

BPMN events allow us to react to all kinds of information. We can use them to trigger flexible activities. In particular, BPMN events *catching* *messages*, *conditions* and *timeouts* are useful in that context.

<div bpmn="building-flexibility-into-bpmn-models-bpmn/events.bpmn" />

:::caution Camunda Platform 7 Only
Condition events are [not yet supported in Camunda Cloud](https://docs.camunda.io/docs/reference/bpmn-processes/bpmn-coverage/)
:::

### Boundary events to add activities on triggers

BPMN allows us to attach events to the boundary of activities in order to trigger some followup action. By modeling such an event as either *interrupting* or *non-interrupting*, we can decide to do the avtivities either *instead of* the activity we attach the event to or *in addition to* it.

<div bpmn="building-flexibility-into-bpmn-models-bpmn/boundary.bpmn" />


### Sub processes with boundary events

By attaching boundary events not just to individual activities, but to subprocesses, we can flexibly define the area or scope for which we want to trigger some flexible activities.

<div bpmn="building-flexibility-into-bpmn-models-bpmn/subprocess.bpmn" callouts="subprocess,condition,activity" />

<span className="callout">1</span>

While we are occupied with carrying out some area of activities, in a scope of our process ...

<span className="callout">2</span>

... an event might occur, which causes us ...

<span className="callout">3</span>

to carry out this activity in addition to continuing with ordinary work


### Event sub processes

Sometimes we need to build in flexible activities which are carried out at any point in time. In such cases, we can leverage BPMN's event-based subprocesses.

<div bpmn="building-flexibility-into-bpmn-models-bpmn/event-subprocess.bpmn" />


### Escalation events

:::caution Camunda Platform 7 Only
Escalation events are [not yet supported in Camunda Cloud](https://docs.camunda.io/docs/reference/bpmn-processes/bpmn-coverage/)
:::

Sometimes we need highly flexible means to cancel scopes or trigger additional activities from within a scope. Particularly the BPMN escalation events can be useful to implement such requirements.

<div bpmn="building-flexibility-into-bpmn-models-bpmn/escalation.bpmn" callouts="escalation,boundary,activity,followup" />

<span className="callout">1</span>

As soon as we are finished with the first activity inside the scope... 

<span className="callout">2</span>

... we inform the surrounding scope about that and trigger an additional, essential activity ... 

<span className="callout">3</span>

... but also continue with our second activity in order to complete the subprocess. 

<span className="callout">4</span>

We can then already continue with the followup work regardless of whether that additional activity is already finished or not. 


### Termination events

:::caution Camunda Platform 7 Only
Termination events are [not yet supported in Camunda Cloud](https://docs.camunda.io/docs/reference/bpmn-processes/bpmn-coverage/)
:::

In order to build flexibility into process models, it is also useful to remember that the termination event just terminates the scope within which it is defined and therefore *not* always the whole process instance. With that technique it becomes possible to cancel some activities inside a sub process while completing it successfully and leaving it via the "normal" outgoing path.

<div bpmn="building-flexibility-into-bpmn-models-bpmn/termination.bpmn" callouts="termination,followup" />

<span className="callout">1</span>

As soon as one of our two activities achieves the result, we can cancel the other one ...

<span className="callout">2</span>

..., successfully complete the sub process and normally continue with our followup work





## Examples


### Allow proactive order status communication

Assume that an order must be validated, the customer checked and the delivery date determined before we can confirm the order to the customer. If the order is not acceptable - due to consistency issues or customer related issues - it is declined.

Some of our orders might be so important that we want to make sure to keep customers happy, even if not everything runs smoothly on our side.

<div bpmn="building-flexibility-into-bpmn-models-bpmn/example-order-proactive-communication.bpmn" callouts="on-demand,on-a-regular-basis" />

<span className="callout">1</span>

Order managers can request proactive customer communication on demand. Assume they can communicate the reasons via a form, whereas the communication as such is carried out by the call center.

<span className="callout">2</span>

On a regular basis, we check based on some rules, whether the order is so important that we proactively communicate why the order is not yet confirmed. Again the communication is carried out by the callcenter.


### Allow for order cancellation any time

The customer might be allows to request a cancellation ntil the order is finally confirmed. This request would have to be reviewed in order to determine whether we have to accept the cancellation.

<div bpmn="building-flexibility-into-bpmn-models-bpmn/example-cancel-order.bpmn" callouts="cancellation,error_throw,error_catch" />

<span className="callout">1</span>

Whenever the customer requests a cancellation, which can be done until the order is confirmed, we review that request and decide whether we have to accept the cancellation or not.

<span className="callout">2</span>

In case we have to accept the cancellation, we want to terminate the whole process. In order to do so we need to use one trick: Throwing an error event, that will end the current event subprocess but not yet the order process.

<span className="callout">3</span>

This leads to another subprocess to be triggered, and this one is interrupting. So now the process instance is really cancelled. 


### Allow for order details change, but repeat order validation 

:::caution Camunda Platform 7 Only
Condition events are [not yet supported in Camunda Cloud](https://docs.camunda.io/docs/reference/bpmn-processes/bpmn-coverage/)
:::

If the customer changes the order details the order must be validated again.

<div bpmn="building-flexibility-into-bpmn-models-bpmn/example-revalidate-order.bpmn" />
