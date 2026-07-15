---
id: data-retention
title: Data retention
description: "Overview of how the Orchestration Cluster stores and archives data in Elasticsearch or OpenSearch."
---

The Orchestration Cluster centrally manages data retention for all data using unified storage and policy configuration.

All cluster data, including deployed process definitions, process instance state, user operations, and technical metadata, is written to secondary storage in Elasticsearch or OpenSearch. The data representing process instance state becomes immutable after the process instance is finished, and it becomes eligible for archiving.

During data archive, data is moved to a dated index (e.g., `operate-variable_2020-01-01`), with the suffix representing the completion date of the associated process or operation.

:::note
All data present in the Database (from both **main** and **dated** indices) is visible from the UI.
:::

## Archive period

The time between a process instance finishing and being moved to a dated index can be configured using the [waitPeriodBeforeArchiving](/self-managed/components/orchestration-cluster/zeebe/exporters/camunda-exporter.md#configurations) parameter. Refer to that configuration for the current default value.

## Archive by ID

:::warning
Enable `archiveByIdEnabled` only on Camunda 8.8.29 or later. Earlier 8.8 patch releases contain a bug that causes archiving to behave incorrectly when Elasticsearch or OpenSearch use more than one shard for the Operate and Tasklist indices.
:::

When `archiveByIdEnabled` is `true` (the default), archiving moves documents in small, targeted batches instead of all matching records at once. Archiving continues incrementally until every document for the selected process instances reaches the relevant dated indices.

The core archiving concept is unchanged: data still moves to the same dated destination indices (for example, `operate-variable_2020-01-01`). Archiving by ID uses fewer resources, which improves stability.

`rolloverBatchSize` controls how many process instances are selected per run, and `reindexBatchSize` controls how many individual Elasticsearch/OpenSearch documents are archived in each targeted batch. When `archiveByIdEnabled` is `true`, `rolloverBatchSize` defaults to 500 (and to 100 when `false`); keep `rolloverBatchSize` at 500 or higher to maintain a healthy pipeline of data.

See [history archiving settings](/self-managed/components/orchestration-cluster/zeebe/exporters/camunda-exporter.md?configuration=history#options) for the full configuration reference.

## Data cleanup

The amount of stored data can grow significantly over time. Therefore, we recommend implementing a data cleanup strategy.
Dated indices, which contain only finished process instances, may be safely removed from Elasticsearch/OpenSearch.

In the Orchestration Cluster, strategies for the deletion of archived data can be defined via the [retention configuration](/self-managed/components/orchestration-cluster/zeebe/exporters/camunda-exporter.md?configuration=retention#options).
