---
id: run-admin-update
title: "Run update"
description: "Guide on how to run an update to Camunda 8.8 on Self-Managed - Administrator guide."
---

import DocCardList from '@theme/DocCardList';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Execute the platform update to Camunda 8.8 following your planned strategy. This guide covers platform coordination and validation procedures, with references to detailed technical execution steps.

## Before you begin

Ensure you have reviewed the [planning](./plan-update.md) and [preparation](./prepare-for-update.md) phases before executing the update.

**Prerequisites checklist:**

- [ ] Test environment update completed successfully
- [ ] All backups created and verified
- [ ] Updated configuration files prepared
- [ ] Secrets and credentials extracted
- [ ] Maintenance window scheduled and communicated
- [ ] Team ready for execution and monitoring

## Platform update execution

:::info Component Update Order
For optimal stability and minimal risk, follow this recommended component update sequence:

1. **Elasticsearch/OpenSearch** - Data layer
2. **Zeebe brokers** (non-gateway nodes first) - Core processing engine
3. **Zeebe gateway** - API and client connection layer
4. **Operate, Tasklist, Optimize** (can be updated in parallel) - Web applications
5. **Identity/Keycloak** - Authentication and authorization
6. **Connectors** - Integration components

**Rationale:** This order ensures data layer stability before updating processing components, and core processing before UI/API layers. Each tier builds on the stability of the previous tier.
:::

Choose your deployment method and follow the appropriate upgrade procedures:

<Tabs>
<TabItem value="helm" label="Kubernetes/Helm">

### Helm Chart Upgrade

For Kubernetes deployments using the Camunda Helm chart, follow the dedicated technical upgrade guide:

<DocCardList items={[{type:"link", href:"/docs/next/self-managed/installation-methods/helm/upgrade/upgrade-hc-870-880/", label: "Helm Chart Upgrade: 8.7 to 8.8", docId:"self-managed/installation-methods/helm/upgrade/upgrade-hc-870-880"}
]}/>

This guide provides:

- Detailed Helm upgrade procedures
- Version-specific configuration changes
- Component-by-component update steps
- Troubleshooting guidance for common issues

</TabItem>
<TabItem value="docker" label="Docker">

### Docker Images Update

For production deployments using Docker images:

:::info Docker vs Docker Compose
Docker images are supported for production usage on Linux systems. Docker Compose files are designed for development environments only and should not be used in production. For production, use Kubernetes or individual Docker containers with proper orchestration.
:::

**Core update procedure:**

1. **Stop containers**: Stop all running Camunda containers
2. **Pull new images**: Update to 8.8.0 image tags from Docker Hub
3. **Update configurations**: Apply 8.8-specific configuration changes
4. **Run migrations**: Execute Optimize migration if applicable
5. **Start updated containers**: Launch containers with new images and configurations

**Available production images:**

- **Zeebe**: `camunda/zeebe:8.8.0`
- **Operate**: `camunda/operate:8.8.0`
- **Tasklist**: `camunda/tasklist:8.8.0`
- **Optimize**: `camunda/optimize:8.8.0`
- **Identity**: `camunda/identity:8.8.0`
- **Connectors**: `camunda/connectors:8.8.0`

**Component-specific guidance:**

- **[Docker deployment guide](/self-managed/installation-methods/docker/docker.md)**
- **[Zeebe Docker deployment](/self-managed/zeebe-deployment/)**
- **[Operate Docker setup](/self-managed/operate-deployment/)**
- **[Tasklist Docker configuration](/self-managed/tasklist-deployment/)**
- **[Optimize migration procedures](/self-managed/optimize-deployment/migration-update/)**
- **[Identity Docker setup](/self-managed/identity/)**

</TabItem>
<TabItem value="manual" label="Manual JAR">

### Manual Installation Update

For manual installations using JAR files or system packages:

**Update procedure:**

1. **Stop services**: Stop all Camunda services using systemctl or service scripts
2. **Backup installation**: Create backup of current installation directory
3. **Install new version**: Replace with new JAR files or packages
4. **Update configuration**: Apply configuration changes for 8.8
5. **Run migrations**: Execute necessary data migrations
6. **Start services**: Restart all services in proper order

