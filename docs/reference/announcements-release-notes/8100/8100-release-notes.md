---
id: 8100-release-notes
title: "8.10 Release notes"
sidebar_label: Release notes
description: "Release notes for new features included in the 8.10 minor release, including alpha feature releases."
keywords: ["8.10 release notes", "release notes for 8.10", "release notes"]
page_rank: 90
---

import PageDescription from '@site/src/components/PageDescription';

<PageDescription />

| Minor release date | Scheduled end of maintenance | Changelog(s)                                                                 | Upgrade guides                                                                                        |
| :----------------- | :--------------------------- | :--------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------- |
| 13 October 2026    | 11 April 2028                | [Patch Releases and Changelogs](#technical-changelogs-for-all-810x-releases) | [8.10 upgrade guides](/reference/announcements-release-notes/8100/whats-new-in-810.md#upgrade-guides) |

:::info 8.10 resources

- See [What's new in Camunda 8.10](/reference/announcements-release-notes/8100/whats-new-in-810.md) for important changes to consider when planning your upgrade from Camunda 8.8.
- See [release announcements](/reference/announcements-release-notes/8100/8100-announcements.md) to learn more about supported environment changes, breaking changes, and deprecations.
- Refer to the [quality board](https://github.com/orgs/camunda/projects/187/views/23) for an overview of known bugs by component and severity.

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

### Agentic orchestration

#### Standalone evaluation assertions for judge and semantic similarity

<!-- https://github.com/camunda/camunda/issues/46130
https://github.com/camunda/camunda/issues/46130
https://github.com/camunda/camunda/issues/49548 -->

<div class="release"><span class="badge badge--medium" title="This feature affects AI agents">AI agents</span><span class="badge badge--long" title="This feature affects Agentic orchestration">Agentic orchestration</span></div>

Camunda Process Test now exposes **judge-based evaluation** and **semantic similarity evaluation** as standalone AssertJ assertions for arbitrary string values, without requiring process-variable assertions. Semantic similarity checks support configurable embedding models and thresholds, and both assertion types reuse the existing CamundaAssert configuration with optional local overrides.

### Camunda Hub

#### Usage & billing metrics for 2025 enterprise license model

<!-- https://github.com/camunda/product-hub/issues/3571 -->

<div class="release"><span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--medium" title="This feature affects Camunda Hub">Camunda Hub</span></div>

Camunda Hub and Accounts now support the 2025 enterprise license model.

- A new `licensing_model` attribute on `OrganizationMetaData` identifies if an enterprise organization is using the **2025** or **legacy** license model. If unset, it is treated as **legacy**.
- If you are an organization with `licensing_model = 2025`, your Usage and Billing views only show **Process Instance (PI)** metrics. **Decision Instance (DI)** and **Unique Task User (TU)** information is no longer shown. Legacy organizations continue to see the existing metric set.
- For enterprise (`salesplantype = enterprise`) organizations, the licensing model is shown in the organization details. Admins can edit this by selecting either **legacy** or **2025** via a modal action.
- The enterprise onboarding wizard now includes a license selection step (defaults to **2025**). The `ExternalOnboardingRouter` accepts an optional licensing model parameter (defaulting to **2025** if not provided).

#### Cluster version selection for SaaS orchestration clusters

<!-- https://github.com/camunda/product-hub/issues/3582 -->

<div class="release"><span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--medium" title="This feature affects Camunda Hub">Camunda Hub</span><span class="badge badge--medium" title="This feature affects Orchestration Cluster">Orchestration Cluster</span></div>

You can now create new SaaS Orchestration Clusters on specific supported Camunda 8 minor and patch versions, including:

- The latest recommended versions (latest patch of each active minor)
- Other still-supported versions that you already run on existing clusters in the same organization.

### Intelligent document processing (IDP)

#### Support for ABBYY as an IDP Provider

<!-- https://github.com/camunda/product-hub/issues/3492 -->

<div class="release"><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--medium" title="This feature affects Camunda IDP">IDP</span></div>

Camunda IDP now supports [ABBYY](https://www.abbyy.com/) as a document extraction provider.

### Modeler

#### Support for configurable headers for execution listeners

<!-- https://github.com/camunda/product-hub/issues/3450 -->

<div class="release"><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--medium" title="This feature affects Web Modeler">Web Modeler</span><span class="badge badge--medium" title="This feature affects Desktop Modeler">Desktop Modeler</span></div>

Execution listeners now support configurable headers, aligned with service task job headers.

- In BPMN, execution listeners can define `<zeebe:taskHeaders>`. The headers are passed to the listener’s job worker alongside any base-element headers, with listener headers overriding on key conflicts.
- In Modeler, you can configure execution listener headers visually (name/value pairs) without editing BPMN XML.
- Listener workers can consume these headers as metadata and configuration parameters using the same patterns as service task job workers.

### Integrations

#### Microsoft Teams routing and permission-aware task actions

<!-- https://github.com/camunda/product-hub/issues/3424 -->

<div class="release"><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--medium" title="This feature affects Integrations">Integrations</span></div>

Camunda for Microsoft Teams now supports routing incident and task collaboration to private channels, shared channels, and group chats. Notifications and task actions in Teams now align with Camunda assignment and access rules, ensuring that only eligible users are notified and allowed to act.

### Operate

#### JSON display in Operate

<div class="release"><span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--medium" title="This feature affects Operate">Operate</span></div>

<!-- https://github.com/camunda/product-hub/issues/3464 -->

Camunda 8.10 introduces an update to the JSON display functionality in Operate (SaaS).

You can now:

- Open JSON variables in a dedicated JSON viewer directly from the variables panel, without entering editing mode.
- View JSON values with consistent, easier to understand formatting.
- Copy full JSON variable values to the clipboard.
- Use the improved in-line variables display.

This change helps navigate more complex data during operations and troubleshooting.
