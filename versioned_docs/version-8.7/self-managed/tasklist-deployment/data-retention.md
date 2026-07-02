---
id: data-retention
title: Data retention
description: "Let's take a closer look at how Tasklist stores and archives data."
---

## How the data is stored and archived

Tasklist imports data from Zeebe and stores it in Elasticsearch indices with a defined prefix (default: `tasklist`). Specifically, this includes the following:

- Deployed processes, including the diagrams.
- The state of process instances, including variables and flow nodes, activated within instance execution, incidents, etc.

It additionally stores some Tasklist-specific data:

- Operations performed by the user
- List of users
- Technical data, like the state of Zeebe import, etc.

The data representing process instance state becomes immutable after the process instance is finished. Currently, the data may be archived, meaning it is moved to a dated index, e.g. `tasklist_variables_2020-01-01`, where date represents the date on which the given process instance was finished. The same is valid for user operations; after they are finished, the related data is moved to dated indices.

:::note
All Tasklist data present in Elasticsearch (from both **main** and **dated** indices) are visible from the UI.
:::

## Archive period

The default time between a process instance finishing and being moved to a dated index is one hour. This can be modified by setting the [waitPeriodBeforeArchiving](importer-and-archiver.md#archive-period) configuration parameter.

## Rollover Interval

Process instances are archived into historical indices based on a rollover interval. By default, this value is `1d`, so a process instance that completed on `yyyy-mm-dd` is archived into an index with that date as a suffix, meaning there is one historical index per day. Increasing this interval reduces the number of historical indices, which reduces shard consumption.

This value can be modified by setting the [rolloverInterval](importer-and-archiver.md#rollover-interval) configuration parameter.

:::warning
With a `1w` or `1M` rollover interval, effective retention can be shorter than the configured retention value. Retention is applied per index, counted from the start of that index's calendar bucket (the Monday of the ISO week for `1w`, or the 1st of the month for `1M`) — not from the date the process instance actually finished.

For example, with `rolloverInterval: 1w` and a retention period of `30d`: a process instance that finishes on Sunday, 14 June 2026 is archived into the weekly index starting Monday, 8 June 2026 (suffix `2026-06-08`). Retention counts from 8 June, so the index becomes eligible for deletion after 8 July 2026 — only 24 days after the instance actually finished, instead of the full 30 days.
:::

## Data cleanup

In case of intensive Zeebe usage, the amount of data can grow significantly overtime. Therefore, you should consider the data cleanup strategy.

Dated indices may be safely removed from Elasticsearch. "Safely" means only finished process instances are deleted together with all related data, and the rest of the data stays consistent.

Users [updating from Elasticsearch 7 to Elasticsearch 8](/self-managed/operational-guides/update-guide/elasticsearch/7-to-8.md) will encounter issues with the [Elasticsearch Curator](https://www.elastic.co/guide/en/elasticsearch/client/curator/current/index.html). To resolve this, Tasklist allows configuring an Index Lifecycle Management (ILM) Policy using the `archiver` configuration options, which is enabled by default:

### Snippet from application.yml

```yaml
camunda.tasklist:
  archiver:
    ilmEnabled: true
    ilmMinAgeForDeleteArchivedIndices: 30d
```

`ilmMinAgeForDeleteArchivedIndices` defines the duration for which archived data will be stored before deletion. The values use [Elasticsearch TimeUnit format](https://www.elastic.co/guide/en/elasticsearch/reference/current/api-conventions.html#time-units).

This ILM Policy works on Elasticsearch 7 as well, and can function as a replacement for the Elasticsearch Curator.

### Externally managed ILM/ISM policies

By default Tasklist creates and updates the ILM/ISM policy resource itself when `ilmEnabled` is `true`, and removes the policy from existing indices when `ilmEnabled` is `false`. When the policy is managed externally (for example by a separate provisioning step that runs before Tasklist starts), set `ilmManagePolicy` to `false`:

```yaml
camunda.tasklist:
  archiver:
    ilmEnabled: true
    ilmManagePolicy: false
    ilmMinAgeForDeleteArchivedIndices: 30d
```

With `ilmManagePolicy: false`, Tasklist:

- Does not create or update the ILM/ISM policy resource on startup (it assumes the policy already exists under the expected name).
- Does not detach the policy from existing indices when `ilmEnabled` is `false`.

The default is `true`, which preserves the historical behavior.

:::caution Policy name is hardcoded

Tasklist attaches the policy named `tasklist_delete_archived_indices` to archived indices. This name is **not configurable**. When `ilmManagePolicy: false`, the external policy must already exist in your cluster under exactly that name.

If the policy does not exist when `ilmEnabled: true`:

- **Elasticsearch**: Tasklist starts successfully, but ILM logs `policy_not_found` warnings on each cycle and skips retention actions on the affected indices. Once the policy is created externally under the configured name, ILM picks it up retroactively on its next cycle.
- **OpenSearch**: Tasklist logs an error for each index it cannot attach the policy to and continues. The affected indices remain unmanaged until the policy is provisioned and Tasklist runs the attach step again.

:::

:::note
Only indices containing dates in their suffix may be deleted.
:::

:::warning Limitation: ILM configuration updates are not applied automatically

If you update the value of `ilmMinAgeForDeleteArchivedIndices` in the `application.yml` after deployment, the change will **not** be applied to the existing ILM policy used by Tasklist. This is a known issue.

To change the ILM settings after installation, you must manually update the corresponding ILM policy in Elasticsearch. Be aware that if Camunda 8 is installed without ILM configured initially, applying ILM later may lead to issues unless handled carefully and manually.

Zeebe does correctly apply ILM updates via configuration, but Tasklist does not.

For reliable ILM behavior, Camunda recommends configuring `ilmMinAgeForDeleteArchivedIndices` during initial installation and verifying the applied policy in Elasticsearch.

:::

### OpenSearch

OpenSearch does not support the Index Lifecycle Management (ILM) Policy, and instead uses Index State Management (ISM). The same environment variables that are used to activate ILM on Elasticsearch can be used to activate ISM on OpenSearch.

As of the 8.4 release, Tasklist is compatible with [Amazon OpenSearch](https://aws.amazon.com/de/opensearch-service/) 2.5.x. Note that using Amazon OpenSearch requires [setting up a new Camunda installation](/self-managed/setup/overview.md). A migration from previous versions or Elasticsearch environments is currently not supported.
