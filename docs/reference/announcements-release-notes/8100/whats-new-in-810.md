---
id: whats-new-in-810
title: What's new in Camunda 8.10
sidebar_label: What's new in Camunda 8.10
description: "Highlights and important changes to consider when upgrading to Camunda 8.10."
keywords:
  [
    "what's changed",
    "what's new",
    "whats changed in 8.10",
    "what's changed in 8.10",
    "8.10 changes",
  ]
page_rank: 90
toc_max_heading_level: 2
---

import OrchestrationClusterImg from '../../img/orchestration-cluster.png';
import PageDescription from '@site/src/components/PageDescription';
import OverviewImg from '../../../self-managed/concepts/multi-region/img/multi-region-overview.png';
import AgentPanel from '../../img/whats-new-agent-monitoring.png';
import overviewImg from '../../../components/optimize/assets/agentic-control-plane-overview.png';
import HubOverview from '../../img/whats-new-hub.png';
import HubCatalog from '../../img/whats-new-hub-catalog.png';
import HubWorkspace from '../../img/whats-new-hub-workspace.png';
import HubSnapshot from '../../img/whats-new-hub-snapshot.png';
import DesignSystem from '../../img/whats-new-design.png';
import SecretsOverviewImg from '../../../components/concepts/assets/secrets-overview.png';

<PageDescription />

## Why upgrade to Camunda 8.10?

Upgrading to Camunda 8.10 delivers significant benefits and keeps your installation aligned and ready for future releases.

<div className="list-tick">