**Component-specific guidance:**

- **[Zeebe manual deployment](/self-managed/zeebe-deployment/)**
- **[Operate manual setup](/self-managed/operate-deployment/)**
- **[Tasklist manual configuration](/self-managed/tasklist-deployment/)**
- **[Optimize migration procedures](/self-managed/optimize-deployment/migration-update/)**
- **[Identity manual setup](/self-managed/identity/)**

</TabItem>
</Tabs>

## Platform validation and monitoring

After completing the technical upgrade steps, perform comprehensive validation across all deployment methods.

### Component health verification

<Tabs>
<TabItem value="k8s-health" label="Kubernetes">

**Check service status:**

```bash
# Kubernetes health checks
kubectl get pods -l app.kubernetes.io/instance=camunda-platform
kubectl top pods

# Check for failed pods
kubectl get pods | grep -E "(Error|CrashLoopBackOff|ImagePullBackOff)"

# Validate Helm release status
helm status camunda-platform
```

**Verify component versions:**

```bash
# Check Zeebe version
kubectl port-forward svc/camunda-zeebe-gateway 8080:8080 &
curl localhost:8080/api/v1/topology | jq '.brokers[].version'
kill %1

# Check web application versions in logs
kubectl logs deployment/camunda-operate | grep "version"
kubectl logs deployment/camunda-tasklist | grep "version"
```

</TabItem>
<TabItem value="docker-health" label="Docker">

**Check service status:**

```bash
# Docker container health checks
docker ps
docker logs [container-name] --tail=50

# Check running container images and versions
docker images | grep camunda
```

**Verify component versions:**

```bash
# Check Zeebe version
curl localhost:8080/api/v1/topology | jq '.brokers[].version'

# Check container logs for version information
docker logs [operate-container-name] | grep "version"
docker logs [tasklist-container-name] | grep "version"

# Inspect container image versions
docker inspect [container-name] | jq '.[].Config.Image'
```

</TabItem>
<TabItem value="manual-health" label="Manual JAR">

**Check service status:**

```bash
# Check system services
sudo systemctl status camunda-*

# Check process status
ps aux | grep camunda
```

**Verify component versions:**

```bash
# Check Zeebe version
curl localhost:8080/api/v1/topology | jq '.brokers[].version'

# Check application logs for version information
tail -f /var/log/camunda/operate.log | grep "version"
tail -f /var/log/camunda/tasklist.log | grep "version"
```

</TabItem>
</Tabs>

### Comprehensive health validation

**Test all component connectivity:**

```bash
# Test Zeebe gateway and get cluster topology
curl -s localhost:8080/api/v1/topology | jq '.brokers[] | {nodeId, version, health}'

# Test Operate health and API functionality
curl -I localhost:8081/api/check
curl -s "localhost:8081/api/v1/process-definitions" | jq 'length'

# Test Tasklist functionality
curl -I localhost:8082/api/check
curl -s "localhost:8082/api/v1/tasks?state=CREATED" | jq 'length'

# Test Optimize (if enabled)
curl -I localhost:8083/api/check
curl -s "localhost:8083/api/check" | jq '.status'

# Test Identity/Keycloak
curl -I "localhost:18080/auth/realms/camunda-platform/.well-known/openid_configuration"
```

**End-to-end functional validation:**

```bash
# Deploy test process to verify complete workflow
zbctl --insecure deploy test-process.bpmn

# Create process instance and track execution
INSTANCE_KEY=$(zbctl --insecure create instance test-process --output json | jq -r '.processInstanceKey')
echo "Created process instance: $INSTANCE_KEY"

# Verify instance appears in Operate (wait for indexing)
sleep 10
curl -s "localhost:8081/api/v1/process-instances/$INSTANCE_KEY" | jq '.state'

# Check for successful processing (no incidents)
INCIDENTS=$(curl -s "localhost:8081/api/v1/incidents?processInstanceKey=$INSTANCE_KEY" | jq 'length')
echo "Incidents found: $INCIDENTS"

# Verify tasks appear in Tasklist
curl -s "localhost:8082/api/v1/tasks?processInstanceKey=$INSTANCE_KEY" | jq 'length'
```

