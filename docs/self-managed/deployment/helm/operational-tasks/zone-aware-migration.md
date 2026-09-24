---
id: zone-aware-migration
title: Migrate to zone-aware brokers
sidebar_label: Migrate to zone-aware brokers
description: Migrate an existing single-region or dual-region Orchestration Cluster from numbered brokers to zone-aware brokers with Helm.
---

This procedure migrates an existing Orchestration Cluster from numbered broker identities to zone-aware broker identities with the Camunda 8.10 Helm chart. You can migrate both single-region and dual-region clusters.

The migration creates replacement brokers instead of changing the persisted identity of existing brokers. The numbered and zone-aware broker generations run together until the cluster has moved its partitions and membership to the new brokers.

## Migration overview

The migration follows the same steps for single-region and dual-region clusters. The only difference is the number of zones and Helm releases involved.

| Topology      | Helm releases                         | Zones                        | Zone migration order                      |
| ------------- | ------------------------------------- | ---------------------------- | ----------------------------------------- |
| Single-region | One release in one Kubernetes cluster | One zone                     | The single zone                           |
| Dual-region   | One release per Kubernetes cluster    | One zone per region, 2 total | `zoneIndex: 1` first, then `zoneIndex: 0` |

In a dual-region cluster, the primary zone is the region with `zoneIndex: 0`, whose numbered brokers have even node IDs. The secondary zone is the region with `zoneIndex: 1`, whose numbered brokers have odd node IDs. You must start a dual-region migration with the secondary zone (`zoneIndex: 1`). The numbered broker with node ID `0` belongs to the primary zone and coordinates cluster configuration changes. Migrating the secondary zone first keeps this coordinator in place while the other zone migrates. If you start with the primary zone, the management API rejects the request with an error similar to:

```text
Zone migration must proceed from the highest remaining zone index to the lowest. Expected next zoneIndex 1 but got 0.
```

The procedure consists of these steps:

1. Upgrade every release to the chart version that supports zone-aware migration.
1. Upgrade every release with zone-aware values that keep the numbered brokers.
1. Update the persisted partitioning configuration once.
1. For each zone, add the zone's zone-aware brokers to the cluster with the management API, then remove the numbered brokers of that zone's release. In a dual-region cluster, start with the zone of `zoneIndex: 1`.

## Before you begin

