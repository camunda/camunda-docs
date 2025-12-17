---
id: rdbms-support-policy
title: RDBMS version support policy
description: Defines Camunda’s official RDBMS version support policy, including supported databases, version adoption rules, and JDBC driver guidance.
---

Camunda provides an official support policy for relational databases (RDBMS) used with **Camunda 8 Self-Managed** and **Camunda 8 Run**. This policy defines supported database vendors and versions, adoption and deprecation rules, and JDBC driver guidance.

:::caution work in progress
The RDBMS support policy is a work in progress. Content may change until finalized in a future alpha or minor release.
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

- Any PostgreSQL-compatible managed service (for example, Azure Database for PostgreSQL or AWS Aurora PostgreSQL) is expected to work.
- Camunda does not test or certify individual managed service implementations.
- Compatibility and correct behavior of the managed service itself are the responsibility of the service provider.

If a managed service is fully compatible with the supported PostgreSQL versions listed above, it is considered supported from Camunda’s perspective.

:::note
This support model is similar to Camunda’s Kubernetes support policy: Camunda supports the underlying technology and versions, while cloud providers are responsible for ensuring their managed offerings remain compatible.
:::

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

## JDBC driver policy

- Camunda supports the latest vendor-compatible JDBC driver for each supported RDBMS.
- Customers are responsible for providing JDBC drivers when required (for example, Oracle or MySQL).
- Driver versions are not pinned unless a specific version is required for compatibility.
