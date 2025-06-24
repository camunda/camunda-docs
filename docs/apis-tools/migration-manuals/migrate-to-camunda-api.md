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
- The request and response payload of every new endpoint might contain new attributes that are not necessarily needed for a migration from a V1 endpoint to V2 but might still be useful. Please consult the V2 API guides for access to all new attributes.

</TabItem>

<TabItem value='query-endpoints'>

- Unified search request structure.
  - Attributes `filter`, `page`, and `sort` on root level.
  - Endpoint-specific filter attributes in the filter object, not at the root level.
  - Pagination information in the `page` object. For example, the attributes `from`, `limit`, `before`, and `after`.
  - Sorting configuration in sort object array, each object containing the field name and order (descending or ascending).
- Unified search response structure.
  - Attributes `items` and `page` on root level.
  - List of endpoint-specific response items in `items` attribute.
  - Page information in `page` attribute, for example the attributes `totalItems`, `startCursor`, and `endCursor` to use in `before` and `after` in follow-up requests.

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

- **[V1 endpoint](../tasklist-api-rest/specifications/get-form.api.mdx)**: `GET /v1/forms/{formId}`
- **V2 endpoints**:
  - `GET /v2/user-tasks/{userTaskKey}/form` ([link](../camunda-api-rest/specifications/get-user-task-form.api.mdx))
  - `GET /v2/process-definitions/{processDefinitionKey}/form` ([link](../camunda-api-rest/specifications/get-start-process-form.api.mdx))

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

- **[V1 endpoint](../tasklist-api-rest/specifications/save-draft-task-variables.api.mdx)**: `POST /v1/tasks/{taskId}/variables`
- **V2 endpoint**: This feature is not supported in V2 anymore. Use [setting variables][] as `local` to the user task's `elementInstanceKey` as a replacement.

#### Search task variables

