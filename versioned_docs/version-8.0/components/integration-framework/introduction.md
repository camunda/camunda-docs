---
id: introduction-to-connectors
title: Introduction
---

<span class="badge badge--cloud">Camunda Platform 8 only</span>

Camunda offers an **integration framework** which allows you to integrate external systems with your processes.

You can choose from two basic patterns to perform this integration: [job workers](#job-workers), and [connectors](#connectors).

### Job workers

A [**job worker**](../concepts/job-workers.md) is a service capable of performing a particular task in a process.

You can implement a **job worker**, which performs the integration with an external system. For example, the **job worker** code could implement sending a message to an external system. When started, the **job worker** would [request jobs of a certain type by polling](../concepts/job-workers.md#long-polling) a specified Camunda Platform 8 instance. The processes on this Camunda Platform 8 instance would create jobs by specifying the respective job type in BPMN tasks (for example, in a [service task via task definition](../../modeler/bpmn/service-tasks#task-definition)).

The integration with external systems using **job workers** requires you to:

1. Implement and run the respective **job worker**.
2. Specify the respective job types in the BPMN process.

#### Next steps to get started with job workers

- [Learn about job workers](../concepts/job-workers.md)
- [Implement a job worker which subscribes to a certain task](../../best-practices/development/connecting-the-workflow-engine-with-your-world#subscribing-to-tasks-using-a-job-worker)

### Connectors

A **connector** is a reusable building block that performs the integration with an external system and works out of the box. It is represented as a concrete task in a [BPMN process](../concepts/processes.md), which can be configured with domain specific parameters without implementing custom business logic.

The concept of a **connector** consists of two parts:

1. The business logic is implemented following the [job worker](/components/concepts/job-workers.md) pattern.
2. The user interface during modeling is provided using a [connector template](./connectors/custom-built-connectors/connector-templates.md).

You can use **connectors** from two different perspectives:

#### Out-of-the-box connectors

You can [out-of-the-box connectors](./connectors/use-connectors.md) provided by Camunda. When using Camunda Platform 8 SaaS, the runtime is operated by Camunda and offered in the scope of the product. The **out-of-the-box connectors** are a solution which allow you to solve [everyday use cases](./connectors/out-of-the-box-connectors/available-connectors-overview.md) in process automation without the need to implement a single line of code.

#### Custom-built connectors

You can use the Camunda [**connector SDK**](./connectors/custom-built-connectors/connector-sdk.md) in combination with [**connector templates**](./connectors/custom-built-connectors/connector-templates.md) to develop custom **connectors**. These custom **connectors** can then be used by process developers in your Self-Managed environment in the same way they would use [**out-of-the-box connectors**](./connectors/use-connectors.md).

#### Next steps to get started with connectors

- [Use connectors in your BPMN process](./connectors/use-connectors.md)
- [Learn about available out-of-the-box connectors](./connectors/out-of-the-box-connectors/available-connectors-overview.md)
- [Develop a custom connector template](./connectors/custom-built-connectors/connector-templates.md)
- [Develop a custom connector runtime](./connectors/custom-built-connectors/connector-sdk.md)
