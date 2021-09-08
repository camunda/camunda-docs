---
id: embedded-subprocesses
title: "Embedded subprocess"
---

An embedded subprocess allows to group elements of the process.

![embedded-subprocess](assets/embedded-subprocess.png)

An embedded subprocess must have exactly one none start event. Other start events are not allowed.

When an embedded subprocess is entered then the start event gets activated. The subprocess stays active as long as one containing element is active. When the last element is completed then the subprocess gets completed and the outgoing sequence flow is taken.

Embedded subprocesses are often used together with **boundary events**. One or more boundary events can be attached to an subprocess. When an interrupting boundary event is triggered then the whole subprocess including all active elements gets terminated.

## Variable mappings

Input mappings can be used to create new local variables in the scope of the subprocess. These variables are only visible within the subprocess.

By default, the local variables of the subprocess are not propagated (i.e. they are removed with the scope). This behavior can be customized by defining output mappings at the subprocess. The output mappings are applied on completing the subprocess.

## Additional resources

### XML Representation
An embedded subprocess with a start event:

```xml
<bpmn:subProcess id="process-order" name="Process Order">
  <bpmn:startEvent id="order-placed" />
  ... more contained elements ...
</bpmn:subProcess>
```

### References

- [Variable mappings](/components/concepts/variables.md#inputoutput-variable-mappings)
