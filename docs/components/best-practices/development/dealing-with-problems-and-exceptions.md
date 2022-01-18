---
title: Dealing With Problems and Exceptions
stakeholders: Development
tags:
- Transaction
- ACID Transaction
- Compensation
- Exception Handling
- BPMN Error Event
- Incident
- Save Point

booksection: "D. Automation"
bookchapter: 4
---

It's important to distinguish between technical reactions and business reactions predefined in the process, typically, but not necessarily, to deal with purely business related issues.


## Business transactions

Sometimes when we refer to "transactions" in processes we refer to a very different concept, which must be clearly distinguished from "technical" database transactions. A *business transaction* marks a section in a process for which 'all or nothing' semantics similar to a technical transaction should apply, but from a pure business perspective.

<div bpmn="dealing-with-problems-and-exceptions-assets/business-transaction.bpmn" callouts="transaction,intermediate_event_vacation_approval_withdrawn,user_task_cancel_hotel" />

<span className="callout">1</span>

A *Transaction Subprocess* marks a long running "business transaction", meaning here that in case ...

<span className="callout">2</span>

... the approval for the vacation is withdrawn at least four weeks in advance, we must not go on vacation. However ...

<span className="callout">3</span>

... we will want to cancel the hotel we already booked. With this task, which will just show up in our task list in case the approval for the vacation was withdrawn, we "roll back" the business transaction, in other words *compensate* what we already have done.

The borders of "business transactions" are not at all related to technical transactions. It's really just a possibility to compensate the scope of a sub process from a business perspective.



## Dealing with exceptions

### Workflow engine transactions and client code transactions

### At least once semantics and retries


### Handling an exception via the process

As an alternative to rolling back a transaction, we can also handle an exception via the process which called the failing piece of code.

<div bpmn="dealing-with-problems-and-exceptions-assets/dealing-with-exception.bpmn" callouts="boundary_event_message_not_deliverable,user_task_send_invoice_to_customer" />

<span className="callout">1</span>

We decide that we want to deal with an exception in the process: in case the invoice cannot be sent automatically ...

<span className="callout">2</span>

... we assign a task to a human user, who is now in charge of taking care of delivering the invoice.


Learn more about the usage of [error events](/docs/components/modeler/bpmn/error-events/error-events/) in the user guide.



### Distinguishing between exceptions and results

As an alternative to throwing a Java exception, you can also write a problematic result into a process variable and model a XOR-Gateway later in the process flow to take a different path if that problem occurs.

From a business perspective the underlying problem then looks less like an error and more like a result of an activity, so as a rule of thumb we deal with *expected results* of activities by means of gateways, but model exceptional errors, which *hinder us in reaching the expected result* as boundary error events.

<div bpmn="dealing-with-problems-and-exceptions-assets/expected-results.bpmn" callouts="task_check_customers_creditworthiness,exclusive_gateway_customer_creditworthy,boundary_event_customer_id_non_existent" />

<span className="callout">1</span>

The task is to "check the customer's creditworthiness", so we can reason that we *expect as a result* to know whether the customer is credit worthy or not.

<span className="callout">2</span>

We can therefore model an *exclusive gateway* working on that result and decide via the subsequent process flow what to do with a customer who is not credit worthy. Here we just consider the order to be declined.

<span className="callout">3</span>

However, it could be that we *cannot reach a result*, because while we are trying to obtain knowledge about the customer's creditworthiness, we discover that the ID we have is not associated with any known real person. We can't obtain the expected result and therefore model a *boundary error event*. In the example the consequence is just the same and we consider the order to be declined.



### Throwing and handling BPMN errors

In BPMN process definitions, we can explicitly model an end event as an error.

<div bpmn="dealing-with-problems-and-exceptions-assets/bpmn-error.bpmn" callouts="end_event_good_unavailable" />

<span className="callout">1</span>

In case the item is not available, we finish the process with an *error end event*.

It is crucial to understand that according to the BPMN spec, such a BPMN error is either xref:handling-exceptions-via-the-process[handled via the process] or *terminates the process instance*. It does not roll back the technical transaction! Therefore you can and normally should always *handle the BPMN Error* via the (parent) process scope calling it or embedding the process fragment throwing the error.

<div bpmn="dealing-with-problems-and-exceptions-assets/handling-a-bpmn-error.bpmn" callouts="boundary_event_good_unavailable" />

<span className="callout">1</span>

The boundary error event deals with the case that the item is unavailable. The details of the subprocess are shown in the diagram above.

Note, that you can mimic a BPMN error in your Java code by explicitly throwing an exception of type `org.camunda.bpm.engine.delegate.BpmnError`. The consequences for the process is the same as if it were an explicit error end event. So, in case your 'purchase' activity is not a sub process, but a service task, it could throw a BPMN Error informing the process that the good is unavailable:

```java
TODO
throw new BpmnError(GOOD_UNAVAILABLE);
```



## Modeling for easier operations

Make sure you also understand *retry behaviour* and *incident management* for service tasks.
