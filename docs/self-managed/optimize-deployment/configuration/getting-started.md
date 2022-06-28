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

## Camunda Platform 7 configuration

To perform an import and provide the full set of features, Optimize requires a connection to the REST API of the Camunda engine. For details on how to configure the connection to the Camunda Platform 7, refer to the [Camunda Platform 7 configuration section](./system-configuration.md#connection-to-camunda-platform-7).

## Camunda Platform 8 specific configuration

For Camunda Platform 8, Optimize is importing process data from exported zeebe records as created by the [Zeebe Elasticsearch Exporter](https://github.com/camunda/zeebe/tree/main/exporters/elasticsearch-exporter) from the same Elasticsearch cluster that Optimize used to store it's own data. For the relevant configuration options, refer to the [Camunda Platform 8 import configuration](./system-configuration.md#connection-to-camunda-platform-8).

## Recommended additional configurations

### Adjust engine heap size

Sending huge process definition diagrams via Rest API might cause the engine to crash if the engine heap size is inadequately limited. Thus, it is recommended to increase the heap size of the engine to at least 2 GB; for example, by adding the following Java command line property when starting the engine:

```bash
-Xmx2048m
```

Also, it is recommended to decrease the [deployment cache size](https://docs.camunda.org/manual/latest/user-guide/process-engine/deployment-cache/#customize-the-maximum-capacity-of-the-cache) to `500`, e.g. by:

```bash
<property name="cacheCapacity" value="500" />
```

### Adjust Optimize heap size

By default, Optimize is configured with 1GB JVM heap memory. Depending on your setup and actual data, you might still encounter situations where you need more than this default for a seamless operation of Optimize. To increase the maximum heap size, you can set the environment variable `OPTIMIZE_JAVA_OPTS` and provide the desired JVM system properties; for example, for 2GB of Heap:

```bash
OPTIMIZE_JAVA_OPTS=-Xmx2048m
```

### Maximum result limits for queries

It's possible that engine queries [consume a lot of memory](https://docs.camunda.org/manual/latest/user-guide/process-engine/process-engine-api/#query-maximum-results-limit). To mitigate this risk, you can [limit the number of results](https://docs.camunda.org/manual/latest/reference/deployment-descriptors/tags/process-engine/#queryMaxResultsLimit) a query can return. If you do this, it is highly recommended that you set the value of the `queryMaxResultsLimit` setting to `10000` so that the Optimize import works without any problems. This value should still be low enough so you don't run into any problems with the previously mentioned heap configurations.

## Hardware resources

We recommend to carefully choose hardware resources that are allocated to the server with Optimize.

Be aware that Optimize is using data structures that are different from data stored
by the Camunda Platform 7 engine. The final amount of space on the hard drive required by Optimize will
depend on your replication settings, but as a rule of thumb, you could expect Optimize to use 30% of the space that
your relational database is using.

### How your data influences Elasticsearch requirements

The Elasticsearch requirements are heavily influenced by the makeup of your data set. This is mainly because Optimize creates
one instance index per definition, so the amount of indices in your Elasticsearch instance will grow with the amount of definitions
you have deployed.

This is why we recommend a minimum of 1 GB of Elasticsearch heap space to provide for all non-instance indices plus additional
space in relation to how many definitions and instances your data set has.

By default, Optimize uses [one shard per instance index](./system-configuration.md#index-settings) and performance tests have shown
that a shard size of 10GB is enough for approximately 1 million instances. Elasticsearch recommends to aim for
[20 shards or fewer per GB of heap memory](https://www.elastic.co/guide/en/elasticsearch/reference/current/size-your-shards.html#shard-count-recommendation),
so you will need 1GB of additional heap memory per 20 definitions.
Elasticsearch also recommends a [shard size between 10 and 50 GB](https://www.elastic.co/guide/en/elasticsearch/reference/current/size-your-shards.html#shard-size-recommendation),
so if you expect your definitions to have more than 5 million instances, we recommend you increase the number of shards
per instance index accordingly in [Optimize's index configurations](./system-configuration.md#index-settings).

Note that these guidelines are based on test data that may deviate from yours. If your instance data for example includes
a large amount of variables this may result in a larger shard size.

In this case, we recommend that you test the import with realistic data and adjust the number of shards accordingly.

### Example scenarios

:::note Heads Up!
Exact hardware requirements highly depend on a number of factors such as: size of the data,
network speed, current load on the engine and its underlying database. Therefore, we cannot
guarantee that the following requirements will satisfy every use case.
:::

#### 20 Definitions with less than 50k Instances per definition

We recommend to use one shard per instance index, so 20 shards overall for instance indices alone.
Aiming for 20 shards per GB of Elasticsearch JVM heap space results in 1 GB of heap memory additionally to the base requirement of 1 GB.

Based on performance tests, a shard size of 10 GB should be enough for up to 1 million instances per definition, so you
can expect the instance index shards to be no larger than 10GB.

- Camunda Optimize:
  - 2 CPU Threads
  - 512 MB RAM
- Elasticsearch:
  - 2 CPU Threads
  - 4 GB RAM (2 GB JVM Heap Memory, see [setting JVM heap size](https://www.elastic.co/guide/en/elasticsearch/reference/7.x/advanced-configuration.html#setting-jvm-heap-size))
  - [Local SSD storage recommended](https://www.elastic.co/guide/en/elasticsearch/guide/master/hardware.html#_disks)

#### 40 Definitions with up to 10 million instances per definition

We recommend to use two shards per instance index, so 80 shards for instance indices alone.
Aiming for 20 shards per GB of Elasticsearch JVM heap space results in 4 GB of heap memory additionally to the base requirement of 1 GB.

Based on performance tests, a shard size of 10 GB is enough for approximately 1 million instances per definition, so in this scenario, you can expect a shard size of 50 GB for each instance index shard.

- Camunda Optimize:
  - 2 CPU Threads
  - 2 GB RAM
- Elasticsearch:
  - 4 CPU Threads
  - 10 GB RAM (5 GB JVM Heap Memory, see [setting JVM heap size](https://www.elastic.co/guide/en/elasticsearch/reference/7.x/advanced-configuration.html#setting-jvm-heap-size))
  - [Local SSD storage recommended](https://www.elastic.co/guide/en/elasticsearch/guide/master/hardware.html#_disks)
