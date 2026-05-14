---
id: whats-new-in-810
title: What's new in Camunda 8.10
sidebar_label: What's new in Camunda 8.10
description: "Highlights and important changes to consider when upgrading to Camunda 8.10."
keywords:
  [
    "what's changed",
    "what's new",
    "whats changed in 8.10",
    "what's changed in 8.10",
    "8.10 changes",
  ]
page_rank: 90
toc_max_heading_level: 2
---

import OrchestrationClusterImg from '../../img/orchestration-cluster.png';
import PageDescription from '@site/src/components/PageDescription';

<PageDescription />

## Why upgrade to Camunda 8.10?

Upgrading to Camunda 8.10 delivers significant benefits and keeps your installation aligned and ready for future releases.

## Summary of important changes

Important changes in Camunda 8.10 are summarized as follows:

:::warning Breaking change: Helm v4 required
Camunda 8.10 (chart 15.x) supports the Helm CLI v4 only. Camunda 8.9 (chart 14.x) is the last minor that supports the Helm v3 CLI.

Switching CLIs does not require a release-state migration; Helm is client-side only. Before you run `helm upgrade` to 8.10, install the Helm v4 CLI. See [Move from the Helm v3 CLI to v4](/self-managed/deployment/helm/operational-tasks/moving-helm-v3-to-v4.md) and [Helm 4](/self-managed/deployment/helm/operational-tasks/helm-v4.md).
:::

:::note
Additional changes for 8.10 will be added here as the 8.10 documentation is updated.
:::
<table className="table-callout">
<tr>
    <td width="30%">**What's new/changed**</td>
    <td>**Summary**</td>
</tr>
<tr>
    <td>Legacy APIs and Tasklist V1 removals</td>
    <td>Camunda 8.10 removes the Operate API, the Tasklist API and Tasklist V1 mode, public start forms, user task access restrictions, and Zeebe Process Test. Review the release announcement and migration guides before you upgrade.</td>
</tr>
</table>

:::info learn more and upgrade

- See [release announcements](/reference/announcements-release-notes/8100/8100-announcements.md) and [release notes](/reference/announcements-release-notes/8100/8100-release-notes.md) for a full summary of what's included in Camunda 8.10, including all breaking changes and deprecations, and supported environment changes.
- For removed legacy APIs, Tasklist V1-dependent features, and Zeebe Process Test, see the [8.10 release announcement](/reference/announcements-release-notes/8100/8100-announcements.md#removal-of-legacy-apis-tasklist-v1-dependent-features-and-zeebe-process-test).
- Ready to upgrade? See the [upgrade guides](#upgrade-guides) to learn more about upgrading from Camunda 8.9 to 8.10.

:::

<!-- ## Feature 1

Description for feature 1.

### Feature 1 details 1

Description for feature 1 details 1.

### Feature 1 details 2

Description for feature 1 details 2. -->

## Upgrade guides {#upgrade-guides}

The following guides offer detailed information on how to upgrade to Camunda 8.10.

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
    <td>[APIs & tools upgrade guide](/)</td>
    <td>Plan and execute an upgrade from Camunda 8.9 to 8.10, focusing on API and tools transitions.</td>
    <td><p><ul><li>Application developers maintaining Camunda-based solutions in Self-Managed Kubernetes or VM environments.</li><li>Developers using Camunda APIs and tools.</li></ul></p></td>
</tr>
</table>
