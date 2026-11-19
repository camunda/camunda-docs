---
id: projects
title: Projects in Desktop Modeler
sidebar_label: Projects
description: Desktop Modeler supports Camunda projects with editor intelligence, deployment, and execution features in the context of your project.
keywords: ["process application", "camunda project", "project"]
---

import GroupingImg from './img/process-applications/grouping.png'
import OverlayImg from './img/process-applications/overlay.png'

Desktop Modeler supports [Camunda projects](../../concepts/projects.md). It recognizes a project by the [`camunda.json`](/apis-tools/c8ctl/camunda-json.md) file in the root of your project folder.

Within a project, Desktop Modeler offers editor intelligence, deployment, and execution features. To work with projects, see [Work with projects](./work-with-projects.md).

:::tip
Camunda projects supersede process applications. Your existing process applications keep working; see [Migrate from process applications](/components/concepts/projects.md#migrate-from-process-applications) when you are ready to switch.
:::

In professional software development, a typical project contains resources such as BPMN, DMN, and Form files. These live alongside [job workers](/components/concepts/job-workers.md), implementing process logic, additional application code, and tests. How exactly your project is structured may vary depending on the implementation language, libraries, and frameworks you use.

## Example: consumer loan application

Consider a project implementing consumer loan approval. It may contain:

- A main BPMN process (for example, `consumer-loan-application.bpmn`) to define the workflow.
- DMN decisions (for example, `interest-rate-calculation.dmn`, `credit-score-calculation.dmn`) for business rules.
- Forms (for example, `loan-application-review.form`) for user interactions.
- Various [job workers](/components/concepts/job-workers.md) that implement process behavior.
- Additional application code and tests.

In a typical Java/Maven project, the structure of such a project might be as follows:

```
consumer-loan-application/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/loan/
│   │   │   │   └── workers
│   │   │   │   │   ├── UnderwriteLoanWorker.java
│   │   │   │   │   └── ...
│   │   └── resources/
│   │       ├── consumer-loan-application.bpmn
│   │       ├── dmn/
│   │       │   ├── interest-rate-calculation.dmn
│   │       │   └── credit-score-calculation.dmn
│   │       └── form/
│   │           └── loan-application-review.form
│   └── test/
│       └── java/
│           └── ...
├── camunda.json
├── pom.xml
└── README.md
```

## How Desktop Modeler recognizes a project

When you open a file, Desktop Modeler checks for a `camunda.json` file in the same folder or a parent folder to determine whether the file belongs to a project. Any file within the project folder or its subfolders is part of the project. Within a project, Desktop Modeler offers improved navigation and assistance.

## How Desktop Modeler indicates project context

Desktop Modeler opens and closes projects implicitly. A blue item in the status bar indicates whether a diagram belongs to a project and makes all related diagrams available for navigation.

<p><img src={OverlayImg} alt="Status bar item showing that the open diagram belongs to a project" /></p>

When files from more than one project are open, Desktop Modeler groups them visually.

<p><img src={GroupingImg} alt="Open files grouped visually by project" /></p>

## Related topics

- [Work with projects](./work-with-projects.md)
- [Camunda projects](../../concepts/projects.md)
