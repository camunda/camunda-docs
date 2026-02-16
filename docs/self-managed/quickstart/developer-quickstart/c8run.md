---
id: c8run
title: "Developer quickstart – Camunda 8 Run"
sidebar_label: "Camunda 8 Run"
description: "A quickstart guide for developers to deploy and run Camunda 8 Self-Managed locally with Camunda 8 Run, including setup, configuration, and key components."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import {C8Run} from "@site/src/components/CamundaDistributions";

:::note
Camunda 8 Run provides a lightweight, self-managed environment for local development and prototyping. It is not intended for production use.

For production deployments, install the Orchestration Cluster manually as a Java application.
For detailed steps, see the [manual installation](../../../deployment/manual/install) guide.
:::

Camunda 8 Run is a local distribution of Camunda 8 that bundles the Camunda 8 runtime, core services, startup scripts, and a launcher application for Windows, macOS, and Linux.

Camunda 8 Run enables you to run the [Orchestration Cluster](../../../../reference/glossary#orchestration-cluster), including Zeebe, Operate, Tasklist, Identity, and Elasticsearch, with minimal configuration. It is intended for developers who want to model BPMN diagrams, deploy them, and interact with running process instances in a simple environment. This guide explains how to get started on your local or virtual machine.

Camunda 8 Run includes the following:

- Orchestration Cluster
- Connectors
- H2 (default secondary storage for Camunda 8 Run in 8.9-alpha3)
- Elasticsearch (bundled, optional, enable when you need full-text indexing or advanced analytics)

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
3. Start Camunda 8 Run by following the steps below, depending on your operating system.

<Tabs groupId="os" defaultValue="maclinux" values={
[
{ label: 'Mac OS + Linux', value: 'maclinux', },
{ label: 'Windows', value: 'windows', },
] }>
<TabItem value="maclinux">

Run the helper script:

```bash
./start.sh
```

Or use the CLI command:

```bash
./c8run start
```

</TabItem>
<TabItem value="windows">

Use the CLI command:

```bash
.\c8run.exe start
```

</TabItem>
</Tabs>

If startup is successful, a browser window for Operate will open automatically. Alternatively, you can access Operate at [http://localhost:8080/operate](http://localhost:8080/operate).

To start Camunda 8 in Docker Compose using Camunda 8 Run you can use the following option. It is equivalent of running `docker compose up -d`:

<Tabs groupId="os" defaultValue="maclinux" values={
[
{ label: 'Mac OS + Linux', value: 'maclinux', },
{ label: 'Windows', value: 'windows', },
] }>
<TabItem value="maclinux">

```bash
./start.sh --docker
```

</TabItem>
<TabItem value="windows">

```bash
.\c8run.exe start --docker
```

</TabItem>
</Tabs>

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

### Configure or switch secondary storage (H2 or Elasticsearch)

Camunda 8 Run supports multiple secondary-storage options. Starting in 8.9-alpha3, **H2 is the default secondary storage** for Camunda 8 Run lightweight setups and quickstarts. Elasticsearch remains bundled and supported as an optional alternative that you can enable when you need full-text indexing, search, or advanced analytics.

#### Default: H2 (Camunda 8 Run)

The default Camunda 8 Run configuration in 8.9-alpha3 uses an H2 database for secondary storage. This is convenient for local development and demos.

In-memory H2 example:

```yaml
data:
  secondary-storage:
    type: rdbms
    rdbms:
      url: jdbc:h2:mem:camunda
      username: sa
      password:
```

To persist H2 data to disk:

```yaml
camunda:
  data:
    secondary-storage:
      type: rdbms
      rdbms:
        url: jdbc:h2:file:./camunda-data/h2db
        username: sa
        password:
```

<details>

<summary>Full example configuration</summary>

```yaml
camunda:
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
Operate v2 has limited functionality in 8.9-alpha3 when running against H2. Full Operate support is planned for a later alpha. Tasklist and the v2 REST API have parity across supported secondary storage backends.
:::

#### Optional: Elasticsearch

If you need indexing, search, or full Operate/Tasklist functionality, enable Elasticsearch. Elasticsearch is still bundled with Camunda 8 Run in 8.9-alpha3 and can be managed by Camunda 8 Run or provided as an external service.

To use Elasticsearch:

```yaml
data:
  secondary-storage:
    type: elasticsearch
    elasticsearch:
      url: http://elasticsearch:9200/
```

Start Camunda 8 Run without `--disable-elasticsearch` to let Camunda 8 Run manage Elasticsearch, or use `--disable-elasticsearch --config <file>` and point to an external cluster.

### Switching between storage types and migration notes

- Switching the secondary storage type (for example, H2 ⇄ Elasticsearch) in 8.9-alpha3 does **not** preserve existing secondary-store data. The system starts with a fresh secondary store.
- If you upgrade from alpha1/alpha2 and keep the same secondary storage backend, no migration steps are required. Only users who change the storage backend need to update configuration and accept a fresh secondary store.
- To switch storage, update `data.secondary-storage` in `application.yaml` (or Helm `values.yaml`) and restart Camunda 8 Run. Use `--disable-elasticsearch` to prevent Camunda 8 Run from starting the embedded Elasticsearch when you want to rely on H2 or an external ES instance.

Choose **H2** for quick local development and **Elasticsearch** for production-like scenarios where advanced search/analytics are required.

### Operate limitations in 8.9-alpha3

Operate can run against the default H2 store in 8.9-alpha3, but some user-facing Operate features are intentionally limited in this alpha. This page records the high-level expectations for alpha3:

- Operate may not provide complete analytics, advanced search, or long-running query features when backed by H2.
- Performance and scaling behavior when using H2 will differ from Elasticsearch in production scenarios.
- Users who require full Operate feature parity should enable Elasticsearch (embedded or external) until full H2 parity is confirmed in a later alpha.

<!--- Maybe add something like "For engineering details and progress on Operate feature parity, see issue #7315 and the Operate migration tracking in the project board. If we want a precise feature list for alpha3, I can add a checklist here after stakeholder confirmation." ---!>
    authentication:
      # Require authentication for API requests
      unprotected-api: false
    authorizations:
      # Enable authorization checks
      enabled: true
```

Start Camunda 8 Run with the configuration:

<Tabs groupId="os" defaultValue="maclinux" values={
[
{ label: 'Mac OS + Linux', value: 'maclinux', },
{ label: 'Windows', value: 'windows', },
] }>
<TabItem value="maclinux">

```bash
./start.sh --config application.yaml
```

</TabItem>
<TabItem value="windows">

```bash
.\c8run.exe start --config application.yaml
```

</TabItem>
</Tabs>

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

<Tabs groupId="os" defaultValue="maclinux" values={
[
{ label: 'Mac OS + Linux', value: 'maclinux', },
{ label: 'Windows', value: 'windows', },
] }>
<TabItem value="maclinux">

```bash
./shutdown.sh
```

</TabItem>
<TabItem value="windows">

```bash
.\c8run.exe stop
```

</TabItem>
</Tabs>

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

### Configure or switch secondary storage (H2 or Elasticsearch)

Camunda 8 Run supports multiple secondary-storage options. Starting in 8.9-alpha3, **H2 is the default secondary storage** for Camunda 8 Run lightweight setups and quickstarts. Elasticsearch remains bundled and supported as an optional alternative that you can enable when you need full-text indexing, search, or advanced analytics.

#### Default: H2 (Camunda 8 Run)

The default Camunda 8 Run configuration in 8.9-alpha3 uses an H2 database for secondary storage. This is convenient for local development and demos.

In-memory H2 example:

```yaml
data:
  secondary-storage:
    type: rdbms
    rdbms:
      url: jdbc:h2:mem:camunda
      username: sa
      password:
```

To persist H2 data to disk:

```yaml
camunda:
  data:
    secondary-storage:
      type: rdbms
      rdbms:
        url: jdbc:h2:file:./camunda-data/h2db
        username: sa
        password:
```

<details>

<summary>Full example configuration</summary>

```yaml
camunda:
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
Operate v2 has limited functionality in 8.9-alpha3 when running against H2; full Operate support is planned for a later alpha. Tasklist and the v2 REST API have parity across supported secondary storage backends.
:::

#### Optional: Elasticsearch

If you need indexing, search, or full Operate/Tasklist functionality, enable Elasticsearch. Elasticsearch is still bundled with Camunda 8 Run in 8.9-alpha3 and can be managed by Camunda 8 Run or provided as an external service.

To use Elasticsearch:

```yaml
data:
  secondary-storage:
    type: elasticsearch
    elasticsearch:
      url: http://elasticsearch:9200/
```

Start Camunda 8 Run without `--disable-elasticsearch` to let Camunda 8 Run manage Elasticsearch, or use `--disable-elasticsearch --config <file>` and point to an external cluster.

### Switching between storage types and migration notes

- Switching the secondary storage type (for example, H2 ⇄ Elasticsearch) in 8.9-alpha3 does **not** preserve existing secondary-store data. The system starts with a fresh secondary store.
- If you upgrade from alpha1/alpha2 and keep the same secondary storage backend, no migration steps are required. Only users who change the storage backend need to update configuration and accept a fresh secondary store.
- To switch storage, update `data.secondary-storage` in `application.yaml` (or Helm `values.yaml`) and restart Camunda 8 Run. Use `--disable-elasticsearch` to prevent Run from starting the embedded Elasticsearch when you want to rely on H2 or an external ES instance.

Choose **H2** for quick local development and **Elasticsearch** for production-like scenarios where advanced search/analytics are required.

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
