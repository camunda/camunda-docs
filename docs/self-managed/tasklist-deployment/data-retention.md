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

:::note
Only indices containing dates in their suffix may be deleted.
:::

### OpenSearch

OpenSearch does not support the Index Lifecycle Management (ILM) Policy, and instead uses Index State Management (ISM). The same environment variables that are used to activate ILM on Elasticsearch can be used to activate ISM on OpenSearch.

As of the 8.4 release, Tasklist is compatible with [Amazon OpenSearch](https://aws.amazon.com/de/opensearch-service/) 2.5.x. Note that using Amazon OpenSearch requires [setting up a new Camunda installation](/self-managed/setup/overview.md). A migration from previous versions or Elasticsearch environments is currently not supported.
