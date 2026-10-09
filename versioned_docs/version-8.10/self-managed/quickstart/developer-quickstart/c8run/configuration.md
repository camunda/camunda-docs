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
| `--no-browser`             | Skips opening a browser window after startup. Useful for headless or CI environments.                                                                                                                                                                  |
| `--physical-tenants <ids>` | Starts the comma-separated [Physical Tenants](#configure-physical-tenants) for this run only, without changing the saved Physical Tenants.                                                                                                             |

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

For connector secrets, add the value to the local secret store and reference it with `camunda.secrets.<name>`. See [manage local secrets](#manage-local-secrets).

For connector development and packaging details, see [Connector SDK](/components/connectors/custom-built-connectors/connector-sdk.md).

## Manage local secrets

c8run stores local secret values in your platform's user data directory and configures the file secret store automatically.

| Platform | Default directory                                                                                                  |
| -------- | ------------------------------------------------------------------------------------------------------------------ |
| Linux    | `${XDG_DATA_HOME}/camunda/c8run/secrets`, or `~/.local/share/camunda/c8run/secrets` when `XDG_DATA_HOME` isn't set |
| macOS    | `~/Library/Application Support/Camunda/C8Run/secrets`                                                              |
| Windows  | `%LOCALAPPDATA%\Camunda\C8Run\secrets`                                                                             |

Run `./c8run secrets path` to print the directory used by the current environment.

Set a secret without placing the value in your command history:

```bash
./c8run secrets set OPENAI_API_KEY
```

Enter the value at the hidden prompt. Then reference it in Process Models with:

```feel
=camunda.secrets.OPENAI_API_KEY
```

To set several secrets without creating a dotenv file, pass multiple names. Camunda 8 Run prompts for each value separately:

```bash
./c8run secrets set OPENAI_API_KEY SLACK_TOKEN
```

Secret names can contain letters, numbers, underscores, and dashes. In a FEEL expression, wrap a name containing dashes in backticks:

```feel
=camunda.secrets.`openai-api-key`
```

Use the following commands to manage values:

| Command                                | Purpose                                          |
| -------------------------------------- | ------------------------------------------------ |
| `./c8run secrets set <name> [name...]` | Prompt for and save one or more values.          |
| `./c8run secrets set <name> --stdin`   | Read a value from standard input for automation. |
| `./c8run secrets list`                 | List secret names without showing their values.  |
| `./c8run secrets path`                 | Show the active local secrets directory.         |
| `./c8run secrets delete <name>`        | Delete one secret.                               |
| `./c8run secrets delete --all`         | Delete all local secrets after confirmation.     |
| `./c8run secrets import [dotenv-file]` | Import `KEY=value` entries from a dotenv file.   |
| `./c8run secrets import -`             | Import dotenv entries from standard input.       |

The commands have the following current safety boundaries:

- Import immediately replaces values with matching names. The cache warning appears after the values are written, without advance confirmation.
- Both `delete <name>` and `delete --all` prompt for confirmation. In noninteractive use, add `--yes`.
- Secret names can contain dashes, but names beginning with `-` can't currently be passed to `set` or `delete <name>`.

For example, import a local dotenv file:

```bash
./c8run secrets import .env.secrets
```

Use a dedicated dotenv file for secret values. `c8run secrets` refuses to import the c8run `.env` file because it can contain runtime, download, and packaging credentials.

Configure local secret management with the following environment variables. Set them in your environment or the c8run `.env` file before running secret commands or starting Camunda 8 Run.

| Variable                  | Default                     | Valid values                                                              | Behavior                                                                                                                                                 |
| ------------------------- | --------------------------- | ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `C8RUN_SECRETS_MODE`      | `local`                     | `local` or `external`                                                     | In `local` mode, c8run configures its file store. Set `external` whenever you configure another store. Local `c8run secrets` commands are then disabled. |
| `C8RUN_SECRETS_DIR`       | Platform-specific directory | An absolute or relative directory path                                    | Sets the file-store path for local secret commands and startup. Relative paths resolve from the current working directory.                               |
| `C8RUN_SECRETS_CACHE_TTL` | `20m`                       | A duration expressed as a whole number of minutes, with a minimum of `1m` | Sets how long Camunda caches resolved secret values.                                                                                                     |

For example, set the cache duration to one minute:

```bash
C8RUN_SECRETS_CACHE_TTL=1m ./c8run start
```

To use another local directory for secret commands and startup, set the same path for both commands:

```bash
C8RUN_SECRETS_DIR=./temporary-secrets ./c8run secrets set API_KEY
C8RUN_SECRETS_DIR=./temporary-secrets ./c8run start
```

The default directory is shared across projects and c8run versions for the current operating-system user. Set a stable absolute `C8RUN_SECRETS_DIR` per project when the same secret name needs different values. c8run warns when the platform-default directory and the configured directory both contain entries. Run `./c8run secrets path` to confirm the active local directory.

After rotating, importing, or deleting a value, existing cached resolutions can use the previous value until the cache entry expires. Restart Camunda 8 Run to clear the cache immediately.

On Windows, use PowerShell or Command Prompt for hidden interactive entry. In Git Bash, prefix the command with `winpty`, or use `--stdin`.

Local secret commands manage only the c8run file store. Set `C8RUN_SECRETS_MODE=external` whenever you configure another file path, AWS Secrets Manager, or Google Secret Manager through `--config`, `application.yaml`, or Spring environment settings. c8run doesn't detect explicit store configuration and otherwise configures its local default store. Use the external store's management tools instead of `c8run secrets`.

The local secrets directory is for development only. For production, configure a supported managed secret store instead of reusing Camunda 8 Run secrets.

## Configure Physical Tenants

Use Camunda 8 Run to try [Physical Tenants](/self-managed/concepts/physical-tenants/index.md) locally. Each Physical Tenant is an isolated engine inside one Camunda 8 Run instance, with its own data, users, secrets, and connector runtime.

Use a Camunda 8 Run build that supports `physical-tenants` and the `secrets --physical-tenant` selector. Check `./c8run physical-tenants help` and `./c8run secrets help` for these options.

Add a Physical Tenant, then start Camunda 8 Run:

```bash
./c8run physical-tenants add sales
./c8run start
./c8run physical-tenants list
./c8run stop
```

- The `default` Physical Tenant always exists and keeps the existing URLs, such as `http://localhost:8080/operate` and `http://localhost:8080/v2/`.
- Each additional Physical Tenant is served under `http://localhost:8080/physical-tenants/<id>/`, for example `/physical-tenants/sales/operate` for the web applications and `/physical-tenants/sales/v2/` for the [Orchestration Cluster REST API](/self-managed/concepts/physical-tenants/api-routing.md).
- Saved Physical Tenants start with every subsequent `./c8run start`. The startup summary lists each Physical Tenant's URLs and readiness.
- `./c8run physical-tenants list` shows each Physical Tenant's status, login, connector runtime, and URLs.

To start specific Physical Tenants for one run without changing the saved Physical Tenants, for example in CI:

```bash
./c8run start --physical-tenants sales,hr
```

Physical Tenant IDs follow these rules:

| Rule                                                                           | Value                             |
| ------------------------------------------------------------------------------ | --------------------------------- |
| Allowed characters                                                             | Lowercase letters and digits only |
| Maximum length                                                                 | 64 characters                     |
| Maximum length with RDBMS secondary storage, including the bundled H2 database | Eight characters                  |
| Reserved ID                                                                    | `default`                         |

H2 is for local development and evaluation only.

### Set Physical Tenant logins

By default, each Physical Tenant uses the same login as `./c8run start` (`demo`/`demo`, unless you set `--username` and `--password`). To give a Physical Tenant its own user, add it with `--username`:

```bash
./c8run physical-tenants add hr --username alice
```

Camunda 8 Run prompts for the password without echoing it. For automation, pass the password on standard input with `--password-stdin`, which requires `--username` and accepts one Physical Tenant per command:

```bash
printf '%s' "$HR_PASSWORD" | ./c8run physical-tenants add hr --username alice --password-stdin
```

`physical-tenants add` doesn't accept `--password`, so the password never appears in your shell history. Camunda 8 Run stores the password in the Physical Tenants file, which only your operating-system user can read.

Physical Tenant logins authenticate web application sessions. REST APIs remain unprotected by default, including Physical Tenant-prefixed endpoints; adding a Physical Tenant-specific login doesn't enable API protection.

### Manage Physical Tenant secrets and connectors

Each Physical Tenant has its own local secrets and connector runtime. A Physical Tenant never resolves another Physical Tenant's `camunda.secrets.*` values. Use `--physical-tenant` with the [local secret commands](#manage-local-secrets):

```bash
./c8run secrets --physical-tenant sales set OPENAI_API_KEY
```

The `--physical-tenant=sales` form is also supported.

Each Physical Tenant's connector runtime runs in a separate Java Virtual Machine (JVM) on the next free local port from `8087`. To skip it for one Physical Tenant, add the Physical Tenant with `--no-connectors`. To skip all connector runtimes, start with `--disable-connectors`.

### Remove Physical Tenants

Use these commands to remove saved Physical Tenants:

| Command                                        | Purpose                                               |
| ---------------------------------------------- | ----------------------------------------------------- |
| `./c8run physical-tenants remove <id> [id...]` | Remove Physical Tenants from the saved configuration. |
| `./c8run physical-tenants reset`               | Remove all saved Physical Tenants and their logins.   |
| `./c8run physical-tenants path`                | Show where Camunda 8 Run saves Physical Tenants.      |

Both `remove` and `reset` prompt for confirmation. In noninteractive use, add `--yes`.

Removing a Physical Tenant changes only the saved configuration. A running instance keeps serving the Physical Tenant until you restart Camunda 8 Run. The Physical Tenant's data remains in secondary storage, so adding the same ID again restores it, including its users.

Re-adding a Physical Tenant doesn't reset its existing users' passwords. Use the retained credentials when saving a login for an existing Physical Tenant ID.

### Troubleshoot Physical Tenant startup failures

If the shared Camunda application starts but a Physical Tenant doesn't become ready, the startup summary shows `NOT READY` and `./c8run start` exits with an error naming the failed Physical Tenants. Camunda and the healthy Physical Tenants keep running. Check `log/camunda.log`, fix the reported configuration or storage problem, then run `./c8run stop` and `./c8run start`. For common causes, see [troubleshoot Physical Tenants](/self-managed/concepts/physical-tenants/troubleshooting.md).

Invalid shared configuration can prevent the entire Camunda application from starting. For example, mixing RDBMS and `none` secondary-storage types across Physical Tenants fails shared configuration validation. Correct the incompatible storage settings before restarting.

With API protection enabled, rejected readiness-probe credentials produce `up (unverified)` and a warning instead of a startup failure. The Physical Tenant is reachable, but Camunda 8 Run couldn't verify its storage readiness. If you reused a Physical Tenant ID, remove and re-add its saved configuration with the retained user's credentials, then stop and start Camunda 8 Run again. Removing and re-adding the saved configuration preserves the Physical Tenant's data.

### Configure where Physical Tenants are stored

Two environment variables control where Camunda 8 Run saves Physical Tenants and whether it manages them:

| Variable             | Default                                                                                                               | Behavior                                                                                                                                           |
| -------------------- | --------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `C8RUN_TENANTS_FILE` | `physical-tenants.yaml` in the per-user Camunda 8 Run data directory. Run `./c8run physical-tenants path` to show it. | Sets the saved Physical Tenants file. Relative paths resolve from the current working directory.                                                   |
| `C8RUN_TENANTS_MODE` | `local`                                                                                                               | Set to `external` to disable the `physical-tenants` commands and saved Physical Tenants, so only your own configuration declares Physical Tenants. |

If your `--config` file, `CAMUNDA_PHYSICALTENANTS_*` environment variables, or `JAVA_OPTS` already declare `camunda.physical-tenants`, Camunda 8 Run uses that configuration as-is and ignores its saved Physical Tenants. In that case, `--physical-tenants` fails with an error, so use either `--physical-tenants` or your own configuration. Physical Tenants managed by Camunda 8 Run require `C8RUN_SECRETS_MODE=local`, the default.

### Manage Physical Tenants with c8ctl

[c8ctl](/apis-tools/c8ctl/getting-started.md) delegates Physical Tenant management through `c8ctl cluster physical-tenants` and scoped secret management through `c8ctl cluster secrets --physical-tenant <id>`. Use `c8ctl cluster start --physical-tenants <ids>` to select Physical Tenants for one run. These commands use the same Physical Tenants file and secrets as Camunda 8 Run. Relative `C8RUN_TENANTS_FILE`, `C8RUN_SECRETS_DIR`, and secret import paths resolve against the caller's working directory.

Physical Tenants are distinct from logical tenants managed by `c8ctl list tenants` and `c8ctl use tenant`.

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
