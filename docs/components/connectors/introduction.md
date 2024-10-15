---
id: introduction-to-connectors
title: Connectors
description: "A Connector is a reusable building block that performs the integration with an external system and works out of the box."
keywords: [bridge, reusable component, low code]
---

import "./out-of-the-box-connectors/connectors-table.css";
import IconPlayImg from './img/icon-play.png';
import IconConnectorImg from './img/icon-connectors.png';

Camunda 8 Connectors allow you to easily connect your processes to external systems, applications, and data.

## What are connectors?

A **Connector** is a reusable building block used to integrate with an external system.

- In human task orchestration, you might use the [Slack](/components/connectors/out-of-the-box-connectors/slack.md) or [Microsoft Teams](/components/connectors/out-of-the-box-connectors/microsoft-teams.md) Connectors to notify people of pending or completed processes, such as in an onboarding flow.
- In business processes, records are created or updated in enterprise business systems.
- In microservices orchestration, processes communicate through events pushed to a common systems through infrastructure using the [Kafka](/components/connectors/out-of-the-box-connectors/kafka.md) Connector.

Connectors are often configured as a [BPMN process](/components/concepts/processes.md) **task** with the parameters required for integrating to the external system already set up. This helps remove the need for you to write custom integration programming code.

## Get started with Connectors

Learn more about how to use Connectors in your processes and about the different types of Connector available.

<div class="connector-grid">
  <a href="path/to/connector1" class="connector-card">
    <img src={IconPlayImg} alt="Connector 1" class="connector-card-image"/>
    <h3>Get started</h3>
    <p>Description for Connector 1.</p>
  </a>
  <a href="path/to/connector2" class="connector-card">
    <img src={IconConnectorImg} alt="Connector 2" class="connector-card-image"/>
    <h3>How to use Connectors</h3>
    <p>Description for Connector 2.</p>
  </a>
  <a href="path/to/connector3" class="connector-card">
    <img src={IconConnectorImg} alt="Connector 3" class="connector-card-image"/>
    <h3>Connector types</h3>
    <p>Description for Connector 3.</p>
  </a>
</div>

## Connectors A-Z

text

## Custom Connectors

Connectors offer a multilayer coding experience, enabling users with a variety of technical abilities to be successful when integrating with external systems.

![Multilayer Coding Experience](img/multilayer-coding-experience.png)

A Connector consists of two parts:

1. The programming code in Java to connect to the external system (for example, refer to the [Connector function](/components/connectors/custom-built-connectors/connector-sdk.md#outbound-connector-runtime-logic) for outbound Connectors.)
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
