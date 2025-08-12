---
id: logging
title: Logging
description: Configuration settings for logging in the Camunda Platform 8 orchestration cluster components.
---

This page covers logging configuration for the Camunda Platform 8 orchestration cluster components. Logging is handled via the Log4j2 framework and can be customized to suit your needs, including output formats, logging levels, and runtime log level adjustments.

## Log4j2 configuration

Each orchestration cluster component includes a default Log4j2 configuration file that can be modified to adjust logging behavior:

- Location of the configuration file depends on the deployment (e.g., distribution archive, Docker image).
- The default setup uses a `ConsoleAppender` to output logs to the system console.

### Example Log4j2 configuration snippet

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

## JSON logging configuration

Logs can optionally be output in JSON format, compatible with Stackdriver. To enable JSON logging, set the environment variable:

```bash
LOG_APPENDER=Stackdriver
```

:::note
Set this variable appropriately for each component's environment.
:::

## Changing logging levels at runtime

Camunda components support changing logging levels dynamically at runtime through the Spring Boot Actuator logging endpoints.

To change the logging level for a component, send a POST request to the actuator API:

```bash
curl 'http://localhost:9600/actuator/loggers/io.camunda' -i -X POST \
-H 'Content-Type: application/json' \
-d '{"configuredLevel":"debug"}'
```

Replace `io.camunda` with the relevant package prefix for your component if needed.

For more details, refer to the [Spring Boot Actuator documentation on setting log levels](https://docs.spring.io/spring-boot/index.html).
