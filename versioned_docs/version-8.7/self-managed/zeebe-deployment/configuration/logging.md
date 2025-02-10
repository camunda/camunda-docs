---
id: logging
title: "Logging"
---

Zeebe uses Log4j2 framework for logging. In the distribution and the Docker image, find the default log configuration file in `config/log4j2.xml`.

## Google Stackdriver (JSON) logging

To enable Google Stackdriver compatible JSON logging, set the environment variable `ZEEBE_LOG_APPENDER=Stackdriver` before starting Zeebe.

## Default logging configuration

- `config/log4j2.xml` (applied by default)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Configuration status="WARN" shutdownHook="disable">

  <Properties>
    <Property name="log.path">${sys:app.home}/logs</Property>
    <Property name="log.pattern">%d{yyyy-MM-dd HH:mm:ss.SSS} [%X{actor-name}] [%t] %-5level %logger{36} - %msg%n</Property>
    <Property name="log.stackdriver.serviceName">${env:ZEEBE_LOG_STACKDRIVER_SERVICENAME:-}</Property>
    <Property name="log.stackdriver.serviceVersion">${env:ZEEBE_LOG_STACKDRIVER_SERVICEVERSION:-}</Property>
  </Properties>

  <Appenders>
    <Console name="Console" target="SYSTEM_OUT">
      <PatternLayout
        pattern="${log.pattern}"/>
    </Console>

    <Console name="Stackdriver" target="SYSTEM_OUT">
      <StackdriverLayout serviceName="${log.stackdriver.serviceName}"
        serviceVersion="${log.stackdriver.serviceVersion}" />
    </Console>

    <RollingFile name="RollingFile" fileName="${log.path}/zeebe.log"
      filePattern="${log.path}/zeebe-%d{yyyy-MM-dd}-%i.log.gz">
      <PatternLayout>
        <Pattern>${log.pattern}</Pattern>
      </PatternLayout>
      <Policies>
        <TimeBasedTriggeringPolicy/>
        <SizeBasedTriggeringPolicy size="250 MB"/>
      </Policies>
    </RollingFile>
  </Appenders>

  <Loggers>
    <Logger name="io.camunda.zeebe" level="${env:ZEEBE_LOG_LEVEL:-info}"/>

    <Logger name="io.atomix" level="${env:ATOMIX_LOG_LEVEL:-warn}"/>

    <Root level="info">
      <AppenderRef ref="RollingFile"/>

      <!-- remove to disable console logging -->
      <AppenderRef ref="${env:ZEEBE_LOG_APPENDER:-Console}"/>
    </Root>
  </Loggers>

</Configuration>
```

## Change log level dynamically

Zeebe brokers expose a [Spring Boot Actuators web endpoint](https://docs.spring.io/spring-boot/docs/current/actuator-api/html/#loggers) for configuring loggers dynamically.
To change the log level of a logger, make a `POST` request to the `/actuator/loggers/{logger.name}` endpoint as shown in the example below.
Change `io.camunda.zeebe` to the required logger name and `debug` to required log level.

```
curl 'http://localhost:9600/actuator/loggers/io.camunda.zeebe' -i -X POST -H 'Content-Type: application/json' -d '{"configuredLevel":"debug"}'
```
