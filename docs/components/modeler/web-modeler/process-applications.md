---
id: process-applications
title: Process applications
description: Process applications allow you to deploy multiple related files together in a single bundle.
---

import EmptyProjectImg from './img/process-applications/empty-project.png'
import ReassignMainProcessImg from './img/process-applications/reassign-main-process.png'
import FileListImg from './img/process-applications/file-list.png'
import DeployProcessApplicationImg from './img/process-applications/deploy-process-application.png'
import RunProcessApplicationImg from './img/process-applications/run-process-application.png'
import DeployErrorImg from './img/process-applications/deploy-error.png'

## Idea and purpose

A process application is a special type of folder in Web Modeler that allows you to work on a set of related files and
[deploy](#deploy-and-run-a-process-application) them together in a single bundle with just one click.
This reduces the risk of having a broken deployment at runtime and makes it more convenient to deploy related files.

We advise using a process application for all non-trivial automation projects.
These projects tend to have one main BPMN process that represents your end-to-end use case and additional files the
main process depends on, such as called supporting processes, DMN decisions, or forms.

## Create a process application

Create a new process application by clicking the **Create process application** button in an empty project or via
**New project > Create process application** if you have not yet created a project.

<p><img src={EmptyProjectImg} alt="Create a process application from an empty project" /></p>

### Select a default cluster

After selecting **Create process application**, select a cluster to use for deployment during development. Selecting a default cluster enables you to separate testing and running your process application from production environments.

If you have already [created a cluster](/guides/create-cluster.md), select the toggle next to the cluster's name under **Select a development cluster**. 

If you have not yet created a cluster, or see **No Cluster has been created yet** in the modal, select **Create new dev cluster**. This will automatically take you to the **Clusters** tab in Console to create a new cluster.

If your modeling plan does not permit you to create more clusters, you may notice a warning message reading `Cluster creation is not available on this modeling plan`. Contact the admin or owner of your organization to upgrade your plan.

If you notice a warning message reading `Missing permissions`, you may not have the proper permissions to create a cluster. Contact your organization's admin to create a cluster.

### Main process

The new process application will contain an empty BPMN diagram with the same name as the process application itself, labeled as the main process. You can rename the main process diagram any time.

:::note
A process application must always have a main process.
That is why the main process diagram cannot be deleted or moved out of the process application.
However, you can assign another BPMN diagram as the new main process with the **Reassign main process** option in the
diagram's action menu:

<img src={ReassignMainProcessImg} alt="Reassign the main process" />
:::

### Add files to a process application

Add more files to the process application via the **Create new** dropdown on the process application page, drag and drop
from your local computer, or move from a different location in the Web Modeler.

To make it easily discoverable, the main process will always be displayed at the top of the file list, regardless of the sort order.

<p><img src={FileListImg} alt="Process application file list" /></p>

:::note
Within the same process application, process IDs, decision IDs, and form IDs must be unique across all files.
This is to avoid ambiguity and conflicts when you link resources and deploy the process application later on.
:::

## Deploy and run a process application

### Deploy a process application

Open the process application's [main process](#main-process) and use the **Deploy** button to deploy the process application to a Zeebe cluster.

<p><img src={DeployProcessApplicationImg} alt="Deploy a process application" /></p>

All BPMN, DMN, and form files contained in the process application folder will be deployed in a single bundle.

:::note
If any resource fails to deploy, the whole deployment will [fail](#deployment-errors) and the cluster state will remain unchanged.
This ensures that a process application cannot be deployed incompletely or in an inconsistent state, making it safer to use.
:::

### Run a process application

Open the process application's [main process](#main-process) and use the **Run** button to start a new instance.
Before the actual process instance is started, all resources will be re-deployed if required so the new instance
will always use their latest state.

<p><img src={RunProcessApplicationImg} alt="Run a process application" /></p>

After the process instance is started, you will receive a notification with a link to the process instance view in
[Operate](../../operate/operate-introduction.md).
Follow this link to monitor the process instance and interact with it as needed.

:::info
Single-file deployment is not supported in a process application.
If you click the **Deploy** or **Run** button for any diagram other than the main process, you will be asked to open the
main process instead to deploy the whole process application from there.
:::

### Deployment errors

If the deployment of a process application fails (for example, because one or more of the contained resources have invalid
implementation properties), a modal containing the error message thrown by the Zeebe engine will be displayed.
The message usually comprises the name of the affected resource, the ID of the invalid diagram element, and the actual error.

<p><img src={DeployErrorImg} style={{width: 680}} alt="Process application deployment error" /></p>

### Deployment of external resources

You can link BPMN processes, DMN decisions, or forms that are not part of the process application itself (external
resources) from any process inside a process application.

Note that when you deploy the process application:

- Linked external forms will be deployed together with the process application.
- Linked external BPMN and DMN diagrams are _not_ deployed together. They must be deployed separately.

## Versioning

You can also add version tags to [milestones](/components/modeler/web-modeler/milestones.md), and create milestones for all resources of given process applications.

When creating a milestone, name your milestone with a version tag to track it through the development lifecycle and ensure the correct version is called. To do this, enter a **Version tag** within the **Create a milestone** modal and click **Create**.

## Limitations

Be aware of the following limitations when working with process applications:

- You cannot create subfolders inside a process application.
- Process applications can only be deployed to a Zeebe cluster in version 8.4.0 or higher.
- It is not possible to deploy individual files that are part of a process application; the application will always be deployed as a whole.
- When you deploy a process application, only the main process will be checked for missing [Connector secrets](../../console/manage-clusters/manage-secrets.md).
- The overall size of the deployment bundle is limited due to a maximum [record](../../zeebe/technical-concepts/internal-processing.md) size of 4 MB in Zeebe.
  Effectively, the limit is between 2 and 3 MB as Zeebe writes more data to the log stream than just the raw deployment.
  - If you exceed the limit, you will see the following [error message](#deployment-errors):  
    `Command 'CREATE' rejected with code 'EXCEEDED_BATCH_RECORD_SIZE'`
- When naming your milestone with a version tag, users are unable to modify and delete the created versions.
