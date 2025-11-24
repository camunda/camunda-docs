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

## Summary of important changes

Important changes introduced in Camunda 8.9 are summarized as follows:

<table className="table-callout">
<tr>
    <td width="30%">**What's new/changed**</td>
    <td>**Summary**</td>
</tr>
<tr>
    <td>[Web Modeler](#web-modeler)</td>
    <td>Migrated logging framework from `Logback` to `Log4j2`. </td>
    <td>Migrated embedded web server from `Undertow` to `Tomcat`. </td>
</tr>
</table>

:::info

- See [release announcements](/reference/announcements-release-notes/890/890-announcements.md) and [release notes](/reference/announcements-release-notes/890/890-release-notes.md) for more detail on what's included in Camunda 8.9.
- Ready to upgrade? See the [upgrade guides](#upgrade-guides) to learn more about upgrading from Camunda 8.8 to 8.9.

:::

## Web Modeler

### Logging framework changes from Logback to Log4j2

Web Modeler's `restapi` component uses [Apache Log4j 2](https://logging.apache.org/log4j/2.x/) for logging instead of [Logback](https://logback.qos.ch/).

You can now also change the log levels at runtime.

#### Are you affected by 8.9 Web Modeler changes?

The 8.9 changes to Web Modeler `restapi` component could affect your organization if you are in a Self-Managed environment and:

- You are using a custom Logback configuration.
- You are using any tools consuming the logs.

### Embedded web server changes from Undertow to Tomcat

Web Modeler's `restapi` component uses [Apache Tomcat](https://tomcat.apache.org/) instead of [Undertow](https://undertow.io/).

#### Are you affected by 8.9 Web Modeler changes?

The 8.9 changes to Web Modeler `restapi` component could affect your organization if you are in a Self-Managed environment and:

- You are using a custom undertow configuration.
- You are any tool consuming the logs.

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
    <td>[Self-Managed upgrade guide](/self-managed/update/administrators/overview.md)</td>
    <td>Evaluate your infrastructure, understand operational changes, and choose the best update strategy for your environment.</td>
    <td>Operations and platform administrators of Self-Managed installations.</td>
</tr>
<tr>
    <td>[APIs & tools upgrade guide](/apis-tools/migration-manuals/index.md)</td>
    <td>Plan and execute an upgrade from Camunda 8.8 to 8.9, focusing on API and tools transitions.</td>
    <td><p><ul><li>Application developers maintaining Camunda-based solutions in Self-Managed Kubernetes or VM environments.</li><li>Developers using Camunda APIs and tools.</li></ul></p></td>
</tr>
</table>
