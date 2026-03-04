---
id: configure-audit-log
title: Configure the audit log
sidebar_label: Configure the audit log
description: Configure the audit log in Camunda 8 Self-Managed.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Configure the audit log in Camunda 8 Self-Managed.

## Configure recorded operations

The audit log is an important feature with which you can meet regulatory requirements and maintain operational integrity by accessing a record of operations. These records include who performed the operations, when, and on which entities. The audit log is enabled by default, and the storage it requires may result in increased costs. To mitigate these resource costs, only user operations are tracked by default, not [client](../../../components/zeebe/technical-concepts/architecture.md#clients) operations.

To change the default behavior in Camunda 8 Self-Managed, such as to disable the audit log or configure recorded operations, you must configure your deployment:

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

If you disable the audit log, new operations are no longer recorded. Changing this setting doesn't cause the existing audit log data to be immediately purged. Instead, it will be cleaned up according to the secondary storage retention settings. Until the data is cleaned up, you can continue to access the data in [Operate](../../../components/operate/userguide/audit-operations.md), [Tasklist](../../../components/tasklist/userguide/audit-task-history.md), [Identity](../../../components/identity/audit-operations.md), and the [Search API](/apis-tools/orchestration-cluster-api-rest/specifications/search-audit-logs.api.mdx).

## Configure secondary storage retention

With Camunda 8 Self-Managed, you control the [secondary storage retention policy](../../components/orchestration-cluster/core-settings/configuration/properties.md#data---secondary-storage), which applies to audit log records:

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
