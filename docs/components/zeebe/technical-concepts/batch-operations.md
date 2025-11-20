---
id: batch-operations
title: Batch operations
description: How distributed batch operations work in Zeebe engine.
---

Zeebe supports executing certain operations as batch operations:

- **Cancel process instances** (`CANCEL_PROCESS_INSTANCE`)
- **Migrate process instances** (`MIGRATE_PROCESS_INSTANCE`)
- **Modify process instances** (`MODIFY_PROCESS_INSTANCE`)
- **Resolve incidents** (`RESOLVE_INCIDENT`)

## How do they work?

A Zeebe batch operation always consists of two parts:

- **The command:**  
  The batch operation type determines the action performed on the process instances.  
  For example, the type `MIGRATE_PROCESS_INSTANCE` means process instances are migrated to a new process definition version.  
  Some batch types require more details, such as a migration plan for process instance migration or a modification plan for process instance modifications.

- **The batch operation items:**  
  The items are not directly defined at creation. Instead, a filter describes them.  
  This filter is applied to the configured secondary database (e.g., Elasticsearch) to identify matching process instances.

## Batch operation lifecycle

Batch operations follow a structured lifecycle with distinct phases:

### 1. Creation phase

- User submits a batch operation request with filter criteria
- **Validation**
- The operation is distributed to all partitions in the cluster
- A **leader partition** is designated (the partition that first processes the creation command)
- All other partitions become **follower partitions**
- A unique batch operation key is generated and assigned

#### Validation and rejection

Before processing begins, the system performs several validation checks:

- **Empty filter validation**: Filters cannot be empty or null
- **Authorization validation**: User permissions are checked before operation creation
- **Command-specific validation**: Each command type has specific requirements (e.g., migration plan validity)

Failed validations result in immediate rejection with specific error codes and messages (e.g., `INVALID_ARGUMENT`, `NOT_AUTHORIZED`).

### 2. Initialization phase

- **Asynchronous processing**: The initialization runs in a separate scheduler component (not blocking the main stream processor)
- **Concurrency control**: Only one initialization cycle runs at a time per partition using atomic execution flags
- Each partition queries the secondary database using the provided filter
- Results are paginated and split into manageable chunks to stay within the 4MB record size limit and prevent overloading exporters when processing individual records
- Process instances are identified and prepared for processing
- The total number of items to process is determined and fixed at this point
- **State tracking**: The scheduler maintains state about currently initializing operations to prevent duplicate processing

#### Dependency on secondary storage

Although the broker's internal state stores process instance data, the secondary storage is queried because:

- RocksDB (our internal state db) is a key-value store, not optimized for complex queries.
- The secondary database (e.g., Elasticsearch) efficiently supports complex filtering.
- The user interface enables filter-based batch creation, which RocksDB cannot support.
- Pagination and large result set handling is better supported by secondary databases.

### 3. Execution phase

- Each partition processes its assigned items independently
- Individual commands (e.g., `CANCEL`, `MIGRATE`) are executed on each process instance
- Progress is tracked and can be monitored
- Failed items are recorded with error details
- **Fire-and-forget execution**: Individual operation commands are executed without waiting for their completion status

### 4. Completion phase

- Follower partitions report completion or failure to the leader partition
- Leader partition aggregates results from all partitions
- Final status is determined (`COMPLETED` if at least one partition succeeded, `FAILED` if all failed)

## Error handling and recovery

### Initialization failures

Initialization can fail for several reasons:

- **Network issues**: Connection problems with the secondary database
- **Permission errors**: Insufficient authorization to query the database
- **Configuration issues**: Secondary database not properly configured
- **Query errors**: Invalid or malformed filter criteria

**Error handling behavior:**

- **Retryable errors**: Network issues, temporary database unavailability
  - Uses exponential backoff with configurable retry limits
  - Maximum delay and retry count can be configured
- **Non-retryable errors**: Permission issues, configuration problems
  - Fail immediately without retries
- **Adaptive sizing**: If record size limits are exceeded, page sizes are automatically reduced

### Execution failures

Individual items may fail during execution for various reasons:

- Process instance was completed or canceled after batch initialization
- Incident was already resolved by another operation
- Migration or modification plan is invalid for the specific instance
- Authorization insufficient for the specific process instance

Failed items are marked as `FAILED` and cannot be retried within the same batch operation.

### Recovery strategies

- **Retry failed batches**: Create a new batch operation with the same filter
- **Partial recovery**: Use more specific filters to target only failed items
- **Monitoring**: Use provided APIs to track which items failed and why

## Lifecycle management

Batch operations support several lifecycle management operations:

### Suspend and Resume

- **Suspend**: Temporarily stops execution of a running batch operation
- **Resume**: Restarts execution of a suspended batch operation
- Operations can be suspended during initialization or execution phases

### Cancel

- **Cancel**: Permanently stops a batch operation
- Cannot be resumed once canceled
- Partially processed items remain in their modified state

## Distribution and eventual consistency

![distributed-batch-operation](assets/batch-operation.png)

Zeebe clusters are distributed systems with multiple brokers and partitions. Each partition manages a subset of process instances.

When a batch operation starts:

1. The batch operation (command + filter) is created and distributed to all partitions.
2. Each partition processes the batch independently:
   - It uses the filter to query relevant process instances from the secondary database.
   - It applies the batch command to each matched instance.
3. After all partitions finish, the final statuses are collected, and the batch is marked `COMPLETED`.

This distributed, asynchronous approach allows parallel processing of many process instances.

### Important considerations

#### UI discrepancies

When started from Operate UI, the displayed filtered instances may differ from those executed.  
 The batch operation defines filter criteria, not an exact set of instances. By the time the engine applies the batch, search results may have changed.  
 The number of instances to process is fixed at the batch start and does not include new instances created afterward.