- **[Agentic orchestration](#agentic-orchestration)**: Real-time agent visibility and explainability with live agent state, tool calls, and conversation history, providing production-grade agentic trust with testing, visibility, auditability, and control-plane monitoring.

- **[Camunda Hub](#camunda-hub)**: Camunda Hub becomes the single place where teams build, govern, and run process solutions in Camunda. Hub replaces Web Modeler and Console and is now where you design, model, manage, and oversee your processes.

- **[Multi-region resilience](#multi-region-resilience)**: Asynchronous RDBMS replication and failure-domain-aware partition placement provides configurable recovery behavior and stronger disaster recovery.

- **[Strong tenant isolation via physical tenants](#strong-tenant-isolation-via-physical-tenants)**: Enterprise-grade physical isolation with per-tenant APIs, web apps, roles and identity provider selection. Logical multi-tenancy becomes officially supported on SaaS.

</div>

:::info learn more and upgrade

- For a full summary of what's included in Camunda 8.10, including all breaking changes, deprecations, and supported environment changes, see [release announcements](/reference/announcements-release-notes/8100/8100-announcements.md) and [release notes](/reference/announcements-release-notes/8100/8100-release-notes.md).
- Ready to upgrade? See the [upgrade guides](#upgrade-guides) to learn more about upgrading from Camunda 8.9 to 8.10.

:::

## Summary of important changes

Important changes in Camunda 8.9 are summarized as follows:

<table className="table-callout">
<tr>
    <td width="30%">**What's new/changed**</td>
    <td>**Summary**</td>
</tr>
<tr>
    <td>[Agentic orchestration](#agentic-orchestration)</td>
    <td>Real-time agent visibility and explainability, production-grade agentic trust with testing, visibility, auditability, and control-plane monitoring.</td>
</tr>
<tr>
    <td>[Camunda Hub](#camunda-hub)</td>
    <td>Camunda Hub is now the single place where teams build, govern, and run process solutions in Camunda. Hub replaces Web Modeler and Console.</td>
</tr>
<tr>
    <td>[Multi-region resilience](#multi-region-resilience)</td>
    <td>Multi-region resilience framework for Self-Managed Orchestration Cluster deployments.</td>
</tr>
<tr>
    <td>[Strong tenant isolation](#strong-tenant-isolation-via-physical-tenants)</td>
    <td>Physical Tenants provide strong physical data isolation within a single cluster.</td>
</tr>
<tr>
    <td>[Business ID](#business-id)</td>
    <td>Business ID is now a first-class, searchable attribute across the Orchestration Cluster.</td>
</tr>
<tr>
    <td>[Camunda design system](#camunda-design-system)</td>
    <td>The new visual design system is introduced for Admin, Camunda Hub, and Tasklist.</td>
</tr>
<tr>
    <td>[Centralized secret resolution via Zeebe](#centralized-secret-resolution-via-zeebe)</td>
    <td>Processes can reference credentials from customer-managed secret stores without persisting secret values in Camunda.</td>
</tr>
<tr>
    <td>[Connector operations](#connector-operations)</td>
    <td>Connectors are now discoverable by the operation you want to perform.</td>
</tr>
<tr>
    <td>[Helm chart deployment](#helm-chart-deployment)</td>
    <td>A new Camunda Helm Toolkit helps migrate and validate 8.9-to-8.10 Helm values.</td>
</tr>
<tr>
    <td>[Optimize](#optimize)</td>
    <td>Optimize moves to the Camunda Security Library for authentication and session handling.</td>
</tr>
<tr>
    <td>[Unified authentication](#unified-authentication-for-orchestration-cluster-camunda-hub-and-optimize)</td>
    <td>The Orchestration Cluster, Camunda Hub, and Optimize now authenticate through the Camunda Security Library.</td>
</tr>
<tr>
    <td>[Wait states](#wait-states)</td>
    <td>Operate now shows what an active process instance is waiting for.</td>
</tr>
<tr>
    <td>[APIs & Tools](#apis--tools)</td>
    <td>Legacy component APIs, Tasklist V1-dependent features, and Zeebe Process Test are removed.</td>
</tr>
<tr>
    <td>[Supported environments](#supported-environments)</td>
    <td>Camunda 8.10 updates platform and environment baselines.</td>
</tr>
</table>

## Agentic orchestration

Important changes and new features for agentic orchestration are available in 8.10:

### Real-time agent visibility and monitoring

Monitor and evaluate AI agent behavior in Operate.

<img src={AgentPanel} alt="Agent panel overview" class="img-noborder img-900"/>

- View each agent's execution [state](/components/agentic-orchestration/agent-states-and-metrics.md#agent-states) (thinking, calling a tool, idle) highlighted on the process diagram, as well as its current tool calls, [usage metrics](/components/agentic-orchestration/agent-states-and-metrics.md#usage-metrics) (tokens, tool calls, and model calls against the configured limit), model, and system prompt.
- Trace the full reasoning chain behind AI agent decisions in the [conversation history](/components/agentic-orchestration/agent-definitions-and-instances.md#conversation-history-and-loop-iterations) such as user prompts, assistant messages, tools selected with the agent's reasoning, and tool calls with navigation to the corresponding diagram elements, so you can see exactly which messages, inputs, and tool responses informed each of the agent's next steps.
- [External agents](/components/agentic-orchestration/connect-external-agent.md) built with frameworks such as LangGraph or CrewAI get the same visibility through the new [Agent Instance API](/components/agentic-orchestration/agent-definitions-and-instances.md#visibility-for-external-agents).

<p class="link-arrow">[Monitor your AI agents with Operate](/components/agentic-orchestration/evaluate-agents/monitor-ai-agents.md)</p>

:::note
If you modeled the agent element before Camunda 8.10, you must [update its element template](/reference/announcements-release-notes/8100/8100-announcements.md#ai-agent-sub-process-and-ai-agent-task-element-templates-updated) to at least v1 (version 13) or v2 to enable this feature.
:::

### Agentic control plane

Use the Optimize agentic control plane dashboard to monitor AI agent adoption, token usage, reliability, and performance across your processes in a single view.

<img src={overviewImg} alt="Agentic control plane overview" class="img-800"/>

The dashboard is primarily intended to help operators, process owners, and engineering leads who manage AI-agent-powered processes, and need to keep them reliable and cost-effective.

<p class="link-arrow">[Agentic control plane](/components/optimize/userguide/agentic-control-plane.md)</p>

### AI Agent connector: New native element templates

The AI Agent Task and AI Agent Sub-process connectors are now available as new, native element templates, running on new job types and giving native access to each LLM provider's own SDK and wire format, including extended thinking and prompt caching configuration where supported.

Provider and backend selection are now decoupled. For example, the Anthropic provider can run through AWS Bedrock Mantle, and the OpenAI provider through Microsoft Foundry (Azure), while keeping each provider's own configuration options. The legacy element templates are deprecated as of Camunda 8.10.

This is a major redesign of the AI Agent connector, available from 8.10 only, and requires manual [migration](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-upgrade.md) of each element from the current legacy connector.

<ul>
  <li><span class="link-arrow">[Release announcement](/reference/announcements-release-notes/8100/8100-announcements.md#ai-agent-connectors-redesigned-templates-legacy-templates-deprecated)</span></li>
  <li><span class="link-arrow">[Upgrade AI Agent element templates](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-upgrade.md)</span></li>
</ul>

:::note legacy connector deprecated in 8.10
The legacy connector is deprecated in 8.10, but is not removed and continues to work. Adopting the new template is a manual, per-element migration, not an automatic upgrade.
:::

### Assisted agent tool configuration

New features help you more easily configure your agent tools when modeling.

- **Fix**: Automatically detect and apply a safe fix for an agent misconfiguration. If a `fromAi()` key or an output key is detected as invalid, click the **Fix** button to apply a fix.

- **Input from agent**, **Output to agent**: Automatically fill in the `fromAi()` inputs or the `toolCallResult` output configuration of an agent tool contract.

- **Lint rule checking**: Agent tool configuration lint rule checking helps you avoid agent misconfiguration and errors when modeling. Linting rules identify and highlight malformed `fromAi()` inputs, missing or incorrect `toolCallResult` output mappings, and missing tool descriptions before they cause silent runtime failures.

:::note

- Changes are explicit, apply only when the correction is deterministic, and can be undone.
- These configuration features are only available inside an ad-hoc sub-process marked as agentic through either the `io.camunda.agenticai.toolContainer` property or an out-of-the-box AI Agent element template. It is not available in a plain sub-process. You might need to [update your element template](/components/modeler/reference/modeling-guidance/rules/agent-fromai-contract.md#declare-a-sub-process-as-agentic) to use this new feature.

:::

<p class="link-arrow">[Assisted agent tool configuration](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-tool-definitions.md#assisted-tool-configuration-in-camunda-hub)</p>

### Processes MCP Server

AI agents can use the Processes MCP Server to discover and call deployed BPMN processes as [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) tools.

- When you deploy a process with an MCP start event it is automatically registered as a callable tool.
- MCP clients connect to the `/mcp/processes` endpoint and can invoke any registered process, with the Orchestration Cluster starting a new process instance and immediately returning the process instance key.
- The server also exposes [static tools](/apis-tools/processes-mcp/processes-mcp-static-tools.md) for inspecting running process instances, so agents can check variables, state, and incidents without switching servers.

<p class="link-arrow">[Processes MCP Server](/apis-tools/processes-mcp/processes-mcp-overview.md)</p>

### Test AI agents with Camunda Process Test

You can now test non-deterministic AI agent behavior in Camunda Process Test with conditional behavior controls and evaluation-based assertions. This helps teams validate agent behavior and output quality with clearer, more reliable test outcomes.

- Define conditional behavior in tests with a `when(condition).then(action)` API for activation-based flow control.
- Assert output quality with LLM-as-a-judge expectations when exact matching is not enough.
- Assert semantic similarity with embedding-based comparison for responses that vary in phrasing.
- Configure remote or local models through code and properties for both local development and CI/CD pipelines.

**Judge assertions in JSON test cases**: Define judge assertions using JSON test case instructions. Use a preconfigured judge from `camunda-container-runtime.properties` or Spring application properties depending on the test execution context.

**Standalone evaluation assertions for judge and semantic similarity**: Camunda Process Test now exposes _judge-based evaluation_ and _semantic similarity evaluation_ as standalone AssertJ assertions for arbitrary string values, without requiring process-variable assertions. Semantic similarity checks support configurable embedding models and thresholds, and both assertion types reuse the existing CamundaAssert configuration with optional local overrides.

<ul>
  <li><span class="link-arrow">[Test your AI agents with Camunda Process Test](/components/agentic-orchestration/evaluate-agents/test-ai-agents.md)</span></li>
  <li><span class="link-arrow">[JSON test case instructions](/apis-tools/testing/json-test-cases.md#reference-instructions)</span></li>
</ul>

## Camunda Hub

[Camunda Hub](/components/hub/index.md) is now the single place where teams build, govern, and run process solutions in Camunda.

<img src={HubOverview} alt="Camunda Hub" class="img-900"/>

- Hub replaces Web Modeler and Console. It [maintains the features of its predecessors](#mapping-web-modeler-and-console-features-to-hub) and implements new features, all within a unified platform.
- Hub is deployed only once, and serves as the single point of entry for all your environments, connecting to all your dev, staging, and production Orchestration Clusters.

**Hub changes how you and your teams work**. Instead of managing separate Web Modeler and Console instances per environment, you now use a single Hub that connects to all your clusters. You design once, and manage everything from one place.

<!-- Overview diagram -->

In Hub, there is a clear separation of responsibilities:

- **Center of excellence teams** manage organizational infrastructure, member access, and workspaces, so delivery teams have the environments and tools they need to ship process solutions at scale.
- **Delivery teams** collaborate in managed workspaces and model, test, and deploy business processes.

Organization-level resource governance and workspace-level project delivery now happen in one product.

### Terminology

Camunda Hub introduces changes to many terms and concepts from Web Modeler and Console:

| Web Modeler         | Camunda Hub                                                                                                   | Description                                                                                                                                                                              |
| :------------------ | :------------------------------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Project             | [Workspace](/reference/glossary.md#workspace)                                                                 | When upgrading to Hub, your projects automatically migrate to workspaces. Workspaces in Hub are isolated team collaboration spaces. Members can only view workspaces they're invited to. |
| Process application | [Project](/reference/glossary.md#project)                                                                     | When upgrading to Hub, your process applications automatically migrate to projects. Projects in Hub can be versioned as a bundle of files or used as a folder for loose files.           |
| Project Admin       | [Workspace Admin](/components/hub/organization/manage-workspaces/manage-workspace-members.md#workspace-roles) | This aligns with the project-to-workspace terminology change.                                                                                                                            |

### Mapping Web Modeler and Console features to Hub

The following table shows how you can access the Hub equivalents for key Web Modeler and Console features.

| Product (8.9) | Feature                      | Hub documentation                                                                                                  |
| :------------ | :--------------------------- | :----------------------------------------------------------------------------------------------------------------- |
| Console       | Organization overview        | [Hub dashboard](/components/hub/organization/analyze-operations/hub-dashboard.md)                                  |
| Console       | View clusters                | [View clusters](/components/hub/organization/manage-clusters/manage-cluster.md#view-clusters)                      |
| Console       | Organization management      | [Manage organization settings](/components/hub/organization/manage-organization-settings/organization-settings.md) |
| Web Modeler   | View projects                | [View workspaces](/components/hub/organization/manage-workspaces/index.md#view-existing-workspaces)                |
| Web Modeler   | Create a project             | [Create a workspace](/components/hub/organization/manage-workspaces/manage-workspace.md#create-a-workspace)        |
| Web Modeler   | Manage project collaborators | [Manage workspace members](/components/hub/organization/manage-workspaces/manage-workspace-members.md)             |
| Web Modeler   | Rename/delete project        | [Manage workspace](/components/hub/organization/manage-workspaces/manage-workspace.md)                             |
| Web Modeler   | View shared resources        | [Manage catalog](/components/hub/organization/manage-catalog/getting-started.md) or **Shared resources**           |
| Web Modeler   | Recently deleted             | [Recently deleted](/components/hub/workspace/manage-projects/recently-deleted.md)                                  |

### Key features

Camunda Hub introduces many new features, including the following highlights:

#### Catalog

Hub introduces the [Hub catalog](/components/hub/organization/manage-catalog/getting-started.md). Center of excellence teams can manage reusable automation assets in a Git repository and publish them to Hub. You can see where assets are being used and which processes are using outdated or deprecated assets.

<img src={HubCatalog} alt="Camunda Hub catalog" class="img-900"/>

Delivery teams can trust that catalog assets have been vetted and approved by the center of excellence. They can discover assets in the catalog, read asset documentation, and apply them when modeling.

<ul>
  <li><span class="link-arrow">[Manage the catalog](/components/hub/organization/manage-catalog/index.md)</span></li>
  <li><span class="link-arrow">[Use catalog assets](/components/hub/workspace/modeler/element-templates/use-catalog-assets.md)</span></li>
</ul>

#### Workspaces and projects

Hub introduces workspaces and projects.

<img src={HubWorkspace} alt="Camunda Hub workspaces" class="img-900"/>

**Workspace**: A workspace is a collaboration environment within an organization, representing a team or business domain. A workspace is assigned members and projects so all related work happens in one shared space. When you migrate to 8.10, all your Web Modeler projects become workspaces.

**Project**: A project contains a set of files. You can consider a project as a bundle of related files you can version and deploy together. You can also consider a project as a container of individual files meant to be versioned and deployed independently. When you migrate to 8.10, all your Web Modeler process applications become projects.

<ul>
  <li><span class="link-arrow">[Manage workspaces](/components/hub/organization/manage-workspaces/index.md)</span></li>
  <li><span class="link-arrow">[Manage projects](/components/hub/workspace/manage-projects/manage-projects.md)</span></li>
</ul>

#### Project snapshots and file versioning

In Web Modeler, a process application and the resources within it were tightly coupled. You could only version and deploy the resources as a single, bundled unit.

<img src={HubSnapshot} alt="Camunda Hub snapshots" class="img-900"/>

Camunda Hub introduces an improved model with more granular control over project and file versions:

- **[Project snapshots](/components/hub/workspace/manage-projects/project-versioning.md):** You can create project snapshots to capture the current state of all project resources.
- **[File-level versions](/components/hub/workspace/modeler/modeling/versions.md):** You can now create new versions for individual files within a project. Every file maintains its own version history.
- **Autosave:** All files save their state automatically after edits.
- **Decoupled element template versions:** Project versions and element template versions are now created independently of each other.

<details>
<summary>New to projects?</summary>

If you're not familiar with projects, the following sections explain how to:

- [Define deployment stages](/components/hub/workspace/manage-projects/create-a-project.md#connect-clusters)
- [Deploy a project](/components/hub/workspace/manage-projects/deploy-project.md)
- [Deploy an individual resource](/components/hub/workspace/modeler/run-or-publish-your-process.md#deploy-a-process)
- [Create a project snapshot](/components/hub/workspace/manage-projects/project-versioning.md#create-a-snapshot)
- [Create a resource version](/components/hub/workspace/modeler/modeling/versions.md#create-a-version)

</details>

#### New file structure and requirements

In Camunda 8.9, a project can contain process applications, folders, and files. Camunda 8.10 introduces a new file resource hierarchy in which workspaces only contain projects and IDP projects. Files and folders are always stored inside projects.

:::note
When comparing the old and new structures, keep the new [Camunda Hub terminology](#terminology) in mind .
:::

For example, if this is what your data looks like in 8.9:

```txt title="Camunda 8.9"
Payments (Project)
├─ main.bpmn
├─ eligibility.dmn
├─ readme.md
├─ Forms (Folder)
│   ├── details.form
│   └── review.form
├─ Archive (Folder)
│   └── Refunds (Process application)
│       ├── refunds.bpmn
│       └── refund-request.form
└─ Onboarding (Process application)
    ├── onboarding.bpmn
    └── kyc-checks.dmn
```

This is what the data looks like in 8.10:

```txt title="Camunda 8.10"
Payments (Workspace)
├─ Payments - General (Project - TEMPORARY PLACEMENT)
│   ├─ main.bpmn
│   ├─ eligibility.dmn
│   ├─ readme.md
│   ├─ Forms (Folder)
│   │   ├── details.form
│   │   └── review.form
│   └─ Archive (Folder)
├── Refunds (Project - MOVED)
│   ├── refunds.bpmn
│   └── refund-request.form
└─ Onboarding (Project)
    ├── onboarding.bpmn
    └── kyc-checks.dmn
```

This strict new **Workspace > Project > File/folder** hierarchy makes resources more discoverable and your projects more scalable.

#### Credentials manager

Before 8.10, you configure a connector's authentication and connection settings directly on each connector task. This doesn't scale well and is hard to maintain. For example, if ten tasks call the same REST API, you configure the same authentication ten times, and you update all ten when something changes.

Camunda Hub introduces credentials. These are authentication and connection configurations you create once and reuse wherever you need them. When you update a credential, that change is applied everywhere the credential is used.

<!-- Screenshot -->

<!-- todo: Add link -->

#### Recover deleted resources

When you deleted a resource, such as a file or process application, in Camunda 8.9, the resource was immediately and permanently deleted, along with:

- Their data in process application version history.
- Their child resources if the resource is a container, such as a folder or process application.

Deleted resources could not be recovered.

In Camunda Hub, when you delete a resource, it is moved to **Recently deleted**. You then have 30 days to restore it before it is permanently deleted.

<p class="link-arrow">[Recover deleted resources](/components/hub/workspace/manage-projects/recently-deleted.md)</p>

### Roles and permissions

Camunda Hub includes a number of changes to roles and permissions.

#### SaaS roles and permissions

SaaS organization-level roles and permissions have changed. Prior to 8.10, users in an organization were assigned either a Modeler, Analyst, or Admin role in Console. In 8.10, users in an organization are assigned one of the following roles in Camunda Hub:

| Role               | Description                                                                                                                                                                                                                                                                     |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Member             | Full access to create and collaborate on projects in workspaces they're invited to, plus read-only visibility into the organization and its clusters.                                                                                                                           |
| Analyst            | Includes everything a Member can do, plus full access to Optimize to build process dashboards and reports. Access to specific dashboards and reports within Optimize is governed separately by [Optimize collection roles](/components/optimize/userguide/user-permissions.md). |
| Organization Admin | Manages the organization, its members, and its workspaces, with full access to every workspace and project by default. Organization Admins can also assign environments to workspaces.                                                                                          |
| DevOps             | Grants cluster create and update, cluster clients, connector secrets, IP allowlisting, secure connectivity, encryption, and the connector-management view, plus Member-level modeling. Cannot manage or view organization members, billing, or organization settings.           |

<p class="link-arrow">[Roles and permissions](/components/hub/organization/manage-users/index.md#roles-and-permissions)</p>

#### Self-Managed roles and permissions

Self-Managed roles and permissions have changed as follows:

| 8.9 role          | 8.10 equivalent | Changes                                                                                                                                                                                    |
| :---------------- | :-------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Console           | DevOps          | Gains management access to Hub's cluster pages.                                                                                                                                            |
| Web Modeler Admin | Hub Admin       | Gains full access to Hub's cluster pages.                                                                                                                                                  |
| Web Modeler       | Hub             | No change in access.                                                                                                                                                                       |
| -                 | Analyst         | **(New role)** Grants Hub modeling access, management access to the catalog's usage and adoption data, and full access to Optimize, without modeler-admin or people/org management access. |

:::note
The 8.9 roles are not removed in 8.10, and remain for backward compatibility.
:::

<p class="link-arrow">[Default roles in Self-Managed](/self-managed/components/management-identity/application-user-group-role-management/manage-roles.md#default-roles)</p>

### Camunda Hub API

Before Camunda 8.10, you could interact with Web Modeler and Console resources through the following APIs:

| API                | Description                                                                                                                                                                                              | Camunda 8.10 status                                 |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------- |
| Web Modeler API v1 | Programmatically manage Web Modeler resources, like projects, process applications, and collaborators. This API now serves Camunda Hub resources, like workspaces, projects, and members under the hood. | Deprecated. Will be removed in 8.12.                |
| Administration API | Retrieve cluster data, including installed apps and usage metrics                                                                                                                                        | Removed for Self-Managed. Still available for SaaS. |

In Camunda 8.10, with Camunda Hub replacing Web Modeler and Console, the new Camunda Hub API succeeds the old Web Modeler API and, for Self-Managed, the Administration API. The Camunda Hub API unifies cluster and workspace management in a single interface. Additionally, it provides new APIs for interacting with Hub-specific features.

<p class="link-arrow">[Migrate from Web Modeler to the Camunda Hub API](/apis-tools/migration-manuals/migrate-from-web-modeler-to-hub-api.md)</p>

### Self-Managed Hub configuration

In 8.10, Console and Web Modeler configurations have been merged to form [Camunda Hub properties](/self-managed/components/hub/configuration/properties.md). Configuration keys have been updated to support feature changes.

<p class="link-arrow">[Self-Managed migration](/self-managed/upgrade/components/890-to-8100.md#camunda-hub)</p>

For Helm, Console is no longer a standalone deployment. The new `camunda/hub` image serves both feature sets. The `camundaHub` key enables and configures Camunda Hub:

```yaml
# Before (8.9)
console:
  enabled: true
webModeler:
  enabled: true
  restapi:
    resources:
      requests:
        memory: 1Gi

# After (8.10)
camundaHub:
  enabled: true
  restapi:
    resources:
      requests:
        memory: 1Gi
```

Additionally, when you upgrade, your data is [migrated](/self-managed/upgrade/components/890-to-8100.md#data-migration) to the [new file structure](#new-file-structure-and-requirements).

<p class="link-arrow">[Upgrade from Helm 8.9 to 8.10](/self-managed/upgrade/helm/890-to-8100.md)</p>

### Web Modeler data

On 29 August 2026, your SaaS Web Modeler data received three updates to prepare for Hub in 8.10, around [Organizational structure](#new-file-structure-and-requirements), data migration, and the process application versioning model.

<details>
<summary>Web Modeler data migration details</summary>

### Data migration

As a Camunda 8 SaaS user, your data was migrated to the new organizational structure automatically during a scheduled maintenance window.

During the migration:

- Any process application nested inside a folder moved to the top level of its project.
- Any files or folders located directly in a project, not inside a process application, were automatically grouped in a new process application, named `YOUR PROJECT NAME - General`. You can rename this application, [move content out of it](#organizing-the-general-process-application), or otherwise reorganize it as with any other process application.
- Git sync and cluster settings on existing process applications migrated unchanged along with your data.

During the migration, Web Modeler was briefly unavailable. Clusters and running processes were unaffected and continued executing normally.

:::note
Camunda extensively tested the migration process before release and created a backup before the migration to ensure your data was recoverable in its original state if anything went wrong. If you notice anything unexpected after the migration, contact support.
:::

The migration did not affect the following resources:

| Area                                | Impact                                                                                                                                                       |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Running process instances           | Orchestration Clusters, engines, and running process instances were unaffected. Web Modeler and Camunda Hub remained independent of the runtime path.        |
| Redeployment                        | Existing deployments remained on their clusters and continued running. The migration did not require redeployment.                                           |
| Clusters and configuration          | Cluster and deployment settings attached to existing process applications migrated with the data and remained unchanged.                                     |
| Files, folders, and version history | All files, folders, versions, and history were preserved. Only their location within the project changed.                                                    |
| Git-synced projects                 | The migration did not modify process applications or their contents. Files connected through Git sync remained in the same repository with the same history. |
| Desktop Modeler                     | Desktop Modeler was unaffected because it has no direct connection to Web Modeler. Content shared through Git sync was also unaffected.                      |

If you automate against the Web Modeler API, the migration may affect automation that relies on file or folder locations. Web Modeler API v1 returns files and folders from their new locations. Requests that create an item at a project's root are redirected to the new `YOUR PROJECT NAME - General` process application, and the response reflects the new location.

Review any automation that relies on file or folder locations. A small number of folder API integrations were affected more directly. If you use the folder API with process applications, contact support to confirm whether your integration needs updates.

#### Organize the "General" process application

During the migration, any files or folders located directly in a project, not inside a process application, were automatically grouped in a new process application, named "YOUR PROJECT NAME - General". This process application is a temporary container for loose files and folders. Camunda recommends organizing these resources into process applications that reflect their purpose for better long-term discoverability and maintainability.

To move files from the "General" process application, first create a new process application:

1. Open your project.
2. At the top right of the project view, click **Create new > Process application**.
3. Enter a name and select a development cluster.
4. Click **Create**.

Next, move the files from the "General" process application to the new one:

1. Open your "General" process application.
2. On the left side of the file list, select all the files you want to move.
3. At the top of the file list, click **Move**.
4. Select your new process application.
5. Click **Move**.

### Process application versioning model

In addition to the Web Modeler data migration, Camunda is introducing an improved process application versioning model:

- File-level versions — process applications can be versioned as a bundle, as before, but now also at the single-file level.
- Autosave for all files, plus file-level version history for every file.
- Decoupled versioning — process application versions and element template versions are now created independently of each other.

Before the new model, a process application and the resources within it were tightly coupled. You could only version and deploy the resources as a single, bundled unit. With the new model, you have more granular control.

### Working with process applications

Learn more about using process applications in the following sections.

#### Define deployment stages

To deploy process applications and resources, you need to connect clusters to the following deployment stages:

| Stage       | Description                                                                                                         |
| :---------- | :------------------------------------------------------------------------------------------------------------------ |
| Development | Use to create and test new software features and changes.                                                           |
| Testing     | Use for quality checks, ensuring software meets defined standards before release.                                   |
| Staging     | Use for controlled testing where changes are validated before deployment to production.                             |
| Production  | The live system with the latest software. **Only administrators and organization owners can deploy to this stage.** |

To define your deployment stages:

1. Open a process application.
2. On the right side of the process application view, next to **Connected clusters** click **Configure**.
3. For each stage, select a cluster.
4. Click **Save**.

#### Deploy a process application

You can deploy a process application as a bundle from either the process application view or a resource view. In both cases, all resources in the process application are deployed together.

From the process application view:

1. Open a process application.
2. At the top right of the process application view, click **Deploy & run**, or select **Deploy** from the dropdown.
3. Confirm the deployment.

From the resource view:

1. In your process application, open a resource, such as a BPMN diagram or form.
2. At the top right of the modeling interface, click **Deploy**.
3. In the deployment modal, under **Resources**, select **All resources**. (This is the default.)
4. Confirm the deployment.

#### Deploy an individual resource

If you don't want to deploy all resources in a process application, you can deploy an individual resource:

1. In your process application, open a resource, such as a BPMN diagram or Form.
2. At the top right of the modeling interface, click **Deploy**.
3. In the deployment modal, under **Resources**, select **Only this resource**.
4. Confirm the deployment.

#### Create a process application snapshot

Use a snapshot to capture all files in a process application at once:

1. Open a process application.
2. On the right side of the process application view, under **Snapshots** click **Create snapshot**.
3. Enter a **Snapshot tag** in the snapshot creation modal.
4. Click **Create**.

#### Create a resource version

In addition to process application snapshots, you can create versions for individual resources:

1. In your process application, open a resource, such as a BPMN diagram or form.
2. At the top right of the modeling interface, click **Versions**.
3. Click **Create version**.
4. Enter a **Version name** in the version creation modal.
5. Click **Create**.

</details>

## Multi-region resilience

Camunda 8.10 provides a structured multi-region resilience framework for Self-Managed Orchestration Cluster deployments.

<img src={OverviewImg} alt="High-level diagram showing Cold Recovery and Dual-Region strategies" title="Cold Recovery and Dual-Region strategies" class="img-noborder img-900"/>

- **[Cold Recovery](/self-managed/concepts/multi-region/cold-recovery.md)**: Camunda's lowest-cost multi-region configuration uses scheduled cross-region backups and a manual restore procedure to recover from complete primary-region loss. Recovery measured in hours is operationally acceptable.

- **[Dual-Region](/self-managed/concepts/multi-region/dual-region.md)**: Dual-region deployment with continuous replication. A full Camunda Orchestration Cluster runs continuously in both a primary and secondary region.

- **Three-region active-active (RDBMS)**: A three-region Kubernetes deployment with the Orchestration Cluster running active-active across all three regions, backed by a relational database (RDBMS) with cross-region replication as secondary storage. Losing one region requires no operator intervention, because the cluster never loses quorum.

<p class="link-arrow">[Multi-region resilience](/self-managed/concepts/multi-region/resilience-tiers.md)</p>

## Strong tenant isolation via Physical tenants

Camunda 8.10 introduces Physical Tenants for strong physical data isolation within a single cluster with separate data storage and independent operations per tenant. Physical Tenants still share cluster compute resources such as CPU and memory, so runtime interference is reduced but not fully eliminated.

- Physical Tenant isolation is best for multiple teams or organizations needing strong isolation without the cost and complexity of separate clusters.

- Physical Tenants and Logical Tenants can be used together. Each Physical Tenant can contain its own set of Logical Tenants, providing two independent layers of isolation: physical separation between top-level tenant groups, and logical separation within each group.

<p class="link-arrow">[Multi-tenancy](/self-managed/concepts/multi-tenancy/index.md)</p>

## Business ID

Business ID is now a first-class, searchable attribute across the Orchestration Cluster.

Introduced in 8.9 as an immutable domain-specific identifier, Business ID in 8.10 can be searched and filtered across process instances, decision instances, user tasks, messages, and message subscriptions. Jobs expose the Business ID in the activation response (visible, not searchable).

- **Search and filter** across entity types using advanced operators (`$eq`, `$neq`, `$exists`, `$like` with `*`/`?` wildcards, `$in`). Operate and Tasklist expose Equals, Contains, and Is one of in their filter UI.
- **Message correlation**: Include a Business ID in published or correlated messages as an additional filter constraint. If both a correlation key and Business ID are supplied, both fields must match the corresponding values stored on the subscription.
- **Call Activity propagation**: Child instances inherit the parent's Business ID by default. Configure a literal value or FEEL expression on the call activity to override it. Use `camunda.processInstance.businessId` in FEEL expressions to reference the parent's ID.
- **Start with a Business ID** from Camunda Hub or Desktop Modeler.
- **Late assignment**: Assign a Business ID to a running instance that has none, when uniqueness is disabled. Assignment is forward-only: only artifacts created after the assignment carry it.

<p class="link-arrow">[Business ID](/components/concepts/process-instance-creation.md#business-id)</p>

## Camunda design system

The new visual Camunda design system is introduced for Admin, Camunda Hub, and Tasklist with the 8.10 release.

<img src={DesignSystem} alt="Camunda design system" class="img-noborder img-transparent img-900"/>

- The new, streamlined design system offers a cleaner, more consistent look across components.
- Accessibility improvements are built in, and the updated navigation menu makes it easier to find your way around.
- The new design system is enabled by default in both Self-Managed and SaaS.

## Centralized secret resolution via Zeebe

Centralized secret resolution through Zeebe is introduced in 8.10.

You can use and manage secrets to keep keep sensitive values such as API keys, passwords, and tokens, out of your process models, job variables, and configuration files. Processes can reference credentials from customer-managed secret stores without persisting secret values in Camunda.

<img src={SecretsOverviewImg} alt="Secrets overview" title="Secrets overview" class="img-noborder" style={{marginTop: '0', marginBottom: '0'}}/>

- Reference secrets as `camunda.secrets.NAME` in input mappings, expressions, and output mappings. The legacy `{{secrets.NAME}}` syntax continues to work.
- Secrets are resolved automatically for activated jobs and can also be requested through the Gateway APIs `/v2/secrets/resolve` and `/v2/secrets/list`.
- Resolved values are not written to engine state, exports, backups, Operate, Tasklist, or application logs.
- Self-Managed deployments support AWS Secrets Manager and GCP Secret Manager with workload identity authentication. A file-based provider is available for development and testing.
- SaaS requires no configuration and uses Camunda’s managed secret backend.
- Camunda 8 Run uses the file-based provider: create one file per secret (filename = secret name, contents = value), and set `camunda.secrets.stores.file.default.path` to that directory in the Camunda 8 Run application configuration.

**Migration:** Existing processes continue to work without changes. For new processes, use `camunda.secrets.NAME`. To migrate hardcoded or connector-specific credentials, store the value in a supported secret store and replace it with a centralized secret reference.

**Limitations:**
This feature does not yet include HashiCorp Vault or Azure Key Vault support, secret access audit logging, per-process secret restrictions, or centralized resolution for Hybrid Connector Runtimes. Cache entries expire after the configured TTL, which is 20 seconds by default.

<p class="link-arrow">[Secrets](/components/concepts/secrets.md)</p>

## Connector operations

Connectors are now discoverable by the operation you want to perform, not only by the product they connect to.

When you search in the create, append, or change element menu, the operations of every built-in connector appear as their own entries, so searching for `upload object` or `send email` takes you straight to the connectors that can do it. Selecting an operation applies the connector with that operation preselected, and connectors with several operations present them as a nested menu.

Two changes come with this:

- Connectors that provide a single operation are [renamed after the operation they perform](/reference/announcements-release-notes/8100/8100-announcements.md#connectors-with-a-single-operation-are-renamed-after-the-operation). Existing process models keep running unchanged.
- Element templates support the `steps` and `presets` keys, so your own templates can offer the same guided operation selection.

<p class="link-arrow">[Predefined configurations](/components/modeler/element-templates/template-metadata.md#predefined-configurations-steps-and-presets)</p>

## Camunda for Slack

Camunda for Slack joins Camunda for Microsoft Teams as a second chat platform served by the same App Integrations backend. From Slack, you can browse and complete tasks, start a process, switch organization and cluster, and subscribe a channel or direct message to notifications, all through the `/camunda` slash command and the Camunda direct message. Microsoft Teams and Slack are independent, so you can run either on its own, or both.

<p class="link-arrow">[Camunda for Slack](/components/camunda-integrations/app-integrations/slack.md)</p>

## Helm chart deployment

Important changes to Helm chart deployment in 8.10 are as follows:

### Camunda Helm Toolkit

The new Helm migration and validation toolkit can help you upgrade from Camunda 8.9 to 8.10 on Kubernetes with Helm.

Use the toolkit to:

- Read your existing 8.9 Helm values (for example, values.yaml).
- Generate a sample 8.10 values file reflecting Helm 4-only support, Bitnami sub‑charts removal, Hub‑aware deployment patterns, and simplified application configuration.
- Create a migration report that lists the keys that were migrated automatically, flags keys that require manual decision (for example, infrastructure endpoints, security‑sensitive options), suggests where to find more information in the documentation, and can validate an existing 8.10 values file (for example, one drafted by hand or AI tool) against Camunda’s migration rules.

The CLI is non‑interactive, with clear exit codes and optional JSON output, making it suitable for humans using the command line, CI pipelines, and AI agents (for example, Claude Code, Copilot) that can use it as part of an automated migration workflow.

<p class="link-arrow">[Use the Camunda Helm Toolkit](/self-managed/deployment/helm/operational-tasks/camunda-helm-toolkit.md)</p>

### Helm v4 required

:::warning Breaking change
Camunda 8.10 (chart 15.x) supports the Helm CLI v4 only. Earlier Camunda versions are the last to support the Helm v3 CLI.
:::

Switching CLIs does not require a release-state migration; Helm is client-side only. Before you run `helm upgrade` to 8.10, install the Helm v4 CLI.

<ul>
  <li><span class="link-arrow">[Move from the Helm v3 CLI to v4](/self-managed/deployment/helm/operational-tasks/moving-helm-v3-to-v4.md)</span></li>
  <li><span class="link-arrow">[Helm 4](/self-managed/deployment/helm/operational-tasks/helm-v4.md)</span></li>
</ul>

### Host network support for orchestration cluster pods

The 8.10 Helm chart adds `orchestration.hostNetwork` (default: `false`), which lets orchestration cluster pods share the host node's network namespace. This is useful in bare-metal or restricted network environments where pods must be reachable directly via the node IP rather than a cluster overlay network.

<p class="link-arrow">[Configure pod networking](/self-managed/deployment/helm/configure/pod-networking.md)</p>

## Optimize

Important changes to Optimize in 8.10 are as follows:

### Optimize adopts the shared authentication implementation

Optimize now authenticates through the same shared implementation as the Orchestration Cluster components, adopting their authentication and session handling.

The legacy Optimize login and API security keys are deprecated in favor of `camunda.security.*` and removed in 8.11, along with the legacy security stack and its `optimize.security.csl.enabled=false` fallback. `CAMUNDA_OPTIMIZE_IDENTITY_BASE_URL` is not deprecated and stays in use for user lookups. See [legacy configuration keys](/self-managed/upgrade/components/890-to-8100.md#legacy-security-configuration-keys-are-deprecated) for the full key mapping.

<p class="link-arrow">[Optimize authentication in Self-Managed](/self-managed/concepts/authentication/authentication-to-optimize.md)</p>

### Optimize data filters in Camunda Hub

On SaaS, you can now configure Optimize export filters directly in Hub cluster settings. No Helm values or configuration files required. Use the **Data filters** section in cluster settings to control which process definitions (by `bpmnProcessId`) and variable names reach Optimize.

New SaaS clusters include a default `business_` variable include filter, which limits Optimize to variables whose names start with `business_`. This reduces Elasticsearch storage and shard usage significantly. Existing clusters are unaffected and can opt in with one click.

<p class="link-arrow">[Configure Optimize data filters](/components/hub/organization/manage-clusters/settings.md#data-filters)</p>

## Unified authentication for Orchestration Cluster, Camunda Hub, and Optimize

With Camunda 8.10, Camunda Hub and Optimize authenticate through a shared implementation based on the Orchestration Cluster's existing authentication, replacing their separate identity stacks.

Each component now accepts the same `camunda.security.authentication.*` settings, so there is only one configuration surface to learn and troubleshoot if authentication issues arise. Nothing changes for the Orchestration Cluster as it already uses these settings since 8.9.

- Camunda Hub and Optimize continue to accept existing authentication settings in 8.10, translating the recognized properties to new equivalents at startup, but those legacy properties are deprecated for both components and are removed in 8.11.
- Camunda Hub requires no configuration change to upgrade to 8.10.
- User, group, role, tenant, and permission management for both components is unchanged in 8.10 and is still handled by Management Identity.

<p class="link-arrow">[Camunda Hub authentication](/self-managed/components/hub/configuration/identity.md)</p>

## Wait states

Operate now shows what an active process instance is waiting for, so you can tell expected waiting from a stalled instance.

- When you inspect an active element, you can see the wait state and its details, such as a timer's due date, a receive task's message name and correlation key, a signal name, a condition expression, or a job's type and state.

- Wait state tracking is enabled by default and writes records to secondary storage. In Camunda 8 Self-Managed, you can [disable it](/self-managed/concepts/wait-states/configure.md) if you do not want to track this data.

<p class="link-arrow">[Wait states](/components/wait-states/overview.md)</p>

## APIs & Tools

Important changes for APIs & Tools in 8.10 are as follows:

### Removal of legacy APIs, Tasklist V1-dependent features, and Zeebe Process Test

In 8.10, Camunda removes the legacy component APIs and related features that were deprecated in 8.8, such as legacy APIs, Tasklist V1-dependent features, and Zeebe Process Test.

<p class="link-arrow">[Release announcement](/reference/announcements-release-notes/8100/8100-announcements.md#removal-of-legacy-apis-tasklist-v1-dependent-features-and-zeebe-process-test)</p>

### C# SDK

<!-- https://github.com/camunda/product-hub/issues/3044 -->

Camunda now offers an officially supported C# Client for the Camunda 8 Orchestration Cluster REST API v2.

You can authenticate with your cluster (No Auth for local, Basic authentication, or OIDC access tokens) and use C# methods to deploy resources, start and manage process instances, work with user tasks, and query processes and decisions, complete with pagination helpers and typed responses via generated models.

<p class="link-arrow">[C# SDK](/apis-tools/csharp-sdk.md)</p>

### Go and Rust SDKs

<!-- https://github.com/camunda/issues/issues/835 -->

8.10 introduces Technical Previews for Go and Rust language SDKs for the Orchestration Cluster API.

The Go SDK additionally contains support for gRPC job streaming. During 8.10 these SDKs will be stabilized, but there may be changes to their API surface based on user feedback. These SDKs will be fully supported and guaranteed to be stable in a later release.

<ul>
  <li><span class="link-arrow">[Go SDK](/apis-tools/go-sdk.md)</span></li>
  <li><span class="link-arrow">[Rust SDK](/apis-tools/rust-sdk.md)</span></li>
</ul>

## Supported environments

Camunda 8.10 updates several platform and environment baselines. Highlights include:

| Environment                                                                                                                                | Description                                                                             |
| :----------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------- |
| [Amazon Aurora PostgreSQL](/reference/announcements-release-notes/8100/8100-announcements.md#amazon-aurora-postgresql-14-removed-18-added) | Version 14 removed, version 18 added. Supported versions are now 15, 16, 17, and 18.    |
| [Elasticsearch](/reference/announcements-release-notes/8100/8100-announcements.md#elasticsearch-92-and-93-no-longer-supported)             | Minimum supported 9.x version raised to 9.4. Supported versions are now 8.19+ and 9.4+. |
| [H2](/reference/announcements-release-notes/8100/8100-announcements.md#h2-23-no-longer-supported)                                          | Version 2.3 no longer supported. Only 2.4 is now supported (dev/test/evaluation only).  |
| [MariaDB](/reference/announcements-release-notes/8100/8100-announcements.md#mariadb-123-now-supported)                                     | Version 12.3 LTS now supported. Supported versions are now 10.11, 11.4, 11.8, and 12.3. |
| [Microsoft SQL Server](/reference/announcements-release-notes/8100/8100-announcements.md#microsoft-sql-server-2019-no-longer-supported)    | Version 2019 no longer supported. Supported versions are now 2022 and 2025.             |
| [MySQL](/reference/announcements-release-notes/8100/8100-announcements.md#mysql-97-now-supported)                                          | Version 9.7 LTS now supported. Supported versions are now 8.4 and 9.7.                  |
| [OpenSearch](/reference/announcements-release-notes/8100/8100-announcements.md#opensearch-34-and-35-no-longer-supported)                   | Minimum supported 3.x version raised to 3.6. Supported versions are now 2.19+ and 3.6+. |
| [Oracle](/reference/announcements-release-notes/8100/8100-announcements.md#oracle-23ai-rebranded-as-oracle-26ai)                           | Oracle 23ai rebranded as Oracle AI Database 26ai. Supported versions are 19c and 26ai.  |
| [PostgreSQL](/reference/announcements-release-notes/8100/8100-announcements.md#postgresql-14-no-longer-supported)                          | Version 14 no longer supported. Supported versions are now 15, 16, 17, and 18.          |

:::info
For complete details, including breaking changes and deprecations, see [release announcements](./8100-announcements.md) and [supported environments](/reference/supported-environments.md).
:::

## Upgrade guides {#upgrade-guides}

The following guides offer detailed information on how to upgrade to Camunda 8.10.

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
    <td>[APIs & tools upgrade guide](/apis-tools/migration-manuals/migrate-to-810.md)</td>
    <td>Plan and execute an upgrade from Camunda 8.9 to 8.10, focusing on API and tools transitions.</td>
    <td><p><ul><li>Application developers maintaining Camunda-based solutions in Self-Managed Kubernetes or VM environments.</li><li>Developers using Camunda APIs and tools.</li></ul></p></td>
</tr>
</table>
