---
id: configure-multi-tenancy
sidebar_label: Multi-tenancy
title: Configure multi-tenancy in Helm chart
description: "Multi-tenancy lets you isolate users, data, and workloads across tenants (for example, business units, departments, or customers) within the same Camunda 8..."
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
