---
id: plan-admin-update
title: "Plan an update"
description: "Plan your update to Camunda 8.8 on Self-Managed - Administrator guide."
---

A successful Camunda 8.8 update requires thorough planning. This guide helps you assess your infrastructure, understand operational requirements, and choose the right update strategy for your environment.

## Step 1: Identify your upgrade path

Determine your current and target versions to plan the update path.

### Current version assessment

**First, identify your current Camunda versions:**

```bash
# Check Kubernetes deployment versions
kubectl get pods -l app.kubernetes.io/instance=camunda-platform -o jsonpath='{range .items[*]}{.metadata.name}{"\t"}{.spec.containers[0].image}{"\n"}{end}'

# Check Helm chart version
helm list | grep camunda-platform
```

### Sequential update requirement

**Important**: Update through each minor version. Do not skip versions.

**Update path examples:**

- **Correct**: 8.5 → 8.6 → 8.7 → 8.8
- **Incorrect**: 8.5 → 8.8 (skips versions)

**Why?** Each version may include data migrations that later versions require.

### Component coordination

**Plan to update all core components together:**

- Zeebe cluster
- Operate, Tasklist, Optimize
- Identity (Keycloak)
- Elasticsearch/OpenSearch

**Tip**: Use the latest patch release (8.8.x) to get all bug fixes.

### Version-specific considerations

Review the [supported environments](/reference/supported-environments.md#component-version-matrix) to understand version compatibility requirements.
Always check the [release notes](/reference/announcements-release-notes/880/880-release-notes.md) for version-specific recommendations.

## Step 2: Assess platform changes

Review what changes between your current version and 8.8.

### Major architectural changes

**Orchestration cluster (new in 8.8):**

- Combines Zeebe, Operate, and Tasklist into one orchestration cluster
- Reduces operational complexity
- Simplifies monitoring and scaling
- Unified configuration management

**Deployment impact:**

- Fewer containers to manage
- Streamlined Helm chart structure
- New resource allocation patterns
- Updated networking requirements

### Component updates

**Operate & Tasklist:**

- Enhanced user management
- New export mechanisms
- Version alignment required with Zeebe
- Automatic data migration during startup

### Authentication & Authorization

- **New authorization model**: Cluster-level resource authorizations replace previous model
- **Identity separation**: Orchestration cluster vs. Management cluster permission management
- **LDAP removal**: LDAP authentication no longer supported for Operate and Tasklist
- **Identity Migration Application**: Tool for migrating entities from Management Identity to Orchestration Cluster Identity
- **User storage changes**: Removal of Operate and Tasklist user storage in Elasticsearch/OpenSearch

### Optimize

:::caution Sequential updates required
Optimize **cannot skip versions**. You must update sequentially and run migrations for each version.
:::

- Requires shutdown during migration (downtime expected)
- Automatic schema migration on startup
- Significant data model changes between versions
- Schedule dedicated maintenance window
- Ensure sufficient disk space (up to 2x current usage during migration)

### Identity (Keycloak)

- Camunda 8.7: Requires Keycloak 25 or 26
- Camunda 8.8: Check compatibility matrix for supported versions
- Database schema upgrades may be required

## Step 3: Check infrastructure compatibility

Verify that your infrastructure meets the requirements for Camunda 8.8.

### Supported environments

Review the [supported environments](/reference/supported-environments.md) for:

- **Elasticsearch/OpenSearch versions**: 8.8 requires Elasticsearch 8.16+
- **Java runtime requirements**: Check minimum JDK versions
- **Kubernetes versions**: Verify cluster compatibility
- **Operating system support**: Confirm OS compatibility

### Database requirements

**Elasticsearch/OpenSearch:**

- **8.8 requirement**: Elasticsearch 8.16+ or compatible OpenSearch version
- **Migration needed**: If using Elasticsearch 7.x or older OpenSearch versions
- **Upgrade timing**: Database must be upgraded before Camunda components

**PostgreSQL (for Web Modeler):**

- Check version compatibility requirements
- Plan database backup before upgrade

### Resource requirements

**Component resources:**

- **Identity/Keycloak**: Increased CPU/RAM requirements in recent versions
- **Elasticsearch**: Default node count changed from 2 to 3 in 8.6
- **Orchestration cluster**: New resource allocation patterns in 8.8

**Infrastructure capacity:**

- Ensure Kubernetes cluster has sufficient capacity
- Plan for temporary resource increases during migration
- Consider storage requirements for data migration

## Step 4: Develop update strategy

Choose an update approach that meets your availability and risk requirements.

### Rolling update strategy (8.5+)

**When to use:**

- Current version is 8.5 or later
- Minimal downtime requirements
- One minor version increment (e.g., 8.7 → 8.8)

**Process overview:**

1. Update Zeebe brokers one by one
2. Update Zeebe gateways
3. Update Operate and Tasklist
4. Update other components

**Considerations:**

- Brief partition unavailability during broker restarts
- Leadership rotation may cause temporary performance impact
- Client applications continue processing with minor interruptions

### Offline update strategy

**When to use:**

- Current version is 8.4 or earlier
- Major infrastructure changes required
- Data schema migrations with significant changes
- Organizational preference for controlled downtime

**Process overview:**

1. Schedule maintenance window
2. Stop all Camunda components
3. Update infrastructure (databases, etc.)
4. Update all Camunda components
5. Restart and validate

### Blue-green deployment

**When to use:**

- Zero-downtime requirements
- Complex update scenarios
- Large-scale production environments

**Limitations:**

- Camunda doesn't natively support live process instance migration
- Requires process draining or read-only periods
- Higher infrastructure costs during transition

## Step 5: Create update timeline

Develop a realistic timeline that accounts for all phases of the update.

### Pre-update phase (1-2 weeks)

- Environment preparation and testing
- Configuration updates and validation
- Backup procedures testing
- Infrastructure capacity planning

### Update execution (varies by strategy)

**Rolling update:** 2-4 hours for complete cluster

**Offline update:** 30 minutes to 2 hours depending on data size

**Blue-green:** Several hours for environment setup and migration

### Post-update validation (1-2 days)

- Platform functional testing and validation
- Performance monitoring and optimization
- Infrastructure issue resolution
- Documentation updates

## Next steps

Once you've completed your update planning:

1. **Review your plan** with relevant teams and stakeholders
2. **Document the strategy** including rollback procedures for the platform
3. **Proceed to preparation** following the [prepare for update guide](./prepare-for-update.md)

For additional guidance, consult the existing [update guide introduction](/self-managed/operational-guides/update-guide/introduction.md) and version-specific update documentation.
