---
id: migrate-to-810
title: "Camunda 8.10 APIs & Tools migration guide"
sidebar_label: "Upgrade to Camunda 8.10"
description: "Learn how to migrate your API integrations, SDKs, and generated clients to Camunda 8.10."
toc_max_heading_level: 2
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import PageDescription from '@site/src/components/PageDescription';

<PageDescription />

## About

This guide details the API and SDK changes introduced in Camunda 8.10 that require customer action, including breaking changes, deprecations, and step-by-step migration actions.

Details are provided for each integration type, including what changed, why, and what action you must take.

| Integration type       | Description                                               |
| :--------------------- | :-------------------------------------------------------- |
| Official SDK users     | Java client, TypeScript SDK, Python SDK, and C# SDK.      |
| Generated-client users | Clients generated from the Camunda OpenAPI specification. |
| Custom integrations    | Custom code that calls the Camunda REST API directly.     |

<!--- >:::info
For a full list of changes, see the [8.10 release announcements](/reference/announcements-release-notes/8100/8100-announcements.md) and [release notes](/reference/announcements-release-notes/8100/8100-release-notes.md).
::: --->

## Upgrade steps

Complete the following steps in this guide:

1. Upgrade to the latest official Camunda SDK versions.
1. If you generate clients from OpenAPI, regenerate them from the 8.10 specification.
1. Re-run compilation/type checks and address any errors.
1. Review and apply fixes for the breaking changes, deprecations, and supported environment changes below.

### Camunda 8.10 breaking changes, deprecations, and supported environment changes

Review the actions required for the following 8.10 changes:

