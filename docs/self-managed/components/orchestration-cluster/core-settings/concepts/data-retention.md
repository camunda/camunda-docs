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

By default, the time between a process instance finishing and being moved to a dated index is one hour. This can be modified using the [waitPeriodBeforeArchiving](#TODO Have we got documentation for this?) configuration parameter.

## Data cleanup

The amount of stored data can grow significantly over time. Therefore, we recommend implementing a data cleanup strategy. 
Dated indices, which contain only finished process instances, may be safely removed from Elasticsearch/OpenSearch.

In the Orchestration Cluster, strategies for the deletion of archived data can be defined via the [Retention configuration](#TODO add link to retention settings).

