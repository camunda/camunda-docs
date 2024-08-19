---
id: process-applications
title: Process applications
description: Process applications allow you to deploy multiple related files together in a single bundle.
---

import ProcessApplicationImg from './img/process-applications/diagram-process-application-get-started.png'
import FileListImg from './img/process-applications/file-list.png'

A process application is a type of Web Modeler folder that allows you to work on a set of related files that you can [deploy](deploy-process-application.md) together as a single bundle. This reduces the risk of a broken deployment at runtime, and makes it easier to deploy related files.

<p><img src={ProcessApplicationImg} alt="Process application" /></p>

For example, a process application is created for a consumer loan application. The process application consists of a main process BPMN diagram, and additional supporting files (DMN diagrams and a form) to handle calculations and approval.

<p><img src={FileListImg} alt="Process application file list" /></p>

:::tip
It is recommended that you use a process application for all your non-trivial automation projects. These projects tend to have one main BPMN process that represents your end-to-end use case, and additional files that the main process depends on, such as called supporting processes, DMN decisions, or forms.
:::

## Process application development pipeline

You can use the provided Web Modeler development pipeline to quickly develop and progress low-risk process application releases through the stages of a standard development life cycle.

- [Process application development pipeline](process-application-pipeline.md)

## Create a process application

Get started by creating a new process application.

- When you [create a process application](create-a-process-application.md), you must select a cluster to use for deployment during development.
- A process application must always have a main process. You can rename and reassign the main process at any time.
- You can add more files to the process application as required.

## Deploy and run a process application

You can deploy your process application to a Zeebe cluster, and run your process application to test and debug it, and observe how it performs in a live environment.

- [Deploy and run a process application](deploy-process-application.md)

## Process application versioning

Although you cannot version a process application itself, you can use [bulk milestone creation](milestones.md#bulk-milestone-creation) and version tags to save a single 'versioned' snapshot of all the process application files in one action, instead of having to create separate milestones for every file.

- [Process application versioning](process-application-versioning.md)

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
