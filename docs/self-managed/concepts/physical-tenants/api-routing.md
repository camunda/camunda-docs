---
id: api-routing
title: "API routing for Physical Tenants"
sidebar_label: "API routing"
description: "Learn how REST API requests are routed to Physical Tenants, including tenant-scoped paths, default tenant routing, and cluster-wide endpoints."
---

This page explains how REST API requests are routed to Physical Tenants in Camunda 8.10.

## Tenant-scoped REST API routing

To target a specific Physical Tenant, use the tenant-prefixed path format:

```
/physical-tenants/{physicalTenantId}/v2/{resource}
```

For example:

```
GET  /physical-tenants/risk-production/v2/process-definitions/search
POST /physical-tenants/risk-production/v2/process-instances
```

The `physicalTenantId` in the path must match a configured Physical Tenant. The tenant segment comes **before** `/v2/`. Tenant-facing endpoints available at the standard `/v2/...` paths are also available at their tenant-prefixed equivalents.

## Default tenant routing

Requests that omit the Physical Tenant prefix are routed to the `default` Physical Tenant:

```
/v2/{resource}  →  /physical-tenants/default/v2/{resource}
```

This means existing integrations that do not use the tenant-prefixed paths continue to work without modification. They interact with the default Physical Tenant.

You can also use `default` explicitly as the `physicalTenantId`:

```
GET /physical-tenants/default/v2/process-definitions/search
```

## Cluster-wide endpoints

Some endpoints apply to the whole cluster and are intentionally not tenant-scoped. These endpoints are available only at their standard `/v2/...` paths and are not available at `/physical-tenants/{id}/v2/...`.

Examples of cluster-wide endpoints (not tenant-scoped):

- `GET /v2/topology` — cluster topology
- `GET /v2/license` — license status

For operations that require cluster-admin authorization (such as backups and restore), see [Authentication and authorization](./authentication-authorization.md).

## HTTP status codes

| Scenario                                                           | HTTP status        |
| ------------------------------------------------------------------ | ------------------ |
| Request to a configured tenant with valid credentials              | `2xx`              |
| Request to a configured tenant with missing or invalid credentials | `401 Unauthorized` |
| Request to an unknown or unconfigured tenant                       | `404 Not Found`    |

A `404` for an unknown tenant does not indicate an authorization failure — the tenant simply does not exist in the cluster configuration. Authentication has not yet been attempted when the tenant is not found.

## Per-tenant endpoint reference

The following table shows common tenant-scoped endpoint paths. Replace `{physicalTenantId}` with the configured tenant ID (for example, `tenanta` or `default`).

<!-- TODO: This table is a representative subset. The full endpoint list will be published once the OpenAPI spec is updated for Physical Tenants (camunda/camunda#54651). -->

| Operation                  | Method   | Endpoint path                                                                        |
| -------------------------- | -------- | ------------------------------------------------------------------------------------ |
| Search process definitions | `GET`    | `/physical-tenants/{physicalTenantId}/v2/process-definitions`                        |
| Get process definition     | `GET`    | `/physical-tenants/{physicalTenantId}/v2/process-definitions/{processDefinitionKey}` |
| Deploy resources           | `POST`   | `/physical-tenants/{physicalTenantId}/v2/deployments`                                |
| Create process instance    | `POST`   | `/physical-tenants/{physicalTenantId}/v2/process-instances`                          |
| Search process instances   | `POST`   | `/physical-tenants/{physicalTenantId}/v2/process-instances/search`                   |
| Cancel process instance    | `DELETE` | `/physical-tenants/{physicalTenantId}/v2/process-instances/{processInstanceKey}`     |
| Search user tasks          | `POST`   | `/physical-tenants/{physicalTenantId}/v2/user-tasks/search`                          |
| Complete user task         | `POST`   | `/physical-tenants/{physicalTenantId}/v2/user-tasks/{userTaskKey}/completion`        |
| Assign user task           | `POST`   | `/physical-tenants/{physicalTenantId}/v2/user-tasks/{userTaskKey}/assignment`        |
| Get variable               | `GET`    | `/physical-tenants/{physicalTenantId}/v2/variables/{variableKey}`                    |
| Publish message            | `POST`   | `/physical-tenants/{physicalTenantId}/v2/messages/publication`                       |
| Search incidents           | `POST`   | `/physical-tenants/{physicalTenantId}/v2/incidents/search`                           |

## Cluster-wide endpoint reference

Cluster-wide endpoints are not scoped to a Physical Tenant. They are available at the standard `/v2/...` path only and are **not** available at `/physical-tenants/{id}/v2/...`.

| Operation           | Method | Endpoint path      |
| ------------------- | ------ | ------------------ |
| Cluster topology    | `GET`  | `/v2/topology`     |
| License information | `GET`  | `/v2/license`      |
| Cluster health      | `GET`  | `/actuator/health` |

<!-- TODO: Expand this table once the full list of cluster-wide endpoints is confirmed after the OpenAPI spec update (camunda/camunda#54651). -->

For authorization requirements for cluster-wide operations, see [authorization model](./authorization-model.md).

## Cross-tenant queries

Each API call targets exactly one Physical Tenant via the path prefix. There is no cross-tenant query in a single request. If you need data from multiple tenants, you must make separate calls per tenant.

This is the core isolation guarantee of Physical Tenants: no operation can read or write across tenant boundaries in a single request.

## Webapp routing

Camunda web applications (Operate, Tasklist, Modeler) follow the same path convention:

```
/physical-tenants/{physicalTenantId}/{webapp}
```

For example:

```
https://your-cluster/physical-tenants/risk-production/operate
```

## gRPC routing

:::note
Per-Physical-Tenant gRPC routing is planned for a future release and is not available in 8.10.
:::

Once available, gRPC clients will specify the target Physical Tenant using the `Camunda-Physical-Tenant` request header (metadata in gRPC terms). Requests that omit the header will route to the `default` Physical Tenant.

## Backward compatibility and migration

Physical Tenants are designed to be backward-compatible for single-tenant and existing multi-tenant deployments:

- All existing `/v2/...` calls continue to work without modification — they route to the `default` Physical Tenant.
- There is no breaking change for single-tenant users upgrading to 8.10.
- To access a non-default Physical Tenant, update your clients to use the tenant-prefixed path.

For users migrating from Logical Tenants, the `tenantId` parameter in existing API calls remains unchanged and continues to refer to Logical Tenants within a Physical Tenant.
