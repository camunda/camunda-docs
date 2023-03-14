---
id: introduction-to-connectors
title: Introduction
description: "A Connector is a reusable building block that performs the integration with an external system and works out of the box."
---

A **Connector** is a reusable building block that performs the integration with an external system and works out of the box.

<!-- taken from https://docs.google.com/presentation/d/1F_xr6LSmut84up_OkyEwgGh9JSkQuhyqmTihM0TlavE/edit#slide=id.g15a5b1f60a9_0_3408 -->

![connectors concept](img/connector-concept.png)

It is represented as a task in a [BPMN process](../concepts/processes.md), which can be configured with parameters specific for the external system. As such, it can remove the need to write custom programming code for integration.

A Connector consists of two parts:

1. The programming code in Java to connect to the external system (for example, see the [Connector function](./custom-built-connectors/connector-sdk.md#runtime-logic) for outbound Connectors.)
2. The user interface to be used during modeling, which is provided using [Connector templates](./custom-built-connectors/connector-templates.md).

Connectors are operated as part of the Connector runtime, which is provided for SaaS and Self-Managed environments.

## Camunda Platform 8 SaaS

When using Camunda Platform 8 SaaS, the Connector runtime is operated by Camunda and offered in the scope of the product. In this environment, you can use the [out-of-the-box Connectors](./out-of-the-box-connectors/available-connectors-overview.md) provided by Camunda.

## Camunda Platform 8 Self-Managed

In a [Self-Managed](/self-managed/about-self-managed.md) environment, you manage the execution environment for Connectors yourself.
Using our [Connector runtime environments](./custom-built-connectors/connector-sdk.md#runtime-environments), you can consume any set of Connectors,
including the [out-of-the-box Connectors](./out-of-the-box-connectors/available-connectors-overview.md) and custom Connectors developed using the **[Connector SDK](./custom-built-connectors/connector-sdk.md)** and [Connector templates](./custom-built-connectors/connector-templates.md).

You can find a list of Connectors developed by Camunda, Partners, and the community in our
[Camunda Connectors Awesome List](https://github.com/camunda-community-hub/camunda-8-connectors#readme).

The [Self-Managed installation guide](/self-managed/connectors-deployment/install-and-start.md) details how to install the [pre-packaged Connector runtime environment](./custom-built-connectors/connector-sdk.md#pre-packaged-runtime-environment).
The guide also describes how to integrate the [out-of-the-box Connectors](./out-of-the-box-connectors/available-connectors-overview.md) provided by Camunda, including their Connector templates for modeling.

:::note
Some out-of-the-box Connectors are licensed under the [Camunda Platform Self-Managed Free Edition license](https://camunda.com/legal/terms/cloud-terms-and-conditions/camunda-cloud-self-managed-free-edition-terms/).
:::

## Connector types

### Out-of-the-box vs. custom-built Connectors

There are [out-of-the-box Connectors](./out-of-the-box-connectors/available-connectors-overview.md) provided by Camunda, which are available with SaaS and Self-Managed.

You can also develop custom Connectors using the [Connector SDK](./custom-built-connectors/connector-sdk.md).

### Outbound Connector vs. job worker

Integrating with external systems can be done with a Connector or a [job worker](../concepts/job-workers.md).

You define the domain-specific UI for modeling a Connector through a [Connector template](./custom-built-connectors/connector-templates.md). This Connector template is, in fact, an [element template](../modeler/desktop-modeler/element-templates/about-templates.md). Therefore, you can also build a Connector-like system using element templates and job workers.

If they both share the same core functionality, how do they differ, and when should you choose what? Connectors and job workers serve different purposes when it comes to aspects like delivery, reusability, focus, and context.

### Delivery

A Connector is reusable code, written as an `OutboundConnectorFunction` using the [Connector SDK](./custom-built-connectors/connector-sdk.md#runtime-logic).
It is not a standalone application, you cannot start it and have it work on Camunda Platform 8 jobs.
Instead, a Connector is delivered as a library and can be used in combination with other Connectors in a [Connector runtime environment](./custom-built-connectors/connector-sdk.md#runtime-environments).

In contrast, a job worker is usually part of a Zeebe Client application that can be directly executed to work on jobs.

#### Reusability

A job worker usually runs as or inside a standalone Zeebe Client. Without effort, you cannot simply run this in Camunda Platform 8 SaaS or any other environment.
As a Self-Managed user, you can run it standalone, but often not directly reuse the logic in your existing Zeebe Client that you might already have.
You can manually extract the job handler from the given job worker, but you also have to ensure that it is still working as expected afterward.

In contrast, a Connector itself is environment-agnostic. There is a runtime environment for Camunda Platform 8 SaaS that can wrap and call this Connector. As the Connector developer, you don't have to worry about this as the runtime takes care of it if you developed the Connector using the Connector SDK.

You can also run the exact same Connector (without any modification) in Camunda Platform 8 Self-Managed; either as a standalone job worker, as additional job handler in your existing Zeebe Client application, or together with other Connectors in one Zeebe Client application.
This all comes with the Connector SDK, and there is no additional code necessary to get started. However, if you need a custom environment, the Connector SDK provides a guide and default helpers to do that.

### Focus

A job worker is often a complete Zeebe Client application, dealing with environment tasks like handling variables in and out. The core logic of calling a defined URL is only part of the application.
Plus, it handles Camunda Platform 8-specific APIs like the job worker API to handle variables, complete executions, and throw errors.

A Connector only consists of core business functionality. No environment tasks, no Camunda Platform 8 job worker-related code. You can run this from Camunda Platform 7 as well, if you have a runtime that takes care of this.
The Connector only needs input variables and access to secrets so they can be used in defined input attributes.

### Context

Every job worker implementation defines on its own how to handle input data, validating and transforming it.
There is no unified way of using secrets in a job worker implementation either, e.g. to replace placeholders in attributes with sensitive information only at runtime.
Plus, there is no unified modeling experience for job workers. There can be an element template for the worker, but that template might look completely different for every job worker.

In contrast, Connectors bring all the above out of the box. The environment brings along secret management baked-in, being flexible in how you provide those secrets.
Element templates, called Connector templates, are a vital part of a Connector. There are standardized best practices for developing those.
Having used one Connector template will make it easy for you to use the next one just the same.

### Which one should you choose?

It depends on your use case.

- You need access to low-level API in Camunda Platform 8 to perform a very specific task? You are better off with job workers.
- You want to write your worker logic in something else than Java? Job workers are your way to move forward.
- You want to create worker logic that is easily reusable in any environment? Write a Connector.
- You want to focus on your worker's logic and have no need for using low-level Camunda Platform 8 API? Write a Connector.
- You want to provide a standardized modeling experience alongside your runtime behavior? Write a Connector.

### Next steps

- [Use Connectors in your BPMN process](./use-connectors.md)
- [Learn about available out-of-the-box Connectors](./out-of-the-box-connectors/available-connectors-overview.md)
- [Develop a custom Connector template](./custom-built-connectors/connector-templates.md)
- [Develop a custom Connector runtime](./custom-built-connectors/connector-sdk.md)
