---
title: Install and start Camunda 8 Run
sidebar_label: Install and start
description: Install Camunda 8 Run locally, start it on macOS, Linux, or Windows, run it in Docker mode, and shut it down cleanly.
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import {C8Run} from "@site/src/components/CamundaDistributions";

<!-- markdownlint-disable MD033 -->

Use this page to install Camunda 8 Run locally, start it in local or Docker mode, and shut it down cleanly.

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

<Tabs groupId="os" defaultValue="maclinux" values={[
{ label: 'Mac OS + Linux', value: 'maclinux' },
{ label: 'Windows', value: 'windows' },
]}>
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

:::note
If Camunda 8 Run fails to start, run the [shutdown script](#shut-down-camunda-8-run) to end the current processes, then run the start script again.
:::

## Start Camunda 8 Run in Docker mode

To start Camunda 8 in Docker Compose using Camunda 8 Run, use one of the following options. They map to `docker compose up -d` under the hood and include presets for each supported relational database.

<Tabs groupId="os-docker" defaultValue="maclinux" values={[
{ label: 'Mac OS + Linux', value: 'maclinux' },
{ label: 'Windows', value: 'windows' },
]}>
<TabItem value="maclinux">

<Tabs groupId="docker-db-mac" defaultValue="h2" values={[
{label: 'H2 (default)', value: 'h2'},
{label: 'PostgreSQL', value: 'postgresql'},
{label: 'MariaDB', value: 'mariadb'},
{label: 'MySQL', value: 'mysql'},
{label: 'Oracle', value: 'oracle'},
{label: 'Microsoft SQL Server', value: 'mssql'},
]}>
<TabItem value="h2">

```bash
./start.sh --docker
# or
./c8run start -docker
```

</TabItem>
<TabItem value="postgresql">

```bash
ORCHESTRATION_CONFIG_FILE=application-postgresql.yaml ./c8run start -docker
# or pass the config directly to c8run
# ./c8run start -docker --config configuration/application-postgresql.yaml
```

</TabItem>
<TabItem value="mariadb">

```bash
ORCHESTRATION_CONFIG_FILE=application-mariadb.yaml ./c8run start -docker
# or
# ./c8run start -docker --config configuration/application-mariadb.yaml
```

</TabItem>
<TabItem value="mysql">

```bash
ORCHESTRATION_CONFIG_FILE=application-mysql.yaml ./c8run start -docker
# or
# ./c8run start -docker --config configuration/application-mysql.yaml
```

</TabItem>
<TabItem value="oracle">

```bash
ORCHESTRATION_CONFIG_FILE=application-oracle.yaml ./c8run start -docker
# or
# ./c8run start -docker --config configuration/application-oracle.yaml
```

</TabItem>
<TabItem value="mssql">

```bash
ORCHESTRATION_CONFIG_FILE=application-mssql.yaml ./c8run start -docker
# or
# ./c8run start -docker --config configuration/application-mssql.yaml
```

</TabItem>
</Tabs>

</TabItem>
<TabItem value="windows">

<Tabs groupId="docker-db-win" defaultValue="h2" values={[
{label: 'H2 (default)', value: 'h2'},
{label: 'PostgreSQL', value: 'postgresql'},
{label: 'MariaDB', value: 'mariadb'},
{label: 'MySQL', value: 'mysql'},
{label: 'Oracle', value: 'oracle'},
{label: 'Microsoft SQL Server', value: 'mssql'},
]}>
<TabItem value="h2">

```powershell
.\c8run.exe start --docker
```

</TabItem>
<TabItem value="postgresql">

```powershell
set ORCHESTRATION_CONFIG_FILE=application-postgresql.yaml .\c8run.exe start --docker
# or
# .\c8run.exe start --docker --config configuration\application-postgresql.yaml
```

</TabItem>
<TabItem value="mariadb">

```powershell
set ORCHESTRATION_CONFIG_FILE=application-mariadb.yaml .\c8run.exe start --docker
# or
# .\c8run.exe start --docker --config configuration\application-mariadb.yaml
```

</TabItem>
<TabItem value="mysql">

```powershell
set ORCHESTRATION_CONFIG_FILE=application-mysql.yaml .\c8run.exe start --docker
# or
# .\c8run.exe start --docker --config configuration\application-mysql.yaml
```

</TabItem>
<TabItem value="oracle">

```powershell
set ORCHESTRATION_CONFIG_FILE=application-oracle.yaml .\c8run.exe start --docker
# or
# .\c8run.exe start --docker --config configuration\application-oracle.yaml
```

</TabItem>
<TabItem value="mssql">

```powershell
set ORCHESTRATION_CONFIG_FILE=application-mssql.yaml .\c8run.exe start --docker
# or
# .\c8run.exe start --docker --config configuration\application-mssql.yaml
```

</TabItem>
</Tabs>

</TabItem>
</Tabs>

For CLI flags and permanent configuration, see [configure Camunda 8 Run](./configuration.md).

## Shut down Camunda 8 Run

To shut down non-Docker Camunda 8 Run and end all running processes, run the following command from the `c8run` directory:

<Tabs groupId="os-stop" defaultValue="maclinux" values={[
{ label: 'Mac OS + Linux', value: 'maclinux' },
{ label: 'Windows', value: 'windows' },
]}>
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

## Next steps

- Review [configure Camunda 8 Run](./configuration.md).
- Review [configure secondary storage in Camunda 8 Run](./secondary-storage.md).
- Identify and resolve [common issues when starting, configuring, or using Camunda 8 Run](../c8run-troubleshooting.md).
