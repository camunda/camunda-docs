---
id: alternatives
sidebar_label: Advanced alternatives
title: Advanced migration alternatives
description: "Alternative migration paths for Camunda 8 Self-Managed when Kubernetes operators or managed services are not available — including VM-based, bare-metal, and Docker Compose deployments."
---

import FailbackCaution from './\_partials/\_ops-failback-caution.md'

This guide covers advanced migration alternatives for organizations that **cannot use Kubernetes operators or managed services** for their infrastructure components. These approaches require more manual effort but provide full control over the deployment.

:::caution Advanced topic
The approaches described here are not automated via the migration scripts and require significant manual configuration and operational expertise. For most deployments, we recommend using either [Kubernetes operators](./bitnami-to-operators.md) or [managed services](./bitnami-to-managed-services.md).
:::

:::info Use official installation documentation for untested targets
This page intentionally avoids prescribing full installation commands for PostgreSQL, Elasticsearch, or Keycloak on custom targets such as standalone StatefulSets, VMs, or bare metal. Use the official documentation for the distribution you operate, and use this page only for the Camunda-specific migration flow and Helm wiring.
:::

## When to use these alternatives

Consider these alternatives if:

- Your organization does not allow operator installations in the cluster (security/compliance constraints).
- You are running on bare-metal infrastructure without managed service access.
- You need to migrate to an existing database infrastructure (for example, a shared PostgreSQL cluster managed by a DBA team).
- You are running Camunda outside of Kubernetes (for example, Docker Compose or VM-based deployments).

## Option 1: Manually deployed PostgreSQL and Elasticsearch on Kubernetes

If you cannot install CNPG/ECK operators but still run on Kubernetes, provision PostgreSQL and Elasticsearch using your platform standard manifests or the official product documentation for the distributions you operate.

Before cutover, ensure the target platform provides the following:

- A stable PostgreSQL endpoint reachable from the Camunda namespace.
- A stable Elasticsearch endpoint reachable from the Camunda namespace.
- Persistent storage sized for the current data set and expected growth.
- Databases and users for `identity`, `keycloak`, and `webmodeler`.
- Credentials stored in Kubernetes Secrets for the migration jobs and the Helm upgrade.

Once the targets exist, the migration flow stays the same:

1. Freeze Camunda during the final cutover window.
2. Migrate PostgreSQL with `pg_dump` and `pg_restore`.
3. Migrate Elasticsearch with the method that fits your target: fresh start, snapshot/restore, `elasticdump`, or reindex.
4. Run the Helm upgrade to switch Camunda to the new endpoints.

### Reconfigure Helm

After data migration, update your Helm values to point to the external endpoints:

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

identity:
  externalDatabase:
    host: "<postgres-host>"
    port: 5432
    database: "identity"
    username: "identity"
    existingSecret: "external-pg-identity"
    existingSecretPasswordKey: "password"

webModeler:
  restapi:
    externalDatabase:
      host: "<postgres-host>"
      port: 5432
      database: "webmodeler"
      user: "webmodeler"
      existingSecret: "external-pg-webmodeler"
      existingSecretPasswordKey: "password"

orchestration:
  data:
    secondaryStorage:
      type: elasticsearch
      elasticsearch:
        url: https://<elasticsearch-host>:9200

optimize:
  database:
    elasticsearch:
      enabled: true
      external: true
      url:
        protocol: https
        host: <elasticsearch-host>
        port: 9200
```

```bash
helm upgrade ${CAMUNDA_RELEASE_NAME} camunda/camunda-platform \
  -n ${NAMESPACE} \
  --version ${CAMUNDA_HELM_CHART_VERSION} \
  -f your-custom-values.yaml
```

## Option 2: VM-based PostgreSQL and Elasticsearch

If your infrastructure runs on virtual machines (VMs) or bare-metal servers, treat PostgreSQL and Elasticsearch provisioning as a separate platform task and follow the official product documentation:

- [PostgreSQL documentation](https://www.postgresql.org/docs/current/) for installation, remote access, backup/restore tooling, and hardening.
- [Elasticsearch documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html) for installation, cluster topology, TLS, and operations.

Before migration, make sure you have:

- VM endpoints or DNS names reachable from Kubernetes.
- Firewall and TLS settings validated from the cluster to the target hosts.
- Databases, users, and credentials created for the Camunda components.
- A staging rehearsal showing that `pg_restore` and your chosen Elasticsearch migration method work against those endpoints.

Once the services are ready, reuse the external endpoint Helm values pattern above and replace the hosts with your VM or bare-metal addresses.

## Option 3: Docker Compose deployment

If you are targeting Docker Compose, keep this guide focused on the migration workflow and use the dedicated Docker Compose assets as the source of truth:

- Follow the local [Docker Compose quickstart](/self-managed/quickstart/developer-quickstart/docker-compose.md) for the supported setup and runtime behavior.
- Use the maintained Compose assets in [camunda-distributions/docker-compose](https://github.com/camunda/camunda-distributions/tree/main/docker-compose) instead of copying an embedded example from this page.

You still need to migrate PostgreSQL and Elasticsearch data separately using the same approaches described elsewhere in this guide.

:::caution Not suitable for production
Docker Compose deployments are suitable for development and testing only. For production environments, use Kubernetes operators or managed services.
:::

## Data migration approaches summary

Regardless of the target infrastructure, the data migration approach remains the same:

| Component     | Method                                    | Tools                                                  |
| ------------- | ----------------------------------------- | ------------------------------------------------------ |
| PostgreSQL    | Dump and restore                          | `pg_dump` / `pg_restore` (custom format)               |
| Elasticsearch | Snapshot/restore, reindex, or elasticdump | Elasticsearch Snapshot API, `elasticdump`, Reindex API |
| Keycloak      | Via PostgreSQL data migration             | No separate migration needed                           |

### PostgreSQL migration flags

The recommended `pg_restore` flags for cross-platform migration:

```bash
pg_restore \
  --clean          # Drop objects before recreating
  --if-exists      # Don't error if objects don't exist
  --no-owner       # Don't set ownership (avoids permission issues)
  --no-privileges  # Don't restore privilege assignments
  -d <database>    # Target database
  <dump-file>
