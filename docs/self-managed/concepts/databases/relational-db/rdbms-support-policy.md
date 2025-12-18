---
id: rdbms-support-policy
title: RDBMS version support policy
description: Defines Camunda’s official RDBMS version support policy, including supported databases, version adoption rules, and JDBC driver guidance.
---

Camunda offers a support policy for relational databases (RDBMS) in Self-Managed Camunda 8 and Camunda 8 Run, including supported versions, adoption and deprecation rules, and JDBC driver guidance.

:::caution work in progress
The RDBMS support policy is a work in progress, content can change until completion in a future alpha release.
:::

## Supported RDBMS

The following RDBMS databases are supported:

| Database             | Supported versions      |
| :------------------- | :---------------------- |
| PostgreSQL           | 14, 15, 16, 17, 18      |
| MariaDB              | 10.6, 10.11, 11.4, 11.8 |
| MySQL                | 8.4, 9.5                |
| Microsoft SQL Server | 2019, 2022, 2025        |
| Oracle               | 19c, 21c, 23ai          |
| H2                   | 2.x                     |

:::info
Changes to supported versions are announced in [release notes](/reference/announcements-release-notes/890/890-release-notes.md).
:::

## New version support

New versions are added based on:

- **Vendor release timeline:** Must be officially released by the vendor.
- **Availability window:** Must be available at least three months before the next minor Camunda release.
- **Testing requirements:** Must be fully tested and validated across Camunda components.

:::note
Exceptions may be approved by engineering for strategic reasons or customer demand.
:::

## Version support deprecation/removal

Versions are deprecated and removed based on:

- **Vendor end-of-support (EoS):** Removed when EoS occurs or will occur within six months.
- **Migration notice:** Adequate notice provided to customers via release notes.
- **Exceptions:** Engineering may extend support in special cases.

## JDBC driver policy

- Camunda supports the latest vendor-compatible JDBC driver for each supported RDBMS. Customers should use the latest compatible driver.
- Driver version details are not strictly fixed unless required for compatibility.
