---
id: rdbms-support-policy
title: RDBMS version support policy
description: Defines Camunda’s official RDBMS support policy, including supported databases, LTS-based version rules, managed PostgreSQL guidance, JDBC driver expectations, and component compatibility.
---

Use this page to confirm which relational databases and versions Camunda supports for RDBMS usage with Camunda 8, including lifecycle rules, managed PostgreSQL guidance, JDBC driver responsibilities, and component compatibility.

:::caution work in progress
The RDBMS support policy is a work in progress. Content may change until finalized in a future alpha or minor release.
:::

## Scope and applicability

This policy applies to:

- **Camunda 8 Self-Managed** deployments.
- **Camunda 8 Run**, where components support using an RDBMS as secondary storage.

It covers relational databases used for:

- [Secondary storage for the Orchestration Cluster](/self-managed/concepts/secondary-storage/index.md)
- Tasklist and Operate storage (where supported for a given release)
- [Web Modeler](/self-managed/components/modeler/web-modeler/configuration/database.md)

:::info
Camunda follows an "all LTS versions" rule for database support. All listed database versions are vendor-supported LTS releases. Camunda tests against both the oldest and newest supported version of each database in CI.
:::

## Supported RDBMS

The following relational databases are officially supported:

| Database             | Supported versions      |
| :------------------- | :---------------------- |
| PostgreSQL           | 14, 15, 16, 17, 18      |
| MariaDB              | 10.6, 10.11, 11.4, 11.8 |
| MySQL                | 8.4, 9.5                |
| Microsoft SQL Server | 2019, 2022, 2025        |
| Oracle               | 19c, 21c, 23ai          |
| H2                   | 2.x                     |

:::info
Changes to supported versions are announced in the [release notes](/reference/announcements-release-notes/890/890-release-notes.md).
:::

### Recommended database versions

For new deployments, standardize on **one of the latest two supported versions** of a given database whenever possible. Older supported versions remain valid for existing deployments but are not recommended for new deployments.

## Managed and compatible PostgreSQL services

Camunda supports **PostgreSQL as a database engine**, not individual managed service implementations.

PostgreSQL-compatible managed services (for example, AWS Aurora PostgreSQL or Azure Database for PostgreSQL) are expected to work if they are fully compatible with the supported PostgreSQL versions listed above.

This means:

- Camunda does not test or certify individual managed service implementations.
- Service-provider-specific operational behavior and service characteristics remain the responsibility of the service provider.
- If a managed service is fully compatible with a supported PostgreSQL version, it is considered supported from Camunda’s perspective.

:::note
This support model is similar to Camunda’s Kubernetes support policy: Camunda supports the underlying technology and versions, while cloud providers are responsible for ensuring their managed offerings remain compatible.
:::

## New version support

New database versions are added based on the following criteria:

- Vendor release: The version must be officially released by the database vendor.
- Availability window: The version must be available at least three months before the next Camunda minor release.
- Validation: The version must be tested and validated across relevant Camunda components.

If the availability window is missed, support is deferred to a subsequent minor release.

:::note
Exceptions may be approved by engineering for strategic reasons or customer demand.
:::

## Version deprecation and removal

Versions are deprecated and removed using the following rules:

- Vendor end of support (EoS): Versions are deprecated when vendor support has ended or is scheduled to end within six months.
- Removal: Deprecated versions may be removed in a subsequent Camunda minor release once vendor support has ended.
- Advance notice: Deprecations and removals are communicated in advance via release notes.
- Exceptions: Support may be extended in exceptional cases, but any extension is explicitly documented and time-bound.

Camunda may remove support for a version if it contains known issues that prevent reliable operation.

## Database-specific support notes

### PostgreSQL

Camunda supports multiple active PostgreSQL major versions concurrently based on the “all LTS versions” rule.

### MariaDB

Camunda supports **MariaDB LTS releases only**.

### MySQL

Camunda supports **MySQL LTS releases only**.

### Microsoft SQL Server

Camunda supports SQL Server versions that are in mainstream or extended vendor support.

### Oracle Database

Camunda supports **Oracle LTS releases**.

:::note
Oracle JDBC drivers are proprietary and must be provided by you at runtime.
:::

### H2

H2 is supported for **development, testing, and evaluation only**. Production use is not recommended.

## Supported JDBC driver versions

Camunda bundles JDBC drivers for databases where redistribution is permitted and expects you to provide drivers where licensing or distribution constraints apply (for example, Oracle).

