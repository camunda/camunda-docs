---
id: manual-tasks
title: "Manual tasks"
description: "A manual task defines a task that is external to the workflow engine."
---

A manual task defines a task that is external to the workflow engine. This is used to model work that is done
by somebody who the engine does not need to know of and there is no known system or UI interface.

For the engine, a manual task is handled as a pass-through activity, automatically continuing the
process at the moment the process instance arrives.

![task](assets/manual-task.png)

Manual tasks have no real benefit for automating processes. Manual tasks instead provide insights into the tasks
that are performed outside of the process engine.

## Additional resources

### XML representation

A manual task:

```xml
<bpmn:manualTask id="manual-task" name="Manual task" />
```
