---
id: milestones
title: Milestones
description: Work with milestones in Web Modeler
---

<span class="badge badge--cloud">Camunda 8 only</span>

You can create a milestone at any time to save a snapshot of your BPMN or DMN diagram.

You can restore a milestone to revert to a previous version of your diagram, for example if you make a mistake while modeling. You can also compare two milestones to see the differences between them.

## Milestone history

You can use the milestone history to view, compare, and manage your diagram milestones.

To view the milestone history, either:

- Select **History** from the actions menu.

  ![Milestone history screen showing the History button](img/milestones/web-modeler-milestone-action-menu-item-highlight.png)

- Select **Show milestone history** from the breadcrumb menu.

  ![Milestone history screen showing the History button](img/milestones/web-modeler-milestone-show-history-via-breadcrumb-highlight.png)

## Create a milestone

You can create a new milestone either from your diagram or the milestone history.

- From your diagram, select **Create milestone** from the breadcrumb menu.

  ![milestones create via icon](img/milestones/web-modeler-milestone-create-via-breadcrumb-highlight.png)

- From the milestone history, hover over the the latest version in the **Milestones** panel and select **Create a new milestone**.

  ![milestones create via icon](img/milestones/web-modeler-milestone-create-via-icon-highlight.png)

:::note

A new milestone is also automatically created when dragging and dropping a file into the diagram view, or when using the breadcrumb menu **Replace via upload** option.

:::

### Bulk milestone creation

A [process application](/components/modeler/web-modeler/process-applications.md) is a special type of Web Modeler folder that allows you to work on a set of related files and
[deploy](/components/modeler/web-modeler/process-applications.md#deploy-and-run-a-process-application) them as a single bundle with just one click. This reduces the risk of having a broken deployment at runtime, and makes it more convenient to deploy related files.

If you create a milestone on the main process of a process application, milestones are created for all other assets in the application, to make it easier to track or revert changes.

:::note
Milestones of resources belonging to a process application are tied to the main process and cannot be modified.
:::

## Compare milestones

You can compare the change history between two milestones, either visually as a diagram or as code in an XML diff layout.

1. Open the milestone history for your diagram.
1. Ensure that the **Show changes** toggle in the **Changes** panel is enabled.
1. Select the milestone that you want to compare. The previous milestone is automatically selected for comparison.

### Visual view

To view BPMN diagram changes visually, select the **Visual view** tab.

![milestones diffing](img/milestones/web-modeler-milestone-visual-diffing.png)

- Differences between the milestones are highlighted visually on the diagram. For example, if an element was added, this change is highlighted in green with a plus symbol. Hover over a change to view more details.
- Only differences that affect the execution of the BPMN process are highlighted.
- The **Changes** panel shows the details of each change, including the type and identifier. Select a change to highlight it.

:::note

Use the **Code view** to compare changes in a DMN diagram, as the **Visual view** only shows a view of the selected milestone.

:::

### Code view

To view BPMN and DMN diagram changes as code in an XML diff layout, select the **Code view** tab.

![milestones diffing](img/milestones/web-modeler-milestone-code-diffing.png)

- The XML for the previous milestone is shown on the left, with the currently selected milestone shown on the right.
- Differences between the milestones are highlighted visually in the XML. For example, if an element was added, this change is highlighted in green.
- Only differences that affect the execution of the BPMN process are highlighted.

### Compare milestones in a process application

## Restore a milestone

You can restore a milestone if you want to revert to a previous version of your diagram.

1. In the **Milestones** panel, hover over the milestone you want to restore.
1. Select the three vertical dots to open the actions menu.
1. Select **Restore as latest**.

![milestones restore](img/milestones/web-modeler-milestone-restore-highlight.png)

The diagram reverts to the restored milestone. A new change milestone is created with "(restored)" appended to the name.

![milestones restore](img/milestones/web-modeler-milestone-restore-complete-highlight.png)

## Copy a diagram milestone

You can copy diagram milestones to a different folder if you want to make a copy of the diagram.

1. In the **Milestones** panel, hover over the milestone you want to copy.
1. Select the three vertical dots to open the actions menu.
1. Select **Copy to...**.
1. Navigate to the project/folder you want to copy the milestone to, and select **Copy here**.

A copy of the diagram is created in the selected folder.

## Rename a milestone

You can rename a milestone at any time.

1. In the **Milestones** panel, hover over the milestone you want to rename.
1. Select the three vertical dots to open the actions menu.
1. Select **Edit name** and enter a new name for the milestone.

## Delete a milestone

You can _permanently_ delete a milestone.

1. In the **Milestones** panel, hover over the milestone you want to rename.
1. Select the three vertical dots to open the actions menu.
1. Select **Delete**.
1. You are prompted to confirm the deletion.
   - Select **Delete milestone** to permanently delete the milestone.
   - Select **Cancel** to close the dialog and return to the version history.

:::caution

Deleting a milestone is permanent. The milestone is removed from the milestone history and cannot be accessed after deletion.

:::
