---
id: whats-new-in-89
title: What's new in Camunda 8.9
sidebar_label: What's new in Camunda 8.9
description: "Learn more about what's new and changed in Camunda 8.9."
keywords:
  [
    "what's changed",
    "what's new",
    "whats changed in 8.9",
    "what's changed in 8.9",
    "8.9 changes",
  ]
page_rank: 90
---

import OrchestrationClusterImg from '../../img/orchestration-cluster.png';

Important changes in Camunda 8.9 you should consider when upgrading from Camunda 8.8.

## Why upgrade to Camunda 8.9?

Upgrading to Camunda 8.8 delivers significant benefits and keeps your installation aligned and ready for future releases.

<div className="list-tick">

- **Agentic orchestration**: [Build and orchestrate AI agents](#agentic-orchestration) within your BPMN-based workflows, enabling human tasks, deterministic rule sets, and AI-driven decisions to collaborate in a robust, end-to-end process.

- **RDBMS secondary storage**: Flexible data layer via first‑class RDBMS secondary storage options, including Amazon Aurora.

- **Observability**: Simpler configuration and observability, with cluster‑wide variables and a new SaaS metrics endpoint.

- **Improved developer experience**: A smoother developer and operator experience for Camunda 8 Run and Modeler.

</div>

## Summary of important changes

Important changes introduced in Camunda 8.9 are summarized as follows:

<table className="table-callout">
<tr>
    <td width="30%">**What's new/changed**</td>
    <td>**Summary**</td>
</tr>
<tr>
    <td>[Agentic orchestration](#agentic-orchestration)</td>
    <td>Refined AI and MCP connector capabilities, including new authentication, timeout, and configuration options.</td>
</tr>
<tr>
    <td>[Camunda 8 Run](#camunda8run)</td>
    <td>Use H2 as the default secondary storage for local/dev setups, with improved CLI guidance and defaults.</td>
</tr>
<tr>
    <td>[Cluster configuration and observability](#observability)</td>
    <td>Configure shared values with cluster variables and expose a Cluster Metrics endpoint for SaaS clusters that integrates with Prometheus-style monitoring.</td>
</tr>
<tr>
    <td>[Global user task listeners](#listeners)</td>
    <td>Define configuration‑based, cluster‑wide user task listeners with consistent payloads for all user task events.</td>
</tr>
<tr>
    <td>[Modeler](#modeler)</td>
    <td><ul><li>Web Modeler moves to Log4j2 and Tomcat, adds RDBMS support, event templates, and email invitations.</li><li>Desktop Modeler adds connection management for Orchestration Clusters.</li></ul></td>
</tr>
<tr>
    <td>[RDBMS secondary storage](#rdbms)</td>
    <td>Use relational databases (H2, PostgreSQL, Oracle, MariaDB, MySQL, SQL Server, Aurora PostgreSQL) as secondary storage for the Orchestration Cluster instead of, or alongside, Elasticsearch/OpenSearch.</td>
</tr>
<tr>
    <td>[Supported environments](#environments)</td>
    <td>Updated support for Java, Elasticsearch/OpenSearch, RDBMS, Helm, and connector runtime (including virtual threads).</td>
</tr>
</table>

:::info

- See [release announcements](/reference/announcements-release-notes/890/890-announcements.md) and [release notes](/reference/announcements-release-notes/890/890-release-notes.md) for more detail on what's included in Camunda 8.9.
- Ready to upgrade? See the [upgrade guides](#upgrade-guides) to learn more about upgrading from Camunda 8.8 to 8.9.

:::

## Agentic orchestration {#agentic-orchestration}

Camunda 8.9 refines the AI and MCP connectors introduced in 8.8.

### AI Agent and model configuration improvements

Enhancements make AI interactions more robust, configurable, and compatible with a wider range of AI providers.

<table className="table-callout">
<tr>
    <td width="30%">**Feature**</td>
    <td>**Description**</td>
</tr>
<tr>
    <td>[AI Agent connectors](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent.md)</td>
    <td>Timeout configuration at the model level, allowing you to cap how long AI calls can run.</td>
</tr>
<tr>
    <td>[Amazon Bedrock connector](/components/connectors/out-of-the-box-connectors/amazon-bedrock.md)</td>
    <td>Support for long‑term API key authentication in addition to existing methods.</td>
</tr>
<tr>
    <td>OpenAI-compatible models</td>
    <td>Custom query parameters in the endpoint URL, useful for setting API versions, and passing additional metadata required by custom API gateways.</td>
</tr>
</table>

### MCP Client connector authentication

The [MCP Client connector](/components/early-access/alpha/mcp-client/mcp-client-connector.md) now supports multiple authentication strategies for connecting to MCP servers:

- OAuth
- API key
- Custom header–based authentication

This allows system administrators to enforce organization‑specific security policies for AI tools, integrate with MCP servers that require custom or provider‑specific auth flows, and continue using a consistent connector abstraction while varying the authentication mechanism.

## Camunda 8 Run {#camunda8run}

Camunda 8.9 focuses on making Camunda 8 Run simpler to use in local and development scenarios.

### H2 as default secondary storage

Camunda 8 Run now uses H2 as the default secondary data store.

- You can start a fully functional local stack without provisioning Elasticsearch or OpenSearch.
- Memory footprint is reduced compared to a full external search cluster.
- Developers can bootstrap quickly with minimal configuration.

### Improved CLI and configuration experience

The Camunda 8 Run CLI and configuration have been refined to:

- Provide more helpful usage output and clearer error messages (for example, around Elasticsearch startup).
- Include guided Java detection, sensible development defaults (such as disk watermark thresholds), and a clean‑state command for resetting a local environment.
- Ship a fully documented unified configuration file by default.

These changes reduce friction when setting up Camunda 8 Run for the first time, debugging local setup issues, and switching between different configurations or environments.

## Cluster configuration and observability {#observability}

Camunda 8.9 improves central configuration and runtime visibility.

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

:::note
Administrators can manage cluster variables via the Orchestration Cluster API, while modelers access them from BPMN and DMN using FEEL.
:::

### Cluster Metrics endpoint for SaaS clusters

Camunda 8.9 introduces a Cluster Metrics endpoint for SaaS clusters, allowing you to:

- Expose cluster metrics compatible with Prometheus‑style scraping.
- Integrate directly with tools such as Prometheus, Datadog, or other metrics backends that support Prometheus endpoints.
- Gain real‑time visibility into cluster performance and health.

This helps operations teams consolidate Camunda monitoring into existing observability stacks, and standardize dashboards, alerts, and SLOs across environments.

<p class="link-arrow">[Cluster Metrics endpoint](/components/saas/monitoring/cluster-metrics-endpoint/index.md)</p>

## Global user task listeners {#listeners}

Camunda 8.9 introduces configuration‑based global user task listeners for Self‑Managed deployments.

- Administrators can define cluster‑wide listeners using configuration files or environment variables.
- Listeners are active from cluster startup and preserved across backup and restore.
- All user task lifecycle events emit rich payloads - full variable context at the time of the event, and standardized metadata for traceability and integration.

This is especially useful when you need:

- Organization‑wide auditing and compliance for user task activity.
- Standardized integrations with notification systems, custom UIs, or analytics platforms.
- Consistent behavior across all processes and tenants, without per‑process configuration.

<p class="link-arrow">[Global User task Listeners](/components/concepts/global-user-task-listeners.md)</p>

## Modeler {#modeler}

Camunda 8.9 introduces enhancements and changes to both Desktop Modeler and Web Modeler.

### Desktop Modeler: Manage Camunda connections

You can now manage multiple Camunda connections in Desktop Modeler:

- Add, edit, delete, and save connection profiles.
- Securely store credentials and configuration for each connection.
- Deploy directly to a saved connection, and select clusters during deployment.

### Web Modeler: event templates and email invitations

Usability improvements in Web Modeler also include:

- Event templates: Create templates for message, signal, and timer events, and reuse and share templates across projects to standardize message names, payloads, and timer definitions.
- Email invitations: Invite new users to Web Modeler projects via email, regardless of OIDC provider, and use a consistent invitation flow across Keycloak, Entra ID, Okta, Auth0, and other providers.

Together, these changes simplify collaboration and help teams keep event configurations consistent.

### Web Modeler: Log4j2 and Tomcat

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

### Web Modeler: RDBMS support (H2, MariaDB, MySQL)

Web Modeler now supports H2, MariaDB, and MySQL as relational databases, aligning its storage options with those of the Orchestration Cluster.

For administrators, this means more consistent database configuration across components, the ability to standardize on a single RDBMS stack where appropriate, and a simpler story for backup, high availability, and compliance across the platform.

## RDBMS secondary storage {#rdbms}

Camunda 8.9 introduces relational databases as first‑class secondary storage options for the Orchestration Cluster.

### RDBMS secondary storage for orchestration data

You can now use relational databases to store and query orchestration data instead of relying solely on Elasticsearch or OpenSearch.

Supported options include H2 (for development and test scenarios), PostgreSQL, Oracle, MariaDB, MySQL, Microsoft SQL Server, and Amazon Aurora PostgreSQL.

- Zeebe’s primary execution storage remains unchanged (Raft + RocksDB).
- The same REST API and data model are used regardless of whether you choose Elasticsearch/OpenSearch or an RDBMS as secondary storage.
- You can select the storage option that best matches your operational, compliance, and cost requirements.

This is particularly useful if you already standardize on one of the supported RDBMS platforms, want to avoid operating and scaling additional search clusters where they are not required, or prefer existing RDBMS tooling for backup, monitoring, and compliance.

### Amazon Aurora as managed secondary storage

Camunda 8.9 adds support for Amazon Aurora PostgreSQL as secondary storage, enabling:

- A fully managed, cloud‑native RDBMS for secondary storage.
- Integration with AWS features such as IAM/IRSA, high availability, and automatic failover.
- Helm and manual installation guidance with tested configurations for Aurora.

Aurora is a good fit if you run Camunda on AWS and want managed RDBMS operations instead of self‑managing PostgreSQL, and integration with existing AWS security and reliability practices.

### RDBMS support policy and database scripts

To clarify long‑term support, Camunda 8.9 introduces:

- An RDBMS support policy covering supported database versions and adoption of new versions.
- SQL and Liquibase scripts for all supported databases, distributed as part of the official Camunda distribution.

This helps DBAs and operations teams validate that existing database versions are supported, plan upgrades based on a predictable policy and script set, and standardize roll‑outs and migrations across environments.

### Standardized JDBC driver management

For manual installations, Camunda 8.9 introduces a standardized directory and configuration for JDBC drivers:

- A new `/driver-lib` directory separates drivers bundled by Camunda from customer‑supplied drivers (for example, Oracle or specific vendor builds).
- Configuration options allow you to choose which drivers are active, and explicitly configure driver classes where required.

This structure simplifies license‑compliant driver distribution, multi‑database support in regulated environments, and provides a clear separation between Camunda-managed and customer-managed artifacts.

## Supported environments {#environments}

Camunda 8.9 updates several platform and environment baselines. Highlights include:

| Environment                  | Description                                                                                                                                                                                                                              |
| :--------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Java                         | Certification for OpenJDK 25 across core components and tooling, alongside existing OpenJDK 21–24 support.                                                                                                                               |
| Elasticsearch/OpenSearch     | <ul><li><p>Updated minimum versions for Self‑Managed deployments.</p></li><li>Recommended upgrades to Elasticsearch 9.2+ and OpenSearch 3.4+ to align with Camunda 8.9 defaults and benefit from recent database improvements.</li></ul> |
| SaaS regions                 | Support for an additional AWS region (including new European region options) so you can select clusters closer to your data and users.                                                                                                   |
| Helm and RDBMS configuration | <p><ul><li><p>New RDBMS configuration options in the Helm values file for orchestration data.</p></li><li>Expanded secret and configuration patterns aligned with the Orchestration Cluster architecture.</li></ul></p>                  |
| Connector runtime            | Virtual threads enabled by default for outbound connectors, improving concurrency and resource usage where supported.                                                                                                                    |

:::info
For complete details, including deprecations and breaking changes, see [release announcements](./890-announcements.md) and [supported environments](/reference/supported-environments.md).
:::

## Web Modeler

### Logging framework changes from Logback to Log4j2

Web Modeler's `restapi` component uses [Apache Log4j 2](https://logging.apache.org/log4j/2.x/) for logging instead of [Logback](https://logback.qos.ch/).

You can now also change the log levels at runtime.

#### Are you affected by 8.9 Web Modeler changes?

The 8.9 changes to the Web Modeler `restapi` component could affect your organization if you are in a Self-Managed environment and:

- You are using a custom Logback configuration.
- You are using any tools that consume the log files.

### Embedded web server changes from Undertow to Tomcat

Web Modeler's `restapi` component uses [Apache Tomcat](https://tomcat.apache.org/) instead of [Undertow](https://undertow.io/).

#### Are you affected by 8.9 Web Modeler changes?

The 8.9 changes to the Web Modeler `restapi` component could affect your organization if you are in a Self-Managed environment and:

- You are using a custom Undertow configuration.
- You are using any tools that consume the log files.

## Upgrade guides {#upgrade-guides}

Camunda 8.9 lays the foundation for future releases. Upgrading ensures compatibility and provides access to enhanced features.

The following guides offer detailed information on how you can upgrade to Camunda 8.9.

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
    <td>[APIs & tools upgrade guide](/apis-tools/migration-manuals/index.md)</td>
    <td>Plan and execute an upgrade from Camunda 8.8 to 8.9, focusing on API and tools transitions.</td>
    <td><p><ul><li>Application developers maintaining Camunda-based solutions in Self-Managed Kubernetes or VM environments.</li><li>Developers using Camunda APIs and tools.</li></ul></p></td>
</tr>
</table>
