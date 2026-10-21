---
id: operate-configuration
title: Configuration
---

As a Spring Boot application, Operate supports any standard
[Spring configuration](https://docs.spring.io/spring-boot/reference/features/external-config.html) method.

By default, the configuration for Operate is stored in a YAML file (`application.yml`). All Operate-related settings are prefixed with `camunda.operate`.

:::note
Configuration properties can be defined as environment variables using [Spring Boot conventions](https://docs.spring.io/spring-boot/reference/features/external-config.html#features.external-config.typesafe-configuration-properties.relaxed-binding.environment-variables). To define an environment variable, convert the configuration property to uppercase, remove any dashes, and replace any delimiters (`.`) with `_`.

For example, the property `camunda.operate.elasticsearch.clustername` is represented by the environment variable `CAMUNDA_OPERATE_ELASTICSEARCH_CLUSTERNAME`.
:::

The following parts are configurable:

## Licensing

See the [core settings documentation](/self-managed/components/orchestration-cluster/core-settings/configuration/licensing.md).

## Webserver and security

See the [core settings documentation](/self-managed/components/orchestration-cluster/core-settings/configuration/webserver.md).

## Secondary storage

Review the [secondary storage documentation](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#data---secondary-storage) and [secondary storage configuration](/self-managed/concepts/secondary-storage/configuring-secondary-storage.md).

## Operation executor

Operations are user operations, like cancellation of process instance(s) or updating the variable value.

Operations are executed in a multi-threaded manner.

| Name                                           | Description                      | Default value |
| ---------------------------------------------- | -------------------------------- | ------------- |
| camunda.operate.operationExecutor.threadsCount | How many threads should be used. | 3             |

### Snippet from application.yml

```yaml
camunda.operate:
  operationExecutor:
    threadsCount: 3
```

## Tasklist link

Operate shows an **Open Tasklist** link for user tasks in the process instance **Details** tab and in the operations log. The link targets the Tasklist of the same Orchestration Cluster.

| Name                         | Description                                                                                                                       | Default value                                  |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| camunda.operate.tasklist-url | Base URL of Tasklist used for the link. Accepts an absolute URL or a path relative to the Operate host (for example `/tasklist`). | `<context-path>/tasklist` (derived, see below) |

If the property is not set and the Operate and Tasklist UIs are served by the same application, Operate derives the default from the configured context path, so the link works without extra configuration.

If Tasklist is served by a separate application, the property remains unset and Operate hides the Tasklist links, even if a proxy exposes Tasklist on the same host. In this case, set the property explicitly, for example in a split deployment:

```yaml
camunda.operate:
  tasklist-url: https://tasklist.example.com
```

:::note
The derived default and support for relative paths such as `/tasklist` are only available in patch releases that include this fix. In earlier patch releases, the property has no default and requires an absolute URL, so set an absolute URL to show the links.
:::

The corresponding environment variable is `CAMUNDA_OPERATE_TASKLISTURL`.

## Monitoring Operate

See the [core settings documentation](/self-managed/components/orchestration-cluster/core-settings/concepts/monitoring.md).

## Logging

See the [core settings documentation](/self-managed/components/orchestration-cluster/core-settings/configuration/logging.md).

## Backups

See the [core settings documentation](/self-managed/components/orchestration-cluster/core-settings/concepts/backups.md).
