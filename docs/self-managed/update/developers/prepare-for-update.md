---
id: prepare-for-dev-update
title: "Developer Guide: Prepare for Update"
description: "Prepare your development environment and applications for the Camunda 8.8 update on Self-Managed."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide provides detailed steps for developers to prepare their applications and local development environments before the platform update to Camunda 8.8.
TODO add explanation of breaking changes (Identity? CPT? ) if any and other info
Preparing your applications for Camunda 8.8 requires upgrade of an SDK, environment updates, and testing changes. This guide walks you through each step to ensure a smooth transition.

## Step 1: Application assessment and planning

First, understand what applications you have and what needs to change.

### Create application inventory

**For each application, document:**

- Current SDK versions
- Custom connectors used
- Job worker implementations
- Testing setup (ZPT vs CPT)
- Authentication configuration
- API integrations

### Assess migration requirements

**SDK migration needs:**

- Check for Spring Zeebe usage (community version)
- Check for Zeebe Process Test usage
- Check for job-based user task implementations

**API endpoint usage:**

Check for v1 API endpoint usage to replace them with the Orchestration Cluster API v2.

## Step 2: Update development environment

Prepare your development environment for Camunda 8.8.

### Local development setup

**Install new SDK versions:**

<Tabs>
<TabItem value="java" label="Java/Spring">

```xml
<!-- Add to pom.xml -->
<dependency>
  <groupId>io.camunda.spring</groupId>
  <artifactId>spring-boot-starter-camunda</artifactId>
  <version>8.8.0</version>
</dependency>
```

```gradle
// Add to build.gradle
implementation 'io.camunda.spring:spring-boot-starter-camunda:8.8.0'
```

</TabItem>
<TabItem value="nodejs" label="Node.js">

```bash
# Install official NodeJS SDK
npm install @camunda8/sdk@^8.8.0
```

```json
// Update package.json
{
  "dependencies": {
    "@camunda8/sdk": "^8.8.0"
  }
}
```

</TabItem>
</Tabs>

### CI/CD pipeline updates

**Update build configurations:**

- Update dependency versions in CI/CD scripts
- Update Docker base images for application builds
- Update test execution environments

**Test environment configuration:**

- Update test environment Camunda versions
- Configure test data and fixtures for 8.8
- Update integration test configurations

## Step 3: Migrate SDKs and client libraries

Update applications to use the new official SDKs.

:::warning SDK Changes
Spring Zeebe community libraries are replaced by official Camunda SDKs in 8.8:

- **Spring Zeebe Starter** → **Official Spring Zeebe SDK**
- **Zeebe Node.js Client** → **Official NodeJS SDK**

These changes require code modifications and dependency updates.
:::

### SDK migration

<Tabs>
<TabItem value="java-spring" label="Java/Spring">

**Replace community Spring Zeebe with official SDK:**

```xml
<!-- Remove old dependency -->
<!--
<dependency>
  <groupId>io.camunda</groupId>
  <artifactId>spring-zeebe-starter</artifactId>
  <version>8.5.x</version>
</dependency>
-->

<!-- Add new official SDK -->
<dependency>
  <groupId>io.camunda.spring</groupId>
  <artifactId>spring-boot-starter-camunda</artifactId>
  <version>8.8.0</version>
</dependency>
```

**Update application code:**

```java
// Old import (community version)
// import io.camunda.zeebe.spring.client.annotation.JobWorker;

// New import (official SDK)
import io.camunda.zeebe.spring.client.annotation.JobWorker;

// Configuration class updates
@Configuration
@EnableZeebeClient
public class CamundaConfiguration {
  // Update configuration as needed for new SDK
}
```

</TabItem>
<TabItem value="nodejs" label="Node.js">

**Update package.json:**

```json
{
  "dependencies": {
    "@camunda8/sdk": "^8.8.0"
  }
}
```

**Update application code:**

