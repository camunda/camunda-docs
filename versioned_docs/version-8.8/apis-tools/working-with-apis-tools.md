---
id: working-with-apis-tools
title: "APIs & tools"
sidebar_label: "APIs & tools"
description: "Learn more about the integration concepts involved in using the Camunda Zeebe client libraries, APIs, and SDKs to interact programmatically with Camunda 8."
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

:::info Upgrading to Camunda 8.8

- Existing customers can upgrade APIs & tools to 8.8 using the [APIs & tools migration guide](/apis-tools/migration-manuals/index.md).
- See [what's new in Camunda 8.8](/reference/announcements-release-notes/880/whats-new-in-88.md), [release announcements](/reference/announcements-release-notes/880/880-announcements.md), and [release notes](/reference/announcements-release-notes/880/880-release-notes.md).

:::

## APIs and reference

Use the following APIs for Camunda 8 integration and automation:

<ApiGrid api={apiCards} />

## API clients

Camunda provides the following official clients to simplify API usage and speed up development:

<ApiGrid api={clientCards} />

## Camunda Process Test

Use Camunda Process Test to test your process definitions and automations with a dedicated testing framework.

<p><a href="../testing/getting-started/" class="link-arrow">Camunda Process Test</a></p>

## Upgrade to Camunda 8.8

If you are migrating from Camunda 7 or from v1 component REST APIs, see the [Camunda 8.8 APIs & tools migration guide](/apis-tools/migration-manuals/migrate-to-camunda-api.md) for guidance.

<p><a href="../migration-manuals/" class="link-arrow">Camunda 8.8 APIs & tools migration guide</a></p>

<AskAi/>
