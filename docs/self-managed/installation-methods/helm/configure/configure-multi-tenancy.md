---
id: configure-multi-tenancy
title: "Configure multi-tenancy"
sidebar_label: "Configure multi-tenancy"
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
