---
id: project-versioning
title: Manage project versions
description: Create distinct versions for the entire project.
---

Create distinct versions for the entire project.

## About

Use versioning to save a single snapshot of all the project files in one action. This helps you track a project throughout its development lifecycle and ensures the correct version is referenced.

In this context, a [version](/reference/glossary.md#version) is a Camunda Hub project snapshot, not a deployed process definition version.

## Create a version

To create a project version:

1. In your workspace, open a project.
2. On the right side of the project view, under **Versions**, click **Create version**.
3. Enter a **Version tag** in the version creation modal.
4. Click **Create**.

## View all versions

To view all versions:

1. In your workspace, open a project.
2. On the right side of the project view, under **Versions**, click **Show full list**.
3. At the top of the modeling view, use the file navigation header buttons to switch between files and view their content.

See [manage file versions](/components/hub/workspace/modeler/modeling/versions.md#compare-versions) for more information.

## Manage a project version

To manage a project version:

1. In your workspace, open a project.
2. On the right side of the project view, under **Versions**, open the vertical ellipsis menu.

From here, you can perform the following actions on a project version:

| Action                | Description                                                                                     |
| :-------------------- | :---------------------------------------------------------------------------------------------- |
| **View details**      | Open the version details page to review the contents of all files in the version.               |
| **Restore as latest** | Revert changes, make further edits, or [sync](git-sync.md), download, or validate your project. |
| **Edit**              | Edit the project version.                                                                       |
| **Download**          | Download the project as a zip file.                                                             |
| **Copy to**           | Create a new project with the files from the version.                                           |
| **Delete**            | Delete the project version.                                                                     |
