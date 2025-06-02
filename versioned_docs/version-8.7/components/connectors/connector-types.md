---
id: connector-types
title: Connector types
description: "Connectors come in type and subtypes that describe their functionality."
---

Connectors are categorized by the direction data flows into or out of Camunda 8.

## Outbound connectors

Outbound connectors allow workflows to trigger external systems or services, making it possible to integrate workflows with other parts of a business process or system architecture.

The Java code to connect to the external system is executed when the workflow reaches the service task.

![Outbound connectors](img/outbound-connectors.png)

Use outbound connectors if something needs to happen in the third-party system if a process reaches a service task. For example, calling a REST endpoint or publishing a message to Slack.

## Inbound connectors

Inbound connectors enable workflows to receive data or messages from external systems or services, making it possible to integrate workflows into a wider business process or system architecture.
Inbound connectors can be used to create a new process instance, or to send a message to a running process instance.

The Java code of the inbound connector has a lifecycle suitable for long-running operations, such as listening for messages on a queue or waiting for a webhook to be called.
The connector code is **activated** as soon as the connector Runtime detects an element in a process definition that references an inbound connector. It gets `deactivated` in case of an updated or deleted process definition.

Inbound connector instances are linked to process definitions and not to specific process instances. If a process definition contains an element referencing an inbound connector, the connector code will be first executed when the process definition is deployed and the deployment has been detected by the connector Runtime.
The connector object created during deployment will be kept active as long as the process is deployed, and it is reused to serve all instances of the process.
When the process definition is deleted or replaced with a newer version, the connector object will be removed or updated as well.

:::note
Inbound connectors currently rely on [Operate](../../operate/operate-introduction) API to retrieve the information about deployed process definitions.

If your Camunda 8 installation doesn't include Operate, you can only use outbound connectors.
:::

![Inbound connectors](img/inbound-connectors.png)

Use inbound connectors if something needs to happen within the workflow engine because of an external event in the third-party system. For example, because a Slack message was published, or a REST endpoint is called.

There are three types of inbound connectors:

1. **Webhook connector**: An inbound connector which creates a webhook for a Camunda workflow.
2. **Subscription connector**: An inbound connector that subscribes to a message queue.
3. **Polling connector**: An inbound connector that periodically polls an external system or service for new data using HTTP polling.

## Protocol connectors

Protocol connectors can serve as either inbound or outbound connectors, supporting a variety of technical protocols. These connectors are highly generic, designed to provide a flexible and customizable means of integrating with external systems and services.

Protocol connectors can be customized to meet the needs of specific use cases using configurable [Connector Templates](manage-connector-templates.md), with no additional coding or deployment required. Examples of protocol connectors include HTTP REST, GraphQL, as well as message queue connectors.

## Next steps

Review the current list of [available connectors](/components/connectors/out-of-the-box-connectors/available-connectors-overview.md).
