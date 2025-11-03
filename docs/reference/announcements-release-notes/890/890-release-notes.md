---
id: 890-release-notes
title: "8.9 Release notes"
sidebar_label: Release notes
description: "Release notes for 8.9, including alphas"
toc_min_heading_level: 2
toc_max_heading_level: 2
keywords: ["8.8 release notes", "release notes for 8.9", "release notes"]
page_rank: 90
---

These release notes identify the main new features included in the 8.9 minor release, including [alpha feature releases](/components/early-access/alpha/alpha-features.md).

| Minor release date | Scheduled end of maintenance | Changelog(s)                                                                | Release blog | Upgrade guides |
| ------------------ | ---------------------------- | --------------------------------------------------------------------------- | ------------ | -------------- |
| 14 April 2026      | 13 October 2028              | [Patch Releases and Changelogs](#technical-changelogs-for-all-89x-releases) | -            | -              |

:::info 8.9 resources

- See [release announcements](/reference/announcements-release-notes/890/890-announcements.md) to learn more about supported environment changes and breaking changes or deprecations.
- Refer to the [quality board](https://github.com/orgs/camunda/projects/187/views/15) for an overview of known bugs by component and severity.

:::

### Technical Changelogs for all 8.9.x releases

<details className="changelog-dropdown">
  <summary>Overview of all patch releases and their Changelogs in GitHub</summary>

<!-- RELEASE_LINKS_PLACEHOLDER -->

<!-- RELEASE_LINKS_PLACEHOLDER -->

</details>

## 8.9.0-alpha1

| Release date     | Changelog(s)                                                                                                                                                                                       | Blog |
| :--------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--- |
| 11 November 2025 | <ul><li>[ Camunda 9 core ](https://github.com/camunda/camunda/releases/tag/8.9.0-alpha1-rc1)</li><li>[ Connectors ](https://github.com/camunda/connectors/releases/tag/8.9.0-alpha1-rc3)</li></ul> | -    |

### RDBMS secondary storage (H2, PostgreSQL, Oracle, MariaDB) <span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Data">Data</span>

<!-- https://github.com/camunda/product-hub/issues/2439 -->

Camunda 8.9 now supports RDBMS as an alternative secondary data store to Elasticsearch or OpenSearch.

This feature enables organizations to use H2, PostgreSQL, Oracle, or MariaDB as the secondary storage layer, reducing operational complexity for teams that do not need the scale or performance of ES/OS and prefer an RDBMS-based solution.

Key highlights:

- **Flexible database choice:** Use H2 (for development), PostgreSQL, Oracle, or MariaDB as secondary storage alternatives to ES/OS.
- **Separation of concerns:** Zeebe (Raft + RocksDB) remains the primary execution storage; only the secondary storage layer changes.
- **Consistent APIs:** Continue using the same REST API and data format as with ES/OS—no query or integration changes needed.
- **Simplified operations:** Leverage existing database expertise without maintaining or scaling ES/OS clusters.

Supported versions:

- **PostgreSQL**: 15, 16, 17
- **Amazon Aurora PostgreSQL (compatible)**: 14, 15, 16, 17
- **Oracle Database**: 19c, 23ai
- **MariaDB**: 10.11, 11.4, 11.8
- **H2 (development only)**: 2.3

:::note
Web applications access data through the public Camunda REST API, ensuring that switching between ES/OS and RDBMS does not change behavior or data visibility.
:::

### MySQL and Microsoft SQL Server secondary storage <span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Data">Data</span>

<!-- https://github.com/camunda/product-hub/issues/3043 -->

Camunda 8.9 expands secondary storage support by introducing MySQL and Microsoft SQL Server as additional database options for the orchestration cluster.  
This enhancement provides greater flexibility for enterprises that depend on these databases due to policy, licensing, or ecosystem requirements, enabling smoother onboarding and infrastructure consistency.

What’s new:

- **New supported databases:** MySQL and Microsoft SQL Server are now supported as secondary data stores alongside PostgreSQL, Oracle, MariaDB, and H2.
- **Broader enterprise compatibility:** Simplifies adoption for organizations operating in Microsoft- or MySQL-centric environments.
- **Reduced operational friction:** Removes the need for parallel data systems, reducing maintenance overhead and alignment issues.

Supported versions:

- **MySQL:** 8.4
- **Microsoft SQL Server:** 2019, 2022

:::note
These new databases are available as secondary storage options. Zeebe’s primary execution storage (Raft + RocksDB) remains unchanged.
:::

### JDBC driver management for RDBMS integrations <span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Configuration">Configuration</span>

<!-- https://github.com/camunda/product-hub/issues/2742 -->

Camunda 8.9 introduces a standardized approach to JDBC driver management for RDBMS integrations in manual installations. A new `/driver-lib` directory now separates Camunda-bundled drivers from customer-supplied ones, providing a clear and compliant structure for database connectivity.

Drivers that Camunda can legally distribute are included by default, while customers can easily add and configure their own (for example, Oracle JDBC). Configuration options allow full control, including explicit driver-class designation when required.

:::note
This change simplifies compliance and setup for RDBMS environments, ensuring consistent connectivity across PostgreSQL, Oracle, MariaDB, and H2.
:::
