---
id: configure-logging
title: "Configure logging"
sidebar_label: "Configure logging"
description: "Learn how to configure logging in Identity."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

## Configuring logging

The Identity component uses the [Log4j2](https://logging.apache.org/log4j/2.x/) framework to control
the log level and log format.

The logging configuration that is included in the Identity image is:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Configuration status="WARN" monitorInterval="30">
    <Properties>
        <Property name="LOG_PATTERN">%clr{%d{yyyy-MM-dd HH:mm:ss.SSS}}{faint} %clr{%5p} %clr{${sys:PID}}{magenta}
            %clr{---}{faint} %clr{[%15.15t]}{faint} %clr{%-40.40c{1.}}{cyan} %clr{:}{faint} %m%n%xwEx
        </Property>
        <Property name="LOG_FILE_PATTERN">%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{1.} %enc{%msg}%n
        </Property>
        <Property name="LOG_FILE_NAME_PATTERN">logs/identity.%d{yyyy-MM-dd-mm-ss}.log</Property>
    </Properties>
    <Appenders>
        <Console name="Console" target="SYSTEM_OUT" follow="true">
            <PatternLayout pattern="${env:IDENTITY_LOG_PATTERN:-${LOG_PATTERN}}"/>
        </Console>
        <Console name="Stackdriver" target="SYSTEM_OUT" follow="true">
            <JsonTemplateLayout eventTemplateUri="classpath:GcpLayout.json" locationInfoEnabled="true"/>
        </Console>
        <RollingFile
                name="File"
                fileName="${env:IDENTITY_LOG_FILE_NAME:-logs/identity.log}"
                filePattern="${env:IDENTITY_LOG_FILE_NAME_PATTERN:-${LOG_FILE_NAME_PATTERN}}"
                append="true">
            <PatternLayout pattern="${env:IDENTITY_LOG_FILE_PATTERN:-${LOG_FILE_PATTERN}}"/>
            <Policies>
                <TimeBasedTriggeringPolicy interval="${env:IDENTITY_LOG_FILE_ROTATION_DAYS:-1}"/>
                <SizeBasedTriggeringPolicy size="${env:IDENTITY_LOG_FILE_ROTATION_SIZE:-50 MB}"/>
            </Policies>
        </RollingFile>
    </Appenders>
    <Loggers>
        <Logger name="io.camunda.identity" level="${env:IDENTITY_LOG_LEVEL:-info}"/>
        <Root level="warn">
            <AppenderRef ref="${env:IDENTITY_LOG_APPENDER:-Console}"/>
        </Root>
    </Loggers>
</Configuration>
```

### General configuration options

Identity provides support for configuring the log level:

| Environment variable | Accepted values                                  |
| -------------------- | ------------------------------------------------ |
| `IDENTITY_LOG_LEVEL` | OFF, FATAL, ERROR, WARN, INFO, DEBUG, TRACE, ALL |

### Supported logging outputs

As part of configuration Identity provides multiple appenders for outputting logs, to configure which logging appender
is
used, set the `IDENTITY_LOG_APPENDER` environment variable to one of the following `Console`, `Stackdriver`, or `File`:

<Tabs groupId="loggingAppenders" defaultValue="console" queryString values={[{label: 'Console', value: 'console', }, {label: 'Stackdriver', value: 'stackdriver', }, {label: 'File', value: 'file', },]} >
<TabItem value="console">

Console logging produces messages to standard output and is the default log appender. The Console log appender offers
additional
configuration options, these are:

| Environment variable   | Accepted values                                                                                                                           |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `IDENTITY_LOG_PATTERN` | _See the [Log4j2 pattern layout docs](https://logging.apache.org/log4j/2.x/manual/layouts.html#PatternLayout) for possible placeholders._ |

</TabItem>
<TabItem value="stackdriver">

The Stackdriver log appender produces messages to standard output in a format that is compatible with the GCP cloud
platform.

This appender uses
the [GCP layout](https://github.com/apache/logging-log4j2/blob/2.x/log4j-layout-template-json/src/main/resources/GcpLayout.json)
provided by the [Log4j2](https://logging.apache.org/log4j/2.x/manual/) library.

</TabItem>
<TabItem value="file">

The File log appender produces messages to a rotating log file. The File log appender offers additional configuration
options, these are:

| Environment variable              | Accepted values                                                                                                                                                          |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `IDENTITY_LOG_FILE_PATTERN`       | _See the [Log4j2 pattern layout docs](https://logging.apache.org/log4j/2.x/manual/layouts.html#PatternLayout) for possible placeholders._                                |
| `IDENTITY_LOG_FILE_ROTATION_DAYS` | _See the [Log4j2 time-based triggering policy -> interval](https://logging.apache.org/log4j/2.x/manual/appenders.html#timebased-triggering-policy) for possible values._ |
| `IDENTITY_LOG_FILE_ROTATION_SIZE` | _See the [Log4j2 size-bsed triggering policy](https://logging.apache.org/log4j/2.x/manual/appenders.html#sizebased-triggering-policy) for possible values._              |

</TabItem>
</Tabs>

### Providing your own logging configuration

You can provide your own configuration by mounting a configuration file to the Identity container and setting the path to the file using the following variable:

| Environment variable | Purpose                                                                                                       |
| -------------------- | ------------------------------------------------------------------------------------------------------------- |
| `LOGGING_CONFIG`     | The path to your [Log4j2 config XML](https://logging.apache.org/log4j/2.x/manual/configuration.html#XML) file |

:::note
To write logs to a file in a containerized environment, the mounted directory containing the log file has to be writable under the user running Identity.
:::
