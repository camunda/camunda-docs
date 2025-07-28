---
id: migrate-to-camunda-api
title: Migrate to the Orchestration cluster API
description: "Migrate from Camunda's V1 component REST APIs to the V2 Orchestration cluster REST API to interact with Camunda 8 clusters, activate jobs, and run user task state operations."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

This document offers a comprehensive guide to migrate from Camunda's V1 component REST APIs (the Tasklist REST API, for example) to the V2 [Orchestration cluster REST API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md).

Camunda is streamlining the developer experience by creating a unified REST API for Zeebe, Operate, Tasklist, and the Identity components with endpoint parity. This will be a single REST API for the orchestration cluster for a consistent and intuitive API experience to help your teams develop process automation solutions faster.

:::note
The Administration and Web Modeler APIs will not be part of the Orchestration cluster REST API, as these are platform APIs outside the cluster’s scope.
:::

Over time, there will be a deprecation process for the individual component APIs starting with the former Operate and Tasklist APIs. These will continue to be in the product for the short-term, but it is recommended to begin the adoption of the new API. In addition, we will begin to deprecate several Zeebe gPRC endpoints as well. See [the official blog announcement](https://camunda.com/blog/2024/11/camunda-8-7-releasing-february-2025/).

This guide considers all public endpoints existing in the component REST APIs and the Orchestration cluster API counterparts or required migration changes.

## Migration checklist

To successfully migrate from V1 component APIs to the V2 Orchestration cluster API, follow this checklist:

- [ ] **Identify your current V1 endpoints**: Audit your application to catalog all V1 API calls currently in use.
- [ ] **Map V1 endpoints to V2 equivalents**: Use the tables in this guide to find the corresponding V2 endpoints for each call.
- [ ] **Update request and response structure**: Adapt your code to handle the new formats, renamed attributes, and data type changes as outlined in this guide.
- [ ] **Update pagination logic**: Replace old pagination parameters with the new `page` object structure and cursor-based navigation.

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

The following table shows key attribute name changes from V1 to V2:

| **V1**           | **V2**                  | **Notes**                                                                   |
| ---------------- | ----------------------- | --------------------------------------------------------------------------- |
| `id`             | `[entity]Id`            | Keys now include entity prefix (e.g., `userTaskKey`, `processDefinitionId`) |
| `key`            | `[entity]Key`           | Converted from `int64` to `string` with entity prefix                       |
| `bpmnProcessId`  | `processDefinitionId`   | Unified naming convention                                                   |
| `processName`    | `processDefinitionId`   | Unified naming convention                                                   |
| `decisionKey`    | `decisionDefinitionKey` | Unified naming convention                                                   |
| `dmnDecisionKey` | `decisionDefinitionKey` | Unified naming convention                                                   |
| `decisionId`     | `decisionDefinitionId`  | Unified naming convention                                                   |
| `dmnDecisionId`  | `decisionDefinitionId`  | Unified naming convention                                                   |

**General naming conventions:**

- Keys and IDs contain the full entity name as prefix to avoid confusion (e.g., `processDefinitionKey` instead of `processKey`)
- Entity attributes have no prefix within their own entity, but use prefixes when referenced from other entities
- All key fields are now `string` type instead of `int64`

<!--- Insert Operate section with V1 endpoint and V2 endpoint to use with input/output adjustments --->

## Tasklist API

### Form

#### Get a form

<table className="table-migration">
<thead>
<tr>
<th>V1</th>
<th>V2</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<span class="badge badge--get">GET</span> [`/v1/forms/{formId}`](../tasklist-api-rest/specifications/get-form.api.mdx)

</td>
<td>

<span class="badge badge--get">GET</span> [`/v2/user-tasks/{userTaskKey}/form`](../orchestration-cluster-api-rest/specifications/get-user-task-form.api.mdx)<br/>
<span class="badge badge--get">GET</span> [`/v2/process-definitions/{processDefinitionKey}/form`](../orchestration-cluster-api-rest/specifications/get-start-process-form.api.mdx)

</td>
</tr>
</tbody>
</table>

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

Embedded forms are no longer returned as Camunda user tasks don't support them.

| **Field**              | **Change Type** | **Notes**                                                  |
| ---------------------- | --------------- | ---------------------------------------------------------- |
| `id`                   | Renamed         | Now `formKey` (unique system identifier of the form)       |
| `title`                | Renamed         | Now `formId` (aligns with form schema attribute)           |
| `isDeleted`            | Removed         | No longer provided by endpoint                             |
| `processDefinitionKey` | Removed         | Can be identified from endpoint resource and key parameter |

</TabItem>
</Tabs>

### Task

#### Save task draft variables

<table className="table-migration">
<thead>
<tr>
<th>V1</th>
<th>V2</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<span class="badge badge--post">POST</span> [`/v1/tasks/{taskId}/variables`](../tasklist-api-rest/specifications/save-draft-task-variables.api.mdx)

</td>
<td>

This feature is not supported in V2 anymore. Use [setting variables][] as `local` to the user task's `elementInstanceKey` as a replacement

</td>
</tr>
</tbody>
</table>

#### Search task variables

<table className="table-migration">
<thead>
<tr>
<th>V1</th>
<th>V2</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<span class="badge badge--post">POST</span> [`/v1/tasks/{taskId}/variables/search`](../tasklist-api-rest/specifications/search-task-variables.api.mdx)

</td>
<td>

<span class="badge badge--post">POST</span> [`/v2/user-tasks/{userTaskKey}/variables/search`](../orchestration-cluster-api-rest/specifications/search-user-task-variables.api.mdx)

</td>
</tr>
</tbody>
</table>

<Tabs groupId="search-vars-by-task" defaultValue="input-adjustments" queryString values={
[
{label: 'Input adjustments', value: 'input-adjustments'},
{label: 'Output adjustments', value: 'output-adjustments'},
]
}>

<TabItem value='input-adjustments'>

Request structure changes as outlined in [general changes][].

| **Field**          | **Change Type** | **Notes**                                                                   |
| ------------------ | --------------- | --------------------------------------------------------------------------- |
| `variableNames`    | Renamed         | Now `name` in `filter` object (plain string or `{ "$in": [ "xyz", ... ] }`) |
| `includeVariables` | Removed         | Endpoint returns all variables associated with the user task                |

</TabItem>

<TabItem value='output-adjustments'>

Response structure changes as outlined in [general changes][].

| **Field**          | **Change Type** | **Notes**                                                               |
| ------------------ | --------------- | ----------------------------------------------------------------------- |
| `id`               | Renamed         | Now `variableKey` (unique system identifier of the variable)            |
| `previewValue`     | Renamed         | Now `value` (always represents variable value, may be truncated)        |
| `isValueTruncated` | Renamed         | Now `isTruncated` (see get variable endpoint for full value if needed)  |
| `draft`            | Removed         | Draft variables not supported in V2 (see save draft variables endpoint) |

</TabItem>
</Tabs>

#### Search tasks

<table className="table-migration">
<thead>
<tr>
<th>V1</th>
<th>V2</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<span class="badge badge--post">POST</span> [`/v1/tasks/search`](../tasklist-api-rest/specifications/search-tasks.api.mdx)

</td>
<td>

<span class="badge badge--post">POST</span> [`/v2/user-tasks/search`](../orchestration-cluster-api-rest/specifications/search-user-tasks.api.mdx)

</td>
</tr>
</tbody>
</table>

<Tabs groupId="tasklist" defaultValue="input-adjustments" queryString values={
[
{label: 'Input adjustments', value: 'input-adjustments', },
{label: 'Output adjustments', value: 'output-adjustments', },
]
}>

<TabItem value='input-adjustments'>

Request structure changes as outlined in [general changes][].

| **Field**                 | **Change Type** | **Notes**                                                      |
| ------------------------- | --------------- | -------------------------------------------------------------- |
| `pageSize`                | Renamed         | Now `limit` in the `page` object                               |
| `searchAfter`             | Renamed         | Now `after` in the `page` object                               |
| `searchBefore`            | Renamed         | Now `before` in the `page` object                              |
| `taskDefinitionId`        | Renamed         | Now `elementId` (user-provided identifier of the BPMN element) |
| `assigned`                | Renamed         | Now `assignee` with `{ "$exists": false }`                     |
| `assignees`               | Renamed         | Now `assignee` with `{ "$in": [ "xyz", ... ] }`                |
| `candidateGroups`         | Renamed         | Now `candidateGroup` with `{ "$in": [ "xyz", ... ] }`          |
| `candidateUsers`          | Renamed         | Now `candidateUser` with `{ "$in": [ "xyz", ... ] }`           |
| `tenantIds`               | Renamed         | Now `tenantId` with `{ "$in": [ "xyz", ... ] }`                |
| `followUpDate`, `dueDate` | Changed         | Use `$gte` and `$lte` instead of `from` and `to`               |
| `priority`                | Changed         | Filter keys need `$` prefix, supports new comparison options   |
| `taskVariables`           | Split           | Now `localVariables` and `processInstanceVariables`            |
| `searchAfterOrEqual`      | Removed         | No longer supported                                            |
| `searchBeforeOrEqual`     | Removed         | No longer supported                                            |
| `includeVariables`        | Removed         | Use separate search task variables endpoint                    |
| `implementation`          | Removed         | V2 API supports only Camunda user tasks                        |

</TabItem>

<TabItem value='output-adjustments'>

Response structure changes as outlined in [general changes][].

| **Field**          | **Change Type** | **Notes**                                                                            |
| ------------------ | --------------- | ------------------------------------------------------------------------------------ |
| `sortValues`       | Removed         | No longer exist per result item - use `startCursor` and `endCursor` in `page` object |
| `id`               | Renamed         | Now `userTaskKey` (unique system identifier of the user task)                        |
| `taskDefinitionId` | Renamed         | Now `elementId` (user-provided identifier of the BPMN element)                       |
| `taskState`        | Renamed         | Now `state` (user task's current state)                                              |
| `processName`      | Renamed         | Now `processDefinitionId` (user-provided identifier of the process)                  |
| `formKey`          | Changed         | Now unique system identifier referencing linked Camunda form in specific version     |
| `isFirst`          | Removed         | No longer identifies if task was first in process                                    |
| `variables`        | Removed         | Use search user task variables endpoint                                              |
| `implementation`   | Removed         | V2 API supports only Camunda user tasks                                              |
| `isFormEmbedded`   | Removed         | V2 API does not support embedded forms                                               |
| `formVersion`      | Removed         | Use get user task form endpoint                                                      |
| `formId`           | Removed         | Use get user task form endpoint                                                      |

</TabItem>

</Tabs>

#### Unassign a task

<table className="table-migration">
<thead>
<tr>
<th>V1</th>
<th>V2</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<span class="badge badge--patch">PATCH</span> [`/v1/tasks/{taskId}/unassign`](../tasklist-api-rest/specifications/unassign-task.api.mdx)

</td>
<td>

<span class="badge badge--delete">DELETE</span> [`/v2/user-tasks/{userTaskKey}/assignee`](../orchestration-cluster-api-rest/specifications/unassign-user-task.api.mdx)

</td>
</tr>
</tbody>
</table>

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

<table className="table-migration">
<thead>
<tr>
<th>V1</th>
<th>V2</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<span class="badge badge--patch">PATCH</span> [`/v1/tasks/{taskId}/complete`](../tasklist-api-rest/specifications/complete-task.api.mdx)

</td>
<td>

<span class="badge badge--post">POST</span> [`/v2/user-tasks/{userTaskKey}/completion`](../orchestration-cluster-api-rest/specifications/complete-user-task.api.mdx)

</td>
</tr>
</tbody>
</table>

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

<table className="table-migration">
<thead>
<tr>
<th>V1</th>
<th>V2</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<span class="badge badge--patch">PATCH</span> [`/v1/tasks/{taskId}/assign`](../tasklist-api-rest/specifications/assign-task.api.mdx)

</td>
<td>

<span class="badge badge--post">POST</span> [`/v2/user-tasks/{userTaskKey}/assignment`](../orchestration-cluster-api-rest/specifications/assign-user-task.api.mdx)

</td>
</tr>
</tbody>
</table>

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

<table className="table-migration">
<thead>
<tr>
<th>V1</th>
<th>V2</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<span class="badge badge--get">GET</span> [`/v1/tasks/{taskId}`](../tasklist-api-rest/specifications/get-task-by-id.api.mdx)

</td>
<td>

<span class="badge badge--get">GET</span> [`/v2/user-tasks/{userTaskKey}`](../orchestration-cluster-api-rest/specifications/get-user-task.api.mdx)

</td>
</tr>
</tbody>
</table>

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

<table className="table-migration">
<thead>
<tr>
<th>V1</th>
<th>V2</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<span class="badge badge--get">GET</span> [`/v1/variables/{variableId}`](../tasklist-api-rest/specifications/get-variable-by-id.api.mdx)

</td>
<td>

<span class="badge badge--get">GET</span> [`/v2/variables/{variableKey}`](../orchestration-cluster-api-rest/specifications/get-variable.api.mdx)

</td>
</tr>
</tbody>
</table>

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

<table className="table-migration">
<thead>
<tr>
<th>V1</th>
<th>V2</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<span class="badge badge--post">POST</span> [`/v1/decision-definitions/search`](../operate-api/specifications/search-7.api.mdx)

</td>
<td>

<span class="badge badge--post">POST</span> [`/v2/decision-definitions/search`](../orchestration-cluster-api-rest/specifications/search-decision-definitions.api.mdx)

</td>
</tr>
</tbody>
</table>

<Tabs groupId="search-decision-definitions" defaultValue="input-adjustments" queryString values={
[
{label: 'Input adjustments', value: 'input-adjustments'},
{label: 'Output adjustments', value: 'output-adjustments'},
]
}>

<TabItem value='input-adjustments'>

Request structure changes as outlined in [general changes][].

| **Field**                     | **Change Type** | **Notes**                                                      |
| ----------------------------- | --------------- | -------------------------------------------------------------- |
| `searchAfter`                 | Renamed         | Now `after` in the `page` object                               |
| `size`                        | Renamed         | Now `limit` in the `page` object                               |
| `id`                          | Renamed         | Now `decisionDefinitionKey` in filter object                   |
| `key`                         | Renamed         | Now `decisionDefinitionKey` (changed from `int64` to `string`) |
| `decisionId`                  | Renamed         | Now `decisionDefinitionId` in filter object                    |
| `decisionRequirementsKey`     | Changed         | Now `string` type instead of `int64`                           |
| `decisionRequirementsName`    | Removed         | Can no longer be used for filtering                            |
| `decisionRequirementsVersion` | Removed         | Can no longer be used for filtering                            |

</TabItem>

<TabItem value='output-adjustments'>

Response structure changes as outlined in [general changes][].

| **Field**                     | **Change Type** | **Notes**                                                      |
| ----------------------------- | --------------- | -------------------------------------------------------------- |
| `total`                       | Moved           | Now `totalItems` in `page` object                              |
| `sortValues`                  | Replaced        | Now use `endCursor` in `page` object                           |
| `id`                          | Renamed         | Now `decisionDefinitionKey`                                    |
| `key`                         | Renamed         | Now `decisionDefinitionKey` (changed from `int64` to `string`) |
| `decisionId`                  | Renamed         | Now `decisionDefinitionId`                                     |
| `decisionRequirementsKey`     | Changed         | Now `string` type instead of `int64`                           |
| `decisionRequirementsName`    | Removed         | Fetch using get decision requirements endpoint                 |
| `decisionRequirementsVersion` | Removed         | Fetch using get decision requirements endpoint                 |

</TabItem>
</Tabs>

#### Get decision definition by key

<table className="table-migration">
<thead>
<tr>
<th>V1</th>
<th>V2</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<span class="badge badge--get">GET</span> [`/v1/decision-definitions/{key}`](../operate-api/specifications/by-key-6.api.mdx)

</td>
<td>

<span class="badge badge--get">GET</span> [`/v2/decision-definitions/{decisionDefinitionKey}`](../orchestration-cluster-api-rest/specifications/get-decision-definition.api.mdx)

</td>
</tr>
</tbody>
</table>

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

<table className="table-migration">
<thead>
<tr>
<th>V1</th>
<th>V2</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<span class="badge badge--post">POST</span> [`/v1/decision-instances/search`](../operate-api/specifications/search-6.api.mdx)

</td>
<td>

<span class="badge badge--post">POST</span> [`/v2/decision-instances/search`](../orchestration-cluster-api-rest/specifications/search-decision-instances.api.mdx)

</td>
</tr>
</tbody>
</table>

<Tabs groupId="search-decision-instances" defaultValue="input-adjustments" queryString values={
[
{label: 'Input adjustments', value: 'input-adjustments'},
{label: 'Output adjustments', value: 'output-adjustments'},
]
}>

<TabItem value='input-adjustments'>

Request structure changes as outlined in [general changes][].

| **Field**              | **Change Type** | **Notes**                                                    |
| ---------------------- | --------------- | ------------------------------------------------------------ |
| `searchAfter`          | Renamed         | Now `after` in the `page` object                             |
| `size`                 | Renamed         | Now `limit` in the `page` object                             |
| `id`                   | Renamed         | Now `decisionInstanceId` in filter object                    |
| `key`                  | Renamed         | Now `decisionInstanceKey` (changed from `int64` to `string`) |
| `processDefinitionKey` | Changed         | Now `string` type instead of `int64`                         |
| `processInstanceKey`   | Changed         | Now `string` type instead of `int64`                         |
| `decisionId`           | Renamed         | Now `decisionDefinitionId`                                   |
| `decisionName`         | Renamed         | Now `decisionDefinitionName`                                 |
| `decisionVersion`      | Renamed         | Now `decisionDefinitionVersion`                              |
| `decisionType`         | Renamed         | Now `decisionDefinitionType`                                 |
| `result`               | Removed         | Can no longer be used for filtering                          |
| `evaluatedInputs`      | Removed         | Can no longer be used for filtering                          |
| `evaluatedOutputs`     | Removed         | Can no longer be used for filtering                          |

</TabItem>

<TabItem value='output-adjustments'>

Response structure changes as outlined in [general changes][].

| **Field**              | **Change Type** | **Notes**                                                    |
| ---------------------- | --------------- | ------------------------------------------------------------ |
| `total`                | Moved           | Now `totalItems` in `page` object                            |
| `sortValues`           | Replaced        | Now use `endCursor` in `page` object                         |
| `id`                   | Renamed         | Now `decisionInstanceId`                                     |
| `key`                  | Renamed         | Now `decisionInstanceKey` (changed from `int64` to `string`) |
| `processDefinitionKey` | Changed         | Now `string` type instead of `int64`                         |
| `processInstanceKey`   | Changed         | Now `string` type instead of `int64`                         |
| `decisionId`           | Renamed         | Now `decisionDefinitionId`                                   |
| `decisionName`         | Renamed         | Now `decisionDefinitionName`                                 |
| `decisionVersion`      | Renamed         | Now `decisionDefinitionVersion`                              |
| `decisionType`         | Renamed         | Now `decisionDefinitionType`                                 |
| `evaluatedInputs`      | Removed         | No longer provided by endpoint                               |
| `evaluatedOutputs`     | Removed         | No longer provided by endpoint                               |

</TabItem>
</Tabs>

#### Get decision instance by id

<table className="table-migration">
<thead>
<tr>
<th>V1</th>
<th>V2</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<span class="badge badge--get">GET</span> [`/v1/decision-instances/{id}`](../operate-api/specifications/by-id.api.mdx)

</td>
<td>

<span class="badge badge--get">GET</span> [`/v2/decision-instances/{decisionInstanceId}`](../orchestration-cluster-api-rest/specifications/search-decision-instances.api.mdx)

</td>
</tr>
</tbody>
</table>

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

The adjustments from [search decision instances](#search-decision-instances) apply, with the following exceptions: `evaluatedInputs` and `evaluatedOutputs` are present in the response payload (with `evaluatedOutputs` moved under `matchedRules`).

| **Field**                   | **Change Type** | **Notes**                              |
| --------------------------- | --------------- | -------------------------------------- |
| **evaluatedInputs object**  |                 |                                        |
| `id`                        | Renamed         | Now `inputId`                          |
| `name`                      | Renamed         | Now `inputName`                        |
| `value`                     | Renamed         | Now `inputValue`                       |
| **evaluatedOutputs object** |                 |                                        |
| `id`                        | Renamed         | Now `outputId`                         |
| `name`                      | Renamed         | Now `outputName`                       |
| `value`                     | Renamed         | Now `outputValue`                      |
| `ruleId`                    | Moved           | Now under `matchedRules` array objects |
| `ruleIndex`                 | Moved           | Now under `matchedRules` array objects |

</TabItem>
</Tabs>

#### Search decision requirements

<table className="table-migration">
<thead>
<tr>
<th>V1</th>
<th>V2</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<span class="badge badge--post">POST</span> [`/v1/drd/search`](../operate-api/specifications/search-5.api.mdx)

</td>
<td>

<span class="badge badge--post">POST</span> [`/v2/decision-requirements/search`](../orchestration-cluster-api-rest/specifications/search-decision-requirements.api.mdx)

</td>
</tr>
</tbody>
</table>

<Tabs groupId="search-decision-requirements" defaultValue="input-adjustments" queryString values={
[
{label: 'Input adjustments', value: 'input-adjustments'},
{label: 'Output adjustments', value: 'output-adjustments'},
]
}>

<TabItem value='input-adjustments'>

Request structure changes as outlined in [general changes][].

| **Field**     | **Change Type** | **Notes**                                                        |
| ------------- | --------------- | ---------------------------------------------------------------- |
| `searchAfter` | Renamed         | Now `after` in the `page` object                                 |
| `size`        | Renamed         | Now `limit` in the `page` object                                 |
| `id`          | Renamed         | Now `decisionRequirementsKey` in filter object                   |
| `key`         | Renamed         | Now `decisionRequirementsKey` (changed from `int64` to `string`) |
| `name`        | Renamed         | Now `decisionRequirementsName`                                   |

</TabItem>

<TabItem value='output-adjustments'>

Response structure changes as outlined in [general changes][].

| **Field**    | **Change Type** | **Notes**                                                        |
| ------------ | --------------- | ---------------------------------------------------------------- |
| `total`      | Moved           | Now `totalItems` in `page` object                                |
| `sortValues` | Replaced        | Now use `endCursor` in `page` object                             |
| `id`         | Renamed         | Now `decisionRequirementsKey`                                    |
| `key`        | Renamed         | Now `decisionRequirementsKey` (changed from `int64` to `string`) |
| `name`       | Renamed         | Now `decisionRequirementsName`                                   |

</TabItem>
</Tabs>

#### Get decision requirements by key

<table className="table-migration">
<thead>
<tr>
<th>V1</th>
<th>V2</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<span class="badge badge--get">GET</span> [`/v1/drd/{key}`](../operate-api/specifications/by-key-5.api.mdx)

</td>
<td>

<span class="badge badge--get">GET</span> [`/v2/decision-requirements/{decisionRequirementsKey}`](../orchestration-cluster-api-rest/specifications/get-decision-requirements.api.mdx)

</td>
</tr>
</tbody>
</table>

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

<table className="table-migration">
<thead>
<tr>
<th>V1</th>
<th>V2</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<span class="badge badge--get">GET</span> [`/v1/drd/{key}/xml`](../operate-api/specifications/xml-by-key-1.api.mdx)

</td>
<td>

<span class="badge badge--get">GET</span> [`/v2/decision-requirements/{decisionRequirementsKey}/xml`](../orchestration-cluster-api-rest/specifications/get-decision-requirements-xml.api.mdx)

</td>
</tr>
</tbody>
</table>

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

<table className="table-migration">
<thead>
<tr>
<th>V1</th>
<th>V2</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<span class="badge badge--post">POST</span> [`/v1/variables/search`](../operate-api/specifications/search.api.mdx)

</td>
<td>

<span class="badge badge--post">POST</span> [`/v2/variables/search`](../orchestration-cluster-api-rest/specifications/search-variables.api.mdx)

</td>
</tr>
</tbody>
</table>

<Tabs groupId="search-variables-for-process-instances" defaultValue="input-adjustments" queryString values={
[
{label: 'Input adjustments', value: 'input-adjustments'},
{label: 'Output adjustments', value: 'output-adjustments'},
]
}>

<TabItem value='input-adjustments'>

Request structure changes as outlined in [general changes][].

| **Field**            | **Change Type** | **Notes**                                            |
| -------------------- | --------------- | ---------------------------------------------------- |
| `searchAfter`        | Renamed         | Now `after` in the `page` object                     |
| `size`               | Renamed         | Now `limit` in the `page` object                     |
| `key`                | Renamed         | Now `variableKey` (changed from `int64` to `string`) |
| `processInstanceKey` | Changed         | Now `string` type instead of `int64`                 |
| `scopeKey`           | Changed         | Now `string` type instead of `int64`                 |
| `truncated`          | Renamed         | Now `isTruncated`                                    |

</TabItem>

<TabItem value='output-adjustments'>

Response structure changes as outlined in [general changes][].

| **Field**            | **Change Type** | **Notes**                                            |
| -------------------- | --------------- | ---------------------------------------------------- |
| `total`              | Moved           | Now `totalItems` in `page` object                    |
| `sortValues`         | Replaced        | Now use `endCursor` in `page` object                 |
| `key`                | Renamed         | Now `variableKey` (changed from `int64` to `string`) |
| `processInstanceKey` | Changed         | Now `string` type instead of `int64`                 |
| `scopeKey`           | Changed         | Now `string` type instead of `int64`                 |
| `truncated`          | Renamed         | Now `isTruncated`                                    |

</TabItem>
</Tabs>

#### Get variable by key

<table className="table-migration">
<thead>
<tr>
<th>V1</th>
<th>V2</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<span class="badge badge--get">GET</span> [`/v1/variables/{key}`](../operate-api/specifications/by-key.api.mdx)

</td>
<td>

<span class="badge badge--get">GET</span> [`/v2/variables/{variableKey}`](../orchestration-cluster-api-rest/specifications/get-variable.api.mdx)

</td>
</tr>
</tbody>
</table>

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

[setting variables]: /apis-tools/orchestration-cluster-api-rest/specifications/create-element-instance-variables.api.mdx
[general changes]: #general-endpoint-changes
[multi-tenancy]: /self-managed/concepts/multi-tenancy.md

### Process definition

#### Search process definitions

<table className="table-migration">
<thead>
<tr>
<th>V1</th>
<th>V2</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<span class="badge badge--post">POST</span> [`/v1/process-definitions/search`](../operate-api/specifications/search-2.api.mdx)

</td>
<td>

<span class="badge badge--post">POST</span> [`/v2/process-definitions/search`](../orchestration-cluster-api-rest/specifications/search-process-definitions.api.mdx)

</td>
</tr>
</tbody>
</table>

<Tabs groupId="search-process-definitions" defaultValue="input-adjustments" queryString values={
[
{label: 'Input adjustments', value: 'input-adjustments'},
{label: 'Output adjustments', value: 'output-adjustments'},
]
}>

<TabItem value='input-adjustments'>

Request structure changes as outlined in [general changes][].

| **Field**       | **Change Type** | **Notes**                                                     |
| --------------- | --------------- | ------------------------------------------------------------- |
| `searchAfter`   | Renamed         | Now `after` in the `page` object                              |
| `size`          | Renamed         | Now `limit` in the `page` object                              |
| `key`           | Renamed         | Now `processDefinitionKey` (changed from `int64` to `string`) |
| `bpmnProcessId` | Renamed         | Now `processDefinitionId`                                     |

</TabItem>

<TabItem value='output-adjustments'>

Response structure changes as outlined in [general changes][].

| **Field**       | **Change Type** | **Notes**                                                     |
| --------------- | --------------- | ------------------------------------------------------------- |
| `total`         | Moved           | Now `totalItems` in `page` object                             |
| `sortValues`    | Replaced        | Now use `endCursor` in `page` object                          |
| `key`           | Renamed         | Now `processDefinitionKey` (changed from `int64` to `string`) |
| `bpmnProcessId` | Renamed         | Now `processDefinitionId`                                     |

</TabItem>
</Tabs>

#### Get process definition by key

<table className="table-migration">
<thead>
<tr>
<th>V1</th>
<th>V2</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<span class="badge badge--get">GET</span> [`/v1/process-definitions/{key}`](../operate-api/specifications/by-key-2.api.mdx)

</td>
<td>

<span class="badge badge--get">GET</span> [`/v2/process-definitions/{processDefinitionKey}`](../orchestration-cluster-api-rest/specifications/get-process-definition.api.mdx)

</td>
</tr>
</tbody>
</table>

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

<table className="table-migration">
<thead>
<tr>
<th>V1</th>
<th>V2</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<span class="badge badge--get">GET</span> [`/v1/process-definitions/{key}/xml`](../operate-api/specifications/xml-by-key.api.mdx)

</td>
<td>

<span class="badge badge--get">GET</span> [`/v2/process-definitions/{processDefinitionKey}/xml`](../orchestration-cluster-api-rest/specifications/get-process-definition-xml.api.mdx)

</td>
</tr>
</tbody>
</table>

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

<table className="table-migration">
<thead>
<tr>
<th>V1</th>
<th>V2</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<span class="badge badge--post">POST</span> [`/v1/process-instances/search`](../operate-api/specifications/search-1.api.mdx)

</td>
<td>

<span class="badge badge--post">POST</span> [`/v2/process-instances/search`](../orchestration-cluster-api-rest/specifications/search-process-instances.api.mdx)

</td>
</tr>
</tbody>
</table>

<Tabs groupId="search-process-instances" defaultValue="input-adjustments" queryString values={
[
{label: 'Input adjustments', value: 'input-adjustments'},
{label: 'Output adjustments', value: 'output-adjustments'},
]
}>

<TabItem value='input-adjustments'>

Request structure changes as outlined in [general changes][].

| **Field**                   | **Change Type** | **Notes**                                                   |
| --------------------------- | --------------- | ----------------------------------------------------------- |
| `searchAfter`               | Renamed         | Now `after` in the `page` object                            |
| `size`                      | Renamed         | Now `limit` in the `page` object                            |
| `key`                       | Renamed         | Now `processInstanceKey` (changed from `int64` to `string`) |
| `processVersion`            | Renamed         | Now `processDefinitionVersion`                              |
| `processVersionTag`         | Renamed         | Now `processDefinitionVersionTag`                           |
| `bpmnProcessId`             | Renamed         | Now `processDefinitionId`                                   |
| `parentFlowNodeInstanceKey` | Renamed         | Now `parentElementInstanceKey` (changed to `string`)        |
| `parentKey`                 | Renamed         | Now `parentProcessInstanceKey` (changed to `string`)        |
| `state`                     | Changed         | Use `TERMINATED` instead of `CANCELED`                      |
| `incident`                  | Renamed         | Now `hasIncident`                                           |
| `parentProcessInstanceKey`  | Changed         | Now `string` type instead of `int64`                        |
| `processDefinitionKey`      | Changed         | Now `string` type instead of `int64`                        |

</TabItem>

<TabItem value='output-adjustments'>

Response structure changes as outlined in [general changes][].

| **Field**                   | **Change Type** | **Notes**                                                   |
| --------------------------- | --------------- | ----------------------------------------------------------- |
| `total`                     | Moved           | Now `totalItems` in `page` object                           |
| `sortValues`                | Replaced        | Now use `endCursor` in `page` object                        |
| `key`                       | Renamed         | Now `processInstanceKey` (changed from `int64` to `string`) |
| `processVersion`            | Renamed         | Now `processDefinitionVersion`                              |
| `processVersionTag`         | Renamed         | Now `processDefinitionVersionTag`                           |
| `bpmnProcessId`             | Renamed         | Now `processDefinitionId`                                   |
| `parentFlowNodeInstanceKey` | Renamed         | Now `parentElementInstanceKey` (changed to `string`)        |
| `parentKey`                 | Renamed         | Now `parentProcessInstanceKey` (changed to `string`)        |
| `state`                     | Changed         | Use `TERMINATED` instead of `CANCELED`                      |
| `incident`                  | Renamed         | Now `hasIncident`                                           |
| `parentProcessInstanceKey`  | Changed         | Now `string` type instead of `int64`                        |
| `processDefinitionKey`      | Changed         | Now `string` type instead of `int64`                        |

</TabItem>
</Tabs>

#### Get process instance by key

<table className="table-migration">
<thead>
<tr>
<th>V1</th>
<th>V2</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<span class="badge badge--get">GET</span> [`/v1/process-instances/{key}`](../operate-api/specifications/by-key-1.api.mdx)

</td>
<td>

<span class="badge badge--get">GET</span> [`/v2/process-instances/{processInstanceKey}`](../orchestration-cluster-api-rest/specifications/get-process-instance.api.mdx)

</td>
</tr>
</tbody>
</table>

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

<table className="table-migration">
<thead>
<tr>
<th>V1</th>
<th>V2</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<span class="badge badge--delete">DELETE</span> [`/v1/process-instances/{key}`](../operate-api/specifications/delete.api.mdx)

</td>
<td>

This feature is not yet available in V2. It will be added in a future version.

</td>
</tr>
</tbody>
</table>

#### Get flow node statistic by process instance key

<table className="table-migration">
<thead>
<tr>
<th>V1</th>
<th>V2</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<span class="badge badge--get">GET</span> [`/v1/process-instances/{key}/statistics`](../operate-api/specifications/get-statistics.api.mdx)

</td>
<td>

<span class="badge badge--get">GET</span> [`/v2/process-instances/{processInstanceKey}/statistics/element-instances`](../orchestration-cluster-api-rest/specifications/get-process-instance-statistics.api.mdx)

</td>
</tr>
</tbody>
</table>

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

Response structure changes.

| **Field**      | **Change Type** | **Notes**               |
| -------------- | --------------- | ----------------------- |
| Response items | Moved           | Now under `items` array |
| `activityId`   | Renamed         | Now `elementId`         |

</TabItem>
</Tabs>

#### Get sequence flows of process instance by key

<table className="table-migration">
<thead>
<tr>
<th>V1</th>
<th>V2</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<span class="badge badge--get">GET</span> [`/v1/process-instances/{key}/sequence-flows`](../operate-api/specifications/sequence-flows-by-key.api.mdx)

</td>
<td>

<span class="badge badge--get">GET</span> [`/v2/process-instances/{processInstanceKey}/sequence-flows`](../orchestration-cluster-api-rest/specifications/get-process-instance-sequence-flows.api.mdx)

</td>
</tr>
</tbody>
</table>

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

Response structure changes.

| **Field**      | **Change Type** | **Notes**                                                                        |
| -------------- | --------------- | -------------------------------------------------------------------------------- |
| Response items | Changed         | Now type `object` instead of `string`                                            |
| Response items | Moved           | Now under `items` array                                                          |
| V1 recreation  | Info            | Collect `sequenceFlowId` of type `string` from all objects to recreate V1 result |

</TabItem>
</Tabs>

### Flownode instances

#### Search flownode instances

<table className="table-migration">
<thead>
<tr>
<th>V1</th>
<th>V2</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<span class="badge badge--post">POST</span> [`/v1/flownode-instances/search`](../operate-api/specifications/search-4.api.mdx)

</td>
<td>

<span class="badge badge--post">POST</span> [`/v2/element-instances/search`](../orchestration-cluster-api-rest/specifications/search-element-instances.api.mdx)

</td>
</tr>
</tbody>
</table>

<Tabs groupId="search-flownode-instances" defaultValue="input-adjustments" queryString values={
[
{label: 'Input adjustments', value: 'input-adjustments'},
{label: 'Output adjustments', value: 'output-adjustments'},
]
}>

<TabItem value='input-adjustments'>

Request structure changes as outlined in [general changes][].

| **Field**              | **Change Type** | **Notes**                                                   |
| ---------------------- | --------------- | ----------------------------------------------------------- |
| `searchAfter`          | Renamed         | Now `after` in the `page` object                            |
| `size`                 | Renamed         | Now `limit` in the `page` object                            |
| `key`                  | Renamed         | Now `elementInstanceKey` (changed from `int64` to `string`) |
| `flowNodeId`           | Renamed         | Now `elementId`                                             |
| `flowNodeName`         | Renamed         | Now `elementName`                                           |
| `incident`             | Renamed         | Now `hasIncident`                                           |
| `processInstanceKey`   | Changed         | Now `string` type instead of `int64`                        |
| `processDefinitionKey` | Changed         | Now `string` type instead of `int64`                        |
| `incidentKey`          | Changed         | Now `string` type instead of `int64`                        |
| `startDate`            | Removed         | Can no longer be used for filtering                         |
| `endDate`              | Removed         | Can no longer be used for filtering                         |

</TabItem>

<TabItem value='output-adjustments'>

Response structure changes as outlined in [general changes][].

| **Field**              | **Change Type** | **Notes**                                                   |
| ---------------------- | --------------- | ----------------------------------------------------------- |
| `total`                | Moved           | Now `totalItems` in `page` object                           |
| `sortValues`           | Replaced        | Now use `endCursor` in `page` object                        |
| `key`                  | Renamed         | Now `elementInstanceKey` (changed from `int64` to `string`) |
| `flowNodeId`           | Renamed         | Now `elementId`                                             |
| `flowNodeName`         | Renamed         | Now `elementName`                                           |
| `incident`             | Renamed         | Now `hasIncident`                                           |
| `processInstanceKey`   | Changed         | Now `string` type instead of `int64`                        |
| `processDefinitionKey` | Changed         | Now `string` type instead of `int64`                        |
| `incidentKey`          | Changed         | Now `string` type instead of `int64`                        |

</TabItem>
</Tabs>

#### Get flownode instance by key

<table className="table-migration">
<thead>
<tr>
<th>V1</th>
<th>V2</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<span class="badge badge--get">GET</span> [`/v1/flownode-instances/{key}`](../operate-api/specifications/by-key-4.api.mdx)

</td>
<td>

<span class="badge badge--get">GET</span> [`/v2/element-instances/{elementInstanceKey}`](../orchestration-cluster-api-rest/specifications/get-element-instance.api.mdx)

</td>
</tr>
</tbody>
</table>

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

<table className="table-migration">
<thead>
<tr>
<th>V1</th>
<th>V2</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<span class="badge badge--post">POST</span> [`/v1/incidents/search`](../operate-api/specifications/search-3.api.mdx)

</td>
<td>

<span class="badge badge--post">POST</span> [`/v2/incidents/search`](../orchestration-cluster-api-rest/specifications/search-incidents.api.mdx)

</td>
</tr>
</tbody>
</table>

<Tabs groupId="search-incidents" defaultValue="input-adjustments" queryString values={
[
{label: 'Input adjustments', value: 'input-adjustments'},
{label: 'Output adjustments', value: 'output-adjustments'},
]
}>

<TabItem value='input-adjustments'>

Request structure changes as outlined in [general changes][].

| **Field**              | **Change Type** | **Notes**                                            |
| ---------------------- | --------------- | ---------------------------------------------------- |
| `searchAfter`          | Renamed         | Now `after` in the `page` object                     |
| `size`                 | Renamed         | Now `limit` in the `page` object                     |
| `key`                  | Renamed         | Now `incidentKey` (changed from `int64` to `string`) |
| `type`                 | Renamed         | Now `errorType`                                      |
| `message`              | Renamed         | Now `errorMessage`                                   |
| `processInstanceKey`   | Changed         | Now `string` type instead of `int64`                 |
| `processDefinitionKey` | Changed         | Now `string` type instead of `int64`                 |
| `jobKey`               | Changed         | Now `string` type instead of `int64`                 |

</TabItem>

<TabItem value='output-adjustments'>

Response structure changes as outlined in [general changes][].

| **Field**              | **Change Type** | **Notes**                                            |
| ---------------------- | --------------- | ---------------------------------------------------- |
| `total`                | Moved           | Now `totalItems` in `page` object                    |
| `sortValues`           | Replaced        | Now use `endCursor` in `page` object                 |
| `key`                  | Renamed         | Now `incidentKey` (changed from `int64` to `string`) |
| `type`                 | Renamed         | Now `errorType`                                      |
| `message`              | Renamed         | Now `errorMessage`                                   |
| `processInstanceKey`   | Changed         | Now `string` type instead of `int64`                 |
| `processDefinitionKey` | Changed         | Now `string` type instead of `int64`                 |
| `jobKey`               | Changed         | Now `string` type instead of `int64`                 |

</TabItem>
</Tabs>

#### Get incident by key

<table className="table-migration">
<thead>
<tr>
<th>V1</th>
<th>V2</th>
</tr>
</thead>
<tbody>
<tr>
<td>

<span class="badge badge--get">GET</span> [`/v1/incidents/{key}`](../operate-api/specifications/by-key-3.api.mdx)

</td>
<td>

<span class="badge badge--get">GET</span> [`/v2/incidents/{incidentKey}`](../orchestration-cluster-api-rest/specifications/get-incident.api.mdx)

</td>
</tr>
</tbody>
</table>

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
