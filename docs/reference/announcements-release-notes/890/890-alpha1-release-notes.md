---
id: 890-alpha1-release-notes
title: "8.9.0-alpha1 release notes"
sidebar_label: 8.9.0-alpha1
description: "Release notes for the 8.9. alpha 1 release"
keywords:
  [
    "8.9 release notes",
    "release notes for 8.9",
    "release notes",
    "8.9.0-alpha1",
  ]
page_rank: 90
hide_table_of_contents: true
---

import ReleaseAnnouncementsFilter from '@site/src/components/ReleaseAnnouncementsFilter';

New features and important updates included in the 8.9.0-alpha1 release.

| Release date     | Changelogs                                                                                                                                                         |
| :--------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 13 November 2025 | [ Camunda 8 core ](https://github.com/camunda/camunda/releases/tag/8.9.0-alpha1) / [ Connectors ](https://github.com/camunda/connectors/releases/tag/8.9.0-alpha1) |

<ReleaseAnnouncementsFilter>

<div className="release-announcement-row" data-type="feature" data-area="Data" data-deployment="sm">
  <div className="release-announcement-badge">
    <span className="badge badge--feature">Feature</span>
  </div>
  <div className="release-announcement-content">

#### RDBMS secondary storage (H2, PostgreSQL, Oracle, MariaDB)

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

</div>
</div>

<div className="release-announcement-row" data-type="feature" data-area="Modeler" data-deployment="sm+saas">
  <div className="release-announcement-badge">
    <span className="badge badge--feature">Feature</span>
  </div>
  <div className="release-announcement-content">

#### Web Modeler: RDBMS support (H2, MariaDB, MySQL)

<!-- https://github.com/camunda/product-hub/issues/3189 -->

Web Modeler now supports H2, MariaDB, and MySQL as relational database systems, aligning with the configurations supported by the Orchestration cluster.

This enhancement ensures consistency across environments, simplifies setup for administrators, and improves integration for both SaaS and Self-Managed deployments.

</div>
</div>

<div className="release-announcement-row" data-type="update" data-area="Configuration" data-deployment="sm">
  <div className="release-announcement-badge">
    <span className="badge badge--update">Update</span>
  </div>
  <div className="release-announcement-content">

#### JDBC driver management for RDBMS integrations

<!-- https://github.com/camunda/product-hub/issues/2742 -->

Camunda 8.9 introduces a standardized approach to JDBC driver management for RDBMS integrations in manual installations.

- A new `/driver-lib` directory separates Camunda-bundled drivers from customer-supplied ones, providing a clear and compliant structure for database connectivity.
- Drivers that Camunda can legally distribute are included by default. Customers can add and configure their own drivers (for example, Oracle JDBC).
- Configuration options allow full control, including explicit driver-class designation when required.

This change simplifies compliance and setup for RDBMS environments, ensuring consistent connectivity across PostgreSQL, Oracle, MariaDB, and H2.

</div>
</div>

<div className="release-announcement-row" data-type="update" data-area="Data" data-deployment="sm">
  <div className="release-announcement-badge">
    <span className="badge badge--update">Update</span>
  </div>
  <div className="release-announcement-content">

#### MySQL and Microsoft SQL Server secondary storage

<!-- https://github.com/camunda/product-hub/issues/3043 -->

Camunda 8.9 extends RDBMS secondary storage to include MySQL and Microsoft SQL Server as additional database options for the Orchestration cluster.

- This enhancement provides greater flexibility for enterprises that depend on these databases due to policy, licensing, or ecosystem requirements, enabling smoother onboarding and infrastructure alignment.
- Zeebe’s primary execution storage remains Raft + RocksDB.

:::note
This alpha release introduces foundational support only. External configuration and Operate integration follows in upcoming alpha releases.
:::

</div>
</div>

</ReleaseAnnouncementsFilter>
