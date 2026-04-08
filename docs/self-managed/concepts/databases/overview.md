---
id: overview
title: Overview
description: Learn how Camunda uses document and relational databases for secondary storage, including supported options, limitations, and where to find configuration details.
---

Camunda applications depend on a secondary storage backend to read workflow and decision data exported from the Zeebe engine.

This storage layer can use either a document-store backend or a relational database (RDBMS), depending on your requirements.

For an architectural explanation of how secondary storage fits into Camunda 8, see the  
[secondary storage overview](/self-managed/concepts/secondary-storage/index.md).

## App database support

| App                   | RDBMS | Non-SQL |
| --------------------- | ----- | ------- |
| Orchestration Cluster | Yes   | Yes     |
| Optimize              | No    | Yes     |
| Web Modeler           | Yes   | No      |
| Management Identity   | Yes   | No      |

Use this matrix as a compatibility summary for the main Camunda components and their supported database backends.

## Document-store backends

Camunda supports document-store backends such as Elasticsearch and OpenSearch.

These systems are optimized for high-volume ingestion and flexible search queries.

Related documentation:

- [Elasticsearch privileges](/self-managed/concepts/databases/elasticsearch/elasticsearch-privileges.md)
- [OpenSearch privileges](/self-managed/concepts/databases/elasticsearch/opensearch-privileges.md)
- [Elasticsearch exporter](/self-managed/components/orchestration-cluster/zeebe/exporters/elasticsearch-exporter.md)
- [OpenSearch exporter](/self-managed/components/orchestration-cluster/zeebe/exporters/opensearch-exporter.md)

## Relational databases (RDBMS)

Camunda also supports several relational databases for secondary storage, enabling the Orchestration Cluster API, Operate, Tasklist, and Admin to run without Elasticsearch or OpenSearch.

RDBMS and document-store backends are both valid secondary storage options. Select based on your workload, operational model, and platform standards.

A full list of supported vendors and versions, JDBC driver information, and component compatibility is published in the [RDBMS support policy](/self-managed/concepts/databases/relational-db/rdbms-support-policy.md).

For configuration details in Helm deployments, see the [RDBMS configuration guide](/self-managed/deployment/helm/configure/database/rdbms.md).

### RDBMS behavior and limitations

When using an RDBMS as secondary storage, keep the following limitations in mind:

- **Length limits for user-defined values:** Most user-defined strings that are exported to secondary storage or stored in identity management are length-limited. See [string length limits for user-defined values](#string-length-limits-for-user-defined-values).

- **Variable comparisons:** For String and JSON variables, comparison operators (`equals`, `notEquals`, `in`, `notIn`) only consider the first 8191 characters (or 4000 characters with Oracle). `LIKE` comparisons are not affected.

- **Sorting may differ by vendor:** Because collation behavior varies across database vendors, results sorted by string fields may differ between systems.

#### String length limits for user-defined values

Camunda limits most user-defined strings before they are exported to secondary storage or stored in identity management.

| Scope                                      | Limit                 | Notes                                                                                                |
| ------------------------------------------ | --------------------- | ---------------------------------------------------------------------------------------------------- |
| Elasticsearch/OpenSearch secondary storage | **32,768 characters** | This matches the practical limit for the relevant Elasticsearch / OpenSearch string fields.          |
| RDBMS secondary storage                    | **256 characters**    | This limit is chosen to align exported field lengths with the supported RDBMS schema.                |
| Identity objects                           | **256 characters**    | This limit applies independently of the secondary storage backend used by the Orchestration Cluster. |

These limits are enforced using Java string length semantics rather than raw UTF-8 byte counts. In practice, most common Latin, CJK, and Arabic characters count as one character, while characters represented as surrogate pairs in Java count as two. Because of that, the effective visible-character limit can be lower for some inputs.

The limits apply to the following user-defined fields:

- BPMN element IDs and names
- DMN element IDs and names
- Job worker types in task definitions
- Variable names
- Resource names of deployed BPMN, DMN, and form files
- Form IDs
- Message names and correlation keys
- Identity object identifiers and names

Special case for DMN on RDBMS: if a rule does not define its own ID, Camunda generates one from the decision ID, decision version, and rule index. In that case, keep the decision ID at **235 characters or fewer** so the generated rule ID stays within the RDBMS limit.

These limits are currently not configurable. In particular, the RDBMS-backed limits are tied to the database schema and do not increase automatically if you change application configuration.

#### Working with variables

When retrieving variables through the [Orchestration Cluster REST API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md), the following comparison operators only apply to the first 4000 characters of large String or JSON variables:

- equals
- notEquals
- in
- notIn

This ensures consistent performance on large datasets. For details, see the [get variable specification](/apis-tools/orchestration-cluster-api-rest/specifications/get-variable.api.mdx).

## Related database topics

These pages provide deeper detail for operators, DBAs, and administrators:

- [RDBMS support policy](/self-managed/concepts/databases/relational-db/rdbms-support-policy.md)
- [Configure RDBMS in Helm](/self-managed/deployment/helm/configure/database/rdbms.md)
- [Elasticsearch privileges](/self-managed/concepts/databases/elasticsearch/elasticsearch-privileges.md)
- [OpenSearch privileges](/self-managed/concepts/databases/elasticsearch/opensearch-privileges.md)
- [Configure the RDBMS exporter](/self-managed/concepts/databases/relational-db/configuration.md)

:::note
For guidance on coordinating backups between Zeebe (primary storage) and your configured secondary storage backend—whether Elasticsearch, OpenSearch, or an RDBMS—see the [backup and restore overview](/self-managed/operational-guides/backup-restore/backup-and-restore.md).
:::
