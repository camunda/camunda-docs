---
id: plan-dev-update
title: "Developer Guide: Plan for Update"
description: "Plan your update to Camunda 8.8 on Self-Managed - Developer guide."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Planning your application updates for Camunda 8.8 is crucial for success. This guide helps you assess compatibility, understand code changes needed, and plan your migration strategy.

## Step 1: Identify your application dependencies

First, understand what your applications currently use and what needs to change.

### Current dependency scan

**Find all Camunda dependencies in your applications:**

<Tabs>
<TabItem value="linux-mac" label="Linux/macOS">

```bash
# Java/Spring applications
grep -r "zeebe\|camunda" pom.xml  # Maven
grep -r "zeebe\|camunda" build.gradle  # Gradle

# Node.js applications
grep -r "zeebe\|camunda" package.json

# Get detailed dependency tree
mvn dependency:tree | grep -E "zeebe|camunda"  # Maven
npm list | grep -E "zeebe|camunda"  # Node.js
```

</TabItem>
<TabItem value="windows" label="Windows">

```bash
# Java/Spring applications
Select-String -Path "pom.xml" -Pattern "zeebe|camunda"  # Maven
Select-String -Path "build.gradle" -Pattern "zeebe|camunda"  # Gradle

# Node.js applications
Select-String -Path "package.json" -Pattern "zeebe|camunda"

# Get detailed dependency tree
mvn dependency:tree | Select-String "zeebe|camunda"  # Maven
npm list | Select-String "zeebe|camunda"  # Node.js
```

**Alternative using Git Bash (if available):**

```bash
# Same commands as Linux/macOS work in Git Bash
grep -r "zeebe\|camunda" pom.xml
grep -r "zeebe\|camunda" build.gradle
grep -r "zeebe\|camunda" package.json
mvn dependency:tree | grep -E "zeebe|camunda"
npm list | grep -E "zeebe|camunda"
```

</TabItem>
</Tabs>

### SDK compatibility check

**Important**: Check if your current SDKs work with Camunda 8.8.

- **New official SDKs** are forward-compatible
- **Older community libraries** need updates
- **Custom integrations** may need changes

### Compatibility matrix

