---
id: working-with-apis-tools
title: "APIs & tools"
sidebar_label: "APIs & tools"
description: "Learn more about the integration concepts involved in using the Camunda Zeebe client libraries, APIs, and SDKs to interact programmatically with Camunda 8."
page_rank: 90
---

import "./react-components/\_apitools-card.css";
import HeroImg from './img/hero-apis.png';
import ApiGrid from './react-components/\_apitools-card';
import { apiCards, clientCards } from './react-components/\_apitools-card-data';
import AskAi from './react-components/\_banner-ask-ai.md'

<h3 class="subheading">Camunda 8 APIs and official clients and SDKs.</h3>

<div class="double-column-container" style={{marginBottom: '50px'}}>
<div class="double-column-left"  style={{marginRight: '50px', flex: '1.35'}}>

Use Camunda 8 APIs and clients to build, automate, and monitor your applications. Use the official Camunda clients and SDKs (Java, Spring, and Node.js) to simplify API usage and speed up development.

<a class="button button--outline button--secondary button--md button--hero--topic" title="Get started with the Camunda Java Client" href="../java-client/getting-started/" style={{marginBottom: '30px', marginTop: '20px'}}>Get started with the Camunda Java Client</a>

</div>
<div class="double-column-right" style={{flex: '1'}}>

<img src={HeroImg} alt="Use Camunda 8 APIs and clients to build, automate, and monitor your applications." title="Use Camunda 8 APIs and clients to build, automate, and monitor your applications." class="img-noborder img-600 img-transparent hero-topic" style={{marginTop: '0', marginBottom: '0'}}/>

</div>
</div>

:::info Upgrade to Camunda 8.9

- Existing customer? Upgrade your APIs & tools to 8.9 using the [APIs & tools migration guide](/apis-tools/migration-manuals/migrate-to-89.md).
- See [what's new in Camunda 8.9](/reference/announcements-release-notes/890/whats-new-in-89.md), [release announcements](/reference/announcements-release-notes/890/890-announcements.md), and [release notes](/reference/announcements-release-notes/890/890-release-notes.md).

:::

## APIs

Use the following APIs for Camunda 8 integration and automation:

<ApiGrid api={apiCards} />

## API clients

Camunda provides the following official clients to simplify API usage and speed up development:

<ApiGrid api={clientCards} />

:::note community clients
In addition to the core Camunda-maintained clients, there are a number of [community-maintained component clients](/apis-tools/community-clients/index.md).
:::

## Client and API compatibility

Camunda clients and SDKs are **forward-compatible** and **backward-compatible** with the Orchestration Cluster, meaning you can upgrade the cluster and clients independently. The Orchestration Cluster REST API is backward-compatible, ensuring no breaking changes to existing endpoints across versions.

<p class="link-arrow">[Client and API compatibility guarantees](/reference/public-api.md#client-and-api-compatibility)</p>

## Testing

Use Camunda Process Test to test your process definitions and automations with a dedicated testing framework.

<p class="link-arrow">[Camunda Process Test](/apis-tools/testing/getting-started.md)</p>

## Upgrade to Camunda 8.9

If you are migrating from Camunda 7 or from v1 component REST APIs, see the migration guide for guidance.

<p class="link-arrow">[Camunda 8.9 APIs & tools migration guide](/apis-tools/migration-manuals/migrate-to-89.md)</p>

<AskAi/>
