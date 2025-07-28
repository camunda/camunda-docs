---
id: configure-multi-tenancy
title: "Configure multi-tenancy"
sidebar_label: "Configure multi-tenancy"
description: "Learn how to configure multi-tenancy in Camunda 8."
---

:::caution
Multi-tenancy is currently only available for Camunda 8 Self-Managed with authentication enabled [through Identity](/self-managed/identity/what-is-identity.md).
:::

To successfully configure multi-tenancy, you must do the following:

- Ensure Identity is configured with a [database](/self-managed/identity/miscellaneous/configuration-variables.md#database-configuration).
- Enable the multi-tenancy flag globally through [Helm charts](/self-managed/setup/install.md) **or** via environment variables for each required component.

Multi-tenancy must be enabled for each required component. Using the single global flag with Helm charts is recommended.

## Helm charts

When using Helm charts, you can enable multi-tenancy globally with the flag `global.multitenancy.enabled`.
Visit [the Helm chart configuration](https://artifacthub.io/packages/helm/camunda/camunda-platform#global-parameters) for additional details.

## Environment variables

Without Helm charts, multi-tenancy can be enabled using environment variables. This feature **must** be
enabled in **all** required components, see:

- [Identity](/self-managed/identity/managing-tenants.md)
- [Zeebe](../../../self-managed/zeebe-deployment/configuration/gateway-config/#zeebegatewaymultitenancy)
- [Operate](../../../self-managed/operate-deployment/operate-configuration/#multi-tenancy)
- [Tasklist](../../../self-managed/tasklist-deployment/tasklist-configuration/#multi-tenancy)
- [Optimize](/self-managed/optimize-deployment/configuration/multi-tenancy.md)
- [Connectors](../../../self-managed/connectors-deployment/connectors-configuration/#multi-tenancy)

Unexpected behavior may occur if multi-tenancy is only enabled in some components.

## Troubleshooting multi-tenancy

:::danger
Disabling multi-tenancy can lead to unexpected behavior if previously enabled with active tenants.
:::

You may encounter unexpected or exceptional behavior if you configure multi-tenancy incorrectly.

This includes enabling multi-tenancy in some, but not all components. Multi-tenancy must be enabled in all components.

### Problem: No external database is configured

Helm charts throw an error if multi-tenancy is enabled, but no external database is configured. A database is required by Identity when multi-tenancy is enabled.

### Solution: Configure Identity with a database

Ensure Identity is configured with a [database](/self-managed/identity/miscellaneous/configuration-variables.md#database-configuration).

### Problem: Zeebe is unable to retrieve jobs for a tenant, unable to assign a task to yourself, or Operate retry is not functioning

If multi-tenancy is enabled, you may encounter the following issues:

- **Zeebe is unable to retrieve jobs for a tenant** when canceling or retrying via **Operate** or **Tasklist**.
- You see the error `Task could not be assigned - Service is not reachable` when attempting to assign a task to yourself in **Tasklist**.
- **Retry operations in Operate do not function** as expected.

These issues typically occur because the **Zeebe client used by Operate and Tasklist does not have access to the required tenant(s).** This access must be explicitly granted.

### Solution

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

For additional details, refer to the documentation on [assigning applications to a tenant](/self-managed/identity/managing-tenants.md#assign-applications-to-a-tenant-1).
