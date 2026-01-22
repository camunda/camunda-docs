---
id: 890-alpha3-release-notes
title: "8.9 alpha 3 release notes"
sidebar_label: 8.9 alpha 3
description: "Release notes for the 8.9. alpha 3 release"
keywords:
  [
    "8.9 release notes",
    "release notes for 8.9",
    "release notes",
    "8.9.0-alpha3",
  ]
page_rank: 90
hide_table_of_contents: true
---

import ReleaseAnnouncementsFilter from '@site/src/components/ReleaseAnnouncementsFilter';

New features and important updates included in the 8.9 alpha 3 release.

| Version      | Release date    | Changelogs                                                                                                                                                         |
| :----------- | :-------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 8.9.0-alpha3 | 13 January 2026 | [ Camunda 8 core ](https://github.com/camunda/camunda/releases/tag/8.9.0-alpha3) / [ Connectors ](https://github.com/camunda/connectors/releases/tag/8.9.0-alpha3) |

<ReleaseAnnouncementsFilter>

<div className="release-announcement-row" data-type="update" data-area="Agentic orchestration" data-deployment="sm+saas">
  <div className="release-announcement-badge">
    <span className="badge badge--update">Update</span>
  </div>
  <div className="release-announcement-content">

### AWS Bedrock API key authentication support

<!-- https://github.com/camunda/connectors/issues/5551 -->

The Amazon Bedrock model configuration now allows authentication using (long-term) Bedrock API keys as an alternative to the already existing authentication methods.

  </div>
</div>

<div className="release-announcement-row" data-type="update" data-area="Agentic orchestration+Connectors" data-deployment="sm+saas">
  <div className="release-announcement-badge">
    <span className="badge badge--update">Update</span>
  </div>
  <div className="release-announcement-content">

### Model timeout configuration

<!-- https://github.com/camunda/connectors/issues/5808 -->

The AI Agent connectors now support setting a timeout value on supported models.

  </div>
</div>

<div className="release-announcement-row" data-type="update" data-area="Agentic orchestration+Connectors" data-deployment="sm+saas">
  <div className="release-announcement-badge">
    <span className="badge badge--update">Update</span>
  </div>
  <div className="release-announcement-content">

### Query parameters support on OpenAI compatible models

<!-- https://github.com/camunda/connectors/issues/5546 -->

The OpenAI compatible model configuration now allows configuration of query parameters to be added to the model endpoint URL. This might be needed for custom API endpoints requiring additional metadata (such as API versions) to be set via query parameters.

<p class="link-arrow">[AI Agent connector](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent.md)</p>

  </div>
</div>

<div className="release-announcement-row" data-type="update" data-area="Camunda 8 Run" data-deployment="sm">
  <div className="release-announcement-badge">
    <span className="badge badge--update">Update</span>
  </div>
  <div className="release-announcement-content">

### Streamline your Camunda 8 Run experience

<!-- https://github.com/camunda/product-hub/issues/2866 -->

Camunda 8 Run is now easier to use with improved setup and configuration.

The CLI includes a helpful usage page, clearer error messages, especially for Elasticsearch startup, and prominently displays connection properties and credential information.

A revamped Java detection guided setup, log cleanup options, and better defaults for development environments (such as disk watermark thresholds) have been added. You can also start fresh using a new clean-state command, and the unified configuration file is now included and thoroughly documented.

<p class="link-arrow">[Camunda 8 Run](/self-managed/quickstart/developer-quickstart/c8run.md)</p>

  </div>
</div>

<div className="release-announcement-row" data-type="feature" data-area="Camunda 8 Run" data-deployment="sm">
  <div className="release-announcement-badge">
    <span className="badge badge--feature">Feature</span>
  </div>
  <div className="release-announcement-content">

### Use H2 for data storage

Camunda 8 Run now includes H2 as the default secondary data store, providing:

- A lighter, simpler local development experience.
- Lower memory usage.
- A fully functional stack that doesn't require an external database.

New documentation shows you how to:

- Install Camunda 8 Run with H2 as the default secondary storage.
- Seamlessly switch from H2 to Elasticsearch or OpenSearch when required.

</div>
</div>

<div className="release-announcement-row" data-type="feature" data-area="Listeners" data-deployment="sm+saas">
  <div className="release-announcement-badge">
    <span className="badge badge--feature">Feature</span>
  </div>
  <div className="release-announcement-content">

### Global user task listeners

<!-- https://github.com/camunda/product-hub/issues/2586 -->

Camunda 8.9 introduces configuration-based global user task listeners for Self-Managed deployments.

Administrators can define cluster-wide listeners using configuration files or environment variables, ensuring they are applied consistently from cluster startup and preserved across backup and restore operations.

All user task lifecycle events emit payloads containing full variable context and metadata, enabling standardized integrations across all processes.

<p class="link-arrow">[Global User task Listeners](/components/concepts/global-user-task-listeners.md)</p>

</div>
</div>

<div className="release-announcement-row" data-type="feature" data-area="Modeler" data-deployment="sm+saas">
  <div className="release-announcement-badge">
    <span className="badge badge--feature">Feature</span>
  </div>
  <div className="release-announcement-content">

### Desktop Modeler: Manage Camunda connections

<!-- https://github.com/camunda/product-hub/issues/2970 -->

You can now manage Camunda connections directly in Desktop Modeler:

- Add, edit, delete, and save multiple connections.
- Securely store credentials and connection settings.
- Deploy directly to saved connections.
- Select an existing Orchestration Cluster or add a new one during deployment.

This streamlines the deployment workflow and reduces setup friction.

</div>
</div>

<div className="release-announcement-row" data-type="feature" data-area="Modeler" data-deployment="sm+saas">
  <div className="release-announcement-badge">
    <span className="badge badge--feature">Feature</span>
  </div>
  <div className="release-announcement-content">

### Web Modeler: Create event templates

<!-- https://github.com/camunda/product-hub/issues/3173 -->

You can now create, discover, and apply templates for more BPMN event types, including message, signal, and timer, directly within the element template editor.

You can also create global event templates that:

- Are reusable across projects.
- Standardize event configurations (for example, message names or payload structures).
- Help ensure consistency across teams and models.

<p class="link-arrow">[Element templates in Modeler](/components/modeler/element-templates/defining-templates.md)</p>

</div>
</div>

<div className="release-announcement-row" data-type="feature" data-area="Modeler" data-deployment="sm+saas">
  <div className="release-announcement-badge">
    <span className="badge badge--feature">Feature</span>
  </div>
  <div className="release-announcement-content">

### Web Modeler: Invite users via email

<!-- https://github.com/camunda/product-hub/issues/3187 -->

As a Self-Managed administrator, you can now invite users to Web Modeler projects via email across all OIDC providers, eliminating the need to wait for users to log in first.

- Email-based invitations work for all OIDC providers (Keycloak, Entra ID, Okta, Auth0), matching SaaS behavior.
- Keycloak no longer receives special treatment; all providers follow the same invitation workflow.

This enables faster project provisioning and a consistent administrator experience across identity providers.

<p class="link-arrow">[Add users to projects](/components/modeler/web-modeler/collaboration/collaboration.md#add-users-to-projects)</p>

</div>
</div>

<div className="release-announcement-row" data-type="feature" data-area="Orchestration Cluster" data-deployment="sm+saas">
  <div className="release-announcement-badge">
    <span className="badge badge--feature">Feature</span>
  </div>
  <div className="release-announcement-content">

### Manage configuration with cluster variables

<!-- https://github.com/camunda/product-hub/issues/2717 -->

Camunda 8.9 now supports cluster variables, letting you centrally manage configuration across your cluster. You can access these variables directly in the Modeler using FEEL expressions:

| Variable               | Scope                               | Priority |
| :--------------------- | :---------------------------------- | :------- |
| `camunda.vars.cluster` | Global                              | Lowest   |
| `camunda.vars.tenant`  | Tenant                              | Medium   |
| `camunda.vars.env`     | Merged view with automatic priority | Highest  |

For example, if the same variable exists in multiple scopes, the priority is as follows:

- A Tenant variable overrides a Global variable.
- A Process-level variable has the highest priority, overriding both.

This hierarchy allows you to create cascading configurations, where specific contexts override broader defaults.

Cluster variables support simple key-value pairs and nested objects, which you can access with dot notation for complex structures. You can manage all cluster variables via the Orchestration Cluster API.

<p class="link-arrow">[Cluster variables](/components/modeler/feel/cluster-variable/overview.md)</p>

</div>
</div>

<div className="release-announcement-row" data-type="feature" data-area="Orchestration Cluster+Data" data-deployment="sm">
  <div className="release-announcement-badge">
    <span className="badge badge--feature">Feature</span>
  </div>
  <div className="release-announcement-content">

### Use Amazon Aurora for secondary storage

<!-- https://github.com/camunda/product-hub/issues/3025 -->

Camunda 8.9 now supports Amazon Aurora as a secondary data store for orchestration clusters, in addition to existing options.

- Supports Aurora PostgreSQL (compatible with PostgreSQL 14–17).
- Designed for secure, high-performance, cloud-native deployments.
- Seamless integration with AWS features, including:
  - IAM / IRSA authentication.
  - High availability and failover.
  - Alignment with DBA best practices.

Helm charts and manual installation guides now include tested configurations and step-by-step references for Aurora, reducing operational complexity and accelerating adoption for AWS-centric organizations.

</div>
</div>

<div className="release-announcement-row" data-type="update" data-area="Agentic orchestration" data-deployment="sm+saas">
  <div className="release-announcement-badge">
    <span className="badge badge--update">Update</span>
  </div>
  <div className="release-announcement-content">

### Process instance migration

<!-- https://github.com/camunda/product-hub/issues/3065 -->

Camunda 8.9 now supports migration of process instances that include ad-hoc subprocesses, covering both single-instance and multi-instance (parallel and sequential) variants.

With this enhancement, you can:

- Safely migrate running instances.
- Update AI agent flows.
- Modernize process definitions without losing execution state.

This unlocks more flexible, agent-driven orchestration and faster iteration on live automation.

<p class="link-arrow">[Process instance migration](/components/concepts/process-instance-migration.md)</p>

</div>
</div>

<div className="release-announcement-row" data-type="feature" data-area="Data+Deployment" data-deployment="sm">
  <div className="release-announcement-badge">
    <span className="badge badge--feature">Feature</span>
  </div>
  <div className="release-announcement-content">

### RDBMS secondary storage

<!-- https://github.com/camunda/product-hub/issues/2690 -->

Camunda 8.9 Helm charts now support RDBMS as fully integrated secondary storage options for orchestration clusters, providing a first-class alternative to Elasticsearch and OpenSearch.

With this update, administrators can:

- Use RDBMS as an alternative to Elasticsearch or OpenSearch.
- Configure database connections directly in `values.yaml`.
- Enable advanced authentication and custom JDBC drivers.

This allows enterprises to run Camunda 8 on familiar, enterprise-managed RDBMS infrastructure aligned with existing security, backup, and compliance requirements.

</div>
</div>

</ReleaseAnnouncementsFilter>
