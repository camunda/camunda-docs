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

Name all elements in your BPMN diagrams by focusing on the business perspective. For activities, use a verb to describe what to do. For events, describe in which (business) state the process or domain object is currently in. For (data based) gateways, pose a question and describe the conditions under which the process moves on along the outgoing flows.

## Essential Practices

### Naming Activities

Name a *task* using an object and a verb in the infinitive. By doing that you consistently describe *what you do with an object*.

<div bpmn="naming-bpmn-elements-bpmn/task.bpmn" />

Name a *subprocess* (or *call activity*) by using an object and a - by convention *nominalized* - verb. Similar to tasks you should always describe *what you do with an object*.

<div bpmn="naming-bpmn-elements-bpmn/subprocess.bpmn" />

WARNING: Avoid very broad and general verbs like e.g. "Handle invoice" or "Process order" and try to be more specific about what you do in your activity from a business perspective.


### Naming Events

Wherever possible, name an *event* by using an object and a verb reflecting a state. Always try to describe *in which state an object is* when the process is about to leave the event.

<div bpmn="naming-bpmn-elements-bpmn/event.bpmn" />

This naming approach does not always work 'perfectly'. In those cases try to precisely describe the business semantics when the process is about to leave the event. The following names are also "good enough":

<div bpmn="naming-bpmn-elements-bpmn/event-alternative.bpmn" />

Be specific about the state you reached with your event from a business perspective. Quite typically you will reach "success" and "failure" like events from a business perspective:

<div bpmn="naming-bpmn-elements-bpmn/gateway.bpmn" callouts="invoice_paid, invoice_rejected" />

<span className="callout">1</span>

'Invoice paid' better qualifies the "successful" business state than 'Invoice processed' would ...

<span className="callout">2</span>

... because in principle you can call the failed state 'Invoice processed', too, but the reader of the diagram is much better informed by calling it 'Invoice rejected'.

WARNING: Avoid very broad and general verbs like e.g. "Invoice processed" or "Order handled"!



### Naming Gateways

Label a data-based *exclusive gateway* with a question. Label the outgoing sequence flows with the conditions they are executed under. Frmulate the conditions as answers to the question posed at the gateway.

<div bpmn="naming-bpmn-elements-bpmn/gateway.bpmn" />

This naming approach does not always work for *inclusive gateways*, because the outgoing flow's conditions can be completely independent from each other. Still use a question whenever possible.

<div bpmn="naming-bpmn-elements-bpmn/gateway-inclusive-with-question.bpmn" />

If this is not possible, leave out the question completely but describe the conditions under which the outgoing paths are executed.

<div bpmn="naming-bpmn-elements-bpmn/gateway-inclusive-without-question.bpmn" />

*Avoid naming event based gateways*, but ensure you name their subsequent events. Also, avoid naming *parallel gateways* and all forms of *joining gateways*. You don't need to specify anything about those gateways, as the flow semantics are always the same.



### Naming Processes

A *pool* should be given the same name as the process the pool contains, by using an object and a nominalized verb. Optionally add the organizational role which is responsible for the process shown in the pool as a whole.

<div bpmn="naming-bpmn-elements-bpmn/pool.bpmn" />

In case you have more than one lane in a pool, name each *lane* by using the organizational role or technical system which is responsible for carrying out the activities shown in the lane.

<div bpmn="naming-bpmn-elements-bpmn/lane.bpmn" />

Name a *diagram* (file) with same name as process shown in the diagram. In case of a collaboration diagram, use a name reflecting the end-to-end perspective shown in that diagram.


## Recommended Practices

### Using Sentence Case

Use [sentence case](https://en.wiktionary.org/wiki/sentence_case) when naming BPMN symbols. It is standard capitalization of an English sentence, with the first letter uppercase and subsequent letters lowercase with exceptions such as proper nouns or acronyms.

<div bpmn="naming-bpmn-elements-bpmn/lane.bpmn" />



### Avoiding Technical Terms

Avoid to use purely *technical terms* when naming e.g. activities or other BPMN symbols - they are not always clear to every reader. Completely avoid using names of coding artifacts like classes, methods and technical services or purely technical systems.



## Helpful Practices

### Avoiding Abbreviations

Avoid using *abbreviations* - they are not always clear to every reader. This is especially true for abbreviations which are company or department specific. Try to avoid them completely.

If you want to use an abbreviation in your model, normally only in order to save space or sometimes even to improve understandability, make sure you explain it in the model (either in brackets or by text annotations) or use a commonly accessible glossary.