- **[V1 endpoint](../tasklist-api-rest/specifications/search-task-variables.api.mdx)**: `POST /v1/tasks/{taskId}/variables/search`
- **[V2 endpoint](../camunda-api-rest/specifications/search-user-task-variables.api.mdx)**: `POST /v2/user-tasks/{userTaskKey}/variables/search`

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
  - `previewValue` - Use `value` as this always represents the variable value. This can be a truncated value due to size constraints.
  - `isValueTruncated` - Use `isTruncated` as a replacement. If the value of `isTruncated` is `true` and you need the full value, please see the [get a variable](#get-a-variable) endpoint.
- Removed attributes
  - `draft` - Draft variables are not supported in V2 anymore, see also the [save draft variables](#save-task-draft-variables) endpoint for further details.

</TabItem>
</Tabs>

#### Search tasks

- **[V1 endpoint](../tasklist-api-rest/specifications/search-tasks.api.mdx)**: `POST /v1/tasks/search`
- **[V2 endpoint](../camunda-api-rest/specifications/search-user-tasks.api.mdx)**: `POST /v2/user-tasks/search`

<Tabs groupId="tasklist" defaultValue="input-adjustments" queryString values={
[
{label: 'Input adjustments', value: 'input-adjustments', },
{label: 'Output adjustments', value: 'output-adjustments', },
]
}>

<TabItem value='input-adjustments'>

- Request structure changes as outlined in [general changes][].
  - The `pageSize` is now the `limit` in the `page` object.
  - The `searchAfter` and `searchBefore` are in the `page` object as `after` and `before`.
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
  - `variables` - Use the [search user task variables endpoint](#search-task-variables) to retrieve variables for a user task.
  - `implementation` - The V2 API supports only Camunda user tasks.
  - `isFormEmbedded` - The V2 API does not support embedded forms anymore.
  - `formVersion` - Use the [get user task form endpoint][] to retrieve form data bound to this user task. The `formKey` references the form of a specific `formId`, linked to this user task in a specific version.
  - `formId` - Use the [get user task form endpoint][] to retrieve form data bound to this user task. The `formKey` references the form of a specific `formId`, linked to this user task in a specific version.

</TabItem>

</Tabs>

#### Unassign a task

- **[V1 endpoint](../tasklist-api-rest/specifications/unassign-task.api.mdx)**: `PATCH /v1/tasks/{taskId}/unassign`
- **[V2 endpoint](../camunda-api-rest/specifications/unassign-user-task.api.mdx)**: `DELETE /v2/user-tasks/{userTaskKey}/assignee`

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

#### Complete a task

- **[V1 endpoint](../tasklist-api-rest/specifications/complete-task.api.mdx)**: `PATCH /v1/tasks/{taskId}/complete`
- **[V2 endpoint](../camunda-api-rest/specifications/complete-user-task.api.mdx)**: `POST /v2/user-tasks/{userTaskKey}/completion`

<Tabs groupId="complete-user-task" defaultValue="input-adjustments" queryString values={
[
{label: 'Input adjustments', value: 'input-adjustments'},
{label: 'Output adjustments', value: 'output-adjustments'},
]
}>

<TabItem value='input-adjustments'>

- Adjusted attributes
  - `variables` - Provide the variables as a proper JSON object instead of an array of objects with a `name` and a serialized JSON string `value`.

</TabItem>

<TabItem value='output-adjustments'>

- Response object removed - The V2 API returns a 204 status, indicating that the task was completed. Fetching the updated data of the user task should be done through the respective API since the data can change concurrently at any time.

</TabItem>
</Tabs>

#### Assign a task

- **[V1 endpoint](../tasklist-api-rest/specifications/assign-task.api.mdx)**: `PATCH /v1/tasks/{taskId}/assign`
- **[V2 endpoint](../camunda-api-rest/specifications/assign-user-task.api.mdx)**: `POST /v2/user-tasks/{userTaskKey}/assignment`

<Tabs groupId="assign-user-task" defaultValue="input-adjustments" queryString values={
[
{label: 'Input adjustments', value: 'input-adjustments'},
{label: 'Output adjustments', value: 'output-adjustments'},
]
}>

<TabItem value='input-adjustments'>

- Renamed attributes
  - `allowOverrideAssignment` - Use `allowOverride`, this still refers to allowing to override any existing assignee.

</TabItem>

<TabItem value='output-adjustments'>

- Response object removed - The V2 API returns a 204 status, indicating that the task was assigned. Fetching the updated data of the user task should be done through the respective API since the data can change concurrently at any time.

</TabItem>
</Tabs>

#### Get a task

- **[V1 endpoint](../tasklist-api-rest/specifications/get-task-by-id.api.mdx)**: `GET /v1/tasks/{taskId}`
- **[V2 endpoint](../camunda-api-rest/specifications/get-user-task.api.mdx)**: `GET /v2/user-tasks/{userTaskKey}`

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

### Variables

#### Get a variable

- **[V1 endpoint](../tasklist-api-rest/specifications/get-variable-by-id.api.mdx)**: `GET /v1/variables/{variableId}`
- **[V2 endpoint](../camunda-api-rest/specifications/get-variable.api.mdx)**: `GET /v2/variables/{variableKey}`

<Tabs groupId="get-a-variable" defaultValue="input-adjustments" queryString values={
[
{label: 'Input adjustments', value: 'input-adjustments'},
{label: 'Output adjustments', value: 'output-adjustments'},
]
}>

<TabItem value='input-adjustments'>

- `variableId` - Use `variableKey` as this refers to the unique system identifier of the variable.

</TabItem>

<TabItem value='output-adjustments'>

- Renamed attributes
  - `id` - Use `variableKey` as this refers to the unique system identifier of the variable.
- Removed attributes
  - `draft` - Draft variables are not supported in V2 anymore, see also the [save draft variables](#save-task-draft-variables) endpoint for further details.

</TabItem>
</Tabs>

## Operate API

### Decision definition

#### Search decision definitions

- **[V1 endpoint](../operate-api/specifications/search-7.api.mdx)**: `POST /v1/decision-definitions/search`
- **[V2 endpoint](../camunda-api-rest/specifications/search-decision-definitions.api.mdx)**: `POST /v2/decision-definitions/search`

<Tabs groupId="search-decision-definitions" defaultValue="input-adjustments" queryString values={
[
{label: 'Input adjustments', value: 'input-adjustments'},
{label: 'Output adjustments', value: 'output-adjustments'},
]
}>

<TabItem value='input-adjustments'>

- Request structure changes as outlined in [general changes][].
  - `searchAfter` is now the `after` in the `page` object.
  - `size` is now the `limit` in the `page` object.
- Renamed attributes in the `filter` object
  - `id` - Use `decisionDefinitionKey` instead.
  - `key` of type `int64` - Use `decisionDefinitionKey` of type `string`.
  - `decisionId` - Use `decisionDefinitionId` instead.
  - `decisionRequirementsKey` of type `int64` - This is now of type `string`.
- Removed attributes from the `filter` object
  - `decisionRequirementsName` - Can no longer be used for filtering.
  - `decisionRequirementsVersion` - Can no longer be used for filtering.

</TabItem>

<TabItem value='output-adjustments'>

- Response structure changes as outlined in [general changes][].
  - `total` is moved under the `page` object as `totalItems`.
  - `sortValues` - Use `lastSortValues` in the `page` object instead.
- Renamed attributes in the objects of the `items` array
  - `id` - Use `decisionDefinitionKey` instead.
  - `key` of type `int64` - Use `decisionDefinitionKey` of type `string`.
  - `decisionId` - Use `decisionDefinitionId` instead.
  - `decisionRequirementsKey` of type `int64` - This is now of type `string`.
- Removed attributes in the objects of the `items` array
  - `decisionRequirementsName` - Can be fetched using the **get decision requirements** endpoint with `decisionRequirementsKey`.
  - `decisionRequirementsVersion` - Can be fetched using the **get decision requirements** endpoint with `decisionRequirementsKey`.

</TabItem>
</Tabs>

#### Get decision definition by key

- **[V1 endpoint](../operate-api/specifications/by-key-6.api.mdx)**: `GET /v1/decision-definitions/{key}`
- **[V2 endpoint](../camunda-api-rest/specifications/get-decision-definition.api.mdx)**: `GET /v2/decision-definitions/{decisionDefinitionKey}`

<Tabs groupId="get-decision-definition" defaultValue="input-adjustments" queryString values={
[
{label: 'Input adjustments', value: 'input-adjustments'},
{label: 'Output adjustments', value: 'output-adjustments'},
]
}>

<TabItem value='input-adjustments'>

- No input adjustments.

</TabItem>

<TabItem value='output-adjustments'>

- Except for the response structure changes, all adjustments from [search decision definitions](#search-decision-definitions) apply.

</TabItem>
</Tabs>

#### Search decision instances

- **[V1 endpoint](../operate-api/specifications/search-6.api.mdx)**: `POST /v1/decision-instances/search`
- **[V2 endpoint](../camunda-api-rest/specifications/search-decision-instances.api.mdx)**: `POST /v2/decision-instances/search`

<Tabs groupId="search-decision-instances" defaultValue="input-adjustments" queryString values={
[
{label: 'Input adjustments', value: 'input-adjustments'},
{label: 'Output adjustments', value: 'output-adjustments'},
]
}>

<TabItem value='input-adjustments'>

- Request structure changes as outlined in [general changes][].
  - `searchAfter` is now the `after` in the `page` object.
  - `size` is now the `limit` in the `page` object.
- Renamed attributes in the `filter` object
  - `id` - Use `decisionInstanceId` instead.
  - `key` of type `int64` - Use `decisionInstanceKey` of type `string`.
  - `processDefinitionKey` of type `int64` - This is now of type `string`.
  - `processInstanceKey` of type `int64` - This is now of type `string`.
  - `decisionId` - Use `decisionDefinitionId` instead.
  - `decisionName` - Use `decisionDefinitionName` instead.
  - `decisionVersion` - Use `decisionDefinitionVersion` instead.
  - `decisionType` - Use `decisionDefinitionType` instead.
- Removed attributes in the `filter` object
  - `result` - Can no longer be used for filtering.
  - `evaluatedInputs` - Can no longer be used for filtering.
  - `evaluatedOutputs` - Can no longer be used for filtering.

</TabItem>

<TabItem value='output-adjustments'>

- Response structure changes as outlined in [general changes][].
  - `total` is moved under the `page` object as `totalItems`.
  - `sortValues` - Use `lastSortValues` in the `page` object instead.
- Renamed attributes in the objects of the `items` array
  - `id` - Use `decisionInstanceId` instead.
  - `key` of type `int64` - Use `decisionInstanceKey` of type `string`.
  - `processDefinitionKey` of type `int64` - This is now of type `string`.
  - `processInstanceKey` of type `int64` - This is now of type `string`.
  - `decisionId` - Use `decisionDefinitionId` instead.
  - `decisionName` - Use `decisionDefinitionName` instead.
  - `decisionVersion` - Use `decisionDefinitionVersion` instead.
  - `decisionType` - Use `decisionDefinitionType` instead.
- Removed attributes in the objects of the `items` array
  - `evaluatedInputs` - The endpoint does not serve this information anymore.
  - `evaluatedOutputs` - The endpoint does not serve this information anymore.

</TabItem>
</Tabs>

#### Get decision instance by id

- **[V1 endpoint](../operate-api/specifications/by-id.api.mdx)**: `GET /v1/decision-instances/{id}`
- **[V2 endpoint](../camunda-api-rest/specifications/search-decision-instances.api.mdx)**: `GET /v2/decision-instances/{decisionInstanceId}`

<Tabs groupId="get-decision-instance-by-id" defaultValue="input-adjustments" queryString values={
[
{label: 'Input adjustments', value: 'input-adjustments'},
{label: 'Output adjustments', value: 'output-adjustments'},
]
}>

<TabItem value='input-adjustments'>

- No input adjustments.

</TabItem>

<TabItem value='output-adjustments'>

- The adjustments from [search decision instances](#search-decision-instances) apply, with the following exceptions:
  - Response structure changes.
  - `evaluatedInputs` - Present in the response payload.
  - `evaluatedOutputs` - Present in the response payload and moved under `matchedRules`.
- Renamed attributes in the `evaluatedInputs` object
  - `id` - Use `inputId` instead.
  - `name` - Use `inputName` instead.
  - `value` - Use `inputValue` instead.
- Renamed attributes in the `evaluatedOutputs` object
  - `id` - Use `outputId` instead.
  - `name` - Use `outputName` instead.
  - `value` - Use `outputValue` instead.
  - `ruleId` - Moved under the objects of the `matchedRules` array.
  - `ruleIndex` - Moved under the objects of the `matchedRules` array.

</TabItem>
</Tabs>

#### Search decision requirements

- **[V1 endpoint](../operate-api/specifications/search-5.api.mdx)**: `POST /v1/drd/search`
- **[V2 endpoint](../camunda-api-rest/specifications/search-decision-requirements.api.mdx)**: `POST /v2/decision-requirements/search`

<Tabs groupId="search-decision-requirements" defaultValue="input-adjustments" queryString values={
[
{label: 'Input adjustments', value: 'input-adjustments'},
{label: 'Output adjustments', value: 'output-adjustments'},
]
}>

<TabItem value='input-adjustments'>

- Request structure changes as outlined in [general changes][].
  - `searchAfter` is now the `after` in the `page` object.
  - `size` is now the `limit` in the `page` object.
- Renamed attributes in the `filter` object
  - `id` - Use `decisionRequirementsKey` instead.
  - `key` of type `int64` - Use `decisionRequirementsKey` of type `string`.
  - `name` - Use `decisionRequirementsName` instead.

</TabItem>

<TabItem value='output-adjustments'>

- Response structure changes as outlined in [general changes][].
  - `total` is moved under the `page` object as `totalItems`.
  - `sortValues` - Use `lastSortValues` in the `page` object instead.
- Renamed attributes in the objects of the `items` array
  - `id` - Use `decisionRequirementsKey` instead.
  - `key` of type `int64` - Use `decisionRequirementsKey` of type `string`.
  - `name` - Use `decisionRequirementsName` instead.

</TabItem>
</Tabs>

#### Get decision requirements by key

- **[V1 endpoint](../operate-api/specifications/by-key-5.api.mdx)**: `GET /v1/drd/{key}`
- **[V2 endpoint](../camunda-api-rest/specifications/get-decision-requirements.api.mdx)**: `GET /v2/decision-requirements/{decisionRequirementsKey}`

<Tabs groupId="get-decision-requirements-by-key" defaultValue="input-adjustments" queryString values={
[
{label: 'Input adjustments', value: 'input-adjustments'},
{label: 'Output adjustments', value: 'output-adjustments'},
]
}>

<TabItem value='input-adjustments'>

- No input adjustments.

</TabItem>

<TabItem value='output-adjustments'>

- Except for the response structure changes, all adjustments from [search decision requirements](#search-decision-requirements) apply.

</TabItem>
</Tabs>

#### Get decision requirements as XML by key

- **[V1 endpoint](../operate-api/specifications/xml-by-key-1.api.mdx)**: `GET /v1/drd/{key}/xml`
- **[V2 endpoint](../camunda-api-rest/specifications/get-decision-requirements-xml.api.mdx)**: `GET /v2/decision-requirements/{decisionRequirementsKey}/xml`

<Tabs groupId="get-decision-requirements-by-key" defaultValue="input-adjustments" queryString values={
[
{label: 'Input adjustments', value: 'input-adjustments'},
{label: 'Output adjustments', value: 'output-adjustments'},
]
}>

<TabItem value='input-adjustments'>

- No input adjustments.

</TabItem>

<TabItem value='output-adjustments'>

- No output adjustments.

</TabItem>
</Tabs>

### Variable

#### Search variables for process instances

- **[V1 endpoint](../operate-api/specifications/search.api.mdx)**: `POST /v1/variables/search`
- **[V2 endpoint](../camunda-api-rest/specifications/search-variables.api.mdx)**: `POST /v2/variables/search`

<Tabs groupId="search-variables-for-process-instances" defaultValue="input-adjustments" queryString values={
[
{label: 'Input adjustments', value: 'input-adjustments'},
{label: 'Output adjustments', value: 'output-adjustments'},
]
}>

<TabItem value='input-adjustments'>

- Response structure changes as outlined in [general changes][].
  - `searchAfter` is now the `after` in the `page` object.
  - `size` is now the `limit` in the `page` object.
- Renamed attributes in the `filter` object
  - `key` of type `int64` - Use `variableKey` of type `string`.
  - `processInstanceKey` of type `int64` - This is now of type `string`.
  - `scopeKey` of type `int64` - This is now of type `string`.
  - `truncated` - Use `isTruncated` instead.

</TabItem>

<TabItem value='output-adjustments'>

- Response structure changes as outlined in [general changes][].
  - `total` is moved under the `page` object as `totalItems`.
  - `sortValues` - Use `lastSortValues` in the `page` object instead.
- Renamed attributes in the objects of the `items` array
  - `key` of type `int64` - Use `variableKey` of type `string`.
  - `processInstanceKey` of type `int64` - This is now of type `string`.
  - `scopeKey` of type `int64` - This is now of type `string`.
  - `truncated` - Use `isTruncated` instead.

</TabItem>
</Tabs>

#### Get variable by key

- **[V1 endpoint](../operate-api/specifications/by-key.api.mdx)**: `GET /v1/variables/{key}`
- **[V2 endpoint](../camunda-api-rest/specifications/get-variable.api.mdx)**: `GET /v2/variables/{variableKey}`

<Tabs groupId="get-variable-by-key" defaultValue="input-adjustments" queryString values={
[
{label: 'Input adjustments', value: 'input-adjustments'},
{label: 'Output adjustments', value: 'output-adjustments'},
]
}>

<TabItem value='input-adjustments'>

- No input adjustments.

</TabItem>

<TabItem value='output-adjustments'>

- All adjustments from [search variables for process instances](#search-variables-for-process-instances) apply, with the following exceptions:
  - Response structure changes.
  - `truncated` is removed because this endpoint always returns the full variable value.

</TabItem>
</Tabs>

<!--- TODO: open questions and related resources --->

<!--- TODO: insert link to C8 REST API guidelines --->

[setting variables]: /apis-tools/camunda-api-rest/specifications/create-element-instance-variables.api.mdx
[general changes]: #general-endpoint-changes
[multi-tenancy]: /self-managed/concepts/multi-tenancy.md

### Process definition

#### Search process definitions

- **[V1 endpoint](../operate-api/specifications/search-2.api.mdx)**: `POST /v1/process-definitions/search`
- **[V2 endpoint](../camunda-api-rest/specifications/search-process-definitions.api.mdx)**: `POST /v2/process-definitions/search`

<Tabs groupId="search-process-definitions" defaultValue="input-adjustments" queryString values={
[
{label: 'Input adjustments', value: 'input-adjustments'},
{label: 'Output adjustments', value: 'output-adjustments'},
]
}>

<TabItem value='input-adjustments'>

- Request structure changes as outlined in [general changes][].
  - `searchAfter` is now the `after` in the `page` object.
  - `size` is now the `limit` in the `page` object.
- Renamed attributes in the `filter` object
  - `key` of type `int64` - Use `processDefinitionKey` of type `string` instead.
  - `bpmnProcessId` - Use `processDefinitionId` instead.

</TabItem>

<TabItem value='output-adjustments'>

- Response structure changes as outlined in [general changes][].
  - `total` is moved under the `page` object as `totalItems`.
  - `sortValues` - Use `lastSortValues` in the `page` object instead.
- Renamed attributes in the objects of the `items` array
  - `key` of type `int64` - Use `processDefinitionKey` of type `string` instead.
  - `bpmnProcessId` - Use `processDefinitionId` instead.

</TabItem>
</Tabs>

#### Get process definition by key

- **[V1 endpoint](../operate-api/specifications/by-key-2.api.mdx)**: `GET /v1/process-definitions/{key}`
- **[V2 endpoint](../camunda-api-rest/specifications/get-process-definition.api.mdx)**: `GET /v2/process-definitions/{processDefinitionKey}`

<Tabs groupId="get-process-definition" defaultValue="input-adjustments" queryString values={
[
{label: 'Input adjustments', value: 'input-adjustments'},
{label: 'Output adjustments', value: 'output-adjustments'},
]
}>

<TabItem value='input-adjustments'>

- No input adjustments.

</TabItem>

<TabItem value='output-adjustments'>

- Except for the response structure changes, all adjustments from [search process definitions](#search-process-definitions) apply.

</TabItem>
</Tabs>

#### Get process definition as XML by key

- **[V1 endpoint](../operate-api/specifications/xml-by-key.api.mdx)**: `GET /v1/process-definitions/{key}/xml`
- **[V2 endpoint](../camunda-api-rest/specifications/get-process-definition-xml.api.mdx)**: `GET /v2/process-definitions/{processDefinitionKey}/xml`

<Tabs groupId="get-process-definition-xml" defaultValue="input-adjustments" queryString values={
[
{label: 'Input adjustments', value: 'input-adjustments'},
{label: 'Output adjustments', value: 'output-adjustments'},
]
}>

<TabItem value='input-adjustments'>

- No input adjustments.

</TabItem>

<TabItem value='output-adjustments'>

- No output adjustments.

</TabItem>
</Tabs>

### Process instance

#### Search process instances

- **[V1 endpoint](../operate-api/specifications/search-1.api.mdx)**: `POST /v1/process-instances/search`
- **[V2 endpoint](../camunda-api-rest/specifications/search-process-instances.api.mdx)**: `POST /v2/process-instances/search`

<Tabs groupId="search-process-instances" defaultValue="input-adjustments" queryString values={
[
{label: 'Input adjustments', value: 'input-adjustments'},
{label: 'Output adjustments', value: 'output-adjustments'},
]
}>

<TabItem value='input-adjustments'>

- Request structure changes as outlined in [general changes][].
  - `searchAfter` is now the `after` in the `page` object.
  - `size` is now the `limit` in the `page` object.
- Renamed attributes in the `filter` object
  - `key` of type `int64` - Use `processInstanceKey` of type `string` instead.
  - `processVersion` - Use `processDefinitionVersion` instead.
  - `processVersionTag` - Use `processDefinitionVersionTag` instead.
  - `bpmnProcessId` - Use `processDefinitionId` instead.
  - `parentFlowNodeInstanceKey` - Use `parentElementInstanceKey` of type `string` instead.
  - `state` - Use value `TERMINATED` instead of value `CANCELED`.
  - `incident` - Use `hasIncident` instead.
- Adjusted attributes in the `filter` object
  - `parentProcessInstanceKey` - Type changed from `int64` to `string`.
  - `processDefinitionKey` - Type changed from `int64` to `string`.
- Removed attributes from the `filter` object
  - `parentKey` - Can no longer be used for filtering.

</TabItem>

<TabItem value='output-adjustments'>

- Response structure changes as outlined in [general changes][].
  - `total` is moved under the `page` object as `totalItems`.
  - `sortValues` - Use `lastSortValues` in the `page` object instead.
- Renamed attributes in the objects of the `items` array
  - `key` of type `int64` - Use `processInstanceKey` of type `string` instead.
  - `processVersion` - Use `processDefinitionVersion` instead.
  - `processVersionTag` - Use `processDefinitionVersionTag` instead.
  - `bpmnProcessId` - Use `processDefinitionId` instead.
  - `parentFlowNodeInstanceKey` - Use `parentElementInstanceKey` of type `string` instead.
  - `state` - Use value `TERMINATED` instead of value `CANCELED`.
  - `incident` - Use `hasIncident` instead.
- Adjusted attributes in the objects of the `items` array
  - `parentProcessInstanceKey` - Type changed from `int64` to `string`.
  - `processDefinitionKey` - Type changed from `int64` to `string`.
- Removed attributes from the objects of the `items` array
  - `parentKey` - The endpoint does not serve this information anymore.

</TabItem>
</Tabs>

#### Get process instance by key

- **[V1 endpoint](../operate-api/specifications/by-key-1.api.mdx)**: `GET /v1/process-instances/{key}`
- **[V2 endpoint](../camunda-api-rest/specifications/get-process-instance.api.mdx)**: `GET /v2/process-instances/{processInstanceKey}`

<Tabs groupId="get-process-instance-by-key" defaultValue="input-adjustments" queryString values={
[
{label: 'Input adjustments', value: 'input-adjustments'},
{label: 'Output adjustments', value: 'output-adjustments'},
]
}>

<TabItem value='input-adjustments'>

- No input adjustments.

</TabItem>

<TabItem value='output-adjustments'>

- Except for the response structure changes, all adjustments from [search process instances](#search-process-instances) apply.

</TabItem>
</Tabs>

#### Delete process instance and all dependant data by key

- **[V1 endpoint](../operate-api/specifications/delete.api.mdx)**: `DELETE /v1/process-instances/{key}`
- **V2 endpoint**: This feature is not yet available in V2. It will be added in a future version.

#### Get flow node statistic by process instance key

- **[V1 endpoint](../operate-api/specifications/get-statistics.api.mdx)**: `GET /v1/process-instances/{key}/statistics`
- **[V2 endpoint](../camunda-api-rest/specifications/get-process-instance-statistics.api.mdx)**: `GET /v2/process-instances/{processInstanceKey}/statistics/element-instances`

<Tabs groupId="get-process-instance-statistics" defaultValue="input-adjustments" queryString values={
[
{label: 'Input adjustments', value: 'input-adjustments'},
{label: 'Output adjustments', value: 'output-adjustments'},
]
}>

<TabItem value='input-adjustments'>

- No input adjustments.

</TabItem>

<TabItem value='output-adjustments'>

- Response structure changes
  - response items are moved under the `items` array.
- Renamed attributes in the objects of the `items` array
  - `activityId` - Use `elementId` instead.

</TabItem>
</Tabs>

#### Get sequence flows of process instance by key

- **[V1 endpoint](../operate-api/specifications/sequence-flows-by-key.api.mdx)**: `GET /v1/process-instances/{key}/sequence-flows`
- **[V2 endpoint](../camunda-api-rest/specifications/get-process-instance-sequence-flows.api.mdx)**: `GET /v2/process-instances/{processInstanceKey}/sequence-flows`

<Tabs groupId="get-process-instance-sequence-flows" defaultValue="input-adjustments" queryString values={
[
{label: 'Input adjustments', value: 'input-adjustments'},
{label: 'Output adjustments', value: 'output-adjustments'},
]
}>

<TabItem value='input-adjustments'>

- No input adjustments.

</TabItem>

<TabItem value='output-adjustments'>

- Response structure changes
  - response items are of type `object`, instead of type `string`.
  - response items are moved under the `items` array.
- Collect the `sequenceFlowId` of type `string` of all objects in the array to recreate the V1 result.

</TabItem>
</Tabs>

### Flownode instances

#### Search flownode instances

- **[V1 endpoint](../operate-api/specifications/search-4.api.mdx)**: `POST /v1/flownode-instances/search`
- **[V2 endpoint](../camunda-api-rest/specifications/search-element-instances.api.mdx)**: `POST /v2/element-instances/search`

<Tabs groupId="search-flownode-instances" defaultValue="input-adjustments" queryString values={
[
{label: 'Input adjustments', value: 'input-adjustments'},
{label: 'Output adjustments', value: 'output-adjustments'},
]
}>

<TabItem value='input-adjustments'>

- Request structure changes as outlined in [general changes][].
  - `searchAfter` is now the `after` in the `page` object.
  - `size` is now the `limit` in the `page` object.
- Renamed attributes in the `filter` object
  - `key` of type `int64` - Use `elementInstanceKey` of type `string` instead.
  - `flowNodeId` - Use `elementId` instead.
  - `flowNodeName` - Use `elementName` instead.
  - `incident` - Use `hasIncident` instead.
- Adjusted attributes in the `filter` object
  - `processInstanceKey` - Type changed from `int64` to `string`.
  - `processDefinitionKey` - Type changed from `int64` to `string`.
  - `incidentKey` - Type changed from `int64` to `string`.
- Removed attributes from the `filter` object
  - `startDate` - Can no longer be used for filtering.
  - `endDate` - Can no longer be used for filtering.

</TabItem>

<TabItem value='output-adjustments'>

- Response structure changes as outlined in [general changes][].
  - `total` is moved under the `page` object as `totalItems`.
  - `sortValues` - Use `lastSortValues` in the `page` object instead.
- Renamed attributes in the objects of the `items` array
  - `key` of type `int64` - Use `elementInstanceKey` of type `string` instead.
  - `flowNodeId` - Use `elementId` instead.
  - `flowNodeName` - Use `elementName` instead.
  - `incident` - Use `hasIncident` instead.
- Adjusted attributes in the objects of the `items` array
  - `processInstanceKey` - Type changed from `int64` to `string`.
  - `processDefinitionKey` - Type changed from `int64` to `string`.
  - `incidentKey` - Type changed from `int64` to `string`.

</TabItem>
</Tabs>

#### Get flownode instance by key

- **[V1 endpoint](../operate-api/specifications/by-key-4.api.mdx)**: `GET /v1/flownode-instances/{key}`
- **[V2 endpoint](../camunda-api-rest/specifications/get-element-instance.api.mdx)**: `GET /v2/element-instances/{elementInstanceKey}`

<Tabs groupId="get-flownode-instance-by-key" defaultValue="input-adjustments" queryString values={
[
{label: 'Input adjustments', value: 'input-adjustments'},
{label: 'Output adjustments', value: 'output-adjustments'},
]
}>

<TabItem value='input-adjustments'>

- No input adjustments.

</TabItem>

<TabItem value='output-adjustments'>

- Except for the response structure changes, all adjustments from [search flownode instances](#search-flownode-instances) apply.

</TabItem>
</Tabs>

### Incidents

#### Search incidents

- **[V1 endpoint](../operate-api/specifications/search-3.api.mdx)**: `POST /v1/incidents/search`
- **[V2 endpoint](../camunda-api-rest/specifications/search-incidents.api.mdx)**: `POST /v2/incidents/search`

<Tabs groupId="search-incidents" defaultValue="input-adjustments" queryString values={
[
{label: 'Input adjustments', value: 'input-adjustments'},
{label: 'Output adjustments', value: 'output-adjustments'},
]
}>

<TabItem value='input-adjustments'>

- Request structure changes as outlined in [general changes][].
  - `searchAfter` is now the `after` in the `page` object.
  - `size` is now the `limit` in the `page` object.
- Renamed attributes in the `filter` object
  - `key` of type `int64` - Use `incidentKey` of type `string` instead.
  - `type` - Use `errorType` instead.
  - `message` - Use `errorMessage` instead.
- Adjusted attributes in the `filter` object
  - `processInstanceKey` - Type changed from `int64` to `string`.
  - `processDefinitionKey` - Type changed from `int64` to `string`.
  - `jobKey` - Type changed from `int64` to `string`.

</TabItem>

<TabItem value='output-adjustments'>

- Response structure changes as outlined in [general changes][].
  - `total` is moved under the `page` object as `totalItems`.
  - `sortValues` - Use `lastSortValues` in the `page` object instead.
- Renamed attributes in the objects of the `items` array
  - `key` of type `int64` - Use `incidentKey` of type `string` instead.
  - `type` - Use `errorType` instead.
  - `message` - Use `errorMessage` instead.
- Adjusted attributes in the objects of the `items` array
  - `processInstanceKey` - Type changed from `int64` to `string`.
  - `processDefinitionKey` - Type changed from `int64` to `string`.
  - `jobKey` - Type changed from `int64` to `string`.

</TabItem>
</Tabs>

#### Get incident by key

- **[V1 endpoint](../operate-api/specifications/by-key-3.api.mdx)**: `GET /v1/incidents/{key}`
- **[V2 endpoint](../camunda-api-rest/specifications/get-incident.api.mdx)**: `GET /v2/incidents/{incidentKey}`

<Tabs groupId="get-incident-by-key" defaultValue="input-adjustments" queryString values={
[
{label: 'Input adjustments', value: 'input-adjustments'},
{label: 'Output adjustments', value: 'output-adjustments'},
]
}>

<TabItem value='input-adjustments'>

- No input adjustments.

</TabItem>

<TabItem value='output-adjustments'>

- Except for the response structure changes, all adjustments from [search incidents](#search-incidents) apply.

</TabItem>
</Tabs>
