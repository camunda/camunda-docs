---
id: introduction-to-connectors
title: Introduction
---

A **Connector** is a reusable building block that performs the integration with an external system and works out of the box.
It is represented as a concrete task in a [BPMN process](../concepts/processes.md), which can be configured with domain specific parameters without implementing custom business logic.

A Connector consists of two parts:

1. The business logic is implemented by a [Connector function](./custom-built-connectors/connector-sdk.md#runtime-logic).
2. The user interface during modeling is provided using a [Connector template](./custom-built-connectors/connector-templates.md).

Connectors can run in any environment and are not bound to Camunda Platform 8. However, out of the box support is currently only provided for Camunda Platform 8 SaaS and Self-Managed.

### Camunda Platform 8 SaaS

When using Camunda Platform 8 SaaS, the runtime is operated by Camunda and offered in the scope of the product. In this environment, you can use the [out-of-the-box Connectors](./out-of-the-box-connectors/available-connectors-overview.md) provided by Camunda. These Connectors allow you to solve everyday use cases in process automation without the need to implement a single line of code.

### Camunda Platform 8 Self-Managed

In a [Self-Managed](/self-managed/about-self-managed.md) environment, you manage the execution environment for Connectors yourself.
Using our [Connector runtime environments](./custom-built-connectors/connector-sdk.md#runtime-environments), you can consume any set of Connectors,
including the [out-of-the-box Connectors](./out-of-the-box-connectors/available-connectors-overview.md) and custom Connectors developed with
the **Integration Framework**.

The Integration Framework consists of the Camunda [Connector SDK](./custom-built-connectors/connector-sdk.md) and [Connector templates](./custom-built-connectors/connector-templates.md).
You can build custom Connectors using the framework as detailed in the Connector SDK guide. You can find a list of Connectors developed by Camunda, Partners, and the community in our
[Camunda Connectors Awesome List](https://github.com/camunda-community-hub/camunda-8-connectors#readme).

The [Self-Managed installation guide](/self-managed/connectors-deployment/install-and-start.md) details how to install the [pre-packaged Connector runtime environment](./custom-built-connectors/connector-sdk.md#pre-packaged-runtime-environment).
The guide also describes how to integrate the [out-of-the-box Connectors](./out-of-the-box-connectors/available-connectors-overview.md) provided by Camunda, including their Connector templates for modeling.
Note that some out-of-the-box Connectors are licensed under the [Camunda Platform Self-Managed Free Edition license](https://camunda.com/legal/terms/cloud-terms-and-conditions/camunda-cloud-self-managed-free-edition-terms/).

### Connector vs. Job Worker

Integrating with external systems can be done with a Connector and [Job worker](../concepts/job-workers.md) alike.
If they both share the same core functionality, how do they differ and when should you choose what?

In essence, Connectors and Job workers are completely different on a conceptual level.
They serve different purposes when it comes to aspects like delivery, reusability, focus, and context.

#### Delivery

A Connector is reusable code, written as an `OutboundConnectorFunction` using the [Connector SDK](./custom-built-connectors/connector-sdk.md#runtime-logic).
It is not a standalone application, you cannot start it and have it work on Camunda Platform 8 jobs.
Instead, a Connector is delivered as a library and can be used in combination with other Connectors in a [Connector runtime environment](./custom-built-connectors/connector-sdk.md#runtime-environments).

In contrast, a job worker usually is part of a Zeebe Client application that can be directly executed to work on jobs.

#### Reusability

A job worker usually runs as or inside a standalone Zeebe Client. Without effort, you cannot simply run this in Camunda Platform 8 SaaS or any other environment.
As a Self-Managed user, you can run it standalone, but often not directly reuse the logic in your existing Zeebe Client that you might already have.
You can manually extract the job handler from the given job worker, but you also have to ensure that it is still working as expected afterward.

In contrast, a Connector itself is environment-agnostic. There is a runtime environment for Camunda Platform 8 SaaS that can wrap and call this Connector.
As the Connector developer, you don't have to care about any of that as the runtime takes care of it if you developed the Connector using the Connector SDK.
You can also run the exact same Connector (without ANY modification) in Camunda 8 Self-Managed; either as a standalone job worker, as additional job handler in your existing Zeebe Client application, or together with other Connectors in one Zeebe Client application.
This all comes with the Connector SDK, there is no additional code necessary to get started.
However, if you need a custom environment, the Connector SDK provides a guide and default helpers to do that.

#### Focus

A job worker often is a complete Zeebe Client application, dealing with environment tasks like handling variables in and out. The core logic of calling a defined URL is only part of the application.
Plus, it handles Camunda 8-specific APIs like the job worker API to handle variables, complete executions, and throw errors.

A Connector only consists of core business functionality. No environment tasks, no Camunda 8 job worker-related code. You can run this from Camunda Platform 7 as well, if you have a runtime that takes care of this.
The Connector is not opnionated, it only needs input variables and access to secrets so they can be used in defined input attributes.

#### Context

Every job worker implementation defines on its own how to handle input data, validating and transforming it.
There is no unified way of using secrets in a job worker implementation either, e.g. to replace placeholders in attibutes with sensitive information only at runtime.
Plus, there is no unified modeling experience for job workers. There can be an element template for the worker, but that template might look completely different for every job worker.

In contrast, Connectors bring all of the above out of the box. The environment brings along secret management baked-in, being flexible in how you provide those secrets.
Element templates, called Connector Templates, are a vital part of a Connector. There are standardized best practices for developing those.
Having used one Connector Template will make it easy for you to use the next one just the same.

#### Which one should you choose?

It depends on your use case.

- You need access to low-level API in Camunda 8 to perform a very specific task? - You are better off with job workers.
- You want to write your worker logic in something else than Java? - Job workers are your way to move forward.
- You want to create worker logic that is easily reusable in any environment? - Write a Connector.
- You want to focus on your worker's logic and have no need for using low-level Camunda 8 API? - Write a Connector.
- You want to provide a standardized modeling experience alongside your runtime behavior? - Write a Connector.

### Next steps to get started with Connectors

- [Use Connectors in your BPMN process](./use-connectors.md)
- [Learn about available out-of-the-box Connectors](./out-of-the-box-connectors/available-connectors-overview.md)
- [Develop a custom Connector template](./custom-built-connectors/connector-templates.md)
- [Develop a custom Connector runtime](./custom-built-connectors/connector-sdk.md)
