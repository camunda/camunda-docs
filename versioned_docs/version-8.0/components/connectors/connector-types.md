---
id: connector-types
title: Types of Connectors
description: "Connectors come in type and subtypes that describe their functionality."
---

Connectors are categorized by the direction data flows into or out of Camunda Platform 8.

:::note
Looking for pre-built, [Out-of-the-box Connectors](/components/connectors/out-of-the-box-connectors/available-connectors-overview.md)?
:::

## Outbound Connectors

Outbound Connectors allow workflows to trigger external systems or services, making it possible to integrate workflows with other parts of a business process or system architecture.

![Outbound Connectors](img/outbound-connectors.png)

Use outbound Connectors if something needs to happen in the third-party system if a process reaches a service task. For example, calling a REST endpoint or publishing a message to Slack.

## Protocol Connectors

Protocol Connectors can serve outbound Connectors, supporting a variety of technical protocols. These connectors are highly generic, designed to provide a flexible and customizable means of integrating with external systems and services.

Protocol Connectors can be customized to meet the needs of specific use cases using configurable [Connector Templates](manage-connector-templates.md), with no additional coding or deployment required. Examples of protocol Connectors include HTTP REST, GraphQL, as well as message queue connectors.

## Next steps

Review the current list of [available Connectors](/components/connectors/out-of-the-box-connectors/available-connectors-overview.md).
