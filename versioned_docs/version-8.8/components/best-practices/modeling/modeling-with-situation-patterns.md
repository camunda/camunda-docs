---
title: Modeling with situation patterns
tags:
  - BPMN
description: "Document patterns that share common characteristics and find a satisfying solution for modeling them."
---

When modeling, you will sometimes realize that some situations share common characteristics. To save work for yourself and spread such knowledge within your organization, collect and document such patterns as soon as you understand their nature and have found a satisfying solution for modeling them. For a start, we collected some typical patterns for you, which we observe quite often in our modeling practice. You do not need to reinvent the wheel over and over again.

## Escalating a situation step by step

You need something and hope that it happens. Such a hope for a result may materialize, but it does not have to! After some time, you will typically become impatient and try to do something to make it happen. But if it then still does not happen, there comes a point at which you will have to decide that you must accept a failure.

We sometimes also call that very common pattern a **multi-step escalation**.

**Example:** "A month ago, I ordered a pair of shoes with that new online shop! After two weeks of waiting: nothing. I contacted them to determine what's up. The clerk promised me that the shoes will leave the warehouse today! But again, nothing, so after another week I just canceled that order. Since then I did not hear a word."

In this scenario, the shop clearly did not implement the escalation of the delay properly. They should have applied one of the following patterns in the order delivery process:

### Option 1: Using event-based gateways

<div bpmn="best-practices/modeling-with-situation-patterns-assets/multi-step-escalation-using-event-based-gateways.bpmn" callouts="gateway_step_1,gateway_step_2" />

<span className="callout">1</span>

After ordering the goods, the process passively waits for the success case by means of an event-based gateway: the goods should be delivered. However, in case this does not happen within a reasonable time, we make a first step of escalation: remind the dealer.

<span className="callout">2</span>

We still stay optimistic. Therefore, the process again passively waits for the success case by means of another event-based gateway: the goods should still be delivered. However, in case this does not happen again within a reasonable time, we make a second step of escalation: cancel the deal.

**Evaluation:**

- :thumbsup: This solution explicitly shows how the two steps of this escalation are performed. Timers are modeled separately, followed by their corresponding escalation activities.

- :thumbsdown: The usage of separate event-based gateways leads to _duplication_ (for example, of the receiving message events) and makes the model _larger_, even more so in case multiple steps of escalation need to be modeled.

