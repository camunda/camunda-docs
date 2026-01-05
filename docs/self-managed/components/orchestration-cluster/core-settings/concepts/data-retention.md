---
id: data-retention
title: Data retention
description: "Overview of how the Orchestration Cluster stores and archives data in secondary storage backends such as Elasticsearch/OpenSearch or RDBMS."
---

The Orchestration Cluster centrally manages data retention for all data using unified storage and policy configuration.

All cluster data, including deployed process definitions, process instance state, user operations, and technical metadata, is written to secondary storage. Depending on your configuration, this secondary storage is backed by [Elasticsearch/OpenSearch](/reference/glossary.md#elasticsearchopensearch) or an [RDBMS](/reference/glossary.md#rdbms). The data representing process instance state becomes immutable after the process instance is finished, and it becomes eligible for archiving.

:::note
Secondary storage is configurable. Choose the backend that best fits your requirements for indexing, querying, retention, and operations. See [RDBMS configuration](/self-managed/concepts/databases/relational-db/configuration.md) for setup guidance, and refer to [secondary storage](/reference/glossary.md#secondary-storage) for terminology and conceptual context.
:::

During data archive, data is moved to a dated index (for example, `operate-variable_2020-01-01`), with the suffix representing the completion date of the associated process or operation.

:::note
All data present in the database (from both main and dated indices) is visible from the UI.
:::

## Archive period

The time between a process instance finishing and being moved to a dated index can be configured using the [waitPeriodBeforeArchiving](/self-managed/components/orchestration-cluster/zeebe/exporters/camunda-exporter.md#configurations) parameter. Refer to that configuration for the current default value.

## Data cleanup

The amount of stored data can grow significantly over time. Therefore, we recommend implementing a data cleanup strategy.
Dated indices, which contain only finished process instances, may be safely removed from Elasticsearch/OpenSearch.

In the Orchestration Cluster, strategies for the deletion of archived data can be defined via the [retention configuration](/self-managed/components/orchestration-cluster/zeebe/exporters/camunda-exporter.md?configuration=retention#options).
