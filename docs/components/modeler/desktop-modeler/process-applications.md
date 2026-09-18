---
id: process-applications
title: Projects
description: In Desktop Modeler, a project is a folder that contains a camunda-project.json file and a set of related files you can work on and deploy as a single bundle.
---

import GroupingImg from './img/process-applications/grouping.png'
import LinkResourcesImg from './img/process-applications/link-resources.png'
import OverlayImg from './img/process-applications/overlay.png'
import DeployImg from './img/process-applications/deploy.png'
import StartInstanceImg from './img/process-applications/start-instance.png'

Desktop Modeler recognizes the [projects](../../concepts/process-applications.md) you build and offers you advanced editor intelligence, deployment, and execution features within their context. To identify the boundaries of a project, Desktop Modeler searches for a `camunda-project.json` file in the project root.

For backward compatibility, Desktop Modeler also recognizes the legacy `.process-application` marker file, but does not create it for new projects.

A typical project contains resources such as BPMN, DMN, and Form files. These live alongside [job workers](/components/concepts/job-workers.md), implementing process logic, additional application code, and tests. How exactly your project is structured will vary depending on the implementation language, libraries, and frameworks you use.

## Example: Consumer loan application

Consider an application implementing consumer loan approval. It may contain:

- A main BPMN process (for example, `consumer-loan-application.bpmn`) to define the workflow.
- DMN decisions (for example, `interest-rate-calculation.dmn`, `credit-score-calculation.dmn`) for business rules.
- Forms (for example, `loan-application-review.form`) for user interactions.
- Various [job workers](/components/concepts/job-workers.md) that implement process behavior.
- Additional application code and tests

In a typical Java/Maven project, the structure of such an application might be as follows:

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
├── camunda-project.json
├── pom.xml
└── README.md
```

## Editor support for projects

When you open a file in Modeler, the system implicitly determines whether it belongs to a project. It does so by checking for the presence of a `camunda-project.json` file in the same folder or a parent folder. Within a project, Modeler offers improved navigation and assistance.

### Indicating context

Projects are opened and closed "implicitly": A blue item in the status bar indicates whether a diagram belongs to a project and makes all related diagrams available for navigation.

<p><img src={OverlayImg} alt="Project" /></p>

When files from more than one project are open, they are grouped visually.

<p><img src={GroupingImg} alt="Project file grouping" /></p>

### Create a project

Create a project using the Modeler UI:

1. Click **File > New Camunda Project...**.
2. Choose a folder.
3. Click **Select folder**.

An empty `camunda-project.json` file is created in the selected folder, and the folder is recognized by Modeler as the project root. Any file within the folder or its subfolders is treated as part of the project.

### Linking resources

Any file within a project can be linked as a resource. Linking a resource can be achieved in several ways:

- Using the append feature
- Using the replace feature
- Using the create feature
- Manually by setting the process, decision, or form ID in the properties panel

<p><img src={LinkResourcesImg} alt="Linking resources by using the replace feature" /></p>

### Deploy a project

Projects can be deployed using the [deploy feature](./deploy-diagram.md). When deploying a project, all files that are part of the project are deployed.

<p><img src={DeployImg} alt="Deploying a project" /></p>

### Starting a process instance

:::note
Before starting a process instance, all project files are deployed to reflect the state of the project.
:::

You can start an instance for any process in a project using the [start instance feature](./start-instance.md).

<p><img src={StartInstanceImg} alt="Starting an instance of a process" /></p>
