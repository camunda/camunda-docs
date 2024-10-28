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
  <artifactId>camunda-search-client-plugin</artifactId>
  <version>${version.camunda-search-client-plugin}</version>
</dependency>
```

</TabItem>

<TabItem value='gradle'>

```yml
implementation "io.camunda:camunda-search-client-plugin:${version.camunda-search-client-plugin}"
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
  public CustomHeader getSearchDatabaseCustomHeader() {
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

<Tabs groupId="db" defaultValue="elasticsearch" values={
[
{label: 'Elasticsearch', value: 'elasticsearch' },
{label: 'OpenSearch', value: 'opensearch' },
{label: 'Camunda Exporter', value: 'camundaExporter' }
]
}>

<TabItem value='elasticsearch'>

#### Configure Zeebe Exporter

```yaml
- ZEEBE_BROKER_EXPORTERS_ELASTICSEARCH_ARGS_INTERCEPTORPLUGINS_0_ID=my-plugin
- ZEEBE_BROKER_EXPORTERS_ELASTICSEARCH_ARGS_INTERCEPTORPLUGINS_0_CLASSNAME=com.myplugin.MyCustomHeaderPlugin
- ZEEBE_BROKER_EXPORTERS_ELASTICSEARCH_ARGS_INTERCEPTORPLUGINS_0_JARPATH=/usr/local/plugin/plg.jar
```

#### Configure Operate Importer

```yaml
- CAMUNDA_OPERATE_ZEEBEELASTICSEARCH_INTERCEPTORPLUGINS_0_ID=my-plugin
- CAMUNDA_OPERATE_ZEEBEELASTICSEARCH_INTERCEPTORPLUGINS_0_CLASSNAME=com.myplugin.MyCustomHeaderPlugin
- CAMUNDA_OPERATE_ZEEBEELASTICSEARCH_INTERCEPTORPLUGINS_0_JARPATH=/usr/local/plugin/plg.jar
- CAMUNDA_OPERATE_ELASTICSEARCH_INTERCEPTORPLUGINS_0_ID=my-plugin
- CAMUNDA_OPERATE_ELASTICSEARCH_INTERCEPTORPLUGINS_0_CLASSNAME=com.myplugin.MyCustomHeaderPlugin
- CAMUNDA_OPERATE_ELASTICSEARCH_INTERCEPTORPLUGINS_0_JARPATH=/usr/local/plugin/plg.jar
```

#### Configure Tasklist Importer

```yaml
- CAMUNDA_TASKLIST_ZEEBEELASTICSEARCH_INTERCEPTORPLUGINS_0_ID=my-plugin
- CAMUNDA_TASKLIST_ZEEBEELASTICSEARCH_INTERCEPTORPLUGINS_0_CLASSNAME=com.myplugin.MyCustomHeaderPlugin
- CAMUNDA_TASKLIST_ZEEBEELASTICSEARCH_INTERCEPTORPLUGINS_0_JARPATH=/usr/local/plugin/plg.jar
- CAMUNDA_TASKLIST_ELASTICSEARCH_INTERCEPTORPLUGINS_0_ID=my-plugin
- CAMUNDA_TASKLIST_ELASTICSEARCH_INTERCEPTORPLUGINS_0_CLASSNAME=com.myplugin.MyCustomHeaderPlugin
- CAMUNDA_TASKLIST_ELASTICSEARCH_INTERCEPTORPLUGINS_0_JARPATH=/usr/local/plugin/plg.jar
```

#### Configure Optimize Importer

:::note
Due to technical limitations, Optimize currently allows registering up to 5 plugins.
:::

```yaml
- CAMUNDA_OPTIMIZE_ELASTICSEARCH_INTERCEPTORPLUGINS_0_ID=my-plugin
- CAMUNDA_OPTIMIZE_ELASTICSEARCH_INTERCEPTORPLUGINS_0_CLASSNAME=com.myplugin.MyCustomHeaderPlugin
- CAMUNDA_OPTIMIZE_ELASTICSEARCH_INTERCEPTORPLUGINS_0_JARPATH=/usr/local/plugin/plg.jar
```

</TabItem>

<TabItem value='opensearch'>

#### Configure Zeebe Exporter

```yaml
- ZEEBE_BROKER_EXPORTERS_OPENSEARCH_ARGS_INTERCEPTORPLUGINS_0_ID=my-plugin
- ZEEBE_BROKER_EXPORTERS_OPENSEARCH_ARGS_INTERCEPTORPLUGINS_0_CLASSNAME=com.myplugin.MyCustomHeaderPlugin
- ZEEBE_BROKER_EXPORTERS_OPENSEARCH_ARGS_INTERCEPTORPLUGINS_0_JARPATH=/usr/local/plugin/plg.jar
```

#### Configure Operate Importer

```yaml
- CAMUNDA_OPERATE_ZEEBEOPENSEARCH_INTERCEPTORPLUGINS_0_ID=my-plugin
- CAMUNDA_OPERATE_ZEEBEOPENSEARCH_INTERCEPTORPLUGINS_0_CLASSNAME=com.myplugin.MyCustomHeaderPlugin
- CAMUNDA_OPERATE_ZEEBEOPENSEARCH_INTERCEPTORPLUGINS_0_JARPATH=/usr/local/plugin/plg.jar
- CAMUNDA_OPERATE_OPENSEARCH_INTERCEPTORPLUGINS_0_ID=my-plugin
- CAMUNDA_OPERATE_OPENSEARCH_INTERCEPTORPLUGINS_0_CLASSNAME=com.myplugin.MyCustomHeaderPlugin
- CAMUNDA_OPERATE_OPENSEARCH_INTERCEPTORPLUGINS_0_JARPATH=/usr/local/plugin/plg.jar
```

#### Configure Tasklist Importer

```yaml
- CAMUNDA_TASKLIST_ZEEBEOPENSEARCH_INTERCEPTORPLUGINS_0_ID=my-plugin
- CAMUNDA_TASKLIST_ZEEBEOPENSEARCH_INTERCEPTORPLUGINS_0_CLASSNAME=com.myplugin.MyCustomHeaderPlugin
- CAMUNDA_TASKLIST_ZEEBEOPENSEARCH_INTERCEPTORPLUGINS_0_JARPATH=/usr/local/plugin/plg.jar
- CAMUNDA_TASKLIST_OPENSEARCH_INTERCEPTORPLUGINS_0_ID=my-plugin
- CAMUNDA_TASKLIST_OPENSEARCH_INTERCEPTORPLUGINS_0_CLASSNAME=com.myplugin.MyCustomHeaderPlugin
- CAMUNDA_TASKLIST_OPENSEARCH_INTERCEPTORPLUGINS_0_JARPATH=/usr/local/plugin/plg.jar
```

#### Configure Optimize Importer

:::note
Due to technical limitations, Optimize currently allows registering up to 5 plugins.
:::

```yaml
- CAMUNDA_OPTIMIZE_OPENSEARCH_INTERCEPTORPLUGINS_0_ID=my-plugin
- CAMUNDA_OPTIMIZE_OPENSEARCH_INTERCEPTORPLUGINS_0_CLASSNAME=com.myplugin.MyCustomHeaderPlugin
- CAMUNDA_OPTIMIZE_OPENSEARCH_INTERCEPTORPLUGINS_0_JARPATH=/usr/local/plugin/plg.jar
```

</TabItem>

<TabItem value='camundaExporter'>

#### Configure Zeebe Exporter

:::note
The following configuration uses the default name `camundaExporter`. To use a custom name, update `CAMUNDAEXPORTER` in the provided environment variables to match the name defined in your exporter [configuration](/self-managed/zeebe-deployment/exporters/camunda-exporter.md).
:::

```yaml
- ZEEBE_BROKER_EXPORTERS_CAMUNDAEXPORTER_ARGS_CONNECT_INTERCEPTORPLUGINS_0_ID=my-plugin
- ZEEBE_BROKER_EXPORTERS_CAMUNDAEXPORTER_ARGS_CONNECT_INTERCEPTORPLUGINS_0_CLASSNAME=com.myplugin.MyCustomHeaderPlugin
- ZEEBE_BROKER_EXPORTERS_CAMUNDAEXPORTER_ARGS_CONNECT_INTERCEPTORPLUGINS_0_JARPATH=/usr/local/plugin/plg.jar
```

</TabItem>
</Tabs>

## Troubleshooting

### Exception: Unknown type of interceptor plugin or wrong class specified

This exception means that the incorrect class was specified in the `CLASSNAME` property. There are several causes that
might lead to this exception:

1. The class with such name or package does not exist
2. The class does not implement the required SDK interface
3. The class is inner, `static`, or `final`

To solve this, make sure:

1. You use the latest Search Plugins SDK
2. Your classes implement correct SDK interfaces
3. The plugin class is `public` and not `final`

### Exception: Failed to load interceptor plugin due to exception

Usually related to incorrect JAR loading. Please make sure that the path to your plugin JAR file is correct, and
the application has access to read it. Also check that the JAR is correct and contains the required dependencies. To check the
content of the JAR file, you can use the following command: `jar xf <file-name>.jar`.

## Appendix

Explore [plugin examples](https://github.com/camunda/camunda-search-client-plugins-example) in our official repository.
