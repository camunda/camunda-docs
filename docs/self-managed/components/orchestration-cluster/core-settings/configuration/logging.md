---
id: logging
title: Logging
description: Configure and manage logging for the Camunda 8 Self-Managed Orchestration Cluster components.
---

This page explains how to configure and manage logging in the **Camunda 8 Self-Managed Orchestration Cluster**, which includes **Zeebe**, **Operate**, **Tasklist**, and **Identity**. All components use the **Log4j2** framework.

You can configure log levels, output formats, appenders, and adjust logging dynamically at runtime.

## Default Log4j2 configuration

The default `log4j2.xml` (Zeebe, Operate, Tasklist, Identity) representation:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Configuration xmlns="https://logging.apache.org/xml/ns"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="
                   https://logging.apache.org/xml/ns
                   https://logging.apache.org/xml/ns/log4j-config-2.xsd" status="WARN" shutdownHook="disable">
  <Properties>
    <Property name="log.path" value="${sys:app.home}/logs" />
    <Property name="log.pattern" value="[%d{yyyy-MM-dd HH:mm:ss.SSS}] [%t] %notEmpty{[%X] }%-5level%n\t%logger{36} - %msg%n" />
    <Property name="log.stackdriver.serviceName" value="${env:ZEEBE_LOG_STACKDRIVER_SERVICENAME:-${env:OPERATE_LOG_STACKDRIVER_SERVICENAME:-${env:OPTIMIZE_LOG_STACKDRIVER_SERVICENAME:-${env:TASKLIST_LOG_STACKDRIVER_SERVICENAME:-}}}}"/>
    <Property name="log.stackdriver.serviceVersion" value="${env:ZEEBE_LOG_STACKDRIVER_SERVICEVERSION:-${env:OPERATE_LOG_STACKDRIVER_SERVICEVERSION:-${env:OPTIMIZE_LOG_STACKDRIVER_SERVICEVERSION:-${env:TASKLIST_LOG_STACKDRIVER_SERVICEVERSION:-}}}}"/>
  </Properties>

  <Appenders>
    <Console name="Console" target="SYSTEM_OUT">
      <PatternLayout
        pattern="${log.pattern}"/>
    </Console>

    <Console name="Stackdriver" target="SYSTEM_OUT">
      <JsonTemplateLayout charset="UTF-8"
        eventTemplateUri="classpath:logging/StackdriverLayout.json"
        locationInfoEnabled="true"
        stackTraceEnabled="true"/>
    </Console>

    <Select>
      <EnvironmentArbiter propertyName="CAMUNDA_LOG_FILE_APPENDER_ENABLED" propertyValue="false">
        <Null name="RollingFile" />
      </EnvironmentArbiter>
      <DefaultArbiter>
        <RollingFile name="RollingFile" fileName="${log.path}/zeebe.log"
          filePattern="${log.path}/zeebe-%d{yyyy-MM-dd}-%i.log.gz">
          <PatternLayout pattern="${log.pattern}" />
          <Policies>
            <TimeBasedTriggeringPolicy/>
            <SizeBasedTriggeringPolicy size="250 MB"/>
          </Policies>
        </RollingFile>
      </DefaultArbiter>
    </Select>
  </Appenders>

  <Loggers>
    <Logger name="io.camunda" level="${env:CAMUNDA_LOG_LEVEL:-INFO}" />
    <Logger name="io.camunda.zeebe" level="${env:ZEEBE_LOG_LEVEL:-${env:CAMUNDA_LOG_LEVEL:-INFO}}" />
    <Logger name="io.atomix" level="${env:ATOMIX_LOG_LEVEL:-${env:CAMUNDA_LOG_LEVEL:-INFO}}" />
    <Logger name="org.elasticsearch" level="${env:ES_LOG_LEVEL:-WARN}" />
    <Logger name="org.springframework" level="INFO" />

    <Root level="WARN">
      <AppenderRef ref="RollingFile" />

      <!-- remove to disable console logging -->
      <AppenderRef ref="${env:ZEEBE_LOG_APPENDER:-${env:OPERATE_LOG_APPENDER:-${env:OPTIMIZE_LOG_APPENDER:-${env:TASKLIST_LOG_APPENDER:-Console}}}}"/>
    </Root>
  </Loggers>

</Configuration>
```

:::note
This is a simplified example. The actual `log4j2.xml` may include additional appenders, different file paths, or slightly different patterns.  
See the full [logging documentation](/self-managed/components/orchestration-cluster/core-settings/configuration/logging.md#default-logging-configuration) for the official default file and additional settings.
:::

## Environment variables

| Purpose             | Variable            | Component(s)        | Example / Notes               |
| ------------------- | ------------------- | ------------------- | ----------------------------- |
| Global log level    | `CAMUNDA_LOG_LEVEL` | All                 | `DEBUG`, `INFO`, `WARN`, etc. |
| Zeebe package level | `ZEEBE_LOG_LEVEL`   | Zeebe               | Overrides global level        |
| Atomix / clustering | `ATOMIX_LOG_LEVEL`  | Atomix / Raft       | Default WARN if unset         |
| Elasticsearch logs  | `ES_LOG_LEVEL`      | `org.elasticsearch` |                               |

## JSON logging appenders

| Appender           | Description                                         | Enable / Variable                                                 |
| ------------------ | --------------------------------------------------- | ----------------------------------------------------------------- |
| Console            | Standard text output                                | `*_LOG_APPENDER=Console`                                          |
| Stackdriver (JSON) | JSON output for Google Cloud / Stackdriver          | `*_LOG_APPENDER=Stackdriver`                                      |
| RollingFile        | Writes logs to a rotating file, disabled by default | `CAMUNDA_LOG_FILE_APPENDER_ENABLED=true` + set component variable |

## Pattern layout/format

- Default layout shows **time only**, thread name, MDC context, log level, logger name, and message.

**Example pattern:**

```perl
%d{HH:mm:ss.SSS} [%t] %notEmpty{[%X] }%-5level %logger{36} - %msg%n
```

| Feature             | Old pattern         | New pattern                        |
| ------------------- | ------------------- | ---------------------------------- |
| Timestamp           | Full date and time  | Time only                          |
| Logger name         | Up to 36 characters | Package initials + full class name |
| Newline after level | Yes                 | No                                 |
| Tab before logger   | Yes                 | No                                 |

## Changing log level at runtime

You can adjust log levels dynamically using Spring Boot Actuator endpoints:

```bash
curl 'http://localhost:9600/actuator/loggers/io.camunda' \
  -i -X POST \
  -H 'Content-Type: application/json' \
  -d '{"configuredLevel":"DEBUG"}'
```

Replace `io.camunda` with the logger you want to adjust.

## Sensitive data

By default, loggers that may handle sensitive information (e.g., variable values, actor names) are set to **INFO**.  
To capture more detail (DEBUG or TRACE), explicitly configure those loggers via their logger names or component-specific variables.

:::warning
Enabling verbose logging may expose sensitive data. Use debug/trace levels only temporarily for troubleshooting.
:::

## Best practices

- Always check the inline default configuration before customizing.
- Use component-specific `*_LOG_LEVEL` and `*_LOG_APPENDER` variables for fine-grained control.
- Enable the RollingFile or Stackdriver appenders only when needed; console is simpler for stdout logs.
- Monitor logging setup across environments (dev/test/prod) to avoid surprises caused by log verbosity.
