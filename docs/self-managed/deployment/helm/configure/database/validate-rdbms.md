---
id: validate-rdbms
title: Validate RDBMS connectivity
description: Verify that an Orchestration Cluster deployed via Helm can connect to an external RDBMS, initialize schema, and export data.
---

Verify RDBMS connectivity, schema initialization, and exporter activity for Helm deployments.

:::note Related pages

- **[Configure RDBMS](rdbms.md)** - Configuration reference and Helm values.
- **[JDBC driver management](rdbms-jdbc-drivers.md)** - Managing custom database drivers.
- **[Schema management](rdbms-schema-management.md)** - Schema creation and lifecycle.
- **[Troubleshooting](rdbms-troubleshooting.md)** - Common issues and diagnostic steps.
  :::

:::note
8.9-alpha3 stabilizes application-side RDBMS behavior. Log lines and behavior may change in later alphas. This page documents current alpha3 patterns.
:::

Supported databases include PostgreSQL, MySQL/MariaDB, and Oracle (examples below). Use your database vendor’s CLI tools for direct verification.

## Prerequisites

- The database endpoint is reachable from the Kubernetes cluster (DNS, routing, firewall/security groups, NetworkPolicies).
- Your Helm values are configured for RDBMS secondary storage and the RDBMS exporter is enabled.
- For databases that require external JDBC drivers (for example Oracle), the driver JAR is available to the Orchestration Cluster at runtime.

:::note
In alpha3, the pod should only become `Ready` when the application can connect to the database. Success of Liquibase and a running exporter are best confirmed via logs and direct database inspection.
:::

## How to verify connectivity

Run a database client from within the cluster (either in an existing pod or in a temporary debug pod).

### PostgreSQL example (psql)

```bash
# Option A: run an ephemeral pod with psql (recommended)
kubectl run -i --rm --tty pg-client \
  --image=postgres:15 \
  --restart=Never \
  --namespace camunda \
  --command -- bash

# Inside the pod:
psql "host=POSTGRES_HOST port=5432 user=camunda dbname=camunda password=REDACTED" -c '\dt'
```

If you prefer `kubectl exec`, ensure the target container image includes `psql`.

### MySQL/MariaDB example (mysql)

```bash
kubectl run -i --rm --tty mysql-client \
  --image=mysql:8 \
  --restart=Never \
  --namespace camunda \
  --command -- bash

# Inside the pod:
mysql -h MYSQL_HOST -P 3306 -u camunda -pREDACTED camunda -e 'SHOW TABLES;'
```

### Oracle example (sqlplus)

Use an image that includes Oracle client tools (for example sqlplus) and list tables:

```sql
SELECT table_name FROM user_tables;
```

What to expect:

- Success: The client connects and can list tables (or list schemas).
- Failure: DNS/connection/authentication errors (the application typically fails fast and does not become `Ready`).

## What successful schema creation looks like

### Liquibase log indicator

Check Orchestration Cluster logs for Liquibase initialization:

```bash
kubectl -n camunda logs deploy/orchestration | grep -E "Liquibase|MyBatisConfiguration"
```

A successful run includes a line similar to:

```pgsql
[TIMESTAMP] [main] INFO io.camunda.application.commons.rdbms.MyBatisConfiguration - Initializing Liquibase for RDBMS with global table trimmedPrefix ''.
```

When Liquibase runs without errors, schema creation is considered successful. If `autoDDL` is disabled on an empty database, the exporter will fail because required tables do not exist.

### Confirm tables exist (SQL)

PostgreSQL:

```sql
\dt
```

MySQL/MariaDB:

```sql
SHOW TABLES;
```

Oracle:

```sql
SELECT table_name FROM user_tables;
```

If tables exist (for example `EXPORTER_POSITION`, `AUTHORIZATIONS`, `BATCH_OPERATION`), schema initialization succeeded.

## Verify the RDBMS exporter is running and flushing

### Exporter log indicators

Search Orchestration Cluster logs for exporter startup:

```bash
kubectl -n camunda logs deploy/orchestration | grep -E "RdbmsExporter|RDBMS Exporter"
```

Successful startup includes lines similar to:

```pgsql
[TIMESTAMP] INFO io.camunda.exporter.rdbms.RdbmsExporter - [RDBMS Exporter] RdbmsExporter created with Configuration: flushInterval=PT0.5S, queueSize=1000
[TIMESTAMP] INFO io.camunda.exporter.rdbms.RdbmsExporter - [RDBMS Exporter] Exporter opened with last exported position 126
```

### Confirm exporter progress in the database

Query the exporter position table and confirm values update over time.

PostgreSQL:

