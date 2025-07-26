---
id: all-shards-failed
title: "Dealing with `all shards failed` errors"
sidebar_label: "Dealing with `all shards failed` errors"
description: "Dealing with `all shards failed` errors"
---

When deploying Camunda 8.8+ with OpenSearch (or Elasticsearch) in a multi-node setup, you may encounter errors like the following in your Camunda logs:

```
[2025-07-18 22:00:59.235] [http-nio-0.0.0.0-8080-exec-13] WARN
io.camunda.search.os.clients.OpensearchSearchClient - Failed to execute findAll query
org.opensearch.client.opensearch._types.OpenSearchException: Request failed: [search_phase_execution_exception] all shards failed
	at org.opensearch.client.transport.aws.AwsSdk2Transport.parseResponse(AwsSdk2Transport.java:582)
	at org.opensearch.client.transport.aws.AwsSdk2Transport.executeSync(AwsSdk2Transport.java:440)
	at org.opensearch.client.transport.aws.AwsSdk2Transport.performRequest(AwsSdk2Transport.java:217)
	at org.opensearch.client.opensearch.OpenSearchClient.search(OpenSearchClient.java:1386)
  [...]
```

### What this error means?

The error `Request failed: [search_phase_execution_exception] all shards failed` indicates that OpenSearch could not retrieve data from any shard of the requested index.

This does not necessarily mean data is corrupted or lost. The cause might be connectivity issues between OpenSearch nodes, especially in multi-node setups.

### Step 1: Check index and shard health

Run the following command to verify shard allocation and index health:

```bach
curl http://<opensearch-host>:9200/_cat/indices?v
```

- If the index health status is `green`, all primary and replica shards are healthy and available.
- If Camunda still logs `all shards failed`,` it may be due to temporary connectivity issues between OpenSearch nodes.

### Multi-node deployments and default configuration pitfalls

Camunda's Helm chart is per default configured for single-node deployments with a shard replication of 0. In a multi-node OpenSearch setup, this can cause problems if shard allocation is not balanced.

Consider the following scenario:

```
Orchestration Cluster
       |
       v
OpenSearch Node 1 (no shard) <-x-> OpenSearch Node 2 (not reachable; holds the shard)
```

:::info
Starting with version 8.8, Camunda stores authorization data in OpenSearch (or Elasticsearch), instead of using PostgreSQL and Keycloak as in previous versions.

This means:

- Every authorization check now triggers one or more search engine queries.
- These queries are critical — if they fail, Camunda components may be unable to process requests.
  :::

### Step 2: Improve resilience with replica shards

To improve fault tolerance, increase the number of replica shards. This ensures that if one database node becomes unavailable, another can still serve the data. As a general rule for multi-node clusters:

```
numberOfReplicas = numberOfNodes - 1
```

For example, in a 3-node OpenSearch cluster, set the following environment variables:

```yaml
orchestration:
  env:
    - name: CAMUNDA_TASKLIST_OPENSEARCH_NUMBEROFREPLICAS
      value: "2"
    - name: CAMUNDA_OPERATE_OPENSEARCH_NUMBEROFREPLICAS
      value: "2"
    - name: CAMUNDA_DATABASE_INDEX_NUMBEROFREPLICAS
      value: "2"
```
