---
id: c8run
title: "Developer quickstart – Camunda 8 Run"
sidebar_label: "Camunda 8 Run"
description: "A quickstart guide for developers to deploy and run Camunda 8 Self-Managed locally with Camunda 8 Run, including setup, configuration, and key components."
---

import {C8Run} from "@site/src/components/CamundaDistributions";

:::note
Camunda 8 Run provides a lightweight, self-managed environment for local development and prototyping.
For production deployments, install the Orchestration Cluster manually as a Java application.
For detailed steps, see the [manual installation](../../../deployment/manual/install) guide.
:::

Camunda 8 Run enables you to run [Orchestration cluster](../../../../reference/glossary#orchestration-cluster), including Zeebe, Operate, Tasklist, Identity, and Elasticsearch, with minimal configuration. It is intended for developers who want to model BPMN diagrams, deploy them, and interact with running process instances in a simple environment. This guide explains how to get started on your local or virtual machine.

Camunda 8 Run includes the following:

- Orchestration Cluster
- Connectors
- Elasticsearch (default [secondary storage](/self-managed/concepts/secondary-storage/index.md))

Camunda 8 Run also supports document storage and management with [document handling](/self-managed/concepts/document-handling/overview.md).

:::note
For the latest list of supported relational databases and versions, see the  
[RDBMS version support policy](/self-managed/concepts/databases/relational-db/rdbms-support-policy.md).
:::

## Prerequisites

- **OpenJDK 21–25**: Required for running Camunda 8 as a Java application.
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

### Start external Elasticsearch

In Camunda 8.9 and later, Camunda 8 Run may not include an embedded Elasticsearch instance.
If you want to use Elasticsearch, run your own instance and point Camunda 8 Run to it.

Start a single-node Elasticsearch container:

```bash
docker run \
  -m 1GB \
  -d \
  --name elasticsearch \
  -p 9200:9200 \
  -p 9300:9300 \
  -e "discovery.type=single-node" \
  -e "xpack.security.enabled=false" \
  elasticsearch:8.18.6
```

Create an `application.yaml` that points Camunda 8 Run to your external Elasticsearch:

```yaml
camunda:
  data:
    secondary-storage:
      elasticsearch:
        url: "http://127.0.0.1:9200/"
```

Start Camunda 8 Run with the embedded Elasticsearch disabled and your custom config:

```bash
./start.sh --disable-elasticsearch --config application.yaml
```

Use external Elasticsearch when you need indexing, search, or full Operate/Tasklist functionality.

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

## Advanced configuration

### Enable TLS

TLS can be enabled by providing a local keystore file using the [`--keystore` and `--keystorePassword` configuration options](#configuration-options) at startup. Camunda 8 Run accepts `.jks` certificate files.  
Although Camunda 8 Run supports TLS, this is intended only for testing.

:::note
If you use a proxy together with TLS, ensure internal Camunda services are excluded from proxy routing. JVM-level proxy settings apply to all internal HTTP clients and may block communication between components such as Zeebe, Operate, Identity, or the connector runtime. Add these services to your `nonProxyHosts` configuration.

For details, see [configure a proxy server in Self-Managed](../../../../components/connectors/protocol/rest/#configure-a-proxy-server-in-self-managed) in the REST connector documentation.
:::

### Access metrics

Metrics are enabled in Camunda 8 Run by default and can be accessed at [http://localhost:9600/actuator/prometheus](http://localhost:9600/actuator/prometheus).  
For more information, see the [metrics](/self-managed/operational-guides/monitoring/metrics.md) documentation.

### Configure or switch secondary storage (Elasticsearch or H2)

Camunda 8 Run supports multiple secondary-storage options.  
By default, it uses **Elasticsearch**, but you can switch to an RDBMS backend such as **H2** for lightweight local development or testing.

#### Default: Elasticsearch

Camunda 8 Run starts with **Elasticsearch** as the default secondary storage.

```yaml
data:
  secondary-storage:
    type: elasticsearch
```

#### Optional: H2 (for local testing)

To test Camunda 8 Run with an in-memory H2 database, configure `type: rdbms` as shown below.

:::note Important!
Disable Operate and webapp backup when using H2; otherwise, Camunda 8 Run will not start correctly.
:::

```yaml
camunda:
  backup:
    webapps:
      enabled: false
  data:
    secondary-storage:
      type: rdbms
      rdbms:
        url: jdbc:h2:mem:camunda
        username: sa
        password:
        flushInterval: PT0.5S
        queueSize: 1000

spring:
  profiles:
    active: "broker,consolidated-auth,identity,tasklist"
```

H2 runs in memory by default, so data is lost when you stop Camunda 8 Run.
To persist data locally, use a file-based configuration such as:

```yaml
url: jdbc:h2:file:./camunda-data/h2db
```

<details>

<summary>Full example configuration</summary>

```yaml
camunda:
  backup:
    webapps:
      enabled: false
  data:
    secondary-storage:
      type: rdbms
      rdbms:
        url: jdbc:h2:mem:camunda
        username: sa
        password:
        flushInterval: PT0.5S
        queueSize: 1000
  security:
    initialization:
      users:
        - username: demo
          password: demo
          name: Demo
          email: demo@example.com
      defaultRoles:
        admin:
          users:
            - demo
    authentication:
      method: BASIC
      unprotected-api: true
    authorizations:
      enabled: false

zeebe:
  broker:
    network:
      host: localhost
      advertisedHost: localhost
  gateway:
    cluster:
      initialContactPoints: zeebe:26502
      memberId: identity

spring:
  profiles:
    active: "broker,consolidated-auth,identity,tasklist"
```

</details>

:::note
Operate and Tasklist work with H2 only after both migrate to the v2 APIs.  
Use H2 for testing Camunda 8 Run only, and disable Operate and webapp backup.
:::

### Switching between storage types

To change storage in Camunda 8 Run:

- **Switch to Elasticsearch (default)** — remove or comment out the `data.secondary-storage` section.
- **Switch to H2** — add the H2 configuration shown above and restart Camunda 8 Run.
- **Switch back to Elasticsearch** — delete or comment out the H2 section and restart Camunda 8 Run.

Choose **H2** for quick local development with minimal setup,  
and **Elasticsearch** for production-like scenarios or when using Operate and Tasklist.

### Primary vs. secondary storage

Camunda 8 uses two layers of storage:

- **Primary storage** is handled by the Zeebe broker to store workflow execution data.
- **Secondary storage** is used by applications like Operate, Tasklist, and Identity to read and present that data.

For more details on how these layers interact, see [secondary storage architecture](/self-managed/concepts/secondary-storage/index.md).  
Camunda 8 Run uses v2 APIs by default, so no additional configuration is required when H2 becomes the default in a future release.

### Known limitations

- Tasklist can use H2 through the v2 APIs. Operate support for H2 is under active development and may have limitations in current alpha versions.
- H2 is intended for testing and local development only.
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

- Review [backup and restore for RDBMS](/self-managed/operational-guides/backup-restore/backup-and-restore.md).
- Identify and resolve [common issues when starting, configuring, or using Camunda 8 Run](/self-managed/quickstart/developer-quickstart/c8run-troubleshooting.md).
