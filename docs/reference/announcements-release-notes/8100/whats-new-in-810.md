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

Important changes in Camunda 8.10 are summarized as follows:

:::note
Changes for 8.10 will be added here as the 8.10 documentation is updated.
:::

:::info learn more and upgrade

- See [release announcements](/reference/announcements-release-notes/8100/8100-announcements.md) and [release notes](/reference/announcements-release-notes/8100/8100-release-notes.md) for a full summary of what's included in Camunda 8.10, including all breaking changes and deprecations, and supported environment changes.
- For removed legacy APIs, Tasklist V1-dependent features, and Zeebe Process Test, see the [8.10 release announcement](/reference/announcements-release-notes/8100/8100-announcements.md#removal-of-legacy-apis-tasklist-v1-dependent-features-and-zeebe-process-test).
- Ready to upgrade? See the [upgrade guides](#upgrade-guides) to learn more about upgrading from Camunda 8.9 to 8.10.

:::

## Optimize data filters in Console

On SaaS, you can now configure Optimize export filters directly in Console cluster settings. No Helm values or configuration files required. Use the **Data filters** section in cluster settings to control which process definitions (by `bpmnProcessId`) and variable names reach Optimize.

New SaaS clusters include a default `business_` variable include filter, which limits Optimize to variables whose names start with `business_`. This reduces Elasticsearch storage and shard usage significantly. Existing clusters are unaffected and can opt in with one click.

<p class="link-arrow">[Configure Optimize data filters](/components/hub/organization/manage-clusters/settings.md#data-filters)</p>

## Web Modeler data

On 29 August 2026, your SaaS Web Modeler data received three updates:

- **[Organizational structure](#organizational-structure):** Enforces a stricter, more scalable file resource hierarchy.
- **[Data migration](#data-migration):** Aligns your existing data with the new structure.
- **[Process application versioning model](#process-application-versioning-model):** Provides more granular control.

### Organizational structure

In Camunda 8.9, a project can contain process applications, folders, and files. Camunda 8.10 introduces a new file resource hierarchy in which projects only contain process applications and IDP applications. Files and folders are stored inside process applications.

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
Payments (Project)
├─ Payments - General (Process application - TEMPORARY PLACEMENT)
│   ├─ main.bpmn
│   ├─ eligibility.dmn
│   ├─ readme.md
│   ├─ Forms (Folder)
│   │   ├── details.form
│   │   └── review.form
│   └─ Archive (Folder)
├── Refunds (Process application - MOVED)
│   ├── refunds.bpmn
│   └── refund-request.form
└─ Onboarding (Process application)
    ├── onboarding.bpmn
    └── kyc-checks.dmn
```

This strict new **Project > Process application > File/folder** hierarchy makes resources more discoverable and your projects more scalable.

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

If you're not familiar with process applications, the following sections explain how to:

- [Define deployment stages](#define-deployment-stages)
- [Deploy a process application](#deploy-a-process-application)
- [Deploy an individual resource](#deploy-an-individual-resource)
- [Create a process application snapshot](#create-a-process-application-snapshot)
- [Create a resource version](#create-a-resource-version)

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
    <td>[APIs & tools upgrade guide](/)</td>
    <td>Plan and execute an upgrade from Camunda 8.9 to 8.10, focusing on API and tools transitions.</td>
    <td><p><ul><li>Application developers maintaining Camunda-based solutions in Self-Managed Kubernetes or VM environments.</li><li>Developers using Camunda APIs and tools.</li></ul></p></td>
</tr>
</table>