```javascript
// Old client instantiation
// const ZeebeClient = require('zeebe-node');

// New SDK usage
const { Camunda8 } = require("@camunda8/sdk");

const camunda8 = new Camunda8({
  // Configuration for 8.8
});
```

</TabItem>
</Tabs>

## Step 4: Update testing frameworks
TODO Check validity
Migrate from deprecated testing tools to new frameworks.

:::warning Breaking Change: Testing Framework Migration
Zeebe Process Test (ZPT) is deprecated in favor of Camunda Process Test (CPT):

- **All ZPT dependencies** must be replaced with CPT
- **Test class annotations** change from `@ExtendWith` to `@CamundaProcessTest`
- **API method signatures** have changed - review test implementations
- **Configuration approach** has been simplified in CPT

Plan adequate time for test migration and validation.
:::

### Camunda Process Test (CPT) migration

**Replace Zeebe Process Test:**

```xml
<!-- Remove old testing dependency -->
<!--
<dependency>
  <groupId>io.camunda</groupId>
  <artifactId>zeebe-process-test-extension</artifactId>
  <version>8.5.x</version>
  <scope>test</scope>
</dependency>
-->

<!-- Add new Camunda Process Test -->
<dependency>
  <groupId>io.camunda</groupId>
  <artifactId>camunda-process-test-spring</artifactId>
  <version>8.8.0</version>
  <scope>test</scope>
</dependency>
```

**Update test classes:**

```java
// Old test setup (ZPT)
// @ExtendWith(ZeebeProcessTestExtension.class)
// class ProcessTest {
//   @Test
//   void testProcess(ZeebeTestEngine engine) {
//     // test implementation
//   }
// }

// New test setup (CPT)
@CamundaProcessTest
class ProcessTest {
  @Test
  void testProcess(CamundaProcessTestContext context) {
    // Updated test implementation
  }
}
```

## Step 5: Prepare custom connectors

Update custom connectors for 8.8 compatibility.

### Connector runtime updates

**Update connector dependencies:**

```xml
<!-- Update connector runtime dependencies -->
<dependency>
  <groupId>io.camunda.connector</groupId>
  <artifactId>connector-runtime-spring</artifactId>
  <version>8.8.0</version>
</dependency>
```

**Test connector functionality:**

- Validate connector implementations
- Test connector authentication with new authorization model
- Verify connector registration and discovery

### Custom job workers

**Update job worker implementations:**

- Review job worker authentication
- Update client configurations for new cluster API
- Test job activation and completion flows

## Step 6: Authentication configuration updates

Prepare applications for new authentication model.

### Client credential updates

<Tabs>
<TabItem value="java-spring" label="Java/Spring">

**Review authentication settings:**

```bash
# Update application.properties for new authentication
camunda.client.auth.clientId=your-client-id
camunda.client.auth.clientSecret=your-client-secret
camunda.client.auth.issuer=https://<IDENTITY_HOST>/auth/realms/camunda-platform
```

**Test authentication flows:**

- Test application authentication with Identity
- Verify resource access permissions
- Test token renewal and refresh

</TabItem>
<TabItem value="nodejs" label="Node.js">

**Review authentication settings:**

```javascript
// Update authentication configuration
const camunda8 = new Camunda8({
  auth: {
    clientId: "your-client-id",
    clientSecret: "your-client-secret",
  },
  // Update endpoints for orchestration cluster API
});
```

**Test authentication flows:**

- Test application authentication with Identity
- Verify resource access permissions
- Test token renewal and refresh

</TabItem>
</Tabs>

### OIDC integration updates

**Update OIDC configurations:**

- Update OIDC provider configurations
- Test mapping rules for orchestration cluster
- Verify user group and role assignments

## Step 7: Development environment testing

Validate your updated development environment with comprehensive testing procedures.

### Application compatibility validation

**Test SDK migration completeness:**

<Tabs>
<TabItem value="java-spring" label="Java/Spring">

