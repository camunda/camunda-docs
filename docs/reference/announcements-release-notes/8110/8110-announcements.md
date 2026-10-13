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
