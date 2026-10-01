---
id: create-a-project
title: Set up a new project
description: Create a project in a workspace. The project can deploy to the environments assigned to the workspace.
---

import FileListImg from './img/file-list.png'

Create a project in a workspace. The project can deploy to every environment assigned to the workspace.

## Prerequisites

To set up a new project, you first need a [workspace](../../organization/manage-workspaces/manage-workspace.md).

## Create a project

Create a project to work on a set of related files:

1. In your workspace, click **Create project**.
2. Provide a project name, and click **Create project**.

## Deployment Environments

A project doesn't have its own deployment targets. It can deploy to all the [environments](/components/concepts/environments.md) that are assigned to its workspace, and it always reflects changes to that set.

- To see the environments you can deploy to, open the [deploy dialog](./deploy-project.md#deploy-your-project) of the project.
- If no environment is assigned, an organization admin must [assign environments to the workspace](../../organization/manage-environments/assign-environments.md).

## Next steps

You've set up a new project. From here, you can:

- [Model your first diagram](../modeler/modeling/model-your-first-diagram.md)
- [Write a project README](../modeler/modeling/advanced-modeling/process-documentation-with-readme-files.md)
- [Sync with a remote repository](./git-sync.md#sync-with-remote-repository)
