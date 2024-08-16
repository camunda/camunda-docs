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
import DeployProcessApplicationDiagramImg from './img/process-applications/diagram-process-application-pipeline.png'

A process application is a type of Web Modeler folder that allows you to work on a set of related files that you can [deploy](deploy-process-application.md) together as a single bundle. This reduces the risk of a broken deployment at runtime, and makes it easier to deploy related files.

<p><img src={FileListImg} alt="Process application file list" /></p>

- When you [create a process application](create-a-process-application.md), you must select a cluster to use for deployment during development.
- A process application must always have a main process. You can rename and reassign the main process at any time.
- You can add more files to the process application as required.

:::tip
We advise you to use a process application for all your non-trivial automation projects. For example, these projects tend to have one main BPMN process that represents your end-to-end use case, and additional files that the main process depends on, such as called supporting processes, DMN decisions, or forms.
:::

## Create a process application

Get started by creating a new process application.

- [Create a process application](create-a-process-application.md)

## Deploy and run a process application

You can deploy your process application to a Zeebe cluster, and run a new process instance.

- [Deploy and run a process application](deploy-process-application.md)

## Process application versioning

Although you cannot version a process application itself, you can use [bulk milestone creation](milestones.md#bulk-milestone-creation) and version tags to save a single 'versioned' snapshot of all the process application files in one action, instead of having to create separate milestones for every file.

- [Process application versioning](process-application-versioning.md)

## Using the Web Modeler development pipeline

Web Modeler provides a lightweight development pipeline you can use to quickly develop and progress low-risk process application releases through the stages of a standard development life cycle.

<p><img src={DeployProcessApplicationDiagramImg} alt="Process application file list" /></p>

:::caution
For business-critical and higher-risk processes that require strict governance and/or quality requirements, you can [integrate Web Modeler into your CI/CD pipelines](/docs/guides/devops-lifecycle/integrate-web-modeler-in-ci-cd/).
:::

### Deployment stages

When you create a process application, you select a default development cluster to deploy to during development.

You can also choose to define and deploy to different stages/clusters, allowing you to promote an application process version between stages in a development life cycle. You can define and deploy to the following stages:

| Stage       | Description                                                                                                     |
| :---------- | :-------------------------------------------------------------------------------------------------------------- |
| Development | Use to create and test new software features and changes.                                                       |
| Testing     | Use for quality checks, ensuring software meets defined standards before release.                               |
| Staging     | Use for controlled testing where changes are validated before deployment to production.                         |
| Production  | The live system with the latest software. Only administrators and organization owners can deploy to this stage. |

:::note

- An administrator should define the stages and clusters within Web Modeler.
- During deployment, the next stage is not automatically selected. You must choose the stage you want to promote to.
  :::

### Design and modeling

If you choose to use this pipeline, you can make use of the following features during design and modeling.

- Use token simulation to correct and optimize your process flow.
- Use Play mode to quickly validate the process behavior after you have added implementation details.
- Use versioning to track and review changes across assets in the process application.
  - For example, visually review changes between two versions of a BPPMN file, or view code changes for other files.
  - Add a comment to the main process diagram to indicate that a review is complete and that the process application can be promoted to the next stage.

### Process governance

## Known limitations

You should be aware of the following limitations when working with process applications:

- You cannot create subfolders inside a process application.
- Process applications can only be deployed to a Zeebe cluster in version 8.4.0 or higher.
- You cannot deploy individual files that are part of a process application; the application is always deployed as a whole.
- When you deploy a process application, only the main process is validated for missing [Connector secrets](../../console/manage-clusters/manage-secrets.md).
- The overall size of the deployment bundle is limited due to a maximum [record](../../zeebe/technical-concepts/internal-processing.md) size of 4 MB in Zeebe.
  - The limit is effectively between 2 and 3 MB, as Zeebe writes more data to the log stream than just the raw deployment.
  - If you exceed the limit, you are shown an [error message](deploy-process-application.md#deployment-errors):<br/>
    `Command 'CREATE' rejected with code 'EXCEEDED_BATCH_RECORD_SIZE'`.
