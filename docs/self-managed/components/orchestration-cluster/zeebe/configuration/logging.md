---
id: logging
title: "Logging"
---

The Camunda 8 Orchestration Cluster uses Log4j2 framework for logging. In the distribution and the Docker image, find the default log configuration file
in `config/log4j2.xml`.

## Default logging configuration

You can find the default log4j2.xml used by the application in the [GitHub repository](https://github.com/camunda/camunda/blob/main/dist/src/main/config/log4j2.xml).

It configures the [log level](https://logging.apache.org/log4j/2.x/manual/customloglevels.html) to `WARN` by default, and sets the following exceptions to `INFO`:

- Camunda 8 (anything under `io.camunda` and `io.atomix`)
- Spring and Spring Boot (anything under `org.springframework`)

:::note
For more information, see the documentation on [log levels](../../../../operational-guides/monitoring/log-levels.md).
:::

The log level for the Orchestration Cluster is controlled via the `CAMUNDA_LOG_LEVEL` environment variable (for example, `CAMUNDA_LOG_LEVEL=DEBUG`, or
`CAMUNDA_LOG_LEVEL=ERROR`). The log levels for individual components can be set using additional [environment variables](#component-log-levels).

Additionally, it configures three possible [appenders](https://logging.apache.org/log4j/2.x/manual/appenders.html) (outputs):

- `RollingFile`: A [rolling file appender](https://logging.apache.org/log4j/2.x/manual/appenders/rolling-file.html), which prints out to a file
  compressed archive, and a new one is started. **This is enabled by default. You can disable it by setting the environment variable
  `CAMUNDA_LOG_FILE_APPENDER_ENABLED=false`**.
- `Stackdriver`: will output using the [Console Appender](https://logging.apache.org/log4j/2.x/manual/appenders.html#ConsoleAppender), configured to
  print out JSON logs which conform to the [expected Stackdriver format](https://cloud.google.com/logging/docs/reference/v2/rest/v2/LogEntry).
  **This is not enabled by default, and you can select it by setting `ZEEBE_LOG_APPENDER=Stackdriver`.**
- `Console`: will output using the [Console Appender](https://logging.apache.org/log4j/2.x/manual/appenders.html#ConsoleAppender) and a
  [pattern layout](https://logging.apache.org/log4j/2.x/manual/pattern-layout.html), directly to standard out. **This is enabled by default, and is
  mutually exclusive with the `Stackdriver` appender. You can select one them via `ZEEBE_LOG_APPENDER`, e.g. `ZEEBE_LOG_APPENDER=Console` or
  `ZEEBE_LOG_APPENDER=Stackdriver`.**

### Component log levels

The following environment variables can be used to set the log level for individual components of the application. However, using the general
`CAMUNDA_LOG_LEVEL` is recommended unless these components are fully understood.

- `ZEEBE_LOG_LEVEL`: Sets the level for anything under `io.camunda.zeebe` (Zeebe related logs).
- `ATOMIX_LOG_LEVEL`: Sets the level for anything clustering or raft related.
- `ES_LOG_LEVEL`: Sets the level for anything under `org.elasticsearch`.

## Change log level dynamically

Zeebe brokers expose a [Spring Boot Actuators web endpoint](https://docs.spring.io/spring-boot/docs/current/actuator-api/html/#loggers) for configuring loggers dynamically.
To change the log level of a logger, make a `POST` request to the `/actuator/loggers/{logger.name}` endpoint as shown in the example below.
Change `io.camunda.zeebe` to the required logger name and `debug` to required log level.

```
curl 'http://localhost:9600/actuator/loggers/io.camunda.zeebe' -i -X POST -H 'Content-Type: application/json' -d '{"configuredLevel":"debug"}'
```
