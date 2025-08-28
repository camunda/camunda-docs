---
id: history
title: History (experimental)
sidebar_label: History (experimental)
description: "Copy audit trail (history) data from Camunda 7 to Camunda 8. Experimental and not for production."
---

:::info
The history migration mode of the Data Migrator will **not be release before Camunda 8.9 (April 2026)**. You can check the current state and track progress in the [Github repository](https://github.com/camunda/camunda-7-to-8-data-migrator/).
:::

Process instances left traces, referred to as [History in Camunda 7](https://docs.camunda.org/manual/latest/user-guide/process-engine/history/). These are audit logs of when a process instance was started, what path it took, and so on.

It is important to note that audit data can exist for ended processes from the past, but is also available for currently still running process instances, as those process instances also left traces up to the current wait state.

The History Data Migrator can copy this audit data to Camunda 8.

Audit data migration might need to look at a huge amount of data, which can take time to migrate. In early measurements, migrating 10,000 process instances took around 10 minutes, but the number varies greatly based on the amount of data attached to a process instance (for example, user task instances, variable instances, and so on).

You can run audit data migration alongside normal operations (for example, after the successful big bang migration of runtime process instances) so that it doesn't require downtime and as such, the performance might not be as critical as for runtime instance migration.

**Requirements and limitations:**

- The History Data Migrator needs to access the Camunda 7 database.
- The History Data Migrator can only migrate to Camunda 8 **if a relational database (RDBMS) is used**, a feature planned for **Camunda 8.9**.
- The History Data Migrator needs to access the Camunda 8 database (which means you can only run this tool in a **self-managed environment**).
- If runtime and history data are migrated at the same time, you will end up with two instances in Camunda 8: a canceled historic process instance and an active new one in the runtime. They are linked by process variables.

## Usage examples

```bash
# Run history migration (experimental)
./start.sh --history

# List all skipped history entities
./start.sh --history --list-skipped

# List skipped entities for specific types
./start.sh --history --list-skipped HISTORY_PROCESS_INSTANCE HISTORY_USER_TASK

# Retry skipped history entities
./start.sh --history --retry-skipped
```

## Entity types

- `HISTORY_PROCESS_DEFINITION` - Process definitions
- `HISTORY_PROCESS_INSTANCE` - Process instances
- `HISTORY_INCIDENT` - Process incidents
- `HISTORY_VARIABLE` - Process variables
- `HISTORY_USER_TASK` - User tasks
- `HISTORY_FLOW_NODE` - Flow node instances
- `HISTORY_DECISION_INSTANCE` - Decision instances
- `HISTORY_DECISION_DEFINITION` - Decision definitions
