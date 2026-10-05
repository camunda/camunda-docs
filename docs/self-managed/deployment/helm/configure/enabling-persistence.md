---
id: enabling-persistence
sidebar_label: Enable component persistence
title: Enable persistent storage on Camunda components
description: "Learn how to enable persistent volume claims (PVCs) on Optimize, Camunda Hub (Web Modeler), and the orchestration cluster, and how to configure extra volume claim templates for the orchestration cluster."
---

Several Camunda 8 components keep state on disk and accept optional persistent volume configuration in the Helm chart. Enabling these is straightforward, but a few values keys are easy to misconfigure. This guide walks through each component and ends with a combined set of values you can merge into your Helm release.

A reference scenario that includes these options lives in the Helm chart repository at `charts/camunda-platform-8.10/test/integration/scenarios/chart-full-setup/values/features/persistence.yaml`. It runs in nightly CI.

## When you need persistent volumes

By default, Optimize and Camunda Hub use `emptyDir` volumes, which are tied to a pod's lifecycle. Most production deployments should switch to PVCs so that:

- Optimize cached state survives pod restarts.
- Camunda Hub's temporary files can live on a volume you manage instead of node-local `emptyDir` storage.
- The orchestration StatefulSet can mount additional persistent volumes alongside its primary data volume.

If your cluster does not have a usable default storage class, set `storageClassName` explicitly on each component (see below). Leaving `storageClassName` unset or empty makes Kubernetes use the cluster's default storage class.

## Enable Optimize persistence

`optimize.persistence.enabled: true` creates one PVC, `<fullname>-optimize-data`, mounted at Optimize's `/camunda` directory. The `/tmp` directory stays on an `emptyDir` volume. If you set `optimize.persistence.existingClaim` instead, the chart creates no PVC and mounts that claim at `/camunda`.

```yaml
optimize:
  enabled: true
  persistence:
    enabled: true
    size: 10Gi # default; size to your data volume
    accessModes: ["ReadWriteOnce"]
    # storageClassName: my-storage-class # set when the cluster has no default storage class
```

Common pitfalls:

- **Pod stuck in Pending with `PersistentVolumeClaim is not bound`** — your cluster has no default `StorageClass`. Set `optimize.persistence.storageClassName` to a valid class.
- **Wrong indentation under `optimize:`** — the keys must be nested under `optimize.persistence`, not at the chart root.

## Enable Camunda Hub (Web Modeler) persistence

Camunda Hub includes the Web Modeler component, and its persistence settings apply to the Web Modeler restapi pod. Kubernetes resources still use the `web-modeler` name, for example `<release>-web-modeler-restapi`.

`camundaHub.persistence.enabled: true` replaces the `emptyDir` volume mounted at `/tmp` in the restapi pod with a volume claim. Camunda Hub keeps its primary state in a relational database such as PostgreSQL; this volume holds local temporary files only and does not replace the database.

