---
id: 890-release-notes
title: "8.9 Release notes"
sidebar_label: Release notes
description: "Release notes for 8.9, including alphas"
keywords: ["8.9 release notes", "release notes for 8.9", "release notes"]
page_rank: 90
---

These release notes identify the main new features included in the 8.9 minor release, including [alpha feature releases](/components/early-access/alpha/alpha-features.md).

| Minor release date | Scheduled end of maintenance | Changelog(s)                                                                | Upgrade guides |
| :----------------- | :--------------------------- | :-------------------------------------------------------------------------- | :------------- |
| 14 April 2026      | 13 October 2028              | [Patch Releases and Changelogs](#technical-changelogs-for-all-89x-releases) | -              |

:::info 8.9 resources

- See [release announcements](/reference/announcements-release-notes/890/890-announcements.md) to learn more about supported environment changes and breaking changes or deprecations.
- Refer to the [quality board](https://github.com/orgs/camunda/projects/187/views/21) for an overview of known bugs by component and severity.

:::

### Technical Changelogs for all 8.9.x releases

<details className="changelog-dropdown">
  <summary>Overview of all patch releases and their Changelogs in GitHub</summary>

<!-- RELEASE_LINKS_PLACEHOLDER -->

<!-- RELEASE_LINKS_PLACEHOLDER -->

</details>

## 8.9.0-alpha3

| Release date    | Changelog(s)                                                                                                                                                                               | Blog |
| :-------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--- |
| 13 January 2026 | <ul><li>[ Camunda 8 core ](https://github.com/camunda/camunda/releases/tag/8.9.0-alpha3)</li><li>[ Connectors ](https://github.com/camunda/connectors/releases/tag/8.9.0-alpha3)</li></ul> | -    |

### Bring your own monitoring

<div class="release"><span class="badge badge--long" title="This feature affects SaaS">SaaS</span></div>
<!-- https://github.com/camunda/product-hub/issues/2229 -->

Camunda 8 now supports _bring your own monitoring (BYOM)_ for SaaS clusters. You can activate a secure metrics endpoint for your C8 cluster and integrate it with Prometheus, Datadog, or any monitoring system that supports Prometheus scraping.

This gives you real-time visibility into cluster performance, helps you troubleshoot faster, and lets you seamlessly integrate with your existing observability stack.

### Migrate process instances

<div class="release"><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--medium" title="This feature affects Agentic orchestration">Agentic orchestration</span><span class="badge badge--medium" title="This feature affects AI agents">AI agents</span></div>

<!-- https://github.com/camunda/product-hub/issues/3065 -->

Camunda 8 now supports migration of process instances that include ad-hoc subprocesses, covering both single-instance and multi-instance (parallel and sequential) variants.

With this enhancement, you can:

- Safely migrate running instances.
- Update AI agent flows.
- Modernize process definitions without losing execution state.

This unlocks more flexible, agent-driven orchestration and faster iteration on live automation.

### Modeler

<div class="release"><span class="badge badge--medium" title="This feature affects Desktop Modeler">Desktop Modeler</span><span class="badge badge--medium" title="This feature affects Web Modeler">Web Modeler</span></div>

#### Create event templates in Web Modeler

<!-- https://github.com/camunda/product-hub/issues/3173 -->

You can now create, discover, and apply templates for more BPMN event types, including message, signal, and timer, directly within the element template editor.

You can also create global event templates that:

- Are reusable across projects.
- Standardize event configurations (for example, message names or payload structures).
- Help ensure consistency across teams and models.

#### Manage Camunda connections in Desktop Modeler

<!-- https://github.com/camunda/product-hub/issues/2970 -->

You can now manage Camunda connections directly in Desktop Modeler:

- Add, edit, delete, and save multiple connections.
- Securely store credentials and connection settings.
- Deploy directly to saved connections.
- Select an existing Orchestration Cluster or add a new one during deployment.

This streamlines the deployment workflow and reduces setup friction.

### Orchestration Cluster

<div class="release"><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--medium" title="This feature affects data storage">Data</span><span class="badge badge--medium" title="This feature affects FEEL expressions">FEEL expressions</span></div>

#### Manage configuration with cluster variables

<!-- https://github.com/camunda/product-hub/issues/2717 -->

Camunda 8 introduces cluster variables, letting you centrally manage configuration across your cluster. You can access these variables directly in the Modeler using FEEL expressions:

- `camunda.vars.cluster`: global scope.
- `camunda.vars.tenant`: tenant scope.
- `camunda.vars.env`: merged view with automatic priority.

If the same variable exists at multiple scopes, tenant overrides global, and process-level variables have the highest priority. This hierarchy lets you create cascading configurations, where specific contexts override broader defaults.

Cluster variables support simple key-value pairs and nested objects, which you can access with dot notation for complex structures. You can manage all cluster variables via the Orchestration Cluster API.

<p class="link-arrow">[Cluster variables overview](/components/modeler/feel/cluster-variable/overview.md)</p>

#### Migrate legacy job-based user tasks to engine-managed user tasks

<!-- https://github.com/camunda/product-hub/issues/2626 -->

You can now migrate active instances from legacy job-based user tasks to modern, engine-managed Camunda user tasks through both the API and the Operate UI as part of process instance migration.

This lets you:

- Standardize on the Orchestration Cluster APIs.
- Adopt the recommended user task type.
- Prepare for the removal of job-based user task querying and management from the consolidated API.

#### Use Amazon Aurora for secondary storage

<!-- https://github.com/camunda/product-hub/issues/3025 -->

Camunda 8 now supports Amazon Aurora as a secondary data store for orchestration clusters, in addition to existing options.

- Supports Aurora PostgreSQL (compatible with PostgreSQL 14–17).
- Designed for secure, high-performance, cloud-native deployments.
- Seamless integration with AWS features, including:
  - IAM / IRSA authentication.
  - High availability and failover.
  - Alignment with DBA best practices.

Helm charts and manual installation guides now include tested configurations and step-by-step references for Aurora, reducing operational complexity and accelerating adoption for AWS-centric organizations.

### Self-Managed

<div class="release"><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects data storage">Data</span></div>

#### Configure global user task listeners in Self-Managed

<!-- https://github.com/camunda/product-hub/issues/2586 -->

Camunda 8 now introduces configuration-based global user task listeners for Self-Managed deployments.

Administrators can define cluster-wide listeners using configuration files or environment variables, ensuring they are applied consistently from cluster startup and preserved across backup and restore operations.

All user task lifecycle events emit payloads containing full variable context and metadata, enabling standardized integrations across all processes.

#### Set up RDBMS as secondary storage in Helm

<!-- https://github.com/camunda/product-hub/issues/2690 -->

Camunda 8 Helm charts now support RDBMS as fully integrated secondary storage options for orchestration clusters, providing a first-class alternative to Elasticsearch and OpenSearch.

With this update, administrators can:

- Use RDBMS as an alternative to Elasticsearch or OpenSearch.
- Configure database connections directly in `values.yaml`.
- Enable advanced authentication and custom JDBC drivers.

This allows enterprises to run Camunda 8 on familiar, enterprise-managed RDBMS infrastructure aligned with existing security, backup, and compliance requirements.

#### Streamline your Camunda 8 Run experience

<!-- https://github.com/camunda/product-hub/issues/2866 -->

Camunda 8 Run is now easier to get started with. The CLI includes a helpful usage page, clearer error messages, especially for Elasticsearch startup, and prominently displays connection properties and credential information.

A revamped Java detection guided setup, log cleanup options, and better defaults for development environments (such as disk watermark thresholds) have been added. You can also start fresh using a new clean-state command, and the unified configuration file is now included and thoroughly documented.

#### Use H2 for data storage

<!-- https://github.com/camunda/product-hub/issues/2832, https://github.com/camunda/product-hub/issues/2656 -->

Camunda 8 Run now ships with H2 as the default secondary data store, providing:

- A lighter, simpler local development experience.
- Lower memory usage.
- A fully functional stack without requiring an external database.

New documentation walks you through:

- Installing Camunda 8 Run with H2 as the default secondary storage.
- Seamlessly switching from H2 to Elasticsearch or OpenSearch when needed.

## 8.9.0-alpha2

| Release date     | Changelog(s)                                                                                                                                                                               | Blog |
| :--------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--- |
| 09 December 2025 | <ul><li>[ Camunda 8 core ](https://github.com/camunda/camunda/releases/tag/8.9.0-alpha2)</li><li>[ Connectors ](https://github.com/camunda/connectors/releases/tag/8.9.0-alpha2)</li></ul> | -    |

### Agentic orchestration

<div class="release"><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--medium" title="This feature affects Agentic orchestration">Agentic orchestration</span><span class="badge badge--medium" title="This feature affects AI agents">AI agents</span><span class="badge badge--medium" title="This feature affects Connectors">Connectors</span></div>

#### A2A Client connectors

Agent-to-Agent (A2A) Client connectors allow you to interact with remote agents using the [A2A protocol](https://a2a-protocol.org/v0.3.0/specification/).

<table className="table-callout">
<tr>
    <td width="30%">**Connector**</td>
    <td>**Description**</td>
</tr>
<tr>
    <td>[A2A Client connector](/components/early-access/alpha/a2a-client/a2a-client-connector.md)</td>
    <td>Interact with A2A agents, by retrieving the remote agent’s Agent Card and sending messages to the agent.</td>
</tr>
<tr>
    <td>[A2A Client Polling connector](/components/early-access/alpha/a2a-client/a2a-client-polling-connector.md)</td>
    <td>Poll for responses from asynchronous A2A tasks. Typically paired with the A2A Client connector when using the Polling response retrieval method.</td>
</tr>
<tr>
    <td>[A2A Client Webhook connector](/components/early-access/alpha/a2a-client/a2a-client-webhook-connector.md)</td>
    <td>Receive callbacks from remote A2A agents via HTTP webhooks. Typically paired with the A2A Client connector when using the Notification response retrieval method. </td>
</tr>
</table>

These connectors support multi-agent collaboration scenarios when combined with the AI Agent connector, as well as providing the ability to discover remote agents, send messages, and receive responses through multiple mechanisms.

<p class="link-arrow">[A2A Client connectors](/components/early-access/alpha/a2a-client/a2a-client.md)</p>

#### MCP client authentication and transport protocol

<!-- https://github.com/camunda/product-hub/issues/3127, https://github.com/camunda/connectors/issues/5652 -->

The Camunda Model Context Protocol (MCP) client now supports OAuth, API key, and custom header–based authentication.

- System administrators can configure secure, policy-compliant access for Camunda AI agents.
- AI developers can discover and invoke enterprise MCP tools safely without exposing open endpoints.

MCP client connectors now also support connections using the [streamable HTTP](https://modelcontextprotocol.io/specification/2025-11-25/basic/transports#streamable-http) transport protocol.

<p class="link-arrow">[MCP Client](/components/early-access/alpha/mcp-client/mcp-client.md)</p>

:::note breaking changes
This feature introduces breaking changes in the element templates and the runtime configuration of the MCP Client. To learn more, see [announcements](890-announcements.md#agentic-orchestration).
:::

### Connectors

<div class="release"><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--medium" title="This feature affects Connectors">Connectors</span></div>

#### Amazon Textract connector improvements

<!-- https://github.com/camunda/connectors/pull/5490 -->

The Amazon Textract connector is improved with input field visibility and polling fixes, new sections for enhanced usability, and updated documentation.

<p class="link-arrow">[Amazon Textract connector](/components/connectors/out-of-the-box-connectors/amazon-textract.md)</p>

#### Azure Blob Storage connector supports OAuth 2.0

<!-- https://github.com/camunda/camunda-docs/pull/7280 -->

The Azure Blob Storage connector now supports OAuth2.0 authentication with Microsoft Azure.

<p class="link-arrow">[Azure Blob Storage connector OAuth 2.0](/components/connectors/out-of-the-box-connectors/azure-blob-storage.md#oauth-20)</p>

#### Email connector supports SMTP no authentication mode

<!-- https://github.com/camunda/connectors/issues/5473 -->

The Email connector now supports `noAuth` authentication mode for SMTP. This feature is useful for customers running local mail servers without authentication requirements.

<p class="link-arrow">[Email connector](/components/connectors/out-of-the-box-connectors/email.md)</p>

#### Runtime performance improvements with virtual threads executor (Self-Managed)

<!-- https://github.com/camunda/product-hub/issues/3050 -->

Connectors now use a virtual threads executor by default, using Project Loom to improve performance and scalability.

This allows the connector runtime to handle a larger number of concurrent jobs with lower resource consumption, particularly benefiting I/O-bound workloads typical in connector operations.

<!-- To learn more about optimizing connector performance with virtual threads, see [Connectors performance](/self-managed/components/connectors/performance.md). -->

### Console

<div class="release"><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--medium" title="This feature affects Console">Console</span></div>

#### Bulk import secrets (SaaS)

<!-- https://github.com/camunda/product-hub/issues/3283 -->

You can now add/import secrets in Console by directly uploading or pasting the contents of a .env file.

- Key–value pairs are automatically parsed, validated, and added as secrets.
- This helps reduce configuration errors and copy-pasting when adding secrets.

<p class="link-arrow">[Connector secrets](/components/console/manage-clusters/manage-secrets.md)</p>

#### Cluster description (SaaS)

<!-- https://github.com/camunda/product-hub/issues/3284 -->

You can now add a cluster description when creating a cluster or by editing the cluster settings. This helps you document context, ownership, or add operational notes without changing the cluster name.

<p class="link-arrow">[Create a cluster](/components/console/manage-clusters/create-cluster.md)</p>

#### Import cluster secrets (SaaS)

<!-- https://github.com/camunda/product-hub/issues/3307 -->

You can now import and export connector secrets between clusters within your organization.

Export a cluster’s secrets to a key-value file for backup or external workflows, and import secrets from another cluster in a single action. Imports automatically match keys, update existing values, create missing ones, and provide clear feedback on the result. Permissions are enforced so that only authorized users can perform these actions.

<p class="link-arrow">[Connector secrets](/components/console/manage-clusters/manage-secrets.md)</p>

#### Usage metrics for licence model and tenant (Self-Managed)

<!-- https://github.com/camunda/product-hub/issues/2997 -->

Self-Managed environment usage metrics now support per-tenant reporting and align with Camunda’s updated licensing model based on the number of tenants.

:::note
This feature is already available in the Camunda 8.8 release for Camunda 8 SaaS.
:::

### Database and data storage

<div class="release"><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects data storage">Data</span></div>

#### Configure external RDBMS in Helm

Configure an external relational database (RDBMS) as secondary storage for the Orchestration Cluster when deploying with Helm.

- Supports all databases listed in the RDBMS support policy.
- Includes full configuration parameters, history-cleanup options, and exporter settings.
- Describes how to load JDBC drivers via init containers, custom images, or mounted volumes.
- Provides steps to verify database connectivity.

<p class="link-arrow">[Configure RDBMS in Helm chart](/self-managed/deployment/helm/configure/database/rdbms.md)</p>

#### Open-source OpenSearch support

<!-- https://github.com/camunda/product-hub/issues/3009 -->

You can now use the [open-source OpenSearch](https://opensearch.org/) project for data storage in a Self-Managed deployment.

- This allows you to run a fully open source observability stack without using Elasticsearch or the Amazon OpenSearch Service.
- For configuration instructions, see the updated Helm chart values and compatibility matrix.

<p class="link-arrow">[Secondary storage](/self-managed/concepts/secondary-storage/index.md)</p>

#### RDBMS version support policy

<!-- https://github.com/camunda/product-hub/issues/2654 -->

A new Camunda 8 Relational Database Management System RDBMS support policy provides information about:

- Officially supported database versions.
- The process for adopting new database versions.
- Timelines for phasing out older database versions.

<p class="link-arrow">[RDBMS version support policy](/self-managed/concepts/databases/relational-db/rdbms-support-policy.md)</p>

#### SQL and Liquibase database scripts

SQL and Liquibase scripts are provided for all Camunda-supported databases.

- These scripts include database and schema creation, drop, and upgrade routines.
- Scripts follow best practices for each supported database type and version.
- The full script package is distributed as part of the official Camunda distribution, available via GitHub or Artifactory.

<p class="link-arrow">[SQL and Liquibase scripts](/self-managed/deployment/helm/configure/database/access-sql-liquibase-scripts.md)</p>

### Modeler

<div class="release"><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--medium" title="This feature affects Desktop Modeler">Desktop Modeler</span><span class="badge badge--medium" title="This feature affects Web Modeler">Web Modeler</span></div>

#### Element template signal support

<!-- https://github.com/camunda/camunda-modeler/issues/5381 -->

Element templates now support reusable [BPMN signals](/components/modeler/bpmn/signal-events/signal-events.md).

- The `bpmn:Signal#property` binding allows you to set the name of a `bpmn:Signal` referred to by the templated element.
- This binding is only valid for templates of events with `bpmn:SignalEventDefinition`.

<p class="link-arrow">[Element template `bpmn:Signal` binding](/components/modeler/element-templates/template-properties.md#signal-name-bpmnsignalproperty)</p>

#### Web Modeler: Embedded web server changed from Undertow to Tomcat (Self-Managed)

<!-- https://github.com/camunda/product-hub/issues/3191 -->

Web Modeler now uses [Apache Tomcat](https://tomcat.apache.org/) as an embedded web server instead of Undertow. Aligning Web Modeler logging with the Orchestration Cluster makes it easier for administrators to configure and maintain Self-Managed deployments.

<p class="link-arrow">[Embedded web server](/self-managed/components/components-upgrade/880-to-890.md#embedded-web-server)</p>

#### Web Modeler: IP egress monitoring (SaaS)

<!-- https://github.com/camunda/product-hub/issues/3131 -->

A new `/meta/ip-ranges` REST API endpoint allows you to monitor SaaS Web Modeler egress IP addresses.

- For example, the endpoint is available at https://api.cloud.camunda.io/meta/ip-ranges.
- Send a GET request to the endpoint to retrieve a list of egress IP addresses.
- Only IP addresses for the related services are exposed (Web Modeler).

:::note IP address changes

- You should periodically monitor this list via the API, and make any changes in your systems as required.
- Although expected changes are published via the API at least 24 hours in advance, in exceptional cases Camunda might have to update these addresses within 24 hours and without prior notice. See [static outbound IP addresses](/components/saas/ip-addresses.md#static-outbound-ip-addresses).

:::

## 8.9.0-alpha1

| Release date     | Changelog(s)                                                                                                                                                                               | Blog |
| :--------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--- |
| 13 November 2025 | <ul><li>[ Camunda 8 core ](https://github.com/camunda/camunda/releases/tag/8.9.0-alpha1)</li><li>[ Connectors ](https://github.com/camunda/connectors/releases/tag/8.9.0-alpha1)</li></ul> | -    |

### JDBC driver management for RDBMS integrations

<div class="release"><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Configuration">Configuration</span></div>

<!-- https://github.com/camunda/product-hub/issues/2742 -->

Camunda 8.9 introduces a standardized approach to JDBC driver management for RDBMS integrations in manual installations.

- A new `/driver-lib` directory separates Camunda-bundled drivers from customer-supplied ones, providing a clear and compliant structure for database connectivity.
- Drivers that Camunda can legally distribute are included by default. Customers can add and configure their own drivers (for example, Oracle JDBC).
- Configuration options allow full control, including explicit driver-class designation when required.

This change simplifies compliance and setup for RDBMS environments, ensuring consistent connectivity across PostgreSQL, Oracle, MariaDB, and H2.

### MySQL and Microsoft SQL Server secondary storage

<div class="release"><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Data">Data</span></div>

<!-- https://github.com/camunda/product-hub/issues/3043 -->

Camunda 8.9 extends RDBMS secondary storage to include MySQL and Microsoft SQL Server as additional database options for the Orchestration cluster.

- This enhancement provides greater flexibility for enterprises that depend on these databases due to policy, licensing, or ecosystem requirements, enabling smoother onboarding and infrastructure alignment.
- Zeebe’s primary execution storage remains Raft + RocksDB.

:::note
This alpha release introduces foundational support only. External configuration and Operate integration follows in upcoming alpha releases.
:::

### RDBMS secondary storage (H2, PostgreSQL, Oracle, MariaDB)

<div class="release"><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Data">Data</span></div>

<!-- https://github.com/camunda/product-hub/issues/2439 -->

Camunda 8.9 introduces RDBMS secondary storage as an alternative to Elasticsearch or OpenSearch for storing and querying process data.

This feature enables organizations to use relational databases such as H2, PostgreSQL, Oracle, or MariaDB as the secondary storage layer, reducing operational complexity for teams that do not need the scale or performance of Elasticsearch or OpenSearch and prefer an RDBMS-based solution.

Key highlights:

- **Flexible database choice:** Use relational databases instead of Elasticsearch or OpenSearch.
- **Separation of concerns:** Zeebe’s primary execution storage remains Raft + RocksDB; this update only extends the secondary storage layer.
- **Consistent APIs:** Continue using the same REST API and data format as with Elasticsearch or OpenSearch—no query or integration changes needed.
- **Simplified operations:** Leverage existing RDBMS expertise without maintaining Elasticsearch or OpenSearch clusters.

:::note
This alpha release introduces support for H2 in Camunda 8 Run only. Operate and external RDBMS configuration follows in upcoming alpha releases.
:::

### Web Modeler: RDBMS support (H2, MariaDB, MySQL)

<div class="release"><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--medium" title="This feature affects Data">Data</span><span class="badge badge--medium" title="This feature affects Web Modeler">Web Modeler</span></div>

<!-- https://github.com/camunda/product-hub/issues/3189 -->

Web Modeler now supports H2, MariaDB, and MySQL as relational database systems, aligning with the configurations supported by the Orchestration cluster.

This enhancement ensures consistency across environments, simplifies setup for administrators, and improves integration for both SaaS and Self-Managed deployments.
