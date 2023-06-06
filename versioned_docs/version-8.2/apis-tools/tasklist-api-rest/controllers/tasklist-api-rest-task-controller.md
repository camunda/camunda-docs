---
id: tasklist-api-rest-task-controller
title: Task API
description: "Learn about the Task API controller, including an HTTP request example, responses, request parameters, and an HTTP request example."
---

The Task API controller provides an API to query and manage tasks.

## Endpoints

### Search tasks

Returns the list of tasks that satisfy search request parameters.

#### URL

`/v1/tasks/search`

#### Method

`POST`

#### Request body

[`TaskSearchRequest`](../schemas/requests/task-search-request.mdx) - `[Optional]`

#### HTTP request example

All request body parameters are optional.

:::note
Only one of [searchAfter, searchAfterOrEqual, searchBefore, searchBeforeOrEqual] search options must be present at once in the request.
:::

If an empty body is provided, all tasks are returned:

```bash
curl -X 'POST' \
  'http://{host}/v1/tasks/search' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'Cookie: TASKLIST-SESSION={tasklistSessionId}' \
  -d ''
```

Only assigned and with `CREATED` state tasks will be returned:

```bash
curl -X 'POST' \
  'http://{host}/v1/tasks/search' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'Cookie: TASKLIST-SESSION={tasklistSessionId}' \
  -d '{
  "state": "CREATED",
  "assigned": true
}'
```

#### Responses

| HTTP status | Description                                                                                                                                                      | Response schema                                                                                            |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| 200         | On success                                                                                                                                                       | JSON array of objects with [`TaskSearchResponse`](../schemas/responses/task-search-response.mdx) structure |
| 400         | An error is returned when more than one search parameters among [searchAfter, searchAfterOrEqual, searchBefore, searchBeforeOrEqual] are present in the request. | JSON object with [`Error`](../schemas/responses/error-response.mdx) structure                              |

### Get task

This endpoint retrieves the details of a specific task identified by `{taskId}`.

#### URL

`/v1/tasks/{taskId}`

#### Method

`GET`

#### Request parameters

| Parameter name | Type | Required | Description    |
| -------------- | ---- | :------: | -------------- |
| taskId         | path |  `true`  | ID of the task |

#### HTTP request example

```shell
curl -X 'GET' \
  'http://{host}/v1/tasks/{taskId}' \
  -H 'accept: application/json'
  -H 'Cookie: TASKLIST-SESSION={tasklistSessionId}'
```

#### Responses

| HTTP status | Description                                                        | Response schema                                                                     |
| ----------- | ------------------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| 200         | On success                                                         | JSON object with [`TaskResponse`](../schemas/responses/task-response.mdx) structure |
| 404         | An error is returned when the task with the `taskId` is not found. | JSON object with [`Error`](../schemas/responses/error-response.mdx) structure       |

### Assign task

Endpoint to assign a task with `taskId` to `assignee` or the active user. Returns the task.

#### URL

`/v1/tasks/{taskId}/assign`

#### Method

`PATCH`

#### Request parameters

| Parameter name | Type | Required | Description    |
| -------------- | ---- | :------: | -------------- |
| taskId         | path |  `true`  | ID of the task |

#### Request body

[`TaskAssignRequest`](../schemas/requests/task-assign-request.mdx) - `[Optional]`

:::note
When using the REST API with a JWT authentication token, the following request body parameters may be used.
:::

#### HTTP request example

```shell
curl -X 'PATCH' \
  'http://{host}/v1/tasks/{taskId}/assign' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'Cookie: TASKLIST-SESSION={tasklistSessionId}'
```

If JWT authentication is used:

```shell
curl -X 'PATCH' \
  'http://{host}/v1/tasks/{taskId}/assign' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'Cookie: TASKLIST-SESSION={tasklistSessionId}' \
  -d '{
  "assignee": "someAssignee",
  "allowOverrideAssignment": true
}'
```

#### Responses

| HTTP status | Description                                                                                         | Response schema                                                                     |
| ----------- | --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| 200         | On success                                                                                          | JSON object with [`TaskResponse`](../schemas/responses/task-response.mdx) structure |
| 400         | An error is returned when the task is not active (not in the `CREATED` state).                      | JSON object with [`Error`](../schemas/responses/error-response.mdx) structure       |
| 400         | An error is returned when task was already assigned.                                                | JSON object with [`Error`](../schemas/responses/error-response.mdx) structure       |
| 403         | An error is returned when the user doesn't have the permission to assign another user to this task. | JSON object with [`Error`](../schemas/responses/error-response.mdx) structure       |
| 404         | An error is returned when the task with the `taskId` is not found.                                  | JSON object with [`Error`](../schemas/responses/error-response.mdx) structure       |

### Unassign task

Unassign a task with the provided id. This returns the task.

#### URL

`/v1/tasks/{taskId}/unassign`

#### Method

`PATCH`

#### Request parameters

| Parameter name | Type | Required | Description    |
| -------------- | ---- | :------: | -------------- |
| taskId         | path |  `true`  | ID of the task |

#### HTTP request example

