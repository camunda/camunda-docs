---
id: 8100-release-notes
title: "8.10 Release notes"
sidebar_label: Release notes
description: "Release notes for new features included in the 8.10 minor release, including alpha feature releases."
toc_min_heading_level: 2
toc_max_heading_level: 2
keywords: ["8.10 release notes", "release notes for 8.10", "release notes"]
page_rank: 90
---

import PageDescription from '@site/src/components/PageDescription';

<PageDescription />

| Minor release date | Scheduled end of maintenance | Changelog(s)                                                                 | Upgrade guides                                                                                        |
| :----------------- | :--------------------------- | :--------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------- |
| 12 October 2026    | ?                            | [Patch Releases and Changelogs](#technical-changelogs-for-all-810x-releases) | [8.10 upgrade guides](/reference/announcements-release-notes/8100/whats-new-in-810.md#upgrade-guides) |

:::info 8.10 resources

- See [What's new in Camunda 8.10](/reference/announcements-release-notes/8100/whats-new-in-810.md) for important changes to consider when planning your upgrade from Camunda 8.8.
- See [release announcements](/reference/announcements-release-notes/8100/8100-announcements.md) to learn more about supported environment changes, breaking changes, and deprecations.
- Refer to the [quality board](https://github.com/orgs/camunda/projects/187/views/21) for an overview of known bugs by component and severity.

:::

### Technical Changelogs for all 8.10.x releases

<details className="changelog-dropdown">
  <summary>Overview of all patch releases and their Changelogs in GitHub</summary>

<!-- RELEASE_LINKS_PLACEHOLDER -->

</details>

## 8.10.0-alpha1

| Release date | Changelog(s)                                                                                                                                                                                 | Blog |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--- |
| 12 May 2026  | <ul><li>[ Camunda 8 core ](https://github.com/camunda/camunda/releases/tag/8.10.0-alpha1)</li><li>[ Connectors ](https://github.com/camunda/connectors/releases/tag/8.10.0-alpha1)</li></ul> | -    |

### Operate

#### JSON display in Operate

<div class="release"><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--medium" title="This feature affects Operate">Operate</span></div>

<!-- https://github.com/camunda/product-hub/issues/3464 -->

Camunda 8.10 introduces an update to the JSON display functionality.

- Open JSON variables in a dedicated JSON viewer directly from the variables panel, without entering editing mode.

- View JSON values with consistent, easier to understand formatting.

- Copy full JSON variable values to the clipboard.

- Use the improved in-line variables display.

This change helps navigate more complex data during operations and troubleshooting.

### Camunda Hub

#### Unified navigation and context-aware sidebar

<div class="release"><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--medium" title="This feature affects Camunda Hub">Camunda Hub</span></div>

Camunda Hub now provides a single, unified navigation with persistent breadcrumbs and a context-aware sidebar across organization, workspace/project, and orchestration-cluster views.

#### Usage & billing metrics for 2025 enterprise license model

<div class="release"><span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--medium" title="This feature affects Console">Console</span></div>

Camunda now supports the **2025 enterprise license model** in Console and Accounts.

- A new `licensing_model` attribute on `OrganizationMetaData` identifies whether an enterprise organization is on the **2025** or **legacy** license model. If unset, it is treated as **legacy**.
- For organizations with `licensing_model = 2025`, Usage and Billing views show **only Process Instance (PI)** metrics. **Decision Instance (DI)** and **Unique Task User (TU)** information is no longer rendered. Legacy organizations continue to see the existing metric set.
- For enterprise (`salesplantype = enterprise`) organizations, the licensing model is visible in the organization details and can be edited via a modal action that lets admins select **legacy** or **2025**.
- The enterprise onboarding wizard now includes a license selection step, defaulting to **2025**, and the `ExternalOnboardingRouter` accepts an optional licensing model parameter (defaulting to **2025** when not provided).

#### Cluster version selection for SaaS orchestration clusters

<div class="release"><span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--medium" title="This feature affects Camunda Hub">Camunda Hub</span><span class="badge badge--medium" title="This feature affects Orchestration Cluster">Orchestration Cluster</span></div>

Camunda Hub now lets you create new SaaS orchestration clusters on specific supported Camunda 8 minor and patch versions, including:

- The latest recommended versions (latest patch of each active minor)
- Other still-supported versions that you already run on existing clusters in the same organization.

## Intelligent document processing (IDP)

#### Support for ABBYY as an IDP Provider

<div class="release"><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--medium" title="This feature affects Camunda IDP">IDP</span></div>

Camunda IDP now supports ABBYY as a document extraction provider.

## Modeler

#### Support for configurable headers for execution listeners

<div class="release"><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--medium" title="This feature affects Web Modeler">Web Modeler</span><span class="badge badge--medium" title="This feature affects Desktop Modeler">Desktop Modeler</span></div>

Execution listeners now support configurable headers, aligned with service task job headers.

- In BPMN, execution listeners can define `<zeebe:taskHeaders>`. The headers are passed to the listener’s job worker alongside any base-element headers, with listener headers overriding on key conflicts.
- Modeler lets you configure execution listener headers visually (name/value pairs) without editing BPMN XML.
- Listener workers can consume these headers as metadata and configuration parameters using the same patterns as service task job workers.
