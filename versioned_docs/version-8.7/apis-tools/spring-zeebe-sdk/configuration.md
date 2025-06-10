---
id: configuration
title: Configuration
---

This page uses YAML examples to show configuration properties. Alternate methods to [externalize or override your configuration](https://docs.spring.io/spring-boot/reference/features/external-config.html) are provided by Spring Boot, and can be applied without rebuilding your application (properties files, Java System properties, or environment variables).

:::note
Configuration properties can be defined as environment variables using [Spring Boot conventions](https://docs.spring.io/spring-boot/reference/features/external-config.html#features.external-config.typesafe-configuration-properties.relaxed-binding.environment-variables). To define an environment variable, convert the configuration property to uppercase, remove any dashes `-`, and replace any delimiters `.` with underscore `_`.

For example, the property `camunda.client.zeebe.defaults.max-jobs-active` is represented by the environment variable `CAMUNDA_CLIENT_ZEEBE_DEFAULTS_MAXJOBSACTIVE`.
:::

## Modes

The Spring SDK has modes with meaningful defaults aligned with the distribution's default connection details. Each mode is made for a Camunda 8 setup, and only one mode may be used at a time.

:::note
The defaults applied by the modes are overwritten by _any_ other set property, including legacy/deprecated properties. Check your configuration and logs to avoid unwanted override.
:::

### SaaS

This allows you to connect to a Camunda instance in our SaaS offering as the URLs are templated.

Activate by setting:

```yaml reference referenceLinkText="Source" title="Client mode"
https://github.com/camunda/camunda/blob/stable/8.7/clients/spring-boot-starter-camunda-sdk/src/test/resources/properties/8.7/mode-saas.yaml
```

This applies the following defaults:

```yaml reference referenceLinkText="Source" title="SaaS mode"
https://github.com/camunda/camunda/blob/stable/8.7/clients/spring-boot-starter-camunda-sdk/src/main/resources/modes/saas.yaml
```

### Self-Managed

This allows you to connect to a Self-Managed instance protected with JWT authentication. The default URLs are configured to align with all Camunda distributions using `localhost` addresses.

Activate by setting:

```yaml reference referenceLinkText="Source" title="Client mode"
https://github.com/camunda/camunda/blob/stable/8.7/clients/spring-boot-starter-camunda-sdk/src/test/resources/properties/8.7/mode-self-managed.yaml
```

This applies the following defaults:

```yaml reference referenceLinkText="Source" title="Self-managed mode"
https://github.com/camunda/camunda/blob/stable/8.7/clients/spring-boot-starter-camunda-sdk/src/main/resources/modes/self-managed.yaml
```

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

```yaml reference referenceLinkText="Source" title="Default type"
https://github.com/camunda/camunda/blob/stable/8.7/clients/spring-boot-starter-camunda-sdk/src/test/resources/properties/8.7/default-type.yaml
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

```yaml reference referenceLinkText="Source" title="Default auto complete"
https://github.com/camunda/camunda/blob/stable/8.7/clients/spring-boot-starter-camunda-sdk/src/test/resources/properties/8.7/default-auto-complete.yaml
```

**Per worker:**

```yaml reference referenceLinkText="Source" title="Worker auto complete"
https://github.com/camunda/camunda/blob/stable/8.7/clients/spring-boot-starter-camunda-sdk/src/test/resources/properties/8.7/worker-auto-complete.yaml
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

For a full set of configuration options, see [CamundaClientConfigurationProperties.java](https://github.com/camunda/camunda/blob/stable/8.7/clients/spring-boot-starter-camunda-sdk/src/main/java/io/camunda/zeebe/spring/client/properties/CamundaClientProperties.java).

### Auth

Your authentication with the cluster can be controlled in several ways.

:::note
If the creation of the credentials provider fails, you will a log message indicating this at `WARN` level. The SDK will then use a Noop credentials provider.
:::

#### Client id and secret

You can define client id and secret for the credentials provider:

```yaml reference referenceLinkText="Source" title="Client id and secret"
https://github.com/camunda/camunda/blob/stable/8.7/clients/spring-boot-starter-camunda-sdk/src/test/resources/properties/8.7/client-id-secret.yaml
```

#### Credentials cache path

You can define the credentials cache path of the credentials provider, the property contains directory path and file name:

```yaml reference referenceLinkText="Source" title="Client id and secret"
https://github.com/camunda/camunda/blob/stable/8.7/clients/spring-boot-starter-camunda-sdk/src/test/resources/properties/8.7/credentials-cache-path.yaml
```

### Zeebe

You can use the following Zeebe-specific additional configuration options:

#### Execution threads

The number of threads for invocation of job workers. Setting this value to 0 effectively disables subscriptions and workers (default 1):

```yaml reference referenceLinkText="Source" title="Execution threads"
https://github.com/camunda/camunda/blob/stable/8.7/clients/spring-boot-starter-camunda-sdk/src/test/resources/properties/8.7/execution-threads.yaml
```

#### Message time to live

The time-to-live which is used when none is provided for a message (default 1H):

```yaml reference referenceLinkText="Source" title="Message time to live"
https://github.com/camunda/camunda/blob/stable/8.7/clients/spring-boot-starter-camunda-sdk/src/test/resources/properties/8.7/message-ttl.yaml
```

#### Max message size

A custom `maxMessageSize` allows the client to receive larger or smaller responses from Zeebe. Technically, it specifies the `maxInboundMessageSize` of the gRPC channel (default 5MB):

```yaml reference referenceLinkText="Source" title="Max message size"
https://github.com/camunda/camunda/blob/stable/8.7/clients/spring-boot-starter-camunda-sdk/src/test/resources/properties/8.7/max-message-size.yaml
```

#### Max metadata size

A custom `maxMetadataSize` allows the client to receive larger or smaller response headers from Camunda:

```yaml reference referenceLinkText="Source" title="Max metadata size"
https://github.com/camunda/camunda/blob/stable/8.7/clients/spring-boot-starter-camunda-sdk/src/test/resources/properties/8.7/max-metadata-size.yaml
```

#### Request timeout

The request timeout used if not overridden by the command (default is 10s):

```yaml reference referenceLinkText="Source" title="Request timeout"
https://github.com/camunda/camunda/blob/stable/8.7/clients/spring-boot-starter-camunda-sdk/src/test/resources/properties/8.7/request-timeout.yaml
```

#### CA certificate

Path to a root CA certificate to be used instead of the certificate in the default store:

```yaml reference referenceLinkText="Source" title="Ca certificate path"
https://github.com/camunda/camunda/blob/stable/8.7/clients/spring-boot-starter-camunda-sdk/src/test/resources/properties/8.7/ca-cert-path.yaml
```

#### Keep alive

Time interval between keep alive messages sent to the gateway (default is 45s):

```yaml reference referenceLinkText="Source" title="Keep alive"
https://github.com/camunda/camunda/blob/stable/8.7/clients/spring-boot-starter-camunda-sdk/src/test/resources/properties/8.7/keep-alive.yaml
```

#### Override authority

The alternative authority to use, commonly in the form `host` or `host:port`:

```yaml reference referenceLinkText="Source" title="Override authority"
https://github.com/camunda/camunda/blob/stable/8.7/clients/spring-boot-starter-camunda-sdk/src/test/resources/properties/8.7/override-authority.yaml
```

#### REST over gRPC

If true, the Zeebe Client will use REST instead of gRPC whenever possible to communicate with the Zeebe Gateway:

```yaml reference referenceLinkText="Source" title="REST over gRPC"
https://github.com/camunda/camunda/blob/stable/8.7/clients/spring-boot-starter-camunda-sdk/src/test/resources/properties/8.7/rest-over-grpc.yaml
```

#### gRPC address

Define the address of the [gRPC API](/apis-tools/zeebe-api/grpc.md) exposed by the [Zeebe Gateway](/self-managed/zeebe-deployment/zeebe-gateway/zeebe-gateway-overview.md):

```yaml reference referenceLinkText="Source" title="gRPC address"
https://github.com/camunda/camunda/blob/stable/8.7/clients/spring-boot-starter-camunda-sdk/src/test/resources/properties/8.7/grpc-address.yaml
```

:::note
You must add the `http://` scheme to the URL to avoid a `java.lang.NullPointerException: target` error.
:::

#### REST address

Define address of the [Camunda 8 REST API](/apis-tools/camunda-api-rest/camunda-api-rest-overview.md) exposed by the [Zeebe Gateway](/self-managed/zeebe-deployment/zeebe-gateway/zeebe-gateway-overview.md):

```yaml reference referenceLinkText="Source" title="REST address"
https://github.com/camunda/camunda/blob/stable/8.7/clients/spring-boot-starter-camunda-sdk/src/test/resources/properties/8.7/rest-address.yaml
```

:::note
You must add the `http://` scheme to the URL.
:::

#### Defaults and Overrides

You can define defaults and overrides for all supported configuration options for a worker.

##### Default Task type

If you build a worker that only serves one thing, it might also be handy to define the worker job type globally and not in the annotation:

```yaml reference referenceLinkText="Source" title="Default type"
https://github.com/camunda/camunda/blob/stable/8.7/clients/spring-boot-starter-camunda-sdk/src/test/resources/properties/8.7/default-type.yaml
```

##### Configure jobs in flight and thread pool

Number of jobs that are polled from the broker to be worked on in this client and thread pool size to handle the jobs:

```yaml reference referenceLinkText="Source" title="Max jobs active"
https://github.com/camunda/camunda/blob/stable/8.7/clients/spring-boot-starter-camunda-sdk/src/test/resources/properties/8.7/max-jobs-active.yaml
```

```yaml reference referenceLinkText="Source" title="Execution threads"
https://github.com/camunda/camunda/blob/stable/8.7/clients/spring-boot-starter-camunda-sdk/src/test/resources/properties/8.7/execution-threads.yaml
```

:::note
We generally do not advise using a thread pool for workers, but rather implement asynchronous code, see [writing good workers](/components/best-practices/development/writing-good-workers.md) for additional details.
:::

##### Disable worker

You can disable workers via the `enabled` parameter of the `@JobWorker` annotation:

```java
class SomeClass {
  @JobWorker(type = "foo", enabled = false)
  public void handleJobFoo() {
    // worker's code - now disabled
  }
}
```

You can also override this setting via your `application.yaml` file:

```yaml reference referenceLinkText="Source" title="Worker disabled"
https://github.com/camunda/camunda/blob/stable/8.7/clients/spring-boot-starter-camunda-sdk/src/test/resources/properties/8.7/worker-disabled.yaml
```

This is especially useful if you have a bigger code base including many workers, but want to start only some of them. Typical use cases are:

- Testing: You only want one specific worker to run at a time.
- Load balancing: You want to control which workers run on which instance of cluster nodes.
- Migration: There are two applications, and you want to migrate a worker from one to another. With this switch, you can disable workers via configuration in the old application once they are available within the new.

To disable all workers, but still have the Zeebe client available, you can use:

```yaml reference referenceLinkText="Source" title="Default worker disabled"
https://github.com/camunda/camunda/blob/stable/8.7/clients/spring-boot-starter-camunda-sdk/src/test/resources/properties/8.7/default-disabled.yaml
```

##### Overriding `JobWorker` values via configuration file

You can override the `JobWorker` annotation's values, as you can see in the example above where the `enabled` property is overridden:

```yaml reference referenceLinkText="Source" title="Worker disabled"
https://github.com/camunda/camunda/blob/stable/8.7/clients/spring-boot-starter-camunda-sdk/src/test/resources/properties/8.7/worker-disabled.yaml
```

In this case, `foo` is the type of the worker that we want to customize.

You can override all supported configuration options for a worker, for example:

```yaml reference referenceLinkText="Source" title="Worker timeout"
https://github.com/camunda/camunda/blob/stable/8.7/clients/spring-boot-starter-camunda-sdk/src/test/resources/properties/8.7/worker-timeout.yaml
```

You could also provide a custom class that can customize the `JobWorker` configuration values by implementing the `io.camunda.zeebe.spring.client.annotation.customizer.ZeebeWorkerValueCustomizer` interface.

##### Enable job streaming

Read more about this feature in the [job streaming documentation](/apis-tools/java-client/job-worker.md#job-streaming).

Job streaming is disabled by default for job workers. To enable job streaming on the Zeebe client, configure it as follows:

```yaml reference referenceLinkText="Source" title="Default stream enabled"
https://github.com/camunda/camunda/blob/stable/8.7/clients/spring-boot-starter-camunda-sdk/src/test/resources/properties/8.7/default-stream-enabled.yaml
```

This also works for every worker individually:

```yaml reference referenceLinkText="Source" title="Worker stream enabled"
https://github.com/camunda/camunda/blob/stable/8.7/clients/spring-boot-starter-camunda-sdk/src/test/resources/properties/8.7/worker-stream-enabled.yaml
```

##### Control tenant usage

When using multi-tenancy, the Zeebe client will connect to the `<default>` tenant. To control this, you can configure:

```yaml reference referenceLinkText="Source" title="Tenant id"
https://github.com/camunda/camunda/blob/stable/8.7/clients/spring-boot-starter-camunda-sdk/src/test/resources/properties/8.7/tenant-id.yaml
```

To control which tenants your job workers should use, you can configure:

```yaml reference referenceLinkText="Source" title="Default tenant ids"
https://github.com/camunda/camunda/blob/stable/8.7/clients/spring-boot-starter-camunda-sdk/src/test/resources/properties/8.7/default-tenant-ids.yaml
```

Additionally, you can set tenant ids on job worker level by using the annotation:

```java
@JobWorker(tenantIds="myOtherTenant")
```

You can override this property as well:

```yaml reference referenceLinkText="Source" title="Worker tenant ids"
https://github.com/camunda/camunda/blob/stable/8.7/clients/spring-boot-starter-camunda-sdk/src/test/resources/properties/8.7/worker-tenant-ids.yaml
```

## Observing metrics

The Spring Zeebe SDK provides some out-of-the-box metrics that can be leveraged via [Spring Actuator](https://docs.spring.io/spring-boot/docs/current/actuator-api/htmlsingle/). Whenever actuator is on the classpath, you can access the following metrics:

- `camunda.job.invocations`: Number of invocations of job workers (tagging the job type)

For all of those metrics, the following actions are recorded:

- `activated`: The job was activated and started to process an item.
- `completed`: The processing was completed successfully.
- `failed`: The processing failed with some exception.
- `bpmn-error`: The processing completed by throwing a BPMN error (which means there was no technical problem).

In a default setup, you can enable metrics to be served via http:

```yaml
management:
  endpoints:
    web:
      exposure:
        include: metrics
```

Access them via [http://localhost:8080/actuator/metrics/](http://localhost:8080/actuator/metrics/).

## Using identity provider X.509 authorizers

Several identity providers, such as Keycloak, support client X.509 authorizers as an alternative to client credentials flow.

As a prerequisite, ensure you have proper KeyStore and TrustStore configured, so that:

- Both the Spring Zeebe application and identity provider share the same CA trust certificates.
- Both the Spring Zeebe and identity provider own certificates signed by trusted CA.
- Your Spring Zeebe application own certificate has proper `Distinguished Name` (DN), e.g.
  `CN=My Zeebe Client, OU=Camunda Users, O=Best Company, C=DE`.
- Your application DN registered in the identity provider client authorization details.

Once prerequisites are satisfied, your Spring Zeebe application must be configured either via global SSL context, or
with [identity provider exclusive context](#custom-identity-provider-security-context).

Refer to your identity provider documentation on how to configure X.509 authentication. For example, [Keycloak](https://www.keycloak.org/server/mutual-tls).
