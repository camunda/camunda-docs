---
id: introduction-to-camunda
title: Get started with Camunda
sidebar_label: Get started with Camunda
slug: /guides/
description: "Learn about Camunda 8, a universal process orchestrator that allows you to orchestrate and automate complex business processes that span people, systems, and devices."
---

import DocCardList from '@theme/DocCardList';
import ArchDiagramImg from './img/c8-architecture-diagram.png';

Get started with [Camunda 8](https://camunda.io), the universal process orchestrator you can use to orchestrate and automate complex business processes that span people, systems, and devices.

You can deploy Camunda 8 in two ways:

- **Camunda 8 SaaS**: A fully managed cloud service for rapid deployment and minimal operational overhead.
- **Camunda 8 Self-Managed**: A self-hosted solution for organizations requiring full control over their infrastructure.

Camunda 8 combines powerful execution engines for BPMN processes and DMN decisions with tools for collaborative modeling, operations, and analytics. Camunda 8 [components](/components/components-overview.md) work together to form the complete Camunda 8 experience, allowing you to design, automate, and improve your business processes.

<img src={ArchDiagramImg} alt="Camunda 8 architecture diagram" class="img-noborder"/>

:::info Migrating from Camunda 7 to Camunda 8
Want to migrate your Camunda 7 process solutions to run on Camunda 8? See our [Camunda 7 migration guide](/guides/migrating-from-camunda-7/index.md).
:::

## Run your first local project

This guide is tailored for developers who want to implement process automation solutions using Java and Spring. You'll work with a local, self-managed, lightweight Camunda 8 environment.

- [Run your first local project](/guides/getting-started-example.md)

## Orchestrate human tasks

This guide is tailored for low-code developers using Camunda 8 SaaS to efficiently allocate work through user tasks.

- [Get started with human task orchestration](/guides/getting-started-orchestrate-human-tasks.md)

## Orchestrate APIs using connectors

This guide is designed for users who prefer a low-code approach to process automation, walking you through working with a REST connector task as a first time Camunda 8 SaaS user. You can follow this tutorial using either a local, Self-Managed lightweight setup, or Camunda 8 SaaS.

- [Get started with API orchestration](/guides/getting-started-orchestrate-apis.md)
