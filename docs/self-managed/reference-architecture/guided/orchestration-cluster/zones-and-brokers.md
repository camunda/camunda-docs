---
id: zones-and-brokers
title: "Zones and brokers"
sidebar_label: "Zones and brokers"
description: "Set the zones, brokers, replication factor, and partitions of a Camunda 8 Orchestration Cluster on Amazon ECS, and plan for growing to more regions."
pagination_prev: null
pagination_next: null
---

import { ChoicePanel, GuidedNext, GuidedProgress, GuidedWhen } from "@site/src/components/GuidedDeployment";

The zones of an Orchestration Cluster decide how many brokers it has, how many replicas each partition keeps, and where partition leaders run. This page covers the settings, and how to choose them so that you can add regions later.

<GuidedProgress />

## Start with zone-aware brokers

The stage runs zone-aware brokers from the first deployment. Each broker belongs to a zone, and its ID is `<zone>_<index>`, for example `zone-a_0`. A single region has one zone with three brokers.

Growing to a second region then adds a zone to the running cluster. The brokers that run keep their names, and the engine doesn't renumber them. A cluster that starts with numbered brokers needs an irreversible [migration](/self-managed/deployment/helm/operational-tasks/zone-aware-migration.md) before it can grow this way, so don't start with numbered brokers if you might add a region.

See [zone-aware clusters](/self-managed/components/orchestration-cluster/zeebe/configuration/zone-aware-clusters.md) for the concepts.

## Set zones, brokers, and replicas

<ChoicePanel question="zones" />

<GuidedWhen compute="ecs">

| Variable          | Default                                                       | Meaning                                                                                    |
| ----------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `zone`            | `zone-a`                                                      | The zone of this deployment. It must be one of the names in `zones`.                       |
| `zones`           | One zone, `zone-a`, with 3 brokers, 3 replicas, priority 1000 | Every zone of the cluster, with `number_of_brokers`, `number_of_replicas`, and `priority`. |
| `partition_count` | `3`                                                           | The number of partitions. Adding a zone doesn't change it.                                 |

The stage derives the rest from the zone list:

| Setting                | Value                                          |
| ---------------------- | ---------------------------------------------- |
| Cluster size           | The sum of `number_of_brokers` over the zones  |
| Replication factor     | The sum of `number_of_replicas` over the zones |
| Brokers in this region | `number_of_brokers` of the zone in `zone`      |

The priority decides where the leaders concentrate. Zeebe puts leaders in the zone with the highest priority, and moves them to the next zone when it fails.

</GuidedWhen>

## Plan for growth

- You can increase the number of brokers later. You can't reduce it without losing data.
- Each zone holds `number_of_replicas` replicas of every partition. With one zone of three brokers and three replicas, every partition has three replicas in the region. When you add a zone with three replicas, each region holds a full copy and the replication factor becomes six.
- Choose the layout before you add the second zone. With two zones, losing a region leaves half of the replicas and processing stops until you remove the failed zone. With three zones, no single zone should hold half of the replicas. See [grow to three regions](../grow/dual-to-three-regions.md).
- List only zones whose brokers run. A zone in the list receives replicas even if its brokers don't run.

<GuidedWhen compute="ecs">

## Troubleshoot zones and brokers

### zone must be one of the names in zones.

The value of `zone` isn't in the `zones` list. A broker looks its zone up in the list at startup and fails if it's missing. Add the zone to the list, or correct the name.

### zone must be set when zones is set.

You passed a zone list without saying which zone this deployment is. Set `zone`.

### cluster size (cluster_size, or task_desired_count when 0) must equal the sum of number_of_brokers over zones.

The number of brokers that the tasks start doesn't match the zone list. The Camunda stage derives both from `zones`. If you call the orchestration cluster module yourself, set `cluster_size` to the sum of `number_of_brokers`.

### zone must be at most 63 characters of [A-Za-z0-9-], starting with an alphanumeric.

The zone name is too long or has an unsupported character. Use letters, digits, and hyphens.

</GuidedWhen>

## Next steps

- [Deploy the Orchestration Cluster](./overview.md)
- [Grow to two regions](../grow/single-to-dual-region.md)

<GuidedNext />
