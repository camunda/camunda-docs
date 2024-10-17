---
id: manual-tasks
title: "Manual tasks"
description: "A manual task defines a task that is external to the BPM engine."
---

A manual task defines a task that requires human interaction but no external tooling or UI interface. For example, a user reviewing a document or completing a physical task.

![task](assets/manual-task.png)

Manual tasks are part of [human task orchestration](/guides/getting-started-orchestrate-human-tasks.md), but differ from [user tasks](/components/modeler/bpmn/user-tasks/user-tasks.md) which define an actionable task assisted by a business process execution engine or software application.

Within the engine and BPMN model, a manual task is handled as a pass-through activity, automatically continuing the process at the moment the process instance arrives.

Manual tasks provide insights into the tasks performed outside the process engine, aiding in modeling a process, though no linked automation process is utilized.

### XML representation

A manual task:

```xml
<bpmn:manualTask id="manual-task" name="Manual task" />
```