```bash
# Verify new SDK dependencies are properly configured
mvn dependency:tree | grep -E "(camunda|zeebe)" | grep -v "spring-zeebe-starter"

# Check for compilation issues with new SDK
mvn clean compile

# Run unit tests with new testing framework
mvn test -Dtest="*ProcessTest*"

# Validate job worker functionality
mvn test -Dtest="*JobWorkerTest*"
```

</TabItem>
<TabItem value="nodejs" label="Node.js">

```bash
# Verify new SDK installation
npm list @camunda8/sdk

# Check for compilation/build issues
npm run build

# Run tests with new SDK
npm test

# Validate connector functionality
npm run test:connectors
```

</TabItem>
</Tabs>

### Local testing

**Test development workflow:**

```bash
# Start local Camunda 8.8 environment
docker-compose -f docker-compose-dev.yml up -d

# Wait for services to be ready
sleep 30

# Deploy test processes
zbctl --insecure deploy src/test/resources/test-process.bpmn

# Execute end-to-end application tests
npm test # or mvn test

# Verify debugging and development tools work
curl -s localhost:8081/api/v1/process-definitions | jq 'length'
```

**Validate application functionality:**

```bash
# Test process deployment with your application
curl -X POST localhost:8080/api/processes/deploy \
  -F "file=@test-process.bpmn"

# Test job worker execution
curl -X POST localhost:8080/api/jobs/activate \
  -H "Content-Type: application/json" \
  -d '{"type": "test-task", "worker": "test-worker"}'

# Test user task operations
curl -s localhost:8080/api/tasks | jq 'length'

# Test API integrations with new endpoints
curl -s localhost:8080/api/v2/process-instances | jq 'length'
```

### Breaking changes validation

**Verify deprecated functionality removal:**

```bash
# Check for removed ZPT dependencies
find . -name "pom.xml" -exec grep -l "zeebe-process-test" {} \; | wc -l

# Verify no V1 API usage remains
grep -r "/v1/" src/ --include="*.java" --include="*.js" --include="*.ts" | wc -l

# Check for job-based user task implementations
grep -r "JobWorker.*UserTask" src/ --include="*.java" | wc -l
```

**Test authentication changes:**

```bash
# Test new authentication flow
curl -X POST "localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=demo&password=demo&grant_type=password&client_id=camunda-identity"

# Verify application can authenticate with new flow
curl -H "Authorization: Bearer $TOKEN" localhost:8080/api/v2/user
```

### Integration testing

**Test with updated platform:**

- Test application deployment to 8.8 environment
- Validate authentication and authorization
- Test performance and resource usage
- Verify monitoring and logging

## Step 8: Coordinate with platform administrators

Ensure proper coordination for the update process.

### Update sequencing

**Coordinate timing:**

- Understand platform update schedule
- Plan application deployment after platform update
- Prepare for rollback scenarios
- Test compatibility in staging environment

**Communication plan:**

- Establish communication channels with platform team
- Define rollback triggers and procedures
- Plan validation checkpoints
- Document dependencies and requirements

### Validation readiness

**Prepare validation tests:**

- End-to-end process tests
- Integration tests with external systems
- Performance benchmarks
- User acceptance test scenarios

## Developer preparation checklist

- [ ] Application inventory completed
- [ ] Migration requirements assessed
- [ ] Development environment updated
- [ ] SDK migration completed
- [ ] Testing frameworks updated
- [ ] Custom connectors validated
- [ ] Authentication configurations updated
- [ ] Integration testing completed
- [ ] CI/CD pipelines updated
- [ ] Coordination with platform team established
- [ ] Validation tests prepared
- [ ] Rollback procedures documented

## Next steps

With application preparation complete, coordinate with platform administrators for the update execution following the [run update guide](./run-update.md).

**Key coordination points:**

- Wait for platform update completion
- Deploy updated applications with new dependencies
- Execute comprehensive validation tests
- Monitor application performance and functionality

For additional SDK migration guidance, see the [migration documentation](/apis-tools/migration-manuals/migrate-to-camunda-api.md) for detailed migration instructions.
