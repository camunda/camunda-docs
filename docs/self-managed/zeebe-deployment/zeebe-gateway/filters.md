---
id: filters
title: "Filters"
sidebar_label: "Filters"
---

:::warning

Filters are only applied to the REST API of the gateway, and do not affect any gRPC calls.

:::

All communication from a client to a broker must first pass through a gateway.
There they can be filtered before being dispatched. Zeebe provides a way to
load arbitrary REST API filters into the gateway. Some typical examples of what you
can accomplish with this include:

- Enforcing custom authorization rules on incoming calls
- Monitoring and logging of incoming calls (e.g. ,,,)
- Distributed tracing (e.g. ...)

## Implementing a filter

For the communication between client and gateway, Zeebe uses [REST](components/zeebe/technical-concepts/protocols.md).
A filter is thus implemented as a Jakarta servlet [filter](https://jakarta.ee/specifications/platform/8/apidocs/javax/servlet/filter).

An implementation must adhere to the following requirements:

- It implements [Filter](https://jakarta.ee/specifications/platform/8/apidocs/javax/servlet/filter)
- It has public visibility
- It has a public default constructor (i.e. no-arg constructor)

Let's consider a filter that provides logging of incoming calls as an
example.

```java
package io.camunda.zeebe.example;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import java.io.IOException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * A simple filter that logs each incoming call. The class must be public
 * since we will load it via JAR into the gateway.
 */
public final class LoggingFilter implements Filter {
  private static final Logger LOGGER =
          LoggerFactory.getLogger("LoggingFilter");

  @Override
  public void doFilter(
          final ServletRequest servletRequest,
          final ServletResponse servletResponse,
          final FilterChain filterChain)
          throws IOException, ServletException {
    LOGGER.trace("filtered a call");
    filterChain.doFilter(servletRequest, servletResponse);
  }
}
```

This example filter will log `"filtered a call"` at `TRACE` level for
each incoming call it filtered. This specific filter always dispatches
all incoming calls to the target broker, but it would also be possible to stop
the message from being filtered by other filters and even to block it from
dispatch to the broker.

:::note

Camunda 8 relies on [Identity](../../identity/user-guide/tenants/managing-tenants.md) for tenant management and, as of 8.5.0, the REST API part of
the Zeebe Gateway does not support custom tenant-providing filters.

:::

## Compiling your filter

Our source code for the filter class can now be compiled. There are many
ways to do this, but for simplicity we'll use `javac` directly.

When compiling your class, you need to make sure all compile-time dependencies
are provided. In the example above, that means we need the `jakarta.servlet-api` and
`slf4j-api` libraries available when compiling.

Since the filter will be running inside the Zeebe gateway, the language
level of the compiled code must be the same as Zeebe's (i.e. currently JDK 11) or lower. This example thus assumes you're using version 11 of `javac`.

jakarta.servlet:jakarta.servlet-api

```sh
# to compile LoggingFilter.java, we'll need to provide the api libraries
javac -classpath .:lib/jakarta.servlet-api:lib/slf4j-api.jar ./LoggingFilter.java
```

## Packaging a filter

Next, you need to package the filter class into a fat JAR. Such a JAR must
contain all classes (i.e. including all classes your own classes depend upon at
runtime).

Like compiling there are many ways to do this, but for simplicity we'll use
`jar` directly. Note, that means we have to define a java manifest file by hand,
in order to place the libraries' classes on the classpath.

Similar to your filter class, any libraries you package must be compiled
for the same language level as Zeebe's (i.e. currently JDK 11) or lower.

:::note

The file path for `jar` should match the package name. For example, if your package name is `com.example`, you should package `jar` as `jar cvfm LoggingFilter.jar ./MANIFEST.MF ./com/example/*.class ./lib`.

:::

```sh
# both runtime libraries and the manifest must be packaged together with the compiled classes
jar cvfm LoggingFilter.jar ./MANIFEST.MF ./*.class ./lib

# let's verify the contents of the JAR
jar tf ./LoggingFilter.jar
# META-INF/
# META-INF/MANIFEST.MF
# LoggingFilter.java
# LoggingFilter$1.class
# lib/
# lib/jakarta.servlet-api.jar
# lib/slf4j-api.jar
# lib/slf4j.jar
```

## Loading a filter into a gateway

A filter can be loaded into your gateway as a fat JAR. For each
filter, you need to provide your gateway with:

- A filter order index
- An identifier to identify this specific filter
- Where to find the JAR with the filter class
- The [fully qualified name](https://docs.oracle.com/javase/specs/jls/se17/html/jls-6.html#jls-6.7)
  of the filter class, e.g. `com.acme.ExampleFilter`

Let's continue with the `LoggingFilter` example. We can provide these
[configurations](/self-managed/zeebe-deployment/configuration/configuration.md)
using a gateway config file, environment variables or a mix of both. We'll be
using a config file here.

The following gateway config file configures our `LoggingFilter` so it can be
loaded into the gateway at start-up.

```yaml
zeebe:
  gateway:
    ...

    # allows specifying multiple filters
    filters:

      - # identifier, can be used for debugging
        id: logging-filter

        # name of our Filter implementation
        # this must be the fully qualified name of the class
        className: io.camunda.zeebe.example.LoggingFilter

        # path to the fat JAR, can be absolute or relative
        jarPath: /tmp/LoggingFilter.jar

      # you can add additional filters by listing them
      - id: ...
        className: ...
        jarPath: ...
```

Note that multiple filters can be configured (i.e.
`zeebe.gateway.filters` expects a list of filter configurations). The
listing order determines the order in which a call is filtered by the
different filters. The first filter in the list wraps the second, etc.
The first filter is thus the outermost filter. In other words, calls
are filtered first by the first listed filter, followed by the second
listed filter, etc.

This configuration can also be provided using environment variables. You'll need
to provide an index for the filter in the variable name, to distinguish the
ordering of the different filters. For example, to configure the
`className` of the first filter use:
`zeebe_gateway_filters_0_className`. Likewise, a second filter's
`jarPath` can be configured using `zeebe_gateway_filters_1_jarPath`.

## About class loading

[Previously](#packaging-a-filter), we stated that you need to package the
filter class into a fat JAR. Although good general advice, this is not
entirely true. To understand why, let's discuss how the class loading of your
filter works.

When your JAR is loaded into the gateway, Zeebe provides a special class loader
for it. This class loader isolates your filter from the rest of Zeebe, but
it also exposes our own code to your filter. When loading classes for your
filter, it will always first look in this special class loader and only if
it is not available it will look in Zeebe's main class loader. In other words,
you can access any classes from Zeebe's main class loader when they are not
provided by your JAR. For internal class loading, Zeebe will still only look in
its main class loader.

This means you can reduce your JAR size by leaving out libraries that are
already provided by Zeebe's class loader. In addition, if your filter
depends on a different version of a class than the one provided by Zeebe, then
you can provide your own version without having to worry about breaking Zeebe.

## Troubleshooting

Here we describe a few common errors. Hopefully, this will help you recognize
these situations and provide an easy fix. Generally, the gateway will not be
able to start up with a misconfigured filter.

:::note
Environment variables can overwrite your gateway configuration file.
The gateway logs the configuration it uses during start-up, use this to
verify your configuration.
:::

### java.lang.ClassNotFoundException

Your `Filter` implementation could
not be found. Make sure you've configured the `className` correctly in the
[gateway configuration](#loading-a-filter-into-a-gateway) and that your
[JAR contains your class](#packaging-a-filter).

### io.camunda.zeebe.gateway.rest.impl.filters.FilterLoadException

Something went wrong trying to load your filter. Make sure your [JAR is
packaged](#packaging-a-filter) correctly, i.e. it contains all runtime
dependencies and specifies them in the manifest file's classpath. The exception
should provide a clear description, but generally we distinguish the following
common cases:

**\*Unable to instantiate your class**

Make sure your class adheres to the [requirements described above](#implementing-a-filter).

**The JAR could not be loaded**

Make sure you've configured your filter correctly in the [gateway configuration](#loading-a-filter-into-a-gateway).

### io.camunda.zeebe.util.jar.ExternalJarLoadException

The JAR could not be loaded: make sure you've configured your filter correctly in the [gateway configuration](#loading-a-filter-into-a-gateway).

### java.lang.UnsupportedClassVersionError

Your filter has been compiled by a more recent version of the Java Runtime. Make sure your [class is compiled](#packaging-a-filter) with JDK 11.
