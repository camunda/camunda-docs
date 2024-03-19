---
id: application-configs
title: "Configure application.yaml in components"
sidebar_label: "Configure application configs"
description: "Learn how to configure individual components"
---

We recently changed the way that the helm chart supplies configuration options
to each of the application components (Zeebe, Tasklist, Operate, Modeler, ...).
Before, we set many environment variables which were uppercase variants of
the spring option names. This is quite confusing since most of our
documentation is written with the spring `application.properties` or
`application.yaml` names in mind. We would also run into problems where
application components release a feature but the helm chart does not expose the
option under a key. To resolve those issues, we moved to using
`application.yaml` as the default configuration mechanism, and exposed some
options to make it easy to override.

## Process with environment variables (old way)

In the old way of customizing the application configurations, one would need to know how [Spring would read properties](https://docs.spring.io/spring-boot/docs/1.5.6.RELEASE/reference/html/boot-features-external-config.html). The configuration option, such as

```yaml
camunda.operate:
  elasticsearch:
    numberOfShards: 3
```

would be rewritten using uppercase letters with underscores separating them:

```bash
CAMUNDA_OPERATE_ELASTICSEARCH_NUMBEROFSHARDS=3
```

and this would then be supplied in the helm chart `values.yaml` under:

```yaml
operate:
  env:
    - name: CAMUNDA_OPERATE_ELASTICSEARCH_NUMBEROFSHARDS
      value: "3"
```

This method is still applicable for newer versions of the helm chart, and if an environment variable is supplied in addition to the underlying `application.yaml` configuration, then the environment variable will take precedence.

## Notes about the helm pipe |

Because the underlying application could be from a variety of frameworks, the configuration file may be a YAML, a TOML, or many other different file types. Therefore, this option must be supplied as a string. In helm, using the pipe denotes a [multiline string](https://helm.sh/docs/chart_template_guide/yaml_techniques/#controlling-spaces-in-multi-line-strings).

## Exposed options

This change exposes two new helm `values.yaml` options:

1. `<component>.configuration`
2. `<component>.extraConfiguration`

### <component>.configuration

The `configuration` option is equivalent to an applications configuration file. (i.e. `application.yaml`)

Example:

```yaml
operate:
  configuration: |-
    camunda.operate:
      # ELS instance to store Operate data
      elasticsearch:
        # Cluster name
        clusterName: elasticsearch
        # Host
        host: cpt-elasticsearch
        # Transport port
        port: 9200
        numberOfShards: 3
      # Zeebe instance
      zeebe:
        # Broker contact point
        brokerContactPoint: "cpt-zeebe-gateway:26500"
      # ELS instance to export Zeebe data to
      zeebeElasticsearch:
        # Cluster name
        clusterName: elasticsearch
        # Host
        host: cpt-elasticsearch
        # Transport port
        port: 9200
        # Index prefix, configured in Zeebe Elasticsearch exporter
        prefix: zeebe-record
    #Spring Boot Actuator endpoints to be exposed
    management.endpoints.web.exposure.include: health,info,conditions,configprops,prometheus,loggers,usage-metrics,backups
```

### <component>.extraConfiguration

`extraConfiguration` option is used to supply extra configuration files. To use it, specify a key of the filename you want the option to have, and the value is the contents of that file. The most common use case for this would be supplying a `log4j2.xml` file. When the helm chart reads this option, it will mount it on the current directory's `./config` folder.

Example:

```yaml
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

## How to get the application.yaml properties for a particular component to override

Before you supply a configuration, it's helpful to know what the default configuration is so you can start from a working configuration and then update the values you want.

```bash
helm template \
    -f values.yaml \
    camunda/camunda-platform \
    --show-only templates/operate/configmap.yaml
```

`--show-only` will allow you to print out the configmap to the console.

Example output:

```yaml
# Source: camunda-platform/templates/operate/configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: cpt-operate
  labels:
    app: camunda-platform
    app.kubernetes.io/name: camunda-platform
    app.kubernetes.io/instance: cpt
    app.kubernetes.io/managed-by: Helm
    app.kubernetes.io/part-of: camunda-platform
    helm.sh/chart: camunda-platform-9.3.1
    app.kubernetes.io/version: "8.4.5"
    app.kubernetes.io/component: operate
data:
  application.yml: |
    server:
      servlet:
        context-path: "/operate"
    spring:
      profiles:
        active: "identity-auth"
      security:
        oauth2:
          resourceserver:
            jwt:
              issuer-uri: "http://cpt-keycloak:80/auth/realms/camunda-platform"
              jwk-set-uri: "http://cpt-keycloak:80/auth/realms/camunda-platform/protocol/openid-connect/certs"

    camunda:
      identity:
        clientId: "operate"
        audience: "operate-api"

    # Operate configuration file
    camunda.operate:
      identity:
        redirectRootUrl: "https://dev.jlscode.com"

      # ELS instance to store Operate data
      elasticsearch:
        # Cluster name
        clusterName: elasticsearch
        # Host
        host: cpt-elasticsearch
        # Transport port
        port: 9200
      # Zeebe instance
      zeebe:
        # Broker contact point
        brokerContactPoint: "cpt-zeebe-gateway:26500"
      # ELS instance to export Zeebe data to
      zeebeElasticsearch:
        # Cluster name
        clusterName: elasticsearch
        # Host
        host: cpt-elasticsearch
        # Transport port
        port: 9200
        # Index prefix, configured in Zeebe Elasticsearch exporter
        prefix: zeebe-record
    logging:
      level:
        ROOT: INFO
        io.camunda.operate: INFO
    #Spring Boot Actuator endpoints to be exposed
    management.endpoints.web.exposure.include: health,info,conditions,configprops,prometheus,loggers,usage-metrics,backups
```

Then you can take the contents under `application.yml` and put it under the `operate.configuration` section under values.yaml.

## Where to search for possible options?

Each component has their own configuration section under
Self-Managed > Components > Component Name > Configuration.

Example: [Zeebe Configuration](./docs/self-managed/zeebe-deployment/configuration)

## Are there any drawbacks to specifying a config file in this way?

If you choose to configure `application.yaml`, the helm chart won't supply it's own options in the form of a templated configuration. there is a risk that an update inside the application component or the helm chart may not make it into your deployment.

Before an upgrade, make sure to check the configuration file for changes using the above `helm template` command.
