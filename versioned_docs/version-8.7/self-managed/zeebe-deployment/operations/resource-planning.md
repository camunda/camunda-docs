---
id: resource-planning
title: "Resource planning"
keywords:
  [
    "backpressure",
    "back-pressure",
    "back pressure",
    "resources",
    "disk space",
    "memory",
  ]
---

The short answer to “_what resources and configuration will I need to take Zeebe to production?_” is: it depends.

While we cannot tell you exactly what you need, we can explain what depends, what it depends on, and how it depends on it.

## Disk space

All brokers in a partition use disk space to store the following:

- The event log for each partition they participate in. By default, this is a minimum of _128MB_ for each partition, incrementing in 128MB segments. The event log is truncated on a given broker when data has been processed and successfully exported by all loaded exporters.
- One periodic snapshot of the running state (in-flight data) of each partition (unbounded, based on in-flight work).

Additionally, the leader of a partition also uses disk space to store a projection of the running state of the partition in RocksDB (unbounded, based on in-flight work).

To calculate the required amount of disk space, the following "back of the envelope" formula can be used as a starting point:

```
neededDiskSpace = replicatedState + localState

replicatedState = totalEventLogSize + totalSnapshotSize

totalEventLogSize = followerPartitionsPerNode * eventLogSize * reserveForPartialSystemFailure

totalSnapshotSize = partitionsPerNode * singleSnapshotSize * 2
// singleSnapshotSize * 2:
//   the last snapshot (already replicated) +
//   the next snapshot (in transit, while it is being replicated)

partitionsPerNode = leaderPartitionsPerNde + followerPartitionsPerNode

leaderPartitionsPerNode = partitionsCount / numberOfNodes
followerPartitionsPerNode = partitionsCount * replicationFactor / numberOfNodes

clusterSize = [number of broker nodes]
partitionsCount = [number of partitions]
replicationFactor = [number of replicas per partition]
reserveForPartialSystemFailure = [factor to account for partial system failure]
singleSnapshotSize = [size of a single rocks DB snapshot]
eventLogSize = [event log size for duration of snapshotPeriod]
```

Some observations on the scaling of the factors above:

- `eventLogSize`: This factor scales with the throughput of your system.
- `totalSnapshotSize`: This factor scales with the number of in-flight processes.
- `reserveForPartialSystemFailure`: This factor is supposed to be a reserve to account for partial system failure (e.g. loss of quorum inside Zeebe cluster, or loss of connection to external system). See the remainder of this document for a further discussion on the effects of partial system failure on Zeebe cluster and disk space provisioning.

Many of the factors influencing the above formula can be fine-tuned in the [configuration](../configuration/configuration.md). The relevant configuration settings are:

```yaml
Config file
    zeebe:
      broker:
        data:
          logSegmentSize: 128MB
          snapshotPeriod: 5m
        cluster:
          partitionsCount: 1
          replicationFactor: 1
          clusterSize: 1

Environment Variables
  ZEEBE_BROKER_DATA_LOGSEGMENTSIZE = 128MB
  ZEEBE_BROKER_DATA_SNAPSHOTPERIOD = 5m
  ZEEBE_BROKER_CLUSTER_PARTITIONSCOUNT = 1
  ZEEBE_BROKER_CLUSTER_REPLICATIONFACTOR = 1
  ZEEBE_BROKER_CLUSTER_CLUSTERSIZE = 1
```

Other factors can be observed in a production-like system with representative throughput.

By default, this data is stored in the following:

- `segments` - The data of the log split into segments. The log is only appended, and its data can be deleted when it becomes part of a new snapshot.
- `state` - The active state. Deployed processes, active process instances, etc. Completed process instances or jobs are removed.
- `snapshot` - A state at a certain point in time.

> **Pitfalls**
>
> To avoid exceeding your disk space, here are a few pitfalls to avoid:
>
> - Do not configure an exporter which does not advance its record position (such as the Debug Exporter).

If you do configure an exporter, ensure you monitor its availability and health, as well as the availability and health the exporter depends on.
This is the Achilles' heel of the cluster. If data cannot be exported, it cannot be removed from the cluster and will accumulate on disk. See _effect of exporters and external system failure_ further on in this document for an explanation and possible buffering strategies.

### Event log

The event log for each partition is segmented. By default, the segment size is 128MB.

The event log grows over time, unless and until individual event log segments are deleted.

An event log segment can be deleted once:

