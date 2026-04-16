---
id: process-application-versioning
title: Process application versioning
description: Process applications allow you to create distinct versions for the entire application.
---

import CreateVersionMenuImg from '../img/versions/web-modeler-versions.png'
import CreateVersionModalImg from '../img/versions/web-modeler-version-create-process-application-version.png'
import VersionActionsImg from '../img/versions/web-modeler-version-actions.png'
import VersionListImg from '../img/versions/web-modeler-version-view-process-application-version.png'

:::note
With 8.7, "milestone" was renamed to "version". To learn more about this change, see [the related release note](/reference/announcements-release-notes/870/870-release-notes.md#web-modeler-milestones-renamed-to-versions).
:::

:::note
With 8.9, the main process label has been removed from process applications in Web Modeler. As a result, the `versionTag` is no longer set automatically on the main process XML. See [the related announcement](/reference/announcements-release-notes/890/890-announcements.md#web-modeler-the-main-process-label-has-been-removed-from-process-applications) for details.
:::

Process applications support versioning, allowing you to create distinct versions for the entire application. You can use versioning to save a single snapshot of all the process application files in one action. This helps you track a process application throughout its development lifecycle and ensures the correct version is referenced.

## Version creation

To create a process application version:

1. Open the [process application homepage](create-a-process-application.md#process-application-homepage) and click **Create version** in the **Versions** section.
   <img src={CreateVersionMenuImg} alt="Create version on the process application homepage" style={{maxWidth: '560px', width: '100%'}} />
2. Enter a **Version tag** in the version creation modal.
   <img src={CreateVersionModalImg} alt="Create a version modal" style={{maxWidth: '560px', width: '100%'}} />
3. Select the **Create** button.

On the versions page, which you open with **See full list**, you can use the file navigation header buttons to switch between files and view their content. See also [compare versions](/components/modeler/web-modeler/modeling/versions.md#compare-versions).

<img src={VersionListImg} alt="Versions list with file navigation header buttons highlighted" style={{maxWidth: '560px', width: '100%'}} />

## Version actions

You can perform the following actions on a process application version:

1. View details, which opens the version details page so you can review the contents of all files in the version.
1. Restore as latest, which is useful for reverting changes, making further edits, [git syncing](git-sync.md), downloading, or using Play.
1. Edit
1. Deploy, especially after the version has been [reviewed](./process-application-pipeline.md#review).
1. Download
1. Delete
1. Copy, which creates a new process application with the files from the version.

<img src={VersionActionsImg} alt="Version actions" style={{maxWidth: '560px', width: '100%'}} />
