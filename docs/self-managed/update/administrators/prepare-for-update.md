---
id: prepare-for-admin-update
title: "Prepare for update"
description: "Prepare for an update to Camunda 8.8 on Self-Managed - Administrator guide."
---

Thorough preparation is critical for a successful update to Camunda 8.8. This guide covers platform infrastructure preparation including testing procedures, backup creation, configuration updates, and environment preparation.

## Step 1: Testing and dry-run

Perform a complete test of the update process in a non-production environment before updating production systems.

### Set up test environment

Create a staging environment that mirrors your production setup:

**Infrastructure requirements:**

- Same Kubernetes version and configuration
- Equivalent Elasticsearch/OpenSearch setup
- Similar data volumes and component configurations
- Matching authentication and security settings

**Data preparation:**

- Restore recent production backups to test environment
- Ensure representative process instances and user data
- Include custom connectors and job workers

### Execute test update

Follow the complete update procedure in your test environment:

1. Test the backup and restore procedures
2. Execute the planned update strategy (rolling or offline)
3. Validate all components after update
4. Test critical business processes end-to-end
5. Measure actual downtime and performance impact

**Document observations:**

- Actual time requirements for each phase
- Any unexpected issues or configuration problems
- Performance changes or resource usage differences
- Rollback procedure validation

## Step 2: Create comprehensive backups

Take complete backups of all Camunda components and dependencies before starting the production update.

:::caution Critical requirement
Always create backups before updating production systems. This provides the only reliable rollback option if critical issues occur during the update.
:::

### Backup overview

Follow the comprehensive [backup and restore procedures](/self-managed/operational-guides/backup-restore/backup-and-restore.md) to create consistent backups across all components.

### Zeebe data backup

**Using the Management API:**

```bash
# Set backup ID (use timestamp for uniqueness)
export BACKUP_ID=$(date +%s)

# Create Zeebe backup
curl -XPOST "$ZEEBE_MANAGEMENT_API/actuator/backups" \
  -H "Content-Type: application/json" \
  -d "{\"backupId\": $BACKUP_ID}"

# Monitor backup completion
curl -X GET "$ZEEBE_MANAGEMENT_API/actuator/backups/$BACKUP_ID"
```

**Manual broker data backup:**

If using direct file system access:

```bash
# Stop Zeebe brokers for consistent backup
kubectl scale statefulset camunda-zeebe --replicas=0

# Create backup of each broker's data directory
tar -czf zeebe-broker-0-data-backup.tar.gz /opt/zeebe/data/
tar -czf zeebe-broker-1-data-backup.tar.gz /opt/zeebe/data/
tar -czf zeebe-broker-2-data-backup.tar.gz /opt/zeebe/data/

# Restart brokers
kubectl scale statefulset camunda-zeebe --replicas=3
```

For more details, see [Zeebe backup documentation](/self-managed/operational-guides/backup-restore/zeebe-backup-and-restore.md).

### Operate and Tasklist backup

**Create web applications backup:**

```bash
# Soft pause Zeebe exporting
curl -XPOST "$ZEEBE_MANAGEMENT_API/actuator/exporting/pause"

# Create web applications backup
curl -XPOST "$ORCHESTRATION_CLUSTER_MANAGEMENT_API/actuator/backupHistory" \
  -H "Content-Type: application/json" \
  -d "{\"backupId\": $BACKUP_ID}"

# Monitor backup completion
curl -X GET "$ORCHESTRATION_CLUSTER_MANAGEMENT_API/actuator/backupHistory/$BACKUP_ID"

# Resume exporting after backup
curl -XPOST "$ZEEBE_MANAGEMENT_API/actuator/exporting/resume"
```

For detailed procedures, see [web applications backup documentation](/self-managed/operational-guides/backup-restore/webapps-backup.md).

### Optimize backup

**Create Optimize backup:**

```bash
# Create Optimize backup
curl -XPOST "$OPTIMIZE_MANAGEMENT_API/actuator/backups" \
  -H "Content-Type: application/json" \
  -d "{\"backupId\": $BACKUP_ID}"

# Monitor backup status
curl -X GET "$OPTIMIZE_MANAGEMENT_API/actuator/backups/$BACKUP_ID"
```

**Manual Optimize data backup:**

