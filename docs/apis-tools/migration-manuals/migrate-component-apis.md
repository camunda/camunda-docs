---
id: migrate-component-apis
title: Migrate Component V1 APIs
sidebar_label: "Component V1 APIs"
description: "This document outlines the necessary changes to continue using the component REST APIs after upgrading to Camunda 8.8—if migration to the new Orchestration..."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

This document outlines the necessary changes to continue using the component REST APIs after upgrading to Camunda 8.8—if migration to the new [Orchestration Cluster REST API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md) is not yet possible.

In this context, **components** refer to the standalone Camunda applications **Operate** and **Tasklist**, each exposing its own V1 REST API.

:::note
As of version 8.8, the V1 component APIs are deprecated. We strongly recommend [migrating to the Orchestration Cluster REST API](/apis-tools/migration-manuals/migrate-to-camunda-api.md) where possible.
:::

## Migrate V1 APIs

With Camunda 8.8, permissions for resource access have been reworked. For the V1 APIs, this means that access to endpoints now depends on specific read and write permissions for related resources.  
To continue using the V1 APIs, users and clients must be assigned the appropriate permissions under [the new authorization model](/components/concepts/access-control/authorizations.md).

Users now require wildcard (`*`) permissions for the resource type and permission type being accessed.

For guidance on assigning permissions in Identity, see the [Identity authorization guide](../../components/identity/authorization.md).

### Mapping Operate permissions to new authorizations

To maintain the same access level for the Operate V1 API, apply the following authorizations:

**`operate-api:read`** is replaced by:

- `PROCESS_DEFINITION:*:READ_PROCESS_DEFINITION,READ_PROCESSINSTANCE`
- `DECISION_DEFINITION:*:READ_DECISION_DEFINITION`
- `DECISION_REQUIREMENTS_DEFINITION:*:READ`

**`operate-api:write`** is replaced by:

- `PROCESS_DEFINITION:*:DELETE_PROCESS_INSTANCES`

### Operate V1 API permission matrix

To enable more fine-grained access control, the matrix below details the required permissions for each Operate V1 API endpoint.
Ensure the user has general access (resource ID `*`) for each listed resource and permission type.

| Endpoint                                                                                                       | Resource Type                    | Permission type          |
| -------------------------------------------------------------------------------------------------------------- | -------------------------------- | ------------------------ |
| [`POST /v1/process-definitions/search`](../operate-api/specifications/search-2.api.mdx)                        | PROCESS_DEFINITION               | READ_PROCESS_DEFINITION  |
| [`GET /v1/process-definitions/:key`](../operate-api/specifications/by-key-2.api.mdx)                           | PROCESS_DEFINITION               | READ_PROCESS_DEFINITION  |
| [`GET v1/process-definitions/:key/xml`](../operate-api/specifications/xml-by-key.api.mdx)                      | PROCESS_DEFINITION               | READ_PROCESS_DEFINITION  |
| [`POST /v1/decision-definitions/search`](../operate-api/specifications/search-7.api.mdx)                       | DECISION_DEFINITION              | READ_DECISION_DEFINITION |
| [`GET /v1/decision-definitions/:key`](../operate-api/specifications/by-key-6.api.mdx)                          | DECISION_DEFINITION              | READ_DECISION_DEFINITION |
| [`POST /v1/decision-instances/search`](../operate-api/specifications/search-6.api.mdx)                         | DECISION_DEFINITION              | READ_DECISION_INSTANCE   |
| [`GET /v1/decision-instances/:id`](../operate-api/specifications/by-id.api.mdx)                                | DECISION_DEFINITION              | READ_DECISION_INSTANCE   |
| [`POST /v1/flownode-instances/search`](../operate-api/specifications/search-4.api.mdx)                         | PROCESS_DEFINITION               | READ_PROCESS_INSTANCE    |
| [`GET /v1/flownode-instances/:key`](../operate-api/specifications/by-key-4.api.mdx)                            | PROCESS_DEFINITION               | READ_PROCESS_INSTANCE    |
| [`POST /v1/variables/search`](../operate-api/specifications/search.api.mdx)                                    | PROCESS_DEFINITION               | READ_PROCESS_INSTANCE    |
| [`GET /v1/variables/:key`](../operate-api/specifications/by-key.api.mdx)                                       | PROCESS_DEFINITION               | READ_PROCESS_INSTANCE    |
| [`POST /v1/process-instances/search`](../operate-api/specifications/search-1.api.mdx)                          | PROCESS_DEFINITION               | READ_PROCESS_INSTANCE    |
| [`GET /v1/process-instances/:key`](../operate-api/specifications/by-key-1.api.mdx)                             | PROCESS_DEFINITION               | READ_PROCESS_INSTANCE    |
| [`GET /v1/process-instances/:key/statistics`](../operate-api/specifications/get-statistics.api.mdx)            | PROCESS_DEFINITION               | READ_PROCESS_INSTANCE    |
| [`GET /v1/process-instances/:key/sequence-flows`](../operate-api/specifications/sequence-flows-by-key.api.mdx) | PROCESS_DEFINITION               | READ_PROCESS_INSTANCE    |
| [`DEL /v1/process-instances/:key`](../operate-api/specifications/delete.api.mdx)                               | PROCESS_DEFINITION               | DELETE_PROCESS_INSTANCE  |
| [`POST /v1/drd/search`](../operate-api/specifications/search-5.api.mdx)                                        | DECISION_REQUIREMENTS_DEFINITION | READ                     |
| [`GET /v1/drd/:key`](../operate-api/specifications/by-key-5.api.mdx)                                           | DECISION_REQUIREMENTS_DEFINITION | READ                     |
| [`GET /v1/drd/:key/xml`](../operate-api/specifications/xml-by-key-1.api.mdx)                                   | DECISION_REQUIREMENTS_DEFINITION | READ                     |
| [`POST /v1/incidents/search`](../operate-api/specifications/search-3.api.mdx)                                  | PROCESS_DEFINITION               | READ_PROCESS_INSTANCE    |
| [`GET /v1/incidents/:key`](../operate-api/specifications/by-key-3.api.mdx)                                     | PROCESS_DEFINITION               | READ_PROCESS_INSTANCE    |

