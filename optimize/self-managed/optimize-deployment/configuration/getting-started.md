---
id: getting-started
title: Getting started
description: "All distributions of Optimize come with a predefined set of configuration options that can be overwritten by the user, based on current environment requirements."
---

All distributions of Optimize come with a predefined set of configuration options that can be overwritten by the user, based on current environment requirements. To do that, have a look into the folder named `config`. There are two files, one called `environment-config.yaml` with values that override the default Optimize properties and another called `environment-logback.xml`, which sets the logging configuration.

You can see all supported values and read about logging configuration [here](./system-configuration.md).

## Optimize web container configuration

Refer to the [configuration section on container settings](./system-configuration.md) for more information on how to adjust the Optimize web container configuration.

## Elasticsearch/OpenSearch configuration

You can customize the [Elasticsearch/OpenSearch connection settings](./system-configuration.md#connection-settings) as well as the [index settings](./system-configuration.md#index-settings).

## Camunda 8 specific configuration

For Camunda 8, Optimize is importing process data from exported zeebe records as created by the [Zeebe Elasticsearch Exporter](https://github.com/camunda/camunda/tree/main/zeebe/exporters/elasticsearch-exporter) (or [Zeebe OpenSearch Exporter](https://github.com/camunda/camunda/tree/main/zeebe/exporters/opensearch-exporter)) from the same cluster that Optimize used to store its own data. For the relevant configuration options, refer to the [Camunda 8 import configuration](./system-configuration-platform-8.md).

## Recommended additional configurations

### Adjust Optimize heap size

By default, Optimize is configured with 1GB JVM heap memory. Depending on your setup and actual data, you might still encounter situations where you need more than this default for a seamless operation of Optimize. To increase the maximum heap size, you can set the environment variable `OPTIMIZE_JAVA_OPTS` and provide the desired JVM system properties; for example, for 2GB of Heap:

```bash
OPTIMIZE_JAVA_OPTS=-Xmx2048m
```
