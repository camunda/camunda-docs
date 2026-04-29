---
id: process-applications
title: Projects
description: In Camunda Hub, a project is a type of folder that contains a set of related files you can work on and deploy as a single bundle.
---

import ProcessApplicationImg from './img/diagram-process-application-get-started.png'
import FileListImg from './img/file-list.png'

In Camunda Hub, a [project](../../../concepts/process-applications.md) is a type of folder that contains a set of related files you can work on and [deploy](deploy-process-application.md) as a single bundle.

<p><img src={ProcessApplicationImg} alt="Project" /></p>

For example, a project for a consumer loan application might consist of a BPMN diagram as an entry point and a number of additional supporting files, such as DMN diagrams and forms.

<p><img src={FileListImg} alt="Project file list" /></p>

## Project development lifecycle

In Camunda Hub, you can quickly develop and progress low-risk project releases through the stages of a typical development lifecycle.

- [Project development lifecycle](process-application-pipeline.md)

## Create a project

Get started by creating a new project.

- When you [create a project](./create-a-process-application.md), you must select a cluster to use for deployment during development.
- You can [add files](./create-a-process-application.md#add-files-to-a-process-application) to the project as required.

## Validate and deploy your project

Validate your project in development before deploying it to testing, staging, or production.

- [Validate and deploy your project](deploy-process-application.md)

## Project versioning

Use versioning to save a single snapshot of all the project files in one action.

- [Project versioning](process-application-versioning.md)

## Known limitations

You should be aware of the following limitations when working with projects.

### General limitations

- Self-Managed does not support defining cluster stages, identifying clusters by tags, or cluster promotion.

### Deployment limitations

- Projects can only be deployed to a Zeebe cluster in version 8.4.0 or higher.
- The overall size of the deployment bundle is limited due to a maximum [record](../../../zeebe/technical-concepts/internal-processing.md) size of 4 MB in Zeebe.
  - The limit is effectively between 2 and 3 MB, as Zeebe writes more data to the log stream than just the raw deployment.
  - If you exceed the limit, you are shown an [error message](deploy-process-application.md#deployment-errors):<br/>
    `Command 'CREATE' rejected with code 'EXCEEDED_BATCH_RECORD_SIZE'`.
