---
id: manage-workspace-members
title: Manage workspace members
description: "Manage members within your workspace."
---

Manage workspace members.

## About

A workspace has members who manage the workspace or work on workspace resources. Workspace members can be managed at the organization or [workspace](../../workspace/manage-workspace/index.md) level.

## Workspace roles

Workspace members are assigned one of the following roles:

| Role                | Access permissions                                                                                                            |
| :------------------ | :---------------------------------------------------------------------------------------------------------------------------- |
| **Workspace Admin** | The user can edit the workspace itself, all folders, and diagrams within the workspace, and invite more users to collaborate. |
| **Editor**          | The user can edit all folders and diagrams within the workspace.                                                              |
| **Commenter**       | The user cannot edit folders or diagrams or invite users, but can view diagrams and properties and leave comments.            |
| **Viewer**          | The user cannot edit folders or diagrams nor leave comments, but can only view diagrams.                                      |

:::note
Additionally, users with the **Organization Owner** or **Organization Admin** role always have access to every workspace in the organization, even if they aren't a member.
:::

## Add members

Add members to grant access to workspace resources:

1. In Camunda Hub, navigate to **Workspaces**.
2. Find the workspace, and click **Manage**.
3. Under **Members**, click **Add members**.
4. Provide names or email addresses. **(SaaS only)** Alternatively, click the email address input field, and select **All users in the organization**.
5. Select the workspace role, and optionally provide an invitation message.
6. Click **Add**.

The members will be added to the workspace and notified via email. Users without email addresses will not receive any kind of notification about workspace invitations.

:::note
If the individual is not a user in your organization, they will first receive an organization invitation. After accepting the invitation and logging into Camunda Hub, they will be added to the workspace. They will have a "pending" label in the members list until they accept.
:::

For Self-Managed non-production installations, the number of members per workspace is [limited to **five**](/reference/licenses.md#web-modeler), including the workspace administrator.

:::tip
In Self-Managed, you can [hide the **Add members** button](/self-managed/components/hub/configuration/properties.md#feature-flags) for non-organization admins.
:::

## Edit role

Edit members to change access privileges to workspace resources:

1. In Camunda Hub, navigate to **Workspaces**.
2. Find the workspace, and click **Manage**.
3. Under **Members**, find the member.
4. In the menu on the right side of the row, click **Edit role**.
5. Under **Workspace role**, select and apply a role.

## Remove members

Remove members to deny access to workspace resources:

1. In Camunda Hub, navigate to **Workspaces**.
2. Find the workspace, and click **Manage**.
3. Under **Members**, find the member.
4. In the menu on the right side of the row, click **Remove**.

## Further reading

- [Camunda Hub Member API](/apis-tools/hub-api-saas/specifications/add-member.api.mdx)
