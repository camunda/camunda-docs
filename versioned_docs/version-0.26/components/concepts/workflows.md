---
id: workflows
title: "Workflows"
description: "Workflows are flowchart-like blueprints that define the orchestration of tasks. Every task represents a piece of business logic."
---

Workflows are flowchart-like blueprints that define the orchestration of _tasks_. Every task represents a piece of business logic such that the ordered execution produces a meaningful result.

A _job worker_ implements the business logic required to complete a task. A job worker must be able to communicate with Camunda Cloud, but otherwise, there are no restrictions on its implementation. You can choose to write a worker as a microservice, but also as part of a classical three-tier application, as a \(lambda\) function, via command line tools, etc.

Running a workflow then requires three steps:

- Deploy a workflow to Camunda Cloud
- Implement and register job workers for tasks in the worklfows
- Create new instances of said workflow

But let us not get ahead of ourselves. The very first step is to design the process.

## BPMN 2.0

Zeebe uses [BPMN 2.0](http://www.bpmn.org/) for representing workflows. BPMN is an industry standard which is widely supported by different vendors and implementations. Using BPMN ensures that workflows can be interchanged between Zeebe and other workflow systems.

## BPMN modeler

Zeebe provides a free and open-source BPMN modeling tool to create BPMN diagrams and configure their technical properties. The modeler is a desktop application based on the [bpmn.io](https://bpmn.io) open source project.

Zeebe Modeler can be [downloaded from GitHub](https://github.com/zeebe-io/zeebe-modeler/releases).

## Sequences

The simplest kind of workflow is an ordered sequence of tasks. Whenever workflow execution reaches a task, Zeebe (the workflow engine inside Camunda Cloud) creates a job that can be requested and completed by a job worker.

![workflow-sequence](assets/order-process.png)

You can think of Zeebe's workflow orchestration as a state machine. A workflow instance reaches a task, and Zeebe creates a job that can be requested by a worker. Zeebe then waits for the worker to request a job and complete the work. Once the work is completed, the flow continues to the next step. If the worker fails to complete the work, the workflow remains at the current step, and the job could be retried until it's successfully completed.

## Data flow

As Zeebe progresses from one task to the next in a workflow, it can move custom data in the form of variables. Variables are key-value-pairs and part of the workflow instance.

![data-flow](assets/workflow-data-flow.png)

Any job worker can read the variables and modify them when completing a job so that data can be shared between different tasks in a workflow.

## Data-based conditions

Some workflows do not always execute the same tasks but need to choose different tasks based on variables and conditions:

![data-conditions](assets/workflows-data-based-conditions.png)

The diamond shape with the "X" in the middle is an element indicating that the workflow decides to take one of several paths.

## Events

Events represent things that happen. A workflow can react to events (catching event) and can emit events (throwing event). For example:

![workflow](assets/workflow-events.png)

There are different types of events such as message, timer or error.

## Parallel execution

In many cases, it is also useful to perform multiple tasks in parallel. This can be achieved with a parallel gateway:

![data-conditions](assets/workflows-parallel-gateway.png)

The diamond shape with the "+" marker means that all outgoing paths are activated. The tasks on those paths can run in parallel. The order is only fulfilled after both tasks have completed.
