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
import CommonPrerequisites from './\_partials/\_common-prerequisites.md'
import CloneRepo from './\_partials/\_clone-repo.md'
import DualRegionEsNote from './\_partials/\_dual-region-es-note.md'

Migrate a Camunda 8 Helm installation from Bitnami-managed infrastructure to **cloud-managed services**, such as:

- **PostgreSQL**: AWS RDS, Azure Database for PostgreSQL, Google Cloud SQL, or any managed PostgreSQL service
- **Elasticsearch**: Elastic Cloud or any managed Elasticsearch service
- **Keycloak**: This guide does not assume a managed Keycloak service. Keep Keycloak on the [Keycloak Operator](https://www.keycloak.org/operator/installation), or replace it with an [external OIDC provider](/self-managed/deployment/helm/configure/authentication-and-authorization/external-oidc-provider.md) if that better fits your environment.

## When to use this guide

Managed services are ideal when your organization:

- Prefers minimal operational overhead for database and search infrastructure
- Already uses a cloud provider's managed services catalog
- Requires SLA-backed availability and automated patching from the cloud vendor
- Does not want to manage Kubernetes operators for infrastructure components

Read the [topic overview](./index.md#why-migrate) to learn why you should migrate.

## Prerequisites

Before starting the migration, ensure you have the following [general prerequisites](./index.md#prerequisites-all-paths):

<CommonPrerequisites />

In addition to the general prerequisites:

- **Managed services already provisioned**: PostgreSQL and Elasticsearch instances must be running and accessible before starting the migration. If you haven't provisioned them yet, see the [provisioning reference](#provisioning-reference) in Step 1.
- Ensure network connectivity between your Kubernetes cluster and the managed services.
- Have credentials ready for each managed service.

:::tip Before running in production
Review the [Operational readiness](#operational-readiness) checklist, including the staging rehearsal and pre-migration checklist, before starting a production migration.
:::

### IRSA / IAM-based authentication not supported

The migration jobs use password-based PostgreSQL authentication (`PGPASSWORD`) and standard Elasticsearch HTTP API. Setups using AWS IAM Roles for Service Accounts (IRSA) with `jdbc:aws-wrapper` or Elasticsearch endpoints protected by cloud-specific IAM auth require a custom migration approach.

### Identity authentication

You need to decide how Identity will authenticate before the cutover. For managed services, the infrastructure decision is separate from the authentication decision:

- If you **keep Keycloak**, deploy it with the Keycloak Operator and set the hostname to the full public URL, for example `https://your-domain.example.com/auth`.
- If you **replace Keycloak with external OIDC**, prepare the provider configuration and the corresponding Identity Helm values before running the migration.

## Clone the deployment references repository

<CloneRepo />

## Step 1: Create Kubernetes Secrets for managed services

This step assumes your managed PostgreSQL and Elasticsearch services are already provisioned and accessible from the Kubernetes cluster. You need the endpoint, port, database names, usernames, and credentials for each service.

<details>
<summary>Provisioning reference</summary>

If you haven't provisioned your managed services yet, use your cloud provider's official documentation:

**PostgreSQL:**

- [AWS RDS for PostgreSQL](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_PostgreSQL.html)
- [Azure Database for PostgreSQL - Flexible Server](https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/overview)
- [Google Cloud SQL for PostgreSQL](https://cloud.google.com/sql/docs/postgres)

Minimum requirements:

- Create the `identity`, `keycloak`, and `webmodeler` databases.
- Create or assign credentials for each database according to your provider's model.
- Ensure private connectivity from the Kubernetes cluster to PostgreSQL.
- Record the endpoint, port, database names, usernames, and secret material.

**Elasticsearch:**

- [Elastic Cloud](https://www.elastic.co/guide/en/cloud/current/ec-getting-started.html) — note the deployment endpoint, Cloud ID, and credentials.
- Self-managed Elasticsearch — ensure it is accessible from the cluster, and note the endpoint and credentials.

</details>

<DualRegionEsNote />

:::warning Elasticsearch to OpenSearch is not supported
This migration path does not support moving data from the Bitnami Elasticsearch subchart to Amazon OpenSearch Service or another OpenSearch target.

If your target architecture requires OpenSearch, treat that as a separate replatforming effort instead of a supported in-place migration from the Bitnami Elasticsearch subchart.
:::

### Create Kubernetes Secrets

Store the managed service credentials as Kubernetes Secrets so both the migration scripts and Camunda Helm chart can use them:

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

## Step 2: Configure the migration for external targets

:::info Terminology — "managed services" vs. "external targets"
The migration scripts use the term **external targets** (`PG_TARGET_MODE=external`, `ES_TARGET_MODE=external`) for any non-operator target. This includes cloud-managed services (AWS RDS, Elastic Cloud, etc.) but also self-hosted databases outside the Kubernetes cluster. This guide uses "managed services" as a shorthand, but the scripts themselves are not restricted to cloud-managed offerings.
:::

Edit `env.sh`, and set the target mode to `external`. The base configuration variables (`NAMESPACE`, `CAMUNDA_RELEASE_NAME`, `MIGRATE_*`, etc.) are the same as in the [operator-based guide](./bitnami-to-operators.md#key-configuration-variables) — only the target mode and external endpoint variables differ:

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
You can use the same managed PostgreSQL host for all components—each database is separate. This is common when using a single RDS instance with multiple databases.
:::

### Create custom Helm values

When using external targets, you need a custom Helm values file that configures Camunda to connect to the managed services. Set `CUSTOM_HELM_VALUES_FILE` to point to this file:

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

:::warning Helm values customization
The example above is a starting point. Adjust the values to match your specific managed service configuration, authentication method (IAM, username/password, etc.), and TLS requirements. Refer to the [Camunda Helm chart parameters](/self-managed/deployment/helm/chart-parameters.md) for all available options.
:::

### Source `env.sh`

Source the configuration:

```bash
source env.sh
```

## Step 3: Run the migration

The migration follows the same five-phase approach described in the [migration overview](/self-managed/deployment/helm/operational-tasks/migration-from-bitnami/index.md#migration-phases). Each phase is idempotent and can be safely rerun. The key difference with external targets is that operator installation is skipped for components using managed services.

### Phase 1: Deploy targets (no downtime)

```bash
bash 1-deploy-targets.sh
```

What happens:

- When `PG_TARGET_MODE=external`, the CloudNativePG (CNPG) operator is not installed; your managed PostgreSQL is used directly.
- When `ES_TARGET_MODE=external`, the Elastic Cloud on Kubernetes (ECK) operator is not installed; your managed Elasticsearch target is used directly.
- The Keycloak Operator is still deployed with a Custom Resource pointing to your managed PostgreSQL.
- The script validates connectivity to each external endpoint before proceeding.

### Phase 2: Initial backup (no downtime)

```bash
bash 2-backup.sh
```

What happens:

1. **PostgreSQL**: A `pg_dump` Kubernetes Job is created for each component (Identity, Keycloak, and Web Modeler).
2. **Elasticsearch**: A verification job checks source Elasticsearch health and lists all Camunda indices to be migrated.
3. All backup data is stored on a shared Persistent Volume Claim (PVC).

The target type does not affect this phase — backups always run against the source Bitnami instances.

### Phase 3: Cutover (downtime required)

:::warning Maintenance window required
Schedule a maintenance window. Typical duration: 5–30 minutes. See [downtime estimation](./bitnami-to-operators.md#downtime-estimation) for benchmarked timings.
:::

```bash
bash 3-cutover.sh
```

What happens:

1. **Save** current Helm values for rollback.
2. **Freeze** all Camunda deployments and StatefulSets (scale to zero replicas).
3. **Final backup** — consistent backup with no active connections.
4. **Restore** — `pg_restore` runs against the managed PostgreSQL endpoints instead of CNPG clusters.
5. **Helm upgrade** — reconfigures Camunda to use the new backends and restarts all components.

#### Elasticsearch data migration for managed services

:::warning Manual Elasticsearch data migration
Automated Elasticsearch data migration is **not supported** for external targets. The automated migration uses the `_reindex` API, which requires both source and target Elasticsearch clusters to be reachable within the same Kubernetes namespace. This isn't possible with managed services.
:::

For Elasticsearch data migration to managed services, you have several options:

<Tabs groupId="es-migration" queryString>

<TabItem value="elasticdump" label="elasticdump">

Use the [`elasticdump`](https://github.com/elasticsearch-dump/elasticsearch-dump) npm tool to transfer indices from source to target. For example:

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

</TabItem>

<TabItem value="s3-snapshot" label="S3 snapshot repository">

If both source and target elasticsearch support Amazon S3 snapshot repositories, you can use a shared S3 bucket. For example:

```bash
# Register an S3 snapshot repository on the source Bitnami Elasticsearch, and create a snapshot
curl -X PUT "localhost:9200/_snapshot/s3_backup" \
  -H 'Content-Type: application/json' \
  -d '{"type":"s3","settings":{"bucket":"my-migration-bucket","region":"us-east-1"}}'

curl -X PUT "localhost:9200/_snapshot/s3_backup/migration?wait_for_completion=true" \
  -H 'Content-Type: application/json' \
  -d '{"indices":"*","ignore_unavailable":true}'

# Register the same S3 repository on the target managed Elasticsearch, and restore the snapshot
curl -X PUT "https://target-endpoint/_snapshot/s3_backup" \
  -H 'Content-Type: application/json' \
  -d '{"type":"s3","settings":{"bucket":"my-migration-bucket","region":"us-east-1"}}'

curl -X POST "https://target-endpoint/_snapshot/s3_backup/migration/_restore" \
  -H 'Content-Type: application/json' \
  -d '{"indices":"*","ignore_unavailable":true}'
```

</TabItem>

<TabItem value="reindex" label="Reindex API">

Use the Elasticsearch [Reindex API](https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-reindex.html) to copy data from the source to the target. This requires the target to allowlist the source as a remote.

Reindex each concrete Camunda index individually rather than using a single wildcard destination. To stay aligned with the migration scripts, include `zeebe-*`, `operate-*`, `tasklist-*`, `optimize-*`, `connectors-*`, and `camunda-*` indices. For example:

```bash
# On the target, add source to reindex.remote.allowlist.
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

Review the source index list before running the loop. If your deployment uses custom index prefixes, include those prefixes in the `_cat/indices` query.

</TabItem>

</Tabs>

### Phase 4: Validate (no downtime)

```bash
bash 4-validate.sh
```

The validation script checks that all Camunda deployments and StatefulSets are ready, and that the Keycloak Custom Resource is healthy. For external PostgreSQL and Elasticsearch targets, it verifies connectivity to the managed service endpoints rather than checking CNPG/ECK cluster status. A migration report is generated at `.state/migration-report.md`.

### Phase 5: Cleanup Bitnami resources (no downtime)

:::warning Wait before cleanup
Operate with the new infrastructure through at least one full business cycle (for example, a complete weekday with peak traffic) before cleanup. Once Bitnami resources are deleted, rollback is no longer possible without restoring from backup. If you need to fail back, run `bash rollback.sh` **before** this phase (see [Rollback](#rollback)).
:::

After confirming the migration is successful, remove old Bitnami resources by running the cleanup script:

```bash
bash 5-cleanup-bitnami.sh
```

This deletes the old Bitnami PostgreSQL StatefulSets, PVCs, Elasticsearch StatefulSet, Keycloak StatefulSet, and the migration backup PVC. The script checks resource existence before each deletion and can be safely rerun. For the full cleanup behavior, see [Phase 5 in the operator-based guide](./bitnami-to-operators.md#phase-5-cleanup-bitnami-resources-no-downtime).

### Rollback

If the migration fails or produces unexpected results, you can roll back to the pre-cutover state:

```bash
bash rollback.sh
```

This restores the previous Helm values (re-enabling Bitnami subcharts) and restarts Camunda on the original infrastructure.

:::info Rollback scope
Rollback is available after Phase 3 (cutover) and before Phase 5 (cleanup). Before Phase 3, simply stop the migration; your Bitnami infrastructure is still active and untouched.
:::

## Operational readiness

Before running this migration in production, use the checklist below to reduce risk, especially where network policy and external service access add complexity.

If you are using the migration scripts, also consult the [downtime estimation](./bitnami-to-operators.md#downtime-estimation), [migration hooks](./index.md#migration-hooks), and [troubleshooting](./bitnami-to-operators.md#troubleshooting) sections in the operator-based guide — they apply equally to external targets.

### Staging rehearsal

1. **Provision staging managed services** that mirror your production setup—same cloud provider, same region, and same tier/SKU.
2. **Run the full migration end to end** in staging, including all five phases: deploy, backup, cutover, validate, and cleanup.
3. **Measure actual timings**: record how long each phase takes. Network latency to external services, such as RDS, Cloud SQL, and Elasticsearch, may increase backup and restore times compared to in-cluster operators.
4. **Test rollback**: after a successful staging migration, run `bash rollback.sh` to verify the Helm values revert correctly and Camunda reconnects to the Bitnami subcharts.

:::tip
When staging with managed services, use the same authentication method (IAM, managed identity, workload identity) that you plan to use in production. Password-based staging does not catch permission issues.
:::

### Production dry-run

<DryRunCommands />

Pay special attention to:

- External endpoints and port configurations.
- Kubernetes Secret names and keys referenced in the Helm values.
- Network connectivity from the cluster to the managed services (security groups, private endpoints, firewall rules).

### Pre-migration checklist

Before starting the migration in production:

- **Verify managed service connectivity**: from within the cluster, confirm you can connect to each managed service endpoint using `kubectl run` with a temporary client pod.
- **Notify stakeholders**: announce the maintenance window at least 48 hours in advance. Include expected start time, duration (measured in staging), and impact on end users.
- **Verify independent backups**: confirm a recent backup exists via both your cluster backup tool (Velero, snapshots) and the cloud provider's managed service backup (RDS snapshots, automated backups).
- **Check IAM permissions**: ensure the Kubernetes service account has the correct role bindings for the managed services (IRSA for AWS, Workload Identity for GCP, Managed Identity for Azure).
- **Monitor readiness**: have dashboards open for cluster health, managed service metrics (CPU, connections, storage), and pod status.

### Failback procedure

1. **Immediate failback** (Bitnami PVCs still exist): run `bash rollback.sh` to revert the Helm values.
2. **Late failback** (Bitnami PVCs deleted): restore from the backup taken during Phase 2. If your managed service has point-in-time recovery (PITR), you can also restore from a managed service snapshot, but note that Camunda would need to be reconfigured to point back to the Bitnami infrastructure.

<FailbackCaution />

### Data safety measures

- All `pg_dump` backups are stored on a dedicated PVC that persists independently.
- Managed services typically offer their own automated backups (RDS snapshots, Cloud SQL backups). Verify these are enabled and have adequate retention.
- The migration scripts are idempotent and can be rerun safely.
- No Bitnami resources are deleted during migration. They must be explicitly removed afterward.

### Post-migration monitoring

After completing the migration, monitor the following for at least 48 hours:

- **Pod restarts**: `kubectl get pods -n ${NAMESPACE} --watch`
- **Managed service metrics**: check connection counts, latency, CPU, and storage usage in your cloud provider console.
- **Camunda component logs**: look for connection timeouts, SSL/TLS handshake errors, or authentication failures.
- **Process instance completion**: verify that in-flight process instances continue to execute correctly.
- **Zeebe export lag**: confirm that Zeebe exporters are writing to the external Elasticsearch target without delays.
