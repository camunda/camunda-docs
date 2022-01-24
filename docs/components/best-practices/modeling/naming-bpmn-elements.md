---
id: naming-bpmn-elements
title: "Naming BPMN Elements"
description: "
    
"
date: 2015-10-27
stakeholders: Modeling
tags:
    - BPMN
    - Naming Convention
topics:
    - Customer Success Path
    - Modeling Guidelines
weight: 40

booksection: "C. Modeling"
bookchapter: 4
---

Name all elements in your BPMN diagrams by focusing on the business perspective. For activities, use a verb to describe what to do. For events, describe in which (business) state the process or domain object is currently in. For (data-based) gateways, pose a question and describe the conditions under which the process moves on along the outgoing flows.

## Essential practices

### Naming activities

Name a *task* using an object and a verb in the infinitive. By doing this, you consistently describe *what you do with an object*.

<div bpmn="naming-bpmn-elements-assets/task.bpmn" />

Name a *subprocess* (or *call activity*) by using an object and a  (by convention *nominalized*) verb. Similar to tasks, you should always describe *what you do with an object*.

<div bpmn="naming-bpmn-elements-assets/subprocess.bpmn" />

:::note
Avoid very broad and general verbs like "Handle invoice" or "Process order." Try to be more specific about what you do in your activity from a business perspective.
:::

### Naming events

Wherever possible, name an *event* using an object and a verb reflecting a state. Always try to describe *which state an object is in* when the process is about to leave the event.

<div bpmn="naming-bpmn-elements-assets/event.bpmn" />

This naming approach does not always work perfectly. In those cases, precisely describe the business semantics when the process is about to leave the event. The following names are also valid:

<div bpmn="naming-bpmn-elements-assets/event-alternative.bpmn" />

Be specific about the state you reached with your event from a business perspective. Often, you will reach "success" and "failure" like events from a business perspective:

<div bpmn="naming-bpmn-elements-assets/gateway.bpmn" callouts="invoice_paid, invoice_rejected" />

<span className="callout">1</span>

"Invoice paid" better qualifies the "successful" business state than "Invoice processed" would...

<span className="callout">2</span>

...because in principle, you can call the failed state "Invoice processed", too, but the reader of the diagram is much better informed by calling it "Invoice rejected".

:::note
Avoid very broad and general verbs like "Invoice processed" or "Order handled"!
:::

### Naming gateways

Label a data-based *exclusive gateway* with a question. Label the outgoing sequence flows with the conditions they are executed under. Formulate the conditions as answers to the question posed at the gateway.

<div bpmn="naming-bpmn-elements-assets/gateway.bpmn" />

This naming approach does not always work for *inclusive gateways*, because the outgoing flows' conditions can be completely independent from each other. Still, use a question whenever possible.

<div bpmn="naming-bpmn-elements-assets/gateway-inclusive-with-question.bpmn" />

If this is not possible, leave out the question completely but describe the conditions under which the outgoing paths are executed.

<div bpmn="naming-bpmn-elements-assets/gateway-inclusive-without-question.bpmn" />

*Avoid naming event-based gateways*, but ensure you name their subsequent events. Also, avoid naming *parallel gateways* and all forms of *joining gateways*. You don't need to specify anything about those gateways, as the flow semantics are always the same.

### Naming processes

A *pool* should be given the same name as the process the pool contains using an object and a nominalized verb. Optionally, add the organizational role responsible for the process shown in the pool as a whole.

<div bpmn="naming-bpmn-elements-assets/pool.bpmn" />

If you have more than one lane in a pool, name each *lane* using the organizational role or technical system responsible for carrying out the activities shown in the lane.

<div bpmn="naming-bpmn-elements-assets/lane.bpmn" />

Name a *diagram* (file) with same name as the process shown in the diagram. In case of a collaboration diagram, use a name reflecting the end-to-end perspective shown in that diagram.

## Recommended practices

### Using sentence case

Use [sentence case](https://en.wiktionary.org/wiki/sentence_case) when naming BPMN symbols. This is standard capitalization of an English sentence, with the first letter uppercase and subsequent letters lowercase, with exceptions such as proper nouns or acronyms.

<div bpmn="naming-bpmn-elements-assets/lane.bpmn" />

### Avoiding technical terms

Avoid using purely *technical terms* when naming activities or other BPMN symbols, for example. These are not always clear to every reader. Completely avoid using names of coding artifacts like classes, methods, technical services, or purely technical systems.

## Helpful practices

### Avoiding abbreviations

Avoid using *abbreviations* as they are not always clear to every reader. This is especially true for abbreviations which are specific to companies or departments. Try to avoid them completely.

If you want to use an abbreviation in your model (to save space or sometimes even to improve understandability) make sure you explain the abbreviation in the model in brackets, by text annotations, or use an accessible glossary.