---
id: helm-with-rdbms
sidebar_label: RDBMS example deployment
title: RDBMS example deployment for Camunda with Helm
description: "Focused walkthrough for teams choosing an external RDBMS as secondary storage within the Helm production installation flow."
---

This guide is a focused walkthrough for teams using an external relational database (RDBMS) as secondary storage in the Helm production installation flow, instead of a document-store secondary backend (Elasticsearch or OpenSearch).

Use [production install](/self-managed/deployment/helm/install/production/index.md) as the primary installation guide. Use this page when you want additional RDBMS-specific examples for that flow.

Related guides:

- [Production install](/self-managed/deployment/helm/install/production/index.md)
- [Secondary storage overview](/self-managed/concepts/secondary-storage/index.md)
- [Configure RDBMS in Helm charts](/self-managed/deployment/helm/configure/database/rdbms.md)
- [JDBC driver management](/self-managed/deployment/helm/configure/database/rdbms-jdbc-drivers.md)

## What changes when using RDBMS?

In Camunda 8, secondary storage stores historical data and process state. You can use either a document-store backend (Elasticsearch/OpenSearch) or an RDBMS, depending on your requirements. This guide focuses on the RDBMS option:

| Aspect               | Document-store backend (Elasticsearch/OpenSearch)   | RDBMS                                                       |
| -------------------- | --------------------------------------------------- | ----------------------------------------------------------- |
| **Storage choice**   | Helm-managed subchart                               | You manage (PostgreSQL, etc.)                               |
| **Scaling**          | Scale the search cluster independently from Camunda | Scale via your database service (vertical or read replicas) |
| **Backup strategy**  | ES/OS snapshot/restore tooling                      | Database-native backups (e.g., pg_dump, vendor tools)       |
| **Monitoring**       | ES/OS metrics and dashboards                        | Database-native monitoring and alerts                       |
| **Operator support** | No embedded document-store operator bundled         | Database operators (optional)                               |

When using RDBMS, **Optimize still requires Elasticsearch or OpenSearch**. Only the Orchestration Cluster uses RDBMS.

## Prerequisites

Before you begin:

