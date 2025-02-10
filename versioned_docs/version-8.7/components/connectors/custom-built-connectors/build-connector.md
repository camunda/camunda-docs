---
id: build-connector
title: Custom connectors
description: Manage your connector templates in Web Modeler.
---

import "../react-components/\_connectors-table.css";
import IconPlayImg from '../img/icon-play.png';
import IconConnectorImg from '../img/icon-connectors.png';
import IconConnectorTypesImg from '../img/icon-connector-types.png';
import ConnectorArchitectureImg from "./img/diagram-connectors.png";
import IconConnectorTemplateImg from '../img/icon-connector-template.png';
import IconConnectorGenerateImg from '../img/icon-connector-generate.png';
import IconConnectorManageImg from '../img/icon-connector-manage.png';
import Marketplace from '../react-components/\_banner-marketplace.md'

Can't find the connector you need? Build your own custom connector using connector templates or the SDK.

## Connector templates

Connectors use [connector templates](/components/connectors/custom-built-connectors/connector-templates.md) to customize how a BPMN element is shown,
and how it can be configured by process developers. Connector templates are a specific kind of [element template](/components/modeler/desktop-modeler/element-templates/about-templates.md).

<div class="connector-grid">
  <a href="../connector-templates" class="connector-card" title="Connector templates">
      <img src={IconConnectorTemplateImg} alt="Connector templates icon"/>
    <h3>Connector templates</h3>
    <p>Create a connector task and start using connector secrets.</p>
  </a>
    <a href="../connector-template-generator" class="connector-card" title="Generate a connector template">
    <img src={IconConnectorGenerateImg} alt="Generate a connector template"/>
    <h3>Generate a connector template</h3>
    <p>Automatically generate a custom connector template in Web Modeler.</p>
  </a>
    <a href="../../manage-connector-templates/" class="connector-card" title="Manage connector templates">
    <img src={IconConnectorManageImg} alt="Manage connector templates"/>
    <h3>Manage connector templates</h3>
    <p>Create and manage connector templates in a Web Modeler project.</p>
  </a>
</div>

## Connector SDK

[Create your own custom Java connectors](connector-sdk.md) using the connector SDK.

## Connector architecture

A connector consists of the actual Java code, and the Modeler user interface.

<img src={ConnectorArchitectureImg}/>

1. The Java code defines the connector functionality and how it connects to an external system. For example, the [Connector function](/components/connectors/custom-built-connectors/connector-sdk.md#outbound-connector-runtime-logic) for outbound connectors.

1. The user interface allows you to interact with the connector in Modeler. This is defined in a [Connector template](../manage-connector-templates.md) that controls how the BPMN element is shown in Modeler and what configuration options are available for the connector.

:::note

- If you are only using prebuilt Connectors in Modeler, you only need to understand how to configure and use a Connector in the Modeler interface via the properties panel on the right side of the screen.
- Connector templates are a specific type of [element template](/components/modeler/desktop-modeler/element-templates/about-templates.md), that can also be used when creating custom connectors using the [Connector SDK](connector-sdk.md).

:::

<Marketplace/>
