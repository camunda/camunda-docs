---
id: create-a-project
title: Set up a new project
description: Create a project, and select a development cluster to deploy to.
---

import FileListImg from './img/file-list.png'

Create a project, and select a development cluster to deploy to.

## Prerequisites

To set up a new project, you first need a [workspace](../../organization/manage-workspaces/manage-workspace.md).

## Create a project

Create a project to work on a set of related files:

1. In your workspace, click **New project**.
2. Provide a project name, and click **Create project**.

## Add files to a project

To add files to a project, either:

- Select the **Create new** dropdown on the project page to create and add a new file.
- Drag and drop files from your local computer.
- Move an existing file into the project from a different location in Camunda Hub.

You can also create subfolders to organize files within the project.

<p><img src={FileListImg} alt="Project file list" /></p>

:::note
Keep process IDs, decision IDs, form IDs, and RPA script IDs unique across all files within a project. A project with duplicate IDs will fail to deploy.
Camunda Hub flags the conflicting resource IDs in the resource's problems panel to help you fix them.
:::

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
