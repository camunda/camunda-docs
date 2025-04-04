---
id: process-applications
title: Process applications in Desktop Modeler
description: In Desktop Modeler, a process application is a folder that contains a .process-application file and a set of related files you can work on and deploy as a single bundle.
---

import GroupingImg from './process-applications/img/grouping.png'
import OverlayImg from './process-applications/img/overlay.png'

In Desktop Modeler, a [process application](../../concepts/process-applications.md) is a folder that contains a `.process-application` file and a set of Camunda 8 assets that you work on and deploy as a single bundle. Typically, a process application also contains additional assets like job worker implementations.

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

## Features

- [Creating a process application](./process-applications/create-process-application.md)
- [Linking resources in a process application](./process-applications/link-resources.md)
