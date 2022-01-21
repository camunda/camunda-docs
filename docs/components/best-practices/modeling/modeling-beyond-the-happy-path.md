---
title: Modeling beyond the happy path
stakeholders: Modeling
tags:
    - BPMN
    - BPMN Error Event
    - BPMN Message Event
    - BPMN Timer Event
    - Happy Path
topics:
    - Modeling Guidelines
Weight: 100

booksection: "C. Modeling"
bookchapter: 2
---

[//]:# (Think we need an id above for this to appear?)

First, model the happy path to the desired end result before collecting problems and exceptions, prioritizing them, and introducing them incrementally. Secondly, focus on one selected issue at a time, and choose the right techniques for modeling beyond the happy path.

## The happy path and beyond

The happy path is kind of the default scenario with a positive outcome, so no exceptions, errors, or deviations are experienced. Typically, you want to model the happy path first, and therefore you should define the desired *end result*, find a suitable *start event*, and collect the *activities* and external *dependencies* which _always_ need to be considered to reach the result.

When we have that, the diagram shows the *happy path* of a business process (or of the selectively chosen part of the end-to-end business process):

<div bpmn="modeling-beyond-the-happy-path-assets/happy-path.bpmn" callouts="end_event_order_confirmed, start_event_order_received, task_check_order_completeness, intermediate_event_delivery_date_fixed" />

<span className="callout">1</span>

*End Event*: It's often the easiest first step to agree upon the desired ("happy") end *result* of a process.

<span className="callout">2</span>

*Start Event*: As a second step, one might agree upon a *trigger* for the work leading to the end result.

<span className="callout">3</span>

*Activities*: After that, you can brainstorm and collect activities which *always* need to be carried out to reach the result.

<span className="callout">4</span>

*Intermediate Events*: Optionally, you can brainstorm and collect *milestones* (modeled as blank events) and important external *dependencies* (e.g. modeled as message events).

### Modeling beyond the happy path by error scenarios

As soon as you have this happy path, start modeling beyond the happy path. Focus on *one* particular, selected problem at a time.

1. Try to *understand* the worries for *the business* in the light of the desired end result.

1. Identify the *undesired end result* the process will reach in case the problem cannot be mitigated. This informs you about the *end event* you will eventually reach because of the problem.

1. Identify the affected areas in the happy path. Can the problem occur at a *particular point*, *during* (one or several) *activities*, or basically *all the time*? This will inform you about the most promising modeling technique for the problem: whether either *gateways*, *boundary events*, or *event-based subprocesses* can serve you to fork off your "problem path".

This best practice will guide you through practices that help you model beyond the happy path.

## Forking off at a particular point

With BPMN gateways, we can deal with problems arising at a *particular point* in our process.

### Dealing with results

By using data-based gateways, we *actively decide* "now and here" on the basis of our own *process data* which path our process must move along. For example, we can therefore use an XOR gateway to fork off a "problem path," dealing with a problematic result of *our own activities*:

<div bpmn="modeling-beyond-the-happy-path-assets/exclusive-gateway.bpmn" callouts="exclusive_gateway_order_complete,exclusive_gateway_customer_creditworthy,end_event_order_declined" />

<span className="callout">1</span>

The *exclusive gateway* deals with the potentially problematic result of incomplete order data. Note that we deal here with the procedural consequences of work which already took place in the preceding task, where we actually checked the order for completeness.

<span className="callout">2</span>

Again, the preceding task already dealt with the actual work of checking the customer's creditworthiness. The *result* of the task is a "yes" or "no" (true or false). We can deal with data by means of a data-based gateway, which immediately redirects to the path our process must move along.

<span className="callout">3</span>

The *end event* characterizes the undesired end result "order declined," which we now reach because of having modeled two problems. In the example, both of them lead to one and the same business outcome.

### Dealing with events

By using event-based gateways, we *passively wait* for *future events* deciding about which path our process will have to move along. For example, we can therefore use use it to fork off a "problem path" dealing with an undesired event *outside of our own control*:

<div bpmn="modeling-beyond-the-happy-path-assets/event-based-gateway.bpmn" callouts="event_based_gateway,intermediate_event_ordered_good_not_deliverable" />

<span className="callout">1</span>

After having requested a delivery date (e.g. from wholesale), we use an *event-based gateway* to passively wait for what happens next. We can not know "now and here", because it's outside of our own control.

<span className="callout">2</span>

The *intermediate message event* allows us to deal with the undesired event that the ordered good is not deliverable.

### Dealing with missing results via timeouts

By using event-based gateways, we can also deal with the situation that *nothing relevant* for our process *happens*. We do this by defining a time period, after which we decide that we do not want to wait any longer:

<div bpmn="modeling-beyond-the-happy-path-assets/event-based-gateway-timer.bpmn" callouts="intermediate_event_answer_overdue" />

<span className="callout">1</span>

The *intermediate timer event* allows us to deal with the situation that nothing relevant for our process happened for a defined time period. In case we do not get an answer from wholesale, we inform the customer that the order is not deliverable at the moment.

## Forking off during (one or several) activities

With BPMN boundary events, we can deal with problems arising *while we are actively occupied* to carry out work in our process.

### Dealing with errors

A typical case is that it turns out to be *impossible to achieve the result* of an activity while working on it. We can then choose to interrupt our work and fork off a "problem path" to deal with the issue:

<div bpmn="modeling-beyond-the-happy-path-assets/boundary-error-event.bpmn" callouts="boundary_error_event_order_not_readable" />

<span className="callout">1</span>

The *interrupting boundary error event* allows us to deal with the fact that the order is not readable. As this prevents us from properly judging the completeness of the order, we cannot reach one of the expected results of our activity ("complete" or "not complete"), but instead deal with the problem by interrupting the activity and assuming the order to be declined.

When modeling for business process automation, "dealing with errors" might be a highly technical concern. As a rule of thumb, we just want to show the *"business related" problems* in a process model: those problems and errors which cause that our business process must move along a different path, because different work must be carried out as a reaction.

An example for a typical technical concern would be that we currently cannot reach a system, which is why, for example, we want to re-attempt it another time later on. We do not show such purely technical problems in a business process diagram, not even in an executable one: (1) It would clutter the diagram, and (2) There are more suitable ways to deal with technical issues potentially occuring almost anywhere. Read our Best Practice about [dealing-with-problems-and-exceptions](../development/dealing-with-problems-and-exceptions) from a more technical point of view to learn more about the border between business related shown in a process diagram and purely technical concerns not shown in a process diagram.

### Dealing with work on top of usual work

Another typical use case for reacting to situations while we are actively occupied is that it sometimes turns out we need to do stuff *in addition to what we already do*:

<div bpmn="modeling-beyond-the-happy-path-assets/boundary-timer-event.bpmn" callouts="sub_process,boundary_event_after_two_days" />

<span className="callout">1</span>

We encapsulate part of our process into a subprocess to enable us to express that while we are occupied with that part of the process, additional work might pop up.

<span className="callout">2</span>

The *non-interrupting boundary timer event* allows us to speed up order preparation in case it takes longer than two days; for example, by informing a responsible manager.

## Being able to react all the time

A bit similar to boundary events, with BPMN event subprocesses we can deal with problems arising while we are actively occupied to carry out work. The main advantage when being compared with boundary events is that some issues can *occur almost anywhere* on our way through the happy path.

### Dealing with issues occurring almost anywhere

Some issues can occur almost anywhere on the way through our process. The event subprocess allows us to fork off a *problem path* modeled separately from our main process to deal with such issues:

<div bpmn="modeling-beyond-the-happy-path-assets/non-interrupting-event-subprocess.bpmn" callouts="start_event_status_requested,task_provide_status_information" />

<span className="callout">1</span>

The *non-interrupting start message event* of the event sub process allows us to express that wherever we currently are on our way through order confirmation, it can happen that the customer requests information about the status of that process.

<span className="callout">2</span>

We should then provide the requested information without interferring with the order confirmation process itself.

### Dealing with canceling the process

Another typical use case for event-based subprocesses is a cancellation requested by the customer:

<div bpmn="modeling-beyond-the-happy-path-assets/interrupting-event-subprocess.bpmn" callouts="start_event_order_canceled,task_inform_dealer" />

<span className="callout">1</span>

The *interrupting start message event* of the event subprocess allows us to express that wherever we currently are on our way through order confirmation, it can happen that the customer requests cancellation.

<span className="callout">2</span>

We should then interrupt the main process (which is already expressed by the nature of the start event) and inform an involved dealer.

## Boundary events as alternative for event based gateways

### Using receive tasks with boundary events

The examples above leverage the *event based gateway*. BPMN also allows to model *receive tasks* that wait for responses. This has the advantage that you now can leverage boundary events to deal with *missing results* or other *events occuring while you are waiting* for the response. This is an *alternative* to the event-based gateways shown in the above models.

<div bpmn="modeling-beyond-the-happy-path-assets/passivity-as-activity.bpmn" callouts="task_receive_delivery_date,boundary_event_answer_overdue,boundary_event_ordered_good_not_deliverable" />

<span className="callout">1</span>

Instead of modeling an event for receiving a delivery date, we model a *task* here.

<span className="callout">2</span>

The fact that we do not receive such an answer at all can now be modeled as an *interrupting boundary timer event*. We inform the customer about the status, but as the timer is interrupting, do not wait any longer for the delivery date.

<span className="callout">3</span>

The possibility that it now might turn out that the ordered good is not deliverable could also become a boundary event, e.g. a *boundary message event*. The undesired event prevents us from sucessfully receiving a delivery date, and we therefore cancel any further waiting but instead inform the customer about the status.

[//]:# (What do you mean in the sentence above?)

### Modeling a multi phase escalation path

Boundary events are particularly useful when you consider that you might want to remind your dealer that the answer is overdue and give them another chance for transmitting the delivery date before you give up waiting. First, consider how this could be achieved by using event-based gateways:

<div bpmn="modeling-beyond-the-happy-path-assets/multi-phase-escalation-with-event-based-gateways.bpmn" callouts="gateway_dealer_already_reminded,task_remind_dealer" />

<span className="callout">1</span>

After having realized that the dealer's answer is late, we decide whether we want to remind the dealer and continue to wait - or not. We modeled here that we want to remind the dealer just once.

<span className="callout">2</span>

However, note that while we are reminding the dealer, we are strictly speaking not in a state "ready-to-receive" the dealer's answer! According to BPMN execution semantics, the dealer's message might get lost until we are back at the event-based gateway. While you might want to choose to ignore that when modeling for communication purposes only, you will need to get it right for executable models.

To get the BPMN execution semantics above fully right, we would now need to attach the two possible answers of the dealer ("Delivery data fixed", "Ordered good not available") as boundary events to the task "Remind dealer", too! Quite a modeling construct, just to properly wait for the dealer's response, right? Therefore, consider the following alternative to this modeling issue using boundary events only:

<div bpmn="modeling-beyond-the-happy-path-assets/multi-phase-escalation-with-boundary-events.bpmn" callouts="boundary_event_answer_late" />

<span className="callout">1</span>

Modeling a *non-interrupting boundary timer event* directly at a task which waits for the response has the advantage that we never leave the "ready-to-receive" state and therefore avoid troubles with the strict interpretation of BPMN execution semantics.

The second alternative is *very compact* and avoids issues with *not being ready-to-receive*, but typically needs a *deeper understanding* of BPMN symbols and their consequences for the token flow. Therefore, we sometimes also prefer event-based gateways for showing human flows, and ignore sophisticated token flow issues as discussed here.