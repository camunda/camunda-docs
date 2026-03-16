---
id: bitnami-to-managed-services
sidebar_label: Migrate to managed services
title: Migrate from Bitnami subcharts to managed services
description: "Migrate Camunda 8 Self-Managed infrastructure from Bitnami subcharts to cloud-managed services such as AWS RDS, managed Elasticsearch, Azure Database for PostgreSQL, and similar."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import FailbackCaution from './\_partials/\_ops-failback-caution.md'
import DryRunCommands from './\_partials/\_ops-dry-run-commands.md'

This guide walks you through migrating a Camunda 8 Helm installation from Bitnami-managed infrastructure to **cloud-managed services** such as:

- **PostgreSQL**: AWS RDS, Azure Database for PostgreSQL, Google Cloud SQL, or any managed PostgreSQL service
- **Elasticsearch**: Elastic Cloud or any managed Elasticsearch service
- **Keycloak**: This guide does not assume a managed Keycloak service. Keep Keycloak on the [Keycloak Operator](https://www.keycloak.org/operator/installation), or replace it with an [external OIDC provider](/self-managed/deployment/helm/configure/authentication-and-authorization/external-oidc-provider.md) if that better fits your environment.

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
- Have a managed Elasticsearch instance provisioned (if migrating Elasticsearch)
- Ensure network connectivity between your Kubernetes cluster and the managed services
- Have credentials stored as Kubernetes Secrets in the Camunda namespace

:::warning IRSA / IAM-based authentication not supported
The migration jobs use password-based PostgreSQL authentication (`PGPASSWORD`) and standard Elasticsearch HTTP API. Setups using AWS IAM Roles for Service Accounts (IRSA) with `jdbc:aws-wrapper` or Elasticsearch endpoints protected by cloud-specific IAM auth require a custom migration approach.
:::

:::important Decide how Identity will authenticate before the cutover
For managed services, the infrastructure decision is separate from the authentication decision:

- If you **keep Keycloak**, deploy it with the Keycloak Operator and set the hostname to the full public URL, for example `https://your-domain.example.com/auth`.
- If you **replace Keycloak with external OIDC**, prepare the provider configuration and the corresponding Identity Helm values before running the migration.
  :::

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

### Elasticsearch

:::warning Elasticsearch to OpenSearch is not supported
This migration path does not support moving data from the Bitnami Elasticsearch subchart to Amazon OpenSearch Service or another OpenSearch target.

If your target architecture requires OpenSearch, treat that as a separate replatforming effort instead of a supported in-place migration from the Bitnami Elasticsearch subchart.
:::

<Tabs groupId="es-provider" queryString>

<TabItem value="elastic-cloud" label="Elastic Cloud">

Create an Elastic Cloud deployment. Note the deployment endpoint, Cloud ID, and credentials.

</TabItem>

<TabItem value="self-managed-es" label="Self-managed Elasticsearch">

If using a self-managed Elasticsearch cluster (not on Kubernetes), ensure it is accessible from the cluster and note the endpoint and credentials.

</TabItem>

</Tabs>

### Create Kubernetes Secrets

Store the managed service credentials as Kubernetes Secrets so that both the migration scripts and Camunda Helm chart can use them:

<details>
<summary>Show details: Kubernetes Secrets example</summary>

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

# Elasticsearch secret
kubectl create secret generic external-es \
  -n ${NAMESPACE} \
  --from-literal=elastic='<es-password>'
```

</details>

## Step 2: Configure the migration for external targets

Edit `env.sh` and set the target mode to `external`:

<details>
<summary>Show details: external target configuration example</summary>

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

# Elasticsearch external target
export EXTERNAL_ES_HOST="your-elastic-endpoint.example.com"
export EXTERNAL_ES_PORT="443"
export EXTERNAL_ES_SECRET="external-es"
```

</details>

:::info Same host for all PostgreSQL databases
You can use the same managed PostgreSQL host for all components — each database is separate. This is common when using a single RDS instance with multiple databases.
:::

### Create custom Helm values

When using external targets, you need a custom Helm values file that configures Camunda to connect to the managed services. Set the `CUSTOM_HELM_VALUES_FILE` variable to point to this file:

```bash
export CUSTOM_HELM_VALUES_FILE="./my-external-values.yaml"
```

Example custom values file for AWS RDS + external Elasticsearch:

<details>
<summary>Show details: external Helm values example</summary>

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

# Configure external Elasticsearch using the per-component values schema
orchestration:
  data:
    secondaryStorage:
      type: elasticsearch
      elasticsearch:
        url: "https://your-elastic-endpoint.example.com:443"
        auth:
          username: "elastic"
          secret:
            existingSecret: "external-es"
            existingSecretKey: "elastic"

optimize:
  database:
    elasticsearch:
      enabled: true
      external: true
      url:
        protocol: "https"
        host: "your-elastic-endpoint.example.com"
        port: 443
      auth:
        username: "elastic"
        secret:
          existingSecret: "external-es"
          existingSecretKey: "elastic"

elasticsearch:
  enabled: false
```

</details>

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

- ECK operator is **not installed** — your managed Elasticsearch target is used directly.

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
Automated Elasticsearch data migration is **not supported** for external targets. The automated migration uses the `_reindex` API which requires both source and target Elasticsearch clusters to be reachable within the same Kubernetes namespace, which is not possible with managed services.
:::

For Elasticsearch data migration to managed services, you have several options:

<Tabs groupId="es-migration" queryString>

<TabItem value="fresh-start" label="Fresh start (recommended)">

Let Camunda rebuild Elasticsearch indexes from Zeebe on the next export. This is the simplest approach and works well if you don't need historical Operate/Tasklist data immediately available.

After the Helm upgrade, Zeebe exporters will populate the new Elasticsearch target with current data. Historical data will be available as Zeebe replays events.

No additional steps are required — this happens automatically.

</TabItem>

<TabItem value="elasticdump" label="elasticdump">

Use the [`elasticdump`](https://github.com/elasticsearch-dump/elasticsearch-dump) npm tool to transfer indices from source to target:

<details>
<summary>Show details: `elasticdump` example</summary>

```bash
# Install elasticdump
npm install -g elasticdump

# Get source ES password
SOURCE_ES_PWD=$(kubectl get secret ${CAMUNDA_RELEASE_NAME}-elasticsearch \
  -n ${NAMESPACE} -o jsonpath='{.data.elasticsearch-password}' | base64 -d)

# Port-forward source ES
kubectl port-forward svc/${CAMUNDA_RELEASE_NAME}-elasticsearch -n ${NAMESPACE} 9200:9200 &

# Dump and restore each index pattern
for pattern in zeebe operate tasklist optimize connectors camunda; do
  elasticdump \
    --input="http://elastic:${SOURCE_ES_PWD}@localhost:9200/${pattern}-*" \
    --output="https://elastic:<password>@your-elastic-endpoint.example.com:443/${pattern}-*" \
    --type=data \
    --limit=1000
done
```

  </details>

</TabItem>

<TabItem value="s3-snapshot" label="S3 snapshot repository">

If both source and target elasticsearch support S3 snapshot repositories, you can use a shared S3 bucket:

1. Register an S3 snapshot repository on the source Bitnami Elasticsearch.
2. Create a snapshot.
3. Register the same S3 repository on the target managed Elasticsearch.
4. Restore the snapshot.

<details>
<summary>Show details: S3 snapshot example</summary>

```bash
# On source ES: register S3 repo and create snapshot
curl -X PUT "localhost:9200/_snapshot/s3_backup" \
  -H 'Content-Type: application/json' \
  -d '{"type":"s3","settings":{"bucket":"my-migration-bucket","region":"us-east-1"}}'

curl -X PUT "localhost:9200/_snapshot/s3_backup/migration?wait_for_completion=true" \
  -H 'Content-Type: application/json' \
  -d '{"indices":"*","ignore_unavailable":true}'

# On target Elasticsearch: register same S3 repo and restore
curl -X PUT "https://target-endpoint/_snapshot/s3_backup" \
  -H 'Content-Type: application/json' \
  -d '{"type":"s3","settings":{"bucket":"my-migration-bucket","region":"us-east-1"}}'

curl -X POST "https://target-endpoint/_snapshot/s3_backup/migration/_restore" \
  -H 'Content-Type: application/json' \
  -d '{"indices":"*","ignore_unavailable":true}'
```

</details>

</TabItem>

<TabItem value="reindex" label="Reindex API">

Use the Elasticsearch [Reindex API](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-reindex.html) to copy data from the source to the target. This requires the target to whitelist the source as a remote.

Reindex each concrete Camunda index individually rather than using a single wildcard destination. To stay aligned with the migration scripts, include `zeebe-*`, `operate-*`, `tasklist-*`, `optimize-*`, `connectors-*`, and `camunda-*` indices.

<details>
<summary>Show details: Reindex API example</summary>

```bash
# On the target, add source to reindex.remote.whitelist.
# Then iterate over every Camunda index you want to copy.
for idx in $(curl -s -u "elastic:<password>" \
  "http://source-es:9200/_cat/indices/zeebe-*,operate-*,tasklist-*,optimize-*,connectors-*,camunda-*?h=index"); do
  curl -X POST "https://target-endpoint/_reindex?wait_for_completion=true" \
    -H 'Content-Type: application/json' \
    -d '{
      "source": {
        "remote": {
          "host": "http://source-es:9200",
          "username": "elastic",
          "password": "<password>"
        },
        "index": "'${idx}'"
      },
      "dest": {
        "index": "'${idx}'"
      }
    }'
done
```

</details>

Review the source index list before running the loop. If your deployment uses custom index prefixes, include those prefixes in the `_cat/indices` query.

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

After confirming the migration is successful (wait at least 72 hours), remove old Bitnami resources by running the cleanup script:

```bash
bash 5-cleanup-bitnami.sh
```

For the cleanup behavior and safety notes, see [Phase 5 in the operator-based guide](./bitnami-to-operators.md#phase-5-cleanup-bitnami-resources-no-downtime).

## Operational readiness

Before running this migration in production, use the checklist below to reduce risk — especially where network policy and external service access add complexity.

### Staging rehearsal

1. **Provision staging managed services** that mirror your production setup (same cloud provider, same region, same tier/SKU).
2. **Run the full migration end-to-end** in staging, including all five phases plus validation.
3. **Measure actual timings**: record how long each phase takes. Network latency to external services (RDS, Cloud SQL, Elasticsearch) may increase backup/restore times compared to in-cluster operators.
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
- **Zeebe export lag**: confirm that Zeebe exporters are writing to the external Elasticsearch target without delays.
