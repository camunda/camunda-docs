---
id: configuration
title: "Configure global user task listeners"
sidebar_label: "Configure global user task listeners"
description: "Configuration methods for global user task listeners."
---

You can configure global user task listeners at the cluster level:

- [Through the Unified Configuration](#configure-through-unified-configuration).
- [Via the Orchestration Cluster API](#configure-via-orchestration-cluster-api).
- [Via the Admin UI](#configure-via-admin-ui), indirectly using the Orchestration Cluster API.

Use the Unified Configuration if:

- You want to define a static set of global listeners that are always active in the cluster.
- You want to use versioning tools to keep track of configuration changes.

Use the Orchestration Cluster API if:

- You want to dynamically manage listeners without restarting the cluster.
- You want to manage permissions for who can create, update, or delete global listeners through API access control.

The two ways of configuring global listeners can be used at the same time, however it is important to be aware of the behaviour after a cluster restart:

- All listeners defined through the Unified Configuration are recreated after a restart, even if they were deleted through the API before the restart.
- Listeners defined through the API are not affected by restarts, so they remain active in addition to the listeners defined through the Unified Configuration.
- If an `id` conflict occurs between a listener defined through the Unified Configuration and another defined through the API, the listener defined through the Unified Configuration takes precedence and completely replaces the API-defined one.

## Configure through Unified Configuration

You can configure the global user task listeners through the [Unified Configuration](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#camundaclusterglobal-listeners) by setting the appropriate properties under the configuration path `camunda.cluster.global-listeners.user-task`.

Each listener entry can be configured with the properties described in the [Global listener definition](#global-listener-definition) section above, except for the `source` property, which is automatically set to `CONFIGURATION` by the system. Any provided `source` value will be ignored.

### How the configuration is validated

If you provide an invalid configuration, the system attempts to automatically rectify it instead of causing startup to fail. This allows you to fix issues in the configuration without requiring every listener entry to be valid on the first attempt.

The following validation rules are applied automatically on startup:

- If a listener is missing the required `id`, `type`, or `event-types` properties, it is removed.
- If a listener defines invalid event types, those event types are removed. If all event types are invalid, the listener is removed.
  - Valid event types are: `creating`, `assigning`, `updating`, `completing`, `canceling`, or the special value `all`. Event type matching is case-insensitive, so `Creating` and `creating` are both valid, but `create` is not.
- If a listener defines duplicate event types, the duplicates are removed and only one instance of each event type is kept.
- If a listener defines both the special `all` value and a normal event type for `event-types`, the configuration is corrected to include only `all`. This ensures the listener catches all events as intended.
- If a listener defines invalid retry values (non-numeric, negative, or zero), it is removed. Valid retry values are positive integers.

In all the above cases, a warning is written to the Orchestration Cluster startup log identifying the problem location. Invalid listeners are removed while valid ones remain active.

:::note
Listeners defined through the API are not subject to this validation.
:::

### Example configuration

The following is an example YAML configuration and environment variables:

```yaml
camunda:
  cluster:
    global-listeners:
      user-task:
        - id: "validation-listener"
          type: "validate-task"
          event-types:
            - creating
          priority: 70
        - id: "audit-listener"
          type: "audit-generic"
          event-types: all
          retries: 5
          priority: 50
        - id: "notification-listener"
          type: "notify-assignee"
          event-types:
            - assigning
            - updating
            - canceling
          after-non-global: true
          priority: 30
```

```
CAMUNDA_CLUSTER_GLOBAL_LISTENERS_USER_TASK_0_ID=validation-listener
CAMUNDA_CLUSTER_GLOBAL_LISTENERS_USER_TASK_0_TYPE=validate-task
CAMUNDA_CLUSTER_GLOBAL_LISTENERS_USER_TASK_0_EVENT_TYPES_0=creating
CAMUNDA_CLUSTER_GLOBAL_LISTENERS_USER_TASK_0_PRIORITY=70
CAMUNDA_CLUSTER_GLOBAL_LISTENERS_USER_TASK_1_ID=audit-listener
CAMUNDA_CLUSTER_GLOBAL_LISTENERS_USER_TASK_1_TYPE=audit-generic
CAMUNDA_CLUSTER_GLOBAL_LISTENERS_USER_TASK_1_EVENT_TYPES_0=all
CAMUNDA_CLUSTER_GLOBAL_LISTENERS_USER_TASK_1_RETRIES=5
CAMUNDA_CLUSTER_GLOBAL_LISTENERS_USER_TASK_1_PRIORITY=50
CAMUNDA_CLUSTER_GLOBAL_LISTENERS_USER_TASK_2_ID=notification-listener
CAMUNDA_CLUSTER_GLOBAL_LISTENERS_USER_TASK_2_TYPE=notify-assignee
CAMUNDA_CLUSTER_GLOBAL_LISTENERS_USER_TASK_2_EVENT_TYPES_0=assigning
CAMUNDA_CLUSTER_GLOBAL_LISTENERS_USER_TASK_2_EVENT_TYPES_1=updating
CAMUNDA_CLUSTER_GLOBAL_LISTENERS_USER_TASK_2_EVENT_TYPES_2=canceling
CAMUNDA_CLUSTER_GLOBAL_LISTENERS_USER_TASK_2_AFTER_NON_GLOBAL=true
CAMUNDA_CLUSTER_GLOBAL_LISTENERS_USER_TASK_2_PRIORITY=30
```

### Apply changes

Configuration changes take effect after you restart the cluster. Use rolling restarts to avoid downtime.

After the restart, the new configuration applies to new lifecycle events for both running and new instances, without requiring you to redeploy models.

## Configure via Orchestration Cluster API

The [Orchestration Cluster API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md) provides CRUD operations to manage global user task listeners at runtime. This allows you to create, update, and delete listeners without restarting the cluster.

When you create or update a listener through the API, you need to provide the same properties described in the [Global listener definition](#global-listener-definition) section above, except for the `source` property which is automatically set to `API` by the system.

The changes to the global listeners take effect immediately after the API call, applying to new lifecycle events for both running and new instances, without requiring you to redeploy models or restart the cluster.

## Configure via Admin UI

You can visually configure global listeners through the Admin UI, which provides a user-friendly interface to manage the listeners in the **Global Task Listeners** tab.

You can update and delete global listeners through the Admin UI without needing to interact directly with the API or restart the cluster.

The Admin UI uses the Orchestration Cluster API to interact with the global user task listeners configuration, so the exact same considerations apply.

## See also

- [Global listener configuration properties](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#camundaclusterglobal-listeners).
- [Configure properties through Helm charts](/self-managed/deployment/helm/configure/application-configs.md).
- [Orchestration Cluster API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md).
