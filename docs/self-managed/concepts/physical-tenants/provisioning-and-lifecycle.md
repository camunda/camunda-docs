---
id: provisioning-and-lifecycle
title: "Provisioning and lifecycle"
sidebar_label: "Provisioning and lifecycle"
description: "Provision and manage Physical Tenants in 8.10, including restart behavior and out-of-scope operations."
---

This page describes how to provision and operate Physical Tenants in Camunda 8.10.

## Provisioning model in 8.10

Physical Tenants are provisioned through static application configuration.

- Add or change tenant configuration in application config.
- Apply the change with a rolling restart.
- Validate startup status for every affected component.

Dynamic runtime tenant creation and runtime tenant updates are not available in 8.10.

## Add a new Physical Tenant

To add a tenant:

1. Add a new `camunda.physical-tenants.<tenant-key>` section in configuration.
2. Define the tenant-specific initialization and required assignments.
3. Ensure required storage and identity configuration is valid.
4. Apply the change through a rolling restart.

### Rolling restart expectations

During a rolling restart for tenant provisioning:

- Existing tenant traffic should continue according to your rollout strategy.
- New tenant availability starts after updated components are running and ready.
- Startup validation failures block readiness for affected components.

## Default tenant lifecycle

In 8.10, the default Physical Tenant is always present and immutable:

- You cannot delete the default tenant.
- You cannot rename the default tenant.
- You cannot disable the default tenant.

If tenant scope is omitted in compatibility paths, requests resolve to the default tenant.

## Disable, rename, and delete

For 8.10:

- Disabling a Physical Tenant is not supported.
- Renaming a Physical Tenant is not supported.
- Deleting a Physical Tenant is not supported.

If you remove a Physical Tenant from configuration, the cluster will no longer process requests for that tenant. The API returns `404 Not Found` for requests scoped to a removed tenant. No data is deleted. You can reactivate the tenant by restoring its configuration.

## Out of scope for 8.10

The following capabilities are out of scope for 8.10:

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

<!--
TODO(physical-tenants): Add a detailed runbook with command examples and expected health/readiness transitions once Day-2 operations behavior is finalized. @christinaausley
-->

## Related pages

- [Configuration reference](./configuration-reference.md)
- [Physical Tenant isolation model](./index.md)
- [Backup and restore](../../operational-guides/backup-restore/zeebe-backup-and-restore.md)
