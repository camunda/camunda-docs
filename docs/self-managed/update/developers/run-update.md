---
id: run-dev-update
title: "Run update"
description: "Guide on how to run an update to Camunda 8.8 on Self-Managed - Developer guide."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Now it's time to deploy your updated applications to Camunda 8.8. This guide covers deployment, testing, and validation to ensure everything works correctly.

## Before you begin

**Make sure you've completed these steps:**

1. [Planned your application updates](./plan-update.md)
2. [Prepared your applications](./prepare-for-update.md)
3. Coordinated with platform administrators

**Ready to deploy? Check these items:**

- [ ] Platform update is complete
- [ ] Applications updated with new SDKs
- [ ] Tests updated to use Camunda Process Test (not Zeebe Process Test)
- [ ] Development environment working
- [ ] Coordination with platform team confirmed

## Application deployment strategy

Choose how to deploy your updated applications.

### Option 1: Coordinated deployment (recommended)

**Best for most environments:**

1. Wait for platform update to finish
2. Deploy all updated applications together
3. Monitor and validate functionality

**Pros:** Simple coordination, faster validation
**Cons:** All applications down if issues occur

### Option 2: Gradual rollout

**Best for complex environments:**

1. Deploy to staging first
2. Test thoroughly before production
3. Roll out applications in waves

**Pros:** Lower risk, easier troubleshooting
**Cons:** Takes longer, more coordination needed

## Step 1: Deploy updated applications

Update and deploy applications with new SDK versions and configurations.

<Tabs>
<TabItem value="java-spring" label="Java/Spring">

**Update and redeploy:**

```bash
# Build applications with updated dependencies
mvn clean package

# Deploy updated applications
kubectl apply -f updated-deployment.yaml

# Monitor application startup
kubectl logs deployment/your-app-name -f
```

**Verify SDK functionality:**

- Test basic Zeebe client connectivity
- Verify topology request success
- Check for any connection errors

</TabItem>
<TabItem value="nodejs" label="Node.js">

**Update and redeploy:**

```bash
# Install updated dependencies
npm install

# Build and deploy application
npm run build
kubectl apply -f updated-deployment.yaml

# Monitor application logs
kubectl logs deployment/your-node-app -f
```

**Verify SDK functionality:**

- Test new SDK connectivity
- Check for successful topology requests
- Monitor logs for connection issues

</TabItem>
</Tabs>

## Step 2: API endpoint migration

Migrate from Zeebe, Operate and Tasklist REST APIs to the new Orchestration Cluster API.

### Update API endpoints

<Tabs>
<TabItem value="java-spring" label="Java/Spring">

**Replace old endpoint patterns:**

- Replace any hardcoded URLs pointing to old Operate/Tasklist V1 APIs.
- Update your service discovery mechanisms to point to the new orchestration cluster API.

</TabItem>
<TabItem value="nodejs" label="Node.js">

**Replace old endpoint patterns:**

- Update any references to old V1 API endpoints in your Node.js code.
- Point all API requests to the new unified orchestration cluster endpoint.

</TabItem>
</Tabs>

**Update authentication:**

- Update authentication for new cluster API
- Configure client credentials for orchestration cluster
- Update token endpoints and scopes

### Test API functionality

**Process instance operations:**

```bash
# Test new API endpoints
curl -H "Authorization: Bearer $TOKEN" \
  "$CLUSTER_API_URL/api/process-instances"

# Test task operations
curl -H "Authorization: Bearer $TOKEN" \
  "$CLUSTER_API_URL/api/tasks"
```

## Step 3: Custom connector validation

Validate and update custom connectors for 8.8 compatibility.

### Test connector functionality

**Validate connector startup:**

```bash
# Monitor connector logs during startup
kubectl logs deployment/your-custom-connector -f

# Verify connector registration
# Check for authentication and authorization success
```

**Test connector operations:**

<Tabs>
<TabItem value="java-spring" label="Java/Spring">

