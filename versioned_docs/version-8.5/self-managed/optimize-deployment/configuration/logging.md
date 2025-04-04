---
id: logging
title: "Logging"
description: "Camunda Optimize provides logging facilities that are preconfigured to use INFO logging level which provides minimal output of information in log files."
---

Camunda Optimize provides logging facilities that are preconfigured to use
_INFO_ logging level which provides minimal output of information in log files.
This level can be adjusted using the `environment-logback.xml` configuration file.

## Google Stackdriver (JSON) logging

To enable Google Stackdriver compatible JSON logging, set the environment variable `JSON_LOGGING=true` before starting Optimize.

## Default logging configuration

Although one could potentially configure logging levels for all packages, it
is recommended to set logging levels for the following three Optimize parts using only exact package
reference as follows:

- Optimize runtime environment:

```xml
<logger name="org.camunda.optimize" level="info" />
```

- Optimize update:

```xml
<logger name="org.camunda.optimize.update" level="info">
  <appender-ref ref="UPGRADE"/>
</logger>
```

- Communication to Elasticsearch:

```xml
<logger name="org.elasticsearch" level="warn" />
```

If you are running Optimize with Docker, use the following environment variables to configure its logging levels:

- `OPTIMIZE_LOG_LEVEL`: Sets the logging level for the Optimize log.
- `UPGRADE_LOG_LEVEL`: Sets the logging level for the Optimize update log.
- `ES_LOG_LEVEL`: Sets the logging level for Elasticsearch.

Whether using the configuration file or Docker environment variables, to define the granularity of the information shown in the log you can set one of the following log levels:

- **error**: Shows errors only.
- **warn**: Like **error**, but displays warnings as well.
- **info**: Logs everything from **warn** and the most important information about state changes or actions in Optimize.
- **debug**: In addition to **info**, writes information about the scheduling process, alerting as well as the import of the engine data.
- **trace**: Like **debug**, but in addition, writes all requests sent to the Camunda engine as well as all queries towards Elasticsearch to the log output.
