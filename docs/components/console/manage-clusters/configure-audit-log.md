---
id: configure-audit-log
title: Configure the audit log
description: "Configure the audit log to determine which user and client operations are recorded."
---

Configure the [audit log](../../audit-log/overview.md) in Camunda 8 SaaS.

## About

The audit log is an important feature with which you can meet regulatory requirements and maintain operational integrity by accessing a record of operations. These records include who performed the operations, when, and on which entities.

The audit log is enabled by default, and the storage it requires may result in increased costs. To mitigate these resource costs, only user operations are tracked by default, not [client](../../zeebe/technical-concepts/architecture.md#clients) operations.

In Camunda 8 SaaS, you can change the default behavior in Camunda Hub. You can choose which user and client operations are recorded to fine-tune log thoroughness and resource usage according to your needs. You can also disable the audit log.

:::note
This feature is only available for SaaS clusters using Camunda 8.9 and above. If you're using Camunda 8 Self-Managed, see the [Self-Managed guide](../../../self-managed/concepts/audit-log/configure.md).
:::

## Configure the audit log

1. In **Camunda Hub**, open **Clusters**.
2. Select an applicable cluster.
3. From the cluster configurations tabs, select **Audit Log**.
4. Select the user operations and client operations to record.
5. Click **Update**.

## Enable or disable the audit log

1. In **Camunda Hub**, open **Clusters**.
2. Select an applicable cluster.
3. From the cluster configurations tabs, select **Audit Log**.
4. Click **Enable audit log** or **Disable audit log**, depending on the state of your cluster.

When disabled, new operations are not recorded. Changing this setting doesn't cause the existing audit log data to be immediately purged. Instead, it will be cleaned up according to the secondary storage retention settings. Until then, you can continue to access the data in [Operate](../../operate/userguide/audit-operations.md), [Tasklist](../../tasklist/userguide/audit-task-history.md), [Admin](../../admin/audit-operations.md), and the [Search API](/apis-tools/orchestration-cluster-api-rest/specifications/search-audit-logs.api.mdx).
