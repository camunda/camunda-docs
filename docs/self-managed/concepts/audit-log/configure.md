---
id: configure-audit-log
title: Configure the audit log
sidebar_label: Configure the audit log
description: Configure the user operations audit log in Camunda 8 Self-Managed.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Configure the user operations audit log in Camunda 8 Self-Managed.

## Configure recorded operations

By default, the audit log is enabled and only user operations are tracked. To change the default behavior, such as to disable the audit log or record [client](../../../components/zeebe/technical-concepts/architecture.md#clients) and agent operations, you must configure your deployment:

<Tabs groupId="configType" defaultValue="application.yaml">
<TabItem value="application.yaml" label="Application properties">

```yaml
camunda:
  data:
    audit-log:
      enabled: true
      user:
        categories: [DEPLOYED_RESOURCES, USER_TASKS, ADMIN] # User operations are recorded by default
      client:
        categories: [DEPLOYED_RESOURCES, USER_TASKS, ADMIN] # You must opt in to client operations
```

</TabItem>
<TabItem value="env" label="Environment variables">

```bash
CAMUNDA_DATA_AUDITLOG_ENABLED=true

# User operations are recorded by default
CAMUNDA_DATA_AUDITLOG_USER_CATEGORIES_0=DEPLOYED_RESOURCES
CAMUNDA_DATA_AUDITLOG_USER_CATEGORIES_1=USER_TASKS
CAMUNDA_DATA_AUDITLOG_USER_CATEGORIES_2=ADMIN

# You must opt in to client operations
CAMUNDA_DATA_AUDITLOG_CLIENT_CATEGORIES_0=DEPLOYED_RESOURCES
CAMUNDA_DATA_AUDITLOG_CLIENT_CATEGORIES_1=USER_TASKS
CAMUNDA_DATA_AUDITLOG_CLIENT_CATEGORIES_2=ADMIN
```

</TabItem>
<TabItem value="helm" label="Helm">

```yaml
orchestration:
  extraConfiguration:
    - file: additional-spring-properties.yaml
      content: |
        audit-log:
          enabled: true
          user:  
            categories: DEPLOYED_RESOURCES,USER_TASKS,ADMIN
          client:
            categories: DEPLOYED_RESOURCES,USER_TASKS,ADMIN
```

</TabItem>
</Tabs>

See [all configuration options](../../components/orchestration-cluster/core-settings/configuration/properties.md#camundadataaudit-log) to learn more.

## Configure secondary storage retention

With Camunda 8 Self-Managed, you control the [secondary storage retention policy](../../components/orchestration-cluster/core-settings/configuration/properties.md#data---secondary-storage), which applies to user operations audit log records:

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
