---
id: migrate-component-apis
title: Migrate Component V1 APIs
sidebar_label: "Component V1 APIs"
description: "Learn about the changes required to continue using Camunda's V1 component REST APIs."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import PageDescription from '@site/src/components/PageDescription';

<PageDescription />

:::note Have you already migrated?
You do not need to perform this migration again if you already did this when upgrading to version 8.8. This guide is retained to help customers migrate before upgrading from 8.9 to 8.10. See [API and SDK changes to migrate before Camunda 8.10](../migration-manuals/migrate-to-89.md#api-and-sdk-changes-to-migrate-before-camunda-810).
:::

## About

This document outlines the changes required to migrate from the component REST APIs before upgrading to Camunda 8.10, where the V1 component APIs are removed. Use it if migration to the new [Orchestration Cluster REST API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md) was not yet possible during your 8.8 or 8.9 upgrade.

In this context, **components** refer to the standalone Camunda applications **Operate** and **Tasklist**, each exposing its own V1 REST API.

:::note
As of version 8.8, the V1 component APIs are deprecated. They are removed in 8.10, so complete this migration before upgrading. We strongly recommend [migrating to the Orchestration Cluster REST API](/apis-tools/migration-manuals/migrate-to-camunda-api.md) where possible.
:::

## Migrate V1 APIs

With Camunda 8.8, permissions for resource access have been reworked. For the V1 APIs, this means that access to endpoints now depends on specific read and write permissions for related resources.

To continue using the V1 APIs, users and clients must be assigned the appropriate permissions under [the new authorization model](/components/concepts/access-control/authorizations.md).

Users now require wildcard (`*`) permissions for the resource type and permission type being accessed.

:::info
For guidance on assigning permissions in Admin, see the [Admin authorization guide](../../components/admin/authorization.md).
:::

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

| Endpoint                                        | Resource Type                    | Permission type          |
| ----------------------------------------------- | -------------------------------- | ------------------------ |
| `POST /v1/process-definitions/search`           | PROCESS_DEFINITION               | READ_PROCESS_DEFINITION  |
| `GET /v1/process-definitions/:key`              | PROCESS_DEFINITION               | READ_PROCESS_DEFINITION  |
| `GET v1/process-definitions/:key/xml`           | PROCESS_DEFINITION               | READ_PROCESS_DEFINITION  |
| `POST /v1/decision-definitions/search`          | DECISION_DEFINITION              | READ_DECISION_DEFINITION |
| `GET /v1/decision-definitions/:key`             | DECISION_DEFINITION              | READ_DECISION_DEFINITION |
| `POST /v1/decision-instances/search`            | DECISION_DEFINITION              | READ_DECISION_INSTANCE   |
| `GET /v1/decision-instances/:id`                | DECISION_DEFINITION              | READ_DECISION_INSTANCE   |
| `POST /v1/flownode-instances/search`            | PROCESS_DEFINITION               | READ_PROCESS_INSTANCE    |
| `GET /v1/flownode-instances/:key`               | PROCESS_DEFINITION               | READ_PROCESS_INSTANCE    |
| `POST /v1/variables/search`                     | PROCESS_DEFINITION               | READ_PROCESS_INSTANCE    |
| `GET /v1/variables/:key`                        | PROCESS_DEFINITION               | READ_PROCESS_INSTANCE    |
| `POST /v1/process-instances/search`             | PROCESS_DEFINITION               | READ_PROCESS_INSTANCE    |
| `GET /v1/process-instances/:key`                | PROCESS_DEFINITION               | READ_PROCESS_INSTANCE    |
| `GET /v1/process-instances/:key/statistics`     | PROCESS_DEFINITION               | READ_PROCESS_INSTANCE    |
| `GET /v1/process-instances/:key/sequence-flows` | PROCESS_DEFINITION               | READ_PROCESS_INSTANCE    |
| `DEL /v1/process-instances/:key`                | PROCESS_DEFINITION               | DELETE_PROCESS_INSTANCE  |
| `POST /v1/drd/search`                           | DECISION_REQUIREMENTS_DEFINITION | READ                     |
| `GET /v1/drd/:key`                              | DECISION_REQUIREMENTS_DEFINITION | READ                     |
| `GET /v1/drd/:key/xml`                          | DECISION_REQUIREMENTS_DEFINITION | READ                     |
| `POST /v1/incidents/search`                     | PROCESS_DEFINITION               | READ_PROCESS_INSTANCE    |
| `GET /v1/incidents/:key`                        | PROCESS_DEFINITION               | READ_PROCESS_INSTANCE    |

### Mapping Tasklist permissions to new authorizations

To maintain the same access level for the Tasklist V1 API, apply the following authorizations:

**`tasklist-api:read`** is replaced by:

- `PROCESS_DEFINITION:*:READ_PROCESS_DEFINITION,READ_USER_TASK`

**`taslist-api:write`** is replaced by:

- `PROCESS_DEFINITION:*:UPDATE_USER_TASK`

### Tasklist V1 API permission matrix

To enable more fine-grained access control, the matrix below details the required permissions for each Tasklist V1 API endpoint.  
Ensure the user has general access (resource ID `*`) for each listed resource and permission type.

| Endpoint                                  | Resource Type      | Permission type  |
| ----------------------------------------- | ------------------ | ---------------- |
| `GET /v1/forms/:formId`                   | PROCESS_DEFINITION | READ_USER_TASK   |
| `POST /v1/tasks/search`                   | PROCESS_DEFINITION | READ_USER_TASK   |
| `GET /v1/tasks/:taskId`                   | PROCESS_DEFINITION | READ_USER_TASK   |
| `PATCH /v1/tasks/:taskId/assign`          | PROCESS_DEFINITION | UPDATE_USER_TASK |
| `PATCH /v1/tasks/:taskId/unassign`        | PROCESS_DEFINITION | UPDATE_USER_TASK |
| `PATCH /v1/tasks/:taskId/complete`        | PROCESS_DEFINITION | UPDATE_USER_TASK |
| `POST /v1/tasks/:taskId/variables`        | PROCESS_DEFINTION  | UPDATE_USER_TASK |
| `POST /v1/tasks/:taskId/variables/search` | PROCESS_DEFINITION | READ_USER_TASK   |
| `GET /v1/variables/:variableId`           | PROCESS_DEFINITION | READ_USER_TASK   |
