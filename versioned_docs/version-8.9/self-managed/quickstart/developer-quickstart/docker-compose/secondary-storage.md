---
title: Configure secondary storage with Docker Compose
sidebar_label: Secondary storage
description: Configure RDBMS, Elasticsearch, or OpenSearch as secondary storage for the Orchestration Cluster in Docker Compose.
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

<!-- markdownlint-disable MD033 -->

Use this page to configure secondary storage for the Orchestration Cluster in the Docker Compose quickstart.

## Configure secondary storage for the Orchestration Cluster

Both the lightweight and full configurations use file-based H2 secondary storage by default. The lightweight setup selects `configuration/application-h2.yaml` with `ORCHESTRATION_CONFIG_FILE`; the full setup mounts `.orchestration/application.yaml`.

The examples below use Spring environment variables in `docker-compose.override.yaml`. These variables override the secondary-storage settings in either mounted application file, so one override can be used with the lightweight or full configuration. The full configuration continues to run its bundled Elasticsearch service for Optimize and legacy exporters.

Use this workflow for each example:

1. Create `docker-compose.override.yaml` in the extracted distribution directory.
1. Copy the backend-specific example into that file.
1. If the backend requires an external JDBC driver, place the driver JAR directly in `./driver-lib` and keep the `./driver-lib:/driver-lib` volume mount from the example.
1. Start the lightweight or full stack with the command shown below the example.

:::note
Camunda configures the built-in exporter automatically from `camunda.data.secondary-storage.*`. You do not need to add a separate exporter class for the standard Docker Compose quickstart.
:::

### Use RDBMS secondary storage

These examples switch the Orchestration Cluster from H2 to another RDBMS. They are suitable for local development and evaluation. PostgreSQL, MariaDB, and SQL Server drivers are bundled in the image. MySQL and Oracle require you to provide the JDBC driver.

