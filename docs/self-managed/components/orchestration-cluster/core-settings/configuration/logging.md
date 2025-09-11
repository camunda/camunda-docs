---
id: logging
title: Logging
description: Configure and manage logging for the Camunda 8 Self-Managed Orchestration Cluster components.
---

This page explains how to configure, customize, and manage logging in the **Camunda 8 Self-Managed Orchestration Cluster**.  
The cluster consists of **Zeebe**, **Operate**, **Tasklist**, and **Identity**. All use the **Log4j2** framework for logging.

You can configure output formats, log levels, appenders, and change log levels dynamically at runtime.

## Default Log4j2 configuration

Here’s a representative snippet of the default `log4j2.xml` configuration (for Zeebe, Operate, Tasklist, Identity) for Camunda 8:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Configuration status="WARN">
  <Appenders>
    <Console name="Console" target="SYSTEM_OUT">
      <PatternLayout pattern="%d{HH:mm:ss.SSS} [%t] %notEmpty{[%X] }%-5level %logger{36} - %msg%n"/>
    </Console>

    <Console name="Stackdriver" target="SYSTEM_OUT">
      <StackdriverLayout />
    </Console>

    <RollingFile name="RollingFile"
                 fileName="logs/app.log"
                 filePattern="logs/app-%d{yyyy-MM-dd}-%i.log.gz">
      <PatternLayout pattern="%d{HH:mm:ss.SSS} [%t] %notEmpty{[%X] }%-5level %logger{36} - %msg%n"/>
      <Policies>
        <TimeBasedTriggeringPolicy interval="1"/>
        <SizeBasedTriggeringPolicy size="250 MB"/>
      </Policies>
    </RollingFile>
  </Appenders>

  <Loggers>
    <Logger name="io.camunda" level="INFO"/>
    <Logger name="io.atomix" level="WARN"/>
    <Logger name="org.springframework" level="INFO"/>

    <Root level="WARN">
      <AppenderRef ref="Console"/>
      <AppenderRef ref="${env:ZEEBE_LOG_APPENDER:-Console}"/>
      <AppenderRef ref="RollingFile"/>
    </Root>
  </Loggers>
</Configuration>
```

:::note
Note: This is a simplified, illustrative default. The actual `log4j2.xml` in your version may have additional appenders, different file paths, or slightly different patterns.

See the full [logging documentation](/self-managed/components/orchestration-cluster/core-settings/configuration/logging.md#default-logging-configuration) for the official default file and additional settings.
:::

## Environment variables for configuration

| Purpose                   | Environment Variable | Applies to Component(s)    | Example Value / Notes           |
| ------------------------- | -------------------- | -------------------------- | ------------------------------- |
| Global log level          | `CAMUNDA_LOG_LEVEL`  | All components             | `DEBUG`, `INFO`, `ERROR`        |
| Zeebe package level       | `ZEEBE_LOG_LEVEL`    | Zeebe (`io.camunda.zeebe`) | Overrides global for Zeebe logs |
| Atomix / clustering level | `ATOMIX_LOG_LEVEL`   | Clustering / Raft          | Default WARN if unset           |
| Elasticsearch logs        | `ES_LOG_LEVEL`       | `org.elasticsearch`        | Same pattern                    |

## Appenders (log outputs)

The following appenders are supported. Only one non-console appender is used at a time per component (console or Stackdriver, plus optional file rolling appender).

| Appender           | Description                                                            | How to Enable / Variable                                                                         |
| ------------------ | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Console            | Default text output to standard out with pattern layout                | `ZEEBE_LOG_APPENDER=Console`, `OPERATE_LOG_APPENDER=Console`, etc.                               |
| Stackdriver (JSON) | JSON format for compatibility with Google Cloud Logging / Stackdriver  | `ZEEBE_LOG_APPENDER=Stackdriver` (and similarly for other components)                            |
| RollingFile        | Logs to a file, rotated/compressed as configured. Disabled by default. | `CAMUNDA_LOG_FILE_APPENDER_ENABLED=true` **and** set correct `*_LOG_APPENDER` variable if needed |

## Pattern layout/format

- Default layout shows **time only** (no full date), thread name, MDC context (if any), log level, logger name, and message.
- Example pattern:

```perl
%d{HH:mm:ss.SSS} [%t] %notEmpty{[%X] }%-5level %logger{36} - %msg%n
```

## Changing log level at runtime

You can dynamically adjust log levels using Spring Boot Actuator endpoints.

```bash
curl 'http://localhost:9600/actuator/loggers/io.camunda' \
  -i -X POST \
  -H 'Content-Type: application/json' \
  -d '{"configuredLevel":"DEBUG"}'
```

Replace `io.camunda` with the logger you want to adjust.

## Sensitive data and logging

By default, loggers that may handle sensitive information (for example, variable values, actor names, etc.) are set to **INFO** level.

To capture more detail (DEBUG or TRACE), you must explicitly configure those loggers via their logger names or component-specific variables. Be careful: enabling verbose logging may expose sensitive data. Use debug/trace levels only temporarily for troubleshooting.

## Additional notes

- Always check the inline default configuration first before customizing.
- Use the component-specific `*_LOG_LEVEL` and `*_LOG_APPENDER` variables for fine-grained control.
- Only enable the file appender (RollingFile) or Stackdriver when needed; console is simpler for stdout logs.
- Monitor differences across environments (dev/test/prod) to avoid surprises caused by log verbosity.
