---
id: configuration
title: "Configuration"
sidebar_label: "Overview"
description: "Let's analyze how to configure Zeebe."
---

Zeebe can be configured using environment variables, configuration parameters, or a combination of both. When configuring your Zeebe setup, keep in mind the following:

- If both configuration files and environment variables are present, environment variables overwrite settings in configuration files.
- The existing configuration is applied at startup, and changes made to the configuration will not be applied at runtime.

For more information on Self-Managed configuration options, see [configuring components](/self-managed/operational-guides/application-configs.md).

## Configuration options

The default configuration is located in `config/application.yaml`. This configuration contains the most common configuration settings for a standalone broker. It also lists the corresponding environment variable for each setting.

:::note
The default configuration is not suitable for a standalone gateway node. To run a standalone gateway node, take a look at [the gateway configuration](gateway.md) or `/config/gateway.yaml.template`.
:::

### Configuration file templates

We provide templates that contain all possible configuration settings, along with explanations for each setting, though you may find it easier to search through our [broker](broker.md) and [gateway](gateway.md) configuration documentation to adjust the templates:

- [`config/application.yaml` Standalone Broker (with embedded gateway)](https://github.com/camunda/camunda/blob/main/dist/src/main/config/application.yaml) - Default configuration containing only the most common configuration settings. Use this as the basis for a single broker deployment for test or development.
- [`config/broker.standalone.yaml.template` Standalone Broker (with embedded gateway)](https://github.com/camunda/camunda/blob/main/dist/src/main/config/broker.standalone.yaml.template) - Complete configuration template for a standalone broker with embedded gateway. Use this as the basis for a single broker deployment for test or development.
- [`config/broker.yaml.template` Broker Node (without embedded gateway)](https://github.com/camunda/camunda/blob/main/dist/src/main/config/broker.yaml.template) - Complete configuration template for a broker node without embedded gateway. Use this as the basis for deploying multiple broker nodes as part of a cluster.
- [`config/gateway.yaml.template`](https://github.com/camunda/camunda/blob/main/dist/src/main/config/gateway.yaml.template) - Complete configuration template for a standalone gateway.

:::note
These templates also include the corresponding environment variables to use for every setting.
:::

### Edit the configuration

You can either start from scratch or start from the configuration templates listed above.

If you use a configuration template and want to uncomment certain lines, make sure to also uncomment their parent elements:

```yaml
Valid Configuration

    zeebe:
      gateway:
        network:
          # host: 0.0.0.0
          port: 26500

Invalid configuration

    # zeebe:
      # gateway:
        # network:
          # host: 0.0.0.0
          port: 26500
```

Uncommenting individual lines is a bit finicky, because YAML is sensitive to indentation. The best way to do it is to position the cursor before the `#` character and delete two characters (the dash and the space). Doing this will consistently give you a valid YAML file.

When it comes to editing individual settings, two data types are worth mentioning:

- Data size (e.g. `logSegmentSize`)
  - Human-friendly format: `500MB` (or `KB, GB`)
  - Machine-friendly format: size in bytes as long
- Timeouts/intervals (e.g. `requestTimeout`)
  - Human-friendly format: `15s` (or `m, h`)
  - Machine-friendly format: either duration in milliseconds as long, or [ISO-8601 duration](https://en.wikipedia.org/wiki/ISO_8601#Durations) format (e.g. `PT15S`)

### Pass configuration files to Zeebe

Rename the configuration file to `application.yaml` and place it in the following location:

```shell script
./config/application.yaml
```

#### Other ways to specify the configuration file

Zeebe uses Spring Boot for its configuration parsing. All other ways to [configure a Spring Boot application](https://docs.spring.io/spring-boot/reference/features/external-config.html) should also work. In particular, you can use:

- `SPRING_CONFIG_ADDITIONAL_LOCATION` to specify an additional configuration file.
- `SPRING_APPLICATION_JSON` to specify settings in JSON format.

Details can be found in the Spring documentation.

:::note
We recommend not to use `SPRING_CONFIG_LOCATION` as this will replace all existing configuration defaults. When used inappropriately, some features will be disabled or will not be configured properly.
:::

If you specify `SPRING_CONFIG_LOCATION`, specify it like this:

```shell script
export SPRING_CONFIG_LOCATION='classpath:/,file:./[path to config file]'
```

This will ensure the defaults defined in the classpath resources will be used (unless explicitly overwritten by the configuration file you provide). If you omit the defaults defined in the classpath, some features may be disabled or will not be configured properly.

### Verify the configuration

Start Zeebe to verify the configuration was applied. If the configuration could be read, Zeebe will expose it via the monitoring port at [http://localhost:9600/actuator/configprops/zeebe](http://localhost:9600/actuator/configprops/zeebe). This will show you both the resolved configuration and its inputs.

:::note

Zeebe uses the Spring Boot [configprops](https://docs.spring.io/spring-boot/docs/current/actuator-api/htmlsingle/#configprops) actuator for this, so any documentation listed there applies as well.

:::

In some cases of invalid configuration, Zeebe will fail to start and log a warning that explains which configuration setting could not be read.

```
17:17:38.796 [] [main] ERROR org.springframework.boot.diagnostics.LoggingFailureAnalysisReporter -

***************************
APPLICATION FAILED TO START
***************************

Description:

Failed to bind properties under 'zeebe.broker.network.port-offset' to int:

    Property: zeebe.broker.network.port-offset
    Value: false
    Origin: System Environment Property "ZEEBE_BROKER_NETWORK_PORTOFFSET"
    Reason: failed to convert java.lang.String to int

Action:

Update your application's configuration
```

## Licensing

import Licensing from '../../../self-managed/react-components/licensing.md'

<Licensing/>

## Logging

Zeebe uses Log4j2 framework for logging. In the distribution and the Docker image, find the default log configuration file in `config/log4j2.xml`.

### Google Stackdriver (JSON) logging

To enable Google Stackdriver compatible JSON logging, set the environment variable `ZEEBE_LOG_APPENDER=Stackdriver` before starting Zeebe.

### Change log level dynamically

Zeebe brokers expose a [Spring Boot Actuators web endpoint](https://docs.spring.io/spring-boot/docs/current/actuator-api/html/#loggers)
for configuring loggers dynamically.
To change the log level of a logger, make a `POST` request to the `/actuator/loggers/{logger.name}` endpoint as shown in the example below.
Change `io.camunda.zeebe` to the required logger name and `debug` to required log level.

```
curl 'http://localhost:9600/actuator/loggers/io.camunda.zeebe' -i -X POST -H 'Content-Type: application/json' -d '{"configuredLevel":"debug"}'
```

## Health probes

Health probes are set to sensible defaults which cover common use cases.

For specific use cases, it might be necessary to customize health probes:

- [Gateway health probes](gateway-health-probes.md)

## Experimental configuration options

You may have already noticed a special section of Zeebe's configuration templates titled `experimental`.
This section refers to settings which are potentially not backwards compatible. In other words, any configuration setting found there may or may not be dropped in any minor version.

These settings are there primarily for incubating features and/or very advanced settings for which the team has not found
a good general default configuration. Once one is found, or the incubating feature is promoted, the setting(s) may be moved
into a different section. Only at that point do they fall under the same backwards compatibility guarantees as the rest of
the project. We may choose to drop support for specific experimental configurations in any minor version update.

Most users should not have to change anything in this section for a good experience. However, if you have a unique set up, or simply wish to try out new experimental features, it can be worth investigating these (ideally with the guidance of the Zeebe community).
