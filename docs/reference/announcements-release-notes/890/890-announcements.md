---
id: 890-announcements
title: "Release announcements"
sidebar_label: Release announcements
description: "Supported environment changes and breaking changes or deprecations for the Camunda 8.9 release."
toc_max_heading_level: 3
hide_table_of_contents: true
---

import DeployDiagramImg from '../../img/deploy-diagram-modal.png';
import ReleaseAnnouncementsFilter from '@site/src/components/ReleaseAnnouncementsFilter';

Key changes (for example, deprecations and breaking changes) and supported environment changes for the Camunda 8.9 release.

<ReleaseAnnouncementsFilter>

<div className="release-announcement-row" data-type="breaking-change" data-area="Supported environments" data-deployment="sm+saas">
  <div className="release-announcement-badge">
    <span className="badge badge--breaking-change">Breaking change</span>
  </div>
  <div className="release-announcement-content">

### Elasticsearch minimum version raised to 8.18.6+

The minimum supported Elasticsearch version for the Orchestration cluster and Optimize is now 8.18.6 (previously 8.17.3).

- This aligns with the updated `ELASTICSEARCH_VERSION=8.18.6` default used by Camunda 8 Run, Docker Compose, and Helm templates.
- You should upgrade your Elasticsearch/OpenSearch clusters before moving to Camunda 8.9 to avoid compatibility issues.

<p className="link-arrow">[Supported environments](/reference/supported-environments.md)</p>

</div>
</div>

<div className="release-announcement-row" data-type="announcement" data-area="Supported environments" data-deployment="saas">
  <div className="release-announcement-badge">
    <span className="badge badge--announcement">Announcement</span>
  </div>
  <div className="release-announcement-content">

### AWS Paris region added

Camunda 8.9 adds support for the AWS Paris region in Camunda 8 SaaS.

