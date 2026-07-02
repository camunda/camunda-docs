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

### Archive by ID

When `archiveByIdEnabled` is `true` (the default), archiving moves documents in small, targeted batches instead of attempting to move all relevant records in a single attempt. This incrementally continues until all documents for the selected process instances have been archived to the relevant dated indices.

There are no changes to the core archiving concept — data is still moved to the same dated destination indices (for example, `operate-variable_2020-01-01`). When archiving by ID, archiving is executed in a less resource-intensive manner, which improves stability.

`rolloverBatchSize` controls how many process instances are selected for archiving per run. `reindexBatchSize` controls how many individual Elasticsearch/OpenSearch documents are archived in each targeted batch. The default value of `rolloverBatchSize` is 500 when `archiveByIdEnabled` is `true` (the default), and 100 when `false`. Set to 500 or higher when using `archiveByIdEnabled` to maintain a healthy pipeline of data.

See [history archiving settings](/self-managed/components/orchestration-cluster/zeebe/exporters/camunda-exporter.md?configuration=history#options) for the full configuration reference.

## Data cleanup

The amount of stored data can grow significantly over time. Therefore, we recommend implementing a data cleanup strategy.
Dated indices, which contain only finished process instances, may be safely removed from Elasticsearch/OpenSearch.

In the Orchestration Cluster, strategies for the deletion of archived data can be defined via the [retention configuration](/self-managed/components/orchestration-cluster/zeebe/exporters/camunda-exporter.md?configuration=retention#options).
