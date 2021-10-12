---
id: interceptors
title: "Interceptors"
sidebar_label: "Interceptors"
---

> This functionality is currently only available in Camunda Cloud Self-Managed.

All communication from a client to a broker must first pass through a gateway.
There they can be intercepted before being dispatched. Zeebe provides a way to
load arbitrary interceptors into the gateway. Some typical examples of what you
can accomplish with this include:

- enforcing custom authorization rules on incoming calls
- monitoring and logging of incoming calls

## Implementing an interceptor
For the communication between client and gateway, Zeebe uses the gRPC
[protocol](/components/zeebe/technical-concepts/protocols.md). An interceptor is
thus implemented as a gRPC
[ServerInterceptor](https://grpc.github.io/grpc-java/javadoc/io/grpc/ServerInterceptor.html).

An implementation must adhere to the following requirements:
- it implements
  [ServerInterceptor](https://grpc.github.io/grpc-java/javadoc/io/grpc/ServerInterceptor.html)
- it has public visibility
- it has a public default constructor (i.e. no-arg constructor)

Let's consider an interceptor that provides logging of incoming calls as an
example. Other ServerInterceptor examples can be found in the official grpc-java
[examples](https://github.com/grpc/grpc-java/tree/v1.41.0/examples).

```java
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

## Packaging an interceptor
Next, you need to package the interceptor class into a fat JAR. Such a JAR must
contain all classes (i.e. including all classes your own classes depend upon at
runtime).

There are many ways to do this, but for simplicity we'll use `javac` and `jar`
directly. Note, that means we have to define a java manifest file by hand, in
order to place the libraries' classes on the classpath.

```sh
# to compile LoggingInterceptor.java, we'll need to provide the grpc and slf4j api libraries
javac -classpath .:lib/grpc-api.jar:lib/slf4j-api.jar ./LoggingInterceptor.java

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
- an interception order index
- an identifier to identify this specific interceptor
- where to find the JAR with the interceptor class
- the fully qualified name of the interceptor class

Let's continue with the LoggingInterceptor example. We can provide these
[configurations](components/zeebe/deployment-guide/configuration/configuration.md)
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

      # determines the interception order
      0:
        # identifier, can be used for debugging
        id: logging-interceptor

        # name of our ServerInterceptor implementation
        # this must be the fully qualified name of the class
        className: LoggingInterceptor

        # path to the fat JAR, can be absolute or relative
        jarPath: /tmp/LoggingInterceptor.jar

      # you can add additional interceptors by numbering them
      1:
        ...
```

Note, that multiple interceptors can be configured (i.e.
`zeebe.gateway.interceptors` expects a list of interceptor configurations). The
interception order index determines the order in which a call is intercepted by
the different interceptors. Interceptors with a lower index always wrap an
interceptor with a higher index. The interceptor at index 0 is thus the
outermost interceptor. In other words, calls are intercepted first by the
interceptor at index 0, followed by the interceptor at index 1, etc.

## Troubleshooting
Here we describe a few common errors. Hopefully, this will help you recognize
these situations and provide an easy fix. Generally, the gateway will not be
able to start up with a misconfigured interceptor.

Note that environment variables can overwrite your gateway configuration file.
The gateway logs the configuration it uses during start-up. Please use that to
verify your configuration.

**java.lang.ClassNotFoundException** Your ServerInterceptor implementation could
not be found. Make sure you've configured the `className` correctly in the
[gateway configuration](#loading-an-interceptor-into-a-gateway) and that your
[JAR contains your class](#packaging-an-interceptor).

**io.camunda.zeebe.gateway.interceptors.impl.InterceptorLoadException**
Something went wrong trying to load your interceptor. Make sure your [JAR is
packaged](#packaging-an-interceptor) correctly, i.e. it contains all runtime
dependencies and specifies them in the manifest file's classpath. The exception
should provide a clear description, but generally we distinquish the following
common cases:
- unable to instantiate your class: make sure your class adheres to the
  [requirements described above](#implementing-an-interceptor).
- the JAR could not be loaded: make sure you've configured your interceptor
  correctly in the [gateway
  configuration](#loading-an-interceptor-into-a-gateway).

**io.camunda.zeebe.util.jar.ExternalJarLoadException**: the JAR could not be
loaded: make sure you've configured your interceptor correctly in the [gateway
configuration](#loading-an-interceptor-into-a-gateway).

**java.lang.UnsupportedClassVersionError** Your interceptor has been compiled by
a more recent version of the Java Runtime. Make sure your [class is
compiled](#packaging-an-interceptor) with JDK 11.