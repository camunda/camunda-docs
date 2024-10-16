---
id: connectors-start
title: Get started
description: "Connectors come in type and subtypes that describe their functionality."
---

import ConnectorArchitectureImg from "./img/diagram-connectors.png";

Learn more about Connectors and how to start integrating them into your processes today.

## About Connectors

When using Modeler, you can add and use any of the available [prebuilt Connectors](/components/connectors/out-of-the-box-connectors/available-connectors-overview.md), as well as Connectors provided by Camunda partners and community contributors in the the [Camunda Marketplace](/components/modeler/web-modeler/camunda-marketplace.md).

All Connectors are available for Camunda 8 SaaS and [Self-Managed](/self-managed/connectors-deployment/install-and-start.md).

### Architecture

A Connector consists of two elements - the actual Java code, and the Modeler user interface.

<img src={ConnectorArchitectureImg}/>

- The Java code defines the Connector functionality and is used to connect to an external system. For example, the [Connector function](/components/connectors/custom-built-connectors/connector-sdk.md#outbound-connector-runtime-logic) for outbound Connectors.

- The Modeler user interface is how you interact with the Connector in Modeler. This is defined in a [Connector template](manage-connector-templates.md) that controls how the BPMN element is shown in Modeler and what configuration options are available.

:::note

- If you are only using prebuilt Connectors in Modeler, you only need to understand how to configure and use a Connector in the Modeler interface, via the Properties panel.
- Connector templates are a specific type of [element template](/components/modeler/desktop-modeler/element-templates/about-templates.md), that can also be used when creating custom Connectors using the [Connector SDK](./custom-built-connectors/connector-sdk.md).

:::

### Example

## Connector types

Connectors are categorized by the direction data flows into or out of Camunda 8.

## How to use Connectors

##

- [Install Connectors in Self-Managed](/self-managed/connectors-deployment/install-and-start.md)
