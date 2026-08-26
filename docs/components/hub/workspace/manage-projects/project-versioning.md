---
id: project-versioning
title: Manage and review project versions
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

See [manage file versions](/components/hub/workspace/modeler/modeling/versions.md) to learn about more features like comparing and restoring versions.

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

## Request a review

1. Request a review for the newest version of the project from the version history page of the project. Collaborators with edit permission in your project will see a notification on the process diagram page once you have requested a review. Reviews cannot be performed by the user who created the project version unless the user is an organization administrator.
2. Reviewers can view the changes, comment, request changes, or approve the project version.
3. After a user has submitted their review, the project version is marked as reviewed and the review status is shown in the version history.
   1. Any user with edit permissions can go back and edit the review at any point in time to update the assessment.
4. If the reviewer has marked the version with "changes requested", you can address the feedback by performing the requested changes, creating a new version, and requesting a review for the new version.

This review capability is most useful for reviews on a business level.
For technical reviews, you may instead [sync your Git repository](git-sync.md) to put changes into a technical context with related code changes.

After the review is complete, you can promote the versioned project to the next stage(s) of the [deployment pipeline](./deploy-project.md). For example, promote to your testing cluster/stage, then to staging, and finally to production.

:::info
If you want to use your own deployment pipeline after the review is complete, you can [sync your Git repository](git-sync.md) at this point to deploy and promote the project through your own pipeline.
:::
