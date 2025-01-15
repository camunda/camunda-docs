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

Over time, there will be a deprecation process for the individual component APIs starting with the former Operate and Tasklist APIs. These will continue to be in the product for the short-term, but it is recommended to begin the adoption of the new API. In addition, we will begin to deprecate several Zeebe gPRC endpoints as well. See [the official blog announcement](https://camunda.com/blog/2024/11/camunda-8-7-releasing-february-2025/).

This guide considers all public endpoints existing in the component REST APIs and the Camunda 8 API counterparts or required migration changes.

## General endpoint changes

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

## Name changes and mappings

The following conventions apply to all attributes:

- `key` and `id` fields contain the entity as a prefix, for example, `userTaskKey`, `processDefinitionId`. This applies when referencing other resources like `formKey` in the user task entity, in the respective entities themselves like `userTaskKey` in the user task entity.
- The full entity is the prefix to avoid confusion, for example `processDefinitionKey` instead of `processKey` (the latter could be interpreted as process instance or process definition).
- Other attributes of entities themselves have no prefix to avoid clutter, for example version in the process definition entity. In other resources, they have to be referenced with a prefix, like `processDefinitionVersion` in the process instance entity.
- The `bpmnProcessId` is now called `processDefinitionId` to be easily relatable to the process definition entity, like the `processDefinitionKey`.
- The `decisionKey` and `dmnDecisionKey` are now aligned to `decisionDefinitionKey`, the `decisionId` and `dmnDecisionId` to `decisionDefinitionId`. Similar to the `processDefinitionId` being related to the process definition, those attributes are now easily relatable to the decision definition entity.

<!--- Insert Operate section with V1 endpoint and V2 endpoint to use with input/output adjustments --->

## Tasklist API

### Form

#### Get a form

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

- You cannot fetch forms directly anymore. Instead, fetch them by user task or process definition to get the respective form data.
- The respective endpoint only takes the key of the resource the form is related to as input parameter.

</TabItem>

<TabItem value='output-adjustments'>

- Embedded forms are no longer returned as Camunda user tasks don't support them.
- `isDeleted` removed
  - The endpoint does not serve this information anymore.
- `processDefinitionKey` removed
  - You can identify the related entity from the endpoint resource and the provided key parameter, the form response does not contain it additionally anymore.
- `id` renamed
  - Use `formKey` as this refers to the unique system identifier of the form.
- `title` renamed
  - Use `formId` as this aligns better with the attribute defined in the form schema.

</TabItem>
</Tabs>

### Task

#### Save task draft variables

- **V1 endpoint**: `POST /v1/tasks/{taskId}/variables`
- **V2 endpoint**: This feature is not supported in V2 anymore. Use [setting variables][] as `local` to the user task's `elementInstanceKey` as a replacement.

#### Search task variables

- **V1 endpoint**: `POST /v1/tasks/{taskId}/variables/search`
- **V2 endpoint**: `POST /v2/user-tasks/{userTaskKey}/variables/search`

<Tabs groupId="search-vars-by-task" defaultValue="input-adjustments" queryString values={
[
{label: 'Input adjustments', value: 'input-adjustments'},
{label: 'Output adjustments', value: 'output-adjustments'},
]
}>

<TabItem value='input-adjustments'>

- Request structure changes as outlined in [general changes][].
- `variableNames` renamed and type changed
  - Use the `filter` object's `name`, either with a plain string for one exact match or with `{ "$in": [ "xyz", ... ]}`.
- `includeVariables` removed
  - The endpoint returns all variables associated with the user task.

</TabItem>

<TabItem value='output-adjustments'>

- Response structure changes as outlined in [general changes][].
- `id` renamed
  - User `variableKey` as this refers to the unique system identifier of the variable.
- `value` renamed
  - Use `fullValue` as this represents the full variable value in case the `value` is only a preview due to size constraints. If the `value` is not a preview, the `fullValue` is empty.
- `previewValue` renamed
  - Use `value` as this always represents the variable value. This can be a preview value due to size constraints. In that case, the `fullValue` contains the full variable value.
- `isValueTruncated` renamed
  - Use `isTruncated` as a replacement
- `draft` removed
  - Draft variables are not supported in V2 anymore, see also the [Save draft variables](#save-task-draft-variables) endpoint for further details.
- `scopeKey` added
  - Variables belong to a specific scope, e.g., the process instance or the element instance of a user task. This value represents the scope the variables is related to.
- `processInstanceKey` added
  - A variable belongs to process instance and this value represents the unique system identifier of that instance.
- `tenantId` added
  - Variables can belong to a dedicated tenant and this value represents the one it belongs to. See [multi-tenancy][] for further details.

</TabItem>
</Tabs>

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

- Request structure changed as outlined in [general changes][].
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

- Response structure changes as outlined in [general changes][].
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
  - `variables` - Use search variables to retrieve variables from a user task.
  - `implementation` - On V2, only user tasks are returned.
  - `isFormEmbedded` - User tasks do not support embedded forms.
  - `formVersion` - For user tasks, use the `formKey` to retrieve form data.
  - `formId` - For user tasks, use the `formKey` to retrieve form data.

</TabItem>

</Tabs>

#### Unassign user task

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

- V1 returned `200` with the user task body
- V2 returns `204` (No Content)

</TabItem>
</Tabs>

#### Complete user task

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

- V1 returned `200` with the user task body
- V2 returns `204` (No Content)

</TabItem>
</Tabs>

#### Assign user task

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

- V1 returned `200` with the user task body
- V2 returns `204` (No Content)

</TabItem>
</Tabs>

#### Get user task

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

Same output adjustments as **Search tasks**.

</TabItem>
</Tabs>

### Variables

#### Get variable by ID

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

[setting variables]: /apis-tools/camunda-api-rest/specifications/create-element-instance-variables.mdx
[general changes]: #general-endpoint-changes
[multi-tenancy]: /self-managed/concepts/multi-tenancy.md