**Performance validation:**

```bash
# Test process deployment performance
time zbctl --insecure deploy test-process.bpmn

# Test process instance creation rate
for i in {1..5}; do
  time zbctl --insecure create instance test-process --output json
done

# Check component response times
time curl -s localhost:8081/api/v1/process-definitions > /dev/null
time curl -s localhost:8082/api/v1/tasks > /dev/null
```

### Data consistency verification

**Check process instance continuity:**

1. **Verify existing instances**: Confirm running process instances before update are still visible and functional
2. **Check task assignments**: Ensure user tasks remain properly assigned
3. **Validate process history**: Confirm historical data and audit trails are intact

**Database validation:**

```bash
# Check Elasticsearch/OpenSearch cluster health
curl localhost:9200/_cluster/health | jq

# Verify index health
curl localhost:9200/_cat/indices?v | grep camunda

# Check for any index errors
curl localhost:9200/_cat/shards?v | grep -E "(UNASSIGNED|RED)"
```

### Performance monitoring

<Tabs>
<TabItem value="k8s-perf" label="Kubernetes">

**Resource monitoring:**

```bash
# Kubernetes resource monitoring
kubectl top nodes
kubectl top pods

# Check for resource constraint warnings
kubectl get events --sort-by='.lastTimestamp' | grep -E "(OOMKilled|Evicted)"

# Monitor resource usage over time
watch kubectl top pods
```

</TabItem>
<TabItem value="docker-perf" label="Docker">

**Resource monitoring:**

```bash
# Docker resource monitoring for all containers
docker stats

# Check specific container resource usage
docker top [container-name]

# Monitor logs for performance issues
docker logs -f [container-name] | grep -E "(error|timeout|slow)"

# Monitor all Camunda containers
docker logs -f $(docker ps -q --filter "ancestor=camunda/*") | grep -E "(error|timeout|slow)"
```

</TabItem>
<TabItem value="manual-perf" label="Manual JAR">

**Resource monitoring:**

```bash
# System resource monitoring
top
htop
iostat -x 1

# Check application-specific metrics
tail -f /var/log/camunda/*.log | grep -E "(performance|slow|timeout)"

# Monitor JVM metrics (if accessible)
jstat -gc <java-pid>
```

</TabItem>
</Tabs>

**Platform metrics:**

- Monitor process execution times
- Check task completion rates
- Verify import/export lag in Operate/Tasklist
- Validate Optimize report generation

## Troubleshooting platform issues

### Common upgrade issues

<Tabs>
<TabItem value="helm-troubleshoot" label="Kubernetes/Helm">

For detailed troubleshooting of Helm-specific upgrade issues:

