---
id: business-rule-task-linking
title: Business rule task linking
description: Use one of the following approaches to link the DMN decision to be called by a business rule task.
---

You can use either of the following approaches to link the DMN decision to be called by a [business rule task](/components/modeler/bpmn/business-rule-tasks/business-rule-tasks.md).

## Using the link button

1. Select a business rule task from the canvas. A link icon appears in the floating menu.
2. Click the link icon, and choose any decision from the same project.
3. Click **Link** to complete the linking process. In the properties panel on the right side of the screen, the value **DMN decision** is chosen for the **Implementation** property, and the Decision ID of the decision you chose to link is automatically copied to the **Called decision** section.

:::note
For business rule tasks that are already linked, clicking on the link icon opens a dialog which shows the name of the decision the business rule task is linked to. It is possible to navigate to the linked decision by clicking on it, or you can use the **Unlink** button to remove the link.
:::

## Using the properties panel

You can also enter the Decision ID directly in the properties panel:

1. Select a business rule task from the canvas.
2. On the right side of the canvas, open the **Details** panel.
3. Under **Properties > Implementation**, select **DMN decision**:
4. Under **Properties > Called decision**, provide the following:
   - **Decision ID**
   - **Binding**: You can also select a different binding for the called decision. See [choosing the resource binding type](/components/best-practices/modeling/choosing-the-resource-binding-type.md).
   - **Version tag**: If you select **version tag** for the binding, you must enter the actual version tag to use.
