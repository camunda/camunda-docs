---
id: rdbms-support-policy
title: RDBMS version support policy
description: Defines Camunda’s official RDBMS version support policy, including supported databases, version adoption rules, and JDBC driver guidance.
---

Learn about Camunda’s official support policy for relational databases (RDBMS) in Self-Managed Camunda 8 and Camunda 8 Run, including supported versions, adoption and deprecation rules, and JDBC driver guidance.

## Supported RDBMS

| Database             | Supported versions |
| -------------------- | ------------------ |
| PostgreSQL           | 14, 15             |
| MariaDB              | 10.6, 10.11        |
| MySQL                | 8.0                |
| Microsoft SQL Server | 2019, 2022         |
| Oracle               | 19c (LTS), 21c     |
| H2                   | 2.x                |

Additions and removals of supported versions are announced in [release notes](/reference/announcements-release-notes/890/890-release-notes.md).

## Adding new versions

New versions are adopted based on:

- **Vendor release timeline:** Must be officially released by the vendor.
- **Availability window:** Must be available at least **three months** before the next minor Camunda release.
- **Testing requirements:** Must be fully tested and validated across Camunda components.

Exceptions may be approved by engineering for strategic reasons or customer demand.

## Removing versions

Versions are deprecated and removed based on:

- **Vendor end-of-support (EoS):** Removed when EoS occurs or will occur within **six months**.
- **Migration notice:** Adequate notice provided to customers via release notes.
- **Exceptions:** Engineering may extend support in special cases.

## JDBC driver policy

- Camunda supports the **latest vendor-compatible JDBC driver** for each supported RDBMS. Customers should use the latest compatible driver.
- Driver version details are not strictly fixed unless required for compatibility.
