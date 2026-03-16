---
id: alternatives
sidebar_label: Advanced alternatives
title: Advanced migration alternatives
description: "Alternative migration paths for Camunda 8 Self-Managed when Kubernetes operators or managed services are not available — including VM-based, bare-metal, and Docker Compose deployments."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import FailbackCaution from './\_partials/\_ops-failback-caution.md'

This guide covers advanced migration alternatives for organizations that **cannot use Kubernetes operators or managed services** for their infrastructure components. These approaches require more manual effort but provide full control over the deployment.

:::caution Advanced topic
The approaches described here are not automated via the migration scripts and require significant manual configuration and operational expertise. For most deployments, we recommend using either [Kubernetes operators](./bitnami-to-operators.md) or [managed services](./bitnami-to-managed-services.md).
:::

## When to use these alternatives

Consider these alternatives if:

- Your organization does not allow operator installations in the cluster (security/compliance constraints).
- You are running on bare-metal infrastructure without managed service access.
- You need to migrate to an existing, pre-existing database infrastructure (e.g., a shared PostgreSQL cluster managed by a DBA team).
- You are running Camunda outside of Kubernetes (e.g., Docker Compose, VM-based).

## Option 1: Manually deployed PostgreSQL and Elasticsearch on Kubernetes

If you cannot install CNPG/ECK operators but still run on Kubernetes, you can deploy PostgreSQL and Elasticsearch using standard Kubernetes manifests (StatefulSets, Services, ConfigMaps).

### PostgreSQL via StatefulSet

Deploy a standalone PostgreSQL instance using a StatefulSet:

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: postgresql-manual
  namespace: camunda
spec:
  serviceName: postgresql-manual
  replicas: 1
  selector:
    matchLabels:
      app: postgresql-manual
  template:
    metadata:
      labels:
        app: postgresql-manual
    spec:
      containers:
        - name: postgres
          image: postgres:16
          ports:
            - containerPort: 5432
          env:
            - name: POSTGRES_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: postgresql-manual-secret
                  key: postgres-password
            - name: POSTGRES_DB
              value: identity
          volumeMounts:
            - name: data
              mountPath: /var/lib/postgresql/data
          resources:
            requests:
              cpu: 500m
              memory: 1Gi
            limits:
              cpu: 2
              memory: 2Gi
  volumeClaimTemplates:
    - metadata:
        name: data
      spec:
        accessModes: [ReadWriteOnce]
        resources:
          requests:
            storage: 20Gi
---
apiVersion: v1
kind: Service
metadata:
  name: postgresql-manual
  namespace: camunda
spec:
  selector:
    app: postgresql-manual
  ports:
    - port: 5432
      targetPort: 5432
  clusterIP: None
```

Create the required databases:

```bash
kubectl exec -it postgresql-manual-0 -n camunda -- psql -U postgres -c "
  CREATE DATABASE identity;
  CREATE DATABASE keycloak;
  CREATE DATABASE webmodeler;
  CREATE USER identity WITH PASSWORD 'changeme';
  CREATE USER keycloak WITH PASSWORD 'changeme';
  CREATE USER webmodeler WITH PASSWORD 'changeme';
  GRANT ALL PRIVILEGES ON DATABASE identity TO identity;
  GRANT ALL PRIVILEGES ON DATABASE keycloak TO keycloak;
  GRANT ALL PRIVILEGES ON DATABASE webmodeler TO webmodeler;
"
```

### Elasticsearch via StatefulSet

Deploy Elasticsearch using a StatefulSet:

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: elasticsearch-manual
  namespace: camunda
spec:
  serviceName: elasticsearch-manual
  replicas: 3
  selector:
    matchLabels:
      app: elasticsearch-manual
  template:
    metadata:
      labels:
        app: elasticsearch-manual
    spec:
      initContainers:
        - name: sysctl
          image: busybox
          command: ["sysctl", "-w", "vm.max_map_count=262144"]
          securityContext:
            privileged: true
      containers:
        - name: elasticsearch
          image: docker.elastic.co/elasticsearch/elasticsearch:8.19.11
          ports:
            - containerPort: 9200
            - containerPort: 9300
          env:
            - name: cluster.name
              value: camunda-es
            - name: discovery.seed_hosts
              value: "elasticsearch-manual-0.elasticsearch-manual,elasticsearch-manual-1.elasticsearch-manual,elasticsearch-manual-2.elasticsearch-manual"
            - name: cluster.initial_master_nodes
              value: "elasticsearch-manual-0,elasticsearch-manual-1,elasticsearch-manual-2"
            - name: xpack.security.enabled
              value: "false"
            - name: node.store.allow_mmap
              value: "false"
          volumeMounts:
            - name: data
              mountPath: /usr/share/elasticsearch/data
          resources:
            requests:
              cpu: 1
              memory: 2Gi
            limits:
              cpu: 2
              memory: 2Gi
  volumeClaimTemplates:
    - metadata:
        name: data
      spec:
        accessModes: [ReadWriteOnce]
        resources:
          requests:
            storage: 64Gi
---
apiVersion: v1
kind: Service
metadata:
  name: elasticsearch-manual
  namespace: camunda
spec:
  selector:
    app: elasticsearch-manual
  ports:
    - port: 9200
      targetPort: 9200
  clusterIP: None
```

### Migrate data manually

After deploying the target infrastructure, use the same backup/restore approach as the migration scripts, but run the commands manually:

#### PostgreSQL migration

