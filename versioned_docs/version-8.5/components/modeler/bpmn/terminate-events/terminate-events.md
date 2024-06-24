---
id: terminate-events
title: "Terminate events"
decription: "BPMN terminate events allow a process model to cancel concurrent flows."
---

Terminate end events are the only kind of terminate events. When a process instance reaches a terminate end event, it
terminates all element instances in the same flow scope as the end event.

They are often used to terminate a concurrent flow that is not required anymore. Consider the following example.

![The process instance reached the terminate end event and canceled the concurrent flow.](assets/terminate-event-on-process-scope.png)

The process has two concurrent tasks `B` and `C`. In the process instance, both tasks are active. We complete the
task `C`. The process instance reaches the terminate end event and cancels the task `B`.

## On the process scope

A terminate end event on the process scope (i.e. not embedded in a subprocess) terminates all element instances of the
process instance. After the termination, the process instance completes.

If the process instance was created by a call activity from a parent process then the call activity completes and the
parent process instance takes the outgoing sequence flows.

## Inside a subprocess

A terminate end event inside an embedded or an event subprocess terminates all element instances of the
subprocess. After the termination, the subprocess completes, and the process instance takes the outgoing sequence flows.

The terminate end event is limited to its subprocess. It doesn't terminate element instances outside the subprocess.

![The process instance reached the terminate end event in the subprocess and canceled the concurrent task in the subprocess. The process instance took the outgoing sequence flow of the subprocess.](assets/terminate-end-event-inside-subprocess.png)

If the subprocess is a multi-instance then the terminate end event terminates only the element instances of the current
iteration. It doesn't terminate element instances of other multi-instance iterations.

## Additional resources

### XML representation

A terminate end event:

```xml
<bpmn:endEvent id="terminate-end-event">
    <bpmn:incoming>Flow_0zv9prm</bpmn:incoming>
    <bpmn:terminateEventDefinition id="TerminateEventDefinition_1" />
</bpmn:endEvent>
```
