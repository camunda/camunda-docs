---
id: process-applications
title: Process applications
description: A process application is a type of folder that contains a set of related files you can work on and deploy as a single bundle.
---

import ProcessApplicationImg from './assets/process-applications/diagram-process-application-get-started.png'

A process application is a type of folder that contains a set of related files you can work on and deploy as a single bundle. This reduces the risk of a broken deployment at runtime, and makes it easier to deploy related files.

<p><img src={ProcessApplicationImg} alt="Process application" /></p>

For instance, a consumer loan approval process application might bundle:

- A main BPMN process (e.g., consumer-loan-application.bpmn) to define the workflow.
- DMN decision tables (e.g., interest-rate-calculation.dmn, credit-score-calculation.dmn) for business rules.
- Forms (e.g., loan-application-review.form) for user interactions.

:::tip
We recommend you use a process application for all your non-trivial automation projects. These projects tend to have one main BPMN process that represents your end-to-end use case, and additional files that the main process depends on, such as called supporting processes, DMN decisions, or forms.
:::

## Next steps

Read more about how to use process applications in Web and Desktop Modeler:

- [Process applications in Web Modeler](/components/modeler/web-modeler/process-applications.md)
- [Process applications in Desktop Modeler](/components/modeler/desktop-modeler/process-applications.md)