Review the [RDBMS support policy](/self-managed/concepts/databases/relational-db/rdbms-support-policy.md#scope-and-applicability) before you plan another deployment type.

<Tabs groupId="docker-compose-rdbms" defaultValue="postgresql" values={[
{label: 'PostgreSQL', value: 'postgresql'},
{label: 'MariaDB', value: 'mariadb'},
{label: 'MySQL', value: 'mysql'},
{label: 'Oracle', value: 'oracle'},
{label: 'Microsoft SQL Server', value: 'mssql'},
{label: 'H2', value: 'h2'},
]}>
<TabItem value="postgresql">

```yaml
services:
  orchestration:
    environment:
      CAMUNDA_DATA_SECONDARY_STORAGE_TYPE: rdbms
      CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_DATABASEVENDORID: postgresql
      CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_URL: jdbc:postgresql://postgres-secondary:5432/camunda_secondary
      CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_USERNAME: camunda
      CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_PASSWORD: camunda
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
docker compose -f docker-compose.yaml -f docker-compose.override.yaml up -d

# Full setup
docker compose -f docker-compose-full.yaml -f docker-compose.override.yaml up -d
```

</TabItem>
<TabItem value="mariadb">

```yaml
services:
  orchestration:
    environment:
      CAMUNDA_DATA_SECONDARY_STORAGE_TYPE: rdbms
      CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_DATABASEVENDORID: mariadb
      CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_URL: jdbc:mariadb://mariadb-secondary:3306/camunda_secondary?serverTimezone=UTC
      CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_USERNAME: camunda
      CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_PASSWORD: camunda
    depends_on:
      - mariadb-secondary
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
docker compose -f docker-compose.yaml -f docker-compose.override.yaml up -d

# Full setup
docker compose -f docker-compose-full.yaml -f docker-compose.override.yaml up -d
```

</TabItem>
<TabItem value="mysql">

```yaml
services:
  orchestration:
    environment:
      CAMUNDA_DATA_SECONDARY_STORAGE_TYPE: rdbms
      CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_DATABASEVENDORID: mysql
      CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_URL: jdbc:mysql://mysql-secondary:3306/camunda_secondary?serverTimezone=UTC
      CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_USERNAME: camunda
      CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_PASSWORD: camunda
    depends_on:
      - mysql-secondary
    volumes:
      - ./driver-lib:/driver-lib:ro
    networks:
      - secondary-storage

  mysql-secondary:
    image: mysql:8.4
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
docker compose -f docker-compose.yaml -f docker-compose.override.yaml up -d

# Full setup
docker compose -f docker-compose-full.yaml -f docker-compose.override.yaml up -d
```

Place the MySQL Connector/J JAR directly in `./driver-lib` before you start the stack.

</TabItem>
<TabItem value="oracle">

```yaml
services:
  orchestration:
    environment:
      CAMUNDA_DATA_SECONDARY_STORAGE_TYPE: rdbms
      CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_DATABASEVENDORID: oracle
      CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_URL: jdbc:oracle:thin:@//oracle-secondary:1521/FREEPDB1
      CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_USERNAME: camunda
      CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_PASSWORD: camunda
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
docker compose -f docker-compose.yaml -f docker-compose.override.yaml up -d

# Full setup
docker compose -f docker-compose-full.yaml -f docker-compose.override.yaml up -d
```

Place the Oracle JDBC driver JAR directly in `./driver-lib` before you start the stack.

</TabItem>
<TabItem value="mssql">

```yaml
services:
  orchestration:
    environment:
      CAMUNDA_DATA_SECONDARY_STORAGE_TYPE: rdbms
      CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_DATABASEVENDORID: mssql
      CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_URL: jdbc:sqlserver://mssql-secondary:1433;databaseName=camunda_secondary;encrypt=false
      CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_USERNAME: sa
      CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_PASSWORD: Camunda123!
    depends_on:
      - mssql-secondary
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
docker compose -f docker-compose.yaml -f docker-compose.override.yaml up -d

# Full setup
docker compose -f docker-compose-full.yaml -f docker-compose.override.yaml up -d mssql-secondary
docker compose -f docker-compose-full.yaml -f docker-compose.override.yaml exec mssql-secondary /opt/mssql-tools18/bin/sqlcmd -C -S localhost -U sa -P 'Camunda123!' -Q "IF DB_ID('camunda_secondary') IS NULL CREATE DATABASE camunda_secondary"
docker compose -f docker-compose-full.yaml -f docker-compose.override.yaml up -d
```

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

To switch from RDBMS to a document-store backend, override the backend type and connection settings. The full setup continues to use its bundled Elasticsearch service for Optimize even when the Orchestration Cluster uses a separate Elasticsearch or OpenSearch service.

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

# Full setup
docker compose -f docker-compose-full.yaml -f docker-compose.override.yaml up -d
```

</TabItem>
</Tabs>

### Secondary storage environment variables

Use these variables when you adapt the examples to your own local setup:

| Variable                                                | Use                                                                                                                                    |
| :------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------- |
| `CAMUNDA_DATA_SECONDARY_STORAGE_TYPE`                   | Selects the backend family: `rdbms`, `elasticsearch`, or `opensearch`.                                                                 |
| `CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_URL`              | JDBC connection string for the relational database used as secondary storage.                                                          |
| `CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_USERNAME`         | Database username for RDBMS secondary storage.                                                                                         |
| `CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_PASSWORD`         | Database password for RDBMS secondary storage.                                                                                         |
| `CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_DATABASEVENDORID` | Optional vendor override. Use `postgresql`, `mariadb`, `mysql`, `oracle`, `mssql`, or `h2` when you want to make the backend explicit. |
| `CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_AUTO_DDL`         | Controls whether Camunda creates and updates the schema automatically. The default is `true`.                                          |
| `CAMUNDA_DATA_SECONDARY_STORAGE_ELASTICSEARCH_URL`      | Endpoint for Elasticsearch when `type=elasticsearch`.                                                                                  |
| `CAMUNDA_DATA_SECONDARY_STORAGE_OPENSEARCH_URL`         | Endpoint for OpenSearch when `type=opensearch`.                                                                                        |

For additional secondary storage settings, see [Configure secondary storage](/self-managed/concepts/secondary-storage/configuring-secondary-storage.md) and [Configure RDBMS for manual installations](/self-managed/deployment/manual/rdbms/configuration.md).

## Next steps

- Review [configure Docker Compose environments](./configuration.md).
- Review [use connectors and deploy processes with Docker Compose](./connectors-and-modeling.md).
