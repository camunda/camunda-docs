---
id: system-configuration-platform-8
title: "Camunda 8 system configuration"
description: "Connection to Camunda 8."
---

### General settings

| YAML path               | Default value | Description                                                                                                                  |
| ----------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| zeebe.enabled           | false         | Toggles whether Optimize should attempt to import data from the connected Zeebe instance.                                    |
| zeebe.name              | zeebe-record  | The name suffix of the exported Zeebe records. This must match the record-prefix configured in the exporter of the instance. |
| zeebe.partitionCount    | 1             | The number of partitions configured for the Zeebe record source.                                                             |
| zeebe.maxImportPageSize | 200           | The max page size for importing Zeebe data.                                                                                  |

### Licensing

<span class="badge badge--platform">Camunda 8 Self-Managed only</span>

Installations of Camunda 8 Self-Managed which require a license can provide their license key to the components as an environment variable:

| Environment variable  | Description                                                          | Default value |
| --------------------- | -------------------------------------------------------------------- | ------------- |
| `CAMUNDA_LICENSE_KEY` | Your Camunda 8 license key, if your installation requires a license. | None          |

For Helm installations, license keys can be configured globally in your `values.yaml` file. See the [Helm installation documentation]($docs$/self-managed/setup/install#configure-license-key) for more details.

:::note
Camunda 8 components without a valid license may display **Non-Production License** in the navigation bar and issue warnings in the logs. These warnings have no impact on Optimize startup or functionality. To obtain a license, visit the [Camunda Enterprise page](https://camunda.com/platform/camunda-platform-enterprise-contact/).
:::

### Settings required for multi-tenancy

<span class="badge badge--platform">Camunda 8 Self-Managed only</span>

For more information on multi-tenancy in Camunda 8 Self-Managed environments, refer
to [this page](./multi-tenancy.md).

To use multi-tenancy, the feature must be enabled across all components.

| YAML path                  | Default value | Description                                              |
| -------------------------- | ------------- | -------------------------------------------------------- |
| multitenancy.enabled       | false         | Enables the Camunda 8 multi-tenancy feature in Optimize. |
| security.auth.ccsm.baseUrl | null          | The base URL of Identity.                                |

### Settings related to Camunda user tasks (formerly Zeebe user tasks)

<span class="badge badge--platform">Camunda 8 Self-Managed only</span>

For more information on user task reporting in Camunda 8 Self-Managed, refer to our [user task analytics documentation](../../../components/userguide/process-analysis/user-task-analytics.md).

| YAML path                           | Default value | Description                                                          |
| ----------------------------------- | ------------- | -------------------------------------------------------------------- |
| ui.userTaskAssigneeAnalyticsEnabled | true          | Enables assignee based analytics in Camunda 8 Self-Managed Optimize. |
