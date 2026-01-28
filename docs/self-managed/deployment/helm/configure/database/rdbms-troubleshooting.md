---
id: rdbms-troubleshooting
sidebar_label: Troubleshooting
title: RDBMS troubleshooting and operations
description: "Troubleshoot common RDBMS connectivity issues, TLS configuration, and post-deployment operations."
---

This page covers troubleshooting common issues, TLS configuration, and post-deployment operations for RDBMS deployments. For configuration reference, see [configure RDBMS in Helm charts](/self-managed/deployment/helm/configure/database/rdbms.md).

:::note Related pages

- **[Validate RDBMS connectivity](validate-rdbms.md)** - Quick validation checklist with database client examples.
- **[Schema management](rdbms-schema-management.md)** - Schema creation and lifecycle.
- **[JDBC drivers](rdbms-jdbc-drivers.md)** - Managing database drivers.
  :::

## Connection failures

**Symptom:** Pod fails to connect to the database (connection timeout, connection refused).

**Diagnosis:**

1. Verify network connectivity from the pod to the database:

```bash
kubectl exec <pod-name> -- nc -zv database-hostname port
```

2. Check the JDBC URL in your configuration:

```bash
kubectl get secret camunda-db-secret -o jsonpath='{.data.<key>}' -n camunda | base64 -d
```

3. Verify the database is running and accepting connections.

**Fix:** Confirm the JDBC URL, hostname, port, and network policies allow traffic between pods and database.

## Authentication errors

**Symptom:** "Authentication failed" or "Invalid password" in logs.

**Diagnosis:**

1. Verify the secret exists and contains the correct password:

```bash
kubectl get secret camunda-db-secret -o jsonpath='{.data.<key>}' -n camunda | base64 -d
```

2. Check the username in your Helm values matches the database user.

3. Test connection credentials manually (if possible from a pod or bastion host).

**Fix:** Ensure the username, password, and secret key reference are correct in your Helm values.

## JDBC driver not found

**Symptom:** ClassNotFoundException or "No suitable JDBC driver" in logs.

**Diagnosis:**

1. Verify the driver JAR file was loaded:

```bash
kubectl exec <pod-name> -- ls -la /driver-lib/
```

2. Check init container logs:

```bash
kubectl logs <pod-name> -c fetch-jdbc-drivers
```

3. Verify the JDBC URL matches the driver type (e.g., Oracle URL with Oracle driver).

**Fix:** Re-apply the init container configuration or verify the custom image includes the driver. See [JDBC driver management](/self-managed/deployment/helm/configure/database/rdbms-jdbc-drivers.md).

## Schema creation failure

**Symptom:** Liquibase errors; tables not created.

**Diagnosis:**

1. Check Liquibase logs:

```bash
kubectl logs <pod-name> | grep -i liquibase
```

2. Verify `autoDDL` is enabled (default: `true`):

```yaml
orchestration:
  data:
    secondaryStorage:
      rdbms:
        autoDDL: true # Confirm this is set
```

3. Test database user permissions (see [Schema management](/self-managed/deployment/helm/configure/database/rdbms-schema-management.md#database-user-permissions)).

**Fix:** Ensure database user has DDL permissions or disable autoDDL and apply schema manually. See [Schema management](/self-managed/deployment/helm/configure/database/rdbms-schema-management.md).

## Slow data export

**Symptom:** Data takes a long time to appear in the database after process events.

**Cause:** Flush interval or queue size not tuned for your workload.

**Diagnosis:**

1. Check current flush interval in logs:

```bash
kubectl logs <pod-name> | grep -i flushinterval
```

2. Verify queue size settings in your Helm values.

**Fix:** Adjust these settings:

```yaml
orchestration:
  data:
    secondaryStorage:
      rdbms:
        flushInterval: PT1S # More frequent flushes
        queueSize: 5000 # Larger queue for buffering
        queueMemoryLimit: 50 # Increase if needed
```

- Smaller `flushInterval` → more frequent writes (increases DB load).
- Larger `queueSize` → more events buffered before flush (increases memory).

## TLS/SSL configuration

### PostgreSQL with TLS

Add SSL parameters to the JDBC URL:

```yaml
orchestration:
  data:
    secondaryStorage:
      rdbms:
        url: jdbc:postgresql://hostname:5432/camunda?ssl=true&sslmode=require
```

### Oracle with TLS

Oracle uses TCPS (TLS over Oracle protocol):

```yaml
orchestration:
  data:
    secondaryStorage:
      rdbms:
        url: jdbc:oracle:thin:@(DESCRIPTION=(ADDRESS=(PROTOCOL=TCPS)(HOST=hostname)(PORT=2484))(CONNECT_DATA=(SERVICE_NAME=FREEPDB1)))
```

### Self-signed certificates

If your database uses self-signed certificates:

1. Extract the certificate from your database server.
2. Create a Kubernetes secret:

```bash
kubectl create secret generic db-certs \
  --from-file=ca.crt=/path/to/ca.crt \
  -n camunda
```

3. Mount the certificate and configure trust (consult your database vendor's JDBC documentation).

## Post-deployment operations

These operations are officially supported on running Camunda clusters:

### Database password rotation

Password rotations are safe:

1. Update the password in your RDBMS.
2. Update the Kubernetes secret:

```bash
kubectl patch secret camunda-db-secret \
  -p '{"data":{"db-password":"'$(echo -n 'new-password' | base64)'"}}' \
  -n camunda
```

3. Restart the Orchestration Cluster pods:

```bash
kubectl rollout restart deployment/camunda-orchestration -n camunda
```

### JDBC driver updates

Updating bundled drivers or replacing custom drivers:

1. For custom drivers via init container: Update the JAR source in your Helm values.
2. For bundled drivers: Update the Camunda version.
3. Redeploy:

```bash
helm upgrade camunda camunda/camunda-platform -f values.yaml -n camunda
```

See [JDBC driver management](/self-managed/deployment/helm/configure/database/rdbms-jdbc-drivers.md#jdbc-driver-updates).

### Schema validation

Verify schema integrity after upgrades or restores:

```sql
-- PostgreSQL: Count expected tables
SELECT COUNT(*) FROM information_schema.tables
 WHERE table_schema = 'public'
 AND (table_name LIKE 'zeebe_%' OR table_name LIKE 'process_%');

-- Oracle: Count expected tables
SELECT COUNT(*) FROM user_tables
 WHERE table_name LIKE 'ZEEBE_%' OR table_name LIKE 'PROCESS_%';
```

Expect roughly 20-30 tables depending on your Camunda version.

## Connectivity health checks

After deployment, verify the cluster is healthy:

1. **Check pod readiness:**

```bash
kubectl get pods -n camunda | grep orchestration
```

2. **Check exporter logs:**

```bash
kubectl logs <pod-name> | grep RdbmsExporter
```

3. **Verify table creation:**

```sql
SELECT COUNT(*) FROM zeebe_process;
```

4. **Deploy a test process** and verify it appears in the database.

For a complete post-deployment checklist, see [validate RDBMS connectivity](/self-managed/deployment/helm/configure/database/validate-rdbms.md).
