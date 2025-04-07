---
id: process-applications
title: Process applications
description: In Desktop Modeler a process application is a folder that contains a .process-application file and a set of related files you can work on and deploy as a single bundle.
---

import GroupingImg from './img/process-applications/grouping.png'
import LinkResourcesImg from './img/process-applications/link-resources.png'
import OverlayImg from './img/process-applications/overlay.png'

Desktop modeler recognizes [process applications](../../concepts/process-applications.md) you build and offers you advanced editor intelligence, deployment, and execution features within the context of such an application. To identify the boundaries of a process application, Desktop Modeler searches for a `.process-application` file in the root of your project.

For instance, a consumer loan approval process application might contain:

- A main BPMN process (for example, `consumer-loan-application.bpmn`) to define the workflow.
- DMN decision tables (for example, `interest-rate-calculation.dmn`, `credit-score-calculation.dmn`) for business rules.
- Forms (for example, `loan-application-review.form`) for user interactions.

The structure of your project may vary depending on the implementation language. For example, a standard Java/Maven might be structured as follows:

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
│   │       ├── form/
│   │       │   └── loan-application-review.form
│   │       └── .process-application
│   └── test/
│       └── java/
│           └── ...
├── pom.xml
└── README.md
```

When you open a file in the modeler, the system implicitly determines whether it belongs to a process application by checking for the presence of a `.process-application` file in the same folder or a parent folder. If such a file is found, the process application is implicitly opened, indicated by the blue item in the status bar. All related files within the process application are made accessible for navigation. Similarly, when you close the file, the process application is implicitly closed.

<p><img src={OverlayImg} alt="Process application" /></p>

When files of more than one process application are opened they are grouped visually.

<p><img src={GroupingImg} alt="Process application file grouping" /></p>

## Creating a process application

To create a process application, take the following steps:

1. Click **File > New Process Application...**.
2. Choose a folder.
3. Click **Select folder**.

A `.process-application` file will be created in the selected folder. Any file within the folder or its subfolders will be treated as part of the process application.

## Linking resources

Any file within a process application can be linked as a resource. Linking a resource can be achieved in several ways:

- Using the append feature
- Using the replace feature
- Using the create feature
- Manually by setting the process, decision, or form ID in the properties panel

<p><img src={LinkResourcesImg} alt="Linking resources by using the replace feature" /></p>
