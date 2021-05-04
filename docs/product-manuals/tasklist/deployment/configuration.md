---
id: configuration
title: Configuration
---

Tasklist is a Spring Boot application. That means all provided ways to [configure](https://docs.spring.io/spring-boot/docs/current/reference/html/spring-boot-features.html#boot-features-external-config)
a Spring Boot application can be applied. By default, the configuration for Tasklist is stored in a YAML file `application.yml`. All Tasklist related settings are prefixed
with `zeebe.tasklist`. The following parts are configurable:

* [Webserver](#webserver)
* [GraphQL API access](#graphql-api-access)
* [Elasticsearch connection](#elasticsearch)
* [Zeebe Broker connection](#zeebe-broker-connection)
* [Zeebe Elasticsearch exporter](#zeebe-elasticsearch-exporter)
* [Authentication](authentication.md)
* [Monitoring and health probes](#monitoring-and-health-probes)
* [Logging configuration](#logging)

## Webserver

Tasklist supports customizing the *context-path* by using default Spring configuration.

Example for `application.yml`:
`server.servlet.context-path: /tasklist`

Example for environment variable:
`SERVER_SERVLET_CONTEXT_PATH=/tasklist`

Default context-path is `/`

## GraphQL API access

Tasklist provides a GraphQL API under the endpoint `/graphql`. Clients can access this API by using a JWT access token in an authorization header `Authorization: Bearer <JWT>`.

Tasklist server needs the following **settings** to validate the token:

Setting|Description|Example
-------|------------|--------
zeebe.tasklist.client.audience| Tasklist tries to match this with `aud` in JWT | tasklist.camunda.io
zeebe.tasklist.client.clusterId| Tasklist tries to match this with `scope` in JWT| cafe-0815-0235-a221-21cc6df91dc5
spring.security.oauth2.resourceserver.jwt.jwk-set-uri (recommended) | Complete URI to get public keys for JWT validation | https://weblogin.cloud.company.com/.well-known/jwks.json
*OR* | |
spring.security.oauth2.resourceserver.jwt.issuer-uri| URI to get public keys for JWT validation| https://weblogin.cloud.company.com/

The settings can be given in [application.yml](https://github.com/camunda-cloud/tasklist/blob/master/config/application.yml) (eg. `zeebe.tasklist.client.audience: tasklist.camunda.io`) or
as environment variables (eg. `ZEEBE_TASKLIST_CLIENT_AUDIENCE=tasklist.camunda.io`)

The [API client](api-client.md) needs to obtain JWT token and send it in each request to `graphql` in an authorization header as described above.

## Elasticsearch

Tasklist stores and reads data in/from Elasticsearch.

### Settings to connect

Tasklist supports [basic authentication](https://www.elastic.co/guide/en/elasticsearch/reference/7.12/setting-up-authentication.html) for elasticsearch.
Set the appropriate username/password combination in the configuration to use it.

Name | Description | Default value
-----|-------------|--------------
zeebe.tasklist.elasticsearch.clusterName | Clustername of Elasticsearch | elasticsearch
zeebe.tasklist.elasticsearch.url | URL of Elasticsearch REST API | http://localhost:9200
zeebe.tasklist.elasticsearch.username | Username to access Elasticsearch REST API | -
zeebe.tasklist.elasticsearch.password | Password to access Elasticsearch REST API | -

### Settings for shards and replicas

Tasklist creates the template with index settings named `tasklist-<version>_template` that Elasticsearch will use for all Tasklist indices.
These settings can be changed.

Following configuration parameters will define the settings:

Name|Description|Default value
----|-----------|--------------
zeebe.tasklist.elasticsearch.numberOfShards| How many shards Elasticsearch uses for all Tasklist indices| 1
zeebe.tasklist.elasticsearch.numberOfReplicas| How many replicas Elasticsearch uses for all Tasklist indices| 0

These values are applied only on first startup of Tasklist or during version upgrade. After Tasklist
ELS schema is created, settings may be adjusted directly in ELS template, and the new settings will be applied
to indices created after adjustment.

### A snippet from application.yml:

```yaml
zeebe.tasklist:
  elasticsearch:
    # Cluster name
    clusterName: elasticsearch
    # Url
    url: http://localhost:9200
```

## Zeebe broker connection

Tasklist needs a connection to Zeebe Broker to start the import.

### Settings to connect

Name | Description | Default value
-----|-------------|--------------
zeebe.tasklist.zeebe.gatewayAddress | Gateway address point to zeebe as hostname and port | localhost:26500

__Currently Operate does not support TLS communication with Zeebe__

### A snippet from application.yml:

```yaml
zeebe.tasklist:
  zeebe:
    # Gateway address
    gatewayAddress: localhost:26500
```

## Zeebe Elasticsearch exporter

Tasklist imports data from Elasticsearch indices created and filled in by [Zeebe Elasticsearch Exporter](https://github.com/camunda-cloud/zeebe/tree/develop/exporters/elasticsearch-exporter).
Therefore, settings for this Elasticsearch connection must be defined and must correspond to the settings on Zeebe side.

### Settings to connect and import:

Name | Description | Default value
-----|-------------|--------------
zeebe.tasklist.zeebeElasticsearch.clusterName | Cluster name of Elasticsearch | elasticsearch
zeebe.tasklist.zeebeElasticsearch.url | URL of Elasticsearch REST API | http://localhost:9200
zeebe.tasklist.zeebeElasticsearch.prefix | Index prefix as configured in Zeebe Elasticsearch exporter | zeebe-record
zeebe.tasklist.zeebeElasticsearch.username | Username to access Elasticsearch REST API | -
zeebe.tasklist.zeebeElasticsearch.password | Password to access Elasticsearch REST API | -

### A snippet from application.yml:

```yaml
zeebe.tasklist:
  zeebeElasticsearch:
    # Cluster name
    clusterName: elasticsearch
    # Url
    url: http://localhost:9200
    # Index prefix, configured in Zeebe Elasticsearch exporter
    prefix: zeebe-record
```

## Monitoring and health probes

Tasklist includes [Spring Boot Actuator](https://docs.spring.io/spring-boot/docs/current/reference/html/production-ready-features.html#production-ready) inside, that
provides number of monitoring possibilities., e.g. health check (http://localhost:8080/actuator/health) and metrics (http://localhost:8080/actuator/prometheus) endpoints.

Tasklist uses following Actuator configuration by default:
```yaml
# disable default health indicators:
# https://docs.spring.io/spring-boot/docs/current/reference/html/production-ready-features.html#production-ready-health-indicators
management.health.defaults.enabled: false
# enable health check, metrics and loggers endpoints
management.endpoints.web.exposure.include: health,prometheus,loggers
# enable Kubernetes health groups:
# https://docs.spring.io/spring-boot/docs/current/reference/html/production-ready-features.html#production-ready-kubernetes-probes
management.health.probes.enabled: true
```

With this configuration following endpoints are available for use out of the box:

```<server>:8080/actuator/prometheus``` Prometheus metrics

```<server>:8080/actuator/health/liveness``` Liveness probe

```<server>:8080/actuator/health/readiness``` Readiness probe

### Example snippets to use Tasklist probes in Kubernetes:

For details to set Kubernetes probes parameters see: [Kubernetes configure probes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/#configure-probes)

#### Readiness probe as yaml config:
```yaml
readinessProbe:
     httpGet:
        path: /actuator/health/readiness
        port: 8080
     initialDelaySeconds: 30
     periodSeconds: 30
```
#### Liveness probe as yaml config:
```yaml
livenessProbe:
     httpGet:
        path: /actuator/health/liveness
        port: 8080
     initialDelaySeconds: 30
     periodSeconds: 30
```

## Logging

Tasklist uses Log4j2 framework for logging. In distribution archive as well as inside a Docker image `config/log4j2.xml` logging configuration files is included,
that can be further adjusted to your needs:

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
    <Logger name="io.zeebe.tasklist" level="info" />
    <Root level="info">
      <AppenderRef ref="${env:TASKLIST_LOG_APPENDER:-Console}"/>
    </Root>
  </Loggers>
</Configuration>
```

By default, Console log appender will be used.

### JSON logging configuration

You can choose to output logs in JSON format (Stackdriver compatible). To enable it, define
the environment variable ```TASKLIST_LOG_APPENDER``` like this:

```sh
TASKLIST_LOG_APPENDER=Stackdriver
```

### Change logging level at runtime

Tasklist supports the default scheme for changing logging levels as provided by [Spring Boot](https://docs.spring.io/spring-boot/docs/2.4.3/actuator-api/htmlsingle/#loggers)

The log level for Tasklist can be changed by following the [Setting a Log Level](https://docs.spring.io/spring-boot/docs/2.4.3/actuator-api/htmlsingle/#loggers-setting-level) section.

#### Set all Tasklist loggers to DEBUG:
```shell
curl 'http://localhost:8080/actuator/loggers/io.zeebe.tasklist' -i -X POST \
-H 'Content-Type: application/json' \
-d '{"configuredLevel":"debug"}'
```

## An example of application.yml file

The following snippet represents the default Tasklist configuration, which is shipped with the distribution. It can be found inside the `config` folder (`config/application.yml`)
and can be used to adjust Tasklist to your needs.

```yaml
# Tasklist configuration file

zeebe.tasklist:
  # Set Tasklist username and password.
  # If user with <username> does not exists it will be created.
  # Default: demo/demo
  #username:
  #password:
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
