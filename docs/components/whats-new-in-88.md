---
id: whats-new-in-88
title: What's new in Camunda 8.8
sidebar_label: What's new in Camunda 8.8
description: "Learn more about what's new and changed in Camunda 8.8."
keywords: ["what's changed", "what's new"]
---

import OrchestrationClusterImg from './assets/orchestration-cluster.png';
import PersonaBadge from './react-components/\_persona-badge';

Learn about important changes in Camunda 8.8 to consider when migrating from Camunda 8.7.

:::warning work in progress
This documentation page is a work in progress and may contain incomplete, placeholder, or evolving content. While the core concepts introduced in Camunda 8.8 are stable, details and sections here are actively being refined.
:::

## Introducing Camunda 8.8

Camunda 8.8 introduces important architectural changes and enhancements, unifying formerly isolated components such as Operate, Tasklist, and identity management into a single **Orchestration Cluster** component serving a unified Orchestration Cluster API.

The simplest Self-Managed deployment now involves running a single Java application or docker container of the Orchestration Cluster Application.

<table className="table-callout">
<tr>
    <td width="30%">**What's new/changed**</td>
    <td>**Summary**</td>
</tr>
<tr>
    <td>[Orchestration Cluster](#orchestration-cluster)</td>
    <td>The Orchestration Cluster (previously automation cluster) is now the core Camunda 8 component.</td>
</tr>
<tr>
    <td>[Identity, authentication, and authorization](#identity)</td>
    <td>With the introduction of IAM functionality into the Orchestration Cluster with Camunda 8.8 the source of truth for IAM on cluster resources moves from the former Identity component, now called Management Identity, into the Orchestration Cluster itself.</td>
</tr>
<tr>
    <td>[APIs and SDKs](#apis-and-sdks)</td>
    <td>New and changed APIs and SDKs are introduced to interact programmatically with the Orchestration Cluster.</td>
</tr>
</table>

:::info

- See [release announcements](/reference/announcements-release-notes/880/880-announcements.md), [release notes](/reference/announcements-release-notes/880/880-release-notes.md), and the [quality board](https://github.com/orgs/camunda/projects/187/views/15) for more detail on what's included in Camunda 8.8.
- Ready to upgrade? See our [upgrade guides](#upgrade-guides) to learn more about upgrading from Camunda 8.7 to 8.8.

:::

## Orchestration Cluster {#orchestration-cluster}

The Orchestration cluster (previously automation cluster) is now the core component of Camunda 8.

<img src={OrchestrationClusterImg} alt="Diagram showing the orchestration cluster" class="img-noborder" style={{marginBottom: '0'}}/>

### Zeebe, Operate, and Tasklist

Zeebe, Operate, and Tasklist are consolidated into the Orchestration Cluster application.

- [Zeebe](../reference/glossary.md#zeebe) as the [workflow engine](../reference/glossary.md#workflow-engine).
- Operate for monitoring and troubleshooting [process instances](../reference/glossary.md#process-instance) running in [Zeebe](../reference/glossary.md#zeebe).
- Tasklist for interacting with [user tasks](../reference/glossary.md#user-task) (assigning, completing, etc.)

### Orchestration Cluster Identity

[Identity](../reference/glossary.md#identity) for managing the integrated authentication and authorization.

<!-- Mention Management Identity here as well. -->

### Orchestration Cluster API

APIs for interacting with the Orchestration cluster programmatically.

<!-- Introduce it but [link to content](#orchestration-cluster-api). -->

<!-- ## Identity, authentication, and authorization

## APIs and SDKs

### Unified Orchestration Cluster API {#orchestration-cluster-api}

Content is here

### Deprecated Operate, Tasklist, and Zeebe gRPC API endpoints

### New Java/Spring SDK, Node.js -->

## Identity, authentication, and authorization {#identity}

## APIs and SDKs {#apis-and-sdks}

## Upgrade guides {#upgrade-guides}

Camunda 8.8 lays the foundation for future releases. Upgrading ensures compatibility and access to improved features.

The following guides provide detailed information on how to upgrade to Camunda 8.8.

| Guide                                                                                     | Description                                                                                      | Who is this guide for?                                                                                                                                       |
| :---------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Self-Managed upgrade guide](/self-managed/components/components-upgrade/introduction.md) |                                                                                                  | Operations and platform administrators of Self-Managed installations.                                                                                        |
| [API and SDK upgrade guide](../apis-tools/migration-manuals/index.md)                     | <p>Plan and execute an upgrade from Camunda 8.7 to 8.8, focusing on API and SDK transitions.</p> | <p>Application developers maintaining Camunda-based solutions in Self-Managed Kubernetes or VM environments, and developers using Camunda APIs and SDKs.</p> |