```bash
# Stop Optimize for consistent backup
kubectl scale deployment camunda-optimize --replicas=0

# Create Elasticsearch snapshot of Optimize indices
curl -XPUT "$ELASTICSEARCH_ENDPOINT/_snapshot/optimize_backup/optimize_$BACKUP_ID" \
  -H "Content-Type: application/json" \
  -d '{
    "indices": "optimize-*",
    "ignore_unavailable": true,
    "include_global_state": false
  }'

# Restart Optimize
kubectl scale deployment camunda-optimize --replicas=1
```

For complete instructions, see [Optimize backup documentation](/self-managed/operational-guides/backup-restore/optimize-backup.md).

### Identity (Keycloak) backup

**Database backup:**

```bash
# Create PostgreSQL database dump
pg_dump -U $KEYCLOAK_DB_USER -h $KEYCLOAK_DB_HOST -p $KEYCLOAK_DB_PORT \
  -f keycloak-backup-$BACKUP_ID.sql $KEYCLOAK_DB_NAME

# Or use pg_dumpall for complete backup
pg_dumpall -U $KEYCLOAK_DB_USER -h $KEYCLOAK_DB_HOST -p $KEYCLOAK_DB_PORT \
  -f keycloak-complete-backup-$BACKUP_ID.sql
```

**Configuration backup:**

```bash
# Export Keycloak realm configuration
kubectl exec -it deployment/camunda-identity -- \
  /opt/keycloak/bin/kcadm.sh export --file /tmp/realm-export.json \
  --realm camunda-platform --users realm_file

# Copy exported configuration
kubectl cp camunda-identity:/tmp/realm-export.json ./keycloak-realm-backup-$BACKUP_ID.json
```

### Web Modeler backup (if applicable)

**PostgreSQL database backup:**

```bash
# Create Web Modeler database backup
pg_dumpall -U $MODELER_DB_USER -h $MODELER_DB_HOST -p $MODELER_DB_PORT \
  -f webmodeler-backup-$BACKUP_ID.psql --quote-all-identifiers
```

