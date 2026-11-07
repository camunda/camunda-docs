---
id: 8110-announcements
title: "8.11 Release announcements"
sidebar_label: Release announcements
description: "Supported environment changes, breaking changes, and deprecations in Camunda 8.11."
toc_max_heading_level: 3
---

import PageDescription from '@site/src/components/PageDescription';

<PageDescription />

## APIs & tools

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--breaking-change">Breaking change</span>
</div>
<div className="release-announcement-content">

#### Batch process instance operations now narrow and validate the `state` filter {#batch-operation-state-filter}

Starting with 8.11, the batch operations to modify, migrate, resolve incidents, suspend, resume, and cancel process instances narrow your `state` filter with the state the operation requires, and validate it.

Previously, the API documentation described the `state` filter as "ignored and overridden". This didn't match the actual behavior, which differed by operation.

| Operation                                                                                                                | Required state           | Previous behavior                             |
| :----------------------------------------------------------------------------------------------------------------------- | :----------------------- | :-------------------------------------------- |
| [Modify](/apis-tools/orchestration-cluster-api-rest/specifications/modify-process-instances-batch-operation.api.mdx)     | `ACTIVE`                 | Combined your filter with the required state. |
| [Migrate](/apis-tools/orchestration-cluster-api-rest/specifications/migrate-process-instances-batch-operation.api.mdx)   | `ACTIVE`                 | Combined your filter with the required state. |
| [Resolve incidents](/apis-tools/orchestration-cluster-api-rest/specifications/resolve-incidents-batch-operation.api.mdx) | `ACTIVE`                 | Combined your filter with the required state. |
| [Suspend](/apis-tools/orchestration-cluster-api-rest/specifications/suspend-process-instances-batch-operation.api.mdx)   | `ACTIVE`                 | Replaced your filter with the required state. |
| [Resume](/apis-tools/orchestration-cluster-api-rest/specifications/resume-process-instances-batch-operation.api.mdx)     | `SUSPENDED`              | Replaced your filter with the required state. |
| [Cancel](/apis-tools/orchestration-cluster-api-rest/specifications/cancel-process-instances-batch-operation.api.mdx)     | `ACTIVE` and `SUSPENDED` | Combined your filter with the required state. |

The following rules apply to all six operations:

- A top-level `state` filter that uses `$eq` or `$in` with a state outside the required states is rejected with `400 Bad Request`. Modify, migrate, and resolve incidents previously accepted such a filter and created an empty batch. Suspend and resume previously discarded the filter. Cancel already rejected it.
- States inside `$or` branches aren't validated. A branch that conflicts with the required state matches no instances. Cancel previously rejected invalid states in `$or` branches.
- The `$neq`, `$exists`, and `$like` operators on a top-level `state` are applied as given.

The following changes apply to the `parentProcessInstanceKey` filter:

- Suspend and resume now apply the filter as given. Previously, they discarded it and could act on instances outside your filter.
- Cancel now narrows the filter to root instances instead of replacing it. A filter that matches only child instances selects no instances and doesn't return an error.

**Action:** Remove a conflicting top-level `state` filter from your batch requests, or move it into an `$or` branch. If your integration relied on suspend or resume discarding your `parentProcessInstanceKey` filter, review the filter, because it now limits the batch.

</div>
</div>

## Deployment

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--deprecated">Deprecated</span>
</div>
<div className="release-announcement-content">

#### Unknown Helm values keys rejected by default in Camunda 8.12 {#unknown-helm-values-keys-rejected-in-812}

The Camunda 8.11 Helm chart (16.x) keeps the 8.10 behavior. It warns about each chart-owned key in your values that the chart schema doesn't declare. Helm ignores these keys, so the settings they hold aren't applied. The check doesn't cover `global` values, the values of dependency charts, or free-form maps such as annotations and labels.

Starting with Camunda 8.12 (Helm chart 17.x), unknown chart-owned keys stop `helm install` and `helm upgrade` by default.

**Action:** Remove or correct the keys that the `[camunda][warning] UNKNOWN VALUES KEY` messages name. To make unknown keys fail now, set `global.strictValues: true`.

<p className="link-arrow">[Find unknown keys in your values](/self-managed/deployment/helm/operational-tasks/helm-values-schema-validation.md#find-unknown-keys)</p>

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--breaking-change">Breaking change</span>
</div>
<div className="release-announcement-content">

#### Grafana dashboards use the v2 dashboard schema and require Grafana 13 or later {#grafana-dashboards-v2-schema}

Starting with Camunda 8.11, the Grafana dashboards published in [`monitor/grafana`](https://github.com/camunda/camunda/tree/main/monitor/grafana) of the `camunda/camunda` repository use the new [v2 dashboard schema](https://grafana.com/whats-new/2025-04-11-new-dashboards-schema/). Camunda 8.10 is the last release that provides the dashboards in the classic format, which [Camunda deprecated in 8.10](/reference/announcements-release-notes/8100/8100-announcements.md#classic-grafana-dashboard-format-deprecated). The classic dashboards of 8.10 and earlier releases continue to work with your Grafana instance.

The dashboards of 8.11 require Grafana 13 or later. Earlier Grafana versions cannot import the v2 dashboard schema.

**Action:** Before you move to the dashboards of 8.11, upgrade your Grafana instance to version 13 or later. To keep using the dashboards in the classic format, import them from the `stable/8.10` branch or from the branch of the release you run.

</div>
</div>
