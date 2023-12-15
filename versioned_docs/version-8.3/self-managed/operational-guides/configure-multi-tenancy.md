---
id: configure-multi-tenancy
title: "Configure multi-tenancy"
sidebar_label: "Configure multi-tenancy"
description: "Learn how to configure multi-tenancy in Camunda 8."
---

:::caution

Multi-tenancy is currently only available for Camunda 8 Self-Managed with authentication enabled [through Identity](/self-managed/identity/what-is-identity.md).

:::

In order to successfully configure multi-tenancy, you must do the following things:

- Ensure Identity is configured with a [database](/self-managed/identity/deployment/configuration-variables.md#database-configuration)
- Enable the multi-tenancy flag globally through Helm Charts **or** via environment variables for each required component

Multi-tenancy must be enabled for each required component. Using the single global flag with Helm charts is recommended.

## Helm charts

When using Helm charts, you can enable multi-tenancy globally with the flag `global.multitenancy.enabled`.
Visit [the Helm chart configuration](https://github.com/camunda/camunda-platform-helm/blob/main/charts/camunda-platform/README.md#global-parameters) for additional details.

## Environment variables

Without Helm charts, multi-tenancy can be enabled by the use of environment variables. This feature **must** be
enabled in all required components, see:

- [Identity](../../../self-managed/identity/deployment/configuration-variables/#feature-flags)
- [Zeebe](../../../self-managed/zeebe-deployment/configuration/gateway-config/#zeebegatewaymultitenancy)
- [Operate](../../../self-managed/operate-deployment/operate-configuration/#multi-tenancy)
- [Tasklist](../../../self-managed/tasklist-deployment/tasklist-configuration/#multi-tenancy)
- [Optimize]($optimize$/self-managed/optimize-deployment/configuration/multi-tenancy/)
- [Connectors](../../../self-managed/connectors-deployment/connectors-configuration/#multi-tenancy)

Unexpected behavior may occur if multi-tenancy is only enabled in some components.

## Troubleshooting multi-tenancy

You may encounter unexpected or exceptional behavior if you configure multi-tenancy incorrectly.

This includes enabling multi-tenancy in some, but not all components. Multi-tenancy must be enabled in all components.
