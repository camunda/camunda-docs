---
id: processes
title: "Processes"
description: "Processes are flowchart-like blueprints that define the orchestration of tasks."
---

A process is a defined sequence of distinct steps or tasks representing your business logic. Examples of a process could be an e-commerce shopping experience, or onboarding a new employee.

At large, process orchestration is a technology that coordinates the various moving parts (or endpoints) of a business process, and sometimes even ties multiple processes together. Process orchestration helps you work with the people, systems, and devices you already have—while achieving goals around end-to-end process automation.

For example, with Camunda you can [orchestrate human tasks](../../guides/getting-started-orchestrate-human-tasks.md), [microservices](/guides/getting-started-example.md), and [APIs](/guides/getting-started-orchestrate-apis.md).

A **[job worker](./job-workers.md)** implements the business logic required to complete a task. You can choose to write a worker as a microservice, or also as part of a classical 3-tier application, as a \(lambda\) function, via command line tools, etc.

Running a process broadly requires three steps:

1. Deploy a process to Camunda 8.
2. Implement and register job workers for tasks in the workflows.
3. Create new instances of the process.

However, if you haven't yet, design the process:

## BPMN

Camunda uses **[Business Process Model and Notation (BPMN) 2.0](/components/modeler/bpmn/bpmn.md)** to represent processes. The visual nature of BPMN enables greater collaboration between different teams, and is employed by numerous organizations globally.

![process example](./assets/order-process.png)

:::note
New to BPMN? Visit our step-by-step introductory guide on [automating a process using BPMN](/components/modeler/bpmn/automating-a-process-using-bpmn.md)
:::

## Modeling BPMN

Camunda provides [Modeler](/components/modeler/about-modeler.md), a free and open source BPMN modeling tool to create BPMN diagrams and configure their technical properties.

Camunda offers two Modeler tools to design and implement your diagrams:

- [Web Modeler](/components/modeler/web-modeler/launch-web-modeler.md): Integrate seamlessly with Camunda 8 SaaS and Self-Managed installations alongside [Console](../console/introduction-to-console.md).
- [Desktop Modeler](/components/modeler/desktop-modeler/index.md): Design, view, and edit models using this desktop application. Install and use Desktop Modeler locally, all while integrating your local development environment.

:::note
New to modeling a process? Visit our [getting started guide](/components/modeler/web-modeler/design-your-process.md).
:::

## Process execution

The simplest kind of process is an ordered sequence of tasks. Whenever process execution reaches a task, [Zeebe](/components/zeebe/zeebe-overview.md) (the workflow engine inside Camunda 8) creates a job that can be requested and completed by a job worker.

![process-sequence](assets/order-process.png)

Process orchestration typically follows the steps below:

1. A process instance reaches a task, and Zeebe creates a job that can be requested by a worker.
2. Zeebe waits for the worker to request a job and complete the work.
3. Once the work is complete, the flow continues to the next step.
4. If the worker fails to complete the work, the process remains at the current step, and the job could be retried until it's successfully completed.

As Zeebe progresses from one task to the next in a process, it can move custom data in the form of [variables](/components/concepts/variables.md). Variables are key-value pairs and part of the process instance.

![data-flow](assets/process-data-flow.png)

Any job worker can read the variables and modify them when completing a job so data can be shared between different tasks in a process.
