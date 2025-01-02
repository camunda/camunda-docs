---
id: build-connector
title: Custom Connectors
description: Manage your Connector templates in Web Modeler.
---

import ConnectorArchitectureImg from "./img/diagram-connectors.png";

Can't find the Connector you need? Build your own custom connector using connector templates or the SDK.

## About custom Connectors

## Connector templates

### Build a Connector template

### Generate a Connector template

### Manage Connector templates

## Connector SDK

### Build a connector using the SDK

## Architecture

A Connector consists of two elements - the actual Java code, and the Modeler user interface.

<img src={ConnectorArchitectureImg}/>

- The Java code defines the Connector functionality and how it connects to an external system. For example, the [Connector function](/components/connectors/custom-built-connectors/connector-sdk.md#outbound-connector-runtime-logic) for outbound Connectors.

- You use the user interface to interact with the Connector in Modeler. This is defined in a [Connector template](../manage-connector-templates.md) that controls how the BPMN element is shown in Modeler and what configuration options are available for the Connector.

For example:

:::note

- If you are only using prebuilt Connectors in Modeler, you only need to understand how to configure and use a Connector in the Modeler interface, via the Properties panel.
- Connector templates are a specific type of [element template](/components/modeler/desktop-modeler/element-templates/about-templates.md), that can also be used when creating custom Connectors using the [Connector SDK](connector-sdk.md).

:::

- [Install Connectors in Self-Managed](/self-managed/connectors-deployment/install-and-start.md)