- [Back up the Orchestration Cluster](/self-managed/operational-guides/backup-restore/backup-and-restore.md) before you start this procedure.
- Confirm that the existing Helm releases and their numbered brokers are healthy. See [Check broker health](#check-broker-health).
- Confirm that each Kubernetes cluster has enough capacity (nodes) for both broker generations and their persistent volume claims (PVCs).
- Back up the values used by each Helm release.
- Suspend planned node drains, autoscaler scale-down, and other maintenance that could evict broker pods until the migration is complete.
- For a dual-region cluster, use the same complete zone topology in every Helm release. Each release selects only the zone that belongs to its Kubernetes cluster.

The examples in this procedure use these variables. For a dual-region cluster, set them separately for each Kubernetes cluster and release.

```bash
export RELEASE="camunda-platform"
export NAMESPACE="camunda"
export CHART="camunda/camunda-platform"
export CHART_VERSION="<chart-version>"
export VALUES="values.yaml"
export LOCAL_ZONE="zone-a"
export MANAGEMENT_URL="http://127.0.0.1:9600"
```

Replace the example values with values from your installation. Set `CHART_VERSION` to the Camunda 8.10 chart version that supports zone-aware migration.

### Access the management API

Use the [Orchestration management API](/self-managed/components/orchestration-cluster/zeebe/operations/management-api.md) to change the cluster topology. To reach it, and for its port, security, and TLS options, see [About this API](/self-managed/components/orchestration-cluster/zeebe/operations/management-api.md#about-this-api). Set `MANAGEMENT_URL` to the resulting address. For a dual-region cluster, you can send the management API requests through either region, but you need access to the brokers in each region to check their health.

For example, forward the management port of the release's gateway Service to your machine:

```bash
kubectl port-forward "svc/$RELEASE-zeebe-gateway" 9600:9600 --namespace "$NAMESPACE"
```

During the migration, this Service selects both the numbered and the zone-aware brokers. You can send the requests through any of them, because each broker forwards cluster configuration requests to the broker that coordinates the change.

Several requests in this procedure start an asynchronous configuration change and return a `changeId`. Track each change as described in [Monitor a configuration change](/self-managed/components/orchestration-cluster/zeebe/operations/management-api.md#monitor-a-configuration-change), and continue only after it reaches the `COMPLETED` status.

### Check broker health

Check broker health with the [health check endpoint](/self-managed/components/orchestration-cluster/zeebe/operations/health.md#health-check) of each broker pod. A finished rollout and an `ACTIVE` state in `GET /actuator/cluster` don't prove that the brokers can process: a broker passes its readiness probe and stays `ACTIVE` in the topology even if its partitions fail to start.

Query each broker pod directly, not through a Service, for example after `kubectl port-forward pod/<broker-pod> 9600:9600 --namespace "$NAMESPACE"`:

```bash
curl --fail "$MANAGEMENT_URL/actuator/health/status"
```

A healthy broker returns HTTP `200`. If a broker returns `503`, check its logs and resolve the problem before you continue.

Only brokers that belong to the logical cluster report healthy. During the migration, these brokers are expected to report unhealthy:

- Zone-aware brokers of a zone that you haven't migrated yet.
- Numbered brokers of a zone that you have migrated but not yet removed from the release.

## Upgrade to the migration chart

Upgrade each existing release to the chart version that supports zone-aware migration, with its existing values unchanged. For a dual-region cluster, upgrade one release at a time.

Keep `orchestration.partitioning.keepUnzonedBrokers` disabled during this chart upgrade. Wait for the rollout to finish before you enable the migration flag. If you enable the flag in the same command as the chart upgrade, numbered brokers can restart during migration.

```bash
helm upgrade "$RELEASE" "$CHART" \
  --version "$CHART_VERSION" \
  --namespace "$NAMESPACE" \
  --values "$VALUES" \
  --wait \
  --timeout 15m
```

After each rollout, [check that every broker is healthy](#check-broker-health) before you upgrade the next release or enable the migration flag.

## Configure the zone-aware values

Add the zone-aware configuration to the values of each release. The `zones` list describes the complete target topology, and `zone` selects the zone owned by this release.

Keep these values unchanged while `keepUnzonedBrokers` is `true`, because they still describe the retained numbered brokers:

| Value                                      | Required value during migration                                                                                                      |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| `orchestration.clusterSize`                | The existing numbered cluster size. The chart divides it by `numberOfZones` to size the numbered StatefulSet.                        |
| `orchestration.replicationFactor`          | The current replication factor of the cluster.                                                                                       |
| `orchestration.partitioning.numberOfZones` | The number of regions of the numbered deployment: `1` for single-region, `2` for dual-region. `clusterSize` must be divisible by it. |
| `orchestration.partitioning.zoneIndex`     | The region index of this release in the numbered deployment: `0` for single-region, `0` or `1` for dual-region.                      |

For a single-region cluster, you can omit `numberOfZones` and `zoneIndex`. The chart defaults to `numberOfZones: 1` and `zoneIndex: 0`.

If the existing values use the deprecated `global.multiregion` block, remove it when you add `orchestration.partitioning`. Set `numberOfZones` to the former `regions` value and `zoneIndex` to the former `regionId` value. The chart rejects values that configure both blocks.

The sum of the zones' `numberOfReplicas` values must equal the cluster's current replication factor. If the target topology needs a higher factor, see [Update the partitioning configuration](#update-the-partitioning-configuration).

### Single-region example

This example migrates a single-region cluster with `clusterSize: 3` and `replicationFactor: 3`:

```yaml
orchestration:
  clusterSize: "3"
  replicationFactor: "3"
  partitioning:
    scheme: zone-aware
    zone: zone-a
    zones:
      - name: zone-a
        numberOfBrokers: 3
        numberOfReplicas: 3
        priority: 100

    # Keep the numbered brokers during the migration.
    keepUnzonedBrokers: true
```

### Dual-region example

This example migrates a dual-region cluster with `clusterSize: 8` and `replicationFactor: 4`. The values below belong to the primary region. In the secondary region's release, set `zone: zone-b` and `zoneIndex: 1`, and keep everything else identical.

```yaml
orchestration:
  clusterSize: "8"
  replicationFactor: "4"
  partitioning:
    scheme: zone-aware

    # The zone owned by this Helm release and Kubernetes cluster.
    zone: zone-a

    # Include every zone, not only the local zone. Use the same list
    # in every participating Helm release.
    zones:
      - name: zone-a
        numberOfBrokers: 4
        numberOfReplicas: 2
        priority: 100
      - name: zone-b
        numberOfBrokers: 4
        numberOfReplicas: 2
        priority: 90

    # Keep the numbered brokers during the migration.
    keepUnzonedBrokers: true

    # Values of the existing numbered brokers.
    numberOfZones: 2
    zoneIndex: 0
```

### Check the dual-region networking

A dual-region cluster already has cross-cluster networking in place, as described in [dual-region setup](/self-managed/concepts/multi-region/dual-region.md). The zone-aware brokers reuse the existing `CAMUNDA_CLUSTER_INITIALCONTACTPOINTS` value and DNS setup, so you don't need to configure new networking. Single-region clusters can skip this section.

Before you start the migration, check how the existing values address the brokers:

- **Initial contact points:** Addresses of the shared headless Service, such as `camunda-zeebe.camunda-london.svc.cluster.local:26502`, keep working during and after the migration, because the Service selects both the numbered and the zone-aware brokers. Addresses of individual numbered pods, such as `camunda-zeebe-0.camunda-zeebe.camunda-london.svc.cluster.local:26502`, stop resolving when you remove the numbered brokers. Replace them with the shared Service address.
- **Advertised host:** The chart applies `orchestration.env` to every broker pod in the release, including both the numbered and the zone-aware StatefulSet. If the values set `CAMUNDA_CLUSTER_NETWORK_ADVERTISEDHOST` to a fixed value, several brokers advertise the same address. Derive the advertised host from each pod instead.

For example, if brokers use host networking, advertise the node IP of each pod, and configure pod anti-affinity so that no two broker pods, numbered or zone-aware, run on the same node:

```yaml
orchestration:
  hostNetwork: true
  env:
    - name: CAMUNDA_CLUSTER_NETWORK_ADVERTISEDHOST
      valueFrom:
        fieldRef:
          fieldPath: status.hostIP
```

## Start the migration

Upgrade each release with the zone-aware values. For a dual-region cluster, upgrade one release at a time, and confirm that its brokers are ready before you upgrade the next release.

```bash
helm upgrade "$RELEASE" "$CHART" \
  --version "$CHART_VERSION" \
  --namespace "$NAMESPACE" \
  --values "$VALUES" \
  --wait \
  --timeout 15m
```

Each release now contains both the existing numbered StatefulSet and a new zone-specific StatefulSet. Wait for the zone-specific brokers to become ready before you continue. Don't remove the numbered brokers yet. The new brokers haven't joined the logical cluster, so the numbered brokers are still the only active members.

[Check that the numbered brokers are still healthy](#check-broker-health). The new zone-aware brokers report unhealthy until you migrate their zone.

## Update the partitioning configuration

Use the [partitioning API](/self-managed/components/orchestration-cluster/zeebe/operations/management-api.md#partitioning-api) once to update the persisted partitioning configuration. For a dual-region cluster, send this request only once, through either region.

The order of the zones is significant during this one-time migration. The first zone must be the zone of the numbered brokers with `zoneIndex: 0`, the second zone the one with `zoneIndex: 1`.

The sum of the zones' `numberOfReplicas` values must equal the cluster's current replication factor. Otherwise, the request fails with an error similar to:

```text
Sum of zone replicas [2] must equal the current replication factor [1] before zone migration starts.
```

If the target topology needs a higher factor, first increase the numbered cluster's replication factor with the [cluster scaling API](/self-managed/components/orchestration-cluster/zeebe/operations/cluster-scaling.md#2c-scaling-only-partitions), and [monitor the change](/self-managed/components/orchestration-cluster/zeebe/operations/management-api.md#monitor-a-configuration-change) until it completes. Then set `orchestration.replicationFactor` in the values of every release to the new factor and upgrade the releases, so the retained numbered brokers use the updated configuration.

For a dual-region cluster, send:

```bash
curl --fail --request PUT \
  "$MANAGEMENT_URL/actuator/cluster/partitioning" \
  --header 'Content-Type: application/json' \
  --data @- <<'JSON'
{
  "config": {
    "scheme": "ZONE_AWARE",
    "zones": [
      {"name": "zone-a", "numberOfReplicas": 2, "priority": 100},
      {"name": "zone-b", "numberOfReplicas": 2, "priority": 90}
    ]
  }
}
JSON
```

For a single-region cluster, send a single zone:

```bash
curl --fail --request PUT \
  "$MANAGEMENT_URL/actuator/cluster/partitioning" \
  --header 'Content-Type: application/json' \
  --data @- <<'JSON'
{
  "config": {
    "scheme": "ZONE_AWARE",
    "zones": [
      {"name": "zone-a", "numberOfReplicas": 3, "priority": 100}
    ]
  }
}
JSON
```

The response includes a `changeId`. [Monitor the change](/self-managed/components/orchestration-cluster/zeebe/operations/management-api.md#monitor-a-configuration-change) until it completes.

## Migrate each zone

Migrate one zone at a time. For each zone, add its zone-aware brokers to the cluster with the management API, then remove the numbered brokers of that zone's release. Removing the numbered brokers right after each zone frees their CPU and memory before you migrate the next zone, which helps when cluster capacity is tight.

- For a single-region cluster, migrate the single zone.
- For a dual-region cluster, migrate the secondary zone (`zoneIndex: 1`) first, then the primary zone (`zoneIndex: 0`). Don't start with the primary zone, and don't migrate both zones concurrently.

### Add the zone's brokers to the cluster

Use the [zone migration endpoint](/self-managed/components/orchestration-cluster/zeebe/operations/management-api.md#migrate-a-zone-to-a-zone-aware-topology) to add the zone's zone-aware brokers to the cluster. The new brokers take over the partitions of the zone's numbered brokers, and the numbered brokers leave the cluster. Before you send the request, [check that every broker in the logical cluster is healthy](#check-broker-health). A partition that can't start blocks the migration, and the change stays `IN_PROGRESS`.

For a dual-region cluster, you can send the request through either region. Set `LOCAL_ZONE` to the zone to migrate:

```bash
curl --fail --request PUT \
  "$MANAGEMENT_URL/actuator/cluster/zones" \
  --header 'Content-Type: application/json' \
  --data "{\"zone\":\"$LOCAL_ZONE\"}"
```

The response includes a `changeId`. [Monitor the change](/self-managed/components/orchestration-cluster/zeebe/operations/management-api.md#monitor-a-configuration-change) until it completes.

After the change completes, use [`GET /actuator/cluster` in the Cluster API](/self-managed/components/orchestration-cluster/zeebe/operations/management-api.md#cluster-api) to check the topology:

```bash
curl --fail "$MANAGEMENT_URL/actuator/cluster"
```

In the response, confirm that:

- The zone-aware brokers of the migrated zone, with IDs such as `zone-a_0`, are listed with `"state": "ACTIVE"` and host the expected partitions.
- The numbered brokers of the migrated zone, with numeric IDs such as `0`, are no longer listed.
- The zone-aware brokers of the migrated zone [report healthy](#check-broker-health).

Leave `keepUnzonedBrokers: true` if the zone migration is incomplete. Don't remove the numbered Kubernetes resources while a numbered broker of the zone still owns a partition or remains in cluster membership.

### Remove the numbered brokers of the migrated zone

After the zone migration completes and the zone's numbered brokers no longer own partitions or belong to the logical cluster, remove them from the release that owns the zone. In a dual-region cluster, the other release keeps `keepUnzonedBrokers: true` and its migration values until you migrate its zone.

Update the values of the release as follows:

- Set `keepUnzonedBrokers: false`.
- Remove `numberOfZones` and `zoneIndex`.
- Remove `orchestration.clusterSize` and `orchestration.replicationFactor`, or set them to the totals of the `zones` list.
- Keep the same complete `zones` list and the local `zone` value.

With the zone-aware scheme and without numbered brokers, the chart derives the cluster size and replication factor from the `zones` list. If the values still contain conflicting settings, the upgrade fails with errors similar to these:

```text
orchestration.partitioning.numberOfZones and orchestration.partitioning.zoneIndex cannot be used with the zone-aware scheme; the zone list describes the topology instead.
orchestration.clusterSize is <size> but orchestration.partitioning.zones sums to <total> brokers.
orchestration.replicationFactor is <factor> but orchestration.partitioning.zones sums to <total> replicas.
```

For example, the secondary region (`zoneIndex: 1`) of the dual-region cluster uses these values:

```yaml
orchestration:
  partitioning:
    scheme: zone-aware
    zone: zone-b
    zones:
      - name: zone-a
        numberOfBrokers: 4
        numberOfReplicas: 2
        priority: 100
      - name: zone-b
        numberOfBrokers: 4
        numberOfReplicas: 2
        priority: 90
    keepUnzonedBrokers: false
```

Upgrade the release:

```bash
helm upgrade "$RELEASE" "$CHART" \
  --version "$CHART_VERSION" \
  --namespace "$NAMESPACE" \
  --values "$VALUES" \
  --wait \
  --timeout 15m
```

The upgrade removes the numbered StatefulSet and pods. The zone-aware StatefulSet and shared Services remain managed by Helm. Helm doesn't delete the numbered PVCs, so they remain bound.

For a dual-region cluster, repeat the steps in [Migrate each zone](#migrate-each-zone) for the primary zone (`zoneIndex: 0`).

## Verify the migration

After you migrate every zone and remove the numbered brokers from every release, query the cluster topology through the management API:

```bash
curl --fail "$MANAGEMENT_URL/actuator/cluster"
```

Confirm that:

- The `partitioning` object in the response reports `"scheme": "ZONE_AWARE"` and lists every zone.
- Every zone-aware broker, such as `zone-a_0` and `zone-b_0`, is `ACTIVE` and hosts the expected partitions.
- No numbered broker is listed.
- Every zone-aware broker [reports healthy](#check-broker-health).
- No numbered StatefulSet or pod remains in any release, for example with `kubectl get statefulsets,pods --namespace "$NAMESPACE"`.

Don't delete the numbered PVCs until you have confirmed these checks. Then delete them explicitly according to your storage-retention policy.

## Roll back an incomplete migration

If the management API migration is incomplete, keep `keepUnzonedBrokers: true`. Leave both broker generations running while you correct or reverse the management API changes.

Don't delete the numbered PVCs as part of a rollback. If the numbered resources were removed before the migration completed, stop and follow your deployment's recovery procedure to restore them from the retained PVCs.
