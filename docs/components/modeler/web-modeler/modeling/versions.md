---
id: versions
title: Versions
description: Work with versions in Web Modeler.
---

<span class="badge badge--cloud">Camunda 8 only</span>

:::note
With 8.7, "milestone" has been renamed to "version". To learn more about this change, see [the related release note](/reference/announcements-release-notes/870/870-release-notes.md#web-modeler-milestones-renamed-to-versions).
:::

You can create a version at any time to save a snapshot of your BPMN or DMN diagram.

You can restore a version to revert to a previous snapshot of your diagram, for example if you make a mistake while modeling. You can also compare two versions to see the differences between them.

## Versions list

You can use the versions list to view, compare, and manage your diagram versions.

To view the versions list, select **Versions > Show versions**.

![Versions list showing the show versions button](../img/versions/web-modeler-version-action-show-versions.png)

## Create a version

You can create a new version either from your diagram or the versions list.

- From your diagram, select **Versions > Create version**.

  ![versions create via the breadcrumb menu](../img/versions/web-modeler-version-create-via-versions-menu.png)

- From the versions list, hover over the draft in the **Versions** panel and select **Create a new version**.

  ![versions create via icon](../img/versions/web-modeler-version-create-via-icon-highlight.png)

:::note

A new version is also automatically created when dragging and dropping a file into the diagram view, or when you select the **Replace via upload** option from the breadcrumb menu.

:::

## Compare versions

You can compare the change history between two versions, either visually as a diagram or as code in an XML diff layout.

1. Open the versions list for your diagram.
1. Ensure that the sidebar **Show changes** toggle is turned on.
1. Select the version that you want to compare. The previous version is automatically selected for comparison.

:::note

Turn off the sidebar **Show changes** toggle to view individual versions without comparison to the previous version.

:::

### Compare versions in visual view

To view BPMN diagram changes visually, select the **Visual view** tab.

![versions diffing in visual view](../img/versions/web-modeler-version-visual-diffing.png)

- Differences between the versions are highlighted visually on the diagram. For example, if an element was added, this change is highlighted in green with a plus symbol. Hover over a change to view more details.
- Only differences that affect the execution of the BPMN process are highlighted.
- The sidebar **Changes** list shows the details of each change, including the type and identifier. Select a change to highlight it.

:::note

You can only use the **Code view** to compare changes in a DMN diagram. The **Visual view** only shows a view of the version.

:::

### Compare versions in code view

To view BPMN and DMN diagram changes as code in an XML diff layout, select the **Code view** tab.

![versions diffing in code view](../img/versions/web-modeler-version-code-diffing.png)

- The XML for the previous version is shown on the left, with the currently selected version shown on the right.
- Differences between the versions are highlighted in the XML. For example, if an element was added, this change is highlighted in green.

## Restore a version

You can restore a version to revert to a previous snapshot of your diagram.

1. In the sidebar **Versions** list, hover over the version you want to restore.
1. Select the three vertical dots to open the actions menu.
1. Select **Restore as latest**.

![versions restore](../img/versions/web-modeler-version-restore-highlight.png)

The diagram reverts to the restored version. A new version is created with "(restored)" appended to the name.

![version restored](../img/versions/web-modeler-version-restore-complete-highlight.png)

## Copy a diagram version

You can create a new diagram by copying a specific version.

1. In the sidebar **Versions** list, hover over the diagram version you want to copy.
1. Select the three vertical dots to open the actions menu.
1. Select **Copy to...**.
1. Choose a project/folder and select **Copy here** to create the new diagram in the chosen folder.

## Update a version

You can update a version name and description at any time.

1. In the sidebar **Versions** list, hover over the version you want to rename.
1. Select the three vertical dots to open the actions menu.
1. Select **Edit** and enter a new name and/or description for the version.

## Delete a version

You can _permanently_ delete a version.

1. In the sidebar **Versions** list, hover over the version you want to rename.
1. Select the three vertical dots to open the actions menu.
1. Select **Delete**.
1. You are prompted to confirm the deletion.
   - Select **Delete version** to permanently delete the version.
   - Select **Cancel** to cancel the deletion and return to the versions list.

:::caution

Deleting a version is permanent. You cannot access a deleted version, and it is removed from the versions list.

:::
