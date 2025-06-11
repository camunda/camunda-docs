---
id: outbound-connectors-job-workers
title: Outbound connectors vs. job workers
description: Integrating with external systems can be done with a connector or a job worker.
---

Integrating with external systems can be done with a connector or a [job worker](job-workers.md).

You define the domain-specific UI for modeling a connector through a [Connector template](/components/connectors/custom-built-connectors/connector-templates.md). This connector template is, in fact, an [element template](/components/modeler/desktop-modeler/element-templates/about-templates.md). Therefore, you can also build a connector-like system using element templates and job workers.

If they both share the same core functionality, how do they differ, and when should you choose what? connectors and job workers serve different purposes when it comes to aspects like delivery, reusability, focus, and context.

## Delivery

A connector is reusable code, written as an `OutboundConnectorFunction` using the [Connector SDK](/components/connectors/custom-built-connectors/connector-sdk.md#outbound-connector-runtime-logic).
It is not a standalone application, you cannot start it and have it work on Camunda 8 jobs.
Instead, a connector is delivered as a library and can be used in combination with other connectors in a [Connector runtime environment](/components/connectors/custom-built-connectors/connector-sdk.md#runtime-environments).

In contrast, a job worker is usually part of a Zeebe client application that can be directly executed to work on jobs.

## Reusability

A job worker usually runs as or inside a standalone Zeebe client. Without effort, you cannot simply run this in Camunda 8 SaaS or any other environment.
As a Self-Managed user, you can run it standalone, but often not directly reuse the logic in your existing Zeebe client that you might already have.
You can manually extract the job handler from the given job worker, but you also have to ensure that it is still working as expected afterward.

In contrast, a connector itself is environment-agnostic. There is a runtime environment for Camunda 8 SaaS that can wrap and call this connector. As the connector developer, you don't have to worry about this as the runtime takes care of it if you developed the connector using the connector SDK.

You can also run the exact same connector (without any modification) in Camunda 8 Self-Managed; either as a standalone job worker, as additional job handler in your existing Zeebe client application, or together with other connectors in one Zeebe client application.
This all comes with the connector SDK, and there is no additional code necessary to get started. However, if you need a custom environment, the connector SDK provides a guide and default helpers to do that.

## Focus

A job worker is often a complete Zeebe client application, dealing with environment tasks like handling variables in and out. The core logic of calling a defined URL is only part of the application.
Plus, it handles Camunda 8-specific APIs like the job worker API to handle variables, complete executions, and throw errors.

A connector only consists of core business functionality. No environment tasks, no Camunda 8 job worker-related code. You can run this from Camunda 7 as well if you have a runtime that takes care of this.
The connector only needs input variables and access to secrets so they can be used in defined input attributes.

## Context

Every job worker implementation defines on its own how to handle input data, validating and transforming it.
There is no unified way of using secrets in a job worker implementation either, e.g. to replace placeholders in attributes with sensitive information only at runtime.
Plus, there is no unified modeling experience for job workers. There can be an element template for the worker, but that template might look completely different for every job worker.

In contrast, connectors bring all the above out of the box. The environment brings along secret management baked-in, being flexible in how you provide those secrets.
Element templates, called [Connector templates](/components/connectors/custom-built-connectors/connector-templates.md), are a vital part of a connector. There are standardized best practices for developing those.
Having used one connector template will make it easy for you to use the next one just the same.

## Which one should you choose?

It depends on your use case.

- Need access to a low-level API in Camunda 8 to perform a very specific task? You are better off with job workers.
- Want to write your worker logic in something other than Java? Job workers are your way to move forward.
- Want to create worker logic that is reusable in any environment? Write a connector.
- Want to focus on your worker's logic and have no need for using low-level Camunda 8 API? Write a connector.
- Want to provide a standardized modeling experience alongside your runtime behavior? Write a connector.

## Learn more

- [Explore connectors](/components/connectors/introduction.md)
- [Learn about types of connectors](/components/connectors/connector-types.md)
- [Learn about job workers](job-workers.md)
