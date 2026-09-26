---
id: orchestration-cluster-api
title: Camunda Orchestration Cluster API connector
sidebar_label: Orchestration Cluster API
description: Query process, decision, user task, and audit data from the Camunda 8 Orchestration Cluster REST API (v2).
---

The **Orchestration Cluster API connector** allows you to query data from the [Camunda 8 Orchestration Cluster REST API (v2)](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md)
in your BPMN process. This connector is compatible with both Camunda 8 SaaS and Camunda 8 Self-Managed deployments.

:::note
This connector replaces the deprecated Camunda Operate connector, which was compatible with Camunda 8.8 and earlier.
:::

This connector is read-only by design. It only issues `GET` and `POST /search` requests; no state-changing operations (create, update, delete, cancel, migrate, modify, resolve, etc.) are exposed. If you need to trigger state-changing calls against the Orchestration Cluster API, use the [REST connector](../protocol/rest.md) instead.

## Prerequisites

To use the **Orchestration Cluster API connector**, you need an active Camunda 8.9 or later cluster. This connector is compatible with both Camunda 8 SaaS and Camunda 8 Self-Managed.

You also need OAuth 2.0 client credentials with permission to call the Orchestration Cluster API. Follow the links below to learn more about API client configuration.

- [API client configuration in Camunda 8 SaaS](/components/hub/organization/manage-clusters/manage-api-clients.md)
- [Token-based authentication in Camunda 8 Self-Managed](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-authentication.md#using-a-token-oidcjwt)

Basic authentication (username and password) is not supported. Only OAuth 2.0 client credentials are accepted.

:::note
Use Camunda secrets to store credentials so you don't expose sensitive information directly from the process. See [managing secrets](/components/hub/organization/manage-clusters/manage-secrets.md) to learn more.
:::

## Create an Orchestration Cluster API connector task

import ConnectorTask from '../../../components/react-components/connector-task.md'

<ConnectorTask/>

## Enter your cluster information

Choose between **Camunda SaaS** and **Camunda Self-managed** depending on your Camunda 8 installation type. The input fields will update accordingly.

### SaaS clusters

If you are using a SaaS cluster, you will be required to provide your **Region** and **Cluster ID**. You will see these values when you [create an API client](/components/hub/organization/manage-clusters/manage-api-clients.md#create-a-client) for your cluster.

### Self-Managed clusters

If you are using a Self-Managed cluster, you need to provide two URLs:

- URL of your OAuth token endpoint
- Base URL of the Orchestration Cluster REST API (must end with `/v2`)

If you are testing this connector on your local machine with the Camunda 8 Docker Compose setup, set the following URLs:

- OAuth Token endpoint: `http://localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/token`
- Base URL: `http://localhost:8080/v2`

## Configure authentication

For both SaaS and Self-Managed clusters, you need to provide **Client ID** and **Client secret**.
You will see these values when you [create an API client](/components/hub/organization/manage-clusters/manage-api-clients.md#create-a-client) for your cluster.

For Self-Managed clusters, you can additionally specify:

- **Audience**: The OAuth audience expected by your identity provider. Leave empty unless your identity provider requires a specific value.
- **Scopes**: Space-separated OAuth 2.0 scopes. Required by some identity providers, for example Microsoft Entra ID, which requires `api://<client-id>/.default`.

## Choose endpoint and operation

In the **Entity** dropdown list, select the Orchestration Cluster API v2 entity you want to query. The following entities are available:

- Process instances
- Process definitions
- Element instances
- Incidents
- Variables
- User tasks
- Jobs
- Decision instances
- Decision definitions
- Decision requirements
- Batch operations
- Batch operation items
- Message subscriptions
- Correlated message subscriptions
- Audit logs
- Authorizations
- Groups
- Roles
- Tenants
- Mapping rules

In the **Operation** dropdown list, select one of the supported operations: **Search** or **Get by key**.

:::note Search-only entities
**Batch operation items**, **Message subscriptions**, and **Correlated message subscriptions** only support the **Search** operation; **Get by key** is not available for these entities.
:::

Refer to the [Orchestration Cluster API REST documentation](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md) for the full list of endpoints, filter fields, and response shapes per entity.

## Configure operation parameters

For **Get by key**, you must provide a single input, **Key / ID**: the numeric key (for example `processInstanceKey`, `incidentKey`, `userTaskKey`) or string identifier (for example `groupId`, `roleId`, `tenantId`) of the entity you want to retrieve.

For **Search**, the following search parameters can be configured:

- **Filter**: A FEEL context with per-entity filter fields. For example, the following filter returns active process instances for the `order-process` process definition:

  `{state: "ACTIVE", processDefinitionId: "order-process"}`

  Filters also support advanced operators (`$eq`, `$neq`, `$gt`, `$gte`, `$lt`, `$lte`, `$like`, `$in`, `$notIn`, `$exists`, `$or`). See [advanced search filters](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-data-fetching.md#advanced-search-filters) for details.

- **Sort**: A list of sort objects. For example, the following sorts results by start date in ascending order:

  `[{field: "startDate", order: "ASC"}]`

- **Limit**: The maximum number of results to return per page. Defaults to `100`; the maximum is `10000`. Leave empty to use the server default.
- **Page after (forward cursor)**: Pass the `page.endCursor` value from the previous response to fetch the next page.
- **Page before (backward cursor)**: Pass the `page.startCursor` value from the previous response to fetch the previous page.
- **Page from (offset)**: Zero-based index of the first result, for offset-based pagination.

**Page after**, **Page before**, and **Page from** are mutually exclusive. See [pagination](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-data-fetching.md#page) for more details.

## Handle the API response

You can use an output mapping to map the response:

1. Use **Result variable** to store the response in a process variable.
2. Use **Result expression** to map fields from the response into process variables. By default, this connector sets the result expression to `={orchestrationClusterResponse: response.body}`.

Response example for a **Search** operation on process instances:

```json
{
  "status": 200,
  "headers": {
    "content-type": "application/json"
  },
  "body": {
    "items": [
      {
        "processInstanceKey": "2251799814052469",
        "processDefinitionId": "order-process",
        "processDefinitionKey": "2251799814052467",
        "processDefinitionVersion": 1,
        "startDate": "2023-03-21T08:25:04.499+0000",
        "endDate": "2023-03-21T08:25:12.093+0000",
        "state": "COMPLETED"
      },
      {
        "processInstanceKey": "2251799814052613",
        "processDefinitionId": "order-process",
        "processDefinitionKey": "2251799814052610",
        "processDefinitionVersion": 2,
        "startDate": "2023-03-21T08:27:49.784+0000",
        "endDate": "2023-03-21T08:27:58.838+0000",
        "state": "COMPLETED"
      }
    ],
    "page": {
      "totalItems": 55,
      "startCursor": "jfenj8vhekgj98uzfafhu7",
      "endCursor": "negbkjeh84tzh4gk0kwegj"
    }
  }
}
```
