---
id: overview
title: Overview
description: Learn how Camunda uses document and relational databases for secondary storage, including supported options, limitations, and where to find configuration details.
---

Camunda applications depend on a secondary storage backend to read workflow and decision data exported from the Zeebe engine.

This storage layer can use either document databases or relational databases (RDBMS), depending on your requirements.

For an architectural explanation of how secondary storage fits into Camunda 8, see the  
[secondary storage overview](/self-managed/concepts/secondary-storage/index.md).

## Document databases

Camunda supports document-oriented backends such as Elasticsearch and OpenSearch.

These systems are optimized for high-volume ingestion and flexible search queries, and they remain the default choice for most production deployments.

Related documentation:

- [Elasticsearch privileges](/self-managed/concepts/databases/elasticsearch/elasticsearch-privileges.md)
- [OpenSearch privileges](/self-managed/concepts/databases/elasticsearch/opensearch-privileges.md)
- [Elasticsearch exporter](/self-managed/components/orchestration-cluster/zeebe/exporters/elasticsearch-exporter.md)
- [OpenSearch exporter](/self-managed/components/orchestration-cluster/zeebe/exporters/opensearch-exporter.md)

## Relational databases (RDBMS)

Camunda also supports several relational databases for secondary storage, enabling Operate, Tasklist, Identity, and REST APIs to run without Elasticsearch or OpenSearch.

A full list of supported vendors and versions is published in the [RDBMS support policy](/self-managed/concepts/databases/relational-db/rdbms-support-policy.md).

For configuration details in Helm deployments, see the [RDBMS configuration guide](/self-managed/deployment/helm/configure/database/rdbms.md).

### RDBMS behavior and limitations

When using an RDBMS as secondary storage, keep the following limitations in mind:

- **ID size limits:** Identifiers such as process definition IDs, decision IDs, and usernames are limited to 255 characters. Storing values significantly longer may result in errors. (This behavior will change once [this issue](https://github.com/camunda/camunda/issues/36717) is complete.)

- **Variable comparisons:** For String and JSON variables, comparison operators (`equals`, `notEquals`, `in`, `notIn`) only consider the first 8191 characters (or 4000 characters with Oracle). `LIKE` comparisons are not affected.

- **Sorting may differ by vendor:** Because collation behavior varies across database vendors, results sorted by string fields may differ between systems.

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
