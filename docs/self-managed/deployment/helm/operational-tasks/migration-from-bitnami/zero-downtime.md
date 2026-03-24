---
id: zero-downtime
sidebar_label: Zero-downtime migration (advanced)
title: Zero-downtime migration from Bitnami subcharts
description: "Advanced guide for migrating Camunda 8 Self-Managed infrastructure from Bitnami subcharts to Kubernetes operators or managed services with zero downtime using real-time data replication."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import CommonPrerequisites from './\_partials/\_common-prerequisites.md'
import DualRegionEsNote from './\_partials/\_dual-region-es-note.md'

:::warning Advanced topic
This guide describes an **advanced migration strategy** that eliminates the downtime window present in the [standard migration](./bitnami-to-operators.md). It requires familiarity with PostgreSQL logical replication, Elasticsearch cross-cluster replication or continuous snapshots, and Keycloak high availability. It may require adjustments to fit your specific environment, network topology, and data volumes.

For most deployments, Camunda recommends the simpler [standard migration](./bitnami-to-operators.md) with a 5–30 minute maintenance window.
:::

Migrate a Camunda 8 Helm installation from Bitnami-managed infrastructure to operator-managed or managed service equivalents **without planned application downtime**. Instead of the freeze-backup-restore-switch pattern used in the standard migration, this approach keeps source and target synchronized with **real-time data replication** before cutover.

Use this guide only if all of the following are true:

- You have already ruled out the [standard migration](./bitnami-to-operators.md) because even a short maintenance window is unacceptable.
- Your team is comfortable operating PostgreSQL logical replication and one of the supported Elasticsearch synchronization strategies.
- You can monitor replication lag and validate consistency before cutover.
- You are prepared to adapt the examples to your topology, especially if the targets are managed services instead of in-cluster operators.

## How it works

The zero-downtime migration replaces the backup/restore phases with continuous replication:

```
┌──────────────────────────────────────────────────────────────────────┐
│                  Zero-Downtime Migration Phases                      │
│                                                                      │
│  Phase 1 ✦ Deploy Targets          ─── no downtime ─────────────── │
│    Install operators + create target clusters alongside Bitnami      │
│                                                                      │
│  Phase 2 ✦ Enable Replication      ─── no downtime ─────────────── │
│    Set up PG logical replication + ES CCR / continuous snapshots     │
│                                                                      │
│  Phase 3 ✦ Sync & Verify           ─── no downtime ─────────────── │
│    Wait for replication lag → 0, verify data consistency             │
│                                                                      │
│  Phase 4 ✦ Instantaneous Cutover   ─── no downtime ─────────────── │
│    Helm upgrade to switch backends (rolling restart, no freeze)      │
│                                                                      │
│  Phase 5 ✦ Validate & Cleanup      ─── no downtime ─────────────── │
│    Verify health, tear down replication, remove old resources        │
└──────────────────────────────────────────────────────────────────────┘
```

### Key differences from the standard migration

| Aspect                         | Standard migration                     | Zero-downtime migration                        |
| ------------------------------ | -------------------------------------- | ---------------------------------------------- |
| Downtime                       | 5–30 minutes (Phase 3 freeze)          | None                                           |
| Data transfer                  | `pg_dump`/`pg_restore` + ES `_reindex` | Logical replication + CCR/continuous snapshot  |
| Complexity                     | Low — scripted and automated           | High — manual setup, monitoring required       |
| Risk                           | Low — rollback via Helm values         | Medium — replication lag must be monitored     |
| PostgreSQL version requirement | Any                                    | PostgreSQL 10+ (logical replication)           |
| Elasticsearch requirement      | `_reindex` API (reindex from remote)   | CCR (Platinum license) or continuous snapshots |

## Prerequisites

<CommonPrerequisites />

In addition to the general prerequisites:

- PostgreSQL source must support **logical replication** (`wal_level = logical`). This may require a restart of the Bitnami PostgreSQL StatefulSet.
- Elasticsearch: either an **Elastic Platinum license** (for cross-cluster replication) or the ability to run **continuous snapshots** with very short intervals.
- Deep understanding of your data volumes, replication lag tolerances, and network throughput between source and target.
- A monitoring solution to track replication lag (for example, Prometheus, Grafana, or manual queries).

:::important Decide the Elasticsearch strategy before you begin
The PostgreSQL path is always logical replication. Elasticsearch requires an explicit tradeoff:

- Use **CCR** if you have the license and need the closest possible parity at cutover.
- Use **continuous snapshots** if a small lag window is acceptable.
- Use **fresh start** only if rebuilding historical Elasticsearch-backed views after cutover is acceptable.
  :::

