---
id: c8run
title: "Developer quickstart – Camunda 8 Run"
sidebar_label: "Camunda 8 Run"
description: "This quickstart guides application developers through deploying Camunda 8 Self-Managed to a local orchestration cluster using Camunda 8 Run."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import {C8Run} from "@site/src/components/CamundaDistributions";

:::note
Camunda 8 Run is not supported for production use.
:::

Camunda 8 Run enables you to run [Orchestration cluster](../../../../reference/glossary#orchestration-cluster), including Zeebe, Operate, Tasklist, Identity, and Elasticsearch, with minimal configuration. It is intended for developers who want to model BPMN diagrams, deploy them, and interact with running process instances in a simple environment. This guide explains how to get started on your local or virtual machine.

Camunda 8 Run includes the following:

- Orchestration Cluster
- Connectors
- Elasticsearch

Camunda 8 Run also supports document storage and management with [document handling](/self-managed/concepts/document-handling/overview.md).

## Prerequisites

- **OpenJDK 21–23**: Required for running Camunda 8 as a Java application.
- **Docker 20.10.21+**: Required for running Camunda 8 via Docker Compose.
- **[Desktop Modeler](/components/modeler/desktop-modeler/install-the-modeler.md)**
- **If using Ubuntu**: Ubuntu 22.04 or newer

:::note
After installing OpenJDK, ensure `JAVA_HOME` is set by running `java -version` in a **new** terminal.

If no version of Java is found, follow your chosen installation's instructions for setting `JAVA_HOME` before continuing.
:::

## Install and start Camunda 8 Run

1. Download the latest release of <C8Run/> for your operating system and architecture. Opening the `.tgz` file extracts the Camunda 8 Run script into a new directory.
2. Navigate to the new `c8run` directory.
3. Start Camunda 8 Run by running one of the following in your terminal:

- On Mac and Linux:
  - Run the helper script: `./start.sh`
  - Or use the CLI command: `./c8run start`
- On Windows:
  - Use the CLI command: `.\c8run.exe start`

If startup is successful, a browser window for Operate will open automatically. Alternatively, you can access Operate at [http://localhost:8080/operate](http://localhost:8080/operate).

To start Camunda 8 in Docker Compose using C8Run you can use the following option. It is equivalent of running `docker compose up -d` :

- On Mac and Linux: `./start.sh --docker`
- On Windows: `.\c8run.exe start --docker`

When started with Docker, Operate will be available at [http://localhost:8088/operate](http://localhost:8088/operate).

:::note
If Camunda 8 Run fails to start, run the [shutdown script](#shut-down-camunda-8-run) to end the current processes, then run the start script again.
:::

### Configuration options

The following options provide a convenient way to override settings for quick tests and interactions in Camunda 8 Run.  
For more advanced or permanent configuration, modify the default `configuration/application.yaml` or supply a custom file using the `--config` flag (e.g., [to enable authentication and authorization](#enable-authentication-and-authorization)).

| Argument                   | Description                                                                                                                                                                                                                                                                                                                                                                                                                   |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--config <path>`          | Applies the specified Zeebe [`application.yaml`](/self-managed/components/orchestration-cluster/zeebe/configuration/configuration.md).                                                                                                                                                                                                                                                                                        |
| `--username <arg>`         | Configures the first user’s username as `<arg>`.                                                                                                                                                                                                                                                                                                                                                                              |
| `--password <arg>`         | Configures the first user’s password as `<arg>`.                                                                                                                                                                                                                                                                                                                                                                              |
| `--keystore <arg>`         | Configures the TLS certificate for HTTPS. If not specified, HTTP is used. For more information, see [enabling TLS](#enable-tls).                                                                                                                                                                                                                                                                                              |
| `--keystorePassword <arg>` | Provides the password for the JKS keystore file.                                                                                                                                                                                                                                                                                                                                                                              |
| `--port <arg>`             | Sets the Camunda core port (default: `8080`).                                                                                                                                                                                                                                                                                                                                                                                 |
| `--log-level <arg>`        | Sets the log level for the Camunda core.                                                                                                                                                                                                                                                                                                                                                                                      |
| `--docker`                 | Downloads and runs the Camunda Docker Compose distribution. This option provide an easy shortcut to run Camunda in Docker Compose. However, additional C8Run options are not supported and will be ignored. For more information on running Camunda with Docker Compose see the [documentation](./docker-compose.md). See the [shutdown script](#shut-down-camunda-8-run) for information on stopping the Docker application. |
| `--disable-elasticsearch`  | Prevents the built-in Elasticsearch from starting. Ensure another Elasticsearch instance is provided via `--config`. See the [external Elasticsearch](#start-external-elasticsearch) section for details.                                                                                                                                                                                                                     |
| `--startup-url`            | The URL to open after startup (e.g., `'http://localhost:8080/operate'`). By default, Operate is opened.                                                                                                                                                                                                                                                                                                                       |

## Work with Camunda 8 Run

### Access Camunda components

Camunda 8 Run uses basic authentication with demo/demo for all web interfaces. OIDC/Keycloak is not included in this distribution.
You can log in to all web interfaces using with the default credentials:

- **Username:** `demo`
- **Password:** `demo`

These web interfaces are available at:

- **Operate:** http://localhost:8080/operate
- **Tasklist:** http://localhost:8080/tasklist
- **Identity:** http://localhost:8080/identity

The following components do not have a web interface, but their endpoints are useful for additional configuration:

- **Orchestration Cluster REST API:** http://localhost:8080/v2/
- **Inbound Connectors API:** http://localhost:8086/
- **Zeebe API (gRPC):** http://localhost:26500/
- **Metrics (Prometheus):** http://localhost:9600/actuator/prometheus
- **Swagger UI (API Explorer):** http://localhost:8080/swagger-ui/index.html

:::note

- The URLs for the Docker Compose application can be found in the [Docker Compose](#docker-compose) documentation.
- The Connectors API does not provide a web interface. If you access its URL in a browser, you may see a login page, but it cannot be used to sign in. Use the API endpoints directly instead.
  :::

### Deploy diagrams from Desktop Modeler

Make sure you have installed [Desktop Modeler](/components/modeler/desktop-modeler/install-the-modeler.md) before continuing.

To [deploy diagrams](/self-managed/components/modeler/desktop-modeler/deploy-to-self-managed.md) from Desktop Modeler, use the following configuration:

- **Target:** Self-Managed
- **Cluster endpoint:** `http://localhost:26500` (Zeebe Gateway)
- **Authentication:** None

A success notification will display when complete. [Start a new process instance](/components/modeler/desktop-modeler/start-instance.md) to view your running process in Operate.

### Use built-in and custom connectors

Desktop Modeler [automatically fetches](/components/modeler/desktop-modeler/use-connectors.md#automatic-connector-template-fetching) templates for pre-built connectors. [Custom connectors](/components/connectors/custom-built-connectors/connector-sdk.md) can also be added to your Camunda 8 Run distribution.

To add a custom connector:

1. Place the connector’s `.jar` file in the `/custom_connectors` folder within the `/c8run` directory.
2. Place the element template in the appropriate folder for your installation. See [Search Paths](/components/modeler/desktop-modeler/search-paths/search-paths.md) for more information.

Once configured, your connectors are available for use in Modeler.

### Configure Connector secrets

Connector Secrets can be provided as environment variables by adding them to the `.env` file in the root folder.

When starting C8Run with the `--docker` option, add the connector secrets to the `connector-secrets.txt` file in the docker-compose folder.

### Use Camunda APIs

All APIs **do not require authentication by default** in Camunda 8 Run and can be accessed without credentials or tokens.

Available APIs include:

- [Orchestration Cluster REST API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md)
- [Zeebe gRPC](/apis-tools/zeebe-api/grpc.md)

### Enable authentication and authorization

By default, Camunda 8 Run configures authentication for web interfaces (demo/demo) but all API endpoints are open and do not require authentication. To secure APIs, enable authorization in application.yaml.

You can either:

- Update the existing `configuration/application.yaml`, or
- Create a new `application.yaml` in the `/c8run` folder and pass it at startup using the [`--config` flag](#configuration-options):

```yaml
camunda:
  security:
    authentication:
      # Require authentication for API requests
      unprotected-api: false
    authorizations:
      # Enable authorization checks
      enabled: true
```

Start C8Run with the configuration:

```bash
./start.sh --config application.yaml
```

Once enabled, API requests must include valid credentials. For example:

```shell
curl --request GET 'http://localhost:8080/v2/topology'  \
  -u demo:demo \
  --header 'Content-Type: application/json' \
  --data-raw '{}'
```

To add additional users (e.g., an admin user), extend the configuration:

```yaml
camunda:
  security:
    initialization:
      users:
        - username: user
          password: user
          name: user
          email: user@example.com
      defaultRoles:
        admin:
          users:
            - user
```

## Shut down Camunda 8 Run

To shut down (non-Docker) Camunda 8 Run and end all running processes, run the following command from the `c8run` directory:

```bash
./shutdown.sh

# Windows:
# .\c8run.exe stop
```

If you started Camunda 8 Run with Docker `./start.sh --docker`, run the following command instead:

```bash
# Stop containers but keep existing data
docker compose -f docker-compose-8.8/docker-compose.yaml down
# (older bundles use: docker/docker-compose.yml)

# Stop containers and remove all data volumes
docker compose -f docker-compose-8.8/docker-compose.yaml down -v
```

The `-v` option removes all Docker volumes, including persisted data such as users and process instances. Omit `-v` if you want to keep your existing data for the next startup.

To confirm that Camunda 8 Run has stopped, check for active containers:

```bash
docker ps
```

## Advanced options

### Enable TLS

TLS can be enabled by providing a local keystore file using the [`--keystore` and `--keystorePassword` configuration options](#configuration-options) at startup. Camunda 8 Run accepts `.jks` certificate files.
Although C8Run supports TLS, this is intended only for testing.

### Access metrics

Metrics are enabled in Camunda 8 Run by default and can be accessed at [http://localhost:9600/actuator/prometheus](http://localhost:9600/actuator/prometheus). For more information, see the [metrics](/self-managed/operational-guides/monitoring/metrics.md) documentation.

### Start external Elasticsearch

By default, Camunda 8 Run starts with an embedded Elasticsearch.
To use an external instance, run Camunda 8 Run without its built-in Elasticsearch and connect it to your own instance.

1. Start a single-node Elasticsearch container with security disabled:

   ```bash
   docker run \
       -m 1GB \
       -d \
       --name elasticsearch \
       -p 9200:9200 \
       -p 9300:9300 \
       -e "discovery.type=single-node" \
       -e "xpack.security.enabled=false" \
       elasticsearch:8.15.2
   ```

1. Configure Camunda 8 Run by creating an `application.yaml` file that points to your external Elasticsearch:

   ```yaml
   camunda:
     data:
       secondary-storage:
         elasticsearch:
           url: "http://127.0.0.1:9200/"
   ```

1. Start Camunda 8 Run with the `--disable-elasticsearch` flag to prevent it from starting its own instance, and provide your config:

   ```bash
   ./start.sh --disable-elasticsearch --config application.yaml
   ```

### Environment variables

The following advanced configuration options can be provided via environment variables:

| Variable       | Description                                                                                                                                       |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ES_JAVA_OPTS` | Allows you to override Java command line parameters for Elasticsearch. This can allow you to increase memory limits. **Default:** `-Xms1g -Xmx1g` |
| `JAVA_OPTS`    | Allows you to override Java command line parameters for Camunda.                                                                                  |

## Next steps

Check out the [getting started guide](/guides/getting-started-example.md) to start a new Java Project to connect to this local cluster.
