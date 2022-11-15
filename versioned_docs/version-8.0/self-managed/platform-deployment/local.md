---
id: local
title: "Local installation"
sidebar_label: "Local"
---

This page guides you through the manual installation of the Camunda Platform 8 on a local or virtual machine.

## Prerequisites

- Operating system:
  - Linux
  - Windows/MacOS (development only, not supported for production)
- Java Virtual Machine, see [supported environments](/docs/reference/supported-environments/) for version details
- Elasticsearch, see [supported environments](/docs/reference/supported-environments/) for version details

Make sure to configure the web applications to use a port that is available. By default the web applications like Operate and Tasklist listen both to port 8080.

## Download a compatible set of Camunda Platform 8 components

Tasklist, Operate and Zeebe distributions are available for download on the [release page](https://github.com/camunda/zeebe/releases). Every release contains a set of compatible versions of the various components, ensure you download and use compatible versions.

All Connector-related resources are available on [Maven Central](https://search.maven.org/search?q=g:io.camunda.connector). Make sure to download `*-jar-with-dependencies.jar` files in order to run Connectors locally including their necessary dependencies.
Note that some out-of-the-box Connectors are licensed under the [Camunda Platform Self-Managed Free Edition license](https://camunda.com/legal/terms/cloud-terms-and-conditions/camunda-cloud-self-managed-free-edition-terms/).
Find an overview in the [Connectors Bundle project](https://github.com/camunda/connectors-bundle).

## Download and run Elasticsearch

Operate, Tasklist, and Optimize use Elasticsearch as its underlying data store. Therefore you have to download and run Elasticsearch.

Camunda is currently compatible with Elasticsearch 7.16.2 (see [supported environments](/docs/reference/supported-environments/)) which you can [download here](https://www.elastic.co/downloads/past-releases/elasticsearch-7-16-2).

To run Elasticsearch, execute the following commands:

```bash
cd elasticsearch-*
bin/elasticearch
```

You’ll know Elasticsearch has started successfully when you see a message similar to the following:

```log
[INFO ][o.e.l.LicenseService     ] [-IbqP-o] license [72038058-e8ae-4c71-81a1-e9727f2b81c7] mode [basic] - valid
```

## Run Zeebe

Once you've downloaded a Zeebe distribution, extract it into a folder of your choice.

To extract the Zeebe distribution and start the broker, **Linux users** can type the following:

```bash
tar -xzf zeebe-distribution-X.Y.Z.tar.gz -C zeebe/
./bin/broker
```

For **Windows users**, take the following steps:

1. Download the `.zip` package.
2. Extract the package using your preferred unzip tool.
3. Open the extracted folder.
4. Navigate to the `bin` folder.
5. Start the broker by double-clicking on the `broker.bat` file.

Once the Zeebe broker has started, it should produce the following output:

```log
23:39:13.246 [] [main] INFO  io.camunda.zeebe.broker.system - Scheduler configuration: Threads{cpu-bound: 2, io-bound: 2}.
23:39:13.270 [] [main] INFO  io.camunda.zeebe.broker.system - Version: X.Y.Z
23:39:13.273 [] [main] INFO  io.camunda.zeebe.broker.system - Starting broker with configuration {
```

To run Zeebe with the Elasticsearch Exporter that is needed for Operate, Tasklist and Optimize to work, execute the following commands:

```bash
cd camunda-cloud-zeebe-*
ZEEBE_BROKER_EXPORTERS_ELASTICSEARCH_CLASSNAME=io.camunda.zeebe.exporter.ElasticsearchExporter ./bin/broker
```

You’ll know Zeebe has started successfully when you see a message similar to the following:

```log
[partition-0] [0.0.0.0:26501-zb-actors-0] INFO  io.camunda.zeebe.raft - Joined raft in term 0
[exporter] [0.0.0.0:26501-zb-actors-1] INFO  io.camunda.zeebe.broker.exporter.elasticsearch - Exporter opened
```

## Run Operate

To run Operate, execute the following command:

```bash
cd camunda-cloud-operate-*
bin/operate
```

You’ll know Operate has started successfully when you see messages similar to the following:

```log
DEBUG 1416 --- [       Thread-6] o.c.o.e.w.BatchOperationWriter           : 0 operations locked
DEBUG 1416 --- [       Thread-4] o.c.o.z.ZeebeESImporter                  : Latest loaded position for alias [zeebe-record-deployment] and partitionId [0]: 0
INFO 1416 --- [       Thread-4] o.c.o.z.ZeebeESImporter                  : Elasticsearch index for ValueType DEPLOYMENT was not found, alias zeebe-record-deployment. Skipping.
```

Now the Operate web interface is available at [http://localhost:8080](http://localhost:8080).

The first screen you'll see is a sign-in page. Use the credentials `demo` / `demo` to sign in.

After you sign in, you'll see an empty dashboard if you haven't yet deployed any processes:

![operate-dash-no-processes](assets/operate-dashboard-no-processes_light.png)

If you _have_ deployed processes or created process instances, you'll see them on your dashboard:

![operate-dash-with-processes](assets/operate-introduction_light.png)

To update Operate versions, visit the [guide to update Operate](../../components/operate/userguide/updating-operate.md).

## Run Tasklist

To run Tasklist, execute the following commands:

```bash
cd camunda-cloud-tasklist-*
./bin/tasklist
```

You’ll know Tasklist has started successfully when you see messages similar to the following:

```log
2020-12-09 13:31:41.437  INFO 45899 --- [           main] i.z.t.ImportModuleConfiguration          : Starting module: importer
2020-12-09 13:31:41.438  INFO 45899 --- [           main] i.z.t.ArchiverModuleConfiguration        : Starting module: archiver
2020-12-09 13:31:41.555  INFO 45899 --- [           main] i.z.t.w.StartupBean                      : Tasklist Version: 1.0.0
```

The Tasklist web interface is available at [http://localhost:8080](http://localhost:8080). Note, that this is the same default port as Operate, so you might have to configure Tasklist (or Operate) to use another port:

```bash
cd camunda-cloud-tasklist-*
SERVER_PORT=8081 ./bin/tasklist
```

The first screen you'll see is a sign-in page. Use the credentials `demo` / `demo` to sign in.

If you've already developed user tasks in Zeebe, you can see these on the left panel on the start screen:

![tasklist-start-screen](assets/tasklist-start-screen_light.png)

To update Tasklist versions, visit the [guide to update Tasklist](../../components/tasklist/userguide/updating-tasklist.md).

## Run Connectors

The [Connector runtime environment](https://search.maven.org/artifact/io.camunda/spring-zeebe-connector-runtime) picks up outbound Connectors available on the `classpath` automatically.
It uses the default configuration specified by a Connector through its `@OutboundConnector` annotation.

To run the [REST Connector](https://search.maven.org/artifact/io.camunda.connector/connector-http-json) with the runtime environment, execute the following command:

```bash
java -cp 'spring-zeebe-connector-runtime-VERSION-with-dependencies.jar:connector-http-json-VERSION-with-dependencies.jar' \
    io.camunda.connector.runtime.ConnectorRuntimeApplication
```

This starts a Zeebe client, registering the defined Connector as a job worker. By default, it connects to a local Zeebe instance at port `26500`.
You can configure the Zeebe client using the options provided by [Spring Zeebe](https://github.com/camunda-community-hub/spring-zeebe/tree/master/connector-runtime#configuration-options).

## Run Identity

A local setup of Identity in Camunda Platform 8 is not yet supported out-of-the-box, use [Docker](../docker/) instead.

## Run Optimize

The installation of Optimize is described in [Optimize Setup]($optimize$/self-managed/optimize-deployment/install-and-start/). A local setup in Camunda Platform 8 is not yet supported out-of-the-box, use [Docker](../docker/#optimize) instead.
