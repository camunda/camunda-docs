---
id: zone-aware-clusters
title: "Zone-aware clusters"
sidebar_label: "Zone-aware clusters"
description: "Zone awareness lets a cluster distribute brokers and partition replicas across zones (regions or availability zones) for resilience."
---

Zone awareness lets an Orchestration Cluster distribute its brokers and partition replicas across multiple **zones** — that is, regions or availability zones (AZs). Spreading replicas across zones ensures a cluster can survive the loss of an entire zone, and lets partition leadership be biased toward a preferred zone.

Zone awareness is **required for topologies with three or more zones**. Zone awareness also **simplifies managing zones**: brokers are named after the zone they belong to, so the topology is described in terms of zones rather than individual numeric node IDs.

Because zones are named explicitly, zone awareness also lets you **change the number of zones dynamically** — for example growing from one zone to two, or two to three — which is not possible with the legacy parity-based numbering.

Zone awareness is also useful in a **single-region setup**. By mapping zones to availability zones (AZs) and giving one AZ a higher priority, you can skew partition leaders to stay in that AZ. This keeps leader traffic to the writer instance of your RDBMS in the same AZ, reducing cross-AZ traffic and its associated cost. This matters most with an RDBMS, which has a single writer instance in one AZ. It is less important with Elasticsearch spread across three zones, where the load is distributed across AZs.

## When to use it

Zone awareness is the recommended approach for **new deployments**, whether single-region (to skew leaders to a preferred AZ), dual-region, or three or more zones.

:::note
Converting an existing, non-zone-aware cluster into a zoned cluster is not yet supported. Existing [dual-region](./dual-region.md) deployments continue to use the legacy numbering scheme. A supported way to zone an existing cluster will be provided later.
:::

## What is a zone?

A zone is a failure domain — typically a cloud region or availability zone — that brokers are grouped into. Each broker declares which zone it belongs to, and the cluster uses that information to:

- Place partition replicas across zones, so no single zone holds all replicas of a partition.
- Assign **Raft election priorities** per zone, so partition leaders are skewed toward the highest-priority zone.

Compared to the earlier fixed node-numbering scheme, zone awareness makes multi-region and multi-AZ setups simpler to configure across all deployment targets (Kubernetes, ECS, bare metal).

## How it works

Each broker is assigned to a zone through the `camunda.cluster.zone` setting. Internally, brokers are identified by a composite node ID of the form `<zone>_<index>`, combining the zone name and the broker's index within that zone. For a two-broker `us-east1` zone and a two-broker `us-west1` zone, the brokers are named:

```
us-east1_0
us-east1_1
us-west1_0
us-west1_1
```

The zone is part of the name, so the topology reads directly from the broker identifiers. Numeric node IDs are still available and continue to work for single-region and legacy dual-region setups.

### Comparison to legacy dual-region numbering

In the legacy [dual-region](./dual-region.md) setup, brokers are numbered `0, 1, 2, 3, …` and the region is inferred from the parity of the node ID: even IDs (`0, 2, 4, …`) belong to one region and odd IDs (`1, 3, 5, …`) to the other. This parity trick only works for exactly two regions and hides the region in the numbering. Zone awareness replaces it with explicit zone names, which is what makes three or more zones possible.

Partition distribution and leadership are driven by the **`ZONE_AWARE` partitioning scheme**. When this scheme is selected, you describe every zone in the cluster as a list, giving each zone:

- **`name`** — the zone identifier (must match the `camunda.cluster.zone` of the brokers in that zone).
- **`number-of-brokers`** — how many brokers are deployed in the zone.
- **`number-of-replicas`** — how many replicas of each replication group live in the zone.
- **`priority`** — higher values give the zone higher Raft election priority, biasing partition leaders toward it.

## Example configuration

The following configures a three-zone cluster where `us-east1` is the preferred zone for partition leaders:

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

- [Dual-region](./dual-region.md) — synchronous two-region setup.
