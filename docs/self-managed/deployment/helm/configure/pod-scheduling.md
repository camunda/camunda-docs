---
id: pod-scheduling
sidebar_label: Pod scheduling
title: Configure pod scheduling
description: Configure node selectors, tolerations, affinity, and topology spread constraints for Camunda component pods in Self-Managed Helm deployments.
---

The Camunda Helm chart exposes values that control where Kubernetes schedules component pods. Use these settings to place pods on specific nodes, tolerate node taints, or spread pods across failure domains such as availability zones.

## Configure scheduling values

Each of the following components supports `nodeSelector`, `tolerations`, and `affinity` values that map directly to the corresponding [Kubernetes pod spec fields](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/):

- `orchestration`
- `identity`
- `optimize`
- `connectors`
- `webModeler.restapi`
- `webModeler.websockets`

`global.nodeSelector` applies a node selector to all components that don't set their own.

By default, the chart configures a hard `podAntiAffinity` rule for the Orchestration Cluster so that no two broker pods are scheduled on the same node.

## Spread Orchestration Cluster pods across availability zones

The default `podAntiAffinity` rule ensures broker pods run on distinct nodes, but does not ensure those nodes are in different zones: if the cluster has more nodes than brokers, all brokers can still be scheduled into a single availability zone. Because broker persistent volumes are bound to a single zone on most cloud providers, a zonal outage can then take down the whole Orchestration Cluster.

With `orchestration.topologySpreadConstraints`, you can spread broker pods across zones. The value is a list of [Kubernetes topology spread constraints](https://kubernetes.io/docs/concepts/scheduling-eviction/topology-spread-constraints/) applied to the broker StatefulSet pods, and it is empty by default. This value does not affect other Orchestration Cluster components such as the gateway; there is no equivalent topology spread value for those components in the current chart version.

```yaml
orchestration:
  topologySpreadConstraints:
    - maxSkew: 1
      topologyKey: topology.kubernetes.io/zone
      whenUnsatisfiable: ScheduleAnyway
      labelSelector:
        matchLabels:
          app.kubernetes.io/component: zeebe-broker
```

Keep the following in mind when configuring topology spread constraints:

- Set a `topologyKey` that your nodes carry. `topology.kubernetes.io/zone` is standard on managed cloud clusters, but bare-metal and local clusters often have no zone label. With `whenUnsatisfiable: DoNotSchedule` and no matching node label, no broker can be scheduled at all.
- Prefer `whenUnsatisfiable: ScheduleAnyway`. It provides best-effort spreading: Kubernetes does not guarantee an even distribution and does not rebalance existing brokers. A hard constraint (`DoNotSchedule`) combined with the default hard `podAntiAffinity` can leave broker pods permanently `Pending` when zones have uneven node counts, or stall a rolling update — use it only when every zone has enough spare capacity.
- Broker volumes pin pods to a zone. With topology-constrained storage, `volumeBindingMode: WaitForFirstConsumer` delays volume binding or provisioning until the scheduler picks a node, so the volume matches that node's topology; `Immediate` binds or provisions the volume without considering pod scheduling constraints. Once a broker's claim is bound to a single-zone volume, every replacement pod must run in that zone: a hard zone constraint that conflicts with the volume's zone leaves the pod `Pending`, and enabling spreading on an existing cluster does not relocate existing volumes.
- The `labelSelector` counts pods across the whole namespace. Pods with matching labels from all Helm releases in the namespace are counted together, not only the release you are configuring. To scope spreading to a single release, also match `app.kubernetes.io/instance: <release-name>`.

Topology spread constraints control where Kubernetes schedules broker pods. They do not control where the application places partition replicas among brokers — configure [zone-aware clusters](/self-managed/concepts/multi-region/zone-aware-clusters.md) for that. Configure both together: topology spread constraints put each broker pod in the zone Kubernetes actually schedules it into, and zone awareness places partition replicas according to each broker's assigned zone.

For broader production hardening guidance, see the [production installation guide](/self-managed/deployment/helm/install/production/index.md#topology-spread-constraints).