For details, see [Web Modeler backup procedures](/self-managed/operational-guides/backup-restore/backup.md#back-up-web-modeler-data).

### Configuration files backup

**Helm values and configurations:**

```bash
# Export current Helm values
helm get values camunda-platform > current-helm-values-backup.yaml

# Backup custom configuration files
cp config/application.yaml config/application-backup-$BACKUP_ID.yaml
cp config/environment-config.yaml config/environment-config-backup-$BACKUP_ID.yaml
```

**Kubernetes configurations:**

```bash
# Export current configmaps and secrets
kubectl get configmap -o yaml > configmaps-backup-$BACKUP_ID.yaml
kubectl get secret -o yaml > secrets-backup-$BACKUP_ID.yaml
```

## Step 3: Update configurations

Prepare updated configuration files and Helm values for the new version.

### Helm values updates

Review and update your Helm `values.yaml` file for Camunda 8.8 compatibility:

**Identity configuration changes:**

```yaml
# Old format (deprecated in 8.8)
identity:
  keycloak:
    auth:
      adminPassword: "admin123"

# New format (8.8+)
identityKeycloak:
  auth:
    adminPassword: "admin123"
```

**Orchestration cluster configuration:**

```yaml
# Orchestration cluster (enabled by default in 8.8)
zeebe:
  # StatefulSet still named 'zeebe' to avoid downtime during upgrade
  enabled: true

# Configure resource requirements for orchestration cluster
zeebe:
  resources:
    requests:
      memory: "2Gi"
      cpu: "1000m"
    limits:
      memory: "4Gi"
      cpu: "2000m"
```

**Ingress configuration updates:**

```yaml
# Combined ingress configuration (recommended in 8.8)
global:
  ingress:
    enabled: true
    className: "nginx"
    host: "camunda.example.com"

    # Consolidated path configuration
    operate:
      enabled: true
      path: "/operate"
    tasklist:
      enabled: true
      path: "/tasklist"
    optimize:
      enabled: true
      path: "/optimize"
```

### Component-specific configurations

**Elasticsearch compatibility:**

Ensure Elasticsearch configuration meets 8.8 requirements:

```yaml
elasticsearch:
  imageTag: "8.16.0" # Minimum required version
  esConfig:
    elasticsearch.yml: |
      cluster.name: "camunda"
      network.host: "0.0.0.0"
      # Additional 8.16+ configurations
```

**Resource adjustments:**

Update resource allocations based on 8.8 requirements:

```yaml
# Increased Keycloak resources
identityKeycloak:
  resources:
    requests:
      memory: "1Gi" # Increased from previous versions
      cpu: "500m"
    limits:
      memory: "2Gi"
      cpu: "1000m"

# Elasticsearch node count (default changed to 3 in 8.6+)
elasticsearch:
  replicas: 3
  antiAffinity: "soft" # Avoid same-node scheduling
```

### Environment variable updates

Update environment variables for compatibility:

```bash
# Zeebe configuration
export ZEEBE_BROKER_DATA_BACKUP_STORE=S3
export ZEEBE_BROKER_DATA_BACKUP_S3_BUCKETNAME=camunda-backups

# Component backup configuration
export CAMUNDA_OPERATE_BACKUP_REPOSITORYNAME=camunda
export CAMUNDA_TASKLIST_BACKUP_REPOSITORYNAME=camunda
export CAMUNDA_OPTIMIZE_BACKUP_REPOSITORY_NAME=camunda
```

## Step 4: Gather secrets and credentials

Extract and prepare all required secrets for the update process.

### Extract existing secrets

**Kubernetes secrets:**

```bash
# Extract Identity secrets
kubectl get secret camunda-identity -o jsonpath="{.data.admin-password}" | base64 --decode
kubectl get secret camunda-identity -o jsonpath="{.data.management-password}" | base64 --decode

# Extract database passwords
kubectl get secret camunda-postgresql -o jsonpath="{.data.postgres-password}" | base64 --decode

# Extract custom application secrets
kubectl get secret camunda-tasklist -o jsonpath="{.data.tasklist-secret}" | base64 --decode
```

**Export for Helm upgrade:**

```bash
# Set environment variables for Helm upgrade
export KEYCLOAK_ADMIN_PASSWORD=$(kubectl get secret camunda-identity -o jsonpath="{.data.admin-password}" | base64 --decode)
export POSTGRES_PASSWORD=$(kubectl get secret camunda-postgresql -o jsonpath="{.data.postgres-password}" | base64 --decode)
export TASKLIST_SECRET=$(kubectl get secret camunda-tasklist -o jsonpath="{.data.tasklist-secret}" | base64 --decode)
```

### Prepare Helm upgrade command

Create the complete Helm upgrade command with all required secrets:

```bash
helm upgrade camunda-platform camunda/camunda-platform \
  --version 13.0.0 \
  -f updated-values.yaml \
  --set global.identity.auth.tasklist.existingSecret=$TASKLIST_SECRET \
  --set global.identity.auth.operate.existingSecret=$OPERATE_SECRET \
  --set global.identity.auth.optimize.existingSecret=$OPTIMIZE_SECRET \
  --set identityKeycloak.auth.adminPassword=$KEYCLOAK_ADMIN_PASSWORD \
  --set postgresql.auth.postgresPassword=$POSTGRES_PASSWORD
```

## Step 5: Enhanced pre-update validation

Perform comprehensive validation to identify potential issues before starting the update process.

:::warning 8.8 Changes Validation
Camunda 8.8 introduces significant changes. Run these validations to identify compatibility issues:

- **Orchestration Cluster API** replaces individual component APIs
- **Official SDKs** replace community Spring Zeebe libraries
- **Authentication model** updates affect custom integrations
- **Zeebe Process Test** deprecated in favor of Camunda Process Test
  :::

### Platform health validation

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="helm" label="Kubernetes/Helm">

```bash
# Check overall cluster health
kubectl get nodes -o wide
kubectl get pods -l app.kubernetes.io/instance=camunda-platform

# Validate Helm release status and note current version
helm status camunda-platform
helm list | grep camunda-platform

# Check for failing pods or resource constraints
kubectl get events --sort-by='.lastTimestamp' | grep -E "(Warning|Error)" | tail -20

# Validate persistent volumes and storage
kubectl get pv,pvc | grep camunda
kubectl describe pvc | grep -A 3 -E "(Events|Status)"

# Check resource availability for update
kubectl top nodes
kubectl describe nodes | grep -A 10 "Allocated resources"
```

</TabItem>
<TabItem value="docker" label="Docker">

```bash
# Check container health and resource usage
docker ps --filter "name=camunda" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}" | grep camunda

# Validate volumes and networks
docker volume ls | grep camunda
docker network ls | grep camunda
docker network inspect camunda-platform_default
```

</TabItem>
<TabItem value="manual" label="Manual JAR">

```bash
# Check service status and health
systemctl status camunda-* --no-pager
ps aux | grep camunda | grep -v grep

# Check log files for recent errors
find /var/log/camunda/ -name "*.log" -mtime -1 -exec tail -50 {} \; | grep -E "(ERROR|FATAL)"

# Validate file permissions and disk space
ls -la /opt/camunda/ /var/log/camunda/
df -h /opt/camunda /var/log/camunda
```

</TabItem>
</Tabs>

### Configuration compatibility validation

**Check for deprecated configurations:**

<Tabs>
<TabItem value="helm" label="Kubernetes/Helm">

```bash
# Check for deprecated Helm values
helm get values camunda-platform | grep -E "(deprecated|removed|legacy|zeebe-cluster-helm)"

# Validate Zeebe broker configuration
kubectl get configmap camunda-zeebe-config -o yaml | grep -E "(deprecated|removed)"

# Check for old Identity configuration format
helm get values camunda-platform | grep -A 10 "identity:" | grep -E "(keycloak|auth)"
```

</TabItem>
<TabItem value="docker" label="Docker">

```bash
# Check Docker Compose configuration for deprecated settings
docker-compose config | grep -E "(deprecated|removed|legacy)"

# Validate environment variables in containers
docker inspect camunda-zeebe | jq '.[0].Config.Env[]' | grep -E "(deprecated|removed)"

# Check for old configuration patterns
grep -E "(zeebe-cluster|deprecated)" docker-compose.yml || echo "No deprecated patterns found"
```

</TabItem>
<TabItem value="manual" label="Manual JAR">

```bash
# Check application configuration files
find /opt/camunda/config/ -name "*.yml" -o -name "*.properties" | xargs grep -E "(deprecated|removed)"

# Validate Zeebe broker configuration
grep -E "(deprecated|removed)" /opt/camunda/zeebe/config/application.yaml || echo "No deprecated settings found"

# Check Identity configuration format
grep -A 10 "identity:" /opt/camunda/config/application.yaml | grep -E "(keycloak|auth)"
```

</TabItem>
</Tabs>

**Validate component versions and compatibility:**

<Tabs>
<TabItem value="helm" label="Kubernetes/Helm">

```bash
# Check current component versions
kubectl get pods -l app.kubernetes.io/instance=camunda-platform -o jsonpath='{range .items[*]}{.metadata.name}{"\t"}{.spec.containers[0].image}{"\n"}{end}'

# Verify Elasticsearch/OpenSearch version compatibility
curl -s "localhost:9200" | jq '.version.number'
```

</TabItem>
<TabItem value="docker" label="Docker">

```bash
# Check running container versions
docker ps --format "table {{.Names}}\t{{.Image}}" | grep camunda

# Verify Elasticsearch version
curl -s "localhost:9200" | jq '.version.number'
```

</TabItem>
<TabItem value="manual" label="Manual JAR">

```bash
# Check Java versions and Camunda component versions
java -jar /opt/camunda/zeebe/bin/broker.jar --version
java -jar /opt/camunda/operate/bin/operate.jar --version
java -jar /opt/camunda/tasklist/bin/tasklist.jar --version

# Verify Elasticsearch version
curl -s "localhost:9200" | jq '.version.number'
```

</TabItem>
</Tabs>

### Authentication and security validation

**Test Identity/Keycloak connectivity:**

```bash
# Check Keycloak health endpoint
curl -I "localhost:18080/auth/realms/camunda-platform/.well-known/openid_configuration"

# Verify SSL/TLS certificates if using HTTPS
openssl s_client -connect localhost:9443 -servername $(hostname) -verify_return_error < /dev/null

# Test application authentication
curl -X POST "localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=demo&password=demo&grant_type=password&client_id=camunda-identity"
```

### Data consistency and database validation

**Verify Elasticsearch/OpenSearch cluster health:**

```bash
# Check cluster health and identify issues
curl -s "localhost:9200/_cluster/health?pretty" | jq '.status, .number_of_nodes, .unassigned_shards'

# Validate index health and document counts
curl -s "localhost:9200/_cat/indices?v&h=index,health,status,docs.count,store.size" | sort

# Check for unassigned shards that need attention
curl -s "localhost:9200/_cat/shards?v&h=index,shard,prirep,state,node" | grep -E "(UNASSIGNED|INITIALIZING|RELOCATING)"

# Verify backup repository configuration
curl -s "localhost:9200/_snapshot" | jq 'keys'
```

**Process data validation:**

```bash
# Test basic Zeebe functionality
zbctl --insecure deploy test-process.bpmn 2>/dev/null || echo "Deploy test failed"
zbctl --insecure create instance test-process 2>/dev/null || echo "Instance creation failed"

# Check Operate API connectivity and data
curl -s "localhost:8081/api/v1/process-definitions" | jq 'length' 2>/dev/null || echo "Operate API test failed"

# Validate Tasklist functionality
curl -s "localhost:8082/api/v1/tasks?state=CREATED" | jq 'length' 2>/dev/null || echo "Tasklist API test failed"

# Check Optimize connectivity (if enabled)
curl -s "localhost:8083/api/check" | jq '.status' 2>/dev/null || echo "Optimize health check failed"
```

### Breaking changes pre-validation

**Check for deprecated API usage:**

```bash
# Search for V1 API endpoint usage in application code
find /path/to/applications/ -type f \( -name "*.java" -o -name "*.js" -o -name "*.ts" -o -name "*.properties" \) \
  -exec grep -l "/v1/" {} \; 2>/dev/null || echo "No application code found to scan"

# Look for individual component API usage
find /path/to/applications/ -type f \( -name "*.java" -o -name "*.js" -o -name "*.ts" \) \
  -exec grep -l -E "(operate/api|tasklist/api|zeebe-api)" {} \; 2>/dev/null || echo "No component API usage found"
```

**Validate SDK compatibility:**

```bash
# Check for community Spring Zeebe usage (deprecated)
find /path/to/applications/ -name "pom.xml" -exec grep -l "spring-zeebe-starter" {} \; 2>/dev/null || echo "No Spring Zeebe starter found"

# Check for Zeebe Process Test usage (deprecated)
find /path/to/applications/ -name "*.xml" -exec grep -l "zeebe-process-test" {} \; 2>/dev/null || echo "No ZPT usage found"

# Check for job-based user task implementations
find /path/to/applications/ -name "*.java" -exec grep -l "JobWorker.*[Uu]ser[Tt]ask" {} \; 2>/dev/null || echo "No job-based user tasks found"
```

### Resource capacity validation

**Check available resources for update:**

<Tabs>
<TabItem value="helm" label="Kubernetes/Helm">

```bash
# Kubernetes resource availability
kubectl top nodes
kubectl describe nodes | grep -A 5 "Allocated resources"

# Check for resource quotas or limits
kubectl get resourcequota --all-namespaces
kubectl get limitrange --all-namespaces

# Validate storage capacity
kubectl get pv | grep Available
kubectl get pvc | grep Bound
```

</TabItem>
<TabItem value="docker" label="Docker">

```bash
# Check Docker host capacity
df -h | grep -E "(docker|var/lib/docker)"
free -h
docker system df

# Check for Docker daemon health
docker system info | grep -E "(Containers|Images|Server Version)"
```

</TabItem>
<TabItem value="manual" label="Manual JAR">

```bash
# Check system resources
free -h
df -h /opt/camunda /var/log/camunda /tmp

# Check process resource usage
ps aux | grep camunda | awk '{print $1, $2, $3, $4, $11}'

# Validate Java heap and system limits
java -XX:+PrintFlagsFinal -version | grep -E "(MaxHeapSize|MaxDirectMemorySize)"
ulimit -a | grep -E "(memory|files|processes)"
```

</TabItem>
</Tabs>

### Network connectivity validation

**Test inter-component connectivity:**

<Tabs>
<TabItem value="helm" label="Kubernetes/Helm">

```bash
# Test Zeebe gateway to broker connectivity
kubectl exec -it statefulset/camunda-zeebe -- zbctl status --insecure

# Verify Elasticsearch connectivity from components
kubectl exec -it deployment/camunda-operate -- curl -I elasticsearch:9200

# Test Identity provider connectivity
kubectl exec -it deployment/camunda-operate -- curl -I camunda-identity:80/auth
```

</TabItem>
<TabItem value="docker" label="Docker">

```bash
# Test Zeebe cluster connectivity
docker exec camunda-zeebe zbctl status --insecure

# Verify Elasticsearch connectivity
docker exec camunda-operate curl -I elasticsearch:9200

# Test Identity provider connectivity
docker exec camunda-operate curl -I identity:8084/auth

# Check Docker network connectivity
docker network inspect camunda-platform_default
```

</TabItem>
<TabItem value="manual" label="Manual JAR">

```bash
# Test Zeebe cluster connectivity
/opt/camunda/zeebe/bin/zbctl status --insecure --address localhost:26500

# Verify Elasticsearch connectivity
curl -I localhost:9200/_cluster/health

# Test Identity provider connectivity
curl -I localhost:8084/auth/realms/camunda-platform

# Check service ports and networking
netstat -tuln | grep -E "(26500|9200|8084|8080|8081|8082)"
```

</TabItem>
</Tabs>

### Pre-update functional testing

**Critical business process validation:**

```bash
# Deploy and execute a test process end-to-end
zbctl --insecure deploy /path/to/test-process.bpmn

# Create process instance and verify completion
INSTANCE_KEY=$(zbctl --insecure create instance test-process --output json | jq -r '.processInstanceKey')

# Verify instance appears in Operate
sleep 5
curl -s "localhost:8081/api/v1/process-instances/$INSTANCE_KEY" | jq '.state'

# Check for any failed jobs or incidents
curl -s "localhost:8081/api/v1/incidents?processInstanceKey=$INSTANCE_KEY" | jq 'length'
```

### Validation report generation

**Create validation summary:**

```bash
# Generate platform health report
echo "=== Camunda 8.8 Pre-Update Validation Report ===" > validation-report.txt
echo "Timestamp: $(date)" >> validation-report.txt
echo "" >> validation-report.txt

# Add component status
echo "Component Health:" >> validation-report.txt
kubectl get pods -l app.kubernetes.io/instance=camunda-platform | tail -n +2 | awk '{print $1, $3}' >> validation-report.txt

# Add resource usage
echo -e "\nResource Usage:" >> validation-report.txt
kubectl top nodes >> validation-report.txt

# Add any warnings found
echo -e "\nWarnings Found:" >> validation-report.txt
kubectl get events --sort-by='.lastTimestamp' | grep Warning | tail -5 >> validation-report.txt

echo "Validation report saved to: validation-report.txt"
```

### Image preparation

**Pre-pull container images:**

<Tabs>
<TabItem value="helm" label="Kubernetes/Helm">

```bash
# Pull new container images to reduce downtime
kubectl create job image-puller --image=camunda/zeebe:8.8.0 -- sleep 60
kubectl create job image-puller-operate --image=camunda/operate:8.8.0 -- sleep 60
kubectl create job image-puller-tasklist --image=camunda/tasklist:8.8.0 -- sleep 60

# Clean up after images are pulled
kubectl delete job image-puller image-puller-operate image-puller-tasklist
```

</TabItem>
<TabItem value="docker" label="Docker">

```bash
# Pre-pull new Docker images to reduce downtime
docker pull camunda/zeebe:8.8.0
docker pull camunda/operate:8.8.0
docker pull camunda/tasklist:8.8.0
docker pull camunda/optimize:8.8.0
docker pull camunda/identity:8.8.0

# Verify images are available locally
docker images | grep camunda | grep 8.8.0
```

</TabItem>
<TabItem value="manual" label="Manual JAR">

```bash
# Download new JAR files to staging directory
mkdir -p /opt/camunda/upgrade/8.8.0
cd /opt/camunda/upgrade/8.8.0

# Download new versions from official Camunda releases
# Visit https://github.com/camunda/camunda/releases/tag/8.8.0 for download links
# Example commands (update URLs as needed):
# wget [ZEEBE_DISTRIBUTION_URL]
# wget [OPERATE_JAR_URL]
# wget [TASKLIST_JAR_URL]

# Verify file integrity
sha256sum *.tar.gz *.jar
```

</TabItem>
</Tabs>

## Step 6: Communication and scheduling

Coordinate with stakeholders and schedule the update window.

### Maintenance window planning

**Recommended timing:**

- Schedule during off-peak business hours
- Ensure technical team availability
- Plan for potential rollback if needed

**Preparation checklist:**

- [ ] Test environment validation completed
- [ ] All backups created and verified
- [ ] Configuration updates prepared and tested
- [ ] Secrets and credentials gathered
- [ ] Team trained on update procedures
- [ ] Rollback plan documented and tested
- [ ] Communication sent to stakeholders
- [ ] Emergency contacts and escalation procedures ready

## Next steps

With platform preparation complete, proceed to [run the update](./run-update.md) following your planned strategy.

For additional backup and restore information, see the comprehensive [backup and restore guide](/self-managed/operational-guides/backup-restore/backup-and-restore.md).
