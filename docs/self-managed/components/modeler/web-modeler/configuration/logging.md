---
id: logging
title: "Logging"
description: "Read details on additional logging configuration for Web Modeler."
---

## Logging configuration for the `restapi` component

Web Modeler's `restapi` component uses the [logback framework](https://logback.qos.ch/) for logging. By default, the
`restapi` component logs to the Docker container's standard output. To change the default logging behavior, create a
custom configuration file and let the `restapi` know of it by specifying the following environment variable:

```properties
LOGGING_CONFIG=file:/full/path/to/custom-logback-config.xml
```

Refer to [Spring Boot's logging documentation](https://docs.spring.io/spring-boot/docs/current/reference/html/howto.html#howto.logging.logback)
for more information on how to customize the logback configuration for specific use cases like logging to a file.

Enabling `DEBUG` logging for the `restapi` component can be useful for troubleshooting purposes, e.g. for
[debugging Zeebe connection issues](../troubleshooting/troubleshoot-zeebe-connection.md#how-can-i-debug-log-grpc--zeebe-communication).

By default, Web Modeler's `restapi` component logs in JSON. For a more readable logging format, activate the Spring profile using the following:

```properties
SPRING_PROFILES_INCLUDE=default-logging
```

### Changing log level at runtime

You can adjust log levels dynamically using Spring Boot Actuator [loggers](https://docs.spring.io/spring-boot/api/rest/actuator/loggers.html) endpoints:

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
