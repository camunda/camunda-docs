---
id: process-application-versioning
title: Process application versioning
description: Process applications allow you to create distinct versions for the entire application.
---

:::note
With 8.7, "milestone" has been renamed to "version". To learn more about this change, see [the related announcement](/reference/announcements/870.md#web-modeler-milestones-renamed-to-versions).
:::

Process applications support versioning, allowing you to create distinct versions for the entire application. You can use versioning to save a single snapshot of all the process application files in one action.

- When you create a process application version, the input version tag is applied to the `versionTag` field in the main process XML.
- This helps you track a process application throughout its development lifecycle and ensures the correct version is referenced.

## Version creation

To create a process application version:

1. Open any file in a process application, click on the **Create version** button in the **Versions** dropdown menu.
   ![Create a version menu](img/versions/web-modeler-version-process-application-versions-menu.png)
2. Enter a **Version tag** in the version creation modal.
   ![Create a version modal](img/versions/web-modeler-version-create-process-application-version.png)
3. Select the **Create** button.

When you open the versions page (use the **Show versions** button in the **Versions** dropdown menu), you can now use the file navigation header buttons to switch between files and view their content. See also [compare versions](/components/modeler/web-modeler/versions.md#compare-versions).

![Versions list with file navigation header buttons highlighted](img/versions/web-modeler-version-view-process-application-version.png)

## Version actions

You can perform the following actions on a process application version:

1. Restore as latest (restores a version as the current state of the process application).
2. Edit name
3. Deploy
4. Delete

![Version actions](img/versions/web-modeler-version-actions.png)
