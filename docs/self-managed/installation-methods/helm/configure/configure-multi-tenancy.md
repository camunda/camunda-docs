---
id: configure-multi-tenancy
sidebar_label: Multi-tenancy
title: Configure multi-tenancy in Helm chart
description: "Learn how to configure multi-tenancy in Camunda 8."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Multi-tenancy lets you isolate users, data, and workloads across tenants (for example, business units, departments, or customers) within the same Camunda 8 cluster. This ensures separation while reducing infrastructure overhead by running multiple tenants on a shared installation.

This page explains how to configure multi-tenancy in both Management Identity and [Orchestration Cluster Identity](/self-managed/components/orchestration-cluster/identity/overview.md). It also shows the defaults, how to enable or enforce tenant checks, and how to resolve common issues.

## Prerequisites

- A running Camunda 8 Self-Managed deployment with authentication enabled.

:::note
Multi-tenancy requires authentication in the Orchestration Cluster Identity. If authentication is disabled, multi-tenancy does not work.
:::

## Configuration

Multi-tenancy behavior differs depending on the identity component:

- **Management Identity:** Disabled by default. You must enable it. Once enabled, tenant checks are automatically enforced (all requests are validated against the active tenant configuration).

- **Orchestration Cluster Identity:** Enabled by default, with a default tenant created. Tenant checks are not enforced unless explicitly enabled.

### Parameters

| values.yaml option                          | type    | default | description                                                                          |
| ------------------------------------------- | ------- | ------- | ------------------------------------------------------------------------------------ |
| `global.multitenancy.enabled`               | boolean | `false` | (Management Identity) Enable multi-tenancy globally.                                 |
| `orchestration.multitenancy.checks.enabled` | boolean | `false` | (Orchestration Cluster Identity) Enforce tenant validation across requests.          |
| `orchestration.multitenancy.api.enabled`    | boolean | `true`  | (Orchestration Cluster Identity) Enable the multi-tenancy API for tenant management. |

### Example usage

**Management Identity**

Enable multi-tenancy in Management Identity:

```yaml
global:
  multitenancy:
    enabled: true
```

**Orchestration Cluster Identity**

Enable tenant checks and the multi-tenancy API:

```yaml
orchestration:
  multitenancy:
    checks:
      enabled: true # Enforces tenant checks in all components
    api:
      enabled: true # Enables multi-tenancy API for tenant management
```

:::warning
Disabling multi-tenancy after it has been enabled can cause unexpected behavior if active tenants exist.
:::

## Troubleshooting

### Zeebe cannot retrieve jobs, assign tasks, or perform retries in Operate

If multi-tenancy is enabled, you may encounter the following issues:

- Zeebe cannot retrieve jobs for a tenant when canceling or retrying in Operate or Tasklist.
- You see the error `Task could not be assigned - Service is not reachable` when attempting to assign a task to yourself in Tasklist.
- Retry operations in Operate do not work as expected.

These issues typically occur because the Zeebe client used by Operate and Tasklist does not have access to the required tenants. This access must be explicitly granted.

#### Fix: Assign the Zeebe application to the tenant

To resolve these issues, ensure that the Zeebe application is assigned to the tenant where the task or job resides.

1. Log in to Camunda Identity.
2. In the left-hand menu, go to **Tenants**.
3. Select the tenant with the issue.
4. Open the **Applications** tab.
5. Select the checkbox for **Zeebe**.
6. Click **Save** to apply changes.

After assigning the Zeebe application to the tenant, you should be able to:

- Assign tasks to yourself in Tasklist.
- Successfully retry jobs in Operate.
- Retrieve jobs from the correct tenant context.

For additional details, see [assign applications to a tenant](/self-managed/components/management-identity/manage-tenants.md#assign-applications-to-a-tenant).

### Tenant requirement for job actions

In single-tenant deployments, Operate and Tasklist can cancel or retry jobs without specifying a tenant. In multi-tenancy, you must always provide a tenant.

This is a known limitation based on how the applications are built, and has no workaround.

### Identity usage for Zeebe client connections

Operate and Tasklist each have their own Keycloak identities (`operate`, `tasklist`), but both use an internal Zeebe client to connect to Zeebe. This is most relevant for versions earlier than 8.8.

The Zeebe client must be configured with its own credentials (commonly labeled `zeebe`) and should not reuse the application’s identity. While it may look like credentials are shared, the Zeebe client requires a separate, purpose-specific identity.
