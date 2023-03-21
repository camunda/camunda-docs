---
id: link-events
title: "Link Events"
description: "Link events connect two sectinos of a process"
---

Link events are pairs of intermediate events, one throwing and one catching, that link the two together.
They have no significance related to content, but facilitate the diagram-creation process.
They are a mechanism for connecting two sections of a process.
Link events can be used as intermediate events only.

:::tip
You can use link events to create loops, to skip sections of a process, or to simplify the sequence flow lines in the diagram.
:::

Link event pairs have a throwing link event as the "exit point", and a catching link event as the "re-entrance point".
The two events are marked as a pair by their link name.

In practice, two paired link events function the same as two [intermediate none events] connected via a sequence flow.

![A pair of link events is equivalent to a pair of intermediate none events connected via a sequence flow](./assets/link-events-example.png)

Link events can be very useful if you draw comprehensive process diagrams with many sequence flows.
Links help avoid what otherwise might look like a “spaghetti” diagram.
In the example below, a retry loop is created using the link events pair `A`.

![A pair of link events is used to form a retry loop](./assets/link-events-example-in-practice.png)

## Additional resources

### XML representation

A manual task:

```xml
<bpmn:intermediateThrowEvent id="Throw_Link_Event_A" name="A">
  <bpmn:linkEventDefinition id="ThrowLinkEventDefinition" name="A" />
</bpmn:intermediateThrowEvent>
<bpmn:intermediateCatchEvent id="Catch_Link_Event_A" name="A">
  <bpmn:linkEventDefinition id="CatchLinkEventDefinition" name="A" />
</bpmn:intermediateCatchEvent>
```

### References

[Intermediate none events]: ../none-events/none-events.md#intermediate-none-events-throwing
