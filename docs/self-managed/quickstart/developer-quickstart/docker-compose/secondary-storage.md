---
title: Configure secondary storage with Docker Compose
sidebar_label: Secondary storage
description: Configure RDBMS, Elasticsearch, or OpenSearch as secondary storage for the Orchestration Cluster in Docker Compose.
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

<!-- markdownlint-disable MD033 -->

Use this page to configure secondary storage for the Orchestration Cluster in the Docker Compose quickstart.

## Choose a database configuration path

Camunda 8.10 uses different application configuration files for the lightweight and full Docker Compose setups.

| Setup                             | Default secondary storage | Select another backend                                                                                                                                                                 |
| :-------------------------------- | :------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Lightweight `docker-compose.yaml` | File-based H2             | Set `ORCHESTRATION_CONFIG_FILE` to a file from `configuration/`, then edit that file for your database connection.                                                                     |
| Full `docker-compose-full.yaml`   | File-based H2             | Replace the `camunda.data.secondary-storage` settings in `.orchestration/application.yaml` with the matching block from the file in `configuration/`, then edit the connection values. |

The full setup also requires an external Elasticsearch instance for Optimize. The PostgreSQL containers in the full setup store Management Identity and Web Modeler data; they do not store Orchestration Cluster data.

:::warning
Do not replace `.orchestration/application.yaml` in the full setup with a file from `configuration/`. The files in `configuration/` use the lightweight setup's Basic authentication settings. Replacing the full file removes its OpenID Connect (OIDC) and component configuration.
:::

Use this workflow for each backend:

1. Select the matching application file and database service from the table below.
1. Configure the application file for your setup:
   - **Lightweight setup:** Edit the selected `configuration/application-<database>.yaml` file and set `ORCHESTRATION_CONFIG_FILE` to its filename.
   - **Full setup:** Replace the `camunda.data.secondary-storage` block in `.orchestration/application.yaml` with the block from the selected file, then edit the copied values there.
1. Create `docker-compose.override.yaml` in the extracted distribution directory and copy the matching database service example into it.
1. If the backend requires an external JDBC driver, place the driver JAR directly in `driver-lib/`.
1. Start the setup with the command shown for that backend.

| Backend              | Application file              | Hostname from the override | JDBC driver                                        |
| :------------------- | :---------------------------- | :------------------------- | :------------------------------------------------- |
| H2                   | `application-h2.yaml`         | Not applicable             | Included                                           |
| PostgreSQL           | `application-postgresql.yaml` | `postgres-secondary`       | Included                                           |
| MariaDB              | `application-mariadb.yaml`    | `mariadb-secondary`        | Add the MariaDB Connector/J JAR to `driver-lib/`   |
| MySQL                | `application-mysql.yaml`      | `mysql-secondary`          | Add the MySQL Connector/J JAR to `driver-lib/`     |
| Oracle               | `application-oracle.yaml`     | `oracle-secondary`         | Add the Oracle JDBC driver JAR to `driver-lib/`    |
| Microsoft SQL Server | `application-mssql.yaml`      | `mssql-secondary`          | Add the Microsoft JDBC Driver JAR to `driver-lib/` |

When the database runs from `docker-compose.override.yaml`, replace `localhost` in the selected JDBC URL with the hostname shown in the table. The MySQL file uses host port `3307` by default; container-to-container traffic uses MySQL port `3306` instead.

:::note
Camunda configures the built-in exporter automatically from `camunda.data.secondary-storage.*`. You do not need to add a separate exporter class for the standard Docker Compose quickstart.
:::

### Run with RDBMS secondary storage