```shell
curl -X 'PATCH' \
  'http://{host}/v1/tasks/{taskId}/unassign' \
  -H 'accept: application/json' \
  -H 'Cookie: TASKLIST-SESSION={tasklistSessionId}'
```

#### Responses

| HTTP status | Description                                                                    | Response schema                                                                     |
| ----------- | ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| 200         | On success                                                                     | JSON object with [`TaskResponse`](../schemas/responses/task-response.mdx) structure |
| 400         | An error is returned when the task is not active (not in the `CREATED` state). | JSON object with [`Error`](../schemas/responses/error-response.mdx) structure       |
| 400         | An error is returned if the task was not assigned before.                      | JSON object with [`Error`](../schemas/responses/error-response.mdx) structure       |
| 404         | An error is returned when the task with the `taskId` is not found.             | JSON object with [`Error`](../schemas/responses/error-response.mdx) structure       |

### Complete task

Complete a task with `taskId` and optional variables. Returns the task.

#### URL

`/v1/tasks/{taskId}/complete`

#### Method

`PATCH`

#### Request parameters

| Parameter name | Type | Required | Description    |
| -------------- | ---- | :------: | -------------- |
| taskId         | path |  `true`  | ID of the task |

#### Request body

[`TaskCompleteRequest`](../schemas/requests/task-complete-request.mdx) - `[Optional]`

#### HTTP request example

With empty body:

```shell
curl -X 'PATCH' \
  'http://{host}/v1/tasks/{taskId}/complete' \
  -H 'accept: application/json' \
  -H 'Cookie: TASKLIST-SESSION={tasklistSessionId}'
```

With [`TaskCompleteRequest`](../schemas/requests/task-complete-request.mdx):

```shell
curl -X 'PATCH' \
  'http://{host}/v1/tasks/{taskId}/complete' \
  -H 'accept: application/json' \
  -H 'Cookie: TASKLIST-SESSION={tasklistSessionId}' \
  -d '{
  "variables": [
    {
      "name": "varA",
      "value": "25"
    }
  ]
}'
```

#### Responses

| HTTP status | Description                                                                    | Response schema                                                                     |
| ----------- | ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| 200         | On success                                                                     | JSON object with [`TaskResponse`](../schemas/responses/task-response.mdx) structure |
| 400         | An error is returned when the task is not active (not in the `CREATED` state). | JSON object with [`Error`](../schemas/responses/error-response.mdx) structure       |
| 400         | An error is returned if the task was not assigned before.                      | JSON object with [`Error`](../schemas/responses/error-response.mdx) structure       |
| 400         | An error is returned if the task is not assigned to the current user.          | JSON object with [`Error`](../schemas/responses/error-response.mdx) structure       |
| 404         | An error is returned when the task with the `taskId` is not found.             | JSON object with [`Error`](../schemas/responses/error-response.mdx) structure       |

### Search task variables

Returns a list of task variables for the specified `taskId` and `variableNames`.

#### URL

`/v1/tasks/{taskId}/variables/search`

#### Method

`POST`

#### Request parameters

| Parameter name | Type | Required | Description    |
| -------------- | ---- | :------: | -------------- |
| taskId         | path |  `true`  | ID of the task |

#### Request body

[`VariablesSearchRequest`](../schemas/requests/variables-search-request.mdx) - `[Optional]`

#### HTTP request example

If the request body is not provided or if the `variableNames` parameter in the request is `null` or empty, all variables associated with the task will be returned.

```shell
curl -X 'POST' \
  'http://{host}/v1/tasks/{taskId}/variables/search' \
  -H 'accept: application/json' \
  -H 'Cookie: TASKLIST-SESSION={tasklistSessionId}' \
  -d ''
```

```shell
curl -X 'POST' \
  'http://{host}/v1/tasks/{taskId}/variables/search' \
  -H 'accept: application/json' \
  -H 'Cookie: TASKLIST-SESSION={tasklistSessionId}' \
  -d '{
    "variableNames": null
  }'
```

```shell
curl -X 'POST' \
  'http://{host}/v1/tasks/{taskId}/variables/search' \
  -H 'accept: application/json' \
  -H 'Cookie: TASKLIST-SESSION={tasklistSessionId}' \
  -d '{
    "variableNames": []
  }'
```

Only the variables with name "varA" and "varB" will be returned if they are assigned to the task.

```shell
curl -X 'POST' \
  'http://{host}/v1/tasks/{taskId}/variables/search' \
  -H 'accept: application/json' \
  -H 'Cookie: TASKLIST-SESSION={tasklistSessionId}' \
  -d '{
    "variableNames": [
      "varA", "varB"
    ]
  }'
```

#### Responses

:::caution
Beginning with the forthcoming release, changes will be implemented to the response for a 200 status.
If `isValueTruncated` is set to `true` for any variable, the corresponding `value` field will now be set to `null`.
:::

| HTTP status | Description                                                        | Response schema                                                                                       |
| ----------- | ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| 200         | On success                                                         | JSON array of objects with [`VariableResponse`](../schemas/responses/variable-response.mdx) structure |
| 404         | An error is returned when the task with the `taskId` is not found. | JSON object with [`Error`](../schemas/responses/error-response.mdx) structure                         |
