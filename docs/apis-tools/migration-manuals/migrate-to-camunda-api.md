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

- Request structure changes as outlined above.
- `assigned (boolean)` removed
  - **V2:** Use `assignee` with `{ "$exists": false }`
- `assignees (string[])` removed
  - **V2:** Use `assignee` with `{ "$in": [ "xyz", ... ] }`
- `taskDefinitionId` renamed
  - **V2:** Use `elementId`
- `candidateGroups (string[])` removed
  - **V2:** Use `candidateGroup` with `{ "$in": [ "xyz", ... ] }`
- `taskVariables` renamed
  - **V2:** Use `variables`
- `candidateUsers (string[])` removed
  - **V2:** Use `candidateUser` with `{ "$in": [ "xyz", ... ] }`
- `tenantIds (string[])` removed
  - **V2:** Use `tenantIds` with `{ "$in": [ "xyz", ... ] }`
- `implementation` removed
  - **V2:** Only Camunda user tasks returned
- `includeVariables` removed
  - **V2:** Variables not included by default; use `GET /v2/user-tasks/{key}/variables/search` to retrieve them.

</TabItem>

<TabItem value='output-adjustments'>

- Response structure changes as outlined in [General changes](#general-changes).
- The attribute `id` renamed to `userTaskKey`.
- The attribute `taskDefinitionId` renamed to `elementId`.
- The attribute `taskState` renamed to `state`.
- The attribute `processName` renamed to `processDefinitionId`.
- The following attributes were added:
  - `customHeaders`
  - `externalFormReference`
  - `processDefinitionVersion`
- The following attributes were removed:
  - `isFirst` - Used to identify if the task was the first in the process.
  - `variables` - Use Search Variables in order to retrieve variables from a user task.
  - `implementation` - On V2, only user tasks are returned.
  - `isFormEmbedded` - User tasks do not support embedded forms.
  - `formVersion` - For user tasks, use the `formKey` to retrieve form data.
  - `formId` - For user tasks, use the `formKey` to retrieve form data.

</TabItem>

</Tabs>

---

#### Get User Task

- **V1 endpoint**: `GET /v1/tasks/{taskId}`
- **V2 endpoint**: `GET /v2/user-tasks/{userTaskKey}`

<Tabs groupId="get-user-task" defaultValue="input-adjustments" queryString values={
[
{label: 'Input adjustments', value: 'input-adjustments'},
{label: 'Output adjustments', value: 'output-adjustments'},
]
}>

<TabItem value='input-adjustments'>

No input adjustments.

</TabItem>

<TabItem value='output-adjustments'>

Same output adjustments as **Search Tasks**.

</TabItem>
</Tabs>

---

#### Assign User Task

- **V1 endpoint**: `PATCH /v1/tasks/{taskId}/assign`
- **V2 endpoint**: `POST /v2/user-tasks/{userTaskKey}/assignment`

<Tabs groupId="assign-user-task" defaultValue="input-adjustments" queryString values={
[
{label: 'Input adjustments', value: 'input-adjustments'},
{label: 'Output adjustments', value: 'output-adjustments'},
]
}>

<TabItem value='input-adjustments'>

- `allowOverrideAssignment` renamed to `allowOverride`
- `action` attribute added (defaults to `"assign"` if not provided)

</TabItem>

<TabItem value='output-adjustments'>

- V1 returned `200` with the User Task body
- V2 returns `204` (No Content)

</TabItem>
</Tabs>

---

#### Unassign User Task

- **V1 endpoint**: `PATCH /v1/tasks/{taskId}/unassign`
- **V2 endpoint**: `DELETE /v2/user-tasks/{userTaskKey}/assignee`

<Tabs groupId="unassign-user-task" defaultValue="input-adjustments" queryString values={
[
{label: 'Input adjustments', value: 'input-adjustments'},
{label: 'Output adjustments', value: 'output-adjustments'},
]
}>

<TabItem value='input-adjustments'>

No input adjustments.

</TabItem>

<TabItem value='output-adjustments'>

- V1 returned `200` with the User Task body
- V2 returns `204` (No Content)

</TabItem>
</Tabs>

---

#### Complete User Task

- **V1 endpoint**: `PATCH /v1/tasks/{taskId}/complete`
- **V2 endpoint**: `POST /v2/user-tasks/{userTaskKey}/completion`

<Tabs groupId="complete-user-task" defaultValue="input-adjustments" queryString values={
[
{label: 'Input adjustments', value: 'input-adjustments'},
{label: 'Output adjustments', value: 'output-adjustments'},
]
}>

<TabItem value='input-adjustments'>

- `action` attribute added (defaults to `"complete"` if not provided)

</TabItem>

<TabItem value='output-adjustments'>

- V1 returned `200` with the User Task body
- V2 returns `204` (No Content)

</TabItem>
</Tabs>

---

#### Save Task Draft Variables

- **V1 endpoint**: `POST /v1/tasks/{taskId}/variables`
- **V2 endpoint**: Not supported

<Tabs groupId="save-task-draft-vars" defaultValue="input-adjustments" queryString values={
[
{label: 'Input adjustments', value: 'input-adjustments'},
{label: 'Output adjustments', value: 'output-adjustments'},
]
}>

<TabItem value='input-adjustments'>

Not applicable, as this feature is not supported in V2.

</TabItem>

<TabItem value='output-adjustments'>

Not applicable, as this feature is not supported in V2.

</TabItem>
</Tabs>

---

#### Update User Task

- **V1 endpoint**: No direct V1 equivalent
- **V2 endpoint**: `PATCH /v2/user-tasks/{userTaskKey}`

<Tabs groupId="update-user-task" defaultValue="input-adjustments" queryString values={
[
{label: 'Input adjustments', value: 'input-adjustments'},
{label: 'Output adjustments', value: 'output-adjustments'},
]
}>

<TabItem value='input-adjustments'>

This is a new endpoint in V2, no V1 adjustments.

</TabItem>

<TabItem value='output-adjustments'>

Refer to the documentation for which attributes can be updated:  
[Update User Task Documentation](docs/apis-tools/camunda-api-rest/specifications/update-user-task.api.mdx)

</TabItem>
</Tabs>

---

#### Search Variables by a Task

- **V1 endpoint**: `POST /v1/tasks/{taskId}/variables/search`
- **V2 endpoint**: `GET /v2/user-tasks/{userTaskKey}/variables`

<Tabs groupId="search-vars-by-task" defaultValue="input-adjustments" queryString values={
[
{label: 'Input adjustments', value: 'input-adjustments'},
{label: 'Output adjustments', value: 'output-adjustments'},
]
}>

<TabItem value='input-adjustments'>

- `includeVariables` removed
  - **V2:** Returns all variables associated with the user task.

</TabItem>

<TabItem value='output-adjustments'>

- Unified response structure.
- Variables associated with both process and user task scopes returned with `scopeKey`.
- `draft` removed (no draft variables).
- `id` replaced with `variableKey`.

</TabItem>
</Tabs>

### Forms

#### Get Form

- **V1 endpoint**: `GET /v1/forms/{formId}`
- **V2 endpoints**:
  - `GET /v2/user-tasks/{userTaskKey}/form`
  - `GET /v2/process-definitions/{processDefinitionKey}/form`

<Tabs groupId="get-form" defaultValue="input-adjustments" queryString values={
[
{label: 'Input adjustments', value: 'input-adjustments'},
{label: 'Output adjustments', value: 'output-adjustments'},
]
}>

<TabItem value='input-adjustments'>

- No input parameters in V2; all input attributes removed.

</TabItem>

<TabItem value='output-adjustments'>

- Embedded forms no longer returned; only supported for user tasks.
- `isDeleted` and `processDefinitionKey` removed.
- `id` renamed to `formKey`.
- `title` renamed to `bpmnId`.

</TabItem>
</Tabs>

### Variables

#### Get Variable by ID

- **V1 endpoint**: `GET /v1/variables/{variableId}`
- **V2 endpoint**: `POST /v2/variables/search`

<Tabs groupId="get-variable-by-id" defaultValue="input-adjustments" queryString values={
[
{label: 'Input adjustments', value: 'input-adjustments'},
{label: 'Output adjustments', value: 'output-adjustments'},
]
}>

<TabItem value='input-adjustments'>

- Transitioned from GET to POST with filtering options.
- Unified request structure as above.

</TabItem>

<TabItem value='output-adjustments'>

- Unified response structure.
- Variables associated with both process and user task scopes returned with `scopeKey`.
- `draft` removed.
- `id` replaced with `variableKey`.

</TabItem>
</Tabs>

<!--- TODO: insert output adjustments --->

<!--- TODO: open questions and related resources --->

<!--- TODO: insert link to C8 REST API guidelines --->
