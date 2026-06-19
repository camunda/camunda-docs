---
sidebar_label: Helm upgrade
title: Upgrade Helm chart
description: "Upgrade to a more recent version of the Camunda Helm charts, and view configuration changes between versions."
---

import ZeebeGrid from '../../../components/zeebe/react-components/\_zeebe-card';
import { helmIndexCards } from './../react-components/\_card-data';
import { HelmChartValuesFileBitnamiLegacyLink } from "@site/src/components/CamundaDistributions";

Upgrade a Camunda 8 Self-Managed deployment installation using the official Camunda Helm charts.

:::caution earlier versions
If you are upgrading from a version earlier than 8.8, see [upgrading from an earlier version](/self-managed/upgrade/index.md#upgrading-from-an-earlier-version).
:::

:::warning Plan your move to the Helm v4 CLI
Camunda 8.9 (chart 14.x) is the last minor that supports the Helm v3 CLI. Camunda 8.10 (chart 15.x) requires the Helm v4 CLI. Chart 14.x also supports Helm v4, so switch your tooling to the Helm v4 CLI while running 8.9 to be ready before you upgrade to 8.10. No release-state migration is required when switching CLIs. See [Move from the Helm v3 CLI to v4](/self-managed/deployment/helm/operational-tasks/moving-helm-v3-to-v4.md).
:::

## Upgrade guides

Use the following guides to upgrade a Camunda 8 Self-Managed deployment installation using the official Camunda Helm charts.

<ZeebeGrid zeebe={helmIndexCards} />

:::note Patch upgrades within the same minor version
For patch upgrades within the same minor version, such as `8.8.9` to `8.8.23`, there is no separate upgrade guide unless a specific patch's release notes specify additional required actions. Use the Helm chart [version matrix](https://helm.camunda.io/camunda-platform/version-matrix/) to identify the chart version for your target Camunda patch version, and review the relevant patch release notes before upgrading.
:::

### Helm chart version

The Camunda Helm chart version is independent from the Camunda application version. Use the Helm chart [version matrix](https://helm.camunda.io/camunda-platform/version-matrix/) to identify the Helm chart version that deploys Camunda 8.9.

You can also list available chart versions using the Helm CLI:

```bash
helm repo update
helm search repo camunda/camunda-platform --versions
```

## Upgrade notes

### Bitnami Docker repository migration

On August 28, 2025, Bitnami migrated its container images from [bitnami](https://hub.docker.com/u/bitnami) to [bitnamilegacy](https://hub.docker.com/u/bitnamilegacy). The Camunda Helm charts have been updated to use the new repository.

If you are still using a Camunda Helm chart that references the old repository, use the <HelmChartValuesFileBitnamiLegacyLink/> to override the image repositories.

See the [Bitnami GitHub announcement](https://github.com/bitnami/containers/issues/83267) for details.

### Web Modeler restapi ephemeral volume

Patched 8.9 charts replace the chart-managed shared persistent volume claim (PVC) for the Web Modeler `restapi` component with a per-pod ephemeral volume. The shared PVC (`<release>-webmodeler-data`) is removed from the chart. Kubernetes creates a dedicated PVC for each `restapi` pod when it starts and removes it when the pod terminates. The `/tmp` directory backed by this volume holds only scratch and cache data — Web Modeler content is stored in PostgreSQL, the document store, and Elasticsearch.

For most deployments, no action is required. The following table shows what to expect based on your `webModeler.persistence` configuration:

| Setting | Upgrade behavior |
| :--- | :--- |
| `enabled: false` (default) | No change. Your pod continues using `emptyDir`. No action required. |
| `enabled: true`, no `existingClaim` | `helm upgrade` succeeds. Each pod now uses a per-pod ephemeral PVC. The old `<release>-webmodeler-data` PVC is no longer managed by Helm and becomes an orphan. Clean it up after upgrading (see [Clean up the orphaned PVC](#clean-up-the-orphaned-pvc)). |
| `enabled: true`, `existingClaim` set | No change. Your pod continues mounting your existing PVC. No action required. |

#### Clean up the orphaned PVC

If you previously set `webModeler.persistence.enabled: true` without `existingClaim`, a `<release>-webmodeler-data` PVC may exist in your namespace after upgrading. This PVC is no longer referenced by the chart and will not be deleted automatically.

1. Confirm the `restapi` pod is running and ready before proceeding:

   ```bash
   kubectl get pods -n <namespace> | grep restapi
   ```

1. Check whether the orphaned PVC exists:

   ```bash
   kubectl get pvc -n <namespace> | grep webmodeler-data
   ```

1. If the PVC exists, delete it:

   ```bash
   kubectl delete pvc <release>-webmodeler-data -n <namespace>
   ```

No data migration is needed. The PVC backed only `/tmp` scratch content.

On GKE, EKS, and AKS, the old PVC was most likely in `Pending` state with no backing disk. The default `WaitForFirstConsumer` storage class defers disk provisioning until a pod is scheduled, so if `restapi` never reached a `Running` state, no disk was ever provisioned.

On clusters using an `Immediate` binding storage class, a physical disk may have been provisioned when the PVC was created. Deleting the PVC releases the underlying disk. No data is at risk.

## Related resources

- [Helm chart version matrix](https://helm.camunda.io/camunda-platform/version-matrix/)
- [Component upgrade from 8.8 to 8.9](/self-managed/upgrade/components/880-to-890.md)
