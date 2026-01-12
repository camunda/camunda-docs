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

See the [secondary storage documentation](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#secondary-storage) and [core settings documentation](/self-managed/components/orchestration-cluster/core-settings/concepts/elasticsearch-and-opensearch.md).

## Zeebe Elasticsearch or OpenSearch exporter

In 8.8+ installations, Operate reads data from Operate indices written by the
[Camunda Exporter](/self-managed/components/orchestration-cluster/zeebe/exporters/camunda-exporter.md).

:::note
The Operate Importer is used only during 8.7 → 8.8 migrations.
New 8.8+ installations do not require it.
:::

During 8.7 → 8.8 migrations, Operate imports remaining historical data from indices created by the [Zeebe Elasticsearch exporter](../zeebe/exporters/elasticsearch-exporter.md)
or the [Zeebe OpenSearch exporter](../zeebe/exporters/opensearch-exporter.md).

In both cases, the Elasticsearch or OpenSearch connection settings must match the exporter configuration used by Zeebe.

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

See the [core settings documentation](/self-managed/components/orchestration-cluster/core-settings/concepts/monitoring.md).

## Logging

See the [core settings documentation](/self-managed/components/orchestration-cluster/core-settings/configuration/logging.md).

## Backups

See the [core settings documentation](/self-managed/components/orchestration-cluster/core-settings/concepts/backups.md).
