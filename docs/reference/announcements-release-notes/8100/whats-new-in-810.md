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

<div className="list-tick">

- **Processes MCP Server**: Expose deployed BPMN processes as callable MCP tools for AI agents — without custom integration code. Connect any MCP-compliant client to `/mcp/processes` to discover and invoke your processes as tools.

</div>

## Summary of important changes

Important changes in Camunda 8.10 are summarized as follows:

<table className="table-callout">
<tr>
    <td width="30%">**What's new/changed**</td>
    <td>**Summary**</td>
</tr>
<tr>
    <td>[Processes MCP Server](/apis-tools/processes-mcp/processes-mcp-overview.md)</td>
    <td>New MCP server at `/mcp/processes` that exposes deployed BPMN processes as callable MCP tools. Processes register automatically on deployment when configured with the MCP start event element template.</td>
</tr>
<tr>
    <td>[MCP start event element template](/components/connectors/out-of-the-box-connectors/agentic-ai-mcp-start-event.md)</td>
    <td>New element template (AI Tools category) applied to a BPMN message start event to configure a process as an MCP tool with name, purpose, input descriptions, and usage guidance for LLMs.</td>
</tr>
</table>

:::info learn more and upgrade

- See [release announcements](/reference/announcements-release-notes/8100/8100-announcements.md) and [release notes](/reference/announcements-release-notes/8100/8100-release-notes.md) for a full summary of what's included in Camunda 8.10, including all breaking changes and deprecations, and supported environment changes.
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
