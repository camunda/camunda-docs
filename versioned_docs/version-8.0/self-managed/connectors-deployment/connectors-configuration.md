---
id: connectors-configuration
title: Configuration
---

You can configue the Connector runtime environment regarding the following aspects:

- The Zeebe instance to connect to.
- The secrets that should be available to the Connectors.

## Connecting to Zeebe

You configure the connection to Zeebe using the standard [Zeebe environment variables](/apis-clients/java-client/index.md#bootstrapping).

## Manual discovery of Connectors

Use the following environment variables to configure Connectors and their configuration explicitly, without auto-discovery:

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

To inject secrets into the [Docker images of the runtime](../platform-deployment/docker.md#connectors), they have to be available in the environment of the docker container.

For example, you can inject secrets when running a container:

```bash
docker run --rm --name=connectors -d \
           -v $PWD/connector.jar:/opt/app/ \  # Add a connector jar to the classpath
           -e MY_SECRET=secret \              # Set a secret with value
           -e SECRET_FROM_SHELL \             # Set a secret from the environment
           --env-file secrets.txt \           # Set secrets from a file
           camunda/connectors:0.2.2
```

The secret `MY_SECRET` value is specified directly in the `docker run` call,
whereas the `SECRET_FROM_SHELL` is injected based on the value in the
current shell environment when `docker run` is executed. The `--env-file`
option allows using a single file with the format `NAME=VALUE` per line
to inject multiple secrets at once.

### Secrets in manual installations

In the [Manual setup](../platform-deployment/local.md#run-connectors), inject secrets during Connector execution by providing
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
docker run --rm --name=connectors -d -v $PWD/my-secret-provider-with-dependencies.jar:/opt/app/ camunda/connectors:0.2.2
```

In manual installations, add the JAR to the `-cp` argument of the Java call:

```bash
java -cp 'connector-runtime-job-worker-with-dependencies.jar:...:my-secret-provider-with-dependencies.jar' \
    io.camunda.connector.runtime.jobworker.Main
```
