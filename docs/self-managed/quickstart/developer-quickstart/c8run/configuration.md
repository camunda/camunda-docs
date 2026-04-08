---
title: Configure Camunda 8 Run
sidebar_label: Configuration
description: Configure startup options, authentication, APIs, connectors, TLS, metrics, and environment variables for Camunda 8 Run.
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

<!-- markdownlint-disable MD033 -->

Use this page to configure Camunda 8 Run beyond the default local quickstart.

## Configuration options

The following options provide a convenient way to override settings for quick tests and interactions in Camunda 8 Run.

For more advanced or permanent configuration, modify the default `configuration/application.yaml` or supply a custom file using the `--config` flag.

| Argument                   | Description                                                                                                                                                                                                                                            |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--config <path>`          | Applies the specified Zeebe [`application.yaml`](/self-managed/components/orchestration-cluster/zeebe/configuration/configuration.md).                                                                                                                 |
| `--extra-driver <path>`    | Copies an external JDBC driver into `camunda-zeebe-<version>/lib` before startup. Use this when running against Oracle, MySQL, or other databases that require a driver that is not bundled with Camunda 8 Run. Repeat the flag to copy multiple JARs. |
| `--username <arg>`         | Configures the first user’s username as `<arg>`.                                                                                                                                                                                                       |
| `--password <arg>`         | Configures the first user’s password as `<arg>`.                                                                                                                                                                                                       |
| `--keystore <arg>`         | Configures the TLS certificate for HTTPS. If not specified, HTTP is used. For more information, see [enable TLS](#enable-tls).                                                                                                                         |
| `--keystorePassword <arg>` | Provides the password for the JKS keystore file.                                                                                                                                                                                                       |
| `--port <arg>`             | Sets the Camunda core port (default: `8080`).                                                                                                                                                                                                          |
| `--log-level <arg>`        | Sets the log level for the Camunda core.                                                                                                                                                                                                               |
| `--startup-url`            | The URL to open after startup (for example, `http://localhost:8080/operate`). By default, Operate is opened.                                                                                                                                           |

## Enable authentication and authorization

By default, Camunda 8 Run is optimized for local development. The web applications use local credentials, but the Orchestration Cluster API is unprotected and authorization checks are disabled. To protect API requests and enable authorization checks, update your `application.yaml`.

Example configuration:

```yaml
camunda:
  security:
    initialization:
      users:
        - username: demo
          password: demo
          name: Demo
          email: demo@example.com
    authentication:
      method: BASIC
      unprotected-api: false
    authorizations:
      enabled: true
```

Start Camunda 8 Run with the configuration:

<Tabs groupId="os-auth" defaultValue="maclinux" values={[
{ label: 'Mac OS + Linux', value: 'maclinux' },
{ label: 'Windows', value: 'windows' },
]}>
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
curl --request GET 'http://localhost:8080/v2/topology' \
  -u demo:demo \
  --header 'Content-Type: application/json' \
  --data-raw '{}'
```

To add additional users, extend the configuration:

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

## Use Camunda APIs

Camunda 8 Run exposes the Orchestration Cluster REST API locally by default at `http://localhost:8080/v2`.

- For local development, Camunda 8 Run exposes the API without requiring credentials unless you enable API protection.
- If you enable Basic authentication, include the configured username and password in your requests.
- For API concepts, endpoints, and examples, use the [Orchestration Cluster REST API overview](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md).
- For deployment-specific authentication details, use [Orchestration Cluster REST API authentication](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-authentication.md).

Quick connectivity check:

```bash
curl http://localhost:8080/v2/topology
```

## Use built-in and custom connectors

Camunda 8 Run includes Connectors for local development.

For custom connectors:

1. Place the connector JAR in the appropriate `custom_connectors` directory:

   ```bash
   # macOS/Linux
   c8run/custom_connectors/your-connector.jar

   # Windows
   c8run\custom_connectors\your-connector.jar
   ```

2. Ensure the corresponding element template is available in a valid Desktop Modeler search path.
3. Restart Camunda 8 Run after adding or updating connectors.
4. Check `c8run/logs/connectors.log` if the connector fails to load.

For connector secrets:

- When running Camunda 8 Run locally, export secrets as environment variables.
- When running the separate Docker Compose distribution, use the `connector-secrets.txt` file described in the [developer quickstart with Docker Compose](../docker-compose.md#connector-secrets).

For connector development and packaging details, see [Connector SDK](/components/connectors/custom-built-connectors/connector-sdk.md).

## Enable TLS

TLS can be enabled by providing a local keystore file using the [`--keystore` and `--keystorePassword` configuration options](#configuration-options) at startup. Camunda 8 Run accepts `.jks` certificate files.

Although Camunda 8 Run supports TLS, this is intended only for testing.

:::note
If you use a proxy together with TLS, ensure internal Camunda services are excluded from proxy routing. JVM-level proxy settings apply to all internal HTTP clients and may block communication between components such as Zeebe, Operate, Admin, or the connector runtime. Add these services to your `nonProxyHosts` configuration.

For details, see [HTTP proxy configuration](/self-managed/components/connectors/http-proxy-configuration.md).
:::

## Access metrics

Metrics are enabled in Camunda 8 Run by default and can be accessed at [http://localhost:9600/actuator/prometheus](http://localhost:9600/actuator/prometheus).

For more information, see the [metrics](/self-managed/operational-guides/monitoring/metrics.md) documentation.

## Environment variables

The following advanced configuration options can be provided via environment variables:

| Variable    | Description                                                      |
| ----------- | ---------------------------------------------------------------- |
| `JAVA_OPTS` | Allows you to override Java command line parameters for Camunda. |

## Next steps

- Review [configure secondary storage in Camunda 8 Run](./secondary-storage.md).
- Review [install and start Camunda 8 Run](./install-start.md).
- Identify and resolve [common issues when starting, configuring, or using Camunda 8 Run](../c8run-troubleshooting.md).
