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

The lightweight `docker-compose.yaml` starts the Orchestration Cluster with Elasticsearch as secondary storage. To test another backend, add a `docker-compose.override.yaml` file next to the extracted Compose files and override the `camunda` service there.

The full `docker-compose-full.yaml` configuration already includes PostgreSQL for Management Identity and Web Modeler. That database is separate from the Orchestration Cluster secondary storage. If you want the Orchestration Cluster itself to use RDBMS, configure the `camunda` service as shown in the examples below.

Use this workflow for each example:

1. Create `docker-compose.override.yaml` in the extracted distribution directory.
1. Copy the backend-specific example into that file.
1. If the backend requires an external JDBC driver, place the driver JAR directly in `./driver-lib` and keep the `./driver-lib:/driver-lib` volume mount from the example.
1. Start the updated stack with the command shown below the example.

:::note
Camunda configures the built-in exporter automatically from `camunda.data.secondary-storage.*`. You do not need to add a separate exporter class for the standard Docker Compose quickstart.
:::

:::note
Some existing pages still use the legacy environment variable prefix `CAMUNDA_DATA_SECONDARYSTORAGE_*`. The examples on this page use `CAMUNDA_DATA_SECONDARY_STORAGE_*` consistently.
:::

### Use RDBMS secondary storage

These examples switch the Orchestration Cluster from Elasticsearch to RDBMS. They are suitable for local development and evaluation. PostgreSQL and H2 are the simplest starting points. MariaDB and SQL Server are also bundled in the image. MySQL and Oracle require you to provide the JDBC driver.

