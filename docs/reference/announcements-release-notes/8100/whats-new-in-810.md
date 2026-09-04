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

<PageDescription />

## Why upgrade to Camunda 8.10?

Upgrading to Camunda 8.10 delivers significant benefits and keeps your installation aligned and ready for future releases.

## Summary of important changes

Important changes in Camunda 8.10 are summarized in the following sections.

:::info learn more and upgrade

- See [release announcements](/reference/announcements-release-notes/8100/8100-announcements.md) and [release notes](/reference/announcements-release-notes/8100/8100-release-notes.md) for a full summary of what's included in Camunda 8.10, including all breaking changes and deprecations, and supported environment changes.
- For removed legacy APIs, Tasklist V1-dependent features, and Zeebe Process Test, see the [8.10 release announcement](/reference/announcements-release-notes/8100/8100-announcements.md#removal-of-legacy-apis-tasklist-v1-dependent-features-and-zeebe-process-test).
- Ready to upgrade? See the [upgrade guides](#upgrade-guides) to learn more about upgrading from Camunda 8.9 to 8.10.

:::

## Introducing Camunda Hub

Camunda Hub is a new product that combines the features of former products Web Modeler and Console.

In Hub:

- **Center of excellence teams** manage organizational infrastructure, member access, and workspaces, so delivery teams have the environments and tools they need to ship process solutions at scale.
- **Delivery teams** collaborate in managed workspaces, discover and use approved catalog assets, and model, test, and deploy business processes.

Organization-level resource governance and workspace-level project delivery now happen in one product.

<p class="link-arrow">[Camunda Hub documentation](/components/hub/index.md)</p>

### Terminology

With the introduction of Camunda Hub, many terms and concepts from Web Modeler and Console have changed:

[Workspace](/reference/glossary.md#workspace)

| Before 8.10 (Web Modeler/Console) | Camunda 8.10 (Camunda Hub)                                                                                    |
| :-------------------------------- | :------------------------------------------------------------------------------------------------------------ |
| Project                           | [Workspace](/reference/glossary.md#workspace)                                                                 |
| Process application               | [Project](/reference/glossary.md#project)                                                                     |
| Organization member               | [Organization user](/components/hub/organization/manage-users/manage-users.md)                                |
| Collaborator                      | [Workspace member](/components/hub/organization/manage-workspaces/manage-workspace-members.md)                |
| Project Admin                     | [Workspace Admin](/components/hub/organization/manage-workspaces/manage-workspace-members.md#workspace-roles) |     |

### SaaS roles and permissions

SaaS organization-level roles and permissions have changed.

Before 8.10, users in an organization were assigned one of the following roles in Console:

| Role    | Description                                                                                                                                       |
| :------ | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| Modeler | Has access to Web Modeler for creating and collaborating on projects except permissions to deploy and run processes. Read-only access to Console. |
| Analyst | Includes Modeler permissions and has full access to Optimize to build process dashboards and reports.                                             |
| Admin   | Full access to the platform, process resources, and clusters. Cannot manage other admins.                                                         |

In 8.10, users in an organization are assigned one of the following roles in Camunda Hub:

| Role               | Description                                                                                                                                                                                                                                                                     |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Member             | Full access to create and collaborate on workspaces and projects, plus read-only visibility into the organization and its clusters.                                                                                                                                             |
| Analyst            | Includes everything a Member can do, plus full access to Optimize to build process dashboards and reports. Access to specific dashboards and reports within Optimize is governed separately by [Optimize collection roles](/components/optimize/userguide/user-permissions.md). |
| Organization Admin | Manages the organization, its members, and its workspaces, with full access to every workspace and project by default.                                                                                                                                                          |
| DevOps             | Grants cluster create and update, cluster clients, connector secrets, IP allowlisting, secure connectivity, encryption, and the connector-management view, plus Member-level modeling. Cannot manage or view organization members, billing, or organization settings.           |

<p class="link-arrow">[Roles and permissions](/components/hub/organization/manage-users/manage-users.md#roles-and-permissions)</p>

### Self-Managed roles and permissions

Self-Managed roles and permissions have changed:

| 8.9 role          | 8.10 equivalent | Changes                                                                                                                                                                                    |
| :---------------- | :-------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Console           | DevOps          | Gains management access to Hub's cluster pages.                                                                                                                                            |
| Web Modeler Admin | Hub Admin       | Gains full access to Hub's cluster pages.                                                                                                                                                  |
| Web Modeler       | Hub             | No change in access.                                                                                                                                                                       |
| -                 | Analyst         | **(New role)** Grants Hub modeling access, management access to the catalog's usage and adoption data, and full access to Optimize, without modeler-admin or people/org management access. |

The 8.9 roles are not removed in 8.10. They remain for backward compatibility.

<p class="link-arrow">[Default roles in Self-Managed](/self-managed/components/management-identity/application-user-group-role-management/manage-roles.md#default-roles)</p>

### Key features

In addition to providing a unified interface for existing Web Modeler and Console functionality, Camunda Hub introduces many new features. In this section, you'll learn about some of the highlights. For all changes associated with Camunda Hub, review the 8.10 [release announcements](./8100-announcements.md) and [release notes](./8100-release-notes.md).

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

#### Recover deleted resources

When you deleted a resource, such as a file or process application, in Camunda 8.9, the resource was immediately and permanently deleted, along with:

- Their data in process application version history.
- Their child resources if the resource is a container, such as a folder or process application.

Deleted resources could not be recovered.

In Camunda Hub, when you delete a resource, it's moved to **Recently deleted**. There, you have 30 days to restore it before its permanently deleted.

<p class="link-arrow">[Recover deleted resources](/components/hub/workspace/manage-projects/recently-deleted.md)</p>

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

- [Define deployment stages](#define-deployment-stages)
- [Deploy a process application](#deploy-a-process-application)
- [Deploy an individual resource](#deploy-an-individual-resource)
- [Create a process application snapshot](#create-a-process-application-snapshot)
- [Create a resource version](#create-a-resource-version)

##### Define deployment stages

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

##### Deploy a process application

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

##### Deploy an individual resource

If you don't want to deploy all resources in a process application, you can deploy an individual resource:

1. In your process application, open a resource, such as a BPMN diagram or Form.
2. At the top right of the modeling interface, click **Deploy**.
3. In the deployment modal, under **Resources**, select **Only this resource**.
4. Confirm the deployment.

##### Create a process application snapshot

Use a snapshot to capture all files in a process application at once:

1. Open a process application.
2. On the right side of the process application view, under **Snapshots** click **Create snapshot**.
3. Enter a **Snapshot tag** in the snapshot creation modal.
4. Click **Create**.

##### Create a resource version

In addition to process application snapshots, you can create versions for individual resources:

1. In your process application, open a resource, such as a BPMN diagram or form.
2. At the top right of the modeling interface, click **Versions**.
3. Click **Create version**.
4. Enter a **Version name** in the version creation modal.
5. Click **Create**.

</details>

#### Catalog

In Web Modeler before 8.10, you can publish shared resources to the organization. These shared resources can be used in projects across the organization. However, governance over these shared resources is decentralized, usage can't be audited, and standards can't be enforced.

From 8.10, center of excellence teams can manage reusable automation assets in a Git repository and publish them to Hub. In Hub, they have visibility into where assets are being used and which processes are using outdated or deprecated assets.

<p class="link-arrow">[Manage the catalog](/components/hub/organization/manage-catalog/index.md)</p>

Delivery teams can trust that catalog assets have been vetted and approved by the center of excellence. They can discover assets in the catalog, read asset documentation, and apply them when modeling.

<p class="link-arrow">[Use catalog assets](/components/hub/workspace/modeler/element-templates/use-catalog-assets.md)</p><br />

#### Credentials manager

Before 8.10, you configure a connector's authentication and connection settings directly on each connector task. This doesn't scale well and is hard to maintain. For example, if ten tasks call the same REST API, you configure the same authentication ten times, and you update all ten when something changes.

Camunda Hub introduces credentials. These are authentication and connection configurations you create once and reuse wherever you need them. When you update a credential, that change is applied everywhere the credential is used.

<!-- todo: Add link -->

### Self-Managed

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

<p class="link-arrow">[Upgrade from Helm 8.9 to 8.10](/self-managed/upgrade/helm/890-to-8100.md)</p>

Additionally, when you upgrade, your data is [migrated](/self-managed/upgrade/components/890-to-8100.md#data-migration) to the [new file structure](#new-file-structure-and-requirements).

### Camunda Hub API

Before Camunda 8.10, you could interact with Web Modeler and Console resources through the following APIs:

| API                | Description                                                                                                                                                                                              | Camunda 8.10 status                                 |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------- |
| Web Modeler API v1 | Programmatically manage Web Modeler resources, like projects, process applications, and collaborators. This API now serves Camunda Hub resources, like workspaces, projects, and members under the hood. | Deprecated. Will be removed in 8.12.                |
| Administration API | Retrieve cluster data, including installed apps and usage metrics                                                                                                                                        | Removed for Self-Managed. Still available for SaaS. |

In Camunda 8.10, with Camunda Hub replacing Web Modeler and Console, the new Camunda Hub API succeeds the old Web Modeler API and, for Self-Managed, the Administration API. The Camunda Hub API unifies cluster and workspace management in a single interface. Additionally, it provides new APIs for interacting with Hub-specific features.

<p class="link-arrow">[Migrate from Web Modeler to the Camunda Hub API](/apis-tools/migration-manuals/migrate-from-web-modeler-to-hub-api.md)</p>

## Unified authentication for the Orchestration Cluster, Camunda Hub, and Optimize

The Orchestration Cluster, Camunda Hub, and Optimize now authenticate through the [Camunda Security Library](/reference/glossary.md#camunda-security-library-csl), a shared implementation that replaces the separate identity stacks these components used previously. All three accept the same `camunda.security.authentication.*` settings, so there is one configuration surface to learn and one place to look when authentication does not behave as expected. Nothing changes for the Orchestration Cluster, which already used these settings in 8.9.

Camunda Hub and Optimize both continue to accept their existing authentication settings in 8.10, translating the recognized properties to their new equivalents at startup, but those legacy properties are deprecated for both components and are removed in 8.11. Camunda Hub therefore requires no configuration change to upgrade to 8.10. User, group, role, tenant, and permission management for both components is unchanged in 8.10 and is still handled by Management Identity.

<p class="link-arrow">[Camunda Hub authentication](/self-managed/components/hub/configuration/identity.md)</p>

### Optimize's move to the Camunda Security Library

With the move to the [Camunda Security Library](/reference/glossary.md#camunda-security-library-csl) (CSL), Optimize adopts the same authentication and session handling as the Orchestration Cluster components.

The legacy Optimize login and API security keys are deprecated in favor of `camunda.security.*` and removed in 8.11, along with the legacy security stack and its `optimize.security.csl.enabled=false` fallback. `CAMUNDA_OPTIMIZE_IDENTITY_BASE_URL` is not deprecated and stays in use for user lookups. See [legacy configuration keys](/self-managed/upgrade/components/890-to-8100.md#legacy-security-configuration-keys-are-deprecated) for the full key mapping.

<p class="link-arrow">[Optimize authentication in Self-Managed](/self-managed/concepts/authentication/authentication-to-optimize.md)</p>

## Optimize data filters in Camunda Hub

On SaaS, you can now configure Optimize export filters directly in Hub cluster settings. No Helm values or configuration files required. Use the **Data filters** section in cluster settings to control which process definitions (by `bpmnProcessId`) and variable names reach Optimize.

New SaaS clusters include a default `business_` variable include filter, which limits Optimize to variables whose names start with `business_`. This reduces Elasticsearch storage and shard usage significantly. Existing clusters are unaffected and can opt in with one click.

<p class="link-arrow">[Configure Optimize data filters](/components/hub/organization/manage-clusters/settings.md#data-filters)</p>

## SaaS Web Modeler update (29 August 2026) {#web-modeler-data}

On 29 August 2026, your SaaS Web Modeler data received three updates:

- **[Organizational structure](#new-file-structure-and-requirements):** Enforces a stricter, more scalable file resource hierarchy.
- **[Data migration](/self-managed/upgrade/components/890-to-8100.md#data-migration):** Aligns your existing data with the new structure.
- **[Process application versioning model](#process-application-snapshots-and-file-versioning):** Provides more granular control.

## Camunda 8 Run no longer requires Java

Camunda 8 Run now ships with a bundled Java runtime. You no longer need to install OpenJDK or set `JAVA_HOME` before starting it.

## Wait states

Operate now shows what an active process instance is waiting for, so you can tell expected waiting from a stalled instance. When you inspect an active element, you can see the wait state and its details — a timer's due date, a receive task's message name and correlation key, a signal name, a condition expression, or a job's type and state.

Wait state tracking is enabled by default and writes records to secondary storage. In Camunda 8 Self-Managed, you can [disable it](/self-managed/concepts/wait-states/configure.md) if you do not want to track this data.

<p class="link-arrow">[Wait states](/components/wait-states/overview.md)</p>

## Business ID

Business ID is now a first-class, searchable attribute across the Orchestration Cluster. Introduced in 8.9 as an immutable domain-specific identifier, Business ID in 8.10 can be searched and filtered across process instances, decision instances, user tasks, messages, and message subscriptions. Jobs expose the Business ID in the activation response (visible, not searchable).

**What's new in 8.10:**

- **Search and filter** across entity types using advanced operators (`$eq`, `$neq`, `$exists`, `$like` with `*`/`?` wildcards, `$in`). Operate and Tasklist expose Equals, Contains, and Is one of in their filter UI.
- **Message correlation** — include a Business ID in published or correlated messages as an additional filter constraint. If both a correlation key and Business ID are supplied, both fields must match the corresponding values stored on the subscription.
- **Call Activity propagation** — child instances inherit the parent's Business ID by default. Configure a literal value or FEEL expression on the call activity to override it. Use `camunda.processInstance.businessId` in FEEL expressions to reference the parent's ID.
- **Start with a Business ID** from Camunda Hub or Desktop Modeler.
- **Late assignment** — assign a Business ID to a running instance that has none, when uniqueness is disabled. Assignment is forward-only: only artifacts created after the assignment carry it.

<p class="link-arrow">[Business ID](/components/concepts/process-instance-creation.md#business-id)</p>

## Connector operations

Connectors are now discoverable by the operation you want to perform, not only by the product they connect to. When you search in the create, append, or change element menu, the operations of every built-in connector appear as their own entries, so searching for `upload object` or `send email` takes you straight to the connectors that can do it. Selecting an operation applies the connector with that operation preselected, and connectors with several operations present them as a nested menu.

Two changes come with this:

- Connectors that provide a single operation are [renamed after the operation they perform](/reference/announcements-release-notes/8100/8100-announcements.md#connectors-with-a-single-operation-are-renamed-after-the-operation). Existing process models keep running unchanged.
- Element templates support the `steps` and `presets` keys, so your own templates can offer the same guided operation selection.

<p class="link-arrow">[Predefined configurations](/components/modeler/element-templates/template-metadata.md#predefined-configurations-steps-and-presets)</p>

## Helm chart deployment

Important changes to Helm chart deployment in 8.10 are as follows:

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
