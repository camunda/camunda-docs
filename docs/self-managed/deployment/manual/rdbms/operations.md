---
id: operations
sidebar_label: Operations and maintenance
title: Operations and maintenance for RDBMS manual installations
description: Backup, restore, upgrade, troubleshoot, tune, and secure RDBMS for manual Camunda installations.
---

Operate and maintain RDBMS secondary storage for manual Camunda 8 installations (VM, bare metal, or standalone Java).

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

- [RDBMS configuration](/self-managed/deployment/manual/rdbms/configuration.md)
- [RDBMS production architecture](/self-managed/deployment/manual/rdbms/rdbms-production-architecture.md)
- [RDBMS support policy](/self-managed/concepts/databases/relational-db/rdbms-support-policy.md)
- [Access SQL and Liquibase scripts](/self-managed/deployment/helm/configure/database/access-sql-liquibase-scripts.md)