- :thumbsdown: During the time we need to remind the dealer, we are strictly speaking not in a position to receive the goods! According to the BPMN specification, a process can handle a message event only if it is ready to receive at exactly the moment it occurs. Fortunately, Camunda 8 introduced [message buffering](/components/concepts/messages.md#message-buffering), allowing to execute this model properly without loosing messages. Using Camunda 7, the message might get lost until we are at the second event-based gateway.

:::note
You might want to use that pattern when modeling _simple two phase escalations_. You should not execute it on Camunda 7.
:::

### Option 2: Using gateways forming a loop

<div bpmn="best-practices/modeling-with-situation-patterns-assets/multi-step-escalation-using-gateways-forming-a-loop.bpmn" callouts="gateway_1,gateway_2" />

<span className="callout">1</span>

After having ordered the goods, the process passively waits for the success case by means of an event-based gateway: the goods should be delivered. However, in case this does not happen within a reasonable time...

<span className="callout">2</span>

We choose by means of an exclusive gateway to make a _first step of escalation_: remind the dealer. We still stay optimistic. Therefore, the process returns to the event-based gateway and again passively waits for the success case: the goods should still be delivered. However, in case this does not happen again within a reasonable time, we choose a _second step of escalation_: cancel the deal.

**Evaluation:**

- :thumbsup: This model is a more _compact_ and more _generic_ modeling solution to the situation. If it comes to multiple steps of escalation, you will need such an approach to avoid huge diagrams.

- :thumbsdown: The solution is _less explicit_. We could not choose to label the timer with explicit durations, as a single timer is used for both durations. The solution is _less readable_ for a less experienced reading public. For a fast understanding of the two step escalation, this method of modeling is less suitable.

- :thumbsdown: During the time we need to remind the dealer, we are strictly speaking not in a position to receive the goods! According to the BPMN specification, a process can handle a message event only if it is ready to receive at exactly the moment it occurs. Fortunately, Camunda 8 introduced [message buffering](/components/concepts/messages.md#message-buffering), allowing to execute this model properly without loosing messages. Using Camunda 7, the message might get lost until we are at the second event-based gateway.

:::note
You might want to use that pattern when modeling _escalations with multiple steps_. You should not execute it on Camunda 7.
:::

### Option 3: Using boundary events

<div bpmn="best-practices/modeling-with-situation-patterns-assets/multi-step-escalation-using-boundary-events.bpmn" callouts="receive_task,boundary_event_2,boundary_event_1" />

<span className="callout">1</span>

After having ordered the goods, the process passively waits for the success case by means of a receive task: the goods should be delivered. However, in case this does not happen within a reasonable time...

<span className="callout">2</span>

a non-interrupting boundary timer event triggers a _first step of escalation_: remind the dealer. We still stay optimistic. Therefore, we did not interrupt the receive task, but continued to wait for the success case: the goods should still be delivered.

<span className="callout">3</span>

However, in case this does not happen within a reasonable time, we trigger a _second step of escalation_ by means of an interrupting boundary timer event: interrupt the waiting for delivery and cancel the deal.

**Evaluation:**

- :thumbsup: This model is even more _compact_ and a very _generic_ modeling solution to the situation. If it comes to multiple steps of escalation, the non-interrupting boundary timer event could even trigger multiple times.

- :thumbsup: The model complies with BPMN execution semantics. Since we never leave the wait state, the process is always ready to receive incoming messages.

- :thumbsdown: The solution is _less readable_ and _less intuitive_ for a less experienced reading public, because the way the interrupting and non-interrupting timers collaborate requires a profound understanding of boundary events and the consequences for token flow semantics. For communication purposes, this method of modeling is therefore typically less suitable.

:::note
You might want to use that pattern when modeling _escalations with two steps_ as well as _escalations with multiple steps_ for _executable models._
:::

## Requiring a second set of eyes

For a certain task - typically a critical one in terms of your business - you need the opinion, review, or approval of two different people.

We sometimes also call that pattern the **four eyes principle**.

**Example:** The manager of a small sized bank's lending department has a problem: "Over the last quarter, we lost €100,000 in unrecoverable medium-sized loans. Controlling now tells me that could probably have been easily avoided by more responsible decisions of our lending department staff! I want that every such decision is signed off by two people from now on."

Modeling a process dealing with that requirement can be achieved easily, but the better solution also depends on whether you prefer overall speed over total effort.

All of the following modeling patterns assume that the two or more tasks needed to ultimately approve the loan must not be completed by one and the same person. When executing such patterns, you must enforce that with the workflow engine.

### Option 1: Using separate tasks

<div bpmn="best-practices/modeling-with-situation-patterns-assets/four-eyes-principle-using-separate-tasks.bpmn" callouts="task_1,task_2" />

<span className="callout">1</span>

A first approver looks at the loan and decides whether they approve. If they decide not to approve, we are done, but if the loan is approved...

<span className="callout">2</span>

...a second approver looks at the loan. If they also decide to approve, the loan is ultimately approved.

**Evaluation:**

- :thumbsup: This solution _explicitly_ shows how the two steps of this approval are performed. Tasks are modeled separately, followed by gateways visualizing the decision making process.

- Note that the approvers work in a _strictly sequential_ mode, which might be exactly what we need in case we want _minimization of effort_ and, for example, display the reasonings of the first approver for the second one. However, we also might prefer _maximization of speed_. If this is the case, observe solution [option 3 (multi-instance)](#option-3-using-a-multi-instance-task) further below.

- :thumbsdown: The usage of separate tasks leads to _duplication_ and makes the model _larger_, even more so in case multiple steps of approvals need to be modeled.

You might want to use that pattern when modeling the need for a _second set_ of eyes needed in _sequential_ order, therefore _minimizing effort_ needed by the participating approvers.

While it is theoretically possible to model separate, explicit approval tasks in parallel, we do not recommend such patterns due to readability concerns.

<div bpmn="best-practices/modeling-with-situation-patterns-assets/four-eyes-principle-using-separate-tasks-in-parallel.bpmn" thumbs="down" />

As a better alternative when looking for _maximization of speed_, observe [option 3 (multi-instance)](#option-3-using-a-multi-instance-task) below.

### Option 2: Using a loop

<div bpmn="best-practices/modeling-with-situation-patterns-assets/four-eyes-principle-using-a-loop.bpmn" callouts="task,gateway_forming_loop" />

<span className="callout">1</span>

A first approver looks at the loan and decides if they approve. If they decide not to approve, we are done, but...

<span className="callout">2</span>

...if the loan is approved, we turn to a second approver to look at the loan. If they also decide to approve, the loan is ultimately approved.

**Evaluation:**

- :thumbsup: This model is a more _compact_ modeling solution to the situation. If it comes to multiple sets of eyes needed, you will probably prefer such an approach to avoid huge diagrams.

- Note that the approvers work in a _strictly sequential_ mode, which might be exactly what we need if we want _minimization of effort_ and, for example, display the reasonings of the first approver for the second one. However, we also might prefer _maximization of speed_. If this is the case, observe [option 3 (multi-instance)](#option-3-using-a-multi-instance-task) below.

- :thumbsdown: The solution is _less explicit_. We could not choose to label the tasks with explicit references to a first and a second step of approval, as a single task is used for both approvals. The solution is _less readable_ for a less experienced reading public. For a fast understanding of the two steps needed for ultimate approval, this method of modeling is less suitable.

You might want to use that pattern when modeling the need for _multiple sets_ of eyes needed in _sequential_ order, therefore _minimizing effort_ needed by the participating approvers.

### Option 3: Using a multi-instance task

<div bpmn="best-practices/modeling-with-situation-patterns-assets/four-eyes-principle-using-a-multi-instance-task.bpmn" callouts="task,boundary_event" />

<span className="callout">1</span>

All the necessary approvers are immediately asked to look at the loan and decide by means of a multi-instance task. The tasks are completed with a positive approval. Once all positive approvals for all necessary approvers are made, the loan is ultimately approved.

<span className="callout">2</span>

If the loan is not approved by one of the approvers, a boundary message event is triggered, interrupting the multi-instance task and therefore removing all the tasks of all approvers who did not yet decide. The loan is then not approved.

**Evaluation:**

- :thumbsup: This model is a very _compact_ modeling solution to the situation. It can also easily deal with multiple sets of eyes needed.

- Note that the approvers work in a _parallel_ mode, which might be exactly what we need in case we want _maximization of speed_ and want the approvers to do their work independent from each other and uninfluenced by each other. However, we also might prefer _minimization of effort_. If this is the case, refer to [option 1 (separate tasks)](#option-1-using-separate-tasks) or [option 2 (loop)](#option-2-using-a-loop) above.

- :thumbsdown: The solution is much _less explicit_ and _less readable_ for a less experienced reading public, because the way the boundary event interacts with a multi-instance task requires a profound understanding of BPMN. For communication purposes, this method of modeling is therefore typically less suitable.

You might want to use that pattern when modeling the need for _two_ or _multiple sets_ of eyes needed in _parallel_ order, therefore _maximising speed_ for the overall approval process.

## Measuring key performance indicators (KPIs)

You want to measure specific aspects of your process execution performance along some indicators.

**Example:** A software developer involved in introducing Camunda gets curious about the business: "How many applications do we accept or decline per month, and how many do we need to review manually? How many are later accepted and declined? How much time do we spend for those manual work cases, and how long does the customer have to wait for an answer? I mean...do we focus on the meaningful cases...?"

When modeling a process, we should actually always add some information about important key performance indicators (KPIs) implicitly. For example, specifically [naming start and end events](../naming-bpmn-elements/#naming-events) with the process state reached from a business perspective. Additionally, we might explicitly add additional business milestones or phases.

While the following section concentrates on the aspects of modeling KPIs, you might want to learn more about using them for [reporting about processes](../../operations/reporting-about-processes/) from a more technical perspective. For example, when being faced with the task to actually retrieve and present Camunda's historical data collected on the way of execution.

### Option 1: Showing milestones

<div bpmn="best-practices/modeling-with-situation-patterns-assets/measuring-key-performance-indicators-using-events.bpmn" callouts="business-rule-task,gateway_1,intermediate_event_automatically,intermediate_event_manually,end_event_accepted,end_event_rejected" />

<span className="callout">1</span>

First, we assess the application risk based on a set of automatically evaluable rules.

<span className="callout">2</span>

We can then determine whether the automated rules already came to a (positive or negative) conclusion or not. If the rules led to an unsure result, a human must assess the application risk.

<span className="callout">3</span>

We use explicit intermediate events to make perfectly clear that we are interested in the applications which never see a human...

<span className="callout">4</span>

...and be able to compare that to the applications which needed to be assessed manually, because the automatic assessment failed to determine a clear result.

<span className="callout">5</span>

We also use end events, which are meaningful from a business perspective. We must know whether an application was either accepted...

<span className="callout">6</span>

...or rejected.

By means of that process model, we can now let Camunda count the applications which were accepted and declined. We know how many and which instances we needed to review manually, and can therefore also narrow down our _accpeted/declined statistics_ to those manual cases.

Furthermore, we will be able to measure the _handling time_ needed for the user task; for example, by measuring the time needed from claiming the task to completing it. The customer will need to wait a _cycle time_ from start to end events, and these statistics, for example, could be limited to the manually assessed applications and will then also include any idle periods in the process.

*By comparing the economic *value* of manually assessed insurance policies to the *effort\* (handling time) we invest into them, we will also be able to learn whether we focus our manual work on the meaningful cases and eventually improve upon the automatically evaluated assessment rules.

### Option 2: Emphasizing process phases

As an alternative or supplement to using events, you might also use subprocesses to emphasize certain phases in your process.

<div bpmn="best-practices/modeling-with-situation-patterns-assets/measuring-key-performance-indicators-using-sub-processes.bpmn" callouts="sub_process" />

<span className="callout">1</span>

By introducing a separate embedded subprocess, we emphasize the _phase_ of manual application assessment, which is the critical one from an economic perspective.

Note that this makes even more sense if multiple tasks are contained within one phase.

## Evaluating decisions in processes

You need to come to a decision relevant for your next process steps. Your actual decision depends on a number of different factors and rules.

We sometimes also call that pattern **business rules** in BPMN.

**Example:** The freshly hired business analyst is always as busy as a bee: "Let's see... Category A customers always get their credit card applications approved, whereas Category D gets rejected by default. For B and C it's more complicated. Right, in between 2500 and 5000 Euros, we want a B customer, below 2500 a C customer is OK, too. Mmh. Should be no problem with a couple of gateways!"

### Showing decision logic in the diagram?

<div bpmn="best-practices/modeling-with-situation-patterns-assets/evaluating-decisions-in-processes-showing-decision-logic.bpmn" thumbs="down" />

When modeling business processes, we focus on the flow of work and just use gateways to show that following tasks or results fundamentally differ from each other. However, in the example above, the business analyst used gateways to model the logic underlying a decision, which clearly is considered to be an anti-pattern!

It does not make sense to model the rules determining a decision inside the BPMN model. The rules decision tree will grow exponentially for every additional criteria. Furthermore, we typically will want to change such rules much more often than the process (in the sense of tasks needed to be carried out).

### Using a single task for a decision

<div bpmn="best-practices/modeling-with-situation-patterns-assets/evaluating-decisions-in-processes-using-a-single-task.bpmn" callouts="business_rule_task,data_based_gateway" thumbs="up" />

<span className="callout">1</span>

Instead of modeling the rules determining a decision inside the BPMN model, we just show a single task representing the decision. Of course, when preparing for executing such a model in Camunda, we can wire such a task with a DMN decision table or some other programmed piece of decision logic.

<span className="callout">2</span>

While it would be possible to hide the evaluation of decision logic behind the exclusive gateway, we recommend always showing an explicit node with which the data is retrieved, which then might be used by subsequent data-based gateways.

## Distinguishing undesired results from fatal problems

You model a certain step in a process and wonder about undesired outcomes and other problems hindering you to achieve the result of the step.

**Example:** What today is a problem for the business might become part of the happy path in a less successful future: "Before we can issue a credit card, we must ensure that a customer is credit-worthy. Unfortunately sometimes it might also turn out that we cannot even get any information about the customer. Then we typically also reject at the moment. Luckily, we do have enough business with safe customers anyway."

### Option 1: Using gateways to check for undesired results

<div bpmn="best-practices/modeling-with-situation-patterns-assets/distinguishing-undesired-results-from-fatal-problems-1.bpmn" callouts="data_based_gateway" />

<span className="callout">1</span>

Showing the check for the applicant's creditworthiness as a gateway also informs about the result of the preceding task: the applicant might be creditworthy - or not. Both outcomes are _valid results_ of the task, even though one of the outcomes here might be _undesired_ from a business perspective.

### Option 2: Using boundary error events to check for fatal problems

<div bpmn="best-practices/modeling-with-situation-patterns-assets/distinguishing-undesired-results-from-fatal-problems-2.bpmn" callouts="error_boundary_event" />

<span className="callout">1</span>

Not to know anything about the creditworthiness (because we cannot even retrieve information about the applicant) is not considered to be a valid result of the step, but a _fatal problem_ hindering us to achieve any valid result. We therefore model it as a boundary error event.

The fact that both problems (an unknown applicant number or an applicant which turns out not to be credit-worthy) lead us at the moment to the same reaction in the process (we reject the credit card application) does not influence that we need to model it differently. The decision in favor of a gateway or an error boundary event solely depends on the exact definition of the result of a process step. Refer to the next section.

### Understanding the definition of the result

What we want to consider to be a valid result for a process step depends on assumptions and definitions. We might have chosen to model the process above with slightly different execution semantics, while achieving the same business semantics:

<div bpmn="best-practices/modeling-with-situation-patterns-assets/distinguishing-undesired-results-from-fatal-problems-3.bpmn" callouts="error_boundary_event" />

<span className="callout">1</span>

The only valid result for the step "Ensure credit-worthiness" is knowing that the customer is in fact credit-worthy. Therefore, any other condition must be modeled with an error boundary event.

To advance clarity by means of process models, it is absolutely crucial for modelers to have a clear mental definition of the _result_ a specific step produces, and as a consequence, to be able to distinguish _undesired results_ from _fatal problems_ hindering us to achieve any result for the step.

While there is not necessarily a right way to decide what to consider as a valid result for your step, the business reader will typically have a mental preference to observe certain business issues, either more as undesired outcomes or more as fatal problems. However, for the executable pools, your discretion to decide about a step's result might also be limited when using, for example, service contracts which are already pre-defined.

## Asking multiple recipients for a single reply

You offer something to or request something from multiple communication partners, but you actually just need the first reply.

We sometimes also call that pattern **first come, first serve**.

**Example:** A well-known personal transportation startup works with a system of relatively independent drivers. "Of course, when the customer requests a tour, speed is everything. Therefore, we need to limit a tour to those of our drivers who are close by. Of course, there might be several drivers within a similar distance. We then just offer the tour to all of them!"

### Using a multi-instance task

<div bpmn="best-practices/modeling-with-situation-patterns-assets/asking-multiple-recipients-for-a-single-reply.bpmn" callouts="send_task_mi,catching_message_event" />

<span className="callout">1</span>

After determining all drivers currently close enough to serve the customer, we push the information about the tour to all of those drivers.

<span className="callout">2</span>

We then wait for the reply of a single driver. Once we have it, the process won't wait any longer, proceeds to the end event, and informs the customer about the approaching driver.

According to the process model, it is possible that another driver accepts the tour as well. However, as the process in the tour offering system is not waiting for the message anymore, it will get lost. As our process proceeded to the end event after the first reply, all subsequent messages are intentionally ignored in this process design.

## Processing a batch of objects

You need to process many objects at once, which were already created before one by one, or which were updated one by one to reach a certain status.

We sometimes also call that pattern simply the **1-to-n problem**.

**Example:** A lawyer explains to a new client the way he intends to bill him: "Of course, if you need advice, you can call me whenever you want! We will agree about any work that needs to be done and my assistant will track those services which are subject to a charge. Once a month mostly you will receive a neatly-structured invoice providing you with all the details!"

### Using data stores and multi instance activities

<div bpmn="best-practices/modeling-with-situation-patterns-assets/processing-a-batch-of-objects.bpmn" callouts="start_event_advice_needed,task_record_billable_hours,data_store,start_event_monthly,task_determine_billable_clients,subprocess_client_invoicing_text_annotation,task_check_and_correct_timesheet_entry,end_event_client_invoiced" />

<span className="callout">1</span>

The client asks for advice whenever they need it. Note that we create one process instance per request for advice.

<span className="callout">2</span>

The lawyer makes sure to record the billable hours needed for the client.

<span className="callout">3</span>

As he does not directly inform anybody by doing this, but rather collects data, we show this with a data store representing the time sheet and a data association pointing in its direction - representing the write operation.

<span className="callout">4</span>

The assistant starts their invoicing process on a monthly basis. In other words, we create one process instance per monthly billing cycle.

<span className="callout">5</span>

As a first step, the assistant determines all the billable clients. This are the clients for which time sheet entries exist in the respective month. Note that we have _many_ legal advice instances who have a relationship to _one_ billing instance and that the connection is implicitly shown by the read operation on the current status of data in the time sheet.

<span className="callout">6</span>

Now that the assistant knows the billable clients, they can iterate through them and invoice all of them. We use a sequential multi-instance subprocess to illustrate that we need to do this for every billable client.

<span className="callout">7</span>

On the way, the assistant is also in charge of checking and correcting time sheet entries, illustrated with a parallel multi-instance task. Note that these time sheet entries (and hence task instances) relate here 1:1 to the instances of the lawyer's "legal consulting" process. In real life, the lawyer might have created several time sheet entries per legal advice process, but this does not change the logic of the assistant's process.

<span className="callout">8</span>

Once the client is invoiced, the assistant starts a "payment processing" instance per invoice, the details of which are not shown in this diagram. We can imagine that the assistant needs to be prepared to follow up with reminders until the client eventually pays the bill.

## Concurring dependent instances

You need to process a request, but need to make sure that you don't process several similar requests at the same time.

**Example:** A bank worries about the increasing costs for creditworthiness background checks: "Such a request costs real money, and we often have packages of related business being processed at the same time. So we should at least make sure that if one credit check of a customer is already running, we do not want another credit check for the same customer to be performed at the same time."

### Using message events

<div bpmn="best-practices/modeling-with-situation-patterns-assets/concurring-dependent-instances.bpmn" callouts="creditworthiness-check-active,determine-active-creditworthiness-check,inform-waiting-instances,creditworthiness-determined" />

<span className="callout">1</span>

Once an instance passes this event and moves on to the subsequent actual determination of the creditworthiness...

<span className="callout">2</span>

...other instances will determine that there already exists an active instance and wait to be informed by this instance.

<span className="callout">3</span>

When the active instance has determined the creditworthiness, it will move on to inform the waiting instances...

<span className="callout">4</span>

...which will receive a message with a creditworthiness payload and be finished themselves with the needed information.

The model explicitly shows separate steps (_determine_ and _inform_ waiting instances) which you might want to implement more efficiently within one single step doing both semantic steps at once by means of a small piece of programming code.

### Using a timer event

While using timer events can be a feasible approach in case you want to avoid communication between instances, we do not recommend it. For example, one downside is that such solutions cause delays and overhead due to the perdiodical queries and the loop.

<div bpmn="best-practices/modeling-with-situation-patterns-assets/concurring-dependent-instances-timer.bpmn" callouts="creditworthiness-check-activated,creditworthiness-check-deferred,creditworthiness-checked,determine-active-creditworthiness-check-2" thumbs="down" />

<span className="callout">1</span>

Once an instance passes this event and moves on to the subsequent actual determination of the creditworthiness...

<span className="callout">2</span>

...all other instances will go into a wait state for some time, but check periodically, if the active instance is finished.

<span className="callout">3</span>

When the active instance has determined the creditworthiness and finishes...

<span className="callout">4</span>

...all other instances will also finish after some time.
