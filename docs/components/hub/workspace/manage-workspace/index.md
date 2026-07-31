---
id: manage-workspace
title: Manage workspace settings
description: "Manage workspace members, update general information, or delete a workspace."
---

Manage workspace members, update general information, or delete a workspace.

## About

In Camunda Hub, a workspace is a collaboration environment within an organization, representing a team or business domain. It groups organizational resources like members and projects so related work happens in one shared space.

<!-- TODO: reference workspace management roles -->

:::tip
You can also [manage a workspace from the organization-level](../../organization/manage-workspaces/index.md).
:::

## Manage workspace members

Add members, edit member roles, or delete members:

1. In Camunda Hub, under your workspace, navigate to **Settings**.
2. Under **Members**, follow the organization-level [manage the workspace's members](../../organization/manage-workspaces/manage-workspace-members.md) guide.

## Update workspace information

Update the workspace name and description:

1. In Camunda Hub, under your workspace, navigate to **Settings**.
2. Under **General > Workspace information**, update the workspace name and description.
3. Click **Update.**

## Delete a workspace

Soft delete a workspace and its resources:

1. In Camunda Hub, under your workspace, navigate to **Settings**.
2. Under **General > Danger Zone > Delete workspace**, click **Delete**.

Your workspace is moved to [**Recently deleted**](../manage-projects/recently-deleted.md). It will be permanently deleted after the retention period.

## Further reading

- [Camunda Hub Workspace API](/apis-tools/hub-api-saas/specifications/create-workspace.api.mdx)
