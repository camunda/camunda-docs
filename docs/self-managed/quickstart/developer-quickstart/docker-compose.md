---
id: docker-compose
title: "Developer quickstart with Docker Compose"
sidebar_label: "Docker Compose"
description: "This quickstart guides application developers through deploying Camunda 8 Self-Managed to a local orchestration cluster on Docker Compose"
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import {DockerCompose} from "@site/src/components/CamundaDistributions";

Get started with Docker Compose to run Camunda 8 Self-Managed locally. The default lightweight configuration includes the Orchestration Cluster (Zeebe, Operate, and Tasklist consolidated), Connectors, and Elasticsearch. The full configuration additionally includes Optimize, Console, Management Identity, Web Modeler, Keycloak, and PostgreSQL. Docker Compose also supports document storage and management with [document handling](/self-managed/concepts/document-handling/overview.md).

:::note
The [Docker images](/self-managed/deployment/docker/docker.md) are supported for production usage; however, the Docker Compose files are intended for developers to run an environment locally and are **not** designed for production. For production deployments, use [Kubernetes with Helm](/self-managed/deployment/helm/install/index.md).
:::

## Prerequisites

The following prerequisites are required to run Camunda Self-Managed via Docker Compose:

| Prerequisite   | Description                                                                                                           |
| :------------- | :-------------------------------------------------------------------------------------------------------------------- |
| Docker Compose | Version 1.27.0 or later (supports the [latest Compose specification](https://docs.docker.com/compose/compose-file/)). |
| Docker         | Version 20.10.16 or later.                                                                                            |

## Run Camunda 8 with Docker Compose

To start a complete Camunda 8 Self-Managed environment locally:

1. Download the artifact for Camunda 8 <DockerCompose/>, then extract it.
1. In the extracted directory, run:

   ```shell
   docker compose up -d
   ```

1. Wait for the environment to initialize (this can take several minutes). Monitor the logs (especially the Keycloak container log) to ensure all components start.

:::note c8run with Docker
If you start Docker Compose via `./c8run start --docker` (or `.\c8run.exe start --docker`), override environment variables in the `docker-compose/.env` file included in the distribution. Passing variables inline on the command line is ignored because the Camunda 8 Run helper script invokes Docker Compose via that `.env` file.
:::

### Docker Compose configurations

Camunda provides three Docker Compose configurations in the [Camunda Distributions repository](https://github.com/camunda/camunda-distributions):

| Configuration File              | Description                                                                                                                                                                                                                                                                       |
| :------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| docker-compose.yaml             | **Default lightweight configuration** - Includes the core Orchestration Cluster (Zeebe, Operate, and Tasklist combined), Connectors, and Elasticsearch. Ideal for most developers who want to model, deploy, and test processes.                                                  |
| docker-compose-full.yaml        | **Full-stack configuration** - Includes all Camunda 8 components including the Orchestration Cluster, Connectors, Optimize, Console, Management Identity, Keycloak, PostgreSQL, and Web Modeler. Use this when you need management components, process optimization, or modeling. |
| docker-compose-web-modeler.yaml | **Standalone Web Modeler** - Runs only Web Modeler and its dependencies (Identity, Keycloak, PostgreSQL). See [Deploy with Web Modeler](#deploy-with-web-modeler).                                                                                                                |

### Access components

Once the containers are running, you can access the components in your browser.

You can log in to the component web interfaces with the default credentials:

- **Username:** `demo`
- **Password:** `demo`

#### Orchestration Cluster (lightweight and full configurations)

The Orchestration Cluster is the core of Camunda 8, providing process automation capabilities.

| Component                      | URL                                                              | Description                                                                                                                                                                                                                |
| :----------------------------- | :--------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Operate                        | [http://localhost:8088/operate](http://localhost:8088/operate)   | Monitor and troubleshoot process instances. See [Introduction to Operate](../../../components/operate/operate-introduction.md) and [Process instance creation](../../../components/concepts/process-instance-creation.md). |
| Tasklist                       | [http://localhost:8088/tasklist](http://localhost:8088/tasklist) | Complete user tasks in running process instances. See [User tasks](../../../components/modeler/bpmn/user-tasks/user-tasks.md).                                                                                             |
| Orchestration Cluster Identity | [http://localhost:8088/identity](http://localhost:8088/identity) | Manage users and permissions for Orchestration Cluster (lightweight).                                                                                                                                                      |
| Orchestration Cluster REST API | `http://localhost:8088/v2`                                       | REST API for process automation.                                                                                                                                                                                           |
| Orchestration Cluster gRPC API | `localhost:26500`                                                | gRPC API for high-performance process automation.                                                                                                                                                                          |

:::note
By default, the Orchestration Cluster uses [basic authentication](/self-managed/concepts/authentication/authentication-to-orchestration-cluster.md#basic-authentication). The full configuration uses Keycloak for [Management Identity authentication](/self-managed/concepts/authentication/authentication-to-management-components.md).
:::

#### Management and modeling components (full configuration only)

| Component           | URL                                            | Description                                                                                                                                                                                          |
| :------------------ | :--------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Console             | [http://localhost:8087](http://localhost:8087) | [Manage clusters](../../../components/console/introduction-to-console.md) and component configurations                                                                                               |
| Optimize            | [http://localhost:8083](http://localhost:8083) | [Analyze and improve](../../../components/optimize/what-is-optimize.md) process performance                                                                                                          |
| Management Identity | [http://localhost:8084](http://localhost:8084) | [Manage users](../../../components/identity/identity-introduction.md) for Console, Optimize, and Web Modeler                                                                                         |
| Web Modeler         | [http://localhost:8070](http://localhost:8070) | Model [BPMN](../../../components/modeler/bpmn/bpmn.md) processes, [DMN](../../../components/modeler/dmn/dmn.md) decisions, and [forms](../../../components/modeler/forms/camunda-forms-reference.md) |

#### External dependencies

| Component     | Configuration        | URL                                                          | Description                                                                                                                                                   |
| :------------ | :------------------- | :----------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Elasticsearch | Lightweight and full | [http://localhost:9200](http://localhost:9200)               | Used by the Orchestration Cluster as secondary storage (and Optimize in the full configuration).                                                              |
| Keycloak      | Full                 | [http://localhost:18080/auth/](http://localhost:18080/auth/) | OIDC provider for Management Identity. The lightweight configuration uses the embedded Orchestration Cluster Identity instead. Access with `admin` / `admin`. |
| PostgreSQL    | Full                 | `localhost:5432`                                             | Database for Management Identity.                                                                                                                             |

#### Configuration files and options

To start specific configurations:

- **Lightweight (default)**

  ```shell
  docker compose up -d
  ```

- **Full configuration**

  ```shell
  docker compose -f docker-compose-full.yaml up -d
  ```

- **Standalone Web Modeler**

  ```shell
  docker compose -f docker-compose-web-modeler.yaml up -d
  ```

### Authentication

#### Lightweight configuration (default)

- **Web UI**: Log in to Operate and Tasklist with `demo` / `demo`
- **APIs**: REST and gRPC APIs are publicly accessible (no authentication required)

#### Full configuration

- **Web UI**: Log in to all components (Operate, Tasklist, Console, Optimize, Web Modeler) with `demo` / `demo`.
- **APIs**: REST and gRPC APIs require OAuth authentication with the following settings:
  - **Client ID**: `orchestration` (from `ORCHESTRATION_CLIENT_ID` in the `.env` file)
  - **Client Secret**: `secret` (from `ORCHESTRATION_CLIENT_SECRET` in the `.env` file)
  - **OAuth URL**: `http://localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/token`
  - **Audience**: `orchestration-api`

  For details, see the [REST API authentication guide](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-authentication.md).

### Stop Camunda 8

To stop all containers and remove associated data:

```shell
docker compose down -v

# or for the full configuration:
docker compose -f docker-compose-full.yaml down -v
```

:::caution
The `-v` flag deletes all volumes, removing all data (process instances, users, etc.). Omit `-v` to keep your data.
:::

## Connectors

Both the lightweight and full Docker Compose configurations include Camunda Connectors for integrating with external systems. The connector runtime executes both outbound connectors (called from BPMN processes) and inbound connectors (triggering process instances from external events).

For details on available connectors and how to use them, see:

- [Available connectors](/components/connectors/out-of-the-box-connectors/available-connectors-overview.md)
- [Connector installation guide](/self-managed/components/connectors/overview.md)

### Connector secrets

When running Camunda locally with Docker Compose, some [connectors](../../../components/connectors/out-of-the-box-connectors/available-connectors-overview.md) require authentication credentials or API keys to connect with external services (for example, Slack, SendGrid, or AWS). These values should be stored securely as secrets instead of being hardcoded in your process models.

You can add secrets to the connector runtime using the included `connector-secrets.txt` file:

1. Open `connector-secrets.txt` in the extracted directory.
1. Add secrets in the format `NAME=VALUE`, one per line:
   ```
   SLACK_TOKEN=xoxb-your-token-here
   SENDGRID_API_KEY=SG.your-api-key
   ```
1. Save the file. The secrets become available in connector configurations using the syntax `{{secrets.NAME}}`. For example, `{{secrets.SLACK_TOKEN}}`.

:::warning
Do not commit `connector-secrets.txt` to version control with real credentials. Use placeholder values in the repository and configure actual secrets in each environment.
:::

For more details, see the [connector secrets documentation](../../components/connectors/connectors-configuration.md).

### Custom connectors

In addition to the built-in connectors, you can add your own custom connectors.

To include custom connectors:

- **Option 1:** Create a new Docker image that bundles your connectors, as described in the [Connectors repository](https://github.com/camunda/connectors).
- **Option 2:** Mount the connector JARs as volumes into the `/opt/app` directory in the Docker Compose file.

Each connector JAR must include all required dependencies inside the JAR to run correctly.

## Modeling and process execution

You can deploy and execute processes using either Desktop Modeler or Web Modeler.

### Deploy with Desktop Modeler

[Desktop Modeler](https://camunda.com/download/modeler/) is a free, open-source desktop application for modeling BPMN, DMN, and Camunda Forms.

#### Lightweight configuration

To deploy from Desktop Modeler to the lightweight configuration:

1. Open Desktop Modeler and click the deployment icon (rocket symbol).
1. Select **Camunda 8 Self-Managed**.
1. Configure the connection:
   - **Cluster endpoint**: `http://localhost:26500`
   - **Authentication**: Select **None** (no authentication required by default)
1. Click **Deploy**.

For more details, see the [Desktop Modeler deployment guide](/self-managed/components/modeler/desktop-modeler/deploy-to-self-managed.md).

#### Full configuration

To deploy from Desktop Modeler to the full configuration:

1. Open Desktop Modeler and click the deployment icon.
1. Select **Camunda 8 Self-Managed**.
1. Configure the connection:
   - **Cluster endpoint**: `http://localhost:26500`
   - **Authentication**: Select **OAuth**
   - **OAuth URL**: `http://localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/token`
   - **Client ID**: `orchestration` (from `.env` file: `ORCHESTRATION_CLIENT_ID`)
   - **Client Secret**: `secret` (from `.env` file: `ORCHESTRATION_CLIENT_SECRET`)
   - **Audience**: `orchestration-api`
1. Click **Deploy**.

:::tip
The full configuration uses Keycloak for OIDC authentication. The client credentials (`orchestration` / `secret`) are pre-configured in the `.env` file and Identity configuration.
:::

### Deploy with Web Modeler

:::info
Non-production installations of Web Modeler are limited to five collaborators per project. See [licensing](/reference/licenses.md).
:::

[Web Modeler](../../../components/modeler/web-modeler/launch-web-modeler.md) provides a browser-based interface for creating and deploying BPMN, DMN, and form diagrams.  
It is included in the full configuration by default but can also run as a standalone setup.

#### Standalone setup

To start Web Modeler and its dependencies independently, run:

```shell
docker compose -f docker-compose-web-modeler.yaml up -d
```

To stop and remove all data and volumes, run:

```shell
docker compose -f docker-compose-web-modeler.yaml down -v
```

#### Deploy or execute a process

When using the full configuration, Web Modeler connects automatically to the local Orchestration Cluster started by `docker-compose-full.yaml`. You can deploy and run processes directly from the Web Modeler interface.

1. Log in to Web Modeler at [http://localhost:8070](http://localhost:8070) with `demo` / `demo`.
1. [Create a new project](../../../components/modeler/web-modeler/launch-web-modeler.md) or open an existing BPMN diagram.
1. Use the visual modeler to [design your BPMN process](../../../components/modeler/bpmn/bpmn.md).
1. Click **Deploy** to deploy the diagram to the pre-configured Orchestration Cluster.
1. After deployment, you can [create process instances](../../../components/concepts/process-instance-creation.md) and monitor them in [Operate](http://localhost:8088/operate).

Web Modeler uses the `BEARER_TOKEN` authentication method to communicate with the Orchestration Cluster. The user's authentication token from Management Identity is automatically used for deployment.

:::note
Web Modeler is not included in the lightweight configuration. To use Web Modeler with the lightweight configuration:

1. Run Web Modeler separately using `docker-compose-web-modeler.yaml`.
1. Manually configure the cluster connection in Web Modeler's configuration.
1. Use `NONE` or `BASIC` authentication for the lightweight Orchestration Cluster.

See the [Web Modeler cluster configuration guide](/self-managed/components/modeler/web-modeler/configuration/configuration.md#clusters) for details.
:::

#### Emails

The Docker Compose setup includes [Mailpit](https://github.com/axllent/mailpit) as a test SMTP server. Mailpit captures all emails sent by Web Modeler but does not forward them to the actual recipients.

You can access emails in Mailpit's web UI at [http://localhost:8075](http://localhost:8075).

## Next steps

Now that you have Camunda 8 running locally, explore these resources:

- **Getting started**: Follow the [getting started guide](../../../guides/getting-started-example.md) to create a Java project and connect to your local cluster.
- **BPMN modeling**: Learn [BPMN fundamentals](../../../components/modeler/bpmn/bpmn-primer.md) and [best practices](../../../components/best-practices/best-practices-overview.md).
- **User tasks**: Implement [user tasks and forms](../../../components/modeler/bpmn/user-tasks/user-tasks.md) for human workflows.
- **Connectors**: Explore [out-of-the-box connectors](../../../components/connectors/out-of-the-box-connectors/available-connectors-overview.md) for common integrations.
- **APIs**: Use the [Orchestration Cluster REST API](../../../apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md) or [client libraries](../../../apis-tools/working-with-apis-tools.md) to interact programmatically.
- **Production deployment**: When ready, deploy to production with [Kubernetes and Helm](../../deployment/helm/install/index.md).
