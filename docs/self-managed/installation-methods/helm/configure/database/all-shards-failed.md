## Dealing with `all shards failed` Errors in OpenSearch

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

Camunda's Helm chart is configured for single-node deployments with a shard replication of 0 per default. In a multi-node OpenSearch setup, this can cause problems if shard allocation is not balanced.

Consider the following scenario:

```
Orchestration Cluster
       |
       v
OpenSearch Node 1 (no shard) <-x-> OpenSearch Node 2 (not reachable; holds the shard)
```

:::info
In 8.8, Camunda now stores authorization data in OpenSearch (or Elasticsearch) instead of PostgreSQL and Keycloak as in prior versions.

This means:

- Every request that performs an authorization check triggers one or more database queries.
- These requests are critical - if they fail, Camunda components may be unable to process the request.
  :::

### Step 2: Improve resilience with replica shards

To improve fault tolerance, configure replica shards. This ensures that if one database node becomes unavailable, another can still serve the data.

As a general rule of thumb in multi-node clusters, set:

`numberOfReplicas = numberOfNodes - 1`

For example, configure the following environment variables for a 3 node setup:

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
