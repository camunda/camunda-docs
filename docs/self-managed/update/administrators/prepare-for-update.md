---
id: prepare-for-admin-update
title: "Prepare and Plan an Update"
description: "Prepare and Plan your update to Camunda 8.8 on Self-Managed."
---

:::warning
This documentation page is a work in progress and may contain incomplete, placeholder, or evolving content. While the core concepts introduced in Camunda 8.8 are stable, details and sections here are actively being refined.

See [release announcements](/reference/announcements-release-notes/880/880-announcements.md), [release notes](/reference/announcements-release-notes/880/880-release-notes.md), and the [quality board](https://github.com/orgs/camunda/projects/187/views/15) for more detail on what's included in Camunda 8.8.
:::

A successful Camunda 8.8 update requires thorough planning. This guide helps you assess your infrastructure, understand operational requirements, and choose the right update strategy for your environment.

## Step 1: Identify your update path

- Determine your current and target versions to plan the update path.
- Update to the latest 8.7 patch version before starting update to 8.8
- All Orchestration cluster component should be updated together - ZeeBe, Operate, Tasklist and Identity.
- Review each none default configurations and changes made to Helm charts.

### Version-specific considerations

Review the [supported environments](/reference/supported-environments.md#component-version-matrix) to understand version compatibility requirements.
Always check the [release notes](/reference/announcements-release-notes/880/880-release-notes.md) for version-specific recommendations.
Always check the [Update release notes](../../operational-guides/update-guide/870-to-880.md)

## Step 2: Assess Camunda platform changes

Review changes between versions 8.7 and 8.8.

### Major architectural changes

**Orchestration cluster:**

- Combines Zeebe, Operate, Identity and Tasklist into one orchestration cluster and runs in a single Container/Java app.
- Simplifies monitoring and scaling
- Unified configuration management

**Deployment impact:**

- Fewer containers to manage
- Streamlined Helm chart structure with less deployments to manage
- New resource allocation patterns
- Updated networking requirements and reduced network traffic

### Component updates

**Operate, Identity & Tasklist:**

- Enhanced user management with new integrated Identity
- New streamlined exporter data pipeline
- Automatic data migration during startup
- HA deployment for all Orchestration cluster components

### Authentication & Authorization

- **New authorization model**: Cluster-level resource authorizations replace previous model
- **Identity separation**: Orchestration cluster vs. Management cluster permission management
- **LDAP removal**: LDAP authentication no longer supported for Operate and Tasklist
- **Identity Migration Application**: Tool for migrating entities from Management Identity to Orchestration Cluster Identity
- **User storage changes**: Removal of Operate and Tasklist user storage in Elasticsearch/OpenSearch

### Optimize

- Requires shutdown during migration (downtime expected)
- Automatic schema migration on startup for data schema migration between versions
- Schedule dedicated maintenance window

### Identity (Keycloak)

- Camunda 8.7: Requires Keycloak 25 or 26
- Camunda 8.8: Check compatibility matrix for supported versions
- Database schema upgrades may be required

## Step 3: Check infrastructure compatibility

Verify that your infrastructure meets the requirements for Camunda 8.8.

### Resource requirements

**Component resources:**

- **Orchestration cluster**: New resource allocation patterns in 8.8. Consolidated resource allocation of 8.7 components in to a single ZeeBe Stateful set. Now all the components share the same CPU, Memeory resources limits and requests, optimizing their utilization. We do recommend scheduling performance study to understand resource utililzation for your specific use case and load.

**Infrastructure capacity:**

- Plan for temporary resource increases during migration
- Consider storage requirements for data migration

## Step 4: Develop update strategy

Choose an update approach that meets your availability and risk requirements.
If you use Camunda provided Helm charts upgrade is largely automated. You can refer to our Helm charts project on GitHub as a blueprint if you use any other alternative deployment methods. We recommend focusing on Helm chart configuration and any changes made to default Helm chart deployment like Ingress configuration, external Elasticsearch/OpensSearch, additional Exporters or Zeebe configuration parameters.

### Camunda Helm charts Upgrade

We are providing a detailed upgrade guide when you upgrade Camunda deployed in Kubernetes using our Helm charts.
TODO Add Card with a link
You could also refer to our [Deployment Reference architecture library](../../reference-architecture/reference-architecture.md) to learn more.

## Step 5: Create update timeline

Develop a realistic timeline that accounts for all phases of the update.

### Pre-update phase (1-2 weeks)

- Environment preparation and testing
- Configuration updates and validation
- Backup procedures testing
- Infrastructure capacity planning

### Update execution

1-4 hours for complete cluster varies based on data migration and time required to provision Infrastructure services.
With Camunda 8.8 release Operate and Zeebe data migration is running on a background and will not require downtime. For more information about data migration see TODO

### Post-update validation (1-2 days)

- Platform functional testing and validation
- Performance monitoring and optimization
- Update Operational procedures

## Next steps

Once you've completed your update planning:

1. **Review your plan** with relevant teams and stakeholders
2. **Document the strategy** including backup restore procedures for the platform

For additional guidance, consult the existing [update guide introduction](/self-managed/operational-guides/update-guide/introduction.md) and version-specific update documentation.
