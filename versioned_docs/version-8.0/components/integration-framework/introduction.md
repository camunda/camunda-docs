---
id: introduction-to-connectors
title: Introduction
---

<span class="badge badge--cloud">Camunda Platform 8 only</span>

Camunda offers an **integration framework** which allows you to integrate external systems with your processes.

You can choose from two basic patterns to perform this integration: [job workers](#job-workers), and [Connectors](#connectors).

## Job workers

A [job worker](../concepts/job-workers.md) is a service capable of performing a particular task in a process.

You can implement a job worker, which performs the integration with an external system. For example, the job worker code could implement sending a message to an external system. When started, the job worker would [request jobs of a certain type by polling](../concepts/job-workers.md#long-polling) a specified Camunda Platform 8 instance. The processes on this Camunda Platform 8 instance would create jobs by specifying the respective job type in BPMN tasks (for example, in a [service task via task definition](../../modeler/bpmn/service-tasks#task-definition)).

The integration with external systems using job workers requires you to:

1. Implement and run the respective job worker.
2. Specify the respective job types in the BPMN process.

### Next steps to get started with job workers

- [Learn about job workers](../concepts/job-workers.md)
- [Implement a job worker which subscribes to a certain task](../../best-practices/development/connecting-the-workflow-engine-with-your-world#subscribing-to-tasks-using-a-job-worker)

## Connectors

A **Connector** is a reusable building block that performs the integration with an external system and works out of the box. It is represented as a concrete task in a [BPMN process](../concepts/processes.md), which can be configured with domain specific parameters without implementing custom business logic.

The concept of a Connector consists of two parts:

1. The business logic is implemented by a [Connector function](./connectors/custom-built-connectors/connector-sdk.md#runtime-logic).
2. The user interface during modeling is provided using a [Connector template](./connectors/custom-built-connectors/connector-templates.md).

You can use different sets of Connectors, depending on the environment you are using:

### Camunda Platform 8 SaaS

When using Camunda Platform 8 SaaS, the runtime is operated by Camunda and offered in the scope of the product. In this environment, you can use the [out-of-the-box Connectors](./connectors/out-of-the-box-connectors/available-connectors-overview.md) provided by Camunda. These Connectors allow you to solve everyday use cases in process automation without the need to implement a single line of code.

### Camunda Platform 8 Self-Managed

In a [Self-Managed](/self-managed/about-self-managed.md) environment, you provide the execution environment for Connectors yourself.
The Camunda [Connector SDK](./connectors/custom-built-connectors/connector-sdk.md) comes with [runtime environments](./connectors/custom-built-connectors/connector-sdk.md#runtime-environments) that allow you to do this.

You can consume the [pre-packaged runtime environment](./connectors/custom-built-connectors/connector-sdk.md#pre-packaged-runtime-environment) to execute any set of Connectors.
The [installation guide](/self-managed/connectors-deployment/install-and-start.md) details how to install this runtime.
It also describes how to integrate the [out-of-the-box Connectors](./connectors/out-of-the-box-connectors/available-connectors-overview.md) provided by Camunda, including their Connector templates for modeling.
Note that some of the out-of-the-box Connectors are licensed under the [Camunda Platform Self-Managed Free Edition license](https://camunda.com/legal/terms/cloud-terms-and-conditions/camunda-cloud-self-managed-free-edition-terms/).

### Next steps to get started with Connectors

- [Use Connectors in your BPMN process](./connectors/use-connectors.md)
- [Learn about available out-of-the-box Connectors](./connectors/out-of-the-box-connectors/available-connectors-overview.md)
- [Develop a custom Connector template](./connectors/custom-built-connectors/connector-templates.md)
- [Develop a custom Connector runtime](./connectors/custom-built-connectors/connector-sdk.md)
