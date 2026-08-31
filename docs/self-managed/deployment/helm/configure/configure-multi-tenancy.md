---
id: configure-multi-tenancy
sidebar_label: Multi-tenancy
title: Configure multi-tenancy in Helm chart
description: "Learn how to configure multi-tenancy in Camunda 8."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

:::note
This page describes **logical tenants**, the lightweight tenant-ID based isolation model. For strong physical isolation of separate teams or organizations within a single cluster, see [Physical Tenants](/self-managed/concepts/multi-tenancy/physical-tenants.md).
:::

Multi-tenancy lets you isolate users, data, and workloads across tenants (for example, business units, departments, or customers) within the same Camunda 8 cluster. This ensures separation while reducing infrastructure overhead by running multiple tenants on a shared installation.

This page explains how to configure multi-tenancy in both Management Identity and [Orchestration Cluster Admin](/self-managed/components/orchestration-cluster/admin/overview.md). It also shows the defaults, how to enable or enforce tenant checks, and how to resolve common issues.

## Prerequisites

- A running Camunda 8 Self-Managed deployment with authentication enabled.

:::note
Multi-tenancy requires authentication in the Orchestration Cluster Admin. If authentication is disabled, multi-tenancy does not work.
:::

The memory limit for Management Identity is generally suitable for most multi-tenant deployments. If the tenancy model becomes more complex with many tenants, you might encounter memory pressure on the heap.

If you anticipate higher memory usage, consider increasing the memory limit for Management Identity:

```yaml
identity:
  resources:
    limits:
      memory: 4Gi
```

As an additional safeguard, you can increase the JVM heap allocation by setting:

```yaml
identity:
  env:
    - name: JAVA_TOOL_OPTIONS
      value: -XX:MaxRAMPercentage=50.0
```

## Configuration

Multi-tenancy behavior differs depending on the identity component:

- **Management Identity:** Disabled by default. You must enable it. Once enabled, tenant checks are automatically enforced (all requests are validated against the active tenant configuration).

- **Orchestration Cluster Admin:** Enabled by default, with a default tenant created. Tenant checks are not enforced unless explicitly enabled.

### Parameters

| values.yaml option                          | type    | default | description                                                                       |
| ------------------------------------------- | ------- | ------- | --------------------------------------------------------------------------------- |
| `global.multitenancy.enabled`               | boolean | `false` | (Management Identity) Enable multi-tenancy globally.                              |
| `orchestration.multitenancy.checks.enabled` | boolean | `false` | (Orchestration Cluster Admin) Enforce tenant validation across requests.          |
| `orchestration.multitenancy.api.enabled`    | boolean | `true`  | (Orchestration Cluster Admin) Enable the multi-tenancy API for tenant management. |

### Example usage

**Management Identity**

Enable multi-tenancy in Management Identity:

```yaml
global:
  multitenancy:
    enabled: true
```

**Orchestration Cluster Admin**

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

## End-to-end example: assign users to a tenant via mapping rules

Enabling tenant checks controls whether tenant membership is enforced, but doesn't assign anyone to a tenant. To assign users automatically as they log in (rather than one by one), combine a tenant with a mapping rule.

**Scenario:** Users whose access token contains the `groups` claim with value `finance-team` should automatically get access to a `finance` tenant.

1. Enable multi-tenancy checks in the Orchestration Cluster Admin, as shown above.
2. [Create the `finance` tenant](/components/admin/tenant.md#create-a-tenant).
3. [Create a mapping rule](/components/admin/mapping-rules.md#create-a-mapping-rule) matching the claim:
   - **Claim name**: `groups`
   - **Claim value**: `finance-team`
4. [Assign the mapping rule to the `finance` tenant](/components/admin/tenant.md#assign-mapping-rules-to-a-tenant).

Once assigned, any user or client presenting a token with `groups` containing `finance-team` is automatically treated as a member of the `finance` tenant, without a manual per-user assignment step.

This uses mapping rules in the Orchestration Cluster Admin, which are distinct from [mapping rules in Management Identity](/self-managed/components/management-identity/mapping-rules.md) (which instead control access to Console, Optimize, and Web Modeler). See [mapping rules](/components/concepts/access-control/mapping-rules.md) for how the two relate.
