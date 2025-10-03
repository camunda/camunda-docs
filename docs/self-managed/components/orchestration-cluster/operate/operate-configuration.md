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

## Elasticsearch or OpenSearch

See the [secondary storage documentation](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#secondary-storage).

## Zeebe Elasticsearch or OpenSearch exporter

:::note
**Version 8.8:** The importer is required only for brownfield deployments (upgrades from 8.7). Keep it enabled until all remaining 8.7 records have been imported. After that, the [Camunda Exporter](/self-managed/components/orchestration-cluster/zeebe/exporters/camunda-exporter.md) takes over and writes directly to the Operate indices. The importer can then be safely disabled for subsequent restarts or deployments.
:::

For Elasticsearch, Operate imports data from indices created and filled in by the [Zeebe Elasticsearch exporter](../zeebe/exporters/elasticsearch-exporter.md).

For OpenSearch, Operate imports data from indices created and filled in by the [Zeebe OpenSearch exporter](../zeebe/exporters/opensearch-exporter.md).

Therefore, settings for this Elasticsearch or OpenSearch connection must be defined and must correspond to the settings on the Zeebe side.

### Settings to connect and import

See also [settings to connect to a secured Elasticsearch instance](#settings-to-connect-to-a-secured-elasticsearch-instance) or [settings to connect to a secured OpenSearch instance](#settings-to-connect-to-a-secured-opensearch-instance).

:::note
You may need to import the certificate keystore into the JVM runtime.

```yaml
# Kubernetes example:
zeebe:
  …
  javaOpts: >-
    …
    -Djavax.net.ssl.trustStore=/path/to/certificates/elasticsearch.jks
```

:::

| Name                                                   | Description                                                | Default value         |
| ------------------------------------------------------ | ---------------------------------------------------------- | --------------------- |
| camunda.operate.zeebeElasticsearch.clusterName         | Cluster name of Elasticsearch                              | elasticsearch         |
| camunda.operate.zeebeElasticsearch.url                 | URL of Zeebe Elasticsearch REST API                        | http://localhost:9200 |
| camunda.operate.zeebeElasticsearch.prefix              | Index prefix as configured in Zeebe Elasticsearch exporter | zeebe-record          |
| camunda.operate.zeebeElasticsearch.username            | Username to access Elasticsearch REST API                  | -                     |
| camunda.operate.zeebeElasticsearch.password            | Password to access Elasticsearch REST API                  | -                     |
| camunda.operate.zeebeElasticsearch.ssl.certificatePath | Path to certificate used by Elasticsearch                  | -                     |
| camunda.operate.zeebeElasticsearch.ssl.selfSigned      | Certificate was self-signed                                | false                 |
| camunda.operate.zeebeElasticsearch.ssl.verifyHostname  | Should the hostname be validated                           | false                 |

### Snippet from application.yml for Elasticsearch

```yaml
camunda.operate:
  zeebeElasticsearch:
    # Cluster name
    clusterName: elasticsearch
    # Url
    url: https://localhost:9200
    # Index prefix, configured in Zeebe Elasticsearch exporter
    prefix: zeebe-record
```

Example for OpenSearch:

| Name                                                | Description                                             | Default value         |
| --------------------------------------------------- | ------------------------------------------------------- | --------------------- |
| camunda.operate.zeebeOpensearch.clusterName         | Cluster name of OpenSearch                              | opensearch            |
| camunda.operate.zeebeOpensearch.url                 | URL of Zeebe OpenSearch REST API                        | http://localhost:9200 |
| camunda.operate.zeebeOpensearch.prefix              | Index prefix as configured in Zeebe OpenSearch exporter | zeebe-record          |
| camunda.operate.zeebeOpensearch.username            | Username to access OpenSearch REST API                  | -                     |
| camunda.operate.zeebeOpensearch.password            | Password to access OpenSearch REST API                  | -                     |
| camunda.operate.zeebeOpensearch.ssl.certificatePath | Path to certificate used by OpenSearch                  | -                     |
| camunda.operate.zeebeOpensearch.ssl.selfSigned      | Certificate was self-signed                             | false                 |
| camunda.operate.zeebeOpensearch.ssl.verifyHostname  | Should the hostname be validated                        | false                 |

### Snippet from application.yml for OpenSearch

```yaml
camunda.operate:
  zeebeOpensearch:
    # Cluster name
    clusterName: opensearch
    # Url
    url: https://localhost:9200
    # Index prefix, configured in Zeebe OpenSearch exporter
    prefix: zeebe-record
```

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

## Monitoring Operate

Operate includes [Spring Boot Actuator](https://docs.spring.io/spring-boot/docs/current/reference/html/production-ready-features.html#production-ready) inside. This provides the number of monitoring possibilities.

Operate uses the following Actuator configuration by default:

```yaml
# Disable default health indicators
# https://docs.spring.io/spring-boot/docs/current/reference/html/production-ready-features.html#production-ready-health-indicators
management.health.defaults.enabled: false
# enable Kubernetes health groups:
# https://docs.spring.io/spring-boot/docs/current/reference/html/production-ready-features.html#production-ready-kubernetes-probes
management.health.probes.enabled: true
# enable several Actuator endpoints
management.endpoints.web.exposure.include: health, prometheus, loggers, usage-metrics, backup
```

With this configuration, the following endpoints are available for use out of the box:

`<server>:9600/actuator/prometheus` Prometheus metrics

`<server>:9600/actuator/health/liveness` Liveness probe

`<server>:9600/actuator/health/readiness` Readiness probe

This configuration may be overwritten by changing the corresponding configuration parameters values.

## Logging

See the [core settings documentation](/self-managed/components/orchestration-cluster/core-settings/configuration/logging.md).

## Backups

You must configure the following on your chosen database:

- [Elasticsearch snapshot repository](https://www.elastic.co/guide/en/elasticsearch/reference/current/snapshot-restore.html)
- [OpenSearch snapshot repository](https://docs.opensearch.org/docs/latest/tuning-your-cluster/availability-and-recovery/snapshots/snapshot-restore/)

Operate is configured with the snapshot repository name to trigger database snapshots. This is important for coherent backups.

:::info
Learn more about the procedure and the need to trigger it through Camunda components in the [backup guide](/self-managed/operational-guides/backup-restore/backup-and-restore.md).
:::

Operate must be configured with the repository name:

| Name                                  | Description                      | Default value |
| ------------------------------------- | -------------------------------- | ------------- |
| camunda.operate.backup.repositoryName | ES / OS snapshot repository name | -             |

:::warning breaking change
Configuring Operate and Tasklist with different repository names will potentially create multiple backups in different repositories. Therefore, use the same `repositoryName` for both components.
:::
