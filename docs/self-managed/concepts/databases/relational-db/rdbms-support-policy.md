---
id: rdbms-support-policy
title: RDBMS version support policy
description: Defines Camunda’s official RDBMS version support policy, including supported databases, version adoption rules, and JDBC driver guidance.
---

Camunda provides an official support policy for relational databases (RDBMS) used with **Camunda 8 Self-Managed**. This policy defines supported database vendors and versions, how new versions are adopted, how versions are deprecated and removed, how managed PostgreSQL services are treated, and how JDBC drivers are supported.

## Scope and applicability

This policy applies to **Camunda 8 Self-Managed** deployments.

It covers relational databases used for:

- [the secondary storage for the Orchestration Cluster](/self-managed/concepts/secondary-storage/index.md),
- [Web Modeler](/self-managed/components/modeler/web-modeler/configuration/database.md).

## Supported RDBMS

The following relational databases are officially supported:

| Database                 | Supported versions              |
| ------------------------ | ------------------------------- |
| PostgreSQL               | 14 (deprecated), 15, 16, 17, 18 |
| Amazon Aurora PostgreSQL | 14 (deprecated), 15, 16, 17     |
| MariaDB                  | 10.11, 11.4, 11.8               |
| MySQL                    | 8.4                             |
| Microsoft SQL Server     | 2019 (deprecated), 2022, 2025   |
| Oracle                   | 19c, 23ai                       |
| H2                       | 2.3, 2.4                        |

:::info
Changes to supported versions are announced in the  
[release notes](/reference/announcements-release-notes/890/890-release-notes.md).
:::

Versions marked as **deprecated** remain supported but have reached, or are scheduled to reach, vendor end-of-support within six months. Customers are encouraged to plan upgrades to newer supported versions.

## Recommended database versions

While multiple database versions may be supported at any given time, Camunda recommends that **new deployments** standardize on **one of the latest two supported versions** of a given database whenever possible. Older supported versions remain valid for existing deployments but are not recommended for new deployments.

## New version support

New database versions are added based on the following criteria:

- **Vendor release:** The version must be officially released by the database vendor.
- **Availability window:** The version must be available at least three months before the next Camunda minor release.
- **Validation:** The version must be tested and validated across relevant Camunda components.

If the availability window is missed, support is deferred to a subsequent minor release.

## Version deprecation and removal

- **Vendor end-of-support:** Database versions are **when** vendor support has ended or is scheduled to end within six months.
- **Removal:** Deprecated versions may be removed in a subsequent Camunda minor release once vendor support has ended.
- **Advance notice:** Deprecations and removals are communicated in advance via release notes.
- **Exceptions:** Support may be extended in exceptional cases, but any extension is explicitly documented and time-bound. Camunda can remove support for a particular version if it contains known issues that prevent reliable operation. (ike CSV, critical defect etc.).

## Managed PostgreSQL services

Camunda supports PostgreSQL as a database engine, not individual managed service implementations.

Managed PostgreSQL services are supported when:

- they are fully compatible with the PostgreSQL versions listed in this policy, and
- the service provider guarantees compatibility and support for those versions.

Provider-specific operational behavior and service characteristics remain the responsibility of the service provider.

Amazon Aurora PostgreSQL is listed separately because it is explicitly tested by Camunda, while other managed PostgreSQL services are supported based on compatibility guarantees provided by the service provider.

## Database-specific support notes

### PostgreSQL

Camunda follows PostgreSQL’s regular release cadence and supports multiple active major versions concurrently.

### MariaDB

Camunda supports **MariaDB Long Term Support (LTS) releases only**.

- Innovation (non-LTS) releases are not supported.
- LTS versions are deprecated as they approach vendor end-of-support.

### MySQL

Camunda supports **MySQL LTS releases only**.

- Short-lived innovation releases are intentionally excluded due to limited vendor support windows.

### Microsoft SQL Server

Camunda supports Microsoft SQL Server versions that are in mainstream or extended vendor support.

### Oracle Database

Camunda supports **Oracle Long Term Support (LTS) releases**.

- Innovation releases with limited support windows are not supported.

### H2

H2 is supported for **development and testing purposes only**.

- Production use is not recommended.
- H2 support does not follow the same deprecation and removal rules as production databases.

## JDBC driver policy

- Camunda supports the latest vendor-released JDBC driver that is compatible with the supported database version, as specified by the database vendor..
- Customers are responsible for selecting and providing JDBC drivers where required (for example, Oracle or MySQL).
- JDBC driver versions are not pinned unless required for compatibility or stability reasons.
