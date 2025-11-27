---
id: 890-release-notes
title: "8.9 Release notes"
sidebar_label: Release notes
description: "Release notes for 8.9, including alphas"
toc_min_heading_level: 2
toc_max_heading_level: 2
keywords: ["8.9 release notes", "release notes for 8.9", "release notes"]
page_rank: 90
---

These release notes identify the main new features included in the 8.9 minor release, including [alpha feature releases](/components/early-access/alpha/alpha-features.md).

| Minor release date | Scheduled end of maintenance | Changelog(s)                                                                | Upgrade guides |
| :----------------- | :--------------------------- | :-------------------------------------------------------------------------- | :------------- |
| 14 April 2026      | 13 October 2028              | [Patch Releases and Changelogs](#technical-changelogs-for-all-89x-releases) | -              |

:::info 8.9 resources

- See [release announcements](/reference/announcements-release-notes/890/890-announcements.md) to learn more about supported environment changes and breaking changes or deprecations.
- Refer to the [quality board](https://github.com/orgs/camunda/projects/187/views/21) for an overview of known bugs by component and severity.

:::

### Technical Changelogs for all 8.9.x releases

<details className="changelog-dropdown">
  <summary>Overview of all patch releases and their Changelogs in GitHub</summary>

<!-- RELEASE_LINKS_PLACEHOLDER -->

<!-- RELEASE_LINKS_PLACEHOLDER -->

</details>

## 8.9.0-alpha2

| Release date     | Changelog(s)                                                                                                                                                                               | Blog |
| :--------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--- |
| 09 December 2025 | <ul><li>[ Camunda 8 core ](https://github.com/camunda/camunda/releases/tag/8.9.0-alpha2)</li><li>[ Connectors ](https://github.com/camunda/connectors/releases/tag/8.9.0-alpha2)</li></ul> | -    |

### Web Modeler: Logging framework changes from Logback to Log4j2

<div class="release"><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--medium" title="This feature affects Web Modeler">Web Modeler</span></div>

<!-- https://github.com/camunda/product-hub/issues/3191 -->

Web Modeler now uses [Apache Log4j 2](https://logging.apache.org/log4j/2.x/) for logging. By aligning Web Modeler logging with the Orchestration Cluster, administrators are enabled to more easily configure and maintain Self-Managed deployments.

### Process instance migration: Ad-hoc subprocess

<div class="release"><span class="badge badge--medium" title="This feature affects Operate">Operate</span><span class="badge badge--medium" title="This feature affects Process Instance Migration">Migration</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--long" title="This feature affects SaaS">SaaS</span></div>

<!-- https://github.com/camunda/product-hub/issues/3065 -->

Process instance migration supports ad-hoc subprocess element migration.

:::note
This does not apply to the AI Agent ad-hoc subprocess. Its support will follow in upcoming alpha releases.
:::

## 8.9.0-alpha1

| Release date     | Changelog(s)                                                                                                                                                                               | Blog |
| :--------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--- |
| 13 November 2025 | <ul><li>[ Camunda 8 core ](https://github.com/camunda/camunda/releases/tag/8.9.0-alpha1)</li><li>[ Connectors ](https://github.com/camunda/connectors/releases/tag/8.9.0-alpha1)</li></ul> | -    |

### JDBC driver management for RDBMS integrations

<div class="release"><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Configuration">Configuration</span></div>

<!-- https://github.com/camunda/product-hub/issues/2742 -->

Camunda 8.9 introduces a standardized approach to JDBC driver management for RDBMS integrations in manual installations.

- A new `/driver-lib` directory separates Camunda-bundled drivers from customer-supplied ones, providing a clear and compliant structure for database connectivity.
- Drivers that Camunda can legally distribute are included by default. Customers can add and configure their own drivers (for example, Oracle JDBC).
- Configuration options allow full control, including explicit driver-class designation when required.

This change simplifies compliance and setup for RDBMS environments, ensuring consistent connectivity across PostgreSQL, Oracle, MariaDB, and H2.

### MySQL and Microsoft SQL Server secondary storage

<div class="release"><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Data">Data</span></div>

<!-- https://github.com/camunda/product-hub/issues/3043 -->

Camunda 8.9 extends RDBMS secondary storage to include MySQL and Microsoft SQL Server as additional database options for the Orchestration cluster.

- This enhancement provides greater flexibility for enterprises that depend on these databases due to policy, licensing, or ecosystem requirements, enabling smoother onboarding and infrastructure alignment.
- Zeebe’s primary execution storage remains Raft + RocksDB.

:::note
This alpha release introduces foundational support only. External configuration and Operate integration follows in upcoming alpha releases.
:::

### RDBMS secondary storage (H2, PostgreSQL, Oracle, MariaDB)

<div class="release"><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Data">Data</span></div>

<!-- https://github.com/camunda/product-hub/issues/2439 -->

Camunda 8.9 introduces RDBMS secondary storage as an alternative to Elasticsearch or OpenSearch for storing and querying process data.

This feature enables organizations to use relational databases such as H2, PostgreSQL, Oracle, or MariaDB as the secondary storage layer, reducing operational complexity for teams that do not need the scale or performance of Elasticsearch or OpenSearch and prefer an RDBMS-based solution.

Key highlights:

- **Flexible database choice:** Use relational databases instead of Elasticsearch or OpenSearch.
- **Separation of concerns:** Zeebe’s primary execution storage remains Raft + RocksDB; this update only extends the secondary storage layer.
- **Consistent APIs:** Continue using the same REST API and data format as with Elasticsearch or OpenSearch—no query or integration changes needed.
- **Simplified operations:** Leverage existing RDBMS expertise without maintaining Elasticsearch or OpenSearch clusters.

:::note
This alpha release introduces support for H2 in Camunda 8 Run only. Operate and external RDBMS configuration follows in upcoming alpha releases.
:::

### Web Modeler: RDBMS support (H2, MariaDB, MySQL)

<div class="release"><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--medium" title="This feature affects Data">Data</span><span class="badge badge--medium" title="This feature affects Web Modeler">Web Modeler</span></div>

<!-- https://github.com/camunda/product-hub/issues/3189 -->

Web Modeler now supports H2, MariaDB, and MySQL as relational database systems, aligning with the configurations supported by the Orchestration cluster.

This enhancement ensures consistency across environments, simplifies setup for administrators, and improves integration for both SaaS and Self-Managed deployments.
