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
import AmazonEventbridgeImg from "./img/connector-amazon-eventbridge.png";
import IconConnectorSdkImg from './img/icon-connector-sdk.png';
import IconConnectorTemplateImg from './img/icon-connector-template.png';
import IconConnectorCustomImg from './img/icon-connector-custom.png';
import OverviewImg from './img/connector-overview.png';

<p><img src={OverviewImg} alt="Get started" style={{border:0,padding:0,paddingLeft:20,margin:0,float: 'right', width: '40%'}}/>Camunda 8 Connectors are reusable building blocks you can use to easily connect processes to external systems, applications, and data.</p>

For example:

- Use a [Slack](/components/connectors/out-of-the-box-connectors/slack.md) or [Microsoft Teams](/components/connectors/out-of-the-box-connectors/microsoft-teams.md) Connector to notify people of pending or completed processes in a human task orchestration onboarding flow.
- In microservices orchestration, use a [Kafka](/components/connectors/out-of-the-box-connectors/kafka.md) Connector to add real-time messaging to your automated processes.

Connectors are often configured as a [BPMN process](/components/concepts/processes.md) task, with the required integration parameters already set up for easy configuration. This helps remove the need for you to write custom integration programming code.

## Get started with Connectors

Learn how to start using Connectors in your processes and about the different types of Connector available.

<div class="connector-grid">
  <a href="../connectors-start" class="connector-card" title="Get started with Connectors">
    <img src={IconPlayImg} alt="Get started"/>
    <h3>Get started with Connectors</h3>
    <p>Learn how to start using Connectors in your processes.</p>
  </a>
    <a href="../connector-types" class="connector-card" title="Connector types">
    <img src={IconConnectorTypesImg} alt="Connector types"/>
    <h3>Connector types</h3>
    <p>Different types of Connector include <a href="../use-connectors/inbound" title="Inbound Connectors">Inbound</a>, <a href="../use-connectors/outbound" title="Outbound Connectors">Outbound</a>, and Protocol.</p>
  </a>
  <a href="../use-connectors" class="connector-card" title="How to use Connectors">
    <img src={IconConnectorImg} alt="How to use Connectors"/>
    <h3>How to use Connectors</h3>
    <p>How to create a Connector Task and use secrets.</p>
  </a>
</div>

## Camunda Connectors

Ready to start using Connectors in your processes? Explore our library of prebuilt Camunda 8 Connectors.

**[Explore Connectors A-Z >](/docs/components/connectors/out-of-the-box-connectors/available-connectors-overview.md)**

<!-- #### Popular Connectors

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
      <img src={AmazonEventbridgeImg} alt="Get started"/>Amazon Eventbridge
    </div>
  </a>
</div> -->

## Custom Connectors

Build and deploy your own Connectors using Connector templates or the Connector SDK.

<div class="connector-grid">
  <a href="../custom-built-connectors/build-connector" class="connector-card" title="Custom Connectors">
    <img src={IconConnectorCustomImg} alt="Custom Connectors icon" class="connector-card-image"/>
    <h3>Custom Connectors</h3>
    <p>Learn how to build and deploy your own custom Connectors.</p>
  </a>
  <a href="../custom-built-connectors/connector-templates" class="connector-card" title="Connector templates">
    <img src={IconConnectorTemplateImg} alt="Connector templates icon" class="connector-card-image"/>
    <h3>Connector templates</h3>
    <p>Create and work with connector templates.</p>
  </a>
    <a href="../custom-built-connectors/connector-sdk" class="connector-card" title="Connector SDK">
    <img src={IconConnectorSdkImg} alt="Connector SDK icon" class="connector-card-image"/>
    <h3>Connector SDK</h3>
    <p> Use the Connector SDK to develop custom Connectors in Java.</p>
  </a>
</div>
