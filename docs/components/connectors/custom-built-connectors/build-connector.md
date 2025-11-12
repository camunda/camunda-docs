---
id: build-connector
title: Build a custom connector
description: Build your own custom connector using connector templates or the SDK.
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

Camunda supports two main ways to build custom connectors:

- Connector templates to create custom connectors based on existing built-in connectors, such as REST or gRPC.
- Connector SDK to create your own Java-based connectors from scratch.

Choose the approach that best fits your requirements and technical expertise. This guide provides an overview of both methods to help you get started.

## Connector architecture

A connector consists of the Java backend, and the element template that describes the Modeler user interface.

<img src={ConnectorArchitectureImg} alt="Diagram showing the architecture of a connector" />

- The Java code defines the connector functionality and how it connects to an external system. For example, the [Connector function](/components/connectors/custom-built-connectors/connector-sdk.md#outbound-connector-runtime-logic) for outbound connectors.

- The user interface allows you to interact with the connector in Modeler. This is defined in a [Connector template](../manage-connector-templates.md) that controls how the BPMN element is shown in Modeler and what configuration options are available for the connector.

This separation enables a layered approach to building connectors. You can customize the user interface and configuration options in Modeler using connector templates, without changing the underlying Java code of the connector.

## Choose your approach

Decide which of the following scenarios best describes your use case.

### Scenario 1. Protocol-based API call

You need to call an API that uses a common protocol like REST, SOAP, or GraphQL. There is no existing connector on the Marketplace that meets your needs.

Camunda recommends using a custom connector template based on the [REST connector](/components/connectors/protocol/rest.md),
[SOAP connector](/components/connectors/protocol/soap.md), or [GraphQL connector](/components/connectors/protocol/graphql.md).
This approach allows you to leverage the existing functionality while customizing it to fit your API requirements.

Follow this guide: [create a custom REST connector](create-connector-from-rest.md).

### Scenario 2. Complex integration logic

You need to implement integration logic that goes beyond issuing an API call.

Build a custom connector using the [Connector SDK](connector-sdk.md). This approach gives you full control over the connector's behavior.

## Connector templates

Connectors use [connector templates](/components/connectors/custom-built-connectors/connector-templates.md) to customize how a BPMN element is shown,
and how it can be configured by process developers. Connector templates are a specific type of [element template](/components/modeler/element-templates/about-templates.md).

<div class="connector-grid">
  <a href="../connector-templates" class="connector-card" title="Connector templates">
      <img src={IconConnectorTemplateImg} alt="Connector templates icon"/>
    <h3>Connector templates</h3>
    <p>Create a connector task and start using connector secrets.</p>
  </a>
    <a href="../../../modeler/web-modeler/element-templates/element-template-generator" class="connector-card" title="Generate a connector template">
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

<Marketplace/>
