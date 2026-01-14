---
id: api-versions
title: "Tasklist API versions"
sidebar_label: "API versions"
description: "Learn about the differences between Tasklist V1 and V2 APIs and how to migrate."
---

Tasklist can be used in two modes: V1 (legacy) and V2:

- Tasklist V1 is based on the deprecated [Tasklist API](../../apis-tools/tasklist-api-rest/tasklist-api-rest-overview.md).
- Tasklist V2 is based on the new [Orchestration Cluster API](../../apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md).

Camunda recommends using V2 for all new projects and migrating existing applications from V1.

## Tasklist based on V2 API

Tasklist V2 uses the Orchestration Cluster API, providing a more robust and performant experience.

Key benefits of using V2 include:

- Improved performance: The Orchestration Cluster API is optimized for faster performance and response times.
- Recommended user task implementation: It uses the [Camunda user task implementation type](../modeler/bpmn/user-tasks/user-tasks.md#camunda-user-tasks), which is the successor of the deprecated [Job worker-based user tasks](../modeler/bpmn/user-tasks/user-tasks.md#job-worker-implementation).
- Unified API: It aligns with the [Orchestration Cluster API](../../apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md) for a consistent development experience and fine-grained [access control](../concepts/access-control/access-control-overview.md) at the process and task level.
- User task listeners: [Camunda user tasks](../modeler/bpmn/user-tasks/user-tasks.md#camunda-user-tasks) support [listeners](components/concepts/user-task-listeners.md) to programmatically react to task lifecycle changes. While you can use V1 in combination with user task listeners, there are some [limitations](components/concepts/user-task-listeners.md#limitations-for-tasklist-V1). For the best experience, use V2 and the Orchestration Cluster REST API.

## Migration from V1 to V2

Before migrating to Tasklist V2 API, review the features exclusive to the deprecated V1 API.

:::caution
The following features are only available in Tasklist API V1 and are not supported in V2:

- Job worker-based user tasks.
- Draft variables.
- User task access restrictions (V1-only; in V2, use [authorization-based access control](../concepts/access-control/authorizations.md) with `PROCESS_DEFINITION` and `USER_TASK` permissions for process- and task-level access management).
- Public start forms.
- Advanced process filtering (limited to search by process definition ID).
- Task context description.
- Searching for user tasks with variable filters will not include tasks created prior to the upgrade to version 8.8.

Ensure your application does not rely on these features before upgrading to the V2 API.
:::

### Deprecation timeline

The Tasklist V1 API follows a phased deprecation schedule:

| Version      | Status                                                                                                                                                                                                                           |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Camunda 8.8  | V2 API is the default and recommended option. V1 API is deprecated but remains available via [configuration](/self-managed/components/orchestration-cluster/tasklist/tasklist-configuration.md#tasklist-api-mode-configuration). |
| Camunda 8.9  | V1 API remains deprecated and is not recommended for new implementations.                                                                                                                                                        |
| Camunda 8.10 | V1 API is removed. V2 API is the only available option.                                                                                                                                                                          |

:::info
The Tasklist V1 UI mode will remain available until Camunda 8.10, allowing time for migration during the deprecation period.
:::

### Candidate groups and users

In Tasklist V1, candidate users and candidate groups are evaluated by
[user task access restrictions](./user-task-access-restrictions.md) to control which users can see
and claim tasks.

In Tasklist V2, candidate users and candidate groups are task properties used by
[authorization-based access control](../concepts/access-control/authorizations.md):

- Process-level permissions such as `PROCESS_DEFINITION.READ_USER_TASK` and `PROCESS_DEFINITION.UPDATE_USER_TASK` allow managers to see and work on all user tasks of a process.
- Task-level `USER_TASK` permissions, combined with property-based access control on `assignee`, `candidate users`, and `candidate groups`, allow task workers to see and work only on tasks where they are involved (for example, they are the assignee, a candidate user, or belong to a candidate group).

Together, these rules determine which users can see or claim individual tasks in Tasklist V2.

## Switching between V1 and V2 modes

### SaaS configuration

In Camunda 8 SaaS, Tasklist V2 mode is enabled by default starting with version 8.8. The mode cannot be changed via Console UI for SaaS clusters.

### Self-Managed configuration

For Self-Managed installations, you can configure the Tasklist mode using an environment variable:

```bash
CAMUNDA_TASKLIST_V2_MODE_ENABLED=false
```

Set this variable to `false` to continue using Tasklist V1 mode during the migration period. By default, this is set to `true` in Camunda 8.8+.

:::tip
For detailed configuration options, including YAML configuration, see the [Tasklist configuration guide](/self-managed/components/orchestration-cluster/tasklist/tasklist-configuration.md#tasklist-api-mode-configuration).
:::

### Authorization differences

Tasklist V2 uses fine-grained [authorization-based access control](../concepts/access-control/authorizations.md). In Tasklist V1 API mode, access to resources requires wildcard authorizations.

In Tasklist V2, authorizations include:

- Process-level permissions such as `PROCESS_DEFINITION.READ_USER_TASK` and `PROCESS_DEFINITION.UPDATE_USER_TASK`, which allow broad access to all user tasks of a process.
- Task-level `USER_TASK` permissions (for example, `READ`, `UPDATE`, `CLAIM`, `COMPLETE`), which can be combined with property-based access control on the assignee, candidate users, and candidate groups to restrict visibility and actions to relevant tasks.
- A default Task worker role that grants property-based `USER_TASK` permissions so task workers can see, claim, and complete only the tasks they are responsible for.

Process-level permissions take precedence over task-level permissions: if a user already has the relevant `PROCESS_DEFINITION` permissions, additional `USER_TASK` checks are not required for that process.

For details about authorization changes in the V1 API, see the [migration guide](../../apis-tools/migration-manuals/migrate-component-apis.md#mapping-tasklist-permissions-to-new-authorizations).

When switching between V1 and V2 mode, review and update authorizations to match the active mode.

### User task access restrictions

[User task access restrictions](./user-task-access-restrictions.md) are only supported when using the Tasklist V1 API and are not supported in V2.

In Tasklist V2, task-level visibility and actions are controlled by [authorization-based access control](../concepts/access-control/authorizations.md):

- Process-level permissions (for example, `PROCESS_DEFINITION.READ_USER_TASK`, `PROCESS_DEFINITION.UPDATE_USER_TASK`) allow broad access to all user tasks of a process.
- Task-level `USER_TASK` permissions, combined with property-based access control on the assignee, candidate users, and candidate groups, restrict visibility and actions to the tasks a user is responsible for.
