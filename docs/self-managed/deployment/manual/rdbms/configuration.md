---
id: configuration
sidebar_label: Configuration
title: Configure RDBMS for manual installations
description: Configure drivers, connection parameters, schema management, and operations for manual RDBMS installations.
---

Configure RDBMS secondary storage for **manual** Camunda 8 installations (VM, bare metal, or standalone Java).

## Prerequisites

- **Supported RDBMS**: See the [RDBMS support policy](/self-managed/concepts/databases/relational-db/rdbms-support-policy.md).
- **JDBC drivers**: PostgreSQL, MariaDB, SQL Server, and H2 are bundled. Oracle and MySQL must be user-supplied.
- **Java 17+**: See [supported environments](/reference/supported-environments.md).
- **Database user**: Needs DDL permissions (CREATE TABLE, ALTER TABLE, DROP TABLE) for schema initialization.

## JDBC driver management

### Bundled drivers

Camunda bundles these JDBC drivers for redistribution:

| Database             | Driver artifact                        | Version | User-supplied needed? |
| -------------------- | -------------------------------------- | ------- | --------------------- |
| PostgreSQL           | `org.postgresql:postgresql`            | 42.7.8  | Optional              |
| MariaDB              | `org.mariadb.jdbc:mariadb-java-client` | 3.5.7   | Optional              |
| Microsoft SQL Server | `com.microsoft.sqlserver:mssql-jdbc`   | 12.10.2 | Optional              |
| H2                   | `com.h2database:h2`                    | 2.3.232 | Optional              |
| AWS Aurora JDBC      | Bundled                                | 2.6.8   | Optional              |

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

## Component configuration

### Zeebe

```bash
export CAMUNDA_DATA_SNAPSHOTPERIOD=5m
export CAMUNDA_DATA_EXPORTERS_RDBMS_CLASSNAME=io.camunda.exporter.rdbms.RdbmsExporter
export CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_FLUSHINTERVAL=PT0.5S
export CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_QUEUESIZE=1000
```

### Operate and Tasklist

Use the same RDBMS connection as Zeebe (shared schema):

```bash
export CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_URL="jdbc:postgresql://localhost:5432/camunda"
export CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_USERNAME="camunda"
export CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_PASSWORD="your-secure-password"
```

## Schema management

### Liquibase (recommended)

Liquibase is the recommended approach for schema management. It is supported for all components and automatically applies migrations on startup (when `auto-ddl=true`, the default).

When Liquibase runs successfully, you'll see this log entry:

```
io.camunda.application.commons.rdbms.MyBatisConfiguration - Initializing Liquibase for RDBMS with global table trimmedPrefix ''.
```

### Manual SQL execution

Manual SQL execution is equally supported. When using manual SQL:

- You must strictly adhere to the bundled scripts in the order provided.
- Camunda cannot guarantee future updates will work if you modify scripts.
- This approach is useful when DBAs require strict control over database changes.

Download scripts: [Access SQL and Liquibase scripts](/self-managed/deployment/helm/configure/database/access-sql-liquibase-scripts.md).

## Operations

### Backup and restore

**DBA owns backups** using native RDBMS tools (pg_dump, mysqldump, RMAN, etc.). Camunda handles consistency.

- Use vendor-recommended backup procedures.
- Backup frequency depends on your RPO (Recovery Point Objective).
- Database backups capture consistent state (Camunda flushes synchronously).
- Zeebe checkpoint position is stored in RDBMS.

**Restore procedure**:

1. Restore database from backup.
2. Start Camunda pointing to restored database.
3. Check logs for Liquibase completion and RdbmsExporter success.

### Schema upgrades

1. Backup your database.
2. Download scripts for target version: [Access SQL and Liquibase scripts](/self-managed/deployment/helm/configure/database/access-sql-liquibase-scripts.md).
3. **If using autoDDL (default)**: Liquibase runs on Zeebe startup.
4. **If using manual schema management**: Apply scripts manually, then start new Camunda version.

### Disabling automatic schema updates

For strict change control environments:

```bash
export CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_AUTO_DDL=false
```

DBA must apply schema changes manually using scripts. Zeebe fails to start if schema is out of date.

## Verification and troubleshooting

### Success indicators

**Liquibase migration complete:**

```
io.camunda.application.commons.rdbms.MyBatisConfiguration - Initializing Liquibase for RDBMS with global table trimmedPrefix ''.
```

No errors in Liquibase logs means migration was successful.

**RdbmsExporter running:**

```
io.camunda.exporter.rdbms.RdbmsExporter - [RDBMS Exporter] RdbmsExporter created with Configuration: flushInterval=PT0.5S, queueSize=1000
io.camunda.exporter.rdbms.RdbmsExporter - [RDBMS Exporter] Exporter opened with last exported position 126
```

