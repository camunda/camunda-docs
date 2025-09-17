---
id: application-configs
sidebar_label: Components
title: Configure Helm chart components
description: "Learn how to configure individual Camunda components in Helm charts."
---

This page explains how to configure Camunda components in Helm charts. It describes the shift from environment variables to `application.yaml`, and shows how to apply configuration options and custom files.

## Prerequisites

- A deployed Camunda Helm chart release.
- Access to the `values.yaml` file.
- Basic understanding of Spring Boot configuration (`application.yaml` or `application.properties`).

## Configuration

### Parameters

| Key                                  | Type   | Description                                                                                                             |
| ------------------------------------ | ------ | ----------------------------------------------------------------------------------------------------------------------- |
| `<componentName>.configuration`      | string | Full application configuration content (for example, the contents of `application.yaml`).                               |
| `<componentName>.extraConfiguration` | map    | Additional configuration files. Keys are filenames, values are file contents. Mounted into the container at `./config`. |

### Configuration options

Two Helm values are available for component configuration:

- `<componentName>.configuration`
- `<componentName>.extraConfiguration`

#### componentName.configuration

Use `<componentName>.configuration` to define an application configuration file directly in `values.yaml`.

For example, `application.yaml`:

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

#### componentName.extraConfiguration

Use `<componentName>.extraConfiguration` to provide additional configuration files.
Each key is the filename, and each value is the file content. A common use case is providing a custom `log4j2.xml` file. When the Helm chart processes this option, it mounts the file under the `./config` directory:

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

### Default properties

The `helm template` command generates the application's default configuration. It’s best practice to keep the original values.yaml unchanged and [maintain a separate file with your custom settings](self-managed/installation-methods/helm/chart-parameters/#creating-your-own-values-files). To generate the default configuration, replace `<your-release-name>` with your release name and run:

```bash
helm template <your-release-name> \
    -f values.yaml \
    camunda/camunda-platform \
    --show-only templates/operate/configmap.yaml
```

The `--show-only` flag prints the `configmap`. Copy the `application.yml` content and place it under the appropriate `<component>.configuration` key in `values.yaml`.

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

## Practical example: migrating from environment variables to a configuration file

This example shows how to convert a Zeebe backup configuration from environment variables to the `application.yaml` file format.

### Step 1: Review the existing environment variable configuration

To configure Zeebe backups, earlier charts required environment variables:

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

### Step 2: Generate the default configuration file

Run the following command to render the default configuration file and fill in Helm values:

```bash
helm template \
    -f values.yaml \
    camunda/camunda-platform \
    --show-only templates/zeebe/configmap.yaml
```

The output includes an `application.yml` section similar to:

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

### Step 3: Map environment variables to configuration properties

For each environment variable, find the corresponding property in the [Zeebe configuration](/self-managed/components/orchestration-cluster/zeebe/configuration/broker.md).

For example, the environment variable `ZEEBE_BROKER_DATA_BACKUP_S3_BUCKETNAME` maps to the property `zeebe.broker.data.backup.s3.bucketName`, documented under [Zeebe S3 Backup](/self-managed/components/orchestration-cluster/zeebe/configuration/broker.md#zeebebrokerdatabackups3).

Add the property to the configuration file. Add the `data` section under `zeebe.broker`:

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

### Step 4: Repeat for all environment variables

Follow the same process for each environment variable. The resulting configuration looks like this:

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

### Step 5: Add the configuration to `values.yaml`

Finally, place the updated configuration under `zeebe.configuration` in `values.yaml`:

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

## Troubleshooting

### Conflicting options

If both an environment variable and a configuration file define the same option, the environment variable takes precedence.

Example:

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

Here, the bucket name is set twice. The environment variable `zeebetest1` overrides the configuration file `zeebeOtherBucketName`. See [Spring externalized configuration](https://docs.spring.io/spring-boot/docs/1.5.6.RELEASE/reference/html/boot-features-external-config.html) for precedence details.

### Limitations

Customizing the `configuration` option will replace the entire contents of the configuration file. During upgrades, if the `configuration` option remains and if there are any application-level breaking changes to the configuration file format, this may cause the application component to crash.

- The `configuration` option replaces the entire configuration file. During upgrades, if the file format changes, the component may fail to start until the configuration is updated.
- Forgetting to wrap multiline values with (`|`) in Helm can cause parse errors.
- Mixing env and configuration for the same property without realizing precedence can lead to unexpected results.

## References

For more details on where to find configuration options for specific components, see the following pages:

- [Zeebe Broker](/self-managed/components/orchestration-cluster/zeebe/configuration/broker.md)
- [Zeebe Gateway](/self-managed/components/orchestration-cluster/zeebe/configuration/gateway.md)
- [Operate](/self-managed/components/orchestration-cluster/operate/operate-configuration.md)
- [Tasklist](/self-managed/components/orchestration-cluster/tasklist/tasklist-configuration.md)
- [Web Modeler](/self-managed/components/modeler/web-modeler/configuration/configuration.md)
- [Console](/self-managed/components/console/configuration/configuration.md)
- [Connectors](/self-managed/components/connectors/connectors-configuration.md)
- [Identity](/self-managed/components/management-identity/miscellaneous/configuration-variables.md)
- [Optimize](/self-managed/components/optimize/configuration/system-configuration.md)
