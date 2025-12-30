---
id: configure-db-custom-headers
sidebar_label: Configure custom HTTP headers
title: Configure custom HTTP headers for database clients
description: "You can add custom HTTP headers to the Elasticsearch or OpenSearch clients used by Camunda components by creating a Java."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

You can add custom HTTP headers to the Elasticsearch or OpenSearch clients used by Camunda components by creating a Java plugin and adding it to your Camunda 8 Self-Managed installation. Custom headers can help with adding authentication, tracking, or debugging to your database requests.

## Prerequisites

- A deployed Camunda 8 Self-Managed Helm chart installation
- Access to modify container configurations
- Basic knowledge of Java development
- Maven or Gradle build environment

## Configuration

### Create the Java plugin

#### Add the dependency

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
  <scope>provided</scope>
</dependency>
```

</TabItem>

<TabItem value='gradle'>

```yml
implementation "io.camunda:camunda-search-client-plugin:${version.camunda-search-client-plugin}"
```

</TabItem>
</Tabs>

#### Write your custom header

After adding the dependency, create your plugin by implementing the `DatabaseCustomHeaderSupplier` interface provided by the `camunda-search-client-plugin` package.

The following example implements the `DatabaseCustomHeaderSupplier` interface, and returns a custom authentication token and UUID:

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

#### Build your project

Build your project with all dependencies included, and copy the resulting JAR file to a location accessible by your Camunda installation. This JAR file will be required later during configuration.

:::note
When building the project, the `camunda-search-client-plugin` dependency must have a scope of `provided`, otherwise there will be a class loader conflict between `camunda-search-client-plugin` classes loaded from different class paths.

The JVM treats `ClassA` loaded by `ClassLoaderA` as completely different from `ClassA` loaded by `ClassLoaderB`. Without a `provided` scope, this causes `does not implement` or `ClassCastException` errors.
:::

### Add the plugin to your self-managed installation

To use your new plugin, add it to your Camunda 8 Self-Managed installation.

- **Mount the plugin**: For each container, mount your plugin JAR file inside the container's file system. For more information, see the [Docker](https://docs.docker.com/engine/storage/volumes/) or [Kubernetes](https://kubernetes.io/docs/concepts/storage/volumes/) documentation.

- **Configure components**: Include the plugin parameters in each component's `application.yaml`, or pass them to the component as environment variables. For more information, see how to [configure components using Helm charts](../application-configs.md).

### Example usage

The following examples add the new `my-plugin` JAR to the `application.yaml` for the Orchestration Cluster and Optimize:

<Tabs groupId="db" defaultValue="elasticsearch" values={
[
{label: 'Elasticsearch', value: 'elasticsearch' },
{label: 'OpenSearch', value: 'opensearch' },
{label: 'Camunda Exporter', value: 'camundaExporter' }
]
}>

<TabItem value='elasticsearch'>

#### Zeebe Exporter

```yaml
- ZEEBE_BROKER_EXPORTERS_ELASTICSEARCH_ARGS_INTERCEPTORPLUGINS_0_ID=my-plugin
- ZEEBE_BROKER_EXPORTERS_ELASTICSEARCH_ARGS_INTERCEPTORPLUGINS_0_CLASSNAME=com.myplugin.MyCustomHeaderPlugin
- ZEEBE_BROKER_EXPORTERS_ELASTICSEARCH_ARGS_INTERCEPTORPLUGINS_0_JARPATH=/usr/local/plugin/plg.jar
```

#### Optimize Importer

:::note
Due to technical limitations, Optimize currently allows registering up to five plugins.
:::

```yaml
- CAMUNDA_OPTIMIZE_ELASTICSEARCH_INTERCEPTORPLUGINS_0_ID=my-plugin
- CAMUNDA_OPTIMIZE_ELASTICSEARCH_INTERCEPTORPLUGINS_0_CLASSNAME=com.myplugin.MyCustomHeaderPlugin
- CAMUNDA_OPTIMIZE_ELASTICSEARCH_INTERCEPTORPLUGINS_0_JARPATH=/usr/local/plugin/plg.jar
```

</TabItem>

<TabItem value='opensearch'>

#### Zeebe Exporter

```yaml
- ZEEBE_BROKER_EXPORTERS_OPENSEARCH_ARGS_INTERCEPTORPLUGINS_0_ID=my-plugin
- ZEEBE_BROKER_EXPORTERS_OPENSEARCH_ARGS_INTERCEPTORPLUGINS_0_CLASSNAME=com.myplugin.MyCustomHeaderPlugin
- ZEEBE_BROKER_EXPORTERS_OPENSEARCH_ARGS_INTERCEPTORPLUGINS_0_JARPATH=/usr/local/plugin/plg.jar
```

#### Optimize Importer

:::note
Due to technical limitations, Optimize currently allows registering up to five plugins.
:::

```yaml
- CAMUNDA_OPTIMIZE_OPENSEARCH_INTERCEPTORPLUGINS_0_ID=my-plugin
- CAMUNDA_OPTIMIZE_OPENSEARCH_INTERCEPTORPLUGINS_0_CLASSNAME=com.myplugin.MyCustomHeaderPlugin
- CAMUNDA_OPTIMIZE_OPENSEARCH_INTERCEPTORPLUGINS_0_JARPATH=/usr/local/plugin/plg.jar
```

</TabItem>

<TabItem value='camundaExporter'>

#### Zeebe Exporter

:::note
The following configuration uses the default name `camundaExporter`. To use a custom name, update `CAMUNDAEXPORTER` in the provided environment variables to match the name defined in your exporter [configuration](../../../../components/orchestration-cluster/zeebe/exporters/camunda-exporter.md).
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

This exception means that the incorrect class was specified in the `CLASSNAME` property. Possible causes include:

- The class name or package does not exist.
- The class does not implement the required SDK interface.
- The class is defined as `inner`, `static`, or `final`.

To fix this:

- Use the latest Search Plugins SDK.
- Ensure your class implements the correct SDK interface.
- Verify that the plugin class is `public` and not `final`.

### Exception: Failed to load interceptor plugin due to exception

This error usually indicates an issue with JAR loading.

- Make sure that the path to your plugin JAR file is correct and that the application has permission to read it.
- Also confirm that the JAR is valid and contains all required dependencies.

To check the contents of your JAR file, run the following command:

```bash
jar xf <file-name>.jar
```

## References

- [Configure components using Helm charts](../application-configs.md)
- [Plugin examples](https://github.com/camunda/camunda-search-client-plugins-example)
