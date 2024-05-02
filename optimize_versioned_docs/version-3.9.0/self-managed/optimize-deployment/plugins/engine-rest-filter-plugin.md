---
id: engine-rest-filter-plugin
title: "Engine REST filter"
description: "Register your own REST filter that is called for every REST call to the engine."
---

<span class="badge badge--platform">Camunda 7 only</span>

Before implementing the plugin, make sure that you have [set up your environment](./plugin-system.md#setup-your-environment).

This feature allows you to register your own filter that is called for every REST call to one of the configured process engines.
For that, the Optimize plugin system provides the following interface:

```java
public interface EngineRestFilter {

  void filter(ClientRequestContext requestContext, String engineAlias, String engineName) throws IOException;
}
```

Implement this interface to adjust the JAX-RS client request, which is represented by `requestContext`, sent to the process engine's REST API.
If the modification depends on the process engine, you can analyze the value of `engineAlias` and/or `engineName` to decide what adjustment is needed.

The following example shows a filter that simply adds a custom header to every REST call:

```java
package com.example.optimize.enginerestplugin;

import java.io.IOException;
import javax.ws.rs.client.ClientRequestContext;

public class AddCustomTokenFilter implements EngineRestFilter {

  @Override
  public void filter(ClientRequestContext requestContext, String engineAlias, String engineName) throws IOException {
    requestContext.getHeaders().add("Custom-Token", "SomeCustomToken");
  }

}
```

Similar to other plugins, you have to package your plugin in a `jar`, add it to the `plugin` folder, and enable Optimize to find it by adding the following configuration to `environment-config.yaml`:

```yaml
plugin:
  engineRestFilter:
    #Look in the given base package list for engine rest filter plugins.
    #If empty, the REST calls are not influenced.
    basePackages: ["com.example.optimize.enginerestplugin"]
```