### Mapping Tasklist permissions to new authorizations

To maintain the same access level for the Tasklist V1 API, apply the following authorizations:

**`tasklist-api:read`** is replaced by:

- `PROCESS_DEFINITION:*:READ_PROCESS_DEFINITION,READ_USER_TASK`

**`taslist-api:write`** is replaced by:

- `PROCESS_DEFINITION:*:UPDATE_USER_TASK`

### Tasklist V1 API permission matrix

To enable more fine-grained access control, the matrix below details the required permissions for each Tasklist V1 API endpoint.  
Ensure the user has general access (resource ID `*`) for each listed resource and permission type.

| Endpoint                                                                                                       | Resource Type      | Permission type  |
| -------------------------------------------------------------------------------------------------------------- | ------------------ | ---------------- |
| [`GET /v1/forms/:formId`](../tasklist-api-rest/specifications/get-form.api.mdx)                                | PROCESS_DEFINITION | READ_USER_TASK   |
| [`POST /v1/tasks/search`](../tasklist-api-rest/specifications/search-tasks.api.mdx)                            | PROCESS_DEFINITION | READ_USER_TASK   |
| [`GET /v1/tasks/:taskId`](../tasklist-api-rest/specifications/get-task-by-id.api.mdx)                          | PROCESS_DEFINITION | READ_USER_TASK   |
| [`PATCH /v1/tasks/:taskId/assign`](../tasklist-api-rest/specifications/assign-task.api.mdx)                    | PROCESS_DEFINITION | UPDATE_USER_TASK |
| [`PATCH /v1/tasks/:taskId/unassign`](../tasklist-api-rest/specifications/unassign-task.api.mdx)                | PROCESS_DEFINITION | UPDATE_USER_TASK |
| [`PATCH /v1/tasks/:taskId/complete`](../tasklist-api-rest/specifications/complete-task.api.mdx)                | PROCESS_DEFINITION | UPDATE_USER_TASK |
| [`POST /v1/tasks/:taskId/variables`](../tasklist-api-rest/specifications/save-draft-task-variables.api.mdx)    | PROCESS_DEFINTION  | UPDATE_USER_TASK |
| [`POST /v1/tasks/:taskId/variables/search`](../tasklist-api-rest/specifications/search-task-variables.api.mdx) | PROCESS_DEFINITION | READ_USER_TASK   |
| [`GET /v1/variables/:variableId`](../tasklist-api-rest/specifications/get-variable-by-id.api.mdx)              | PROCESS_DEFINITION | READ_USER_TASK   |
