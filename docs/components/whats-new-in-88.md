---
id: whats-new-in-88
title: What's new in Camunda 8.8
sidebar_label: What's new in Camunda 8.8
description: "Learn more about what's new and changed in Camunda 8.8."
keywords: ["what's changed", "what's new"]
---

import OrchestrationClusterImg from './assets/orchestration-cluster.png';

Learn more about the important changes in Camunda 8.8 and prepare to migrate from 8.7.

## Prepare for Camunda 8.8

Camunda 8.8 introduces several important changes and enhancements as part of our architecture streamlining initiative, focusing on identity management and migration considerations from version 8.7.

- [Orchestration Cluster](#orchestration-cluster)

Infographic?

:::info
See [release announcements](/reference/announcements-release-notes/880/880-announcements.md), [release notes](/reference/announcements-release-notes/880/880-release-notes.md), and the [quality board](https://github.com/orgs/camunda/projects/187/views/15) for more detail on what's included in Camunda 8.8.
:::

## Orchestration Cluster {#orchestration-cluster}

<span class="badge badge--medium" title="This feature is likely to affect administrators">Administrators (DevOps)</span><span class="badge badge--medium" title="This feature is likely to affect developers">Developers</span>

The Orchestration cluster (previously automation cluster) is now the core component of [Camunda 8](../reference/glossary.md#camunda-8), powering the automation and orchestration of [processes](../reference/glossary.md#process).

<img src={OrchestrationClusterImg} alt="Diagram showing the orchestration cluster" class="img-noborder img-700" style={{marginBottom: '0'}}/>

<table className="table-callout">
<tr>
    <td width="30%">**What's new**</td>
    <td>**Description**</td>
</tr>
<tr>
    <td>Zeebe, Operate, and Tasklist</td>
    <td><p>Zeebe, Operate, and Tasklist are now part of the Orchestration cluster.</p><ul><li>[Zeebe](../reference/glossary.md#zeebe) as the [workflow engine](../reference/glossary.md#workflow-engine).</li><li>Operate for monitoring and troubleshooting [process instances](../reference/glossary.md#process-instance) running in [Zeebe](../reference/glossary.md#zeebe).</li><li>Tasklist for interacting with [user tasks](../reference/glossary.md#user-task) (assigning, completing, and so on).</li></ul></td>
</tr>
<tr>
    <td>Orchestration Cluster Identity</td>
    <td>[Identity](../reference/glossary.md#identity) for managing the integrated authentication and authorization. Mention Management Identity here as well</td>
</tr>
<tr>
    <td>Unified Orchestration Cluster API</td>
    <td>APIs for interacting with the Orchestration cluster programmatically. Introduce it but [link to content](#orchestration-cluster-api).</td>
</tr>
</table>

## Identity, authentication, and authorization

## APIs and SDKs

### Unified Orchestration Cluster API {#orchestration-cluster-api}

Content is here

### Deprecated Operate, Tasklist, and Zeebe gRPC API endpoints

### New Java/Spring SDK, NodeJS
