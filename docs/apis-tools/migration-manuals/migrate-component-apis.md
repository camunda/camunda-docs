---
id: migrate-component-apis
title: Migrate Component V1 APIs
description: "Making necessary changes to continue using Camunda's V1 component REST APIs."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

This document offers an overview over necessary changes to continue working with the component REST APIs after an upgrade to Camunda 8.8 if a migration to the new [Orchestration cluster REST API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md) is not possible.

:::note
As of 8.8 the V1 component APIs are deprecated. We strongly recommend [migrating to the the Orchestration cluster REST API](/apis-tools/migration-manuals/migrate-to-camunda-api.md) where possible.
:::

## Migrate Operate V1 API

With 8.8, Camunda has reworked permissions for resource access. For the Operate V1 API this means, that access to the endpoints is now dependent on read and write permissions for the related resources. To continue using the Operate V1 API, user and client permissions need to be migrated to the new permission concept.

Users now require wildcard ("\*") permissions for the resource type and permission type the resource is accessing.

To see how permissions are assigned in Identity, see the guide on [Identity Authorization](../../components/identity/authorization.md).

### Operate permissions to new Resource Permisisons Mapping

For unchanged access to the Operate V1 API, the following permissions need to be set:

**operate-api:read** is replaced by

- `PROCESS_DEFINITION:*:READ_PROCESS_DEFINITION, READ_PROCESSINSTANCE`
- `DECISION_DEFINITION:*:READ_DECISION_DEFINITION`
- `DECISION_REQUIREMENTS_DEFINITION:*:READ`

**operate-api:write** is replaced by
`PROCESS_DEFINITION:*:DELETE_PROCESS_INSTANCES`

### Complete list of Resource Permissions

To make use of more fine-grained access control, below is a matrix detailing the permissions needed for the separate Operate V1 API endpoints. Note that the user needs to be granted general access (Resource ID "\*") for the listed Resource and Permission Type.

| Endpoint                                                                                                       | Resource Type                    | Permission Type          |
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
