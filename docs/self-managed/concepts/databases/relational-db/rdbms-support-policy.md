---
id: rdbms-support-policy
title: RDBMS version support policy
description: Defines Camunda’s official RDBMS version support policy, including supported databases, version adoption rules, and JDBC driver guidance.
---

Camunda provides an official support policy for relational databases (RDBMS) used with **Camunda 8 Self-Managed** and **Camunda 8 Run**. This policy defines supported database vendors and versions, adoption and deprecation rules, and JDBC driver guidance.

:::info
Camunda follows an "all LTS versions" rule for database support. All listed database versions are official LTS versions still supported by the vendor. Camunda tests against both the oldest and newest supported version of each database in CI.
:::

## Supported RDBMS

The following relational databases are officially supported when used directly as the secondary storage backend:

| Database             | Supported versions      |
| :------------------- | :---------------------- |
| PostgreSQL           | 14, 15, 16, 17, 18      |
| MariaDB              | 10.6, 10.11, 11.4, 11.8 |
| MySQL                | 8.4, 9.5                |
| Microsoft SQL Server | 2019, 2022, 2025        |
| Oracle               | 19c, 21c, 23ai          |
| H2                   | 2.x                     |

:::info
Changes to supported versions are announced in the  
[release notes](/reference/announcements-release-notes/890/890-release-notes.md).
:::

## Managed and compatible database services

Camunda supports **PostgreSQL as a database engine**, not specific managed service offerings.

This means:

- Any PostgreSQL-compatible managed service (for example, Azure Database for PostgreSQL) is expected to work.
- Camunda does not test or certify individual managed service implementations.
- Compatibility and correct behavior of the managed service itself are the responsibility of the service provider.

If a managed service is fully compatible with the supported PostgreSQL versions listed above, it is considered supported from Camunda’s perspective.

:::note
This support model is similar to Camunda’s Kubernetes support policy: Camunda supports the underlying technology and versions, while cloud providers are responsible for ensuring their managed offerings remain compatible.
:::

## PostgreSQL-compatible managed services

Camunda officially supports PostgreSQL as listed above.  
PostgreSQL-compatible managed services (for example, AWS Aurora PostgreSQL or Azure Database for PostgreSQL) are expected to work if they are fully compatible with the supported PostgreSQL versions.

However, Camunda does not provide support for service-provider-specific issues or behavior. Customers should verify compatibility with their chosen managed service provider.

## New version support

New database versions are added based on the following criteria:

- **Vendor release timeline:** The version must be officially released by the database vendor.
- **Availability window:** The version must be available at least three months before the next Camunda minor release.
- **Testing requirements:** The version must be tested and validated across relevant Camunda components.

:::note
Exceptions may be approved by engineering for strategic reasons or customer demand.
:::

## Version support deprecation and removal

Database versions are deprecated and removed based on:

- **Vendor end of support (EoS):** Versions are removed when vendor support ends or is scheduled to end within six months.
- **Migration notice:** Customers are informed in advance via release notes.
- **Exceptions:** Engineering may extend support in special cases.

## Supported JDBC driver versions

Camunda bundles JDBC drivers for most databases and requires user-supplied drivers for others.

### Bundled drivers

The following JDBC drivers are included in the Camunda application images:

| Database             | Driver                | Version | Notes                                                   |
| :------------------- | :-------------------- | :------ | :------------------------------------------------------ |
| PostgreSQL           | `postgresql`          | 42.7.8  | Included in Camunda images.                             |
| MariaDB              | `mariadb-java-client` | 3.5.7   | Included in Camunda images.                             |
| Microsoft SQL Server | `mssql-jdbc`          | 12.10.2 | Included in Camunda images (JRE 11 compatible).         |
| H2                   | `h2`                  | 2.3.232 | Included for development, testing, and evaluation only. |

### User-supplied drivers

The following databases require you to provide a compatible JDBC driver at runtime:

| Database | Driver            | Tested version | Notes                                                                                |
| :------- | :---------------- | :------------- | :----------------------------------------------------------------------------------- |
| Oracle   | `ojdbc`           | 23.7.0.25.01   | Must be provided by user. Version may be OS and architecture-specific (amd64/arm64). |
| MySQL    | `mysql-connector` | 9.5.0          | Must be provided by user.                                                            |

:::info
Driver versions are not pinned. These tested versions align with the bundled Spring Boot version (currently 3.5.9) and may change with future Spring Boot updates. We recommend using the latest driver version compatible with your database.

For deployment instructions, see [Loading JDBC drivers into pods](/self-managed/deployment/helm/configure/database/rdbms.md#loading-jdbc-drivers-into-pods).
:::

## JDBC driver policy

- Camunda supports the latest vendor-compatible JDBC driver for each supported RDBMS.
- Customers are responsible for providing JDBC drivers when required (for example, Oracle or MySQL).
- Driver versions are not pinned unless a specific version is required for compatibility.

## Component support matrix

The following table shows which Camunda components support RDBMS as secondary storage:

| Component                 | Support Status     | Notes                                                                                                                                                                                    |
| :------------------------ | :----------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Orchestration Cluster     | ✅ Fully supported | All functionality available.                                                                                                                                                             |
| Tasklist                  | ✅ Fully supported | All functionality available.                                                                                                                                                             |
| Operate                   | ⚠️ Limited         | Application starts but usage is very limited. Full support expected in future releases.                                                                                                  |
| Optimize                  | ❌ Not supported   | Out of scope for Camunda 8.9 RDBMS support. Document databases (Elasticsearch/OpenSearch) remain the only option.                                                                        |
| Web Modeler               | ✅ Fully supported | Supports PostgreSQL, MariaDB, Microsoft SQL Server, MySQL, and Oracle. See [Web Modeler database configuration](/self-managed/components/modeler/web-modeler/configuration/database.md). |
| Identity                  | ✅ Fully supported | All functionality available.                                                                                                                                                             |
| Management API (REST API) | ✅ Fully supported | All functionality available.                                                                                                                                                             |

## Known limitations

When using RDBMS as secondary storage, be aware of the following limitations:

### ID size limits

Identifiers such as process definition IDs, decision IDs, and usernames are limited to **255 characters**. Storing values significantly longer may result in errors. This behavior may change in future releases as this limitation is tracked in [camunda/camunda#36717](https://github.com/camunda/camunda/issues/36717).

### Variable comparison limits

When retrieving variables through the REST API, the following comparison operators only apply to the first 4000 characters (or 8191 characters depending on the database vendor) of large String or JSON variables:

- `equals`
- `notEquals`
- `in`
- `notIn`

The `LIKE` comparison operator is not affected by this limitation. This ensures consistent performance on large datasets.

### Collation and sorting behavior

Because collation behavior varies across database vendors, results sorted by string fields may differ between systems. Ensure your application accounts for potential sorting variations when migrating between different RDBMS vendors.

### Operate with RDBMS

Operate has limited functionality when using RDBMS as secondary storage. Use Tasklist for most operational tasks. Full Operate support is planned for future releases.
