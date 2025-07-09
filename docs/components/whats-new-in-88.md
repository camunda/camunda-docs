---
id: whats-new-in-88
title: What's new in Camunda 8.8
sidebar_label: What's new in Camunda 8.8
description: "Learn more about what's new and changed in Camunda 8.8."
keywords: ["what's changed", "what's new"]
---

import OrchestrationClusterImg from './assets/orchestration-cluster.png';
import PersonaBadge from './react-components/\_persona-badge';

Learn more about important changes in Camunda 8.8 when migrating from Camunda 8.7.

## Introducing Camunda 8.8

Camunda 8.8 introduces several important changes and enhancements as part of our architecture streamlining initiative, focusing on identity management and migration considerations from Camunda 8.7.

<table className="table-callout">
<tr>
    <td width="30%">**What's new/changed**</td>
    <td>**Summary**</td>
</tr>
<tr>
    <td>[Orchestration Cluster](#orchestration-cluster)</td>
    <td>The Orchestration cluster (previously automation cluster) is now the core Camunda 8 component.</td>
</tr>
<tr>
    <td>[Identity, authentication, and authorization](#identity-authentication-and-authorization)</td>
    <td>Identity is now...</td>
</tr>
<tr>
    <td>[APIs and SDKs](#apis-and-sdks)</td>
    <td>New and changed APIs and SDKs for interacting programmatically with the Orchestration cluster.</td>
</tr>
<tr>
    <td>[Camunda User Tasks](#camunda-user-tasks)</td>
    <td>Deprecation of Job-based User Tasks by Camunda User Tasks.</td>
</tr>
<tr>
    <td>[Camunda Process Test](#camunda-process-test)</td>
    <td>Deprecation of Zeebe Process Test by Camunda Process Test.</td>
</tr>
<tr>
    <td>[Data and storage](#data)</td>
    <td>exporters etc.</td>
</tr>
<tr>
    <td>[Deployment and configuration](#deployment)</td>
    <td>unified components etc.</td>
</tr>
</table>

:::info
See [release announcements](/reference/announcements-release-notes/880/880-announcements.md), [release notes](/reference/announcements-release-notes/880/880-release-notes.md), and the [quality board](https://github.com/orgs/camunda/projects/187/views/15) for more detail on what's included in Camunda 8.8.
:::

## Orchestration Cluster {#orchestration-cluster}

<div><PersonaBadge persona="Administrator (DevOps)" /><PersonaBadge persona="Developer" /></div>

The Orchestration cluster (previously automation cluster) is now the core component of [Camunda 8](../reference/glossary.md#camunda-8), powering the automation and orchestration of [processes](../reference/glossary.md#process).

<img src={OrchestrationClusterImg} alt="Diagram showing the orchestration cluster" class="img-noborder img-700" style={{marginBottom: '0'}}/>

### Zeebe, Operate, and Tasklist

Zeebe, Operate, and Tasklist are now part of the Orchestration cluster.

- [Zeebe](../reference/glossary.md#zeebe) as the [workflow engine](../reference/glossary.md#workflow-engine).
- Operate for monitoring and troubleshooting [process instances](../reference/glossary.md#process-instance) running in [Zeebe](../reference/glossary.md#zeebe).
- Tasklist for interacting with [user tasks](../reference/glossary.md#user-task) (assigning, completing, and so on).

### Orchestration Cluster Identity

[Identity](../reference/glossary.md#identity) for managing the integrated authentication and authorization. Mention Management Identity here as well

### Orchestration Cluster API

APIs for interacting with the Orchestration cluster programmatically. Introduce it but [link to content](#orchestration-cluster-api).

## Identity, authentication, and authorization

## APIs and SDKs

### Unified Orchestration Cluster API {#orchestration-cluster-api}

Content is here

### Deprecated Operate, Tasklist, and Zeebe gRPC API endpoints

### New Java/Spring SDK, NodeJS

## Camunda User Tasks

<div><PersonaBadge persona="Administrator (DevOps)" /><PersonaBadge persona="Developer" /></div>

The Orchestration cluster (previously automation cluster) is now the core component of [Camunda 8](../reference/glossary.md#camunda-8), powering the automation and orchestration of [processes](../reference/glossary.md#process).

## Camunda Process Test

<div><PersonaBadge persona="Developer" /></div>

## Data and storage {#data}

### Exporters

A new Camunda Exporter is introduced, bringing the importing and archiving logic of web components (Tasklist and Operate) closer to the distributed platform (Zeebe). This simplifies installation, enables scalability for the web applications, reduces latency when showing runtime and historical data, and reduces data duplication (resource consumption).

## Deployment and configuration {#deployment}

## Further resources
