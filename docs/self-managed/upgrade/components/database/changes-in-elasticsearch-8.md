---
id: changes-in-elasticsearch-8
sidebar_label: Elasticsearch 7 to 8
title: Elasticsearch 7 to 8 compatibility changes for Camunda
description: Changes and compatibility considerations when upgrading from Elasticsearch 7 to Elasticsearch 8 with Camunda.
---

This page describes changes and compatibility considerations when upgrading from Elasticsearch 7 to Elasticsearch 8 in a Camunda 8 environment.

Before upgrading Elasticsearch, review the Elasticsearch breaking changes and confirm compatibility with Camunda-supported versions.

When upgrading Elasticsearch, follow the official [Elasticsearch breaking changes guide](https://www.elastic.co/guide/en/elasticsearch/reference/current/breaking-changes.html).

Also review the Camunda 8 [supported environments](reference/supported-environments.md) to confirm the supported Elasticsearch versions.

## Elasticsearch Curator

Camunda 8 is not compatible with Elasticsearch Curator for Elasticsearch 8.

Curator is commonly used to manage [data retention](/components/saas/data-retention.md) by deleting indices. When upgrading to Elasticsearch 8, replace Curator with [Index Lifecycle Management (ILM)](https://www.elastic.co/guide/en/elasticsearch/reference/current/index-lifecycle-management.html).

Disable Curator only after the upgrade to Elasticsearch 8 is complete. Disabling Curator earlier can result in indices without an ILM policy, which prevents automatic deletion.

For details on configuring ILM for Zeebe indices, see [Elasticsearch exporter retention settings](/self-managed/components/orchestration-cluster/zeebe/exporters/elasticsearch-exporter.md#retention).

:::tip
You can replace Curator with ILM while still running Elasticsearch 7. This can simplify incremental upgrades from Elasticsearch 7 to 8.
:::
