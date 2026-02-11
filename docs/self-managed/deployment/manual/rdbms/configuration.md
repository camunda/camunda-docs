---
id: configuration
sidebar_label: Configuration
title: Configure RDBMS for manual installations
description: Configure drivers, connection parameters, and schema initialization for manual RDBMS installations.
---

Configure RDBMS secondary storage drivers, connections, and initial schema for **manual** Camunda 8 installations (VM, bare metal, or standalone Java).

## Prerequisites

- **Supported RDBMS**: See the [RDBMS support policy](/self-managed/concepts/databases/relational-db/rdbms-support-policy.md).
- **JDBC drivers**: PostgreSQL, MariaDB, SQL Server, and H2 are bundled. Oracle and MySQL must be user-supplied.
- **Java 17+**: See [supported environments](/reference/supported-environments.md).
- **Database user**: Needs DDL permissions (CREATE TABLE, ALTER TABLE, DROP TABLE) for schema initialization.

## JDBC driver management

### Bundled drivers

Camunda bundles these JDBC drivers for redistribution:

| Database             | Driver artifact                        |
| -------------------- | -------------------------------------- |
| PostgreSQL           | `org.postgresql:postgresql`            |
| MariaDB              | `org.mariadb.jdbc:mariadb-java-client` |
| Microsoft SQL Server | `com.microsoft.sqlserver:mssql-jdbc`   |
| H2                   | `com.h2database:h2`                    |
| AWS Aurora JDBC      | Bundled                                |

You can optionally supply your own version of any bundled driver for flexibility or compliance requirements.

### User-supplied drivers (Oracle, MySQL)

**Recommended approach**: Place drivers in `/opt/camunda-drivers` and set CLASSPATH:

```bash
export CLASSPATH="/opt/camunda-drivers/*:$CLASSPATH"
./camunda.sh
```

For Docker, mount external drivers using a volume. The driver JAR must be placed directly in the mounted directory (no subdirectories):

```yaml
services:
  camunda:
    image: camunda/camunda-platform:8.9.0
    ports:
      - "8080:8080"
      - "26500:26500"
      - "9600:9600"
    environment:
      CAMUNDA_DATA_SECONDARY_STORAGE_TYPE: rdbms
      CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_URL: jdbc:mysql://mysql:3306/camunda
      CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_USERNAME: camunda
      CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_PASSWORD: demo
    volumes:
      - /path/to/driver-lib:/driver-lib
```

## Database setup

### Step 1: Create database and user

PostgreSQL example:

```sql
CREATE DATABASE camunda ENCODING 'UTF8';
CREATE USER camunda WITH PASSWORD 'your-secure-password';
GRANT CONNECT ON DATABASE camunda TO camunda;
GRANT USAGE ON SCHEMA public TO camunda;
GRANT CREATE ON DATABASE camunda TO camunda;
```

For other databases, see [RDBMS Helm configuration](/self-managed/deployment/helm/configure/database/rdbms.md).

### Step 2: Configure connection

Use the unified Camunda configuration properties:

```bash
export CAMUNDA_DATA_SECONDARY_STORAGE_TYPE=rdbms
export CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_URL="jdbc:postgresql://localhost:5432/camunda"
export CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_USERNAME="camunda"
export CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_PASSWORD="your-secure-password"
```

### Step 3: Schema initialization

By default, Liquibase automatically creates the schema on first startup. To manually manage schema:

```bash
export CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_AUTO_DDL=false
```

Then apply SQL/Liquibase scripts manually using your DBA tools. See [access SQL and Liquibase scripts](/self-managed/deployment/helm/configure/database/access-sql-liquibase-scripts.md).

## Orchestration Cluster configuration

The Orchestration Cluster uses a unified RDBMS configuration for all components (Zeebe, Operate, Tasklist, Identity).

### Connection parameters

All components share the same database connection:

```bash
export CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_URL="jdbc:postgresql://localhost:5432/camunda"
export CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_USERNAME="camunda"
export CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_PASSWORD="your-secure-password"
```

### Zeebe exporter configuration

Configure Zeebe's exporter flush behavior:

```bash
export CAMUNDA_DATA_SNAPSHOTPERIOD=5m
export CAMUNDA_DATA_EXPORTERS_RDBMS_CLASSNAME=io.camunda.exporter.rdbms.RdbmsExporter
export CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_FLUSHINTERVAL=PT0.5S
export CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_QUEUESIZE=1000
```

## Schema management

### Liquibase (recommended)

Liquibase is the recommended approach for schema management. It is supported for the Orchestration Cluster and automatically applies migrations on startup (when `auto-ddl=true`, the default).

When Liquibase runs successfully, you'll see this log entry at INFO level:

```
[INFO] io.camunda.application.commons.rdbms.MyBatisConfiguration - Initializing Liquibase for RDBMS with global table trimmedPrefix ''.
```

### Manual SQL execution

Manual SQL execution is supported as an alternative. When using manual SQL:

- You must strictly adhere to the bundled scripts in the order provided.
- Camunda cannot guarantee future updates will work if you modify scripts.
- This approach is useful when DBAs require strict control over database changes.

Download scripts: [Access SQL and Liquibase scripts](/self-managed/deployment/helm/configure/database/access-sql-liquibase-scripts.md).

## Next steps

- [Operations and maintenance](/self-managed/deployment/manual/rdbms/operations.md)
- [RDBMS production architecture](/self-managed/deployment/manual/rdbms/rdbms-production-architecture.md)
- [RDBMS support policy](/self-managed/concepts/databases/relational-db/rdbms-support-policy.md)
- [Access SQL and Liquibase scripts](/self-managed/deployment/helm/configure/database/access-sql-liquibase-scripts.md)
