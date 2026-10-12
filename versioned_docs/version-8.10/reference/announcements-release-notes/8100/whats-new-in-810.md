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
import HelmCliSupport from '../../../self-managed/deployment/helm/\_partials/\_helm-cli-support.md';
import OverviewImg from '../../../self-managed/concepts/multi-region/img/multi-region-overview.png';
import AgentPanel from '../../img/whats-new-agent-monitoring.png';
import overviewImg from '../../../components/optimize/assets/agentic-control-plane-overview.png';
import HubOverview from '../../img/whats-new-hub.png';
import CredentialsImg from '../../../components/hub/organization/credentials/img/credentials-choose-credential.png';
import DesignSystem from '../../img/whats-new-design.png';
import SecretsOverviewImg from '../../../components/concepts/assets/secrets-overview.png';
import TenantImg from '../../../self-managed/concepts/multi-tenancy/img/tenancy-models-comparison.png';

<PageDescription />

## Why upgrade to Camunda 8.10?

Upgrading to Camunda 8.10 delivers significant benefits and keeps your installation aligned and ready for future releases.

<div className="list-tick">

- **[Agentic orchestration](#agentic-orchestration)**: Real-time agent visibility and explainability with live agent state, tool calls, and conversation history, providing production-grade agentic trust with testing, visibility, auditability, and control-plane monitoring.

- **[ProcessOS](#processos)**: Discover your existing processes, re-engineer them against defined outcomes, and generate executable Camunda solutions, with a governed process that keeps AI-generated work auditable.

- **[Camunda Hub](#camunda-hub)**: A new product that replaces Web Modeler and Console as the single place to build, govern, and run process solutions in Camunda. It introduces workspaces to organize your teams' work, along with a [catalog](#catalog) of reusable automation assets, a [business value dashboard](#business-value-dashboard) to track process outcomes against targets, and [credentials](#hub-credentials-manager) you create once and reuse across processes.

- **[Multi-region resilience](#multi-region-resilience)**: Failure-domain-aware partition placement replicates process state synchronously across regions, so losing a region costs no committed data (RPO 0). The RDBMS secondary storage replicates asynchronously and catches up from the engine's event stream.

- **[Strong tenant isolation via physical tenants](#strong-tenant-isolation-via-physical-tenants)**: Enterprise-grade physical isolation with per-tenant APIs, web apps, roles and identity provider selection. Logical multi-tenancy becomes officially supported on SaaS.

</div>

:::note Release information

For a full summary of what's included in Camunda 8.10, including all breaking changes, deprecations, and supported environment changes, see [release announcements](/reference/announcements-release-notes/8100/8100-announcements.md) and [release notes](/reference/announcements-release-notes/8100/8100-release-notes.md).

:::

## Upgrade guides {#upgrade-guides}

Ready to upgrade? The following guides offer detailed information on how to upgrade to Camunda 8.10.

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

## Summary of important changes

Important changes in Camunda 8.10 are summarized as follows:

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
    <td>[ProcessOS](#processos)</td>
    <td>Discover, re-engineer, and generate executable Camunda solutions with a governed, auditable process.</td>
</tr>
<tr>
    <td>[Camunda Hub](#camunda-hub)</td>
    <td>Build, govern, and run your process solutions. Hub replaces Web Modeler and Console.</td>
</tr>
<tr>
    <td>[Catalog](#catalog)</td>
    <td>Manage, publish, and reuse vetted automation assets across teams in Hub.</td>
</tr>
<tr>
    <td>[Business value dashboard](#business-value-dashboard)</td>
    <td>Track cycle time, automation rate, activity, and agentic adoption against targets in Hub.</td>
</tr>
<tr>
    <td>[Hub credentials manager](#hub-credentials-manager)</td>
    <td>Create connector credentials once and reuse them wherever you need them in Hub.</td>
</tr>
<tr>
    <td>[Environments](#environments)</td>
    <td>Deploy and run processes in named environments assigned to workspaces.</td>
</tr>
<tr>
    <td>[Environment connection](#environment-connection-in-modeler)</td>
    <td>Connect the modeler in Hub to an environment to use its credentials and run task tests against it.</td>
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
    <td>The new visual design system is introduced for Admin, Hub, and Tasklist.</td>
</tr>
<tr>
    <td>[Centralized secret resolution](#centralized-secret-resolution-via-zeebe)</td>
    <td>Reference credentials from customer-managed secret stores.</td>
</tr>
<tr>
    <td>[Connector operations](#connector-operations)</td>
    <td>Connectors are now discoverable by the operation you want to perform.</td>
</tr>
<tr>
    <td>[Credentials in Desktop Modeler](#credentials-in-desktop-modeler)</td>
    <td>Select and create reusable credentials on connector tasks in Desktop Modeler.</td>
</tr>
<tr>
    <td>[Helm chart deployment](#helm-chart-deployment)</td>
    <td>A new Camunda Helm Toolkit helps migrate and validate 8.9-to-8.10 Helm values.</td>
</tr>
<tr>
    <td>[Low-code testing](#low-code-testing)</td>
    <td>Record, assert, repair, and run low-code tests in Test Studio and in CI/CD with Camunda Process Test.</td>
</tr>
<tr>
    <td>[Optimize](#optimize)</td>
    <td>Optimize's component-specific authentication configuration keys are deprecated.</td>
</tr>
<tr>
    <td>[Unified authentication](#unified-authentication-for-orchestration-cluster-and-optimize)</td>
    <td>Shared authentication implementation based on Orchestration Cluster authentication.</td>
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

### Agentic control plane

Use the Optimize agentic control plane dashboard to monitor AI agent adoption, token usage, reliability, and performance across your processes in a single view.

<img src={overviewImg} alt="Agentic control plane overview" class="img-800"/>

The dashboard is primarily intended to help operators, process owners, and engineering leads who manage AI-agent-powered processes, and need to keep them reliable and cost-effective.

<p class="link-arrow">[Agentic control plane](/components/optimize/userguide/agentic-control-plane.md)</p>

### AI Agent connector: New native element templates

The AI Agent Task and AI Agent Sub-process connectors are now available as new, native element templates, running on new job types and giving native access to each LLM provider's own SDK and wire format, including extended thinking and prompt caching configuration where supported.

Provider and backend selection are now decoupled. For example, the Anthropic provider can run through AWS Bedrock Mantle, and the OpenAI provider through Microsoft Foundry (Azure), while keeping each provider's own configuration options. The legacy element templates are deprecated as of Camunda 8.10.

This is a major redesign of the AI Agent connector, available from 8.10 only, and requires manual [migration](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-upgrade.md) of each element from the current legacy connector.

<p class="link-arrow">[Upgrade AI Agent element templates](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-upgrade.md)</p>

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

### Camunda-provided LLM for SaaS

You can run AI agents on Camunda 8 SaaS in minutes using the [Camunda-provided LLM](/components/agentic-orchestration/camunda-provided-llm.md), without your own LLM credentials.

- Whether you start from a Camunda-provided agentic blueprint or build your own agent from scratch, the required credentials are populated automatically as cluster secrets.
- The included budget is sufficient for hundreds or thousands of agent runs even on a trial account, depending on the model used.
- Enterprise organizations must explicitly enable the **Camunda Provided LLM** toggle in Camunda Hub, which is separate from the **AI-powered features** toggle.

<p class="link-arrow">[Camunda-provided LLM](/components/agentic-orchestration/camunda-provided-llm.md)</p>

### Processes MCP Server

AI agents can use the Processes MCP Server to discover and call deployed BPMN processes as [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) tools.

- When you deploy a process with an MCP start event it is automatically registered as a callable tool.
- MCP clients connect to the `/mcp/processes` endpoint and can invoke any registered process, with the Orchestration Cluster starting a new process instance and immediately returning the process instance key.
- The server also exposes [static tools](/apis-tools/processes-mcp/processes-mcp-static-tools.md) for inspecting running process instances, so agents can check variables, state, and incidents without switching servers.

<p class="link-arrow">[Processes MCP Server](/apis-tools/processes-mcp/processes-mcp-overview.md)</p>

### Real-time agent visibility and monitoring

Monitor and evaluate AI agent behavior in Operate.

<img src={AgentPanel} alt="Agent panel overview" class="img-noborder img-900"/>

- View each agent's execution [state](/components/agentic-orchestration/agent-states-and-metrics.md#agent-states) highlighted on the process diagram, as well as its current tool calls, [usage metrics](/components/agentic-orchestration/agent-states-and-metrics.md#usage-metrics), model, and system prompt.
- Trace the full reasoning chain behind AI agent decisions in the [conversation history](/components/agentic-orchestration/agent-definitions-and-instances.md#conversation-history-and-loop-iterations) such as user prompts, assistant messages, tools selected with the agent's reasoning, and tool calls with navigation to the corresponding diagram elements, so you can see exactly which messages, inputs, and tool responses informed each of the agent's next steps.
- [External agents](/components/agentic-orchestration/connect-external-agent.md) built with frameworks such as LangGraph or CrewAI get the same visibility through the new [Agent Instance API](/components/agentic-orchestration/agent-definitions-and-instances.md#visibility-for-external-agents).

<p class="link-arrow">[Monitor your AI agents with Operate](/components/agentic-orchestration/evaluate-agents/monitor-ai-agents.md)</p>

:::note
If you modeled the agent element before Camunda 8.10, you must [update its element template](/reference/announcements-release-notes/8100/8100-announcements.md#ai-agent-connectors-redesigned-templates-legacy-templates-deprecated) to at least v1 (version 13) or v2 to enable this feature.
:::

### Test AI agents with Camunda Process Test

You can now test non-deterministic AI agent behavior in Camunda Process Test with conditional behavior controls and evaluation-based assertions. This helps teams validate agent behavior and output quality with clearer, more reliable test outcomes.

- Define conditional behavior in tests with a `when(condition).then(action)` API for activation-based flow control.
- Assert output quality with LLM-as-a-judge expectations when exact matching is not enough.
- Assert semantic similarity with embedding-based comparison for responses that vary in phrasing.
- Configure remote or local models through code and properties for both local development and CI/CD pipelines.

**Judge assertions in JSON test cases**: Define judge assertions using JSON test case instructions. Use a preconfigured judge from `camunda-container-runtime.properties` or Spring application properties depending on the test execution context.

**Standalone evaluation assertions for judge and semantic similarity**: Camunda Process Test now exposes _judge-based evaluation_ and _semantic similarity evaluation_ as standalone AssertJ assertions for arbitrary string values, without requiring process-variable assertions. Semantic similarity checks support configurable embedding models and thresholds, and both assertion types reuse the existing CamundaAssert configuration with optional local overrides.

<p class="link-arrow">[Test your AI agents with Camunda Process Test](/components/agentic-orchestration/evaluate-agents/test-ai-agents.md)</p>

## ProcessOS

ProcessOS is an AI-powered layer on top of Camunda's agentic orchestration platform. It discovers your existing processes, re-engineers them against defined outcomes, and generates executable Camunda solutions.

ProcessOS has the following key characteristics:

- **A governed process**: The harness runs your engagement through four phases: scope, discover, transform, and implement. Each phase ends at a milestone, and subject matter expert (SME) review cycles act as gates between milestones.
- **Auditable by design**: The governance process itself runs on Camunda. Project state lives in Camunda, and every artifact is committed to Git, so AI-generated work stays reviewable at every step.
- **Two supported use cases**: Legacy migration transforms processes running on a legacy system to Camunda 8. AI transformation turns any process into an automated, AI-native process that runs on Camunda 8.
- **Built for builders**: ProcessOS targets builders who implement Camunda end to end and direct AI coding agents. SMEs take part as reviewers and approvers.

<p class="link-arrow">[ProcessOS Harness](/components/process-os-harness/overview.md)</p>

:::note
In this release, each project runs locally with its own private memory. Production deployment, CI/CD integration, and cross-project memory are planned for future releases.
:::

## Camunda Hub

[Camunda Hub](/components/hub/index.md) is now the single place where teams build, govern, and run process solutions in Camunda.

<img src={HubOverview} alt="Camunda Hub with the workspaces page open and the environments listed in the navigation" class="img-900"/>

- On SaaS, your organization is migrated to Hub automatically, and you don't need to take any action.
- Hub replaces Web Modeler and Console. It [maintains the features of its predecessors](#mapping-web-modeler-and-console-features-to-hub) and implements new features, all within a unified platform.
- Hub is deployed only once, and serves as the single point of entry for all your [environments](/components/concepts/environments.md), connecting to the Orchestration Clusters that host your dev, staging, and production environments.

**Hub changes how you and your teams work**. Instead of managing separate Web Modeler and Console instances per environment, you now use a single Hub that connects to all your environments. You design once, and manage everything from one place.

In Hub, there is a clear separation of responsibilities:

- **Center of excellence teams** manage organizational infrastructure, member access, and workspaces, so delivery teams have the environments and tools they need to ship process solutions at scale.
- **Delivery teams** collaborate in managed workspaces and model, test, and deploy business processes.

Organization-level resource governance and workspace-level project delivery now happen in one product.

### Terminology

Camunda Hub introduces changes to many terms and concepts from Web Modeler and Console:

| Web Modeler                    | Camunda Hub                                                                                                   | Description                                                                                                                                                                                                      |
| :----------------------------- | :------------------------------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Project                        | [Workspace](/reference/glossary.md#workspace)                                                                 | When upgrading to Hub, your projects automatically migrate to workspaces. Workspaces in Hub are isolated team collaboration spaces. Members can only view workspaces they're invited to.                         |
| Process application            | [Project](/reference/glossary.md#project)                                                                     | When upgrading to Hub, your process applications automatically migrate to projects. Projects in Hub can be versioned as a bundle of files or used as a folder for loose files.                                   |
| IDP application                | IDP project                                                                                                   | When upgrading to Hub, your IDP applications automatically migrate to IDP projects.                                                                                                                              |
| Collaborator                   | Member                                                                                                        | Workspace members replace project collaborators. Members can be added and managed per workspace.                                                                                                                 |
| Cluster (as deployment target) | [Environment](/reference/glossary.md#environment)                                                             | Environment is a new concept that represents a deployment target. A cluster represents the underlying infrastructure that hosts one or more environments. Organization admins assign environments to workspaces. |
| Project Admin                  | [Workspace Admin](/components/hub/organization/manage-workspaces/manage-workspace-members.md#workspace-roles) | This aligns with the project-to-workspace terminology change.                                                                                                                                                    |

### Mapping Web Modeler and Console features to Hub

The following table shows how you can access the Hub equivalents for key Web Modeler and Console features.

| Product (8.9) | Feature                                   | Hub documentation                                                                                             |
| :------------ | :---------------------------------------- | :------------------------------------------------------------------------------------------------------------ |
| Console       | Organization overview                     | [Console](/components/hub/organization/console.md)                                                            |
| Console       | View clusters                             | [View clusters](/components/saas/clusters/manage-cluster.md#view-clusters)                                    |
| Console       | Organization management                   | [Manage organization](/components/hub/organization/manage-organization-settings/organization-settings.md)     |
| Web Modeler   | View projects                             | [View workspaces](/components/hub/organization/manage-workspaces/index.md#view-existing-workspaces)           |
| Web Modeler   | Create a project                          | [Create a workspace](/components/hub/organization/manage-workspaces/manage-workspace.md#create-a-workspace)   |
| Web Modeler   | Manage project collaborators              | [Manage workspace members](/components/hub/organization/manage-workspaces/manage-workspace-members.md)        |
| Web Modeler   | Rename/delete project                     | [Manage workspace](/components/hub/organization/manage-workspaces/manage-workspace.md)                        |
| Web Modeler   | Connect clusters to a process application | [Assign environments to a workspace](/components/hub/organization/manage-environments/assign-environments.md) |
| Web Modeler   | Deploy a process application              | [Deploy your project](/components/hub/workspace/manage-projects/deploy-project.md)                            |
| Web Modeler   | View shared resources                     | [Manage catalog](/components/hub/organization/manage-catalog/getting-started.md) or **Shared resources**      |
| Web Modeler   | Recently deleted                          | [Recently deleted](/components/hub/workspace/manage-projects/recently-deleted.md)                             |

### Key features

Camunda Hub introduces many new features, including the following highlights:

#### Catalog

Hub introduces the [Hub catalog](/components/hub/organization/manage-catalog/getting-started.md). Center of excellence teams can manage reusable automation assets in a Git repository and publish them to Hub. You can see where assets are being used and which processes are using outdated or deprecated assets.

Delivery teams can trust that catalog assets have been vetted and approved by the center of excellence. They can discover assets in the catalog, read asset documentation, and apply them when modeling.

<p class="link-arrow">[Use catalog assets](/components/hub/workspace/modeler/element-templates/use-catalog-assets.md)</p>

#### Business value dashboard

Use the **Business Value** page in Camunda Hub to track process outcomes using cycle time, automation rate, activity, and agentic adoption metrics, and to set targets for cycle time and automation rate.

- A portfolio view compares every process in the selected Orchestration Cluster and ranks off-target processes by how many targets are missed and by how far.
- A process view shows the metrics and targets for a single process, including a cycle time distribution with P50, average, and P95.
- Every metric is calculated from completed process instances in the selected environment. No changes to your process models are required.

<p class="link-arrow">[Business value dashboard](/components/hub/organization/analyze-operations/business-value-dashboard.md)</p>

#### Workspaces and projects

Hub introduces workspaces and projects.

**Workspace**: A workspace is a collaboration environment within an organization, representing a team or business domain. A workspace is assigned members and projects so all related work happens in one shared space. When you migrate to 8.10, all your Web Modeler projects become workspaces.

**Project**: A project contains a set of files. You can consider a project as a bundle of related files you can version and deploy together. You can also consider a project as a container of individual files meant to be versioned and deployed independently. When you migrate to 8.10, all your Web Modeler process applications become projects.

<ul>
  <li><span class="link-arrow">[Manage workspaces](/components/hub/organization/manage-workspaces/index.md)</span></li>
  <li><span class="link-arrow">[Manage projects](/components/hub/workspace/manage-projects/manage-projects.md)</span></li>
</ul>

#### Environments

Hub introduces environments as deployment targets where teams run their processes. An environment is hosted on a cluster, and the cluster remains the infrastructure that your administrators operate.

- Organization admins assign environments to workspaces, and projects deploy to the environments of their workspace instead of connecting clusters to deployment stages.
- In Self-Managed, each Physical Tenant of a cluster at version 8.10 or later is an environment. In SaaS, each cluster has one environment.
- When you upgrade, Hub assigns the clusters that your process applications used to their workspaces as environments.

<p class="link-arrow">[Environments](/components/concepts/environments.md)</p>

#### Project snapshots and file versioning

In Web Modeler, a process application and the resources within it were tightly coupled. You could only version and deploy the resources as a single, bundled unit.

Camunda Hub introduces an improved model with more granular control over project and file versions:

- **[Project snapshots](/components/hub/workspace/manage-projects/project-versioning.md):** You can create project snapshots to capture the current state of all project resources.
- **[File-level versions](/components/hub/workspace/modeler/modeling/versions.md):** You can now create new versions for individual files within a project. Every file maintains its own version history.
- **Autosave:** All files save their state automatically after edits.
- **Decoupled element template versions:** Project versions and element template versions are now created independently of each other.

<details>
<summary>New to projects?</summary>

If you're not familiar with projects, the following sections explain how to:

- [Deploy to environments](/components/hub/workspace/manage-projects/deploy-project.md#deployment-environments)
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

#### Hub credentials manager

Before 8.10, you configure a connector's authentication and connection settings directly on each connector task. This doesn't scale well and is hard to maintain. For example, if ten tasks call the same REST API, you configure the same authentication ten times, and you update all ten when something changes.

8.10 introduces credentials. These are authentication and connection configurations you create once and reuse wherever you need them. When you update a credential, that change is applied everywhere the credential is used.

Camunda Hub provides an interface for managing your credentials.

<img src={CredentialsImg} alt="Create a credential page in Camunda Hub showing credential types such as AWS Credential, REST Authentication, and JDBC Connection, each with the connectors that use it" class="img-900"/>

- Center of excellence teams create and manage credentials centrally in Hub, and see them across all environments.
- Delivery teams select a credential from the properties panel of a connector task in the modeler, instead of entering the settings on every task.
- Credentials created outside Hub, for example in [Desktop Modeler](#credentials-in-desktop-modeler), can be found by scanning environments and added to Hub for central management.
- Credentials are stored as cluster variables, so connectors and job workers can reference them by name.

<p class="link-arrow">[Manage credentials](/components/hub/organization/credentials/index.md)</p>

#### Environment connection in Modeler

Connect the modeler in Hub to an [environment](#environments) to model, test, and review against your real runtime, instead of building in isolation.

- View and choose which environment you are connected to from the bottom panel bar of the diagram, in the **Implement** tab.
- Connector credential names from the connected environment autocomplete in your FEEL expressions and in the properties panel credential picker.
- [Task testing](/components/modeler/task-testing.md), connector credentials, and the **Webhook** tab follow this connection. Your deploy target doesn't change.

This shortens the build, review, and test cycle, because you validate against the same environment your process runs in.
Test Studio doesn't follow this connection. It runs against the environment you select in the **Test** tab.

<p class="link-arrow">[Connect to a runtime](/components/hub/workspace/modeler/modeling/connect-to-a-runtime.md)</p>

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
| Member             | Full access to create and collaborate on projects in workspaces they're invited to, plus read-only visibility into the organization.                                                                                                                                            |
| Analyst            | Includes everything a Member can do, plus full access to Optimize to build process dashboards and reports. Access to specific dashboards and reports within Optimize is governed separately by [Optimize collection roles](/components/optimize/userguide/user-permissions.md). |
| Organization Admin | Manages the organization, its members, and its workspaces, with full access to every workspace and project by default. Organization Admins can also assign environments to workspaces.                                                                                          |
| DevOps             | Grants cluster create and update, cluster clients, connector secrets, IP allowlisting, secure connectivity, encryption, and the connector-management view, plus Member-level modeling. Cannot manage or view organization members, billing, or organization settings.           |

<p class="link-arrow">[Roles and permissions](/components/hub/organization/users-and-roles.md#roles-and-permissions)</p>

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
- Any files or folders located directly in a project, not inside a process application, were automatically grouped in a new process application, named `YOUR PROJECT NAME - General`. You can rename this application, [move content out of it](#organize-the-general-process-application), or otherwise reorganize it as with any other process application.
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

#### Deploy to environments

Before 8.10, you connected clusters to deployment stages in each process application. In 8.10, a project has no deployment stages. It deploys to the [environments](/components/concepts/environments.md) that are assigned to its workspace. An organization admin [assigns environments to the workspace](/components/hub/organization/manage-environments/assign-environments.md).

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

### Environments in the SaaS migration

Before 8.10, you connected up to four clusters to a process application, one for each deployment stage. In 8.10, a project has no deployment stages, so Camunda Hub carries these connections forward as [environments](/components/concepts/environments.md) of the workspace. Camunda Hub assigns the environments in a separate step from the Web Modeler data migration described above.

For each migrated workspace:

- Every cluster that a process application in the workspace connected to any deployment stage becomes an environment assigned to the workspace. This also applies to the cluster of each IDP application. A cluster that several stages or applications used is assigned once.
- If several projects are in the same workspace, the workspace receives the environments of all of them.
- Projects inherit the environments of their workspace. They have no deployment stages or connected clusters anymore, and the migration doesn't set a default environment for a project. You choose the environment when you deploy.
- Workspaces you create after the migration start without environments.

An organization admin can change the assigned environments at any time. See [assign environments to a workspace](/components/hub/organization/manage-environments/assign-environments.md).

## Multi-region resilience

Camunda 8.10 provides a structured multi-region resilience framework for Self-Managed Orchestration Cluster deployments.

<img src={OverviewImg} alt="High-level diagram showing Cold Recovery and Dual-Region strategies" title="Cold Recovery and Dual-Region strategies" class="img-noborder img-900"/>

- **[Cold Recovery](/self-managed/concepts/multi-region/cold-recovery.md)**: Camunda's lowest-cost multi-region configuration uses scheduled cross-region backups and a manual restore procedure to recover from complete primary-region loss. Recovery measured in hours is operationally acceptable. On SaaS, [cross-region cold recovery](/components/saas/cross-region-cold-recovery.md) is also available for AWS and GCP region pairs marked **Failover supported**.

- **[Dual-Region](/self-managed/concepts/multi-region/dual-region.md)**: Dual-region deployment with continuous replication. A full Camunda Orchestration Cluster runs continuously in both a primary and secondary region.

- **Three-region active-active (RDBMS)**: A three-region Kubernetes deployment with the Orchestration Cluster running active-active across all three regions, backed by a relational database (RDBMS) with cross-region replication as secondary storage. Losing one region requires no operator intervention, because the cluster never loses quorum.

Camunda 8.10 also adds the following capabilities to support multi-region deployments:

- **Region-aware partition placement**: Operators declare which region each broker belongs to using a topology label. The engine distributes partition replicas across regions so no single region holds a quorum for any partition, and leader election prefers region-local leaders under normal conditions. The same mechanism works for availability zone or datacenter isolation.
- **Async replication support for RDBMS secondary storage**: Asynchronously replicated relational databases, including AWS Aurora and PostgreSQL, are supported as secondary storage. The exporter pauses automatically when the RDBMS endpoint is unreachable, such as during a failover, and replays missing events from the Zeebe log on reconnection without manual data repair.

<p class="link-arrow">[Multi-region resilience](/self-managed/concepts/multi-region/resilience-tiers.md)</p>

## Strong tenant isolation via Physical tenants

Camunda 8.10 introduces Physical Tenants for strong physical data isolation within a single cluster with separate data storage and independent operations per tenant. Physical Tenants still share cluster compute resources such as CPU and memory, so runtime interference is reduced but not fully eliminated.

<img src={TenantImg} alt="Three tenancy models compared: Logical Tenant with lightweight isolation and one shared data store per cluster, Physical Tenant with strong isolation and multiple isolated data stores in one cluster, and Multi-Cluster with maximum isolation across separate clusters." class="img-noborder"/>

- Physical Tenant isolation is best for multiple teams or organizations needing strong isolation without the cost and complexity of separate clusters.

- Physical Tenants and Logical Tenants can be used together. Each Physical Tenant can contain its own set of Logical Tenants, providing two independent layers of isolation: physical separation between top-level tenant groups, and logical separation within each group.

- **Per-tenant APIs and web apps**: The REST API and gRPC API are exposed per Physical Tenant, and Operate, Tasklist, and Admin are available at `<baseurl>/physical-tenants/<physicalTenantId>/<webapp>`.
- **Per-tenant authorization**: Each Physical Tenant enforces its own roles, mapping rules, and permissions, so a user can have a different role on each Physical Tenant.
- **Identity provider selection**: Identity providers are defined at the cluster level, and each Physical Tenant chooses which ones it accepts. Cluster-wide operations such as topology, backups, and restore are protected by a claim-based cluster admin role.
- **Logical multi-tenancy on SaaS**: Camunda 8 SaaS officially supports multi-tenancy via tenant identifiers. It is available on clusters running generation 8.8 and later, so you don't need to upgrade to 8.10 to use it.

<p class="link-arrow">[Physical Tenant isolation model](/self-managed/concepts/physical-tenants/index.md)</p>

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

The new visual Camunda design system and navigation are introduced for all components with the 8.10 release in both SaaS and Self-Managed.

<img src={DesignSystem} alt="Camunda design system" class="img-noborder img-transparent img-900"/>

- **Updated navigation:** A persistent sidebar makes it easy to jump between pages and accomplish tasks.
- **Clear context:** The top bar shows which organization, workspace, and component you are working in.
- **Designed for accessibility:** The interface follows accessibility best practices, including keyboard navigation and color contrast.

## Centralized secret resolution via Zeebe

Centralized secret resolution through Zeebe is introduced in 8.10.

Use and manage secrets to keep sensitive values such as API keys, passwords, and tokens, out of your process models, job variables, and configuration files. Processes can reference credentials from customer-managed secret stores without persisting secret values in Camunda.

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

## Credentials in Desktop Modeler

Desktop Modeler also supports [credentials](#hub-credentials-manager). Select an existing credential on a connector task from the properties panel, or create a new one without leaving it, instead of entering the same authentication and connection settings on every task.

<p class="link-arrow">[Use credentials in Desktop Modeler](/components/modeler/desktop-modeler/credentials.md)</p>

## Camunda for Slack

Camunda for Slack joins Camunda for Microsoft Teams as a second chat platform served by the same App Integrations backend. From Slack, you can browse and complete tasks, start a process, switch organization and cluster, and subscribe a channel or direct message to notifications, all through the `/camunda` slash command and the Camunda direct message. Microsoft Teams and Slack are independent, so you can run either on its own, or both.

<p class="link-arrow">[Camunda for Slack](/components/camunda-integrations/app-integrations/slack.md)</p>

## Helm chart deployment

Important changes to Helm chart deployment in 8.10 are as follows:

<!-- Legacy anchor retained for inbound links. -->

### One management plane and one or more execution planes {#a-hub-plane-and-one-or-more-execution-planes}

The 8.10 Helm chart adds `global.topology.mode`, so each release declares its role in the deployment: `combined`, `hub`, `orchestration`, or `optimize`. One `hub` release running Camunda Hub and Management Identity can serve many independently deployed `orchestration` releases, each with its own lifecycle, scaling, and upgrade schedule.

The new `optimize` role deploys Optimize alone. Because one Optimize instance reads a single index prefix, this is what lets each [Physical Tenant](/self-managed/concepts/multi-tenancy/physical-tenants.md) have its own Optimize instance.

`combined` remains the default, so existing deployments are unchanged by the upgrade. For a new production deployment, the split topology is the baseline.

`hub` and `optimize` are 8.10-only roles, because Camunda Hub and its cluster inventory don't exist in the earlier charts. The `orchestration` role is also available in the 8.9, 8.8, and 8.7 charts from versions 14.11.0, 13.14.0, and 12.14.0, so one 8.10 Hub can manage clusters on older chart versions. Earlier versions of those charts ignore `global.topology.mode` and deploy a combined release. The 8.10 roles require chart 15.0.0 or later.

<p class="link-arrow">[Install the deployment topology](/self-managed/deployment/helm/install/topology/index.md)</p>

### Camunda Helm Toolkit

The new Helm migration and validation toolkit can help you upgrade from Camunda 8.9 to 8.10 on Kubernetes with Helm.

Use the toolkit to:

- Read your existing 8.9 Helm values (for example, values.yaml).
- Generate a sample 8.10 values file reflecting the recommended Helm CLI v4, Bitnami sub‑charts removal, Hub‑aware deployment patterns, and simplified application configuration.
- Create a migration report that lists the keys that were migrated automatically, flags keys that require manual decision (for example, infrastructure endpoints, security‑sensitive options), suggests where to find more information in the documentation, and can validate an existing 8.10 values file (for example, one drafted by hand or AI tool) against Camunda’s migration rules.

The CLI is non‑interactive, with clear exit codes and optional JSON output, making it suitable for humans using the command line, CI pipelines, and AI agents (for example, Claude Code, Copilot) that can use it as part of an automated migration workflow.

<p class="link-arrow">[Prepare Helm upgrades with the Camunda Helm Toolkit](/self-managed/deployment/helm/operational-tasks/camunda-helm-toolkit.md)</p>

### Helm CLI v3 and v4 support {#helm-v4-required}

Camunda 8.10 (chart 15.x) supports Helm CLI v3 (3.10 or later) and v4. With Helm CLI v3, the chart shows a warning when you run `helm install` or `helm upgrade`.

<HelmCliSupport />

Switching CLIs does not require a release-state migration. Helm runs on the client, and both CLIs read and write the same release-storage format. Use Helm CLI v4 for new installations. Switch existing deployments before Helm CLI v3 support ends.

<p class="link-arrow">[Move from the Helm v3 CLI to v4](/self-managed/deployment/helm/operational-tasks/moving-helm-v3-to-v4.md)</p>

### Host network support for orchestration cluster pods

The 8.10 Helm chart adds `orchestration.hostNetwork` (default: `false`), which lets orchestration cluster pods share the host node's network namespace. This is useful in bare-metal or restricted network environments where pods must be reachable directly via the node IP rather than a cluster overlay network.

<p class="link-arrow">[Configure pod networking](/self-managed/deployment/helm/configure/pod-networking.md)</p>

## Low-code testing

Test Studio in Camunda Hub turns process runs into repeatable tests that you can maintain and run in your CI/CD pipeline.

- **Assertions**: Run a process instance, then save its input data and assertions as a low-code integration test. Add variable and path assertions, and view pass or fail results in the **Test** tab.
- **Shared schema with Camunda Process Test**: Test files use the same schema as Camunda Process Test (CPT). Record a test once, run it in CI/CD through CPT, and load CPT-authored test files into Test Studio to debug them visually.
- **Test repair**: When you delete, rename, or change the type of a BPMN element, Test Studio shows which steps broke and lets you fix them in place instead of re-recording the run.
- **Segment tests**: In Play, capture and rerun targeted sections of a process as low-code integration tests. Ad-hoc subprocesses, and therefore AI agent elements, are not supported in test mode. See the [limitations](/components/hub/workspace/modeler/validation/test-your-process.md).

<p class="link-arrow">[Test files](/components/hub/workspace/modeler/validation/test-files.md)</p>

## Optimize

Important changes to Optimize in 8.10 are as follows:

### Optimize authentication configuration keys

The component-specific Optimize login and API security keys are deprecated in favor of `camunda.security.*`. Camunda plans to remove them in a future release, with the component-specific configuration and its `optimize.security.csl.enabled=false` fallback.

`CAMUNDA_OPTIMIZE_IDENTITY_BASE_URL` is not deprecated and stays in use for user lookups. See [component-specific configuration keys](/self-managed/upgrade/components/890-to-8100.md#component-specific-security-configuration-keys-are-deprecated) for the full key mapping.

<p class="link-arrow">[Optimize authentication in Self-Managed](/self-managed/concepts/authentication/authentication-to-optimize.md)</p>

### Optimize data filters in Camunda Hub

On SaaS, you can now configure Optimize export filters directly in Hub cluster settings. No Helm values or configuration files required. Use the **Data filters** section in cluster settings to control which process definitions (by `bpmnProcessId`) and variable names reach Optimize.

New SaaS clusters include a default `business_` variable include filter that limits Optimize to variables whose names start with `business_`. This reduces Elasticsearch storage and shard usage significantly. Existing clusters are unaffected and can opt in with one click.

<p class="link-arrow">[Configure Optimize data filters](/components/saas/clusters/settings.md#data-filters)</p>

## Unified authentication for Orchestration Cluster and Optimize

With Camunda 8.10, Optimize can be configured with the same `camunda.security.authentication.*` settings already used by the Orchestration Cluster.

- Optimize continues to accept its 8.9 authentication settings in 8.10, translating the recognized properties to new equivalents at startup, but those 8.9 properties are deprecated and will be removed in a future release.
- User, group, role, tenant, and permission management for Optimize is unchanged in 8.10 and is still handled by Management Identity.

:::note
Nothing changes for the Orchestration Cluster as it already uses these settings since Camunda 8.9.
:::

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

Camunda 8.10 updates several platform and environment baselines. For complete details, including breaking changes and deprecations, see [release announcements](./8100-announcements.md) and [supported environments](/reference/supported-environments.md).

Highlights include:

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
