---
id: manage-workspace-members
title: Manage workspace members
description: "Manage members within your workspace."
---

Manage a workspace.

## About this guide

A workspace has members who manage the workspace or work on workspace resources. The workspace can be managed at the organization or workspace level.

## Prerequisites

You can manage workspaces at the organization level if you have one of the following roles:

- **Organization admin**
- **Organization owner**
- **Workspace admin**
- **Workspace owner**

## Add members

Add members to grant access to workspace resources:

1. In Camunda Hub, navigate to **Workspaces**.
2. Find the workspace, and click **Manage**:
3. Under **Members**, click **Add members**.
4. Provide names or email addresses.
5. Select the workspace role, and optionally provide an invitation message.
6. Click **Add**.

There is no limit to the amount of members you add at one time.

:::note
In Self-Managed, you can [hide the **Add members** button](/self-managed/components/hub/configuration/properties.md#feature-flags) for non-organization admins.
:::

<!-- TODO: verify accuracy -->
<!-- TODO: verify no bulk company invites -->

## Edit role

Edit members to change access privileges to workspace resources:

1. In Camunda Hub, navigate to **Workspaces**.
2. Find the workspace, and click **Manage**:
3. Under **Members**, find the member.
4. In the menu on the right side of the row, click **Edit role**.
5. Under **Workspace role**, select and apply a role.

## Remove members

Remove members to deny access to workspace resources:

1. In Camunda Hub, navigate to **Workspaces**.
2. Find the workspace, and click **Manage**:
3. Under **Members**, find the member.
4. In the menu on the right side of the row, click **Remove**.