```bash
# For each component (identity, keycloak, webmodeler):
COMPONENT="identity"
SOURCE_STS="${CAMUNDA_RELEASE_NAME}-postgresql"
TARGET_HOST="postgresql-manual-0.postgresql-manual.camunda.svc.cluster.local"

# 1. Freeze Camunda (scale down)
kubectl scale deployment -n camunda -l app.kubernetes.io/instance=${CAMUNDA_RELEASE_NAME} --replicas=0
kubectl scale statefulset ${CAMUNDA_RELEASE_NAME}-zeebe -n camunda --replicas=0

# 2. Backup from source
kubectl exec -it ${SOURCE_STS}-0 -n camunda -- \
  pg_dump -U ${COMPONENT} -d ${COMPONENT} -F custom -f /tmp/${COMPONENT}.dump

# 3. Copy dump out, then into the target
kubectl cp camunda/${SOURCE_STS}-0:/tmp/${COMPONENT}.dump ./${COMPONENT}.dump
kubectl cp ./${COMPONENT}.dump camunda/postgresql-manual-0:/tmp/${COMPONENT}.dump

# 4. Restore to target
kubectl exec -it postgresql-manual-0 -n camunda -- \
  pg_restore -U ${COMPONENT} -d ${COMPONENT} --clean --if-exists --no-owner --no-privileges /tmp/${COMPONENT}.dump
```

#### Elasticsearch migration

```bash
# Option 1: Use elasticdump
kubectl port-forward svc/${CAMUNDA_RELEASE_NAME}-elasticsearch 9200:9200 -n camunda &
kubectl port-forward svc/elasticsearch-manual 9201:9200 -n camunda &

npm install -g elasticdump
for idx in zeebe operate tasklist optimize connectors camunda; do
  elasticdump --input=http://localhost:9200/${idx}-* --output=http://localhost:9201/${idx}-* --type=data
done

# Option 2: Snapshot + restore (if both share a PVC)
# Similar to the migration scripts approach
```

### Reconfigure Helm

After data migration, update your Helm values to point to the manually deployed services:

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
    host: "postgresql-manual.camunda.svc.cluster.local"
    port: 5432
    database: "identity"
    username: "identity"
    existingSecret: "postgresql-manual-secret"
    existingSecretPasswordKey: "postgres-password"

webModeler:
  restapi:
    externalDatabase:
      host: "postgresql-manual.camunda.svc.cluster.local"
      port: 5432
      database: "webmodeler"
      user: "webmodeler"
      existingSecret: "postgresql-manual-secret"
      existingSecretPasswordKey: "postgres-password"

orchestration:
  data:
    secondaryStorage:
      type: elasticsearch
      elasticsearch:
        url: http://elasticsearch-manual.camunda.svc.cluster.local:9200

optimize:
  database:
    elasticsearch:
      enabled: true
      external: true
      url:
        protocol: http
        host: elasticsearch-manual.camunda.svc.cluster.local
        port: 9200
```

```bash
helm upgrade ${CAMUNDA_RELEASE_NAME} camunda/camunda-platform \
  -n ${NAMESPACE} \
  --version ${CAMUNDA_HELM_CHART_VERSION} \
  -f your-custom-values.yaml
```

## Option 2: VM-based PostgreSQL and Elasticsearch

If your infrastructure runs on virtual machines (VMs) or bare-metal servers, you can migrate to PostgreSQL and Elasticsearch installations running outside Kubernetes.

### PostgreSQL on a VM

1. **Install PostgreSQL** on your VM:

```bash
# Ubuntu/Debian
sudo apt-get update && sudo apt-get install -y postgresql-16

# RHEL/CentOS
sudo dnf install -y postgresql16-server
sudo postgresql-setup --initdb
sudo systemctl start postgresql
```

2. **Configure remote access** in `postgresql.conf` and `pg_hba.conf`:

```bash
# postgresql.conf
listen_addresses = '*'
max_connections = 200

# pg_hba.conf — allow connections from Kubernetes pod CIDR
host    all    all    10.0.0.0/8    md5
```

3. **Create databases and users**:

```sql
CREATE DATABASE identity;
CREATE DATABASE keycloak;
CREATE DATABASE webmodeler;
CREATE USER identity WITH PASSWORD 'changeme';
CREATE USER keycloak WITH PASSWORD 'changeme';
CREATE USER webmodeler WITH PASSWORD 'changeme';
GRANT ALL PRIVILEGES ON DATABASE identity TO identity;
GRANT ALL PRIVILEGES ON DATABASE keycloak TO keycloak;
GRANT ALL PRIVILEGES ON DATABASE webmodeler TO webmodeler;
```

4. **Migrate data** — extract the dump from Kubernetes and restore on the VM:

```bash
# On a machine with kubectl access, dump from the source
kubectl exec -it ${CAMUNDA_RELEASE_NAME}-postgresql-0 -n camunda -- \
  pg_dump -U identity -d identity -F custom > identity.dump

# Copy to the VM and restore
scp identity.dump user@pg-vm:/tmp/
ssh user@pg-vm "pg_restore -U identity -d identity --clean --if-exists --no-owner /tmp/identity.dump"
```

### Elasticsearch on a VM

1. **Install Elasticsearch** on your VM:

```bash
# Download and install
wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-8.19.11-linux-x86_64.tar.gz
tar -xzf elasticsearch-8.19.11-linux-x86_64.tar.gz
cd elasticsearch-8.19.11

# Configure
echo "network.host: 0.0.0.0" >> config/elasticsearch.yml
echo "discovery.type: single-node" >> config/elasticsearch.yml
echo "xpack.security.enabled: false" >> config/elasticsearch.yml

# Start
bin/elasticsearch -d
```

2. **Migrate data** using `elasticdump` or snapshot/restore depending on connectivity.

3. **Configure Camunda Helm chart** to point to the VM-based services, using the VM's IP address or hostname as the external endpoint.

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
