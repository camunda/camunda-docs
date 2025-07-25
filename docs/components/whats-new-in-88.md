---
id: whats-new-in-88
title: What's new in Camunda 8.8
sidebar_label: What's new in Camunda 8.8
description: "Learn more about what's new and changed in Camunda 8.8."
keywords: ["what's changed", "what's new"]
---

import OrchestrationClusterImg from './assets/orchestration-cluster.png';
import PersonaBadge from './react-components/\_persona-badge';

Learn more about important changes in Camunda 8.8 when migrating from Camunda 8.7.

:::warning
This documentation page is a work in progress and may contain incomplete, placeholder, or evolving content. While the core concepts introduced in Camunda 8.8 are stable, details and sections here are actively being refined.

See [release announcements](/reference/announcements-release-notes/880/880-announcements.md), [release notes](/reference/announcements-release-notes/880/880-release-notes.md), and the [quality board](https://github.com/orgs/camunda/projects/187/views/15) for more detail on what's included in Camunda 8.8.
:::

## Introducing Camunda 8.8

Camunda 8.8 introduces fundamental changes and enhancements as part of our architecture streamlining initiative, unifying former isolated components such as Operate, Tasklist and identity management into one Orchestration Cluster component that serves a unified Orchestration Cluster API.

The simplest possible deployment now becomes running a single Java application or docker container of the Orchestration Cluster Application.

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
    <td>[APIs and SDKs](#apis-and-sdks)</td>
    <td>New and changed APIs and SDKs for interacting programmatically with the Orchestration cluster.</td>
</tr>
<tr>
    <td>[Camunda User Tasks](#camunda-user-tasks)</td>
    <td>Deprecation of job-based user tasks, replaced by Camunda user tasks.</td>
</tr>
<tr>
    <td>[Camunda Process Test](#camunda-process-test)</td>
    <td>Deprecation of Zeebe Process Test, replaced by Camunda Process Test.</td>
</tr>
<tr>
    <td>[Data and storage](#data)</td>
    <td>Exporters, etc.</td>
</tr>
<tr>
    <td>[Deployment and configuration](#deployment)</td>
    <td>Unified components, etc.</td>
</tr>
</table>

## Orchestration Cluster {#orchestration-cluster}

<div><PersonaBadge persona="Administrator (DevOps)" /><PersonaBadge persona="Developer" /></div>

The Orchestration cluster (previously automation cluster) is now the core component of [Camunda 8](../reference/glossary.md#camunda-8), powering the automation and orchestration of [processes](../reference/glossary.md#process).

<img src={OrchestrationClusterImg} alt="Diagram showing the orchestration cluster" class="img-noborder img-700" style={{marginBottom: '0'}}/>

### Zeebe, Operate, and Tasklist

Zeebe, Operate, and Tasklist are consolidated into the Orchestration Cluster application.

- [Zeebe](../reference/glossary.md#zeebe) as the [workflow engine](../reference/glossary.md#workflow-engine).
- Operate for monitoring and troubleshooting [process instances](../reference/glossary.md#process-instance) running in [Zeebe](../reference/glossary.md#zeebe).
- Tasklist for interacting with [user tasks](../reference/glossary.md#user-task) (assigning, completing, etc.)

### Orchestration Cluster Identity

Camunda 8.8 introduces a new built-in component within the Orchestration Cluster called **Orchestration Cluster Identity**. This component is responsible for handling all authentication and authorization tasks for cluster resources. With this change, the source of truth for Identity and Access Management for the Orchestration cluster (including Zeebe, Operate, Tasklist and its APIs) is now the Orchestration Cluster itself, replacing the previous reliance on the separate Management Identity component.

#### What’s new?

With Camunda 8.8, Identity management is intentionally split into two well-defined scopes, each optimized for its domain:

- **Orchestration Cluster Identity:** Handles access and permission management for runtime components like Zeebe, Operate, Tasklist, and the Orchestration Cluster API
- **Management Identity** (formerly "Identity"): Continues to manage access for platform components such as Web Modeler, Console, and Optimize

###### Orchestration Cluster Identity

- **Unified Access Management:** Authentication and Authorizations are directly handled via the Orchestration Cluster consistently across all components and APIs. There is no runtime dependency on Management Identity.
- **Authentication Modes:** The Orchestration Cluster supports two authentication setups:
  - **Basic Authentication** Authenticate in UI form-based and via API by providing basic authentication. Users and Groups are managed in the Orchestration Cluster Identity.
  - **OIDC** OpenID Connect with any compatible identity provider of your choice (e.g., Keycloak, EntraID, Okta, etc.)
- **Authorizations per Resource:** A new [authorization concept](/components/concepts/access-control/authorizations.md) allows fine-grained access control to Orchestration Cluster resources, such as process instances, tasks, and decisions. It is consistently applied across all components and APIs.
- **Decoupling from Keycloak:** Keycloak is now treated as a standard, external Identity Provider that can be integrated via OIDC. There is no special integration — making it easier to use other providers.

###### Management Identity

- Stays responsible for managing access to platform components like Web Modeler, Console, and Optimize.
- **Authentication Modes:** The Management Identity supports two authentication setups:
  - **Direct Keycloak integration** (default)
  - **OIDC** (OpenID Connect with any compatible identity provider)

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

An Identity Migration App that migrates these entities from the Management Identity into the Orchestration Cluster Identity is to be run during the update from Camunda 8.7 to 8.8. Instructions on enabling and configuring the Identity Migration App in migration guide from 8.7 to 8.8 are available for Helm but also docker-compose/bare Java deployments.

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

- no special setup for Keycloak anymore, instead Keycloak is integrated such as any other IdP.
- the management and storage of Resource based Authorizations, Tenants, Roles as well as assignments of users/clients move from Management Identity to the Orchestration Cluster Identity.
- the management of Groups stays within Keycloak and the Orchestration Cluster will pick up the groups via the bring your own group feature.
- application Permissions granted to Roles or Applications previously managed in Management identity are replaced by Authorizations managed in the Orchestration Cluster.

###### Camunda 8 Self-Managed - OpenID Connect

When using an external Identity Provider (IdP) with OpenID Connect (OIDC), the following changes apply:

- the management of Tenants, Mapping Rules, and Roles moves from Management Identity to the Orchestration Cluster Identity.
- the management of Groups stays within your Identity Provider and the Orchestration Cluster will pick up the groups via the bring your own group feature or Mapping Rules.
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

### Orchestration Cluster API

APIs for interacting with the Orchestration cluster programmatically.

<!-- Introduce it but [link to content](#orchestration-cluster-api). -->

<!-- ## Identity, authentication, and authorization

## APIs and SDKs

### Unified Orchestration Cluster API {#orchestration-cluster-api}

Content is here

### Deprecated Operate, Tasklist, and Zeebe gRPC API endpoints

### New Java/Spring SDK, Node.js -->

## Camunda user tasks

<div><PersonaBadge persona="Administrator (DevOps)" /><PersonaBadge persona="Developer" /></div>

The Orchestration cluster (previously automation cluster) is now the core component of [Camunda 8](../reference/glossary.md#camunda-8), powering the automation and orchestration of [processes](../reference/glossary.md#process).

<!-- ## Camunda Process Test

<div><PersonaBadge persona="Developer" /></div> -->

## Data and storage {#data}

### Exporters

A new Camunda Exporter is introduced, bringing the importing and archiving logic of web components (Tasklist and Operate) closer to the distributed platform (Zeebe). This simplifies installation, enables scalability for the web applications, reduces latency when showing runtime and historical data, and reduces data duplication (resource consumption).

## Update guides

We have two specific update guides in place written for operators of [Self-Managed installations](../self-managed/update/index.md) and developers using [APIs and our SDKs](../apis-tools/migration-manuals/index.md).
