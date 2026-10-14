---
id: projects
title: Projects
description: Desktop Modeler supports Camunda projects with editor intelligence, deployment, and execution features in the context of your project.
keywords: ["process application", "camunda project", "project"]
---

import GroupingImg from './img/process-applications/grouping.png'
import LinkResourcesImg from './img/process-applications/link-resources.png'
import OverlayImg from './img/process-applications/overlay.png'
import DeployImg from './img/process-applications/deploy.png'
import StartInstanceImg from './img/process-applications/start-instance.png'

Desktop Modeler supports [Camunda projects](../../concepts/projects.md): it recognizes the projects you build and offers you advanced editor intelligence, deployment, and execution features within the context of a project. To identify the boundaries of a project, Desktop Modeler searches for a [`camunda.json`](/apis-tools/c8ctl/camunda-json.md) file in the root of your project folder.

:::tip
Camunda projects supersede process applications. Your existing process applications keep working; see [Migrate from process applications](/components/concepts/projects.md#migrate-from-process-applications) when you are ready to switch.
:::

In professional software development, a typical project contains resources such as BPMN, DMN, and Form files. These live alongside [job workers](/components/concepts/job-workers.md), implementing process logic, additional application code, and tests. How exactly your project is structured may vary depending on the implementation language, libraries, and frameworks you use.

## Example: Consumer loan application

Consider a project implementing consumer loan approval. It may contain:

- A main BPMN process (for example, `consumer-loan-application.bpmn`) to define the workflow.
- DMN decisions (for example, `interest-rate-calculation.dmn`, `credit-score-calculation.dmn`) for business rules.
- Forms (for example, `loan-application-review.form`) for user interactions.
- Various [job workers](/components/concepts/job-workers.md) that implement process behavior.
- Additional application code and tests

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

## Editor support for projects

When you open a file in Modeler, the system implicitly determines whether it belongs to a project. It does so by checking for the presence of a `camunda.json` file in the same folder or a parent folder. Within a project, Modeler offers improved navigation and assistance.

### Indicating context

Projects are opened and closed "implicitly": A blue item in the status bar indicates whether a diagram belongs to a project and makes all related diagrams available for navigation.

<p><img src={OverlayImg} alt="Project" /></p>

When files from more than one project are open, they are grouped visually.

<p><img src={GroupingImg} alt="Project file grouping" /></p>

### Creating a project

Create a project by creating a `camunda.json` file in the root of your project folder. An empty object (`{}`) is enough to mark the folder. Alternatively, create it via Modeler UI by taking the following steps:

1. Click **File > New Project...**.
2. Choose a folder.
3. Click **Select folder**.

A `camunda.json` file will be created in the selected folder, and the folder will now be recognized by Modeler as the project root. Any file within the folder or its subfolders will be treated as part of the project.

### Linking resources

Any file within a project can be linked as a resource. Linking a resource can be achieved in several ways:

- Using the append feature
- Using the replace feature
- Using the create feature
- Manually by setting the process, decision, or form ID in the properties panel

<p><img src={LinkResourcesImg} alt="Linking resources by using the replace feature" /></p>

### Deploying a project

Projects can be deployed using the [deploy feature](./deploy-diagram.md). When deploying a project, all files that are part of the project will be deployed.

<p><img src={DeployImg} alt="Deploying a project" /></p>

### Starting a process instance

:::note
Before starting a process instance, all project files will be deployed to reflect the state of the project.
:::

You can start an instance for any process in a project using the [start instance feature](./start-instance.md).

<p><img src={StartInstanceImg} alt="Starting an instance of a process" /></p>
