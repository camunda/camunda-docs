---
id: logging
title: "Logging"
description: "Here, we'll take a look at logging details in the case a job handler fails execution."
---

The client uses SLF4J for logging useful notes, such as exception stack traces when a job handler fails execution. Using the SLF4J API, any SLF4J implementation can be plugged in. The following example uses Log4J 2:

## Maven dependencies

```xml
<dependency>
  <groupId>org.apache.logging.log4j</groupId>
  <artifactId>log4j-slf4j-impl</artifactId>
  <version>2.8.1</version>
</dependency>

<dependency>
  <groupId>org.apache.logging.log4j</groupId>
  <artifactId>log4j-core</artifactId>
  <version>2.8.1</version>
</dependency>
```

## Configuration

First, add a file called `log4j2.xml` to the classpath of your application.

Then, add the following content:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Configuration status="WARN" strict="true"
    xmlns="http://logging.apache.org/log4j/2.0/config"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://logging.apache.org/log4j/2.0/config https://raw.githubusercontent.com/apache/logging-log4j2/log4j-2.8.1/log4j-core/src/main/resources/Log4j-config.xsd">
  <Appenders>
    <Console name="Console" target="SYSTEM_OUT">
      <PatternLayout pattern="%d{HH:mm:ss.SSS} [%t] %-5level Java Client: %logger{36} - %msg%n"/>
    </Console>
  </Appenders>
  <Loggers>
    <Root level="info">
      <AppenderRef ref="Console"/>
    </Root>
  </Loggers>
</Configuration>
```

This will log every log message to the console.
