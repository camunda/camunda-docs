---
id: working-with-apis-tools
title: "APIs & tools"
sidebar_label: "APIs & tools"
description: "Learn more about the integration concepts involved in using the Camunda Zeebe client libraries, APIs, and SDKs to interact programmatically with Camunda 8."
page_rank: 90
---

import "./react-components/\_apitools-card.css";
import LandingHero from '@site/src/components/LandingHero';
import { apisToolsHero, apisToolsRestOverlay } from './react-components/_hero-data';
import ApiGrid from './react-components/\_apitools-card';
import { apiCards, clientCards } from './react-components/\_apitools-card-data';

<h3 class="subheading">Camunda 8 APIs and official clients and SDKs.</h3>

<LandingHero card={apisToolsHero} overlay={apisToolsRestOverlay} href="/apis-tools/java-client/getting-started/" ariaLabel="Get started with the Camunda Java Client">

Use Camunda 8 APIs and clients to build, automate, and monitor your applications. Use the official Camunda clients and SDKs (Java, Spring, and Node.js) to simplify API usage and speed up development. Not sure whether to use REST or gRPC? See [Choose between REST and gRPC](./choose-between-rest-and-grpc.md).

<p class="link-button">[Get started with the Camunda Java Client](./java-client/getting-started.md)</p>

</LandingHero>

:::info Upgrade to Camunda 8.10

- Existing customer? Upgrade your APIs & tools to 8.10 using the [APIs & tools migration guide](/apis-tools/migration-manuals/migrate-to-810.md).
- See [what's new in Camunda 8.11](/reference/announcements-release-notes/8110/whats-new-in-811.md), [release announcements](/reference/announcements-release-notes/8110/8110-announcements.md), and [release notes](/reference/announcements-release-notes/8110/8110-release-notes.md).

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

Camunda clients and SDKs are **forward-compatible** with the Orchestration Cluster, meaning you can upgrade the cluster first and clients after. The Orchestration Cluster REST API is backward-compatible, ensuring no breaking changes to existing endpoints across versions.

<p class="link-arrow">[Client and API compatibility guarantees](/reference/public-api.md#client-and-api-compatibility)</p>

## Testing

Use Camunda Process Test to test your process definitions and automations with a dedicated testing framework.

<p class="link-arrow">[Camunda Process Test](/apis-tools/testing/getting-started.md)</p>

## Upgrade to Camunda 8.10

If you are migrating from Camunda 7 or from v1 component REST APIs, see the migration guide for guidance.

<p class="link-arrow">[Camunda 8.10 APIs & tools migration guide](/apis-tools/migration-manuals/migrate-to-810.md)</p>
