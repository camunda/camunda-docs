---
id: configure-multi-tenancy
sidebar_label: Multi-tenancy
title: Helm chart multi-tenancy configuration
description: "Learn how to configure multi-tenancy in Camunda 8."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

:::caution
Multi-tenancy is currently only available for Camunda 8 Self-Managed with authentication enabled [through Identity](/self-managed/components/management-identity/what-is-identity.md).
:::

To configure multi-tenancy you must enable the multi-tenancy flag either in the [Helm charts](/self-managed/installation-methods/helm/install.md)
**or** via environment variables.

<Tabs groupId="memberType" defaultValue="helm" queryString values={[{label: 'Helm Charts', value: 'helm', },{label: 'Environment Variables', value: 'environment', }]} >
<TabItem value="helm">

When using Helm charts, you can enable multi-tenancy globally with the flag `global.multitenancy.enabled`.
Visit [the Helm chart configuration](https://artifacthub.io/packages/helm/camunda/camunda-platform#global-parameters) for additional details.

</TabItem>
<TabItem value="environment">

When using environment variables, you can enable multi-tenancy by setting the following variables:

```bash
export CAMUNDA_SECURITY_MULTITENANCY_ENABLED=true
export CAMUNDA_SECURITY_AUTHENTICATION_UNPROTECTEDAPI=false
```

</TabItem>
</Tabs>

:::danger
Disabling multi-tenancy can lead to unexpected behavior if previously enabled with active tenants
:::

## Troubleshooting

### Zeebe is unable to retrieve jobs for a tenant, unable to assign a task to yourself, or Operate retry is not functioning

If multi-tenancy is enabled, you may encounter the following issues:

- **Zeebe is unable to retrieve jobs for a tenant** when canceling or retrying via **Operate** or **Tasklist**.
- You see the error `Task could not be assigned - Service is not reachable` when attempting to assign a task to yourself in **Tasklist**.
- **Retry operations in Operate do not function** as expected.

These issues typically occur because the **Zeebe client used by Operate and Tasklist does not have access to the required tenant(s).** This access must be explicitly granted.

#### How to fix it

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

For additional details, refer to the documentation on [assigning applications to a tenant](/self-managed/components/management-identity/managing-tenants.md#assign-applications-to-a-tenant-1).
