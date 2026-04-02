---
title: Configure secondary storage in Camunda 8 Run
sidebar_label: Secondary storage
description: Configure H2, external relational databases, or Elasticsearch as secondary storage in Camunda 8 Run.
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

<!-- markdownlint-disable MD033 MD036 -->

Camunda 8 Run supports multiple [secondary storage](/reference/glossary.md#secondary-storage) options. **H2 is the default secondary storage** for lightweight Camunda 8 Run setups and quickstarts. If you need full-text indexing, search, or advanced analytics, use an external Elasticsearch instance.

## Configure or switch secondary storage (H2 or Elasticsearch)

Choose the backend that fits your local development and testing needs.

### Default: H2 (Camunda 8 Run)

The default Camunda 8 Run configuration uses an H2 database for secondary storage. This is convenient for local development and demos and stores data on disk.

File-based H2 example:

```yaml
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
        url: jdbc:h2:file:./camunda-data/h2db
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

### External relational database options

Use an external relational database for secondary storage: PostgreSQL, MariaDB, MySQL, Oracle, or Microsoft SQL Server.

1. Set `camunda.data.secondary-storage` with the JDBC URL and credentials.
2. Ensure the database is reachable before starting Camunda 8 Run.
3. If you already run a database, reuse the same configuration and update the URL, host or port, and credentials.
4. If a separate JDBC driver is required, add it with `--extra-driver` or drop the JAR into `camunda-zeebe-<version>/lib`.

<Tabs groupId="secondary-storage-rdbms" defaultValue="postgresql" values={[
{label: 'PostgreSQL', value: 'postgresql'},
{label: 'MariaDB', value: 'mariadb'},
{label: 'MySQL', value: 'mysql'},
{label: 'Oracle', value: 'oracle'},
{label: 'Microsoft SQL Server', value: 'mssql'},
]}>
<TabItem value="postgresql">

**Secondary storage config**

```yaml
camunda:
  data:
    secondary-storage:
      type: rdbms
      rdbms:
        url: jdbc:postgresql://localhost:5432/camunda_secondary
        username: camunda
        password: camunda
```

**Start database (Docker)**

```bash
docker run -d --name camunda-postgres \
  -e POSTGRES_USER=camunda \
  -e POSTGRES_PASSWORD=camunda \
  -e POSTGRES_DB=camunda_secondary \
  -p 5432:5432 postgres:latest
```

</TabItem>
<TabItem value="mariadb">

**Secondary storage config**

```yaml
camunda:
  data:
    secondary-storage:
      type: rdbms
      rdbms:
        url: jdbc:mariadb://localhost:3306/camunda_secondary?serverTimezone=UTC
        username: camunda
        password: camunda
```

**Start database (Docker)**

```bash
docker run -d --name camunda-mariadb \
  -e MARIADB_USER=camunda \
  -e MARIADB_PASSWORD=camunda \
  -e MARIADB_ROOT_PASSWORD=rootcamunda \
  -e MARIADB_DATABASE=camunda_secondary \
  -p 3306:3306 mariadb:11.4
```

:::note
No extra driver is required. MariaDB ships with the distribution.
:::

</TabItem>
<TabItem value="mysql">

**Secondary storage config**

```yaml
camunda:
  data:
    secondary-storage:
      type: rdbms
      rdbms:
        url: jdbc:mysql://localhost:3307/camunda_secondary?serverTimezone=UTC
        username: camunda
        password: camunda
```

**Start database (Docker)**

```bash
docker run -d --name camunda-mysql \
  -e MYSQL_ROOT_PASSWORD=rootcamunda \
  -e MYSQL_USER=camunda \
  -e MYSQL_PASSWORD=camunda \
  -e MYSQL_DATABASE=camunda_secondary \
  -p 3306:3306 mysql:8.4
```

:::note
MySQL requires the official Connector/J driver. Copy the JAR into `camunda-zeebe-<version>/lib` or pass `--extra-driver /path/to/mysql-connector.jar` to `./c8run start`.

Ensure the JDBC URL uses the host port you expose.
:::

</TabItem>
<TabItem value="oracle">

**Secondary storage config**

```yaml
camunda:
  data:
    secondary-storage:
      type: rdbms
      rdbms:
        url: jdbc:oracle:thin:@//localhost:1521/FREEPDB1
        username: camunda
        password: camunda
```

**Start database (Docker)**

```bash
docker run -d --name camunda-oracle \
  -p 1521:1521 \
  -e ORACLE_PASSWORD=camunda \
  -e APP_USER=camunda \
  -e APP_USER_PASSWORD=camunda \
  gvenzl/oracle-free:23-slim
```

:::note
Download the Oracle JDBC driver, for example `ojdbc11.jar`, and place it in `camunda-zeebe-<version>/lib` or pass `--extra-driver /path/to/ojdbc11.jar`.
:::

</TabItem>
<TabItem value="mssql">

**Secondary storage config**

```yaml
camunda:
  data:
    secondary-storage:
      type: rdbms
      rdbms:
        url: jdbc:sqlserver://localhost:1433;databaseName=camunda_secondary;encrypt=false
        username: camunda
        password: Camunda123!
```

**Start database (Docker)**

```bash
docker run -d --name camunda-mssql \
  -e ACCEPT_EULA=Y \
  -e MSSQL_SA_PASSWORD=Camunda123! \
  -p 1433:1433 \
  mcr.microsoft.com/mssql/server:2022-latest
```

</TabItem>
</Tabs>

### Optional: Elasticsearch

If you need indexing, search, or full Operate or Tasklist functionality, use an external Elasticsearch instance.

To use Elasticsearch:

```yaml
data:
  secondary-storage:
    type: elasticsearch
    elasticsearch:
      url: http://localhost:9200/
```

Start Camunda 8 Run with `--config <file>` and point the configuration to your external cluster.

## Switching between storage types and migration notes

- Switching the secondary storage type, for example H2 to Elasticsearch, currently does **not** preserve existing secondary-store data. The system starts with a fresh secondary store.
- If you upgrade from alpha1 or alpha2 and keep the same secondary storage backend, no migration steps are required.
- To switch storage, update `data.secondary-storage` in `application.yaml` and restart Camunda 8 Run.

Choose **H2** for quick local development and **Elasticsearch** for production-like scenarios where advanced search and analytics are required.

## Operate limitations in 8.9

Operate can run against the default H2 store, but some user-facing Operate features are intentionally limited in this alpha.

- Operate may not provide complete analytics, advanced search, or long-running query features when backed by H2.
- Performance and scaling behavior when using H2 differs from Elasticsearch in production scenarios.
- Users who require full Operate feature parity should use an external Elasticsearch instance until full H2 parity is confirmed.

## Primary vs. secondary storage

Camunda 8 uses two layers of storage:

- **[Primary storage](/reference/glossary.md#primary-storage)** is handled by the Zeebe broker to store workflow execution data.
- **[Secondary storage](/reference/glossary.md#secondary-storage)** is used by applications like Operate, Tasklist, and Admin to read and present that data.

For more details on how these layers interact, see [secondary storage architecture](/self-managed/concepts/secondary-storage/index.md).

Camunda 8 Run uses v2 APIs by default, so no additional configuration is required when H2 becomes the default in a future release.

## Known limitations

- Tasklist can use H2 through the v2 APIs. Operate support for H2 is under active development and may have limitations in current alpha versions.
- H2 is intended for testing and local development only.
- H2 data persists to the configured file path by default. Keep the path stable to avoid accidental data loss.
- Performance and memory use may vary depending on the local environment.

## Next steps

- Review [RDBMS version support policy](/self-managed/concepts/databases/relational-db/rdbms-support-policy.md).
- Review [backup and restore for RDBMS](/self-managed/operational-guides/backup-restore/rdbms/backup.md).
- Identify and resolve [common issues when starting, configuring, or using Camunda 8 Run](../c8run-troubleshooting.md).