1. **Kubernetes cluster**: 1.24+ with sufficient resources for Camunda pods.
2. **Helm 3.x**: Install or upgrade [Helm](https://helm.sh/docs/intro/install/).
3. **External RDBMS**: A supported database reachable from your cluster. See the [RDBMS support policy](/self-managed/concepts/databases/relational-db/rdbms-support-policy.md) for the complete list of supported databases and versions.
4. **Database credentials**: Username and password for a database user with DDL permissions (if using auto-schema creation).
5. **Document-store backend (Elasticsearch/OpenSearch)** (for Optimize): Required if you deploy Optimize alongside Camunda.

## Installation workflow

### Step 1: Choose your RDBMS

**PostgreSQL:**

- Bundled driver included; no additional setup required.
- Excellent Kubernetes operator support (optional).
- Managed services available on AWS (Aurora PostgreSQL), Azure, GCP, etc.

**Oracle:**

- Custom JDBC driver required; use init container to load.
- Advanced security and HA features.
- Managed services available on AWS (RDS), Azure, OCI.

**MariaDB/MySQL:**

- Bundled driver available for MariaDB; custom driver for MySQL.
- Community-friendly; good for development.
- Managed services widely available on AWS (RDS), Azure, GCP.

### Step 2: Prepare your database

Create a database and user. For example, in PostgreSQL:

```bash
createdb camunda
createuser camunda
```

Then set permissions:

```sql
ALTER USER camunda WITH ENCRYPTED PASSWORD 'your-secure-password';
GRANT CONNECT ON DATABASE camunda TO camunda;
GRANT USAGE ON SCHEMA public TO camunda;
GRANT CREATE ON DATABASE camunda TO camunda;
```

:::note
The user needs DDL permissions only if you enable auto-schema creation (`autoDDL: true`). For manually managed schemas, only SELECT/INSERT/UPDATE/DELETE permissions are needed.
:::

### Step 3: Add the Camunda Helm repository

```bash
helm repo add camunda https://camunda.github.io/camunda-platform-helm
helm repo update
```

### Step 4: Create a values file

Create a `values-rdbms.yaml` file with your RDBMS configuration:

```yaml
# Configure the Orchestration Cluster to use RDBMS
orchestration:
  enabled: true
  exporters:
    camunda:
      enabled: false
    rdbms:
      enabled: true
  data:
    secondaryStorage:
      type: rdbms
      rdbms:
        url: jdbc:postgresql://postgres.example.com:5432/camunda
        username: camunda
        secret:
          existingSecret: camunda-db-secret
          existingSecretKey: db-password
  extraConfiguration:
    - file: "flush-interval.yaml"
      content: |
        camunda:
          data:
            secondary-storage:
              rdbms:
                # Optional: Tune for your workload
                flush-interval: PT1S # More frequent flushes
                queue-size: 5000 # Larger queue for buffering
                queue-memory-limit: 50 # Increase if needed
                # Optional: Configure history retention
                history:
                  default-history-ttl: P30D

# Disable default Elasticsearch subchart
elasticsearch:
  enabled: false
# If deploying Optimize, you still need Elasticsearch/OpenSearch
# Uncomment below and configure as needed:
# opensearch:
#   enabled: true
```

### Step 5: Create the Kubernetes secret for database credentials

```bash
kubectl create namespace camunda
kubectl create secret generic camunda-db-secret \
  --from-literal=db-password='your-secure-password' \
  -n camunda
```

### Step 6: Handle custom JDBC drivers (if required)

If you're using Oracle, MySQL, or a database version not covered by bundled drivers, you must provide the JDBC driver.

:::note
For detailed information about JDBC driver strategies, security configurations, and validation, see [JDBC driver management](/self-managed/deployment/helm/configure/database/rdbms-jdbc-drivers.md).
:::

**Option A: Init container (recommended for production)**

Update your `values-rdbms.yaml`:

```yaml
orchestration:
  extraVolumeMounts:
    - name: jdbcdrivers
      mountPath: /driver-lib
  extraVolumes:
    - name: jdbcdrivers
      emptyDir: {}
  initContainers:
    - name: fetch-jdbc-drivers
      image: alpine:3.19
      imagePullPolicy: Always
      command:
        - sh
        - -c
        - >
          wget https://repo1.maven.org/maven2/com/oracle/database/jdbc/ojdbc11/23.9.0.25.07/ojdbc11-23.9.0.25.07.jar
          -O /driver-lib/ojdbc.jar
      volumeMounts:
        - name: jdbcdrivers
          mountPath: /driver-lib
      securityContext:
        runAsUser: 1001
```

For other driver sources (e.g., private repositories), adjust the `wget` command or use a private container registry for pre-built images.

**Option B: ConfigMap (GitOps-friendly)**

Store the driver JAR in a ConfigMap and mount it:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: jdbc-drivers
  namespace: camunda
data:
  ojdbc.jar: <base64-encoded JAR content>
---
orchestration:
  extraVolumeMounts:
    - name: jdbcdrivers
      mountPath: /driver-lib
  extraVolumes:
    - name: jdbcdrivers
      configMap:
        name: jdbc-drivers
```

See [JDBC driver loading](/self-managed/deployment/helm/configure/database/rdbms.md#bundled-vs-custom-jdbc-drivers) for more strategies.

### Step 7: Install Camunda

```bash
helm install camunda camunda/camunda-platform \
  --namespace camunda \
  -f values-rdbms.yaml
```

:::caution Helm chart schema: quote numeric values as strings
The Helm chart schema expects certain numeric-looking parameters to be passed as **quoted strings**. If you override `orchestration.clusterSize`, `orchestration.partitionCount`, or `orchestration.replicationFactor`, wrap the values in quotes:

```yaml
orchestration:
  clusterSize: "3"
  partitionCount: "3"
  replicationFactor: "3"
```

Using unquoted integers (e.g., `clusterSize: 3`) causes a schema validation error during `helm install`.
:::

Monitor the installation:

```bash
kubectl get pods -n camunda
kubectl logs -n camunda -l app.kubernetes.io/name=orchestration --tail=50
```

### Step 8: Verify the installation

Check that tables were created and data is being written:

```bash
# Port-forward to the database (if not directly accessible)
kubectl port-forward -n camunda svc/postgres 5432:5432

# Connect and verify
psql -h localhost -U camunda -d camunda -c "SELECT * FROM zeebe_process;"
```

Deploy a test process using Web Modeler and verify it appears in the database:

```sql
SELECT COUNT(*) FROM process_instances;
```

For a full post-deployment checklist, see [validate RDBMS connectivity](/self-managed/deployment/helm/configure/database/validate-rdbms.md).

## Common deployment scenarios

### PostgreSQL with AWS Aurora

For AWS Aurora PostgreSQL, configure the JDBC URL with the Aurora cluster endpoint:

```yaml
orchestration:
  data:
    secondaryStorage:
      rdbms:
        url: jdbc:postgresql://my-aurora-cluster.xxxxxxx.us-east-1.rds.amazonaws.com:5432/camunda?ssl=true&sslmode=require
```

Aurora supports automatic failover. For advanced failover features, consider the [AWS JDBC wrapper driver](/self-managed/concepts/databases/relational-db/configuration.md#usage-with-aws-aurora-postgresql).

#### Deploying on AWS EKS with Aurora

When deploying on Amazon EKS with Aurora PostgreSQL as RDBMS secondary storage, use these resources:

- **Infrastructure**: Use the [Camunda EKS Terraform modules](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/terraform-setup.md) to provision EKS and Aurora PostgreSQL together.
- **Helm install on EKS**: Follow the [EKS Helm install guide](/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/eks-helm.md) for the overall installation flow, then apply the RDBMS-specific values from this page.

:::note Single database for RDBMS deployments
When using RDBMS as secondary storage, the Orchestration Cluster requires **one shared database** (for example, `camunda`). This differs from the standard EKS setup, which creates separate databases for Identity and Web Modeler. If you follow the EKS infrastructure guides, adjust the database setup job to create a single database and user for the Orchestration Cluster instead.
:::

### Oracle with Kubernetes init container

To load the Oracle JDBC driver:

```yaml
orchestration:
  extraVolumeMounts:
    - name: jdbcdrivers
      mountPath: /driver-lib
  extraVolumes:
    - name: jdbcdrivers
      emptyDir: {}
  initContainers:
    - name: fetch-jdbc-drivers
      image: alpine:3.19
      command:
        - sh
        - -c
        - >
          wget https://your-private-repo.com/ojdbc11.jar
          -O /driver-lib/ojdbc.jar
      volumeMounts:
        - name: jdbcdrivers
          mountPath: /driver-lib
```

Configure the JDBC URL:

```yaml
orchestration:
  data:
    secondaryStorage:
      rdbms:
        url: jdbc:oracle:thin:@//my-oracle-host:1521/FREEPDB1
```

### Multi-namespace deployment (Orchestration + Management)

In production, separate the Orchestration Cluster from management components (WebModeler, Console, Identity, Optimize):

**Namespace 1: Orchestration + Connectors**

```yaml
orchestration:
  enabled: true
  # RDBMS configuration
  data:
    secondaryStorage:
      type: rdbms
      rdbms:
        url: jdbc:postgresql://postgres:5432/camunda

connectors:
  enabled: true

# Disable management components
console:
  enabled: false
optimize:
  enabled: false
webModeler:
  enabled: false
identity:
  enabled: false
```

**Namespace 2: Management components (with document-store secondary storage)**

```yaml
orchestration:
  enabled: false

console:
  enabled: true
optimize:
  enabled: true
webModeler:
  enabled: true
identity:
  enabled: true

# Optimize requires Elasticsearch/OpenSearch
opensearch:
  enabled: true
  # or
  # elasticsearch:
  #   enabled: true
```

## Configuration reference

For detailed configuration options, see:

- [Configure RDBMS in Helm charts](/self-managed/deployment/helm/configure/database/rdbms.md): All Helm values, bundled vs. custom drivers, schema management, and troubleshooting.
- [Production installation best practices](/self-managed/deployment/helm/install/production/index.md): Network policies, TLS, OIDC, and multi-namespace setup.
- [Helm chart parameters](/self-managed/deployment/helm/chart-parameters.md): Full Helm chart reference.

## Important: Component storage requirements

**Optimize requires Elasticsearch or OpenSearch, not RDBMS.** If you deploy Optimize, configure it with Elasticsearch or OpenSearch and enable the corresponding exporter for Zeebe, even if your Orchestration Cluster uses RDBMS:

```yaml
orchestration:
  data:
    secondaryStorage:
      type: rdbms # Orchestration uses RDBMS

optimize:
  enabled: true
# Choose one secondary storage for Optimize:
# opensearch:
#   enabled: true
# elasticsearch:
#   enabled: true
```

Mixing storage types (RDBMS for Orchestration, Elasticsearch/OpenSearch for Optimize) is supported and tested.

## Troubleshooting

### Pod fails to start

**Check logs:**

```bash
kubectl logs -n camunda <pod-name>
```

**Common issues:**

- Database unreachable: Verify network policies, firewall, and JDBC URL.
- Authentication failed: Confirm secret and credentials.
- Driver not found (Oracle/MySQL): Verify init container or custom image has loaded the driver.

See [troubleshooting RDBMS connectivity](/self-managed/deployment/helm/configure/database/rdbms.md#troubleshooting-and-operations) for detailed diagnostics.

### Data not appearing in database

**Cause:** Flush interval delay or JDBC configuration issue.

**Check:** Monitor logs for exporter messages:

```bash
kubectl logs -n camunda <pod-name> | grep -i exporter
```

**Fix:** Adjust `flushInterval` and `queueSize` in your values file (see [Configuration reference](#configuration-reference)).

### JDBC driver version mismatch

**Symptom:** "ClassNotFoundException" or driver-related errors.

**Fix:** Ensure the driver version matches your database. See [Bundled vs. custom drivers](/self-managed/deployment/helm/configure/database/rdbms.md#bundled-vs-custom-jdbc-drivers).

## Known limitations and unsupported scenarios

### Multi-region deployments

Cross-region RDBMS deployments are **not tested or supported in Camunda 8.9**. Latency and consistency requirements are not yet validated. Deploy your RDBMS in the same region as your Kubernetes cluster.

### Optimize storage

Optimize **cannot use RDBMS** and requires Elasticsearch or OpenSearch. If deploying Optimize alongside an RDBMS-based Orchestration Cluster, you must provision Elasticsearch/OpenSearch for Optimize only.

### Self-Managed database HA

Camunda does not manage database HA. Use cloud-managed databases (AWS Aurora, Azure Database, GCP Cloud SQL) or vendor-supplied HA solutions. Camunda assumes the database handles its own replication and failover.

## Next steps

- **[Production guide](/self-managed/deployment/helm/install/production/index.md)**: Network security, TLS, OIDC, and high-availability configurations.
- **[Helm quick install](/self-managed/deployment/helm/install/quick-install.md)**: Get started with default settings for evaluation.
- **[Operational tasks](/self-managed/deployment/helm/operational-tasks/index.md)**: Scaling, upgrades, and maintenance.
- **[Backup and restore](/self-managed/operational-guides/backup-restore/backup-and-restore.md)**: Data protection strategies.
