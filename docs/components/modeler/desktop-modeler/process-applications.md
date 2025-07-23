---
id: process-applications
title: Process applications
description: In Desktop Modeler a process application is a folder that contains a .process-application file and a set of related files you can work on and deploy as a single bundle.
---

import GroupingImg from './img/process-applications/grouping.png'
import LinkResourcesImg from './img/process-applications/link-resources.png'
import OverlayImg from './img/process-applications/overlay.png'
import DeployImg from './img/process-applications/deploy.png'
import StartInstanceImg from './img/process-applications/start-instance.png'

Desktop modeler recognizes [process applications](../../concepts/process-applications.md) you build and offers you advanced editor intelligence, deployment, and execution features within the context of such an application. To identify the boundaries of a process application, Desktop Modeler searches for a `.process-application` file in the root of your project.

In professional software development, a typical process application contains resources such as BPMN, DMN, and Form files. These live alongside [job workers](/components/concepts/job-workers.md), implementing process logic, additional application code, and tests. How exactly your project is structured may vary depending on the implementation language, libraries, and frameworks you use.

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
├── .process-application
├── pom.xml
└── README.md
```

## Editor support for process applications

When you open a file in Modeler, the system implicitly determines whether it belongs to a process application. It does so by checking for the presence of a `.process-application` file in the same folder or a parent folder. Within a process application, Modeler offers improved navigation and assistance.

### Indicating context

Process applications are opened and closed "implicitly": A blue item in the status bar indicates whether a diagram belongs to a process application and makes all related diagrams available for navigation.

<p><img src={OverlayImg} alt="Process application" /></p>

When files of more than one process application are opened they are grouped visually.

<p><img src={GroupingImg} alt="Process application file grouping" /></p>

### Creating a process application

Create a process application by creating a `.process-application` file in the root of your project. Alternatively, create it via Modeler UI by taking the following steps:

1. Click **File > New Process Application...**.
2. Choose a folder.
3. Click **Select folder**.

A `.process-application` file will be created in the selected folder, and the folder will now be recognized by the modeler as the applications project root. Any file within the folder or its subfolders will be treated as part of the process application.

### Linking resources

Any file within a process application can be linked as a resource. Linking a resource can be achieved in several ways:

- Using the append feature
- Using the replace feature
- Using the create feature
- Manually by setting the process, decision, or form ID in the properties panel

<p><img src={LinkResourcesImg} alt="Linking resources by using the replace feature" /></p>

### Deploying a process application

Process applications can be deployed using the [deploy feature](./connect-to-camunda-8.md). When deploying a process application, all files that are part of the process application will be deployed.

<p><img src={DeployImg} alt="Deploying a process application" /></p>

### Starting a process instance

:::note
Before starting a process instance, all process application files will be deployed to reflect the state of the process application.
:::

For any process of a process application an instance can be started using the [start instance feature](./start-instance.md).

<p><img src={StartInstanceImg} alt="Starting an instance of a main process" /></p>
