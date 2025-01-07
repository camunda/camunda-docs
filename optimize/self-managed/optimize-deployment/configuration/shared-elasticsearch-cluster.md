---
id: shared-elasticsearch-cluster
title: "Shared Elasticsearch/OpenSearch cluster"
description: "Operate multiple Optimize instances on a shared Elasticsearch/OpenSearch cluster."
---

In case you have a large shared Elasticsearch/OpenSearch cluster that you want to operate multiple Optimize instances on that are intended to run in complete isolation from each other, it is required to change the [`*.settings.index.prefix`](./system-configuration.md#index-settings) setting for each Optimize instance.

:::note Heads Up!
Although a shared Elasticsearch/OpenSearch cluster setup is possible, it's recommended to operate a dedicated Elasticsearch/OpenSearch cluster per Optimize instance.

This is due to the fact that a dedicated cluster provides the highest reliability (no resource sharing and no breaking side effects due to misconfiguration) and flexibility (e.g. Elasticsearch/OpenSearch and/or Optimize updates can be performed independently between different Optimize setups).
:::

The following illustration demonstrates this use case with two Optimize instances that connect to the same Elasticsearch/OpenSearch cluster but are configured with different `*.settings.index.prefix` values. This results in different indexes and aliases created on the cluster, strictly isolating the data of both Optimize instances, so no instance accesses the data of the other instance.

:::note Warning
Changing the value of `*.settings.index.prefix` after an instance was already running results in new indexes being created with the new prefix value. There is no support in migrating data between indexes based on different prefixes.
:::

\* Elasticsearch index prefix settings path: `es.settings.index.prefix`<br/> \* OpenSearch index prefix settings path: `opensearch.settings.index.prefix`

![Shared Elasticsearch Cluster Setup](img/shared-elasticsearch-cluster.png)
