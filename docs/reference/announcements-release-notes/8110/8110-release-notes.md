---
id: 8110-release-notes
title: "8.11 Release notes"
sidebar_label: Release notes
description: "Release notes for new features included in the 8.11 minor release, including alpha feature releases."
keywords: ["8.11 release notes", "release notes for 8.11", "release notes"]
page_rank: 90
---

import PageDescription from '@site/src/components/PageDescription';

<PageDescription />

## Unreleased

### Orchestration Cluster

#### Evenly distributed record indices in Elasticsearch and OpenSearch

<div class="release"><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span></div>

<!-- https://github.com/camunda/camunda/issues/54601, https://github.com/camunda/camunda/pull/56522 -->

The Elasticsearch and OpenSearch exporters now spread Zeebe records more evenly across index shards. The `zeebe-record-job` and `zeebe-record-process-instance` indices default to `5` shards, up from `3`. The `zeebe-record-user-task` index defaults to `1` shard, down from `3`. With a three-partition cluster, the records of each partition land on a separate shard instead of two partitions sharing one shard.

Only newly created dated indices use the new defaults. An existing index keeps the shard count it was created with. If you set `number-of-shards`, it still overrides the template defaults for all indices.

<p class="link-arrow">[Elasticsearch exporter configuration](/self-managed/components/orchestration-cluster/zeebe/exporters/elasticsearch-exporter.md#configuration)</p>

<p class="link-arrow">[OpenSearch exporter configuration](/self-managed/components/orchestration-cluster/zeebe/exporters/opensearch-exporter.md#configuration)</p>
