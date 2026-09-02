---
id: multi-region-zone-awareness
sidebar_label: Zone-aware multi-region
title: Configure zone-aware multi-region deployments
description: Configure the Camunda Helm chart to deploy an Orchestration Cluster across named zones, and understand what the chart derives from the zone list.
---

The Camunda Helm chart deploys an Orchestration Cluster across named zones through `orchestration.multiregion`. Each zone runs its own release of the chart, and every release describes the same cluster-wide topology, so the zone list is identical everywhere and only the local zone name changes.

For what zones are and how the application places partition replicas across them, see [zone-aware clusters](/self-managed/components/orchestration-cluster/zeebe/configuration/zone-aware-clusters.md).

## Move from global.multiregion

`global.multiregion` is deprecated since chart v15 (Camunda 8.10) and will be removed in v16 (Camunda 8.11). Only the Orchestration Cluster ever read these keys, so they now live under `orchestration.multiregion` with the same five field names.

To migrate, move the block and change nothing else:

```yaml
# Before
global:
  multiregion:
    mode: zoned
    zone: region-a

# After
orchestration:
  multiregion:
    mode: zoned
    zone: region-a
```

The deprecated block still works and renders exactly the same topology, with a deprecation warning. Setting both blocks fails the render rather than picking one, because neither is merged into the other and the ignored block would describe a topology you don't get.

## Choose a multi-region mode

`orchestration.multiregion.mode` selects how the chart numbers brokers and describes the topology.

| Mode     | Behavior                                                                                           |
| :------- | :------------------------------------------------------------------------------------------------- |
| `legacy` | Default. Brokers get numeric node IDs and the region is inferred from parity. Two regions at most. |
| `zoned`  | Brokers belong to named zones and are identified as `<zone>_<index>`. Any number of zones.         |

Existing deployments keep their behavior: when you don't set `mode`, the chart renders exactly as it did before zone awareness existed.

## Describe the topology

In `zoned` mode, set the local zone and list every zone in the cluster:

```yaml
orchestration:
  multiregion:
    mode: zoned
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
| `CAMUNDA_CLUSTER_ZONE` in the pod    | `orchestration.multiregion.zone`                                 |
| `camunda.cluster.node-id`            | The pod ordinal, which is the broker's index inside its own zone |

Because a zone-aware broker is addressed by the composite ID `<zone>_<index>`, the zone name is what keeps each broker unique across the cluster. The index restarts at `0` in every zone, and no cluster-wide offset applies.

### Provide initial contact points beyond one zone

The chart generates initial contact points only for a single-zone cluster, because one zone sits behind one headless service the chart can address itself. Once the cluster spans more than one zone, the chart cannot know how brokers reach each other across zones, so it generates nothing and you supply the list through the application environment variables.

Contact points matter only while the cluster bootstraps. Once brokers have found each other, membership gossip carries new members, so a broker joining later does not need to appear in anyone's list.

## Legacy keys are rejected in zoned mode

`orchestration.multiregion.regions` and `orchestration.multiregion.regionId` belong to the legacy numbering and cannot be combined with `zoned` mode. The chart fails the render when either carries a non-default value, that is, `regions` other than `1` or `regionId` other than `0`.

Helm values give no reliable way to tell an explicitly supplied default from the chart default, so the chart rejects only non-default values and leaves the default-valued keys inert. Neither key is removed or renamed, and both keep working in `legacy` mode.

## Custom application configuration is not merged

`orchestration.configuration` replaces the generated application configuration rather than merging with it. In `zoned` mode the chart therefore does not inject `camunda.cluster.partitioning` into your custom content: if you supply `orchestration.configuration`, describe the zone-aware settings there yourself.

The chart still injects `CAMUNDA_CLUSTER_ZONE` into the pod environment, because that value is per-deployment rather than part of the shared configuration.

## What the chart validates

The chart checks only what it needs to render a correct topology:

- `orchestration.multiregion.zone` is set.
- `orchestration.multiregion.zone` names one of the entries in `orchestration.multiregion.zones`.
- Each `zones` entry declares `name`, `numberOfBrokers`, `numberOfReplicas`, and `priority`, with broker and replica counts of at least `1` and a non-negative priority.

The application owns the semantic checks the chart cannot make, including duplicate zone names, replica counts against the resulting partition distribution, topology totals, and zone constraints.

## Related resources

- [Zone-aware clusters](/self-managed/components/orchestration-cluster/zeebe/configuration/zone-aware-clusters.md): how the application places partition replicas and biases leadership across zones.
- [Configure pod scheduling](pod-scheduling.md): make Kubernetes schedule broker pods into the zones you assigned them to.
- [Multi-Region RDBMS](/self-managed/concepts/multi-region/multi-region-rdbms.md): a three-region architecture built on zone awareness.
