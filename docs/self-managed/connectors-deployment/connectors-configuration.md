---
id: connectors-configuration
title: Configuration
---

You can configure the Connector runtime environment in the following ways:

- The Zeebe instance to connect to.
- The Connector functions to run.
- The secrets that should be available to the Connectors.

## Connecting to Zeebe

In general, the Connector Runtime will respect all properties known to [Spring Zeebe](https://github.com/camunda-community-hub/spring-zeebe).

### SaaS

To use Camunda 8 SaaS specify the connection properties:

```bash
ZEEBE_CLIENT_CLOUD_CLUSTER-ID=xxx
ZEEBE_CLIENT_CLOUD_CLIENT-ID=xxx
ZEEBE_CLIENT_CLOUD_CLIENT-SECRET=xxx
ZEEBE_CLIENT_CLOUD_REGION=bru-2
```

You can further configure separate connection properties for Camunda Operate (otherwise it will use the properties configured for Zeebe above):

```bash
CAMUNDA_OPERATE_CLIENT_CLIENT-ID=xxx
CAMUNDA_OPERATE_CLIENT_CLIENT-SECRET=xxx
```

### Local installation

Zeebe:

```bash
ZEEBE_CLIENT_BROKER_GATEWAY-ADDRESS=127.0.0.1:26500
ZEEBE_CLIENT_SECURITY_PLAINTEXT=true
```

If the Zeebe Gateway is set up with Camunda Identity-based authorization, [Zeebe client OAuth environment variables](../zeebe-deployment/security/client-authorization.md#environment-variables) must be provided.

Connect to Operate locally using username and password:

```bash
CAMUNDA_OPERATE_CLIENT_URL=http://localhost:8081
CAMUNDA_OPERATE_CLIENT_USERNAME=demo
CAMUNDA_OPERATE_CLIENT_PASSWORD=demo
```

When running against a self-managed environment you might also need to configure the Keycloak endpoint to not use Operate username/password authentication:

```bash
CAMUNDA_OPERATE_CLIENT_KEYCLOAK-URL=http://localhost:18080
CAMUNDA_OPERATE_CLIENT_KEYCLOAK-REALM=camunda-platform
```

### Disable Operate connectivity

Disabling Operate polling will lead to inability to use inbound (e.g., webhook) capabilities.
However, if you still wish to do so, you need to start your Connectors runtime with the following environment variables:

```bash
CAMUNDA_CONNECTOR_POLLING_ENABLED=false
CAMUNDA_CONNECTOR_WEBHOOK_ENABLED=false
SPRING_MAIN_WEB-APPLICATION-TYPE=none
OPERATE_CLIENT_ENABLED=false
```

## Manual discovery of Connectors

By default, the Connector runtime picks up outbound Connectors available on the classpath automatically.
To disable this behavior, use the following environment variables to configure Connectors and their configuration explicitly:

| Environment variable                          | Purpose                                                       |
| :-------------------------------------------- | :------------------------------------------------------------ |
| `CONNECTOR_{NAME}_FUNCTION` (required)        | Function to be registered as job worker with the given `NAME` |
| `CONNECTOR_{NAME}_TYPE` (optional)            | Job type to register for worker with `NAME`                   |
| `CONNECTOR_{NAME}_INPUT_VARIABLES` (optional) | Variables to fetch for worker with `NAME`                     |

Through that configuration, you define all job workers to run.

Specifying optional values allow you to override `@OutboundConnector`-provided Connector configuration.

```bash
CONNECTOR_HTTPJSON_FUNCTION=io.camunda.connector.http.HttpJsonFunction
CONNECTOR_HTTPJSON_TYPE=non-default-httpjson-task-type
```

## Secrets

Providing secrets to the runtime environment can be achieved in different ways, depending on your setup.

### Default secret provider

:::caution
By default, all environment variables can be used as Connector secrets.
:::

To limit the environment that can be accessed by the default secret provider, configure a prefix. For example:

```bash
export CAMUNDA_CONNECTOR_SECRETPROVIDER_ENVIRONMENT_PREFIX='SUPER_SECRETS_'
export SUPER_SECRETS_MY_SECRET='foo' # This will be resolved by using {{ secrets.MY_SECRET }}
```

The following environment variables can be used to configure the default secret provider:

| Name                                                   | Description                                                              | Default value |
| ------------------------------------------------------ | ------------------------------------------------------------------------ | ------------- |
| `CAMUNDA_CONNECTOR_SECRETPROVIDER_ENVIRONMENT_ENABLED` | Whether the default secret provider is enabled.                          | `true`        |
| `CAMUNDA_CONNECTOR_SECRETPROVIDER_ENVIRONMENT_PREFIX`  | The prefix applied to the secret name before looking up the environment. | `""`          |

### Secrets in Docker images

To inject secrets into the [Docker images of the runtime](../platform-deployment/docker.md#connectors), they must be available in the environment of the Docker container.

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

### Secrets in manual installations

In the [manual setup](../platform-deployment/manual.md#run-connectors), inject secrets during Connector execution by providing
them as environment variables before starting the runtime environment. You can, for example, export them beforehand as follows:

```bash
export MY_SECRET='foo'
```

Reference the secret in the Connector's input in the prefixed style `{{secrets.MY_SECRET}}`.

### Custom secret provider

Create your own implementation of the `io.camunda.connector.api.secret.SecretProvider` interface that
[comes with the SDK](https://github.com/camunda/connectors/blob/main/connector-sdk/core/src/main/java/io/camunda/connector/api/secret/SecretProvider.java).

Package this class and all its dependencies as a JAR, e.g. `my-secret-provider-with-dependencies.jar`. This needs to include a file
`META-INF/services/io.camunda.connector.api.secret.SecretProvider` that contains the fully qualified class name of your secret
provider implementation. Add this JAR to the runtime environment, depending on your deployment setup.
Your secret provider will serve secrets as implemented.

For Docker images, you can add the JAR by using volumes, for example:

```bash
docker run --rm --name=connectors -d \
  -v $PWD/my-secret-provider-with-dependencies.jar:/opt/app/my-secret-provider-with-dependencies.jar \  # Specify secret provider
  -e ZEEBE_CLIENT_BROKER_GATEWAY-ADDRESS=ip.address.of.zeebe:26500 \                                    # Specify Zeebe address
  -e ZEEBE_CLIENT_SECURITY_PLAINTEXT=true \                                                             # Optional: provide security configs to connect to Zeebe
  camunda/connectors:latest
```

In manual installations, add the JAR to the `-cp` argument of the Java call:

```bash
java -cp 'connector-runtime-application-VERSION-with-dependencies.jar:...:my-secret-provider-with-dependencies.jar' \
    io.camunda.connector.runtime.ConnectorRuntimeApplication
```

## Multi-Tenancy

The Connector Runtime supports multiple tenants for Inbound and Outbound Connectors.
A single Connector Runtime can serve a single tenant or can be configured to serve
multiple tenants. By default, the runtime uses the `<default>` tenant id for all
Zeebe related operations like handling Jobs and publishing Messages.

:::info
Support for **Outbound Connectors** with multiple tenants requires a dedicated
tenant job worker config (described below). **Inbound Connectors** will automatically work for all tenants
the configured Connector Runtime client has access to. This can be configured in Identity via
the application assignment.
:::

### Environment variables

The following environment variables are used by the Connector Runtime
for the configuration of multi-tenancy.

| Name                                       | Description                                                     | Default value |
| ------------------------------------------ | --------------------------------------------------------------- | ------------- |
| ZEEBE_CLIENT_DEFAULT-TENANT-ID             | The default tenant id used to communicate with Zeebe            | `<default>`   |
| ZEEBE_CLIENT_DEFAULT-JOB-WORKER-TENANT-IDS | The default tenants ids (comma separated) used to activate jobs | `<default>`   |

If you are using an embedded version of the Connector Runtime you can specify the tenant information
in your Spring configuration like in this example `application.properties` file:

```bash
zeebe.client.default-tenant-id=<default>
zeebe.client.default-job-worker-tenant-ids=t1,<default>
```

### Outbound Connector config

The Connector Runtime uses the `<default>` tenant for Outbound Connector related features.
If support for a different tenant or multiple tenants should be enabled, the tenants need
to be configured individually using the following environment variables.

If you want to use Outbound Connectors for a single tenant that is different
from the `<default>` tenant you can specify a different default tenant id using:

```bash
ZEEBE_CLIENT_DEFAULT-TENANT-ID=tenant1
```

This will change the default tenant id used for fetching jobs and publishing messages
to the tenant id `tenant1`.

:::note
Please keep in mind that Inbound Connectors will still be enabled for
all tenants that the Connector Runtime client has access to.
:::

If you want to run the Connector Runtime in a setup where a single runtime
serves multiple tenants you have add each tenant id to the list of the default job workers:

```bash
ZEEBE_CLIENT_DEFAULT-JOB-WORKER-TENANT-IDS=tenant1, tenant2
```

In this case the `ZEEBE_CLIENT_DEFAULT-TENANT-ID` will **not** be used for the
configuration of job workers.

### Inbound Connector config

The Connector Runtime will fetch and execute all Inbound Connectors it receives from
Operate independently of the Outbound Connector configuration without any additional
configuration required from the user.

If you want to restrict the Connector Runtime Inbound Connector feature to a single tenant or multiple tenants
you have to use Identity and assign the tenants the Connector application should have access to.

## Logging

### Google Stackdriver (JSON) logging

To enable Google Stackdriver compatible JSON logging, set the environment variable `CONNECTORS_LOG_APPENDER=stackdriver` on the Connector Runtime.
