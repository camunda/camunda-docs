---
id: provisioning-and-lifecycle
title: "Provisioning and lifecycle"
sidebar_label: "Provisioning and lifecycle"
description: "Learn how to provision and manage Physical Tenants, including restart behavior and out-of-scope operations."
---

import PageDescription from '@site/src/components/PageDescription';

<PageDescription />

## Provisioning model

Physical Tenants are provisioned through static application configuration.

- Add or change tenant configuration in application config.
- Apply the change with a rolling restart.
- Validate startup status for every affected component.

Dynamic runtime tenant creation and runtime tenant updates are not available.

## Add a new Physical Tenant

To add a tenant:

1. Add a new `camunda.physical-tenants.<tenant-key>` section in configuration.
2. Define the tenant-specific initialization and required assignments.
3. Ensure required storage and identity configuration is valid.
4. Apply the change through a rolling restart.

You can add multiple new Physical Tenants in the same configuration change and rolling restart. You do not need to add them one at a time.

### Rolling restart expectations

Existing Physical Tenants keep running during a rolling restart to add a new tenant. Any interference they experience is the normal interference of a rolling restart itself, not something caused specifically by the new tenant's addition.

During a rolling restart for tenant provisioning:

- Existing tenants continue processing requests throughout the restart, subject to your normal rollout strategy.
- New tenant availability starts after updated components are running and ready.
- Startup validation failures block readiness for affected components.

## Default tenant lifecycle

The default Physical Tenant is always present and immutable:

- You cannot delete the default tenant.
- You cannot rename the default tenant.
- You cannot disable the default tenant.

If tenant scope is omitted in compatibility paths, requests resolve to the default tenant.

## Disable, rename, and delete

- Disabling and re-enabling a Physical Tenant is supported through configuration. There is no dedicated API for this operation.
- Renaming a Physical Tenant is not supported.
- Deleting a Physical Tenant is not supported. No single API removes a tenant's configuration and its data together.

[Purging](/self-managed/operational-guides/data-purge.md) removes the data of one tenant when you pass `physicalTenant={physicalTenantId}`, and the data of every tenant when you omit it. Removing a tenant from configuration disables it without deleting persisted data. These are separate operations.

A Physical Tenant's enabled state follows its configuration directly:

- **Present in configuration:** The tenant is enabled.
- **Removed from configuration:** The tenant is disabled. The cluster stops processing requests for that tenant, and the API returns `404 Not Found` for requests scoped to it. No data is deleted.
- **Re-added to configuration:** The tenant is re-enabled with its existing data. Nothing needs to be re-created.

Each of these transitions takes effect through the same rolling restart used for any other configuration change.

### Logically remove a disabled tenant

A disabled tenant still appears in the persisted cluster topology, which blocks operations that require every tenant to be accounted for, such as multi-region failover.

The Cluster API logically removes a tenant that you have already removed from configuration with `DELETE /actuator/cluster/physical-tenants/{physicalTenantId}`. It drops the tenant from the cluster topology and **deletes no data**. This is not a delete API, and it is not a way to reclaim storage.

To delete a tenant's data, take these steps in order:

1. Purge the tenant with `POST /actuator/cluster/purge?physicalTenant={physicalTenantId}`. Always include the `physicalTenant` parameter. Without it, the purge removes the data of every Physical Tenant. See [data purge](/self-managed/operational-guides/data-purge.md).
1. Remove the tenant from configuration and apply the change with a rolling restart.
1. Logically remove the tenant with the endpoint above.

## Out of scope

The following capabilities are out of scope:

- Dynamic tenant creation without restart
- Tenant deletion
- Runtime tenant updates

## Upgrade behavior from 8.9

For single-tenant 8.9 clusters upgrading to 8.10:

- Existing root-level configuration becomes the `default` Physical Tenant behavior.
- No explicit migration step is required for this default mapping.

## Operational guidance

Before applying provisioning changes:

- Validate tenant IDs and property paths.
- Validate identity provider assignments.
- Validate storage isolation settings per tenant.
- Plan and execute a rolling restart window.

After rollout:

- Verify tenant-scoped APIs route to expected tenant context.
- Verify storage isolation and startup health.
- Verify authentication behavior for assigned providers.

:::note Related pages

- [Configuration reference](./configuration-reference.md)
- [Physical Tenant isolation model](./index.md)
- [Backup and restore](../../operational-guides/backup-restore/zeebe-backup-and-restore.md)

:::
