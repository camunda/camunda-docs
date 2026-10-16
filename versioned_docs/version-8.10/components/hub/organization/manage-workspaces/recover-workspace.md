---
id: recover-workspace
title: Recover a deleted workspace
description: Recover a deleted workspace and its resources within 30 days of deletion. After 30 days, the workspace is permanently deleted.
---

When you [delete a workspace](./manage-workspace.md#delete-a-workspace), Camunda Hub moves it to **Recently deleted**. You have 30 days to restore it before it is permanently deleted.

:::note
Soft deletion only applies to workspaces deleted using the Camunda Hub user interface in Camunda 8.10 and later. All items deleted in earlier versions are immediately and permanently deleted, along with their data in project version history, and can't be recovered.
:::

## What is deleted with a workspace

The projects, files, and folders of the workspace are moved to **Recently deleted** together with the workspace. If you restore the workspace, the resources that were deleted with it are also restored. Resources that belonged to the workspace but were deleted independently before are not affected.

If the workspace has been deleted, you must restore the workspace before you can restore any of its projects, files, or folders. To recover individual projects, files, or folders, see [recover deleted projects and files](../../workspace/manage-projects/recently-deleted.md).

## Who can restore a workspace

Only a **Workspace Admin** at the time of the restore attempt can restore a recently deleted workspace. The role at the time of the original deletion is not considered.

Read more about [workspace roles](./manage-workspace-members.md#workspace-roles).

## Restore a workspace

To restore a recently deleted workspace:

1. In Camunda Hub, in the left navigation, click **Recently deleted**. The page lists all resources deleted within the last 30 days.
2. Find the workspace you want to restore. The **Days remaining** column shows the days left before permanent deletion.
3. Click the restore icon at the end of the row of the workspace.

The workspace returns to your list of workspaces, with the resources that were deleted with it.

## Permanent deletion

Permanent deletion occurs 30 days after a workspace is deleted. This removes all associated data, including the content, version history, metadata, and Git links of its resources.
