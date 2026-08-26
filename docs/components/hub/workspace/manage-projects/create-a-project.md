---
id: create-a-project
title: Set up a new project
description: Create a project, and select a development cluster to deploy to.
---

import EmptyProjectImg from './img/empty-project.png'
import FileListImg from './img/file-list.png'

Create a project, and select a development cluster to deploy to.

## Prerequisites

To set up a new project, you first need a [workspace](../../organization/manage-workspaces/manage-workspace.md).

## Create a project

Create a project to work on a set of related files:

1. In your workspace, click **New project**.
2. Provide a project name, and click **Create project**.

## Connect clusters

Connect clusters to which you'll deploy project files.

There are [four deployment stages](./deploy-project.md#deployment-stages):

- Development
- Testing
- Staging
- Production

To deploy project files, you must connect a cluster to at least one stage:

1. In your project, next to **Connected clusters**, click **Configure**.
2. For each stage, select a cluster.
3. Click **Save**.

:::tip
If you don't have an appropriate cluster for a stage, [create one](../../organization/manage-clusters/create-cluster.md).
:::

## Next steps

You've set up a new project. From here, you can:

- [Model your first diagram](../modeler/modeling/model-your-first-diagram.md)
- [Write a project README](../modeler/modeling/advanced-modeling/process-documentation-with-readme-files.md)
- [Sync with a remote repository](./git-sync.md#sync-with-remote-repository)
