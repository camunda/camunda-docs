---
id: tasklist-configuration
title: Configuration
---

Tasklist is a Spring Boot application. This means all provided ways to [configure](https://docs.spring.io/spring-boot/docs/current/reference/html/spring-boot-features.html#boot-features-external-config) a Spring Boot application can be applied.

By default, the configuration for Tasklist is stored in a YAML file `application.yml`. All Tasklist-related settings are prefixed with `camunda.tasklist`. The following components are configurable:

- [Webserver](#webserver)
- [Multi-tenancy](#multi-tenancy)
  - [Configuration](#configuration)
- [Elasticsearch or OpenSearch](#elasticsearch-or-opensearch)
  - [Settings to connect](#settings-to-connect)
    - [Settings to connect to a secured Elasticsearch or OpenSearch instance](#settings-to-connect-to-a-secured-elasticsearch-or-opensearch-instance)
  - [Settings for shards and replicas](#settings-for-shards-and-replicas)
  - [A snippet from application.yml](#a-snippet-from-applicationyml)
- [Zeebe broker connection](#zeebe-broker-connection)
  - [Settings to connect](#settings-to-connect-1)
  - [A snippet from application.yml](#a-snippet-from-applicationyml-1)
- [Zeebe Elasticsearch or OpenSearch exporter](#zeebe-elasticsearch-or-opensearch-exporter)
  - [Settings to connect and import](#settings-to-connect-and-import)
  - [A snippet from application.yml](#a-snippet-from-applicationyml-2)
- [Monitoring and health probes](#monitoring-and-health-probes)
  - [Example snippets to use Tasklist probes in Kubernetes](#example-snippets-to-use-tasklist-probes-in-kubernetes)
    - [Readiness probe as yaml config](#readiness-probe-as-yaml-config)
    - [Liveness probe as yaml config](#liveness-probe-as-yaml-config)
- [Logging](#logging)
  - [JSON logging configuration](#json-logging-configuration)
  - [Change logging level at runtime](#change-logging-level-at-runtime)
    - [Set all Tasklist loggers to DEBUG](#set-all-tasklist-loggers-to-debug)
- [Clustering](#clustering)
  - [Distributed user sessions](#distributed-user-sessions)
- [An example of application.yml file](#an-example-of-applicationyml-file)

## Webserver

Tasklist supports customizing the **context-path** using the default Spring configuration.

Example for `application.yml`:
`server.servlet.context-path: /tasklist`

Example for environment variable:
`SERVER_SERVLET_CONTEXT_PATH=/tasklist`

Default context-path is `/`.

## Multi-tenancy

From version 8.3 onwards, Tasklist has been enhanced to support multi-tenancy for Self-Managed setup,
allowing organizations to separate and manage tasks across multiple tenants within a single instance.
This offers flexibility and scalability, catering to the complex needs of larger organizations or those needing
clear data separation for different departments or clients.

### Configuration

For those running a Self-Managed Camunda 8 environment, configuring multi-tenancy in Tasklist requires specific settings:

| Name                                   | Description                                                                                                                                                              | Default value |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| camunda.tasklist.multi-tenancy.enabled | Activates the multi-tenancy feature within the Tasklist app. This setting can also be overridden using the environment variable `CAMUNDA_TASKLIST_MULTITENANCY_ENABLED`. | false         |

:::caution
To ensure seamless integration and functionality, the multi-tenancy feature should also be enabled across all associated components. Find more information, including links to individual component configuration on the [multi-tenancy concepts page](/self-managed/concepts/multi-tenancy.md).
:::

## Elasticsearch or OpenSearch

Tasklist stores and reads data from Elasticsearch or OpenSearch.

### Settings to connect

Tasklist supports [basic authentication](https://www.elastic.co/guide/en/elasticsearch/reference/7.12/setting-up-authentication.html) for Elasticsearch. Set the appropriate username/password combination in the configuration to use it.

#### Settings to connect to a secured Elasticsearch or OpenSearch instance

To connect to a secured (https) Elasticsearch instance you need normally only set the URL protocol
part to `https` instead of `http`. A secured Elasticsearch instance needs also `username` and `password`.
The other SSL settings should only be used in case of connection problems, for example disable
host verification.

:::note
You may need to import the certificate into JVM runtime.
:::

| Name                                               | Description                               | Default value         |
| -------------------------------------------------- | ----------------------------------------- | --------------------- |
| camunda.tasklist.elasticsearch.indexPrefix         | Prefix for index names                    | tasklist              |
| camunda.tasklist.elasticsearch.clusterName         | Clustername of Elasticsearch              | elasticsearch         |
| camunda.tasklist.elasticsearch.url                 | URL of Elasticsearch REST API             | http://localhost:9200 |
| camunda.tasklist.elasticsearch.username            | Username to access Elasticsearch REST API | -                     |
| camunda.tasklist.elasticsearch.password            | Password to access Elasticsearch REST API | -                     |
| camunda.tasklist.elasticsearch.ssl.certificatePath | Path to certificate used by Elasticsearch | -                     |
| camunda.tasklist.elasticsearch.ssl.selfSigned      | Certificate was self signed               | false                 |
| camunda.tasklist.elasticsearch.ssl.verifyHostname  | Should the hostname be validated          | false                 |

For OpenSearch we also have similar configurations:

| Name                                            | Description                            | Default value         |
| ----------------------------------------------- | -------------------------------------- | --------------------- |
| camunda.tasklist.opensearch.indexPrefix         | Prefix for index names                 | tasklist              |
| camunda.tasklist.opensearch.clusterName         | Clustername of OpenSearch              | opensearch            |
| camunda.tasklist.opensearch.url                 | URL of OpenSearch REST API             | http://localhost:9200 |
| camunda.tasklist.opensearch.username            | Username to access OpenSearch REST API | -                     |
| camunda.tasklist.opensearch.password            | Password to access OpenSearch REST API | -                     |
| camunda.tasklist.opensearch.ssl.certificatePath | Path to certificate used by OpenSearch | -                     |
| camunda.tasklist.opensearch.ssl.selfSigned      | Certificate was self-signed            | false                 |
| camunda.tasklist.opensearch.ssl.verifyHostname  | Should the hostname be validated       | false                 |

It's important to mention that by default Tasklist is always going to try to connect to Elasticsearch. To define what database is going to be used, the configuration below is mandatory (if this configuration is missed, Elasticsearch is the selected database):

| Name                      | Description                                                                                   | Default value |
| ------------------------- | --------------------------------------------------------------------------------------------- | ------------- |
| camunda.tasklist.database | Database that Tasklist is going to connect - valid values are `elasticsearch` or `opensearch` | elasticsearch |

### Settings for shards and replicas

Tasklist creates the template with index settings named `tasklist-<version>_template` that Elasticsearch uses for all Tasklist indices. These settings can be changed.

The following configuration parameters define the settings:

| Name                                            | Description                                                    | Default value |
| ----------------------------------------------- | -------------------------------------------------------------- | ------------- |
| camunda.tasklist.elasticsearch.numberOfShards   | How many shards Elasticsearch uses for all Tasklist indices.   | 1             |
| camunda.tasklist.elasticsearch.numberOfReplicas | How many replicas Elasticsearch uses for all Tasklist indices. | 0             |

These values are applied only on first startup of Tasklist or during version update. After the Tasklist
ELS schema is created, settings may be adjusted directly in the ELS template, and the new settings are applied
to indices created after adjustment.

### A snippet from application.yml

```yaml
camunda.tasklist:
  elasticsearch:
    # Cluster name
    clusterName: elasticsearch
    # Url
    url: https://localhost:9200
    ssl:
      selfSigned: true
```

## Zeebe broker connection

Tasklist needs a connection to Zeebe broker to start the import.

### Settings to connect

| Name                                   | Description                                                                                                         | Default value   |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | --------------- |
| camunda.tasklist.zeebe.gatewayAddress  | Gateway address that points to Zeebe as hostname and port.                                                          | localhost:26500 |
| camunda.tasklist.zeebe.secure          | Connection should be secure via Transport Layer Security (TLS).                                                     | false           |
| camunda.tasklist.zeebe.certificatePath | Path to certificate used by Zeebe. This is necessary when the certificate isn't registered in the operating system. | -               |

Additionally, visit [Zeebe Secure Client Communication](/docs/self-managed/zeebe-deployment/security/secure-client-communication/) for more details.

### A snippet from application.yml

```yaml
camunda.tasklist:
  zeebe:
    # Gateway host and port
    gatewayAddress: localhost:26500
```

`

## Zeebe Elasticsearch or OpenSearch exporter

:::note
Refer to [supported environments](../../reference/supported-environments.md#camunda-8-self-managed) to find out which versions of Elasticsearch or OpenSearch are supported in a Camunda 8 Self-Managed setup.
:::

For Elasticsearch, Tasklist imports data from Elasticsearch indices created and filled in by [Zeebe Elasticsearch Exporter](https://github.com/camunda-cloud/zeebe/tree/develop/exporters/elasticsearch-exporter). <br/>For OpenSearch, Tasklist imports data from indices created and filled in by the [Zeebe OpenSearch exporter](../zeebe-deployment/exporters/opensearch-exporter.md).

Therefore, settings for this Elasticsearch or OpenSearch connection must be defined and must correspond to the settings on the Zeebe side.

### Settings to connect and import

See also [settings to connect to a secured Elasticsearch or OpenSearch instance](#settings-to-connect-to-a-secured-elasticsearch-or-opensearch-instance).

| Name                                                    | Description                                                | Default value         |
| ------------------------------------------------------- | ---------------------------------------------------------- | --------------------- |
| camunda.tasklist.zeebeElasticsearch.clusterName         | Cluster name of Elasticsearch                              | elasticsearch         |
| camunda.tasklist.zeebeElasticsearch.url                 | URL of Elasticsearch REST API                              | http://localhost:9200 |
| camunda.tasklist.zeebeElasticsearch.prefix              | Index prefix as configured in Zeebe Elasticsearch exporter | zeebe-record          |
| camunda.tasklist.zeebeElasticsearch.username            | Username to access Elasticsearch REST API                  | -                     |
| camunda.tasklist.zeebeElasticsearch.password            | Password to access Elasticsearch REST API                  | -                     |
| camunda.tasklist.zeebeElasticsearch.ssl.certificatePath | Path to certificate used by Elasticsearch                  | -                     |
| camunda.tasklist.zeebeElasticsearch.ssl.selfSigned      | Certificate was self signed                                | false                 |
| camunda.tasklist.zeebeElasticsearch.ssl.verifyHostname  | Should the hostname be validated                           | false                 |

### A snippet from application.yml

```yaml
camunda.tasklist:
  zeebeElasticsearch:
    # Cluster name
    clusterName: elasticsearch
    # Url
    url: https://localhost:9200
    # Index prefix, configured in Zeebe Elasticsearch exporter
    prefix: zeebe-record
```

## Monitoring and health probes

Tasklist includes the [Spring Boot Actuator](https://docs.spring.io/spring-boot/docs/current/reference/html/production-ready-features.html#production-ready) inside, which
provides the number of monitoring possibilities (e.g. health check (http://localhost:8080/actuator/health) and metrics (http://localhost:8080/actuator/prometheus) endpoints).

Tasklist uses the following Actuator configuration by default:

```yaml
# disable default health indicators:
# https://docs.spring.io/spring-boot/docs/current/reference/html/production-ready-features.html#production-ready-health-indicators
management.health.defaults.enabled: false

# enable Kubernetes health groups:
# https://docs.spring.io/spring-boot/docs/current/reference/html/production-ready-features.html#production-ready-kubernetes-probes
management.endpoint.health.probes.enabled: true

# enable health check and metrics endpoints
management.endpoints.web.exposure.include: health, prometheus, loggers, usage-metrics, backups
```

With this configuration, the following endpoints are available for use out of the box:

`<server>:8080/actuator/prometheus` Prometheus metrics

`<server>:8080/actuator/health/liveness` Liveness probe

`<server>:8080/actuator/health/readiness` Readiness probe

### Example snippets to use Tasklist probes in Kubernetes

For details to set Kubernetes probes parameters, see [Kubernetes configure probes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#configure-probes).

#### Readiness probe as yaml config

```yaml
readinessProbe:
  httpGet:
    path: /actuator/health/readiness
    port: 8080
  initialDelaySeconds: 30
  periodSeconds: 30
```

#### Liveness probe as yaml config

```yaml
livenessProbe:
  httpGet:
    path: /actuator/health/liveness
    port: 8080
  initialDelaySeconds: 30
  periodSeconds: 30
```

## Logging

Tasklist uses Log4j2 framework for logging. In the distribution archive and inside a Docker image `/app/resources/log4j2.xml`, logging configuration files are included and can be further adjusted to your needs:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Configuration status="WARN" monitorInterval="30">
  <Properties>
    <Property name="LOG_PATTERN">%clr{%d{yyyy-MM-dd HH:mm:ss.SSS}}{faint} %clr{%5p} %clr{${sys:PID}}{magenta} %clr{---}{faint} %clr{[%15.15t]}{faint} %clr{%-40.40c{1.}}{cyan} %clr{:}{faint} %m%n%xwEx</Property>
    <Property name="log.stackdriver.serviceName">${env:TASKLIST_LOG_STACKDRIVER_SERVICENAME:-tasklist}</Property>
    <Property name="log.stackdriver.serviceVersion">${env:TASKLIST_LOG_STACKDRIVER_SERVICEVERSION:-}</Property>
  </Properties>
  <Appenders>
    <Console name="Console" target="SYSTEM_OUT" follow="true">
      <PatternLayout pattern="${LOG_PATTERN}"/>
    </Console>
    <Console name="Stackdriver" target="SYSTEM_OUT" follow="true">
      <StackdriverLayout serviceName="${log.stackdriver.serviceName}"
        serviceVersion="${log.stackdriver.serviceVersion}" />
    </Console>
  </Appenders>
  <Loggers>
    <Logger name="io.camunda.tasklist" level="info" />
    <Root level="info">
      <AppenderRef ref="${env:TASKLIST_LOG_APPENDER:-Console}"/>
    </Root>
  </Loggers>
</Configuration>
```

By default, Console Appender is used.

### JSON logging configuration

You can choose to output logs in JSON format (Stackdriver compatible). To enable it, define
the environment variable `TASKLIST_LOG_APPENDER` like the following:

```sh
TASKLIST_LOG_APPENDER=Stackdriver
```

### Change logging level at runtime

Tasklist supports the default scheme for changing logging levels as provided by [Spring Boot](https://docs.spring.io/spring-boot/docs/2.4.3/actuator-api/htmlsingle/#loggers).

The log level for Tasklist can be changed by following the [Setting a Log Level](https://docs.spring.io/spring-boot/docs/2.4.3/actuator-api/htmlsingle/#loggers-setting-level) section.

#### Set all Tasklist loggers to DEBUG

```shell
curl 'http://localhost:8080/actuator/loggers/io.camunda.tasklist' -i -X POST \
-H 'Content-Type: application/json' \
-d '{"configuredLevel":"debug"}'
```

## Clustering

### Distributed user sessions

If more than one Camunda Tasklist instance is accessible by users for a failover scenario, for example, persistent sessions must be configured for all instances. This enables distributed sessions among all instances and users do not lose their session when being routed to another instance.

| Name                                         | Description                                               | Default value |
| -------------------------------------------- | --------------------------------------------------------- | ------------- |
| camunda.tasklist.persistent.sessions.enabled | Enables the persistence of user sessions in Elasticsearch | false         |

## An example of application.yml file

The following snippet represents the default Tasklist configuration, which is shipped with the distribution. It can be found inside the `config` folder (`config/application.yml`) and can be used to adjust Tasklist to your needs.

```yaml
# Tasklist configuration file

camunda.tasklist:
  # Set Tasklist username and password.
  # If user with <username> does not exists it will be created.
  # Default: demo/demo
  #username:
  #password:
  #roles:
  #  - OWNER
  #  - OPERATOR

  # ELS instance to store Tasklist data
  elasticsearch:
    # Cluster name
    clusterName: elasticsearch
    # url
    url: http://localhost:9200
  # Zeebe instance
  zeebe:
    # Gateway address
    gatewayAddress: localhost:26500
  # ELS instance to export Zeebe data to
  zeebeElasticsearch:
    # Cluster name
    clusterName: elasticsearch
    # url
    url: http://localhost:9200
    # Index prefix, configured in Zeebe Elasticsearch exporter
    prefix: zeebe-record
```
