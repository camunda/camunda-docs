---
id: authorization-model
title: "Authorization model for Physical Tenants"
sidebar_label: "Authorization model"
description: "Learn how cluster-wide and tenant-local authorization work for Physical Tenants in Camunda 8.10."
---

This page describes the authorization model for Physical Tenants in Camunda 8.10 Self-Managed deployments. Authorization is divided into two scopes: **cluster-wide operations**, which affect the entire orchestration cluster, and **tenant-local operations**, which are scoped to a single Physical Tenant. Tenant-local operations are fully available in 8.10. The [cluster-admin role](/components/admin/cluster-admin.md) and the cluster-wide operations it protects (status, topology, restore, and cluster mode changes) were added in 8.10.

Two new authorization resource types were added for the per-tenant management APIs introduced alongside Physical Tenants:

| Resource type | Permissions                           | Backs                                                                                       |
| ------------- | ------------------------------------- | ------------------------------------------------------------------------------------------- |
| `BACKUP`      | `CREATE`, `READ`, `DELETE`, `RESTORE` | Per-tenant runtime backup endpoints (`/v2/backups/runtime`)                                 |
| `EXPORTER`    | `PAUSE`                               | Per-tenant exporting pause/resume endpoints (`/v2/exporting/pause`, `/v2/exporting/resume`) |

The default **admin** role receives all four `BACKUP` permissions and `EXPORTER:PAUSE` automatically. The default **readonly-admin** role receives only `BACKUP:READ` (there is no read-only permission for `EXPORTER`, since `PAUSE` isn't a read operation).

## Scope of the 8.10 authorization model

In Camunda 8.10, the Physical Tenant authorization model is designed around per-engine, per-tenant role and permission management. Key design principles for 8.10:

- **Per-tenant authorization is independently managed.** Each Physical Tenant defines its own roles, permissions, and mapping rules. A change in one tenant's authorization configuration does not affect other tenants.
- **Cluster-wide governance via Camunda Hub is a future capability.** Cross-tenant administration using Camunda Hub is not available in 8.10. A dedicated [cluster-admin role](/components/admin/cluster-admin.md) exists starting in 8.10, covering cluster-wide status, topology, restore, and mode-change operations.
- **Per-engine IdP fragmentation is not recommended.** Using a different identity provider for each Zeebe/Operate/Tasklist engine (as opposed to a single cluster-level IdP) is explicitly discouraged. See [authentication and authorization](./authentication-authorization.md) for the supported identity deployment models.

## Cluster-wide operations

Cluster-wide operations affect the entire orchestration cluster rather than a single Physical Tenant. Examples include viewing cluster status and topology, triggering a cluster restore, and changing cluster mode.

:::note
These operations are protected by the [cluster-admin role](/components/admin/cluster-admin.md) and its dedicated security chain, exposed under the `/cluster/v2/...` path prefix. Cluster-admin was added in 8.10 — see [Cluster admin](/components/admin/cluster-admin.md) for the full list of operations and how to configure access.
:::

Endpoints served at the standard `/v2/...` paths — including `/v2/topology` — are scoped to a Physical Tenant, not the cluster.

## Tenant-local operations

Tenant-local operations are scoped to a single Physical Tenant and are accessed using the tenant-prefixed URL: `/physical-tenants/{physicalTenantId}/v2/...`. Authorization for these operations is determined by the requesting user's roles and permissions **within that specific tenant**.

The **default** Physical Tenant is accessed at `/v2/...` for backward compatibility, and also at `/physical-tenants/default/v2/...`.

### Tenant-local authorization scope

Tenant-local operations cover everything needed to run and manage process automation within a tenant:

| Category                 | Description                                                            |
| ------------------------ | ---------------------------------------------------------------------- |
| **Deployment**           | Deploying and managing process definitions, decision tables, and forms |
| **Process instances**    | Starting, canceling, modifying, and querying process instances         |
| **User tasks**           | Assigning, completing, and querying user tasks                         |
| **Variables**            | Reading and writing process and scope variables                        |
| **Messages and signals** | Publishing messages and broadcasting signals                           |
| **History and audit**    | Querying completed instances, audit events, and incident history       |

### Tenant-local endpoint path examples

The following examples show the URL structure for tenant-scoped operations. Replace `{physicalTenantId}` with the configured tenant ID (for example, `tenanta` or `default`).

| Operation                | Endpoint path                                                                      |
| ------------------------ | ---------------------------------------------------------------------------------- |
| List process definitions | `GET /physical-tenants/{physicalTenantId}/v2/process-definitions`                  |
| Deploy process           | `POST /physical-tenants/{physicalTenantId}/v2/deployments`                         |
| Start process instance   | `POST /physical-tenants/{physicalTenantId}/v2/process-instances`                   |
| List process instances   | `GET /physical-tenants/{physicalTenantId}/v2/process-instances`                    |
| Get user tasks           | `GET /physical-tenants/{physicalTenantId}/v2/user-tasks`                           |
| Complete user task       | `POST /physical-tenants/{physicalTenantId}/v2/user-tasks/{userTaskKey}/completion` |
| Get variables            | `GET /physical-tenants/{physicalTenantId}/v2/variables/{variableKey}`              |
| Publish message          | `POST /physical-tenants/{physicalTenantId}/v2/messages`                            |

For the full API reference, see the [Camunda API reference](../../../apis-tools/hub-api-sm/overview.md).

## How to determine who can access a tenant

Access to a Physical Tenant is determined by two independent checks:

1. **Authentication:** The requesting user's JWT token must be issued by a provider that is in the tenant's `providers.assigned` list. If the provider is not assigned to that tenant, the request fails with `401 Unauthorized`.

2. **Authorization:** The user's roles and permissions (derived from token claims via the tenant's local mapping rules) must allow the requested operation. If the user is authenticated but lacks permission, the request fails with `403 Forbidden`.

An unknown tenant ID returns `404 Not Found` on the tenant-prefixed REST paths. The equivalent gRPC error code is not yet documented.

## Role inheritance and override behavior

In Camunda 8.10, there is **no automatic role inheritance** from the cluster level to individual Physical Tenants, or across Physical Tenants. Each tenant's role and permission configuration is independent.

A user with cluster-admin access does not automatically have admin rights within any specific Physical Tenant. Cluster-admin is limited to cluster-wide operations only.

## Audit implications

Because each Physical Tenant is independently authorized, audit logs for tenant-local operations are also scoped to the tenant level. Operations performed in one tenant do not appear in another tenant's audit records.

## Cluster-admin role

The cluster-admin role covers operations that span all Physical Tenants or affect the entire cluster — cluster status, topology, restore, and mode changes. It's resolved separately from tenant-scoped roles, using its own Basic authentication users or OIDC claim matching, and is coarse-grained (no sub-roles).

See [Cluster admin](/components/admin/cluster-admin.md) for the full list of cluster-wide operations and how to configure access.
