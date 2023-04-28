---
id: connector-types
title: Types of Connectors
description: "Connectors come in type and subtypes that describe their functionality."
---

Connectors are categorized by the direction data flows into or out of Camunda Platform 8.

:::note
Looking for prebuilt, [Out-of-the-box Connectors](/components/connectors/out-of-the-box-connectors/available-connectors-overview.md)?
:::

## Outbound Connectors

Outbound Connectors allow workflows to trigger external systems or services, making it possible to integrate workflows with other parts of a business process or system architecture.

![Outbound Connectors](img/outbound-connectors.png)

Use outbound Connectors if something needs to happen in the third-party system if a process reaches a service task. For example, calling a REST endpoint or publishing a message to Slack.

## Inbound Connectors

Inbound Connectors enable workflows to receive data or messages from external systems or services, making it possible to integrate workflows into a wider business process or system architecture.

![Inbound Connectors](img/inbound-connectors.png)

Use inbound Connectors if something needs to happen within the workflow engine because of an external event in the third-party system. For example, because a Slack message was published, or a REST endpoint is called.

There are three types of inbound Connectors:

1. **Webhook Connector**: An inbound connector which creates a webhook for a Camunda workflow.
2. **Subscription Connector**: An inbound Connector that subscribes to a message queue.
3. **Polling Connector**: An inbound Connector that periodically polls an external system or service for new data using HTTP polling.

Currently, only webhooks are supported.

## Protocol Connectors

Protocol Connectors can serve as either inbound or outbound Connectors, supporting a variety of technical protocols. These connectors are highly generic, designed to provide a flexible and customizable means of integrating with external systems and services.

Protocol Connectors can be customized to meet the needs of specific use cases using [element templates](/components/modeler/desktop-modeler/element-templates/about-templates.md), with no additional coding or deployment required. Examples of protocol Connectors include HTTP REST, SOAP, GraphQL, as well as message queue connectors.

## Next steps

Review the current list of [available Connectors](/components/connectors/out-of-the-box-connectors/available-connectors-overview.md).
