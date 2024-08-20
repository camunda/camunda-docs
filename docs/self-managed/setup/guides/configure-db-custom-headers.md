---
id: configure-db-custom-headers
title: "Configure custom headers"
sidebar_label: "Configure custom headers"
description: "Learn how to configure DB client custom headers"
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Custom HTTP headers can be added to a component's Elasticsearch and OpenSearch HTTP clients by creating a new Java plugin, and adding the plugin to your Camunda 8 Self-Managed installation. Using custom HTTP headers may be helpful for adding authentication, tracking, or debugging to your database requests.

## Create the Java plugin

### Add the dependency

Add the following dependency to a new Java project:

<Tabs groupId="dependency" defaultValue="maven" values={
[
{label: 'Maven', value: 'maven' },
{label: 'Gradle', value: 'gradle' }
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

### Write your custom header

Once the dependency is added to your project, write your plugin by implementing the `DatabaseCustomHeaderSupplier` interface (provided by the
`camunda-search-plugins` package).

The following example implements the `DatabaseCustomHeaderSupplier` interface, and uses it to return a custom authentication token and UUID:

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

### Build your project

Build your project with all dependencies included, and copy the resulting JAR file somewhere it can be easily accessed. This JAR file will be required by your Camunda installation.

## Add the plugin to your self-managed installation

To use your new plugin, it must be added to your Camunda 8 Self-Managed installation.

### Mount the plugin

For each container, mount your plugin's JAR file inside the container's file system. For more information, see the
[Docker](https://docs.docker.com/engine/storage/volumes/) or [Kubernetes](https://kubernetes.io/docs/concepts/storage/volumes/) documentation.

### Configure components

Include the plugin parameters in each component's `application.yaml`, or pass them to the component as environment variables. For more information, see how to [configure components using Helm charts](/self-managed/operational-guides/application-configs.md).

The following examples add the new `my-plugin` JAR to the `application.yaml` for Zeebe, Operate, and Tasklist:

#### Configure Zeebe Exporter

<Tabs groupId="db" defaultValue="elasticsearch" values={
[
{label: 'Elasticsearch', value: 'elasticsearch' },
{label: 'OpenSearch', value: 'opensearch' }
]
}>

<TabItem value='elasticsearch'>

```yaml
- zeebe.broker.exporters.elasticsearch.args.interceptor-plugins[0].id=my-plugin
- zeebe.broker.exporters.elasticsearch.args.interceptor-plugins[0].class-name=com.myplugin.MyCustomHeaderPlugin
- zeebe.broker.exporters.elasticsearch.args.interceptor-plugins[0].jar-path=/usr/local/plugin/plg.jar
```

</TabItem>

<TabItem value='opensearch'>

```yaml
- zeebe.broker.exporters.opensearch.args.interceptor-plugins[0].id=my-plugin
- zeebe.broker.exporters.opensearch.args.interceptor-plugins[0].class-name=com.myplugin.MyCustomHeaderPlugin
- zeebe.broker.exporters.opensearch.args.interceptor-plugins[0].jar-path=/usr/local/plugin/plg.jar
```

</TabItem>
</Tabs>

#### Configure Operate Importer

<Tabs groupId="db" defaultValue="elasticsearch" values={
[
{label: 'Elasticsearch', value: 'elasticsearch' },
{label: 'OpenSearch', value: 'opensearch' }
]
}>

<TabItem value='elasticsearch'>

```yaml
- camunda.operate.zeebeElasticsearch.interceptor-plugins[0].id=my-plugin
- camunda.operate.zeebeElasticsearch.interceptor-plugins[0].class-name=com.myplugin.MyCustomHeaderPlugin
- camunda.operate.zeebeElasticsearch.interceptor-plugins[0].jar-path=/usr/local/plugin/plg.jar
- camunda.operate.elasticsearch.interceptor-plugins[0].id=my-plugin
- camunda.operate.elasticsearch.interceptor-plugins[0].class-name=com.myplugin.MyCustomHeaderPlugin
- camunda.operate.elasticsearch.interceptor-plugins[0].jar-path=/usr/local/plugin/plg.jar
```

</TabItem>

<TabItem value='opensearch'>

```yaml
- camunda.operate.zeebeOpensearch.interceptor-plugins[0].id=my-plugin
- camunda.operate.zeebeOpensearch.interceptor-plugins[0].class-name=com.myplugin.MyCustomHeaderPlugin
- camunda.operate.zeebeOpensearch.interceptor-plugins[0].jar-path=/usr/local/plugin/plg.jar
- camunda.operate.opensearch.interceptor-plugins[0].id=my-plugin
- camunda.operate.opensearch.interceptor-plugins[0].class-name=com.myplugin.MyCustomHeaderPlugin
- camunda.operate.opensearch.interceptor-plugins[0].jar-path=/usr/local/plugin/plg.jar
```

</TabItem>
</Tabs>

#### Configure Tasklist Importer

<Tabs groupId="db" defaultValue="elasticsearch" values={
[
{label: 'Elasticsearch', value: 'elasticsearch' },
{label: 'OpenSearch', value: 'opensearch' }
]
}>

<TabItem value='elasticsearch'>

```yaml
- camunda.tasklist.zeebeElasticsearch.interceptor-plugins[0].id=my-plugin
- camunda.tasklist.zeebeElasticsearch.interceptor-plugins[0].class-name=com.myplugin.MyCustomHeaderPlugin
- camunda.tasklist.zeebeElasticsearch.interceptor-plugins[0].jar-path=/usr/local/plugin/plg.jar
- camunda.tasklist.elasticsearch.interceptor-plugins[0].id=my-plugin
- camunda.tasklist.elasticsearch.interceptor-plugins[0].class-name=com.myplugin.MyCustomHeaderPlugin
- camunda.tasklist.elasticsearch.interceptor-plugins[0].jar-path=/usr/local/plugin/plg.jar
```

</TabItem>

<TabItem value='opensearch'>

```yaml
- camunda.tasklist.zeebeOpensearch.interceptor-plugins[0].id=my-plugin
- camunda.tasklist.zeebeOpensearch.interceptor-plugins[0].class-name=com.myplugin.MyCustomHeaderPlugin
- camunda.tasklist.zeebeOpensearch.interceptor-plugins[0].jar-path=/usr/local/plugin/plg.jar
- camunda.tasklist.opensearch.interceptor-plugins[0].id=my-plugin
- camunda.tasklist.opensearch.interceptor-plugins[0].class-name=com.myplugin.MyCustomHeaderPlugin
- camunda.tasklist.opensearch.interceptor-plugins[0].jar-path=/usr/local/plugin/plg.jar
```

</TabItem>
</Tabs>
