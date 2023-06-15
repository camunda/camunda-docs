---
id: installation
title: "Installation"
description: "Read about how to install Optimize."
---

<span class="badge badge--platform">Camunda Platform 7 only</span>

## Installation guide

This document describes the installation process of the Camunda Optimize distribution, as well as various configuration possibilities available after initial installation.

Before proceeding with the installation, read the article about [supported environments]($docs$/reference/supported-environments/).

### Prerequisites

If you intend to run Optimize on your local machine, ensure you have a supported JRE (Java Runtime Environment) installed; best refer to the [Java Runtime]($docs$/reference/supported-environments/#java-runtime) section on which runtimes are supported.

### Demo Distribution with Elasticsearch

The Optimize Demo distribution comes with an Elasticsearch instance. The supplied Elasticsearch server is not customized or tuned by Camunda in any manner. It is intended to make the process of trying out Optimize as easy as possible. The only requirement in addition to the demo distribution itself is a running engine (ideally on localhost).

To install the demo distribution containing Elasticsearch, download the archive with the latest version from the [download page](https://docs.camunda.org/enterprise/download/#camunda-optimize) and extract it to the desired folder. After that, start Optimize by running the script `optimize-demo.sh` on Linux and Mac:

```bash
./optimize-demo.sh
```

or `optimize-demo.bat` on Windows:

```batch
.\optimize-demo.bat
```

The script ensures that a local version of Elasticsearch is started and waits until it has become available. Then, it starts Optimize, ensures it is running, and automatically opens a tab in a browser to make it very convenient for you to try out Optimize.

In case you need to start an Elasticsearch instance only, without starting Optimize (e.g. to perform a reimport), you can use the `elasticsearch-startup.sh` script:

```bash
./elasticsearch-startup.sh
```

or `elasticsearch-startup.bat` on Windows:

```batch
.\elasticsearch-startup.bat
```

### Production distribution without Elasticsearch

This distribution is intended to be used in production. To install it, first [download](https://docs.camunda.org/enterprise/download/#camunda-optimize) the production archive, which contains all the required files to startup Camunda Optimize without Elasticsearch. After that, [configure the Elasticsearch connection](#elasticsearch-configuration) to connect to your pre-installed Elasticsearch instance and [configure the Camunda Platform connection](#camunda-platform-configuration) to connect Optimize to your running engine. You can then start your Optimize instance by running the script `optimize-startup.sh` on Linux and Mac:

```bash
./optimize-startup.sh
```

or `optimize-startup.bat` on Windows:

```batch
.\optimize-startup.bat
```

### Production Docker image without Elasticsearch

The Optimize Docker images can be used in production. They are hosted on our dedicated Docker registry and are available to enterprise customers who bought Optimize only. You can browse the available images in our [Docker registry](https://registry.camunda.cloud) after logging in with your credentials.

Make sure to log in correctly:

```
$ docker login registry.camunda.cloud
Username: your_username
Password: ******
Login Succeeded
```

After that, [configure the Elasticsearch connection](#elasticsearch-configuration) to connect to your pre-installed Elasticsearch instance and [configure the Camunda Platform connection](#camunda-platform-configuration) to connect Optimize to your running engine. For very simple use cases with only one Camunda Engine and one Elasticsearch node, you can use environment variables instead of mounting configuration files into the Docker container:

#### Getting started with the Optimize docker image

##### Full local setup

To start the Optimize docker image and connect to an already locally running Camunda Platform as well as Elasticsearch instance you could run the following command:

```
docker run -d --name optimize --network host \
           registry.camunda.cloud/optimize-ee/optimize:{{< currentVersionAlias >}}
```

##### Connect to remote Camunda Platform and Elasticsearch

If, however, your Camunda Platform as well as Elasticsearch instance reside on a different host, you may provide their destination via the corresponding environment variables:

```
docker run -d --name optimize -p 8090:8090 -p 8091:8091 \
           -e OPTIMIZE_CAMUNDABPM_REST_URL=http://yourCamBpm.org/engine-rest \
           -e OPTIMIZE_ELASTICSEARCH_HOST=yourElasticHost \
           -e OPTIMIZE_ELASTICSEARCH_HTTP_PORT=9200 \
           registry.camunda.cloud/optimize-ee/optimize:{{< currentVersionAlias >}}
```

#### Available environment variables

There is only a limited set of configuration keys exposed via environment variables. These mainly serve the purpose of testing and exploring Optimize. For production configurations, we recommend following the setup in documentation on [configuration using a `environment-config.yaml` file](#configuration-using-a-yaml-file).

The most important environment variables you may have to configure are related to the connection to the Camunda Platform REST API, as well as Elasticsearch:

- `OPTIMIZE_CAMUNDABPM_REST_URL`: The base URL that will be used for connections to the Camunda Engine REST API (default: `http://localhost:8080/engine-rest`)
- `OPTIMIZE_CAMUNDABPM_WEBAPPS_URL`: The endpoint where to find the Camunda web apps for the given engine (default: `http://localhost:8080/camunda`)
- `OPTIMIZE_ELASTICSEARCH_HOST`: The address/hostname under which the Elasticsearch node is available (default: `localhost`)
- `OPTIMIZE_ELASTICSEARCH_HTTP_PORT`: The port number used by Elasticsearch to accept HTTP connections (default: `9200`)

A complete sample can be found within [Connect to remote Camunda Platform and Elasticsearch](#connect-to-remote-camunda-platform-and-elasticsearch).

Furthermore, there are also environment variables specific to the [event-based process](../../../components/userguide/additional-features/event-based-processes.md) feature you may make use of:

- `OPTIMIZE_CAMUNDA_BPM_EVENT_IMPORT_ENABLED`: Determines whether this instance of Optimize should convert historical data to event data usable for event-based processes (default: `false`)
- `OPTIMIZE_EVENT_BASED_PROCESSES_USER_IDS`: An array of user ids that are authorized to administer event-based processes (default: `[]`)
- `OPTIMIZE_EVENT_BASED_PROCESSES_IMPORT_ENABLED`: Determines whether this Optimize instance performs event-based process instance import. (default: `false`)
- `OPTIMIZE_EVENT_INGESTION_ACCESS_TOKEN`: Secret token to be provided on the [Ingestion REST API](../../rest-api/event-ingestion) when ingesting data.

Additionally, there are also runtime related environment variables such as:

- `OPTIMIZE_JAVA_OPTS`: Allows you to configure/overwrite Java Virtual Machine (JVM) parameters; defaults to `-Xms1024m -Xmx1024m -XX:MetaspaceSize=256m -XX:MaxMetaspaceSize=256m`.

You can also adjust logging levels using environment variables as described in the [logging configuration](../configuration#logging).

#### License key file

If you want the Optimize Docker container to automatically recognize your [license key file](./license.md), you can use standard [Docker means](https://docs.docker.com/storage/volumes/) to make the file with the license key available inside the container. Replacing the `{{< absolutePathOnHostToLicenseFile >}}` with the absolute path to the license key file on your host can be done with the following command:

```
docker run -d --name optimize -p 8090:8090 -p 8091:8091 \
           -v {{< absolutePathOnHostToLicenseFile >}}:/optimize/config/OptimizeLicense.txt:ro \
           registry.camunda.cloud/optimize-ee/optimize:{{< currentVersionAlias >}}
```

#### Configuration using a yaml file

In a production environment, the limited set of [environment variables](#available-environment-variables) is usually not enough so that you want to prepare a custom `environment-config.yaml` file. Refer to the [Configuration](../configuration) section of the documentation for the available configuration parameters.

Similar to the [license key file](#license-key-file), you then need to mount this configuration file into the Optimize Docker container to apply it. Replacing the `{{< absolutePathOnHostToConfigurationFile >}}` with the absolute path to the `environment-config.yaml` file on your host can be done using the following command:

```
docker run -d --name optimize -p 8090:8090 -p 8091:8091 \
           -v {{< absolutePathOnHostToConfigurationFile >}}:/optimize/config/environment-config.yaml:ro \
           registry.camunda.cloud/optimize-ee/optimize:{{< currentVersionAlias >}}
```

In managed Docker container environments like [Kubernetes](https://kubernetes.io/), you may set this up using [ConfigMaps](https://kubernetes.io/docs/concepts/configuration/configmap/).

### Usage

You can start using Optimize right away by opening the following URL in your browser: [http://localhost:8090](http://localhost:8090)

Then, you can use the users from the Camunda Platform to log in to Optimize. For details on how to configure the user access, consult the [user access management](./user-management.md) section.

Before you can fully utilize all features of Optimize, you need to wait until all data has been imported. A green circle in the footer indicates when the import is finished.

### Health - readiness

To check whether Optimize is ready to use, you can make use of the [health-readiness endpoint](./../rest-api/health-readiness.md), exposed as part of Optimize's REST API.  

### Configuration

All distributions of Optimize come with a predefined set of configuration options that can be overwritten by the user, based on current environment requirements. To do that, have a look into the folder named `environment`. There are two files, one called `environment-config.yaml` with values that override the default Optimize properties and another called `environment-logback.xml`, which sets the logging configuration.

You can see all supported values and read about logging configuration [here](./configuration.md).

#### Optimize web container configuration

Refer to the [configuration section on container settings](./configuration.md) for more information on how to adjust the Optimize web container configuration.

#### Elasticsearch configuration

You can customize the [Elasticsearch connection settings](./configuration.md/#connection-settings) as well as the [index settings](./configuration.md/#index-settings).

#### Camunda Platform configuration

To perform an import and provide the full set of features, Optimize requires a connection to the REST API of the Camunda engine. For details on how to configure the connection to the Camunda Platform, refer to the [Camunda Platform configuration section](./configuration.md/#connection-to-camunda-platform).

### Import of the data set

By default, Optimize comes without any data available. To start using all the features of the system, you have to perform a data import from the Camunda Platform. This process is triggered automatically when starting Optimize.

If you are interested in the details of the import, refer to the dedicated [import overview section](./../optimize-explained/import-guide.md).

## Hardware resources

We recommend to carefully choose hardware resources that are allocated to the server with Optimize.

Be aware that Optimize is using data structures that are different from data stored
by the Camunda Platform Engine. The final amount of space on the hard drive required by Optimize will
depend on your replication settings, but as a rule of thumb, you could expect Optimize to use 30% of the space that
your relational database is using.

### How your data influences Elasticsearch requirements

The Elasticsearch requirements are heavily influenced by the makeup of your data set. This is mainly because Optimize creates
one instance index per definition, so the amount of indices in your Elasticsearch instance will grow with the amount of definitions
you have deployed.

This is why we recommend a minimum of 1 GB of Elasticsearch heap space to provide for all non-instance indices plus additional 
space in relation to how many definitions and instances your data set has.

By default, Optimize uses [one shard per instance index](../configuration/#index-settings) and performance tests have shown
that a shard size of 10GB is enough for approximately 1 million instances. Elasticsearch recommends to aim for 
[20 shards or fewer per GB of heap memory](https://www.elastic.co/guide/en/elasticsearch/reference/current/size-your-shards.html#shard-count-recommendation),
so you will need 1GB of additional heap memory per 20 definitions.
Elasticsearch also recommends a [shard size between 10 and 50 GB](https://www.elastic.co/guide/en/elasticsearch/reference/current/size-your-shards.html#shard-size-recommendation),
so if you expect your definitions to have more than 5 million instances, we recommend you increase the number of shards
per instance index accordingly in [Optimize's index configurations](../configuration/#index-settings).

Note that these guidelines are based on test data that may deviate from yours. If your instance data for example includes
a large amount of variables this may result in a larger shard size.

In this case, we recommend that you test the import with realistic data and adjust the number of shards accordingly.

### Example scenarios

:::note Heads Up!
Exact hardware requirements highly depend on a number of factors such as: size of the data,
network speed, current load on the engine and its underlying database. Therefore, we cannot
guarantee that the following requirements will satisfy every use case.
:::

##### 20 Definitions with less than 50k Instances per definition 

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
  
##### 40 Definitions with up to 10 million instances per definition

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
