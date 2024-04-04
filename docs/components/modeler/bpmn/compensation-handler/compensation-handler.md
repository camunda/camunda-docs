---
id: compensation-handler
title: "Compensation"
description: "A compensation handler is an activity used to undo tasks that have already been executed."
---

![Compensation marker example](assets/compensation-marker-example.png)

## Compensation handlers

Compensation handlers are activities or subprocesses attached to other activities using a compensation boundary event. When the process reaches a compensation throw event, it triggers the compensation handlers. If the compensation activity has been completed more than once, the compensation handler is invoked for the same amount.

If the compensation handler has input variable mappings, those are applied before invoking the compensation handler. In the same way, if the compensation handler has output variable mappings, those are applied after completing the compensation handler.

Termination of a compensation throw event interrupt all the related compensation handler, interrupted compensation handlers can't be re-activated.

More details on [compensation events](../compensation-events/compensation-events.md)

### Embedded subprocess as compensation handler

![Process with subprocess as compensation handler](assets/subprocess-compensation-handler.png)

The subprocess contains the steps to undo the actions of the compensation activity. Using a subprocess can be useful if a sequence of steps is required to undo the actions of the activity.

### Call activity as compensation handler

![Process with call activity as compensation handler](assets/call-activity-compensation-handler.png)

The call activity contains the steps to undo the actions of the compensation activity. Using a call activity can be useful in combination with a call activity as the compensation activity since compensation isn't propagated to the child process.

### Multi-instance activity as compensation handler

![Process with multi instance activity as compensation handler](assets/multi-instance-compensation-handler.png)

The multi-instance activity offers the option to operate sequentially or in parallel, and it requires an input collection. Combining it with a compensation activity is advantageous, as the compensation handler for a multi-instance activity is invoked only once, rather than for each item in the input collection. Notably, both the compensation activity and its handler can iterate over the same input collection items.
