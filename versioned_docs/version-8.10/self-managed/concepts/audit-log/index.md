---
id: index
title: Audit log
sidebar_label: Audit log
description: A high-level overview of the audit log in Camunda 8.
---

Use the [audit log](../../../components/audit-log/overview.md) to access a record of operations, including who performed the operation, when it was performed, and on which entities the operation was performed.

## Impact on secondary storage

When the audit log is active, a record is written to [secondary storage](../../concepts/secondary-storage/index.md) for every applicable operation instance. By default, only user operations are tracked, not [client](/components/zeebe/technical-concepts/architecture.md#clients) operations. With this default behavior, you can expect a 3.5% increase in disk usage.

:::warning
The audit log is enabled by default. Because of the increase in resource usage on secondary storage, you may see increased costs associated with this feature.
:::

You can [configure the audit log](./configure.md) to fine tune log thoroughness and resource usage according to your needs.
