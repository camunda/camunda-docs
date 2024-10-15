---
id: connectors-start
title: Get started
description: "Connectors come in type and subtypes that describe their functionality."
---

Start integrating Connectors into your processes today, and learn more about the different types of Connector.

## Connectors Overview

Connectors offer a multilayer coding experience, enabling users with a variety of technical abilities to be successful when integrating with external systems.

![Multilayer Coding Experience](img/multilayer-coding-experience.png)

A Connector consists of two parts:

1. The programming code in Java to connect to the external system (for example, refer to the [Connector function](/components/connectors/custom-built-connectors/connector-sdk.md#outbound-connector-runtime-logic) for outbound Connectors.)
2. The user interface to be used during modeling, which is provided using [Connector Templates](manage-connector-templates.md).

Users interacting with Connectors may only need to understand the configuration options exposed by the Connector Template in the properties panel.

Connectors are available [out-of-the-box (OOTB)](./out-of-the-box-connectors/available-connectors-overview.md) and come with [Connector Templates](manage-connector-templates.md) which customize how a BPMN element is shown,
and how it can be configured by process developers. Connector templates are a specific kind of [element templates](/components/modeler/desktop-modeler/element-templates/about-templates.md), which can also be used when creating custom Connectors via the [Connector SDK](./custom-built-connectors/connector-sdk.md).

Additionally, the [Camunda Marketplace](/components/modeler/web-modeler/camunda-marketplace.md) provides Connectors by Camunda partners and community contributors.

## How to use Connectors

## Connector types

##

Connectors are categorized by the direction data flows into or out of Camunda 8.

Out-of-the-box (OOTB) Connectors accelerate solution implementation by providing pre-built, ready-to-use Connectors to popular external systems. Learn more about [Connector types](/components/connectors/connector-types.md)

Each Connector has a dedicated page with relevant configuration.

All Connectors are available for Camunda 8 SaaS and [Self-Managed](/self-managed/connectors-deployment/install-and-start.md).

Beginners to Connectors may want to get familiar with Connectors using a [guide to configuring out-of-the-box Connectors](/guides/configuring-out-of-the-box-connector.md).

To learn more about using Connectors, see [configuring out-of-the-box Connectors](/guides/configuring-out-of-the-box-connector.md).

In addition to this section on Connectors, we recommend reviewing [Connector secrets](/components/console/manage-clusters/manage-secrets.md).

- [Install Connectors in Self-Managed](/self-managed/connectors-deployment/install-and-start.md)