Check the [supported environments](/reference/supported-environments.md#component-version-matrix) for SDK compatibility requirements.

## Step 2: Assess application changes

Review the changes that will affect your applications between current and target versions.

:::warning Major Changes in 8.8
Camunda 8.8 introduces significant breaking changes that require application updates:

- **Orchestration Cluster API** replaces individual component V1 APIs
- **Zeebe Process Test (ZPT)** deprecated - migrate to Camunda Process Test (CPT)
- **Job-based User Tasks** deprecated - migrate to Camunda User Tasks
- **Authentication model** changes affect custom integrations

Plan for these changes early as they require code modifications and testing.
:::

### New Orchestration Cluster API

**What's changing:**

- V1 APIs → New unified cluster API
- Component-specific endpoints → Single API surface
- Old authentication → Cluster-level auth model

**Impact on your apps:**

- API endpoint URLs change
- Authentication flow updates
- SDK migration required

### SDK migration requirements

**Required changes:**

- **Spring apps**: Community Spring-Zeebe → Official SDK
- **Node.js apps**: Old client → Official NodeJS SDK
- **All apps**: Update authentication code

**Benefits:**

- Forward compatibility with future versions
- Better support and documentation
- Improved performance and features

### Testing framework changes

- **Zeebe Process Test (ZPT) deprecated**: Replaced with new Camunda Process Test (CPT) library
- **Migration required**: Applications using ZPT must migrate to CPT
- **Testing capabilities**: CPT provides enhanced testing features and better integration
- **Job-based User Tasks deprecated**: Migration guidance provided for moving to Camunda User Tasks

### Authentication & Authorization changes

- **Application authentication**: Must migrate to new cluster-level authentication
- **Resource permissions**: Applications need updates to work with new authorization model
- **Client credentials**: May require new client configurations for cluster access
- **OIDC mapping**: Mapping rules for orchestration cluster managed in Orchestration Cluster Identity

### API endpoint changes

- Deprecation of Zeebe, Operate and Tasklist REST APIs in favor of the unified [Orchestration Cluster API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md)
- Authentication method changes for programmatic access
- User and group management APIs updated
- Task query and management API changes

### Custom integrations impact

- OIDC configuration changes may affect application authentication
- Custom Identity providers need validation
- User management API changes if applications manage users programmatically

## Step 3: Check development environment compatibility

Verify that your development environment and applications are ready for 8.8.

### Development environment

**Local setup:**

- Update development tools and IDEs with compatible versions
- Install new SDK versions in development environments
- Update local testing infrastructure (testcontainers, embedded databases)

**CI/CD pipelines:**

- Update build tools and dependency versions
- Modify automated tests to use new testing frameworks
- Update deployment scripts and configuration

### Application dependencies

**Client libraries:**

- Identify all Camunda client libraries in use
- Plan migration from community libraries to official SDKs
- Update dependency management files (pom.xml, package.json, etc.)

**Custom connectors:**

- Review custom connector implementations for compatibility
- Plan migration to new connector runtime if needed
- Test connector functionality with new SDK versions

**Integration points:**

- Review API integrations that may be affected by endpoint changes
- Update authentication mechanisms for new authorization model
- Test external system integrations with updated platform

## Step 4: Develop application update strategy

Choose an update approach that meets your application requirements and risk tolerance.

### Coordinated deployment (recommended)

Deploy updated applications after platform update completion:

**Application strategy:**

- Deploy updated applications after platform update completes
- Test applications thoroughly in staging environment first
- Plan for gradual rollout of application updates
- Ensure client libraries are compatible during transition period

### Gradual rollout

For complex environments, roll out application updates gradually:

**Application strategy:**

- Coordinate application updates with platform maintenance window
- Test complete end-to-end functionality after platform update
- Update all application dependencies simultaneously
- Validate integrations and custom components thoroughly

## Step 5: Create application update timeline

Develop a realistic timeline that accounts for all phases of application updates.

### Pre-update phase (1-2 weeks)

- Application dependency updates and testing
- SDK migration and validation
- Test environment setup with new versions
- CI/CD pipeline updates

### Update execution (coordinated with platform update)

**Coordinate with platform administrators** for proper sequencing of platform and application updates

### Post-update validation (1-2 days)

- Application integration testing
- End-to-end workflow validation
- Performance testing and optimization
- User acceptance testing coordination

## Step 6: Application migration requirements

### SDK migration needs

**Check for deprecated tools:**

```bash
# Check for Spring Zeebe usage (community version)
grep -r "spring-zeebe" . --include="*.xml" --include="*.gradle" --include="*.json"

# Check for Zeebe Process Test usage
grep -r "zeebe-process-test" . --include="*.xml" --include="*.gradle" --include="*.json"

# Check for job-based user task implementations
grep -r "JobWorker.*UserTask\|@JobWorker.*user" . --include="*.java"
```

**API endpoint usage assessment:**

```bash
# Check for V1 API endpoint usage
grep -r "/v1/" . --include="*.java" --include="*.js" --include="*.ts" --include="*.properties"
grep -r "operate/api" . --include="*.java" --include="*.js" --include="*.ts"
grep -r "tasklist/api" . --include="*.java" --include="*.js" --include="*.ts"
```

### Required application updates

**Spring applications:**

- Migrate from ZPT to CPT testing framework
- Update authentication configurations
- Test job worker implementations

**Node.js applications:**

- Update to official NodeJS SDK
- Update API endpoint configurations
- Test authentication flows
- Validate connector integrations

**Custom connectors:**

- Update connector runtime dependencies
- Test with new authorization model
- Validate registration and discovery
- Update authentication mechanisms

## Next steps

Once you've completed your application update planning:

1. **Review your plan** with development teams and stakeholders
2. **Coordinate with platform administrators** for update sequencing
3. **Document the strategy** including rollback procedures for applications
4. **Proceed to preparation** following the [prepare for update guide](./prepare-for-update.md)

For additional guidance on specific SDK migrations, consult the [migration documentation](/apis-tools/migration-manuals/migrate-to-camunda-api.md) for detailed migration instructions.
