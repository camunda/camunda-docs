---
id: work-with-projects
title: Work with projects
sidebar_label: Work with projects
description: "Create a Camunda project, link resources, and deploy or start instances of all project files from Desktop Modeler."
keywords: ["process application", "camunda project", "project"]
---

import LinkResourcesImg from './img/process-applications/link-resources.png'
import DeployImg from './img/process-applications/deploy.png'
import StartInstanceImg from './img/process-applications/start-instance.png'

Create a [Camunda project](../../concepts/projects.md) in Desktop Modeler, link its resources, and deploy or start instances of all its files. To learn how Desktop Modeler recognizes projects, see [Projects in Desktop Modeler](./projects.md).

## Create a project

Create a project by creating a `camunda.json` file in the root of your project folder. An empty object (`{}`) is enough to mark the folder. Alternatively, create it in Desktop Modeler:

1. Click **File > New Project...**.
2. Choose a folder.
3. Click **Select folder**.

Desktop Modeler creates a `camunda.json` file in the selected folder and recognizes the folder as the project root.

## Link resources

Any file within a project can be linked as a resource. Link a resource in one of these ways:

- Use the append feature.
- Use the replace feature.
- Use the create feature.
- Set the process, decision, or form ID manually in the properties panel.

<p><img src={LinkResourcesImg} alt="Linking resources by using the replace feature" /></p>

## Deploy a project

Deploy a project with the [deploy feature](./deploy-diagram.md). Desktop Modeler deploys all files that are part of the project.

<p><img src={DeployImg} alt="Deploy dialog for deploying all files of a project" /></p>

## Start a process instance

Start an instance for any process in a project with the [start instance feature](./start-instance.md). Before the instance starts, Desktop Modeler deploys all project files to reflect the state of the project.

<p><img src={StartInstanceImg} alt="Starting an instance of a process" /></p>

## Related topics

- [Projects in Desktop Modeler](./projects.md)
- [Migrate from process applications](/components/concepts/projects.md#migrate-from-process-applications)
