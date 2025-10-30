---
id: c8run
title: "Developer quickstart – Camunda 8 Run"
sidebar_label: "Camunda 8 Run"
description: "This quickstart guides application developers through deploying Camunda 8 Self-Managed to a local orchestration cluster using Camunda 8 Run."
---

import {C8Run} from "@site/src/components/CamundaDistributions";

:::note
Camunda 8 Run is not supported for production use.
:::

Camunda 8 Run enables you to run [Orchestration cluster](../../../../reference/glossary#orchestration-cluster), including Zeebe, Operate, Tasklist, Identity, and Elasticsearch, with minimal configuration. It is intended for developers who want to model BPMN diagrams, deploy them, and interact with running process instances in a simple environment. This guide explains how to get started on your local or virtual machine.

Camunda 8 Run includes the following:

- Orchestration Cluster
- Connectors
- Elasticsearch (default secondary storage)

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

To start Camunda 8 in Docker Compose using Camunda 8 Run you can use the following option. It is equivalent of running `docker compose up -d` :

- On Mac and Linux: `./start.sh --docker`
- On Windows: `.\c8run.exe start --docker`

When started with Docker, Operate will be available at [http://localhost:8088/operate](http://localhost:8088/operate).

:::note
If Camunda 8 Run fails to start, run the [shutdown script](#shut-down-camunda-8-run) to end the current processes, then run the start script again.
:::

### Configuration options

The following options provide a convenient way to override settings for quick tests and interactions in Camunda 8 Run.  
For more advanced or permanent configuration, modify the default `configuration/application.yaml` or supply a custom file using the `--config` flag (e.g., [to enable authentication and authorization](#enable-authentication-and-authorization)).

| Argument                   | Description                                                                                                                                                                                                                                                                                                                                                                                                                            |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--config <path>`          | Applies the specified Zeebe [`application.yaml`](/self-managed/components/orchestration-cluster/zeebe/configuration/configuration.md).                                                                                                                                                                                                                                                                                                 |
| `--username <arg>`         | Configures the first user’s username as `<arg>`.                                                                                                                                                                                                                                                                                                                                                                                       |
| `--password <arg>`         | Configures the first user’s password as `<arg>`.                                                                                                                                                                                                                                                                                                                                                                                       |
| `--keystore <arg>`         | Configures the TLS certificate for HTTPS. If not specified, HTTP is used. For more information, see [enabling TLS](#enable-tls).                                                                                                                                                                                                                                                                                                       |
| `--keystorePassword <arg>` | Provides the password for the JKS keystore file.                                                                                                                                                                                                                                                                                                                                                                                       |
| `--port <arg>`             | Sets the Camunda core port (default: `8080`).                                                                                                                                                                                                                                                                                                                                                                                          |
| `--log-level <arg>`        | Sets the log level for the Camunda core.                                                                                                                                                                                                                                                                                                                                                                                               |
| `--docker`                 | Downloads and runs the Camunda Docker Compose distribution. This option provides an easy shortcut to run Camunda in Docker Compose. However, additional Camunda 8 Run options are not supported and will be ignored. For more information on running Camunda with Docker Compose see the [documentation](./docker-compose.md). See the [shutdown script](#shut-down-camunda-8-run) for information on stopping the Docker application. |
| `--disable-elasticsearch`  | Prevents the built-in Elasticsearch from starting. Ensure another Elasticsearch instance is provided via `--config`. See the [external Elasticsearch](#start-external-elasticsearch) section for details.                                                                                                                                                                                                                              |
| `--startup-url`            | The URL to open after startup (e.g., `'http://localhost:8080/operate'`). By default, Operate is opened.                                                                                                                                                                                                                                                                                                                                |

## Work with Camunda 8 Run

### Access Camunda components

Camunda 8 Run uses basic authentication with demo/demo for all web interfaces. OIDC/Keycloak is not included in this distribution.  
You can log in to all web interfaces using the default credentials:

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
When starting Camunda 8 Run with the `--docker` option, add the connector secrets to the `connector-secrets.txt` file in the docker-compose folder.

### Use Camunda APIs

All APIs **do not require authentication by default** in Camunda 8 Run and can be accessed without credentials or tokens.

Available APIs include:

- [Orchestration Cluster REST API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md)
- [Zeebe gRPC](/apis-tools/zeebe-api/grpc.md)

### Enable authentication and authorization

By default, Camunda 8 Run configures authentication for web interfaces (demo/demo) but all API endpoints are open and do not require authentication.  
To secure APIs, enable authorization in `application.yaml`.

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

Start Camunda 8 Run with the configuration:

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

To shut down Camunda 8 Run and end all running processes, run `./shutdown.sh` (or `.\c8run.exe stop` on Windows) from the `c8run` directory.  
To shut down the Camunda 8 Run Docker distribution, use `./shutdown.sh --docker` (or `.\c8run.exe stop --docker` on Windows).

## Advanced configuration

### Enable TLS

TLS can be enabled by providing a local keystore file using the `--keystore` argument at startup. Camunda 8 Run accepts `.jks` certificate files.  
Although Camunda 8 Run supports TLS, this is intended only for testing.

### Access metrics

Metrics are enabled in Camunda 8 Run by default and can be accessed at [http://localhost:9600/actuator/prometheus](http://localhost:9600/actuator/prometheus).  
For more information, see the [metrics](/self-managed/operational-guides/monitoring/metrics.md) documentation.

### Configure secondary storage (Elasticsearch or H2)

Camunda 8 Run supports multiple secondary storage options.  
By default, it uses **Elasticsearch**, but you can switch to **H2** for lightweight local development.

In version **8.9-alpha1**, Camunda 8 Run starts with **Elasticsearch** as its default secondary storage.  
To test Camunda 8 Run using an **H2 database**, configure H2 as an alternative secondary storage. This is useful for development and local testing because it requires minimal setup and runs entirely in memory.

**Default (Elasticsearch) configuration:**

```yaml
data:
  secondary-storage:
    type: elasticsearch
```

**Optional (H2) configuration:**

```yaml
data:
  secondary-storage:
    type: rdbms
    rdbms:
      url: jdbc:h2:mem:camunda
      username: sa
      password:
      flushInterval: PT0.5S
      queueSize: 1000
```

H2 runs in memory by default. Data will be lost when you stop Camunda 8 Run.
To persist data, you can switch to a file-based H2 configuration such as:

```yaml
url: jdbc:h2:file:./camunda-data/h2db
```

:::warning
Operate and Tasklist are only supported with H2 once both applications have migrated to v2 APIs (expected in **8.9-alpha3**).  
In alpha1, use H2 for testing Camunda 8 Run only.
:::

### Primary vs. secondary storage

Camunda 8 uses two layers of storage:

- **Primary storage** is handled by the Zeebe broker to store workflow execution data.
- **Secondary storage** is used by applications like Operate, Tasklist, and Identity to read and present that data.

For more details on how these layers interact, see [secondary storage architecture](/self-managed/concepts/secondary-storage.md).  
Camunda 8 Run uses v2 APIs by default, so no additional configuration is required when H2 becomes the default in a future release.

### Switching between Elasticsearch and H2

To switch between storage types:

- **Use Elasticsearch (default)** – Remove or comment out the `data.secondary-storage` section in `application.yaml`.
- **Use H2** – Add the H2 configuration section to `application.yaml` and restart Camunda 8 Run.
- **Switch back to Elasticsearch** – Restore the default configuration or delete the H2 section.

Choose H2 for quick local development with minimal setup.  
Use Elasticsearch for closer alignment with production or when using Operate and Tasklist.

### Known limitations (8.9-alpha1)

- Operate and Tasklist are **not yet supported** when using H2.
- H2 is intended for **testing only** in this alpha release.
- Data stored in H2 is ephemeral unless configured as file-based.
- Performance and memory use may vary depending on local environment.

### Environment variables

The following advanced configuration options can be provided via environment variables:

| Variable       | Description                                                                                                                                       |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ES_JAVA_OPTS` | Allows you to override Java command line parameters for Elasticsearch. This can allow you to increase memory limits. **Default:** `-Xms1g -Xmx1g` |
| `JAVA_OPTS`    | Allows you to override Java command line parameters for Camunda.                                                                                  |

## Next steps

<!-- - Learn how to [configure a relational database](/self-managed/concepts/databases/relational-db/configuration.md). -->

- Explore the [Camunda 8 Run quickstart](/self-managed/setup/developers/c8run.md) for local testing with H2.
- Review [backup and restore for RDBMS](/self-managed/operational-guides/backup-restore/backup-and-restore.md).
