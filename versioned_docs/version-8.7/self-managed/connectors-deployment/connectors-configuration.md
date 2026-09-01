---
id: connectors-configuration
title: Configuration
description: "Configure the connector runtime environment based on the Zeebe instance to connect to, the connector functions to run, and secrets available to the connectors."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

You can configure the connector runtime environment in the following ways:

- The Zeebe and Operate instances to connect to.
- The connector functions to run.
- The secrets that should be available to the connectors.

To connect to **Zeebe**, the connector runtime uses the [Spring Zeebe SDK](/apis-tools/spring-zeebe-sdk/getting-started.md).

To interact with the **Operate API**, the connector runtime uses the community-maintained [Operate Java client](https://github.com/camunda-community-hub/camunda-operate-client-java).

Any configuration that can be set in the Spring Zeebe SDK or Operate Java client can also be set in the connector runtime environment.

Below are some of the most common configuration options for the connector runtime. Refer to the [Spring Zeebe SDK](/apis-tools/spring-zeebe-sdk/configuration.md#zeebe) and Operate Java client documentation for a full list of configuration options.

:::note
This guide provides configuration properties the form of environment variables, while the Spring Zeebe SDK documentation uses Java configuration properties. The two formats are interchangeable, and you can use the Java configuration properties in the connector runtime environment as well.

For example, the Java configuration property`camunda.client.zeebe.grpc-address` can be set in the connector runtime environment as an environment variable called `CAMUNDA_CLIENT_ZEEBE_GRPCADDRESS`.
:::

## Connecting to Zeebe and Operate

<Tabs groupId="configuration" defaultValue="saas" queryString values={
[
{label: 'Connecting to Camunda 8 SaaS', value: 'saas' },
{label: 'Connecting to Camunda 8 Self-Managed', value: 'sm' },
]
}>

<TabItem value='saas'>

To use Camunda 8 SaaS, specify the connection properties:

##### Environment variables

```bash
CAMUNDA_CLIENT_MODE=saas
CAMUNDA_CLIENT_CLOUD_CLUSTERID=xxx
CAMUNDA_CLIENT_AUTH_CLIENTID=xxx
CAMUNDA_CLIENT_AUTH_CLIENTSECRET=xxx
CAMUNDA_CLIENT_CLOUD_REGION=bru-2
```

##### YAML configuration

```yaml
camunda:
  client:
    mode: saas
    cloud:
      cluster-id: xxx
      region: bru-2
    auth:
      client-id: xxx
      client-secret: xxx
```

To use inbound connectors, specify the Operate connection properties:

##### Environment variables

```bash
OPERATE_CLIENT_PROFILE=saas
OPERATE_CLIENT_REGION=bru-2
OPERATE_CLIENT_CLUSTERID=xxx
OPERATE_CLIENT_CLIENTID=xxx
OPERATE_CLIENT_CLIENTSECRET=xxx
```

##### YAML configuration

```yaml
operate:
  client:
    profile: saas
    region: bru-2
    clusterId: xxx
    client-id: xxx
    client-secret: xxx
```

If you don't need to use inbound connectors, you can disable them and remove the need for an Operate connection. This will lead to inability to use inbound capabilities like webhooks.

##### Environment variables

```bash
CAMUNDA_CONNECTOR_POLLING_ENABLED=false
CAMUNDA_CONNECTOR_WEBHOOK_ENABLED=false
OPERATE_CLIENT_ENABLED=false
```

##### YAML configuration

```yaml
camunda:
  connector:
    polling:
      enabled: false
    webhook:
      enabled: false
operate:
  client:
    enabled: false
```

If you are connecting a local connector runtime to a SaaS cluster, you may want to review our [guide to using connectors in hybrid mode](/guides/use-connectors-in-hybrid-mode.md).

</TabItem>

<TabItem value='sm'>

Specify the connection properties to connect to a self-managed Zeebe instance:

##### Environment variables

```bash
CAMUNDA_CLIENT_MODE=self-managed
CAMUNDA_CLIENT_ZEEBE_GRPCADDRESS=http://localhost:26500
CAMUNDA_CLIENT_ZEEBE_RESTADDRESS=http://localhost:8080
```

##### YAML configuration

```yaml
camunda:
  client:
    mode: self-managed
    zeebe:
      grpc-address: http://localhost:26500
      rest-address: http://localhost:8080
```

If using an HTTPS connection, you may need to provide a certificate to validate the gateway's certificate chain.

##### Environment variables

```bash
CAMUNDA_CLIENT_ZEEBE_CACERTIFICATEPATH=/path/to/certificate.pem
```

##### YAML configuration

```yaml
camunda:
  client:
    zeebe:
      ca-certificate-path: /path/to/certificate.pem
```

Depending on the authentication method used by the Zeebe instance, you may need to provide authentication properties:

##### Environment variables

```bash
CAMUNDA_CLIENT_AUTH_CLIENTID=xxx
CAMUNDA_CLIENT_AUTH_CLIENTSECRET=xxx
CAMUNDA_CLIENT_AUTH_ISSUER=http://localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/token
CAMUNDA_CLIENT_ZEEBE_AUDIENCE=zeebe-api
```

##### YAML configuration

```yaml
camunda:
  client:
    auth:
      client-id: xxx
      client-secret: xxx
      issuer: http://localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/token
    zeebe:
      audience: zeebe-api
```

See the [Spring Zeebe SDK documentation](../../../apis-tools/spring-zeebe-sdk/getting-started#self-managed) for more information on authentication properties.

Connect to Operate locally using username and password:

##### Environment variables

```bash
OPERATE_CLIENT_PROFILE=simple
OPERATE_CLIENT_BASEURL=http://localhost:8081
OPERATE_CLIENT_USERNAME=demo
OPERATE_CLIENT_PASSWORD=demo
```

##### YAML configuration

```yaml
operate:
  client:
    profile: simple
    base-url: http://localhost:8081
    username: demo
    password: demo
```

Connect to Operate in a Self-Managed environment using OAuth 2.0 credentials:

##### Environment variables

```bash
OPERATE_CLIENT_PROFILE=oidc
OPERATE_CLIENT_BASEURL=http://localhost:8081
OPERATE_CLIENT_AUTHURL=http://localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/token
OPERATE_CLIENT_AUDIENCE=operate-api
OPERATE_CLIENT_CLIENTID=xxx
OPERATE_CLIENT_CLIENTSECRET=xxx
OPERATE_CLIENT_SCOPE=xxx # optional
```

##### YAML configuration

```yaml
operate:
  client:
    profile: oidc
    base-url: http://localhost:8081
    auth-url: http://localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/token
    audience: operate-api
    client-id: xxx
    client-secret: xxx
    scope: xxx # optional
```

If you don't need to use inbound connectors, you can disable them and remove the need for an Operate connection. This will lead to inability to use inbound capabilities like webhooks.

##### Environment variables

```bash
CAMUNDA_CONNECTOR_POLLING_ENABLED=false
CAMUNDA_CONNECTOR_WEBHOOK_ENABLED=false
OPERATE_CLIENT_ENABLED=false
```

##### YAML configuration

```yaml
camunda:
  connector:
    polling:
      enabled: false
    webhook:
      enabled: false
operate:
  client:
    enabled: false
```

</TabItem>
</Tabs>

## Manual discovery of connectors

By default, the connector runtime picks up outbound connectors available on the classpath automatically.
To disable this behavior, use the following environment variables to configure connectors explicitly:

| Environment variable                          | Purpose                                                       |
| :-------------------------------------------- | :------------------------------------------------------------ |
| `CONNECTOR_{NAME}_FUNCTION` (required)        | Function to be registered as job worker with the given `NAME` |
| `CONNECTOR_{NAME}_TYPE` (optional)            | Job type to register for worker with `NAME`                   |
| `CONNECTOR_{NAME}_INPUT_VARIABLES` (optional) | Variables to fetch for worker with `NAME`                     |
| `CONNECTOR_{NAME}_TIMEOUT` (optional)         | Timeout in milliseconds for worker with `NAME`                |

Through this configuration, you define all job workers to run.

Specifying optional values allows you to override `@OutboundConnector`-provided connector configuration.

```bash
CONNECTOR_HTTPJSON_FUNCTION=io.camunda.connector.http.rest.HttpJsonFunction
CONNECTOR_HTTPJSON_TYPE=non-default-httpjson-task-type
```

## Secrets

Providing secrets to the runtime environment can be achieved in different ways, depending on your setup.

<Tabs groupId="connectorTemplateInbound" defaultValue="default" queryString values={
[
{label: 'Default secret provider', value: 'default' },
{label: 'Secrets in Helm charts', value: 'helm' },
{label: 'Secrets in Docker images', value: 'docker' },
{label: 'Secrets in manual installations', value: 'manual' },
{label: 'Custom secret provider', value: 'custom' },
]
}>

<TabItem value='default'>

:::caution
By default, all environment variables can be used as connector secrets.
:::

To limit the environment that can be accessed by the default secret provider, configure a prefix. For example:

```bash
export CAMUNDA_CONNECTOR_SECRETPROVIDER_ENVIRONMENT_PREFIX='SUPER_SECRETS_'
export SUPER_SECRETS_MY_SECRET='foo' # This will be resolved by using {{ secrets.MY_SECRET }}
```

The following environment variables can be used to configure the default secret provider:

| Name                                                       | Description                                                              | Default value |
| ---------------------------------------------------------- | ------------------------------------------------------------------------ | ------------- |
| `CAMUNDA_CONNECTOR_SECRETPROVIDER_ENVIRONMENT_ENABLED`     | Whether the default secret provider is enabled.                          | `true`        |
| `CAMUNDA_CONNECTOR_SECRETPROVIDER_ENVIRONMENT_PREFIX`      | The prefix applied to the secret name before looking up the environment. | `""`          |
| `CAMUNDA_CONNECTOR_SECRETPROVIDER_ENVIRONMENT_TENANTAWARE` | Whether the secret provider should be tenant-aware.                      | `false`       |

If the secret provider is set to be tenant-aware, the secret format will change to `${prefix}${tenantId}_${secretName}`:

Example with empty prefix:

```bash
export CAMUNDA_CONNECTOR_SECRETPROVIDER_ENVIRONMENT_TENANTAWARE=true
export tenant1_MY_SECRET='foo' # This will be resolved by using {{ secrets.MY_SECRET }} from tenant1
```

Example with prefix set:

```bash
export CAMUNDA_CONNECTOR_SECRETPROVIDER_ENVIRONMENT_TENANTAWARE=true
export CAMUNDA_CONNECTOR_SECRETPROVIDER_ENVIRONMENT_PREFIX='SUPER_SECRETS_'
export SUPER_SECRETS_tenant1_MY_SECRET='foo' # This will be resolved by using {{ secrets.MY_SECRET }} from tenant1
```

</TabItem>

<TabItem value='helm'>

Connector secrets can be used in Helm charts. Review the documentation on [managing secrets in Helm charts](/self-managed/setup/guides/secret-management.md) for additional details.

</TabItem>

<TabItem value='docker'>

To inject secrets into the [Docker images of the runtime](/self-managed/setup/deploy/other/docker.md#connectors), they must be available in the environment of the Docker container.

For example, you can inject secrets when running a container:

```bash
docker run --rm --name=connectors -d \
  -v $PWD/connector.jar:/opt/app/ \  # Add a connector jar to the classpath
  -e MY_SECRET=secret \              # Set a secret with value
  -e SECRET_FROM_SHELL \             # Set a secret from the environment
  --env-file secrets.txt \           # Set secrets from a file
  camunda/connectors-bundle:latest
```

The secret `MY_SECRET` value is specified directly in the `docker run` call,
whereas the `SECRET_FROM_SHELL` is injected based on the value in the
current shell environment when `docker run` is executed. The `--env-file`
option allows using a single file with the format `NAME=VALUE` per line
to inject multiple secrets at once.

</TabItem>

<TabItem value='manual'>

In the [manual setup](/self-managed/setup/deploy/local/manual.md#run-connectors), inject secrets during connector execution by providing
them as environment variables before starting the runtime environment. You can, for example, export them beforehand as follows:

```bash
export MY_SECRET='foo'
```

Reference the secret in the connector's input in the prefixed style `{{secrets.MY_SECRET}}`.

</TabItem>

<TabItem value='custom'>

Create your own implementation of the `io.camunda.connector.api.secret.SecretProvider` interface that
[comes with the SDK](https://github.com/camunda/connectors/blob/main/connector-sdk/core/src/main/java/io/camunda/connector/api/secret/SecretProvider.java).

Package this class and all its dependencies as a JAR, for example `my-secret-provider-with-dependencies.jar`. This needs to include a file
`META-INF/services/io.camunda.connector.api.secret.SecretProvider` that contains the fully qualified class name of your secret
provider implementation. Add this JAR to the runtime environment, depending on your deployment setup.
Your secret provider will serve secrets as implemented.

To use this JAR with [Camunda Helm charts](https://artifacthub.io/packages/helm/camunda/camunda-platform), build an [init container](https://kubernetes.io/docs/concepts/workloads/pods/init-containers/) to create a volume with your secret provider, and mount it into the connectors pod.

For example, use the following file as input for your `helm install` command:

```bash
connectors:
  extraVolumes:
    - name: workdir
      emptyDir: {}
  extraVolumeMounts:
    # Mount the secret provider
    # The Connectors pod will pick up the secret provider from /opt/app during startup
    - name: workdir
      mountPath: /opt/app/file-secret-provider-2.1.2.jar
      subPath: file-secret-provider-2.1.2.jar
  initContainers:
    - name: install
      image: busybox:1.36.1
      command: ["sh", "-c"]
      args:
        # Download a the custom secret provider into the volume
        - |
          wget -O /work-dir/file-secret-provider-2.1.2.jar https://artifacts.camunda.com/artifactory/camunda-consulting/com/camunda/consulting/connector/file-secret-provider/2.1.2/file-secret-provider-2.1.2.jar
      volumeMounts:
        - name: workdir
          mountPath: "/work-dir"
      securityContext:
        runAsUser: 1000
        # redundant as 1000 is not root but good to have
        # as the runtime will do verification that no process will
        # run as root within the container
        runAsNonRoot: true
```

For Docker images, you can add the JAR by using volumes, for example:

```bash
docker run --rm --name=connectors -d \
  -v $PWD/my-secret-provider-with-dependencies.jar:/opt/app/my-secret-provider-with-dependencies.jar \  # Specify secret provider
  -e CAMUNDA_CLIENT_ZEEBE_GRPCADDRESS=http://ip.address.of.zeebe:26500 \                                # Specify grpc Zeebe address
  camunda/connectors:latest
```

In manual installations, add the JAR to the `-cp` argument of the Java call:

```bash
java -cp 'connector-runtime-application-VERSION-with-dependencies.jar:...:my-secret-provider-with-dependencies.jar' \
    io.camunda.connector.runtime.ConnectorRuntimeApplication
```

</TabItem>
</Tabs>

## Secret filter

The secret filter restricts connectors to resolving only the secrets they declare in their own configuration. This prevents a connector from resolving secrets that are available in the runtime environment but not referenced by that connector.

### How the allow-list is built

Every field you configure in a connector's properties panel is implemented as a Zeebe input mapping under the hood, whether it's an authentication field or a functional field like an email body, an HTTP header, or a query parameter. If any of these fields contains a literal `{{secrets.NAME}}` reference, `NAME` is added to that connector element's allow-list.

The allow-list is built once per element, from the deployed BPMN model, by scanning the literal text of that element's own fields for `{{secrets.NAME}}` references:

- **It's static, not dynamic.** The filter looks at what's literally written in the model, not at what a process variable resolves to at runtime. If a secret value already resolved by one connector task later flows into a different task's field as a plain process variable (for example, `= myVariable`), that's just data at that point. There's no `{{secrets.*}}` placeholder left for the filter to check, so the filter has no say over it either way.
- **It's per element, not per field.** The allow-list merges every field on a connector element into one shared list for that element — it isn't scoped to the specific field that declared a secret. If any field on a task references `{{secrets.NAME}}`, every field on that *same* task can resolve `NAME`, including a field whose own modeled text never mentions it, if that field's runtime value happens to contain the literal text `{{secrets.NAME}}` (for example, because it evaluates a process variable crafted to contain that string).
- **It's per element, not per process.** That allow-list does not extend to *other* tasks. A secret referenced only on task A never becomes available to task B: task B's allow-list is built only from task B's own fields, so the same text arriving at task B stays unresolved unless task B also references `NAME` itself.

This is the gap the filter closes: previously, a connector resolved any `{{secrets.NAME}}` pattern present in its runtime input, regardless of where that text came from. Now it only resolves names it declared itself, at modeling time.

:::note
For inbound connectors, the allow-list comes from data already held in memory on the deployed element, so there's no remote lookup that can fail. As a result, `LAX` and `STRICT` behave identically for inbound connectors: both enforce the allow-list unconditionally. The distinction between `LAX` and `STRICT` described below only affects outbound connectors, where building the allow-list requires a lookup against the process definition.
:::

### Modes

Configure the secret filter with the `camunda.connector.secret-resolver.secret-filter.mode` property:

| Mode       | Behavior                                                                                                                                                                                                                                                                                                               |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `STRICT`   | Enforces the allow-list unconditionally. If the process definition cannot be retrieved, the Zeebe job fails and retries are triggered. This is the default. Choose this mode when strict secret isolation is required.                                                                                                |
| `LAX`      | Enforces the allow-list when the process definition is available. Falls back to allowing all secrets if the process definition cannot be retrieved (for example, due to an API outage or an eventual-consistency delay). Choose this mode when uninterrupted job processing matters more than strict secret isolation. |
| `DISABLED` | All secrets resolve freely, matching the behavior before this feature was introduced. Choose this mode only for troubleshooting, or if a custom secret provider needs unrestricted access.                                                                                                                             |

The allow-list is derived automatically from the BPMN input mappings of the connector element. No manual configuration of individual secrets is required.

<Tabs groupId="configType" defaultValue="env" queryString values={[
{label: 'Environment variables', value: 'env' },
{label: 'Application properties', value: 'application.yaml' },
]}>
<TabItem value="env">

```bash
CAMUNDA_CONNECTOR_SECRETRESOLVER_SECRETFILTER_MODE=LAX
```

</TabItem>
<TabItem value="application.yaml">

```yaml
camunda:
  connector:
    secret-resolver:
      secret-filter:
        mode: LAX
```

</TabItem>
</Tabs>

### Configure the mode in the Helm chart

The Helm chart has no dedicated value for the secret filter. Set the mode through the generic `connectors.env` value:

```yaml
connectors:
  env:
    - name: CAMUNDA_CONNECTOR_SECRETRESOLVER_SECRETFILTER_MODE
      value: LAX
```

### Cache configuration

The secret filter caches process definition lookups to avoid repeated API calls. You can configure the cache with the following properties:

| Property                                                         | Environment variable                                          | Description                                     | Default |
| ---------------------------------------------------------------- | --------------------------------------------------------------- | ----------------------------------------------- | ------- |
| `camunda.connector.secret-resolver.secret-filter.cache.enabled`  | `CAMUNDA_CONNECTOR_SECRETRESOLVER_SECRETFILTER_CACHE_ENABLED` | Whether caching is enabled.                     | `true`  |
| `camunda.connector.secret-resolver.secret-filter.cache.max-size` | `CAMUNDA_CONNECTOR_SECRETRESOLVER_SECRETFILTER_CACHE_MAXSIZE` | Maximum number of process definitions to cache. | `1000`  |

### Secure secret usage best practices

- Keep the mode at `STRICT` (the default) in production environments. Reserve `LAX` for cases where a temporary process definition API outage must not block connector jobs, and reserve `DISABLED` for troubleshooting only.
- Reference only the secrets a connector task actually needs in its input mappings. A task with fewer secrets in its input mappings has a smaller allow-list, which limits what that task can resolve even when its other input values come from untrusted process variables.
- Scope secrets narrowly, for example one API key per integration or tenant, instead of reusing a single broad-access secret across multiple connector tasks.
- Avoid pairing a field that references a sensitive secret with another field on the *same* task that evaluates untrusted or attacker-influenced process-variable content. The allow-list is shared across all of a task's fields, so a secret declared anywhere on that task can be resolved by any of its fields. If a task must process untrusted input, keep it on a separate task that doesn't reference the secret.
- The runtime still enforces the allow-list automatically between *different* tasks: you don't need to design BPMN diagrams defensively to stop one task from resolving a secret that only some other task declares.

### Troubleshooting a secret that stops resolving under STRICT

If a secret that previously resolved now comes back unresolved, or the connector job fails, under `STRICT` mode, check the following:

- For outbound connectors, the element has a Modeler element template. The secret filter derives an outbound task's allow-list from its element template; tasks without one, or with an unsupported element type, are treated as declaring no secrets and deny all resolution under `STRICT`.
- The secret is referenced in that task's input mapping, using the `{{secrets.NAME}}` syntax.
- The process definition is available to the connector runtime. Under `STRICT`, a Zeebe job fails and retries if the process definition can't be retrieved.

If you need to keep jobs processing while you investigate, switch to `LAX` temporarily. It falls back to allowing all secrets when the process definition lookup fails.

## Truststore

If your connector runtime needs to connect to external systems over HTTPS, you might need to provide a custom truststore.

To configure the truststore, use the following environment variables:

- `JAVAX_NET_SSL_TRUSTSTORE`: Path to the truststore file (e.g., `/path/to/truststore.jks`)
- `JAVAX_NET_SSL_TRUSTSTOREPASSWORD`: Password for the truststore

## Multi-tenancy

The Connector Runtime supports multiple tenants for inbound and outbound connectors. These are configurable in [Identity](/self-managed/identity/managing-tenants.md).

A single Connector Runtime can serve a single tenant or can be configured to serve
multiple tenants. By default, the runtime uses the tenant ID `<default>` for all
Zeebe-related operations like handling jobs and publishing messages.

:::info
Support for **outbound connectors** with multiple tenants requires a dedicated
tenant job worker config (described below). **Inbound connectors** automatically work for all tenants the configured Connector Runtime client has access to. This can be configured in Identity via the application assignment.
:::

### Environment variables

The Connector Runtime uses the following environment variables to configure multi-tenancy:

| Name                                    | Description                                                                                                                                                                              | Default value |
| --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| CAMUNDA_CLIENT_TENANTID                 | The default tenant ID used to communicate with Zeebe. Changing this value will set a new default tenant ID used for fetching jobs and publishing messages.                               | `<default>`   |
| CAMUNDA_CLIENT_ZEEBE_DEFAULTS_TENANTIDS | The default tenant IDs (comma separated) used to activate jobs. To run the Connector Runtime in a setup where a single runtime serves multiple tenants, add each tenant ID to this list. | `<default>`   |

If you are using an embedded version of the Connector Runtime, you can specify the tenant information in your Spring configuration like in this example `application.properties` file:

```bash
camunda.client.tenant-id=myTenant
camunda.client.zeebe.defaults.tenant-ids=myTenant
```

### Outbound connector config

The Connector Runtime uses the default tenant for outbound connector-related features.
If support for a different tenant or multiple tenants should be enabled, the tenants need
to be configured individually using the following environment variables.

If you want to use outbound connectors for a single tenant that is different
from the default tenant, you can specify a different default tenant ID using:

```bash
CAMUNDA_CLIENT_TENANTID=myTenant
```

This will change the default tenant ID used for fetching jobs and publishing messages
to the tenant ID `myTenant`.

It is possible to adjust the polling interval of connectors polling process definitions to Operate by setting the environment variable `CAMUNDA_CONNECTOR_POLLING_INTERVAL`. This variable allows you to control how often connectors fetch the process definitions, with the interval specified in milliseconds. For example, setting `CAMUNDA_CONNECTOR_POLLING_INTERVAL=20000` will configure the connectors to poll every 20 seconds.

Example:

```
CAMUNDA_CONNECTOR_POLLING_INTERVAL=10000
```

:::note
Inbound connectors will still be enabled for
all tenants the Connector Runtime client has access to.
:::

To run the Connector Runtime in a setup where a single runtime
serves multiple tenants, add each tenant ID to the list of the default job workers:

```bash
CAMUNDA_CLIENT_ZEEBE_DEFAULTS_TENANTIDS=`myTenant, otherTenant`
```

In this case, the `CAMUNDA_CLIENT_TENANTID` will **not** be used for the
configuration of job workers.

### Inbound connector configuration

The Connector Runtime fetches and executes all inbound connectors it receives from
Operate independently of the outbound connector configuration without any additional
configuration required from the user.

To restrict the Connector Runtime inbound connector feature to a single tenant or multiple tenants, use Identity and assign the tenants the Connector application should have access to.

### Troubleshooting

To ensure seamless integration and functionality, the multi-tenancy feature must also be enabled across **all** associated components [if not configured in Helm](/self-managed/concepts/multi-tenancy.md) so users can view any data from tenants for which they have authorizations configured in Identity.

Find more information (including links to individual component configuration) on the [multi-tenancy concepts page](/self-managed/concepts/multi-tenancy.md).

## Logging

### Changing the log level

The log level can be changed globally by setting the environment variable `LOGGING_LEVEL_IO_CAMUNDA_CONNECTOR=DEBUG`. This changes the default log level for the `io.camunda.connector` package
to `DEBUG`.

You can can use this package based log level approach also with custom connectors by providing your package (`my.package`) via this variable: `LOGGING_LEVEL_MY_PACKAGE=DEBUG`.

To change the log level for all packages, change it for the `root` logger: `LOGGING_LEVEL_ROOT=DEBUG`.

### Google Stackdriver (JSON) logging

To enable Google Stackdriver compatible JSON logging, set the environment variable `CONNECTORS_LOG_APPENDER=stackdriver` on the Connector Runtime.
