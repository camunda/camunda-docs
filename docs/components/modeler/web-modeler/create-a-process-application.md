---
id: create-a-process-application
title: Create a process application
description: Create a process application.
---

import EmptyProjectImg from './img/process-applications/empty-project.png'
import ReassignMainProcessImg from './img/process-applications/reassign-main-process.png'
import FileListImg from './img/process-applications/file-list.png'
import DeployProcessApplicationImg from './img/process-applications/deploy-process-application.png'
import RunProcessApplicationImg from './img/process-applications/run-process-application.png'
import DeployErrorImg from './img/process-applications/deploy-error.png'

Get started by creating a new process application.

## Create a process application

To create a process application, either:

- Select **Create process application** in an empty project.
- Select **New project > Create process application** if you have not yet created a project.

<p><img src={EmptyProjectImg} alt="Create a process application from an empty project" /></p>

### Select a default cluster

<span class="badge badge--cloud">Camunda 8 SaaS only</span>

During creation, you must select a cluster to use for deployment during development.

- If you have already created a cluster, turn on the toggle next to the cluster's name in **Select a development cluster**.
- If you have not yet [created a cluster](/guides/create-cluster.md), or if **No Cluster has been created yet** is shown, select **Create new dev cluster**. This automatically opens the **Clusters** tab in Console to allow you to create a new cluster.

:::note

- If your modeling plan does not permit you to create more clusters, a `Cluster creation is not available on this modeling plan` warning is shown. Contact the administrator or owner of your organization to upgrade your plan.

- A `Missing permissions` warning is shown if you do not have the proper permissions to create a cluster. Contact the administrator or owner of your organization to create a cluster.
  :::

### Main process

After the process application is created, an empty BPMN diagram is created, named the same as the process application and labeled as the main process.

- A process application must always have a main process. The main process diagram cannot be deleted or moved out of the process application.
- You can rename the main process diagram any time.
- You can assign another BPMN diagram as the main process using the **Reassign main process** option in the action menu.
  <p>
  <img src={ReassignMainProcessImg} alt="Reassign the main process" />
  </p>

### Add files to a process application

To add more files to the process application, either:

- Select **Create new** dropdown on the process application page.
- Drag and drop files from your local computer.
- Move an existing file into the process application from a different location in the Web Modeler.

The main process is always displayed at the top of the file list, regardless of the sort order.

<p><img src={FileListImg} alt="Process application file list" /></p>

:::note
Within the same process application, process IDs, decision IDs, and form IDs must be unique across all files.
This is to avoid ambiguity and conflicts when you link resources and deploy the process application.
:::
