---
id: index
title: Audit log
sidebar_label: Audit log
description: A high-level overview of the audit log in Camunda 8.
---

With the [audit log](../../../components/audit-log/overview.md), you'll access a record of operations, including who performed them, when, and on which entities.

## Impact on secondary storage

When the audit log is active, a record is written to [secondary storage](../../concepts/secondary-storage/index.md) for every applicable operation instance. Because of this, you can expect an increase in disk usage by a factor of 1.5 to 2.0.

:::warning
The audit log is enabled by default. Because of the increase in resource usage on secondary storage, you may see increased costs associated with this feature.
:::

You can [configure the audit log](./configure.md) to fine tune log thoroughness and resource usage according to your needs.
