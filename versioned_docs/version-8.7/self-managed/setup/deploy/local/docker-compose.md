---
id: docker-compose
title: "Docker Compose"
keywords: ["camunda docker", "docker compose"]
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import {DockerCompose} from "@site/src/components/CamundaDistributions";

A Docker Compose configuration to run Camunda Self-Managed components (Zeebe, Operate, Tasklist, Optimize, Identity, and connectors). Docker Compose also supports document storage and management with [document handling](/self-managed/concepts/document-handling/overview.md).

:::note
While the [Docker images](/self-managed/setup/deploy/other/docker.md) themselves are supported for production usage, the Docker Compose files are designed to be used by developers to run an environment locally, and are not designed to be used in production. We recommend [Kubernetes](/self-managed/setup/install.md) for production use cases.
:::

## Prerequisites

- **Docker Compose:** Version 1.27.0+ (supports the [latest compose specification](https://docs.docker.com/compose/compose-file/)).
- **Docker:** Version 20.10.16+
- **Keycloak:** (Local development only). Add Keycloak to resolve to 127.0.0.1 on your local machine, and set `KEYCLOAK_HOST=keycloak` in the `.env` file for token refresh and logout functionality.

## Run Camunda 8 with Docker Compose

To start a complete instance of Camunda 8 Self-Managed environment locally:

1. Download the artifact for Camunda 8 <DockerCompose/>, then extract it.
2. Run the following command in the extracted directory:

```shell
docker compose up -d
```

3. Wait for the environment to initialize. This may take several minutes. Monitor the logs, especially the Keycloak container log, to ensure the components have started.

### Configuration options

Running `docker compose up -d` starts all Camunda components, including Identity. The [Camunda Distributions repository](https://github.com/camunda/camunda-distributions) also contains additional configuration files for lightweight development.

- **docker-compose.yaml:** Contains all Camunda 8 Components for a full stack deployment: Zeebe, Operate, Tasklist, Connectors, Optimize, Identity, Elasticsearch, Keycloak, Web Modeler, and PostgreSQL.
- **docker-compose-core.yaml:** Contains Camunda 8 Orchestration cluster components: Zeebe, Tasklist, Operate, and Connectors.
- **docker-compose-web-modeler.yaml:** Contains the Camunda 8 Web Modeler standalone installation. For more information, see the [Web Modeler instructions](#web-modeler).

To start Camunda with an alternate configuration, specify a file using the following command:

```shell
docker compose -f docker-compose-core.yaml up -d
```

### Access components

Running components can be accessed with the username `demo` and password `demo`:

- Operate: [http://localhost:8081](http://localhost:8081)
- Tasklist: [http://localhost:8082](http://localhost:8082)
- Optimize: [http://localhost:8083](http://localhost:8083)
- Identity: [http://localhost:8084](http://localhost:8084)
- Web Modeler [http://localhost:8070](http://localhost:8070)
- Elasticsearch: [http://localhost:9200](http://localhost:9200)

Keycloak is used to manage users, and can be accessed with the user `admin` and password `admin`:

- Keycloak: [http://localhost:18080/auth/](http://localhost:18080/auth/)

The workflow engine Zeebe is available using gRPC:

- Zeebe: `localhost:26500`

### Stop Camunda 8

Run the following command to stop Camunda 8:

```shell
docker compose down -v
```

:::caution
This will also delete any data you created.
:::

To tear down the environment and keep any data, run the following command:

```shell
docker compose down
```

## Modeling and process execution

### Web Modeler

:::info
Non-production installations of Web Modeler are restricted to five collaborators per project. Refer to the [licensing documentation](/reference/licenses.md) for more information.
:::

#### Standalone setup

Web Modeler is included by default when running the `docker-compose.yaml` configuration, but can be run independently using Identity, Keycloak and Postgres as dependencies.

The following command uses the provided `docker-compose-web-modeler.yaml` configuration file to only start Web Modeler and its dependencies:

```shell
docker compose -f docker-compose-web-modeler.yaml up -d
```

To tear down the environment (including all data and volumes), run the following command:

```shell
docker compose -f docker-compose-web-modeler.yaml down -v
```

#### Deploy or execute a process

The local Zeebe instance started when using the provided `docker-compose.yaml` is pre-configured in Web Modeler.

Once you are ready to deploy or execute a process, this instance can be used without needing to enter the cluster endpoint manually. The correct authentication type is also preset based on the [`ZEEBE_AUTHENTICATION_MODE` environment variable](#securing-the-zeebe-api).

<Tabs groupId="web modeler" defaultValue="with" queryString values={
[
{label: 'With Zeebe request authentication', value: 'with' },
{label: 'Without authentication', value: 'without' },
]}>

<TabItem value="with">

If you enabled authentication for gRPC requests on Zeebe, use the following client credentials when deploying and executing processes:

- Client ID: `zeebe`
- Client secret: `zecret`

:::note
The correct OAuth token URL and audience are preset internally.
:::

</TabItem>

<TabItem value='without'>

No additional input is required.

</TabItem>
</Tabs>

#### Emails

The provided configuration includes [Mailpit](https://github.com/axllent/mailpit) as a test SMTP server. It captures all emails sent by Web Modeler, but does not forward them to the actual recipients.

You can access emails in Mailpit's Web UI at [http://localhost:8075](http://localhost:8075).

### Desktop Modeler

:::info
Desktop Modeler is [open source and free to use](https://github.com/camunda/camunda-modeler).
:::

[Download the Desktop Modeler](https://camunda.com/download/modeler/) and start modeling BPMN, DMN and Camunda Forms on your local machine.

### Use the CLI

<Tabs groupId="cli" defaultValue="with" queryString values={
[
{label: 'With Zeebe request authentication', value: 'with' },
{label: 'Without authentication', value: 'without' },
]}>

<TabItem value="with">

If you enabled authentication for GRPC requests on Zeebe, provide the following client credentials when deploying and executing processes:

- Authentication: `OAuth`
- URL: `http://localhost:26500`
- Client ID: `zeebe`
- Client secret: `zecret`
- OAuth URL: `http://localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/token`
- Audience: `zeebe-api`

</TabItem>

<TabItem value="without">

Once you are ready to deploy or execute processes, use the following settings to deploy to the local Zeebe instance:

- Authentication: `None`
- URL: `http://localhost:26500`

</TabItem>
</Tabs>

## Secure the Zeebe API

By default, the Zeebe GRPC API is publicly accessible without requiring any client credentials for development purposes.

To enable authentication of GRPC requests in Zeebe, setting the environment variable `ZEEBE_AUTHENTICATION_MODE` to `identity`, for example:

```shell
ZEEBE_AUTHENTICATION_MODE=identity docker compose up -d
```

The default value can also be modified directly in the included `.env` file.

## Connectors

Both the full and lightweight Docker Compose files contain a configuration for [Out-of-the-box connectors](/components/connectors/out-of-the-box-connectors/available-connectors-overview.md). Refer to the [Connector installation guide](/self-managed/connectors-deployment/install-and-start.md) for details on how to provide the related connector templates for modeling.

### Connector secrets

Secrets can be added into the connector runtime using the included `connector-secrets.txt` file. Add secrets in the format `NAME=VALUE`
per line. The secrets will then be available in the connector runtime in the format `secrets.NAME`.

### Custom connectors

To add custom connectors, create a new Docker Image bundling them as described in the [Connectors repository](https://github.com/camunda/connectors).

Alternatively, you can mount new connector JARs as volumes into the `/opt/app` folder by adding this to the Docker Compose file. Keep in mind that the connector JARs must include all necessary dependencies inside the JAR.
