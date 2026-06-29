---
id: configure-wait-states
title: Configure wait state tracking
sidebar_label: Wait states
description: Configure wait state tracking in Camunda 8 Self-Managed.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Configure [wait state tracking](/components/wait-states/overview.md) in Camunda 8 Self-Managed.

## Enable or disable wait state tracking

Wait state tracking is enabled by default. You can disable it if you do not want to track this data.

To change the default behavior in Camunda 8 Self-Managed, configure your deployment:

<Tabs groupId="configType" defaultValue="application.yaml">
<TabItem value="application.yaml" label="Application properties">

```yaml
camunda:
  data:
    wait-states:
      enabled: true # Wait state tracking is enabled by default
```

</TabItem>
<TabItem value="env" label="Environment variables">

```bash
CAMUNDA_DATA_WAITSTATES_ENABLED=true
```

</TabItem>
<TabItem value="helm" label="Helm">

```yaml
orchestration:
  extraConfiguration:
    - file: additional-spring-properties.yaml
      content: |
        camunda:
          data:
            wait-states:
              enabled: true # Wait state tracking is enabled by default
```

</TabItem>
</Tabs>

See [all configuration options](../../components/orchestration-cluster/core-settings/configuration/properties.md#camundadatawait-states) to learn more.

Disabling wait state tracking stops new wait states from being tracked. It doesn't purge existing wait state data immediately. The secondary storage retention settings clean up that data over time. Until the data is cleaned up, you can continue to access it in [Operate](/components/operate/userguide/view-wait-states.md) and the [Search API](/apis-tools/orchestration-cluster-api-rest/specifications/search-element-instance-wait-states.api.mdx).

## Configure secondary storage retention

With Camunda 8 Self-Managed, you control the [secondary storage retention policy](../../components/orchestration-cluster/core-settings/configuration/properties.md#data---secondary-storage), which applies to wait state records:

<Tabs groupId="configType" defaultValue="application.yaml">
<TabItem value="application.yaml" label="Application properties">

```yaml
camunda:
  data:
    secondary-storage:
      retention:
        enabled: true
        minimum-age: 30d
```

</TabItem>
<TabItem value="env" label="Environment variables">

```bash
CAMUNDA_DATA_SECONDARYSTORAGE_RETENTION_ENABLED=true
CAMUNDA_DATA_SECONDARYSTORAGE_RETENTION_MINIMUMAGE=30d
```

</TabItem>
<TabItem value="helm" label="Helm">

```yaml
orchestration:
  retention:
    enabled: true
    minimumAge: 30d
```

See [Configure data retention](../../deployment/helm/configure/data-retention.md) for more information about the Helm configuration.

</TabItem>
</Tabs>
