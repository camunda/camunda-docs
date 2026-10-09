---
id: workspaces
title: Workspaces
description: A workspace is a collaboration space in Camunda Hub where a team works on projects and deploys them to the environments assigned to it.
keywords: ["workspace", "team", "collaboration"]
---

A workspace is a collaboration space in Camunda Hub. It represents a team or business domain, and it brings together the people, the [projects](./projects.md), and the [environments](./environments.md) that the team works with.

## Example

A payments team might have a `Payments` workspace:

- **Members**: The developers, analysts, and reviewers of the payments team, each with a workspace role.
- **Projects**: A `consumer-loan-approval` project and a `refund-handling` project.
- **Environments**: A `payments-dev` environment for testing, and a `payments-prod` environment that an organization admin assigned to the team.

## Workspaces in Camunda Hub

In Camunda Hub, an organization contains workspaces, and workspaces contain projects:

```
Camunda Hub
└─ Organization
    └─ Workspace
        ├─ Members
        ├─ Environments
        └─ Projects
            └─ Files and folders
```

A workspace has the following parts:

| Part         | Description                                                                                                                                                                                                         |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Members      | The users who can see the workspace. Each member has a [workspace role](/components/hub/organization/manage-workspaces/manage-workspace-members.md#workspace-roles): Workspace Admin, Editor, Commenter, or Viewer. |
| Projects     | The [projects](./projects.md) of the workspace. Every project belongs to exactly one workspace.                                                                                                                     |
| Environments | The [environments](./environments.md) that the projects of the workspace can deploy to. An organization admin assigns them.                                                                                         |

Members can view only the workspaces they're invited to. Organization owners and admins can access every workspace.

## Workspaces and projects

A workspace is the container of projects. Every project belongs to one workspace, and the members of the workspace decide who can work on it.

- A project doesn't have its own deployment targets. It deploys to the environments assigned to its workspace, and every project in the workspace sees the same environments.
- When you delete a workspace, its projects are deleted with it. You can restore both from [recently deleted](/components/hub/workspace/manage-projects/recently-deleted.md) during the retention period.

Learn more about [projects](./projects.md).

## Workspaces and environments

A workspace is assigned environments, never clusters. An organization admin decides which environments a workspace can use, so a team can deploy only to the places that were approved for it.

An environment can be assigned to more than one workspace, and a workspace can have any number of environments, including none. Workspace admins and editors see the environments of their workspace. Viewers and commenters don't.

Learn more about [environments](./environments.md) and [clusters](./clusters.md).

## Workspaces in Desktop Modeler

Desktop Modeler doesn't have workspaces. It works with local files and [projects](./projects.md#process-applications-in-desktop-modeler).

## Next steps

- [Manage workspaces](/components/hub/organization/manage-workspaces/index.md)
- [Assign environments to a workspace](/components/hub/organization/manage-environments/assign-environments.md)
- [Manage projects](/components/hub/workspace/manage-projects/manage-projects.md)