By default, the chart provisions the volume as a per-pod [ephemeral volume](https://kubernetes.io/docs/concepts/storage/ephemeral-volumes/#generic-ephemeral-volumes). Kubernetes creates the PVC, named `<pod-name>-tmp`, together with the restapi pod and deletes it when the pod is deleted, so its contents do not survive a pod replacement. To keep the data across pod replacements, create a PVC yourself and reference it with `camundaHub.persistence.existingClaim`.

:::note
The legacy `webModeler.enabled` and `webModeler.persistence.*` keys still work in 8.10 but are deprecated. Values under `camundaHub.*` take precedence over them.
:::

```yaml
camundaHub:
  enabled: true
  persistence:
    enabled: true
    size: 5Gi
    accessModes: ["ReadWriteOnce"]
    # storageClassName: my-storage-class # set when the cluster has no default storage class
```

Common pitfalls:

- **`helm install` fails with a YAML parse error** — make sure `persistence` is a map with `enabled: true`, not a boolean. The full schema is in `camundaHub.persistence.*`.
- **PVC pending after install** — same root cause as Optimize: no default storage class on the cluster.

### Choose the deployment update strategy

The restapi component runs as a single-replica `Deployment`. `camundaHub.persistence.deploymentStrategy` controls what happens during `helm upgrade`. Choose the value based on whether you use `existingClaim`:

| Storage setup                              | Strategy                  | Why                                                                                                |
| ------------------------------------------ | ------------------------- | -------------------------------------------------------------------------------------------------- |
| Chart-managed storage (no `existingClaim`) | `RollingUpdate` (default) | Each pod gets its own ephemeral volume, so the old and new pods never compete for the same volume. |
| `existingClaim` backed by `ReadWriteMany`  | `RollingUpdate`           | RWX storage (NFS, EFS, Azure Files, and similar) can be attached by the old and new pod at once.   |
| `existingClaim` backed by `ReadWriteOnce`  | `Recreate`                | If the new pod is scheduled on another node, it cannot attach the RWO volume held by the old pod.  |

With an RWO `existingClaim` and `RollingUpdate`, the chart renders without error, but the rollout can stall with a `Multi-Attach error`. The chart rejects `Recreate` unless `camundaHub.persistence.enabled` is `true`.

Example with a shared RWX claim and zero-downtime upgrades:

```yaml
camundaHub:
  enabled: true
  persistence:
    enabled: true
    existingClaim: hub-shared-data # PVC you created with accessModes: ["ReadWriteMany"]
    accessModes: ["ReadWriteMany"]
    deploymentStrategy: RollingUpdate
```

Example with an RWO claim you manage yourself:

```yaml
camundaHub:
  enabled: true
  persistence:
    enabled: true
    existingClaim: hub-data # PVC you created with accessModes: ["ReadWriteOnce"]
    accessModes: ["ReadWriteOnce"]
    deploymentStrategy: Recreate
```

`Recreate` terminates the old pod before starting the new one, which causes brief downtime per upgrade (typically tens of seconds to a minute, depending on the restapi startup time).

## Add extra volume claim templates to the orchestration StatefulSet

The orchestration cluster runs Zeebe (together with Operate, Tasklist, and Identity) in a single StatefulSet configured under the `orchestration` key. Kubernetes resources and pods for this StatefulSet may still use the `zeebe` name, but all values described here belong under `orchestration`.

`orchestration.extraVolumeClaimTemplates` is appended verbatim to the StatefulSet's `volumeClaimTemplates`, next to the primary `data` volume claim template. Each entry must be a valid PVC spec. The chart does not mount these volumes automatically, so add a matching entry to `orchestration.extraVolumeMounts`:

```yaml
orchestration:
  extraVolumeMounts:
    - name: extra-data # must match the template's metadata.name
      mountPath: /usr/local/extra-data
  extraVolumeClaimTemplates:
    - metadata:
        name: extra-data
      spec:
        accessModes: ["ReadWriteOnce"]
        resources:
          requests:
            storage: 1Gi
```

Extra volume claim templates require `orchestration.persistenceType: disk`, which is the default. With `memory` or `local`, the chart does not render any `volumeClaimTemplates`, and `extraVolumeClaimTemplates` is silently ignored.

:::warning
`volumeClaimTemplates` is **immutable** after the StatefulSet is created. Plan this configuration before your initial install. To add or change an `extraVolumeClaimTemplates` entry on an existing release:

1. Delete only the StatefulSet object, for example with `kubectl delete statefulset <name> --cascade=orphan`, so the pods and PVCs stay in place.
2. Delete only the specific extra PVCs you intend to discard, if any.
3. Run `helm upgrade`.

Never delete the primary `data-<statefulset>-<ordinal>` PVCs unless you intend to lose broker data.
:::

Common pitfalls:

- **`StatefulSet update forbidden`** during `helm upgrade` — you changed an entry on an existing release; see the warning above.
- **Missing `accessModes`** in a template — Kubernetes rejects the StatefulSet at admission time. Always include at least one access mode.
- **Wrong indentation** — `extraVolumeClaimTemplates` is an array of `{metadata, spec}` objects; a flat map will be silently dropped.

## Put it all together

The following values enable all three options at once. Merge them into your existing values file; they do not replace the rest of your configuration, such as secondary storage and Identity settings.

```yaml
optimize:
  enabled: true
  persistence:
    enabled: true
    size: 10Gi

camundaHub:
  enabled: true
  persistence:
    enabled: true
    size: 5Gi

orchestration:
  extraVolumeMounts:
    - name: extra-data
      mountPath: /usr/local/extra-data
  extraVolumeClaimTemplates:
    - metadata:
        name: extra-data
      spec:
        accessModes: ["ReadWriteOnce"]
        resources:
          requests:
            storage: 1Gi
```

After `helm install`, verify with:

```bash
kubectl -n <namespace> get pvc
```

You should see the orchestration cluster's primary `data-<release>-zeebe-<ordinal>` PVCs, plus:

- `<release>-camunda-platform-optimize-data`
- `<restapi-pod-name>-tmp`, the ephemeral PVC for the restapi pod. It is recreated with each new pod.
- `extra-data-<release>-zeebe-<ordinal>`, one per orchestration replica

With the default three replicas, the ordinals are `0`, `1`, and `2`. If you set `orchestration.clusterSize` higher, expect one PVC per replica (for example `0` through `4` for five replicas).

All in `Status: Bound`. If any are `Pending`, re-check the storage class on your cluster.
