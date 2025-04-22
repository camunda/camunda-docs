---
id: process-applications
title: Process applications
description: A process application is a type of folder that contains a set of related files you can work on and deploy as a single bundle.
---

import ProcessApplicationImg from './assets/process-applications/diagram-process-application-get-started.png'

Solutions built with Camunda typically have a main BPMN process that represents the end-to-end use case, and additional resources the main process depends on, such as called supporting processes, DMN decisions, or forms.

Bundled together, versioned together, and deployed together, these resources constitute a _process application_.

<p><img src={ProcessApplicationImg} alt="Process application" /></p>

For instance, a consumer loan approval process application might bundle:

- A main BPMN process (for example, consumer-loan-application.bpmn) to define the workflow.
- DMN decision tables (for example, interest-rate-calculation.dmn, credit-score-calculation.dmn) for business rules.
- Forms (for example, loan-application-review.form) for user interactions.

:::tip
We recommend you use a process application for all your non-trivial automation projects.
:::

Our [Modeler](../modeler/about-modeler.md) applications support you as you develop a process application by different means:

- Advanced editor support with contextual assistance
- Versioning and review features
- Deployment of process application files as a unit

## Next steps

Read more about how to use process applications in Web and Desktop Modeler:

- [Process applications in Web Modeler](/components/modeler/web-modeler/process-applications.md)
- [Process applications in Desktop Modeler](/components/modeler/desktop-modeler/process-applications.md)
