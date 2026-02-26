---
id: bitnami-to-managed-services
sidebar_label: Migrate to managed services
title: Migrate from Bitnami subcharts to managed services
description: "Migrate Camunda 8 Self-Managed infrastructure from Bitnami subcharts to cloud-managed services such as AWS RDS, Amazon OpenSearch, Azure Database for PostgreSQL, and similar."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import FailbackCaution from './\_partials/\_ops-failback-caution.md'
import DryRunCommands from './\_partials/\_ops-dry-run-commands.md'

This guide walks you through migrating a Camunda 8 Helm installation from Bitnami-managed infrastructure to **cloud-managed services** such as:

- **PostgreSQL**: AWS RDS, Azure Database for PostgreSQL, Google Cloud SQL, or any managed PostgreSQL service
- **Elasticsearch / OpenSearch**: Amazon OpenSearch Service, Elastic Cloud, Azure Cognitive Search, or any managed Elasticsearch-compatible service
- **Keycloak**: The Keycloak Operator is still used for Keycloak regardless of target mode, since there is no managed Keycloak service. Alternatively, you can use an [external OIDC provider](/self-managed/deployment/helm/configure/authentication-and-authorization/external-oidc-provider.md) to replace Keycloak entirely.

:::info When to choose managed services
Managed services are ideal when your organization:

- Prefers minimal operational overhead for database and search infrastructure
- Already uses a cloud provider's managed services catalog
- Requires SLA-backed availability and automated patching from the cloud vendor
- Does not want to manage Kubernetes operators for infrastructure components
  :::

## Prerequisites

