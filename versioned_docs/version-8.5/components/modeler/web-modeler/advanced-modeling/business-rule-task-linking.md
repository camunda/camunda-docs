---
id: business-rule-task-linking
title: Business rule task linking
description: Use one of the following approaches to link the DMN decision to be called by a business rule task.
---

You can use one of the following approaches to link the DMN decision to be called by a [business rule task](/components/modeler/bpmn/business-rule-tasks/business-rule-tasks.md).

## Using the link button

1. Select a business rule task from the canvas and a link icon will appear at the bottom right.
2. Click the link icon and choose any decision from the same project.
3. Click **Link** to complete the linking process. In the properties panel, the value **DMN decision** is chosen for the **Implementation** property, and the Decision ID of the decision you chose to link is automatically copied to the **Called decision** section.

![overlay](img/brt_overlay.png)

:::note
For business rule tasks that are already linked, clicking on the link icon opens a dialog which shows the name of the decision the business rule task is linked to. It is possible to navigate to the linked decision by clicking on it, or you can use the **Unlink** button to remove the link.
:::

![overlay](img/brt_linked.png)

## Using the properties panel

You may also enter the Decision ID directly in the **Called decision** section in the properties panel after selecting **DMN decision** for the **Implementation**.

![overlay](img/brt_properties-panel.png)

:::info
Deploying a diagram does not automatically deploy linked diagrams. Ensure you deploy linked diagrams separately.
:::
