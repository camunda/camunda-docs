---
id: authorization-model
title: "Authorization model for Physical Tenants"
sidebar_label: "Authorization model"
description: "Learn how cluster-wide and tenant-local authorization work for Physical Tenants in Camunda 8.10."
---

Learn how Camunda 8.10 authorizes Physical Tenant operations at the cluster-wide and tenant-local scopes. For identity provider connections and token routing, see [authentication and authorization](./authentication-authorization.md).

Authorization is divided into two scopes: cluster-wide operations, which affect the entire orchestration cluster, and tenant-local operations, which are scoped to a single Physical Tenant. Tenant-local operations are fully available in 8.10.

Two new authorization resource types were added for the per-tenant management APIs introduced alongside Physical Tenants:

| Resource type | Permissions                           | Backs                                                                                       |
| ------------- | ------------------------------------- | ------------------------------------------------------------------------------------------- |
| `BACKUP`      | `CREATE`, `READ`, `DELETE`, `RESTORE` | Per-tenant runtime backup endpoints (`/v2/backups/runtime`)                                 |
| `EXPORTER`    | `PAUSE`                               | Per-tenant exporting pause/resume endpoints (`/v2/exporting/pause`, `/v2/exporting/resume`) |

The default **admin** role receives all four `BACKUP` permissions and `EXPORTER:PAUSE` automatically. The default **readonly-admin** role receives only `BACKUP:READ` (there is no read-only permission for `EXPORTER`, since `PAUSE` isn't a read operation).

## Scope of the 8.10 authorization model

In Camunda 8.10, the Physical Tenant authorization model is designed around per-engine, per-tenant role and permission management. Key design principles for 8.10:

- **Per-tenant authorization is independently managed.** Each Physical Tenant defines its own roles, permissions, and mapping rules. A change in one tenant's authorization configuration does not affect other tenants.
- **Cluster-wide governance via Camunda Hub is a future capability.** Cross-tenant administration using Camunda Hub is not available in 8.10. Cluster-wide management endpoints use the dedicated cluster-admin role.
- **Identity provider setup is covered separately.** See [authentication and authorization](./authentication-authorization.md) for the supported identity deployment models and why per-engine IdP fragmentation is discouraged.

## Cluster-wide operations

Cluster-wide operations affect the entire orchestration cluster rather than a single Physical Tenant. Examples include viewing cluster topology, triggering cluster backups, and modifying Physical Tenant configuration at runtime. They are protected by the [cluster-admin role](#cluster-admin-role), exposed under the `/cluster/v2/...` path prefix.

Endpoints served at `/v2/...` without a `/physical-tenants/{physicalTenantId}` prefix, including `/v2/topology`, are scoped to the default Physical Tenant. They are not cluster-wide endpoints. Cluster-wide endpoints use the `/cluster/v2/...` prefix.

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

The cluster-admin role protects operations that span all Physical Tenants or affect the entire cluster, such as:

- Triggering cluster backups and restores
- Viewing cluster topology
- Assigning tenants or modifying Physical Tenant configuration at runtime

Cluster-admin is resolved from JWT token claims using configurable mapping rules, a dedicated cluster-admin configuration, or explicit user assignment for Basic authentication. There is no separate persisted cluster-level role binding service. Authorization is coarse-grained. Cluster-admin grants access to all cluster-level operations, with no fine-grained sub-roles.
