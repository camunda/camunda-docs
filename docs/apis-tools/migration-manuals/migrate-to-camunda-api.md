---
id: migrate-to-camunda-api
title: Migrate to the Camunda 8 API
description: "Migrate from Camunda's V1 component REST APIs to the V2 Camunda 8 REST API to interact with Camunda 8 clusters, activate jobs, and run user task state operations."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

This document offers a comprehensive guide to migrate from Camunda's V1 component REST APIs (the Tasklist REST API, for example) to the V2 [Camunda 8 REST API](/apis-tools/camunda-api-rest/camunda-api-rest-overview.md).

Camunda is streamlining the developer experience by creating a unified REST API for Zeebe, Operate, Tasklist, and the Identity components with endpoint parity. This will be a single REST API for the orchestration cluster for a consistent and intuitive API experience to help your teams develop process automation solutions faster.

:::note
The Administration and Web Modeler APIs will not be part of the Camunda 8 REST API, as these are platform APIs outside the cluster’s scope.
:::

Overtime, there will be a deprecation process for the individual component APIs starting with the former Operate and Tasklist APIs. These will continue to be in the product for the short-term, but it is recommended to begin the adoption of the new API. In addition, we will begin to deprecate several Zeebe gPRC endpoints as well. See [the official blog announcement](https://camunda.com/blog/2024/11/camunda-8-7-releasing-february-2025/).

## Migrate endpoints

This section considers all public endpoints existing in the component REST APIs and the Camunda 8 API counterparts or required migration changes.

### General changes

<Tabs groupId="endpoints" defaultValue="all-endpoints" queryString values={
[
{label: 'All endpoints', value: 'all-endpoints', },
{label: 'Endpoints querying for data', value: 'query-endpoints', },
]
}>

<TabItem value='all-endpoints'>

- The new API can be found at `<cluster>/v2/…>` instead of `<cluster>/v1/…>`.
- All endpoints are no longer separated by component concerns and all endpoints receive similar support. For example, process definitions, user tasks, and user authorizations were previously spread across separate Tasklist, Operate, and Identity APIs.
- Naming, response codes, and type handling have been streamlined for all endpoints to provide a consistent UX.
- Endpoints with similar concerns (variable search, for example) have been consolidated into single endpoints.

</TabItem>

<TabItem value='query-endpoints'>

- Unified search request structure.
  - Attributes `filter`, `page`, and `sort` on root level.
  - Endpoint-specific filter attributes in the filter object, not at the root level.
  - Pagination information in the `page` object. For example, the attributes `from`, `limit`, `searchBefore`, and `searchAfter`.
  - Sorting configuration in sort object array, each object containing the field name and order (descending or ascending).
- Unified search response structure.
  - Attributes `items` and `page` on root level.
  - List of endpoint-specific response items in `items` attribute.
  - Page information in `page` attribute, for example the attributes `totalItems`, `firstSortValues`, and `lastSortValues` to use in `searchBefore` and `searchAfter` in follow-up requests.

</TabItem>

</Tabs>

<!--- TBD since currently in progress: Filter attributes can use Advanced Search capabilities depending on their type. TBD: We need to see how much of this we manage to implement with 8.7 (which endpoints, which attributes, which types). --->

### Name changes and mappings

The following conventions apply to all attributes:

- `key` and `id` fields contain the entity as a prefix, for example, `userTaskKey`, `processDefinitionId`. This applies when referencing other resources like `formKey` in the user task entity, in the respective entities themselves like `userTaskKey` in the user task entity.
- The full entity is the prefix to avoid confusion, for example `processDefinitionKey` instead of `processKey` (the latter could be interpreted as process instance or process definition).
- Other attributes of entities themselves have no prefix to avoid clutter, for example version in the process definition entity. In other resources, they have to be referenced with a prefix, like `processDefinitionVersion` in the process instance entity.
- The `bpmnProcessId` is now called `processDefinitionId` to be easily relatable to the entity (process definition) and the accompanying `processDefinitionKey`.
- The `decisionKey` and `dmnDecisionKey` are now aligned to `decisionDefinitionKey`, the `decisionId` and `dmnDecisionId` to `decisionDefinitionId`. Similar to the `processDefinitionId`, those attributes are now related to the entity `decisionDefinition`.

<!--- Insert Operate section with V1 endpoint and V2 endpoint to use with input/output adjustments --->

### Tasklist

#### Search tasks

- **V1 endpoint**: `POST /v1/tasks/search`
- **V2 endpoint**: `POST /v2/user-tasks/search`

<Tabs groupId="tasklist" defaultValue="input-adjustments" queryString values={
[
{label: 'Input adjustments', value: 'input-adjustments', },
{label: 'Output adjustments', value: 'output-adjustments', },
]
}>

<TabItem value='input-adjustments'>

- Filter attribute `assigned (boolean)` removed
  - Use filter attribute `assignee` with condition `{ "$exists": false }`
- Filter attribute `assignees (string[])` removed
  - Use filter attribute `assignee` with condition `{ “$in”: [ “xyz”, ... ] }`
- Filter attribute `taskDefinitionId` renamed
  - Use filter attribute `elementId`
- Filter attribute `candidateGroups (string[])` removed
  - Use filter attribute `candidateGroup` with condition `{ “$in”: [ “xyz”, ... ] }`
- Filter attribute `candidateUsers (string[])` removed
  - Use filter attribute `candidateUser` with condition `{ “$in”: [ “xyz”, ... ] }`

</TabItem>

<TabItem value='output-adjustments'>

<!--- TODO: insert output adjustments --->

</TabItem>

</Tabs>

### Operate

#### Search decision requirements

- **V1 endpoint**: `POST /v1/drd/search`
- **V2 endpoint**: `POST /v2/decision-requirements/search`

<Tabs groupId="post-decision-requirements" defaultValue="input-adjustments" queryString values={
[
{label: 'Input adjustments', value: 'input-adjustments', },
{label: 'Output adjustments', value: 'output-adjustments', },
]
}>

<TabItem value='input-adjustments'>

- Filter attribute `id` and `key` removed
  - Use filter attribute `decisionRequirementsKey`

</TabItem>

<TabItem value='output-adjustments'>

- Attributes attribute `id` has been removed.
- The attribute `key` was replaced to `decisionRequirementsKey`

</TabItem>

</Tabs>

#### Get decision requirements by key

- **V1 endpoint**: `GET /v1/drd/:key`
- **V2 endpoint**: `GET /v2/decision-requirements/:decisionRequirementsKey`

<Tabs groupId="get-decision-requirements" defaultValue="input-adjustments" queryString values={
[
{label: 'Input adjustments', value: 'input-adjustments', },
{label: 'Output adjustments', value: 'output-adjustments', },
]
}>

<TabItem value='input-adjustments'>

- The request parameters attributes remain unchanged.

</TabItem>

<TabItem value='output-adjustments'>

- Attributes attribute `id` has been removed.
- The attribute `key` was replaced to `decisionRequirementsKey`

</TabItem>

</Tabs>

#### Get decision requirements as XML by key

- **V1 endpoint**: `GET /v1/drd/:key/xml`
- **V2 endpoint**: `GET /v2/decision-requirements/:decisionRequirementsKey/xml`

There are no changes to the request or response for this endpoint.

<!--- TODO: insert output adjustments --->

<!--- TODO: open questions and related resources --->

<!--- TODO: insert link to C8 REST API guidelines --->
