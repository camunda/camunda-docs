---
id: introduction-to-connectors
title: Introduction
description: "A Connector is a reusable building block that performs the integration with an external system and works out of the box."
---

<!-- TODO: Shorten intro. Include types, connector templates, and Connector SDK. Order like new image on page. -->

A **Connector** is a reusable building block that performs the integration with an external system and works out of the box.

It is represented as a task in a [BPMN process](/components/concepts/processes.md), which can be configured with parameters specific for the external system. As such, it can remove the need to write custom programming code for integration.

A Connector consists of two parts:

1. The programming code in Java to connect to the external system (for example, see the [Connector function](./custom-built-connectors/connector-sdk.md#runtime-logic) for outbound Connectors.)
2. The user interface to be used during modeling, which is provided using [Connector templates](./custom-built-connectors/connector-templates.md).

Connectors are operated as part of the Connector runtime, which is provided for SaaS and Self-Managed environments.

When using Camunda Platform 8 SaaS, the Connector runtime is operated by Camunda and offered in the scope of the product. In this environment, you can use the [out-of-the-box Connectors](./out-of-the-box-connectors/available-connectors-overview.md) provided by Camunda.

To learn more about working with Connectors in Self-Managed environments, visit the [Connectors Installation page](/self-managed/connectors-deployment/install-and-start.md).

## Connector types

Connectors offer an intuitive, scalable, and customizable multilayer coding experience for every user.

![Multilayer Coding Experience](img/multilayer-coding-experience.png)

### Outbound Connectors

Outbound Connectors allow workflows to trigger with external systems or services, making it possible to integrate workflows with other parts of a business process or system architecture.

Use outbound Connectors if something needs to happen in the third-party system if a process reaches a service task. For example, calling a REST endpoint or publishing a message to Slack.

### Inbound Connectors

Inbound Connectors enable workflows to receive data or messages from external systems or services, making it possible to integrate workflows into a wider business process or system architecture.

Use inbound Connectors if something needs to happen within the workflow engine because of an external event in the third-party system. For example, because a Slack message was published, or a REST endpoint is called.

There are three types of inbound Connectors:

1. **Webhook Connector**: An inbound connector which creates a webhook for a Camunda workflow.
2. **Subscription Connector**: An inbound Connector that subscribes to a message queue.
3. **Polling Connector**: An inbound Connector that periodically polls an external system or service for new data using HTTP polling.

Currently, only webhooks are supported.

### Protocol Connectors

Protocol Connectors can serve as either inbound or outbound connectors, supporting a variety of technical protocols. These connectors are highly generic, designed to provide a flexible and customizable means of integrating with external systems and services.

Protocol connectors can be customized to meet the needs of specific use cases using [element templates](/components/modeler/desktop-modeler/element-templates/about-templates.md), with no additional coding or deployment required. Examples of protocol connectors include HTTP REST, SOAP, GraphQL, as well as message queue connectors.

## Next steps

- [Use Connectors in your BPMN process](./use-connectors.md)
- [Learn about available out-of-the-box Connectors](./out-of-the-box-connectors/available-connectors-overview.md)
- [Develop a custom Connector template](./custom-built-connectors/connector-templates.md)
- [Develop a custom Connector runtime](./custom-built-connectors/connector-sdk.md)
