---
id: api-versions
title: "Tasklist API versions"
sidebar_label: "API versions"
description: "Learn about the differences between Tasklist based on V1 and V2 API, and how to migrate."
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
- Unified API: It aligns with the [Orchestration Cluster API](../../apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md) for a consistent development experience and fine-grained [access control](../concepts/access-control/access-control-overview.md) at the process-definition level.
- User task listeners: [Camunda user tasks](../modeler/bpmn/user-tasks/user-tasks.md#camunda-user-tasks) support [listeners](components/concepts/user-task-listeners.md) to programmatically react to task lifecycle changes. While you can use V1 in combination with user task listeners, there are some [limitations](components/concepts/user-task-listeners.md#limitations-for-tasklist-V1). For the best experience, use V2 and the Orchestration Cluster REST API.

## Migration from V1 to V2

Before migrating to Tasklist V2 API, review the features exclusive to the deprecated V1 API.

:::caution
The following features are only available in Tasklist API V1 and are not supported in V2:

- Job worker-based user tasks.
- Draft variables.
- User task access restrictions (not supported in V2; see [authorization-based access control](../concepts/access-control/authorizations.md) for process-definition–level access management).
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

In Tasklist V2, specifying candidate groups and candidate users in BPMN process definitions currently has no effect on task visibility or assignment.

If you need to restrict which users can see or claim individual tasks, use
[user task access restrictions](./user-task-access-restrictions.md) with Tasklist V1.

Tasklist V2 does not support candidate users or candidate groups for task visibility or assignment.
[Authorization-based access control](../concepts/access-control/authorizations.md) in V2 provides
fine-grained access at the process-definition level.

### Variable semantics

Tasklist V1 returns variables for completed tasks as they were at completion time. When a task is completed via the V1 API, Tasklist persists a snapshot of all visible variables. V1 task search for completed tasks reads only this snapshot.

Tasklist V2 returns variables as runtime state. User task variable search endpoints always reflect the latest values and do not store an immutable “value at completion” snapshot.

For compatibility, when a task is completed via the V2 API, Tasklist persists a snapshot of only the variables explicitly included in the completion request.

Because of this, mixing APIs for the same user task can lead to unexpected results. For example, if you complete a task via Tasklist V2 and then query it via Tasklist V1, V1 results show only the variables explicitly sent in the V2 completion request. Other in-scope process variables are not included.

:::warning Avoid mixing Tasklist V1 and V2 APIs during migration
To prevent unexpected variable results, avoid using Tasklist V1 and V2 APIs on the same tasks during migration.
:::

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

For details about authorization changes in the V1 API, see the [migration guide](../../apis-tools/migration-manuals/migrate-component-apis.md#mapping-tasklist-permissions-to-new-authorizations).

When switching between V1 and V2 mode, review and update authorizations to match the active mode.

### User task access restrictions

[User task access restrictions](./user-task-access-restrictions.md) are only supported when using the Tasklist V1 API and are not supported in V2.

Tasklist V2 does not support task-level visibility restrictions.
[Authorization-based access control](../concepts/access-control/authorizations.md) applies only
at the process-definition level and does not limit access to individual tasks.
