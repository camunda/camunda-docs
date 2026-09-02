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
- `webModeler.webapp`
- `webModeler.websockets`
- `console`

`global.nodeSelector` applies a node selector to all components that don't set their own.

By default, the chart configures a hard `podAntiAffinity` rule for the Orchestration Cluster so that no two broker pods are scheduled on the same node.

## Spread Web Modeler pods across availability zones

Use a stable Pod label you control to spread Web Modeler replicas without depending on labels managed by the Helm chart.

Set the same label key and value in `podLabels` and `affinity`:

```yaml
webModeler:
  enabled: true
  restapi:
    replicas: 2
    podLabels:
      scheduling.example.com/affinity-group: web-modeler-restapi
    affinity:
      podAntiAffinity:
        preferredDuringSchedulingIgnoredDuringExecution:
          - weight: 100
            podAffinityTerm:
              labelSelector:
                matchLabels:
                  scheduling.example.com/affinity-group: web-modeler-restapi
              topologyKey: topology.kubernetes.io/zone
```

Apply the same pattern to `webModeler.webapp` and `webModeler.websockets`.

The same `podLabels` and `affinity` pairing applies to every component listed in [Configure scheduling values](#configure-scheduling-values). Prefer a label you own over chart-managed labels such as `app.kubernetes.io/component`, because their values can change between chart versions.

For the Orchestration Cluster, overriding `orchestration.affinity` replaces the default hard `podAntiAffinity` rule. To spread broker pods across zones, use [`orchestration.topologySpreadConstraints`](#spread-orchestration-cluster-pods-across-availability-zones) instead.

Consider the following when you configure Pod anti-affinity:

- Use a label key with a DNS prefix you control. If multiple Helm releases share a namespace, choose a label value unique to each component and release because Pod affinity selectors use the current namespace by default.
- Ensure every eligible node has the label named by `topologyKey`. Managed cloud clusters normally set `topology.kubernetes.io/zone`.
- A preferred rule is best effort and can colocate Pods when no better placement is available. A required rule can leave Pods `Pending` or stall rolling updates when the cluster lacks capacity in enough topology domains.
- Avoid inter-Pod affinity and anti-affinity for clusters larger than several hundred nodes because they add substantial scheduler processing.

## Spread Orchestration Cluster pods across availability zones

The default `podAntiAffinity` rule ensures broker pods run on distinct nodes, but does not ensure those nodes are in different zones: if the cluster has more nodes than brokers, all brokers can still be scheduled into a single availability zone. Because broker persistent volumes are bound to a single zone on most cloud providers, a zonal outage can then take down the whole Orchestration Cluster.

With `orchestration.topologySpreadConstraints`, you can spread broker pods across zones. The value is a list of [Kubernetes topology spread constraints](https://kubernetes.io/docs/concepts/scheduling-eviction/topology-spread-constraints/) applied to the Orchestration Cluster StatefulSet pods, and it is empty by default. Those pods run the Zeebe broker and gateway in the same process, so this value covers both. It does not affect separately deployed components such as Identity, Optimize, Connectors, or Web Modeler, which have no equivalent topology spread value in the current chart version — use their `affinity` values instead.

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

For broader production hardening guidance, see the [production installation guide](/self-managed/deployment/helm/install/production/index.md#topology-spread-constraints).
