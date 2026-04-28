---
id: whats-new-in-89
title: What's new in Camunda 8.9
sidebar_label: What's new in Camunda 8.9
description: "Highlights and important changes to consider when upgrading to Camunda 8.9."
keywords:
  [
    "what's changed",
    "what's new",
    "whats changed in 8.9",
    "what's changed in 8.9",
    "8.9 changes",
  ]
page_rank: 90
toc_max_heading_level: 2
---

import OrchestrationClusterImg from '../../img/orchestration-cluster.png';
import PageDescription from '@site/src/components/PageDescription';

<PageDescription />

## Why upgrade to Camunda 8.9?

Upgrading to Camunda 8.9 delivers significant benefits and keeps your installation aligned and ready for future releases.

<div className="list-tick">

- **Agentic orchestration**: [Build and orchestrate AI agents](#agentic-orchestration) within your BPMN-based workflows, enabling human tasks, deterministic rule sets, and AI-driven decisions to collaborate in a robust, end-to-end process.

- **RDBMS secondary storage**: Flexible data layer via first‑class RDBMS secondary storage options, including Amazon Aurora.

- **Observability**: Simpler configuration and observability, with cluster variables, audit logs, and a new SaaS metrics endpoint.

- **Improved developer experience**: A smoother developer and operator experience for Camunda 8 Run and Modeler.

</div>

## Summary of important changes

Important changes in Camunda 8.9 are summarized as follows:

<table className="table-callout">
<tr>
    <td width="30%">**What's new/changed**</td>
    <td>**Summary**</td>
</tr>
<tr>
    <td>[Agentic orchestration](#agentic-orchestration)</td>
    <td>Refined AI and MCP connector capabilities and Orchestration Cluster MCP support.</td>
</tr>
<tr>
    <td>[Audit log](#audit-log)</td>
    <td>Access a detailed record of operations.</td>
</tr>
<tr>
    <td>[Camunda 8 Run](#camunda8run)</td>
    <td>Improved CLI/configuration experience and secondary storage enhancements.</td>
</tr>
<tr>
    <td>[Global user task listeners](#listeners)</td>
    <td>Define configuration‑based, cluster‑wide user task listeners.</td>
</tr>
<tr>
<td>[Helm chart deployment](#helm-chart-deployment)</td>
    <td>RDBMS and secondary storage configuration, `*.secret.existingSecret` pattern migration, default 8080 REST port, Helm 4 support, and more.</td>
</tr>
<tr>
<td>[Migration from Camunda 7](#migration)</td>
    <td>New migration tools History Data Migrator and Identity Data Migrator.</td>
</tr>
<tr>
    <td>[Desktop Modeler](#desktop-modeler)</td>
    <td>New cluster connection management.</td>
</tr>
<tr>
    <td>[Web Modeler](#web-modeler)</td>
    <td>Simplified architecture and installation, migration to Log4j2 and Tomcat, RDBMS support, event templates, and email invitations.</td>
</tr>
<tr>
    <td>[Orchestration Cluster](#ocluster)</td>
    <td>Identity renamed to Admin, Amazon ECS (EC2+Fargate) support, cluster variables, Cluster Metrics endpoint for SaaS clusters, and configuration improvements and enhancements.</td>
</tr>
<tr>
    <td>[RDBMS secondary storage](#rdbms)</td>
    <td>Relational database support as secondary storage for the Orchestration Cluster.</td>
</tr>
<tr>
    <td>[Supported environments](#environments)</td>
    <td>Updated support for Java, Elasticsearch/OpenSearch, RDBMS, Helm, and connector runtime (including virtual threads).</td>
</tr>
</table>

:::info learn more and upgrade

- See [release announcements](/reference/announcements-release-notes/890/890-announcements.md) and [release notes](/reference/announcements-release-notes/890/890-release-notes.md) for a full summary of what's included in Camunda 8.9, including all breaking changes and deprecations, and supported environment changes.
- Ready to upgrade? See the [upgrade guides](#upgrade-guides) to learn more about upgrading from Camunda 8.8 to 8.9.

:::

## Agentic orchestration {#agentic-orchestration}

Build AI agents more easily with enhanced Camunda AI and MCP connectors in 8.9.

### AI Agent and model configuration improvements

Enhancements make AI interactions more robust, configurable, and compatible with a wider range of AI providers.

| Feature                                                                                        | Description                                                                                                                                    |
| :--------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| [AI Agent connectors](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent.md)  | Timeout configuration at the model level, allowing you to cap how long AI calls can run.                                                       |
| [Amazon Bedrock connector](/components/connectors/out-of-the-box-connectors/amazon-bedrock.md) | Support for long‑term API key authentication in addition to existing methods.                                                                  |
| OpenAI-compatible models                                                                       | Custom query parameters in the endpoint URL, useful for setting API versions, and passing additional metadata required by custom API gateways. |

### MCP Client connector authentication

The MCP Client connector now supports multiple authentication strategies for connecting to MCP servers (OAuth, API key, and custom header–based authentication).

<p class="link-arrow">[MCP Client connector](/components/connectors/out-of-the-box-connectors/agentic-ai-mcp-client-connector.md)</p>

### Orchestration Cluster MCP support

The Orchestration Cluster now exposes its operational capabilities via a built-in Model Context Protocol (MCP) server, enabling AI agents and LLM-powered applications to access Camunda data via a standardized interface.

<p class="link-arrow">[Orchestration Cluster MCP Server](/apis-tools/orchestration-cluster-api-mcp/orchestration-cluster-api-mcp-overview.md)</p>

## Audit log

Use the new user operations audit log to access a record of operations, including who performed an operation, when it was performed, and on which entities the operation was performed.

Use the audit log to prove compliance, meet governance and regulatory requirements, maintain operational integrity and transparency, and troubleshoot issues.

<p class="link-arrow">[Audit log](/components/audit-log/overview.md)</p>

## BPMN conditional events

Camunda 8 now supports BPMN conditional events, allowing users to start, continue, or interrupt process execution dynamically based on evaluated conditions.

This enhancement provides first-class support for conditional start, boundary, and intermediate catch events, making process automation more expressive and migration from Camunda 7 smoother.

<p class="link-arrow">[Conditional events](/components/modeler/bpmn/conditional-events/conditional-events.md)</p>

## Camunda 8 Run {#camunda8run}

Camunda 8.9 focuses on making Camunda 8 Run simpler to use in local and development scenarios.

### Improved CLI and configuration experience

The Camunda 8 Run CLI and configuration is enhanced to:

- Provide more helpful usage output and clearer error messages (for example, around Elasticsearch startup).
- Include guided Java detection, sensible development defaults (such as disk watermark thresholds), and a clean‑state command for resetting a local environment.
- Ship a fully documented unified configuration file by default.

These changes reduce friction when setting up Camunda 8 Run for the first time, debugging local setup issues, and switching between different configurations or environments.

:::info Breaking change
The `--docker` flag and bundled Docker Compose files have been removed from Camunda 8 Run. Docker Compose is now a standalone distribution artifact. See [release announcements](/reference/announcements-release-notes/890/890-announcements.md#camunda-8-run-docker-compose-support-removed) for migration details.
:::

<p class="link-arrow">[Camunda 8 Run](/self-managed/quickstart/developer-quickstart/c8run.md)</p>

### Secondary storage

Camunda 8 Run now uses H2 as the default secondary data store.

- You can start a fully functional local stack without provisioning Elasticsearch or OpenSearch.
- Memory footprint is reduced compared to a full external search cluster.
- Developers can bootstrap quickly with minimal configuration.

You can also configure Camunda 8 Run to use any of the supported secondary storage relational databases instead of the default H2 (for example, PostgreSQL, MariaDB, MySQL, Oracle, or Microsoft SQL Server).

<p class="link-arrow">[Configure Camunda 8 Run secondary storage](/self-managed/quickstart/developer-quickstart/c8run/secondary-storage.md#configure-or-switch-secondary-storage-h2-or-elasticsearch)</p>

## Global user task listeners {#listeners}

Use configuration‑based global user task listeners in your Self‑Managed deployments.

- Administrators can define cluster‑wide listeners using configuration files or environment variables.
- Listeners are active from cluster startup and preserved across backup and restore.
- All user task lifecycle events emit rich payloads - full variable context at the time of the event, and standardized metadata for traceability and integration.

<p class="link-arrow">[Global User task Listeners](/components/concepts/global-user-task-listeners.md)</p>

## Helm chart deployment

Important changes to Helm chart deployment in 8.9 are as follows:

### Default REST port changed

The Orchestration Cluster's default HTTP port has changed from 8090 to 8080.

You should update any hardcoded port references in network policies, Ingress rules, or service configuration.

### Helm 4 support

As Helm 3 reaches end of life in 2026, Camunda continues to support your migration to Helm 4 with documentation covering how you can deploy Camunda 8.7, 8.8, and 8.9 with Helm 4.

<p class="link-arrow">[Helm 4](/self-managed/deployment/helm/operational-tasks/helm-v4.md)</p>

:::note
Camunda 8.10 and beyond will only support Helm 4 to ensure we provide secure solutions for customers.
:::

### RDBMS as secondary storage

The Helm chart now supports relational databases as a first-class secondary storage option alongside Elasticsearch and OpenSearch.

You can configure database connections directly under `orchestration.data.secondaryStorage.rdbms` in your `values.yaml`.

### Secondary storage must be explicitly configured

The Helm chart no longer defaults to Elasticsearch as the secondary storage type.

- You must now explicitly set `orchestration.data.secondaryStorage.type` in your `values.yaml` to either `elasticsearch`, `opensearch`, or `rdbms`.
- Without this configuration, `helm install` or `helm upgrade` will fail with a validation error.
- For engine-only deployments that do not require secondary storage, the new `global.noSecondaryStorage` mode is available.

#### Are you affected?

You are affected if you are upgrading a Self-Managed Helm deployment from 8.8 to 8.9 and have not previously explicitly set a secondary storage type.

### Secret configuration migration

Secret configuration keys that were deprecated in Camunda 8.8 are now removed in 8.9.

- Using any of these removed keys will result in a hard failure during Helm operations.
- In addition, the `global.secrets.autoGenerated`, `global.secrets.name`, and `global.secrets.annotations` keys are removed. This means secrets are no longer automatically generated by the Helm chart.

All secret configuration must now use the new standardized pattern:

| Key                          | Description                                       |
| :--------------------------- | :------------------------------------------------ |
| `*.secret.existingSecret`    | Reference an existing Kubernetes Secret.          |
| `*.secret.existingSecretKey` | Specify the key within the Secret.                |
| `*.secret.inlineSecret`      | Provide a plain-text value (non-production only). |

#### Are you affected?

You are affected if your `values.yaml` uses any of the legacy secret keys (such as `global.elasticsearch.auth.existingSecret`, `identity.firstUser.password`, `connectors.security.authentication.oidc.existingSecret`, or similar).

See the [release announcements](/reference/announcements-release-notes/890/890-announcements.md#helm-chart-deprecated-secret-keys-removed) for the full list of removed keys.

## Reference architectures {#reference-architectures}

Camunda 8.9 introduces major changes to the [deployment references](https://github.com/camunda/camunda-deployment-references) used by Self-Managed reference architectures.

### Operator-based infrastructure replaces Bitnami

All reference architectures (AKS, EKS, OpenShift, Kind) now use Kubernetes operators — CloudNativePG, ECK, and Keycloak operator — instead of embedded Bitnami subcharts for infrastructure services.

If you follow a reference architecture, your next deployment will use operator-managed PostgreSQL, Elasticsearch, and Keycloak. Existing deployments can migrate using the new [migration tooling](/self-managed/deployment/helm/operational-tasks/migration-from-bitnami/index.md).

#### Are you affected?

You are affected if you deploy Self-Managed using a reference architecture from the `camunda-deployment-references` repository and rely on Bitnami-managed infrastructure. Follow the migration guide to transition to operator-managed services.

### New deployment options

- **Amazon ECS on Fargate** is now available as a container-based deployment without Kubernetes.
- **AKS RDBMS variant** provides a lighter Azure deployment using PostgreSQL as secondary storage (no Elasticsearch).
- **Kind local development** reference architecture is available for local testing with Makefile-based commands.

### Dual-region changes

- EKS and OpenShift dual-region now use the ECK operator for Elasticsearch.
- Headless service DNS is used for initial contact points, improving cross-region connectivity.

## Migration from Camunda 7 to Camunda 8 {#migration}

Camunda 8.9 introduces the following additional tools and features to help you migrate from Camunda 7 to Camunda 8.

:::tip
Start your migration today with the [Camunda 7 to Camunda 8 migration guide](/guides/migrating-from-camunda-7/index.md).
:::

### History Data Migrator

The History Data Migrator migrates audit trail data (the history of process execution, including active, completed and canceled instances) to Camunda 8 when RDBMS is used as secondary storage.

<p class="link-arrow">[History Data Migrator](/guides/migrating-from-camunda-7/migration-tooling/data-migrator/history.md)</p>

### Identity Data Migrator

The Identity Data Migrator migrates authorizations that control access to resources in Camunda, helping you preserve permissions when migrating to Camunda 8.

<p class="link-arrow">[Identity Data Migrator](/guides/migrating-from-camunda-7/migration-tooling/data-migrator/identity.md)</p>

## Desktop Modeler {#desktop-modeler}

### Manage Camunda connections

You can now manage multiple Camunda connections in Desktop Modeler:

- Add, edit, delete, and save connection profiles.
- Securely store credentials and configuration for each connection.
- Deploy directly to a saved connection, and select clusters during deployment.

<p class="link-arrow">[Connect to Camunda 8 in Desktop Modeler](/components/modeler/desktop-modeler/connect-to-camunda-8.md)</p>

## Web Modeler {#web-modeler}

Camunda 8.9 introduces the following enhancements and changes in Web Modeler.

### Event templates and email invitations

The following usability improvements simplify collaboration and help teams keep event configurations consistent.

| Feature                                                                                                   | Description                                                                                                                                                                        |
| :-------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Element templates](/components/modeler/element-templates/defining-templates.md)                          | Create templates for message, signal, and timer events, and reuse and share templates across projects to standardize message names, payloads, and timer definitions.               |
| [Email invitations](/components/modeler/web-modeler/collaboration/collaboration.md#add-users-to-projects) | Invite new users to Web Modeler projects via email, regardless of OIDC provider, and use a consistent invitation flow across Keycloak, Entra ID, Okta, Auth0, and other providers. |

### Improved Self-Managed installation

The Web Modeler system architecture has been simplified to enable easier and smoother installation and configuration of Web Modeler in a Self-Managed deployment.
The separate `webapp` component has been removed, and its functionality is now completely integrated into the `restapi` component.

This change might require updates to your application configuration.

<p class="link-arrow">[Migrate configuration](/self-managed/upgrade/components/880-to-890.md#migrate-webapp-configuration)</p>

### Log4j2 and Tomcat changes

| Feature                                             | Description                                                                                                                                                                                                  |
| :-------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Logging framework changes from Logback to Log4j2    | Web Modeler's `restapi` component uses [Apache Log4j 2](https://logging.apache.org/log4j/2.x/) for logging instead of [Logback](https://logback.qos.ch/). You can now also change the log levels at runtime. |
| Embedded web server changes from Undertow to Tomcat | Web Modeler's `restapi` component uses [Apache Tomcat](https://tomcat.apache.org/) instead of [Undertow](https://undertow.io/).                                                                              |

These changes could affect your organization if you are in a Self-Managed environment and:

- You are using a custom Logback and/or Undertow configuration.
- You are using any tools that consume the log files.

You should:

- Review your logging and server configuration for Web Modeler.
- Update any tooling that relies on old log formats or server behavior.
- Validate the new setup in a staging environment before upgrading production.

<p class="link-arrow">[Web Modeler logging](/self-managed/components/modeler/web-modeler/configuration/logging.md)</p>

## Orchestration Cluster {#ocluster}

Orchestration Cluster changes and highlights in 8.9 include the following:

### Amazon ECS (EC2+Fargate) support

Camunda 8 officially supports running Orchestration Clusters on Amazon Elastic Container Service (Amazon ECS).

This makes it easier and safer for teams that rely on Amazon ECS (including Fargate) to run Camunda 8 in production without needing to adopt Kubernetes (EKS). This feature relies on AWS S3.

<p class="link-arrow">[Deploy to Amazon ECS](/self-managed/deployment/containers/cloud-providers/amazon/aws-ecs.md)</p>

### Cluster variables for shared configuration

Use cluster variables to define configuration values once and reuse them across processes and tenants using FEEL expressions.

| Variable               | Scope                               | Priority |
| :--------------------- | :---------------------------------- | :------- |
| `camunda.vars.cluster` | Global                              | Lowest   |
| `camunda.vars.tenant`  | Tenant                              | Medium   |
| `camunda.vars.env`     | Merged view with automatic priority | Highest  |

You can use cluster variables to centralize:

- URLs, endpoints, and credentials references.
- Feature flags and environment names.
- Shared configuration used across multiple processes or applications.

<p class="link-arrow">[Cluster variables](/components/modeler/feel/cluster-variable/overview.md)</p>

### Cluster Metrics endpoint for SaaS clusters

Use the new Cluster Metrics endpoint for SaaS clusters to:

- Expose cluster metrics compatible with Prometheus‑style scraping.
- Integrate directly with tools such as Prometheus, Datadog, or other metrics backends that support Prometheus endpoints.
- Gain real‑time visibility into cluster performance and health.

This helps operations teams consolidate Camunda monitoring into existing observability stacks, and standardize dashboards, alerts, and SLOs across environments.

<p class="link-arrow">[Cluster Metrics endpoint](/components/saas/monitoring/cluster-metrics-endpoint/index.md)</p>

### Configure RocksDB memory per-broker

You can now configure RocksDB memory on a per-broker basis instead of per-partition, simplifying capacity planning and aligning with familiar JVM-style sizing.

<p class="link-arrow">[Zeebe memory allocation](/self-managed/components/orchestration-cluster/zeebe/operations/resource-planning.md#memory)</p>

### Orchestration Cluster Identity renamed to Admin

Starting with Camunda 8.9, the Orchestration Cluster Identity component is renamed to **Admin** (Orchestration Cluster Admin).

Admin is the cluster-level admin UI hosting identity management and other administrative features. Only the name has changed. Identity management (users, groups, roles, authorizations, tenants, mapping rules, and clients) is unchanged.

- The `admin` Spring profile replaces the `identity` profile. Both profiles work interchangeably in 8.9. The `identity` profile is deprecated and will be removed in a future version.
- API paths change from `/identity/*` to `/admin/*`. The old paths redirect to the new paths but are deprecated.
- Helm values change from `orchestration.identity.*` to `orchestration.admin.*`. The old values are deprecated.
- Documentation paths are updated: `/components/identity/` is now `/components/admin/`.

<p class="link-arrow">[Introduction to Admin](/components/admin/admin-introduction.md)</p>

### Unified component configuration {#ucc}

In Camunda 8.9, the remaining unified configuration project property changes are complete.

- All 8.9 property changes are documented in the [Camunda 8.9 property changes](/self-managed/components/orchestration-cluster/core-settings/configuration/configuration-mapping.md#camunda-89-property-changes) table.
- Search, sort, and filter the table to see breaking changes, direct mappings, and new properties.
- For more information on each property (including default values), see the [property reference](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md).

<p class="link-arrow">[Property changes in Camunda 8.9](/self-managed/components/orchestration-cluster/core-settings/configuration/configuration-mapping.md)</p>

:::note
Only the first partial set of the unified configuration project properties was introduced in Camunda 8.8.
:::

## RDBMS secondary storage {#rdbms}

Camunda 8.9 introduces relational databases as first‑class secondary storage options for the Orchestration Cluster.

### RDBMS secondary storage for orchestration data

You can now use relational databases to store and query orchestration data instead of relying solely on Elasticsearch or OpenSearch.

Supported options include H2 (for development and test scenarios), PostgreSQL, Oracle, MariaDB, MySQL, Microsoft SQL Server, and Amazon Aurora PostgreSQL.

- Zeebe’s primary execution storage remains unchanged (Raft + RocksDB).
- The same REST API and data model are used regardless of whether you choose Elasticsearch/OpenSearch or an RDBMS as secondary storage.
- You can select the storage option that best matches your operational, compliance, and cost requirements.

This is particularly useful if you already standardize on one of the supported RDBMS platforms, want to avoid operating and scaling additional search clusters where they are not required, or prefer existing RDBMS tooling for backup, monitoring, and compliance.

<p class="link-arrow">[Secondary storage](/self-managed/concepts/secondary-storage/index.md)</p>

### Amazon Aurora as managed secondary storage

Camunda 8.9 adds support for Amazon Aurora PostgreSQL as secondary storage, enabling:

- A fully managed, cloud‑native RDBMS for secondary storage.
- Integration with AWS features such as IAM/IRSA, high availability, and automatic failover.
- Helm and manual installation guidance with tested configurations for Aurora.

Aurora is a good fit if you run Camunda on AWS and want managed RDBMS operations instead of self‑managing PostgreSQL, and integration with existing AWS security and reliability practices.

<p class="link-arrow">[Using AWS Aurora PostgreSQL with Camunda](/self-managed/concepts/databases/relational-db/configuration.md#usage-with-aws-aurora-postgresql)</p>

### RDBMS version support policy and database scripts

To clarify long‑term support, Camunda 8.9 introduces:

- An RDBMS support policy covering supported database versions and adoption of new versions.
- SQL and Liquibase scripts for all supported databases, distributed as part of the official Camunda distribution.

This helps DBAs and operations teams validate that existing database versions are supported, plan upgrades based on a predictable policy and script set, and standardize roll‑outs and migrations across environments.

<p class="link-arrow">[RDBMS version support policy](/self-managed/concepts/databases/relational-db/rdbms-support-policy.md)</p>

### Standardized JDBC driver management

For manual installations, Camunda 8.9 introduces a standardized directory and configuration for JDBC drivers:

- A new `/driver-lib` directory separates drivers bundled by Camunda from customer‑supplied drivers (for example, Oracle or specific vendor builds).
- Configuration options allow you to choose which drivers are active, and explicitly configure driver classes where required.

This structure simplifies license‑compliant driver distribution, multi‑database support in regulated environments, and provides a clear separation between Camunda-managed and customer-managed artifacts.

<p class="link-arrow">[Loading JDBC drivers into pods](/self-managed/deployment/helm/configure/database/rdbms.md#loading-jdbc-drivers-into-pods)</p>

## Supported environments {#environments}

Camunda 8.9 updates several platform and environment baselines. Highlights include:

| Environment                                 | Description                                                                                                                                                                                                                              |
| :------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Connector runtime                           | Virtual threads enabled by default for outbound connectors, improving concurrency and resource usage where supported.                                                                                                                    |
| Elasticsearch/OpenSearch                    | <ul><li><p>Updated minimum versions for Self‑Managed deployments.</p></li><li>Recommended upgrades to Elasticsearch 9.2+ and OpenSearch 3.4+ to align with Camunda 8.9 defaults and benefit from recent database improvements.</li></ul> |
| Helm and RDBMS configuration                | <p><ul><li><p>New RDBMS configuration options in the Helm values file for orchestration data.</p></li><li>Expanded secret and configuration patterns aligned with the Orchestration Cluster architecture.</li></ul></p>                  |
| Java                                        | Certification for OpenJDK 25 across core components and tooling, alongside existing OpenJDK 21–24 support.                                                                                                                               |
| [SaaS regions](/components/saas/regions.md) | Support for an additional AWS US East (us-east-2) region in North America (and new European region options) so you can select clusters closer to your data and users.                                                                    |

:::info
For complete details, including breaking changes and deprecations, see [release announcements](./890-announcements.md) and [supported environments](/reference/supported-environments.md).
:::

## Upgrade guides {#upgrade-guides}

The following guides offer detailed information on how to upgrade to Camunda 8.9.

<table className="table-callout">
<tr>
    <td width="25%">**Guide**</td>
    <td>**Description**</td>
    <td>**Who is this guide for?**</td>
</tr>
<tr>
    <td>[Self-Managed upgrade guide](/self-managed/upgrade/index.md)</td>
    <td>Evaluate your infrastructure, understand operational changes, and choose the best update strategy for your environment.</td>
    <td>Operations and platform administrators of Self-Managed installations.</td>
</tr>
<tr>
    <td>[APIs & tools upgrade guide](/apis-tools/migration-manuals/migrate-to-89.md)</td>
    <td>Plan and execute an upgrade from Camunda 8.8 to 8.9, focusing on API and tools transitions.</td>
    <td><p><ul><li>Application developers maintaining Camunda-based solutions in Self-Managed Kubernetes or VM environments.</li><li>Developers using Camunda APIs and tools.</li></ul></p></td>
</tr>
</table>
