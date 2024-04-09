---
id: elasticsearch-header
title: "Elasticsearch header"
description: "Register your own hook into the Optimize Elasticsearch client to add custom headers to requests."
---

Before implementing the plugin, make sure that you have [set up your environment](./plugin-system.md#setup-your-environment).

This feature allows you to register your own hook into the Optimize Elasticsearch client, allowing you to add custom headers to all requests made to Elasticsearch. The plugin is invoked before every request to Elasticsearch is made, allowing different
headers and values to be added per request. This plugin is also loaded during the update and reimport.

For that, the Optimize plugin system provides the following interface:

```java
public interface ElasticsearchCustomHeaderSupplier {

  CustomHeader getElasticsearchCustomHeader();
}
```

Implement this interface and return the custom header you would like to be added to Elasticsearch requests. The `CustomHeader`
class has a single Constructor taking two arguments, as follows:

```java
public CustomHeader(String headerName, String headerValue)
```

The following example returns a header that will be added:

```java
package com.example.optimize.elasticsearch.headers;

import org.camunda.optimize.plugin.elasticsearch.CustomHeader;
import org.camunda.optimize.plugin.elasticsearch.ElasticsearchCustomHeaderSupplier;

public class AddAuthorizationHeaderPlugin implements ElasticsearchCustomHeaderSupplier {

  private String currentToken;

  public CustomHeader getElasticsearchCustomHeader() {
    if (currentToken == null || currentTokenExpiresWithinFifteenMinutes()) {
      currentToken = fetchNewToken();
    }
    return new CustomHeader("Authorization", currentToken);
  }
}
```

Similar to the other plugins' setup, you have to package your plugin in a `jar`, add it to Optimize's `plugin` folder, and make Optimize find it by adding the following configuration to `environment-config.yaml`:

```yaml
plugin:
  elasticsearchCustomHeader:
    # Look in the given base package list for Elasticsearch custom header fetching plugins.
    # If empty, ES requests are not influenced.
    basePackages: ["com.example.optimize.elasticsearch.headers"]
```

For more information and example implementations, have a look at the [Optimize Examples Repository](https://github.com/camunda/camunda-optimize-examples#getting-started-with-elasticsearch-header-plugins).
