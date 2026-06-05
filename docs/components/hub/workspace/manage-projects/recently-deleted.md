---
id: recently-deleted
title: Recover deleted files
description: Recover deleted files within 30 days of deletion.
---

Learn how to recover recently deleted files before they're permanently removed.

## Soft deletion in Camunda Hub

When you delete a file, it's removed from the project and moved to **Recently deleted**. You have 30 days to restore it before permanent deletion.

:::note

Soft deletion only applies to files deleted in Camunda 8.10 and later. All items deleted in earlier versions are permanently deleted and can't be recovered.

:::

## Permanent deletion in Camunda Hub

Permanent deletion occurs 30 days after a file is deleted. This removes all associated data, including file content, version history, metadata, and its Git links.

## Restore permissions

Only users with project-level **edit** or **admin** access at the time of the restore attempt can restore a recently deleted file. The role at the time of the original deletion is not considered.

## Browse recently deleted files

In Camunda Hub, in the left-hand navigation, click **Recently deleted**. This shows all files deleted from any projects within the last 30 days.

Each row shows:

| Column             | Description                                                                                                                                                 |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Name**           | The file name                                                                                                                                               |
| **Type**           | The type of deleted resource                                                                                                                                |
| **Location**       | The full path of the file's current live ancestors as a breadcrumb. Composed at read time, so renames or moves of live ancestors are reflected immediately. |
| **Deleted by**     | The user who performed the deletion                                                                                                                         |
| **Deleted on**     | The date and time of the deletion                                                                                                                           |
| **Days remaining** | Days left before permanent deletion                                                                                                                         |

The default sort order has the most recently deleted files first.

## Restore a file

To restore a recently deleted file:

1. In the left-hand navigation, click **Recently deleted**.
2. Find the file you want to restore.
3. Click the restore icon at the end of the file's row.

The file returns to its original location.
