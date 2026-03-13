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

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/migration/env.sh
```

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

### PostgreSQL (CloudNativePG)

Review the CNPG cluster specifications in `operator-based/postgresql/postgresql-clusters.yml`. Key settings to verify:

- Storage size (must be >= your current Bitnami PVC sizes)
- Number of replicas
- PostgreSQL version
- Resource requests and limits
- PostgreSQL parameters (shared_buffers, max_connections, etc.)

```yaml reference
https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/operator-based/postgresql/postgresql-clusters.yml
```

### Elasticsearch (ECK)

The migration patches the reference ECK cluster manifest from `operator-based/elasticsearch/elasticsearch-cluster.yml` at runtime to add `reindex.remote.whitelist` support for data transfer via the `_reindex` API. Review the base manifest:

- Node count
- Storage size (must be >= your current Bitnami ES PVC size)
- Resource requests and limits

```yaml reference
https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/operator-based/elasticsearch/elasticsearch-cluster.yml
```

### Keycloak

Review the Keycloak Custom Resource in `operator-based/keycloak/`. Choose the appropriate variant:

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

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/migration/1-deploy-targets.sh
```

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

```yaml reference
https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/migration/jobs/pg-backup.job.yml
```

The Elasticsearch verification job template:

```yaml reference
https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/migration/jobs/es-backup.job.yml
```

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/migration/2-backup.sh
```

### Phase 3: Cutover (downtime required)

:::caution Maintenance window required
This is the only phase that causes **downtime**. Schedule a maintenance window before proceeding. Typical duration: 5–30 minutes depending on data volume.
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

```yaml reference
https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/migration/jobs/pg-restore.job.yml
```

The Elasticsearch reindex-from-remote restore job template:

```yaml reference
https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/migration/jobs/es-restore.job.yml
```

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/migration/3-cutover.sh
```

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

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/migration/4-validate.sh
```

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

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/migration/5-cleanup-bitnami.sh
```

:::info Idempotent cleanup
The script checks whether each resource exists before attempting deletion, so it can be safely re-run if interrupted.
:::

## Non-interactive mode

For CI/CD pipelines or automated migrations, use the `--yes` flag to skip all confirmation prompts:

```bash
source env.sh
bash 1-deploy-targets.sh --yes
bash 2-backup.sh --yes
bash 3-cutover.sh --yes
bash 4-validate.sh --yes
# After confirming stability (wait at least 72 hours):
bash 5-cleanup-bitnami.sh --yes
```

Additional flags:

| Flag              | Description                                            |
| ----------------- | ------------------------------------------------------ |
| `--yes`, `-y`     | Auto-confirm all prompts (non-interactive mode)        |
| `--dry-run`       | Show what would be done without making changes         |
| `--verbose`, `-v` | Enable verbose output (show commands before execution) |
| `--no-color`      | Disable colored output                                 |
| `--status`        | Show current migration status and exit                 |

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

## Rollback

If the migration fails or produces unexpected results, you can roll back to the pre-cutover state:

```bash
bash rollback.sh
```

This restores the previous Helm values (re-enabling Bitnami subcharts) and restarts Camunda on the original infrastructure. The operator-managed resources (CNPG clusters, ECK, Keycloak CR) are **not deleted**, allowing you to retry or debug.

```bash reference
https://github.com/camunda/camunda-deployment-references/blob/main/generic/kubernetes/migration/rollback.sh
```

:::info Rollback scope
Rollback is available after Phase 3 (cutover). Before that, simply stop the migration — your Bitnami infrastructure is still active and untouched.
:::

## Post-migration cleanup

After validating the migration and confirming everything works correctly for at least 72 hours, run Phase 5 to remove old Bitnami resources:

```bash
bash 5-cleanup-bitnami.sh
```

This script automatically removes old Bitnami PostgreSQL, Elasticsearch, and Keycloak StatefulSets along with their PVCs, headless services, and the migration backup PVC. See [Phase 5](#phase-5-cleanup-bitnami-resources-no-downtime) for details.

If you prefer to clean up manually, you can delete the resources individually:

```bash
# Delete old PostgreSQL StatefulSets and their PVCs
kubectl delete statefulset ${CAMUNDA_RELEASE_NAME}-postgresql -n ${NAMESPACE} --ignore-not-found
kubectl delete statefulset ${CAMUNDA_RELEASE_NAME}-keycloak-postgresql -n ${NAMESPACE} --ignore-not-found
kubectl delete statefulset ${CAMUNDA_RELEASE_NAME}-postgresql-web-modeler -n ${NAMESPACE} --ignore-not-found

# Delete old Elasticsearch StatefulSet
kubectl delete statefulset ${CAMUNDA_RELEASE_NAME}-elasticsearch-master -n ${NAMESPACE} --ignore-not-found

# Delete old Keycloak StatefulSet
kubectl delete statefulset ${CAMUNDA_RELEASE_NAME}-keycloak -n ${NAMESPACE} --ignore-not-found

# Delete migration backup PVC
kubectl delete pvc migration-backup-pvc -n ${NAMESPACE}
```

After cleanup, remove the `reindex.remote.whitelist` setting from the ECK Elasticsearch configuration since it is no longer needed.

:::caution Verify before deleting
Before deleting old PVCs, verify that the migration is fully successful and all data has been restored correctly. List old PVCs with:

```bash
kubectl get pvc -n ${NAMESPACE} | grep -E "postgresql|elasticsearch"
```

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
2. **Run the full migration end-to-end** in staging, including all five phases, validation, and cleanup.
3. **Measure actual timings**: record how long each phase takes, especially the `2-backup.sh` and `3-cutover.sh` phases, as they determine your downtime window.
4. **Test rollback**: after a successful staging migration, intentionally run `bash rollback.sh` to verify you can revert cleanly.

:::tip
Use a representative data set — empty databases migrate in seconds but do not reveal performance bottlenecks that large datasets will.
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

1. **Immediate failback** (Bitnami PVCs still exist): run `bash rollback.sh` to revert the Helm values and re-attach to the original Bitnami StatefulSets.
2. **Late failback** (Bitnami PVCs deleted): restore from the backup taken during Phase 2 or from your independent backup.

<FailbackCaution />

### Data safety measures

- All `pg_dump` backups are stored on a dedicated PVC (`migration-backup-pvc`) that persists independently of the migration.
- Elasticsearch snapshots are stored in a registered repository and retained according to the configured retention policy.
- The migration scripts are **idempotent**: re-running a phase that was interrupted picks up where it left off.
- No Bitnami resources are deleted during the migration — they are only disconnected from the Helm release. You must explicitly remove them afterward.

### Post-migration monitoring

After completing the migration, monitor the following for at least 48 hours:

- **Pod restarts**: `kubectl get pods -n ${NAMESPACE} --watch`
- **CNPG cluster health**: `kubectl get clusters -n ${NAMESPACE}` (should show `Cluster in healthy state`)
- **ECK cluster health**: `kubectl get elasticsearch -n ${NAMESPACE}` (should show `green`)
- **Camunda component logs**: check for connection errors, authentication failures, or data inconsistencies.
- **Process instance completion**: verify that in-flight process instances continue to execute correctly.
- **Zeebe export lag**: confirm that Zeebe exporters are writing to the new Elasticsearch without delays.
