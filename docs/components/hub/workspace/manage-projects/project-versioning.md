---
id: project-versioning
title: Project versioning
description: Projects allow you to create distinct versions for the entire application.
---

import CreateVersionMenuImg from './img/web-modeler-versions.png'
import CreateVersionModalImg from './img/web-modeler-version-create-process-application-version.png'
import VersionActionsImg from './img/web-modeler-version-actions.png'
import VersionListImg from './img/web-modeler-version-view-process-application-version.png'

Projects support versioning, allowing you to create distinct versions for the entire project. You can use versioning to save a single snapshot of all the project files in one action. This helps you track a project throughout its development lifecycle and ensures the correct version is referenced.

In this context, a version is a Web Modeler project snapshot, not a deployed process definition version. See [version](/reference/glossary.md#version).

## Version creation

To create a project version:

1. Open the [project homepage](create-a-project.md#project-homepage) and click **Create version** in the **Versions** section.
   <img src={CreateVersionMenuImg} alt="Create version on the project homepage" style={{maxWidth: '560px', width: '100%'}} />
2. Enter a **Version tag** in the version creation modal.
   <img src={CreateVersionModalImg} alt="Create a version modal" style={{maxWidth: '560px', width: '100%'}} />
3. Select the **Create** button.

On the versions page, which you open with **See full list**, you can use the file navigation header buttons to switch between files and view their content. See also [compare versions](/components/hub/workspace/modeler/modeling/versions.md#compare-versions).

<img src={VersionListImg} alt="Versions list with file navigation header buttons highlighted" style={{maxWidth: '560px', width: '100%'}} />

## Version actions

You can perform the following actions on a project version:

1. View details, which opens the version details page so you can review the contents of all files in the version.
1. Restore as latest, which is useful for reverting changes, making further edits, [git syncing](git-sync.md), downloading, or using Play.
1. Edit
1. Deploy, especially after the version has been [reviewed](./project-pipeline.md#review).
1. Download
1. Delete
1. Copy, which creates a new project with the files from the version.

<img src={VersionActionsImg} alt="Version actions" style={{maxWidth: '560px', width: '100%'}} />
