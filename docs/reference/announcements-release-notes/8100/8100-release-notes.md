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
| 07 July 2026 | <ul><li>[ Camunda 8 core ](https://github.com/camunda/camunda/releases/tag/8.10.0-alpha3)</li></ul> | -    |

### Operate

#### Wait states

<!-- https://github.com/camunda/camunda/issues/45040 -->

<div class="release"><span class="badge badge--medium" title="This feature affects Operate">Operate</span><span class="badge badge--medium" title="This feature affects Orchestration Cluster API">Orchestration Cluster API</span></div>

Operate now shows what an active process instance is waiting for. When you inspect an active element, you can see the wait state and its details — for example, a timer's due date, a receive task's message name and correlation key, a signal name, a condition expression, or a job's type and state.

Wait state tracking is enabled by default and writes records to secondary storage. In Camunda 8 Self-Managed, you can [disable it](/self-managed/concepts/wait-states/configure.md) if you do not want to track this data.

<p class="link-arrow">[Wait states](/components/wait-states/overview.md)</p>

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
