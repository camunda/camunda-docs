---
id: introduction-to-connectors
title: Connectors
description: "A Connector is a reusable building block that performs the integration with an external system and works out of the box."
keywords: [bridge, reusable component, low code]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import "./react-components/\_connectors-table.css";
import IconPlayImg from './img/icon-play.png';
import IconConnectorImg from './img/icon-connectors.png';
import IconConnectorTypesImg from './img/icon-connector-types.png';
import IconConnectorSdkImg from './img/icon-connector-sdk.png';
import IconConnectorTemplateImg from './img/icon-connector-template.png';
import IconConnectorCustomImg from './img/icon-connector-custom.png';
import OverviewImg from './img/connector-overview.png';
import MarketplaceImg from "./img/icon-marketplace.png";
import AmazonEventbridgeImg from "./img/connector-amazon-eventbridge.png";
import OpenaiImg from "./img/connector-openai.png";
import AwsLambdaImg from "./img/connector-aws-lambda.png";
import RestImg from "./img/connector-rest.png";
import GraphqlImg from "./img/connector-graphql.png";
import AsanaImg from "./img/connector-asana.png";
import AutomationImg from "./img/connector-automation.png";
import BedrockImg from "./img/connector-amazon-bedrock.png";
import EmailImg from "./img/connector-email.png";
import SqlImg from "./img/connector-sql.png";
import AzureaiImg from "./img/connector-azure-openai.png";
import AmazonS3Img from "./img/connector-amazon-s3.png";
import BoxImg from "./img/connector-box.png";

import Marketplace from './react-components/\_banner-marketplace.md'

<p><a title="Find a Camunda connector" href="../out-of-the-box-connectors/available-connectors-overview"><img src={OverviewImg} alt="Get started" style={{border:0,padding:0,paddingLeft:20,margin:0,float: 'right', width: '40%'}} className="fade-in-top-image"/></a>Camunda connectors are reusable building blocks you can use to easily connect processes to external systems, applications, and data.</p>

- Use a [Slack](/components/connectors/out-of-the-box-connectors/slack.md) or [Microsoft Teams](/components/connectors/out-of-the-box-connectors/microsoft-teams.md) Connector to notify people of pending or completed processes in a human task orchestration onboarding flow.
- In microservices orchestration, use a [Kafka](/components/connectors/out-of-the-box-connectors/kafka.md) connector to add real-time messaging to your automated processes.

Connectors are often configured as a [BPMN process](/components/concepts/processes.md) task, with the required integration parameters already set up for easy configuration. This helps remove the need for you to write custom integration programming code.

<a class="button button--outline button--secondary button--md button--hero get-started" title="Find a Camunda connector" href="../out-of-the-box-connectors/available-connectors-overview" style={{marginBottom: '40px'}}>Find a Camunda connector</a>

## Get started

New to connectors? Learn about connector types and how to start using connectors in your processes.

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
<p>Find technical documentation for prebuilt Camunda connectors.</p>
</a>
</div>

:::info
Get started by learning how to [integrate a Camunda 8 connector](/guides/configuring-out-of-the-box-connector.md).
:::

## Custom connectors

Build and deploy your own [custom connectors](../custom-built-connectors/build-connector) using connector templates and the connector SDK.

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

## Featured connectors

Get started with our latest and most popular connectors.

<Tabs groupId="featured" defaultValue="new" queryString values={
[
{label: 'Latest', value: 'new' },
{label: 'Popular', value: 'popular' },
]}>
<TabItem value="new">

<div class="connector-grid">
  <a href="../out-of-the-box-connectors/amazon-s3" class="connector-card" title="Amazon S3">
    <img src={AmazonS3Img} alt="Amazon S3 icon" class="connector-card-image"/>
    <h3>Amazon S3</h3>
    <p>Interact with Amazon Bedrock from your processes.</p>
  </a>
  <a href="../out-of-the-box-connectors/box" class="connector-card" title="Box connector">
    <img src={BoxImg} alt="Box connector icon" class="connector-card-image"/>
    <h3>Box</h3>
    <p>Connect your BPMN service to the Box storage API.</p>
  </a>
  <a href="../out-of-the-box-connectors/email/?email=outbound" class="connector-card" title="Email connector">
    <img src={EmailImg} alt="Email connector icon" class="connector-card-image"/>
    <h3>Email outbound</h3>
    <p>Connect your BPMN service to an email POP3, IMAP or SMTP server.</p>
  </a>
</div>

<div class="connector-small-grid">
  <a href="../out-of-the-box-connectors/email/?email=inbound" class="connector-small-link">
    <div class="connector-small">
      <img src={EmailImg} alt="Email inbound connector"/>Email inbound
    </div>
  </a>
  <a href="../out-of-the-box-connectors/amazon-bedrock" class="connector-small-link">
    <div class="connector-small">
      <img src={BedrockImg} alt="Amazon Bedrock connector"/>Amazon Bedrock
    </div>
  </a>
  <a href="../out-of-the-box-connectors/sql" class="connector-small-link">
    <div class="connector-small">
      <img src={SqlImg} alt="SQL connector"/>SQL
    </div>
  </a>

</div>

</TabItem>
<TabItem value="popular">

<div class="connector-grid">
  <a href="../out-of-the-box-connectors/openai" class="connector-card" title="OpenAI">
    <img src={OpenaiImg} alt="OpenAI icon" class="connector-card-image"/>
    <h3>OpenAI</h3>
    <p>Add ChatGPT and OpenAI's Moderation API to your business processes.</p>
  </a>
  <a href="../out-of-the-box-connectors/aws-lambda" class="connector-card" title="AWS Lambda">
    <img src={AwsLambdaImg} alt="AWS Lambda icon" class="connector-card-image"/>
    <h3>Amazon AWS Lambda</h3>
    <p>Connect processes to AWS Lambda to invoke serverless functions.</p>
  </a>
    <a href="../protocol/rest" class="connector-card" title="Connector SDK">
    <img src={RestImg} alt="Rest connector icon" class="connector-card-image"/>
    <h3>Rest connector</h3>
    <p>Connect, interact, and sync your processes with any RESTful service.</p>
  </a>
</div>

<div class="connector-small-grid">
  <a href="../protocol/graphql" class="connector-small-link">
    <div class="connector-small">
      <img src={GraphqlImg} alt="GraphQL connector"/>GraphQL
    </div>
  </a>
  <a href="../out-of-the-box-connectors/asana" class="connector-small-link">
    <div class="connector-small">
      <img src={AsanaImg} alt="Asana connector"/>Asana
    </div>
  </a>
  <a href="../out-of-the-box-connectors/automation-anywhere" class="connector-small-link">
    <div class="connector-small">
      <img src={AutomationImg} alt="Automation Anywhere connector"/>Automation Anywhere
    </div>
  </a>
</div>

</TabItem>

</Tabs>

<Marketplace/>
