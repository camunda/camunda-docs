---
id: data-retention
title: Data retention
description: "Overview of how Orchestration Cluster components store and archive data in Elasticsearch or OpenSearch."
---

Orchestration Cluster components import data from Zeebe and store it in Elasticsearch indices with a defined prefix (default: varies by component). Specifically, this includes:

- Deployed processes, including diagrams
- The state of process instances, including variables and flow nodes, activated within instance execution, incidents, etc.

Components may additionally store some system-specific data:

- Operations performed by users
- List of users
- Technical metadata, such as the state of Zeebe import

The data representing process instance state becomes immutable after the process instance is finished. Finished data may be archived, meaning it is moved to a dated index, e.g., `variables_2020-01-01`, where the date represents when the process instance was completed. The same applies to user operations: once finished, the related data is moved to dated indices.

:::note
All data present in Elasticsearch (from both **main** and **dated** indices) is visible from the UI.
:::

## Archive period

By default, the time between a process instance finishing and being moved to a dated index is one hour. This can be modified using the [waitPeriodBeforeArchiving](/self-managed/components/orchestration-cluster/operate/importer-and-archiver.md#archive-period) configuration parameter.

## Data cleanup

With intensive Zeebe usage, the amount of stored data can grow significantly over time. Therefore, implementing a data cleanup strategy is recommended.

Dated indices may be safely removed from Elasticsearch. "Safely" means only finished process instances and all related data are deleted, while other data remains consistent. Tools like Elasticsearch Curator or custom scripts can be used to delete old indices.

For users updating from Elasticsearch 7 to Elasticsearch 8, note that the Elasticsearch Curator may cause issues. Instead, an **Index Lifecycle Management (ILM) Policy** can be configured using the `archiver` settings:

### Snippet from application.yml

```yaml
archiver:
  ilmEnabled: true
  ilmMinAgeForDeleteArchivedIndices: 30d
```

`ilmMinAgeForDeleteArchivedIndices` defines how long archived data is retained before deletion. The value uses [Elasticsearch TimeUnit format](https://www.elastic.co/guide/en/elasticsearch/reference/current/api-conventions.html#time-units).

This ILM policy works on Elasticsearch 7 and 8 and can serve as a replacement for Elasticsearch Curator.

:::note
Only indices containing dates in their suffix may be deleted.
:::

:::warning Limitation: ILM configuration updates are not applied automatically
If `ilmMinAgeForDeleteArchivedIndices` is updated after deployment, changes will **not** automatically apply to existing ILM policies. To modify ILM settings post-installation, you must manually update the corresponding ILM policy in Elasticsearch. Without careful handling, applying ILM after installation may lead to issues.

Zeebe applies ILM updates correctly via configuration, but cluster UIs do not. For reliable behavior, configure `ilmMinAgeForDeleteArchivedIndices` during initial installation and verify the applied policy in Elasticsearch.
:::

## OpenSearch

OpenSearch does not support the Elasticsearch ILM policy but instead uses Index State Management (ISM). The same `archiver` settings can be used to enable ISM. Refer to the [AWS documentation](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/ism.html) for OpenSearch-specific configuration guidance.
