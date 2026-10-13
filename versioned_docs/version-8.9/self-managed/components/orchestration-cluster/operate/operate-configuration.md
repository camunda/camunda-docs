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

Review the [secondary storage documentation](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#secondary-storage) and [secondary storage configuration](/self-managed/concepts/secondary-storage/configuring-secondary-storage.md).

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

Operate shows an **Open Tasklist** link for user tasks in the **Details** tab of a process instance. Operate only renders the link if you configure the Tasklist URL. By default, the property is unset, and Operate omits the link without displaying an error.

:::note
The link only appears for Camunda user tasks, not for job worker-based user tasks, and only if Tasklist is part of your deployment.
:::

| Name                                                         | Description                                                | Default value |
| ------------------------------------------------------------ | ---------------------------------------------------------- | ------------- |
| camunda.operate.tasklist-url (`CAMUNDA_OPERATE_TASKLISTURL`) | Absolute base URL of Tasklist used to build the deep link. | null          |

For a unified Orchestration Cluster, set the URL to the Tasklist path of your cluster, for example `http://localhost:8080/tasklist` or `https://<host>/<context-path>/tasklist`.

### Snippet from application.yml

```yaml
camunda.operate:
  tasklist-url: http://localhost:8080/tasklist
```

## Monitoring Operate

See the [core settings documentation](/self-managed/components/orchestration-cluster/core-settings/concepts/monitoring.md).

## Logging

See the [core settings documentation](/self-managed/components/orchestration-cluster/core-settings/configuration/logging.md).

## Backups

See the [core settings documentation](/self-managed/components/orchestration-cluster/core-settings/concepts/backups.md).
