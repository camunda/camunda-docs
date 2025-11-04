---
id: 890-announcements
title: "8.9 Release announcements"
sidebar_label: Release announcements
description: "Supported environment changes and breaking changes or deprecations for the Camunda 8.9 release."
toc_max_heading_level: 3
---

import DeployDiagramImg from '../../img/deploy-diagram-modal.png';

Supported environment changes and breaking changes or deprecations for the Camunda 8.9 release.

| Minor release date | Scheduled end of maintenance | Release notes                                                                        | Release blog | Upgrade guides |
| ------------------ | ---------------------------- | ------------------------------------------------------------------------------------ | ------------ | -------------- |
| 14 April 2026      | 13 October 2028              | [8.9 release notes](/reference/announcements-release-notes/890/890-release-notes.md) | -            | -              |

:::info 8.9 resources

- See [release notes](/reference/announcements-release-notes/890/890-release-notes.md) to learn more about new features and enhancements.
- Refer to the [quality board](https://github.com/orgs/camunda/projects/187/views/15) for an overview of known bugs by component and severity.

:::

## Key changes

### Data

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--new">New</span>
</div>
<div className="release-announcement-content">

#### RDBMS secondary storage

Camunda 8.9 introduces optional RDBMS secondary storage as an alternative to Elasticsearch or OpenSearch.  
This enables teams to use relational databases such as H2, PostgreSQL, Oracle, or MariaDB for storing and querying process data, reducing operational complexity for non-high-performance use cases.

See the [8.9.0-alpha1 release notes](/reference/announcements-release-notes/890/890-release-notes.md#rdbms-secondary-storage-h2-postgresql-oracle-mariadb-self-manageddata) for details.

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--new">New</span>
</div>
<div className="release-announcement-content">

#### MySQL and Microsoft SQL Server secondary storage support

Camunda 8.9 extends RDBMS secondary storage to include MySQL and Microsoft SQL Server as additional options for the orchestration cluster.

See the [8.9.0-alpha1 release notes](/reference/announcements-release-notes/890/890-release-notes.md#mysql-and-microsoft-sql-server-secondary-storage) for details.

</div>
</div>

### Deployment

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--new">New</span>
</div>
<div className="release-announcement-content">

#### Standardized JDBC driver management for RDBMS

Camunda 8.9 adds a standardized JDBC driver management system for manual installations.  
A new `/driver-lib` directory separates Camunda-bundled drivers from customer-supplied ones.  
Users can now easily add or replace drivers (for example, Oracle JDBC) while maintaining full compliance and version control.

See the [8.9.0-alpha1 release notes](/reference/announcements-release-notes/890/890-release-notes.md#jdbc-driver-management-for-rdbms-integrations) for details.

</div>
</div>