## Clone the deployment references repository

This guide uses scripts from the [Camunda deployment references](https://github.com/camunda/camunda-deployment-references) repository. Clone the repository and navigate to the migration directory:

```bash
git clone https://github.com/camunda/camunda-deployment-references.git
cd camunda-deployment-references/generic/kubernetes/migration
```

Configure the migration by editing `env.sh` to match your current Camunda installation, then source it:

```bash
source env.sh
```

For a full description of configuration variables, see [Configure the migration](./bitnami-to-operators.md#step-1-configure-the-migration).

## Phase 1: Deploy target infrastructure

This phase is identical to Phase 1 of the [standard migration](./bitnami-to-operators.md#phase-1-deploy-target-infrastructure-no-downtime). Deploy the target operators and clusters alongside the existing Bitnami components:

```bash
bash 1-deploy-targets.sh
```

After this phase, both the old Bitnami infrastructure and the new operator-managed infrastructure run side-by-side. No traffic is routed to the new targets yet.

## Phase 2: Enable real-time replication

### PostgreSQL: Logical replication

[PostgreSQL logical replication](https://www.postgresql.org/docs/current/logical-replication.html) allows streaming changes in real-time from the Bitnami PostgreSQL instances to the CNPG (or managed service) targets without stopping the source.

#### Step 1: Enable logical replication on the source

The source Bitnami PostgreSQL must have `wal_level = logical`. Check the current setting:

```bash
kubectl exec -it ${CAMUNDA_RELEASE_NAME}-postgresql-0 -n ${NAMESPACE} -- \
  psql -U postgres -c "SHOW wal_level;"
```

If it returns `replica` (the default), you need to change it:

```bash
# Patch the Bitnami PostgreSQL ConfigMap or StatefulSet
kubectl exec -it ${CAMUNDA_RELEASE_NAME}-postgresql-0 -n ${NAMESPACE} -- \
  psql -U postgres -c "ALTER SYSTEM SET wal_level = 'logical';"
```

:::warning Restart required
Changing `wal_level` requires a PostgreSQL restart. This is the **only brief interruption** in the zero-downtime approach — a PostgreSQL restart typically completes in a few seconds, and Camunda components reconnect automatically.

```bash
kubectl rollout restart statefulset ${CAMUNDA_RELEASE_NAME}-postgresql -n ${NAMESPACE}
kubectl rollout status statefulset ${CAMUNDA_RELEASE_NAME}-postgresql -n ${NAMESPACE} --timeout=120s
```

:::

Also ensure `max_replication_slots` and `max_wal_senders` are sufficient (at least 4 each — one per database plus overhead):

```bash
kubectl exec -it ${CAMUNDA_RELEASE_NAME}-postgresql-0 -n ${NAMESPACE} -- \
  psql -U postgres -c "SHOW max_replication_slots; SHOW max_wal_senders;"
```

#### Step 2: Create publications on the source

For each database, create a publication that includes all tables:

```bash
# Identity database
kubectl exec -it ${CAMUNDA_RELEASE_NAME}-postgresql-0 -n ${NAMESPACE} -- \
  psql -U postgres -d identity -c "CREATE PUBLICATION identity_migration FOR ALL TABLES;"

# Keycloak database
KEYCLOAK_STS="${CAMUNDA_RELEASE_NAME}-keycloak-postgresql"
kubectl exec -it ${KEYCLOAK_STS}-0 -n ${NAMESPACE} -- \
  psql -U postgres -d keycloak -c "CREATE PUBLICATION keycloak_migration FOR ALL TABLES;"

# Web Modeler database
WEBMODELER_STS="${CAMUNDA_RELEASE_NAME}-postgresql-web-modeler"
kubectl exec -it ${WEBMODELER_STS}-0 -n ${NAMESPACE} -- \
  psql -U postgres -d webmodeler -c "CREATE PUBLICATION webmodeler_migration FOR ALL TABLES;"
```

:::info Separate StatefulSets
Depending on your Helm chart version, each component may use a separate Bitnami PostgreSQL StatefulSet or share one. Adjust the StatefulSet names accordingly.
:::

#### Step 3: Perform initial data sync

Before enabling subscriptions, perform a one-time schema and data sync. Logical replication only replicates DML (INSERT/UPDATE/DELETE), not DDL (schema changes):

<details>
<summary>Show details: initial PostgreSQL sync example</summary>

```bash
# For each component, dump the schema + data and restore to the target
for COMPONENT in identity keycloak webmodeler; do
  SOURCE_STS=$(kubectl get statefulset -n ${NAMESPACE} -o name | grep -i "${COMPONENT}.*postgresql" | head -1 | sed 's|statefulset.apps/||')
  SOURCE_HOST="${SOURCE_STS}.${NAMESPACE}.svc.cluster.local"

  # Determine the target based on operator or external
  if [[ "$COMPONENT" == "identity" ]]; then
    TARGET_HOST="${CNPG_IDENTITY_CLUSTER}-rw.${NAMESPACE}.svc.cluster.local"
    TARGET_SECRET="${CNPG_IDENTITY_CLUSTER}-secret"
  elif [[ "$COMPONENT" == "keycloak" ]]; then
    TARGET_HOST="${CNPG_KEYCLOAK_CLUSTER}-rw.${NAMESPACE}.svc.cluster.local"
    TARGET_SECRET="${CNPG_KEYCLOAK_CLUSTER}-secret"
  elif [[ "$COMPONENT" == "webmodeler" ]]; then
    TARGET_HOST="${CNPG_WEBMODELER_CLUSTER}-rw.${NAMESPACE}.svc.cluster.local"
    TARGET_SECRET="${CNPG_WEBMODELER_CLUSTER}-secret"
  fi

  echo "Syncing ${COMPONENT}: ${SOURCE_HOST} → ${TARGET_HOST}"

  # Dump and restore (this is a one-time operation, not a freeze)
  kubectl exec -it ${SOURCE_STS}-0 -n ${NAMESPACE} -- \
    pg_dump -U ${COMPONENT} -d ${COMPONENT} -F custom -f /tmp/${COMPONENT}.dump

  kubectl cp ${NAMESPACE}/${SOURCE_STS}-0:/tmp/${COMPONENT}.dump ./${COMPONENT}.dump

  # Get target password
  TARGET_PWD=$(kubectl get secret ${TARGET_SECRET} -n ${NAMESPACE} -o jsonpath='{.data.password}' | base64 -d)

  # Restore to target via a temporary pod
  kubectl run pg-restore-${COMPONENT} --rm -i --restart=Never \
    --image=postgres:16 -n ${NAMESPACE} \
    --env="PGPASSWORD=${TARGET_PWD}" -- \
    pg_restore -h ${TARGET_HOST} -U ${COMPONENT} -d ${COMPONENT} \
    --clean --if-exists --no-owner --no-privileges /dev/stdin < ./${COMPONENT}.dump
done
```

  </details>

#### Step 4: Create subscriptions on the target

On each CNPG target cluster, create a subscription pointing to the source:

<details>
<summary>Show details: subscription creation example</summary>

```bash
# Get source password
SOURCE_PWD=$(kubectl get secret ${CAMUNDA_RELEASE_NAME}-postgresql -n ${NAMESPACE} \
  -o jsonpath='{.data.postgres-password}' | base64 -d)

# Identity — target the -rw service to ensure writes land on the current primary
kubectl exec -it $(kubectl get pod -n ${NAMESPACE} -l cnpg.io/cluster=${CNPG_IDENTITY_CLUSTER},cnpg.io/instanceRole=primary -o jsonpath='{.items[0].metadata.name}') -n ${NAMESPACE} -- \
  psql -U postgres -d identity -c "
    CREATE SUBSCRIPTION identity_sub
    CONNECTION 'host=${CAMUNDA_RELEASE_NAME}-postgresql.${NAMESPACE}.svc.cluster.local port=5432 dbname=identity user=postgres password=${SOURCE_PWD}'
    PUBLICATION identity_migration
    WITH (copy_data = false);
  "

# Keycloak
KEYCLOAK_PWD=$(kubectl get secret ${CAMUNDA_RELEASE_NAME}-keycloak-postgresql -n ${NAMESPACE} \
  -o jsonpath='{.data.postgres-password}' | base64 -d)

kubectl exec -it $(kubectl get pod -n ${NAMESPACE} -l cnpg.io/cluster=${CNPG_KEYCLOAK_CLUSTER},cnpg.io/instanceRole=primary -o jsonpath='{.items[0].metadata.name}') -n ${NAMESPACE} -- \
  psql -U postgres -d keycloak -c "
    CREATE SUBSCRIPTION keycloak_sub
    CONNECTION 'host=${CAMUNDA_RELEASE_NAME}-keycloak-postgresql.${NAMESPACE}.svc.cluster.local port=5432 dbname=keycloak user=postgres password=${KEYCLOAK_PWD}'
    PUBLICATION keycloak_migration
    WITH (copy_data = false);
  "

# Web Modeler
WEBMODELER_PWD=$(kubectl get secret ${CAMUNDA_RELEASE_NAME}-postgresql-web-modeler -n ${NAMESPACE} \
  -o jsonpath='{.data.postgres-password}' | base64 -d)

kubectl exec -it $(kubectl get pod -n ${NAMESPACE} -l cnpg.io/cluster=${CNPG_WEBMODELER_CLUSTER},cnpg.io/instanceRole=primary -o jsonpath='{.items[0].metadata.name}') -n ${NAMESPACE} -- \
  psql -U postgres -d webmodeler -c "
    CREATE SUBSCRIPTION webmodeler_sub
    CONNECTION 'host=${CAMUNDA_RELEASE_NAME}-postgresql-web-modeler.${NAMESPACE}.svc.cluster.local port=5432 dbname=webmodeler user=postgres password=${WEBMODELER_PWD}'
    PUBLICATION webmodeler_migration
    WITH (copy_data = false);
  "
```

</details>

The `copy_data = false` flag is important because we already performed the initial sync in Step 3. The subscription will now stream only new changes in real-time.

### Elasticsearch: Continuous synchronization

<DualRegionEsNote />

Unlike PostgreSQL, Elasticsearch does not have a built-in logical replication feature available in the open-source version. Choose one of the following approaches:

| Strategy             | Best when                                                                            | Tradeoff                                                |
| -------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------- |
| CCR                  | You need the closest possible real-time replica and have an Elastic Platinum license | Highest operational complexity                          |
| Continuous snapshots | You can tolerate a small lag window and want an open-source-compatible approach      | Recent writes may be missing until re-export catches up |
| Fresh start          | Historical search data can be rebuilt after cutover                                  | Slowest path to full UI history after migration         |

<Tabs groupId="es-replication" queryString>

<TabItem value="ccr" label="Cross-cluster replication (Platinum)">

If you have an **Elastic Platinum license**, you can use [Cross-Cluster Replication (CCR)](https://www.elastic.co/guide/en/elasticsearch/reference/current/ccr-overview.html) to replicate indices in real-time:

<details>
<summary>Show details: CCR setup example</summary>

```bash
# Get ECK ES password
ECK_PWD=$(kubectl get secret ${ECK_CLUSTER_NAME}-es-elastic-user -n ${NAMESPACE} \
  -o jsonpath='{.data.elastic}' | base64 -d)

# Get source ES password
SOURCE_ES_PWD=$(kubectl get secret ${CAMUNDA_RELEASE_NAME}-elasticsearch -n ${NAMESPACE} \
  -o jsonpath='{.data.elasticsearch-password}' | base64 -d)

# Configure the target ECK cluster to recognize the source as a remote
kubectl exec -it ${ECK_CLUSTER_NAME}-es-masters-0 -n ${NAMESPACE} -- \
  curl -sf -u "elastic:${ECK_PWD}" -X PUT \
  "http://localhost:9200/_cluster/settings" \
  -H 'Content-Type: application/json' \
  -d '{
    "persistent": {
      "cluster": {
        "remote": {
          "bitnami_source": {
            "seeds": ["'${CAMUNDA_RELEASE_NAME}'-elasticsearch-master-0.'${CAMUNDA_RELEASE_NAME}'-elasticsearch-master-headless.'${NAMESPACE}'.svc.cluster.local:9300"]
          }
        }
      }
    }
  }'

# Create follower indices for each Camunda index pattern
for PATTERN in zeebe operate tasklist optimize connectors camunda; do
  # List source indices matching the pattern
  INDICES=$(kubectl exec -it ${CAMUNDA_RELEASE_NAME}-elasticsearch-master-0 -n ${NAMESPACE} -- \
    curl -sf -u "elastic:${SOURCE_ES_PWD}" \
    "http://localhost:9200/_cat/indices/${PATTERN}-*?h=index" | tr -d '[:space:]' | tr '\n' ' ')

  for IDX in $INDICES; do
    kubectl exec -it ${ECK_CLUSTER_NAME}-es-masters-0 -n ${NAMESPACE} -- \
      curl -sf -u "elastic:${ECK_PWD}" -X PUT \
      "http://localhost:9200/${IDX}/_ccr/follow" \
      -H 'Content-Type: application/json' \
      -d '{
        "remote_cluster": "bitnami_source",
        "leader_index": "'${IDX}'"
      }'
  done
done
```

</details>

</TabItem>

<TabItem value="continuous-snapshot" label="Continuous snapshots (open-source)">

If you don't have a Platinum license, use **continuous snapshot/restore with SLM (Snapshot Lifecycle Management)** to keep the target close to the source. This approach has a small replication lag (typically 5–15 minutes):

<details>
<summary>Show details: continuous snapshot setup example</summary>

```bash
# Get source ES password
SOURCE_ES_PWD=$(kubectl get secret ${CAMUNDA_RELEASE_NAME}-elasticsearch -n ${NAMESPACE} \
  -o jsonpath='{.data.elasticsearch-password}' | base64 -d)

# Register a shared snapshot repository on the source (using the backup PVC)
kubectl exec -it ${CAMUNDA_RELEASE_NAME}-elasticsearch-master-0 -n ${NAMESPACE} -- \
  curl -sf -u "elastic:${SOURCE_ES_PWD}" -X PUT \
  "http://localhost:9200/_snapshot/migration_continuous" \
  -H 'Content-Type: application/json' \
  -d '{"type":"fs","settings":{"location":"/backup/elasticsearch/continuous"}}'

# Create an SLM policy for frequent snapshots (every 5 minutes)
kubectl exec -it ${CAMUNDA_RELEASE_NAME}-elasticsearch-master-0 -n ${NAMESPACE} -- \
  curl -sf -u "elastic:${SOURCE_ES_PWD}" -X PUT \
  "http://localhost:9200/_slm/policy/migration_continuous" \
  -H 'Content-Type: application/json' \
  -d '{
    "schedule": "0 */5 * * * ?",
    "name": "<migration-snap-{now/m{yyyyMMdd-HHmmss}}>",
    "repository": "migration_continuous",
    "config": {
      "indices": ["*"],
      "ignore_unavailable": true,
      "include_global_state": false
    },
    "retention": {
      "expire_after": "1h",
      "min_count": 1,
      "max_count": 5
    }
  }'
```

</details>

Before cutover, you will restore the latest snapshot to the target ECK cluster.

</TabItem>

<TabItem value="fresh-start" label="Fresh start (simplest)">

If historical Elasticsearch data is not critical, **skip Elasticsearch replication entirely**. After the Helm upgrade, Zeebe exporters will re-populate all indices from the event log. This is the simplest approach:

- Operate, Tasklist, and Optimize data will be rebuilt from Zeebe events.
- There will be a temporary period where recent history may not appear in the UI until re-export completes.
- No additional setup is required.

</TabItem>

</Tabs>

## Phase 3: Verify synchronization

Before performing the cutover, verify that replication is caught up and data is consistent.

### Monitor PostgreSQL replication lag

Check the replication lag on each subscription:

<details>
<summary>Show details: PostgreSQL lag check example</summary>

```bash
# On each CNPG target, check subscription status
for CLUSTER in ${CNPG_IDENTITY_CLUSTER} ${CNPG_KEYCLOAK_CLUSTER} ${CNPG_WEBMODELER_CLUSTER}; do
  echo "=== ${CLUSTER} ==="
  kubectl exec -it $(kubectl get pod -n ${NAMESPACE} -l cnpg.io/cluster=${CLUSTER},cnpg.io/instanceRole=primary -o jsonpath='{.items[0].metadata.name}') -n ${NAMESPACE} -- \
    psql -U postgres -c "
      SELECT subname, received_lsn, latest_end_lsn,
             latest_end_lsn - received_lsn AS lag_bytes
      FROM pg_stat_subscription;
    "
done
```

</details>

Wait until `lag_bytes` is consistently `0` or near-zero before proceeding.

### Monitor Elasticsearch sync

<Tabs groupId="es-replication" queryString>

<TabItem value="ccr" label="Cross-cluster replication (Platinum)">

<details>
<summary>Show details: CCR status check example</summary>

```bash
# Check CCR follower status
ECK_PWD=$(kubectl get secret ${ECK_CLUSTER_NAME}-es-elastic-user -n ${NAMESPACE} \
  -o jsonpath='{.data.elastic}' | base64 -d)

kubectl exec -it ${ECK_CLUSTER_NAME}-es-masters-0 -n ${NAMESPACE} -- \
  curl -sf -u "elastic:${ECK_PWD}" \
  "http://localhost:9200/_ccr/stats" | jq '.follow_stats.indices[].shards[].leader_global_checkpoint'
```

</details>

</TabItem>

<TabItem value="continuous-snapshot" label="Continuous snapshots (open-source)">

<details>
<summary>Show details: snapshot status check example</summary>

```bash
# Check the latest snapshot status
SOURCE_ES_PWD=$(kubectl get secret ${CAMUNDA_RELEASE_NAME}-elasticsearch -n ${NAMESPACE} \
  -o jsonpath='{.data.elasticsearch-password}' | base64 -d)

kubectl exec -it ${CAMUNDA_RELEASE_NAME}-elasticsearch-master-0 -n ${NAMESPACE} -- \
  curl -sf -u "elastic:${SOURCE_ES_PWD}" \
  "http://localhost:9200/_slm/policy/migration_continuous" | jq '.last_success'
```

</details>

</TabItem>

<TabItem value="fresh-start" label="Fresh start (simplest)">

No synchronization monitoring needed — Elasticsearch will be populated after cutover.

</TabItem>

</Tabs>

### Verify row counts

Compare row counts between source and target for each database to confirm data consistency:

<details>
<summary>Show details: row count verification example</summary>

```bash
for COMPONENT in identity keycloak webmodeler; do
  SOURCE_STS=$(kubectl get statefulset -n ${NAMESPACE} -o name | grep -i "${COMPONENT}.*postgresql" | head -1 | sed 's|statefulset.apps/||')

  echo "=== ${COMPONENT} ==="
  echo "Source:"
  kubectl exec -it ${SOURCE_STS}-0 -n ${NAMESPACE} -- \
    psql -U ${COMPONENT} -d ${COMPONENT} -c "
      SELECT schemaname, relname, n_live_tup
      FROM pg_stat_user_tables
      ORDER BY n_live_tup DESC LIMIT 10;
    "

  CNPG_CLUSTER_VAR="CNPG_${COMPONENT^^}_CLUSTER"
  echo "Target (${!CNPG_CLUSTER_VAR}):"
  kubectl exec -it ${!CNPG_CLUSTER_VAR}-1 -n ${NAMESPACE} -- \
    psql -U ${COMPONENT} -d ${COMPONENT} -c "
      SELECT schemaname, relname, n_live_tup
      FROM pg_stat_user_tables
      ORDER BY n_live_tup DESC LIMIT 10;
    "
done
```

</details>

## Phase 4: Instantaneous cutover

Once replication is confirmed in sync, perform the cutover. This phase uses a **rolling Helm upgrade** instead of the freeze-then-restore approach, resulting in zero downtime.

Before starting the cutover, confirm this checklist:

- PostgreSQL subscriptions show `lag_bytes` at `0` or close to `0` for a sustained interval.
- Your chosen Elasticsearch sync method is healthy and up to date.
- The target services are reachable from the Camunda namespace.
- You have the rollback command, values, and on-call contacts ready before the Helm upgrade.

### Step 1: Stop replication (PostgreSQL)

Drop the subscriptions on the target to stop replication and allow the targets to accept writes:

<details>
<summary>Show details: stop PostgreSQL replication example</summary>

```bash
# Drop subscriptions — target the current primary by label selector
kubectl exec -it $(kubectl get pod -n ${NAMESPACE} -l cnpg.io/cluster=${CNPG_IDENTITY_CLUSTER},cnpg.io/instanceRole=primary -o jsonpath='{.items[0].metadata.name}') -n ${NAMESPACE} -- \
  psql -U postgres -d identity -c "ALTER SUBSCRIPTION identity_sub DISABLE; DROP SUBSCRIPTION identity_sub;"

kubectl exec -it $(kubectl get pod -n ${NAMESPACE} -l cnpg.io/cluster=${CNPG_KEYCLOAK_CLUSTER},cnpg.io/instanceRole=primary -o jsonpath='{.items[0].metadata.name}') -n ${NAMESPACE} -- \
  psql -U postgres -d keycloak -c "ALTER SUBSCRIPTION keycloak_sub DISABLE; DROP SUBSCRIPTION keycloak_sub;"

kubectl exec -it $(kubectl get pod -n ${NAMESPACE} -l cnpg.io/cluster=${CNPG_WEBMODELER_CLUSTER},cnpg.io/instanceRole=primary -o jsonpath='{.items[0].metadata.name}') -n ${NAMESPACE} -- \
  psql -U postgres -d webmodeler -c "ALTER SUBSCRIPTION webmodeler_sub DISABLE; DROP SUBSCRIPTION webmodeler_sub;"
```

</details>

### Step 2: Stop Elasticsearch replication

<Tabs groupId="es-replication" queryString>

<TabItem value="ccr" label="Cross-cluster replication (Platinum)">

Promote follower indices to regular indices:

<details>
<summary>Show details: CCR cutover example</summary>

```bash
ECK_PWD=$(kubectl get secret ${ECK_CLUSTER_NAME}-es-elastic-user -n ${NAMESPACE} \
  -o jsonpath='{.data.elastic}' | base64 -d)

# Pause and unfollow each replicated index
INDICES=$(kubectl exec -it ${ECK_CLUSTER_NAME}-es-masters-0 -n ${NAMESPACE} -- \
  curl -sf -u "elastic:${ECK_PWD}" "http://localhost:9200/_cat/indices?h=index" | grep -E "^(zeebe|operate|tasklist|optimize)-")

for IDX in $INDICES; do
  kubectl exec -it ${ECK_CLUSTER_NAME}-es-masters-0 -n ${NAMESPACE} -- \
    curl -sf -u "elastic:${ECK_PWD}" -X POST "http://localhost:9200/${IDX}/_ccr/pause_follow"
  kubectl exec -it ${ECK_CLUSTER_NAME}-es-masters-0 -n ${NAMESPACE} -- \
    curl -sf -u "elastic:${ECK_PWD}" -X POST "http://localhost:9200/${IDX}/_close"
  kubectl exec -it ${ECK_CLUSTER_NAME}-es-masters-0 -n ${NAMESPACE} -- \
    curl -sf -u "elastic:${ECK_PWD}" -X POST "http://localhost:9200/${IDX}/_ccr/unfollow"
  kubectl exec -it ${ECK_CLUSTER_NAME}-es-masters-0 -n ${NAMESPACE} -- \
    curl -sf -u "elastic:${ECK_PWD}" -X POST "http://localhost:9200/${IDX}/_open"
done
```

</details>

</TabItem>

<TabItem value="continuous-snapshot" label="Continuous snapshots (open-source)">

Restore the latest snapshot to the target ECK cluster:

<details>
<summary>Show details: snapshot restore example</summary>

```bash
# Delete the SLM policy
SOURCE_ES_PWD=$(kubectl get secret ${CAMUNDA_RELEASE_NAME}-elasticsearch -n ${NAMESPACE} \
  -o jsonpath='{.data.elasticsearch-password}' | base64 -d)

kubectl exec -it ${CAMUNDA_RELEASE_NAME}-elasticsearch-master-0 -n ${NAMESPACE} -- \
  curl -sf -u "elastic:${SOURCE_ES_PWD}" -X DELETE \
  "http://localhost:9200/_slm/policy/migration_continuous"

# Get the latest snapshot name
LATEST_SNAP=$(kubectl exec -it ${CAMUNDA_RELEASE_NAME}-elasticsearch-master-0 -n ${NAMESPACE} -- \
  curl -sf -u "elastic:${SOURCE_ES_PWD}" \
  "http://localhost:9200/_snapshot/migration_continuous/_all" | jq -r '.snapshots[-1].snapshot')

# Restore to target ECK
ECK_PWD=$(kubectl get secret ${ECK_CLUSTER_NAME}-es-elastic-user -n ${NAMESPACE} \
  -o jsonpath='{.data.elastic}' | base64 -d)

# Register the repo on the target
kubectl exec -it ${ECK_CLUSTER_NAME}-es-masters-0 -n ${NAMESPACE} -- \
  curl -sf -u "elastic:${ECK_PWD}" -X PUT \
  "http://localhost:9200/_snapshot/migration_continuous" \
  -H 'Content-Type: application/json' \
  -d '{"type":"fs","settings":{"location":"/backup/elasticsearch/continuous"}}'

# Restore
kubectl exec -it ${ECK_CLUSTER_NAME}-es-masters-0 -n ${NAMESPACE} -- \
  curl -sf -u "elastic:${ECK_PWD}" -X POST \
  "http://localhost:9200/_snapshot/migration_continuous/${LATEST_SNAP}/_restore?wait_for_completion=true" \
  -H 'Content-Type: application/json' \
  -d '{"indices":"*","ignore_unavailable":true,"include_global_state":false}'
```

</details>

:::warning Brief data gap
With the continuous snapshot approach, there is a small window (up to the snapshot interval, for example 5 minutes) where recent Elasticsearch writes may not be captured. Zeebe will re-export these events after the cutover.
:::

</TabItem>

<TabItem value="fresh-start" label="Fresh start (simplest)">

No action required. Elasticsearch will be populated after cutover.

</TabItem>

</Tabs>

### Step 3: Helm upgrade (rolling restart)

Perform the Helm upgrade to switch Camunda to the new backends. Because there is no freeze, pods are restarted in a rolling fashion.

:::warning Not compatible with the standard migration scripts
The zero-downtime approach does **not** use `3-cutover.sh` — that script freezes the application, which defeats the purpose. Instead, run the Helm upgrade manually with the operator-based values:
:::

<details>
<summary>Show details: Helm upgrade example</summary>

```bash
helm upgrade ${CAMUNDA_RELEASE_NAME} camunda/camunda-platform \
  -n ${NAMESPACE} \
  --version ${CAMUNDA_HELM_CHART_VERSION} \
  -f operator-based-values.yaml \
  --wait --timeout 10m
```

</details>

Build the values file by combining the operator-based Helm values files from the reference architecture (for example, `camunda-identity-values.yml`, `camunda-elastic-values.yml`, `camunda-keycloak-domain-values.yml`) to point Camunda at the new backends. Ensure Bitnami subcharts are disabled.

:::info Rolling restart behavior
The Helm upgrade triggers a rolling restart of Camunda pods. During this process:

- Zeebe StatefulSet pods restart one at a time, maintaining quorum.
- Operate, Tasklist, Optimize, and other deployments restart with zero-downtime rollout strategy.
- There is a brief period where some pods use old backends and others use new ones, but this is safe because the data has already been replicated.
  :::

### Step 4: Clean up source publications

After the cutover is confirmed working, clean up the publications on the source:

<details>
<summary>Show details: source publication cleanup example</summary>

```bash
kubectl exec -it ${CAMUNDA_RELEASE_NAME}-postgresql-0 -n ${NAMESPACE} -- \
  psql -U postgres -d identity -c "DROP PUBLICATION IF EXISTS identity_migration;"

kubectl exec -it ${CAMUNDA_RELEASE_NAME}-keycloak-postgresql-0 -n ${NAMESPACE} -- \
  psql -U postgres -d keycloak -c "DROP PUBLICATION IF EXISTS keycloak_migration;"

kubectl exec -it ${CAMUNDA_RELEASE_NAME}-postgresql-web-modeler-0 -n ${NAMESPACE} -- \
  psql -U postgres -d webmodeler -c "DROP PUBLICATION IF EXISTS webmodeler_migration;"
```

</details>

## Phase 5: Validate and clean up

Run the standard validation:

```bash
bash 4-validate.sh
```

Then proceed with [Phase 5 in the operator-based guide](./bitnami-to-operators.md#phase-5-cleanup-bitnami-resources-no-downtime) to remove old Bitnami resources.

## Failback to Bitnami (if needed)

If the zero-downtime migration reveals issues after cutover:

1. **Immediate rollback** (within minutes): If detected quickly, the source Bitnami databases still have all data (publications were only cleaned up in the last step). Run the standard rollback:

   ```bash
   bash rollback.sh
   ```

2. **Late rollback** (after publications are dropped): You would need to perform a reverse data migration — dump from the CNPG targets back to the Bitnami sources. This is the same process in reverse.

## Limitations and caveats

This migration path removes the planned downtime window, but it does not remove the need for rehearsal, monitoring, and rollback planning. Treat it as a custom migration pattern rather than a push-button alternative to the standard workflow.

### PostgreSQL logical replication limitations

- **DDL not replicated**: Schema changes (CREATE TABLE, ALTER TABLE, etc.) are not replicated. If the source schema changes during migration, you must apply the same changes to the target manually.
- **Large objects**: `pg_largeobject` data is not replicated via logical replication.
- **Sequences**: Sequence values are not replicated. After cutover, sequences on the target may need to be reset:

  ```sql
  -- Run on each target database after cutover
  SELECT setval(pg_get_serial_sequence(table_name, column_name), max(column_name))
  FROM table_name;
  ```

- **TRUNCATE**: `TRUNCATE` is replicated only in PostgreSQL 11+.

### Elasticsearch limitations

- **CCR requires Platinum license**: The open-source and Basic tiers do not include cross-cluster replication.
- **Continuous snapshots have lag**: The snapshot approach introduces a replication delay equal to the snapshot interval.
- **Index mapping conflicts**: If the source creates new indices during replication, they must be manually added to the CCR follow configuration.

### Keycloak considerations

Keycloak data is stored in PostgreSQL, so it is covered by the PostgreSQL logical replication. The Keycloak Operator CR will start using the replicated data in the CNPG cluster after the Helm upgrade.

However, be aware of Keycloak session data:

- Active user sessions stored in PostgreSQL will be replicated.
- In-memory Infinispan caches will be rebuilt on the new Keycloak pods.
- Users may need to re-authenticate after the cutover (session cookies point to the old Keycloak pods).

## Operational readiness

Use the [operator-based operational readiness checklist](./bitnami-to-operators.md#operational-readiness) as the baseline, then add zero-downtime-specific checks for replication lag, subscription health, and Elasticsearch synchronization status.
