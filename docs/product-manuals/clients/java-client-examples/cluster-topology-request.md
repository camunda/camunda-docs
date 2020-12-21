---
id: cluster-topology-request
title: "Request Cluster Topology"
---

Shows which broker is leader and follower for which partition. Particularly useful when you run a cluster with multiple Zeebe brokers.

## Related Resources

- [Clustering Basics](/product-manuals/zeebe/technical-concepts/clustering.md)

## Prerequisites

1. Running Zeebe broker with endpoint `localhost:26500` (default)

## TopologyViewer.java

[Source on github](https://github.com/zeebe-io/zeebe/tree/develop/samples/src/main/java/io/zeebe/example/cluster/TopologyViewer.java)

```java
final Topology topology = client.newTopologyRequest().send().join();

System.out.println("Topology:");
topology
    .getBrokers()
    .forEach(
        b -> {
        System.out.println("    " + b.getAddress());
        b.getPartitions()
            .forEach(
                p ->
                    System.out.println(
                        "      " + p.getPartitionId() + " - " + p.getRole()));
        });
```
