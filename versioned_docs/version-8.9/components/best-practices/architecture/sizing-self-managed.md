---
id: sizing-self-managed
title: Self-Managed resource planning
description: "Provision Camunda 8 on your Self-Managed cluster with Kubernetes and Helm using these baseline configurations, then adjust sizing based on your workload."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Provisioning Camunda 8 on your Self-Managed cluster depends on several factors. Use [Kubernetes with Helm](/self-managed/deployment/helm/index.md) to deploy and manage your Self-Managed cluster.

Use the configurations and guidance below as a baseline, then adjust based on your workload. For background on the factors that drive provisioning requirements, see [Size your environment](sizing-your-environment.md).

## Camunda 8.8+ resource consumption

Camunda 8.8 introduced a streamlined architecture that consolidates the broker, gateway, Operate, Tasklist, and Identity into a single application, the [Orchestration Cluster](/components/orchestration-cluster.md). This changes how you think about resource consumption compared to older versions.

If you are upgrading from a pre-8.8 version, expect different resource profiles:

- The Orchestration Cluster requires **more CPU per broker** compared to 8.7 (approximately 75% more CPU, for example, 2 to 3.5 cores, to maintain equivalent throughput).
- Throughput at the default 2 CPU cores drops ~35% compared to 8.7.x.
- With properly aligned resources (3.5 CPU cores), 8.8.x achieves similar throughput to 8.7.x with **significantly lower latency** (approximately a 2x improvement).
- The streamlined architecture reduces operational complexity (fewer pods to manage) but consolidates resource consumption into fewer, larger pods.

All components are clustered to provide high-availability, fault-tolerance, and resilience.

The Orchestration Cluster scales horizontally by adding more nodes (pods). This is limited by the [number of partitions](/components/zeebe/technical-concepts/partitions.md) configured for a cluster, as the work within one partition cannot be parallelized by design. Hence, you need to define enough partitions to utilize your hardware. The [number of partitions can be scaled up](/self-managed/components/orchestration-cluster/zeebe/operations/cluster-scaling.md) after the cluster is initially provisioned, but not yet scaled down.

Camunda 8 runs on Kubernetes. Every component runs as a pod with assigned resources. These resources can be scaled vertically (assigned more or fewer resources dynamically) within certain limits. Vertical scaling does not always increase throughput, since the components depend on each other.

:::note
Camunda licensing does not depend on the provisioned hardware resources, making it easy to size according to your needs.
:::

## Baseline performance

