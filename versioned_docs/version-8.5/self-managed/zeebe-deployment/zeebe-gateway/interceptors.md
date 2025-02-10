---
id: interceptors
title: "Interceptors"
sidebar_label: "Interceptors"
---

:::danger

Interceptors are only applied to the gRPC API of the gateway, and do not affect any REST calls.
As such, it's not possible yet to hook into the request/response cycle of a REST call, such as
providing a custom tenant-providing interceptor.

:::

All communication from a client to a broker must first pass through a gateway.
There they can be intercepted before being dispatched. Zeebe provides a way to
load arbitrary interceptors into the gateway. Some typical examples of what you
can accomplish with this include:

- Enforcing custom authorization rules on incoming calls
- Monitoring and logging of incoming calls (e.g.
  https://github.com/grpc-ecosystem/java-grpc-prometheus)
- Distributed tracing (e.g.
  https://github.com/open-telemetry/opentelemetry-java-instrumentation)

## Implementing an interceptor

For the communication between client and gateway, Zeebe uses the gRPC
[protocol](components/zeebe/technical-concepts/protocols.md). An interceptor is
thus implemented as a gRPC
[ServerInterceptor](https://grpc.github.io/grpc-java/javadoc/io/grpc/ServerInterceptor.html).

An implementation must adhere to the following requirements:

- It implements [ServerInterceptor](https://grpc.github.io/grpc-java/javadoc/io/grpc/ServerInterceptor.html)
- It has public visibility
- It has a public default constructor (i.e. no-arg constructor)

Let's consider an interceptor that provides logging of incoming calls as an
example. Other ServerInterceptor examples can be found in the official grpc-java
[examples](https://github.com/grpc/grpc-java/tree/v1.41.0/examples).

```java
package io.camunda.zeebe.example;

import io.grpc.ForwardingServerCallListener.SimpleForwardingServerCallListener;
import io.grpc.Metadata;
import io.grpc.ServerCall;
import io.grpc.ServerCall.Listener;
import io.grpc.ServerCallHandler;
import io.grpc.ServerInterceptor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * A simple interceptor that logs each incoming call. The class must be public
 * since we will load it via JAR into the gateway.
 */
public final class LoggingInterceptor implements ServerInterceptor {
  private static final Logger LOGGER =
      LoggerFactory.getLogger("LoggingInterceptor");

  @Override
  public <ReqT, RespT> Listener<ReqT> interceptCall(
      final ServerCall<ReqT, RespT> call,
      final Metadata headers,
      final ServerCallHandler<ReqT, RespT> next) {
    final var listener = next.startCall(call, headers);
    return new SimpleForwardingServerCallListener<>(listener) {
      @Override
      public void onMessage(final ReqT message) {
        LOGGER.trace("intercepted a call");
        super.onMessage(message);
      }
    };
  }
}
```

This example interceptor will log `"intercepted a call"` at `TRACE` level for
each incoming call it intercepted. This specific interceptor always dispatches
all incoming calls to the target broker, but it would also be possible to stop
the message from interception by other interceptors and even to block it from
dispatch to the broker.

### Implementing a tenant-providing interceptor

:::note

Camunda 8 relies on [Identity](../../identity/user-guide/tenants/managing-tenants.md) for tenant management.
Tenant-providing interceptors are only compatible with Zeebe, and should only be used when Zeebe is used as a standalone
application.

Furthermore, as of 8.5.0, the REST API part of Zeebe does not support custom tenant-providing interceptors.

:::

Zeebe supports [multi-tenancy](../../concepts/multi-tenancy.md), or the ability for a single Zeebe installation to serve
multiple distinct users/clients.

To ensure that clients can only access tenants they are authorized for, client requests
need to provide a list of the tenants they are authorized for. If using the full Camunda 8 stack, this
functionality is already provided by [Identity](../../identity/user-guide/tenants/managing-tenants.md).

However, if you decide to use Zeebe as a standalone product with multi-tenancy enabled, you need to
provide your own component for managing tenants. You can integrate your tenant-managing component with Zeebe
by implementing a tenant-providing interceptor which provides the Zeebe Gateway with a list of authorized tenant IDs.

The Zeebe Gateway will add the list of authorized tenants when forwarding the request to the Zeebe Broker. You will
need to ensure that the provided tenant IDs satisfy the following criteria:

- A tenant ID can't be a blank string (empty string or null).
- A tenant ID is no longer than 31 characters.
- A tenant ID can only contain alphanumeric characters, dot (.), dash (-), or underscore (\_).

To implement a tenant-providing interceptor, perform the following steps:

1. Follow the [guide above](#implementing-an-interceptor) to implement your code to obtain a list of tenant identifiers.
2. Set the list of authorized tenant IDs on the `io.camunda.zeebe:authorized_tenants` gRPC Context key. Zeebe provides
   the following helper methods to make working with the gRPC Context API easier:
   - The `InterceptorUtil#getAuthorizedTenantsKey()` method - For working with the appropriate gRPC Context key.
   - The `InterceptorUtil#setAuthorizedTenants(List<String>)` - For setting the list of authorized tenant IDs on the
     gRPC Context key defined above.

You can find a code example of a tenant-providing interceptor below. The example uses the
`InterceptorUtil#setAuthorizedTenants(List<String>)` method to set the list of authorized tenant IDs on the
gRPC Context.

```java
public final class TenantProvidingInterceptor implements ServerInterceptor {

    @Override
    public <ReqT, RespT> Listener<ReqT> interceptCall(
            final ServerCall<ReqT, RespT> call,
            final Metadata headers,
            final ServerCallHandler<ReqT, RespT> next) {

      // get the list of authorized tenant IDs from your tenant-managing component
      final List<String> authorizedTenantIds = getMyAuthorizedTenants();

      final Context context = Context.current();
      context.withValue(InterceptorUtil.getAuthorizedTenantsKey(), authorizedTenantIds);

      return Contexts.interceptCall(context, call, headers, next);
    }
}
```

## Compiling your interceptor

Our source code for the interceptor class can now be compiled. There are many
ways to do this, but for simplicity we'll use `javac` directly.

When compiling your class, you need to make sure all compile-time dependencies
are provided. In the example above, that means we need the `grpc-api` and
`slf4j-api` libraries available when compiling.

Since the interceptor will be running inside the Zeebe gateway, the language
level of the compiled code must be the same as Zeebe's (i.e. currently JDK 11) or lower. This example thus assumes you're using version 11 of `javac`.

```sh
# to compile LoggingInterceptor.java, we'll need to provide the api libraries
javac -classpath .:lib/grpc-api.jar:lib/slf4j-api.jar ./LoggingInterceptor.java
```

## Packaging an interceptor

Next, you need to package the interceptor class into a fat JAR. Such a JAR must
contain all classes (i.e. including all classes your own classes depend upon at
runtime).

Like compiling there are many ways to do this, but for simplicity we'll use
`jar` directly. Note, that means we have to define a java manifest file by hand,
in order to place the libraries' classes on the classpath.

Similar to your interceptor class, any libraries you package must be compiled
for the same language level as Zeebe's (i.e. currently JDK 11) or lower.

:::note

The file path for `jar` should match the package name. For example, if your package name is `com.example`, you should package `jar` as `jar cvfm LoggingInterceptor.jar ./MANIFEST.MF ./com/example/*.class ./lib`.

:::

```sh
# both runtime libraries and the manifest must be packaged together with the compiled classes
jar cvfm LoggingInterceptor.jar ./MANIFEST.MF ./*.class ./lib

# let's verify the contents of the JAR
jar tf ./LoggingInterceptor.jar
# META-INF/
# META-INF/MANIFEST.MF
# LoggingInterceptor.java
# LoggingInterceptor$1.class
# lib/
# lib/grpc-api.jar
# lib/grpc.jar
# lib/slf4j-api.jar
# lib/slf4j.jar
```

## Loading an interceptor into a gateway

An interceptor can be loaded into your gateway as a fat JAR. For each
interceptor, you need to provide your gateway with:

- An interception order index
- An identifier to identify this specific interceptor
- Where to find the JAR with the interceptor class
- The [fully qualified name](https://docs.oracle.com/javase/specs/jls/se17/html/jls-6.html#jls-6.7)
  of the interceptor class, e.g. `com.acme.ExampleInterceptor`

Let's continue with the LoggingInterceptor example. We can provide these
[configurations](/self-managed/zeebe-deployment/configuration/configuration.md)
using a gateway config file, environment variables or a mix of both. We'll be
using a config file here.

The following gateway config file configures our LoggingInterceptor so it can be
loaded into the gateway at start-up.

```yaml
zeebe:
  gateway:
    ...

    # allows specifying multiple interceptors
    interceptors:

      - # identifier, can be used for debugging
        id: logging-interceptor

        # name of our ServerInterceptor implementation
        # this must be the fully qualified name of the class
        className: io.camunda.zeebe.example.LoggingInterceptor

        # path to the fat JAR, can be absolute or relative
        jarPath: /tmp/LoggingInterceptor.jar

      # you can add additional interceptors by listing them
      - id: ...
        className: ...
        jarPath: ...
```

Note that multiple interceptors can be configured (i.e.
`zeebe.gateway.interceptors` expects a list of interceptor configurations). The
listing order determines the order in which a call is intercepted by the
different interceptors. The first interceptor in the list wraps the second, etc.
The first interceptor is thus the outermost interceptor. In other words, calls
are intercepted first by the first listed interceptor, followed by the second
listed interceptor, etc.

This configuration can also be provided using environment variables. You'll need
to provide an index for the interceptor in the variable name, to distinguish the
ordering of the different interceptors. For example, to configure the
`className` of the first interceptor use:
`zeebe_gateway_interceptors_0_className`. Likewise, a second interceptor's
`jarPath` can be configured using `zeebe_gateway_interceptors_1_jarPath`.

## About class loading

[Previously](#packaging-an-interceptor), we stated that you need to package the
interceptor class into a fat JAR. Although good general advice, this is not
entirely true. To understand why, let's discuss how the class loading of your
interceptor works.

When your JAR is loaded into the gateway, Zeebe provides a special class loader
for it. This class loader isolates your interceptor from the rest of Zeebe, but
it also exposes our own code to your interceptor. When loading classes for your
interceptor, it will always first look in this special class loader and only if
it is not available it will look in Zeebe's main class loader. In other words,
you can access any classes from Zeebe's main class loader when they are not
provided by your JAR. For internal class loading, Zeebe will still only look in
its main class loader.

This means you can reduce your JAR size by leaving out libraries that are
already provided by Zeebe's class loader. In addition, if your interceptor
depends on a different version of a class than the one provided by Zeebe, then
you can provide your own version without having to worry about breaking Zeebe.

## Troubleshooting

Here we describe a few common errors. Hopefully, this will help you recognize
these situations and provide an easy fix. Generally, the gateway will not be
able to start up with a misconfigured interceptor.

:::note
Environment variables can overwrite your gateway configuration file.
The gateway logs the configuration it uses during start-up, use this to
verify your configuration.
:::

### java.lang.ClassNotFoundException

Your ServerInterceptor implementation could
not be found. Make sure you've configured the `className` correctly in the
[gateway configuration](#loading-an-interceptor-into-a-gateway) and that your
[JAR contains your class](#packaging-an-interceptor).

### io.camunda.zeebe.gateway.interceptors.impl.InterceptorLoadException

Something went wrong trying to load your interceptor. Make sure your [JAR is
packaged](#packaging-an-interceptor) correctly, i.e. it contains all runtime
dependencies and specifies them in the manifest file's classpath. The exception
should provide a clear description, but generally we distinguish the following
common cases:

**\*Unable to instantiate your class**

Make sure your class adheres to the [requirements described above](#implementing-an-interceptor).

**The JAR could not be loaded**

Make sure you've configured your interceptor correctly in the [gateway configuration](#loading-an-interceptor-into-a-gateway).

### io.camunda.zeebe.util.jar.ExternalJarLoadException

The JAR could not be loaded: make sure you've configured your interceptor correctly in the [gateway configuration](#loading-an-interceptor-into-a-gateway).

### java.lang.UnsupportedClassVersionError

Your interceptor has been compiled by a more recent version of the Java Runtime. Make sure your [class is compiled](#packaging-an-interceptor) with JDK 11.
