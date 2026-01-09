---
id: rdbms-support-policy
title: RDBMS version support policy
description: Defines Camunda’s official RDBMS version support policy, including supported databases, version adoption rules, and JDBC driver guidance.
---

Camunda provides an official support policy for relational databases (RDBMS) used with **Camunda 8 Self-Managed**. This policy defines supported database vendors and versions, how new versions are adopted, how versions are deprecated and removed, how managed PostgreSQL services are treated, and how JDBC drivers are supported.

## Scope and applicability

This policy applies to **Camunda 8 Self-Managed** deployments.

It covers relational databases used for:

- the orchestration cluster as a secondary storage,
- Web Modeler.

## Supported RDBMS

The following relational databases are officially supported:

| Database                 | Supported versions              |
| ------------------------ | ------------------------------- |
| PostgreSQL               | 14 (deprecated), 15, 16, 17, 18 |
| Amazon Aurora PostgreSQL | 14 (deprecated), 15, 16, 17, 18 |
| MariaDB                  | 10.11, 11.4, 11.8               |
| MySQL                    | 8.4                             |
| Microsoft SQL Server     | 2019 (deprecated), 2022, 2025   |
| Oracle                   | 19c, 23ai                       |
| H2                       | 2.3, 2.4                        |

:::info
Changes to supported versions are announced in the  
[release notes](/reference/announcements-release-notes/890/890-release-notes.md).
:::

Versions marked as **deprecated** remain supported but are approaching vendor end-of-support. Customers are encouraged to plan upgrades to newer supported versions.

## Recommended database versions

While multiple database versions may be supported at any given time, Camunda recommends that **new deployments** standardize on the **latest two supported versions** of a given database whenever possible.

## New version support

New database versions are added based on the following criteria:

- **Vendor release:** The version must be officially released by the database vendor.
- **Availability window:** The version must be available at least three months before the next Camunda minor release.
- **Validation:** The version must be tested and validated across relevant Camunda components.

If the availability window is missed, support is deferred to a subsequent minor release.

:::note
Exceptions may be approved on a case by case basis for strategic or customer-driven reasons. Any exceptions are explicitly documented and time-bound.
:::

## Version deprecation and removal

- **Vendor end-of-support:** Versions are deprecated when vendor support ends or is scheduled to end within six months.
- **Advance notice:** Deprecations are announced in advance via release notes.
- **Exceptions:** Support may be extended in exceptional cases, but any extension is explicitly documented and time-bound.

## Managed PostgreSQL services

Managed PostgreSQL services are supported when:

- they are fully compatible with the PostgreSQL versions listed in this policy, and
- the service provider guarantees compatibility and support for those versions.

Amazon Aurora PostgreSQL is explicitly tested and supported as a PostgreSQL-compatible engine and follows the same lifecycle rules as self-managed PostgreSQL.

Provider-specific operational behavior and service characteristics remain the responsibility of the service provider.

:::note
This support model is similar to Camunda’s Kubernetes support policy: Camunda supports the underlying technology and versions, while cloud providers are responsible for ensuring their managed offerings remain compatible.
:::

## Database-specific support notes

### PostgreSQL

Camunda follows PostgreSQL’s annual release model and supports multiple active major versions concurrently.

- Versions approaching vendor end-of-life are marked as deprecated before removal.
- For new deployments, customers should prefer the latest two supported versions.

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
- H2 support does not follow the same lifecycle guarantees as production databases.

## JDBC driver policy

- Camunda supports the latest vendor-compatible JDBC driver for each supported database version.
- Customers are responsible for providing JDBC drivers where required (for example, Oracle or MySQL).
- JDBC driver versions are not pinned unless required for compatibility or stability reasons.
