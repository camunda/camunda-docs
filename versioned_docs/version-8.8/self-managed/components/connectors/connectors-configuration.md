---
id: connectors-configuration
title: Configuration
description: "Configure the connector runtime environment based on the Zeebe instance, the connector functions to run, and available secrets."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

You can configure the connector runtime environment in the following ways:

- Specify the Zeebe instance to connect to.
- Define the connector functions to run.
- Provide the secrets that should be available to the connectors.

:::note
Starting from version 8.8, the connector runtime no longer requires a connection to Operate. It now depends only on the Orchestration Cluster REST API and Zeebe.
:::

To connect to **Zeebe** and the **Orchestration Cluster REST API**, the connector runtime uses the [Camunda Spring Boot Starter](/apis-tools/camunda-spring-boot-starter/getting-started.md). Any configuration available in the Spring Boot Starter can also be applied to the connector runtime environment.

Below are some of the most common configuration options for the connector runtime. For a complete list, see the [Camunda Spring Boot Starter configuration reference](/apis-tools/camunda-spring-boot-starter/configuration.md#zeebe).

:::note
This guide presents configuration properties as environment variables, while the Camunda Spring Boot Starter documentation uses Java configuration properties. The two formats are interchangeable. You can also use Java configuration properties in the connector runtime environment.

For example, the Java configuration property `camunda.client.grpc-address` can be set as the environment variable `CAMUNDA_CLIENT_GRPCADDRESS` in the connector runtime.
:::

## Configure the Orchestration Cluster connection for Self-Managed

### Connection URL

To connect to the Orchestration Cluster, provide the following configuration:

<Tabs groupId="connection-url" defaultValue="environment-variables" queryString values={[
{label: 'Environment variables', value: 'environment-variables' },
{label: 'Application.yaml', value: 'application-yaml' },
]}>
<TabItem value="environment-variables">

```bash
CAMUNDA_CLIENT_MODE=self-managed
CAMUNDA_CLIENT_GRPCADDRESS=http://localhost:26500
CAMUNDA_CLIENT_RESTADDRESS=http://localhost:8080
```

</TabItem>
<TabItem value="application-yaml">

```yaml
camunda:
  client:
    mode: self-managed
    grpc-address: http://localhost:26500
    rest-address: http://localhost:8080
```

</TabItem>
</Tabs>

### HTTPS configuration

If using an HTTPS connection, you may need to provide a certificate to validate the gateway's certificate chain.

<Tabs groupId="https-config" defaultValue="environment-variables" queryString values={[
{label: 'Environment variables', value: 'environment-variables' },
{label: 'Application.yaml', value: 'application-yaml' },
]}>
<TabItem value="environment-variables">

```bash
CAMUNDA_CLIENT_CACERTIFICATEPATH=/path/to/certificate.pem
```

</TabItem>
<TabItem value="application-yaml">

```yaml
camunda:
  client:
    ca-certificate-path: /path/to/certificate.pem
```

</TabItem>
</Tabs>

### Authentication methods

Choose the authentication method for your environment:

<Tabs groupId="authentication" defaultValue="no-auth" queryString values={[
{label: 'No Authentication', value: 'no-auth' },
{label: 'Basic Authentication', value: 'basic-auth' },
{label: 'OIDC-based Authentication', value: 'oidc' },
]}>

<TabItem value="no-auth">
By default, no authentication will be used.

**Environment variables**

```bash
CAMUNDA_CLIENT_AUTH_METHOD=none
```

**Application.yaml**

```yaml
camunda:
  client:
    auth:
      method: none
```

</TabItem>
<TabItem value="basic-auth">
To activate basic authentication:

**Environment variables**

```bash
CAMUNDA_CLIENT_AUTH_METHOD=oidc
CAMUNDA_CLIENT_AUTH_USERNAME=<your username>
CAMUNDA_CLIENT_AUTH_PASSWORD=<your password>
```

**Application.yaml**

```yaml
camunda:
  client:
    auth:
      method: basic
      username: <your username>
      password: <your password>
```

</TabItem>
<TabItem value="oidc">
To activate OIDC-based authentication:

**Environment variables**

```bash
CAMUNDA_CLIENT_AUTH_METHOD=oidc
CAMUNDA_CLIENT_AUTH_CLIENTID=xxx
CAMUNDA_CLIENT_AUTH_CLIENTSECRET=xxx
CAMUNDA_CLIENT_AUTH_TOKENURL=http://localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/token
CAMUNDA_CLIENT_AUTH_AUDIENCE=<your client id of Orchestration Cluster or configured audience>
CAMUNDA_CLIENT_AUTH_SCOPE=<your client id of Orchestration Cluster or configured audience>
```

**Application.yaml**

```yaml
camunda:
  client:
    auth:
      method: oidc
      client-id: <your client id>
      client-secret: <your client secret>
      token-url: http://localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/token
      audience: <your client id of Orchestration Cluster or configured audience>
      scope: <your client id of Orchestration Cluster or configured audience>
```

**Notes for Microsoft Entra ID**

- Instead of `scope: CLIENT_ID_OC`, use: `scope: CLIENT_ID_OC + "/.default"`.
- The `token-url` is typically formatted as: `https://login.microsoftonline.com/<tenant_id>/oauth2/v2.0/token`.

:::note Audience validation
If you have configured the audiences property for the Orchestration Cluster (`camunda.security.authentication.oidc.audiences`), the Orchestration Cluster will validate the audience claim in the token against the configured audiences. Ensure your token has the correct audience from the Orchestration Cluster configuration, or add your audience in the configuration. This is often the client ID you used when setting up the Orchestration Cluster.
:::

</TabItem>
</Tabs>

See the [Camunda Spring Boot Starter documentation](../../../../apis-tools/camunda-spring-boot-starter/getting-started#self-managed) for more information on authentication properties.

## Configure the Orchestration Cluster connection for SaaS

To use Camunda 8 SaaS, specify the connection properties:

<Tabs groupId="saas-config" defaultValue="saas-environment-variables" queryString values={[
{label: 'Environment variables', value: 'saas-environment-variables' },
{label: 'Application.yaml', value: 'saas-application-yaml' },
]}>
<TabItem value="saas-environment-variables">

```bash
CAMUNDA_CLIENT_MODE=saas
CAMUNDA_CLIENT_AUTH_CLIENTID=xxx
CAMUNDA_CLIENT_AUTH_CLIENTSECRET=xxx
CAMUNDA_CLIENT_CLOUD_REGION=bru-2
CAMUNDA_CLIENT_CLOUD_CLUSTERID=xxx
```

</TabItem>
<TabItem value="saas-application-yaml">

```yaml
camunda:
  client:
    mode: saas
    auth:
      client-id: xxx
      client-secret: xxx
    cloud:
      region: bru-2
      cluster-id: xxx
```

</TabItem>
</Tabs>

If you are connecting a local connector runtime to a SaaS cluster, you may want to review our [guide to using connectors in hybrid mode](/components/connectors/use-connectors-in-hybrid-mode.md).

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

## Disabling Individual Connectors

To disable individual connectors you can provide a comma separated list to `CONNECTOR_INBOUND_DISABLED`
and `CONNECTOR_OUTBOUND_DISABLED` respectively. These list must contain the _connector type_ (e.g. `io.camunda:http-json:1`).
To disable two outbound connectors, you can set the environment variable as follows:

```bash
CONNECTOR_OUTBOUND_DISABLED=io.camunda:example:1,com.acme:custom-connector:2
```

This can be found as the `<zeebe:taskDefinition type="io.camunda:http-json:1"/>` in the BPMN XML, the `zeebe:taskDefinition`
property [in the element template](https://github.com/camunda/connectors/blob/8d2304754e202b56ae8c821746e99e1e9ef50c73/connectors/http/rest/element-templates/http-json-connector.json#L48)
or in the `OutboundConnector` annotation for outbound connectors.
The inbound connector type can be found as `<zeebe:property name="inbound.type" value="io.camunda:webhook:1" />`,
the `inbound.type` property [in the element template](https://github.com/camunda/connectors/blob/8d2304754e202b56ae8c821746e99e1e9ef50c73/connectors/webhook/element-templates/webhook-connector-start-message.json#L51)
or in the `InboundConnector` annotation.

## Disabling connector discovery

:::warning
We do not guarantee that all the Camunda provided connectors will be discovered via SPI.
If you want to have a connector runtime without out-of-the-box connectors, we recommend building a custom runtime with only the connectors you want to use.
:::

To disable the discovery of connectors via SPI or environment variables as explained [in this section](#manual-discovery-of-connectors),
set the following environment variables: `CONNECTOR_INBOUND_DISCOVERY_DISABLED` and `CONNECTOR_OUTBOUND_DISCOVERY_DISABLED`.

Note that this does not prevent the registration of connectors via Spring Beans or
other mechanisms.

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

Connector secrets can be used in Helm charts, e.g. referencing a [Kubernetes Secret
](https://kubernetes.io/docs/concepts/configuration/secret/):
```yaml
connectors:
  envFrom:
    - secretRef:
      name: camunda-connector-secrets
```

```
apiVersion: v1
kind: Secret
metadata:
  name: camunda-connector-secrets
stringData:
  MY_SECRET: foo
```

Review the documentation on [managing secrets in Helm charts](/self-managed/deployment/helm/configure/secret-management.md) for additional details.

</TabItem>

<TabItem value='docker'>

To inject secrets into the [Docker images of the runtime](/self-managed/deployment/docker/docker.md#connectors), they must be available in the environment of the Docker container.

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

In the [manual setup](/self-managed/deployment/manual/install.md#connectors-1), inject secrets during connector execution by providing
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
  -e CAMUNDA_CLIENT_ZEEBE_GRPCADDRESS=http://ip.address.of.zeebe:26500 \ # Specify grpc Zeebe address
  camunda/connectors:latest
```

In manual installations, add the JAR to the `-cp` argument of the Java call:

```bash
java -cp 'connector-runtime-application-VERSION-with-dependencies.jar:...:my-secret-provider-with-dependencies.jar' \
    io.camunda.connector.runtime.ConnectorRuntimeApplication
```

</TabItem>
</Tabs>

## Truststore

If your connector runtime needs to connect to external systems over HTTPS, you might need to provide a custom truststore.

To configure the truststore, use the following environment variables:

- `JAVAX_NET_SSL_TRUSTSTORE`: Path to the truststore file (e.g., `/path/to/truststore.jks`)
- `JAVAX_NET_SSL_TRUSTSTOREPASSWORD`: Password for the truststore

## Multi-tenancy

The Connector Runtime supports multiple tenants for inbound and outbound connectors. These are configurable in [Orchestration Cluster Identity](/components/identity/tenant.md).

A single Connector Runtime can serve a single tenant or can be configured to serve
multiple tenants. By default, the runtime uses the tenant ID `<default>` for all
Zeebe-related operations like handling jobs and publishing messages.

:::info
Support for **outbound connectors** with multiple tenants requires a dedicated
tenant job worker config (described below). **Inbound connectors** automatically work for all tenants the configured Connector Runtime client has access to. This can be configured in Identity via the application assignment.
:::

### Environment variables

The Connector Runtime uses the following environment variables to configure multi-tenancy:

| Name                                     | Description                                                                                                                                                                              | Default value |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| CAMUNDA_CLIENT_TENANTID                  | The default tenant ID used to communicate with Zeebe. Changing this value will set a new default tenant ID used for fetching jobs and publishing messages.                               | `<default>`   |
| CAMUNDA_CLIENT_WORKER_DEFAULTS_TENANTIDS | The default tenant IDs (comma separated) used to activate jobs. To run the Connector Runtime in a setup where a single runtime serves multiple tenants, add each tenant ID to this list. | `<default>`   |

If you are using an embedded version of the Connector Runtime, you can specify the tenant information in your Spring configuration like in this example `application.properties` file:

```bash
camunda.client.tenant-id=myTenant
camunda.client.worker.defaults.tenant-ids=myTenant
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

```bash
CAMUNDA_CONNECTOR_POLLING_INTERVAL=10000
```

:::note
Inbound connectors will still be enabled for
all tenants the Connector Runtime client has access to.
:::

To run the connector Runtime in a setup where a single runtime
serves multiple tenants, add each tenant ID to the list of the default job workers:

```bash
CAMUNDA_CLIENT_ZEEBE_DEFAULTS_TENANTIDS=`myTenant, otherTenant`
```

In this case, the `CAMUNDA_CLIENT_TENANTID` will **not** be used for the
configuration of job workers.

### Inbound Connector configuration

The Connector Runtime fetches process definitions from the Orchestration Cluster REST API, and executes all inbound connectors within those processes independently of the outbound connector configuration without any additional configuration required from the user.

To restrict the Connector Runtime inbound connector feature to a single tenant or multiple tenants, use Identity and assign the tenants the connector application should have access to.

### Troubleshooting

To ensure seamless integration and functionality, the multi-tenancy feature must also be enabled across **all** associated components [if not configured in Helm](../../deployment/helm/configure/configure-multi-tenancy.md) so users can view any data from tenants for which they have authorizations configured in Identity.

Find more information (including links to individual component configuration) on the [multi-tenancy concepts page](/components/concepts/multi-tenancy.md).

## Logging

### Changing the log level

The log level can be changed globally by setting the environment variable `LOGGING_LEVEL_IO_CAMUNDA_CONNECTOR=DEBUG`. This changes the default log level for the `io.camunda.connector` package
to `DEBUG`.

You can can use this package based log level approach also with custom connectors by providing your package (`my.package`) via this variable: `LOGGING_LEVEL_MY_PACKAGE=DEBUG`.

To change the log level for all packages, change it for the `root` logger: `LOGGING_LEVEL_ROOT=DEBUG`.

### Google Stackdriver (JSON) logging

To enable Google Stackdriver compatible JSON logging, set the environment variable `CONNECTORS_LOG_APPENDER=stackdriver` on the Connector Runtime.
