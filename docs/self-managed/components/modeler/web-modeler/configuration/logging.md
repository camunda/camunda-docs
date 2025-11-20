---
id: logging
title: "Logging"
description: "Read details on additional logging configuration for Web Modeler."
---

## Logging configuration for the `restapi` component

Web Modeler's `restapi` component uses the [Apache Log4j 2 framework](https://logging.apache.org/log4j/2.x/) for logging. By default, the
`restapi` component logs to the Docker container's standard output. To change the default logging behavior, create a
custom configuration file and let the `restapi` know of it by specifying the following environment variable:

```properties
LOGGING_CONFIG=file:/full/path/to/custom-log4j2-spring.xml
```

Refer to [Spring Boot's logging documentation](https://docs.spring.io/spring-boot/how-to/logging.html#howto.logging.log4j)
for more information on how to customize the log4j2 configuration for specific use cases like logging to a file.

Enabling `DEBUG` logging for the `restapi` component can be useful for troubleshooting purposes, e.g. for
[debugging Zeebe connection issues](../troubleshooting/troubleshoot-zeebe-connection.md#how-can-i-debug-log-grpc--zeebe-communication).

By default, Web Modeler's `restapi` component logs in simple readable format to the console.

You can configure log levels, output formats, appenders, and adjust logging dynamically at runtime.

### Changing log level at runtime

You can adjust log levels dynamically using Spring Boot Actuator [`loggers`](https://docs.spring.io/spring-boot/api/rest/actuator/loggers.html) endpoints:

```bash
curl 'http://localhost:8091/actuator/loggers/io.camunda' \
  -i -X POST \
  -H 'Content-Type: application/json' \
  -d '{"configuredLevel":"DEBUG"}'
```

Replace `io.camunda` with the logger you want to adjust.

:::note
The base URL may differ depending on your environment configuration. The example above assumes execution from the same host running the Web Modeler `restapi` component. This URL is only callable via the [management port](https://docs.spring.io/spring-boot/reference/actuator/monitoring.html#actuator.monitoring.customizing-management-server-port), usually not publicly available.
:::

### Default Log4j2 configuration

The default `log4j2-spring.xml` used by Web Modeler's `restapi` component is:

```xml
<Configuration xmlns="https://logging.apache.org/xml/ns"
               xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
               xsi:schemaLocation="
                   https://logging.apache.org/xml/ns
                   https://logging.apache.org/xml/ns/log4j-config-2.xsd" status="WARN" shutdownHook="disable">

  <Properties>
    <Property name="log.path" value="${sys:app.home}/logs" />
    <Property name="log.pattern" value="[%d{yyyy-MM-dd HH:mm:ss.SSS}] [%t] %notEmpty{[%X] }%-5level%n\t%logger{36} - %msg%n" />
  </Properties>

  <Appenders>
    <Console name="Console" target="SYSTEM_OUT" follow="true">
      <PatternLayout pattern="${log.pattern}"/>
    </Console>

    <Console name="Stackdriver" target="SYSTEM_OUT" follow="true">
      <JsonTemplateLayout charset="UTF-8"
          eventTemplateUri="classpath:logging/StackdriverLayout.json"
          locationInfoEnabled="true"
          stackTraceEnabled="true"/>
    </Console>

    <Select>
      <EnvironmentArbiter propertyName="CAMUNDA_LOG_FILE_APPENDER_ENABLED" propertyValue="true">
        <RollingFile name="RollingFile" fileName="${log.path}/camunda-modeler.log"
                     filePattern="${log.path}/camunda-modeler-%d{yyyy-MM-dd}-%i.log.gz">
          <PatternLayout pattern="${log.pattern}" />
          <Policies>
            <TimeBasedTriggeringPolicy/>
            <SizeBasedTriggeringPolicy size="250 MB"/>
          </Policies>
        </RollingFile>
      </EnvironmentArbiter>
      <DefaultArbiter>
        <Null name="RollingFile" />
      </DefaultArbiter>
    </Select>
  </Appenders>

  <Loggers>

    <Logger name="io.camunda" level="${env:CAMUNDA_LOG_LEVEL:-INFO}" />
    <Logger name="io.camunda.modeler" level="${env:CAMUNDA_MODELER_LOG_LEVEL:-${env:CAMUNDA_LOG_LEVEL:-INFO}}" />
    <Logger name="org.springframework" level="INFO" />

    <Root level="INFO">
      <AppenderRef ref="RollingFile" />

      <!-- remove to disable console logging -->
      <AppenderRef ref="${env:CAMUNDA_MODELER_LOG_APPENDER:-Console}"/>
    </Root>
  </Loggers>
</Configuration>
```

:::note
This is a simplified example. The actual `log4j2.xml` may include additional appenders, different file paths, or slightly different patterns.  
:::

## Environment variables

| Purpose               | Variable                    | Component(s) | Example / Notes               |
| --------------------- | --------------------------- | ------------ | ----------------------------- |
| Global log level      | `CAMUNDA_LOG_LEVEL`         | All          | `DEBUG`, `INFO`, `WARN`, etc. |
| Modeler package level | `CAMUNDA_MODELER_LOG_LEVEL` | RestApi      | Overrides global level        |

### JSON logging appenders

| Appender           | Description                                         | Enable / Variable                                                                     |
| ------------------ | --------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Console            | Standard text output                                | `CAMUNDA_MODELER_LOG_APPENDER=Console`                                                |
| Stackdriver (JSON) | JSON output for Google Cloud / Stackdriver          | `CAMUNDA_MODELER_LOG_APPENDER=Stackdriver`                                            |
| RollingFile        | Writes logs to a rotating file, disabled by default | `CAMUNDA_LOG_FILE_APPENDER_ENABLED=true` + `CAMUNDA_MODELER_LOG_APPENDER=RollingFile` |

### JSON structure

When using the `Stackdriver` appender this is the entries structure:

| Field                                   | Type              | Description                                                                        |
| --------------------------------------- | ----------------- | ---------------------------------------------------------------------------------- |
| `timestamp`                             | string (ISO-8601) | Log event timestamp in UTC using pattern `yyyy-MM-dd'T'HH:mm:ss.SSS'Z'`.           |
| `severity`                              | string            | Normalized log severity mapped from Log4j level (e.g., TRACE→DEBUG, WARN→WARNING). |
| `message`                               | string            | The log message, stringified by the message resolver.                              |
| `logging.googleapis.com/sourceLocation` | object            | Metadata describing the location in source code where the log originated.          |
| ├─ `file`                               | string            | File name where the logging call occurred.                                         |
| ├─ `line`                               | number            | Line number in the source file.                                                    |
| └─ `function`                           | string            | Fully qualified class and method name (via `%C.%M`).                               |
| `logging.googleapis.com/labels`         | object (MDC)      | Key/value pairs from the Mapped Diagnostic Context.                                |
| `threadContext`                         | object            | Information about the thread producing the log event.                              |
| ├─ `id`                                 | number            | Thread ID.                                                                         |
| ├─ `name`                               | string            | Thread name.                                                                       |
| └─ `priority`                           | number            | Thread priority.                                                                   |
| `loggerName`                            | string            | The logger’s name (typically the class name).                                      |
| `exception`                             | string (optional) | Stringified stack trace of any thrown exception.                                   |
| `correlationId`                         | string (optional) | Value of the MDC entry `correlationId`, if present.                                |

Example:

```json
{
  "timestamp": "2025-11-20T10:55:57.885Z",
  "severity": "INFO",
  "message": "Example log message",
  "logging.googleapis.com/sourceLocation": {
    "file": "RequestLoggingFilter.java",
    "line": 91,
    "function": "io.camunda.modeler.util.logging.RequestLoggingFilter.customAfterRequest"
  },
  "logging.googleapis.com/labels": {
    "correlationId": "04284456-b95b-4121-a54b-6c48be6d3afd"
  },
  "threadContext": {
    "id": 55,
    "name": "http-nio-8081-exec-1",
    "priority": 5
  },
  "loggerName": "io.camunda.modeler.util.logging.RequestLoggingFilter",
  "correlationId": "04284456-b95b-4121-a54b-6c48be6d3afd"
}
```

### Pattern layout/format

- Default layout shows **time only**, thread name, MDC context, log level, logger name, and message.

**Example pattern:**

```perl
%d{HH:mm:ss.SSS} [%t] %notEmpty{[%X] }%-5level %logger{36} - %msg%n
```

| Feature             | Pattern                            |
| ------------------- | ---------------------------------- |
| Timestamp           | Time only                          |
| Logger name         | Package initials + full class name |
| Newline after level | No                                 |
| Tab before logger   | No                                 |

## Logging configuration for the `webapp` component

By default, the `webapp` component logs to the Docker container's standard output.

### Logging to a file

To enable additional log output to a file, adjust the following environment variable:

```properties
LOG_FILE_PATH=/full/path/to/log/file.log
```

### Configuring log levels

To control the verbosity of the logs, adjust the environment variables `LOG_LEVEL_CLIENT` (browser client) and `LOG_LEVEL_WEBAPP` (Node.js server).

```properties
LOG_LEVEL_CLIENT=DEBUG
```

:::info
For `LOG_LEVEL_*` options, see [understanding log levels](/self-managed/operational-guides/monitoring/log-levels.md#understanding-log-levels).
:::

## Logging configuration for the `websocket` component

By default, the `websocket` component logs to the Docker container's standard output.

### Logging to a file

To enable additional log output to a file, follow these steps:

1. Mount a volume to the directory `/var/www/html/storage/logs`. The logs will be written to a file named `laravel.log` located inside this directory.
2. Adjust the following environment variable:
   ```properties
   LOG_CHANNEL=single
   ```
