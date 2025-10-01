---
id: api-versions
title: "Tasklist API versions"
sidebar_label: "API versions"
description: "Learn about the differences between Tasklist based on V1 and V2 API, and how to migrate."
---

Tasklist can be used in two modes: V1 (legacy) and V2:

- Tasklist V1 is based on the deprecated [Tasklist API](../../apis-tools/tasklist-api-rest/tasklist-api-rest-overview.md).
- Tasklist V2 is based on the new [Orchestration Cluster API](../../apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md).

**Camunda recommend using V2 for all new projects and migrating existing applications from V1.**

## Tasklist based on V2 API

Tasklist V2 uses the Orchestration Cluster API, providing a more robust and performant experience.

Key benefits of using V2 include:

- **Improved performance:** The Orchestration Cluster API is optimized for faster performance and response times.
- **Recommended user task implementation:** It uses the [Camunda user task implementation type](../modeler/bpmn/user-tasks/user-tasks.md#camunda-user-tasks), which is the successor of the deprecated [Job
  worker-based user tasks](../modeler/bpmn/user-tasks/user-tasks.md#job-worker-implementation).
- **Unified API:** It aligns with the [Orchestration Cluster API](../../apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md) for a consistent development experience and fine-grained [access control](../concepts/access-control/access-control-overview.md).
- **User task listeners:** [Camunda user tasks](../modeler/bpmn/user-tasks/user-tasks.md#camunda-user-tasks) support [listeners](components/concepts/user-task-listeners.md) to programmatically react to task lifecycle changes. While you can use V1 in combination with user task listeners, there are some [limitations](components/concepts/user-task-listeners.md#limitations-for-tasklist-V1). For the best experience, use V2 and the Orchestration Cluster REST API.

## Migration from V1 to V2

Before migrating to Tasklist V2 API, review the features exclusive to the deprecated V1 API.

:::caution
The following features are only available in Tasklist API V1 and are not supported in V2:

- Job worker-based user tasks
- Draft variables
- User task access restrictions (replaced by [authorization-based access control](../concepts/access-control/authorizations.md))
- Public start forms
- Advanced process filtering (currently limited to search by process definition ID)
- Task context description

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

In Tasklist V2, specifying candidate groups and candidate users in BPMN process definitions currently has no effect on task visibility or assignment. User task permissions are not yet available in the Orchestration Cluster Identity.

If you need to restrict task visibility based on candidate users and groups, use [user task access restrictions](./user-task-access-restrictions.md) with Tasklist V1 mode, or use [authorization-based access control](../concepts/access-control/authorizations.md) for fine-grained access management in V2.

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

### User task access restrictions

[User task access restrictions](./user-task-access-restrictions.md) are only supported when using the Tasklist V1 API. This feature is permanently V1-only and will not be available in V2.

In Tasklist V2, use [authorization-based access control](../concepts/access-control/authorizations.md) to manage user permissions and task visibility instead.
