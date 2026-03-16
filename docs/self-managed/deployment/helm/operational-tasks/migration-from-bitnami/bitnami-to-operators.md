---
id: bitnami-to-operators
sidebar_label: Migrate to Kubernetes operators
title: Migrate from Bitnami subcharts to Kubernetes operators
description: "Step-by-step guide to migrate Camunda 8 Self-Managed infrastructure from Bitnami subcharts to CloudNativePG, ECK Elasticsearch, and Keycloak Operator."
---

<!-- (!) Note: Please ensure that this guide maintains a consistent structure and presentation style throughout, as with docs/self-managed/deployment/helm/cloud-providers/amazon/amazon-eks/eks-helm.md. -->

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import FailbackCaution from './\_partials/\_ops-failback-caution.md'
import DryRunCommands from './\_partials/\_ops-dry-run-commands.md'

This guide walks you through migrating a Camunda 8 Helm installation from Bitnami-managed infrastructure (PostgreSQL, Elasticsearch, Keycloak) to **Kubernetes operator-managed equivalents**:

- **[CloudNativePG](https://cloudnative-pg.io/)** for PostgreSQL
- **[Elastic Cloud on Kubernetes (ECK)](https://www.elastic.co/guide/en/cloud-on-k8s/current/index.html)** for Elasticsearch
- **[Keycloak Operator](https://www.keycloak.org/operator/installation)** for Keycloak

After migration, your setup will be aligned with the [operator-based reference architecture](/self-managed/deployment/helm/configure/operator-based-infrastructure.md).

## Prerequisites

Before starting the migration, ensure you have:

- A running Camunda 8 installation using the Helm chart with Bitnami subcharts
- `kubectl` configured for the target cluster
- `helm` v3 with `camunda/camunda-platform` repo added
- [`envsubst`](https://www.man7.org/linux/man-pages/man1/envsubst.1.html) available (usually included in `gettext`)
- [`jq`](https://jqlang.github.io/jq/download/) installed
- [`yq`](https://github.com/mikefarah/yq) installed (for selective CNPG cluster deployment)
- `base64` and `openssl` available (used for credential management)
- Sufficient cluster resources to run both old and new infrastructure temporarily

:::tip Tool versions
For the tool versions used and tested, check the [.tool-versions](https://github.com/camunda/camunda-deployment-references/blob/main/.tool-versions) file in the repository.
:::

## Clone the deployment references repository

The migration scripts are part of the [Camunda deployment references](https://github.com/camunda/camunda-deployment-references) repository. Clone the repository and navigate to the migration directory:

```bash
git clone https://github.com/camunda/camunda-deployment-references.git
cd camunda-deployment-references/generic/kubernetes/migration
```

### Directory structure

The migration reuses the operator-based reference architecture scripts for deploying target infrastructure, ensuring consistency:

```
generic/kubernetes/
├── operator-based/                  # Reference architecture (reused by migration)
│   ├── postgresql/
│   │   ├── deploy.sh               #   CNPG operator + cluster deployment
│   │   ├── set-secrets.sh          #   PostgreSQL secret management
│   │   ├── postgresql-clusters.yml #   ★ CUSTOMIZE: PG cluster specs
│   │   ├── camunda-identity-values.yml
│   │   └── camunda-webmodeler-values.yml
│   ├── elasticsearch/
│   │   ├── deploy.sh               #   ECK operator + cluster deployment
│   │   ├── elasticsearch-cluster.yml #   ★ CUSTOMIZE: ES cluster specs
│   │   └── camunda-elastic-values.yml
│   └── keycloak/
│       ├── deploy.sh               #   Keycloak operator + CR deployment
│       ├── keycloak-instance-*.yml #   ★ CUSTOMIZE: Keycloak CR specs
│       ├── camunda-keycloak-domain-values.yml
│       └── camunda-keycloak-no-domain-values.yml
│
└── migration/                       # Migration scripts
    ├── env.sh                       # Configuration variables
    ├── lib.sh                       # Shared library (do not edit)
    ├── 1-deploy-targets.sh          # Phase 1: Deploy operators + clusters
    ├── 2-backup.sh                  # Phase 2: Initial backup
    ├── 3-cutover.sh                 # Phase 3: Freeze → Restore → Switch
    ├── 4-validate.sh                # Phase 4: Validate everything
    ├── 5-cleanup-bitnami.sh         # Phase 5: Remove old Bitnami resources
    ├── rollback.sh                  # Emergency rollback
    ├── .state/                      # Migration state tracking (auto-generated)
    ├── hooks/                       # Custom hook scripts (optional)
    ├── jobs/                        # Kubernetes Job templates
    │   ├── pg-backup.job.yml
    │   ├── pg-restore.job.yml
    │   ├── es-backup.job.yml        #   ES health verification
    │   └── es-restore.job.yml       #   ES reindex-from-remote restore
    └── manifests/
        ├── backup-pvc.yml           # Shared backup PVC
        └── eck-migration-patch.yml  # ES reindex.remote.whitelist patch
```

## Step 1: Configure the migration

Edit `env.sh` to match your current Camunda installation:

<details>
<summary>Show details: `env.sh` reference</summary>

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/migration/env.sh
```

</details>

### Key configuration variables

| Variable                     | Default                | Description                                                      |
| ---------------------------- | ---------------------- | ---------------------------------------------------------------- |
| `NAMESPACE`                  | `camunda`              | Kubernetes namespace of your Camunda installation                |
| `CAMUNDA_RELEASE_NAME`       | `camunda`              | Helm release name                                                |
| `CAMUNDA_HELM_CHART_VERSION` | (chart version)        | Target Helm chart version for the upgrade                        |
| `CAMUNDA_DOMAIN`             | (empty)                | Domain for Keycloak Ingress. Leave empty for port-forward setups |
| `IDENTITY_DB_NAME`           | `identity`             | Identity database name (must match the source installation)      |
| `IDENTITY_DB_USER`           | `identity`             | Identity database user (must match the source installation)      |
| `KEYCLOAK_DB_NAME`           | `keycloak`             | Keycloak database name (must match the source installation)      |
| `KEYCLOAK_DB_USER`           | `keycloak`             | Keycloak database user (must match the source installation)      |
| `WEBMODELER_DB_NAME`         | `webmodeler`           | Web Modeler database name (must match the source installation)   |
| `WEBMODELER_DB_USER`         | `webmodeler`           | Web Modeler database user (must match the source installation)   |
| `BACKUP_PVC`                 | `migration-backup-pvc` | PVC name for storing backup data                                 |
| `BACKUP_STORAGE_SIZE`        | `50Gi`                 | Backup PVC size (must fit all database dumps)                    |
| `MIGRATE_IDENTITY`           | `true`                 | Migrate Identity PostgreSQL database                             |
| `MIGRATE_KEYCLOAK`           | `true`                 | Migrate Keycloak and its PostgreSQL database                     |
| `MIGRATE_WEBMODELER`         | `true`                 | Migrate Web Modeler PostgreSQL database                          |
| `MIGRATE_ELASTICSEARCH`      | `true`                 | Migrate Elasticsearch data                                       |

Set any `MIGRATE_*` variable to `false` to skip a component — for example, if it is not deployed or already uses an external service.

#### Operator-specific variables

These variables control the operator deployments. Defaults work for most setups:

| Variable                  | Default          | Description                              |
| ------------------------- | ---------------- | ---------------------------------------- |
| `CNPG_OPERATOR_NAMESPACE` | `cnpg-system`    | Namespace for the CloudNativePG operator |
| `ECK_OPERATOR_NAMESPACE`  | `elastic-system` | Namespace for the ECK operator           |
| `CNPG_IDENTITY_CLUSTER`   | `pg-identity`    | CNPG cluster name for Identity           |
| `CNPG_KEYCLOAK_CLUSTER`   | `pg-keycloak`    | CNPG cluster name for Keycloak           |
| `CNPG_WEBMODELER_CLUSTER` | `pg-webmodeler`  | CNPG cluster name for Web Modeler        |
| `ECK_CLUSTER_NAME`        | `elasticsearch`  | ECK Elasticsearch cluster name           |

Once configured, source the file:

```bash
source env.sh
```

## Step 2: Customize operator manifests

:::danger Review before running
Before running the migration, **you must review and customize** the operator-based manifests to match your production requirements. The migration deploys operators and instances using these manifests — the default settings may not be appropriate for your workload.
:::

Use the following rule of thumb while reviewing the manifests:

| Component     | Must review before production                                              | Defaults may be acceptable for                          |
| ------------- | -------------------------------------------------------------------------- | ------------------------------------------------------- |
| PostgreSQL    | Storage size, replica count, CPU and memory, connection-related parameters | Short-lived staging rehearsals with representative data |
| Elasticsearch | Node count, storage size, JVM and resource limits                          | Dry runs where you only validate the workflow           |
| Keycloak      | Hostname, ingress or route mode, replica count, resource limits            | Non-production validation only                          |

If you are rehearsing the migration for the first time, keep the manifests simple but ensure storage is at least as large as the existing Bitnami volumes. Before production, revisit the sizing based on the timings and load observed during rehearsal.

### PostgreSQL (CloudNativePG)

Review the CNPG cluster specifications in `operator-based/postgresql/postgresql-clusters.yml`. Key settings to verify:

- Storage size (must be >= your current Bitnami PVC sizes)
- Number of replicas
- PostgreSQL version
- Resource requests and limits
- PostgreSQL parameters (shared_buffers, max_connections, etc.)

<details>
<summary>Show details: CloudNativePG manifest reference</summary>

```yaml reference
https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/operator-based/postgresql/postgresql-clusters.yml
```

</details>

### Elasticsearch (ECK)

The migration patches the reference ECK cluster manifest from `operator-based/elasticsearch/elasticsearch-cluster.yml` at runtime to add `reindex.remote.whitelist` support for data transfer via the `_reindex` API. Review the base manifest:

- Node count
- Storage size (must be >= your current Bitnami ES PVC size)
- Resource requests and limits

<details>
<summary>Show details: Elasticsearch manifest reference</summary>

```yaml reference
https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/operator-based/elasticsearch/elasticsearch-cluster.yml
```

</details>

### Keycloak

Review the Keycloak Custom Resource in `operator-based/keycloak/`. For the broader deployment context and Helm values layering, see [operator-based infrastructure](/self-managed/deployment/helm/configure/operator-based-infrastructure.md#keycloak-deployment). Choose the appropriate variant:

- `keycloak-instance-domain-nginx.yml` — if you have a domain with nginx Ingress
- `keycloak-instance-domain-openshift.yml` — for OpenShift deployments with Routes
- `keycloak-instance-no-domain.yml` — for port-forward setups

Key settings: replicas, resource limits, hostname configuration.

:::info Keycloak 26 hostname configuration
The Keycloak CR uses the v2 hostname provider (Keycloak 25+). The `hostname` field must include the full URL with scheme and path — for example, `https://your-domain.example.com/auth`. This ensures that the OIDC issuer URL is consistent and includes the `/auth` path prefix used by `http-relative-path`. The v1 hostname provider (Keycloak 24 and earlier) is not compatible with these manifests.
:::

## Step 3: Run the migration

The migration follows five sequential phases. Each phase can be re-run safely (idempotent).

### Phase 1: Deploy target infrastructure (no downtime)

This phase installs the Kubernetes operators and creates the target clusters alongside your existing Bitnami components. Your application continues to run normally.

```bash
bash 1-deploy-targets.sh
```

What happens:

1. The script displays a customization warning and asks for confirmation.
2. It validates target resource allocations (CPU, memory, PVC sizes) against your current Bitnami StatefulSets.
3. It installs **CloudNativePG operator** and creates PostgreSQL clusters for each component.
4. It installs **ECK operator** and creates an Elasticsearch cluster with `reindex.remote.whitelist` configured for data migration via the `_reindex` API.
5. It installs **Keycloak Operator** and creates the Keycloak Custom Resource.

All targets are created empty — no traffic is routed to them yet.

<details>
<summary>Show details: Phase 1 script reference</summary>

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/migration/1-deploy-targets.sh
```

</details>

:::info Selective component deployment
The script only deploys operators for components that are being migrated. For example, if `MIGRATE_ELASTICSEARCH=false`, the ECK operator is not installed.
:::

### Phase 2: Initial backup (no downtime)

This phase takes a "warm" backup of all data sources while the application is still running. This reduces the cutover window in Phase 3.

```bash
bash 2-backup.sh
```

What happens:

1. **PostgreSQL**: A `pg_dump` Kubernetes Job is created for each component (Identity, Keycloak, Web Modeler).
2. **Elasticsearch**: A verification job runs to check source ES health and list all Camunda indices to be migrated.
3. All backup data is stored on a shared Persistent Volume Claim (PVC).

The PostgreSQL backup job template:

<details>
<summary>Show details: PostgreSQL backup job template</summary>

```yaml reference
https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/migration/jobs/pg-backup.job.yml
```

</details>

The Elasticsearch verification job template:

<details>
<summary>Show details: Elasticsearch verification job template</summary>

```yaml reference
https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/migration/jobs/es-backup.job.yml
```

</details>

<details>
<summary>Show details: Phase 2 script reference</summary>

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/migration/2-backup.sh
```

</details>

### Phase 3: Cutover (downtime required)

:::caution Maintenance window required
This is the only phase that causes **downtime**. Schedule a maintenance window before proceeding. Typical duration: **5–40 minutes** depending on Elasticsearch data volume — see [Downtime estimation](#downtime-estimation) for benchmarked timings.
:::

```bash
bash 3-cutover.sh
```

The cutover performs the following steps:

1. **Save** current Helm values for rollback.
2. **Freeze** all Camunda deployments and StatefulSets (scale to 0 replicas).
3. **Final backup** — consistent backup with no active connections to ensure data integrity.
4. **Restore** data to the new operator-managed targets:
   - `pg_restore` to CNPG clusters for each PostgreSQL database.
   - Elasticsearch reindex from remote — indices are copied from the source Bitnami ES to the ECK cluster using the `_reindex` API. The source ES remains running during this step.
5. **Sync Keycloak admin credentials** — copies the restored admin password to the Keycloak Operator secret so Keycloak and Identity stay in sync.
6. **Helm upgrade** — reconfigures Camunda to use the new backends and restarts all components.

The PostgreSQL restore job template:

<details>
<summary>Show details: PostgreSQL restore job template</summary>

```yaml reference
https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/migration/jobs/pg-restore.job.yml
```

</details>

The Elasticsearch reindex-from-remote restore job template:

<details>
<summary>Show details: Elasticsearch restore job template</summary>

```yaml reference
https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/migration/jobs/es-restore.job.yml
```

</details>

<details>
<summary>Show details: Phase 3 script reference</summary>

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/migration/3-cutover.sh
```

</details>

### Phase 4: Validate (no downtime)

```bash
bash 4-validate.sh
```

This phase verifies that all components are healthy:

- All Camunda deployments and StatefulSets are ready.
- CNPG PostgreSQL clusters report a healthy state.
- ECK Elasticsearch cluster is in `Ready` phase with restored indices.
- Keycloak Custom Resource is ready.
- A migration report is generated at `.state/migration-report.md`.

<details>
<summary>Show details: Phase 4 script reference</summary>

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/migration/4-validate.sh
```

</details>

### Phase 5: Cleanup Bitnami resources (no downtime)

:::caution Wait before cleanup
Do not run this phase immediately after validation. Operate with the new infrastructure for at least 72 hours to confirm stability. Once Bitnami resources are deleted, rollback is no longer possible without restoring from backup.
:::

After confirming the migration is successful, remove old Bitnami StatefulSets, PVCs, services, and the migration backup PVC:

```bash
bash 5-cleanup-bitnami.sh
```

What happens:

1. The script requires Phase 4 to be completed and displays a **destructive operation warning** with a confirmation prompt.
2. **Deletes old Bitnami PostgreSQL** StatefulSets, their PVCs, and headless services (for each migrated component: Identity, Keycloak, Web Modeler).
3. **Deletes old Bitnami Elasticsearch** StatefulSet, PVCs, and services.
4. **Deletes old Bitnami Keycloak** StatefulSet.
5. **Deletes the migration backup PVC**.
6. **Re-verifies** that all Camunda components and operator-managed targets remain healthy after cleanup.
7. Suggests removing the `reindex.remote.whitelist` setting from the ECK Elasticsearch configuration as a post-cleanup step.

<details>
<summary>Show details: Phase 5 script reference</summary>

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/migration/5-cleanup-bitnami.sh
```

</details>

:::info Idempotent cleanup
The script checks whether each resource exists before attempting deletion, so it can be safely re-run if interrupted.
:::

:::danger Destructive and irreversible
This phase **permanently deletes** old Bitnami StatefulSets, PVCs, and the migration backup PVC. After cleanup, rollback to Bitnami sub-charts is **no longer possible**.

Before running this phase, strongly consider:

1. Take a full backup of all databases (`pg_dumpall` or equivalent)
2. Snapshot PVCs or storage volumes (cloud provider snapshots)
3. Store backups in cold storage (S3 Glacier, GCS Archive, etc.)
4. Keep rollback artifacts in `.state/` as a safety net
   :::

## Migration hooks

You can inject custom logic before or after each migration phase by placing executable shell scripts in the `hooks/` directory:

| Hook               | Trigger                                 |
| ------------------ | --------------------------------------- |
| `pre-phase-1.sh`   | Before deploying target infrastructure  |
| `post-phase-1.sh`  | After target infrastructure is deployed |
| `pre-phase-2.sh`   | Before initial backup                   |
| `post-phase-2.sh`  | After initial backup                    |
| `pre-phase-3.sh`   | Before cutover (before freeze)          |
| `post-phase-3.sh`  | After cutover is complete               |
| `pre-phase-4.sh`   | Before validation                       |
| `post-phase-4.sh`  | After validation                        |
| `pre-phase-5.sh`   | Before Bitnami cleanup                  |
| `post-phase-5.sh`  | After Bitnami cleanup                   |
| `pre-rollback.sh`  | Before rollback                         |
| `post-rollback.sh` | After rollback                          |

Example — send a Slack notification before cutover:

```bash
#!/bin/bash
# hooks/pre-phase-3.sh
curl -X POST "$SLACK_WEBHOOK" \
  -H 'Content-Type: application/json' \
  -d '{"text":"⚠️ Camunda migration cutover starting — downtime expected"}'
```

:::note
Hook scripts are `source`d (not forked), so they have access to all library functions and variables. A failing hook aborts the migration (due to `set -e`). Add `|| true` to make a hook best-effort.
:::

Typical hook use cases:

- Pause external consumers before Phase 3 and resume them after validation.
- Send change-management or on-call notifications at the start and end of cutover.
- Run smoke tests after Phase 3 or Phase 4 and fail the migration if a critical endpoint is unavailable.
- Update DNS or ingress records for Keycloak after the new service becomes active.

## Rollback

If the migration fails or produces unexpected results, you can roll back to the pre-cutover state:

```bash
bash rollback.sh
```

This restores the previous Helm values (re-enabling Bitnami subcharts) and restarts Camunda on the original infrastructure. The operator-managed resources (CNPG clusters, ECK, Keycloak CR) are **not deleted**, allowing you to retry or debug.

<details>
<summary>Show details: rollback script reference</summary>

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/migration/rollback.sh
```

</details>

:::info Rollback scope
Rollback is available after Phase 3 (cutover). Before that, simply stop the migration — your Bitnami infrastructure is still active and untouched.
:::

## Post-migration cleanup

After validating the migration and confirming everything works correctly for at least 72 hours, run Phase 5 to remove old Bitnami resources:

```bash
bash 5-cleanup-bitnami.sh
```

This script automatically removes old Bitnami PostgreSQL, Elasticsearch, and Keycloak StatefulSets along with their PVCs, headless services, and the migration backup PVC. See [Phase 5](#phase-5-cleanup-bitnami-resources-no-downtime) for details.

Manual deletion is possible, but the script is the safer option because it preserves the built-in confirmations, health checks, and state tracking.

## Downtime estimation

Only Phase 3 (cutover) causes downtime. The estimates below were measured on minimal Kubernetes clusters with standard storage. **Production clusters with faster storage and networking will perform significantly better** — always run a [staging rehearsal](#staging-rehearsal) with representative data volumes to measure your actual downtime.

### Reference timings

The following timings were observed migrating a Camunda 8 installation with all components (Identity, Keycloak, Web Modeler, Elasticsearch):

| Data profile                 | ES data  | PG data (3 databases) | Observed downtime |
| ---------------------------- | -------- | --------------------- | ----------------- |
| Minimal (fresh install)      | < 100 MB | ~30 MB                | **~4 min**        |
| Large (~6.5 million ES docs) | ~9 GB    | ~30 MB                | **~40 min**       |

### Phase 3 breakdown

| Step                          | Duration    | Notes                                                                            |
| ----------------------------- | ----------- | -------------------------------------------------------------------------------- |
| Freeze components (scale → 0) | ~10 s       | Scale down all deployments and StatefulSets                                      |
| PostgreSQL backup + restore   | ~40 s       | `pg_dump` / `pg_restore` for all databases; usually negligible at moderate sizes |
| **Elasticsearch reindex**     | **~38 min** | **Dominant factor**; copies all indices via the `_reindex` API                   |
| Helm upgrade + restart        | ~2 min      | Reconfigure backends and restart all components                                  |

### Estimates by Elasticsearch data volume

| ES Data Volume | Estimated Downtime | Bottleneck                 |
| -------------- | ------------------ | -------------------------- |
| < 1 GB         | ~5 minutes         | Helm upgrade + pod startup |
| 1–10 GB        | ~10–40 minutes     | ES reindex                 |
| 10–50 GB       | ~40 min–2 hours    | ES reindex                 |
| > 50 GB        | 2+ hours           | ES reindex                 |

:::info Key observations

- **Elasticsearch reindex dominates downtime.** With ~9 GB of ES data, the reindex step accounts for ~95% of the total cutover time. PostgreSQL backup and restore completes in under a minute regardless of reasonable data sizes.
- **Downtime scales linearly with ES data volume.** The largest indices (such as Optimize process-instance history) drive the overall duration.
- **Your cluster will likely be faster.** These timings were measured on constrained test infrastructure. Production clusters with NVMe storage, dedicated nodes, and higher network bandwidth typically achieve much higher reindex throughput.
- **Always measure in staging.** Run the full migration on a staging environment with representative data volumes to get an accurate downtime estimate for your specific setup.
  :::

## Precautions

1. **Test in staging first** — Run the full migration on a non-production environment before migrating production.
2. **Schedule a maintenance window** — Phase 3 requires downtime.
3. **Check cluster capacity** — During Phases 1–2, both old and new infrastructure run simultaneously, requiring additional CPU, memory, and storage.
4. **Backup your Helm values** — Done automatically in Phase 3, but consider an extra manual backup with `helm get values camunda -n camunda > backup-values.yaml`.
5. **Monitor resource quotas** — CNPG and ECK clusters consume additional resources. Ensure your namespace quotas and node capacity allow for the temporary duplication.
6. **Elasticsearch `reindex.remote.whitelist`** — The target ECK cluster must have `reindex.remote.whitelist` configured to allow pulling data from the source Bitnami Elasticsearch via the `_reindex` API. The migration scripts patch this automatically.
7. **DNS TTL** — If using a domain for Keycloak, ensure DNS TTL is low before cutover to minimize propagation delay.
8. **Keycloak OIDC impact** — Keycloak is the OIDC provider for all Camunda components (and possibly external applications). Migrating to the Keycloak Operator changes the underlying service. If you use a DNS CNAME for Keycloak, use a `hooks/post-phase-3.sh` hook to update the DNS target to the new Keycloak Operator service after cutover. If external applications share the same Keycloak realm, coordinate the DNS switch with their teams.

   **Session impact:** The database migration preserves all persistent data (realms, users, clients, signing keys, refresh tokens). Since Keycloak 25+, user sessions are persisted in the database and survive the switch. In-flight authentication flows (login pages in progress) and pending action tokens (password reset links) are lost — users simply need to retry. This is inherent to the downtime window and has no lasting effect.

:::warning IRSA / IAM-based authentication not supported
The migration jobs use password-based PostgreSQL authentication (`PGPASSWORD`) and standard Elasticsearch HTTP API. Setups using AWS IAM Roles for Service Accounts (IRSA) with `jdbc:aws-wrapper` or OpenSearch with IAM auth require a custom migration approach.
:::

## Troubleshooting

### A migration job fails

Check the job logs for details:

```bash
# List migration jobs
kubectl get jobs -n ${NAMESPACE} -l migration.camunda.io/type

# View logs for a specific job
kubectl logs -n ${NAMESPACE} job/<job-name>

# Describe the job for events
kubectl describe job <job-name> -n ${NAMESPACE}
```

Each phase is idempotent — you can re-run it after fixing the issue.

### PostgreSQL restore fails with permission errors

When restoring to CNPG, the `pg_restore` command uses `--no-owner --no-privileges` flags to avoid permission mismatches. If you see errors related to ownership, verify that the target database user has the correct permissions:

```bash
kubectl exec -it <cnpg-primary-pod> -n ${NAMESPACE} -- psql -U postgres -c "\\du"
```

### Elasticsearch reindex fails

The ES restore uses the `_reindex` API to pull data from the source Bitnami Elasticsearch to the target ECK cluster. Both clusters must be reachable within the same namespace. Check that the source ES is still running and accessible:

```bash
# Check if source ES is reachable from the target
kubectl exec -it <eck-pod> -n ${NAMESPACE} -- \
  curl -s http://${CAMUNDA_RELEASE_NAME}-elasticsearch:9200/_cluster/health
```

If the reindex fails for specific indices, check the job logs for mapping conflicts or timeout errors. You can delete the problematic indices on the target and re-run Phase 3.

### Migration status check

View the current migration progress:

```bash
bash 1-deploy-targets.sh --status
```

This shows which phases have been completed and their timestamps.

### State tracking

The scripts maintain migration state in `.state/migration.env` — a plain key-value file that records phase completion timestamps and deployment decisions. Each run appends to `.state/migration-YYYY-MM-DD.log`. The `.state/` directory is local and gitignored. To reset state and start over:

```bash
rm -rf .state/
```

## Operational readiness

Before running this migration in production, follow these operational readiness steps to minimize risk and ensure a smooth transition.

### Staging rehearsal

1. **Clone your production environment** to a staging cluster (same Helm chart version, same component configuration, comparable data volumes).
2. **Run the full migration end-to-end** in staging, including all five phases (deploy, backup, cutover, validate, and cleanup).
3. **Measure actual timings**: record how long each phase takes, especially the `3-cutover.sh` phase, as it determines your downtime window. The [benchmarked timings](#downtime-estimation) show that Elasticsearch reindex dominates — expect downtime to scale linearly with your ES data volume.
4. **Test rollback**: after a successful staging migration, intentionally run `bash rollback.sh` to verify you can revert cleanly.

:::tip
Use a representative data set — empty databases migrate in seconds but do not reveal the Elasticsearch reindex bottleneck that large datasets will. As a reference, ~9 GB of ES data takes ~40 min on minimal test infrastructure — production clusters with faster storage and networking will perform significantly better.
:::

### Production dry-run

<DryRunCommands />

Review the output carefully. Ensure that all Kubernetes resources, secrets, and Helm values match your expectations before removing `--dry-run`.

### Pre-migration checklist

Before starting the migration in production:

- [ ] **Notify stakeholders**: announce the maintenance window at least 48 hours in advance. Include expected start time, duration (measured in staging), and impact on end users.
- [ ] **Verify backups**: confirm that your existing backup strategy (Velero, volume snapshots, or cloud provider backups) has a recent successful backup. The migration creates its own backup, but an independent one provides an additional safety net.
- [ ] **Scale down non-essential consumers**: if you have external systems consuming Camunda APIs, consider pausing them during the freeze window to prevent data inconsistencies.
- [ ] **Check cluster resources**: ensure the cluster has enough CPU, memory, and storage to run both old and new infrastructure simultaneously during the migration (both exist briefly).
- [ ] **Review `env.sh`**: double-check all variables, especially `NAMESPACE`, `CAMUNDA_RELEASE_NAME`, `PG_TARGET_MODE`, and `ES_TARGET_MODE`.
- [ ] **Monitor readiness**: have dashboards open for cluster health, pod status, and storage capacity.

### Failback procedure

If the migration succeeds but you discover issues in the hours or days following:

1. **Immediate failback** (before Phase 5 — Bitnami PVCs still exist): run `bash rollback.sh` to revert the Helm values and re-attach to the original Bitnami StatefulSets.
2. **Late failback** (after Phase 5 — Bitnami PVCs deleted): restore from the backup taken during Phase 2 or from your independent backup.

<FailbackCaution />

### Data safety measures

- All `pg_dump` backups are stored on a dedicated PVC (`migration-backup-pvc`) that persists independently of the migration.
- Elasticsearch snapshots are stored in a registered repository and retained according to the configured retention policy.
- The migration scripts are **idempotent**: re-running a phase that was interrupted picks up where it left off.
- No Bitnami resources are deleted during Phases 1–4 — they are only disconnected from the Helm release. Phase 5 explicitly removes them after validation.

### Post-migration monitoring

After completing the migration, monitor the following for at least 48 hours:

- **Pod restarts**: `kubectl get pods -n ${NAMESPACE} --watch`
- **CNPG cluster health**: `kubectl get clusters -n ${NAMESPACE}` (should show `Cluster in healthy state`)
- **ECK cluster health**: `kubectl get elasticsearch -n ${NAMESPACE}` (should show `green`)
- **Camunda component logs**: check for connection errors, authentication failures, or data inconsistencies.
- **Process instance completion**: verify that in-flight process instances continue to execute correctly.
- **Zeebe export lag**: confirm that Zeebe exporters are writing to the new Elasticsearch without delays.
