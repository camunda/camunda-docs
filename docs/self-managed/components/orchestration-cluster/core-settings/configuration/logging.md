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

### Default Log4J2 configuration

```yaml reference
https://github.com/camunda/camunda/blob/stable/8.8/dist/src/main/config/log4j2.xml
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
3. **Rolling file** - Writes logs to a file that rotates and compresses old logs. Disabled by default; enable with `CAMUNDA_LOG_FILE_APPENDER_ENABLED=true`.

## JSON logging

To enable JSON logging (Stackdriver format) for any component:

`ZEEBE_LOG_APPENDER=Stackdriver`

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

## Sensitive data

Camunda 8 avoids logging sensitive data, such as personally identifiable information (PII) or unencrypted business-relevant data. However, you may sometimes want to enable this logging for debugging purposes.

By default, all loggers that could log sensitive information (for example, variable values) are set to **INFO** level. To enable debug logging for these loggers, it is **not sufficient** to set `ZEEBE_LOG_LEVEL` alone. You must explicitly configure the logging level to a level lower than INFO for the relevant loggers.

:::warning
Enabling the following loggers may expose sensitive data in your logs. Use with caution.
:::

### RDBMS

For exported records:

```properties
logging.level.io.camunda.exporter.rdbms.RdbmsExporter=TRACE
```

For executed SQLs and parameters:

```properties
logging.level.io.camunda.db.rdbms.sql=DEBUG
```

## Notes

- Learn more about [log levels](/self-managed/operational-guides/monitoring/log-levels.md).
- The Orchestration Cluster uses Log4j2 by default in both distributions and Docker images.
- Adjusting logging can help with troubleshooting, performance optimization, and integration with external monitoring systems.
