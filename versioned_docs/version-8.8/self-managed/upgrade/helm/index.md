---
sidebar_label: Helm upgrade
title: Upgrade Helm chart
description: "Upgrade to a more recent version of the Camunda Helm charts, and view configuration changes between versions."
---

import ZeebeGrid from '../../../components/zeebe/react-components/\_zeebe-card';
import { helmIndexCards } from './../react-components/\_card-data';
import { HelmChartValuesFileBitnamiLegacyLink } from "@site/src/components/CamundaDistributions";
import '../react-components/\_card.css';

Upgrade a Camunda 8 Self-Managed deployment installation using the official Camunda Helm charts.

:::caution earlier versions
If you are upgrading from a version earlier than 8.7, see [upgrading from an earlier version](self-managed/upgrade/index.md#upgrading-from-an-earlier-version).
:::

## Upgrade guides

Use the following guides to upgrade a Camunda 8 Self-Managed deployment installation using the official Camunda Helm charts.

<ZeebeGrid zeebe={helmIndexCards} />

### Helm chart version

The Camunda Helm chart version is independent from the Camunda application version. Use the Helm chart [version matrix](https://helm.camunda.io/camunda-platform/version-matrix/) to identify the Helm chart version that deploys Camunda 8.8.

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

## Related resources

- [Helm chart version matrix](https://helm.camunda.io/camunda-platform/version-matrix/)
- [Component upgrade from 8.7 to 8.8](self-managed/upgrade/components/870-to-880.md)
