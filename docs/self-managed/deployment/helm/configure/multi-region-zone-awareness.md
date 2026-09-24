---
id: multi-region-zone-awareness
sidebar_label: Zone-aware multi-region
title: Configure zone-aware multi-region deployments
description: Configure the Camunda Helm chart to deploy an Orchestration Cluster across named zones, and understand what the chart derives from the zone list.
---

The Camunda Helm chart deploys an Orchestration Cluster across named zones through `orchestration.partitioning`. Each zone runs its own release of the chart, and every release describes the same cluster-wide topology, so the zone list is identical everywhere and only the local zone name changes.

For what zones are and how the application places partition replicas across them, see [zone-aware clusters](/self-managed/components/orchestration-cluster/zeebe/configuration/zone-aware-clusters.md).

## Move from global.multiregion

`global.multiregion` is deprecated since chart v15 (Camunda 8.10). Only the Orchestration Cluster ever read these keys, so they now live under `orchestration.partitioning`. The deprecated keys still work and still render; move them when convenient.

Two keys shipped under `global.multiregion`: `regions` and `regionId`, which configure the broker numbering used by [dual-region](/self-managed/concepts/multi-region/dual-region.md) deployments. They were renamed as well as moved, because the new block describes zones rather than regions:

| Deprecated key                | Replacement                                |
| :---------------------------- | :----------------------------------------- |
| `global.multiregion.regions`  | `orchestration.partitioning.numberOfZones` |
| `global.multiregion.regionId` | `orchestration.partitioning.zoneIndex`     |

The values are unchanged; only the names and their location are:

```yaml
# Before
global:
  multiregion:
    regions: 2
    regionId: 1

# After
orchestration:
  partitioning:
    numberOfZones: 2
    zoneIndex: 1
```

Keeping the old names under the new block fails the render. The schema declares `orchestration.partitioning` with `additionalProperties: false` and allows only `scheme`, `zone`, `zones`, `numberOfZones`, `zoneIndex`, and `keepUnzonedBrokers`, so the old pair is rejected with `additional properties 'regionId', 'regions' not allowed` rather than being silently ignored.

Both key paths produce the same broker numbering. The deprecated one renders identically and adds a deprecation warning. Setting both blocks fails the render rather than picking one, because neither is merged into the other and the ignored block would describe a topology you don't get.

Zone awareness is configured only under `orchestration.partitioning`. The `scheme`, `zone`, and `zones` keys have never existed under `global.multiregion`, so there is nothing to migrate for a zone-aware cluster.

## Choose a partitioning scheme

`orchestration.partitioning.scheme` selects how partitions are distributed and how brokers are identified. It mirrors the engine property `camunda.cluster.partitioning.scheme`, so the values are the engine's own enum, lower-cased and hyphenated. It does not set the number of partitions, which is `orchestration.partitionCount`; it sets how the replicas of those partitions are placed.

| Scheme        | Behavior                                                                                           |
| :------------ | :------------------------------------------------------------------------------------------------- |
| `round-robin` | Default. Brokers get numeric node IDs and the region is inferred from parity. Two regions at most. |
| `zone-aware`  | Brokers belong to named zones and are identified as `<zone>_<index>`. Any number of zones.         |

These are the two schemes the chart renders, not the whole engine enum. `camunda.cluster.partitioning.scheme` also accepts `FIXED`, which pins each partition to an explicit broker list. The chart has no value that produces it, so reach for it only through `orchestration.configuration`, which replaces the generated configuration outright.

Existing deployments keep their behavior: when you don't set `scheme`, the chart renders exactly as it did before zone awareness existed.

## The scheme is fixed for the life of the cluster

Zone-aware brokers are identified by the composite `<zone>_<index>` and round-robin brokers by a plain node ID, so switching `scheme` on a running release re-identifies every broker against Raft state written under the old identifiers, and the members stop recognizing each other.

:::warning
Changing `orchestration.partitioning.scheme` on a running release is not a values change you can apply on its own. Moving an existing cluster onto zone awareness requires the migration procedure, which keeps both broker generations alive through `orchestration.partitioning.keepUnzonedBrokers` and moves the partition distribution over with the cluster management API. Set the scheme when you create the cluster, or follow the procedure; do not edit the key in place.
:::

The chart states the same constraint at render time, so an upgrade that flips the scheme prints a warning rather than failing silently.

## Describe the topology

With the `zone-aware` scheme, set the local zone and list every zone in the cluster:

```yaml
orchestration:
  partitioning:
    scheme: zone-aware
    zone: region-a
    zones:
      - name: region-a
        numberOfBrokers: 2
        numberOfReplicas: 2
        priority: 100
      - name: region-b
        numberOfBrokers: 3
        numberOfReplicas: 3
        priority: 50
```

Use the same `zones` list in every region and change only `zone` to name the local one. The list accepts any number of zones; one, two, and three are the common cases.

Each zone field maps to an application property:

| Helm value         | Application property |
| :----------------- | :------------------- |
| `name`             | `name`               |
| `numberOfBrokers`  | `number-of-brokers`  |
| `numberOfReplicas` | `number-of-replicas` |
| `priority`         | `priority`           |

## Values the chart derives from the zone list

You describe the topology once, and the chart computes the rest. Knowing what it derives tells you which values you must not set yourself.

