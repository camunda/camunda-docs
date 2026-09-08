---
id: model-your-first-diagram
title: Start modeling
description: "A brief tour of the Camunda Hub modeling interface."
---

A brief tour of the Camunda Hub modeling interface.

A new diagram contains a single start event, the starting point of every process. From here, you can add elements to build out your process.

1. In the modeling interface, next to the start event, click the **Append element** icon. This connects the start event to the next step in the process.
2. Select **Task**.
3. With the task selected, click the **Change element** icon in the floating menu. With this, you can change the element type.
4. Select **User task**.
5. With the user task selected, click the **Link form** icon in the floating menu. If you have already created a form, you can select the form from this menu.
6. At the top left of the modeling interface, make sure you're in **Implement** mode. In **Implement** mode, you can view all properties of an element.
7. With the user task selected, on the right side of the modeling interface, open the **Details** panel.
8. Inspect and edit the technical properties of the element.
9. On the left side of the modeling canvas, at the bottom of the actions menu, select the **Undo** or **Redo** icon to revert or your reapply changes.

:::note
Undo and redo behavior has limitations when [collaborating](../collaboration/collaboration.md#undoredo-management-limitations) and [importing a diagram](import-diagram.md#undoredo-management-limitations).
:::
