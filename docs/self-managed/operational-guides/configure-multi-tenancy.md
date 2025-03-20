---
id: configure-multi-tenancy
title: "Configure multi-tenancy"
sidebar_label: "Configure multi-tenancy"
description: "Learn how to configure multi-tenancy in Camunda 8."
---

:::caution
Multi-tenancy is currently only available for Camunda 8 Self-Managed with authentication enabled [through Identity](/self-managed/identity/what-is-identity.md).
:::

To successfully configure multi-tenancy, you must enable the multi-tenancy flag through [Helm charts](/self-managed/setup/install.md)
**or** via environment variables.

## Helm charts

When using Helm charts, you can enable multi-tenancy globally with the flag `global.multitenancy.enabled`.
Visit [the Helm chart configuration](https://artifacthub.io/packages/helm/camunda/camunda-platform#global-parameters) for additional details.

## Environment variables

When using environment variables, you can enable multi-tenancy by setting the following variables:

```bash
export CAMUNDA_SECURITY_MULTITENANCY_ENABLED=true
export CAMUNDA_SECURITY_AUTHENTICATION_UNPROTECTEDAPI=false
```

:::danger
Disabling multi-tenancy can lead to unexpected behavior if previously enabled with active tenants
:::
