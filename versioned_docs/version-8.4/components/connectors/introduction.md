---
id: introduction-to-connectors
title: Introduction
description: "A Connector is a reusable building block that performs the integration with an external system and works out of the box."
keywords: [bridge, reusable component, low code]
---

A **Connector** is a reusable building block that performs the integration with an external system.

Most processes require interaction with systems outside of Camunda to orchestrate and complete work.

- In **human task orchestration**, actors are notified of pending or completed processes through communication tools such as [Slack](/components/connectors/out-of-the-box-connectors/slack.md) or [Microsoft Teams](/components/connectors/out-of-the-box-connectors/microsoft-teams.md) for example in onboarding flow.
- In **business processes**, records are created or updated in enterprise business systems.
- In **microservices orchestration**, processes communicate through events pushed to a common systems through infrastructure such as [Kafka](/components/connectors/out-of-the-box-connectors/kafka.md).

Connectors are often represented as tasks in a [BPMN process](/components/concepts/processes.md), which can be configured with parameters specific for the external system. As such, it can remove the need to write custom programming code for integration.

Connectors offer a multilayer coding experience, enabling users with a variety of technical abilities to be successful when integrating with external systems.

![Multilayer Coding Experience](img/multilayer-coding-experience.png)

A Connector consists of two parts:

1. The programming code in Java to connect to the external system (for example, refer to the [Connector function](./custom-built-connectors/connector-sdk.md#outbound-connector-runtime-logic) for outbound Connectors.)
2. The user interface to be used during modeling, which is provided using [Connector Templates](manage-connector-templates.md).

Users interacting with Connectors may only need to understand the configuration options exposed by the Connector Template in the properties panel.

Connectors are available [out-of-the-box (OOTB)](./out-of-the-box-connectors/available-connectors-overview.md) and come with [Connector Templates](manage-connector-templates.md) which customize how a BPMN element is shown,
and how it can be configured by process developers. Connector templates are a specific kind of [element templates](/components/modeler/desktop-modeler/element-templates/about-templates.md), which can also be used when creating custom Connectors via the [Connector SDK](./custom-built-connectors/connector-sdk.md).

Additionally, the [Camunda Marketplace](/components/modeler/web-modeler/camunda-marketplace.md) provides Connectors by Camunda partners and community contributors.

## Next steps

- [Learn about types of Connectors](./connector-types.md)
- [Use Connectors in your BPMN process](./use-connectors/index.md)
- [Learn about available out-of-the-box Connectors](./out-of-the-box-connectors/available-connectors-overview.md)
- [Configure Connector Templates](manage-connector-templates.md)
- [Visit the Camunda Marketplace](/components/modeler/web-modeler/camunda-marketplace.md)
- [Install Connectors in Self-Managed](/self-managed/connectors-deployment/install-and-start.md)
