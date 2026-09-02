---
id: project-versioning
title: Manage and review project snapshots
description: Create distinct snapshots for the entire project.
---

Create distinct snapshots for the entire project.

## About

Use snapshots to save a single capture of all the project files in one action. This helps you track a project throughout its development lifecycle and ensures the correct state is referenced.

In this context, a [snapshot](/reference/glossary.md#snapshot-project) is a Camunda Hub project snapshot, not a deployed process definition version.

## Create a snapshot

To create a project snapshot:

1. In your workspace, open a project.
2. On the right side of the project view, under **Project snapshots**, click **Create snapshot**.
3. Enter a **Snapshot tag** in the snapshot creation modal.
4. Click **Create**.

## View all snapshots

To view all snapshots:

1. In your workspace, open a project.
2. On the right side of the project view, under **Project snapshots**, click **Show full list**. This opens the **Snapshots** page.

The page lists every file in the project with its status, file version, last changed date, and creator, so you can review changes at a glance without opening the comparison view.

The side panel has two tabs:

- **Snapshots**: View the timeline of all project snapshots, including the current **Draft** state.
- **Compare Snapshots**: Compare two snapshots.

See [manage file versions](/components/hub/workspace/modeler/modeling/versions.md) to learn about more features like comparing and restoring individual file versions.

## Manage a project snapshot

To manage a project snapshot:

1. In your workspace, open a project.
2. On the right side of the project view, under **Project snapshots**, next to a snapshot, open the vertical ellipsis menu.

From here, you can perform the following actions on a project snapshot:

| Action                | Description                                                                                                        |
| :-------------------- | :----------------------------------------------------------------------------------------------------------------- |
| **View details**      | Open the snapshot details page to review the contents of all files in the snapshot.                                |
| **Restore as latest** | Revert changes, make further edits, or [sync](git-sync.md), download, or validate your project.                    |
| **Edit details**      | Edit the snapshot tag and description.                                                                             |
| **Download**          | Download the project as a zip file.                                                                                |
| **Edit review**       | Update the [review](#request-a-review) status of the snapshot. (Only available if the snapshot has been reviewed.) |
| **Copy to...**        | Create a new project with the files from the snapshot.                                                             |
| **Delete**            | Delete the project snapshot.                                                                                       |

On the snapshot details page (opened via **View details**), the actions menu also includes **Deploy**, which deploys the project snapshot, especially after it has been [reviewed](#request-a-review).

## Compare snapshots

You can compare any two project snapshots, including snapshots that are not next to each other in the timeline.

1. In your workspace, open a project.
2. On the right side of the project view, under **Project snapshots**, click **Show full list**.
3. On the right side of the **Snapshots** view, in the **Compare Snapshots** tab, select two snapshots you want to compare.

The comparison shows the older snapshot against the newer one, ordered by time regardless of the order you selected them. The selected pair is written to the URL, so you can share or bookmark a specific comparison.

The comparison lists every file present in either snapshot, with a status badge per file:

| Status        | Meaning                                                            |
| ------------- | ------------------------------------------------------------------ |
| **New**       | The file exists in the newer snapshot only.                        |
| **Removed**   | The file exists in the older snapshot only.                        |
| **Modified**  | The file content differs between the two snapshots.                |
| **Moved**     | The file changed location. A move summary is shown under its name. |
| **Unchanged** | The file content is identical in both snapshots.                   |

A file gets only one status badge, in this order of priority: **New**, then **Removed**, then **Modified**, then **Moved**, then **Unchanged**. For example, a file that was both moved and had its content changed shows as **Modified**, since the content change is the more significant one. Its move summary is still shown under its name.

For each file in the list, you can:

- Expand the row to view an inline diff of the file.
- Select the **Open file editor** icon to open the file.
- Select **Open version history** to open the [version history](/components/hub/workspace/modeler/modeling/versions.md) of the file.

## Restore a snapshot

Restoring a snapshot reverts the entire project to its state at the time the snapshot was created. This includes:

- Moving and renaming files and folders to their snapshot state.
- Soft-deleting files that were created after the snapshot.
- Restoring file instances that were deleted after the snapshot was created.
- Updating all file content to match the snapshot.

To restore a snapshot:

1. In your workspace, open a project.
2. On the right side of the project view, under **Project snapshots**, next to a snapshot, open the vertical ellipsis menu.
3. Select **Restore as latest**.

The project state changes to match the snapshot, and the snapshots timeline is refreshed.

### What happens during a project snapshot restore

A project snapshot restore is a single bulk operation, not a series of individual [file restores](/components/hub/workspace/modeler/modeling/versions.md#restore-a-version). It affects the project, its files, and any element templates differently:

- **The project snapshot itself**: if the project's live state has drifted from its most recent snapshot, a safety snapshot is created first to capture that state before restoring. If nothing has changed since the last snapshot, no safety snapshot is created.
- **Files that still exist in the project**: for each file that is still present (in its original location or elsewhere in the project), Camunda Hub moves and renames it back into place, then restores its content the same way as an individual file restore. A safety autosave entry captures the file's state just before the restore (only if it differs from the file's last saved entry), followed by a new "(restored)" entry with the snapshot's content.
- **Files that were moved out of the project or permanently deleted**: since there's no existing file to restore into, Camunda Hub creates a new file from the snapshot's content directly. This new file has no autosave step and no prior version history, since none of its own history exists yet.
- **Files that exist now but weren't part of the snapshot**: these are soft-deleted so the project matches the snapshot's file set.
- **Element templates**: element templates are handled differently depending on their state at the time of restore:
  - If a template is still in the project, its content is reset in place, and it's moved back to its recorded location. This does **not** publish a new numbered template version the way [restoring an element template directly](/components/hub/workspace/modeler/element-templates/manage-element-templates.md#versioning-element-templates) does.
  - If a template was soft- or permanently deleted since the snapshot was created, the entire restore fails rather than recreating the template.
  - If a template is still live but was moved out of the project, it's skipped. Restoring it in place would conflict with whoever now manages it in its new location. Any BPMN element still referencing the template keeps a broken reference; this is an accepted trade-off.
  - If a template was added to the project after the snapshot was created, it's left in place rather than removed. Unlike other new files, it can't be safely reverted or removed, since it has its own independent versioning.

## Request a review

1. Request a review for the newest snapshot of the project from the snapshots page of the project. Members with edit permission in your project will see a notification on the process diagram page once you have requested a review. Reviews cannot be performed by the user who created the project snapshot unless the user is an organization administrator.
2. Reviewers can view the changes, comment, request changes, or approve the project snapshot.
3. After a user has submitted their review, the project snapshot is marked as reviewed and the review status is shown in the snapshots timeline.
   1. Any user with edit permissions can go back and edit the review at any point in time to update the assessment.
4. If the reviewer has marked the snapshot as **Changes requested**, you can address the feedback by performing the requested changes, creating a new snapshot, and requesting a review for the new snapshot.

This review capability is most useful for reviews on a business level.
For technical reviews, you may instead [sync your Git repository](git-sync.md) to put changes into a technical context with related code changes.

After the review is complete, you can promote the project snapshot to the next stage(s) of the [deployment pipeline](./deploy-project.md). For example, promote to your testing cluster/stage, then to staging, and finally to production.

:::info
If you want to use your own deployment pipeline after the review is complete, you can [sync your Git repository](git-sync.md) at this point to deploy and promote the project through your own pipeline.
:::
