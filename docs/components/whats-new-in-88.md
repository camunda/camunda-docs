---
id: whats-new-in-88
title: What's new in Camunda 8.8
sidebar_label: What's new in Camunda 8.8
description: "Learn more about what's new and changed in Camunda 8.8."
keywords: ["what's changed", "what's new"]
---

import OrchestrationClusterImg from './assets/orchestration-cluster.png';
import PersonaBadge from './react-components/\_persona-badge';

Learn about important changes in Camunda 8.8 to consider when planning your upgrade from Camunda 8.7.

:::warning
This documentation is a work in progress and may contain incomplete, placeholder, or evolving content. While the core concepts introduced in Camunda 8.8 are stable, specific details are actively being refined.
:::

## Introducing Camunda 8.8

Camunda 8.8 introduces important architectural changes and enhancements to simplify deployment, improve maintainability, and empower both operations teams and developers.

The simplest Self-Managed deployment now involves running a single Java application or docker container of the Orchestration Cluster Application.

<table className="table-callout">
<tr>
    <td width="30%">**What's new/changed**</td>
    <td>**Summary**</td>
</tr>
<tr>
    <td>[Orchestration Cluster](#orchestration-cluster)</td>
    <td>The Orchestration cluster (previously automation cluster) is now the core Camunda 8 component.</td>
</tr>
<tr>
    <td>[Identity, authentication, and authorization](#identity-authentication-and-authorization)</td>
    <td>Identity management is now split into two scopes: Orchestration Cluster Identity manages authentication and fine-grained authorizations for the Orchestration Cluster and its APIs, while Management Identity continues to control access for Web Modeler, Console and Optimize. This separation streamlines access management, improves performance, and enables flexible integration with any OIDC-compatible identity provider.</td>
</tr>
<tr>
    <td>[APIs and tools](#apis-and-tools)</td>
    <td>New and changed APIs and tools are introduced in Camunda 8.8.</td>
</tr>
</table>

:::info

- See [release announcements](/reference/announcements-release-notes/880/880-announcements.md), [release notes](/reference/announcements-release-notes/880/880-release-notes.md), and the [quality board](https://github.com/orgs/camunda/projects/187/views/15) for more detail on what's included in Camunda 8.8.
- Ready to upgrade? See our [upgrade guides](#upgrade-guides) to learn more about upgrading from Camunda 8.7 to 8.8.

:::

## Orchestration Cluster {#orchestration-cluster}

The primary architectural change is the consolidation of the core Zeebe, Operate, Tasklist, and Identity components into the Orchestration Cluster (a single unified deployable package). This impacts how Camunda 8 is deployed, managed, and scaled.

The Orchestration cluster (previously automation cluster) is now the core component of Camunda 8.

<img src={OrchestrationClusterImg} alt="Diagram showing the orchestration cluster" class="img-noborder" style={{marginBottom: '0'}}/>

### Zeebe, Operate, Tasklist, and Identity

In Camunda 8.8, Zeebe, Operate, Tasklist, and Identity are consolidated into the Orchestration Cluster application as a single deployable artifact, distributed as a JAR file or Docker container.

- [Zeebe](../reference/glossary.md#zeebe) is the [workflow engine](../reference/glossary.md#workflow-engine).
- Operate is used for monitoring and troubleshooting [process instances](../reference/glossary.md#process-instance) running in Zeebe.
- Tasklist is used for interacting with [user tasks](../reference/glossary.md#user-task) (assigning, completing, and so on).
- [Identity](../reference/glossary.md#identity) is used for managing the integrated Orchestration Cluster authentication and authorization.

In Camunda 8.7 and earlier, each component (Zeebe, Operate, Tasklist, and Identity) was deployed independently.

Camunda 8.8 introduces a new built-in component within the Orchestration Cluster called **Orchestration Cluster Identity**. This component is responsible for handling all authentication and authorization tasks for cluster resources. With this change, the source of truth for Identity and Access Management for the Orchestration cluster (including Zeebe, Operate, Tasklist and its APIs) is now the Orchestration Cluster itself, replacing the previous reliance on the separate Management Identity component.

#### What’s new?

With Camunda 8.8, Identity management is intentionally split into two well-defined scopes, each optimized for its domain:

- **Orchestration Cluster Identity:** Handles access and permission management for runtime components like Zeebe, Operate, Tasklist, and the Orchestration Cluster API
- **Management Identity** (formerly "Identity"): Continues to manage access for platform components such as Web Modeler, Console, and Optimize

###### Orchestration Cluster Identity

- **Unified Access Management:** Authentication and Authorizations are directly handled via the Orchestration Cluster consistently across all components and APIs. There is no runtime dependency on Management Identity.
- **Authentication Modes:** The Orchestration Cluster supports two authentication setups:
  - **Basic Authentication:** Form-based authentication in the UI and basic authentication for API access. Users and Groups are managed within the Orchestration Cluster Identity.
  - **OIDC:** OpenID Connect with any compatible identity provider of your choice (e.g., Keycloak, EntraID, Okta, etc.)
- **Authorizations per Resource:** A new [authorization concept](/components/concepts/access-control/authorizations.md) allows fine-grained access control to Orchestration Cluster resources, such as process instances, tasks, and decisions. It is consistently applied across all components and APIs.
- **Decoupling from Keycloak:** Keycloak is now treated as a standard, external Identity Provider that can be integrated via OIDC. There is no special integration — making it easier to use other providers.

###### Management Identity

- Stays responsible for managing access to platform components like Web Modeler, Console, and Optimize.
- **Authentication Modes:** The Management Identity supports two authentication setups:
  - **Direct Keycloak integration:** (default)
  - **OIDC:** (OpenID Connect with any compatible identity provider)

#### Who is affected?

- **Administrators:** Need to understand the new Identity setup and migration steps from Camunda 8.7.
- **Developers:** Should learn the new [authorization concept](/components/concepts/access-control/authorizations.md) and required permissions for API access.
- **Information Security:** Must review and adapt to the new Identity architecture.

#### Benefits

The introduction of Orchestration Cluster Identity comes with several advantages:

- **Simplified Identity Management:** The split between Orchestration Cluster Identity and Management Identity provides a clearer separation of concerns, making it easier to manage access for runtime versus platform components.
- **Unified Access Management:** All identity and authorization features for runtime components are now contained within the Orchestration Cluster, eliminating any runtime dependency on Management Identity.
- **Simplified Deployment and Improved Availability:** Removing the dependency on Management Identity streamlines deployment and increases availability by reducing potential points of failure.
- **Consistent Authorization Model:** The new model offers a unified approach to managing permissions across all Orchestration Cluster resources.
- **Enhanced Security:** Granular access controls improve the overall security posture for cluster resources.
- **Improved Performance:** Authorization checks are handled internally, reducing latency and improving performance.
- **Flexible Identity Provider Integration:** Keycloak is now treated as a standard OIDC provider, making it easier to integrate with other identity providers and increasing flexibility for users.

#### Impact by former 8.7 Deployment

- Authorization Concepts: The new authorization model introduces fine-grained access control for Orchestration Cluster resources, replacing the previous model.
- Roles, Tenants, and Mapping Rules: These are now managed within the Orchestration Cluster Identity, replacing the previous Management Identity setup.
- User Tasks Authorizations: User Task Restrictions only apply to Tasklist v1 API. When switching to v2 API with Tasklist, the user task restrictions will not apply.

For each deployment option, there is a clear update path and migration guidance to help administrators transition from Camunda 8.7 to 8.8.

##### Camunda 8 SaaS

Resource Authorizations, Groups and Roles formerly managed via Console, are replaced by Authorizations, Groups and Roles managed within the cluster specific Orchestration Identity. These are automatically migrated when updating to 8.8 to ensure the status quo state of Access Management at the point in time of the Update is kept. After updating a cluster to 8.8, changes to Resource Authorizations and Roles made in Console no longer affect 8.8 clusters.

While Users and Clients are created and managed in the Console, their authorizations are managed via the Orchestration Cluster.

The following table summarizes where identity entities are managed in Camunda 8 SaaS:

| Entity Type    | Managed via              |
| -------------- | ------------------------ |
| Users          | Console                  |
| Clients        | Console                  |
| Roles          | Orchestration Cluster    |
| Groups         | Orchestration Cluster    |
| Authorizations | Orchestration Cluster    |
| Tenants        | n/a (planned for future) |
| Mapping Rules  | n/a (managed by Camunda) |

##### Camunda 8 Self-Managed

The former Roles and Permissions managed in Management Identity are superseded by the new Authorizations & Roles within the Orchestration Cluster Identity.

An Identity Migration App that migrates these entities from the Management Identity into the Orchestration Cluster Identity is to be run during the update from Camunda 8.7 to 8.8. Instructions on enabling and configuring the Identity Migration App in the migration guide from 8.7 to 8.8 are available for Helm but also docker-compose/bare Java deployments.

Management Identity and Postgres are not needed for an Orchestration Cluster anymore but only an Identity Provider for an OIDC-based setup, or even no IdP if using the native Basic Authentication method.

The following table summarizes where identity entities are managed in Camunda 8 Self-Managed:

| Entity Type    | Managed via           |
| -------------- | --------------------- |
| Users          | Identity Provider     |
| Clients        | Identity Provider     |
| Roles          | Orchestration Cluster |
| Groups         | Identity Provider     |
| Authorizations | Orchestration Cluster |
| Tenants        | Orchestration Cluster |
| Mapping Rules  | Orchestration Cluster |

**Note:** If you use the built-in user management instead of an external Identity Provider, both Users and Groups can be managed directly within the Orchestration Cluster. However, this is not part of the default update path.

###### Camunda 8 Self-Managed - Keycloak

When using Keycloak, the following changes apply:

- No special setup is required for Keycloak anymore; instead, Keycloak is integrated like any other identity provider.
- the management and storage of Resource-based Authorizations, Tenants, Roles as well as assignments of users/clients move from Management Identity to the Orchestration Cluster Identity.
- the management of groups stays within Keycloak and the Orchestration Cluster will pick up the groups via the bring your own group feature.
- application Permissions granted to Roles or Applications previously managed in Management identity are replaced by Authorizations managed in the Orchestration Cluster.

###### Camunda 8 Self-Managed - OpenID Connect

When using an external Identity Provider (IdP) with OpenID Connect (OIDC), the following changes apply:

- the management of Tenants, Mapping Rules, and Roles moves from Management Identity to the Orchestration Cluster Identity.
- the management of Groups stays within your Identity Provider and the Orchestration Cluster will pick up the Groups via the bring your own Group feature or Mapping Rules.
- Permissions granted to Roles previously managed in Management identity are replaced by Authorizations managed in the Orchestration Cluster.
- Resource-based Authorizations were not supported in this setup in 8.7 by Management Identity but will be in 8.8, no migration is due though.

###### Camunda 8 Self-Managed - Basic Authentication

When using the built-in user management (Basic Authentication), the following changes apply:

- The Tasklist and Operate specific built-in user management (using ES/OS as storage) is not supported anymore. Administrators need to migrate their users manually into the Orchestration Cluster. They need to ensure the usernames are identical, as otherwise the users would not be able to see their assigned tasks.

In case of making use of the Basic auth setup, the Orchestration clusters provides full functionality:

| Entity Type    | Managed via                                   |
| -------------- | --------------------------------------------- |
| Users          | Orchestration Cluster                         |
| Clients        | n/a (not applicable for Basic Authentication) |
| Roles          | Orchestration Cluster                         |
| Groups         | Orchestration Cluster                         |
| Authorizations | Orchestration Cluster                         |
| Tenants        | Orchestration Cluster                         |
| Mapping Rules  | n/a (not applicable for Basic Authentication) |

### Unified Orchestration Cluster REST API {#orchestration-cluster-api}

Camunda 8.8 introduces a single unified [Orchestration Cluster REST API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md) you can use to interact programmatically with the Orchestration Cluster.

- This replaces component APIs (Operate API, Tasklist API, Zeebe API, and much of Identity API) with a single set of endpoints.
- This unified API supports both organizational (SaaS) and Self-Managed deployments.
- This is now the default and recommended integration point for developers, operators, and automation solutions.

<!-- Introduce it but [link to content](#orchestration-cluster-api). -->

<!-- ## Identity, authentication, and authorization

## APIs and SDKs

### Unified Orchestration Cluster API {#orchestration-cluster-api}

Content is here

### Deprecated Operate, Tasklist, and Zeebe gRPC API endpoints

### New Java/Spring SDK, Node.js -->

### Unified Exporter

Camunda 8.8 introduces a new unified exporter architecture to improve cluster management and data migration. The new exporter architecture provides two dedicated Helm jobs for Identity migration and process application migration.

In Camunda 8.7 and earlier, dedicated importers/exporters were used for data flows between components (such as Elasticsearch import/export).

### Unified component configuration

Camunda 8.8 introduces a unified configuration for Orchestration Cluster components where you can define all essential cluster and component behavior through a single, centralized configuration system.

In Camunda 8.7 and earlier, managing and configuring core components (Zeebe, Operate, Tasklist, Identity) was done separately.

## Identity, authentication, and authorization {#identity}

## APIs and tools {#apis-and-tools}

The following table provides a summary of the main 8.8 API and tools changes.

| What's new/changed                                                                                                              | Description                                                                                                                                                                                                                                                                                                 |
| :------------------------------------------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Camunda Java Client](apis-tools/java-client/index.md)                                                                          | The Camunda Java Client is now the official Java library for connecting to Camunda 8 clusters, automating processes, and implementing job workers. It is designed for Java developers who want to interact programmatically with Camunda 8 via REST or gRPC, and is the successor to the Zeebe Java client. |
| [Camunda Spring SDK](/apis-tools/spring-zeebe-sdk/getting-started.md)                                                           | The Camunda Spring Boot SDK replaces the Spring Zeebe SDK. The SDK relies on the Camunda Java client, designed to enhance the user experience and introduce new features while maintaining compatibility with existing codebases.                                                                           |
| [Camunda Process Test](/apis-tools/testing/getting-started.md)                                                                  | Camunda Process Test (CPT) is a Java library to test your BPMN processes and your process application. CPT is the successor of Zeebe Process Test. Our previous testing library is deprecated and will be removed with version 8.10.                                                                        |
| [Zeebe gRPC API endpoints](/reference/announcements-release-notes/880/880-announcements.md#deprecated-zeebe-grpc-api-endpoints) | With the 8.8 release, the gRPC API continues but is being disabled by default starting with 8.10.                                                                                                                                                                                                           |

## Summary of changes

The following table provides a summary of the main 8.8 architectural changes.

| Feature/area            | Camunda 8.7 and earlier                | Camunda 8.8                                     |
| :---------------------- | :------------------------------------- | :---------------------------------------------- |
| Core components         | Separate deployments (per component)   | Unified Orchestration Cluster                   |
| Identity                | Separate, uses Keycloak and PostgreSQL | Integrated, uses Zeebe storage, OIDC compatible |
| Optimize                | Separate component                     | Remains separate (as before)                    |
| Exporter/Importer       | Separate Importers/Exporters           | Unified Exporter                                |
| Helm Chart Deployment   | Multiple StatefulSets                  | Single StatefulSet                              |
| Groups/Roles Management | Managed in Console                     | Managed in Identity                             |

## Upgrade guides {#upgrade-guides}

Camunda 8.8 lays the foundation for future releases. Upgrading ensures compatibility and access to improved features.

The following guides provide detailed information on how you can upgrade to Camunda 8.8.

| Guide                                                                                   | Description                                                                                                             | Who is this guide for?                                                                                                                                                             |
| :-------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Self-Managed upgrade guide](/self-managed/update/administrators/prepare-for-update.md) | Evaluate your infrastructure, understand operational changes, and choose the best update strategy for your environment. | Operations and platform administrators of Self-Managed installations.                                                                                                              |
| [API and SDK upgrade guide](../apis-tools/migration-manuals/index.md)                   | <p>Plan and execute an upgrade from Camunda 8.7 to 8.8, focusing on API and SDK transitions.</p>                        | <p><ul><li>Application developers maintaining Camunda-based solutions in Self-Managed Kubernetes or VM environments.</li><li>Developers using Camunda APIs and SDKs.</li></ul></p> |
