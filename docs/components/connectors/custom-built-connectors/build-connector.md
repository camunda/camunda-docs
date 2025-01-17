---
id: build-connector
title: Custom Connectors
description: Manage your Connector templates in Web Modeler.
---

import "../out-of-the-box-connectors/connectors-table.css";
import IconPlayImg from '../img/icon-play.png';
import IconConnectorImg from '../img/icon-connectors.png';
import IconConnectorTypesImg from '../img/icon-connector-types.png';
import ConnectorArchitectureImg from "./img/diagram-connectors.png";
import IconConnectorTemplateImg from '../img/icon-connector-template.png';
import IconConnectorGenerateImg from '../img/icon-connector-generate.png';
import IconConnectorManageImg from '../img/icon-connector-manage.png';
import Marketplace from '../react-components/\_banner-marketplace.md'

Can't find the Connector you need? Build your own custom connector using connector templates or the SDK.

## Connector templates

Connectors use [connector templates](/components/connectors/custom-built-connectors/connector-templates.md) to customize how a BPMN element is shown,
and how it can be configured by process developers. Connector templates are a specific kind of [element template](/components/modeler/desktop-modeler/element-templates/about-templates.md).

<div class="connector-grid">
  <a href="../use-connectors" class="connector-card" title="About connector templates">
      <img src={IconConnectorTemplateImg} alt="Connector templates icon"/>
    <h3>Connector templates</h3>
    <p>Create a connector task and start using connector secrets.</p>
  </a>
    <a href="../connector-types" class="connector-card" title="Connector types">
    <img src={IconConnectorGenerateImg} alt="Connector types"/>
    <h3>Generate a connector template</h3>
    <p>Learn about <a href="../use-connectors/inbound" title="Inbound Connectors">Inbound</a> and <a href="../use-connectors/outbound" title="Outbound Connectors">Outbound</a> connector types.</p>
  </a>
    <a href="../out-of-the-box-connectors/available-connectors-overview" class="connector-card" title="Get started with Connectors">
    <img src={IconConnectorManageImg} alt="How to use Connectors"/>
    <h3>Manage connector templates</h3>
    <p>configure and automatically generate a custom Connector template in Web Modeler.</p>
  </a>
</div>

## Connector SDK

Use the SDK to create your own custom Java connectors.

**[Get started with the connector SDK >](connector-sdk.md)**

## Connector architecture

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

<Marketplace/>
