---
id: enabling-persistence
sidebar_label: Enabling component persistence
title: Enable persistent storage on Camunda components
description: "Learn how to enable persistent volume claims (PVCs) on Optimize, Web Modeler, and the orchestration cluster, and how to configure extra volume claim templates for Zeebe."
---

Several Camunda 8 components keep state on disk and accept optional persistent volume configuration in the Helm chart. Enabling these is straightforward, but a few values keys are easy to misconfigure. This guide walks through each component and shows a complete, working `values.yaml` you can drop into a Helm release.

A reference scenario covering all three options at once lives in the Helm chart repository at `charts/camunda-platform-8.9/test/integration/scenarios/chart-full-setup/values/features/persistence.yaml` (and the same path under `8.8`/`8.10`). It is exercised by nightly CI.

## When you need persistent volumes

By default, Optimize and Web Modeler use `emptyDir` volumes, which are tied to a pod's lifecycle. Most production deployments should switch to PVCs so that:

- Optimize cached state and temporary files survive pod restarts.
- Web Modeler's local file system cache is preserved across restarts.
- The orchestration StatefulSet can mount additional persistent volumes alongside its primary data volume.

If your cluster does not have a usable default storage class, set `storageClassName` explicitly on each component (see below).

## Enabling Optimize persistence

`optimize.persistence.enabled: true` creates two PVCs (`-data-camunda` and `-data-tmp`) that back Optimize's `/camunda` and `/tmp` directories. Optimize requires Elasticsearch as its secondary storage backend; this option does not apply to OpenSearch or RDBMS deployments.

```yaml
optimize:
  enabled: true
  persistence:
    enabled: true
    size: 10Gi # default; size to your data volume
    accessModes: ["ReadWriteOnce"]
    storageClassName: "" # set explicitly when no default exists
```

Common pitfalls:

- **Pod stuck in Pending with `PersistentVolumeClaim is not bound`** — your cluster has no default `StorageClass`. Set `optimize.persistence.storageClassName` to a valid class.
- **Wrong indentation under `optimize:`** — the keys must be nested under `optimize.persistence`, not at the chart root.

## Enabling Web Modeler persistence

`webModeler.persistence.enabled: true` creates a single PVC (`-webmodeler-data`) for the Web Modeler restapi component. Web Modeler also relies on a relational database for its primary state (PostgreSQL by default); the PVC is for ancillary local state only and does not replace the database.

```yaml
webModeler:
  persistence:
    enabled: true
    size: 5Gi
    accessModes: ["ReadWriteOnce"]
    storageClassName: ""
```

Common pitfalls:

- **`Helm install` fails with a YAML parse error** — make sure `persistence` is a map with `enabled: true`, not a boolean. The full schema is in `webModeler.persistence.*`.
- **PVC pending after install** — same root cause as Optimize: no default storage class on the cluster.

### Choosing the deployment update strategy

The Web Modeler restapi component runs as a single-replica `Deployment`. Its update strategy controls what happens during `helm upgrade`:

```yaml
webModeler:
  persistence:
    enabled: true
    deploymentStrategy: RollingUpdate # default; or "Recreate"
```

- **`RollingUpdate` (default)** is zero-downtime: the new pod becomes ready before the old pod is removed. This works **only** when the PVC supports concurrent attach — a `ReadWriteMany` access mode, or an `existingClaim` backed by RWX storage (NFS, EFS, Azure Files, etc.). On a `ReadWriteOnce` PVC the new pod cannot attach the volume held by the old pod and the rollout deadlocks with `Multi-Attach error`.
- **`Recreate`** terminates the old pod first, then starts the new one. Use this with the chart's default chart-managed PVC (which is `ReadWriteOnce`). The trade-off is brief downtime per upgrade (typically tens of seconds to a minute, depending on Web Modeler's startup time).

Pick `Recreate` if you let the chart create the PVC and your cluster's default storage class is RWO (the common case on GKE PD, EBS, Azure Disk). Pick `RollingUpdate` if you've supplied an `existingClaim` backed by an RWX volume.

## Adding extra volume claim templates to the orchestration StatefulSet

The orchestration cluster (in 8.8+) exposes `orchestration.extraVolumeClaimTemplates`, which is appended verbatim to the StatefulSet's `volumeClaimTemplates`. Each entry must be a valid PVC spec:

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

In chart `8.7` (which predates the unified orchestration component), use `zeebe.extraVolumeClaimTemplates` with the same shape.

:::warning
`volumeClaimTemplates` is **immutable** after the StatefulSet is created. To add or change an `extraVolumeClaimTemplates` entry on an existing release you must delete the StatefulSet (and optionally its PVCs) before running `helm upgrade`. Plan this configuration before your initial install.
:::

Common pitfalls:

- **`StatefulSet update forbidden`** during `helm upgrade` — you changed an entry on an existing release; see the warning above.
- **Missing `accessModes`** in a template — Kubernetes rejects the StatefulSet at admission time. Always include at least one access mode.
- **Wrong indentation** — `extraVolumeClaimTemplates` is an array of `{metadata, spec}` objects; a flat map will be silently dropped.

## Putting it all together

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

You should see PVCs for the bundled Elasticsearch master and PostgreSQL pods, plus:

- `<release>-camunda-platform-optimize-data-camunda` and `-tmp`
- `<release>-camunda-platform-webmodeler-data`
- `extra-data-<release>-zeebe-{0,1,2}`

All in `Status: Bound`. If any are `Pending`, re-check the storage class on your cluster.
