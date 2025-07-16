---
id: c8run
title: "Developer quickstart – Camunda 8 Run"
sidebar_label: "Camunda 8 Run"
description: "This quickstart guides application developers through deploying Camunda 8 Self-Managed to a local Orchestration cluster using Camunda 8 Run."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import {C8Run} from "@site/src/components/CamundaDistributions";

:::note
Camunda 8 Run is not supported for production use.
:::

Camunda 8 Run allows you to install and start a simplified, single-application Camunda configuration in a local development environment. This page guides you through using Camunda 8 Run on a local or virtual machine.

Camunda 8 Run includes the following:

- Orchestration cluster
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
  - Or use the command: `./c8run start`
- On Windows:
  - Use the command: `.\c8run.exe start`

If startup is successful, a browser window for Operate will open automatically. Alternatively, you can access Operate at [http://localhost:8080/operate](http://localhost:8080/operate).

To start Camunda 8 Run using Docker:

- On Mac and Linux: `./start.sh --docker`
- On Windows: `.\c8run.exe start --docker`

When started with Docker, Operate will be available at [http://localhost:8088/operate](http://localhost:8088/operate).

:::note
If Camunda 8 Run fails to start, run the [shutdown script](#shut-down-camunda-8-run) to end the current processes, then run the start script again.
:::

### Configuration options

The following command-line arguments are available:

| Argument                   | Description                                                                                                                                                                                                                   |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--config <path>`          | Applies the specified Zeebe [`application.yaml`](/self-managed/components/orchestration-cluster/zeebe/configuration/configuration.md).                                                                                        |
| `--username <arg>`         | Configures the first user’s username as `<arg>`.                                                                                                                                                                              |
| `--password <arg>`         | Configures the first user’s password as `<arg>`.                                                                                                                                                                              |
| `--keystore <arg>`         | Configures the TLS certificate for HTTPS. If not specified, HTTP is used. For more information, see [enabling TLS](#enable-tls).                                                                                              |
| `--keystorePassword <arg>` | Provides the password for the JKS keystore file.                                                                                                                                                                              |
| `--port <arg>`             | Sets the Camunda core port (default: `8080`).                                                                                                                                                                                 |
| `--log-level <arg>`        | Sets the log level for the Camunda core.                                                                                                                                                                                      |
| `--docker`                 | Downloads and runs the Camunda Docker Compose distribution. Additional options are not supported and will be ignored. See the [shutdown script](#shut-down-camunda-8-run) for information on stopping the Docker application. |
| `--disable-elasticsearch`  | Prevents the built-in Elasticsearch from starting. Ensure another Elasticsearch instance is provided via `--config`. See the [external Elasticsearch](#start-external-elasticsearch) section for details.                     |
| `--startup-url`            | The URL to open after startup (e.g., `'http://localhost:8080/operate'`). By default, Operate is opened.                                                                                                                       |

## Work with Camunda 8 Run

### Access Camunda components

All Camunda 8 Run components can be accessed using the username/password combination `demo`/`demo`.

:::note
The URLs for the Docker Compose application can be found in the [Docker Compose](#docker-compose) documentation.
:::

Tasklist, Operate, and Identity are available at:

- Tasklist: http://localhost:8080/tasklist
- Operate: http://localhost:8080/operate
- Identity: http://localhost:8080/identity

The following components do not have a web interface, but the URLs may be required for additional configuration:

- Zeebe Gateway: http://localhost:26500
- Connectors: http://localhost:8085

:::note
The Connectors URL displays a login page, but it cannot be logged into.
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

### Use Camunda APIs

All APIs are **unprotected by default** in Camunda 8 Run and can be accessed without credentials or tokens.

Available APIs include:

- [Tasklist V1](/apis-tools/tasklist-api-rest/tasklist-api-rest-overview.md)
- [Operate V1](/apis-tools/operate-api/overview.md)
- [Zeebe gRPC](/apis-tools/zeebe-api/grpc.md)
- [Orchestration Cluster REST API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md)

### Enable authentication and authorization

To enforce API authentication and work with authorizations, you must enable these features. The following minimal `application.yaml` shows the required configuration:

```yaml
camunda.security:
  authentication.unprotected-api: false
  authorizations.enabled: true
```

Place the above `application.yaml` into your root `/c8run` folder, provide it to Camunda 8 Run at startup using the `--config` [flag](#configuration-options):

```
./start.sh --config application.yaml
```

You are then required to provide basic authentication credentials on API requests, as in the following:

```shell
curl --request POST 'http://localhost:8080/v1/process-definitions/search'  \
  -u demo:demo \
  --header 'Content-Type: application/json' \
  --data-raw '{}'
```

## Shut down Camunda 8 Run

To shut down Camunda 8 Run and end all running processes, run `./shutdown.sh` (or `.\c8run.exe stop` on Windows) from the `c8run` directory.

To shut down the Camunda 8 Run Docker distribution, use `./shutdown.sh --docker` (or `.\c8run.exe stop --docker` on Windows).

## Advanced options

### Enable TLS

TLS can be enabled by providing a local keystore file using the `--keystore` argument at startup. Camunda 8 Run accepts `.jks` certificate files.

### Access metrics

Metrics are enabled in Camunda 8 Run by default and can be accessed at [http://localhost:9600/actuator/prometheus](http://localhost:9600/actuator/prometheus). For more information, see the [metrics](/self-managed/operational-guides/monitoring/metrics.md) documentation.

### Start external Elasticsearch

To start Elasticsearch outside of Camunda 8 Run, use the `--disable-elasticsearch` flag at startup. This prevents Camunda 8 Run from starting its own Elasticsearch instance.

The following command starts an external Elasticsearch instance using `docker run`:

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

### Environment variables

The following advanced configuration options can be provided via environment variables:

| Variable       | Description                                                                                                                                       |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ES_JAVA_OPTS` | Allows you to override Java command line parameters for Elasticsearch. This can allow you to increase memory limits. **Default:** `-Xms1g -Xmx1g` |
| `JAVA_OPTS`    | Allows you to override Java command line parameters for Camunda.                                                                                  |

## Next steps

Check out the [getting started guide](/guides/getting-started-example.md) to start a new Java Project to connect to this local cluster.
