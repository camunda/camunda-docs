---
id: configuration
title: Configuration
---

This page uses YAML examples to show configuration properties. Alternate methods to [externalize or override your configuration](https://docs.spring.io/spring-boot/reference/features/external-config.html) are provided by Spring Boot, and can be applied without rebuilding your application (properties files, Java System properties, or environment variables).

:::note
Configuration properties can be defined as environment variables using [Spring Boot conventions](https://docs.spring.io/spring-boot/reference/features/external-config.html#features.external-config.typesafe-configuration-properties.relaxed-binding.environment-variables). To define an environment variable, convert the configuration property to uppercase, remove any dashes `-`, and replace any delimiters `.` with underscore `_`.

For example, the property `camunda.client.worker.defaults.max-jobs-active` is represented by the environment variable `CAMUNDA_CLIENT_WORKER_DEFAULTS_MAXJOBSACTIVE`.
:::

## Modes

The Camunda Spring Boot Starter has modes with meaningful defaults aligned with the distribution's default connection details. Each mode is made for a Camunda 8 setup, and only one mode may be used at a time.

:::note
The defaults applied by the modes are overwritten by _any_ other set property, including legacy/deprecated properties. Check your configuration and logs to avoid unwanted override.
:::

### SaaS

This allows you to connect to a Camunda instance in our SaaS offering as the URLs are templated.

Activate by setting:

```yaml
camunda:
  client:
    mode: saas
```

This applies the following defaults:

```yaml reference referenceLinkText="Source" title="SaaS mode"
https://github.com/camunda/camunda/blob/main/clients/camunda-spring-boot-starter/src/main/resources/modes/saas.yaml
```

The only thing you need to configure then, are the connection details to your Camunda SaaS cluster:

```yaml
camunda:
  client:
    auth:
      client-id: <your client id>
      client-secret: <your client secret>
    cloud:
      cluster-id: <your cluster id>
      region: <your region>
```

Other connectivity configuration does not further apply for the SaaS mode.

### Self-Managed

This allows you to connect to a Self-Managed instance protected with JWT authentication. The default URLs are configured to align with all Camunda distributions using `localhost` addresses.

Activate by setting:

```yaml
camunda:
  client:
    mode: self-managed
```

This applies the following defaults:

```yaml reference referenceLinkText="Source" title="Self-managed mode"
https://github.com/camunda/camunda/blob/main/clients/camunda-spring-boot-starter/src/main/resources/modes/self-managed.yaml
```

## Connectivity

The connection to Camunda API is determined by `camunda.client.grpc-address` and `camunda.client.rest-address`

### Camunda API connection

#### gRPC address

Define the address of the [gRPC API](/apis-tools/zeebe-api/grpc.md) exposed by the [Zeebe Gateway](/self-managed/components/orchestration-cluster/zeebe/zeebe-gateway/zeebe-gateway-overview.md):

```yaml
camunda:
  client:
    grpc-address: http://localhost:26500
```

:::note
You must add the `http://` scheme to the URL to avoid a `java.lang.NullPointerException: target` error.
:::

#### REST address

Define address of the [Orchestration Cluster REST API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md) exposed by the [Zeebe Gateway](/self-managed/components/orchestration-cluster/zeebe/zeebe-gateway/zeebe-gateway-overview.md):

```yaml
camunda:
  client:
    rest-address: http://localhost:8080
```

:::note
You must add the `http://` scheme to the URL to avoid a `java.lang.NullPointerException: target` error.
:::

#### Prefer REST over gRPC

If true, the Camunda Client will use REST instead of gRPC whenever possible to communicate with the Camunda APIs:

```yaml
camunda:
  client:
    prefer-rest-over-grpc: true
```

### Advanced connectivity settings

#### Keep alive

Time interval between keep alive messages sent to the gateway (default is 45s):

```yaml
camunda:
  client:
    keep-alive: PT60S
```

#### Override authority

The alternative authority to use, commonly in the form `host` or `host:port`:

```yaml
camunda:
  client:
    override-authority: host:port
```

#### Max message size

A custom `maxMessageSize` allows the client to receive larger or smaller responses from Zeebe. Technically, it specifies the `maxInboundMessageSize` of the gRPC channel (default 5MB):

```yaml
camunda:
  client:
    max-message-size: 4194304
```

#### Max metadata size

A custom `maxMetadataSize` allows the client to receive larger or smaller response headers from Camunda:

```yaml
camunda:
  client:
    max-metadata-size: 4194304
```

#### CA certificate

Path to a root CA certificate to be used instead of the certificate in the default store:

```yaml
camunda:
  client:
    ca-certificate-path: path/to/certificate
```

## Authentication

The authentication method is determined by `camunda.client.auth.method`. If omitted, the client will try to detect the authentication method based on the provided properties.

Authenticate with the cluster using the following alternative methods:

:::info
When using `camunda.client.mode=saas`, the authentication method presets are not applied in favor of the properties contained in the SaaS preset.
:::

### No authentication

By default, no authentication will be used.

To explicitly activate this method, you can set:

```yaml
camunda:
  client:
    auth:
      method: none
```

As alternative, do not provide any other property indicating an implicit authentication method.

This will load this preset:

```yaml reference referenceLinkText="Source" title="No authentication"
https://github.com/camunda/camunda/blob/main/clients/camunda-spring-boot-starter/src/main/resources/auth-methods/none.yaml
```

### Basic authentication

You can authenticate with the cluster using Basic authentication, if the cluster is setup to use Basic authentication.

To explicitly activate this method, you can set:

```yaml
camunda:
  client:
    auth:
      method: basic
```

This authentication method will be implied if you set either `camunda.client.auth.username` or `camunda.client.auth.password`.

This will load this preset:

```yaml reference referenceLinkText="Source" title="Basic authentication"
https://github.com/camunda/camunda/blob/main/clients/camunda-spring-boot-starter/src/main/resources/auth-methods/basic.yaml
```

### OIDC authentication

You can authenticate with the cluster using OpenID Connect (OIDC) with client ID and client secret.

To explicitly activate this method, you can set:

```yaml
camunda:
  client:
    auth:
      method: oidc
```

This authentication method will be implied if you set either `camunda.client.auth.client-id` or `camunda.client.auth.client-secret`.

This will load this preset:

```yaml reference referenceLinkText="Source" title="OIDC authentication"
https://github.com/camunda/camunda/blob/main/clients/camunda-spring-boot-starter/src/main/resources/auth-methods/oidc.yaml
```

#### Credentials cache path

You can define the credentials cache path of the zeebe client, the property contains directory path and file name:

```yaml
camunda:
  client:
    auth:
      credentials-cache-path: /tmp/credentials
```

#### Custom identity provider security context

Several identity providers, such as Keycloak, support client X.509 authorizers as an alternative to client credentials flow.

As a prerequisite, ensure you have proper KeyStore and TrustStore configured, so that:

- Both the Spring Camunda application and identity provider share the same CA trust certificates.
- Both the Spring Camunda and identity provider own certificates signed by trusted CA.
- Your Spring Camunda application own certificate has proper `Distinguished Name` (DN), e.g.
  `CN=My Camunda Client, OU=Camunda Users, O=Best Company, C=DE`.
- Your application DN registered in the identity provider client authorization details.

Once prerequisites are satisfied, your Spring Camunda application must be configured either via global SSL context, or
with an exclusive context which is documented below.

Refer to your identity provider documentation on how to configure X.509 authentication. For example, [Keycloak](https://www.keycloak.org/server/mutual-tls).

If you require configuring SSL context exclusively for your identity provider, you can use this set of properties:

```yaml
camunda:
  client:
    auth:
      keystore-path: /path/to/keystore.p12
      keystore-password: password
      keystore-key-password: password
      truststore-path: /path/to/truststore.jks
      truststore-password: password
```

- **keystore-path**: Path to client's KeyStore; can be both in JKS or PKCS12 formats
- **keystore-password**: KeyStore password
- **keystore-key-password**: Key material password
- **truststore-path**: Path to client's TrustStore
- **truststore-password**: TrustStore password

When the properties are not specified, the default SSL context is applied. For example, if you configure an application with
`javax.net.ssl.*` or `spring.ssl.*`, the latter is applied. If both `camunda.client.auth.*` and either `javax.net.ssl.*`
or `spring.ssl.*` properties are defined, the `camunda.client.auth.*` takes precedence.

## Job worker configuration options

### Job type

You can configure the job type via the `JobWorker` annotation:

```java
@JobWorker(type = "foo")
public void handleJobFoo() {
  // handles jobs of type 'foo'
}
```

If you don't specify the `type` attribute, the **method name** is used by default:

```java
@JobWorker
public void foo() {
    // handles jobs of type 'foo'
}
```

As a third possibility, you can set a task type as property:

```yaml
camunda:
  client:
    worker:
      override:
        foo:
          type: bar
```

As a fourth possibility, you can set a default task type as property:

```yaml
camunda:
  client:
    worker:
      defaults:
        type: foo
```

This is used for all workers that do **not** set a task type via the annotation or set a job type as individual worker property.

### Control variable fetching

A job worker can submit a list of variables when activating jobs to limit the amount of data being sent.

There are implicit and explicit ways to control the variable fetching. While the implicit ones come with the job worker function parameters, the explicit ones are listed here.

#### Provide a list of variables to fetch

You can specify that you only want to fetch some variables (instead of all) when executing a job, which can decrease load and improve performance:

```java
@JobWorker(type = "foo", fetchVariables={"variable1", "variable2"})
public void handleJobFoo(final JobClient client, final ActivatedJob job) {
  String variable1 = (String)job.getVariablesAsMap().get("variable1");
  System.out.println(variable1);
  // ...
}
```

You can also override the variables to fetch in your properties:

```yml
camunda:
  client:
    worker:
      override:
        foo:
          fetch-variables:
            - variable1
            - variable2
```

:::caution
Using the properties-defined way of fetching variables will override **all** other detection strategies.
:::

#### Prevent the variable filtering

You can force that all variables are loaded anyway:

```java
@JobWorker(type = "foo", fetchAllVariables = true)
public void handleJobFoo(final JobClient client, final ActivatedJob job, @Variable String variable1) {
}
```

You can also override the forced fetching of all variables in your properties:

```yml
camunda:
  client:
    worker:
      override:
        foo:
          force-fetch-all-variables: true
```

### Define job worker function parameters

The method signature you use to define job worker functions will affect how variables are retrieved.

Unless stated otherwise, all specified methods for fetching variables will be combined into a single list of variables to retrieve.

#### `JobClient` parameter

The `JobClient` is also part of the native `JobHandler` functional interface:

```java
@JobWorker(type = "foo")
public void handleJobFoo(final JobClient jobClient) {
  // ...
}
```

#### `ActivatedJob` parameter

This will **prevent** the implicit variable fetching detection as you can retrieve variables in a programmatic way now:

```java
@JobWorker(type = "foo")
public void handleJobFoo(final ActivatedJob job) {
  String variable1 = (String)job.getVariablesAsMap().get("variable1");
  System.out.println(variable1);
  // ...
}
```

:::note
Only explicit variable fetching will be effective on using the `ActivatedJob` as parameter.
:::

#### Using `@Variable`

By using the `@Variable` annotation, there is a shortcut to make variable retrieval simpler and only fetch certain variables, making them available as parameters:

```java
@JobWorker(type = "foo")
public void handleJobFoo(@Variable(name = "variable1") String variable1) {
  System.out.println(variable1);
  // ...
}
```

If you don't specify the `name` attribute on the annotation, the **method parameter name** is used as the variable name if you enabled the [`-parameters` compiler flag](/apis-tools/camunda-spring-boot-starter/getting-started.md#enable-the-java-compiler--parameters-flag) in the [getting started section](/apis-tools/camunda-spring-boot-starter/getting-started.md):

```java
@JobWorker(type = "foo")
public void handleJobFoo(final JobClient client, final ActivatedJob job, @Variable String variable1) {
  System.out.println(variable1);
  // ...
}
```

:::note
This will add the name of the variable to the joint list of variables to fetch.
:::

#### Using `@VariablesAsType`

You can also use your own class into which the process variables are mapped to (comparable to `getVariablesAsType()` in the [Java client API](/apis-tools/java-client/getting-started.md)). Therefore, use the `@VariablesAsType` annotation. In the example below, `MyProcessVariables` refers to your own class:

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

:::note
This will add the names of the fields of the used type to the joint list of variables to fetch. Jackson's `@JsonProperty` annotation is respected.
:::

#### Using `@CustomHeaders`

You can use the `@CustomHeaders` annotation for a `Map<String, String>` parameter to retrieve [custom headers](/components/concepts/job-workers.md) for a job:

```java
@JobWorker(type = "foo")
public void handleFoo(@CustomHeaders Map<String, String> headers){
  // do whatever you need to do
}
```

:::note
This will not have any effect on the variable fetching behavior.
:::

### Completing jobs

#### Auto-completing jobs

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
- Throw a `BpmnError`, which results in a BPMN error being sent to Zeebe.
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
   throw new BpmnError("DOESNT_WORK", "This does not work because...");
  }
}
```

#### Programmatically completing jobs

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
    worker:
      defaults:
        auto-complete: false
```

**Per worker:**

```yaml
camunda:
  client:
    worker:
      override:
        foo:
          auto-complete: false
```

Ideally, you **don't** use blocking behavior like `send().join()`, as this is a blocking call to wait for the issued command to be executed on the workflow engine. While this is very straightforward to use and produces easy-to-read code, blocking code is limited in terms of scalability.

This is why the worker sample above shows a different pattern (using `exceptionally`). Often, you might want to use the `whenComplete` callback:

```java
send().whenComplete((result, exception) -> {})
```

This registers a callback to be executed when the command on the workflow engine was executed or resulted in an exception. This allows for parallelism. This is discussed in more detail in [this blog post about writing good workers for Camunda 8](https://blog.bernd-ruecker.com/writing-good-workers-for-camunda-cloud-61d322cad862).

:::note
When completing jobs programmatically, you must specify `autoComplete = false`. Otherwise, there is a race condition between your programmatic job completion and the Spring integration job completion, and this can lead to unpredictable results.
:::

### Reacting on problems

#### Throwing `BpmnError`s

Whenever your code hits a problem that should lead to a [BPMN error](/components/modeler/bpmn/error-events/error-events.md) being raised, you can throw a `BpmnError` to provide the error code used in BPMN:

```java
@JobWorker(type = "foo")
public void handleJobFoo() {
  // some work
  if (businessError) {
   // problem shall be indicated to the process:
   throw CamundaError.bpmnError("ERROR_CODE", "Some explanation why this does not work");
   // this is a static function that returns an instance of BpmnError
  }
}
```

#### Failing jobs in a controlled way

Whenever you want a job to fail in a controlled way, you can throw a `JobError` and provide parameters like `variables`, `retries` and `retryBackoff`:

```java
@JobWorker(type = "foo")
public void handleJobFoo() {
  try {
   // some work
  } catch(Exception e) {
   // problem shall be indicated to the process:
   throw CamundaError.jobError("Error message", new ErrorVariables(), null, Duration.ofSeconds(10), e);
   // this is a static function that returns an instance of JobError
  }
}
```

The JobError takes 5 parameters:

- `errorMessage`: String
- `variables`: Object _(optional)_, default `null`
- `retries`: Integer _(optional)_, defaults to `job.getRetries() - 1`
- `retryBackoff`: Duration _(optional)_, defaults to `PT0S`
- `cause`: Exception _(optional)_, defaults to `null`

:::note
The job error is sent to the engine by the SDK calling the [Fail Job API](/apis-tools/orchestration-cluster-api-rest/specifications/fail-job.api.mdx). The stacktrace of the job error will become the actual error message. The provided cause will be visible in Operate.
:::

#### Implicitly failing jobs

If your handler method would throw any other exception than the ones listed above, the default Camunda Client error handling will apply, decrementing retries with a `retryBackoff` of 0.

### Advanced job worker configuration options

#### Execution threads

The number of threads for invocation of job workers (default 1):

```yaml
camunda:
  client:
    execution-threads: 2
```

:::note
We generally do not advise using a thread pool for workers, but rather implement asynchronous code, see [writing good workers](/components/best-practices/development/writing-good-workers.md) for additional details.
:::

#### Disable a job worker

You can disable workers via the `enabled` parameter of the `@JobWorker` annotation:

```java
@JobWorker(enabled = false)
public void foo() {
  // worker's code - now disabled
}
```

You can also override this setting via your `application.yaml` file:

```yaml
camunda:
  client:
    worker:
      override:
        foo:
          enabled: false
```

This is especially useful if you have a bigger code base including many workers, but want to start only some of them. Typical use cases are:

- Testing: You only want one specific worker to run at a time.
- Load balancing: You want to control which workers run on which instance of cluster nodes.
- Migration: There are two applications, and you want to migrate a worker from one to another. With this switch, you can disable workers via configuration in the old application once they are available within the new.

To disable all workers, but still have the Camunda client available, you can use:

```yaml
camunda:
  client:
    worker:
      defaults:
        enabled: false
```

#### Configure jobs in flight

Number of jobs that are polled from the broker to be worked on in this client and thread pool size to handle the jobs:

```java
@JobWorker(maxJobsActive = 64)
public void foo() {
  // worker's code
}
```

This can also be configured as property:

```yaml
camunda:
  client:
    worker:
      override:
        foo:
          max-jobs-active: 64
```

To configure a global default, you can set:

```yaml
camunda:
  client:
    worker:
      defaults:
        max-jobs-active: 64
```

#### Enable job streaming

Read more about this feature in the [job streaming documentation](/apis-tools/java-client/job-worker.md#job-streaming).

Job streaming is disabled by default for job workers. To enable job streaming on the Camunda client, configure it as follows:

```java
@JobWorker(streamEnabled = true)
public void foo() {
  // worker's code
}
```

This can also be configured as property:

```yaml
camunda:
  client:
    worker:
      override:
        foo:
          stream-enabled: true
```

To configure a global default, you can set:

```yaml
camunda:
  client:
    worker:
      defaults:
        stream-enabled: true
```

#### Control tenant usage

Generally, the [client default `tenant-id`](#tenant-usage) is used for all job worker activations.

Configure global worker defaults for additional `tenant-ids` to be used by all workers:

```yaml
camunda:
  client:
    worker:
      defaults:
        tenant-ids:
          - <default>
          - foo
```

Additionally, you can set `tenantIds` on the job worker level by using the annotation:

```java
@JobWorker(tenantIds="myOtherTenant")
public void foo() {
  // worker's code
}
```

You can also override the `tenant-ids` for each worker:

```yaml
camunda:
  client:
    worker:
      override:
        foo:
          tenants-ids:
            - <default>
            - foo
```

#### Define the job timeout

To define the job timeout, you can set the annotation (`long` in milliseconds):

```java
@JobWorker(timeout=60000)
public void foo() {
  // worker's code
}
```

Moreover, you can override the timeout for the worker (as ISO 8601 duration expression):

```yaml
camunda:
  client:
    worker:
      override:
        foo:
          timeout: PT1M
```

You can also set a global default:

```yaml
camunda:
  client:
    worker:
      defaults:
        timeout: PT1M
```

#### Programmatic job worker modification

You could also provide a bean that can customize the `JobWorker` configuration values by implementing the `io.camunda.spring.client.annotation.customizer.JobWorkerValueCustomizer` interface.

## Additional configuration options

For a full set of configuration options, see [CamundaClientProperties.java](https://github.com/camunda/camunda/blob/main/clients/spring-boot-starter-camunda-sdk/src/main/java/io/camunda/spring/client/properties/CamundaClientProperties.java).

### Message time to live

The time-to-live which is used when none is provided for a message (default 1H):

```yaml
camunda:
  client:
    message-time-to-live: PT2H
```

### Request timeout

The request timeout used if not overridden by the command (default is 10s):

```yaml
camunda:
  client:
    request-timeout: PT20S
```

### Tenant usage

When using multi-tenancy, the Zeebe client will connect to the `<default>` tenant. To control this, you can configure:

```yaml
camunda:
  client:
    tenant-id: foo
```

## Observing metrics

The Camunda Spring Boot SDK provides some out-of-the-box metrics that can be leveraged via [Spring Actuator](https://docs.spring.io/spring-boot/docs/current/actuator-api/htmlsingle/). Whenever actuator is on the classpath, you can access the following metrics:

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
