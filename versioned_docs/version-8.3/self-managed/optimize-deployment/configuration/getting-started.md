---
id: getting-started
title: Getting started
description: "All distributions of Optimize come with a predefined set of configuration options that can be overwritten by the user, based on current environment requirements."
---

All distributions of Optimize come with a predefined set of configuration options that can be overwritten by the user, based on current environment requirements. To do that, have a look into the folder named `config`. There are two files, one called `environment-config.yaml` with values that override the default Optimize properties and another called `environment-logback.xml`, which sets the logging configuration.

You can see all supported values and read about logging configuration [here](./system-configuration.md).

## Optimize web container configuration

Refer to the [configuration section on container settings](./system-configuration.md) for more information on how to adjust the Optimize web container configuration.

## Elasticsearch configuration

You can customize the [Elasticsearch connection settings](./system-configuration.md#connection-settings) as well as the [index settings](./system-configuration.md#index-settings).

## Camunda 7 configuration

<span class="badge badge--platform">Camunda 7 only</span>

To perform an import and provide the full set of features, Optimize requires a connection to the REST API of the Camunda engine. For details on how to configure the connection to the Camunda 7, refer to the [Camunda 7 configuration section](./system-configuration-platform-7.md).

## Camunda 8 specific configuration

For Camunda 8, Optimize is importing process data from exported zeebe records as created by the [Zeebe Elasticsearch Exporter](https://github.com/camunda/camunda/tree/main/zeebe/exporters/elasticsearch-exporter) from the same Elasticsearch cluster that Optimize used to store it's own data. For the relevant configuration options, refer to the [Camunda 8 import configuration](./system-configuration-platform-8.md).

## Recommended additional configurations

### Adjust engine heap size

Sending huge process definition diagrams via Rest API might cause the engine to crash if the engine heap size is inadequately limited. Thus, it is recommended to increase the heap size of the engine to at least 2 GB; for example, by adding the following Java command line property when starting the engine:

```bash
-Xmx2048m
```

For Camunda 7, it is also recommended to decrease the [deployment cache size](https://docs.camunda.org/manual/latest/user-guide/process-engine/deployment-cache/#customize-the-maximum-capacity-of-the-cache) to `500`, e.g. by:

```bash
<property name="cacheCapacity" value="500" />
```

### Adjust Optimize heap size

By default, Optimize is configured with 1GB JVM heap memory. Depending on your setup and actual data, you might still encounter situations where you need more than this default for a seamless operation of Optimize. To increase the maximum heap size, you can set the environment variable `OPTIMIZE_JAVA_OPTS` and provide the desired JVM system properties; for example, for 2GB of Heap:

```bash
OPTIMIZE_JAVA_OPTS=-Xmx2048m
```

### Maximum result limits for queries

It's possible that engine queries [consume a lot of memory](https://docs.camunda.org/manual/latest/user-guide/process-engine/process-engine-api/#query-maximum-results-limit). To mitigate this risk, you can [limit the number of results](https://docs.camunda.org/manual/latest/reference/deployment-descriptors/tags/process-engine/#queryMaxResultsLimit) a query can return. If you do this, we recommend setting `queryMaxResultsLimit` to `10000` so the Optimize import works without any problems. This value should still be low enough so you don't run into any problems with the previously mentioned heap configurations.