The following examples run each supported RDBMS backend as a separate Docker Compose service. Use them for local development and evaluation. Review the [RDBMS support policy](/self-managed/concepts/databases/relational-db/rdbms-support-policy.md#scope-and-applicability) before you plan another deployment type.

<Tabs groupId="docker-compose-rdbms" defaultValue="postgresql" values={[
{label: 'PostgreSQL', value: 'postgresql'},
{label: 'MariaDB', value: 'mariadb'},
{label: 'MySQL', value: 'mysql'},
{label: 'Oracle', value: 'oracle'},
{label: 'Microsoft SQL Server', value: 'mssql'},
{label: 'H2', value: 'h2'},
]}>
<TabItem value="postgresql">

Set the JDBC URL in the application configuration to `jdbc:postgresql://postgres-secondary:5432/camunda_secondary`.

```yaml
services:
  orchestration:
    depends_on:
      - postgres-secondary
    networks:
      - secondary-storage

  postgres-secondary:
    image: postgres:16
    environment:
      POSTGRES_DB: camunda_secondary
      POSTGRES_USER: camunda
      POSTGRES_PASSWORD: camunda
    volumes:
      - postgres-secondary-data:/var/lib/postgresql/data
    networks:
      - secondary-storage

volumes:
  postgres-secondary-data:

networks:
  secondary-storage:
```

```shell
# Lightweight setup
ORCHESTRATION_CONFIG_FILE=application-postgresql.yaml docker compose -f docker-compose.yaml -f docker-compose.override.yaml up -d

# Full setup
docker compose -f docker-compose-full.yaml -f docker-compose.override.yaml up -d
```

</TabItem>
<TabItem value="mariadb">

Set the JDBC URL in the application configuration to `jdbc:mariadb://mariadb-secondary:3306/camunda_secondary?serverTimezone=UTC`.

```yaml
services:
  orchestration:
    depends_on:
      - mariadb-secondary
    volumes:
      - ./driver-lib:/driver-lib:ro
    networks:
      - secondary-storage

  mariadb-secondary:
    image: mariadb:11.4
    environment:
      MARIADB_DATABASE: camunda_secondary
      MARIADB_USER: camunda
      MARIADB_PASSWORD: camunda
      MARIADB_ROOT_PASSWORD: rootcamunda
    volumes:
      - mariadb-secondary-data:/var/lib/mysql
    networks:
      - secondary-storage

volumes:
  mariadb-secondary-data:

networks:
  secondary-storage:
```

```shell
# Lightweight setup
ORCHESTRATION_CONFIG_FILE=application-mariadb.yaml docker compose -f docker-compose.yaml -f docker-compose.override.yaml up -d

# Full setup
docker compose -f docker-compose-full.yaml -f docker-compose.override.yaml up -d
```

Place the MariaDB Connector/J JAR directly in `driver-lib/` before you start either setup.

</TabItem>
<TabItem value="mysql">

Set the JDBC URL in the application configuration to `jdbc:mysql://mysql-secondary:3306/camunda_secondary?serverTimezone=UTC`.

```yaml
services:
  orchestration:
    depends_on:
      - mysql-secondary
    volumes:
      - ./driver-lib:/driver-lib:ro
    networks:
      - secondary-storage

  mysql-secondary:
    image: mysql:9.7
    environment:
      MYSQL_DATABASE: camunda_secondary
      MYSQL_USER: camunda
      MYSQL_PASSWORD: camunda
      MYSQL_ROOT_PASSWORD: rootcamunda
    volumes:
      - mysql-secondary-data:/var/lib/mysql
    networks:
      - secondary-storage

volumes:
  mysql-secondary-data:

networks:
  secondary-storage:
```

```shell
# Lightweight setup
ORCHESTRATION_CONFIG_FILE=application-mysql.yaml docker compose -f docker-compose.yaml -f docker-compose.override.yaml up -d

# Full setup
docker compose -f docker-compose-full.yaml -f docker-compose.override.yaml up -d
```

Place the MySQL Connector/J JAR directly in `driver-lib/` before you start either setup.

</TabItem>
<TabItem value="oracle">

Set the JDBC URL in the application configuration to `jdbc:oracle:thin:@//oracle-secondary:1521/FREEPDB1`.

```yaml
services:
  orchestration:
    depends_on:
      - oracle-secondary
    volumes:
      - ./driver-lib:/driver-lib:ro
    networks:
      - secondary-storage

  oracle-secondary:
    image: gvenzl/oracle-free:23-slim
    environment:
      ORACLE_PASSWORD: oracle
      APP_USER: camunda
      APP_USER_PASSWORD: camunda
    volumes:
      - oracle-secondary-data:/opt/oracle/oradata
    networks:
      - secondary-storage

volumes:
  oracle-secondary-data:

networks:
  secondary-storage:
```

```shell
# Lightweight setup
ORCHESTRATION_CONFIG_FILE=application-oracle.yaml docker compose -f docker-compose.yaml -f docker-compose.override.yaml up -d

# Full setup
docker compose -f docker-compose-full.yaml -f docker-compose.override.yaml up -d
```

Place the Oracle JDBC driver JAR directly in `driver-lib/` before you start either setup.

</TabItem>
<TabItem value="mssql">

Set the JDBC URL in the application configuration to `jdbc:sqlserver://mssql-secondary:1433;databaseName=camunda_secondary;encrypt=false`.

```yaml
services:
  orchestration:
    depends_on:
      - mssql-secondary
    volumes:
      - ./driver-lib:/driver-lib:ro
    networks:
      - secondary-storage

  mssql-secondary:
    image: mcr.microsoft.com/mssql/server:2022-latest
    environment:
      ACCEPT_EULA: "Y"
      MSSQL_SA_PASSWORD: Camunda123!
      MSSQL_PID: Developer
    volumes:
      - mssql-secondary-data:/var/opt/mssql
    networks:
      - secondary-storage

volumes:
  mssql-secondary-data:

networks:
  secondary-storage:
```

```shell
# Lightweight setup
docker compose -f docker-compose.yaml -f docker-compose.override.yaml up -d mssql-secondary
docker compose -f docker-compose.yaml -f docker-compose.override.yaml exec mssql-secondary /opt/mssql-tools18/bin/sqlcmd -C -S localhost -U sa -P 'Camunda123!' -Q "IF DB_ID('camunda_secondary') IS NULL CREATE DATABASE camunda_secondary"
ORCHESTRATION_CONFIG_FILE=application-mssql.yaml docker compose -f docker-compose.yaml -f docker-compose.override.yaml up -d

# Full setup
docker compose -f docker-compose-full.yaml -f docker-compose.override.yaml up -d mssql-secondary
docker compose -f docker-compose-full.yaml -f docker-compose.override.yaml exec mssql-secondary /opt/mssql-tools18/bin/sqlcmd -C -S localhost -U sa -P 'Camunda123!' -Q "IF DB_ID('camunda_secondary') IS NULL CREATE DATABASE camunda_secondary"
docker compose -f docker-compose-full.yaml -f docker-compose.override.yaml up -d
```

Place the Microsoft JDBC Driver JAR directly in `driver-lib/` before you start either setup.

</TabItem>
<TabItem value="h2">

H2 is the default secondary storage backend in both application configuration files. You don't need a `docker-compose.override.yaml` file.

```shell
# Lightweight setup
docker compose up -d

# Full setup
docker compose -f docker-compose-full.yaml up -d
```

Use H2 only for development, testing, and evaluation. It is not a production backend.

</TabItem>
</Tabs>

### Switch between RDBMS, Elasticsearch, and OpenSearch

For a document-store backend, add the backend settings to `docker-compose.override.yaml`. The environment variables override the secondary storage settings in either application configuration file.

:::note
These examples change the Orchestration Cluster secondary storage only. In the full setup, Optimize always requires Elasticsearch. The Elasticsearch example can serve both Orchestration and Optimize. If Orchestration uses OpenSearch, configure a separate Elasticsearch endpoint for Optimize in `.env`.
:::

<Tabs groupId="docker-compose-docstore" defaultValue="elasticsearch" values={[
{label: 'Elasticsearch', value: 'elasticsearch'},
{label: 'OpenSearch', value: 'opensearch'},
]}>
<TabItem value="elasticsearch">

```yaml
services:
  orchestration:
    environment:
      CAMUNDA_DATA_SECONDARY_STORAGE_TYPE: elasticsearch
      CAMUNDA_DATA_SECONDARY_STORAGE_ELASTICSEARCH_URL: http://elasticsearch-secondary:9200
      CAMUNDA_DATA_SECONDARY_STORAGE_ELASTICSEARCH_USERNAME: ""
      CAMUNDA_DATA_SECONDARY_STORAGE_ELASTICSEARCH_PASSWORD: ""
    depends_on:
      - elasticsearch-secondary
    networks:
      - secondary-storage

  elasticsearch-secondary:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.19.11
    environment:
      discovery.type: single-node
      xpack.security.enabled: "false"
      ES_JAVA_OPTS: -Xms512m -Xmx512m
    ports:
      - "9200:9200"
    volumes:
      - elasticsearch-secondary-data:/usr/share/elasticsearch/data
    networks:
      - secondary-storage

volumes:
  elasticsearch-secondary-data:

networks:
  secondary-storage:
```

```shell
# Lightweight setup
docker compose -f docker-compose.yaml -f docker-compose.override.yaml up -d

# Full setup
docker compose -f docker-compose-full.yaml -f docker-compose.override.yaml up -d
```

</TabItem>
<TabItem value="opensearch">

```yaml
services:
  orchestration:
    environment:
      CAMUNDA_DATA_SECONDARY_STORAGE_TYPE: opensearch
      CAMUNDA_DATA_SECONDARY_STORAGE_OPENSEARCH_URL: http://opensearch-secondary:9200
    depends_on:
      - opensearch-secondary
    networks:
      - secondary-storage

  opensearch-secondary:
    image: opensearchproject/opensearch:2.19.3
    environment:
      discovery.type: single-node
      OPENSEARCH_JAVA_OPTS: -Xms512m -Xmx512m
      DISABLE_SECURITY_PLUGIN: "true"
    volumes:
      - opensearch-secondary-data:/usr/share/opensearch/data
    networks:
      - secondary-storage

volumes:
  opensearch-secondary-data:

networks:
  secondary-storage:
```

```shell
# Lightweight setup
docker compose -f docker-compose.yaml -f docker-compose.override.yaml up -d

# Full setup, with a separate Elasticsearch endpoint configured in .env
docker compose -f docker-compose-full.yaml -f docker-compose.override.yaml up -d
```

</TabItem>
</Tabs>

### Document-store environment variables

Use these variables when you adapt the Elasticsearch and OpenSearch examples:

| Variable                                                | Use                                                        |
| :------------------------------------------------------ | :--------------------------------------------------------- |
| `CAMUNDA_DATA_SECONDARY_STORAGE_TYPE`                   | Selects `elasticsearch` or `opensearch`.                   |
| `CAMUNDA_DATA_SECONDARY_STORAGE_ELASTICSEARCH_URL`      | Endpoint for Elasticsearch.                                |
| `CAMUNDA_DATA_SECONDARY_STORAGE_ELASTICSEARCH_USERNAME` | Username for Elasticsearch when authentication is enabled. |
| `CAMUNDA_DATA_SECONDARY_STORAGE_ELASTICSEARCH_PASSWORD` | Password for Elasticsearch when authentication is enabled. |
| `CAMUNDA_DATA_SECONDARY_STORAGE_OPENSEARCH_URL`         | Endpoint for OpenSearch.                                   |

For additional secondary storage settings, see [Configure secondary storage](/self-managed/concepts/secondary-storage/configuring-secondary-storage.md) and [Configure RDBMS for manual installations](/self-managed/deployment/manual/rdbms/configuration.md).

## Next steps

- Review [configure Docker Compose environments](./configuration.md).
- Review [use connectors and deploy processes with Docker Compose](./connectors-and-modeling.md).
