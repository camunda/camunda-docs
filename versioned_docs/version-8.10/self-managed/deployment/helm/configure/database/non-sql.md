---
id: non-sql
sidebar_label: Non-SQL
title: Configure Elasticsearch and OpenSearch for Orchestration Cluster in Helm
description: Configure Elasticsearch and OpenSearch as secondary storage for the Orchestration Cluster in Camunda 8 Self-Managed Helm deployments.
---

Use this page as the navigation hub for Elasticsearch and OpenSearch configuration for the Orchestration Cluster in Helm deployments.

This page applies to the Orchestration Cluster only. If you also deploy Optimize, use the dedicated [Optimize database configuration](/self-managed/deployment/helm/configure/database/optimize/index.md) pages for Optimize-specific settings.

## Configure secondary storage backends

Use the following pages based on your backend:

- [Use external Elasticsearch with Helm](/self-managed/deployment/helm/configure/database/elasticsearch/using-external-elasticsearch.md)
- [Use Amazon OpenSearch Service with the Helm chart](/self-managed/deployment/helm/configure/database/using-external-opensearch.md)

## Shared Elasticsearch and OpenSearch tasks

Use the following pages when you need settings that can apply to both the Orchestration Cluster and Optimize:

- [Configure custom HTTP headers for database clients](/self-managed/deployment/helm/configure/database/configure-db-custom-headers.md)
- [Configure Elasticsearch and OpenSearch index prefixes](/self-managed/deployment/helm/configure/database/elasticsearch/configure-elasticsearch-prefix-indices.md)

## Troubleshooting

- [All shards failed errors](/self-managed/deployment/helm/configure/database/all-shards-failed.md)

## Related concepts

- [Secondary storage overview](/self-managed/concepts/secondary-storage/index.md)
- [Elasticsearch/OpenSearch](/reference/glossary.md#elasticsearchopensearch)
