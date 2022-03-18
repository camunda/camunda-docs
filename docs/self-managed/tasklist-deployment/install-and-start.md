---
id: install-and-start
title: Install and start Tasklist
description: "Let's get started with Tasklist by installing and running with these simple methods."
---

## Running via Docker (local development)

You can use the Docker image `camunda/tasklist:latest` to run Tasklist as a container.

:::note
Configure the appropriate settings described in the [configuration](../configuration) section of this deployment guide.
:::

See the following example of configuration for `docker-compose`:

```
tasklist:
    container_name: tasklist
    image: camunda/tasklist:latest
    ports:
        - 8080:8080
    environment:
        - camunda.tasklist.elasticsearch.url=http://elasticsearch:9200
        - camunda.tasklist.zeebeElasticsearch.url=http://elasticsearch:9200
        - camunda.tasklist.zeebe.gatewayAddress=zeebe:26500
```

## Manual configuration (local development)

Here, we’ll walk you through how to download and run a Tasklist distribution manually, without using Docker.

:::note
The Tasklist web UI is available by default at [http://localhost:8080](http://localhost:8080). Ensure this port is available.
:::

### Download Tasklist and a compatible version of Zeebe

Tasklist and Zeebe distributions are available for download on the same [release page](https://github.com/camunda-cloud/zeebe/releases).

:::note
Each version of Tasklist is compatible with a specific version of Zeebe.
:::

On the Zeebe release page, compatible versions of Zeebe and Tasklist are grouped together. Ensure you download and use compatible versions. This is handled for you if you use the Docker profile from our repository.

### Download Elasticsearch

Tasklist uses open-source Elasticsearch as its underlying data store. Therefore to run Tasklist, download and run Elasticsearch.

Tasklist is currently compatible with Elasticsearch 7.16.2. Download Elasticsearch [here](https://www.elastic.co/downloads/past-releases/elasticsearch-7-16-2).

### Run Elasticsearch

To run Elasticsearch, execute the following commands in Terminal or another command line tool of your choice:

```
cd elasticsearch-*
bin/elasticearch
```

You’ll know Elasticsearch has started successfully when you see a message similar to the following:

```
[INFO ][o.e.l.LicenseService     ] [-IbqP-o] license [72038058-e8ae-4c71-81a1-e9727f2b81c7] mode [basic] - valid
```

### Run Zeebe

To run Zeebe with Elasticsearch Exporter, execute the following commands:

```
cd camunda-cloud-zeebe-*
ZEEBE_BROKER_EXPORTERS_ELASTICSEARCH_CLASSNAME=io.camunda.zeebe.exporter.ElasticsearchExporter ./bin/broker
```

You’ll know Zeebe has started successfully when you see a message similar to the following:

```
[partition-0] [0.0.0.0:26501-zb-actors-0] INFO  io.camunda.zeebe.raft - Joined raft in term 0
[exporter] [0.0.0.0:26501-zb-actors-1] INFO  io.camunda.zeebe.broker.exporter.elasticsearch - Exporter opened
```

### Run Tasklist

To run Tasklist, execute the following commands:

```
cd camunda-cloud-tasklist-*
./bin/tasklist
```

You’ll know Tasklist has started successfully when you see messages similar to the following:

```
2020-12-09 13:31:41.437  INFO 45899 --- [           main] i.z.t.ImportModuleConfiguration          : Starting module: importer
2020-12-09 13:31:41.438  INFO 45899 --- [           main] i.z.t.ArchiverModuleConfiguration        : Starting module: archiver
2020-12-09 13:31:41.555  INFO 45899 --- [           main] i.z.t.w.StartupBean                      : Tasklist Version: 1.0.0
```

## Access the Tasklist web interface

The Tasklist web interface is available at [http://localhost:8080](http://localhost:8080).

The first screen you'll see is a sign-in page. Use the credentials `demo` / `demo` to sign in.

If you've already developed user tasks in Zeebe, you can see these on the left panel on the start screen:

![tasklist-start-screen](img/tasklist-start-screen_light.png)

## Update Tasklist

To update Tasklist versions, visit the [user guide](../../components/tasklist/userguide/updating-tasklist.md).
