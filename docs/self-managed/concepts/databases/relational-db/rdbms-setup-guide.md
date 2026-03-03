---
id: rdbms-setup-guide
title: End-to-end RDBMS setup guide
description: Configure relational databases for the Orchestration Cluster and Web Modeler with unified provisioning, authentication, and driver management strategies.
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

This guide provides a unified approach to configuring relational databases for Camunda 8 across the Orchestration Cluster (Zeebe, Operate, Tasklist, Identity) and Web Modeler. It answers the key setup questions and links to detailed, component-specific configuration reference.

:::info

- For **Orchestration Cluster configuration reference**, see [RDBMS configuration overview](/self-managed/concepts/databases/relational-db/configuration.md).
- For **Web Modeler configuration reference**, see [Web Modeler database configuration](/self-managed/components/modeler/web-modeler/configuration/database.md).
- For **supported vendors and versions**, see the [RDBMS version support policy](/self-managed/concepts/databases/relational-db/rdbms-support-policy.md).
- For **deployment-specific setup**, see [Helm RDBMS configuration](/self-managed/deployment/helm/configure/database/rdbms.md) or [manual RDBMS configuration](/self-managed/deployment/manual/rdbms/configuration.md).
  :::

## Step 1: Decide on topology

Before provisioning, choose whether to use a **shared database** or **separate databases** for each component.

| Aspect       | Shared database                                                         | Separate databases                                                |
| ------------ | ----------------------------------------------------------------------- | ----------------------------------------------------------------- |
| **Use case** | Small deployments, unified DBA team                                     | Large production, multi-team environments                         |
| **Setup**    | Single instance with different schemas/databases for OC and Web Modeler | Independent instances per component                               |
| **Pros**     | Simplified administration, single backup policy                         | Independent scaling, isolated credentials, easier troubleshooting |
| **Cons**     | Shared resources, requires schema/database separation                   | Additional operational overhead, higher infrastructure costs      |

Both topologies are fully supported. Choose based on your organizational model and scaling needs.

## Step 2: Provision the database

### Prerequisites

