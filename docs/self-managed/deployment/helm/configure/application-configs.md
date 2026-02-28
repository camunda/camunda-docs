---
id: application-configs
sidebar_label: Configure component configuration
title: Configure component configuration
description: "Learn how to configure individual Camunda components in Helm charts."
---

This page explains how to configure Camunda components in Helm charts.

For most use cases, use `<componentName>.extraConfiguration` to add or override properties while keeping the chart-provided defaults. Use `<componentName>.configuration` only when you intentionally want to replace the entire default application configuration file.

For the complete list of configuration options per component, see the [Self-Managed Components documentation](../../../components/orchestration-cluster/overview.md) (this is where each component documents its supported application configuration).

## Prerequisites

- A deployed Camunda Helm chart release.
- Access to the `values.yaml` file.
- Basic understanding of Spring Boot configuration (`application.yaml` or `application.properties`).

## Configuration

### Parameters

| Key                                  | Type   | Description                                                                                                                                                                                                                                     |
| ------------------------------------ | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<componentName>.extraConfiguration` | list   | **Recommended:** Additional configuration entries layered on top of the default configuration. Each entry has a `file` (filename) and `content` (file contents). See [how it works per component](#how-extraconfiguration-works-per-component). |
| `<componentName>.configuration`      | string | **Advanced:** Full application configuration file content (for example, the full contents of `application.yaml`). Using this **replaces** the component's default application configuration.                                                    |

### Configuration options

Two Helm values are available for component configuration:

- `<componentName>.extraConfiguration`
- `<componentName>.configuration`

:::tip Which should I use?

- Use `<componentName>.extraConfiguration`. It keeps the chart-provided defaults intact and lets you add/override only the keys you need.
- Use `<componentName>.configuration` only if you intentionally want to take full control of the application's configuration file. It **overwrites** the default config and can affect startup behavior and upgrades.
  :::

#### componentName.extraConfiguration

Use `<componentName>.extraConfiguration` to add or override configuration **without replacing** the component's default configuration. This option accepts an **ordered list** of entries, where each entry specifies a `file` name and its `content`. Entries are processed in order, so **later entries override earlier ones** for duplicate keys — mimicking Spring Boot's `spring.config.import` semantics.

:::info Recommended default
Start with `<componentName>.extraConfiguration` whenever possible. It is safer for upgrades because the Helm chart can continue to evolve its defaults while you only maintain the deltas you actually care about.
:::

```yaml
identity:
  extraConfiguration:
    - file: logging-debug.yaml
      content: |
        logging:
          level:
            ROOT: DEBUG
            io.camunda.identity: DEBUG
    - file: logging-production.yaml
      content: |
        logging:
          level:
            ROOT: INFO
            io.camunda.identity: INFO
```

In this example, `logging-production.yaml` is applied after `logging-debug.yaml`, so the final effective log level is `INFO` (last writer wins).

:::note Why an ordered list?
Previous versions of the Helm chart used a map (key-value pairs) for `extraConfiguration`. Maps in Go (and Helm) do not guarantee iteration order. Since configuration layering is order-dependent, `extraConfiguration` now uses an array to ensure entries are always applied in the order you define them.
:::

#### componentName.configuration

Use `<componentName>.configuration` to define an application configuration file directly in `values.yaml`.

:::caution Advanced option (overwrites defaults)
When you set `<componentName>.configuration`, the Helm chart renders **your content as the entire application configuration file** for that component.

This means:

- You are responsible for including any settings that the chart normally provides by default.
- During upgrades, configuration format or default changes may require you to update your configuration before the component can start.

Prefer `<componentName>.extraConfiguration` unless you specifically need to replace the full file.
:::

For example, `application.yaml`:

```yaml
orchestration:
  configuration: |-
    camunda:
      # Orchestration cluster settings
      database:
      data:
        snapshot-period: "5m"
        primary-storage:
          disk:
            free-space:
              processing: "2GB"
              replication: "1GB"
        secondary-storage:
          autoconfigure-camunda-exporter: true
          type: "elasticsearch"
          elasticsearch:
            url: "http://camunda-elasticsearch:9200"
            cluster-name: "elasticsearch"
            username: ""
            password: "${VALUES_ELASTICSEARCH_PASSWORD:}"
            index-prefix: ""
            number-of-replicas: "1"
