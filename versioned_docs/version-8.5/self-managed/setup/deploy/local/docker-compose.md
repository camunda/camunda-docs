---
id: docker-compose
title: "Docker Compose"
keywords: ["camunda docker", "docker compose"]
---

A Docker Compose configuration to run Camunda Self-Managed components (e.g., Zeebe, Operate, Tasklist, Optimize, Identity, and Connectors Bundle, etc.).

:::danger
While the [Docker images](/self-managed/setup/deploy/other/docker.md) themselves are supported for production usage, the Docker Compose files are designed to be used by developers to run an environment locally; they are not designed to be used in production. We recommend to use [Kubernetes](/self-managed/setup/install.md) in production.
:::

## Prerequisites

- **Docker Compose:** Version 1.27.0+ (supports the [latest compose specification](https://docs.docker.com/compose/compose-file/)).
- **Docker:** Version 20.10.16+.
- **Local:** Add Keycloak to resolve to 127.0.0.1 on your local machine, and set `KEYCLOAK_HOST=keycloak` in the `.env` file for token refresh and logout functionality.

## Setup

### Start

To spin up a Camunda Platform 8 Self-Managed environment locally you can use the following docker compose configuration files:

- **docker-compose.yaml:** Contians all Camunda 8 Components for a full stack deployment: Zeebe, Operate, Tasklist, Connectors, Optimize, Identity, Elasticsearch, Keycloak, Web Modeler, and PostgreSQL.
- **docker-compose-core.yaml:** Contians Camunda 8 Orchestration cluster components: Zeebe, Tasklist, Operate, Optimize, Identity and Connectors.
- **docker-compose-web-modeler.yaml:** Contians Camunda 8 Web Modeler standalone installation.

To start a complete Camunda Platform 8 Self-Managed environment locally:

1. Clone this repository.
2. Run:
   ```shell
   docker compose up -d
   ```
3. Wait for the environment to initialize. Monitor logs (especially Keycloak) to ensure all components have started.

Wait a few minutes for the environment to start up and settle down. Monitor the logs, especially the Keycloak container log, to ensure the components have started.

Now you can navigate to the different web apps and log in with the user `demo` and password `demo`:

- Operate: [http://localhost:8081](http://localhost:8081)
- Tasklist: [http://localhost:8082](http://localhost:8082)
- Optimize: [http://localhost:8083](http://localhost:8083)
- Identity: [http://localhost:8084](http://localhost:8084)
- Elasticsearch: [http://localhost:9200](http://localhost:9200)

Keycloak is used to manage users. Here you can log in with the user `admin` and password `admin`:

- Keycloak: [http://localhost:18080/auth/](http://localhost:18080/auth/)

The workflow engine Zeebe is available using gRPC at `localhost:26500`.

### Stop

```shell
docker compose down -v
```

## Deploy or execute a process

### CLI

#### Without authentication

Once you are ready to deploy or execute processes use these settings to deploy to the local Zeebe instance:

- Authentication: `None`
- URL: `http://localhost:26500`

#### With Zeebe request authentication

If you enabled authentication for GRPC requests on Zeebe you need to provide client credentials when deploying and executing processes:

- Authentication: `OAuth`
- URL: `http://localhost:26500`
- Client ID: `zeebe`
- Client secret: `zecret`
- OAuth URL: `http://localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/token`
- Audience: `zeebe-api`

### Web Modeler

:::info
Non-production installations of Web Modeler are restricted to five collaborators per project.
Refer to [licenses documentation](/docs/reference/licenses.md) for more information.
:::

#### Standalone setup

Web Modeler can be run standalone with only Identity, Keycloak and Postgres as dependencies by using the Docker Compose.
Issue the following commands to only start Web Modeler and its dependencies:

```shell
docker compose -f docker-compose-web-modeler.yaml up -d
```

To tear down the whole environment run the following command (including all the data and volumes):

```shell
docker compose -f docker-compose-web-modeler.yaml down -v
```

:::warning
This will also delete any data you created.
:::

Alternatively, if you want to keep the data, run without `-v` parameter:

```shell
docker compose -f docker-compose-web-modeler.yaml down
```

You can access Web Modeler and log in with the user `demo` and password `demo` at [http://localhost:8070](http://localhost:8070).

#### Deploy or execute a process

The local Zeebe instance (that is started when using the Docker Compose docker-compose.yaml is pre-configured in Web Modeler.

Once you are ready to deploy or execute a process, you can just use this instance without having to enter the cluster endpoint manually.
The correct authentication type is also preset based on the [`ZEEBE_AUTHENTICATION_MODE` environment variable](#securing-the-zeebe-api).

#### Without authentication

No additional input is required.

#### With Zeebe request authentication

If you enabled authentication for gRPC requests on Zeebe, use the following client credentials when deploying and executing processes:

- Client ID: `zeebe`
- Client secret: `zecret`

:::note
The correct OAuth token URL and audience are preset internally.
:::

#### Emails

The setup includes [Mailpit](https://github.com/axllent/mailpit) as a test SMTP server. It captures all emails sent by Web Modeler, but does not forward them to the actual recipients.

You can access emails in Mailpit's Web UI at [http://localhost:8075](http://localhost:8075).

### Desktop Modeler

:::info
The Desktop Modeler is [open source, free to use](https://github.com/camunda/camunda-modeler).
:::

[Download the Desktop Modeler](https://camunda.com/download/modeler/) and start modeling BPMN, DMN and Camunda Forms on your local machine.

## Misc

### Securing the Zeebe API

By default, the Zeebe GRPC API is publicly accessible without requiring any client credentials for development purposes.

You can however enable authentication of GRPC requests in Zeebe by setting the environment variable `ZEEBE_AUTHENTICATION_MODE` to `identity`, e.g. via running:

```shell
ZEEBE_AUTHENTICATION_MODE=identity docker compose up -d
```

Or by modifying the default value in the `.env` file.

### Connectors

Both docker-compose files contain our [Out-of-the-box Connectors](/docs/components/connectors/out-of-the-box-connectors/available-connectors-overview.md).

Refer to the [Connector installation guide](/docs/self-managed/connectors-deployment/install-and-start.md) for details on how to provide the related Connector templates for modeling.

To inject secrets into the Connector runtime they can be added to the
`connector-secrets.txt` file inside the repository in the format `NAME=VALUE`
per line. The secrets will then be available in the Connector runtime with the
format `secrets.NAME`.

To add custom Connectors either create a new docker image bundling them as
described in the [Connectors repository](https://github.com/camunda/connectors).

Alternatively, you can mount new Connector JARs as volumes into the `/opt/app` folder by adding this to the docker-compose file. Keep in mind that the Connector JARs need to bring along all necessary dependencies inside the JAR.

### Kibana

A `kibana` profile is available in the provided docker compose files to support inspection and exploration of the Camunda Platform 8 data in Elasticsearch.
It can be enabled by adding `--profile kibana` to your docker compose command.
In addition to the other components, this profile spins up [Kibana](https://www.elastic.co/kibana/).
Kibana can be used to explore the records exported by Zeebe into Elasticsearch, or to discover the data in Elasticsearch used by the other components (e.g. Operate).

You can navigate to the Kibana web app and start exploring the data without login credentials:

- Kibana: [http://localhost:5601](http://localhost:5601)

:::note

You need to configure the index patterns in Kibana before you can explore the data.

- Go to `Management > Stack Management > Kibana > Index Patterns`.
- Create a new index pattern. For example, `zeebe-record-*` matches the exported records.
  - If you don't see any indexes then make sure to export some data first (e.g. deploy a process). The indexes of the records are created when the first record of this type is exported.
- Go to `Analytics > Discover` and select the index pattern.

:::
