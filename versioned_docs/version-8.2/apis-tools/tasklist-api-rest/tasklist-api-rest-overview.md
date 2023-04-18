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

## Endpoints

| Endpoint (HTTP verb + URL path)            |                                                                   Description |
| :----------------------------------------- | ----------------------------------------------------------------------------: |
| **Tasks**                                  |                                                                               |
| `GET /v1/tasks/{taskId}`                   |                                                      Return a task by taskId. |
| `POST /v1/tasks/search`                    |                 Returns the list of tasks that satisfy search request params. |
| `POST /v1/tasks/{taskId}/variables/search` |   Returns a list of task variables for the specified taskId and variableName. |
| `PATCH /v1/tasks/{taskId}/assign`          |                 Assign a task with `taskId` to `assignee` or the active user. |
| `PATCH /v1/tasks/{taskId}/unassign`        |                                       Unassign a task with provided `taskId`. |
| `PATCH /v1/tasks/{taskId}/complete`        |                           Complete a task with taskId and optional variables. |
| **Forms**                                  |                                                                               |
| `POST /v1/forms/{formId}`                  | Get the form details by formId and processDefinitionKey required query param. |
| **Variables**                              |                                                                               |
| `POST /v1/variables/{variableId}`          |                                      Get the variable details by variable id. |
