---
sidebar_label: Elasticsearch and OpenSearch
title: Configure Elasticsearch and OpenSearch for Orchestration Cluster in Helm
description: Configure Elasticsearch and OpenSearch as secondary storage for the Orchestration Cluster in Camunda 8 Self-Managed Helm deployments.
---

Use this page as the navigation hub for Elasticsearch and OpenSearch configuration for the Orchestration Cluster in Helm deployments.

This page applies to the Orchestration Cluster only. If you also deploy Optimize, use the dedicated [Optimize database configuration](/self-managed/manage/databases/optimize/index.md) pages for Optimize-specific settings.

## Configure secondary storage backends

Use the following pages based on your backend:

- [Use external Elasticsearch with Helm](/self-managed/manage/databases/elasticsearch-opensearch/using-external-elasticsearch.md)
- [Use Amazon OpenSearch Service with the Helm chart](/self-managed/manage/databases/elasticsearch-opensearch/using-external-opensearch.md)

## Shared Elasticsearch and OpenSearch tasks

Use the following pages when you need settings that can apply to both the Orchestration Cluster and Optimize:

- [Configure custom HTTP headers for database clients](/self-managed/manage/databases/elasticsearch-opensearch/custom-http-headers.md)
- [Configure Elasticsearch and OpenSearch index prefixes](/self-managed/manage/databases/elasticsearch-opensearch/prefix-indices.md)

## Troubleshooting

- [All shards failed errors](/self-managed/manage/databases/elasticsearch-opensearch/all-shards-failed.md)

## Related concepts

- [Secondary storage overview](/self-managed/manage/databases/secondary-storage/index.md)
- [Elasticsearch/OpenSearch](/reference/glossary.md#elasticsearchopensearch)
