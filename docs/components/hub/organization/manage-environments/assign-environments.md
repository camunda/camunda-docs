---
id: assign-environments
title: Assign environments to a workspace
description: "Assign environments to a workspace when you create it or later, and manage the assignments with the Camunda Hub API."
---

Assign environments to a workspace to decide where its projects can deploy. Every project in the workspace can then deploy to all the environments assigned to the workspace.

## Permissions

You can assign environments to a workspace if you're an **Organization owner** or **Organization admin**. A DevOps user can also manage the assigned environments of a workspace if they have the **Editor** or **Workspace admin** role in that workspace.

## Assignment rules

- A workspace can have any number of environments, including none.
- A workspace can have more than one environment for the same lifecycle phase. For example, you can assign multiple development environments to a workspace.
- All projects in a workspace inherit the environments assigned to the workspace.
- An environment can be assigned to more than one workspace. Assigning one environment to one workspace is the recommended model, but Camunda Hub doesn't enforce it.
- Workspace members see only the environments assigned to their workspace. Viewers and commenters see none. See [environments](/components/concepts/environments.md#who-can-see-and-use-environments).

## Assign environments when you create a workspace

1. In Camunda Hub, click **Workspaces** in the left navigation, and then click **Create workspace**.
2. Complete the **General** and **Members** steps. See [create a workspace](../manage-workspaces/manage-workspace.md#create-a-workspace).
3. Under **Environments**, select the environments for the workspace. You can change this later.
4. Click **Create workspace**.

If Camunda Hub creates the workspace but can't assign the environments, it shows a message. Assign the environments from the workspace settings.

## Change the assigned environments

1. In Camunda Hub, click **Workspaces** in the left navigation, find the workspace, and click **Manage**. Alternatively, open the workspace and click **Settings** in the left navigation.
2. Open the **Environments** tab.
3. Click **Edit environments**. If the workspace has no environments, click **Add environments**.
4. Select the environments to assign, and remove the ones you no longer need. Then click **Save**.

Saving replaces the assigned environments with your selection.

### Find an environment

The selection view lists the available environments. For each environment, it shows the version, status, region, and the other workspaces that use it, or **Not assigned**.

- Use **Search environments** to search by name.
- Filter by version or tag.
- Turn on **Show only unassigned** to hide the environments that other workspaces use.

### Remove the last environment

If you remove every environment from a workspace, Camunda Hub asks you to confirm with **Remove environments**. The workspace then has no environment to deploy to. You can assign environments again at any time.

### What happens when you unassign an environment

When you unassign an environment, projects in the workspace can no longer select it, and they can't deploy to it. Nothing else changes in the environment or in other workspaces that use it.

## Assign environments with the API

Use the Camunda Hub API to assign environments as part of your workspace setup or team onboarding automation. The API follows the same rules as the user interface.

| Method | Path                                      | Description                                                                |
| :----- | :---------------------------------------- | :------------------------------------------------------------------------- |
| `GET`  | `/environments`                           | List the environments in your organization.                                |
| `GET`  | `/workspaces/{workspaceKey}/environments` | List the environments assigned to a workspace.                             |
| `PUT`  | `/workspaces/{workspaceKey}/environments` | Replace the environments assigned to a workspace with the ones you send.   |
| `GET`  | `/projects/{projectKey}/environments`     | List the environments a project can use. This is the set of its workspace. |

The `PUT` request takes an `environmentIds` list of up to 500 environment IDs, and replaces the complete set. To unassign an environment, send the list without it. To unassign all environments, send an empty list.

See the API reference for [SaaS](/apis-tools/hub-api-saas/specifications/update-workspace-environments.api.mdx) and [Self-Managed](/apis-tools/hub-api-sm/specifications/update-workspace-environments.api.mdx).

## Next steps

- [Manage environments](./index.md).
- [Manage workspace members](../manage-workspaces/manage-workspace-members.md).
- Learn how to [deploy a project](/components/hub/workspace/manage-projects/deploy-project.md).
