---
id: upgrade
title: "Camunda 8 Helm upgrade"
sidebar_label: "Upgrade via Helm"
description: "Upgrade to a more recent version of the Camunda Helm charts, and view configuration changes between versions."
---

:::note
When upgrading to a new version of the Camunda 8 Helm charts, we recommend updating to the **latest patch** release of the next **major** version of the chart.

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
