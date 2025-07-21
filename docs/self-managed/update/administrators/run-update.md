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

Ensure you have reviewed the [preparation](./prepare-for-update.md) phases before executing the update.

**Prerequisites checklist:**

- [ ] Test environment update completed successfully
- [ ] All backups created and verified
- [ ] Updated configuration files prepared
- [ ] Secrets and credentials extracted
- [ ] Maintenance window scheduled and communicated
- [ ] Team ready for execution and monitoring

## Platform update execution

:::info Component Update Order (TODO Verify)
For optimal stability and minimal risk, follow this recommended component update sequence:

1. **Elasticsearch/OpenSearch** - Data layer
2. **Orchestration Cluster** (non-gateway nodes first) - Core processing engine
4. **Optimize** (can be updated in parallel) - Web applications
5. **Identity/Keycloak** - Authentication and authorization
6. **Connectors** - Integration components
7. **Web Modeller and Console** - Design and management components do not have dependency on Orchestration cluster
7. **Application and Job Workers** - when needed

:::

Choose your deployment method and follow the appropriate upgrade procedures:

### Helm chart Upgrade

For Kubernetes deployments using the Camunda Helm chart, follow the dedicated technical upgrade guide:

<DocCardList items={[{type:"link", href:"/docs/next/self-managed/installation-methods/helm/upgrade/upgrade-hc-870-880/", label: "Helm chart Upgrade: 8.7 to 8.8", docId:"self-managed/installation-methods/helm/upgrade/upgrade-hc-870-880"}
]}/>

This guide provides:

- Detailed Helm upgrade procedures
- Version-specific configuration changes
- Component-by-component update steps
- Troubleshooting guidance for common issues


### Docker Images Update

Make sure to download latest images for [Air-Gapped environments](/docs/self-managed/installation-methods/helm/configure/air-gapped-installation).

For production deployments using Docker images:

:::info Docker vs Docker Compose
Docker images are supported for production usage on Linux systems. Camunda provided Docker Compose files are designed for development environments only and should not be used in production. For production, we recommend to use Kubernetes or develop your own customer deployment procedure with one of the Infrastructure as Code systems (i.e., Terraform, Ansible, Cloud Formation and etc.).
:::

**Core update procedure:**
The following procedure assumes that Camunda performed by Helm charts

2. **Pull new images**: Update to 8.8.0 image tags from Docker Hub
3. **Update configurations**: Apply 8.8-specific configuration changes
4. **Run migrations**: Execute Optimize migration if applicable
5. **Start updated containers**: Launch containers with new images and configurations

**Available production images:** (TODO verify)

- **Zeebe, Operate, Tasklist and Identity unified image**: `camunda/zeebe:8.8.0`
- **Connectors**: `camunda/connectors:8.8.0`

## Platform validation and monitoring

After completing the technical upgrade steps, perform comprehensive validation across all deployment methods.

### Component health verification (TODO consider if this is needed)(

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


**Platform metrics:**

- Monitor process execution times
- Check task completion rates
- Verify import/export lag in Operate/Tasklist
- Validate Optimize report generation

## Troubleshooting platform issues

### Common upgrade issues

For detailed troubleshooting of Helm-specific upgrade issues:

- **[Helm upgrade troubleshooting](/self-managed/installation-methods/helm/upgrade/helm-870-880.md#troubleshooting)**

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

## Platform Restore procedure

If critical issues are discovered, follow the platform restore procedure:

:::caution restore limitations
Camunda 8 doesn't support automatic rollbacks once data migrations have completed. 
:::

### Helm Restore (TODO )


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

- **[Helm chart upgrade guide: 8.7 to 8.8](../../../self-managed/installation-methods/helm/upgrade/helm-870-880.md)** - Detailed technical upgrade steps
- **[Backup and restore guide](/self-managed/operational-guides/backup-restore/backup-and-restore.md)** - Comprehensive backup procedures
- **[Troubleshooting guides](/self-managed/operational-guides/troubleshooting/troubleshooting.md)** - Issue resolution procedures
