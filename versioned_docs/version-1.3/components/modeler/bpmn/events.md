---
id: events
title: "Overview"
description: "This document outlines an overview of general events, intermediate events, and boundary events."
---

Currently supported events:

* [None events](none-events/none-events.md)
* [Message events](message-events/message-events.md)
* [Timer events](timer-events/timer-events.md)
* [Error events](error-events/error-events.md)

## Events in general

Events in BPMN can be **thrown** (i.e. sent), or **caught** (i.e. received), respectively referred to as **throw** or **catch** events (e.g. `message throw event`, `timer catch event`).

Additionally, a distinction is made between start, intermediate, and end events:

* **Start events** (catch events, as they can only react to something) are used to denote the beginning of a process or subprocess.
* **End events** (throw events, as they indicate something has happened) are used to denote the end of a particular sequence flow.
* **Intermediate events** can be used to indicate that something has happened (i.e. intermediate throw events), or to wait and react to certain events (i.e. intermediate catch events).

Intermediate catch events can be inserted into your process in two different contexts: normal flow, or attached to an activity, and are called boundary events.

## Intermediate events

In normal flow, an intermediate throw event executes its event (e.g. send a message) once the token has reached it, and once done the token continues to all outgoing sequence flows.

An intermediate catch event, however, stops the token, and waits until the event it is waiting for occurs, at which execution resumes, and the token moves on.

## Boundary events

Boundary events provide a way to model what should happen if an event occurs while an activity is active. For example, if a process is waiting on a user task to happen which is taking too long, an intermediate timer catch event can be attached to the task, with an outgoing sequence flow to notification task, allowing the modeler to automate and sending a reminder email to the user.

A boundary event must be an intermediate catch event, and can be either interrupting or non-interrupting. Interrupting means that once triggered, before taking any outgoing sequence flow, the activity the event is attached to is terminated. This allows modeling timeouts where we want to prune certain execution paths if something happens (e.g. the process takes too long).
