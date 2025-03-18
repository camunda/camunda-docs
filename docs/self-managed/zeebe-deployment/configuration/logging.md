---
id: logging
title: "Logging"
---

The Camunda 8 orchestration cluster uses Log4j2 framework for logging. In the distribution and the Docker image, find the default log configuration file
in `config/log4j2.xml`.

## Google Stackdriver (JSON) logging

To enable Google Stackdriver compatible JSON logging, set the environment variable `ZEEBE_LOG_APPENDER=Stackdriver` before starting Zeebe.

## Default logging configuration

[You can find the default log4j2.xml used by the application here](https://github.com/camunda/camunda/blob/main/dist/src/main/config/log4j2.xml).

It will configure the default [log level](https://logging.apache.org/log4j/2.x/manual/customloglevels.html) to be `WARN` for all except for the
following as `INFO`:

- Camunda 8 (anything under `io.camunda` and `io.atomix`)
- Spring and Spring Boot (anything under `org.springframework`)

:::note
[See our documentation on log levels to understand what the various log levels mean.](../../operational-guides/monitoring/log-levels.md)
:::

You can control the log level for the orchestration cluster via the `CAMUNDA_LOG_LEVEL` environment variable, e.g. `CAMUNDA_LOG_LEVEL=DEBUG`, or
`CAMUNDA_LOG_LEVEL=ERROR`.

:::note
You can further use the following environment variables to set the log level for certain components of the application, but we recommend using the general
`CAMUNDA_LOG_LEVEL` unless you really know what you're doing.

- `ZEEBE_LOG_LEVEL`: will set the level for anything under `io.camunda.zeebe`, i.e. Zeebe related.
- `ATOMIX_LOG_LEVEL`: will set the level for anything clustering or raft related.
- `OPTIMIZE_LOG_LEVEL`: will set the level for anything under `io.camunda.optimize`.
- `ES_LOG_LEVEL`: will set the level for anything under `org.elasticsearch`.
  :::

Additionally, it will configure three possible [appenders](https://logging.apache.org/log4j/2.x/manual/appenders.html) (aka outputs):

- `RollingFile`: [A rolling file appender](https://logging.apache.org/log4j/2.x/manual/appenders/rolling-file.html) which prints out to a file
  (by default, `logs/zeebe.log` relative from the distribution root). After a day, or once that file reaches 250MB, the file is "rolled" into a
  compressed archive, and a new one is started. **This is enabled by default. You can disable it by setting the environment variable
  `CAMUNDA_LOG_FILE_APPENDER_ENABLED=false`**.
- `Console`: will output using the [Console Appender](https://logging.apache.org/log4j/2.x/manual/appenders.html#ConsoleAppender) and a
  [pattern layout](https://logging.apache.org/log4j/2.x/manual/pattern-layout.html), directly to standard out. **This is enabled by default, and is
  mutually exclusive with the `Stackdriver` appender. You can select one them via `ZEEBE_LOG_APPENDER`, e.g. `ZEEBE_LOG_APPENDER=Console` or
  `ZEEBE_LOG_APPENDER=Stackdriver`.**
- `Stackdriver`: another console appender, but configured to print out JSON logs which conform to the
  [expected Stackdriver format](https://cloud.google.com/logging/docs/reference/v2/rest/v2/LogEntry). **This is not enabled by default, and you can
  select it by setting `ZEEBE_LOG_APPENDER=Stackdriver`.**

## Change log level dynamically

Zeebe brokers expose a [Spring Boot Actuators web endpoint](https://docs.spring.io/spring-boot/docs/current/actuator-api/html/#loggers) for configuring loggers dynamically.
To change the log level of a logger, make a `POST` request to the `/actuator/loggers/{logger.name}` endpoint as shown in the example below.
Change `io.camunda.zeebe` to the required logger name and `debug` to required log level.

```
curl 'http://localhost:9600/actuator/loggers/io.camunda.zeebe' -i -X POST -H 'Content-Type: application/json' -d '{"configuredLevel":"debug"}'
```
