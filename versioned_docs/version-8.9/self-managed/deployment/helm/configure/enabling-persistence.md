---
id: enabling-persistence
sidebar_label: Enable component persistence
title: Enable persistent storage on Camunda components
description: "Learn how to enable persistent volume claims (PVCs) on Optimize, Web Modeler, and the orchestration cluster, and how to configure extra volume claim templates for the orchestration cluster."
---

Several Camunda 8 components keep state on disk and accept optional persistent volume configuration in the Helm chart. Enabling these is straightforward, but a few values keys are easy to misconfigure. This guide walks through each component and shows a complete, working `values.yaml` you can drop into a Helm release.

A reference scenario covering all three options at once lives in the Helm chart repository at `charts/camunda-platform-8.9/test/integration/scenarios/chart-full-setup/values/features/persistence.yaml`. It runs in nightly CI.

## When you need persistent volumes

By default, Optimize and Web Modeler use `emptyDir` volumes, which are tied to a pod's lifecycle. Most production deployments should switch to PVCs so that:

- Optimize cached state survives pod restarts.
- Web Modeler's local file system cache is preserved across restarts.
- The orchestration StatefulSet can mount additional persistent volumes alongside its primary data volume.

If your cluster does not have a usable default storage class, set `storageClassName` explicitly on each component (see below). Leaving `storageClassName` unset or empty makes Kubernetes use the cluster's default storage class.

## Enable Optimize persistence

`optimize.persistence.enabled: true` creates one PVC (`<fullname>-optimize-data`) mounted at Optimize's `/camunda` directory. The `/tmp` directory stays on an `emptyDir` volume.

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

## Enable Web Modeler persistence

`webModeler.persistence.enabled: true` adds persistent storage for the Web Modeler restapi component. Web Modeler also relies on a relational database for its primary state (PostgreSQL by default); this storage is for ancillary local state only and does not replace the database.

By default, the chart provisions the storage as a per-pod ephemeral volume claim. The PVC is created with the restapi pod and removed with it. To use a PVC you manage yourself, set `webModeler.persistence.existingClaim`.

```yaml
webModeler:
  persistence:
    enabled: true
    size: 5Gi
    accessModes: ["ReadWriteOnce"]
    # storageClassName: my-storage-class # set when the cluster has no default storage class
```

Common pitfalls:

- **`helm install` fails with a YAML parse error** — make sure `persistence` is a map with `enabled: true`, not a boolean. The full schema is in `webModeler.persistence.*`.
- **PVC pending after install** — same root cause as Optimize: no default storage class on the cluster.

### Choose the deployment update strategy

The Web Modeler restapi component runs as a `Deployment`. `webModeler.persistence.deploymentStrategy` controls what happens during `helm upgrade`. Choose the value based on whether you use `existingClaim`:

| Storage setup                              | Strategy                  | Why                                                                                                |
| ------------------------------------------ | ------------------------- | -------------------------------------------------------------------------------------------------- |
| Chart-managed storage (no `existingClaim`) | `RollingUpdate` (default) | Each pod gets its own ephemeral volume, so the old and new pods never compete for the same volume. |
| `existingClaim` backed by `ReadWriteMany`  | `RollingUpdate`           | RWX storage (NFS, EFS, Azure Files, and similar) can be attached by the old and new pod at once.   |
| `existingClaim` backed by `ReadWriteOnce`  | `Recreate`                | The new pod cannot attach an RWO volume held by the old pod, so the old pod must stop first.       |

The chart rejects `RollingUpdate` combined with an `existingClaim` that uses `ReadWriteOnce` at render time.

Example with a shared RWX claim and zero-downtime upgrades:

```yaml
webModeler:
  persistence:
    enabled: true
    existingClaim: webmodeler-shared-data # PVC you created with accessModes: ["ReadWriteMany"]
    accessModes: ["ReadWriteMany"]
    deploymentStrategy: RollingUpdate
```

Example with an RWO claim you manage yourself:

```yaml
webModeler:
  persistence:
    enabled: true
    existingClaim: webmodeler-data # PVC you created with accessModes: ["ReadWriteOnce"]
    accessModes: ["ReadWriteOnce"]
    deploymentStrategy: Recreate
```

`Recreate` terminates the old pod before starting the new one, which causes brief downtime per upgrade (typically tens of seconds to a minute, depending on Web Modeler's startup time).

## Add extra volume claim templates to the orchestration StatefulSet

The orchestration cluster runs Zeebe (together with Operate, Tasklist, and Identity) in a single StatefulSet configured under the `orchestration` key. Kubernetes resources and pods for this StatefulSet may still use the `zeebe` name, but all values described here belong under `orchestration`.

`orchestration.extraVolumeClaimTemplates` is appended verbatim to the StatefulSet's `volumeClaimTemplates`, next to the primary `data` volume claim template. Each entry must be a valid PVC spec:

```yaml
orchestration:
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

A complete `values.yaml` enabling all three options at once:

```yaml
optimize:
  enabled: true
  persistence:
    enabled: true
    size: 10Gi

webModeler:
  persistence:
    enabled: true
    size: 5Gi

orchestration:
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

You should see PVCs for the bundled Elasticsearch primary and PostgreSQL pods, plus:

- `<release>-camunda-platform-optimize-data`
- A PVC for the Web Modeler restapi pod, named after the pod
- `extra-data-<release>-zeebe-<ordinal>`, one per orchestration replica

With the default three replicas, the ordinals are `0`, `1`, and `2`. If you set `orchestration.clusterSize` higher, expect one PVC per replica (for example `0` through `4` for five replicas).

All in `Status: Bound`. If any are `Pending`, re-check the storage class on your cluster.
