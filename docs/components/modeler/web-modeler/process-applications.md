---
id: process-applications
title: Process applications
description: Process applications allow you to deploy multiple related files together in a single bundle.
---

import EmptyProjectImg from './img/process-applications/empty-project.png'
import CreateProcessApplicationImg from './img/process-applications/create-process-application.png'
import FileListImg from './img/process-applications/file-list.png'
import DeployProcessApplicationImg from './img/process-applications/deploy-process-application.png'
import RunProcessApplicationImg from './img/process-applications/run-process-application.png'
import DeployErrorImg from './img/process-applications/deploy-error.png'

<span class="badge badge--cloud">Camunda 8 SaaS only</span>

## Idea and purpose

A process application is a special type of folder in Web Modeler that allows you to work on a set of related files and
[deploy](#deploy-and-run-a-process-application) them together in a single bundle with just one click.
This reduces the risk of having a broken deployment at runtime and makes it more convenient to deploy related files.

We advise using a process application if there is one main BPMN process that represents your end-to-end use case and
additional files the main process depends on – like called supporting processes, DMN decisions, or forms.

## Create a process application

Create a new process application by clicking the **Create process application** button in an empty project or via
**Create new** > **Process application** on the project or folder page.

<p><img src={EmptyProjectImg} alt="Create a process application from an empty project" /></p>

You will be asked to provide a name for the new process application.

<p><img src={CreateProcessApplicationImg} style={{width: 500}} alt="Create a new process application" /></p>

### Main process

The new process application will contain an empty BPMN diagram with the same name as the process application itself,
labelled as the main process.
You can rename the main process diagram any time if you wish.

:::note
A process application must always have a main process.
That is why the main process diagram cannot be deleted or moved out of the process application.
:::

### Add files to a process application

Add more files to the process application via the **Create new** dropdown on the process application page.
You can also drag and drop files from your local computer there or move existing files from a different location in
Web Modeler to the process application.

To make it easily discoverable, the main process will always be displayed at the top of the file list, also when you change its sort order.

<p><img src={FileListImg} alt="Process application file list" /></p>

:::note
Within the same process application, process IDs, decision IDs and form IDs must be unique across all files.
This is to avoid ambiguity and conflicts when you link resources and deploy the process application later on.
:::

## Deploy and run a process application

### Deploy a process application

Use the **Deploy** button on the process application page to deploy the process application to a Zeebe cluster.

<p><img src={DeployProcessApplicationImg} alt="Deploy a process application" /></p>

All resources contained in the process application (i.e. the main process plus all other BPMN diagrams, DMN diagrams and
forms) will be deployed together in a single bundle.
If any of the resources is invalid and cannot be deployed, the whole deployment will [fail](#deployment-errors) and the
cluster state will remain unchanged.
This ensures that a process application cannot be deployed incompletely or in an inconsistent state, which makes it safer to use.

### Run a process application

Use the **Run** button on the process application page to start a new instance of the process application's [main process](#main-process).
Before the actual process instance is started, all resources will be (re-)deployed if required so that the new instance
will always use their latest state.

<p><img src={RunProcessApplicationImg} alt="Run a process application" /></p>

After the process instance has been started, you will receive a notification with a link to the process instance view in
[Operate](../../operate/operate-introduction.md).
Follow this link to observe the progress of the process instance and interact with it if required.

:::info
If you click the **Deploy** or **Run** button on the modeling screen for a BPMN or DMN diagram that is part of a process
application, you will be deploying all resources of the process application and not just the current diagram.
:::

### Deployment errors

If the deployment of a process application fails (for example, because one or more of the contained resources have invalid
implementation properties), a modal containing the error message thrown by the Zeebe engine will be displayed.
The message usually comprises the name of the affected resource, the ID of the invalid diagram element, and the actual error.

<p><img src={DeployErrorImg} style={{width: 680}} alt="Process application deployment error" /></p>

### Deployment of external resources

You can link BPMN processes, DMN decisions, or forms that are not part of the process application itself (= external
resources) from any process inside a process application.

Note that when you deploy the process application:

- linked external forms will be deployed together with the process application.
- linked external BPMN and DMN diagrams need to be deployed separately.

## Limitations and availability

Process applications are currently a SaaS-only feature and not yet available in Web Modeler Self-Managed.

Also be aware of the following limitations when working with process applications:

- You cannot create subfolders inside a process application.
- Process applications can only be deployed to a Zeebe cluster in version 8.4.0 or higher.
- It is not possible to deploy individual files that are part of a process application; the application will always be deployed as a whole.
- The overall size of the deployment bundle is limited due to a maximum [record](../../zeebe/technical-concepts/internal-processing.md) size of 4 MB in Zeebe.
  Effectively, the limit is between 2 and 3 MB as Zeebe writes more data to the log stream than just the raw deployment.
  - If you exceed the limit, you will see the following [error message](#deployment-errors):  
    `Command 'CREATE' rejected with code 'EXCEEDED_BATCH_RECORD_SIZE'`
- If the main process has a start event with a linked form, the form is currently not previewed in the **Start instance** modal.
  You can still start the process instance with the form's input via a [public form](run-or-publish-your-process.md#publish-via-a-public-form)
  (SaaS only) or directly in [Tasklist](run-or-publish-your-process.md#publish-to-tasklist).