```sql
SELECT partition_id, exporter, last_exported_position
FROM exporter_position
ORDER BY partition_id;
```

MySQL/MariaDB:

```sql
SELECT PARTITION_ID, EXPORTER, LAST_EXPORTED_POSITION
FROM EXPORTER_POSITION
ORDER BY PARTITION_ID;
```

Oracle:

```sql
SELECT partition_id, exporter, last_exported_position
FROM exporter_position
ORDER BY partition_id;
```

Exporter progress is the most reliable “is it working” signal. If `last_exported_position` never advances after you generate workload, inspect exporter logs and database permissions.

## Logs to inspect

### Success patterns

- Liquibase initialization line in Orchestration Cluster logs (see above).
- RDBMS exporter created/opened lines in Orchestration Cluster logs (see above).

### Failure patterns

- Missing driver
  - Example: `Failed to load driver class oracle.jdbc.OracleDriver`
  - Result: Camunda fails to start.

- Invalid JDBC URL, host, or DNS resolution
  - Example messages:
    - `Factory method 'databaseProperties' threw exception... Error occurred when getting DB product name.`
    - Root cause stack traces including `UnknownHostException` or socket connection failures.
  - Result: Camunda fails to start.

- Invalid credentials
  - Example: `SQLInvalidAuthorizationSpecException: Access denied for user ... (using password: YES)`
  - Result: Camunda fails to start.

- `autoDDL=false` on an empty database
  - Example:
    - `SQLSyntaxErrorException: Table '...EXPORTER_POSITION' doesn't exist`
  - Result: Exporter fails because required tables are missing. This is expected behavior unless schema is pre-created.

Fetch logs:

```bash
kubectl -n camunda logs deploy/orchestration
kubectl -n camunda logs statefulset/zeebe-broker-0
```

If logs contain connection, driver, or authentication stack traces, the application typically fails fast and does not reach full readiness.

## Health and readiness verification

In 8.9-alpha3, pod readiness reflects database connectivity through a database health indicator. However, readiness alone does not confirm schema creation or exporter progress.

Use the following checks together:

Kubernetes readiness:

```bash
kubectl get pods -n camunda
```

Application health endpoint (if exposed):

```bash
kubectl -n camunda port-forward svc/orchestration 8080:8080
curl -sS http://localhost:8080/actuator/health
```

Look for an overall `UP` status and a healthy database component. Always confirm with logs and database queries.

## Common error patterns and troubleshooting

- DNS or network issues
  - Symptoms: `UnknownHostException`, socket connection errors.
  - Fix: Verify the JDBC host, service name, NetworkPolicies, firewall/security group rules, and routing from the cluster.

- Missing JDBC driver
  - Symptoms: `Failed to load driver class ...`.
  - Fix: Provide the driver using `extraVolumes`/`extraVolumeMounts`, an init container, or a custom image.

- Invalid credentials
  - Symptoms: `Access denied...`, `SQLInvalidAuthorizationSpecException`.
  - Fix: Confirm username, password, and required privileges. Test connectivity using a database client from inside the cluster.

- `autoDDL=false` on an empty database
  - Symptoms: missing table errors such as `EXPORTER_POSITION` not found.
  - Fix: Enable auto-DDL for initial schema creation or provision the schema manually before startup.

- Exporter position not advancing
  - Symptoms: `last_exported_position` remains unchanged after generating workload.
  - Fix: Inspect exporter logs for errors, confirm database write permissions, and review exporter settings (`flushInterval`, `queueSize`). Enable `DEBUG` logging if needed.

## Vendor-specific query examples

### PostgreSQL

```sql
\dt
SELECT partition_id, exporter, last_exported_position FROM exporter_position;
```

### MySQL/MariaDB

```sql
SHOW TABLES;
SELECT PARTITION_ID, EXPORTER, LAST_EXPORTED_POSITION FROM EXPORTER_POSITION;
```

### Oracle

```sql
SELECT table_name FROM user_tables;
SELECT partition_id, exporter, last_exported_position FROM exporter_position;
```

## What success looks like

- Orchestration Cluster pods reach `Ready` state.
- Logs show Liquibase initialization without errors.
- Logs show the RDBMS exporter created and opened with a last exported position.
- The database contains expected Camunda tables (for example `EXPORTER_POSITION`, `AUTHORIZATIONS`, `BATCH_OPERATION`).
- `last_exported_position` advances after generating workload.

## Notes and caveats

- **Timing:** In 8.9-alpha3, schema creation and exporter startup occur during application startup. Exported data visibility depends on the exporter `flushInterval` and workload.
- If observed behavior or log lines differ from this documentation, open an issue and include:
  - Relevant log excerpts
  - Helm values used for RDBMS configuration
  - Database type and version
