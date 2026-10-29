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

## 8.11.0-alpha1

| Release date     | Changelog(s)                                                                                                                                                                                 |
| :--------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 10 November 2026 | <ul><li>[ Camunda 8 core ](https://github.com/camunda/camunda/releases/tag/8.11.0-alpha1)</li><li>[ Connectors ](https://github.com/camunda/connectors/releases/tag/8.11.0-alpha1)</li></ul> |

### APIs & tools

#### Read the engine clock and add time without pinning it

<div class="release"><span class="badge badge--medium" title="This feature affects Orchestration Cluster">Orchestration Cluster</span></div>

<!-- https://github.com/camunda/camunda/issues/57863, https://github.com/camunda/camunda/pull/66061, https://github.com/camunda/camunda/issues/57864, https://github.com/camunda/camunda/pull/66462 -->

With two new Orchestration Cluster REST API endpoints, you can read the engine clock and move it without stopping it.

| Endpoint             | What it does                                                                                                      | Required permission  | Java client                             |
| :------------------- | :---------------------------------------------------------------------------------------------------------------- | :------------------- | :-------------------------------------- |
| `GET /v2/clock`      | Returns the current time of the engine clock. If the clock is pinned, it returns the pinned time.                 | `READ` on `SYSTEM`   | `newClockGetRequest()`                  |
| `POST /v2/clock/add` | Moves the clock forward or backward by an ISO 8601 duration, such as `PT1H` or `-PT1H`, and returns the new time. | `UPDATE` on `SYSTEM` | `newAddClockCommand().offset(Duration)` |

Both endpoints return the time as an ISO 8601 date-time, for example `{ "timestamp": "2025-01-01T12:00:00.000Z" }`.

Unlike pinning, adding time keeps the clock running from the new time, so job timeouts and retry backoffs still run out in tests. If the clock is pinned, it stays pinned and moves to the pinned time plus the offset. To remove the added time, reset the clock with `POST /v2/clock/reset`.

<ul>
  <li><span class="link-arrow">[Get internal clock](/apis-tools/orchestration-cluster-api-rest/specifications/get-clock.api.mdx)</span></li>
  <li><span class="link-arrow">[Add time to internal clock](/apis-tools/orchestration-cluster-api-rest/specifications/add-clock.api.mdx)</span></li>
</ul>

### Orchestration Cluster

#### Evenly distributed record indices in Elasticsearch and OpenSearch

<div class="release"><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span></div>

<!-- https://github.com/camunda/camunda/issues/54601, https://github.com/camunda/camunda/pull/56522 -->

The Elasticsearch and OpenSearch exporters now spread Zeebe records more evenly across index shards. The `zeebe-record-job` and `zeebe-record-process-instance` indices default to `5` shards, up from `3`. The `zeebe-record-user-task` index defaults to `1` shard, down from `3`. With a three-partition cluster, the records of each partition land on a separate shard instead of two partitions sharing one shard.

Only newly created dated indices use the new defaults. An existing index keeps the shard count it was created with. If you set `number-of-shards`, it still overrides the template defaults for all indices.

- [Elasticsearch exporter configuration](/self-managed/components/orchestration-cluster/zeebe/exporters/elasticsearch-exporter.md#configuration)
- [OpenSearch exporter configuration](/self-managed/components/orchestration-cluster/zeebe/exporters/opensearch-exporter.md#configuration)
