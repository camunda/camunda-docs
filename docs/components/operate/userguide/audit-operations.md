---
id: audit-operations
title: Audit operations
description: "Learn how to audit operations."
---

Audit [operations](../../user-operations-audit-log/overview.md) in Camunda 8 Operate.

## Prerequisites

To follow the steps in this guide, you must be [authorized to view operations in the audit log](../../user-operations-audit-log/overview/access-control.md).

## Audit all operations

In Operate, you can audit all [`DEPLOYED_RESOURCES` and `USER_TASKS` operations](../../user-operations-audit-log/overview/recorded-operations.md) in the general operations log:

1. In the top navigation, click **Operations Log**.
2. To filter the log, click a column header.
3. To see the details of a particular operation, click the info icon at the end of the row.

## Audit process instance operations

You can also review operations at the process instance level:

1. On the **Processes** page, in the **Process Instances** table, click the **Process Instance Key** of the instance you want to audit.
2. Under the process diagram, click **Operations Log**.
3. To filter the log, click a column header.
4. To see the details of a particular operation, click the info icon at the end of the row.

## Next steps

- [Learn about the operation data structure in the operations log.](../../user-operations-audit-log/overview/operation-structure.md)
- [Use the Audit Log REST API to programmatically access the audit log](../../../apis-tools/orchestration-cluster-api-rest/specifications/search-audit-logs.api.mdx).
