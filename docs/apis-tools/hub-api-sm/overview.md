---
id: overview
title: "Camunda Hub API (Self-Managed)"
sidebar_position: 1
description: "Manage Camunda Hub resources with the Camunda Hub API v2."
---

import PageDescription from '@site/src/components/PageDescription';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<PageDescription />

:::note
The Camunda Hub API is not exposed, by default, in Camunda 8 Self-Managed.

Enable it with the public API v2 feature flag, and restart the service:

<Tabs groupId="configType" defaultValue="application.yaml">
<TabItem value="application.yaml" label="Application properties">

```yaml
camunda:
  modeler:
    feature:
      public-api-v2-enabled: true
```

</TabItem>
<TabItem value="env" label="Environment variables">

```bash
CAMUNDA_MODELER_FEATURE_PUBLIC_API_V2_ENABLED=true
```

</TabItem>
</Tabs>
:::

## Authentication

See the [authentication guide](/apis-tools/hub-api-sm/authentication.md) for setup instructions.

## Migrating from Web Modeler API v1

Web Modeler API v1 is deprecated in Camunda 8.10 and will be removed in 8.12. [Migrate](/apis-tools/hub-api-sm/overview.md) to Camunda Hub REST API v2 before upgrading to 8.12.