No errors in RdbmsExporter logs means the exporter is healthy. More details about exported records require DEBUG log level.

### Common failure modes

| Symptom                                                      | Root cause                      | Fix                                                   |
| ------------------------------------------------------------ | ------------------------------- | ----------------------------------------------------- |
| `SQLNonTransientConnectionException: Socket fail to connect` | Invalid URL or unreachable host | Verify JDBC URL format and hostname/port resolution   |
| `SQLInvalidAuthorizationSpecException: Access denied`        | Wrong credentials               | Check username/password and database user permissions |
| `Failed to load driver class oracle.jdbc.OracleDriver`       | Missing JDBC driver             | Verify driver JAR in `/driver-lib` or classpath       |
| `Table 'camunda.EXPORTER_POSITION' doesn't exist`            | autoDDL=false on empty DB       | Run schema initialization scripts manually            |

**All failure modes above prevent Camunda startup.**

### Auto-DDL behavior

When started with `auto-ddl=false` on an empty database, the RdbmsExporter throws errors like:

```
### Error querying database. Cause: java.sql.SQLSyntaxErrorException: (conn=3) Table 'camunda.EXPORTER_POSITION' doesn't exist
### The error may exist in URL [jar:file:.../camunda-db-rdbms-8.9.0-SNAPSHOT.jar!/mapper/ExporterPositionMapper.xml]
### The error occurred while setting parameters
### SQL: SELECT PARTITION_ID, EXPORTER, LAST_EXPORTED_POSITION, CREATED, LAST_UPDATED FROM EXPORTER_POSITION WHERE PARTITION_ID = ?
### Cause: java.sql.SQLSyntaxErrorException: (conn=3) Table 'camunda.EXPORTER_POSITION' doesn't exist
```

**Solution**: Run schema initialization scripts manually using the bundled SQL or Liquibase scripts before starting Camunda.

## Performance tuning

### Exporter batching

```bash
# Lower flush interval = lower latency, more frequent writes
export CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_FLUSHINTERVAL=PT0.1S

# Higher queue size = better throughput, more memory
export CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_QUEUESIZE=5000
```

### Connection pooling

Tune based on your workload. Camunda uses the Hikari connection pool following Spring Boot best practices:

```bash
export CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_CONNECTION_POOL_MAXIMUM_POOL_SIZE=20
export CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_CONNECTION_POOL_MINIMUM_IDLE=10
export CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_CONNECTION_POOL_IDLE_TIMEOUT=600000
export CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_CONNECTION_POOL_MAX_LIFETIME=1800000
export CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_CONNECTION_POOL_CONNECTION_TIMEOUT=30000
```

### Database tuning

Consult your database vendor's guides:

- **PostgreSQL**: Index tuning, autovacuum settings
- **Oracle**: SGA size, parallel execution
- **MySQL/MariaDB**: Buffer pool sizing
- **SQL Server**: Memory configuration

## Security

### TLS/SSL

All RDBMS connections must use TLS in production:

```bash
# PostgreSQL
export CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_URL="jdbc:postgresql://localhost:5432/camunda?sslmode=require"

# See [RDBMS Helm configuration](/self-managed/deployment/helm/configure/database/rdbms.md) for other databases
```

### Secrets

Never hardcode passwords. Use environment variable injection:

```bash
export CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_PASSWORD=$(cat /run/secrets/db_password)
```

### Database permissions

Create user with minimum required privileges:

```sql
-- PostgreSQL example
CREATE ROLE camunda LOGIN PASSWORD 'secure-password';
GRANT CONNECT ON DATABASE camunda TO camunda;
GRANT USAGE ON SCHEMA public TO camunda;
GRANT CREATE ON DATABASE camunda TO camunda;
```

Avoid DROP, TRUNCATE, SUPERUSER, or other unnecessary privileges.

## Production checklist

Before deploying to production:

- [ ] RDBMS backup strategy defined and tested
- [ ] Schema initialization validated (autoDDL vs. manual)
- [ ] TLS/SSL configured for database connections
- [ ] Database user permissions set to minimum required
- [ ] Connection pooling tuned for expected load
- [ ] Monitoring and alerting configured
- [ ] Recovery procedure tested with backup/restore
- [ ] HA topology deployed (3+ Zeebe brokers across AZs)
- [ ] Optimize excluded (not supported with RDBMS secondary storage)

## Next steps

- [RDBMS production architecture](/self-managed/deployment/manual/rdbms/rdbms-production-architecture.md)
- [RDBMS support policy](/self-managed/concepts/databases/relational-db/rdbms-support-policy.md)
- [Access SQL and Liquibase scripts](/self-managed/deployment/helm/configure/database/access-sql-liquibase-scripts.md)