- **Supported RDBMS**: PostgreSQL (recommended), MariaDB, MySQL, SQL Server, Oracle, or H2 (development only).
- **Versions**: See the [RDBMS version support policy](/self-managed/concepts/databases/relational-db/rdbms-support-policy.md).
- **Network and credentials**: Ensure reachable database and user with DDL permissions (CREATE TABLE, ALTER TABLE) for schema initialization.
- **SSL/TLS**: Optional but recommended. See [Web Modeler SSL configuration](/self-managed/components/modeler/web-modeler/configuration/database.md#configuring-ssl-for-the-database-connection) for guidance on JDBC URL parameters.

### Create database and user

Choose your topology (shared or separate) and database vendor:

<Tabs groupId="db-provisioning" defaultValue="postgres" queryString values={[
{label: "PostgreSQL", value: "postgres"},
{label: "MySQL / MariaDB", value: "mysql"},
{label: "SQL Server / Oracle", value: "other"},
]}>

<TabItem value="postgres">

```sql
-- Shared topology: single database for both OC and Web Modeler
CREATE DATABASE camunda ENCODING 'UTF8';
CREATE USER camunda WITH PASSWORD 'your-secure-password';
GRANT CONNECT ON DATABASE camunda TO camunda;
GRANT USAGE ON SCHEMA public TO camunda;
GRANT CREATE ON DATABASE camunda TO camunda;

-- Separate topology: independent instances
-- CREATE DATABASE camunda_oc ENCODING 'UTF8';
-- CREATE USER camunda_oc WITH PASSWORD 'oc-password';
-- GRANT CONNECT ON DATABASE camunda_oc TO camunda_oc;
-- GRANT USAGE ON SCHEMA public TO camunda_oc;
-- GRANT CREATE ON DATABASE camunda_oc TO camunda_oc;
```

</TabItem>

<TabItem value="mysql">

```sql
-- Shared topology
CREATE DATABASE camunda CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER camunda@'%' IDENTIFIED BY 'your-secure-password';
GRANT ALL PRIVILEGES ON camunda.* TO camunda@'%';
FLUSH PRIVILEGES;

-- Separate topology: repeat with different database and user names
```

</TabItem>

<TabItem value="other">

For SQL Server and Oracle, follow your database vendor's user provisioning guidelines. The user must have CREATE TABLE and ALTER permissions. Consult your DBA and the detailed setup guides linked below.

</TabItem>

</Tabs>

## Step 3: Configure connections and authentication

Configuration is component-specific but follows consistent principles across OC and Web Modeler.

### Orchestration Cluster connection

<Tabs groupId="oc-deployment" defaultValue="helm" queryString values={[
{label: "Helm", value: "helm"},
{label: "Manual", value: "manual"},
]}>

<TabItem value="helm">

In your `values.yaml`:

```yaml
orchestration:
  data:
    secondaryStorage:
      type: rdbms
      rdbms:
        url: jdbc:postgresql://postgres.example.com:5432/camunda_oc
        username: camunda_oc
        password:
          secretKeyRef:
            name: rdbms-credentials
            key: password
        # Optional: Liquibase auto-schema creation (default: true)
        # autoDDL: true
```

For full Helm reference, see [RDBMS configuration in Helm](/self-managed/deployment/helm/configure/database/rdbms.md).

</TabItem>

<TabItem value="manual">

Set environment variables before starting the Orchestration Cluster:

```bash
export CAMUNDA_DATA_SECONDARY_STORAGE_TYPE=rdbms
export CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_URL="jdbc:postgresql://postgres.example.com:5432/camunda_oc"
export CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_USERNAME="camunda_oc"
export CAMUNDA_DATA_SECONDARY_STORAGE_RDBMS_PASSWORD="your-secure-password"
```

For full manual setup, see [RDBMS configuration for manual installations](/self-managed/deployment/manual/rdbms/configuration.md).

</TabItem>

</Tabs>

### Web Modeler connection

Web Modeler uses Spring Boot datasource configuration (separate from Orchestration Cluster).

<Tabs groupId="wm-deployment" defaultValue="helm" queryString values={[
{label: "Helm", value: "helm"},
{label: "Manual", value: "manual"},
]}>

<TabItem value="helm">

In your `values.yaml`:

```yaml
webModeler:
  restapi:
    externalDatabase:
      enabled: true
      url: jdbc:postgresql://postgres.example.com:5432/camunda_wm
      user: camunda_wm
      password: your-secure-password
      # Or use secretRef for production
```

For full Web Modeler reference, see [Web Modeler database configuration](/self-managed/components/modeler/web-modeler/configuration/database.md).

</TabItem>

<TabItem value="manual">

Set environment variables before starting Web Modeler:

```bash
export SPRING_DATASOURCE_URL="jdbc:postgresql://postgres.example.com:5432/camunda_wm"
export SPRING_DATASOURCE_USERNAME="camunda_wm"
export SPRING_DATASOURCE_PASSWORD="your-secure-password"
```

</TabItem>

</Tabs>

### Secrets management

For production, use a secrets store (Kubernetes Secrets, Vault, AWS Secrets Manager) instead of inline passwords.

**Kubernetes Secrets example**:

```bash
kubectl create secret generic rdbms-credentials \
  --from-literal=user=camunda_oc \
  --from-literal=password=your-very-secure-password
```

Then reference it in `values.yaml`:

```yaml
orchestration:
  data:
    secondaryStorage:
      rdbms:
        password:
          secretKeyRef:
            name: rdbms-credentials
            key: password
```

### Aurora IAM authentication

If using Amazon Aurora PostgreSQL, configure IAM database authentication for enhanced security (no stored passwords).

**Orchestration Cluster (Helm)**:

```yaml
orchestration:
  data:
    secondaryStorage:
      type: rdbms
      rdbms:
        url: "jdbc:postgresql://aurora-cluster.123456789012.us-east-1.rds.amazonaws.com:5432/camunda?sslmode=require"
        username: db_user # IAM database user
        # No password needed; IAM token generated at runtime
        # Requires IAM role attached to pod (IRSA or Karpenter)
```

**Web Modeler (Helm)**:

```yaml
webModeler:
  restapi:
    externalDatabase:
      enabled: true
      url: "jdbc:aws-wrapper:postgresql://aurora-cluster.123456789012.us-east-1.rds.amazonaws.com:5432/camunda?wrapperPlugins=iam"
      user: db_user # IAM database user
      # No password needed; IAM token generated at runtime
```

For detailed Aurora setup, see [Orchestration Cluster RDBMS configuration](/self-managed/concepts/databases/relational-db/configuration.md) and [Web Modeler configuration](/self-managed/components/modeler/web-modeler/configuration/database.md).

## Step 4: JDBC driver management

Camunda bundles JDBC drivers for PostgreSQL, MariaDB, SQL Server, and H2. **You must provide a user-supplied driver for Oracle and MySQL.**

For detailed driver provisioning strategies (init containers, custom images, volume mounts), see:

- **Helm**: [JDBC driver management in Helm](/self-managed/deployment/helm/configure/database/rdbms-jdbc-drivers.md)
- **Manual**: [Manual installation driver setup](/self-managed/deployment/manual/rdbms/configuration.md#jdbc-driver-management)
- **Web Modeler**: [Web Modeler database configuration](/self-managed/components/modeler/web-modeler/configuration/database.md)

## Step 5: Schema management

**Orchestration Cluster uses Liquibase** → automatically creates and updates schema on startup (configurable via `autoDDL: true/false`).

**Web Modeler uses Flyway** → migrations applied automatically on startup; **manual DBA execution not supported**.

This is the key difference: Orchestration Cluster schema can be managed manually by a DBA if preferred, while Web Modeler schema is automatic only.

For access to SQL/Liquibase scripts or manual DBA procedures, see [Access SQL and Liquibase scripts](/self-managed/deployment/helm/configure/database/access-sql-liquibase-scripts.md).

## Step 6: Validation

### Orchestration Cluster checklist

1. Confirm the RDBMS exporter is enabled in Zeebe.
2. Check logs for Liquibase initialization:  
   `[INFO] io.camunda.application.commons.rdbms.MyBatisConfiguration - Initializing Liquibase for RDBMS`
3. Verify database contains tables: `zeebe_record`, `zeebe_decision`, etc.
4. Run [RDBMS validation tests](/self-managed/deployment/helm/configure/database/validate-rdbms.md).

### Web Modeler checklist

1. Confirm the database connection is configured.
2. Check logs for Flyway schema initialization.
3. Verify the database contains Web Modeler tables (e.g., `CAM_RESOURCE`, `CAM_COMMENT`).
4. Test the health endpoint: `/health`.

### Common issues

| Issue              | Resolution                                                                                                               |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| Schema not created | Grant `CREATE TABLE`, `ALTER TABLE` permissions to the database user.                                                    |
| Connection timeout | Check firewall rules, security groups, and VPC peering. Verify network connectivity.                                     |
| TLS/SSL error      | Verify database certificate and adjust JDBC SSL mode parameters. See component-specific configuration pages for details. |
| Driver not found   | Load user-supplied drivers via init container, custom image, or volume mount.                                            |

For detailed troubleshooting, see:

- [RDBMS troubleshooting](/self-managed/deployment/helm/configure/database/rdbms-troubleshooting.md)
- [Web Modeler database troubleshooting](/self-managed/components/modeler/web-modeler/troubleshooting/troubleshoot-database-connection.md)

## Step 7: Backup and restore

Both components require RDBMS backups:

- **Orchestration Cluster**: Zeebe exports data to RDBMS; backups are DBA responsibility.
- **Web Modeler**: All data stored in RDBMS; backups are DBA responsibility.

Use vendor-native tools: PostgreSQL (`pg_dump`), MariaDB/MySQL (`mysqldump`), SQL Server (native backup), Oracle (RMAN).

Test restore procedures in non-production environments regularly.

## Related guides

- [Secondary storage overview](/self-managed/concepts/secondary-storage/index.md)
- [Install with RDBMS as secondary storage](/self-managed/deployment/helm/install/helm-with-rdbms.md)
- [Operations and maintenance](/self-managed/deployment/manual/rdbms/operations.md)