- Test connector with new SDK
- Validate job activation and completion
- Test error handling and retry logic

</TabItem>
<TabItem value="nodejs" label="Node.js">

- Verify connector operations with new SDK
- Test job processing and variable handling
- Check for any breaking changes in connector behavior

</TabItem>
</Tabs>

## Step 4: Job worker validation

Ensure job workers function correctly with the updated platform.

### Test job worker connectivity

```java
// Test job worker with updated SDK
@JobWorker(type = "test-task")
public void handleTestTask(JobClient client, ActivatedJob job) {
    log.info("Processing job with key: {}", job.getKey());

    // Test job completion
    client.newCompleteCommand(job.getKey())
        .variables(Map.of("result", "success"))
        .send()
        .join();
}
```

**Monitor job processing:**

```bash
# Deploy test process
# Create process instances
# Monitor job worker logs
kubectl logs deployment/your-job-worker -f
```

## Step 5: Integration testing

Perform comprehensive integration testing with the updated platform.

### End-to-end process testing

**Deploy test processes:**

```bash
# Deploy test BPMN processes
zbctl deploy --insecure test-process.bpmn

# Create test instances
zbctl create instance --insecure test-process --variables '{"testData": "value"}'
```

**Validate process execution:**

- Test complete process flows
- Validate user task creation and completion
- Test message correlation and events
- Verify timer and scheduled processes

### Authentication and authorization testing

**Test application permissions:**

- Test resource access with new authorization model
- Validate user and group permissions
- Test token refresh and renewal

**Test integration points:**

- Test external system integrations
- Validate API authentication flows
- Test webhook and callback functionality

## Step 6: Performance validation

Monitor and validate application performance after the update.

### Application metrics

**Monitor key metrics:**

- Monitor application response times
- Check memory and CPU usage patterns
- Validate throughput and processing rates

**Test performance benchmarks:**

- Run performance tests against updated applications
- Compare metrics with pre-update baselines
- Identify any performance regressions

### Resource usage monitoring

```bash
# Monitor application resource consumption
kubectl top pods | grep your-app

# Check for resource constraint warnings
kubectl get events --field-selector reason=FailedScheduling
```

## Troubleshooting application issues

### SDK connectivity problems

- Check client configuration
- Verify authentication credentials
- Test network connectivity to cluster

### API endpoint issues

```bash
# Test new API endpoints directly
curl -H "Authorization: Bearer $TOKEN" \
  "$CLUSTER_API_URL/api/health"

# Check for endpoint availability
# Verify authentication and authorization
```

### Job worker issues

- Check job worker registration
- Verify job activation and completion
- Test error handling and retry logic

### Authentication failures

- Check client credentials configuration
- Verify token endpoint availability
- Test OIDC integration flows

### Performance issues

- Monitor application resource usage
- Check for memory leaks or excessive CPU usage
- Validate database connection pooling
- Test with reduced load to isolate issues

## Application rollback procedure

If critical application issues are discovered:

### Application rollback steps

1. **Revert application dependencies** to previous SDK versions
2. **Restore previous API endpoint configurations**
3. **Redeploy applications** with previous configurations
4. **Validate functionality** with rolled-back platform

**Example rollback:**

```bash
# Revert to previous application version
kubectl rollout undo deployment/your-app-name

# Monitor rollback
kubectl rollout status deployment/your-app-name

# Validate application functionality
curl -I localhost:8080/health
```

## Application validation

Perform comprehensive validation to ensure applications are functioning correctly with Camunda 8.8.

### Functional testing

**Basic application tests:**

```bash
# Test application health endpoints
curl -I localhost:8080/health

# Test application-specific functionality
curl -X POST localhost:8080/api/start-process \
  -H "Content-Type: application/json" \
  -d '{"processId": "test-process"}'

# Validate new SDK functionality
curl -X GET localhost:8080/api/status | jq '.sdk_version'
```

