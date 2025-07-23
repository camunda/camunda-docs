---
id: batch-operations
title: Batch operations
description: How distributed batch operations work in Zeebe engine.
---

Zeebe supports executing certain operations as batch operations:

- Resolve incidents  
- Migrate process instances  
- Modify process instances  
- Cancel process instances  

## How do they work?

A Zeebe batch operation always consists of two parts:

- **The command:**  
  The batch operation type determines the action performed on the process instances.  
  For example, the type `MIGRATE_PROCESS_INSTANCE` means process instances are migrated to a new process definition version.  
  Some batch types require more details, such as a migration plan for process instance migration.

- **The batch operation items:**  
  The items are not directly defined at creation. Instead, a filter describes them.  
  This filter is applied to the configured secondary database (e.g., Elasticsearch) to identify matching process instances.

### Distribution and eventual consistency

![distributed-batch-operation](assets/batch-operation.png)

Zeebe clusters are distributed systems with multiple brokers and partitions. Each partition manages a subset of process instances.

When a batch operation starts:

1. The batch operation (command + filter) is created and distributed to all partitions.  
2. Each partition processes the batch independently:  
   - It uses the filter to find relevant process instances in the secondary database.  
   - It applies the batch command to each matched instance.  
3. After all partitions finish, the final statuses are collected, and the batch is marked `COMPLETED`.

This distributed, asynchronous approach allows parallel processing of many process instances.

### Implications of distribution

- **UI discrepancies:**  
  When started from Operate UI, the displayed filtered instances may differ from those executed.  
  The batch operation defines filter criteria, not an exact set of instances. By the time the engine applies the batch, search results may have changed.  
  The number of instances to process is fixed at the batch start and does not include new instances created afterward.

- **Partition independence:**  
  Each partition fetches and processes matching instances independently.  
  At the start of very large batches, the total number of known items may vary until all partitions finish fetching.  
  This is due to multiple paged queries to the secondary database.

### Why query the secondary database?

Although the broker’s internal RocksDB stores process instance data, the external database is queried because:

- RocksDB is a key-value store, not optimized for complex queries.  
- The secondary database (e.g., Elasticsearch) efficiently supports complex filtering.  
- The user interface enables filter-based batch creation, which RocksDB cannot support.

### Failure handling

Batch operations may fail during **initialization** or **execution**.

#### Initialization failures

- Occur if a partition cannot fetch relevant items from the secondary database (e.g., network issues).  
- Only the affected partition fails; others continue processing normally.  
- Failed partitions may have incorrect item counts.  
- The API reports failed partitions in the batch status.  
- Failed batches cannot be retried but can be restarted with the same filter.

#### Execution failures

Failures may occur when a partition processes individual batch items. Examples include:

- The process instance completed or was canceled after batch start.  
- The incident was resolved after batch start.  
- The migration or modification plan is invalid for the instance.

Failed items are marked `FAILED` in the batch status and cannot be retried. To retry, create a new batch with the same filter.

## How do I start and monitor a batch operation?

You can create batch operations using:

- The [Orchestration Cluster API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md), which provides REST endpoints to create, manage, and monitor batches.  
- The [Camunda client](/apis-tools/java-client-examples/process-instance-create.md), which offers APIs for batch operations.

These APIs also support suspending, resuming, or canceling ongoing batch operations.

:::note  
The [Operate UI](/components/operate/operate-introduction.md) currently allows creating batch operations only for itself. Starting Zeebe batch operations through Operate is planned for _Camunda 8.9_.  
:::

### Technical monitoring

Batch operation performance can be tracked via [Grafana dashboards](/self-managed/operational-guides/monitoring/metrics.md#grafana).

## Authorization

To execute a batch operation, users need two sets of permissions:

- Permission to create the batch operation.  
- Permission to read and act on the process instances targeted by the batch.

For detailed authorization info, see [Authorization](/components/identity/authorization.md).

## Performance impact

Batch operations share cluster resources with regular process instances, affecting each other’s performance. Commands created by batch operations run with the same priority as user-generated commands.

Large batch operations can temporarily impact cluster performance during:

- Batch creation in RocksDB.  
- Initialization, when partitions query the secondary database individually and in parallel.  

Heavy querying of the secondary database can notably affect its performance, especially for large batches with broad filters.
