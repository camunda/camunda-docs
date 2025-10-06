---
id: docker-compose
title: "Developer quickstart with Docker Compose"
sidebar_label: "Docker Compose"
description: "This quickstart guides application developers through deploying Camunda 8 Self-Managed to a local orchestration cluster on Docker Compose"
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import {DockerCompose} from "@site/src/components/CamundaDistributions";

Get started with Docker Compose configurations to run Camunda Self-Managed. The default lightweight configuration includes the Orchestration Cluster (Zeebe, Operate, and Tasklist consolidated), Connectors, and Elasticsearch. The full configuration additionally includes Optimize, Console, Management Identity, Web Modeler, Keycloak, and PostgreSQL. Docker Compose also supports document storage and management with [document handling](/self-managed/concepts/document-handling/overview.md).

:::note
While the [Docker images](/self-managed/setup/deploy/other/docker/) themselves are supported for production usage, the Docker Compose files are designed to be used by developers to run an environment locally; they are not designed to be used in production. We recommend [Kubernetes](/self-managed/setup/install/) for production.
:::

## Prerequisites

The following prerequisites are required to run Camunda Self-Managed via Docker Compose:

| Prerequisite   | Description                                                                                                            |
| :------------- | :--------------------------------------------------------------------------------------------------------------------- |
| Docker Compose | Version 1.27.0 or higher (supports the [latest compose specification](https://docs.docker.com/compose/compose-file/)). |
| Docker         | Version 20.10.16 or higher.                                                                                            |

## Run Camunda 8 with Docker Compose

To start a complete Camunda 8 Self-Managed environment locally:

1. Download the artifact for Camunda 8 <DockerCompose/>, then extract it.
2. Run the following command in the extracted directory:

   ```shell
   docker compose up -d
   ```

3. Wait for the environment to initialize (this can take several minutes). Monitor the logs (especially the Keycloak container log) to ensure the components have started.

### Access components

You can log in to the component web interfaces with the default credentials:

- **Username:** `demo`
- **Password:** `demo`

### Configuration options

The [Camunda Distributions repository](https://github.com/camunda/camunda-distributions) provides three Docker Compose configurations:

| Configuration File              | Description                                                                                                                                                                                                                                                                       |
| :------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| docker-compose.yaml             | **Default lightweight configuration** - Contains the Orchestration Cluster (consolidated Zeebe, Operate, and Tasklist), Connectors, and Elasticsearch. This is the recommended starting point for most users and process development workflows.                                   |
| docker-compose-full.yaml        | **Full-stack configuration** - Contains all Camunda 8 components including the Orchestration Cluster, Connectors, Optimize, Console, Management Identity, Keycloak, PostgreSQL, and Web Modeler. Use this when you need management components, process optimization, or modeling. |
| docker-compose-web-modeler.yaml | **Standalone Web Modeler** - Contains only Web Modeler and its dependencies (Identity, Keycloak, PostgreSQL). For more information, see the [Web Modeler instructions](#web-modeler).                                                                                             |

To start the default lightweight configuration, run:

```shell
docker compose up -d
```

To start the full-stack configuration, specify the configuration file:

```shell
docker compose -f docker-compose-full.yaml up -d
```

#### Orchestration Cluster (available in both configurations)

The Orchestration Cluster is the core of Camunda 8, providing process automation capabilities.

| Component                      | URL                                                              | Description                                                                                                                                                    |
| :----------------------------- | :--------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Operate                        | [http://localhost:8088/operate](http://localhost:8088/operate)   | [Monitor and troubleshoot](../../../components/operate/operate-introduction.md) [process instances](../../../components/concepts/process-instance-creation.md) |
| Tasklist                       | [http://localhost:8088/tasklist](http://localhost:8088/tasklist) | Complete [user tasks](../../../components/modeler/bpmn/user-tasks/user-tasks.md) in running process instances                                                  |
| Orchestration Cluster Identity | [http://localhost:8088/identity](http://localhost:8088/identity) | Manage users and permissions for Orchestration Cluster (lightweight)                                                                                           |
| Orchestration Cluster REST API | `http://localhost:8088/v2`                                       | REST API for process automation                                                                                                                                |
| Orchestration Cluster gRPC API | `localhost:26500`                                                | gRPC API for high-performance process automation                                                                                                               |

:::note
By default, the Orchestration Cluster uses [basic authentication](/self-managed/concepts/authentication/authentication-to-orchestration-cluster.md#basic-authentication). The full configuration uses Keycloak for [Management Identity authentication](/self-managed/concepts/authentication/authentication-to-management-components.md).
:::

#### Management and modeling components (only in full configuration)

| Component           | URL                                            | Description                                                                                                                                                                                          |
| :------------------ | :--------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Console             | [http://localhost:8087](http://localhost:8087) | [Manage clusters](../../../components/console/introduction-to-console.md) and component configurations                                                                                               |
| Optimize            | [http://localhost:8083](http://localhost:8083) | [Analyze and improve](../../../components/optimize/what-is-optimize.md) process performance                                                                                                          |
| Management Identity | [http://localhost:8084](http://localhost:8084) | [Manage users](../../../components/identity/identity-introduction.md) for Console, Optimize, and Web Modeler                                                                                         |
| Web Modeler         | [http://localhost:8070](http://localhost:8070) | Model [BPMN](../../../components/modeler/bpmn/bpmn.md) processes, [DMN](../../../components/modeler/dmn/dmn.md) decisions, and [forms](../../../components/modeler/forms/camunda-forms-reference.md) |

#### External dependencies

| Component     | Configuration | URL                                                          | Description                                                                                                                                                                |
| :------------ | :------------ | :----------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Elasticsearch | Both          | [http://localhost:9200](http://localhost:9200)               | Used by the Orchestration Cluster (as secondary storage) and Optimize (full config only).                                                                                  |
| Keycloak      | Full only     | [http://localhost:18080/auth/](http://localhost:18080/auth/) | OIDC provider for Management Identity. The lightweight config uses the embedded Orchestration Cluster Identity instead. Access with username `admin` and password `admin`. |
| PostgreSQL    | Full only     | `localhost:5432`                                             | Database for Management Identity and Web Modeler metadata. Not needed in the lightweight config.                                                                           |

### Authentication

#### Lightweight configuration (default)

- **Web UI**: Log in to Operate and Tasklist with `demo` / `demo`
- **APIs**: REST and gRPC APIs are publicly accessible (no authentication required)

#### Full configuration

- **Web UI**: Log in to all components (Operate, Tasklist, Console, Optimize, Web Modeler) with `demo` / `demo`
- **APIs**: REST and gRPC APIs require OAuth authentication (use client ID `orchestration` and secret `secret` from the `.env` file)

### Stop Camunda 8

Stop and remove all data:

```shell
docker compose down -v
# or for full config:
docker compose -f docker-compose-full.yaml down -v
```

:::caution
The `-v` flag deletes all volumes, removing any data you have created (process instances, user data, etc.). Omit `-v` to keep your data.
:::

## Connectors

Both the default lightweight and full-stack Docker Compose configurations include Camunda Connectors for integrating with external systems. The connector runtime executes both outbound connectors (called from BPMN processes) and inbound connectors (triggering process instances from external events).

For details on available connectors and how to use them, see:

- [Available connectors](/components/connectors/out-of-the-box-connectors/available-connectors-overview.md)
- [Connector installation guide](/self-managed/components/connectors/overview.md)

### Connector secrets

Many [connectors](../../../components/connectors/out-of-the-box-connectors/available-connectors-overview.md) require authentication credentials or API keys to interact with external services (e.g., Slack API tokens, SendGrid keys, AWS credentials). These sensitive values should be stored as secrets rather than hardcoded in your process models.

Secrets can be added into the connector runtime using the included `connector-secrets.txt` file:

1. Open `connector-secrets.txt` in the extracted directory
2. Add secrets in the format `NAME=VALUE`, one per line:
   ```
   SLACK_TOKEN=xoxb-your-token-here
   SENDGRID_API_KEY=SG.your-api-key
   ```
3. The secrets will be available in connector configurations using the syntax `{{secrets.NAME}}` (e.g., `{{secrets.SLACK_TOKEN}}`)

:::warning
Do not commit `connector-secrets.txt` to version control with real credentials. Use placeholder values in the repository and configure actual secrets in each environment.
:::

For more details, see the [connector secrets documentation](../../components/connectors/connectors-configuration.md).

### Custom connectors

To add custom connectors, create a new Docker image, bundling them as described in the [Connectors repository](https://github.com/camunda/connectors).

Alternatively, you can mount new connector JARs as volumes into the `/opt/app` folder by adding this to the Docker Compose file. Keep in mind that connector JARs must include all necessary dependencies inside the JAR.

## Modeling and process execution

You can deploy and execute processes using either Desktop Modeler or Web Modeler.

### Deploy with Desktop Modeler

[Desktop Modeler](https://camunda.com/download/modeler/) is a free, open-source desktop application for modeling BPMN, DMN, and Camunda Forms.

#### Lightweight configuration

To deploy from Desktop Modeler to the lightweight configuration:

1. Open Desktop Modeler and click the deployment icon (rocket shape).
2. Select **Camunda 8 Self-Managed**.
3. Configure the connection:
   - **Cluster endpoint**: `http://localhost:26500`
   - **Authentication**: Select **None** (no authentication required by default)
4. Click **Deploy**.

For more details, see the [Desktop Modeler deployment guide](/self-managed/components/modeler/desktop-modeler/deploy-to-self-managed.md).

#### Full configuration

To deploy from Desktop Modeler to the full configuration:

1. Open Desktop Modeler and click the deployment icon.
2. Select **Camunda 8 Self-Managed**.
3. Configure the connection:
   - **Cluster endpoint**: `http://localhost:26500`
   - **Authentication**: Select **OAuth**
   - **OAuth URL**: `http://localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/token`
   - **Client ID**: `orchestration` (from `.env` file: `ORCHESTRATION_CLIENT_ID`)
   - **Client Secret**: `secret` (from `.env` file: `ORCHESTRATION_CLIENT_SECRET`)
   - **Audience**: `orchestration-api`
4. Click **Deploy**.

:::tip
The full configuration uses Keycloak for OIDC authentication. The client credentials (`orchestration` / `secret`) are pre-configured in the `.env` file and Identity configuration.
:::

### Deploy with Web Modeler

:::info
Non-production installations of Web Modeler are limited to five collaborators per project. See [licensing](/reference/licenses.md).
:::

#### Standalone setup

Web Modeler is included by default when running the `docker-compose-full.yaml` configuration but can also be run independently with Identity, Keycloak, and Postgres as dependencies.

The following command uses the provided `docker-compose-web-modeler.yaml` configuration file to start only Web Modeler and its dependencies:

```shell
docker compose -f docker-compose-web-modeler.yaml up -d
```

To tear down the environment (including all data and volumes), run the following command:

```shell
docker compose -f docker-compose-web-modeler.yaml down -v
```

#### Deploy or execute a process

The local Orchestration Cluster started by the `docker-compose-full.yaml` is pre-configured in Web Modeler, so you can deploy directly from the UI:

1. Log in to Web Modeler at [http://localhost:8070](http://localhost:8070) with `demo` / `demo`.
2. [Create a new project](../../../components/modeler/web-modeler/launch-web-modeler.md) or open an existing BPMN diagram.
3. Use the visual modeler to [design your BPMN process](../../../components/modeler/bpmn/bpmn.md).
4. Click the **Deploy** button to deploy the diagram to the pre-configured Orchestration Cluster.
5. After deployment, you can [create process instances](../../../components/concepts/process-instance-creation.md) and monitor them in [Operate](http://localhost:8088/operate).

Web Modeler uses the `BEARER_TOKEN` authentication method to communicate with the Orchestration Cluster. The user's authentication token from Management Identity is automatically used for deployment.

:::note
Web Modeler is not included in the lightweight configuration. To use Web Modeler with the lightweight config, you would need to:

1. Run Web Modeler separately using `docker-compose-web-modeler.yaml`
2. Manually configure the cluster connection in Web Modeler's configuration
3. Use `NONE` or `BASIC` authentication for the lightweight Orchestration Cluster

See the [Web Modeler cluster configuration guide](/self-managed/components/modeler/web-modeler/configuration/configuration.md#clusters) for details.
:::

#### Emails

The provided configuration includes [Mailpit](https://github.com/axllent/mailpit) as a test SMTP server. It captures all emails sent by Web Modeler but does not forward them to the actual recipients.

You can access emails in Mailpit's web UI at [http://localhost:8075](http://localhost:8075).

## Next steps

Now that you have Camunda 8 running locally, explore these resources:

- **Getting started**: Follow the [getting started guide](../../../guides/getting-started-example.md) to create a Java project and connect to your local cluster
- **BPMN modeling**: Learn [BPMN fundamentals](../../../components/modeler/bpmn/bpmn-primer.md) and [best practices](../../../components/best-practices/best-practices-overview.md)
- **User tasks**: Implement [user tasks and forms](../../../components/modeler/bpmn/user-tasks/user-tasks.md) for human workflows
- **Connectors**: Explore [out-of-the-box connectors](../../../components/connectors/out-of-the-box-connectors/available-connectors-overview.md) for common integrations
- **APIs**: Use the [Orchestration Cluster REST API](../../../apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md) or [client libraries](../../../apis-tools/working-with-apis-tools.md) to interact programmatically
- **Production deployment**: When ready, deploy to production with [Kubernetes and Helm](../../deployment/helm/install/index.md)
