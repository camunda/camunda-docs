---
id: configure-db-custom-headers
title: "Configure DB client custom headers"
sidebar_label: "Configure DB client custom headers"
description: "Learn how to configure DB client custom headers"
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

:::caution
This guide describes a feature preview and is a matter for change.
:::

Camunda supports plugin loading feature that can be attached to ElasticSearch / OpenSearch HTTP client, providing
an ability to add user-controlled custom HTTP headers.

This use case may be applicable when one needs to add custom HTTP headers to search DB call, for
example authentication, tracking, debugging, or other cases.

## Technical overview

In order to introduce your custom plugin to Camunda, create a new Java project, and add the following dependency:

<Tabs groupId="dependency" defaultValue="maven" values={
[
{label: 'Maven dependency', value: 'maven' },
{label: 'Gradle dependency', value: 'gradle' }
]
}>

<TabItem value='maven'>

```xml
<dependency>
  <groupId>io.camunda</groupId>
  <artifactId>camunda-search-plugins</artifactId>
  <version>${version.camunda-search-plugins}</version>
</dependency>
```

</TabItem>

<TabItem value='gradle'>

```yml
implementation "io.camunda:camunda-search-plugins:${version.camunda-search-plugins}"
```

</TabItem>
</Tabs>

Then write your plugin by implementing the `DatabaseCustomHeaderSupplier` interface which is provided by the
`camunda-search-plugins` package.

Here's a simple example of what you can do:

```java
package com.myplugin;

import io.camunda.plugin.search.header.CustomHeader;
import io.camunda.plugin.search.header.DatabaseCustomHeaderSupplier;
import java.util.UUID;

public class MyCustomHeaderPlugin implements DatabaseCustomHeaderSupplier {

  public static final String CUSTOM_TOKEN_PLUGIN = "X-Custom-Auth-Token";

  @Override
  public CustomHeader getElasticsearchCustomHeader() {
    return new CustomHeader(CUSTOM_TOKEN_PLUGIN, UUID.randomUUID().toString());
  }

}
```

Make sure to build your project with all dependencies included, AKA "fat JAR". Copy your `jar` file somewhere it can be easily accessed.

## Including plugin in your Camunda distribution

### Mount JAR inside container

For each container, mount your plugin inside container's file system. See examples how to do it with
[Docker](https://docs.docker.com/engine/storage/volumes/) or [Helm Charts](https://kubernetes.io/docs/concepts/storage/volumes/).

### Configure Zeebe Exporter

Pass the plugin parameters as application options or environment variables, for example as follows.

#### ElasticSearch

```
- zeebe.broker.exporters.elasticsearch.args.interceptor-plugins[0].id=my-plugin
- zeebe.broker.exporters.elasticsearch.args.interceptor-plugins[0].class-name=com.myplugin.MyCustomHeaderPlugin
- zeebe.broker.exporters.elasticsearch.args.interceptor-plugins[0].jar-path=/usr/local/plugin/plg.jar
```

#### OpenSearch

```
- zeebe.broker.exporters.opensearch.args.interceptor-plugins[0].id=my-plugin
- zeebe.broker.exporters.opensearch.args.interceptor-plugins[0].class-name=com.myplugin.MyCustomHeaderPlugin
- zeebe.broker.exporters.opensearch.args.interceptor-plugins[0].jar-path=/usr/local/plugin/plg.jar
```

### Configure Operate Importer

#### ElasticSearch

```
- camunda.operate.zeebeElasticsearch.interceptor-plugins[0].id=my-plugin
- camunda.operate.zeebeElasticsearch.interceptor-plugins[0].class-name=com.myplugin.MyCustomHeaderPlugin
- camunda.operate.zeebeElasticsearch.interceptor-plugins[0].jar-path=/usr/local/plugin/plg.jar
- camunda.operate.elasticsearch.interceptor-plugins[0].id=my-plugin
- camunda.operate.elasticsearch.interceptor-plugins[0].class-name=com.myplugin.MyCustomHeaderPlugin
- camunda.operate.elasticsearch.interceptor-plugins[0].jar-path=/usr/local/plugin/plg.jar
```

#### OpenSearch

```
- camunda.operate.zeebeOpensearch.interceptor-plugins[0].id=my-plugin
- camunda.operate.zeebeOpensearch.interceptor-plugins[0].class-name=com.myplugin.MyCustomHeaderPlugin
- camunda.operate.zeebeOpensearch.interceptor-plugins[0].jar-path=/usr/local/plugin/plg.jar
- camunda.operate.opensearch.interceptor-plugins[0].id=my-plugin
- camunda.operate.opensearch.interceptor-plugins[0].class-name=com.myplugin.MyCustomHeaderPlugin
- camunda.operate.opensearch.interceptor-plugins[0].jar-path=/usr/local/plugin/plg.jar
```

### Configure Tasklist Importer

#### ElasticSearch

```
- camunda.tasklist.zeebeElasticsearch.interceptor-plugins[0].id=my-plugin
- camunda.tasklist.zeebeElasticsearch.interceptor-plugins[0].class-name=com.myplugin.MyCustomHeaderPlugin
- camunda.tasklist.zeebeElasticsearch.interceptor-plugins[0].jar-path=/usr/local/plugin/plg.jar
- camunda.tasklist.elasticsearch.interceptor-plugins[0].id=my-plugin
- camunda.tasklist.elasticsearch.interceptor-plugins[0].class-name=com.myplugin.MyCustomHeaderPlugin
- camunda.tasklist.elasticsearch.interceptor-plugins[0].jar-path=/usr/local/plugin/plg.jar
```

#### OpenSearch

```
- camunda.tasklist.zeebeOpensearch.interceptor-plugins[0].id=my-plugin
- camunda.tasklist.zeebeOpensearch.interceptor-plugins[0].class-name=com.myplugin.MyCustomHeaderPlugin
- camunda.tasklist.zeebeOpensearch.interceptor-plugins[0].jar-path=/usr/local/plugin/plg.jar
- camunda.tasklist.opensearch.interceptor-plugins[0].id=my-plugin
- camunda.tasklist.opensearch.interceptor-plugins[0].class-name=com.myplugin.MyCustomHeaderPlugin
- camunda.tasklist.opensearch.interceptor-plugins[0].jar-path=/usr/local/plugin/plg.jar
```