- **[Helm upgrade troubleshooting](/self-managed/installation-methods/helm/upgrade/upgrade-hc-870-880/#troubleshooting)**

**Quick diagnostic commands:**

```bash
# Check Helm release status
helm status camunda-platform
helm history camunda-platform

# Check failed pods
kubectl get pods | grep -E "(Error|CrashLoopBackOff|ImagePullBackOff)"

# Check recent events
kubectl get events --sort-by='.lastTimestamp' | tail -20

# Check resource constraints
kubectl describe nodes | grep -A 5 "Conditions:"
```

</TabItem>
<TabItem value="docker-troubleshoot" label="Docker">

**Common Docker issues:**

```bash
# Check container status
docker ps -a

# Check container logs
docker logs [container-name]

# Check for port conflicts
netstat -tulpn | grep :[port]

# Check disk space
df -h
docker system df
```

**Image and network issues:**

```bash
# Pull latest images manually
docker pull camunda/zeebe:8.8.0
docker pull camunda/operate:8.8.0
docker pull camunda/tasklist:8.8.0

# Stop and remove containers, then recreate with new images
docker stop [container-name] && docker rm [container-name]
docker run [container-options] camunda/[component]:8.8.0

# Check network connectivity
docker network ls
docker network inspect [network-name]

# Check container connectivity
docker exec [container-name] ping [other-container-name]
```

</TabItem>
<TabItem value="manual-troubleshoot" label="Manual JAR">

**Common manual deployment issues:**

```bash
# Check service status
systemctl status camunda-*

# Check application logs
tail -f /var/log/camunda/*.log

# Check file permissions
ls -la /opt/camunda/
ls -la /var/log/camunda/

# Check port availability
netstat -tulpn | grep :[port]
```

**Java and configuration issues:**

```bash
# Check Java version
java -version

# Validate configuration files
cat /opt/camunda/config/application.yaml

# Check environment variables
env | grep CAMUNDA
```

</TabItem>
</Tabs>

### Performance degradation

**Common performance checks:**

```bash
# Check for OOM or CPU throttling (Kubernetes)
kubectl describe pod [pod-name] | grep -E "(OOMKilled|Throttling)"

# Test database connectivity
curl elasticsearch:9200/_cluster/health

# Check for connection pool exhaustion
grep -E "(connection|timeout|pool)" /var/log/camunda/*.log
```

## Platform rollback procedure

If critical issues are discovered, follow the platform rollback procedure:

:::caution Rollback limitations
Camunda 8 doesn't support automatic rollbacks once data migrations have completed. Rollback requires restoring from backups.
:::

<Tabs>
<TabItem value="helm-rollback" label="Kubernetes/Helm">

### Helm Rollback

```bash
# Check Helm history
helm history camunda-platform

# Rollback to previous release
helm rollback camunda-platform [revision-number]

# Monitor rollback
kubectl get pods -w

# Verify rollback completion
helm status camunda-platform
```

</TabItem>
<TabItem value="docker-rollback" label="Docker">

### Docker Images Rollback

```bash
# Stop current containers
docker stop [container-names]

# Remove current containers
docker rm [container-names]

# Pull previous version images
docker pull camunda/zeebe:[previous-version]
docker pull camunda/operate:[previous-version]
docker pull camunda/tasklist:[previous-version]

# Restore from backups (databases, volumes)
# [Follow your backup restoration procedures]

# Start containers with previous images and configurations
docker run [previous-container-options] camunda/[component]:[previous-version]
```

</TabItem>
<TabItem value="manual-rollback" label="Manual JAR">

### Manual Installation Rollback

```bash
# Stop all services
sudo systemctl stop camunda-*

# Restore previous installation
rm -rf /opt/camunda
mv /opt/camunda-backup-[date] /opt/camunda

# Restore configuration files
cp /opt/camunda/config/*.backup /opt/camunda/config/

# Restore from data backups
# [Follow your backup restoration procedures]

# Restart services
sudo systemctl start camunda-*
```

</TabItem>
</Tabs>

## Post-update coordination

After successful platform update completion:

### Notify development teams

Inform developers that the platform update is complete and ready for application updates.

### Monitor platform stability

Continue monitoring platform performance during application updates:

```bash
# Monitor resource usage as applications are updated
kubectl top pods --sort-by=cpu
kubectl top pods --sort-by=memory

# Watch for any platform issues during app deployments
kubectl get events --sort-by='.lastTimestamp' | tail -20
```

## Next steps

After successful platform update completion:

1. **Monitor platform stability** during application update phase
2. **Support development teams** with application deployment issues
3. **Update monitoring** and alerting configurations for 8.8
4. **Document lessons learned** and update procedures
5. **Plan next update cycle** following similar procedures
6. **Clean up backups** according to retention policies

## Additional resources

- **[Helm Chart Upgrade Guide: 8.7 to 8.8](/self-managed/installation-methods/helm/upgrade/upgrade-hc-870-880/)** - Detailed technical upgrade steps
- **[Operational guides](/self-managed/operational-guides/)** - 8.8-specific procedures and best practices
- **[Backup and restore guide](/self-managed/operational-guides/backup-restore/backup-and-restore.md)** - Comprehensive backup procedures
- **[Troubleshooting guides](/self-managed/operational-guides/)** - Issue resolution procedures
