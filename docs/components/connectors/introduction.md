---
id: introduction-to-connectors
title: Connectors
description: "A Connector is a reusable building block that performs the integration with an external system and works out of the box."
keywords: [bridge, reusable component, low code]
---

import "./out-of-the-box-connectors/connectors-table.css";
import IconPlayImg from './img/icon-play.png';
import IconConnectorImg from './img/icon-connectors.png';
import IconConnectorTypesImg from './img/icon-connector-types.png';
import IconConnectorSdkImg from './img/icon-connector-sdk.png';
import IconConnectorTemplateImg from './img/icon-connector-template.png';
import IconConnectorCustomImg from './img/icon-connector-custom.png';
import OverviewImg from './img/connector-overview.png';
import AmazonEventbridgeImg from "./img/connector-amazon-eventbridge.png";
import OpenaiImg from "./img/connector-openai.png";
import MarketplaceImg from "./img/icon-marketplace.png";

<p><img src={OverviewImg} alt="Get started" style={{border:0,padding:0,paddingLeft:20,margin:0,float: 'right', width: '40%'}}/>Camunda connectors are reusable building blocks you can use to easily connect processes to external systems, applications, and data.</p>

For example:

- Use a [Slack](/components/connectors/out-of-the-box-connectors/slack.md) or [Microsoft Teams](/components/connectors/out-of-the-box-connectors/microsoft-teams.md) Connector to notify people of pending or completed processes in a human task orchestration onboarding flow.
- In microservices orchestration, use a [Kafka](/components/connectors/out-of-the-box-connectors/kafka.md) connector to add real-time messaging to your automated processes.

Connectors are often configured as a [BPMN process](/components/concepts/processes.md) task, with the required integration parameters already set up for easy configuration. This helps remove the need for you to write custom integration programming code.

## Get started with connectors

Learn how to start using connectors in your processes and about the different types of connector.

<div class="connector-grid">
  <a href="../use-connectors" class="connector-card" title="How to use Connectors">
      <img src={IconPlayImg} alt="Get started"/>
    <h3>How to use Connectors</h3>
    <p>Create a connector task and start using connector secrets.</p>
  </a>
    <a href="../connector-types" class="connector-card" title="Connector types">
    <img src={IconConnectorTypesImg} alt="Connector types"/>
    <h3>Connector types</h3>
    <p>Learn about <a href="../use-connectors/inbound" title="Inbound Connectors">Inbound</a> and <a href="../use-connectors/outbound" title="Outbound Connectors">Outbound</a> connector types.</p>
  </a>
    <a href="../out-of-the-box-connectors/available-connectors-overview" class="connector-card" title="Get started with Connectors">
    <img src={IconConnectorImg} alt="How to use Connectors"/>
    <h3>Camunda connectors</h3>
    <p>Explore our library of prebuilt Camunda connectors.</p>
  </a>
</div>

## Custom connectors

Build and deploy your own connectors using connector templates or the connector SDK.

<div class="connector-grid">
  <a href="../custom-built-connectors/build-connector" class="connector-card" title="Custom Connectors">
    <img src={IconConnectorCustomImg} alt="Custom Connectors icon" class="connector-card-image"/>
    <h3>Custom connectors</h3>
    <p>Learn how to build and deploy your own custom connectors.</p>
  </a>
  <a href="../custom-built-connectors/connector-templates" class="connector-card" title="Connector templates">
    <img src={IconConnectorTemplateImg} alt="Connector templates icon" class="connector-card-image"/>
    <h3>Connector templates</h3>
    <p>Create, generate, and manage connector templates.</p>
  </a>
    <a href="../custom-built-connectors/connector-sdk" class="connector-card" title="Connector SDK">
    <img src={IconConnectorSdkImg} alt="Connector SDK icon" class="connector-card-image"/>
    <h3>Connector SDK</h3>
    <p>Use the SDK to create your own custom Java connectors.</p>
  </a>
</div>

## Popular Connectors

<div class="connector-grid">
  <a href="../custom-built-connectors/build-connector" class="connector-card" title="OpenAI connector">
    <img src={OpenaiImg} alt="OpenAI icon" class="connector-card-image"/>
    <h3>OpenAI</h3>
    <p>Add ChatGPT and OpenAI's Moderation API to your business processes.</p>
  </a>
  <a href="../custom-built-connectors/connector-templates" class="connector-card" title="Connector templates">
    <img src={IconConnectorTemplateImg} alt="Connector templates icon" class="connector-card-image"/>
    <h3>Connector templates</h3>
    <p>Create and work with connector templates.</p>
  </a>
    <a href="../custom-built-connectors/connector-sdk" class="connector-card" title="Connector SDK">
    <img src={IconConnectorSdkImg} alt="Connector SDK icon" class="connector-card-image"/>
    <h3>Connector SDK</h3>
    <p>Use the SDK to create your own custom Java connectors.</p>
  </a>
</div>

<div class="connector-small-grid">
  <a href="path/to/connector1" class="connector-small-link">
    <div class="connector-small">
      <img src={AmazonEventbridgeImg} alt="Get started"/>Amazon Eventbridge
    </div>
  </a>
  <a href="path/to/connector2" class="connector-small-link">
    <div class="connector-small">
      <img src={AmazonEventbridgeImg} alt="Get started"/>Amazon Eventbridge
    </div>
  </a>
  <a href="path/to/connector3" class="connector-small-link">
    <div class="connector-small">
      <img src={AmazonEventbridgeImg} alt="Get started"/>Amazon Eventbridge
    </div>
  </a>
  <a href="path/to/connector4" class="connector-small-link">
    <div class="connector-small">
      <img src={AmazonEventbridgeImg} alt="Get started"/>Amazon 
    </div>
  </a>
    <a href="path/to/connector4" class="connector-small-link">
    <div class="connector-small">
      <img src={AmazonEventbridgeImg} alt="Get started"/>Amazon 
    </div>
  </a>
    <a href="path/to/connector4" class="connector-small-link">
    <div class="connector-small">
      <img src={AmazonEventbridgeImg} alt="Get started"/>Amazon 
    </div>
  </a>
</div>

<div class="banner-column-container" style={{background: '#000'}} >
<div class="banner-column-left">

<a title="Explore Camunda Marketplace" href="https://marketplace.camunda.com/"><img src={MarketplaceImg} alt="Get started" /></a>

</div>
<div class="banner-column-right">

Visit the Camunda Marketplace to explore connectors built by the Camunda Engineering team, our global network of partners, and our active developer community.

<a class="button button--outline button--secondary button--md button--hero get-started" title="Explore Camunda Marketplace" href="https://marketplace.camunda.com/">Explore Camunda Marketplace</a>

</div>
</div>
