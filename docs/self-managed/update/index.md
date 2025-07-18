---
title: "Camunda 8.8 Self-Managed Update Guide"
description: "Comprehensive guide for updating your Camunda 8 Self-Managed installation to version 8.8, including architectural changes, migration planning, and execution strategies."
---

Update your Camunda 8 Self-Managed installation to version 8.8 with confidence. This comprehensive guide provides detailed technical guidance, migration strategies, and coordination procedures for both platform administrators and application developers.

## About this update

Camunda 8.8 represents a significant architectural evolution that affects both infrastructure deployment and application integration. This update introduces the new **orchestration cluster architecture**, unified APIs, and enhanced authentication models while deprecating several legacy components.

**Update complexity**: **Moderate to High**

- **Infrastructure changes**: New orchestration cluster architecture
- **Application changes**: SDK migration and API updates required
- **Data migrations**: Automatic schema updates during startup
- **Authentication changes**: New permission model and LDAP deprecation

## Update requirements and compatibility

### Prerequisites

Before beginning this update, ensure you meet these requirements:

**Current version requirements:**

- **Must be on 8.7.x**: You cannot skip versions (e.g., 8.6 → 8.8)
- **Latest patch recommended**: Update to latest 8.7.x patch before upgrading
- **Sequential updates only**: Each minor version must be updated through

**Infrastructure compatibility:**

- **Elasticsearch 8.16+**: Earlier versions not supported in 8.8
- **Java 21+**: Required for all Camunda components
- **Kubernetes 1.28+**: For Helm chart deployments
- **Helm 3.10+**: For Kubernetes deployments

**Component version alignment:**

- **Exact version matching**: All Camunda components must use identical versions (8.8.0)
- **No mixed versions**: Cannot run 8.7 components alongside 8.8 components
- **Coordinated update**: All components update together in sequence

### Summary of major changes

:::warning Breaking Changes
Camunda 8.8 includes breaking changes that **require** application code updates and infrastructure modifications. Plan accordingly.
:::

**API and SDK changes:**

- V1 component APIs deprecated → Migrate to Orchestration Cluster API
- Community Spring Zeebe deprecated → Migrate to official Camunda Spring Boot SDK
- Zeebe Process Test (ZPT) deprecated → Migrate to Camunda Process Test (CPT)
- Job-based User Tasks deprecated → Migrate to Camunda User Tasks

**Authentication and authorization:**

- LDAP authentication removed for Operate/Tasklist → Migrate to Identity/OIDC
- New cluster-level permission model → Update role assignments
- Separate orchestration vs management permissions → Reconfigure access controls

**Infrastructure changes:**

- New orchestration cluster architecture → Update deployment configurations
- Unified configuration schema → Migrate configuration files
- Updated Helm chart structure → Review and update values.yaml

## Architectural changes in 8.8

### Orchestration cluster introduction

Camunda 8.8 introduces the **orchestration cluster** - a unified deployment model that combines Zeebe, Operate, and Tasklist into a single cluster.

**Benefits of orchestration cluster:**

- **Simplified deployment**: Single cluster instead of multiple independent applications
- **Unified configuration**: Shared configuration schema across all components
- **Better resource efficiency**: Optimized resource allocation and scaling
- **Enhanced monitoring**: Centralized metrics and health checking
- **Reduced operational complexity**: Fewer moving parts to manage

### API unification

**New Orchestration Cluster API** replaces individual component V1 APIs:

| **Deprecated V1 APIs** | **New Unified API**       |
| ---------------------- | ------------------------- |
| Zeebe Gateway API      | Orchestration Cluster API |
| Operate V1 API         | Orchestration Cluster API |
| Tasklist V1 API        | Orchestration Cluster API |

**Detailed migration guide:**
For step-by-step instructions on migrating from V1 APIs to the new Orchestration Cluster API, see the [Migration to Orchestration Cluster API guide](/apis-tools/migration-manuals/migrate-to-camunda-api.md).

### SDK migration requirements

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="java" label="Java/Spring">

**Deprecated Community Libraries:**

```xml
<!-- Remove these deprecated dependencies -->
<dependency>
    <groupId>io.camunda.spring</groupId>
    <artifactId>spring-boot-starter-camunda</artifactId>
    <version>8.7.x</version> <!-- DEPRECATED -->
</dependency>

<dependency>
    <groupId>io.camunda</groupId>
    <artifactId>zeebe-process-test-extension</artifactId>
    <version>8.7.x</version> <!-- DEPRECATED -->
</dependency>
```

**New Official SDKs:**