| Type                                                              | Change                                                                                                                      |
| :---------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| <span className="label-highlight red">Breaking change</span>      | [Search filters: `UserTaskFilter` process filters converted into advanced search filters](#usertask-process-filter)         |
| <span className="label-highlight red">Breaking change</span>      | [`POST /v2/message-subscriptions/search` returns start event subscriptions](#message-subscription-type)                     |
| <span className="label-highlight red">Breaking change</span>      | [Administration API (Self-Managed) is migrated](#administration-api-self-managed-migrated)                                  |
| <span className="label-highlight orange">Behavioral change</span> | [Element instance search: advanced filters on `elementId` / `elementName` and `$or` support](#element-instance-advanced-or) |
| <span className="label-highlight orange">Behavioral change</span> | [Resource API now uses eventual consistency](#resource-eventual-consistency)                                                |
| <span className="label-highlight yellow">Deprecated</span>        | [Deprecated: GET resource content API](#deprecated-get-resource-content)                                                    |

## Breaking changes

Review actions required for the following breaking changes:

### Search filters: `UserTaskFilter` process filters converted into advanced search filters {#usertask-process-filter}

#### Change

The search filter criteria for `processDefinitionKey`, `processInstanceKey`, and `bpmnProcessId` in `UserTaskFilter` have been converted into advanced search filters.

#### Why

As a result of the V1 API removal, advanced process filtering for user tasks was no longer supported. These changes let you use advanced process filters with the V2 User Tasks API again.

#### Impact

This affects the Java client because `io.camunda.client.api.search.filter.UserTaskFilter` now accepts advanced filters for `processDefinitionKey`, `processInstanceKey`, and `bpmnProcessId`.

#### Action

<Tabs groupId="audience" defaultValue="sdk" queryString values={[
{label: 'Official SDK users', value: 'sdk'},
{label: 'Generated-client users', value: 'generated'},
{label: 'Custom integrations', value: 'custom'},
]}>

<TabItem value='sdk'>

Update to the latest SDK version. The new SDK version includes advanced filters for `processDefinitionKey`, `processInstanceKey`, and `bpmnProcessId` in `UserTaskFilter`.

</TabItem>
<TabItem value='generated'>

Regenerate your client.

</TabItem>
<TabItem value='custom'>

No change is needed if your code already uses the exact-match filters for `processDefinitionKey`, `processInstanceKey`, and `bpmnProcessId` in `UserTaskFilter`.

</TabItem>
</Tabs>

### `POST /v2/message-subscriptions/search` returns start event subscriptions {#message-subscription-type}

#### Change

The `POST /v2/message-subscriptions/search` endpoint now returns both start event and intermediate event message subscriptions. Previously, only intermediate event subscriptions were returned.

#### Why

This change provides complete visibility into all active message subscriptions for a process, including start event subscriptions that were previously excluded.

#### New field

Each result includes a new `messageSubscriptionType` enum field:

| Value           | Description                                       |
| :-------------- | :------------------------------------------------ |
| `START_EVENT`   | A start event message subscription.               |
| `PROCESS_EVENT` | An intermediate catch event message subscription. |

In existing legacy data, this field is `NULL`.

#### Impact

Integrations that consume results from `POST /v2/message-subscriptions/search` will now receive start event subscriptions in addition to intermediate event subscriptions. Code that assumes only intermediate events may produce unexpected behavior.

#### Action

<Tabs groupId="audience" defaultValue="sdk" queryString values={[
{label: 'Official SDK users', value: 'sdk'},
{label: 'Generated-client users', value: 'generated'},
{label: 'Custom integrations', value: 'custom'},
]}>

<TabItem value='sdk'>

Update to the latest SDK version. If your code relies on the endpoint returning only intermediate event subscriptions, add a filter to exclude start events when constructing your search query.

</TabItem>
<TabItem value='generated'>

Regenerate your client from the 8.10 OpenAPI specification to include the new `messageSubscriptionType` field. If your code expects only intermediate event subscriptions, add the filter shown in the **Custom integrations** tab to your request payload.

</TabItem>
<TabItem value='custom'>

If your code relies on the endpoint returning only intermediate event subscriptions, add the following filter to restore the previous behavior:

```json title="Before (no filter needed — endpoint returned only intermediate events)"
{
  "filter": {}
}
```

```json title="After (filter required to exclude start events)"
{
  "filter": {
    "messageSubscriptionType": { "$neq": "START_EVENT" }
  }
}
```

This filter works correctly for both new data and legacy data (which has `NULL` in the `messageSubscriptionType` field).

</TabItem>
</Tabs>

### Administration API (Self-Managed) migrated

The Administration API endpoints for Self-Managed have been migrated to the now-deprecated [Web Modeler API v1](../web-modeler-api/index.md):

| Admin API (Self-Managed)       | Web Modeler API v1                   |
| :----------------------------- | :----------------------------------- |
| `GET /admin-api/usage-metrics` | `GET /api/v1/clusters/usage-metrics` |
| `GET /admin-api/clusters`      | `GET /api/v1/clusters`               |

For both endpoints, you need a [token with read permissions](../web-modeler-api/authentication.md#generate-a-token).

These endpoints return the same data as the original Administration APIs, but the response format matches the other Web Modeler APIs.

## Behavioral changes

### Element instance search: advanced filters on `elementId` / `elementName` and `$or` support {#element-instance-advanced-or}

#### Change

The element instance search endpoint (`POST /v2/element-instances/search`) gained two filtering capabilities:

- The `elementId` and `elementName` filter fields now accept [advanced search filter objects](../orchestration-cluster-api-rest/orchestration-cluster-api-rest-data-fetching.md#advanced-search-filters) in addition to plain string equality. Supported operators: `$eq`, `$neq`, `$exists`, `$in`, `$notIn`, `$like` (wildcard pattern with `*` and `?`).
- The request body's `filter` object now accepts a top-level `$or` property that takes an array of alternative filter groups combined with OR logic. Top-level filter fields and `$or` are combined with AND logic.

#### Why

These additions let you express the queries the user interface (UI) needs (for example, "match any element whose name or ID contains a substring") in a single request, avoiding multiple round trips and client-side merging.

#### Impact

The change is additive and backward compatible — existing exact-match requests continue to work unchanged. New requests can now use advanced operators and `$or` to express richer queries:

```json
{
  "filter": {
    "processInstanceKey": "2251799813685323",
    "$or": [
      { "elementName": { "$like": "*Order*" } },
      { "elementId": { "$like": "*Order*" } }
    ]
  }
}
```

The example matches element instances where `processInstanceKey` equals the given value AND either `elementName` or `elementId` contains the substring `Order`.

:::note
Complex `$or` conditions may impact performance in high-volume environments; use them with care.
:::

The `elementName` filter only matches instances created in 8.8 or later, since earlier runtimes did not persist this field on element instances.

#### Action

<Tabs groupId="audience" defaultValue="sdk" queryString values={[
{label: 'Official SDK users', value: 'sdk'},
{label: 'Generated-client users', value: 'generated'},
{label: 'Custom integrations', value: 'custom'},
]}>

<TabItem value='sdk'>

Update to the latest SDK version. The new SDK exposes advanced filters for `elementId` and `elementName`, and the `$or` filter on `ElementInstanceFilter`.

</TabItem>
<TabItem value='generated'>

Regenerate your client from the 8.10 OpenAPI specification to pick up the advanced filter and `$or` types on `ElementInstanceFilter`.

</TabItem>
<TabItem value='custom'>

No change is needed for existing requests. To use the new operators, send advanced filter objects on `elementId` / `elementName`, or a top-level `$or` array, as shown above.

</TabItem>
</Tabs>

### Resource API now uses eventual consistency {#resource-eventual-consistency}

The [Get resource] and [Get resource content] APIs now retrieve from secondary storage, resulting in eventual consistency. After a resource is deployed, there may be a brief delay before it becomes retrievable via these endpoints.

If your application assumes immediate resource retrieval after deployment, add retry logic or a short delay before querying resources.

## Deprecations

Review the actions required for the following deprecations:

### Deprecated: GET resource content API {#deprecated-get-resource-content}

The [Get resource content] endpoint is deprecated. Use [Get resource content binary] instead, which provides the same functionality and also returns generic resources.

## Next steps

Once you have completed the [upgrade steps](#upgrade-steps) in this guide, you should:

1. Re-compile and run your test suite against the 8.10 API.
<!--- 1. Review [8.10 release announcements](/reference/announcements-release-notes/8100/8100-announcements.md) for additional context on each change. --->

[Get resource]: ../orchestration-cluster-api-rest/specifications/get-resource.api.mdx
[Get resource content]: ../orchestration-cluster-api-rest/specifications/get-resource-content.api.mdx
[Get resource content binary]: ../orchestration-cluster-api-rest/specifications/get-resource-content-binary.api.mdx
