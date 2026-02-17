---
id: whats-new-in-89
title: What's new in Camunda 8.9
sidebar_label: What's new in Camunda 8.9
description: "Learn more about what's new and changed in Camunda 8.9."
keywords:
  [
    "what's changed",
    "what's new",
    "whats changed in 8.9",
    "what's changed in 8.9",
    "8.9 changes",
  ]
page_rank: 90
---

import OrchestrationClusterImg from '../../img/orchestration-cluster.png';

Important changes in Camunda 8.9 you should consider when upgrading from Camunda 8.8.

## Why upgrade to Camunda 8.9?

Upgrading to Camunda 8.8 delivers significant benefits and keeps your installation aligned and ready for future releases.

<div className="list-tick">

- **Agentic orchestration**: [Build and orchestrate AI agents](#agentic-orchestration) within your BPMN-based workflows, enabling human tasks, deterministic rule sets, and AI-driven decisions to collaborate in a robust, end-to-end process.

- **RDBMS secondary storage**: Flexible data layer via first‑class RDBMS secondary storage options, including Amazon Aurora.

- **Observability**: Simpler configuration and observability, with cluster‑wide variables and a new SaaS metrics endpoint.

- **Improved developer experience**: A smoother developer and operator experience for Camunda 8 Run and Modeler.

</div>

## Summary of important changes

Important changes introduced in Camunda 8.9 are summarized as follows:

<table className="table-callout">
<tr>
    <td width="30%">**What's new/changed**</td>
    <td>**Summary**</td>
</tr>
<tr>
    <td>[Agentic orchestration](#agentic-orchestration)</td>
    <td>Refined AI and MCP connector capabilities, including new authentication, timeout, and configuration options.</td>
</tr>
<tr>
    <td>[Camunda 8 Run](#camunda8run)</td>
    <td>Use H2 as the default secondary storage for local/dev setups, with improved CLI guidance and defaults.</td>
</tr>
<tr>
    <td>[Cluster configuration and observability](#observability)</td>
    <td>Configure shared values with cluster variables and expose a Cluster Metrics endpoint for SaaS clusters that integrates with Prometheus-style monitoring.</td>
</tr>
<tr>
    <td>[Global user task listeners](#listeners)</td>
    <td>Define configuration‑based, cluster‑wide user task listeners with consistent payloads for all user task events.</td>
</tr>
<tr>
    <td>[Modeler](#modeler)</td>
    <td><ul><li>Web Modeler moves to Log4j2 and Tomcat, adds RDBMS support, event templates, and email invitations.</li><li>Desktop Modeler adds connection management for Orchestration Clusters.</li></ul></td>
</tr>
<tr>
    <td>[RDBMS secondary storage](#rdbms)</td>
    <td>Use relational databases (H2, PostgreSQL, Oracle, MariaDB, MySQL, SQL Server, Aurora PostgreSQL) as secondary storage for the Orchestration Cluster instead of, or alongside, Elasticsearch/OpenSearch.</td>
</tr>
<tr>
    <td>[Supported environments](#environments)</td>
    <td>Updated support for Java, Elasticsearch/OpenSearch, RDBMS, Helm, and connector runtime (including virtual threads).</td>
</tr>
</table>

:::info

- See [release announcements](/reference/announcements-release-notes/890/890-announcements.md) and [release notes](/reference/announcements-release-notes/890/890-release-notes.md) for more detail on what's included in Camunda 8.9.
- Ready to upgrade? See the [upgrade guides](#upgrade-guides) to learn more about upgrading from Camunda 8.8 to 8.9.

:::

## Agentic orchestration {#agentic-orchestration}

## Camunda 8 Run {#camunda8run}

## Cluster configuration and observability {#observability}

## Global user task listeners {#listeners}

## Modeler {#modeler}

## RDBMS secondary storage {#rdbms}

## Supported environments {#environments}

## Web Modeler

### Logging framework changes from Logback to Log4j2

Web Modeler's `restapi` component uses [Apache Log4j 2](https://logging.apache.org/log4j/2.x/) for logging instead of [Logback](https://logback.qos.ch/).

You can now also change the log levels at runtime.

#### Are you affected by 8.9 Web Modeler changes?

The 8.9 changes to the Web Modeler `restapi` component could affect your organization if you are in a Self-Managed environment and:

- You are using a custom Logback configuration.
- You are using any tools that consume the log files.

### Embedded web server changes from Undertow to Tomcat

Web Modeler's `restapi` component uses [Apache Tomcat](https://tomcat.apache.org/) instead of [Undertow](https://undertow.io/).

#### Are you affected by 8.9 Web Modeler changes?

The 8.9 changes to the Web Modeler `restapi` component could affect your organization if you are in a Self-Managed environment and:

- You are using a custom Undertow configuration.
- You are using any tools that consume the log files.

## Upgrade guides {#upgrade-guides}

Camunda 8.9 lays the foundation for future releases. Upgrading ensures compatibility and provides access to enhanced features.

The following guides offer detailed information on how you can upgrade to Camunda 8.9.

<table className="table-callout">
<tr>
    <td width="25%">**Guide**</td>
    <td>**Description**</td>
    <td>**Who is this guide for?**</td>
</tr>
<tr>
    <td>[Self-Managed upgrade guide](/self-managed/upgrade/index.md)</td>
    <td>Evaluate your infrastructure, understand operational changes, and choose the best update strategy for your environment.</td>
    <td>Operations and platform administrators of Self-Managed installations.</td>
</tr>
<tr>
    <td>[APIs & tools upgrade guide](/apis-tools/migration-manuals/index.md)</td>
    <td>Plan and execute an upgrade from Camunda 8.8 to 8.9, focusing on API and tools transitions.</td>
    <td><p><ul><li>Application developers maintaining Camunda-based solutions in Self-Managed Kubernetes or VM environments.</li><li>Developers using Camunda APIs and tools.</li></ul></p></td>
</tr>
</table>
