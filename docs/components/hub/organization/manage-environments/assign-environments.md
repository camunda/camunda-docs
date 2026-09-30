---
id: assign-environments
title: Assign environments to a workspace
description: "Assign Environments to a workspace when you create it or later, and manage the assignments with the Camunda Hub API."
---

Assign Environments to a workspace to decide where its projects can deploy. Every project in the workspace can then deploy to all the Environments assigned to the workspace.

## Permissions

You can assign Environments to a workspace if you're an **Organization owner** or **Organization admin**. A DevOps user can also manage the assigned Environments of a workspace if they have the **Editor** or **Workspace admin** role in that workspace.

You can assign only Environments of clusters that you can see.

## Assignment rules

- A workspace can have any number of Environments, including none.
- An Environment can be assigned to more than one workspace. Assigning one Environment to one workspace is the recommended model, but Camunda Hub doesn't enforce it.
- Workspace members see only the Environments assigned to their workspace. Viewers and commenters see none. See [Environments](/components/concepts/environments.md#who-can-see-and-use-environments).

## Assign environments when you create a workspace

1. In Camunda Hub, click **Workspaces** in the left navigation, and then click **Create workspace**.
2. Complete the **General** and **Members** steps. See [create a workspace](../manage-workspaces/manage-workspace.md#create-a-workspace).
3. Under **Environments**, select the Environments for the workspace. You can change this later.
4. Click **Create workspace**.

If Camunda Hub creates the workspace but can't assign the Environments, it shows a message. Assign the Environments from the workspace settings.

## Change the assigned environments

1. In Camunda Hub, click **Workspaces** in the left navigation, find the workspace, and click **Manage**. Alternatively, open the workspace and click **Settings** in the left navigation.
2. Open the **Environments** tab.
3. Click **Edit environments**. If the workspace has no Environments, click **Add environments**.
4. Select the Environments to assign, and remove the ones you no longer need. Then click **Save**.

Saving replaces the assigned Environments with your selection.

### Find an environment

The selection view lists the available Environments. Each card shows the version, status, region, and the other workspaces that use the Environment, or **Not assigned**.

- Use **Search environments** to search by name.
- Filter by version or tag.
- Turn on **Show only unassigned** to hide the Environments that other workspaces use.
- In Self-Managed, switch between **Grid** and **By cluster**.

### Remove the last environment

If you remove every Environment from a workspace, Camunda Hub asks you to confirm with **Remove environments**. The workspace then has no Environment to deploy to. You can assign Environments again at any time.

### What happens when you unassign an environment

When you unassign an Environment, projects in the workspace can no longer select it, and they can't deploy to it. Nothing else changes in the Environment or in other workspaces that use it.

## Assign environments with the API

Use the Camunda Hub API to assign Environments as part of your workspace setup or team onboarding automation. The API follows the same rules as the user interface.

| Method | Path                                      | Description                                                                |
| :----- | :---------------------------------------- | :------------------------------------------------------------------------- |
| `GET`  | `/environments`                           | List the Environments in your organization.                                |
| `GET`  | `/workspaces/{workspaceKey}/environments` | List the Environments assigned to a workspace.                             |
| `PUT`  | `/workspaces/{workspaceKey}/environments` | Replace the Environments assigned to a workspace with the ones you send.   |
| `GET`  | `/projects/{projectKey}/environments`     | List the Environments a project can use. This is the set of its workspace. |

The `PUT` request takes an `environmentIds` list of up to 500 Environment IDs, and replaces the complete set. To unassign an Environment, send the list without it. To unassign all, send an empty list.

See the API reference for [SaaS](/apis-tools/hub-api-saas/specifications/replace-workspace-environments.api.mdx) and [Self-Managed](/apis-tools/hub-api-sm/specifications/replace-workspace-environments.api.mdx).

## Next steps

- [Manage environments](./index.md).
- [Manage workspace members](../manage-workspaces/manage-workspace-members.md).
- Learn how to [deploy a project](/components/hub/workspace/manage-projects/deploy-project.md).