:::note
The Orchestration Cluster supports RDBMS as secondary storage. Operate support on RDBMS is still limited in 8.9-alpha3. Before you use these examples beyond local development, review the [RDBMS support policy](/self-managed/concepts/databases/relational-db/rdbms-support-policy.md#operate-with-rdbms).
:::

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
  camunda:
    environment:
      CAMUNDA_DATA_SECONDARY_STORAGE_TYPE: rdbms
      CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_DATABASEVENDORID: postgresql
      CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_URL: jdbc:postgresql://postgres:5432/camunda_secondary
      CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_USERNAME: camunda
      CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_PASSWORD: camunda
    depends_on:
      - postgres

  postgres:
    image: postgres:16
    environment:
      POSTGRES_DB: camunda_secondary
      POSTGRES_USER: camunda
      POSTGRES_PASSWORD: camunda
    ports:
      - "5432:5432"
    volumes:
      - postgres-secondary-data:/var/lib/postgresql/data

volumes:
  postgres-secondary-data:
```

```shell
docker compose up -d camunda postgres
```

</TabItem>
<TabItem value="mariadb">

```yaml
services:
  camunda:
    environment:
      CAMUNDA_DATA_SECONDARY_STORAGE_TYPE: rdbms
      CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_DATABASEVENDORID: mariadb
      CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_URL: jdbc:mariadb://mariadb:3306/camunda_secondary?serverTimezone=UTC
      CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_USERNAME: camunda
      CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_PASSWORD: camunda
    depends_on:
      - mariadb

  mariadb:
    image: mariadb:11.4
    environment:
      MARIADB_DATABASE: camunda_secondary
      MARIADB_USER: camunda
      MARIADB_PASSWORD: camunda
      MARIADB_ROOT_PASSWORD: rootcamunda
    ports:
      - "3306:3306"
    volumes:
      - mariadb-secondary-data:/var/lib/mysql

volumes:
  mariadb-secondary-data:
```

```shell
docker compose up -d camunda mariadb
```

</TabItem>
<TabItem value="mysql">

```yaml
services:
  camunda:
    environment:
      CAMUNDA_DATA_SECONDARY_STORAGE_TYPE: rdbms
      CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_DATABASEVENDORID: mysql
      CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_URL: jdbc:mysql://mysql:3306/camunda_secondary?serverTimezone=UTC
      CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_USERNAME: camunda
      CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_PASSWORD: camunda
    depends_on:
      - mysql
    volumes:
      - ./driver-lib:/driver-lib

  mysql:
    image: mysql:8.4
    environment:
      MYSQL_DATABASE: camunda_secondary
      MYSQL_USER: camunda
      MYSQL_PASSWORD: camunda
      MYSQL_ROOT_PASSWORD: rootcamunda
    ports:
      - "3306:3306"
    volumes:
      - mysql-secondary-data:/var/lib/mysql

volumes:
  mysql-secondary-data:
```

```shell
docker compose up -d camunda mysql
```

Place the MySQL Connector/J JAR directly in `./driver-lib` before you start the stack.

</TabItem>
<TabItem value="oracle">

```yaml
services:
  camunda:
    environment:
      CAMUNDA_DATA_SECONDARY_STORAGE_TYPE: rdbms
      CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_DATABASEVENDORID: oracle
      CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_URL: jdbc:oracle:thin:@oracle:1521/FREEPDB1
      CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_USERNAME: camunda
      CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_PASSWORD: camunda
    depends_on:
      - oracle
    volumes:
      - ./driver-lib:/driver-lib

  oracle:
    image: gvenzl/oracle-free:23-slim
    environment:
      ORACLE_PASSWORD: oracle
      APP_USER: camunda
      APP_USER_PASSWORD: camunda
    ports:
      - "1521:1521"
    volumes:
      - oracle-secondary-data:/opt/oracle/oradata

volumes:
  oracle-secondary-data:
```

```shell
docker compose up -d camunda oracle
```

Place the Oracle JDBC driver JAR directly in `./driver-lib` before you start the stack.

</TabItem>
<TabItem value="mssql">

```yaml
services:
  camunda:
    environment:
      CAMUNDA_DATA_SECONDARY_STORAGE_TYPE: rdbms
      CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_DATABASEVENDORID: mssql
      CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_URL: jdbc:sqlserver://mssql:1433;databaseName=camunda_secondary;encrypt=false
      CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_USERNAME: sa
      CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_PASSWORD: Camunda123!
    depends_on:
      - mssql

  mssql:
    image: mcr.microsoft.com/mssql/server:2022-latest
    environment:
      ACCEPT_EULA: "Y"
      MSSQL_SA_PASSWORD: Camunda123!
      MSSQL_PID: Developer
    ports:
      - "1433:1433"
    volumes:
      - mssql-secondary-data:/var/opt/mssql

volumes:
  mssql-secondary-data:
```

```shell
docker compose up -d mssql
docker compose exec mssql /opt/mssql-tools18/bin/sqlcmd -C -S localhost -U sa -P 'Camunda123!' -Q "IF DB_ID('camunda_secondary') IS NULL CREATE DATABASE camunda_secondary"
docker compose up -d camunda
```

</TabItem>
<TabItem value="h2">

```yaml
services:
  camunda:
    environment:
      CAMUNDA_DATA_SECONDARY_STORAGE_TYPE: rdbms
      CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_DATABASEVENDORID: h2
      CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_URL: jdbc:h2:file:./camunda-data/h2db
      CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_USERNAME: sa
      CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_PASSWORD: ""
    volumes:
      - h2-secondary-data:/usr/local/camunda/camunda-data

volumes:
  h2-secondary-data:
```

```shell
docker compose up -d camunda
```

Use H2 only for development, testing, and evaluation. It is not a production backend.

</TabItem>
</Tabs>

### Switch between RDBMS, Elasticsearch, and OpenSearch

To switch back from RDBMS to a document-store backend, change the `CAMUNDA_DATA_SECONDARY_STORAGE_TYPE` value and keep only the backend-specific connection settings you need.

<Tabs groupId="docker-compose-docstore" defaultValue="elasticsearch" values={[
{label: 'Elasticsearch', value: 'elasticsearch'},
{label: 'OpenSearch', value: 'opensearch'},
]}>
<TabItem value="elasticsearch">

```yaml
services:
  camunda:
    environment:
      CAMUNDA_DATA_SECONDARY_STORAGE_TYPE: elasticsearch
      CAMUNDA_DATA_SECONDARY_STORAGE_ELASTICSEARCH_URL: http://elasticsearch:9200
      CAMUNDA_DATA_SECONDARY_STORAGE_ELASTICSEARCH_USERNAME: ""
      CAMUNDA_DATA_SECONDARY_STORAGE_ELASTICSEARCH_PASSWORD: ""
```

```shell
docker compose up -d camunda elasticsearch
```

This matches the default lightweight quickstart backend.

</TabItem>
<TabItem value="opensearch">

```yaml
services:
  camunda:
    environment:
      CAMUNDA_DATA_SECONDARY_STORAGE_TYPE: opensearch
      CAMUNDA_DATA_SECONDARY_STORAGE_OPENSEARCH_URL: http://opensearch:9200
    depends_on:
      - opensearch

  opensearch:
    image: opensearchproject/opensearch:2.19.3
    environment:
      discovery.type: single-node
      OPENSEARCH_JAVA_OPTS: -Xms512m -Xmx512m
      DISABLE_SECURITY_PLUGIN: "true"
    ports:
      - "9200:9200"
      - "9600:9600"
    volumes:
      - opensearch-secondary-data:/usr/share/opensearch/data

volumes:
  opensearch-secondary-data:
```

```shell
docker compose up -d camunda opensearch
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
