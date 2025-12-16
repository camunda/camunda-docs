---
id: index
title: Camunda 7 to Camunda 8 migration guide
sidebar_label: Overview
description: "Migrate process solutions developed for Camunda 7 to run them on Camunda 8."
keywords: [Camunda 8, Camunda 7, migration guide, transition, transition guide]
---

import "../react-components/\_migration-table.css";
import MigrationsGrid from '../react-components/\_migration-card';
import { gettingStartedCards } from '../react-components/\_migration-card-data';

Learn how to migrate process solutions developed for Camunda 7 to run on Camunda 8.

## About this guide

This guide covers the typical migration journey from Camunda 7 to Camunda 8, describing the decisions to be made along the way, as well as linking to more in-depth material or tooling you might find useful.

It is important to understand that **Camunda 8 is not a drop-in replacement for Camunda 7**.

It is not sufficient to exchange a library; you might have to adjust your BPMN models, refactor code, and probably also re-architect your solution. This effort greatly depends on how your existing Camunda 7 solution is built. This guide dives deeper into all the aspects involved.

:::note
This guide covers [migration tooling](migration-tooling/index.md) in development for Camunda 8.8 that might not be complete at the time of reading.
:::

## What you will learn

This guide covers the following main aspects involved in migrating from Camunda 7 to Camunda 8.

<MigrationsGrid migrations={gettingStartedCards} />

<!-- TODO: However, the [migration tooling roadmap](https://roadmap.camunda.com/) can inform your time planning. -->

## Help and further resources

Get help with your migration journey from the following additional resources.

- The [Camunda forum](https://forum.camunda.io/c/c7-to-c8/)
- Camunda Consulting
  - [Migration workshops](https://camunda.com/wp-content/uploads/2024/03/Camunda_ConsultingWorkshops_5-Migration-Evaluation_2024.pdf)
  - Professional advisory services
- [Camunda Partners](https://camunda.com/de/partners/):
  - Professional advisory services
  - Implementation services
- [Camunda Academy: Migration Overview](https://academy.camunda.com/c8-migration-overview/)

:::info
Still need more help? Contact your customer success manager or [reach out to Camunda](https://camunda.com/contact-us/).
:::
