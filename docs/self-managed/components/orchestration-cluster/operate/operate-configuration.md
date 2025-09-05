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

Operate stores and reads data from Elasticsearch or OpenSearch.

Set the `camunda.operate.database` to the appropriate database.

Valid values are `elasticsearch` (default) and `opensearch`.

Example as environment variable: `CAMUNDA_OPERATE_DATABASE=opensearch`.

:::note
As of the 8.4 release, Operate is now compatible with [Amazon OpenSearch](https://aws.amazon.com/de/opensearch-service/) 2.5.x. Note that using Amazon OpenSearch requires [setting up a new Camunda installation](../../../installation-methods/index.md). A migration from previous versions or Elasticsearch environments is currently not supported.
:::

### Settings to connect

Operate supports [basic authentication](https://www.elastic.co/guide/en/elasticsearch/reference/7.12/setting-up-authentication.html) for Elasticsearch and OpenSearch

Set the appropriate username/password combination in the configuration to use it.

### Settings for Elasticsearch

#### Settings to connect to a secured Elasticsearch instance

To connect to a secured (https) Elasticsearch instance, you normally need to only set the URL protocol
part to `https` instead of `http`. A secured Elasticsearch instance also needs `username` and `password`.
The other SSL settings should only be used in case of connection problems; for example, in disabling
host verification.

:::note
You may need to import the certificate into JVM runtime.
:::

Either set `host` and `port` (deprecated), or `url` (recommended).

| Name                                              | Description                               | Default value         |
| ------------------------------------------------- | ----------------------------------------- | --------------------- |
| camunda.operate.elasticsearch.indexPrefix         | Prefix for index names                    | operate               |
| camunda.operate.elasticsearch.clusterName         | Cluster name of Elasticsearch             | elasticsearch         |
| camunda.operate.elasticsearch.url                 | URL of Elasticsearch REST API             | http://localhost:9200 |
| camunda.operate.elasticsearch.username            | Username to access Elasticsearch REST API | -                     |
| camunda.operate.elasticsearch.password            | Password to access Elasticsearch REST API | -                     |
| camunda.operate.elasticsearch.ssl.certificatePath | Path to certificate used by Elasticsearch | -                     |
| camunda.operate.elasticsearch.ssl.selfSigned      | Certificate was self-signed               | false                 |
| camunda.operate.elasticsearch.ssl.verifyHostname  | Should the hostname be validated          | false                 |

#### Settings for shards and replicas

Operate creates the template with index settings named `operate-<version>_template` that Elasticsearch uses for all Operate indices. These settings can be changed.

The following configuration parameters define the settings:

| Name                                           | Description                                                  | Default value |
| ---------------------------------------------- | ------------------------------------------------------------ | ------------- |
| camunda.operate.elasticsearch.numberOfShards   | How many shards Elasticsearch uses for all Operate indices   | 1             |
| camunda.operate.elasticsearch.numberOfReplicas | How many replicas Elasticsearch uses for all Operate indices | 0             |

These values are applied only on first startup of Operate or during version update. After the Operate
schema is created, settings may be adjusted directly in the Elasticsearch template, and the new settings are applied
to indices created after adjustment.

#### Settings for index templates priority

Camunda 8 creates index templates that Elasticsearch uses for the historical indices. The priority of these templates can be changed.

This is useful when the Elasticsearch provider has some predefined wildcard (with `*` index pattern) index templates with given priority, setting a higher priority for Operate index templates ensures that the correct index mappings and settings are applied on the indices created from these templates.

The following configuration parameter defines the setting:

| Name                                    | Description                                           | Default value   |
| --------------------------------------- | ----------------------------------------------------- | --------------- |
| camunda.database.index.templatePriority | Priority for all index templates created by Camunda 8 | - (no priority) |

:::note
The priority should be different (strictly higher) than that set by the wildcard templates.
:::

#### A snippet from application.yml

```yaml
camunda.operate:
  elasticsearch:
    # Cluster name
    clusterName: elasticsearch
    # Url
    url: https://localhost:9200
    ssl:
      selfSigned: true
```

#### Disable Elasticsearch deprecation logging

When using an Elasticsearch version 8.16.0+ it is recommended to turn off deprecation logging for the Elasticsearch cluster.

```shell
curl -X PUT "http://localhost:9200/_cluster/settings" \
  -H "Content-Type: application/json" \
  -d '{
    "persistent": {
      "logger.org.elasticsearch.deprecation": "OFF"
    }
  }'
```

### Settings for OpenSearch

#### Settings to connect to a secured OpenSearch instance

To connect to a secured (https) OpenSearch instance, you normally need to only set the URL protocol
part to `https` instead of `http`. A secured OpenSearch instance also needs `username` and `password`.

To use AWS credentials instead of basic auth when connecting to Amazon OpenSearch Services, `awsEnabled` must be set.

The other SSL settings should only be used in case of connection problems; for example, in disabling host verification.

:::note
You may need to import the certificate into JVM runtime.
:::

Either set `host` and `port` (deprecated), or `url` (recommended).

| Name                                           | Description                            | Default value         |
| ---------------------------------------------- | -------------------------------------- | --------------------- |
| camunda.operate.opensearch.indexPrefix         | Prefix for index names                 | operate               |
| camunda.operate.opensearch.clusterName         | Cluster name of OpenSearch             | opensearch            |
| camunda.operate.opensearch.url                 | URL of OpenSearch REST API             | http://localhost:9200 |
| camunda.operate.opensearch.username            | Username to access OpenSearch REST API | -                     |
| camunda.operate.opensearch.password            | Password to access OpenSearch REST API | -                     |
| camunda.operate.opensearch.ssl.certificatePath | Path to certificate used by OpenSearch | -                     |
| camunda.operate.opensearch.ssl.selfSigned      | Certificate was self-signed            | false                 |
| camunda.operate.opensearch.ssl.verifyHostname  | Should the hostname be validated       | false                 |
| camunda.operate.opensearch.awsEnabled          | Should AWS credentials be used         | false                 |

#### Settings for shards and replicas

Operate creates the template with index settings named `operate-<version>_template` that OpenSearch uses for all Operate indices. These settings can be changed.

The following configuration parameters define the settings:

| Name                                        | Description                                               | Default value |
| ------------------------------------------- | --------------------------------------------------------- | ------------- |
| camunda.operate.opensearch.numberOfShards   | How many shards OpenSearch uses for all Operate indices   | 1             |
| camunda.operate.opensearch.numberOfReplicas | How many replicas OpenSearch uses for all Operate indices | 0             |

These values are applied only on first startup of Operate or during version update. After the Operate
schema is created, settings may be adjusted directly in the OpenSearch template, and the new settings are applied
to indices created after adjustment.

#### Settings for index templates priority

Camunda 8 creates index templates that OpenSearch uses for the historical indices. The priority of these templates can be changed.

This is useful when the OpenSearch provider has some predefined wildcard (with `*` index pattern) index templates with given priority, setting a higher priority for Operate index templates ensures that the correct index mappings and settings are applied on the indices created from these templates.

The following configuration parameter defines the setting:

| Name                                    | Description                                           | Default value   |
| --------------------------------------- | ----------------------------------------------------- | --------------- |
| camunda.database.index.templatePriority | Priority for all index templates created by Camunda 8 | - (no priority) |

:::note
The priority should be different (strictly higher) than that set by the wildcard templates.
:::

#### A snippet from application.yml

```yaml
camunda.operate:
  opensearch:
    # Cluster name
    clusterName: opensearch
    # Url
    url: https://localhost:9200
    ssl:
      selfSigned: true
```

## Zeebe Elasticsearch or OpenSearch exporter

:::note
Please refer to [Supported Environments](../../../../reference/supported-environments.md#camunda-8-self-managed) to find out which versions of Elasticsearch or OpenSearch are supported in a Camunda 8 Self-Managed setup.
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
