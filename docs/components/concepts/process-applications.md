---
id: process-applications
title: Projects
description: A project is a type of folder that contains a set of related files you can work on and deploy as a single bundle.
keywords: ["process application", "project"]
page_rank: 90
---

import ProcessApplicationImg from './assets/process-applications/diagram-process-application-get-started.png'

Solutions built with Camunda typically consist of multiple resources that represent the end-to-end use case, such as an entry point process, called supporting processes, DMN decisions, or forms.

Bundled together, versioned together, and deployed together, these resources constitute a _project_.

<p><img src={ProcessApplicationImg} alt="Project" /></p>

For instance, a consumer loan approval project might bundle:

- A BPMN process as an entry point (for example, consumer-loan-application.bpmn) to define the workflow.
- DMN decision tables (for example, interest-rate-calculation.dmn, credit-score-calculation.dmn) for business rules.
- Forms (for example, loan-application-review.form) for user interactions.

:::tip
We recommend you use a project for all your non-trivial automation solutions.
:::

Our [Modeler](../modeler/about-modeler.md) applications support you as you develop a project by different means:

- Advanced editor support with contextual assistance
- Versioning and review features
- Deployment of project files as a unit

## Next steps

Read more about how to use projects in Desktop Modeler:

- [Projects in Desktop Modeler](/components/modeler/desktop-modeler/process-applications.md)
