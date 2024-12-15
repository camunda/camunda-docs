---
id: model-your-first-diagram
title: Model your first diagram
description: "After you've created a BPMN diagram, you can start modeling it."
---

<span class="badge badge--cloud">Camunda 8 only</span>

After you've created a BPMN diagram, you can start modeling it.

We've preconfigured a diagram consisting of a start event. To convert it to something meaningful, append a **Task** to it, and afterwards append an **EndEvent**:

![add task](img/web-modeler-add-task.png)
![add task](img/web-modeler-add-endevent.png)

Each element has adjustable attributes. Use the properties panel on the right side of the page.

Elements supporting different types can be reconfigured by clicking on the corresponding icon. In the following screenshot, a task has been added to the diagram. It can be converted to a service task, for example.

![task configuration](img/web-modeler-new-diagram-with-configuration.png)

To revert or reapply changes, you can use the **undo** and **redo** buttons located below the elements palette.

![undo and redo buttons](img/undo-redo.png)

:::info
See undo/redo management limitations when [Collaborating](./collaboration.md#undoredo-management-limitations) and [Importing](./import-diagram.md#undoredo-management-limitations).
:::

Use the canvas tools in the bottom right corner to interact with your diagram.

1. Zoom in.
   ![zoom in](img/zoom-in.png)

2. Zoom out.
   ![zoom in](img/zoom-out.png)

3. Reset viewport if you get lost on the canvas.
   ![reset view port](img/reset-viewport.png)

4. Open the minimap to navigate complex diagrams.
   ![mini map](img/minimap.png)

5. Enter the fullscreen mode for distraction-free modeling.
   ![full screen](img/fullscreen.png)

6. Drop an attention point and use it as a laser pointer in your presentations.
   ![attention grabber](img/attention-grabber.png)
