---
id: logging
title: Logging
description: Configure and manage logging for the Camunda 8 Self-Managed Orchestration Cluster components.
---

This page explains how to configure, customize, and manage logging in the **Camunda 8 Self-Managed Orchestration Cluster**.  
The Orchestration Cluster includes **Tasklist**, **Operate**, **Zeebe**, and **Identity**, and uses the **Log4j2** framework for logging.

You can configure output formats, logging levels, appenders, and change log levels dynamically at runtime.

## Log4j2 configuration

Each Orchestration Cluster deployment includes a single Log4j2 configuration file (`log4j2.xml`):

- **Default location**: Depends on the deployment type (distribution archive, Docker image, or Kubernetes).
- **Default appender**: `ConsoleAppender`, which writes logs to standard output.
- **Default log level**: `WARN` for most packages, with `INFO` for:
  - Camunda 8 (`io.camunda` and `io.atomix`)
  - Spring and Spring Boot (`org.springframework`)

You can view the default `log4j2.xml` in the  
[GitHub repository](https://github.com/camunda/camunda/blob/main/dist/src/main/config/log4j2.xml).

### Example Log4j2 configuration

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Configuration status="WARN" monitorInterval="30">
  <Properties>
    <Property name="LOG_PATTERN">%clr{%d{yyyy-MM-dd HH:mm:ss.SSS}}{faint} %clr{%5p} %clr{${sys:PID}}{magenta} %clr{---}{faint} %clr{[%15.15t]}{faint} %clr{%-40.40c{1.}}{cyan} %clr{:}{faint} %m%n%xwEx</Property>
  </Properties>
  <Appenders>
    <Console name="Console" target="SYSTEM_OUT" follow="true">
      <PatternLayout pattern="${LOG_PATTERN}"/>
    </Console>
    <Console name="Stackdriver" target="SYSTEM_OUT" follow="true">
      <StackdriverJSONLayout/>
    </Console>
  </Appenders>
  <Loggers>
    <Logger name="io.camunda" level="info" />
    <Root level="info">
      <AppenderRef ref="${env:LOG_APPENDER:-Console}"/>
    </Root>
  </Loggers>
</Configuration>
```

## Environment variables for log levels

You can set log levels globally or per component using environment variables.

- **Global log level**
  - `CAMUNDA_LOG_LEVEL` (e.g., `DEBUG`, `INFO`, `ERROR`)
  - Recommended for most use cases.
- **Component-specific log levels (use only if you need finer control)**
  - `ZEEBE_LOG_LEVEL` – `io.camunda.zeebe` (Zeebe-related logs)
  - `ATOMIX_LOG_LEVEL` – Clustering and Raft logs
  - `ES_LOG_LEVEL` – `org.elasticsearch` logs

## Appenders (output formats)

Log4j2 appenders define how logs are output. The Orchestration Cluster supports:

1. **Console** - Default. Outputs formatted text logs to standard out. Select with `ZEEBE_LOG_APPENDER=Console`.
2. **Stackdriver (JSON format)** - Outputs logs in JSON format compatible with [Google Cloud Logging/Stackdriver](https://cloud.google.com/logging/docs/reference/v2/rest/v2/LogEntry). Select with `ZEEBE_LOG_APPENDER=Stackdriver`.
3. **Rolling file** - Writes logs to a file that rotates and compresses old logs. Enabled by default; disable with `CAMUNDA_LOG_FILE_APPENDER_ENABLED=false`.

## JSON logging

To enable JSON logging (Stackdriver format) for any component:

`LOG_APPENDER=Stackdriver`

Set this variable for each component’s environment as needed.

## Changing log levels at runtime

The Orchestration Cluster supports dynamic log level changes via the
[`Spring Boot Actuator loggers endpoint`](https://docs.spring.io/spring-boot/docs/current/actuator-api/html/#loggers).

Example for a local component:

```bash
curl 'http://localhost:9600/actuator/loggers/io.camunda' \
  -i -X POST \
  -H 'Content-Type: application/json' \
  -d '{"configuredLevel":"debug"}'
```

Replace `io.camunda` with the logger name you want to adjust.

## Notes

- Learn more about [log levels](/self-managed/operational-guides/monitoring/log-levels.md).
- The Orchestration Cluster uses Log4j2 by default in both distributions and Docker images.
- Adjusting logging can help with troubleshooting, performance optimization, and integration with external monitoring systems.
