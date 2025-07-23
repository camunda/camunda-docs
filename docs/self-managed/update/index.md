# Camunda 8.8 Self-Managed update guide

:::warning
This documentation page is a work in progress and may contain incomplete, placeholder, or evolving content. While the core concepts introduced in Camunda 8.8 are stable, details and sections here are actively being refined.

See the [release announcements](/reference/announcements-release-notes/880/880-announcements.md), [release notes](/reference/announcements-release-notes/880/880-release-notes.md), and the [quality board](https://github.com/orgs/camunda/projects/187/views/15) for more detail on what's included in Camunda 8.8.
:::

This page helps you plan and execute an update of an existing **Camunda 8.7** Self-Managed environment to **Camunda 8.8**. It summarizes key changes, required prerequisites, and links to role-specific instructions.

:::info Who should read this?
Platform administrators, DevOps engineers, and application developers maintaining Camunda-based solutions in self-managed Kubernetes or VM environments.
:::

## Camunda 8.8 is the latest release

Camunda 8.8 introduces a major architectural evolution, impacting both infrastructure and application integration. Key updates include the new **orchestration cluster architecture**, unified APIs, and a revised authentication model. Several legacy components have been deprecated.

## Why this update matters

Camunda 8.8 introduces changes that affect both **infrastructure** and **application logic**:

- **Orchestration cluster architecture** – Consolidates runtime components to simplify deployment and scaling. [See architectural changes](#architectural-changes-in-88)
- **Unified APIs and SDK alignment** – Component-specific APIs (V1) are deprecated. Migrate to the orchestration cluster API and updated SDKs to unlock new features and ensure future compatibility.
- **Authentication and authorization overhaul** – Moves to an OIDC-based identity model with cluster-level and scoped permissions. LDAP integration for Operate and Tasklist is removed.
- **Unified configuration schema** – A shared configuration model reduces drift across components and improves automation.  
  [Link to schema docs – VERIFY]

:::caution Update complexity
**Moderate to high.** Expect coordination across platform and application teams. Plan a controlled maintenance window and validate in a non-production environment first.
:::

## Quick start checklist

1. Confirm your current Camunda version and whether a direct upgrade to 8.8 is supported. [VERIFY matrix]
2. Back up all stateful data (Elasticsearch/OpenSearch indices, configuration files, secrets).
3. Prepare an OIDC provider (Camunda Identity, Keycloak, or a corporate IdP) and configure required roles.
4. Migrate configuration to the unified schema (run a dry run in staging).
5. Update SDK dependencies in active development branches; address deprecations.
6. Set up a test environment that mirrors production scale as closely as possible.
7. Execute the update and validate workflows, user tasks, and integrations.

[Start with the administrator update guide →](./administrators/prepare-for-update.md)

## Architectural changes in 8.8

### Streamlined orchestration cluster architecture

Camunda 8.8 completes the “streamlined architecture” initiative announced in early 2024. Key changes:

- Reduces the number of independently deployed component services
- Aligns component communication via a unified cluster identity and API surface
- Simplifies scaling and sizing of orchestration runtime components
- Standardizes configuration and secret keys across components
- Lays the groundwork for future multi-cluster and federation models [VERIFY]

For context, see the [architecture announcement blog post](https://camunda.com/blog/2024/04/simplified-deployment-options-accelerated-getting-started-experience/).

## Update prerequisites and compatibility

For full OS, Kubernetes, database, and runtime compatibility details, see the [supported environments](../../reference/supported-environments.md).

:::warning Breaking changes
Camunda 8.8 introduces changes that **require** updates to both infrastructure and application code. Review deprecation deadlines and plan your migration accordingly.

See: [Update guide: 8.7.x → 8.8](../operational-guides/update-guide/870-to-880.md) [VERIFY path]
:::

### API and SDK changes with 8.8

Learn more about changes for application developers in the dedicated [Camunda 8.8 APIs & tools update guide](../../apis-tools/migration-manuals/index.md).

### Authentication and authorization

- LDAP authentication is removed from **Operate** and **Tasklist**.
- Use **Camunda Identity** backed by an **OIDC provider** such as Keycloak or your corporate IdP.
- A new **cluster-level permission model** replaces legacy role-based access.
- **Scoped permissions** distinguish orchestration (runtime execution) from management (Operate, Admin).
- An OIDC provider is required. Camunda Identity can integrate with Keycloak or external OIDC services.  
  [Add link to Identity setup – VERIFY]

### Infrastructure versions

- **Elasticsearch 8.16+** is required. [Confirm OpenSearch support – VERIFY]
- Storage performance and class settings must meet 8.8 requirements; validate with event throughput tests.
- Reindexing may be required due to internal schema changes. [VERIFY details]

### Deployment changes

- The new **orchestration cluster deployment model** replaces scattered component topologies.  
  See: [Administrators: Prepare for update](./administrators/prepare-for-update.md)
- Use the **unified configuration schema**.  
  [Link to schema migration guide – VERIFY]

## Update execution paths

Choose the path that matches your role. Cross-team coordination is strongly recommended.

### Platform administrators / DevOps

**Typical responsibilities**

- Kubernetes clusters and Helm chart lifecycle
- Elasticsearch/OpenSearch administration
- Authentication systems (Identity, Keycloak, enterprise OIDC)
- Backup and disaster recovery
- Monitoring, logging, and alerting

**Your update flow**

1. [**Prepare for an update**](./administrators/prepare-for-update.md)  
   Validate backups, review compatibility, map configuration changes, and prepare deployment assets.
2. [**Run the update**](./administrators/run-update.md)  
   Apply Helm chart changes, perform a rolling or staged update, and verify cluster health.
