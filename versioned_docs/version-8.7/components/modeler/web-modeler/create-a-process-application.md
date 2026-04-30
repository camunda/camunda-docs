---
id: create-a-process-application
title: Create a process application
description: Create a process application and select a development cluster to deploy to.
---

import EmptyProjectImg from './img/process-applications/empty-project.png'
import ReassignMainProcessImg from './img/process-applications/reassign-main-process.png'
import FileListImg from './img/process-applications/file-list.png'

Create a process application in your project to work on and deploy a set of related files.

## Create a process application

To create a process application, either:

- Select **Create process application** in an empty project.
- Select **New project > Create process application** if you have not yet created a project.
  <p><img src={EmptyProjectImg} alt="Create a process application from an empty project" /></p>

### Select a default cluster

<span class="badge badge--cloud">Camunda 8 SaaS only</span>

When you create a process application, you must select a development cluster to deploy to.

- If you have already created a cluster, turn on the toggle next to the cluster name in **Select a development cluster**.
- If you have not yet [created a cluster](/guides/create-cluster.md), or if **No Cluster has been created yet** is shown, select **Create new dev cluster**. The Console **Clusters** tab opens so you can create a new cluster.

:::note

- If your modeling plan does not allow you to create more clusters, a `Cluster creation is not available on this modeling plan` warning is shown. Contact the administrator or owner of your organization to upgrade your plan.

- If you do not have the proper permissions to create a cluster, a `Missing permissions` warning is shown. Contact the administrator or owner of your organization to create a cluster.

:::

### Main process

After you have created a process application, a new BPMN diagram is created and labeled as the main process.

- The main process diagram is named using the process application name. You can rename the main process diagram any time.
- A process application must have a main process. You cannot delete or move the main process diagram out of the process application.
- You can assign another BPMN diagram as the main process using the **Reassign main process** option in the action menu.
  <p>
  <img src={ReassignMainProcessImg} alt="Reassign the main process" />
  </p>

### Add files to a process application

To add more files to the process application, either:

- Select the **Create new** dropdown on the process application page to create and add a new file.
- Drag and drop files from your local computer.
- Move an existing file into the process application from a different location in Web Modeler.

The main process is always displayed at the top of the file list, regardless of the sort order.

<p><img src={FileListImg} alt="Process application file list" /></p>

:::note
Process IDs, decision IDs, and form IDs must be unique across all files within a process application. This avoids ambiguity and conflicts when you link resources and deploy the process application.
:::
