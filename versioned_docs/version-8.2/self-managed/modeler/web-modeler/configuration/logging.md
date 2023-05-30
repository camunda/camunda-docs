---
id: logging
title: "Logging"
description: "Read details on additional logging configuration for Web Modeler."
---

:::note
Web Modeler Self-Managed is available to [enterprise customers](../../../../reference/licenses.md#web-modeler) only.
:::

## Logging configuration for the `restapi` component

Web Modeler's `restapi` component uses the [logback framework](https://logback.qos.ch/) for logging. By default, the
`restapi` component logs to the Docker container's standard output. To change the default logging behavior, create a
custom configuration file and let the `restapi` know of it by specifying the following environment variable:

```
LOGGING_CONFIG=file:/full/path/to/custom-logback-config.xml
```

Please refer to the [Spring Boot's logging documentation](https://docs.spring.io/spring-boot/docs/current/reference/html/howto.html#howto.logging.logback)
for more information on how to customize the logback configuration for specific use cases like logging to a file.

## Logging configuration for the `webapp` component

By default, the `webapp` component logs to the Docker container's standard output.

### Logging to a file

If you want to enable additional log output to a file, adjust the following environment variable:

```
LOG_FILE_PATH=/full/path/to/log/file.log
```

## Logging configuration for the `websocket` component

By default, the `websocket` component logs to the Docker container's standard output.

### Logging to a file

If you want to enable additional log output to a file, follow these steps:

1. Mount a volume to the directory `/var/www/html/storage/logs`. The logs will be written to a file named `laravel.log`
   located inside this directory.

2. Adjust the following environment variable:

   ```
   LOG_CHANNEL=single
   ```