Driver versions are not pinned as a formal support guarantee unless explicitly stated. The exact bundled and tested versions can change with dependency updates (for example, Spring Boot updates).

### Bundled drivers

The following JDBC drivers are included in the Camunda application images:

| Database             | Driver artifact                        | Version       | Notes                                             |
| :------------------- | :------------------------------------- | :------------ | :------------------------------------------------ |
| PostgreSQL           | `org.postgresql:postgresql`            | 42.7.8        | Bundled in Camunda images.                        |
| MariaDB              | `org.mariadb.jdbc:mariadb-java-client` | 3.5.7         | Bundled in Camunda images.                        |
| Microsoft SQL Server | `com.microsoft.sqlserver:mssql-jdbc`   | 12.10.2.jre11 | Bundled in Camunda images (JRE 11 compatible).    |
| H2                   | `com.h2database:h2`                    | 2.3.232       | Bundled for development, testing, and evaluation. |

### User-supplied drivers

The following databases require you to provide a compatible JDBC driver at runtime:

| Database | Driver artifact                   | Tested version | Notes                                                                   |
| :------- | :-------------------------------- | :------------- | :---------------------------------------------------------------------- |
| Oracle   | `com.oracle.database.jdbc:ojdbc*` | 23.7.0.25.01   | Must be provided by you. May be OS/architecture-specific (amd64/arm64). |
| MySQL    | `com.mysql:mysql-connector-j`     | 9.5.0          | Must be provided by you.                                                |

:::info
Camunda runs CI validation against the oldest and newest supported database version for each vendor. A single driver version is expected to work across the supported database versions, but Camunda does not pin driver versions unless required for compatibility or stability.

For deployment instructions, see [loading JDBC drivers into pods](/self-managed/deployment/helm/configure/database/rdbms.md#loading-jdbc-drivers-into-pods).
:::

## JDBC driver policy

- Camunda supports the latest vendor-compatible JDBC driver for each supported RDBMS.
- You are responsible for providing JDBC drivers when required (for example, Oracle or MySQL).
- Driver versions are not pinned unless a specific version is required for compatibility or stability reasons.

## Component support matrix

This table shows which Camunda components support RDBMS usage (including RDBMS as secondary storage where applicable):

| Component                     | Support status     | Notes                                                                                                             |
| :---------------------------- | :----------------- | :---------------------------------------------------------------------------------------------------------------- |
| Orchestration Cluster (Zeebe) | ✅ Fully supported | Supports RDBMS as secondary storage.                                                                              |
| Tasklist                      | ✅ Fully supported | All functionality available.                                                                                      |
| Operate                       | ⚠️ Limited         | Under active development. Functionality is limited in 8.9 alpha.                                                  |
| Optimize                      | ❌ Not supported   | Out of scope for Camunda 8.9 RDBMS support.                                                                       |
| Web Modeler                   | ✅ Fully supported | See [Web Modeler database configuration](/self-managed/components/modeler/web-modeler/configuration/database.md). |
| Identity                      | ✅ Fully supported | All functionality available.                                                                                      |
| Management API (REST API)     | ✅ Fully supported | All functionality available.                                                                                      |

:::note
"Orchestration Cluster (Zeebe)" refers to the orchestration runtime components. UI products are listed separately because their RDBMS support and maturity can differ by release.
:::

## Known limitations

When using RDBMS (including as secondary storage), be aware of the following limitations:

### ID size limits

Identifiers such as process definition IDs, decision IDs, and usernames are limited to **255 characters**. Storing significantly longer values may result in errors. This behavior may change in future releases (tracked in [#36717](https://github.com/camunda/camunda/issues/36717)).

### Variable comparison limits

When retrieving variables through the REST API, the following comparison operators only apply to the first **4000 characters** (or **8191 characters**, depending on the database vendor) of large String or JSON variables:

- `equals`
- `notEquals`
- `in`
- `notIn`

The `LIKE` comparison operator is not affected by this limitation.

### Collation and sorting behavior

Because collation behavior varies across database vendors, results sorted by string fields may differ between systems. Ensure your application accounts for potential sorting variations when migrating between different RDBMS vendors.

### Operate with RDBMS

Operate support is limited when using RDBMS in Camunda 8.9 alpha. Operate RDBMS support is under active development and limitations are expected to be removed in a future minor release.
