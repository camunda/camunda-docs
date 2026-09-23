---
id: projects
title: Projects
description: A project contains a collection of process resources, such as an entry point process, supporting processes, DMN decisions, or forms, that often represent an end-to-end use case.
keywords: ["process application", "project"]
page_rank: 90
---

import ProjectDiagram from './assets/projects/diagram-project.png'
import ExampleProjectImg from './img/consumer-loan-approval-project-example.png'

A project contains a collection of process resources, such as an entry point process, supporting processes, DMN decisions, or forms, that often represent an end-to-end use case.

<img src={ProjectDiagram} alt="Project" />

## Example

A consumer loan approval project might bundle:

- A BPMN process as an entry point to define the workflow: `consumer-loan-application.bpmn`
- DMN decision tables for business rules: `interest-rate-calculation.dmn` and `credit-score-calculation.dmn`
- A form for user interactions: `loan-application-review.form`

<img src={ExampleProjectImg} alt="Example consumer loan approval project" />

## Using projects

You can use projects in both Camunda Hub and Desktop Modeler. However, there are some differences.

## Projects in Camunda Hub

In Camunda Hub, workspaces contain projects, and projects contain files. Every file must be stored within a project:

```
Camunda Hub
└─ Workspace
    ├─ Project A
    │   ├─ BPMN
    │   └─ DMN
    └─ Project B
        ├─ BPMN
        ├─ Folder
        └─ Form
```

You can treat files in a project as a single bundle or as independent resources. For example, you can:

- [Take a snapshot](../hub/workspace/manage-projects/project-versioning.md) of the current state of all project files.
- Manage individual [file versions](../hub/workspace/modeler/modeling/versions.md).
- [Deploy an entire project](../hub/workspace/manage-projects/deploy-project.md).
- [Deploy individual project resources](../hub/workspace/modeler/run-or-publish-your-process.md#deploy-a-process).

## Projects in Desktop Modeler

In Desktop Modeler, storing process resource files in a project is optional:

```
Desktop Modeler
├─ BPMN
├─ DMN
└─ Project B
    ├─ camunda-project.json
    ├─ BPMN
    ├─ Folder
    └─ Form
```

A project is recognized by the existence of a `camunda-project.json` file. If you're using both [Camunda Hub and Desktop Modeler](/components/modeler/using-hub-and-desktop-modeler-together.md), your project must contain this manifest file, even though it's ignored by Camunda Hub.

Unlike in Camunda Hub, all project resources are always deployed together in Desktop Modeler.

## Next steps

Read more about how to use projects in Desktop Modeler:

- [Projects in Camunda Hub](/components/hub/workspace/manage-projects/manage-projects.md)
- [Projects in Desktop Modeler](/components/modeler/desktop-modeler/process-applications.md)