```

### Default properties

The `helm template` command can show you the application's default configuration as rendered by the chart.

- Use this output as a **reference** to discover the right keys and defaults.
- Only copy the full content into `<componentName>.configuration` if you intentionally want to **replace** the default config (advanced).

Keep the original `values.yaml` unchanged and maintain a separate file with your custom settings. For details, see [Creating your own values files](self-managed/deployment/helm/chart-parameters.md#creating-your-own-values-files). To generate the default configuration, replace `<your-release-name>` with your release name and run:

```bash
helm template <your-release-name> \
    -f values.yaml \
    camunda/camunda-platform \
    --show-only templates/operate/configmap.yaml
```

The `--show-only` flag prints the `configmap`.

- If you are using `<componentName>.extraConfiguration`, use the rendered `application.yml` to identify the correct keys and then add only the overrides you need.
- If you are using `<componentName>.configuration`, copy the full `application.yml` content, modify it, and place it under the appropriate `<component>.configuration` key in `values.yaml`.

### How extraConfiguration works per component

Camunda components use different runtimes and configuration mechanisms. The Helm chart handles `extraConfiguration` differently for each, so the user-facing `values.yaml` API remains consistent while the underlying behavior adapts to what each application actually supports.

#### Spring Boot components

**Applies to:** Identity, Connectors, Orchestration, Web Modeler REST API

Spring Boot components support loading multiple configuration files via `spring.config.import`. Each `extraConfiguration` entry is mounted as an **individual file** in the container's config directory and imported by Spring at startup. Order is preserved by the array in the values.yaml. Spring applies files in import order, with later files overriding earlier ones.

```yaml
identity:
  extraConfiguration:
    - file: custom-logging.yaml
      content: |
        logging:
          level:
            ROOT: DEBUG
    - file: custom-cache.yaml
      content: |
        spring:
          cache:
            type: caffeine
```

Both files are mounted and imported separately. No merging happens at Helm template time.

#### Node.js Components

**Applies to:** Console

Console is a Node.js application that reads only two configuration files: `application.yaml` (the main config) and `application-override.yaml` (a single override file). It does not support loading multiple override files.

Because of this constraint, the Helm chart **merges all `extraConfiguration` entries at template rendering time** into a single `application-override.yaml` using deep merge. Later entries override earlier ones for duplicate keys.

```yaml
console:
  extraConfiguration:
    - file: feature-flags.yaml
      content: |
        camunda:
          console:
            features:
              newDashboard: true
    - file: logging.yaml
      content: |
        camunda:
          console:
            logging:
              level: INFO
```

The Helm chart merges both entries and renders a single `application-override.yaml` in the ConfigMap:

```yaml
# Rendered application-override.yaml
camunda:
  console:
    features:
      newDashboard: true
    logging:
      level: INFO
```

:::note
`console.overrideConfiguration` is the old way of overriding the default application configuration for Console. It has been deprecated. Please convert to using `console.extraConfiguration`.
:::

#### Custom configuration loading

**Applies to:** Optimize

Optimize uses its own configuration loader (not standard Spring Boot conventions). It reads only two files: `environment-config.yaml` (main config) and `application-ccsm.yaml` (Identity/auth config, loaded when the `ccsm` Spring profile is active). It does **not** scan its config directory for additional files.

The Helm chart extracts the default `environment-config.yaml`, then **merges all `extraConfiguration` entries at template rendering time** into the final `environment-config.yaml`. Later entries override earlier ones.

```yaml
optimize:
  extraConfiguration:
    - file: custom-zeebe.yaml
      content: |
        zeebe:
          partitionCount: 6
    - file: custom-es.yaml
      content: |
        es:
          connection:
            nodes:
              - host: "custom-es-host"
                httpPort: 9200
