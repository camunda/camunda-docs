---
id: whats-new-in-88
title: What's new in Camunda 8.8
sidebar_label: What's new in Camunda 8.8
description: "Learn more about what's new and changed in Camunda 8.8."
keywords: ["what's changed", "what's new"]
---

import OrchestrationClusterImg from '../../img/orchestration-cluster.png';

Learn about important changes in Camunda 8.8 to consider when planning your upgrade from Camunda 8.7.

:::warning
This documentation is a work in progress and may contain incomplete, placeholder, or evolving content. While the core concepts introduced in Camunda 8.8 are stable, specific details are actively being refined.
:::

## Introducing Camunda 8.8

Camunda 8.8 introduces important architectural changes and enhancements to simplify deployment, improve maintainability, and empower both operations teams and developers.

### Why upgrade to Camunda 8.8?

Upgrading to Camunda 8.8 delivers significant benefits:

<div className="list-tick">

- **Unified platform**: Camunda 8.8 combines core components into a single [Orchestration Cluster](#orchestration-cluster), reducing system complexity, centralizing operations, and simplifying both deployment and maintenance.

- **Enhanced productivity**: This upgrade introduces streamlined [identity and access management](#identity), a consolidated configuration model, and modernized & consolidated [APIs and SDKs](#apis-and-tools), making development, integration, and permission handling faster and more intuitive.

- **Increased efficiency**: The new [unified exporter architecture](#unified-exporter) improves performance with accelerated data visibility in Operate and Tasklist, as well as available via query APIs. It also enables easier operation and administration, and improves resilience when deploying across multiple data centers.

</div>

:::info
To learn more about the benefits of upgrading to Camunda 8.8, see the blog posts [streamlined deployment with Camunda 8.8](https://camunda.com/blog/2025/03/streamlined-deployment-with-camunda-8-8/) and [introducing enhanced Identity Management in Camunda 8.8](https://camunda.com/blog/2025/03/introducing-enhanced-identity-management-in-camunda-88/).
:::

### Summary of important changes

Important changes introduced in Camunda 8.8 are summarized as follows:

<table className="table-callout">
<tr>
    <td width="30%">**What's new/changed**</td>
    <td>**Summary**</td>
</tr>
<tr>
    <td>[Orchestration Cluster](#orchestration-cluster)</td>
    <td>The Orchestration Cluster (previously automation cluster) is now the core Camunda 8 component.</td>
</tr>
<tr>
    <td>[Identity, authentication, and authorization](#identity)</td>
    <td><p>Identity management is now split into two scopes for improved access management, performance, and flexible integration with any OIDC-compatible Identity Provider:</p><p><ul><li><p>**Identity**: Manages authentication and fine-grained authorizations for the Orchestration Cluster and its APIs.</p></li>
            <li><p>**Management Identity**: Controls access for Web Modeler, Console and Optimize.</p></li></ul></p></td>
</tr>
<tr>
    <td>[Process instance tags](#process-instance-tags)</td>
    <td>Add immutable, lightweight tags (max 10) at process instance creation for routing, correlation, and prioritization; forwarded to every job and provided in responses.</td>
</tr>
<tr>
    <td>[APIs & tools](#apis-and-tools)</td>
    <td>New and changed APIs & tools are introduced in Camunda 8.8.</td>
</tr>
</table>

:::note simple deployment
The simplest Camunda 8.8 Self-Managed deployment runs as a single Java application or docker container.
:::

:::info

- See [release announcements](/reference/announcements-release-notes/880/880-announcements.md), [release notes](/reference/announcements-release-notes/880/880-release-notes.md), and the [quality board](https://github.com/orgs/camunda/projects/187/views/15) for more detail on what's included in Camunda 8.8.
- Ready to upgrade? See our [upgrade guides](#upgrade-guides) to learn more about upgrading from Camunda 8.7 to 8.8.

:::

## Orchestration Cluster {#orchestration-cluster}

The primary architectural change is the consolidation of the core Zeebe, Operate, Tasklist, and Identity components into the Orchestration Cluster (a single unified deployable package). This impacts how Camunda 8 is deployed, managed, and scaled.

The Orchestration Cluster (previously automation cluster) is now the core component of Camunda 8.

<img src={OrchestrationClusterImg} alt="Diagram showing the Orchestration Cluster" class="img-noborder" style={{marginBottom: '0'}}/>

### Zeebe, Operate, Tasklist, and Identity

In Camunda 8.8, Zeebe, Operate, Tasklist, and Identity are integrated into the Orchestration Cluster application as a single deployable artifact, distributed as a JAR file or Docker container.

- [Zeebe](/reference/glossary.md#zeebe) is the [workflow engine](/reference/glossary.md#workflow-engine).
- Operate is used for monitoring and troubleshooting [process instances](/reference/glossary.md#process-instance) running in Zeebe.
- Tasklist is used for interacting with [user tasks](/reference/glossary.md#user-task) (assigning, completing, and so on).
- [Identity](/reference/glossary.md#identity) is used for managing the integrated Orchestration Cluster authentication and authorization.

In Camunda 8.7 and earlier, each component (Zeebe, Operate, Tasklist, and Identity) was deployed independently.

### Unified Orchestration Cluster REST API {#orchestration-cluster-api}

Camunda 8.8 introduces a single unified [Orchestration Cluster REST API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md) you can use to interact programmatically with the Orchestration Cluster.

- This replaces component APIs (Operate API, Tasklist API, Zeebe API, and much of Identity API) with a single set of endpoints.
- This unified API supports both organizational (SaaS) and Self-Managed deployments.
- This is now the default and recommended integration point for developers, operators, and automation solutions.

### Unified Exporter

Camunda 8.8 introduces a new unified exporter architecture to improve cluster management and data migration. The new exporter architecture provides two dedicated Helm jobs for Identity migration and process application migration.

In Camunda 8.7 and earlier, dedicated importers/exporters were used for data flows between components (such as Elasticsearch import/export).

### Unified component configuration

Camunda 8.8 introduces a unified configuration for Orchestration Cluster components where you can define all essential cluster and component behavior through a single, centralized configuration system.

In Camunda 8.7 and earlier, managing and configuring core components (Zeebe, Operate, Tasklist, Identity) was done separately.

## Process instance tags {#process-instance-tags}

Camunda 8.8 introduces **process instance tags**: optional, immutable, lightweight labels you can attach when creating a process instance (see [Process instance creation](/components/concepts/process-instance-creation.md#tags)).

<div className="list-tick">

- **Lightweight correlation and routing**: Provide quick, structured identifiers (for example, `reference:1234`, `priority:high`, `region:emea`) without exposing or parsing large variable payloads.
- **Job propagation**: Tags are copied to every job created for the instance (see [job workers](/components/concepts/job-workers.md#tags)), enabling fast worker-side branching, prioritization, or external lookups.
- **Export visibility**: Tags are included with exported process instance and job entities (analytics and data pipelines) beginning in 8.8.
- **Consistent filter semantics**: The process instance search filter (when using tags) requires an instance to contain **all** supplied tags (AND logic). Instances may contain additional tags. No partial or wildcard matching.
- **Immutable and bounded**: Up to 10 unique tags; each 1–100 characters; case-sensitive; regex `^[A-Za-z][A-Za-z0-9_\-:.]{0,99}$` (must start with a letter). Tags cannot be added, updated, or removed after creation.
- **API/SDK only in 8.8**: Tags do **not** yet appear in Operate, Optimize, or Tasklist UIs. See [Orchestration Cluster REST API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md).

</div>

> If you previously relied on large variable sets for lightweight correlation, adopting tags can simplify your flows.

## Identity, authentication, and authorization {#identity}

The Orchestration Cluster [Identity](/components/identity/identity-introduction.md) component UI handles authentication and authorization for the Orchestration Cluster components and its resources.

:::note
With this 8.8 change, the source of truth for Identity and Access Management for the Orchestration Cluster (including Zeebe, Operate, Tasklist, and its APIs) is now the Orchestration Cluster itself. This removes the reliance on the separate [Management Identity](/self-managed/components/management-identity/what-is-identity.md) (formerly "Identity") component.
:::

### Identity and Management Identity

In Camunda 8.8, Orchestration Cluster [Identity](/components/identity/identity-introduction.md) and [Management Identity](/self-managed/components/management-identity/what-is-identity.md) are two separate components used for Identity management, each with distinct areas of responsibility.

<table>
    <thead>
        <tr>
            <th width="50%">Identity</th>
            <th width="50%">Management Identity</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td width="50%">
                <p>Access and permission management for all Orchestration Cluster components: Zeebe, Operate, Tasklist, and the Orchestration Cluster REST and gRPC API.</p>
                <ul>
                    <li>
                        <p><strong>Unified access management:</strong> Authentication and authorizations are handled directly by the Orchestration Cluster across all components and APIs, eliminating any orchestration dependency on Management Identity.</p>
                    </li>
                    <li>
                        <p><strong>Authentication:</strong> Supports three authentication modes:</p>
                        <ul>
                             <li><p><strong>No Authentication:</strong> No authentication required for API access. Form-based authentication in the UI. Users and groups are managed in Identity.</p></li>
                            <li><p><strong>Basic Authentication:</strong> Basic authentication for API access. Form-based authentication in the UI. Users and groups are managed in Identity.</p></li>
                            <li><p><strong>OIDC:</strong> OpenID Connect with any compatible Identity Provider (for example, Keycloak, Microsoft EntraID, Okta).</p></li>
                        </ul>
                    </li>
                    <li>
                        <p><strong>Authorizations per resource:</strong> [Authorizations](/components/concepts/access-control/authorizations.md) provide fine-grained access control to Orchestration Cluster resources such as process instances, tasks, and decisions, applied consistently across components and APIs</p>
                    </li>
                    <li>
                        <p><strong>Decoupling from Keycloak:</strong> Keycloak is treated as a standard external Identity Provider integrated via OIDC, making it easier to use other providers without special integration.</p>
                    </li>
                    <li>
                        <p><strong>Tenant-Management:</strong> Tenants are directly managed within the Orchestration Cluster, allowing for Tenants per Cluster.</p>
                    </li>
                </ul>
            </td>
            <td width="50%">
                <p>Continues to manage access for platform components such as Web Modeler, Console, and Optimize.</p>
                <ul>
                    <li>
                        <p>Remains responsible for managing access to platform components such as Web Modeler, Console, and Optimize.</p>
                    </li>
                    <li>
                        <p><strong>Authentication:</strong> Supports two authentication modes:</p>
                        <ul>
                            <li><p><strong>Direct Keycloak integration:</strong> (default).</p></li>
                            <li><p><strong>OIDC:</strong> OpenID Connect with any compatible Identity Provider  (for example, Keycloak, Microsoft EntraID, Okta).</p></li>
                        </ul>
                    </li>
                    <li>
                        <p><strong>Tenant-Management:</strong> No longer manages Tenants for the Orchestration Cluster components. Tenants only apply to Optimize.</p>
                    </li>
                </ul>
            </td>
        </tr>
    </tbody>
</table>

### Who is affected by 8.8 Identity changes?

The 8.8 changes to Identity could affect different user roles in your Organization. For example:

| Role                 | Responsibilities                                                                                                                       |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| Administrators       | Understand the new Identity setup and migration steps from Camunda 8.7.                                                                |
| Developers           | Learn the new [authorization concepts](/components/concepts/access-control/authorizations.md) and required permissions for API access. |
| Information Security | Review and adapt to the new Identity architecture.                                                                                     |

### Benefits

Orchestration Cluster Identity provides several advantages:

<div className="list-tick">

- **Simplified identity management**: The split between Orchestration Cluster Identity and Management Identity provides a clearer separation of concerns, making it easier to manage access for Orchestration Cluster components versus Web Modeler and Console.
- **Unified access management**: All identity and authorization features for the Orchestration Cluster components are now contained within the Orchestration Cluster, eliminating any dependency on Management Identity when orchestrating processes.
- **Simplified deployment and improved availability**: Removing the dependency on Management Identity streamlines deployment and increases availability by reducing potential points of failure.
- **Consistent authorization model**: The new model offers a unified approach to managing permissions across all Orchestration Cluster resources.
- **Enhanced security**: Granular access controls improve the overall security posture for cluster resources.
- **Improved performance**: Authorization checks are handled internally, reducing latency and improving performance.
- **Flexible Identity Provider integration**: Keycloak is now treated as a standard OIDC provider, making it easier to integrate with other Identity Provider and increasing flexibility for users.

</div>

### Impact of Identity changes on your 8.7 deployment

The impact of these changes and what action you need to take depends on your deployment type. For example:

| Area                              | Impact                                                                                                                                                                                                             |
| :-------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Authorization                     | The new [authorization](/components/concepts/access-control/authorizations.md) model introduces fine-grained access control for Orchestration Cluster resources, replacing the previous model.                     |
| Roles, tenants, and mapping rules | Now managed within Orchestration Cluster Identity, replacing the previous Management Identity setup.                                                                                                               |
| User Task authorizations          | [User Task access restrictions](/components/tasklist/user-task-access-restrictions.md) only apply to the Tasklist v1 API. After switching to the v2 API with Tasklist, user task access restrictions do not apply. |

Each deployment type has a clear upgrade path and migration guidance to help administrators transition from Camunda 8.7 to Camunda 8.8.

### Camunda 8 SaaS

Resource authorizations, groups, and roles formerly managed via Console are replaced by authorizations, groups, and roles managed within the cluster-specific Identity.

- These are automatically migrated during the Camunda 8.8 upgrade to preserve your existing Access Management configuration at the time of the update.
- After upgrading a cluster to 8.8, changes to resource authorizations and roles made in Console no longer affect the 8.8 cluster.
- Users and clients are created and managed in Console, with their authorizations managed via the Orchestration Cluster.

The following table summarizes where Identity entities are managed in Camunda 8.8 SaaS:

| Entity type    | Managed via                    |
| :------------- | :----------------------------- |
| Users          | Console                        |
| Clients        | Console                        |
| Roles          | Orchestration Cluster Identity |
| Groups         | Orchestration Cluster Identity |
| Authorizations | Orchestration Cluster Identity |
| Tenants        | n/a (planned for future)       |
| Mapping rules  | n/a (managed by Camunda)       |

### Camunda 8 Self-Managed

After you deploy all Camunda 8 components in a Self-Managed environment, you will continue to use Management Identity for Web Modeler, Console, and Optimize, but use Orchestration Cluster Identity for Zeebe, Operate, Tasklist, and the Orchestration Cluster REST API.

- Roles and permissions for Orchestration Cluster components (previously managed in Management Identity), are now replaced by the new authorizations and roles defined within Orchestration Cluster Identity.

- The Identity Migration App that migrates these entities from Management Identity into Orchestration Cluster Identity must be run during your Camunda 8.7 to 8.8 upgrade. Instructions on enabling and configuring the Identity Migration App in the 8.7 to 8.8 migration guide are available for Helm and also docker-compose/bare Java deployments.

- Management Identity, Keycloak and Postgres are no longer needed for an Orchestration Cluster. They are only needed when using Web Modeler, Console or Optimize.
  - For the Orchestration Cluster, you can bring your own Identity Provider (for example, Keycloak, Microsoft EntraID, Okta) or use the built-in Basic Authentication method.

  - A special setup is no longer required for Keycloak as it is now integrated like any other Identity Provider via OpenID Connect (OIDC). Management Identity relies by default on Keycloak, but you can also configure it to use any OIDC-compatible Identity Provider.

The following table summarizes where Orchestration Cluster Identity entities are managed in Camunda 8.8 Self-Managed:

| Entity type    | Managed via                    |
| :------------- | :----------------------------- |
| Users          | Identity Provider              |
| Clients        | Identity Provider              |
| Roles          | Orchestration Cluster Identity |
| Groups         | Identity Provider              |
| Authorizations | Orchestration Cluster Identity |
| Tenants        | Orchestration Cluster Identity |
| Mapping Rules  | Orchestration Cluster Identity |

#### Camunda 8 Self-Managed - Basic Authentication

If you are using built-in user management (Basic Authentication), Tasklist and Operate specific built-in user management (using ES/OS as storage) is no longer supported.

- Administrators must migrate their users manually into the Orchestration Cluster.
- You must ensure that **usernames are identical**, otherwise users will not be able to see their assigned tasks.

In a Basic Authentication setup, the Orchestration Cluster provides full functionality:

| Entity type    | Managed via                                   |
| :------------- | :-------------------------------------------- |
| Users          | Orchestration Cluster Identity                |
| Clients        | n/a (not applicable for Basic Authentication) |
| Roles          | Orchestration Cluster Identity                |
| Groups         | Orchestration Cluster Identity                |
| Authorizations | Orchestration Cluster Identity                |
| Tenants        | Orchestration Cluster Identity                |
| Mapping Rules  | n/a (not applicable for Basic Authentication) |

## APIs & tools {#apis-and-tools}

Changes to [APIs & tools](/apis-tools/working-with-apis-tools.md) in 8.8 are summarized as follows:

| What's new/changed                                                                                                                   | Description                                                                                                                                                                                                                                                                                                 |
| :----------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Orchestration Cluster REST API](#orchestration-cluster)                                                                             | The unified Orchestration Cluster REST API replaces the deprecated V1 component APIs, providing a unified interface for managing and interacting with the Orchestration Cluster.                                                                                                                            |
| [Camunda Java Client](apis-tools/java-client/getting-started.md)                                                                     | The Camunda Java Client is now the official Java library for connecting to Camunda 8 clusters, automating processes, and implementing job workers. It is designed for Java developers who want to interact programmatically with Camunda 8 via REST or gRPC, and is the successor to the Zeebe Java client. |
| [Camunda Spring SDK](/apis-tools/spring-zeebe-sdk/getting-started.md)                                                                | The Camunda Spring Boot SDK replaces the Spring Zeebe SDK. The SDK relies on the Camunda Java client, designed to enhance the user experience and introduce new features while maintaining compatibility with existing codebases.                                                                           |
| [Camunda Process Test](/apis-tools/testing/getting-started.md)                                                                       | Camunda Process Test (CPT) is a Java library to test your BPMN processes and your process application. CPT is the successor of Zeebe Process Test. Our previous testing library is deprecated and will be removed with version 8.10.                                                                        |
| [Camunda user tasks](/apis-tools/migration-manuals/migrate-to-camunda-user-tasks.md)                                                 | Camunda user tasks replace the deprecated job-based user tasks in Camunda 8.8, providing a more robust and flexible way to handle user tasks within process models.                                                                                                                                         |
| [Tasklist GraphQL API](/reference/announcements-release-notes/880/880-announcements.md#deprecated-operate-and-tasklist-v1-rest-apis) | The previously deprecated Tasklist GraphQL API is removed in Camunda 8.8. This change is part of the broader architectural evolution towards the Orchestration Cluster REST API, which provides a more unified and consistent interface for managing tasks and workflows.                                   |
| [Zeebe gRPC API endpoints](/reference/announcements-release-notes/880/880-announcements.md#deprecated-zeebe-grpc-api-endpoints)      | With the 8.8 release, the gRPC API continues but is being disabled by default starting with 8.10.                                                                                                                                                                                                           |

:::info
To learn more about upgrading and migrating to 8.8, see the [API & tools upgrade guide](/apis-tools/migration-manuals/index.md).
:::

## Upgrade guides {#upgrade-guides}

Camunda 8.8 lays the foundation for future releases. Upgrading ensures compatibility and access to improved features.

The following guides provide detailed information on how you can upgrade to Camunda 8.8.

| Guide                                                                         | Description                                                                                                             | Who is this guide for?                                                                                                                                                             |
| :---------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Self-Managed upgrade guide](/self-managed/update/administrators/overview.md) | Evaluate your infrastructure, understand operational changes, and choose the best update strategy for your environment. | Operations and platform administrators of Self-Managed installations.                                                                                                              |
| [API and SDK upgrade guide](/apis-tools/migration-manuals/index.md)           | <p>Plan and execute an upgrade from Camunda 8.7 to 8.8, focusing on API and SDK transitions.</p>                        | <p><ul><li>Application developers maintaining Camunda-based solutions in Self-Managed Kubernetes or VM environments.</li><li>Developers using Camunda APIs and SDKs.</li></ul></p> |
