---
id: manage
title: Manage workspace
description: "Manage workspaces within your organization."
---

Create a workspace, update a workspace's information, or delete a workspace.

## About

In Camunda Hub, a workspace is a collaboration environment within an organization, representing a team or business domain. It groups organizational resources like members, projects, and clusters so related work happens in one shared space.

<!-- TODO: reference workspace management roles -->

:::tip
You can also [manage a workspace from within the workspace](../../workspace/manage-workspace/index.md) itself.
:::

## Create a workspace

Create a workspace, and invite members:

1. In Camunda Hub, navigate to **Workspaces**.
2. Click **Create workspace**.
3. Under **General**, give the new workspace a name and description, then click **Next**.
4. Under **Members**, [manage the workspace's members](./manage-workspace-members.md), then click **Create workspace**.

## Update workspace information

Update the workspace name and description:

1. In Camunda Hub, under your workspace, navigate to **Settings**.
2. Under **General > Workspace information**, update the workspace name and description.
3. Click **Update.**

## Delete a workspace

Soft delete a workspace and its resources:

1. In Camunda Hub, navigate to **Workspaces**.
2. Find the workspace, and click **Manage**.
3. Under **General > Danger Zone > Delete workspace**, click **Delete**.

Your workspace is moved to [**Recently deleted**](../../workspace/manage-projects/recently-deleted.md). It will be permanently deleted after the retention period.

## Further reading

- [Camunda Hub Workspace API](/apis-tools/hub-api-saas/specifications/create-workspace.api.mdx)
- [Manage workspace members](./manage-workspace-members.md)
