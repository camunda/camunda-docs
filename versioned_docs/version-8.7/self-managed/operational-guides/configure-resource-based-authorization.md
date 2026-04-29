---
id: configure-resource-based-authorization
title: "Configure resource-based authorization"
sidebar_label: "Configure resource-based authorization"
description: "Learn how to configure resource-based authorization (RBA) in Camunda 8 Self-Managed using a single global Helm value."
---

:::caution
Resource-based authorization (RBA) is currently only available for Camunda 8 Self-Managed with authentication enabled [through Identity](/self-managed/identity/what-is-identity.md).
:::

Resource-based authorization (RBA) lets administrators grant access to specific resources — process definitions, decisions, forms, and so on — instead of relying solely on tenant-wide permissions. RBA is enforced by Tasklist, Operate, and Identity working together, and requires Identity to persist the resource permissions in its database.

To configure RBA, you must do the following:

- Ensure Identity is configured with a [database](/self-managed/identity/miscellaneous/configuration-variables.md#database-configuration).
- Enable the RBA flag globally through Helm charts **or** via environment variables for each required component.

RBA must be enabled for each required component. Using the single global flag with Helm charts is recommended.

:::note
RBA and [multi-tenancy](configure-multi-tenancy.md) cannot be enabled at the same time. Enabling both causes the Helm chart to fail with a validation error at install or upgrade.
:::

## Helm charts

When using the Camunda 8 Helm chart, enable RBA globally with the flag `global.rba.enabled`:

```yaml
global:
  rba:
    enabled: true
```

When this value is `true`, the chart sets the following environment variables across the relevant components:

| Component | Environment variable                                  |
| --------- | ----------------------------------------------------- |
| Tasklist  | `CAMUNDA_TASKLIST_IDENTITY_RESOURCE_PERMISSIONS_ENABLED` |
| Operate   | `CAMUNDA_OPERATE_IDENTITY_RESOURCEPERMISSIONSENABLED`    |
| Identity  | `RESOURCE_PERMISSIONS_ENABLED`                        |

## Environment variables

Without Helm charts, RBA can be enabled directly via the environment variables shown in the table above. The feature **must** be enabled in **all** required components — Tasklist, Operate, and Identity — or behavior will be inconsistent. See [Identity configuration variables → Feature flags](/self-managed/identity/miscellaneous/configuration-variables.md#feature-flags) for the underlying `RESOURCE_PERMISSIONS_ENABLED` flag.

## Upgrade compatibility

Before `global.rba.enabled` was introduced, RBA was enabled by injecting the three environment variables manually through `tasklist.env`, `operate.env`, and `identity.env`. If your existing values file uses that manual approach, you do **not** need to change anything when upgrading — the chart still honors per-component `env` entries. You can switch to the new flag at your convenience by removing the manual entries and setting `global.rba.enabled: true`.

## Mutual exclusion with multi-tenancy

The chart actively prevents RBA and multi-tenancy from being enabled together. Setting both `global.rba.enabled: true` and `global.multitenancy.enabled: true` causes `helm install` / `helm upgrade` to fail with a `[camunda][error]` message stating that the two features cannot be enabled at the same time.
