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

### Console: Usage metrics for licence model and tenant (Self-Managed)

<!-- https://github.com/camunda/product-hub/issues/2997 -->

Self-Managed environment usage metrics now support per-tenant reporting and align with Camunda’s updated licensing model based on the number of tenants. This feature was available for Camunda 8 SaaS in the 8.8 release.

### Console: SaaS Console: Bulk import of secrets

<!-- https://github.com/camunda/product-hub/issues/3283 -->

You can now paste the full content of a .env file or upload it directly when adding secrets in Console. The system automatically parses key–value pairs, validates them, and populates the secrets list. This eliminates repetitive copy-paste steps and reduces configuration errors. Try it when adding secrets to your cluster.

### Console: SaaS Console: Quick Win. Add cluster description field

<!-- https://github.com/camunda/product-hub/issues/3284 -->

You can now add an optional description to your cluster. This helps you document context, ownership, or operational notes without changing the cluster name. Add the description during cluster creation or update it later in Cluster Settings.

### Desktop modeler managing connections

<!-- https://github.com/camunda/product-hub/issues/2970 -->

Connection Management: Users can add, edit, delete, and save multiple Camunda connections (environment profiles), keeping credentials and settings yet accessible within the Modeler.

Streamlined Deployment Workflow: Users can deploy to saved connections directly, select a target environment at deployment time, or add a new one as needed—all within a unified, user-friendly interface.

### Define support policy for RDBMS versions

<!-- https://github.com/camunda/product-hub/issues/2654 -->

Camunda 8 now includes a formal RDBMS Support Policy to guide both existing and prospective users. This policy clarifies which database versions are officially supported, the process for adopting newly released versions, and timelines for phasing out older versions. By adopting this policy, customers gain visibility into upgrade schedules while internal teams reduce the risk of unplanned releases or abrupt shifts in supported technologies.

### Global User Task Listeners

<!-- https://github.com/camunda/product-hub/issues/2586 -->

Camunda 8.9 introduces configuration-based Global User Task Listeners for Self-Managed deployments. Administrators can define cluster-wide listeners using configuration files or environment variables, ensuring they are applied consistently from cluster startup and preserved across backup and restore operations. All user task lifecycle events emit payloads containing full variable context and metadata, enabling standardized integrations across all processes.

### Process Instance Migration: Support Migration for Ad-Hoc Subprocess Instances

<!-- https://github.com/camunda/product-hub/issues/3065 -->

Camunda 8 now supports migration of process instances that include ad-hoc subprocesses, covering both single-instance and multi-instance (parallel and sequential) variants. With this enhancement, users can safely migrate running instances, update AI agent flows, and modernize process definitions without losing execution state. This unlocks flexible, agent-driven orchestration and faster iteration on live automations.

### Support for OpenSource OpenSearch datastore

<!-- https://github.com/camunda/product-hub/issues/3009 -->

OpenSearch support for Camunda OSS

You can now use the open-source OpenSearch project as the backing datastore in your self-managed Camunda deployments. This feature enables you to run a fully open-source observability stack without relying on ElasticSearch. For configuration instructions, see the updated Helm chart values and compatibility matrix.

### Web Modeler IP Egress configuration

<!-- https://github.com/camunda/product-hub/issues/3131 -->

### SQL and Liquibase scripts for supported Databases

With this release, a comprehensive set of SQL and Liquibase scripts will be provided for all Camunda-supported databases. These scripts include database and schema creation, drop, and upgrade routines, following best practices for each supported database type and version. The full script package will be distributed as part of the official Camunda distribution, available via GitHub or Artifactory. Documentation and guides will instruct both DBAs and developers on script usage, version compatibility, and recommended JDBC driver selection.

### Web Modeler: Logging framework changes from Logback to Log4j2

<div class="release"><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--medium" title="This feature affects Web Modeler">Web Modeler</span></div>

<!-- https://github.com/camunda/product-hub/issues/3191 -->

Web Modeler now uses [Apache Log4j 2](https://logging.apache.org/log4j/2.x/) for logging. By aligning Web Modeler logging with the Orchestration Cluster, administrators are enabled to more easily configure and maintain Self-Managed deployments.

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
