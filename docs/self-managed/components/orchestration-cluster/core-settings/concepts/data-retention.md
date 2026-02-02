---
id: data-retention
title: Data retention
description: "Overview of how the Orchestration Cluster stores and archives data in secondary storage."
---

The Orchestration Cluster centrally manages data retention for all data using unified storage and policy configuration.

All cluster data, including deployed process definitions, process instance state, user operations, and technical metadata, is written to secondary storage. Depending on your configuration, this secondary storage is backed by [Elasticsearch/OpenSearch](/reference/glossary.md#elasticsearchopensearch) or an [RDBMS](/reference/glossary.md#rdbms). The data representing process instance state becomes immutable after the process instance is finished, and it becomes eligible for archiving.

:::note
Secondary storage is configurable. Choose the backend that best fits your requirements for indexing, querying, retention, and operations. See [configuring secondary storage](/self-managed/concepts/secondary-storage/configuring-secondary-storage.md) for setup guidance, and refer to [secondary storage](/reference/glossary.md#secondary-storage) for terminology and conceptual context.
:::

When using Elasticsearch/OpenSearch, finished data is moved to a dated index (for example, `operate-variable_2020-01-01`), with the suffix representing the completion date of the associated process or operation. Data from both main and dated indices remains searchable and visible in the UI. For RDBMS backends, the exporter does not create dated indices. Data remains in the same tables and stays visible until retention policies delete it.

## Archive period

The time between a process instance finishing and being moved to a dated index can be configured using the [waitPeriodBeforeArchiving](/self-managed/components/orchestration-cluster/zeebe/exporters/camunda-exporter.md#configurations) parameter. Refer to that configuration for the current default value.

## Hierarchy-aware retention

Starting with Camunda 8.9, retention in Elasticsearch/OpenSearch secondary storage becomes hierarchy-aware for **process instance data**.

This means child process instances (for example, started via Call Activities) are retained as long as their **root process instance** is retained, instead of being cleaned up independently based on their own end time.

### Retention modes

When using Elasticsearch or OpenSearch, you can control how process instance hierarchies and legacy process instance hierarchies (where the root process instance was started before upgrading to 8.9) are archived/deleted via these configuration properties:

- `camunda.data.secondary-storage.elasticsearch.history.process-instance-retention-mode`
- `camunda.data.secondary-storage.opensearch.history.process-instance-retention-mode`

See the [property reference](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md) for details and all available secondary storage settings.

The following values are available:

- `PI_HIERARCHY` (default from 8.9)
  - For process instance hierarchies started on 8.9+, the archiver treats the entire hierarchy (root + descendants + related records) as one retention unit.
  - For legacy process instance hierarchies (where the root process instance was started before upgrading to 8.9), the archiver keeps the pre-8.9 per-process-instance behavior. This also applies to any process instances started after the upgrade that belong to such legacy hierarchies.
- `PI_HIERARCHY_IGNORE_LEGACY`
  - Applies hierarchy-based retention only to process instance hierarchies started on 8.9+.
  - Ignores legacy process instance hierarchies (no automated per-instance archiving/deletion), intended when legacy cleanup is handled separately.
- `PI` (legacy per-process-instance behavior)
  - Preserves the pre-8.9 behavior and performs retention per process instance (as in 8.8 and earlier).
  - Child process instances can be archived/deleted independently of the root instance.

## Data cleanup

The amount of stored data can grow significantly over time. Therefore, we recommend implementing a data cleanup strategy.
Dated indices, which contain only finished process instances, may be safely removed from Elasticsearch/OpenSearch.

In the Orchestration Cluster, strategies for the deletion of archived data can be defined via the [retention configuration](/self-managed/components/orchestration-cluster/zeebe/exporters/camunda-exporter.md?configuration=retention#options).