```

Both entries are merged with the default Optimize config into a single `environment-config.yaml`.

:::caution
The `content` must be valid YAML. If invalid YAML is provided, Helm will fail during template rendering with a parse error. This is intentional and prevents deploying a broken configuration.
:::

### Summary

| Component             | Runtime       | Config format | How `extraConfiguration` is applied                             |
| --------------------- | ------------- | ------------- | --------------------------------------------------------------- |
| Identity              | Spring Boot   | YAML          | Individual files mounted, imported via `spring.config.import`   |
| Connectors            | Spring Boot   | YAML          | Individual files mounted, imported via `spring.config.import`   |
| Orchestration Cluster | Spring Boot   | YAML          | Individual files mounted, imported via `spring.config.import`   |
| Web Modeler REST API  | Spring Boot   | YAML          | Individual files mounted, imported via `spring.config.import`   |
| Console               | Node.js       | YAML          | Merged at template time into single `application-override.yaml` |
| Optimize              | Java (custom) | YAML          | Merged at template time into single `environment-config.yaml`   |

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

Prefer adding the new settings via `zeebe.extraConfiguration` so you only maintain the keys you changed and keep the chart-provided defaults.

For example:

```yaml
zeebe:
  extraConfiguration:
    - file: backup-s3.yaml
      content: |-
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
```

:::caution Advanced alternative: `zeebe.configuration` overwrites defaults
If you intentionally want to fully control Zeebe's `application.yml`, place the full configuration under `zeebe.configuration`.

This replaces the chart's default configuration and may require updates during upgrades.
:::

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
                # Example: exporter-side filters for Optimize (Camunda 8.9+)
                # bpmnProcessIdExclusion:
                #   - technicalProcess
                # variableNameInclusionStartWith:
                #   - businessTotal
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

The commented `variable-name` and `bpmn-process-id` sections above only illustrate where to configure exporter-side filters for Optimize in Camunda 8.9 and later. For the complete list of available options, their semantics, and upgrade behavior, see:

- [Elasticsearch exporter](../../../../components/orchestration-cluster/zeebe/exporters/elasticsearch-exporter/)
- [OpenSearch exporter](../../../../components/orchestration-cluster/zeebe/exporters/opensearch-exporter/)

## Connectors configuration

:::info
Connectors are **enabled by default** in Camunda 8.8. This section covers configuration options for Connectors, including how to disable them if needed.
:::

The Connector runtime is enabled by default. To use connectors, install connector element templates. For details, see [Manage connector templates in Web Modeler](/components/connectors/manage-connector-templates.md) or [Configuring templates in Desktop Modeler](/components/modeler/desktop-modeler/element-templates/configuring-templates.md).

For the full list of options, see the [Connectors Helm values](https://artifacthub.io/packages/helm/camunda/camunda-platform#connectors-parameters).

### Disable Connectors

To disable Connectors, set `connectors.enabled: false` when deploying the Helm chart:

```yaml
connectors:
  enabled: false
```

### Polling authentication mode

Connectors use the [Operate API](/apis-tools/operate-api/overview.md) to fetch process definitions that contain inbound connectors. Depending on your Camunda architecture, choose one of the following values for the `inbound.mode` parameter:

- `disabled` — Polling from Operate is disabled. The connector runtime supports only outbound interactions, such as HTTP REST calls.
- `credentials` — The connector runtime authenticates to the Operate API with basic HTTP authentication.
- `oauth` — _(Recommended, and enabled by default)_ The connector runtime authenticates to the Operate API with OAuth 2.0. Camunda uses Keycloak as the default OAuth provider.

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

Setting the `configuration` option replaces the entire contents of the application's configuration file. During upgrades, if the `configuration` option remains and there are breaking changes to the configuration file format or required defaults, this can prevent the component from starting.

- Use `extraConfiguration` by default so you only maintain a small set of overrides.
- The `configuration` option is an advanced override: if the file format or defaults change, the component may fail to start until you update your full configuration.
- Forgetting to wrap multiline values with (`|`) in Helm can cause parse errors.
- Mixing `env` and `configuration` for the same property without realizing precedence can lead to unexpected results.

## References

For more details on where to find configuration options for specific components, see the following pages:

- [Components (Self-Managed)](../../../components/orchestration-cluster/overview.md)
- [Zeebe Broker](/self-managed/components/orchestration-cluster/zeebe/configuration/broker.md)
- [Zeebe Gateway](/self-managed/components/orchestration-cluster/zeebe/configuration/gateway.md)
- [Operate](/self-managed/components/orchestration-cluster/operate/operate-configuration.md)
- [Tasklist](/self-managed/components/orchestration-cluster/tasklist/tasklist-configuration.md)
- [Web Modeler](/self-managed/components/modeler/web-modeler/configuration/configuration.md)
- [Console](/self-managed/components/console/configuration/configuration.md)
- [Connectors](/self-managed/components/connectors/connectors-configuration.md)
- [Identity](/self-managed/components/management-identity/miscellaneous/configuration-variables.md)
- [Optimize](/self-managed/components/optimize/configuration/system-configuration.md)
