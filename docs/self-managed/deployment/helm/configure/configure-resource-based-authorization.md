---
id: configure-resource-based-authorization
sidebar_label: Resource-based authorization
title: Configure resource-based authorization in Helm chart
description: "Learn how to configure resource-based authorization (RBA) in Camunda 8 Self-Managed using a single global Helm value."
---

Resource-based authorization (RBA) lets administrators grant access to specific resources (process definitions, decisions, forms, and so on) instead of relying solely on tenant-wide permissions. RBA is enforced by Tasklist, Operate, and Management Identity working together.

This page explains how to enable RBA from the Camunda 8 Helm chart using the single `global.rba.enabled` value, the constraints you need to be aware of, and the upgrade behavior for users who previously configured RBA manually.

## Prerequisites

- A running Camunda 8 Self-Managed deployment with authentication enabled.
- Management Identity configured with a database (built-in PostgreSQL via `identityPostgresql` or an external database via `identity.externalDatabase`).

:::note
RBA and [multi-tenancy](configure-multi-tenancy.md) cannot be enabled at the same time. Enabling both causes the Helm chart to fail with a validation error.
:::

## Configuration

A single global value enables RBA across all applicable components. The chart wires the corresponding environment variables into Tasklist, Operate (or the unified Orchestration deployment in 8.8+), and Management Identity automatically:

| values.yaml option   | type    | default | description                                                                                |
| -------------------- | ------- | ------- | ------------------------------------------------------------------------------------------ |
| `global.rba.enabled` | boolean | `false` | Enables resource-based authorization in Tasklist, Operate, and Management Identity.        |

### Example usage

Enable RBA globally:

```yaml
global:
  rba:
    enabled: true
```

When this value is `true`, the chart sets the following environment variables:

| Component                               | Environment variable                                  |
| --------------------------------------- | ----------------------------------------------------- |
| Tasklist (or unified Orchestration 8.8+) | `CAMUNDA_TASKLIST_IDENTITY_RESOURCE_PERMISSIONS_ENABLED` |
| Operate (or unified Orchestration 8.8+) | `CAMUNDA_OPERATE_IDENTITY_RESOURCEPERMISSIONSENABLED`    |
| Management Identity                     | `RESOURCE_PERMISSIONS_ENABLED`                        |

## Upgrade compatibility

Before `global.rba.enabled` was introduced, RBA was enabled by injecting the three environment variables manually through `tasklist.env`, `operate.env`, and `identity.env` (or, in 8.8+, `orchestration.env` and `identity.env`).

If your existing values file uses that manual approach, you do **not** need to change anything when upgrading — the chart still honors per-component `env` entries. You can switch to the new flag at your convenience by removing the manual entries and setting `global.rba.enabled: true`.

## Mutual exclusion with multi-tenancy

The chart actively prevents RBA and multi-tenancy from being enabled together. If you set both `global.rba.enabled: true` and `global.multitenancy.enabled: true` (or `identity.multitenancy.enabled: true`), `helm install` / `helm upgrade` fails with:

```
[camunda][error] Resource-Based Authorization ("global.rba.enabled") and Multi-Tenancy ("global.multitenancy" / "identity.multitenancy") cannot be enabled at the same time. Please disable one of them.
```

## Availability

`global.rba.enabled` is available in the Camunda 8 Helm chart for app versions **8.7, 8.8, 8.9, and 8.10**. Earlier chart versions still require the manual environment-variable approach.
