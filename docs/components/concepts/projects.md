---
id: projects
title: Projects
description: A project is the unit you build, test, and deploy together to form a Camunda solution. It's an entity in a Camunda Hub workspace, and a folder with a camunda.json file in local development.
keywords: ["process application", "project", "camunda project"]
page_rank: 90
---

import ProjectDiagram from './assets/projects/diagram-project.png'
import ExampleProjectImg from './img/consumer-loan-approval-project-example.png'

A project, also called a Camunda project, is the unit you build, test, and deploy together to form a Camunda solution. It contains a collection of process resources, such as an entry point process, supporting processes, DMN decisions, or forms, that often represent an end-to-end use case.

A project is the same concept in Camunda Hub and in local development. In Camunda Hub, it's an [entity within a workspace](#projects-in-camunda-hub). In local development, it's a [folder with a `camunda.json` file](#projects-in-local-development). With [Git sync](../hub/workspace/manage-projects/git-sync.md), you can keep both representations of the project in sync.

<img src={ProjectDiagram} alt="Project" />

## Example

A consumer loan approval project might bundle:

- A BPMN process as an entry point to define the workflow: `consumer-loan-application.bpmn`
- DMN decision tables for business rules: `interest-rate-calculation.dmn` and `credit-score-calculation.dmn`
- A form for user interactions: `loan-application-review.form`

<img src={ExampleProjectImg} alt="Example consumer loan approval project" />

## Projects in Camunda Hub

In Camunda Hub, a [project](../hub/workspace/manage-projects/manage-projects.md) is an entity within a [workspace](./workspaces.md): workspaces contain projects, and projects contain files.

You can treat files in a project as a single bundle or as independent resources. For example, you can:

- [Take a snapshot](../hub/workspace/manage-projects/project-versioning.md) of the current state of all project files.
- Manage individual [file versions](../hub/workspace/modeler/modeling/versions.md).
- [Deploy an entire project](../hub/workspace/manage-projects/deploy-project.md) to an [environment](./environments.md) assigned to its workspace.
- [Deploy individual project resources](../hub/workspace/modeler/run-or-publish-your-process.md#deploy-a-process).

When you turn on [git sync](../hub/workspace/manage-projects/git-sync.md) or download a project, Hub writes the project link into `camunda.json`, so your local folder knows where it lives in Hub. Hub never overwrites a link that points to a different project.

## Projects in local development

In local development with [Desktop Modeler](/components/modeler/desktop-modeler/projects.md) and [`c8ctl`](/apis-tools/c8ctl/getting-started.md), a project is a folder with a [`camunda.json`](/apis-tools/c8ctl/camunda-json.md) file (an empty `{}` is enough).

A project works without Camunda Hub. When you deploy a directory inside a project with [`c8 deploy`](/apis-tools/c8ctl/development-workflows.md#deploy-a-directory), `c8ctl` deploys the whole project. Connect the project to Hub later via git sync. Unlike in Camunda Hub, Desktop Modeler always deploys all project resources together.

### Migrate from process applications

Camunda projects supersede process applications, but Desktop Modeler and `c8ctl` continue to support the `.process-application` marker file. To migrate, rename `.process-application` in your project root to `camunda.json`. If a folder contains both files, `camunda.json` takes precedence. For `c8 watch`, the `--project` flag replaces `--process-application` and `--pa`, which remain as deprecated aliases.

## Next steps

Read more about how to use projects:

- [Workspaces](./workspaces.md)
- [Environments](./environments.md)
- [Using Camunda Hub and Desktop Modeler together](/components/modeler/using-hub-and-desktop-modeler-together.md#camunda-projects)
- [Projects in Camunda Hub](/components/hub/workspace/manage-projects/manage-projects.md)
- [Projects in Desktop Modeler](/components/modeler/desktop-modeler/projects.md)
- [`camunda.json` project descriptor reference](/apis-tools/c8ctl/camunda-json.md)
