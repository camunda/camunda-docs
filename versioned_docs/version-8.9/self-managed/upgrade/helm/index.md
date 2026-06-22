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

### Web Modeler persistence PVC name

In some 8.9 chart versions, the Web Modeler `restapi` deployment referenced a persistent volume claim named `<release>-webModeler-data` (camelCase), which did not match the chart-managed PVC `<release>-webmodeler-data` (lowercase). This name mismatch prevented the Web Modeler persistence volume from mounting. A patched 8.9 chart corrects the `claimName` so the `restapi` pod mounts the existing `<release>-webmodeler-data` PVC.

**No action is required for most deployments.** The fix only corrects the deployment's claim reference; it does not rename the PVC. On upgrade, the `restapi` pod mounts the already-existing `<release>-webmodeler-data` PVC and no data migration is needed. The persisted volume holds only `/tmp` scratch and cache data — Web Modeler content is stored in PostgreSQL.

If you manually created a `<release>-webModeler-data` (capital `M`) PVC as a workaround for the broken mount, the `restapi` pod stops using it after you upgrade to a patched chart. The manual PVC is not deleted; it remains orphaned and continues to consume storage until you act. Choose one of the following:

- Set `webModeler.persistence.existingClaim` to your manually created PVC to keep using it, or
- Delete the orphaned PVC after confirming the `restapi` pod successfully mounts `<release>-webmodeler-data`.

## Related resources

- [Helm chart version matrix](https://helm.camunda.io/camunda-platform/version-matrix/)
- [Component upgrade from 8.8 to 8.9](/self-managed/upgrade/components/880-to-890.md)