- All the events it contains have been processed by exporters.
- All the events it contains have been replicated to other brokers.
- All the events it contains have been processed.

The following conditions inhibit the automatic deletion of event log segments:

- A cluster loses its quorum. In this case, events are queued but not processed. Once a quorum is reestablished, events are replicated and eventually event log segments are deleted.
- An exporter does not advance its read position in the event log. In this case, the event log grows ad infinitum.

An event log segment is not deleted until all the events in it are exported by all configured exporters. This means exporters that rely on side effects, perform intensive computation, or experience backpressure from external storage will cause disk usage to grow, as they delay the deletion of event log segments.

Exporting is only performed on the partition leader, but the followers of the partition do not delete segments in their replica of the partition until the leader marks all events in it as unneeded by exporters.

We make sure that event log segments are not deleted too early. No event log segment is deleted until a snapshot is taken that includes that segment. When a snapshot is taken, the event log is only deleted up to that point.

### Snapshots

The running state of the partition is captured periodically on the leader in a snapshot. By default, this period is every five minutes. This can be changed in the [configuration](../configuration/configuration.md).

A snapshot is a projection of all events that represent the current running state of the processes running on the partition. It contains all active data, for example, deployed processes, active process instances, and not yet completed jobs.

When the broker writes a new snapshot, it deletes all data on the log which was written before the latest snapshot.

:::note
We tested the snapshot interval via a Zeebe Chaos experiment. Learn more about this experiment and snapshot intervals in our [Zeebe Chaos blog](https://camunda.github.io/zeebe-chaos/2022/02/01/High-Snapshot-Frequency/#snapshot-interval).
:::

### RocksDB

On the lead broker of a partition, the current running state is kept in memory and on disk in RocksDB. In our experience, this grows to 2GB under a heavy load of long-running processes. The snapshots replicated to followers are snapshots of RocksDB.

### Effect of exporters and external system failure

If an external system relied on by an exporter fails (for example, if you are exporting data to Elasticsearch and the connection to the Elasticsearch cluster fails), the exporter will not advance its position in the event log, and brokers cannot truncate their logs. The broker event log grows until the exporter is able to reestablish the connection and export the data.

To ensure your brokers are resilient in the event of external system failure, give them sufficient disk space to continue operating without truncating the event log until the connection to the external system is restored.

### Effect on exporters of node failure

Only the leader of a partition exports events. Only committed events (events that have been replicated) are passed to exporters. The exporter then updates its read position. The exporter read position is only replicated between brokers in the snapshot. It is not itself written to the event log. This means _an exporter’s current position cannot be reconstructed from the replicated event log, only from a snapshot_.

When a partition fails over to a new leader, the new leader is able to construct the current partition state by projecting the event log from the point of the last snapshot. The position of exporters cannot be reconstructed from the event log, so it is set to the last snapshot. This means an exporter can see the same events twice in the event of a fail-over.

You should assign idempotent ids to events in your exporter if this is an issue for your system. The combination of record position and partition ID is reliable as a unique ID for an event.

### Effect of quorum loss

If a partition goes under quorum (for example, if two nodes in a 3-node cluster go down), the leader of the partition continues to accept requests, but these requests are not replicated and are not marked as committed. In this case, they cannot be truncated. This causes the event log to grow. The amount of disk space needed to continue operating in this scenario is a function of the broker throughput and the amount of time to quorum being restored. You should ensure your nodes have sufficient disk space to handle this failure mode.

## Memory

Memory usage is based on the Java heap size (by default [25% of the max RAM](https://docs.oracle.com/en/java/javase/21/gctuning/ergonomics.html#GUID-DA88B6A6-AF89-4423-95A6-BBCBD9FAE781)) and native memory usage (also by default 25% of the max RAM, so Java itself will use **up to** 50% of the maximum RAM.

RocksDB will then allocate [512MB per partition](https://github.com/camunda/camunda/blob/main/dist/src/main/config/broker.yaml.template#L963) by default.

Some memory is required for the OS page cache since Zeebe makes heavy use of memory mapped files. Too little page cache will result in slow I/O performance.

The minimum memory usage is:

| Component           |                   Amount |
| ------------------- | -----------------------: |
| Java Heap           |                      25% |
| Java Native Memory  |                      25% |
| RocksDB             |  512MB \* partitionCount |
| OS Page Cache       |                        ? |
| ------------------- | ------------------------ |
| Sum                 |    x MB + 50% of max RAM |
| ------------------- | ------------------------ |