| Rendered setting                     | Derived from                                                     |
| :----------------------------------- | :--------------------------------------------------------------- |
| `camunda.cluster.size`               | Sum of `numberOfBrokers` across all zones                        |
| `camunda.cluster.replication-factor` | Sum of `numberOfReplicas` across all zones                       |
| StatefulSet replica count            | `numberOfBrokers` of the local zone                              |
| `CAMUNDA_CLUSTER_ZONE` in the pod    | `orchestration.partitioning.zone`                                |
| `camunda.cluster.node-id`            | The pod ordinal, which is the broker's index inside its own zone |

Because a zone-aware broker is addressed by the composite ID `<zone>_<index>`, the zone name is what keeps each broker unique across the cluster. The index restarts at `0` in every zone, and no cluster-wide offset applies.

### Provide initial contact points beyond one zone

The chart generates initial contact points only for a single-zone cluster, because one zone sits behind one headless service the chart can address itself. Once the cluster spans more than one zone, the chart cannot know how brokers reach each other across zones, so it generates nothing and you supply the list through the application environment variables.

A cluster spanning more than one zone with no contact points supplied **renders and installs**. The chart prints a `[camunda][warning]` telling you to set `CAMUNDA_CLUSTER_INITIALCONTACTPOINTS` through `orchestration.env`, but it does not fail the render, so a missing list surfaces as brokers that never form a cluster rather than as a failed `helm upgrade`. Treat the warning as an error.

One entry per zone is enough, and it does not have to name a specific broker. A contact point is resolved once, to a single address, so an entry pointing at a zone's headless Zeebe service reaches whichever broker pod DNS returns. That is sufficient: a broker only has to reach one live member to join, and SWIM membership gossip carries the rest of the cluster from there. The chart sets `publishNotReadyAddresses: true` on that service, so the name resolves to a pod during a cold start, before any broker is ready.

Listing every broker pod individually also works and tolerates more of the zone being down at bootstrap, at the cost of rewriting the list whenever a zone's broker count changes.

Contact points matter only while the cluster bootstraps. Once brokers have found each other, membership gossip carries new members, so a broker joining later does not need to appear in anyone's list.

## A single zone is still one cluster

Zone awareness with one zone provides named broker identities but cannot bias leaders between failure domains because every replica has the same zone priority. The chart treats it as one cluster throughout, generating the initial contact points as described above. Adding a second zone is what makes the deployment spread and lets different priorities influence leader placement.

:::note
Adding a zone that was not part of the original zone list is not a Helm-only change. The partition distribution has to be updated through the [cluster management API](/self-managed/components/orchestration-cluster/zeebe/operations/management-api.md#partition-distribution-api) as well, because existing partitions have to be told about the new zone.
:::

Declaring a zone you have not deployed yet trades that API step for a degraded cluster. The zone's replicas are assigned to brokers that are not running, so every partition permanently runs one zone short until you deploy it. That is only safe while the zones actually running still hold a majority of each partition's replicas, and it costs you the headroom to lose another zone. Treat it as a bounded step in a planned rollout, not as a way to keep zones in reserve: declare the zones you intend to run, and add a later one through the management API.

## Custom application configuration is not merged

`orchestration.configuration` replaces the generated application configuration rather than merging with it. With the `zone-aware` scheme the chart therefore does not inject `camunda.cluster.partitioning` into your custom content: if you supply `orchestration.configuration`, describe the zone-aware settings there yourself.

The chart still injects `CAMUNDA_CLUSTER_ZONE` into the pod environment, because that value is per-deployment rather than part of the shared configuration.

## What the chart validates

The chart rejects the inputs that would otherwise render a cluster that cannot form:

| Rejected                                                                                        | Why                                                                                                                                        |
| :---------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------- |
| `zone` or `zones` set while `scheme` is not `zone-aware`                                        | The topology would be ignored and the cluster would come up single-region with no bootstrap peers.                                         |
| `zone` unset, or naming a zone absent from `zones`                                              | The release would take the broker IDs of the first zone and collide with it.                                                               |
| A zone name that repeats                                                                        | Zone names are member ID prefixes, so a duplicate collapses two zones into one identity space.                                             |
| A zone with more `numberOfReplicas` than `numberOfBrokers`                                      | A zone cannot hold more replicas of a partition than it has brokers to hold them.                                                          |
| `orchestration.clusterSize` or `orchestration.replicationFactor` that contradicts the zone list | Both are derived from the zone list in zoned mode, so a stale value would be discarded in silence. Restating the derived total is allowed. |
| `numberOfZones` or `zoneIndex` carrying a non-default value                                     | They belong to the round-robin broker numbering that zone awareness replaces, so the zone list would silently lose to them.                |

The schema also requires each `zones` entry to declare `name`, `numberOfBrokers`, `numberOfReplicas`, and `priority`, with each numeric value at least `1`.

The last two are rejected only when they carry a non-default value. Helm gives no reliable way to tell a value you supplied from the chart default, so a key that happens to equal its default stays inert rather than failing the render. `numberOfZones` and `zoneIndex` are also allowed to carry their round-robin values while `keepUnzonedBrokers` is set, where they still describe the retained broker generation. None of these keys is removed, and all keep working with the `round-robin` scheme.

The application owns the checks the chart cannot make from values alone, including replica counts against the resulting partition distribution and the remaining zone constraints.

## Related resources

- [Zone-aware clusters](/self-managed/components/orchestration-cluster/zeebe/configuration/zone-aware-clusters.md): how the application places partition replicas and biases leadership across zones.
- [Configure pod scheduling](pod-scheduling.md): make Kubernetes schedule broker pods into the zones you assigned them to.
- [Multi-Region RDBMS](/self-managed/concepts/multi-region/multi-region-rdbms.md): a three-region architecture built on zone awareness.
