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

## Upgrade guides

Use the following guides to upgrade a Camunda 8 Self-Managed deployment installation using the official Camunda Helm charts.

<ZeebeGrid zeebe={helmIndexCards} />

### Helm chart version

The Camunda Helm chart version is independent from the Camunda application version. Use the Helm chart [version matrix](https://helm.camunda.io/camunda-platform/version-matrix/) to identify the Helm chart version that deploys Camunda 8.9.

You can also list available chart versions using the Helm CLI:

```bash
helm repo update
helm search repo camunda/camunda-platform --versions
```

## Upgrade notes

### Web Modeler PVC name fix (chart 14.0.2+)

:::warning Web Modeler persistence workaround migration
Helm chart versions 14.0.0 and 14.0.1 contain a bug where the Web Modeler restapi deployment references a PersistentVolumeClaim named `<release>-webModeler-data` (capital M), while the PVC template creates it as `<release>-webmodeler-data` (lowercase). This mismatch causes the restapi pod to remain `Pending` when `webModeler.persistence.enabled=true`.

**Chart 14.0.2+ fixes this issue.** No action is required in most cases because:

- If you never enabled `webModeler.persistence`, you are not affected.
- If you enabled it and the pod was stuck `Pending`, upgrading to chart 14.0.2+ resolves the issue automatically — the existing PVC (created with the correct lowercase name) will be mounted.

**Action required only if** you manually created a PVC named `<release>-webModeler-data` (capital M) as a workaround for the bug. In this case, after upgrading to chart 14.0.2+, the deployment will look for the lowercase name and will not find your manually-created PVC. To resolve this:

- Set `webModeler.persistence.existingClaim` to the name of your manually-created PVC, **or**
- Migrate your data from the manually-created PVC to the correctly-named PVC (`<release>-webmodeler-data`).
:::

### Bitnami Docker repository migration

On August 28, 2025, Bitnami migrated its container images from [bitnami](https://hub.docker.com/u/bitnami) to [bitnamilegacy](https://hub.docker.com/u/bitnamilegacy). The Camunda Helm charts have been updated to use the new repository.

If you are still using a Camunda Helm chart that references the old repository, use the <HelmChartValuesFileBitnamiLegacyLink/> to override the image repositories.

See the [Bitnami GitHub announcement](https://github.com/bitnami/containers/issues/83267) for details.

## Related resources

- [Helm chart version matrix](https://helm.camunda.io/camunda-platform/version-matrix/)
- [Component upgrade from 8.8 to 8.9](/self-managed/upgrade/components/880-to-890.md)
