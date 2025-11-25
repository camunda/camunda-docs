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

### Console

<div class="release"><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--medium" title="This feature affects Console">Console</span></div>

#### Bulk secrets import (SaaS)

<!-- https://github.com/camunda/product-hub/issues/3283 -->

You can now add secrets in Console by directly uploading or pasting the contents of a .env file.

- Key–value pairs are automatically parsed, validated, and added as secrets.
- This helps reduce configuration errors and copy-pasting when adding secrets.

#### Cluster description (SaaS)

<!-- https://github.com/camunda/product-hub/issues/3284 -->

You can now add a cluster description when creating a cluster or by editing the cluster settings. This helps you document context, ownership, or add operational notes without changing the cluster name.

#### Usage metrics for licence model and tenant (Self-Managed)

<!-- https://github.com/camunda/product-hub/issues/2997 -->

Self-Managed environment usage metrics now support per-tenant reporting and align with Camunda’s updated licensing model based on the number of tenants. This feature was available for Camunda 8 SaaS in the 8.8 release.

### Desktop Modeler connections

<div class="release"><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--medium" title="This feature affects Desktop Modeler">Desktop Modeler</span></div>

<!-- https://github.com/camunda/product-hub/issues/2970 -->

You can now manage your Camunda connections directly within Desktop Modeler.

- Add, edit, delete, and save multiple Camunda connections (environment profiles) within the Desktop Modeler.
- Deploy directly to saved connections, select a target environment at deployment time, or add a new environment as required.

### Data

<div class="release"><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects data storage">Data</span></div>

#### OpenSource OpenSearch datastore support

<!-- https://github.com/camunda/product-hub/issues/3009 -->

You can now use the open source OpenSearch project as a datastore for your self-managed Camunda deployments. This allows you to run a fully open source observability stack without relying on Elasticsearch.

For configuration instructions, see the updated Helm chart values and compatibility matrix.

#### RDBMS version support policy

<!-- https://github.com/camunda/product-hub/issues/2654 -->

A new Camunda 8 Relational Database Management System (RDBMS) support policy provides information about:

- Which database versions are officially supported
- The process for adopting newly released versions
- Timelines for phasing out older versions.

#### SQL and Liquibase database scripts

SQL and Liquibase scripts are provided for all Camunda-supported databases.

- These scripts include database and schema creation, drop, and upgrade routines, and follow best practices for each supported database type and version.
- The full script package is distributed as part of the official Camunda distribution, available via GitHub or Artifactory.

<!-- See the documentation and guides will instruct both DBAs and developers on script usage, version compatibility, and recommended JDBC driver selection. -->

### Global user task listeners

<div class="release"><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Tasklist">Tasklist</span></div>

<!-- https://github.com/camunda/product-hub/issues/2586 -->

Configuration-based global user task listeners are now available for Self-Managed deployments.

- Administrators can define cluster-wide listeners using configuration files or environment variables. This ensures listeners are applied consistently from cluster startup and preserved across backup and restore operations.
- All user task lifecycle events emit payloads containing full variable context and metadata, enabling standardized integrations across all processes.

### Process instance migration supports ad-hoc sub-processes

<div class="release"><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Tasklist">Tasklist</span></div>

<!-- https://github.com/camunda/product-hub/issues/3065 -->

Camunda 8 now supports the migration of process instances that include ad-hoc subprocesses, covering both single-instance and multi-instance (parallel and sequential) variants.

- Safely migrate running instances, update AI agent flows, and modernize process definitions without losing execution state.
- Implement flexible, agent-driven orchestration and faster iteration on live automations.

### Web Modeler

<div class="release"><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--medium" title="This feature affects Web Modeler">Web Modeler</span></div>

#### IP Egress configuration

<!-- https://github.com/camunda/product-hub/issues/3131 -->

#### Logging framework changes from Logback to Log4j2

<!-- https://github.com/camunda/product-hub/issues/3191 -->

Web Modeler now uses [Apache Log4j 2](https://logging.apache.org/log4j/2.x/) for logging. Aligning Web Modeler logging with the Orchestration Cluster allows administrators to more easily configure and maintain Self-Managed deployments.

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
