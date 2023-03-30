---
id: tasklist-api-graphql-to-rest-migration
title: GraphQL to REST API migration
slug: /apis-tools/tasklist-api/tasklist-api-graphql-to-rest-migration
sidebar_position: 3
description: "This article provides a guide for developers to migrate from GraphQL to REST API seamlessly."
---

# Overview

As the popularity of GraphQL continues to rise as an alternative to REST APIs,
many developers have implemented it in their projects. However, this can often lead to challenges,
such as using multiple API protocols and maintaining compatibility with existing systems.
The Camunda 8 API stack is a prime example, where the Tasklist API is implemented using GraphQL
while the rest of the APIs are built with REST. This creates additional efforts for developers and
does not fully leverage the advantages of GraphQL. As a result, migrating from GraphQL to REST
can be a viable solution. In this article, we will provide a comprehensive guide to migrating from GraphQL to REST.

# GraphQL operation to REST API endpoint mapping

## Queries

### Form

Instead of [form](/docs/apis-tools/tasklist-api/queries/form.mdx) GraphQL query

```graphql
# Get task form by formId and processDefinitionId
form(id: String!, processDefinitionId: String!): Form
```

the following [Get form](/docs/apis-tools/tasklist-api-rest/controllers/tasklist-api-rest-form-controller.md#get-form) endpoint should be used:

```bash
curl -X 'GET' \
  'http://{host}/v1/forms/{formId}?processDefinitionKey={processDefinitionKey}' \
  -H 'accept: application/json' \
  -H 'Cookie: TASKLIST-SESSION={tasklistSessionId}'
```

### Variable

Instead of [variable](/docs/apis-tools/tasklist-api/queries/variable.mdx) GraphQL query

```graphql
# Get the variables by variable id
variable(id: String!): Variable!
```

the following [Get variable](/docs/apis-tools/tasklist-api-rest/controllers/tasklist-api-rest-variables-controller.md#get-variable) endpoint should be used:

```bash
curl -X 'GET' \
  'http://{host}/v1/variables/{variableId}' \
  -H 'accept: application/json' \
  -H 'Cookie: TASKLIST-SESSION={tasklistSessionId}'
```

### Variables

Instead of [variables](/docs/apis-tools/tasklist-api/queries/variables.mdx) GraphQL query

```graphql
# Get a collection of Variables by name
variables(taskId: String!, variableNames: [String!]!): [Variable!]!
```

the following [Search task variables](/docs/apis-tools/tasklist-api-rest/controllers/tasklist-api-rest-task-controller.md#search-task-variables) endpoint should be used:

```bash
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

### Task

Instead of [task](/docs/apis-tools/tasklist-api/queries/task.mdx) GraphQL query

```graphql
# Get one task by id. Returns task or error when task does not exist.
task(id: String!): Task!
```

the following [Get task](/docs/apis-tools/tasklist-api-rest/controllers/tasklist-api-rest-task-controller.md#get-task) endpoint should be used:

```bash
curl -X 'GET' \
  'http://{host}/v1/tasks/{taskId}' \
  -H 'accept: application/json'
  -H 'Cookie: TASKLIST-SESSION={tasklistSessionId}'
```

### Tasks

Instead of [tasks](/docs/apis-tools/tasklist-api/queries/tasks.mdx) GraphQL query

```graphql
# Get list of tasks based on `TaskQuery`.
tasks(query: TaskQuery!): [Task!]!
```

the following [Search tasks](/docs/apis-tools/tasklist-api-rest/controllers/tasklist-api-rest-task-controller.md#search-tasks) endpoint should be used:

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

## Mutations

### Claim task

Instead of [claimTasks](/docs/apis-tools/tasklist-api/mutations/claim-task.mdx) GraphQL mutation

```graphql
# Claim a task with `taskId` to `assignee`. Returns the task.
claimTask(taskId: String!, assignee: String, allowOverrideAssignment: Boolean): Task!
```

the following [Claim task](/docs/apis-tools/tasklist-api-rest/controllers/tasklist-api-rest-task-controller.md#claim-task) endpoint should be used:

```bash
curl -X 'PATCH' \
  'http://{host}/v1/tasks/{taskId}/claim' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'Cookie: TASKLIST-SESSION={tasklistSessionId}'
```

### Unclaim task

Instead of [unclaimTasks](/docs/apis-tools/tasklist-api/mutations/unclaim-task.mdx) GraphQL mutation

```graphql
# Unclaim a task with taskId. Returns the task.
unclaimTask(taskId: String!): Task!
```

the following [Unlaim task](/docs/apis-tools/tasklist-api-rest/controllers/tasklist-api-rest-task-controller.md#unclaim-task) endpoint should be used:

```bash
curl -X 'PATCH' \
  'http://{host}/v1/tasks/{taskId}/unclaim' \
  -H 'accept: application/json' \
  -H 'Cookie: TASKLIST-SESSION={tasklistSessionId}'
```

### Complete task

Instead of [completeTasks](/docs/apis-tools/tasklist-api/mutations/complete-task.mdx) GraphQL mutation

```graphql
# Complete a task with taskId and optional variables. Returns the task.
completeTask(taskId: String!, variables: [VariableInput!]!): Task!
```

the following [Complete task](/docs/apis-tools/tasklist-api-rest/controllers/tasklist-api-rest-task-controller.md#complete-task) endpoint should be used:

```bash
curl -X 'PATCH' \
  'http://{host}/v1/tasks/{taskId}/complete' \
  -H 'accept: application/json' \
  -H 'Cookie: TASKLIST-SESSION={tasklistSessionId}'
```
