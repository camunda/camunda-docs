---
id: zone-aware-clusters
title: "Zone-aware clusters"
sidebar_label: "Zone-aware clusters"
description: "With zone awareness, a cluster distributes brokers and partition replicas across zones (regions or availability zones) for resilience."
---

With zone awareness, an Orchestration Cluster distributes its brokers and partition replicas across multiple zones (regions or availability zones). Spreading replicas across zones lets the cluster survive the loss of an entire zone and bias partition leadership toward a preferred zone.

Zone awareness is required for topologies with three or more zones. It also simplifies managing zones: brokers are named after the zone they belong to, so you describe the topology in terms of zones rather than individual numeric node IDs.

Because zones are named explicitly, zone awareness also lets you change the number of zones dynamically (for example, growing from one zone to two, or two to three), which is not possible with the legacy parity-based numbering.

Zone awareness is also useful in a single-region setup. By mapping zones to availability zones (AZs) and giving one AZ a higher priority, you can skew partition leaders to stay in that AZ. Keeping leaders in one AZ reduces cross-AZ traffic to the single writer instance of a relational database (RDBMS), which lowers the associated cost. This optimization matters less for Elasticsearch, which distributes load across all three zones.

## When to use zone awareness

Zone awareness is the recommended approach for new deployments, whether single-region (to skew leaders to a preferred AZ), dual-region, or three or more zones.

:::note
Converting an existing, non-zone-aware cluster into a zoned cluster is not yet supported. Existing [dual-region](./dual-region.md) deployments continue to use the legacy numbering scheme. Camunda will add a supported way to zone an existing cluster in a future release.
:::

## What is a zone?

A zone is a failure domain, typically a cloud region or availability zone, into which brokers are grouped. Each broker declares which zone it belongs to, and the cluster uses that information to:

- Place partition replicas across zones, so no single zone holds all replicas of a partition.
- Assign Raft election priorities per zone, so partition leaders are skewed toward the highest-priority zone.

Compared to the legacy numbering scheme, zone awareness makes multi-region and multi-AZ setups simpler to configure across all deployment targets (Kubernetes, Amazon ECS, bare metal).

## How zone awareness works

You assign each broker to a zone through the `camunda.cluster.zone` setting. Internally, brokers are identified by a composite node ID of the form `<zone>_<index>`, combining the zone name and the broker's index within that zone. For a two-broker `us-east1` zone and a two-broker `us-west1` zone, the brokers are named:

```text
us-east1_0
us-east1_1
us-west1_0
us-west1_1
```

The zone is part of the name, so you can read the topology directly from the broker identifiers. Numeric node IDs still work for single-region and legacy dual-region setups.

### Partitioning scheme

The `ZONE_AWARE` partitioning scheme drives partition distribution and leadership. When you select this scheme, you describe every zone in the cluster as a list, giving each zone the following properties:

| Property             | Description                                                                                     |
| :------------------- | :---------------------------------------------------------------------------------------------- |
| `name`               | The zone identifier. Must match the `camunda.cluster.zone` of the brokers in that zone.         |
| `number-of-brokers`  | How many brokers are deployed in the zone.                                                      |
| `number-of-replicas` | How many replicas of each replication group live in the zone.                                   |
| `priority`           | Higher values give the zone higher Raft election priority, biasing partition leaders toward it. |

### Comparison to legacy dual-region numbering

In the legacy [dual-region](./dual-region.md) setup, brokers are numbered `0, 1, 2, 3, …` and the region is inferred from the parity of the node ID: even IDs (`0, 2, 4, …`) belong to one region and odd IDs (`1, 3, 5, …`) to the other. This parity-based approach only works for exactly two regions and hides the region in the numbering. Zone awareness replaces it with explicit zone names, which is what makes three or more zones possible.

## Example configuration

The following configures a three-zone cluster in which `us-east1` is the preferred zone for partition leaders:

```yaml
camunda:
  cluster:
    size: 5
    replication-factor: 5
    # set per broker; env: CAMUNDA_CLUSTER_ZONE
    zone: us-east1
    partitioning:
      scheme: ZONE_AWARE
      zone-aware:
        zones:
          - name: us-east1
            number-of-brokers: 2
            number-of-replicas: 2
            priority: 1000
          - name: us-west2
            number-of-brokers: 2
            number-of-replicas: 2
            priority: 500
          - name: eu-west1
            number-of-brokers: 1
            number-of-replicas: 1
            priority: 10
```

Each broker sets its own `camunda.cluster.zone`, while the `zone-aware.zones` list is the same across all brokers in the cluster.

For the full list of properties and their environment-variable equivalents, see the [cluster configuration reference](../../components/orchestration-cluster/core-settings/configuration/properties.md).

## Related resources

- [Dual-region](./dual-region.md): synchronous two-region setup.
- [Zeebe clustering](/components/zeebe/technical-concepts/clustering.md): how brokers, partitions, and replication work.
