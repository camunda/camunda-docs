---
id: manage-workspace
title: Manage workspace settings
description: "Manage workspace members, view and assign Environments, update general information, or delete a workspace."
---

Manage workspace members, view and assign Environments, update general information, or delete a workspace.

## About

In Camunda Hub, a workspace is a collaboration space within an organization, representing a team or business domain. It groups organizational resources like members, projects, and Environments so related work happens in one shared space.

:::info
You can only manage a workspace's settings at the workspace level if you're a **Workspace Admin**, **Organization admin**, or **Organization owner**. You can also [manage a workspace from the organization level](../../organization/manage-workspaces/index.md).
:::

<!-- TODO: reference workspace management roles -->

## Manage workspace members

Add members, edit member roles, or delete members:

1. In your workspace, in the left-side navigation, click **Settings**.
2. Under **Members**, follow the organization-level [manage the workspace's members](../../organization/manage-workspaces/manage-workspace-members.md) guide.

## View assigned Environments

An [Environment](/components/concepts/environments.md) is the place where the projects of your workspace deploy and run. Your organization admin assigns Environments to the workspace, and every project in the workspace can use all of them.

If you're a **Workspace Admin** or **Editor**, the left navigation shows a **Workspace environments** section. It lists each assigned Environment with a **Details** entry and links to its applications. Organization owners and admins see the same list. Viewers and commenters don't see Environments.

For each Environment, the **Environments** page shows:

| Detail       | Description                                                                  |
| :----------- | :--------------------------------------------------------------------------- |
| Name         | The name of the Environment. Select it to open the details.                  |
| Cluster      | The cluster that hosts the Environment.                                      |
| Tags         | The tags of the cluster, for example `dev` or `prod`.                        |
| Version      | The Camunda version of the cluster.                                          |
| Status       | Whether the Environment is healthy, unhealthy, paused, resuming, or unknown. |
| Applications | Links to the applications of the Environment, such as Operate and Tasklist.  |

An unhealthy or paused Environment stays in the list with its status. If no Environment is assigned, the page tells you to contact an organization admin.

Select an Environment to see its applications, details, and a summary of its jobs from the last 24 hours. Camunda Hub doesn't check your permissions in the applications. Each application enforces its own access.

## Manage assigned Environments

Organization owners and admins can change the Environments assigned to a workspace. DevOps users can too, if they're also **Editor** or **Workspace Admin** in the workspace.

1. In your workspace, in the left-side navigation, click **Settings**.
2. Open the **Environments** tab.
3. Click **Edit environments**, or **Add environments** if none are assigned.
4. Select the Environments, then click **Save**.

See [assign Environments to a workspace](../../organization/manage-environments/assign-environments.md) for details.

## Update workspace information

Update the workspace name and description:

1. In your workspace, in the left-side navigation, click **Settings**.
2. Under **General > Workspace information**, update the workspace name and description.
3. Click **Update.**

## Delete a workspace

Soft delete a workspace and its resources:

1. In your workspace, in the left-side navigation, click **Settings**.
2. Under **General > Danger Zone > Delete workspace**, click **Delete**.

Your workspace is moved to [**Recently deleted**](../manage-projects/recently-deleted.md). It will be permanently deleted after the retention period.

## Further reading

- [Camunda Hub Workspace API](/apis-tools/hub-api-saas/specifications/create-workspace.api.mdx)
- [Environments](/components/concepts/environments.md)
