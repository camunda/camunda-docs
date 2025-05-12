---
id: configuration
title: Configuration
---

This page uses YAML examples to show configuration properties. Alternate methods to [externalize or override your configuration](https://docs.spring.io/spring-boot/reference/features/external-config.html) are provided by Spring Boot, and can be applied without rebuilding your application (properties files, Java System properties, or environment variables).

:::note
Configuration properties can be defined as environment variables using [Spring Boot conventions](https://docs.spring.io/spring-boot/reference/features/external-config.html#features.external-config.typesafe-configuration-properties.relaxed-binding.environment-variables). To define an environment variable, convert the configuration property to uppercase, remove any dashes `-`, and replace any delimiters `.` with underscore `_`.
:::

## Job worker configuration options

### Job type

You can configure the job type via the `JobWorker` annotation:

```java
@JobWorker(type = "foo")
public void handleJobFoo() {
  // handles jobs of type 'foo'
}
```

If you don't specify the `type` attribute, the **method name** is used by default if you enabled the [`-parameters` compiler flag](/apis-tools/spring-zeebe-sdk/getting-started.md#enable-the-java-compiler--parameters-flag) in the [getting started section](/apis-tools/spring-zeebe-sdk/getting-started.md):

```java
@JobWorker
public void foo() {
    // handles jobs of type 'foo'
}
```

As a third possibility, you can set a default job type:

```properties
zeebe.client.worker.default-type=foo
```

This is used for all workers that do **not** set a task type via the annotation.

### Define variables to fetch

You can specify that you only want to fetch some variables (instead of all) when executing a job, which can decrease load and improve performance:

```java
@JobWorker(type = "foo", fetchVariables={"variable1", "variable2"})
public void handleJobFoo(final JobClient client, final ActivatedJob job) {
  String variable1 = (String)job.getVariablesAsMap().get("variable1");
  System.out.println(variable1);
  // ...
}
```

### Using `@Variable`

By using the `@Variable` annotation, there is a shortcut to make variable retrieval simpler and only fetch certain variables, making them available as parameters:

```java
@JobWorker(type = "foo")
public void handleJobFoo(final JobClient client, final ActivatedJob job, @Variable(name = "variable1") String variable1) {
  System.out.println(variable1);
  // ...
}
```

If you don't specify the `name` attribute on the annotation, the **method parameter name** is used as the variable name if you enabled the [`-parameters` compiler flag](/apis-tools/spring-zeebe-sdk/getting-started.md#enable-the-java-compiler--parameters-flag) in the [getting started section](/apis-tools/spring-zeebe-sdk/getting-started.md):

```java
@JobWorker(type = "foo")
public void handleJobFoo(final JobClient client, final ActivatedJob job, @Variable String variable1) {
  System.out.println(variable1);
  // ...
}
```

With `@Variable` or `fetchVariables` you limit which variables are loaded from the workflow engine. You can also override this and force that all variables are loaded anyway:

```java
@JobWorker(type = "foo", fetchAllVariables = true)
public void handleJobFoo(final JobClient client, final ActivatedJob job, @Variable String variable1) {
}
```

### Using `@VariablesAsType`

You can also use your own class into which the process variables are mapped to (comparable to `getVariablesAsType()` in the [Java client API](/apis-tools/java-client/index.md)). Therefore, use the `@VariablesAsType` annotation. In the example below, `MyProcessVariables` refers to your own class:

```java
@JobWorker(type = "foo")
public ProcessVariables handleFoo(@VariablesAsType MyProcessVariables variables){
  // do whatever you need to do
  variables.getMyAttributeX();
  variables.setMyAttributeY(42);

  // return variables object if something has changed, so the changes are submitted to Zeebe
  return variables;
}
```

### Fetch variables via Job

You can access variables of a process via the ActivatedJob object, which is passed into the method if it is a parameter:

```java
@JobWorker(type = "foo")
public void handleJobFoo(final ActivatedJob job) {
  String variable1 = (String)job.getVariablesAsMap().get("variable1");
  System.out.println(variable1);
  // ...
}
```

### Auto-completing jobs

By default, the `autoComplete` attribute is set to `true` for any job worker.

In this case, the Spring integration will handle job completion for you:

```java
@JobWorker(type = "foo")
public void handleJobFoo(final ActivatedJob job) {
  // do whatever you need to do
  // no need to call client.newCompleteCommand()...
}
```

This is the same as:

```java
@JobWorker(type = "foo", autoComplete = true)
public void handleJobFoo(final ActivatedJob job) {
  // ...
}
```

:::note
The code within the handler method needs to be synchronously executed, as the completion will be triggered right after the method has finished.
:::

When using `autoComplete` you can:

- Return a `Map`, `String`, `InputStream`, or `Object`, which will then be added to the process variables.
- Throw a `ZeebeBpmnError`, which results in a BPMN error being sent to Zeebe.
- Throw any other `Exception` that leads in a failure handed over to Zeebe.

```java
@JobWorker(type = "foo")
public Map<String, Object> handleJobFoo(final ActivatedJob job) {
  // some work
  if (successful) {
    // some data is returned to be stored as process variable
    return variablesMap;
  } else {
   // problem shall be indicated to the process:
   throw new ZeebeBpmnError("DOESNT_WORK", "This does not work because...");
  }
}
```

### Programmatically completing jobs

Your job worker code can also complete the job itself. This gives you more control over when exactly you want to complete the job (for example, allowing the completion to be moved to reactive callbacks):

```java
@JobWorker(type = "foo", autoComplete = false)
public void handleJobFoo(final JobClient client, final ActivatedJob job) {
  // do whatever you need to do
  client.newCompleteCommand(job.getKey())
     .send()
     .exceptionally( throwable -> { throw new RuntimeException("Could not complete job " + job, throwable); });
}
```

You can also control auto-completion in your configuration.

**Globally:**

```yaml
camunda:
  client:
    zeebe:
      defaults:
        auto-complete: false
```

**Per worker:**

```yaml
camunda:
  client:
    zeebe:
      override:
        foo:
          auto-complete: false
```

Ideally, you **don't** use blocking behavior like `send().join()`, as this is a blocking call to wait for the issued command to be executed on the workflow engine. While this is very straightforward to use and produces easy-to-read code, blocking code is limited in terms of scalability.

This is why the worker above showed a different pattern (using `exceptionally`). Often, you might also want to use the `whenComplete` callback:

```java
send().whenComplete((result, exception) -> {})
```

This registers a callback to be executed if the command on the workflow engine was executed or resulted in an exception. This allows for parallelism. This is discussed in more detail in [this blog post about writing good workers for Camunda 8](https://blog.bernd-ruecker.com/writing-good-workers-for-camunda-cloud-61d322cad862).

:::note
When completing jobs programmatically, you must specify `autoComplete = false`. Otherwise, there is a race condition between your programmatic job completion and the Spring integration job completion, and this can lead to unpredictable results.
:::

### `@CustomHeaders`

You can use the `@CustomHeaders` annotation for a parameter to retrieve [custom headers](/components/concepts/job-workers.md) for a job:

```java
@JobWorker(type = "foo")
public void handleFoo(@CustomHeaders Map<String, String> headers){
  // do whatever you need to do
}
```

You can combine annotations. For example, `@VariablesAsType` and `@CustomHeaders`.

```java
@JobWorker
public ProcessVariables foo(@VariablesAsType ProcessVariables variables, @CustomHeaders Map<String, String> headers){
  // do whatever you need to do
  return variables;
}
```

### Throwing `ZeebeBpmnError`s

Whenever your code hits a problem that should lead to a [BPMN error](/components/modeler/bpmn/error-events/error-events.md) being raised, you can throw a `ZeebeBpmnError` to provide the error code used in BPMN:

```java
@JobWorker(type = "foo")
public void handleJobFoo() {
  // some work
  if (!successful) {
   // problem shall be indicated to the process:
   throw new ZeebeBpmnError("DOESNT_WORK", "This does not work because...");
  }
}
```

## Additional configuration options

### Configure different cloud environments

If you don't connect to the Camunda 8 SaaS production environment, you might have to also adjust these properties:

```properties
zeebe.client.cloud.base-url=zeebe.camunda.io
zeebe.client.cloud.port=443
zeebe.client.cloud.auth-url=https://login.cloud.camunda.io/oauth/token
```

As an alternative, you can use the [Zeebe client environment variables](/apis-tools/java-client/index.md#bootstrapping).

### Default task type

If you build a worker that only serves one thing, it might also be handy to define the worker job type globally and not in the annotation:

```properties
zeebe.client.worker.defaultType=foo
```

### Configure jobs in flight and thread pool

Number of jobs that are polled from the broker to be worked on in this client and thread pool size to handle the jobs:

```properties
zeebe.client.worker.max-jobs-active=32
zeebe.client.worker.threads=1
```

For a full set of configuration options, see [ZeebeClientConfigurationProperties.java](https://github.com/camunda/camunda/blob/main/clients/spring-boot-starter-camunda-sdk/src/main/java/io/camunda/spring/client/properties/ZeebeClientConfigurationProperties.java).

:::note
We generally do not advise using a thread pool for workers, but rather implement asynchronous code, see [writing good workers](/components/best-practices/development/writing-good-workers.md) for additional details.
:::

### Disable worker

You can disable workers via the `enabled` parameter of the `@JobWorker` annotation:

```java
class SomeClass {
  @JobWorker(type = "foo", enabled = false)
  public void handleJobFoo() {
    // worker's code - now disabled
  }
}
```

You can also override this setting via your `application.properties` file:

```properties
zeebe.client.worker.override.foo.enabled=false
```

This is especially useful if you have a bigger code base including many workers, but want to start only some of them. Typical use cases are:

- Testing: You only want one specific worker to run at a time.
- Load balancing: You want to control which workers run on which instance of cluster nodes.
- Migration: There are two applications, and you want to migrate a worker from one to another. With this switch, you can disable workers via configuration in the old application once they are available within the new.

### Overriding `JobWorker` values via configuration file

You can override the `JobWorker` annotation's values, as you can see in the example above where the `enabled` property is overridden:

```properties
zeebe.client.worker.override.foo.enabled=false
```

In this case, `foo` is the type of the worker that we want to customize.

You can override all supported configuration options for a worker, for example:

```properties
zeebe.client.worker.override.foo.timeout=10000
```

You could also provide a custom class that can customize the `JobWorker` configuration values by implementing the `io.camunda.zeebe.spring.client.annotation.customizer.ZeebeWorkerValueCustomizer` interface.

### Enable job streaming

Read more about this feature in the [job streaming documentation](/apis-tools/java-client/job-worker.md#job-streaming).

To enable job streaming on the Zeebe client, you can configure it:

```properties
zeebe.client.default-job-worker-stream-enabled=true
```

### Control tenant usage

When using multi-tenancy, the Zeebe client will connect to the `<default>` tenant. To control this, you can configure:

```properties
zeebe.client.default-job-worker-tenant-ids=myTenant
```

Additionally, you can set tenant IDs on the job worker level by using the annotation:

```java
@JobWorker(tenantIds="myOtherTenant")
```

You can override this property as well, given the job worker name is `foo`:

```properties
zeebe.client.worker.override.foo.tenant-ids=myThirdTenant
```

### Override authority

The alternative authority to use, commonly in the form `host` or `host:port`:

```properties
zeebe.client.security.overrideAuthority=host:port
```

### CA certificate

Path to a root CA certificate to be used instead of the certificate in the default store:

```properties
zeebe.client.security.certPath=/path/to/certificate.pem
```

### Message time to live

The time-to-live which is used when none is provided for a message (default 1H):

```properties
zeebe.client.message.timeToLive=PT2H
```

### Max message size

A custom maxMessageSize (in bytes) allows the client to receive larger or smaller responses from Zeebe. Technically, it specifies the maxInboundMessageSize of the gRPC channel (default 5MB):

```properties
zeebe.client.message.maxMessage-size=3145728
```

### Keep alive

Time interval between keep alive messages sent to the gateway (default is 45s):

```properties
zeebe.client.broker.keepAlive=PT60S
```

## Observing metrics

The Spring Zeebe SDK provides some out-of-the-box metrics that can be leveraged via [Spring Actuator](https://docs.spring.io/spring-boot/docs/current/actuator-api/htmlsingle/). Whenever actuator is on the classpath, you can access the following metrics:

- `camunda.job.invocations`: Number of invocations of job workers (tagging the job type)

For all of those metrics, the following actions are recorded:

- `activated`: The job/Connector was activated and started to process an item.
- `completed`: The processing was completed successfully.
- `failed`: The processing failed with some exception.
- `bpmn-error`: The processing completed by throwing a BPMN error (which means there was no technical problem).

In a default setup, you can enable metrics to be served via http:

```properties
management.endpoints.web.exposure.include=metrics
```

Access them via [http://localhost:8080/actuator/metrics/](http://localhost:8080/actuator/metrics/).