```xml
<!-- Add these official SDKs -->
<dependency>
    <groupId>io.camunda</groupId>
    <artifactId>camunda-spring-boot-starter</artifactId>
    <version>8.8.0</version> <!-- NEW OFFICIAL SDK -->
</dependency>

<dependency>
    <groupId>io.camunda</groupId>
    <artifactId>camunda-process-test-spring</artifactId>
    <version>8.8.0</version> <!-- REPLACES ZPT -->
</dependency>
```

**Code migration examples:**

```java
// Before 8.8 (deprecated Spring Zeebe)
@ZeebeDeployment(resources = "classpath:process.bpmn")
@ZeebeSpringTest
class ProcessTest {
    @Autowired
    private ZeebeTestEngine engine;
}

// After 8.8 (official Camunda Spring SDK)
@Deployment(resources = "classpath:process.bpmn")
@CamundaSpringBootTest
class ProcessTest {
    @Autowired
    private CamundaProcessTestContext processTestContext;
}
```

</TabItem>
<TabItem value="nodejs" label="Node.js">

**Update to official SDK:**

```json
{
  "dependencies": {
    "@camunda/sdk": "^8.8.0"
  }
}
```

**API client changes:**

```javascript
// Before 8.8 (separate clients)
import { ZeebeGrpcClient } from "zeebe-node";
import { OperateApiClient } from "@camunda/operate-api-client";

// After 8.8 (unified client)
import { CamundaClient } from "@camunda/sdk";

const client = new CamundaClient({
  orchestrationClusterUrl: "https://cluster.example.com",
  // ... other config
});
```

</TabItem>
</Tabs>

### User Task migration

**Deprecated Job-based User Tasks:**

```javascript
// DEPRECATED: Job-based user task handling
zeebeClient.createWorker({
  taskType: "user-task",
  taskHandler: (job) => {
    // Manual user task job handling - DEPRECATED
  },
});
```

**New Camunda User Tasks:**

```javascript
// NEW: Native user task support
const userTasks = await client.userTasks.search({
  filter: { state: "CREATED" },
});

await client.userTasks.complete(taskId, {
  variables: { decision: "approved" },
});
```

**Detailed migration guide:**
For comprehensive instructions on migrating from job-based to Camunda User Tasks, see the [User Task Migration Guide](/apis-tools/migration-manuals/migrate-to-camunda-user-tasks.md).

### Authentication and authorization changes

#### LDAP deprecation

- **Before 8.8**: LDAP authentication supported for Operate/Tasklist
- **After 8.8**: LDAP authentication **removed** - must use Identity/OIDC

**Migration path:**

1. **Export LDAP users** before upgrade
2. **Configure Identity with OIDC provider** (Azure AD, Keycloak, etc.)
3. **Recreate user accounts** in Identity
4. **Assign appropriate permissions** using new permission model
5. **Test authentication** before production migration

#### New permission model

**Before 8.8** (application-specific permissions):

```yaml
# Separate permissions per application
operate:
  permissions: ["READ", "WRITE"]
tasklist:
  permissions: ["ASSIGN", "COMPLETE"]
```

**After 8.8** (cluster-level permissions):

```yaml
# Unified cluster permissions
orchestration-cluster:
  permissions:
    - "orchestration:process-definition:read"
    - "orchestration:process-instance:create"
    - "orchestration:user-task:complete"
management:
  permissions:
    - "management:user:create"
    - "management:role:assign"
```

**Permission migration:**

- **Orchestration permissions**: Process execution, user task management, incident resolution
- **Management permissions**: User/role administration, tenant management, audit access
- **Resource-level authorization**: Fine-grained access control per resource type

## Update planning framework

### Risk assessment

**Update risk factors:**

- **Moderate risk**: 8.7 → 8.8 includes significant architectural changes
- **Data migration**: Automatic but irreversible schema updates
- **Application dependencies**: SDK changes require code updates and testing
- **Authentication impact**: LDAP users need migration to Identity
- **Configuration changes**: Helm chart and deployment configuration updates required

**Risk mitigation strategies:**

- **Test environment validation**: Complete update in test environment first
- **Phased approach**: Update platform first, then applications
- **Rollback planning**: Maintain 8.7 backups for emergency rollback
- **Communication**: Coordinate between platform and development teams

### Update strategies

#### Rolling update (recommended for 8.7+)

**Suitable for:**

- Production environments requiring minimal downtime
- Current version 8.7.x
- Standard deployment configurations
- Team comfort with incremental updates

**Process:**