In addition to the [general prerequisites](./index.md#prerequisites-all-paths), you must:

- Have a managed PostgreSQL instance provisioned (with databases and users created)
- Have a managed Elasticsearch or OpenSearch instance provisioned (if migrating Elasticsearch)
- Ensure network connectivity between your Kubernetes cluster and the managed services
- Have credentials stored as Kubernetes Secrets in the Camunda namespace

## Clone the deployment references repository

```bash
git clone https://github.com/camunda/camunda-deployment-references.git
cd camunda-deployment-references/generic/kubernetes/migration
```

## Step 1: Provision managed services

Before running the migration, provision your managed services and create the required databases and users.

### PostgreSQL

<Tabs groupId="cloud-provider" queryString>

<TabItem value="aws" label="AWS RDS">

Create an RDS PostgreSQL instance and the required databases:

```sql
-- Connect to your RDS instance and create databases
CREATE DATABASE identity;
CREATE DATABASE keycloak;
CREATE DATABASE webmodeler;

-- Create users with appropriate permissions
CREATE USER identity WITH PASSWORD '<password>';
CREATE USER keycloak WITH PASSWORD '<password>';
CREATE USER webmodeler WITH PASSWORD '<password>';

GRANT ALL PRIVILEGES ON DATABASE identity TO identity;
GRANT ALL PRIVILEGES ON DATABASE keycloak TO keycloak;
GRANT ALL PRIVILEGES ON DATABASE webmodeler TO webmodeler;
```

Ensure your EKS security groups allow traffic to the RDS instance on port 5432.

</TabItem>

<TabItem value="azure" label="Azure Database for PostgreSQL">

Create an Azure Database for PostgreSQL - Flexible Server and the required databases:

```sql
-- Connect to your Azure PostgreSQL instance and create databases
CREATE DATABASE identity;
CREATE DATABASE keycloak;
CREATE DATABASE webmodeler;

-- Create users
CREATE USER identity WITH PASSWORD '<password>';
CREATE USER keycloak WITH PASSWORD '<password>';
CREATE USER webmodeler WITH PASSWORD '<password>';

GRANT ALL PRIVILEGES ON DATABASE identity TO identity;
GRANT ALL PRIVILEGES ON DATABASE keycloak TO keycloak;
GRANT ALL PRIVILEGES ON DATABASE webmodeler TO webmodeler;
```

Ensure your AKS virtual network has a [Private Link](https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/concepts-networking-private-link) or service endpoint to the PostgreSQL server.

</TabItem>

<TabItem value="gcp" label="Google Cloud SQL">

Create a Cloud SQL for PostgreSQL instance and the required databases:

```sql
-- Connect to your Cloud SQL instance and create databases
CREATE DATABASE identity;
CREATE DATABASE keycloak;
CREATE DATABASE webmodeler;

-- Create users
CREATE USER identity WITH PASSWORD '<password>';
CREATE USER keycloak WITH PASSWORD '<password>';
CREATE USER webmodeler WITH PASSWORD '<password>';

GRANT ALL PRIVILEGES ON DATABASE identity TO identity;
GRANT ALL PRIVILEGES ON DATABASE keycloak TO keycloak;
GRANT ALL PRIVILEGES ON DATABASE webmodeler TO webmodeler;
```

Configure [Private IP](https://cloud.google.com/sql/docs/postgres/configure-private-ip) or use the Cloud SQL Auth Proxy for connectivity from GKE.

</TabItem>

</Tabs>

### Elasticsearch / OpenSearch

<Tabs groupId="es-provider" queryString>

<TabItem value="opensearch" label="Amazon OpenSearch">

Create an Amazon OpenSearch Service domain. Note the domain endpoint and credentials.

:::caution OpenSearch compatibility
Amazon OpenSearch Service uses OpenSearch. Check the [Camunda compatibility matrix](/reference/supported-environments.md) for supported OpenSearch versions.
:::

</TabItem>

<TabItem value="elastic-cloud" label="Elastic Cloud">

Create an Elastic Cloud deployment. Note the deployment endpoint, Cloud ID, and credentials.

</TabItem>

<TabItem value="self-managed-es" label="Self-managed Elasticsearch">

If using a self-managed Elasticsearch cluster (not on Kubernetes), ensure it is accessible from the cluster and note the endpoint and credentials.

</TabItem>

</Tabs>

### Create Kubernetes Secrets

Store the managed service credentials as Kubernetes Secrets so that both the migration scripts and Camunda Helm chart can use them:

```bash
# PostgreSQL secrets — one per component
kubectl create secret generic external-pg-identity \
  -n ${NAMESPACE} \
  --from-literal=password='<identity-pg-password>'

kubectl create secret generic external-pg-keycloak \
  -n ${NAMESPACE} \
  --from-literal=password='<keycloak-pg-password>'

kubectl create secret generic external-pg-webmodeler \
  -n ${NAMESPACE} \
  --from-literal=password='<webmodeler-pg-password>'

# Elasticsearch / OpenSearch secret
kubectl create secret generic external-es \
  -n ${NAMESPACE} \
  --from-literal=elastic='<es-password>'
```

## Step 2: Configure the migration for external targets

Edit `env.sh` and set the target mode to `external`:

```bash
# Set target modes
export PG_TARGET_MODE="external"
export ES_TARGET_MODE="external"

# PostgreSQL external targets
export EXTERNAL_PG_IDENTITY_HOST="your-rds-endpoint.region.rds.amazonaws.com"
export EXTERNAL_PG_IDENTITY_PORT="5432"
export EXTERNAL_PG_IDENTITY_SECRET="external-pg-identity"

export EXTERNAL_PG_KEYCLOAK_HOST="your-rds-endpoint.region.rds.amazonaws.com"
export EXTERNAL_PG_KEYCLOAK_PORT="5432"
export EXTERNAL_PG_KEYCLOAK_SECRET="external-pg-keycloak"

export EXTERNAL_PG_WEBMODELER_HOST="your-rds-endpoint.region.rds.amazonaws.com"
export EXTERNAL_PG_WEBMODELER_PORT="5432"
export EXTERNAL_PG_WEBMODELER_SECRET="external-pg-webmodeler"

# Elasticsearch / OpenSearch external target
export EXTERNAL_ES_HOST="your-opensearch-endpoint.region.es.amazonaws.com"
export EXTERNAL_ES_PORT="443"
export EXTERNAL_ES_SECRET="external-es"
```

:::info Same host for all PostgreSQL databases
You can use the same managed PostgreSQL host for all components — each database is separate. This is common when using a single RDS instance with multiple databases.
:::

### Create custom Helm values

When using external targets, you need a custom Helm values file that configures Camunda to connect to the managed services. Set the `CUSTOM_HELM_VALUES_FILE` variable to point to this file:

```bash
export CUSTOM_HELM_VALUES_FILE="./my-external-values.yaml"
```

Example custom values file for AWS RDS + OpenSearch:

```yaml
# Disable Bitnami subcharts
identityPostgresql:
  enabled: false
webModelerPostgresql:
  enabled: false
elasticsearch:
  enabled: false
identityKeycloak:
  enabled: false

# Configure Identity to use external PostgreSQL
identity:
  externalDatabase:
    host: "your-rds-endpoint.region.rds.amazonaws.com"
    port: 5432
    database: "identity"
    username: "identity"
    existingSecret: "external-pg-identity"
    existingSecretPasswordKey: "password"

# Configure Web Modeler to use external PostgreSQL
webModeler:
  restapi:
    externalDatabase:
      host: "your-rds-endpoint.region.rds.amazonaws.com"
      port: 5432
      database: "webmodeler"
      user: "webmodeler"
      existingSecret: "external-pg-webmodeler"
      existingSecretPasswordKey: "password"

# Configure external Elasticsearch / OpenSearch
global:
  elasticsearch:
    enabled: false
  opensearch:
    enabled: true
    url:
      protocol: "https"
      host: "your-opensearch-endpoint.region.es.amazonaws.com"
      port: 443
    auth:
      username: "admin"
      existingSecret: "external-es"
      existingSecretPasswordKey: "elastic"
```

:::caution Helm values customization
The example above is a starting point. Adjust the values to match your specific managed service configuration, authentication method (IAM, username/password, etc.), and TLS requirements. Refer to the [Camunda Helm chart parameters](/self-managed/deployment/helm/chart-parameters.md) for all available options.
:::

Source the configuration:

```bash
source env.sh
```

## Step 3: Run the migration

With external targets, the migration phases work the same way, with key differences:

### Phase 1: Deploy targets (no downtime)

```bash
bash 1-deploy-targets.sh
```

When `PG_TARGET_MODE=external`:

- CNPG operator is **not installed** — your managed PostgreSQL is used directly.

When `ES_TARGET_MODE=external`:

- ECK operator is **not installed** — your managed Elasticsearch/OpenSearch is used directly.

The Keycloak Operator is still deployed (with a Custom Resource pointing to your managed PostgreSQL).

### Phase 2: Initial backup (no downtime)

```bash
bash 2-backup.sh
```

PostgreSQL backups work the same way — `pg_dump` jobs run against the Bitnami PostgreSQL instances regardless of the target type.

### Phase 3: Cutover (downtime required)

:::caution Maintenance window required
Schedule a maintenance window. Typical duration: 5–30 minutes.
:::

```bash
bash 3-cutover.sh
```

For PostgreSQL, `pg_restore` runs against the managed PostgreSQL endpoints instead of CNPG clusters.

#### Elasticsearch data migration for managed services

:::warning Manual Elasticsearch data migration
Automated Elasticsearch data migration is **not supported** for external targets. Filesystem snapshots require shared storage with the Elasticsearch process, which is not available for managed services.
:::

For Elasticsearch/OpenSearch data migration to managed services, you have several options:

<Tabs groupId="es-migration" queryString>

<TabItem value="fresh-start" label="Fresh start (recommended)">

Let Camunda rebuild Elasticsearch indexes from Zeebe on the next export. This is the simplest approach and works well if you don't need historical Operate/Tasklist data immediately available.

After the Helm upgrade, Zeebe exporters will populate the new Elasticsearch/OpenSearch with current data. Historical data will be available as Zeebe replays events.

No additional steps are required — this happens automatically.

</TabItem>

<TabItem value="elasticdump" label="elasticdump">

Use the [`elasticdump`](https://github.com/elasticsearch-dump/elasticsearch-dump) npm tool to transfer indices from source to target:

```bash
# Install elasticdump
npm install -g elasticdump

# Get source ES password
SOURCE_ES_PWD=$(kubectl get secret ${CAMUNDA_RELEASE_NAME}-elasticsearch \
  -n ${NAMESPACE} -o jsonpath='{.data.elasticsearch-password}' | base64 -d)

# Port-forward source ES
kubectl port-forward svc/${CAMUNDA_RELEASE_NAME}-elasticsearch -n ${NAMESPACE} 9200:9200 &

# Dump and restore each index pattern
for pattern in zeebe operate tasklist optimize; do
  elasticdump \
    --input="http://elastic:${SOURCE_ES_PWD}@localhost:9200/${pattern}-*" \
    --output="https://admin:<password>@your-opensearch-endpoint:443/${pattern}-*" \
    --type=data \
    --limit=1000
done
```

</TabItem>

<TabItem value="s3-snapshot" label="S3 snapshot repository">

If both source and target elasticsearch support S3 snapshot repositories, you can use a shared S3 bucket:

1. Register an S3 snapshot repository on the source Bitnami Elasticsearch.
2. Create a snapshot.
3. Register the same S3 repository on the target managed Elasticsearch/OpenSearch.
4. Restore the snapshot.

```bash
# On source ES: register S3 repo and create snapshot
curl -X PUT "localhost:9200/_snapshot/s3_backup" \
  -H 'Content-Type: application/json' \
  -d '{"type":"s3","settings":{"bucket":"my-migration-bucket","region":"us-east-1"}}'

curl -X PUT "localhost:9200/_snapshot/s3_backup/migration?wait_for_completion=true" \
  -H 'Content-Type: application/json' \
  -d '{"indices":"*","ignore_unavailable":true}'

# On target ES/OpenSearch: register same S3 repo and restore
curl -X PUT "https://target-endpoint/_snapshot/s3_backup" \
  -H 'Content-Type: application/json' \
  -d '{"type":"s3","settings":{"bucket":"my-migration-bucket","region":"us-east-1"}}'

curl -X POST "https://target-endpoint/_snapshot/s3_backup/migration/_restore" \
  -H 'Content-Type: application/json' \
  -d '{"indices":"*","ignore_unavailable":true}'
```

</TabItem>

<TabItem value="reindex" label="Reindex API">

Use the Elasticsearch [Reindex API](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-reindex.html) to copy data from the source to the target. This requires the target to whitelist the source as a remote:

```bash
# On the target, add source to reindex.remote.whitelist
# Then reindex each index
curl -X POST "https://target-endpoint/_reindex" \
  -H 'Content-Type: application/json' \
  -d '{
    "source": {
      "remote": {
        "host": "http://source-es:9200",
        "username": "elastic",
        "password": "<password>"
      },
      "index": "zeebe-*"
    },
    "dest": {
      "index": "zeebe-*"
    }
  }'
```

</TabItem>

</Tabs>

### Phase 4: Validate (no downtime)

```bash
bash 4-validate.sh
```

For external targets, the validation checks connectivity to the managed service endpoints instead of verifying CNPG/ECK cluster health.

## Rollback

Rolling back works the same way as with the [operator-based migration](./bitnami-to-operators.md#rollback):

```bash
bash rollback.sh
```

## Post-migration cleanup

After confirming the migration is successful, remove old Bitnami resources as described in the [operator-based migration cleanup](./bitnami-to-operators.md#post-migration-cleanup).

## Cloud-specific considerations

### AWS

- **IAM authentication**: For RDS, consider using [IAM database authentication](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.IAMDBAuth.html) or IRSA instead of password-based secrets.
- **VPC peering**: Ensure your EKS cluster and RDS/OpenSearch are in the same VPC or connected via VPC peering.
- **Security groups**: Configure inbound rules to allow traffic from EKS worker nodes to RDS (port 5432) and OpenSearch (port 443).
- **OpenSearch compatibility**: Review the [OpenSearch integration guide](/self-managed/deployment/helm/configure/database/using-external-opensearch.md) for Camunda-specific configuration.

### Azure

- **Managed Identity**: Consider using [Managed Identity](https://learn.microsoft.com/en-us/azure/active-directory/managed-identities-azure-resources/) for authentication to Azure Database for PostgreSQL.
- **Private endpoints**: Use [Private Link](https://learn.microsoft.com/en-us/azure/private-link/) for secure connectivity between AKS and managed services.

### GCP

- **Cloud SQL Auth Proxy**: Use the [Cloud SQL Auth Proxy](https://cloud.google.com/sql/docs/postgres/sql-proxy) sidecar in your pods for secure connectivity.
- **Workload Identity**: Leverage [Workload Identity](https://cloud.google.com/kubernetes-engine/docs/concepts/workload-identity) for IAM-based authentication.

## Operational readiness

Before running this migration in production, follow these operational readiness steps to minimize risk — especially when migrating to external managed services where network and IAM configurations add complexity.

### Staging rehearsal

1. **Provision staging managed services** that mirror your production setup (same cloud provider, same region, same tier/SKU).
2. **Run the full migration end-to-end** in staging, including all four phases plus validation.
3. **Measure actual timings**: record how long each phase takes. Network latency to external services (RDS, Cloud SQL, OpenSearch) may increase backup/restore times compared to in-cluster operators.
4. **Test rollback**: after a successful staging migration, run `bash rollback.sh` to verify the Helm values revert correctly and Camunda reconnects to the Bitnami subcharts.

:::tip
When staging with managed services, use the same authentication method (IAM, managed identity, workload identity) that you plan to use in production — password-based staging does not catch permission issues.
:::

### Production dry-run

<DryRunCommands />

Pay special attention to:

- External endpoints and port configurations.
- Kubernetes Secret names and keys referenced in the Helm values.
- Network connectivity from the cluster to the managed services (security groups, private endpoints, firewall rules).

### Pre-migration checklist

Before starting the migration in production:

- [ ] **Verify managed service connectivity**: from within the cluster, confirm you can connect to each managed service endpoint using `kubectl run` with a temporary client pod.
- [ ] **Notify stakeholders**: announce the maintenance window at least 48 hours in advance.
- [ ] **Verify independent backups**: confirm a recent backup exists via both your cluster backup tool (Velero, snapshots) and the cloud provider's managed service backup (RDS snapshots, automated backups).
- [ ] **Check IAM permissions**: ensure the Kubernetes service account has the correct role bindings for the managed services (IRSA for AWS, Workload Identity for GCP, Managed Identity for Azure).
- [ ] **Monitor readiness**: have dashboards open for cluster health, managed service metrics (CPU, connections, storage), and pod status.

### Failback procedure

1. **Immediate failback** (Bitnami PVCs still exist): run `bash rollback.sh` to revert the Helm values.
2. **Late failback** (Bitnami PVCs deleted): restore from the backup taken during Phase 2. If your managed service has point-in-time recovery (PITR), you can also restore from a managed service snapshot, but note that Camunda would need to be reconfigured to point back to the Bitnami infrastructure.

<FailbackCaution />

### Data safety measures

- All `pg_dump` backups are stored on a dedicated PVC that persists independently.
- Managed services typically offer their own automated backups (RDS snapshots, Cloud SQL backups). Verify these are enabled and have adequate retention.
- The migration scripts are **idempotent** and can be re-run safely.
- No Bitnami resources are deleted during migration — they must be explicitly removed afterward.

### Post-migration monitoring

After completing the migration, monitor the following for at least 48 hours:

- **Pod restarts**: `kubectl get pods -n ${NAMESPACE} --watch`
- **Managed service metrics**: check connection counts, latency, CPU, and storage usage in your cloud provider console.
- **Camunda component logs**: look for connection timeouts, SSL/TLS handshake errors, or authentication failures.
- **Process instance completion**: verify that in-flight process instances continue to execute correctly.
- **Zeebe export lag**: confirm that Zeebe exporters are writing to the external Elasticsearch/OpenSearch without delays.
