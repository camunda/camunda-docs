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

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--breaking-change">Breaking change</span>
</div>
<div className="release-announcement-content">

#### `GET /v2/authentication/me` answers a caller without credentials on an unprotected API {#anonymous-current-user}

On an unprotected API, [`GET /v2/authentication/me`](/apis-tools/orchestration-cluster-api-rest/specifications/get-authentication.api.mdx) answers a caller without credentials with `200 OK` and `isAnonymous: true`, instead of `401 Unauthorized`. The `username` field of `CamundaUserResult` is still required, but it can now be `null`, so a client generated from the API specification can fail to compile. This change is also part of 8.10.9.

**Action:** See the [8.10 announcement](/reference/announcements-release-notes/8100/8100-announcements.md#anonymous-current-user) for the changed fields and what to do.

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--change">Change</span>
</div>
<div className="release-announcement-content">

#### User tasks of suspended process instances are now marked as suspended {#user-tasks-suspended-marker}

Starting with 8.11, when you suspend a process instance, Camunda marks its user tasks as suspended in secondary storage. When you resume the instance, Camunda removes the marker.

- The [search user tasks](/apis-tools/orchestration-cluster-api-rest/specifications/search-user-tasks.api.mdx) endpoint returns a new `isSuspended` field and supports filtering by `isSuspended`.
- Tasklist keeps suspended user tasks visible, labels them as suspended, and disables actions such as assigning, unassigning, and completing them.
- User tasks belonging to instances suspended in 8.10 or earlier are not marked as suspended after you upgrade. The instances still show as `SUSPENDED`, and Camunda still rejects actions on their tasks, but Tasklist and the search API show them as not suspended.

**Action:** No action is required. If your integration assumes that user tasks returned by the search API are actionable, filter by `isSuspended`. Note that tasks belonging to instances suspended before the upgrade are not marked as suspended.

<p className="link-arrow">[Process instance suspension](/components/concepts/process-instance-suspension.md#suspended-user-tasks-in-secondary-storage)</p>

</div>
</div>

## Connectors

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--breaking-change">Breaking change</span>
</div>
<div className="release-announcement-content">

#### Kafka Producer connector no longer converts Avro union values to the first record {#kafka-producer-avro-union-record-selection}

Starting with 8.11, the [Kafka Producer connector](/components/connectors/out-of-the-box-connectors/kafka.md) selects the record type of an Avro union value from the value itself, instead of always using the first record of the union.

This change affects you only if you use the **Kafka Producer connector** with the **Schema registry** schema strategy and the Avro schema type. The **No schema** and **Inline schema** strategies, JSON schemas in the schema registry, the **Kafka Consumer connector**, and Avro schemas without union fields are not affected.

Previously, the connector converted every object value of a union field to the first record type of the union. For example, for the field `"payload": ["null", "CreateTask", "CancelTask"]`, the connector always converted the value to `CreateTask` and silently dropped keys that don't belong to that record.

Now, the connector selects the record type as follows:

1. If the value is an object with exactly one key, and that key is the name of a type in the union, the connector uses that type. For example, `{"test.CancelTask": {"taskId": "1", "reason": "duplicate"}}`. The short name also works if only one type in the union has that name.
2. Otherwise, the connector selects the record that has a field for every key in the value and receives all its required fields. A field is required if it has no default value and isn't nullable. If no record has a field for every key, the connector ignores unknown keys and applies the required-fields rule only.
3. If the value fits several records or none, the task fails. The error lists the types of the union and shows the type name wrapper to use.

This applies to union fields in a record, array items whose type is a union, and top-level unions. If a union contains only one record type, for example `["null", "Address"]`, the connector uses that record as before.

For example, a `payload` value of `{"taskId": "1", "title": "t", "priority": 1, "reason": "r"}` was previously sent as `CreateTask`, and `reason` was lost. Now, the task fails with the error `The value matches several types of the union [null, test.CreateTask, test.CancelTask]`.

If a union contains several records and a `map` type, a value that matches none of the records is now written as the map. Previously, it was written as the first record.

The following related changes apply to the **Schema registry** strategy with Avro:

- A topic can now carry several record types if its value subject holds a top-level Avro union. Register the union in the schema registry and set the schema source to **From registry**. Previously, every message to such a topic failed with `Not a record schema`.
- A field that you omit from the message value now gets its default value from the schema. Previously, the connector serialized the field as `null`, and the task failed for non-nullable fields with a non-null default.
- Arrays whose items are a union, and maps whose values are records, are now converted correctly. Previously, they failed with `Error serializing Avro message`.
- A union schema with the **Inline** schema source now fails with an error that asks you to register the union and select **From registry**. Previously, it failed with `Not a record schema`.

**Action:** Check the message values that you send to Avro union fields with several record types. If a value contains fields of more than one record, wrap it with the name of the intended type, for example `{"test.CreateTask": {"taskId": "1", "title": "t", "priority": 1}}`, or remove the keys that don't belong to the intended record.

</div>
</div>

## Deployment

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