<p className="link-arrow">[Supported AWS regions](/components/saas/regions.md#amazon-web-services-aws-regions)</p>

</div>
</div>

<div className="release-announcement-row" data-type="announcement" data-area="Supported environments" data-deployment="sm+saas">
  <div className="release-announcement-badge">
    <span className="badge badge--announcement">Announcement</span>
  </div>
  <div className="release-announcement-content">

### OpenJDK 25 support

Camunda 8.9 adds certification for OpenJDK 25 across the Orchestration Cluster, Connectors, Optimize, and supporting tooling. You can now run Self-Managed deployments on OpenJDK 21–25 without additional configuration changes.

</div>
</div>

<div className="release-announcement-row" data-type="breaking-change" data-area="Agentic orchestration" data-deployment="sm+saas">
  <div className="release-announcement-badge">
    <span className="badge badge--breaking-change">Breaking change</span>
  </div>
  <div className="release-announcement-content">

### MCP Client and MCP Remote Client connectors

Breaking changes are [introduced in alpha 2](/reference/announcements-release-notes/890/890-release-notes.md#890-alpha2) to the element templates and the runtime configuration of the MCP Client.

To resolve this, you must update both the MCP Client and MCP Remote Client connectors to use the element template version 1.

:::info
To learn more, see the [MCP](/components/early-access/alpha/mcp-client/mcp-client.md) documentation.
:::

</div>
</div>

<div className="release-announcement-row" data-type="breaking-change" data-area="APIs &amp; tools" data-deployment="sm+saas">
  <div className="release-announcement-badge">
    <span className="badge badge--breaking-change">Breaking change</span>
  </div>
  <div className="release-announcement-content">

### Camunda Spring Boot Starter now requires Spring Boot 4.0.x

Starting with 8.9.0-alpha3, the [Camunda Spring Boot Starter](../../../apis-tools/camunda-spring-boot-starter/getting-started.md) requires Spring Boot 4.0.x.

To remain compatible, migrate your application to Spring Boot 4.0.x.

This change aligns with the Spring Boot support policy, as OSS support for Spring Boot 3.x ends in June 2026. See the [Spring Boot support timeline](https://spring.io/projects/spring-boot#support).

</div>
</div>

<div className="release-announcement-row" data-type="breaking-change" data-area="APIs &amp; tools" data-deployment="sm+saas">
  <div className="release-announcement-badge">
    <span className="badge badge--breaking-change">Breaking change</span>
  </div>
  <div className="release-announcement-content">

### Resource deletion endpoint now has response body

Starting with 8.9.0-alpha4, the resource deletion endpoint `POST /resources/{resourceKey}/deletion` in the [Orchestration Cluster API](../../../apis-tools/orchestration-cluster-api-rest/specifications/delete-resource.api.mdx) now returns a response body. The Camunda Java client has been updated to support this change.

</div>
</div>

<div className="release-announcement-row" data-type="deprecated" data-area="Connectors" data-deployment="sm+saas">
  <div className="release-announcement-badge">
    <span className="badge badge--deprecated">Deprecated</span>
  </div>
  <div className="release-announcement-content">

### Deprecated: Operate Connector

The Operate Connector is deprecated, following the deprecation of the Operate API in Camunda 8.9 (see [Deprecated: Operate and Tasklist v1 REST APIs](/reference/announcements-release-notes/880/880-announcements.md#deprecated-operate-and-tasklist-v1-rest-apis)).

Going forward, you can use the [Orchestration Cluster REST API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md) via the [REST Connector](/components/connectors/protocol/rest.md).

</div>
</div>

<div className="release-announcement-row" data-type="announcement" data-area="Connectors" data-deployment="sm+saas">
  <div className="release-announcement-badge">
    <span className="badge badge--announcement">Announcement</span>
  </div>
  <div className="release-announcement-content">

### Virtual threads support

Camunda 8.9 provides support for virtual threads in the connector runtime. Virtual threads are enabled by default for outbound connectors.

See [connector runtime performance](/self-managed/components/connectors/performance.md) for more information on optimizing connector performance with virtual threads.

:::info
To learn more, see the [8.9.0-alpha2 release notes](/reference/announcements-release-notes/890/890-release-notes.md).
:::

</div>
</div>

<div className="release-announcement-row" data-type="breaking-change" data-area="Data" data-deployment="sm+saas">
  <div className="release-announcement-badge">
    <span className="badge badge--breaking-change">Breaking change</span>
  </div>
  <div className="release-announcement-content">

### Camunda 8 Run with H2 as the default secondary data storage

Camunda 8 Run now uses H2 as the default secondary data storage, instead of Elasticsearch.

When running with H2 (or any other RDBMS) as secondary storage, Camunda is only compatible with the V2 API. As a result, some features are not available in Operate and Tasklist. See [Migrate to the V2 Orchestration Cluster API](/apis-tools/migration-manuals/migrate-to-camunda-api.md) for more details.

To continue using features exclusive to the V1 API, you must run Camunda with Elasticsearch and switch back to V1 mode.

:::info
To learn more, see the [8.9.0-alpha3 release notes](/reference/announcements-release-notes/890/890-release-notes.md#use-h2-for-data-storage).
:::

</div>
</div>

<div className="release-announcement-row" data-type="announcement" data-area="Data" data-deployment="sm+saas">
  <div className="release-announcement-badge">
    <span className="badge badge--announcement">Announcement</span>
  </div>
  <div className="release-announcement-content">

### Amazon Aurora secondary storage

Camunda 8.9 introduces Amazon Aurora as a secondary data store for orchestration clusters.

:::info
To learn more, see the [8.9.0-alpha3 release notes](/reference/announcements-release-notes/890/890-release-notes.md#use-amazon-aurora-for-secondary-storage).
:::

</div>
</div>

<div className="release-announcement-row" data-type="announcement" data-area="Data" data-deployment="sm+saas">
  <div className="release-announcement-badge">
    <span className="badge badge--announcement">Announcement</span>
  </div>
  <div className="release-announcement-content">

### MySQL and Microsoft SQL Server secondary storage

Camunda 8.9 extends RDBMS secondary storage to include MySQL and Microsoft SQL Server as additional options for the Orchestration cluster.

:::info
To learn more, see the [8.9.0-alpha1 release notes](/reference/announcements-release-notes/890/890-release-notes.md#mysql-and-microsoft-sql-server-secondary-storage).
:::

</div>
</div>

<div className="release-announcement-row" data-type="announcement" data-area="Data" data-deployment="sm+saas">
  <div className="release-announcement-badge">
    <span className="badge badge--announcement">Announcement</span>
  </div>
  <div className="release-announcement-content">

### RDBMS secondary storage

Camunda 8.9 introduces optional RDBMS secondary storage as an alternative to Elasticsearch or OpenSearch.

This enables teams to use relational databases such as H2, PostgreSQL, Oracle, or MariaDB for storing and querying process data, reducing operational complexity for non-high-performance use cases.

:::info
To learn more, see the [8.9.0-alpha1 release notes](/reference/announcements-release-notes/890/890-release-notes.md#rdbms-secondary-storage-h2-postgresql-oracle-mariadb).
:::

</div>
</div>

<div className="release-announcement-row" data-type="breaking-change" data-area="Deployment" data-deployment="sm+saas">
  <div className="release-announcement-badge">
    <span className="badge badge--breaking-change">Breaking change</span>
  </div>
  <div className="release-announcement-content">

### Elasticsearch subchart no longer enabled by default

Previously, the Elasticsearch subchart was enabled by default. To use OpenSearch, you would need to disable Elasticsearch and enable OpenSearch.

With the inclusion of RDBMS, you must now specify the secondary storage you want to enable and use.

:::note
To continue using Elasticsearch provided as a subchart, you must add `global.elasticsearch.enabled: true` and `elasticsearch.enabled: true` to your `values.yaml`.
:::

</div>
</div>

<div className="release-announcement-row" data-type="announcement" data-area="Deployment" data-deployment="sm+saas">
  <div className="release-announcement-badge">
    <span className="badge badge--announcement">Announcement</span>
  </div>
  <div className="release-announcement-content">

### Cluster variables supported

Camunda 8.9 introduces cluster variables, letting you centrally manage configuration across your cluster.

:::info
To learn more, see the [8.9.0-alpha3 release notes](/reference/announcements-release-notes/890/890-release-notes.md#manage-configuration-with-cluster-variables).
:::

</div>
</div>

<div className="release-announcement-row" data-type="announcement" data-area="Deployment" data-deployment="sm+saas">
  <div className="release-announcement-badge">
    <span className="badge badge--announcement">Announcement</span>
  </div>
  <div className="release-announcement-content">

### Helm chart `values.yaml` options for RDBMS

Camunda 8.9 adds RDBMS configuration options to the Helm chart's `values.yaml` file. See `orchestration.data.secondaryStorage.rdbms` for details.

- Postgresql is currently supported.
- Other RDBMS databases like OracleDB and MariaDB have limited functionality now, but will be fully supported in future alpha releases.
- Operate is not yet supported with RDBMS until alpha3.

</div>
</div>

<div className="release-announcement-row" data-type="announcement" data-area="Deployment" data-deployment="sm+saas">
  <div className="release-announcement-badge">
    <span className="badge badge--announcement">Announcement</span>
  </div>
  <div className="release-announcement-content">

### Standardized JDBC driver management for RDBMS

Camunda 8.9 adds a standardized JDBC driver management system for manual installations.

- A new `/driver-lib` directory separates Camunda-bundled drivers from customer-supplied ones.
- Customers can add and configure their own drivers (for example, Oracle JDBC), while maintaining full compliance and version control.

:::info
To learn more, see the [8.9.0-alpha1 release notes](/reference/announcements-release-notes/890/890-release-notes.md#jdbc-driver-management-for-rdbms-integrations).
:::

</div>
</div>

<div className="release-announcement-row" data-type="breaking-change" data-area="Modeler" data-deployment="sm+saas">
  <div className="release-announcement-badge">
    <span className="badge badge--breaking-change">Breaking change</span>
  </div>
  <div className="release-announcement-content">

### Web Modeler: Default logging format changed

By default, Web Modeler's `restapi` component now logs in a simple, readable format to the console instead of `JSON`.

This change aligns with the current Orchestration Cluster logging default as defined in its [logging configuration](/self-managed/components/orchestration-cluster/core-settings/configuration/logging.md#pattern-layout-format).

:::info
To learn more, see the [8.9.0-alpha2 release notes](/reference/announcements-release-notes/890/890-release-notes.md#web-modeler-logging-framework-changes-from-logback-to-log4j2).
:::

</div>
</div>

<div className="release-announcement-row" data-type="breaking-change" data-area="Modeler" data-deployment="sm+saas">
  <div className="release-announcement-badge">
    <span className="badge badge--breaking-change">Breaking change</span>
  </div>
  <div className="release-announcement-content">

### Web Modeler: Embedded web server changed from Undertow to Tomcat

Web Modeler now uses [Apache Tomcat](https://tomcat.apache.org/) as an embedded web server instead of [Undertow](https://undertow.io/). This aligns with the Orchestration Cluster.

This enhancement ensures consistency across environments and simplifies setup for administrators.

:::info
To learn more, see the [8.9.0-alpha2 release notes](/reference/announcements-release-notes/890/890-release-notes.md).
:::

</div>
</div>

<div className="release-announcement-row" data-type="breaking-change" data-area="Modeler" data-deployment="sm+saas">
  <div className="release-announcement-badge">
    <span className="badge badge--breaking-change">Breaking change</span>
  </div>
  <div className="release-announcement-content">

### Web Modeler: Invite collaborators who haven't logged in before

The behavior across OIDC providers is now aligned. Invitation suggestions only include users who have logged in at least once. This is a breaking change for Web Modeler installations using Keycloak as the OIDC provider. Before 8.9, Keycloak returned all organization users, including those who had never logged in.

You can now invite users who have not yet logged in to Web Modeler by entering their email address. They will appear as “invited” in the collaborators panel. After their first log in, they will be added to the project automatically.

Inviting the entire organization only applies to users who have logged in at least once.

:::info
To learn more, see the [8.9.0-alpha3 release notes](/reference/announcements-release-notes/890/890-release-notes.md).
:::

</div>
</div>

<div className="release-announcement-row" data-type="breaking-change" data-area="Modeler" data-deployment="sm+saas">
  <div className="release-announcement-badge">
    <span className="badge badge--breaking-change">Breaking change</span>
  </div>
  <div className="release-announcement-content">

### Web Modeler: JSON format changes

When using JSON as the output for the logs the structure has slightly changed:

- `logger`: This field is now renamed to `loggerName`.
- `thread`: Previously represented the name of the thread. Now we have an object named `threadContext` with a field `name` that has this value.

See [Logging documentation](/self-managed/components/modeler/web-modeler/configuration/logging.md#json-structure) for more information.

:::info
To learn more, see the [8.9.0-alpha2 release notes](/reference/announcements-release-notes/890/890-release-notes.md).
:::

</div>
</div>

<div className="release-announcement-row" data-type="breaking-change" data-area="Modeler" data-deployment="sm+saas">
  <div className="release-announcement-badge">
    <span className="badge badge--breaking-change">Breaking change</span>
  </div>
  <div className="release-announcement-content">

### Web Modeler: Logging framework changed from Logback to Apache Log4j 2

Web Modeler now uses [Apache Log4j 2](https://logging.apache.org/log4j/2.x/) for logging, in alignment with what the Orchestration Cluster uses.

This enhancement ensures consistency across environments and simplifies setup for administrators.

:::info
To learn more, see the [8.9.0-alpha2 release notes](/reference/announcements-release-notes/890/890-release-notes.md#web-modeler-logging-framework-changes-from-logback-to-log4j2).
:::

</div>
</div>

<div className="release-announcement-row" data-type="announcement" data-area="Modeler" data-deployment="sm+saas">
  <div className="release-announcement-badge">
    <span className="badge badge--announcement">Announcement</span>
  </div>
  <div className="release-announcement-content">

### Web Modeler: RDBMS support (H2, MariaDB, MySQL)

Camunda 8.9 adds support for H2, MariaDB, and MySQL as relational databases for Web Modeler.

This enhancement aligns Web Modeler’s database configuration with the Orchestration cluster, ensuring consistent setup and improved integration across environments.

:::info
To learn more, see the [8.9.0-alpha1 release notes](/reference/announcements-release-notes/890/890-release-notes.md#web-modeler-rdbms-support-h2-mariadb-mysql).
:::

</div>
</div>

</ReleaseAnnouncementsFilter>
