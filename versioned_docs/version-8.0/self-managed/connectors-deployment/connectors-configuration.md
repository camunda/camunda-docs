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

To use Camunda Platform 8 SaaS specify the connection properties:

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

### Secrets in Docker images

To inject secrets into the [Docker images of the runtime](../platform-deployment/docker.md#connectors), they must be available in the environment of the Docker container.

For example, you can inject secrets when running a container:

```bash
docker run --rm --name=connectors -d \
  -v $PWD/connector.jar:/opt/app/connector.jar \                      # Add a connector jar to the classpath
  --network=your-zeebe-network \                                      # Optional: attach to network if Zeebe is isolated with Docker network
  -e ZEEBE_CLIENT_BROKER_GATEWAY-ADDRESS=ip.address.of.zeebe:26500 \  # Specify Zeebe address
  -e ZEEBE_CLIENT_SECURITY_PLAINTEXT=true \                           # Optional: provide security configs to connect to Zeebe
  camunda/connectors:latest
```

The secret `MY_SECRET` value is specified directly in the `docker run` call,
whereas the `SECRET_FROM_SHELL` is injected based on the value in the
current shell environment when `docker run` is executed. The `--env-file`
option allows using a single file with the format `NAME=VALUE` per line
to inject multiple secrets at once.

### Secrets in manual installations

In the [manual setup](../platform-deployment/local.md#run-connectors), inject secrets during Connector execution by providing
them as environment variables before starting the runtime environment. You can, for example, export them beforehand as follows:

```bash
export MY_SECRET='foo'
```

Reference the secret in the Connector's input in the prefixed style `secrets.MY_SECRET`.

### Custom secret provider

Create your own implementation of the `io.camunda.connector.api.secret.SecretProvider` interface that
[comes with the SDK](https://github.com/camunda/connector-sdk/blob/main/core/src/main/java/io/camunda/connector/api/secret/SecretProvider.java).

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
java -cp 'spring-zeebe-connector-runtime-VERSION-with-dependencies.jar:...:my-secret-provider-with-dependencies.jar' \
    io.camunda.connector.runtime.ConnectorRuntimeApplication
```
