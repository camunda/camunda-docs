---
id: milestones
title: Milestones
description: Work with milestones in Web Modeler
---

<span class="badge badge--cloud">Camunda 8 only</span>

You can create a milestone at any time to save a snapshot of your diagram.

You can restore a milestone to revert to a previous version of your diagram, for example if you make a mistake while modeling. You can also compare two milestones together to see the differences between them.

## Milestone history

To view your diagram milestone history, either:

- Select **History** from the actions menu.
- Select **Show milestone history** from the breadcrumb menu.

For example:

![Milestone history screen showing the History button](img/milestones/web-modeler-milestone-action-menu-item.png)

## Create a milestone

You can create a new milestone directly from your diagram or the milestone history.

### Create a milestone from your diagram

Select **Create milestone** from the breadcrumb menu.

![milestones create via icon](img/milestones/web-modeler-milestone-create-via-breadcrumb.png)

### Create a milestone from the milestone history

Hover over the the latest version in the **Milestones** panel and select **Create a new milestone**.

![milestones create via icon](img/milestones/web-modeler-milestone-create-via-icon.png)

:::note

A new milestone is also automatically created when dragging and dropping a file into the diagram view, or when using the breadcrumb menu **Replace via upload** option.

:::

### Bulk milestone creation

A [process application](/components/modeler/web-modeler/process-applications.md) is a special type of Web Modeler folder that allows you to work on a set of related files and
[deploy](/components/modeler/web-modeler/process-applications.md#deploy-and-run-a-process-application) them as a single bundle with just one click. This reduces the risk of having a broken deployment at runtime, and makes it more convenient to deploy related files.

When creating a milestone on a main process of a process application, milestones are created for all other assets in the application to make it easier to track or roll back changes.

:::note
Milestones of resources belonging to a process application are tied to the main process and cannot be modified.
:::

## Compare milestones

You can compare two milestones together to see the changes made between them. You can view the changes both visually as a diagram and as code in an XML diff.

1. Open the milestone history for your diagram.
1. Ensure that the **Show changes** toggle in the **Changes** panel is enabled.
1. Select the milestone that you want to compare. The previous milestone is automatically selected for comparison.
1. Compare the milestones and their differences as required.

### Visual view

To view the differences visually as a diagram, select the **Visual view** tab.

The differences between the milestones are highlighted visually on the diagram. Only the differences that affect the execution of the BPMN process are highlighted. Purely visual changes such as positional changes are not highlighted.

![milestones diffing](img/milestones/web-modeler-milestone-diffing.png)

### Code view

To view the changes as code in an XML diff, select the **Code view** tab.

### Milestones panel

### Changes list

## Restore a milestone

You can restore a milestone to revert to a previous version of your diagram.

1. Hover over the

:::note

After you restore a milestone, the name of the newly restored milestone is appended with "(restored)".

:::

Hover over a milestone, click on the three vertical dots, and expand for more options.
![milestones restore](img/milestones/web-modeler-milestone-restore.png)
![milestones restore](img/milestones/web-modeler-milestone-restore-complete.png)

## Copy a milestone to another folder

## Rename a milestone

## Delete a milestone
