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
- The `bpmnProcessId` and `processName` are now called `processDefinitionId` to be easily relatable to the process definition entity, like the `processDefinitionKey`.
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
- Renamed atttibutes
  - `id` - Use `formKey` as this refers to the unique system identifier of the form.
  - `title` - Use `formId` as this aligns better with the attribute defined in the form schema.
- Removed attributes
  - `isDeleted` - The endpoint does not serve this information anymore.
  - `processDefinitionKey` - You can identify the related entity from the endpoint resource and the provided key parameter, the form response does not contain it additionally anymore.

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
- Renamed attributes
  - `variableNames` - Use the `filter` object's `name`, either with a plain string for one exact match or with `{ "$in": [ "xyz", ... ]}`.
- Removed attributes
  - `includeVariables` - The endpoint returns all variables associated with the user task.

</TabItem>

<TabItem value='output-adjustments'>

- Response structure changes as outlined in [general changes][].
- Renamed attributes
  - `id` - Use `variableKey` as this refers to the unique system identifier of the variable.
  - `value` - Use `fullValue` as this represents the full variable value in case the `value` is only a preview due to size constraints. If the `value` is not a preview, the `fullValue` is empty.
  - `previewValue` - Use `value` as this always represents the variable value. This can be a preview value due to size constraints. In that case, the `fullValue` contains the full variable value.
  - `isValueTruncated` - Use `isTruncated` as a replacement
- Removed attributes
  - `draft` - Draft variables are not supported in V2 anymore, see also the [save draft variables](#save-task-draft-variables) endpoint for further details.
- Added attributes
  - `scopeKey` - Variables belong to a specific scope, for example, the process instance or the element instance of a user task. This value represents the scope the variables is related to.
  - `processInstanceKey` - A variable belongs to process instance and this value represents the unique system identifier of that instance.
  - `tenantId` - Variables can belong to a dedicated tenant and this value represents the one it belongs to. See [multi-tenancy][] for further details.

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

- Request structure changes as outlined in [general changes][].
  - The `pageSize` is now the `limit` in the `page` object.
  - The `searchAfter` and `searchBefore` are in the `page` object.
  - The `searchAfterOrEqual` and `searchBeforeOrEqual` options do not exist.
- Renamed attributes
  - `taskDefinitionId` - Use `elementId` as this refers to the user-provided identifier of the BPMN element that created the user task.
  - `followUpDate` and `dueDate` filter options - Instead of `from` and `to`, use `$gte` and `$lte`. Additionally, you can use new comparison filter options.
  - `priority` filter options - Filter object keys need a `$` prefix. Additionally, you can use new comparison filter options like `$neq`, `$exists`, and `$in`.
- Removed attributes
  - `assigned` - Use `assignee` with `{ "$exists": false }`. Multiple filters can be combined in one attribute.
  - `assignees` - Use `assignee` with `{ "$in": [ "xyz", ... ] }`. Multiple filters can be combined in one attribute.
  - `candidateGroups` - Use `candidateGroup` with `{ "$in": [ "xyz", ... ] }`.
  - `candidateUsers` - Use `candidateUser` with `{ "$in": [ "xyz", ... ] }`.
  - `taskVariables` split up and renamed
    - You can define `localVariables` and `processInstanceVariables`.
    - Local variables match the defined `name` and `value` and exist in the local scope of the BPMN element instance that created the user task.
    - Process instance variables match the defined `name` and `value` and exist anywhere in the process instance that the user task belongs to.
  - `tenantIds` - Use `tenantId` with `{ "$in": [ "xyz", ... ] }`.
  - `includeVariables` - The endpoint does not return variables. Use the [search task variables](#search-task-variables) endpoint to retrieve them.
  - `implementation` - The V2 API supports only Camunda user tasks.
- Added attributes
  - `userTaskKey` - Filter for specific user tasks by their unique system identifiers.
  - `processDefinitionId` - Filter for user tasks by the user-provided unique identifier of the process.
  - `elementInstanceKey` - Find tasks by the unique system identifier of the instance of the BPMN element that created the user task.

</TabItem>

<TabItem value='output-adjustments'>

- Response structure changes as outlined in [general changes][].
  - `sortValues` do not exist per result item. Instead, the `page` object contains `firstSortValues` and `lastSortValues`, referring to the `sortValues` of the first and last item of the result set.
- Renamed attributes
  - `id` - Use `userTaskKey`, this still refers to the unique system identifier of the user task.
  - `formKey` - This now is a unique system identifier, referencing a linked Camunda form in a specific version. Previously, this encoded an embedded form, a linked Camunda form, or an external form reference.
  - `taskDefinitionId` - Use `elementId`, this still refers to the user-provided identifier of the BPMN element that created the user task.
  - `taskState` - Use `state`, this still refers to the user task's current state.
  - `processName` - Use `processDefinitionId`, this still refers to the user-provided identifier of the process.
- Removed attributes
  - `isFirst` - This used to identify if the task was the first in the process.
  - `variables` - Use the [search user task variables endpoint][] to retrieve variables for a user task.
  - `implementation` - The V2 API supports only Camunda user tasks.
  - `isFormEmbedded` - The V2 API does not support embedded forms anymore.
  - `formVersion` - Use the [get user task form endpoint][] to retrieve form data bound to this user task. The `formKey` references the form of a specific `formId`, linked to this user task in a specific version.
  - `formId` - Use the [get user task form endpoint][] to retrieve form data bound to this user task. The `formKey` references the form of a specific `formId`, linked to this user task in a specific version.
- Added attributes
  - `customHeaders` - Any user-provided custom header values provided for the user task.
  - `externalFormReference` - The user-provided reference to an external form for the user task. Previously, the `formKey` encoded this value.
  - `processDefinitionVersion` - The version of the process this user task belongs to.

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

- No input adjustments.

</TabItem>

<TabItem value='output-adjustments'>

- Response object removed - The V2 API returns a 204 status, indicating that the task was unassigned. Fetching the updated data of the user task should be done through the respective API since the data can change concurrently at any time.

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

- Adjusted attributes
  - `variables` - Provide the variables as a proper JSON object instead of an array of objects with a `name` and a serialized JSON string `value`.
- Added attributes
  - `action` - Provide any custom lifecycle for this action or use the default value of `"assign"`.

</TabItem>

<TabItem value='output-adjustments'>

- Response object removed - The V2 API returns a 204 status, indicating that the task was completed. Fetching the updated data of the user task should be done through the respective API since the data can change concurrently at any time.

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

- Renamed attributes
  - `allowOverrideAssignment` - Use `allowOverride`, this still refers to allowing to override any existing assignee.
- Added attributes
  - `action` - Provide any custom lifecycle for this action or use the default value of `"assign"`.

</TabItem>

<TabItem value='output-adjustments'>

- Response object removed - The V2 API returns a 204 status, indicating that the task was assigned. Fetching the updated data of the user task should be done through the respective API since the data can change concurrently at any time.

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

- No input adjustments.

</TabItem>

<TabItem value='output-adjustments'>

- Except for the response structure changes, all adjustments from [search tasks](#search-tasks) apply.

</TabItem>
</Tabs>

<!--- TODO: open questions and related resources --->

<!--- TODO: insert link to C8 REST API guidelines --->

[setting variables]: /apis-tools/camunda-api-rest/specifications/update-element-instance-variables.api.mdx
[general changes]: #general-endpoint-changes
[multi-tenancy]: /self-managed/concepts/multi-tenancy.md
