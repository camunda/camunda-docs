---
id: call-activity-linking
title: Call activity linking
description: Use one of the following approaches to link the process to be called by a call activity.
---

You can use one of the following approaches to link the process to be called by a [call activity](/components/modeler/bpmn/call-activities/call-activities.md).

## Using the link button

1. Select a call activity task from the canvas. A link icon appears in the floating menu.
2. Click the link icon, and choose any diagram from the same project.
3. Click **Link** to complete the linking process. The process ID of the diagram you chose to link is automatically copied to the **Called element** section in the properties panel on the right side of the screen.

For call activities that are already linked, clicking the link button opens a dialog which shows the name of the diagram the call activity is linked to. It is possible to navigate to the linked diagram by clicking it. You can use the **Unlink** button to remove the link.

## Using the properties panel

You can also enter the process ID directly in the properties panel:

1. Select a call activity task from the canvas.
2. On the right side of the canvas, open the **Details** panel.
3. Under **Properties > Called element**, provide the following:
   - **Process ID**
   - **Binding**: You can also select a different binding for the called decision. See [choosing the resource binding type](/components/best-practices/modeling/choosing-the-resource-binding-type.md).
   - **Version tag**: If you select **version tag** for the binding, you must enter the actual version tag to use.
