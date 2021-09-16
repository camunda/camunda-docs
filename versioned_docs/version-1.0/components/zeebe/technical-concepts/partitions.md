---
id: partitions
title: "Partitions"
---

> Note: If you have worked with the [Apache Kafka System](https://kafka.apache.org/) before, the concepts presented on this page will sound very familiar to you.

In Zeebe, all data is organized into _partitions_. A _partition_ is a persistent stream of process-related events. In a cluster of brokers, partitions are distributed among the nodes so it can be thought of as a _shard_. When you bootstrap a Zeebe cluster you can configure how many partitions you need.

## Usage examples

Whenever you deploy a process, you deploy it to the first partition. The process is then distributed to all partitions. On all partitions, this process receives the same key and version such that it can be consistently identified.

When you start an instance of a process, the client library will then route the request to one partition in which the process instance will be published. All subsequent processing of the process instance will happen in that partition.

## Distribution over partitions

When a process instance is created in a partition, its state is stored and managed by the same partition until its execution is terminated. The partition in which it is created is determined by various factors.

- When a client sends a command `CreateProcessInstance` or `CreateProcessInstanceWithResult`, gateway chooses a partition in a round-robin manner and forwards the requests to that partition. The process instance is created in that partition.
- When a client publishes a message to trigger a _message start event_, the message is forwarded to a partition based on the correlation key of the message. The process instance is created on the same partition where the message is published.
- Process instances created by _timer start events_ are always created on partition 1.

## Scalability

Use partitions to scale your process processing. Partitions are dynamically distributed in a Zeebe cluster and for each partition there is one leading broker at a time. This _leader_ accepts requests and performs event processing for the partition. Let us assume you want to distribute process processing load over five machines. You can achieve that by bootstraping five partitions.

Note that while each partition has one leading broker, _not all brokers are guaranteed to be leading a partition_. A broker can lead more than one partition, and, at times, a broker in a cluster may be acting only as a replication back-up for partitions. This broker will not be doing any active work on processes until a partition fail-over happens and the broker gets elected as the new leader for that partition.

## Partition data layout

A partition is a persistent append-only event stream. Initially, a partition is empty. As the first entry gets inserted, it takes the place of the first entry. As the second entry comes in and is inserted, it takes the place as the second entry and so on and so forth. Each entry has a position in the partition which uniquely identifies it.

![partition](assets/partition.png)

## Replication

For fault tolerance, data in a partition is replicated from the _leader_ of the partition to its _followers_. Followers are other Zeebe broker nodes that maintain a copy of the partition without performing event processing.

## Partition Distribution

If no other configuration is specified, partitions are distributed in a guaranteed round-robin fashion across all brokers in the cluster, considering the number of nodes, number of partitions, and the replication factor. For example, the first partition will always be hosted by the first node, plus the following nodes based on the replication factor. The second partition will be hosted on the second node and the following to fulfill the replication factor.

As an example the following partition schemes are guaranteed

### Example 1

#### Context

- Number of Nodes: 4
- Number of Partitions: 7
- Replication Factor: 3

#### Partition Layout

|             | Node 1 | Node 2 | Node 3 | Node 4 |
| -----------:|:------:|:------:|:------:|:------:|
| Partition 1 | X      | X      | X      |        |
| Partition 2 |        | X      | X      | X      |
| Partition 3 | X      |        | X      | X      |
| Partition 4 |        |        |        | X      |
| Partition 5 | X      | X      | X      |        |
| Partition 6 |        | X      | X      | X      |
| Partition 7 | X      |        | X      | X      |

### Example 2

#### Context

- Number of Nodes: 5
- Number of Partitions: 3
- Replication Factor: 3

#### Partition Layout

|             | Node 1 | Node 2 | Node 3 | Node 4 | Node 5 |
| -----------:|:------:|:------:|:------:|:------:|:------:|
| Partition 1 | X      | X      | X      |        |        |
| Partition 2 |        | X      | X      | X      |        |
| Partition 3 |        |        | X      | X      | X      |

## Recommendations

Choosing the number of partitions depends on the use case, workload, and cluster setup. Here are some rules of thumb:

- For testing and early development, start with a single partition. Note that Zeebe's process processing is highly optimized for efficiency, so a single partition can already handle high event loads.
- With a single Zeebe broker, a single partition is mostly enough. However, if the node has many cores and the broker is configured to use them, then more partitions can increase the total throughput (~ 2 threads per partition).
- Base your decisions on data. Simulate the expected workload, measure, and compare the performance of different partition setups.
