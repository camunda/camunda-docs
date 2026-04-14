---
id: index
sidebar_label: Optimize
title: Configure Optimize databases in Helm chart
description: Configure Elasticsearch and OpenSearch for Optimize in Camunda 8 Self-Managed Helm deployments.
---

Use this section to configure Optimize's database connection in Helm deployments.

Optimize supports Elasticsearch or OpenSearch only. It does not support RDBMS.

This section applies to Optimize only. If you also need to configure Elasticsearch or OpenSearch for the Orchestration Cluster, use the [Orchestration Cluster Elasticsearch/OpenSearch pages](/self-managed/deployment/helm/configure/database/non-sql.md).

Use the following pages based on your backend:

- [Use external Elasticsearch for Optimize with Helm](/self-managed/deployment/helm/configure/database/optimize/using-external-elasticsearch.md)
- [Use external OpenSearch for Optimize with Helm](/self-managed/deployment/helm/configure/database/optimize/using-external-opensearch.md)

Shared Elasticsearch and OpenSearch tasks:

- [Configure custom HTTP headers for database clients](/self-managed/deployment/helm/configure/database/configure-db-custom-headers.md)
- [Configure Elasticsearch and OpenSearch index prefixes](/self-managed/deployment/helm/configure/database/elasticsearch/configure-elasticsearch-prefix-indices.md)

For background on secondary storage choices and exporter behavior, see [secondary storage overview](/self-managed/concepts/secondary-storage/index.md).
