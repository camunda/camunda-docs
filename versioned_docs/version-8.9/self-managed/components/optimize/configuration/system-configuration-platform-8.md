---
id: system-configuration-platform-8
title: "Camunda 8 system configuration"
description: "Connection to Camunda 8."
---

### General settings

Optimize imports process, variable, incident, and user task data from the Zeebe Elasticsearch or OpenSearch exporters in the Orchestration Cluster. For exporter configuration options (including filters), see:

- [Elasticsearch exporter](/self-managed/components/orchestration-cluster/zeebe/exporters/elasticsearch-exporter.md).
- [OpenSearch exporter](/self-managed/components/orchestration-cluster/zeebe/exporters/opensearch-exporter.md).

The settings below control how Optimize connects to and paginates this exporter data.

| YAML path               | Default value | Description                                                                                                                                                           |
| ----------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| zeebe.enabled           | false         | Toggles whether Optimize should attempt to import data from the connected Zeebe instance.                                                                             |
| zeebe.name              | zeebe-record  | The index prefix used for exported Zeebe records. This must match the `index.prefix` configured in the Elasticsearch or OpenSearch exporter that Optimize reads from. |
| zeebe.partitionCount    | 1             | The number of partitions configured for the Zeebe record source.                                                                                                      |
| zeebe.maxImportPageSize | 200           | The max page size for importing Zeebe data.                                                                                                                           |

### Exporter-side filters and Optimize data completeness

This section describes how exporter-side filters affect Optimize data imports and data completeness. For YAML configuration details and property syntax, refer to the Elasticsearch and OpenSearch exporter documentation.

Starting from Camunda 8.9, the Elasticsearch and OpenSearch exporters provide optional filters that can reduce the amount of data written for Optimize:

- Variable names: Inclusion and exclusion lists with match modes such as exact, starts with, and ends with.
- Variable value types: Inclusion and exclusion lists for inferred types such as `String`, `Number`, `Boolean`, `Object` and `Null`.
- BPMN process IDs: Inclusion and exclusion lists by `bpmnProcessId` that drop all records tied to selected processes.
- Optimize mode: Keeps only the record value types and intents required by Optimize and drops other record types not used by Optimize.

These filters run inside the exporter and permanently drop matching records from the exported stream. Optimize cannot import data that was never exported.

#### Non‑retroactive filters and permanent gaps

Exporter-side filters are not retroactive:

- Filters only affect records produced after the configuration change.
- If a process is excluded (or not included) for some period and later re‑enabled, records from the excluded period were never exported.
- As a result, Optimize will always show a permanent gap in that time window for the affected process, even if you later remove the filter or inclusion list.

The same principle applies to variable‑name and variable‑type filters and other exporter-side filters: records that were dropped during a given time window cannot be recovered in Optimize, even if you subsequently relax the filters.

#### Changing filters on existing clusters (sequence vs position)

On clusters that have already exported data to Optimize, enabling or changing exporter-side filters mid‑stream can cause Optimize to miss some re‑exported events.

As long as the exporter configuration (including any existing filters) remains unchanged, the exporter assigns a monotonically increasing `sequence` to each exported record, and Optimize can reliably resume imports from the “last seen” sequence.

The Elasticsearch/OpenSearch exporter uses at-least-once delivery: after a failover, restart, or snapshot replay, it may export the same event again. If you change exporter-side filters between the original export and the re‑export, some records that were previously exported may now be filtered out. The remaining records are renumbered in this shorter stream. As a result, an event that Optimize already imported can reappear with a different sequence and be skipped when Optimize resumes from the previous “last seen” sequence.

To keep Optimize imports consistent and avoid gaps, we recommend changing exporter-side filters only when the exporter has no pending records and Optimize has already imported all available data from that exporter.

#### Supported versions

- Exporter-side filters and Optimize mode are introduced in Camunda 8.9 and are not backported to earlier 8.x versions.
- On clusters running earlier versions, the exporters always write an unfiltered event stream and this section does not apply.

#### Required record types for Optimize

Optimize requires at least the following record value types to populate standard reports:

- `PROCESS`
- `PROCESS_INSTANCE`
- `INCIDENT`
- `USER_TASK`
- `VARIABLE`

If exporter settings or Optimize mode disable these value types, Optimize data and reports will become incomplete or fail to load.

### Licensing

<span class="badge badge--platform">Camunda 8 Self-Managed only</span>

Installations of Camunda 8 Self-Managed which require a license can provide their license key to the components as an environment variable:

| Environment variable  | Description                                                          | Default value |
| --------------------- | -------------------------------------------------------------------- | ------------- |
| `CAMUNDA_LICENSE_KEY` | Your Camunda 8 license key, if your installation requires a license. | None          |

For Helm installations, license keys can be configured globally in your `values.yaml` file. See [License key](/self-managed/deployment/helm/configure/license-key.md) for more details.

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

For more information on user task reporting in Camunda 8 Self-Managed, refer to our [user task analytics documentation](/components/optimize/userguide/process-analysis/user-task-analytics.md).

| YAML path                           | Default value | Description                                                          |
| ----------------------------------- | ------------- | -------------------------------------------------------------------- |
| ui.userTaskAssigneeAnalyticsEnabled | true          | Enables assignee based analytics in Camunda 8 Self-Managed Optimize. |
