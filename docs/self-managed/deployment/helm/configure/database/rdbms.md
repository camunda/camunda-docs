---
id: rdbms
sidebar_label: Configure RDBMS
title: Configure RDBMS in Helm chart
description: "Configure an external relational database (RDBMS) as secondary storage for Camunda 8 Self-Managed using the Helm chart. Helm values reference, JDBC drivers, schema management, and troubleshooting."
---

Camunda 8 Self-Managed supports using an external relational database (RDBMS) as the Orchestration Cluster's secondary storage instead of Elasticsearch or OpenSearch.

This page provides:

- **[Configuration reference](#configuration)**: All Helm values organized by function.
- **[Quick example](#example-usage)**: Minimal YAML to get started.
- Links to detailed guides for specific tasks.

## Prerequisites

Provide a supported relational database that is reachable by the Camunda components.

See the [RDBMS support policy](/self-managed/concepts/databases/relational-db/rdbms-support-policy.md) for the complete list of supported databases and versions.

Ensure that:

- Your network allows traffic from Camunda pods to the database.
- Required JDBC parameters (SSL/TLS, authentication, failover) are configured as needed.
- The database user has permissions to create and modify schema objects if `autoDDL` is enabled.

For a short checklist and troubleshooting steps you can run after configuring the database, see [validate RDBMS connectivity (Helm)](/self-managed/deployment/helm/configure/database/validate-rdbms.md).

## Configuration

### Connection parameters (required)

| Parameter                                            | Type   | Default | Description                                   |
| ---------------------------------------------------- | ------ | ------- | --------------------------------------------- |
| `orchestration.data.secondaryStorage.type`           | string | `""`    | Must be `rdbms` to use a relational database. |
| `orchestration.data.secondaryStorage.rdbms.url`      | string | `""`    | JDBC connection URL for the database.         |
| `orchestration.data.secondaryStorage.rdbms.username` | string | `""`    | Username for database authentication.         |

### Database credentials

Store the database password in a Kubernetes secret and reference it. For testing only, you can use `inlineSecret`.

| Parameter                                                            | Type   | Default | Description                                         |
| -------------------------------------------------------------------- | ------ | ------- | --------------------------------------------------- |
| `orchestration.data.secondaryStorage.rdbms.secret.existingSecret`    | string | `""`    | Name of Kubernetes secret containing the password.  |
| `orchestration.data.secondaryStorage.rdbms.secret.existingSecretKey` | string | `""`    | Key within the secret storing the password.         |
| `orchestration.data.secondaryStorage.rdbms.secret.inlineSecret`      | string | `""`    | Password value (testing only, not production-safe). |

### Other parameters

RDBMS supports other configuration options that can be configured in the helm chart `values.yaml` via [extraConfiguration](/self-managed/deployment/helm/configure/application-configs.md). See [RDBMS options](/self-managed/concepts/databases/relational-db/database-configuration).

### Example usage

:::note
Operate has limited functionality when using RDBMS as secondary storage in Camunda 8.9-alpha3. See [Operate limitations](/self-managed/concepts/databases/relational-db/rdbms-support-policy.md#operate-with-rdbms) for details.
:::

```yaml
orchestration:
  exporters:
    camunda:
      enabled: false
    rdbms:
      enabled: true
  data:
    secondaryStorage:
      type: rdbms
      rdbms:
        url: jdbc:postgresql://hostname:5432/camunda
        username: camunda
        secret:
          existingSecret: camunda-db-secret
          existingSecretKey: password
```

## Bundled vs. custom JDBC drivers

Camunda bundles JDBC drivers for some databases (PostgreSQL, MariaDB, H2). For others (Oracle, MySQL, SQL Server), you must supply a custom driver.

**See:** [JDBC driver management](/self-managed/deployment/helm/configure/database/rdbms-jdbc-drivers.md) for:

- Which drivers are bundled
- When to supply custom drivers
- How to load drivers (init containers, custom images, volumes)

## Schema creation and management

Camunda automatically creates your database schema using Liquibase (when `autoDDL: true`). You can also manage the schema manually if required.

**See:** [Schema management](/self-managed/deployment/helm/configure/database/rdbms-schema-management.md) for:

- Automatic schema creation with autoDDL
- Database user permissions for each RDBMS type
- Manual schema management and DBA workflows
- Schema upgrades and verification

## Troubleshooting and operations

For detailed troubleshooting of common issues and post-deployment operations, see [RDBMS troubleshooting and operations](/self-managed/deployment/helm/configure/database/rdbms-troubleshooting.md), which covers:

- Connection failures and authentication errors
- JDBC driver loading issues
- Schema creation failures
- Slow data export and performance tuning
- TLS/SSL configuration
- Post-deployment operations (password rotation, driver updates, schema validation)

## Verifying connectivity

After deployment, verify the Orchestration Cluster is writing to the database:

1. Confirm tables were created:

```sql
-- PostgreSQL example
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public';
```

2. Deploy a process and start an instance using Web Modeler.

3. Query the database to confirm the instance was recorded:

```sql
SELECT * FROM process_instances;
```

4. Review logs for successful initialization:

```
INFO  io.camunda.exporter.rdbms.RdbmsExporter - RdbmsExporter created with Configuration: flushInterval=PT0.5S
INFO  io.camunda.exporter.rdbms.RdbmsExporter - Exporter opened with last exported position
```

For a complete post-deployment checklist, see [validate RDBMS connectivity (Helm)](/self-managed/deployment/helm/configure/database/validate-rdbms.md).

## Using AWS Aurora PostgreSQL (optional)

If you are using AWS Aurora PostgreSQL as your relational database, you can configure it the same way as a standard PostgreSQL instance.

Optionally, Camunda also supports the AWS JDBC wrapper driver, which provides additional features such as improved failover handling and IAM-based authentication.

For details and examples, see [using AWS Aurora PostgreSQL with Camunda](../../../../concepts/databases/relational-db/configuration.md#usage-with-aws-aurora-postgresql).

## Limitations and unsupported scenarios

### Component-specific RDBMS support

- **Orchestration Cluster**: ✅ Full RDBMS support for secondary storage (includes Zeebe, Operate, Tasklist, Orchestration Identity).
- **Connectors**: ✅ Supports RDBMS for process definitions and state.
- **Web Modeler**: ✅ RDBMS support available in 8.9.
- **Optimize**: ❌ **Requires Elasticsearch or OpenSearch only.** Optimize cannot use RDBMS.

If you deploy Optimize, you must still provision Elasticsearch or OpenSearch.

### Multi-region deployments

Cross-region RDBMS deployments are **not yet tested or supported** in Camunda 8.9. Deploy RDBMS in the same region as your Kubernetes cluster.

### Self-managed database HA

Camunda assumes your RDBMS handles its own HA (replication, failover). Use cloud-managed databases or vendor-specific HA solutions for production.

### Custom JDBC driver libraries

Only JDBC drivers from official vendor sources are supported. Custom or modified drivers may cause unexpected behavior.
