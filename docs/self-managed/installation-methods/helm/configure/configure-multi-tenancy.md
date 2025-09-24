---
id: configure-multi-tenancy
sidebar_label: Multi-tenancy
title: Helm chart multi-tenancy configuration
description: "Learn how to configure multi-tenancy in Camunda 8."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Multi-tenancy is useful when you want to isolate users, data, and workloads across different tenants (e.g., business units, departments, or customers) within the same Camunda 8 cluster. It ensures separation while reducing infrastructure overhead by running multiple tenants on a shared installation.

In this guide you learn how to configure multi-tenancy in both Management Identity and [Orchestration Cluster Identity](/self-managed/components/orchestration-cluster/identity/overview.md). Understand the differences, defaults, and how to enable or enforce tenant checks.

### Prerequisites

- A running Camunda 8 Self-Managed deployment with authentication enabled.

:::note
Multi-tenancy requires authentication to be enabled in the Orchestration Cluster Identity.
If authentication is disabled, multi-tenancy does not work.  
:::

### Configuration

Multi-tenancy behavior depends on which identity component is used:

- **Management Identity:** Multi-tenancy is disabled by default and must be explicitly enabled. Once enabled, tenant checks are automatically enforced, meaning all requests are validated against the active tenant configuration.

- **Orchestration Cluster Identity:** Multi-tenancy is on by default, and a default tenant is always created. However, tenant checks are not enforced unless you explicitly enable them.

#### Parameters

| values.yaml option                          | type    | default | description                                                                           |
| ------------------------------------------- | ------- | ------- | ------------------------------------------------------------------------------------- |
| `global.multitenancy.enabled`               | boolean | `false` | (Management Identity) Enables multi-tenancy globally.                                 |
| `orchestration.multitenancy.checks.enabled` | boolean | `false` | (Orchestration Cluster Identity) Enforces tenant validation across requests.          |
| `orchestration.multitenancy.api.enabled`    | boolean | `true`  | (Orchestration Cluster Identity) Enables the multi-tenancy API for tenant management. |

#### Example usage

**Management Identity**

Enable multi-tenancy in Management Identity via Helm:

```yaml
global:
  multitenancy:
    enabled: true
```

**Orchestration Cluster Identity**

Multi-tenancy is on by default, however, tenant checks are not enforced unless you enable them:

```yaml
orchestration:
  multitenancy:
    checks:
      enabled: true # Enforces tenant checks in all components
    api:
      enabled: true # Enables multi-tenancy API for tenant management
```

:::warning
Disabling multi-tenancy can lead to unexpected behavior if previously enabled with active tenants.
:::

### Troubleshooting

#### Zeebe is unable to retrieve jobs for a tenant, unable to assign a task to yourself, or Operate retry is not functioning

If multi-tenancy is enabled, you may encounter the following issues:

- **Zeebe is unable to retrieve jobs for a tenant** when canceling or retrying via **Operate** or **Tasklist**.
- You see the error `Task could not be assigned - Service is not reachable` when attempting to assign a task to yourself in **Tasklist**.
- **Retry operations in Operate do not function** as expected.

These issues typically occur because the **Zeebe client used by Operate and Tasklist does not have access to the required tenant(s).** This access must be explicitly granted.

##### How to fix it

You can resolve these issues by ensuring the **Zeebe application is assigned to the tenant** where the task or job resides. To do this:

1. **Log in to Camunda Identity.**
2. In the left-hand menu, go to **Tenants**.
3. Click on the tenant that is experiencing the issue.
4. Navigate to the **Applications** tab.
5. Ensure that the checkbox for **Zeebe** is selected.
6. Click **Save** if any changes were made.

Once the Zeebe application is assigned to the tenant, you should be able to:

- Assign tasks to yourself in Tasklist.
- Successfully retry jobs in Operate.
- Retrieve jobs from the correct tenant context.

For additional details, refer to the documentation on [assigning applications to a tenant](/self-managed/components/management-identity/manage-tenants.md#assign-applications-to-a-tenant-1).

#### Tenant requirement for job actions

In single-tenant deployments, Operate and Tasklist can cancel or retry jobs without requiring tenant specification. However, in multi-tenant mode, this behavior changes: **a tenant must always be explicitly provided**.

This is a known limitation based on how the applications are built—there is no current workaround.

#### Identity usage for Zeebe client connections

Although Operate and Tasklist each have their own Keycloak identities (`operate`, `tasklist`), both internally use a Zeebe client to connect to Zeebe (particularly relevant for versions before 8.8).  
This client must be configured with its own credentials (commonly labeled `zeebe`) and **should not reuse the application's identity**. While it may appear that credentials are shared, the Zeebe client is meant to use a separate, purpose-specific identity.