```

### Elasticsearch migration decision matrix

| Scenario                                                    | Recommended method                      |
| ----------------------------------------------------------- | --------------------------------------- |
| Target accessible from Kubernetes + shared storage possible | Filesystem snapshot/restore             |
| Target accessible from Kubernetes + no shared storage       | `elasticdump` or S3 snapshot repository |
| Target not accessible from Kubernetes                       | S3 snapshot repository                  |
| Historical data not critical                                | Fresh start (let Zeebe re-export)       |
| Large datasets (> 50 GB)                                    | Snapshot/restore (fastest method)       |

## Keycloak considerations

Regardless of the infrastructure target, Keycloak migration always involves migrating its PostgreSQL database. After the data migration:

- If using the **Keycloak Operator** (recommended): Deploy a Keycloak Custom Resource pointing to the migrated PostgreSQL database.
- If using an **external OIDC provider**: Configure Camunda to use the external provider via [External OIDC provider](/self-managed/deployment/helm/configure/authentication-and-authorization/external-oidc-provider.md). You can then decommission Keycloak entirely.
- If using a **standalone Keycloak instance** (VM or Docker): Point it to the migrated PostgreSQL database and update the Camunda Helm values to reference the external Keycloak URL.

## Operational readiness

Before running any of the alternative migration approaches in production, follow these steps to minimize risk.

### Staging rehearsal

1. **Replicate your production environment** in a staging/test cluster — including the target infrastructure (standalone StatefulSets, VMs, Docker Compose, etc.).
2. **Run the full migration end-to-end** using the chosen approach (manual StatefulSets, VMs, or Docker).
3. **Measure actual timings**: since alternative deployments vary widely, timing data from staging is critical for setting maintenance windows.
4. **Test the failback path**: verify that you can roll back by restoring the original Helm values and reconnecting to the Bitnami subcharts.

:::tip
For VM-based or Docker Compose targets, include network connectivity testing (firewall rules, DNS resolution from Kubernetes to external hosts) as part of the rehearsal.
:::

### Production dry-run

If you're using the migration scripts, use the `--dry-run` flag:

```bash
bash 2-backup.sh --dry-run
bash 3-cutover.sh --dry-run
```

If you're performing the migration manually (as described in this guide), create a step-by-step runbook and walk through it without executing destructive commands. Document each command and expected output.

### Pre-migration checklist

- [ ] **Verify target connectivity**: confirm that the Kubernetes cluster can reach the target infrastructure (VMs, external databases). Test with `curl`, `psql`, or `kubectl exec` from within the cluster.
- [ ] **Notify stakeholders**: announce the maintenance window.
- [ ] **Verify backups**: ensure you have a recent backup from your existing backup strategy, independent of the migration scripts.
- [ ] **Document the runbook**: for manual migrations, have a written, step-by-step runbook reviewed by a second team member.
- [ ] **Prepare rollback commands**: pre-write the `helm upgrade` command needed to revert to Bitnami subcharts.

### Failback procedure

1. **Helm rollback**: revert the Helm values to use Bitnami subcharts again. Since the Bitnami PVCs still exist (they are not deleted during migration), data is intact.
2. **If Bitnami PVCs are deleted**: restore from your independent backup or from the `pg_dump` files created during migration.

<FailbackCaution />

### Data safety measures

- Always create `pg_dump` backups before any data migration, regardless of the target infrastructure.
- Store backup files outside the cluster (cloud storage bucket, NFS share) for redundancy.
- The same `pg_restore` flags (`--clean --if-exists --no-owner --no-privileges`) apply to all targets and are idempotent.
- Keep the old Bitnami infrastructure running in read-only mode (if possible) for several days as a safety net.

### Post-migration monitoring

After completing the migration, monitor for at least 48 hours:

- **Pod restarts**: `kubectl get pods -n ${NAMESPACE} --watch`
- **Target database health**: monitor connection counts, replication status (if using replicas), and storage usage.
- **Camunda component logs**: look for connection errors, authentication failures, or data inconsistencies.
- **Process instance completion**: verify that in-flight process instances continue to execute correctly.
- **External connectivity stability**: for VM or Docker targets, monitor network latency and connection drops between Kubernetes and the external infrastructure.
