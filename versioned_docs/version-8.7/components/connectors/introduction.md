---
id: introduction-to-connectors
title: Connectors
description: "A Connector is a reusable building block that performs the integration with an external system and works out of the box."
keywords: [bridge, reusable component, low code]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import "./react-components/\_connectors-table.css";
import OverviewImg from './img/connector-overview.png';

import Marketplace from './react-components/\_banner-marketplace.md'
import ConnectorsGrid from './react-components/\_connectors-card';
import ConnectorsGridSml from './react-components/\_connectors-card-sml';
import { gettingStartedCards, customConnectorCards, latestConnectorCards, latestConnectorCardsSml, popularConnectorCards, popularConnectorCardsSml } from './react-components/\_connectors-card-data';

<p><a title="Find a Camunda connector" href="../out-of-the-box-connectors/available-connectors-overview"><img src={OverviewImg} alt="Get started" style={{border:0,padding:0,paddingLeft:20,margin:0,float: 'right', width: '40%'}} className="fade-in-top-image"/></a>Camunda connectors are reusable building blocks you can use to easily connect processes to external systems, applications, and data.</p>

- Use a [Slack](/components/connectors/out-of-the-box-connectors/slack.md) or [Microsoft Teams](/components/connectors/out-of-the-box-connectors/microsoft-teams.md) Connector to notify people of pending or completed processes in a human task orchestration onboarding flow.
- In microservices orchestration, use a [Kafka](/components/connectors/out-of-the-box-connectors/kafka.md) connector to add real-time messaging to your automated processes.

Connectors are often configured as a [BPMN process](/components/concepts/processes.md) task, with the required integration parameters already set up for easy configuration. This helps remove the need for you to write custom integration programming code.

<a class="button button--outline button--secondary button--md button--hero get-started" title="Find a Camunda connector" href="../out-of-the-box-connectors/available-connectors-overview" style={{marginBottom: '40px'}}>Find a Camunda connector</a>

## Get started

New to connectors? Learn about connector types and how to start using connectors in your processes.

<ConnectorsGrid connectors={gettingStartedCards} />

:::info
Get started by learning how to [integrate a Camunda 8 connector](/guides/configuring-out-of-the-box-connector.md).
:::

## Custom connectors

Build and deploy your own [custom connectors](../custom-built-connectors/build-connector) using connector templates and the connector SDK.

<ConnectorsGrid connectors={customConnectorCards} />

## Featured connectors

Get started with our latest and most popular connectors.

<Tabs groupId="featured" defaultValue="new" queryString values={
[
{label: 'Latest', value: 'new' },
{label: 'Popular', value: 'popular' },
]}>
<TabItem value="new">

<ConnectorsGrid connectors={latestConnectorCards} />

<ConnectorsGridSml connectors={latestConnectorCardsSml} />

</TabItem>
<TabItem value="popular">

<ConnectorsGrid connectors={popularConnectorCards} />

<ConnectorsGridSml connectors={popularConnectorCardsSml} />

</TabItem>

</Tabs>

<Marketplace/>
