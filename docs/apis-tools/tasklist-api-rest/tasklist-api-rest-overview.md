---
id: tasklist-api-rest-overview
title: "Overview"
sidebar_position: 1
description: "Tasklist API is a REST API and provides searching, getting, and changing Tasklist data."
---

## Introduction

Tasklist API is a REST API and provides searching, getting, and changing Tasklist data.
Requests and responses are in JSON notation. Some objects have additional endpoints.

## API documentation as Swagger

A detailed API description is also available as Swagger UI at `https://${base-url}/swagger-ui/index.html`.

For SaaS: `https://${REGION}.tasklist.camunda.io:443/${CLUSTER_ID}/swagger-ui/index.html`, and for Self-Managed installations: [`http://localhost:8080/swagger-ui/index.html`](http://localhost:8080/swagger-ui/index.html).

:::note
Find your region and cluster id under connection information in your client credentials.
:::

## Endpoints

| Endpoint (HTTP verb + URL path)                                                                                                                                 |                                                                       Description |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------: |
| **Tasks**                                                                                                                                                       |                                                                                   |
| [`GET /v1/tasks/{taskId}`](/apis-tools/tasklist-api-rest/controllers/tasklist-api-rest-task-controller.md#get-task)                                             |                                                        Return a task by `taskId`. |
| [`POST /v1/tasks/search`](/apis-tools/tasklist-api-rest/controllers/tasklist-api-rest-task-controller.md#search-tasks)                                          |                     Returns the list of tasks that satisfy search request params. |
| [`POST /v1/tasks/{taskId}/variables`](/apis-tools/tasklist-api-rest/controllers/tasklist-api-rest-task-controller.md#save-draft-task-variables)                 |                                        Saves draft variables for a specific task. |
| [`POST /v1/tasks/{taskId}/variables/search`](/apis-tools/tasklist-api-rest/controllers/tasklist-api-rest-task-controller.md#search-task-variables)              |  Returns a list of task variables for the specified `taskId` and `variableNames`. |
| [`PATCH /v1/tasks/{taskId}/assign`](/apis-tools/tasklist-api-rest/controllers/tasklist-api-rest-task-controller.md#assign-task)                                 |                     Assign a task with `taskId` to `assignee` or the active user. |
| [`PATCH /v1/tasks/{taskId}/unassign`](/apis-tools/tasklist-api-rest/controllers/tasklist-api-rest-task-controller.md#unassign-task)                             |                                           Unassign a task with provided `taskId`. |
| [`PATCH /v1/tasks/{taskId}/complete`](/apis-tools/tasklist-api-rest/controllers/tasklist-api-rest-task-controller.md#complete-task)                             |                             Complete a task with `taskId` and optional variables. |
| **Forms**                                                                                                                                                       |                                                                                   |
| [`GET /v1/forms/{formId}?processDefinitionKey={processDefinitionKey}`](/apis-tools/tasklist-api-rest/controllers/tasklist-api-rest-form-controller.md#get-form) | Get the form details by `formId` and `processDefinitionKey` required query param. |
| **Variables**                                                                                                                                                   |                                                                                   |
| [`GET /v1/variables/{variableId}`](/apis-tools/tasklist-api-rest/controllers/tasklist-api-rest-variables-controller.md#get-variable)                            |                                         Get the variable details by `variableId`. |
