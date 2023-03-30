---
id: tasklist-api-rest-task-controller
title: Task API
description: "This article provides a description of Task API controller."
---

## Overview

Provides API to query and manage tasks

## Endpoints

### Search tasks

Returns the list of tasks that satisfy search request params.

#### URL:

`/v1/tasks/search`

#### Method:

`POST`

#### Request body:

[`TaskSearchRequest`](../schemas/requests/task-search-request.mdx) - `[Optional]`

#### HTTP request example:

All request body parameters are optional.

> NOTE: Only one of [searchAfter, searchAfterOrEqual, searchBefore, searchBeforeOrEqual] search options must be present in request.

If empty body provided then all tasks will be returned:

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

#### Response:

The response will be a JSON array of objects representing the matching tasks [`TaskSearchResponse`](../schemas/responses/task-search-response.mdx).

### Get task

This endpoint retrieves the details of a specific task identified by `{taskId}`.

#### URL:

`/v1/tasks/{taskId}`

#### Method:

`GET`

#### Request parameters:

| param name | type | required | description    |
| ---------- | ---- | :------: | -------------- |
| taskId     | path |  `true`  | ID of the task |

#### HTTP request example:

```shell
curl -X 'GET' \
  'http://{host}/v1/tasks/{taskId}' \
  -H 'accept: application/json'
  -H 'Cookie: TASKLIST-SESSION={tasklistSessionId}'
```

#### Response:

The response will be a JSON object with the following structure [`TaskResponse`](../schemas/responses/task-response.mdx).

### Claim task

Endpoint to claim a task with `taskId` to `assignee` or the active user. Returns the task.

#### URL:

`/v1/tasks/{taskId}/claim`

#### Method:

`PATCH`

#### Request parameters:

| param name | type | required | description    |
| ---------- | ---- | :------: | -------------- |
| taskId     | path |  `true`  | ID of the task |

#### Request body:

When using REST API with JWT authentication token following request body parameters may be used.
[`TaskSearchRequest`](../schemas/requests/task-search-request.mdx) - `[Optional]`

#### HTTP request example:

```shell
curl -X 'PATCH' \
  'http://{host}/v1/tasks/{taskId}/claim' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'Cookie: TASKLIST-SESSION={tasklistSessionId}'
```

If JWT authentication used:

```shell
curl -X 'PATCH' \
  'http://{host}/v1/tasks/{taskId}/claim' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'Cookie: TASKLIST-SESSION={tasklistSessionId}' \
  -d '{
  "assignee": "someAssignee",
  "allowOverrideAssignment": true
}'
```

#### Response:

The response will be a JSON object with the following structure [`TaskResponse`](../schemas/responses/task-response.mdx).

### Unclaim task

Unclaim a task with provided id. Returns the task.

#### URL:

`/v1/tasks/{taskId}/unclaim`

#### Method:

`PATCH`

#### Request parameters:

| param name | type | required | description    |
| ---------- | ---- | :------: | -------------- |
| taskId     | path |  `true`  | ID of the task |

#### Request body:

NONE

#### HTTP request example:

```shell
curl -X 'PATCH' \
  'http://{host}/v1/tasks/{taskId}/unclaim' \
  -H 'accept: application/json' \
  -H 'Cookie: TASKLIST-SESSION={tasklistSessionId}'
```

#### Response:

The response will be a JSON object with the following structure [`TaskResponse`](../schemas/responses/task-response.mdx).

### Complete task

Complete a task with `taskId` and optional variables. Returns the task.

#### URL:

`/v1/tasks/{taskId}/complete`

#### Method:

`PATCH`

#### Request parameters:

| param name | type | required | description    |
| ---------- | ---- | :------: | -------------- |
| taskId     | path |  `true`  | ID of the task |

#### Request body:

[`TaskCompleteRequest`](../schemas/requests/task-complete-request.mdx) - `[Optional]`

#### HTTP request example:

```shell
curl -X 'PATCH' \
  'http://{host}/v1/tasks/{taskId}/complete' \
  -H 'accept: application/json' \
  -H 'Cookie: TASKLIST-SESSION={tasklistSessionId}'
```

#### Response:

The response will be a JSON object with the following structure [`TaskResponse`](../schemas/responses/task-response.mdx).

### Search task variables

Returns a list of task variables for the specified `taskId` and `variableNames`.

#### URL:

`/v1/tasks/{taskId}/variables/search`

#### Method:

`POST`

#### Request parameters:

| param name | type | required | description    |
| ---------- | ---- | :------: | -------------- |
| taskId     | path |  `true`  | ID of the task |

#### Request body:

[`VariablesSearchRequest`](../schemas/requests/variables-search-request.mdx) - `[Optional]`

#### HTTP request example:

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

#### Response:

The response will be a JSON array of objects with the following structure [`VariableResponse`](../schemas/responses/variable-response.mdx).