### SDK migration validation

**Verify SDK functionality:**

<Tabs>
<TabItem value="java-spring" label="Java/Spring">

```bash
# Test job worker functionality with new SDK
curl -X POST localhost:8080/api/test/job-worker \
  -H "Content-Type: application/json" \
  -d '{"type": "test-task"}'

# Verify process deployment works
curl -X POST localhost:8080/api/deploy \
  -F "file=@test-process.bpmn"

# Test new authentication integration
curl -H "Authorization: Bearer $APP_TOKEN" \
  localhost:8080/api/secure-endpoint

# Validate Camunda Process Test functionality
mvn test -Dtest="*ProcessTest*" -q
```

</TabItem>
<TabItem value="nodejs" label="Node.js">

```bash
# Test job worker functionality
curl -X POST localhost:3000/api/test/job-worker \
  -H "Content-Type: application/json" \
  -d '{"type": "test-task"}'

# Verify process deployment
curl -X POST localhost:3000/api/deploy \
  -F "file=@test-process.bpmn"

# Test new authentication
curl -H "Authorization: Bearer $APP_TOKEN" \
  localhost:3000/api/secure-endpoint

# Run test suite with new SDK
npm test -- --grep "ProcessTest"
```

</TabItem>
</Tabs>

### API endpoint migration validation

**Test new Orchestration Cluster API:**

```bash
# Test unified API endpoints
curl -s "localhost:8080/api/v2/process-instances" | jq 'length'
curl -s "localhost:8080/api/v2/tasks" | jq 'length'
curl -s "localhost:8080/api/v2/process-definitions" | jq 'length'

# Verify old V1 endpoints are no longer used
grep -r "/v1/" src/ --include="*.java" --include="*.js" --include="*.ts" || echo "No V1 usage found - Good!"

# Test authentication with new API
TOKEN=$(curl -X POST "localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=demo&password=demo&grant_type=password&client_id=camunda-identity" | jq -r '.access_token')

curl -H "Authorization: Bearer $TOKEN" "localhost:8080/api/v2/user"
```

### End-to-end workflow testing

**Process execution test:**

```bash
# Deploy a test process
zbctl deploy --insecure test-process.bpmn

# Create process instance via application
curl -X POST localhost:8080/api/start-process \
  -H "Content-Type: application/json" \
  -d '{"processId": "test-process", "variables": {"test": true}}'

# Verify in Operate
# Visit Operate UI and confirm process instances are visible
```

### User acceptance testing

**Manual validation steps:**

1. **Application functionality**: Test core application features
2. **Process workflows**: Validate end-to-end business processes
3. **User interfaces**: Test any custom UIs or dashboards
4. **Integration points**: Validate external system connections
5. **Error handling**: Test application error scenarios

### Performance testing

**Load testing:**

- Execute load tests with updated applications
- Monitor performance under normal and peak loads
- Validate resource scaling behavior

**Monitoring integration:**

- Verify application metrics collection
- Test alerting and notification systems
- Validate log aggregation and analysis

## Coordination with platform team

### Issue escalation

**When to escalate to platform team:**

- Application cannot connect to platform components
- Authentication/authorization failures
- Unexpected performance degradation
- Data consistency issues
- Platform API errors

## Next steps

After successful application update completion:

1. **Document changes** made during application updates
2. **Update CI/CD pipelines** with new dependency versions and deployment procedures
3. **Monitor applications** for stability and performance over time
4. **Plan future updates** incorporating lessons learned

### Ongoing maintenance

**SDK and dependency management:**

- Monitor for new SDK releases and security updates
- Test compatibility with platform updates
- Maintain development environment parity

**Performance monitoring:**

- Establish baseline metrics for updated applications
- Set up alerting for performance regressions
- Regular performance testing and optimization

For additional SDK and API guidance, consult the [APIs and Tools documentation](/apis-tools/working-with-apis-tools.md) for detailed usage instructions and best practices.