#### Partition independence

Each partition fetches and processes matching instances independently.  
 At the start of very large batches, the total number of known items may vary until all partitions finish fetching.  
 This is due to multiple paged queries to the secondary database.

#### Leader-follower coordination

The leader partition coordinates the overall operation status while follower partitions focus on execution.  
 Inter-partition communication ensures consistent final status reporting.

## Creating and monitoring batch operations

You can create batch operations using:

- **[Operate UI](/components/operate/operate-introduction.md)**: Start batch operations directly from the Operate interface for process instances and incidents
- **[Orchestration Cluster REST API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md)**: REST endpoints to create, manage, and monitor batches programmatically
- **[Camunda Java client](/apis-tools/java-client/getting-started.md)**: APIs for batch operations in Java applications

:::note
Lifecycle management (suspend, resume, cancel) is only available via the REST API and Java client, not through Operate UI. More features may be added in future Operate versions.
:::

### Technical monitoring

Batch operation performance can be tracked via [Grafana dashboards](/self-managed/operational-guides/monitoring/metrics.md#grafana).

**Key metrics to monitor:**

- Initialization time and success rate
- Execution throughput and latency
- Error rates by type and partition
- Resource utilization during batch processing
- Secondary database query performance

## Authorization

To execute a batch operation, users need two sets of permissions:

### Batch operation permissions

- Permission to create the batch operation.
- Permission to manage batch operations (suspend, resume, cancel).

### Item-level permissions

- Permission to read process instances and incidents from the secondary database.
- Permission to execute the specific operation on each targeted process instance.

Authorization claims are stored with the batch operation and used throughout its lifecycle.

:::info
See the [authorizations](/components/concepts/access-control/authorizations.md) and [how to create authorizations in the Identity UI](/components/identity/authorization.md).
:::

## Performance impact

Batch operations share cluster resources with regular process instances, affecting each other's performance. Commands created by batch operations run with the same priority as user-generated commands.

### Performance considerations

**During batch creation:**

- RocksDB storage impact from batch metadata
- Memory usage for operation state management

**During initialization:**

- Heavy querying of the secondary database
- Network bandwidth usage for query results
- Partition coordination overhead

**During execution:**

- Command processing load shared with regular operations
- Potential backpressure on high-throughput scenarios
- Resource contention with live process instances

#### Best practices

- **Timing**: Schedule large batch operations during low-traffic periods
- **Sizing**: Break very large operations into smaller batches
- **Monitoring**: Watch cluster performance metrics during batch execution
- **Filtering**: Use precise filters to minimize unnecessary processing

:::warning
Large batch operations can temporarily impact cluster performance, especially during initialization when partitions query the secondary database individually and in parallel.
:::

:::warning
Heavy querying of the secondary database can notably affect its performance, especially for large batches with broad filters.
:::

### Configuration

The batch-operations section in the broker configuration controls discovery (initialization) and robustness. Keys live under `zeebe.broker.experimental.engine.batchOperation.*` and are validated at startup.

Recommended keys:

- `schedulerInterval` (Duration, positive): interval at which the background scheduler runs to progress initialization/continuations.

- `chunkSize` (int > 0): max items per chunk record written during initialization. Values > 5000 are allowed but not recommended due to exporter pressure and 4 MB record-size constraints; a warning is logged.

- `dbChunkSize` (int > 0): size used when writing item chunks to RocksDB; keeps state values small for cache efficiency.

- `queryPageSize` (int > 0): page size when querying secondary storage during initialization; interacts with ES/OS 10k page limit.

- `queryInClauseSize` (int > 0): max keys per IN clause when queries use key lists (RDBMS).

- `queryRetryMax` (int >= 0): maximum retry attempts for transient query failures.

- `queryRetryInitialDelay` (Duration, positive): initial backoff delay for retryable query errors.

- `queryRetryMaxDelay` (Duration, positive, >= initialDelay): cap for exponential backoff during query retries.

- `queryRetryBackoffFactor`: multiplier applied between retries; validated at startup.

Notes:

- These settings appear in broker.yaml.template under `experimental.engine.batchOperation` and fail fast on invalid values; the broker startup will report the invalid key and reason.

- The engine enforces the 4 MB per-record limit; the scheduler splits large item sets across multiple chunk records and, if necessary, across multiple scheduler runs. Prefer tuning `chunkSize`/`queryPageSize` rather than increasing global message size.

Example (YAML fragment):

```yaml
zeebe:
  broker:
    experimental:
      engine:
        batchOperation:
          schedulerInterval: PT1S
          chunkSize: 100
          dbChunkSize: 3500
          queryPageSize: 10000
          queryInClauseSize: 1000
          queryRetryMax: 2
          queryRetryInitialDelay: PT1S
          queryRetryMaxDelay: PT60S
          queryRetryBackoffFactor: 2
```

#### Camunda Exporter option: exportItemsOnCreation

If you use the Camunda Exporter (Self-Managed with Elasticsearch/OpenSearch), you can control whether pending batch items are exported immediately at batch creation:

- `batchOperation.exportItemsOnCreation` (default: true)

  When `true`, the exporter writes “pending items” as soon as initialization starts so Operate can render a spinner (“has pending batch operations”). For very large batches (for example, 100,000+ items), this may cause a temporary spike in write load due to the high volume of document insertions. Set to `false` to reduce initial indexing pressure at the cost of the spinner not functioning; rely on the REST batch status endpoints and metrics instead.

YAML example:

```yaml
exporters:
  camundaexporter:
    args:
      batchOperation:
        exportItemsOnCreation: false
```