1. **Update Elasticsearch/OpenSearch** first
2. **Rolling update of Zeebe brokers** (one at a time)
3. **Update Zeebe gateways** sequentially
4. **Update Operate/Tasklist** as orchestration cluster
5. **Update remaining components** (Identity, Connectors, etc.)

**Expected downtime**: Minimal (brief partition unavailability during broker restarts)

#### Offline update (comprehensive)

**Suitable for:**

- Major infrastructure changes planned
- Complex customizations or integrations
- Team preference for controlled downtime
- 8.4-8.6 versions (rolling update not supported)

**Process:**

1. **Schedule maintenance window** (typically 2-4 hours)
2. **Stop all Camunda components** gracefully
3. **Update infrastructure** (databases, Kubernetes, etc.)
4. **Update all Camunda components** simultaneously
5. **Perform validation** and testing
6. **Resume operations** or rollback if needed

**Expected downtime**: 2-4 hours (depending on data volume and infrastructure)

### Team coordination requirements

**Platform administrators responsible for:**

<Tabs>
<TabItem value="helm" label="Kubernetes/Helm">

- **Kubernetes cluster management**: Version compatibility, resource capacity, node management
- **Helm chart updates**: Version upgrades, values.yaml configuration, release management
- **Container orchestration**: Pod lifecycle, service discovery, Ingress configuration
- **Storage management**: Persistent volumes, storage classes, backup integration
- **Authentication system migration**: LDAP → Identity/OIDC, RBAC configuration
- **Platform monitoring**: Kubernetes metrics, pod health, cluster-level alerting

</TabItem>
<TabItem value="docker" label="Docker">

- **Container management**: Docker image updates, container lifecycle, networking
- **Docker Compose orchestration**: Service configuration, volume management, networking
- **Infrastructure compatibility**: Docker version, host OS compatibility, resource allocation
- **Database management**: Elasticsearch/PostgreSQL containers, data persistence
- **Authentication system migration**: LDAP → Identity/OIDC, container-level security
- **Backup procedures**: Volume backups, container state management, data export

</TabItem>
<TabItem value="manual" label="Manual JAR">

- **Service management**: Systemd services, process lifecycle, startup scripts
- **JAR deployment**: Version updates, dependency management, configuration files
- **Infrastructure management**: OS compatibility, Java runtime, system resources
- **Database administration**: Direct Elasticsearch/PostgreSQL management, schema updates
- **Authentication system migration**: LDAP → Identity/OIDC, file-based configuration
- **Backup procedures**: File system backups, database dumps, configuration archives

</TabItem>
</Tabs>

**Application developers responsible for:**

- SDK migration and application code updates
- User task migration (job-based → Camunda User Tasks)
- API endpoint updates and testing
- Application testing with new orchestration cluster
- Performance validation and optimization

**Required coordination points:**

1. **Pre-update**: Agree on timeline, validate test environment, review rollback plans
2. **During update**: Platform readiness communication, application deployment coordination
3. **Post-update**: Validation confirmation, performance monitoring, issue resolution

## Update execution paths

Choose your role and follow the appropriate update path:

### **Platform Administrators** - Infrastructure and platform management

**You are responsible for:**

- Kubernetes clusters and Helm chart deployments
- Elasticsearch/OpenSearch databases and infrastructure
- Authentication systems (Identity, Keycloak, OIDC providers)
- Backup systems and disaster recovery procedures
- Platform monitoring and alerting systems

**Your update path:**

1. **[Plan your update](./administrators/plan-update.md)** - Infrastructure assessment and strategy planning
2. **[Prepare for update](./administrators/prepare-for-update.md)** - Backup creation and configuration updates
3. **[Run update](./administrators/run-update.md)** - Platform update execution and validation

### **Application Developers** - Applications and integrations

**You are responsible for:**

- Process applications and job workers using Camunda SDKs
- Custom connectors and integration applications
- Client applications consuming Camunda APIs
- Testing frameworks and development tooling
- User task implementations and UI applications

**Your update path:**

1. **[Plan your update](./developers/plan-update.md)** - Application assessment and SDK migration planning
2. **[Prepare for update](./developers/prepare-for-update.md)** - SDK migration and development environment setup
3. **[Run update](./developers/run-update.md)** - Application deployment and functionality validation

## Next steps

1. **Review the comprehensive planning guides** for your role
2. **Start with a test environment** to validate your specific configuration
3. **Coordinate with your counterpart team** (administrators ↔ developers)
4. **Plan your maintenance window** allowing sufficient time for validation

Both update paths include detailed step-by-step guidance, validation procedures, and troubleshooting recommendations tailored to your specific responsibilities.
