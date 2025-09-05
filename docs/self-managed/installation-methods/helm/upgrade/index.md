---
sidebar_label: Upgrade via Helm
title: Helm chart upgrade
description: "Upgrade to a more recent version of the Camunda Helm charts, and view configuration changes between versions."
---

import { HelmChartValuesFileBitnamiLegacyLink } from "@site/src/components/CamundaDistributions";

:::note
When upgrading to a new version of the Camunda 8 Helm charts, upgrade sequentially from the **latest patch version of the current release** to the **latest patch version of the next release**.

For example, if the current Helm chart version is 10.2.1, upgrade first to the latest 10.x.x patch (such as 10.2.5). Then upgrade to the latest patch of the next major version, such as 11.0.1 instead of 11.0.0.
:::

Upgrading between minor versions of the Camunda Helm chart may require [configuration changes](#update-your-configuration). To upgrade between patch versions or when no configuration changes are required, see the [`helm upgrade`](#identity-disabled) instructions.

## Upgrade requirements

For a smooth upgrade experience, we recommend determining both your **Helm chart** and **Helm CLI** versions prior to starting your upgrade.

### Helm chart version

As of the Camunda 8.4 release, the Camunda 8 **Helm chart** version is independent from the application version (for example, the Camunda 8.4 release uses the Helm chart version 9.0.0). The Helm chart is updated with each application release.

Review the Camunda 8 Helm chart [version matrix](https://helm.camunda.io/camunda-platform/version-matrix/) to determine the application and Helm chart versions of your installation.

You can also view all chart versions and application versions via the Helm CLI:

```shell
helm repo update
helm search repo camunda/camunda-platform --versions
```

### Helm CLI version

Use the recommended Helm CLI version for your Helm chart when upgrading. The Helm CLI version for each chart can be found on the [chart version matrix](https://helm.camunda.io/camunda-platform/version-matrix/).

## Upgrade notes

### Bitnami Docker repository migration

On August 28, 2025, Bitnami migrated its container images from [bitnami](https://hub.docker.com/u/bitnami) to [bitnamilegacy](https://hub.docker.com/u/bitnamilegacy). See the [Bitnami GitHub announcement](https://github.com/bitnami/containers/issues/83267) for details.

The Camunda Helm charts have been updated to use the new repository.

If you are still using a Camunda Helm chart that references the old repository, use the <HelmChartValuesFileBitnamiLegacyLink/> to override the image repositories.