Considering this [baseline resource configuration](#baseline-resource-configuration), you can expect the following performance:

| Metric                                          | Value                                          |
| ----------------------------------------------- | ---------------------------------------------- |
| Completed process instances per second          | 51 (includes root and child process instances) |
| Completed flow node instances (FNIs) per second | 560                                            |
| Completed tasks per second                      | 100                                            |
| Data availability (query API latency)           | < 5 seconds                                    |

:::important
These numbers were measured using Camunda's [load test application](https://github.com/camunda/camunda/tree/main/load-tests/load-tester) with a [realistic reference process](https://github.com/camunda/camunda/blob/main/load-tests/load-tester/src/main/resources/bpmn/realistic/bankCustomerComplaintDisputeHandling.bpmn) and [realistic payload](https://github.com/camunda/camunda/blob/main/load-tests/load-tester/src/main/resources/bpmn/realistic/realisticPayload.json) (~11 KB). For details on the testing methodology, see the [reliability testing documentation](https://github.com/camunda/camunda/blob/main/docs/testing/reliability-testing.md).
:::

The realistic reference process starts one root process instance, which spawns 50 sub-process instances via call activities. It covers a wide variety of BPMN elements, including call activities, multi-instance, sub-processes, and DMN. The process is based on the [Credit Card Fraud Dispute Handling](https://marketplace.camunda.com/en-US/apps/449510/credit-card-fraud-dispute-handling) blueprint from the Camunda Marketplace.

## Baseline resource configuration

<Tabs groupId="optimize" defaultValue="with-optimize" values={
[
{ label: 'Without Optimize', value: 'without-optimize', },
{ label: 'With Optimize', value: 'with-optimize', },
]}>

<TabItem value="without-optimize">

The following configuration provides a baseline equivalent to a 1x SaaS cluster without Optimize enabled.

<!-- TODO: Validate these resource numbers against 8.9 benchmarks. The Orchestration Cluster CPU request of 3 cores reflects the 8.8 streamlined architecture. Confirm max throughput and max stored PI for this configuration. -->

| Component                 |                     | Request | Limit |
| ------------------------- | ------------------- | ------: | ----: |
| **Orchestration Cluster** |                     |         |       |
| Brokers                   | 3                   |         |       |
| Partitions                | 3                   |         |       |
| Replication factor        | 3                   |         |       |
|                           | vCPU \[cores\]      |       3 |     3 |
|                           | Memory \[GB\]       |       2 |     2 |
|                           | Disk \[GB\]         |         |   128 |
| **Connectors**            |                     |         |       |
| #                         | 1                   |         |       |
|                           | vCPU \[cores\]      |     0.2 |   0.2 |
|                           | Memory limit \[GB\] |   0.512 |     1 |
| **Elastic**               |                     |         |       |
| #statefulset              | 3                   |         |       |
|                           | vCPU \[cores\]      |       3 |     3 |
|                           | Memory limit \[GB\] |       2 |     2 |
|                           | Disk request \[GB\] |         |   128 |

</TabItem>

<TabItem value="with-optimize">

When Optimize is enabled, additional resources are needed, especially for Elasticsearch, because Optimize's importer reads from and writes to Elasticsearch indices. See [Impact of Optimize](sizing-your-environment.md#impact-of-optimize) for more details.

<!-- TODO: Validate these resource numbers against 8.9 benchmarks. These numbers are based on the Optimize V2 experiment (minimum ES resources for realistic workload at 1 PI/s with 101 tasks/s). -->

| Component                 |                     | Request | Limit |
| ------------------------- | ------------------- | ------: | ----: |
| **Orchestration Cluster** |                     |         |       |
| Brokers                   | 3                   |         |       |
| Partitions                | 3                   |         |       |
| Replication factor        | 3                   |         |       |
|                           | vCPU \[cores\]      |       3 |     3 |
|                           | Memory \[GB\]       |       2 |     2 |
|                           | Disk \[GB\]         |         |   128 |
| **Connectors**            |                     |         |       |
| #                         | 1                   |         |       |
|                           | vCPU \[cores\]      |     0.2 |   0.2 |
|                           | Memory limit \[GB\] |   0.512 |     1 |
| **Optimize**              |                     |         |       |
| #                         | 1                   |         |       |
|                           | vCPU \[cores\]      |     0.6 |     2 |
|                           | Memory limit \[GB\] |       1 |     2 |
| **Elastic**               |                     |         |       |
| #statefulset              | 3                   |         |       |
|                           | vCPU \[cores\]      |       7 |     7 |
|                           | Memory limit \[GB\] |       6 |     8 |
|                           | Disk request \[GB\] |         |   512 |

:::note
The numbers in the tables were measured using a [realistic process](https://github.com/camunda/camunda/blob/main/load-tests/load-tester/src/main/resources/bpmn/realistic/bankCustomerComplaintDisputeHandling.bpmn) with a [realistic payload](https://github.com/camunda/camunda/blob/main/load-tests/load-tester/src/main/resources/bpmn/realistic/realisticPayload.json) (~11 KB). To calculate day-based metrics, an equal distribution over 24 hours is assumed.
:::

</TabItem>

</Tabs>

## Primary storage

Primary storage must use low-latency **SSDs**, as HDD-backed volumes are not supported. Disk **latency**, rather than throughput, is the critical metric. Cloud providers often report similar throughput figures for HDD and SSD volumes, but the difference in latency is what matters for Camunda. In testing, HDD-backed primary storage reduced throughput by approximately 50% compared with SSDs, increased commit latency, and triggered additional Raft snapshot replication between brokers.

See [Command processing path](data-flow.md#command-processing-path) for the architectural context on why disk latency sits on the critical path, the [reference architecture minimum cluster requirements](/self-managed/reference-architecture/kubernetes.md#minimum-cluster-requirements) for concrete per-platform disk recommendations, and the [slow disk chaos day experiment](https://camunda.github.io/zeebe-chaos/2026/06/19/Using-slow-disk-with-Camunda) for the detailed findings.

### Disk space

All brokers in a partition use disk space to store:

- The event log for each partition in which they participate. By default, the event log has a minimum size of 128 MB per partition and grows in 128 MB segments. It is truncated once its data has been processed and successfully exported by all loaded exporters.
- A periodic snapshot of the running state (in-flight data) of each partition. Its size is unbounded and depends on the amount of in-flight work.

Every partition instance hosted by a broker, whether a leader or follower, also uses disk space to store a projection of the partition's running state in RocksDB. Its size is unbounded and depends on the amount of in-flight work. See [RocksDB](#rocksdb) below to learn how leaders and followers build this state differently.

Use the following formula as a starting point for estimating the required disk space:

```
neededDiskSpace = replicatedState + localState

replicatedState = totalEventLogSize + totalSnapshotSize

totalEventLogSize = followerPartitionsPerNode * eventLogSize * reserveForPartialSystemFailure

totalSnapshotSize = partitionsPerNode * singleSnapshotSize * 2
// singleSnapshotSize * 2:
//   the last snapshot (already replicated) +
//   the next snapshot (in transit, while it is being replicated)

partitionsPerNode = leaderPartitionsPerNode + followerPartitionsPerNode

leaderPartitionsPerNode = partitionsCount / numberOfNodes
followerPartitionsPerNode = partitionsCount * replicationFactor / numberOfNodes

clusterSize = [number of broker nodes]
partitionsCount = [number of partitions]
replicationFactor = [number of replicas per partition]
reserveForPartialSystemFailure = [factor to account for partial system failure]
singleSnapshotSize = [size of a single RocksDB snapshot]
eventLogSize = [event log size for duration of snapshotPeriod]
```

- `eventLogSize` scales with the throughput of your system.
- `totalSnapshotSize` scales with the number of in-flight process instances.
- `reserveForPartialSystemFailure` is a reserve to account for partial system failure, such as loss of quorum inside the cluster or loss of connection to an external system. See [effects on disk growth](#effects-on-disk-growth) below.

The relevant configuration settings are:

```yaml
camunda:
  cluster:
    partition-count: 1
    replication-factor: 1
    size: 1
  data:
    snapshot-period: 5m
    primary-storage:
      log-stream:
        log-segment-size: 128MB
```

| Environment variable                                   | Default |
| ------------------------------------------------------ | ------- |
| `CAMUNDA_DATA_PRIMARYSTORAGE_LOGSTREAM_LOGSEGMENTSIZE` | `128MB` |
| `CAMUNDA_DATA_SNAPSHOTPERIOD`                          | `5m`    |
| `CAMUNDA_CLUSTER_PARTITIONCOUNT`                       | `1`     |
| `CAMUNDA_CLUSTER_REPLICATIONFACTOR`                    | `1`     |
| `CAMUNDA_CLUSTER_SIZE`                                 | `1`     |

Other factors are best observed in a production-like system under representative throughput.

By default, this data is stored in the following directories:

- `segments`: The append-only log, split into segments. Data can be deleted once it becomes part of a new snapshot.
- `state`: The active state (deployed processes, active process instances, and so on). Completed process instances or jobs are removed.
- `snapshot`: A state at a certain point in time.

:::caution Avoid unbounded log growth
Do not configure an exporter that does not advance its record position, such as the Debug Exporter. If you configure an exporter, monitor its availability and the health of its dependencies. An exporter that stops advancing prevents log truncation, causing data to accumulate on disk until the issue is resolved. See [effects on disk growth](#effects-on-disk-growth).
:::

### Event log

The event log for each partition is segmented. By default, the segment size is 128 MB. The event log grows over time unless and until individual segments are deleted.

An event log segment can be deleted once:

- All the events it contains have been processed by exporters.
- All the events it contains have been replicated to other brokers.
- All the events it contains have been processed.

The following conditions inhibit automatic deletion:

- The cluster loses quorum. Events are queued but not processed until quorum is reestablished.
- An exporter does not advance its read position. The event log grows without bound.

Exporting occurs only on the partition leader. Followers do not delete their replicas of a segment until the leader marks the segment as no longer needed by exporters. A segment is not deleted until a snapshot that includes it has been taken, and only log entries up to that snapshot can be deleted.

### Snapshots

The running state of a partition is captured periodically on the leader. By default, a snapshot is taken every five minutes, as configured by `snapshot-period`. A snapshot is a projection of all events that represent the current running state, including deployed processes, active process instances, and jobs that have not yet been completed. Writing a new snapshot deletes all log data written before the snapshot.

:::note
The snapshot interval was tested in a Zeebe Chaos experiment. Learn more in the [Zeebe Chaos blog](https://camunda.github.io/zeebe-chaos/2022/02/01/High-Snapshot-Frequency/#snapshot-interval).
:::

### RocksDB

The leader of a partition processes commands and applies committed events to its RocksDB state. Followers continuously replay the same committed events into their local RocksDB state without processing commands, keeping them warm and ready for fast failover if the leader changes.

In practice, the RocksDB state of a partition grows to around 2 GB under heavy load with long-running processes. Snapshot replication brings new or lagging followers fully up to date; it is not how followers normally maintain their state.

### Effects on disk growth

**Exporter or external system failure.** If a system an exporter depends on fails (for example, a lost connection to Elasticsearch), the exporter stops advancing its position and brokers can't truncate their logs. The log grows until the connection is restored. Size broker disks with enough headroom to keep operating through an outage.

During a [hot backup (soft-pause window)](/self-managed/components/orchestration-cluster/zeebe/operations/management-api.md#soft-pause-exports), log compaction is intentionally blocked for the backup's duration. This adds a predictable, temporary disk requirement: roughly `throughput × backup_window_duration` of extra log data per partition, replicated across followers. Size disks with headroom for at least one full backup window on top of steady-state estimates.

**Node failure.** Only the leader exports events, and only committed (replicated) events are passed to exporters. An exporter's read position is only captured in snapshots, never in the event log itself; it can't be reconstructed from the log alone. When a partition fails over to a new leader, the new leader reconstructs state by projecting the log from the last snapshot, but the exporter position resets to that snapshot too. This means an exporter can see the same events twice after a failover. Assign idempotent IDs in your exporter (the combination of record position and partition ID is a reliable unique key) if this matters for your system.

**Quorum loss.** If a partition drops below quorum (for example, two nodes down in a three-node cluster), the leader keeps accepting requests, but they aren't replicated or committed, so they can't be truncated, and the event log grows. The disk space needed to ride this out is a function of broker throughput and how long it takes to restore quorum; size nodes with enough headroom to absorb this failure mode.

## Memory

Memory usage is determined by the Java heap size (by default, [25% of the maximum RAM](https://docs.oracle.com/en/java/javase/21/gctuning/ergonomics.html#GUID-DA88B6A6-AF89-4423-95A6-BBCBD9FAE781)) and native memory usage (also 25% by default); the JVM can use up to 50% of available RAM.

Zeebe supports three RocksDB memory allocation strategies, configured using `CAMUNDA_DATA_PRIMARYSTORAGE_ROCKSDB_MEMORYALLOCATIONSTRATEGY`:

- **`PARTITION`** (shipped default for Self-Managed): Total RocksDB memory is calculated by multiplying the number of partitions on the broker by `CAMUNDA_DATA_PRIMARYSTORAGE_ROCKSDB_MEMORYLIMIT` (default: 512 MB).
- **`BROKER`**: Total RocksDB memory is equal to `..._MEMORYLIMIT` and is shared across all partitions on the broker, regardless of the number of partitions.
- **`FRACTION`**: Total RocksDB memory is calculated as `..._MEMORYFRACTION` (default: `0.1`, or 10%) of the broker's total system memory and is also shared across all partitions on the broker.

When hardcoding memory values using `PARTITION` or `BROKER`, consider the following:

- Zeebe relies heavily on memory-mapped files, so sufficient OS page cache is required. Insufficient page cache degrades I/O performance.
- Reserve 20-30% of total memory for the OS page cache as a starting point, adjusting based on observed performance. The right amount depends on partition count and system throughput.

The minimum memory usage (using the `PARTITION` strategy) is:

| Component          |                    Amount |
| ------------------ | ------------------------: |
| Java heap          |                       25% |
| Java native memory |                       25% |
| RocksDB            |  512 MB × partition count |
| OS page cache      |                    20-30% |
| **Sum**            | **x MB + 50% of max RAM** |

When using `FRACTION`, replace the RocksDB row with `memory-fraction × total memory` (10% by default) instead.

### Use `FRACTION` for primary storage

For primary storage on Self-Managed, explicitly set the strategy to `FRACTION` instead of relying on a fixed `..._MEMORYLIMIT`.

`PARTITION` and `BROKER` are absolute limits: if you resize a broker's memory or change its partition count, you have to remember to retune the limit too, or RocksDB's share of memory silently stays where it was. `FRACTION` scales with the broker's actual memory automatically. This mirrors the direction Camunda SaaS already takes for primary storage.

Set it explicitly, since Self-Managed still ships `PARTITION` as its default:

```yaml
camunda:
  data:
    primary-storage:
      rocks-db:
        memory-allocation-strategy: fraction
        memory-fraction: 0.1
```

:::caution
`FRACTION` splits its budget across **all** partitions on a broker, the same way `BROKER` does. Unlike `PARTITION`, it does not scale up with partition count. On a broker with many partitions but modest total memory, a flat 10% fraction can allocate less RocksDB memory than a previously tuned fixed limit would have. An optional minimum-floor setting for `FRACTION` is proposed in [camunda/camunda#57768](https://github.com/camunda/camunda/issues/57768) (open) to address exactly this; until it ships, verify the resulting absolute memory is enough for your partition count, and fall back to an explicit `..._MEMORYLIMIT` if it isn't.
:::

## Scale your cluster

Once you have a baseline configuration running, you can scale in several ways:

### Horizontal scaling

Add more brokers and partitions to increase throughput capacity. Partitions can be [scaled up](/self-managed/components/orchestration-cluster/zeebe/operations/cluster-scaling.md) but not down, so avoid over-provisioning.

When scaling horizontally, **secondary storage often becomes the limiting factor**. Adding brokers increases export volume to Elasticsearch/OpenSearch. If secondary storage isn't scaled accordingly, it will bottleneck overall throughput. See [Elasticsearch scaling](#elasticsearch-scaling) for guidance.

### Vertical scaling

Increase CPU and memory per broker. Note that there are **diminishing returns** due to component interdependencies. For example, Elasticsearch indexing speed can bottleneck broker throughput.

### Elasticsearch scaling

- **Memory:** Increase Elasticsearch memory to store more historical data without performance degradation.
- **Nodes:** Add Elasticsearch statefulset replicas for more IOPS and query throughput.
- **Disk size:** Increase disk size based on your data retention requirements. With Optimize enabled and a realistic payload (~11 KB), Elasticsearch disk can fill rapidly (for example, 128 Gi in under 12 hours at 1 PI/s with 30-day retention).
- **Disk type:** Use SSDs for Elasticsearch storage. Disk latency, not throughput, is the critical factor. HDD-backed Elasticsearch has been observed to cause 8–10s flush durations, a growing export backlog, increased broker memory from in-flight records, and up to ~70% throughput degradation versus an equivalent SSD setup. See the [slow disk chaos day experiment](https://camunda.github.io/zeebe-chaos/2026/06/19/Using-slow-disk-with-Camunda) for details, and [Export pipeline](data-flow.md#export-pipeline) for background on how slow secondary storage affects overall throughput.
- **Index replicas:** The disk estimates in the baseline tables above do not account for index-level replicas. In multi-node clusters, configure at least one replica per index for fault tolerance. Each replica stores a full copy of the primary shard data, approximately doubling total disk usage. See [managing replicas](/self-managed/concepts/secondary-storage/managing-secondary-storage.md#replicas).

## Secondary storage considerations

The resource tables above assume Elasticsearch as the secondary storage backend. If you are using a different backend:

- **OpenSearch:** Similar resource profile to Elasticsearch. The tables above generally apply.
- **RDBMS (PostgreSQL, available from 8.9):** Replace the Elasticsearch resource block with appropriately sized PostgreSQL resources. Adjust throughput expectations **downward by approximately 30%** compared to the Elasticsearch-based tables. Unlike Elasticsearch, RDBMS scales primarily **vertically** (a larger instance) rather than horizontally, so plan your initial sizing with more headroom, as adding capacity later is more disruptive.

:::note
Optimize is not supported with RDBMS. If you need Optimize, you must also run Elasticsearch alongside your RDBMS.
:::

See [Secondary storage](sizing-your-environment.md#secondary-storage) for more details.

## Next steps

Validate your chosen configuration by [running your own benchmarks](sizing-benchmarks.md).
