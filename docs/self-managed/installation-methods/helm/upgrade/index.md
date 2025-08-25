---
sidebar_label: Upgrade via Helm
title: Helm chart upgrade
description: "Upgrade to a more recent version of the Camunda Helm charts, and view configuration changes between versions."
---

import { HelmChartValuesFileBitnamiLegacyLink } from "@site/src/components/CamundaDistributions";

:::note
When upgrading to a new version of the Camunda 8 Helm charts, it must be a sequential upgrade from the **latest patch version of the current release** to the **latest patch version of the next release** of the chart.

For example, if the current Helm chart version is 10.x.x, and the latest next major version is 11.0.1, the recommended upgrade is to 11.0.1 (not 11.0.0).
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

### Bitname Docker repository rename

As of [August 28th, 2025, the Bitnami Docker repository renamed](https://github.com/bitnami/containers/issues/83267) from "[bitnami](https://hub.docker.com/u/bitnami)" to "[bitnamilegacy](https://hub.docker.com/u/bitnamilegacy)". Camunda Helm charts already updated with the Bitnami Docker repository, however, if you still use a Camunda Helm chart with the old names, you can use <HelmChartValuesFileBitnamiLegacyLink/>.
