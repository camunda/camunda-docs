---
id: introduction-to-connectors
title: Introduction
description: "A Connector is a reusable building block that performs the integration with an external system and works out of the box."
keywords: [bridge, reusable component, low code]
---

A **Connector** is a reusable building block that performs the integration with an external system.

Most processes require interaction with systems outside of Camunda to orchestrate and complete work.

- In **human task orchestration**, actors are notified of pending or completed processes through communication tools such as [Slack](/components/connectors/out-of-the-box-connectors/outbound/slack.md) or [Microsoft Teams](/components/connectors/out-of-the-box-connectors/outbound/microsoft-teams.md) for example in onboarding flow.
- In **business processes**, records are created or updated in enterprise business systems.
- In **microservices orchestration**, processes communicate through events pushed to a common systems through infrastructure such as [Kafka](/components/connectors/out-of-the-box-connectors/outbound/kafka.md).

Connectors are often represented as tasks in a [BPMN process](/components/concepts/processes.md), which can be configured with parameters specific for the external system. As such, it can remove the need to write custom programming code for integration.

Connectors offer an intuitive, scalable, and customizable multilayer coding experience for every user.

![Multilayer Coding Experience](img/multilayer-coding-experience.png)

A Connector consists of two parts:

1. The programming code in Java to connect to the external system (for example, see the [Connector function](./connector-sdk.md#runtime-logic) for outbound Connectors.)
2. The user interface to be used during modeling, which is provided using [Connector templates](./connector-templates.md).

Users interacting with Connectors may only need to understand the configuration options exposed by the Connector template in the properties panel.

Connectors are available in three categories - [out-of-the-box](./out-of-the-box-connectors/available-connectors-overview.md) , [template-only](./connector-templates.md), and custom via the [Connector SDK](./connector-sdk.md).

## Runtime

Connectors are operated as part of the Connector runtime, which is provided for SaaS and Self-Managed environments.

When using Camunda Platform 8 SaaS, the Connector runtime is operated by Camunda and offered in the scope of the product. In this environment, you can use the [out-of-the-box Connectors](./out-of-the-box-connectors/available-connectors-overview.md) provided by Camunda.

Looking to create your own [runtime logic](./connector-sdk.md#runtime-logic) or [runtime environments](./connector-sdk.md#runtime-environments)? Check out the [Connector SDK](./connector-sdk.md).

## Next steps

- [Learn about types of Connectors](./connector-types.md)
- [Use Connectors in your BPMN process](./use-connectors.md)
- [Learn about available out-of-the-box Connectors](./out-of-the-box-connectors/available-connectors-overview.md)
- [Develop a custom Connector template](./connector-templates.md)
- [Develop a custom Connector runtime](./connector-sdk.md)
- [Install Connectors in Self-Managed](/self-managed/connectors-deployment/install-and-start.md)
