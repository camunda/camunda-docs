---
id: api-versions
title: "Tasklist API versions"
sidebar_label: "API versions"
description: "Learn about the differences between Tasklist V1 and V2 APIs and how to migrate."
---

Tasklist can be used in two modes: V1 (legacy) and V2:

- Tasklist V1 is based on the deprecated [Tasklist API](../../apis-tools/tasklist-api-rest/tasklist-api-rest-overview.md).
- Tasklist V2 is based on the [Orchestration Cluster REST API](../../apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md).

Camunda recommends using Tasklist V2 for all new projects and migrating existing applications from V1.

## Tasklist based on the V2 API

Tasklist V2 uses the Orchestration Cluster REST API, providing a more robust and performant experience.

Key benefits of using V2 include:

- Improved performance and scalability.
- The recommended [Camunda user task implementation](../modeler/bpmn/user-tasks/user-tasks.md#camunda-user-tasks), which replaces deprecated job worker-based user tasks.
- A unified API aligned with the Orchestration Cluster REST API for a consistent development experience.
- Better support for user task listeners compared to Tasklist V1.

## Migration from V1 to V2

Before migrating to the Tasklist V2 API, review the features that are only available in the deprecated V1 API.

The following features are only available in Tasklist API V1 and are not supported in V2:

- Job worker-based user tasks.
- Draft variables.
- User task access restrictions.
- Public start forms.
- Advanced process filtering.
- Task context description.
- Searching for user tasks with variable filters created before upgrading to version 8.8.

Ensure that your application does not rely on these features before upgrading to the V2 API.

## Deprecation timeline

The Tasklist V1 API follows a phased deprecation schedule:

| Version      | Status                                                                                                      |
| :----------- | :---------------------------------------------------------------------------------------------------------- |
| Camunda 8.8  | V2 API is the default and recommended option. V1 API is deprecated but remains available via configuration. |
| Camunda 8.9  | V1 API remains deprecated and is not recommended for new implementations.                                   |
| Camunda 8.10 | V1 API is removed. V2 API is the only available option.                                                     |

:::note
The Tasklist V1 UI mode remains available until Camunda 8.10 to allow time for migration during the deprecation period.
:::

## Switching between V1 and V2 modes

### SaaS configuration

In Camunda 8 SaaS, Tasklist V2 mode is enabled by default in version 8.8 and later. You cannot change this setting in the Console UI for SaaS clusters. To revert to Tasklist V1 mode, contact [Camunda support](https://camunda.com/services/support/), who can update the cluster configuration for you.

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

Tasklist V2 uses authorization-based access control to manage access to user tasks and related resources. This replaces the wildcard-based access model used by the Tasklist V1 API.

In Tasklist V1 API mode, access to user tasks is not evaluated using fine-grained authorizations.

In Tasklist V2 API mode, access to user tasks is evaluated using the Orchestration Cluster authorization model.

This page does not describe authorization behavior in detail. For information about authorization concepts, resources, and configuration, see
[authorization-based access control](../concepts/access-control/authorizations.md).

For details about how existing Tasklist V1 permissions map to the V2 authorization model, see the
[migration guide](../../apis-tools/migration-manuals/migrate-component-apis.md#mapping-tasklist-permissions-to-new-authorizations).

When switching between V1 and V2 modes, review and update authorizations to match the active mode.

### User task access restrictions

[User task access restrictions](./user-task-access-restrictions.md) are supported only when using the Tasklist V1 API and are not supported in Tasklist V2.

In Tasklist V2, access to user tasks is controlled by authorization-based access control rather than user task access restrictions.

For details about authorization behavior in Tasklist V2, see
[authorization-based access control](../concepts/access-control/authorizations.md).
