---
id: 8100-release-notes
title: "8.10 Release notes"
sidebar_label: Release notes
description: "Release notes for new features included in the 8.10 minor release, including alpha feature releases."
keywords: ["8.10 release notes", "release notes for 8.10", "release notes"]
page_rank: 90
---

import PageDescription from '@site/src/components/PageDescription';

<PageDescription />

| Minor release date | Scheduled end of maintenance | Changelog(s)                                                                 | Upgrade guides                                                                                        |
| :----------------- | :--------------------------- | :--------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------- |
| 13 October 2026    | 11 April 2028                | [Patch Releases and Changelogs](#technical-changelogs-for-all-810x-releases) | [8.10 upgrade guides](/reference/announcements-release-notes/8100/whats-new-in-810.md#upgrade-guides) |

:::info 8.10 resources

- See [What's new in Camunda 8.10](/reference/announcements-release-notes/8100/whats-new-in-810.md) for important changes to consider when planning your upgrade from Camunda 8.8.
- See [release announcements](/reference/announcements-release-notes/8100/8100-announcements.md) to learn more about supported environment changes, breaking changes, and deprecations.
- Refer to the [quality board](https://github.com/orgs/camunda/projects/187/views/23) for an overview of known bugs by component and severity.

:::

### Technical Changelogs for all 8.10.x releases

<details className="changelog-dropdown">
  <summary>Overview of all patch releases and their Changelogs in GitHub</summary>

<!-- RELEASE_LINKS_PLACEHOLDER -->

</details>

## 8.10.0-alpha3

| Release date | Changelog(s)                                                                                        | Blog |
| :----------- | :-------------------------------------------------------------------------------------------------- | :--- |
| 14 July 2026 | <ul><li>[ Camunda 8 core ](https://github.com/camunda/camunda/releases/tag/8.10.0-alpha3)</li></ul> | -    |

### Agentic orchestration

#### AI agent testing assertions in Camunda Process Test

<!-- https://github.com/camunda/product-hub/issues/3315 -->

<div class="release"><span class="badge badge--medium" title="This feature affects AI agents">AI agents</span><span class="badge badge--long" title="This feature affects Agentic orchestration">Agentic orchestration</span></div>

You can now test non-deterministic AI agent behavior in Camunda Process Test (CPT) with conditional behavior controls and evaluation-based assertions. This helps you validate agent behavior and output quality with clearer, more reliable test outcomes.

- Define conditional behavior in tests with a `when(condition).then(action)` API for activation-based flow control.
- Assert output quality with LLM-as-Judge expectations when exact matching is not enough.
- Assert semantic similarity with embedding-based comparison for responses that vary in phrasing.
- Configure remote or local models through code and properties for both local development and CI/CD pipelines.

<p class="link-arrow">[Test your AI agents with CPT](/components/agentic-orchestration/evaluate-agents/test-ai-agents.md)</p>

### APIs & tools

#### Public Hub REST API

<!-- https://github.com/camunda/product-hub/issues/3413 -->

<div class="release"><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--medium" title="This feature affects Camunda Hub">Camunda Hub</span></div>

Camunda Hub now provides a public REST API under `/v2/` for programmatic access to Hub resources. The OpenAPI specification is published on docs.camunda.io, and the Hub API is included in the official Camunda Postman collection. The API aligns with the Orchestration Cluster API guidelines, with standardized error handling and data-fetching patterns.

:::note
The Console Self-Managed and Web Modeler APIs are deprecated in favor of the public Hub REST API. See the [release announcement](/reference/announcements-release-notes/8100/8100-announcements.md#console-sm-and-web-modeler-apis-deprecated) for details.
:::

### Camunda Hub

#### Bespoke cluster generations for SaaS

<!-- https://github.com/camunda/product-hub/issues/3704 -->

<div class="release"><span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--medium" title="This feature affects Camunda Hub">Camunda Hub</span></div>

Organizations can now access exclusive Camunda 8 generation versions tailored specifically for their organization, available for both new cluster creation and upgrades. These generations are not visible to other organizations.

#### Git-based catalog

<!-- https://github.com/camunda/product-hub/issues/3402 -->

<div class="release"><span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--medium" title="This feature affects Camunda Hub">Camunda Hub</span><span class="badge badge--medium" title="This feature affects Web Modeler">Web Modeler</span></div>

Camunda Hub introduces an organization-level catalog for reusable, Center of Excellence (CoE)-approved assets, such as element templates, connectors, forms, and DMNs, backed by source control management (SCM).

CoE teams can submit assets through the API from their SCM workflows, and delivery teams can browse catalog entries in Hub and inspect asset details. This release also adds in-diagram notifications for updated shared assets and pre-deployment dependency checks that surface missing DMNs, forms, connectors, and other dependencies on the target cluster before deployment.

#### Outdated catalog assets visibility

<!-- https://github.com/camunda/product-hub/issues/3490 -->

<div class="release"><span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--medium" title="This feature affects Camunda Hub">Camunda Hub</span></div>

You can now see at a glance which catalog assets are outdated and where they are used across your organization.

- The **Manage assets** table shows outdated and up-to-date indicators for each asset.
- Select an outdated asset to see the workspaces, projects, and files where it is in use, so you can assess impact and reach the right owners.
- The **Workspace assets** tab (**Manage > Assets**) surfaces outdated status at the workspace level.
- Query which files, projects, and owners use a specific outdated asset through the API, for automated governance workflows.

All views are permission-aware.

#### Select a target version when upgrading a cluster

<!-- https://github.com/camunda/product-hub/issues/3741 -->

<div class="release"><span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--medium" title="This feature affects Camunda Hub">Camunda Hub</span><span class="badge badge--medium" title="This feature affects Orchestration Cluster">Orchestration Cluster</span></div>

When you upgrade an orchestration cluster that has more than one valid upgrade target, Console now shows a version selection step in the upgrade wizard. Each option displays the generation name and the Zeebe patch version.

The recommended version (the longest upgrade path) is pre-selected and labeled **latest**, and you can choose a different option before proceeding. Clusters with only one upgrade target keep the existing flow.

### Modeler

#### Process application versioning redesign

<!-- https://github.com/camunda/product-hub/issues/3175 -->

<div class="release"><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--medium" title="This feature affects Web Modeler">Web Modeler</span></div>

Web Modeler now offers a unified versioning model for process applications:

- Continuous change history on every file, where every save is recoverable with no user action required.
- File versions you can name, compare (any two, including non-adjacent), and restore individually without affecting the rest of the process application.
- Process application versions, a deliberate and named capture of the entire project, with comparison that highlights only changed files.
- A two-step deployment form to configure resources and cluster, then review with a version banner, binding overview, and a non-blocking warning for empty `versionTag` references.
- Deployment records that link modeler state, binding configuration, and the Zeebe `deploymentKey` per cluster, for traceability from Operate back to the exact files deployed.

#### Safe deletion with a 30-day recovery window

<!-- https://github.com/camunda/product-hub/issues/3568 -->

<div class="release"><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--medium" title="This feature affects Web Modeler">Web Modeler</span></div>

Deleting an item in Web Modeler no longer removes it immediately. Deleted projects, files, folders, process applications, and IDP applications are moved to **Recently deleted** for 30 days. During that time, users with the appropriate permissions can see who deleted an item and when, and restore it. After 30 days, items are permanently deleted.

Deletion no longer corrupts process application version history, as existing snapshots continue to reference deleted files correctly. The recovery window applies to deletions made in 8.10 and later; items deleted before upgrading cannot be recovered.

<p class="link-arrow">[Recover deleted resources](/components/hub/workspace/manage-projects/recently-deleted.md)</p>

#### Test process segments in Play

<!-- https://github.com/camunda/product-hub/issues/2896 -->

<div class="release"><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--medium" title="This feature affects Web Modeler">Web Modeler</span></div>

When testing your process with Play in Web Modeler, you can now capture and rerun targeted sections of an agentic process as low-code integration tests:

- Run segment tests individually or in batches to validate process changes faster.
- Test BPMN elements like connectors, DMN, forms, and LLM tasks without a full end-to-end run.
- Reuse saved segment tests during iterative model changes to catch regressions earlier.

<p class="link-arrow">[Play your process](/components/hub/workspace/modeler/validation/play-your-process.md)</p>

#### Variables panel improvements

<!-- https://github.com/camunda/camunda-modeler/issues/5934, https://github.com/camunda/camunda-modeler/issues/5938 -->

<div class="release"><span class="badge badge--medium" title="This feature affects Desktop Modeler">Desktop Modeler</span></div>

When you hover over "written in X elements" or an element ID in the variables panel, the diagram now highlights the corresponding element or elements so you can quickly see where a variable is used.

FEEL expressions in the variable outline now use the same syntax highlighting as the FEEL editor, with more granular tokens that distinguish function names from arguments and operators from literals, making complex expressions easier to read.

<p class="link-arrow">[Inspect variables](/components/modeler/data-handling.md#inspecting-variables)</p>

### Operate

#### Multi-variable filtering

<!-- https://github.com/camunda/product-hub/issues/3459 -->

<div class="release"><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--medium" title="This feature affects Operate">Operate</span></div>

In Operate, you can now combine multiple variable filters with `AND` logic to find exactly the process instances you need.

Filter by variable name, value, and comparison operators, such as `equals`, `contains`, `greater than`, and `less than`, including nested JSON paths.

<p class="link-arrow">[Multi-variable filters](/components/operate/userguide/filter-process-instances.md#multi-variable-filters)</p>

#### Wait states

<!-- https://github.com/camunda/camunda/issues/45040 -->

<div class="release"><span class="badge badge--medium" title="This feature affects Operate">Operate</span><span class="badge badge--medium" title="This feature affects Orchestration Cluster API">Orchestration Cluster API</span></div>

Operate now shows what an active process instance is waiting for. When you inspect an active element, you can see the wait state and its details, for example, a timer's due date, a receive task's message name and correlation key, a signal name, a condition expression, or a job's type and state.

Wait state tracking is enabled by default and writes records to secondary storage. In Camunda 8 Self-Managed, you can [disable it](/self-managed/concepts/wait-states/configure.md) if you do not want to track this data.

<p class="link-arrow">[Wait states](/components/wait-states/overview.md)</p>

### Optimize

#### Optimize disabled by default on new trial clusters

<!-- https://github.com/camunda/product-hub/issues/3700 -->

<div class="release"><span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--medium" title="This feature affects Optimize">Optimize</span></div>

On new trial clusters in Camunda 8 SaaS, Optimize is now disabled by default. When Optimize is disabled, the overview shows a muted tile with an **Enable Optimize** prompt so it stays discoverable.

Upgrading from a trial to a paid plan automatically enables Optimize, with no manual action required.

### Orchestration Cluster

#### Archive by ID for Elasticsearch and OpenSearch

<!-- https://github.com/camunda/camunda-docs/pull/9172 -->

<div class="release"><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Orchestration Cluster">Orchestration Cluster</span></div>

Archiving of finished process instance data in Elasticsearch and OpenSearch secondary storage now uses a targeted, incremental approach by default (`archiveByIdEnabled: true`). Documents are moved in small, targeted batches rather than in a single operation, improving stability and reducing resource pressure during archiving. The `rolloverBatchSize` and `reindexBatchSize` properties control how many process instances and individual documents are processed per batch.

<p class="link-arrow">[Data retention](/self-managed/components/orchestration-cluster/core-settings/concepts/data-retention.md)</p>

#### Async replication support for RDBMS secondary storage

<!-- https://github.com/camunda/product-hub/issues/3585 -->

<div class="release"><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Orchestration Cluster">Orchestration Cluster</span></div>

Camunda 8.10 adds first-class support for asynchronously replicated relational databases as secondary storage, including AWS Aurora and PostgreSQL.

The exporter layer detects when the active RDBMS endpoint is unreachable, including during a standby promotion or cross-region failover, and pauses export operations automatically rather than entering an error state. Export position is preserved in the Zeebe log and replayed on reconnection.

After failover, a reconciliation path replays missing events from the Zeebe log to close any replication lag gap, restoring a consistent secondary storage state without manual data repair. A single-exporter configuration is now supported for deployments where the RDBMS handles cross-region replication natively.

<p class="link-arrow">[RDBMS configuration overview](/self-managed/concepts/databases/relational-db/configuration.md)</p>

#### Dual-region ECS reference architecture

<!-- https://github.com/camunda/product-hub/issues/3552 -->

<div class="release"><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Orchestration Cluster">Orchestration Cluster</span></div>

Camunda 8.10 adds a dual-region reference architecture for running the Orchestration Cluster and Connectors on AWS ECS with an RDBMS secondary storage such as Aurora Global Database.

The documentation covers the recommended topology, exporter configuration, and RDBMS replication setup, and includes step-by-step failover and failback procedures for active-active and active-passive two-region ECS environments.

<p class="link-arrow">[Dual-region ECS reference architecture](/self-managed/deployment/containers/cloud-providers/amazon/aws-ecs-dual-region.md)</p>

#### New RDBMS version support

<!-- https://github.com/camunda/product-hub/issues/3589 -->

<div class="release"><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Orchestration Cluster">Orchestration Cluster</span></div>

Camunda 8.10 adds support for new relational database versions. Operators running self-managed Camunda clusters can upgrade their database layer to the latest supported versions without disruption to running process instances.

New supported versions include PostgreSQL 18, Amazon Aurora PostgreSQL 18, MariaDB 12.3, and Microsoft SQL Server 2025.

<p class="link-arrow">[RDBMS version support policy](/self-managed/concepts/databases/relational-db/rdbms-support-policy.md)</p>

#### Physical tenant support

<!-- https://github.com/camunda/product-hub/issues/3639 -->

<div class="release"><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Orchestration Cluster">Orchestration Cluster</span></div>

Camunda 8.10 introduces physical tenant support for RDBMS, enabling strong isolation across tenants. Elasticsearch and OpenSearch support is planned for 8.10.

- The REST API and gRPC API are exposed per physical tenant, with `CamundaClient` supporting physical tenant selection in the gRPC API.
- Web apps (Operate, Tasklist, and Admin) are accessible per physical tenant at `<baseurl>/physical-tenants/<physicalTenantId>/<webapp>`.
- Authentication is configurable as `basic auth` or OIDC at the cluster level, with support for multiple OIDC providers assigned to individual physical tenants.

<p class="link-arrow">[Physical tenant isolation model](/self-managed/concepts/physical-tenants/index.md)</p>

#### Select a DMN version with a FEEL expression

<!-- https://github.com/camunda/product-hub/issues/3501 -->

<div class="release"><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--medium" title="This feature affects Orchestration Cluster">Orchestration Cluster</span></div>

You can now call a dynamically calculated version of a DMN decision from a BPMN business rule task by specifying the version with a FEEL expression.

<p class="link-arrow">[Business rule tasks](/components/modeler/bpmn/business-rule-tasks/business-rule-tasks.md#defining-a-task)</p>

#### Zone-aware partition placement

<!-- https://github.com/camunda/product-hub/issues/3618 -->

<div class="release"><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Orchestration Cluster">Orchestration Cluster</span></div>

Camunda 8.10 introduces region awareness to the Orchestration Cluster. Operators declare which region each broker belongs to using a topology label, and the engine uses those declarations to distribute partition replicas across regions, ensuring no single region holds a quorum for any partition.

Leader election priorities respect region boundaries, preferring region-local leaders under normal conditions and adjusting automatically when a region becomes unavailable. The same mechanism extends to availability zone or datacenter isolation using the same configuration.

<p class="link-arrow">[Orchestration Cluster configuration properties](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md)</p>

### Helm chart deployment

#### Docker images

<!-- https://github.com/camunda/camunda/issues/50159 -->

<div class="release"><span class="badge badge--medium" title="This feature affects Zeebe">Zeebe</span><span class="badge badge--medium" title="This feature affects Operate">Operate</span><span class="badge badge--medium" title="This feature affects Tasklist">Tasklist</span></div>

Camunda no longer produces the following Docker images in Camunda 8.10 and later, or in Camunda 8.9 from patch release 8.9.12:

- [camunda/zeebe](https://hub.docker.com/r/camunda/zeebe)
- [camunda/operate](https://hub.docker.com/r/camunda/operate)
- [camunda/tasklist](https://hub.docker.com/r/camunda/tasklist)

Use the unified [camunda/camunda](https://hub.docker.com/r/camunda/camunda) Docker image instead.

## 8.10.0-alpha2

| Release date | Changelog(s)                                                                                                                                                                                 | Blog |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--- |
| 09 June 2026 | <ul><li>[ Camunda 8 core ](https://github.com/camunda/camunda/releases/tag/8.10.0-alpha2)</li><li>[ Connectors ](https://github.com/camunda/connectors/releases/tag/8.10.0-alpha2)</li></ul> | -    |

### Agentic orchestration

#### Skills repository for pro-code AI enablement

<!-- https://github.com/camunda/product-hub/issues/3557 -->

<div class="release"><span class="badge badge--medium" title="This feature affects AI agents">AI agents</span><span class="badge badge--long" title="This feature affects Agentic orchestration">Agentic orchestration</span><span class="badge badge--medium" title="This feature is in early access">Early access</span></div>

The Camunda Skills repository toolset enables AI coding agents to build, validate, and configure Camunda artifacts. With the Skills installed, your AI agent can:

- Build and modify BPMN diagrams with a human-readable layout.
- Configure connectors using element templates (no raw XML).
- Generate form schemas with validation.
- Create and edit DMN decision tables.
- Run BPMN lint rules against generated diagrams.
- Scaffold and wire Camunda Process Test (CPT) integration tests.

#### Judge assertions in CPT JSON Test Cases

<!-- https://github.com/camunda/camunda/issues/46462 -->

<div class="release"><span class="badge badge--medium" title="This feature affects AI agents">AI agents</span><span class="badge badge--long" title="This feature affects Agentic orchestration">Agentic orchestration</span></div>

Camunda Process Test (CPT) now supports **judge assertions** in JSON test cases.

- Define judge assertions using [JSON test case instructions](/apis-tools/testing/json-test-cases.md#reference-instructions).
- Use a preconfigured judge from `camunda-container-runtime.properties` or Spring application properties depending on the test execution context.

#### Processes MCP Server

<div class="release"><span class="badge badge--medium" title="This feature affects Orchestration Cluster">Orchestration Cluster</span></div>

<!-- https://github.com/camunda/camunda/issues/48491 -->

AI agents can use the [Processes MCP Server](/apis-tools/processes-mcp/processes-mcp-overview.md) to discover and call deployed BPMN processes as [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) tools.

When you deploy a process with an MCP start event it is automatically registered as a callable tool. MCP clients connect to the `/mcp/processes` endpoint and can invoke any registered process, with the Orchestration Cluster starting a new process instance and immediately returning the process instance key.

The server also exposes [static tools](/apis-tools/processes-mcp/processes-mcp-static-tools.md) for inspecting running process instances, so agents can check variables, state, and incidents without switching servers.

### APIs & tools

#### Camunda 8 Run no longer requires Java

Camunda 8 Run now includes a bundled Java runtime. This means you no longer need to install OpenJDK or set `JAVA_HOME` before starting Camunda 8 Run.

<p class="link-arrow">[Camunda 8 Run](/self-managed/quickstart/developer-quickstart/c8run.md)</p>

#### FEEL evaluation with process instance key

<!-- https://github.com/camunda/product-hub/issues/3606 -->

<div class="release"><span class="badge badge--medium" title="This feature affects Orchestration Cluster API">Orchestration Cluster API</span></div>

The `POST /v2/expression/evaluation` endpoint now optionally evaluates expressions in the context of:

- A process instance, via `processInstanceKey`.
- A flow node instance, via `elementInstanceKey`.

The endpoint:

- Combines process instance variables, element-local variables (for element scope), cluster variables, and optional request context into a single evaluation context.
- Enforces `EXPRESSION:EVALUATE` plus `PROCESS_DEFINITION:READ_PROCESS_INSTANCE` on the underlying process definition.
- Requires exactly one of `processInstanceKey` or `elementInstanceKey` (mutually exclusive); sending both returns `400 Bad Request`.

Behavior remains free from side effects and uses the same timeout and guardrails as the existing cluster-scope evaluation.

#### Removal of deprecated APIs, Zeebe Client, and Zeebe Process Test

<div class="release"><span class="badge badge--medium" title="This feature affects Orchestration Cluster API">Orchestration Cluster API</span></div>

The deprecated Operate and Tasklist APIs are removed. Process data, task management, and operational queries are now served through the [Orchestration Cluster API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md).

<p class="link-arrow">[Migrate to the Orchestration Cluster API](/apis-tools/migration-manuals/migrate-to-camunda-api.md)</p>

The Zeebe Client is removed and replaced by the [Camunda Java Client](/apis-tools/java-client/getting-started.md). This covers process deployment, message correlation, and job handling.

<p class="link-arrow">[Migrate to the Camunda Java Client](/apis-tools/migration-manuals/migrate-to-camunda-java-client.md)</p>

The Zeebe Process Test library is removed and replaced by [Camunda Process Test](/apis-tools/testing/getting-started.md). This provides richer assertions, Spring integration, and alignment with the Orchestration Cluster API surface.

<p class="link-arrow">[Migrate to Camunda Process Test](/apis-tools/migration-manuals/migrate-to-camunda-process-test.md)</p>

### Modeler

#### Support for start forms in Desktop Modeler

<!-- https://github.com/camunda/product-hub/issues/2406 -->

<div class="release"><span class="badge badge--medium" title="This feature affects Desktop Modeler">Desktop Modeler</span></div>

Desktop Modeler now supports defining form references on [none start events](/components/modeler/bpmn/none-events/none-events.md) in Camunda 8 BPMN models, matching the existing Web Modeler capability.

You can configure start forms directly in Desktop Modeler's properties panel using:

- Camunda Form (linked): Reference a deployed Camunda Form by ID.
- Camunda Form (embedded): Embed form JSON in the BPMN diagram (deprecated).

Start forms can now be defined and edited in both modelers, ensuring a seamless experience when working with diagrams across Web Modeler and Desktop Modeler.

### Orchestration Cluster

#### Default RocksDB memory allocation strategy changed to `FRACTION`

<div class="release"><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--medium" title="This feature affects Orchestration Cluster">Orchestration Cluster</span></div>

The default RocksDB memory allocation strategy changes from `PARTITION` to `FRACTION`. RocksDB memory is now allocated as a fraction of total available memory (default `0.1`, or 10%) instead of scaling with the number of partitions per broker. This may result in a different amount of memory being allocated to RocksDB.

To keep the previous behavior, explicitly set the strategy to `PARTITION`. See the [release announcement](/reference/announcements-release-notes/8100/8100-announcements.md#rocksdb-memory-allocation-strategy) for more details.

<p class="link-arrow">[Zeebe memory allocation](/self-managed/components/orchestration-cluster/zeebe/operations/resource-planning.md#memory)</p>

### Optimize

#### Scope-aware variable export configuration for Optimize

<!-- https://github.com/camunda/product-hub/issues/3435 -->

<div class="release"><span class="badge badge--medium" title="This feature affects Optimize">Optimize</span></div>

You can now configure variable export behavior by scope:

- You can enable or disable root (process instance) variables and local variables independently.
- You can exclude all local variables by default, while still allowing specific local variables by name pattern.
- Configuration integrates with the existing variable filtering mechanism, using consistent syntax and semantics.

Terminology aligns with Camunda 8 docs:

- **Root scope/process instance scope**: Variables visible across the process.
- **Local variables**: Variables defined in child scopes only.

With this, you can configure setups such as:

- Export only root variables for all processes.
- Export a curated subset of local variables (for example, `taskContextDisplayName` or specific local audit variables) without exposing all locals.

## 8.10.0-alpha1

| Release date | Changelog(s)                                                                                                                                                                                 | Blog |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--- |
| 13 May 2026  | <ul><li>[ Camunda 8 core ](https://github.com/camunda/camunda/releases/tag/8.10.0-alpha1)</li><li>[ Connectors ](https://github.com/camunda/connectors/releases/tag/8.10.0-alpha1)</li></ul> | -    |

### Agentic orchestration

#### AI Agent connector: Conversation storage SPI redesign

<!-- https://github.com/camunda/connectors/pull/6784 -->

<div class="release"><span class="badge badge--medium" title="This feature affects AI agents">AI agents</span><span class="badge badge--long" title="This feature affects Agentic orchestration">Agentic orchestration</span><span class="badge badge--medium" title="This feature affects Connectors">Connectors</span></div>

The conversation storage SPI used by [custom AI Agent storage backends](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-customization.md#custom-conversation-storage) has been redesigned. Built-in stores are migrated transparently; custom `ConversationStore` implementations must be updated.

See the [release announcement](/reference/announcements-release-notes/8100/8100-announcements.md#ai-agent-connector-conversation-storage-spi-redesign) for more details.

#### Camunda-provided LLM for SaaS

<!-- https://github.com/camunda/product-hub/issues/2883 -->

<div class="release"><span class="badge badge--medium" title="This feature affects AI agents">AI agents</span><span class="badge badge--long" title="This feature affects Agentic orchestration">Agentic orchestration</span><span class="badge badge--long" title="This feature affects SaaS">SaaS</span></div>

You can now run any AI Agent on Camunda 8 SaaS in minutes using the [Camunda-provided LLM](/components/agentic-orchestration/camunda-provided-llm.md), without wiring your own LLM credentials. Whether you start from a Camunda-provided agentic blueprint or build your own agent from scratch, the required credentials are populated automatically as cluster secrets, so there is little to no extra setup needed to get started.

The included budget is sufficient for hundreds or thousands of agent runs even on a trial account, depending on the model used. For enterprise organizations, AI features must be enabled first; after that, Camunda-provided LLM is enabled automatically.

This dramatically reduces time-to-first-running-agent by removing the need for external LLM infrastructure or credential setup on day one.

#### MCP start event element template

<div class="release"><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--medium" title="This feature affects Web Modeler">Web Modeler</span><span class="badge badge--medium" title="This feature affects Desktop Modeler">Desktop Modeler</span></div>

<!-- https://github.com/camunda/connectors/pull/6742 -->

The **MCP start event** element template is now available in Web Modeler and Desktop Modeler. Apply it to a BPMN message start event to configure the process as an MCP tool with name, purpose, inputs, and usage guidance for LLMs.

See [MCP start event](/components/connectors/out-of-the-box-connectors/agentic-ai-mcp-start-event.md) for the full property reference.

#### Standalone evaluation assertions for judge and semantic similarity

<!-- https://github.com/camunda/camunda/issues/46130
https://github.com/camunda/camunda/issues/46130
https://github.com/camunda/camunda/issues/49548 -->

<div class="release"><span class="badge badge--medium" title="This feature affects AI agents">AI agents</span><span class="badge badge--long" title="This feature affects Agentic orchestration">Agentic orchestration</span></div>

Camunda Process Test now exposes **judge-based evaluation** and **semantic similarity evaluation** as standalone AssertJ assertions for arbitrary string values, without requiring process-variable assertions. Semantic similarity checks support configurable embedding models and thresholds, and both assertion types reuse the existing CamundaAssert configuration with optional local overrides.

### Camunda Hub

#### Usage & billing metrics for 2025 enterprise license model

<!-- https://github.com/camunda/product-hub/issues/3571 -->

<div class="release"><span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--medium" title="This feature affects Camunda Hub">Camunda Hub</span></div>

Camunda Hub and Accounts now support the 2025 enterprise license model.

- A new `licensing_model` attribute on `OrganizationMetaData` identifies if an enterprise organization is using the **2025** or **legacy** license model. If unset, it is treated as **legacy**.
- If you are an organization with `licensing_model = 2025`, your Usage and Billing views only show **Process Instance (PI)** metrics. **Decision Instance (DI)** and **Unique Task User (TU)** information is no longer shown. Legacy organizations continue to see the existing metric set.
- For enterprise (`salesplantype = enterprise`) organizations, the licensing model is shown in the organization details. Admins can edit this by selecting either **legacy** or **2025** via a modal action.
- The enterprise onboarding wizard now includes a license selection step (defaults to **2025**). The `ExternalOnboardingRouter` accepts an optional licensing model parameter (defaulting to **2025** if not provided).

#### Cluster version selection for SaaS orchestration clusters

<!-- https://github.com/camunda/product-hub/issues/3582 -->

<div class="release"><span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--medium" title="This feature affects Camunda Hub">Camunda Hub</span><span class="badge badge--medium" title="This feature affects Orchestration Cluster">Orchestration Cluster</span></div>

You can now create new SaaS Orchestration Clusters on specific supported Camunda 8 minor and patch versions, including:

- The latest recommended versions (latest patch of each active minor)
- Other still-supported versions that you already run on existing clusters in the same organization.

### Intelligent document processing (IDP)

#### Support for ABBYY as an IDP Provider

<!-- https://github.com/camunda/product-hub/issues/3492 -->

<div class="release"><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--medium" title="This feature affects Camunda IDP">IDP</span></div>

Camunda IDP now supports [ABBYY](https://www.abbyy.com/) as a document extraction provider.

### Modeler

#### Support for configurable headers for execution listeners

<!-- https://github.com/camunda/product-hub/issues/3450 -->

<div class="release"><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--medium" title="This feature affects Web Modeler">Web Modeler</span><span class="badge badge--medium" title="This feature affects Desktop Modeler">Desktop Modeler</span></div>

Execution listeners now support configurable headers, aligned with service task job headers.

- In BPMN, execution listeners can define `<zeebe:taskHeaders>`. The headers are passed to the listener’s job worker alongside any base-element headers, with listener headers overriding on key conflicts.
- In Modeler, you can configure execution listener headers visually (name/value pairs) without editing BPMN XML.
- Listener workers can consume these headers as metadata and configuration parameters using the same patterns as service task job workers.

### Integrations

#### Microsoft Teams routing and permission-aware task actions

<!-- https://github.com/camunda/product-hub/issues/3424 -->

<div class="release"><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--medium" title="This feature affects Integrations">Integrations</span></div>

Camunda for Microsoft Teams now supports routing incident and task collaboration to private channels, shared channels, and group chats. Notifications and task actions in Teams now align with Camunda assignment and access rules, ensuring that only eligible users are notified and allowed to act.

### Operate

#### JSON display in Operate

<div class="release"><span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--medium" title="This feature affects Operate">Operate</span></div>

<!-- https://github.com/camunda/product-hub/issues/3464 -->

Camunda 8.10 introduces an update to the JSON display functionality in Operate (SaaS).

You can now:

- Open JSON variables in a dedicated JSON viewer directly from the variables panel, without entering editing mode.
- View JSON values with consistent, easier to understand formatting.
- Copy full JSON variable values to the clipboard.
- Use the improved in-line variables display.

This change helps navigate more complex data during operations and troubleshooting.

### APIs & tools

#### In-memory OAuth credentials cache by default for the Java client

<div class="release"><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--medium" title="This feature affects the Java client">Java client</span><span class="badge badge--medium" title="This feature affects the Spring SDK">Spring SDK</span></div>

<!-- https://github.com/camunda/camunda/issues/13124 -->

The Camunda Java client now caches OAuth credentials **in memory by default**. The file-based cache at `$HOME/.camunda/credentials` is no longer enabled out of the box and is available as an explicit opt-in.

Why this change:

- The previous default tried to create `$HOME/.camunda/credentials` on first use. In hardened container environments — non-root users (Kubernetes `securityContext.runAsUser`, OpenShift), read-only root filesystems, immutable images — this raised `AccessDeniedException`/`IOException` at first cache write. Affected users had to apply a non-obvious workaround (mount a writable volume and point an environment variable at it) just to get a client to start.
- Memory-only caching removes that footgun: clients work out of the box in any deployment topology, and the in-process token cache plus proactive refresh still avoid unnecessary token endpoint calls during a JVM's lifetime.
- The file cache had also been a source of latent corruption when multiple JVMs shared the same `$HOME`; making it opt-in restricts its use to deployments where persistence across restarts is genuinely needed.

How to opt in to the file-based cache (behavior identical to pre-8.10):

- Java client builder: `new OAuthCredentialsProviderBuilder().credentialsCachePath("/path/to/cache")`.
- Spring property: `camunda.client.auth.credentials-cache-path: /path/to/cache`.
- Environment variable: `CAMUNDA_CLIENT_CONFIG_PATH=/path/to/cache` (or `ZEEBE_CLIENT_CONFIG_PATH` for the legacy Zeebe client).

If you previously set `CAMUNDA_CLIENT_CONFIG_PATH` / `ZEEBE_CLIENT_CONFIG_PATH` only to work around the non-root container error, you can now remove that configuration and rely on the in-memory default.

<p class="link-arrow">[Spring Boot starter configuration](/apis-tools/camunda-spring-boot-starter/configuration.md#credentials-cache-path)</p>

### Orchestration Cluster

#### Cancel execution listener

<div class="release"><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span><span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--medium" title="This feature affects Orchestration Cluster">Orchestration Cluster</span></div>

<!-- https://github.com/camunda/product-hub/issues/2768 -->

Execution listeners now support a `cancel` event type on the process element. Cancel listeners run when a process instance is terminated — useful for cleanup, audit logging, or notifying external systems.

For details, see [`cancel` listeners](/components/concepts/execution-listeners.md#cancel-listeners).

### Helm chart deployment

<div class="release"><span class="badge badge--medium" title="This feature affects Helm charts">Helm charts</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span></div>

#### Helm v4 required

Camunda 8.10 (chart 15.x) supports the Helm CLI v4 only. Earlier Camunda versions are the last to support the Helm v3 CLI.

Switching CLIs does not require a release-state migration; Helm is client-side only. Before you run `helm upgrade` to 8.10, install the Helm v4 CLI.

<ul>
  <li><span class="link-arrow">[Move from the Helm v3 CLI to v4](/self-managed/deployment/helm/operational-tasks/moving-helm-v3-to-v4.md)</span></li>
  <li><span class="link-arrow">[Helm 4](/self-managed/deployment/helm/operational-tasks/helm-v4.md)</span></li>
</ul>

#### Host network support for orchestration cluster pods

<!-- https://github.com/camunda/camunda-platform-helm/pull/6210 -->

The 8.10 Helm chart adds `orchestration.hostNetwork` (default: `false`), which lets orchestration cluster pods share the host node's network namespace. This is useful in bare-metal or restricted network environments where pods must be reachable directly via the node IP rather than a cluster overlay network.

When `orchestration.hostNetwork` is set to `true` and `orchestration.dnsPolicy` is not set, the chart automatically uses `dnsPolicy: ClusterFirstWithHostNet` to preserve in-cluster DNS resolution. You can override this by setting `orchestration.dnsPolicy` explicitly.

```yaml
orchestration:
  hostNetwork: true
```

For details, see [configure pod networking](/self-managed/deployment/helm/configure/pod-networking.md).
