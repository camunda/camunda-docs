---
id: application-configs
title: "Configure components in Helm charts"
sidebar_label: "Configure components"
description: "Learn how to configure individual components in Helm charts."
---

We moved to using `application.yaml` as the default configuration mechanism, and exposed some options for easier override.

Before, we set many environment variables as uppercase variants of the Spring option names. This can be confusing as most of our documentation is written with the Spring `application.properties`
or `application.yaml` names in mind. We would also run into problems where components released a feature, but the Helm chart would not expose the option under a key.

## Process with environment variables (before 8.5)

Previously, if you wanted to customize the application configurations you would need to know how [Spring would read properties](https://docs.spring.io/spring-boot/docs/1.5.6.RELEASE/reference/html/boot-features-external-config.html).

Take the following configuration option, for example:

```yaml
camunda.operate:
  elasticsearch:
    numberOfShards: 3
```

This would be rewritten using uppercase letters with underscores separating them:

```bash
CAMUNDA_OPERATE_ELASTICSEARCH_NUMBEROFSHARDS=3
```

This would then be supplied in the Helm chart `values.yaml`:

```yaml
operate:
  env:
    - name: CAMUNDA_OPERATE_ELASTICSEARCH_NUMBEROFSHARDS
      value: "3"
```

This method is still applicable for newer versions of the Helm chart, and if an environment variable is supplied in addition to the underlying `application.yaml` configuration, the environment variable will take precedence.

:::note
Because the underlying application could be from a variety of frameworks, the configuration file may be a YAML, a TOML, or many other different file types. Therefore, this option must be supplied as a string. In Helm, using the pipe denotes a [multiline string](https://helm.sh/docs/chart_template_guide/yaml_techniques/#controlling-spaces-in-multi-line-strings).
:::

## Exposed options (after 8.5)

This change exposes two new Helm `values.yaml` options:

- `<componentName>.configuration`
- `<componentName>.extraConfiguration`

### componentName.configuration

The `configuration` option is equivalent to an application configuration file. For example, `application.yaml`:

```yaml
operate:
  configuration: |-
    camunda.operate:
      # ELS instance to store Operate data
      elasticsearch:
        # Cluster name
        clusterName: elasticsearch
        # Host
        host: <your-release-name>-elasticsearch
        # Transport port
        port: 9200
        numberOfShards: 3
      # Zeebe instance
      zeebe:
        # Broker contact point
        brokerContactPoint: "<your-release-name>-zeebe-gateway:26500"
      # ELS instance to export Zeebe data to
      zeebeElasticsearch:
        # Cluster name
        clusterName: elasticsearch
        # Host
        host: <your-release-name>-elasticsearch
        # Transport port
        port: 9200
        # Index prefix, configured in Zeebe Elasticsearch exporter
        prefix: zeebe-record
    #Spring Boot Actuator endpoints to be exposed
    management.endpoints.web.exposure.include: health,info,conditions,configprops,prometheus,loggers,usage-metrics,backups
```

### componentName.extraConfiguration

The `extraConfiguration` option is used to supply extra configuration files.

To use it, specify a key of the filename you want the option to have, where the value is the contents of that file. The most common use case for this would be supplying a `log4j2.xml` file. When the Helm chart reads this option, it mounts it on the current directory's `./config` folder:

```xml
operate:
  extraConfiguration:
    log4j2.xml: |-
      <?xml version="1.0" encoding="UTF-8"?>
      <Configuration status="WARN" monitorInterval="30">
        <Properties>
          <Property name="LOG_PATTERN">%clr{%d{yyyy-MM-dd HH:mm:ss.SSS}}{faint} %clr{%5p} %clr{${sys:PID}}{magenta} %clr{---}{faint} %clr{[%15.15t]}{faint} %clr{%-40.40c{1.}}{cyan} %clr{:}{faint} %m%n%xwEx</Property>
          <Property name="log.stackdriver.serviceName">${env:OPERATE_LOG_STACKDRIVER_SERVICENAME:-operate}</Property>
          <Property name="log.stackdriver.serviceVersion">${env:OPERATE_LOG_STACKDRIVER_SERVICEVERSION:-}</Property>
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
          <Logger name="io.camunda.operate" level="debug" />
          <Root level="debug">
            <AppenderRef ref="${env:OPERATE_LOG_APPENDER:-Console}"/>
          </Root>
        </Loggers>
      </Configuration>
```

## Default properties set by the helm chart

The `helm template` command generates the application's default configuration, allowing you to only update the values required by your setup. Use the following command to generate the default configuration, substituting in the name of your release:

```bash
helm template <your-release-name> \
    -f values.yaml \
    camunda/camunda-platform \
    --show-only templates/operate/configmap.yaml
```

The `--show-only` flag prints out the `configmap` to the console:

```yaml
# Source: camunda-platform/templates/operate/configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: <your-release-name>-operate-configuration
  labels:
    app: camunda-platform
    app.kubernetes.io/name: camunda-platform
    app.kubernetes.io/instance: <your-release-name>
    app.kubernetes.io/managed-by: Helm
    app.kubernetes.io/part-of: camunda-platform
    helm.sh/chart: camunda-platform-10.3.2
    app.kubernetes.io/component: operate
    app.kubernetes.io/version: "8.5.5"
data:
  application.yml: |
    spring:
      profiles:
        active: "identity-auth"
      security:
        oauth2:
          resourceserver:
            jwt:
              issuer-uri: "http://<your-release-name>-keycloak:80/auth/realms/camunda-platform"
              jwk-set-uri: "http://<your-release-name>-keycloak:80/auth/realms/camunda-platform/protocol/openid-connect/certs"

    camunda:
      identity:
        clientId: "operate"
        audience: "operate-api"
        baseUrl: "http://<your-release-name>-identity:80"

    # Operate configuration file
    camunda.operate:
      identity:
        redirectRootUrl: "http://localhost:8081"

      # ELS instance to store Operate data
      elasticsearch:
        # Cluster name
        clusterName: elasticsearch
        # Host
        host: <your-release-name>-elasticsearch
        # Transport port
        port: 9200
        # Elasticsearch full url
        url: "http://<your-release-name>-elasticsearch:9200"
      # ELS instance to export Zeebe data to
      zeebeElasticsearch:
        # Cluster name
        clusterName: elasticsearch
        # Host
        host: <your-release-name>-elasticsearch
        # Transport port
        port: 9200
        # Index prefix, configured in Zeebe Elasticsearch exporter
        prefix: zeebe-record
        # Elasticsearch full url
        url: "http://<your-release-name>-elasticsearch:9200"
      # Zeebe instance
      zeebe:
        # Broker contact point
        brokerContactPoint: "<your-release-name>-zeebe-gateway:26500"
    logging:
      level:
        ROOT: INFO
        io.camunda.operate: INFO
    #Spring Boot Actuator endpoints to be exposed
    management.endpoints.web.exposure.include: health,info,conditions,configprops,prometheus,loggers,usage-metrics,backups
```

Then, take the contents under `application.yml` and put it under the `operate.configuration` section in `values.yaml`.

## Where to search for configuration options

- [Zeebe Broker](/self-managed/zeebe-deployment/configuration/broker.md)
- [Zeebe Gateway](/self-managed/zeebe-deployment/configuration/gateway.md)
- [Operate](/self-managed/operate-deployment/operate-configuration.md)
- [Tasklist](/self-managed/tasklist-deployment/tasklist-configuration.md)
- [Web Modeler](/self-managed/modeler/web-modeler/configuration/configuration.md)
- [Console](/self-managed/console-deployment/configuration/configuration.md)
- [Connectors](/self-managed/connectors-deployment/connectors-configuration.md)
- [Identity](/self-managed/identity/deployment/configuration-variables.md)
- [Optimize]($optimize$/self-managed/optimize-deployment/configuration/system-configuration)

## Limitations

Customizing the `configuration` option will replace the entire contents of the configuration file. During upgrades, if the `configuration` option remains and if there are any application-level breaking changes to the configuration file format, this may cause the application component to crash.

## Conflicting options

Suppose we have a `values.yaml` with the following:

```yaml
zeebe:
  env:
    - name: ZEEBE_BROKER_DATA_BACKUP_S3_BUCKETNAME
      value: "zeebetest1"

  configuration: |
    zeebe:
      broker:
        data:
          backup:
            s3:
              bucketName: "zeebeOtherBucketName"
      ...
```

Notice how both the environment variable and the configuration file are configuring the same option with conflicting settings. The environment variable has the bucket name set as `zeebetest1` and the `configuration` option has the bucket name as `zeebeOtherBucketName`. Which option will override the other?

In this case, the environment variable will take priority, because in the [Spring Documentation: Externalized Configuration](https://docs.spring.io/spring-boot/docs/1.5.6.RELEASE/reference/html/boot-features-external-config.html) which lists the precedence ranking:

`10. OS environment variables`

is higher in the list than

`12. Profile-specific application properties outside of your packaged jar (application-{profile}.properties and YAML variants)`

Therefore, the environment variable value `zeebetest1` will be used as the bucket name.

## Practical example:

### How to change from specifying environment variables to a custom file

Let's suppose you wanted to configure Zeebe for backups. Previously, we added environment variables to provide this behavior:

```yaml
zeebe:
  clusterSize: "1"
  enabled: true
  partitionCount: "1"
  replicationFactor: "1"
  env:
    - name: ZEEBE_BROKER_DATA_BACKUP_S3_BUCKETNAME
      value: zeebebackuptest
    - name: ZEEBE_BROKER_DATA_BACKUP_S3_REGION
      value: us-east-1
    - name: ZEEBE_BROKER_DATA_BACKUP_STORE
      value: S3
    - name: ZEEBE_BROKER_DATA_BACKUP_S3_ENDPOINT
      value: http://loki-minio.monitoring.svc.cluster.local:9000
    - name: ZEEBE_BROKER_DATA_BACKUP_S3_ACCESSKEY
      value: supersecretaccesskey
    - name: ZEEBE_BROKER_DATA_BACKUP_S3_SECRETKEY
      value: supersecretkey
    - name: ZEEBE_BROKER_DATA_BACKUP_S3_APICALLTIMEOUT
      value: PT180S
    - name: ZEEBE_BROKER_DATA_BACKUP_S3_BASEPATH
      value: zeebebackup
```

This configuration will still work. However, if you want to switch to the configuration file format, you first need to get the existing configuration file that the Helm chart generates.

The following will render the configuration file and fill in the Helm values:

```bash
helm template \
    -f values.yaml \
    camunda/camunda-platform \
    --show-only templates/zeebe/configmap.yaml
```

Your `application.yml` section should evaluate similar to the following:

```yaml
zeebe:
  broker:
    exporters:
      elasticsearch:
        className: "io.camunda.zeebe.exporter.ElasticsearchExporter"
        args:
          url: "http://RELEASE-elasticsearch:9200"
          index:
            prefix: "zeebe-record"
    gateway:
      enable: true
      network:
        port: 26500
      security:
        enabled: false
        authentication:
          mode: none
    network:
      host: 0.0.0.0
      commandApi:
        port: 26501
      internalApi:
        port: 26502
      monitoringApi:
        port: "9600"
    cluster:
      clusterSize: "1"
      replicationFactor: "1"
      partitionsCount: "1"
      clusterName: RELEASE-zeebe
    threads:
      cpuThreadCount: "3"
      ioThreadCount: "3"
```

Next, for each environment variable, we need to find the configuration option in the [Zeebe configuration](docs/self-managed/zeebe-deployment/configuration/broker.md) section of our documentation.

For `ZEEBE_BROKER_DATA_BACKUP_S3_BUCKETNAME`, we will search this page for anything relating to S3 or bucket name. In this case, the option is in [Zeebe S3 Backup](docs/self-managed/zeebe-deployment/configuration/broker.md#zeebebrokerdatabackups3)
with the name `zeebe.broker.data.backup.s3.bucketName`.

In our `config` file, add the `data` section under `zeebe.broker`:

```yaml
zeebe:
  broker:
    data:
      backup:
        s3:
          bucketName: "zeebebackuptest"
    exporters:
      elasticsearch:
        className: "io.camunda.zeebe.exporter.ElasticsearchExporter"
        args:
          url: "http://RELEASE-elasticsearch:9200"
          index:
            prefix: "zeebe-record"
    gateway:
      enable: true
      network:
        port: 26500
      security:
        enabled: false
        authentication:
          mode: none
    network:
      host: 0.0.0.0
      commandApi:
        port: 26501
      internalApi:
        port: 26502
      monitoringApi:
        port: "9600"
    cluster:
      clusterSize: "1"
      replicationFactor: "1"
      partitionsCount: "1"
      clusterName: RELEASE-zeebe
    threads:
      cpuThreadCount: "3"
      ioThreadCount: "3"
```

Follow the same process for each of the environment variables. The resulting configuration is:

```yaml
zeebe:
  broker:
    data:
      backup:
        store: "S3"
        s3:
          bucketName: "zeebebackuptest"
          region: "us-east-1"
          endpoint: "http://loki-minio.monitoring.svc.cluster.local:9000"
          accessKey: "supersecretaccesskey"
          secretKey: "supersecretkey"
          apiCallTimeout: "PT180S"
          basePath: "zeebebackup"

    exporters:
      elasticsearch:
        className: "io.camunda.zeebe.exporter.ElasticsearchExporter"
        args:
          url: "http://RELEASE-elasticsearch:9200"
          index:
            prefix: "zeebe-record"
    gateway:
      enable: true
      network:
        port: 26500
      security:
        enabled: false
        authentication:
          mode: none
    network:
      host: 0.0.0.0
      commandApi:
        port: 26501
      internalApi:
        port: 26502
      monitoringApi:
        port: "9600"
    cluster:
      clusterSize: "1"
      replicationFactor: "1"
      partitionsCount: "1"
      clusterName: RELEASE-zeebe
    threads:
      cpuThreadCount: "3"
      ioThreadCount: "3"
```

Take that snippet and put it under `zeebe.configuration` in `values.yaml`:

```yaml
zeebe:
  configuration: |-
    zeebe:
      broker:
        data:
          backup:
            store: "S3"
            s3:
              bucketName: "zeebebackuptest"
              region: "us-east-1"
              endpoint: "http://loki-minio.monitoring.svc.cluster.local:9000"
              accessKey: "supersecretaccesskey"
              secretKey: "supersecretkey"
              apiCallTimeout: "PT180S"
              basePath: "zeebebackup"

        exporters:
          elasticsearch:
            className: "io.camunda.zeebe.exporter.ElasticsearchExporter"
            args:
              url: "http://RELEASE-elasticsearch:9200"
              index:
                prefix: "zeebe-record"
        gateway:
          enable: true
          network:
            port: 26500
          security:
            enabled: false
            authentication:
              mode: none
        network:
          host: 0.0.0.0
          commandApi:
            port: 26501
          internalApi:
            port: 26502
          monitoringApi:
            port: "9600"
        cluster:
          clusterSize: "1"
          replicationFactor: "1"
          partitionsCount: "1"
          clusterName: RELEASE-zeebe
        threads:
          cpuThreadCount: "3"
          ioThreadCount: "3"
```
