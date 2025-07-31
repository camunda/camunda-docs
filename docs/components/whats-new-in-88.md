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
    <td>Identity management is now split into two scopes: Orchestration Cluster Identity manages authentication and fine-grained authorizations for the Orchestration Cluster and its APIs, while Management Identity continues to control access for Web Modeler, Console and Optimize. This separation streamlines access management, improves performance, and enables flexible integration with any OIDC-compatible identity provider (IdP).</td>
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

## Identity, authentication, and authorization {#identity}

[Identity](../reference/glossary.md#identity) for the Orchestration Cluster is now responsible for all authentication and authorization tasks for cluster resources.

With this 8.8 change, the source of truth for Identity and Access Management (IAM) for the Orchestration cluster (including Zeebe, Operate, Tasklist, and its APIs) is now the Orchestration Cluster itself. This removes the reliance on the separate Management Identity (formerly "Identity") component.

In Camunda 8.8, Identity management is split into two well-defined scopes:

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
                <p>Access and permission management for runtime components such as Zeebe, Operate, Tasklist, and the Orchestration Cluster API.</p>
                <ul>
                    <li>
                        <p><strong>Unified access management:</strong> Authentication and authorizations are handled directly by the Orchestration Cluster across all components and APIs, eliminating any runtime dependency on Management Identity.</p>
                    </li>
                    <li>
                        <p><strong>Authentication:</strong> Supports two authentication modes:</p>
                        <ul>
                            <li><p><strong>Basic Authentication:</strong> Form-based authentication in the UI and basic authentication for API access. Users and groups are managed in Identity.</p></li>
                            <li><p><strong>OIDC:</strong> OpenID Connect with any compatible IdP (for example, Keycloak, EntraID, Okta).</p></li>
                        </ul>
                    </li>
                    <li>
                        <p><strong>Authorizations per resource:</strong> [Authorization](/components/concepts/access-control/authorizations.md) provides fine-grained access control to Orchestration Cluster resources such as process instances, tasks, and decisions, applied consistently across  components and APIs.</p>
                    </li>
                    <li>
                        <p><strong>Decoupling from Keycloak:</strong> Keycloak is treated as a standard external IdP integrated via OIDC, making it easier to use other providers without special integration.</p>
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
                            <li><p><strong>OIDC:</strong> OpenID Connect with any compatible IdP.</p></li>
                        </ul>
                    </li>
                </ul>
            </td>
        </tr>
    </tbody>
</table>

### Who is affected by 8.8 Identity changes?

- **Administrators:** Need to understand the new Identity setup and migration steps from Camunda 8.7.
- **Developers:** Should learn the new [authorization concepts](/components/concepts/access-control/authorizations.md) and required permissions for API access.
- **Information Security:** Must review and adapt to the new Identity architecture.

### Impact of Identity changes on your 8.7 deployment

The impact of these changes and what action you need to take depends on your deployment type.

- **Authorization**: The new [authorization](/components/concepts/access-control/authorizations.md) model introduces fine-grained access control for Orchestration Cluster resources, replacing the previous model.
- **Roles, tenants, and mapping rules**: Now managed within Orchestration Cluster Identity, replacing the previous Management Identity setup.
- **User Task authorizations**: User Task restrictions only apply to the Tasklist v1 API. After switching to the v2 API with Tasklist, user task restrictions do not apply.

Each deployment type has a clear upgrade path and migration guidance to help administrators transition from Camunda 8.7 to Camunda 8.8.

### Camunda 8 SaaS

Resource authorizations, groups, and roles formerly managed via Console are replaced by authorizations, groups, and roles managed within the cluster-specific Identity.

- These are automatically migrated during the Camunda 8.8 upgrade to preserve your existing Access Management configuration at the time of the update.
- After upgrading a cluster to 8.8, changes to resource authorizations and roles made in Console no longer affect the 8.8 cluster.
- Users and clients are created and managed in Console, with their authorizations managed via the Orchestration Cluster.

The following table summarizes where Identity entities are managed in Camunda 8.8 SaaS:

| Entity type    | Managed via              |
| :------------- | :----------------------- |
| Users          | Console                  |
| Clients        | Console                  |
| Roles          | Orchestration Cluster    |
| Groups         | Orchestration Cluster    |
| Authorizations | Orchestration Cluster    |
| Tenants        | n/a (planned for future) |
| Mapping rules  | n/a (managed by Camunda) |

### Camunda 8 Self-Managed

Roles and permissions previously managed in Management Identity are superseded by the new authorizations and roles within Orchestration Cluster Identity.

- The Identity Migration App that migrates these entities from Management Identity into Orchestration Cluster Identity must be run during your Camunda 8.7 to 8.8 upgrade. Instructions on enabling and configuring the Identity Migration App in the 8.7 to 8.8 migration guide are available for Helm and also docker-compose/bare Java deployments.

- Management Identity and Postgres are no longer needed for an Orchestration Cluster, only for an IdP and an OIDC-based setup, or even a setup without an IdP if using the native Basic Authentication method.

The following table summarizes where Identity entities are managed in Camunda 8.8 Self-Managed:

| Entity type    | Managed via           |
| :------------- | :-------------------- |
| Users          | IdP                   |
| Clients        | IdP                   |
| Roles          | Orchestration Cluster |
| Groups         | IdP                   |
| Authorizations | Orchestration Cluster |
| Tenants        | Orchestration Cluster |
| Mapping Rules  | Orchestration Cluster |

:::note
If you use the built-in user management instead of an external IdP, both users and groups can be managed directly within the Orchestration Cluster. However, this is not part of the default upgrade path.
:::

#### Camunda 8 Self-Managed - Keycloak

If you are using Keycloak, the following changes also apply:

| Entity/Feature       | Description                                                                                                                                                                       |
| :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Keycloak integration | A special setup is no longer required for Keycloak as it is now integrated like any other IdP.                                                                                    |
| Resources            | Management and storage of resource-based authorizations, tenants, and roles, as well as user/client assignment, moves from Management Identity to Orchestration Cluster Identity. |
| Groups               | Management of groups remains in Keycloak. The Orchestration Cluster picks up the groups via the bring your own group feature.                                                     |
| Permissions          | Application permissions granted to roles or applications previously managed in Management Identity are replaced by authorizations managed in the Orchestration Cluster.           |

#### Camunda 8 Self-Managed - OpenID Connect

If you are using an external Identity Provider (IdP) with OpenID Connect (OIDC), the following changes also apply:

| Entity/Feature                    | Description                                                                                                                                 |
| :-------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| Tenants, mapping rules, and roles | Management moves from Management Identity to Orchestration Cluster Identity.                                                                |
| Groups                            | Management remains within your IdP. The Orchestration Cluster picks up groups via the bring your own group feature or mapping rules.        |
| Permissions                       | Permissions granted to roles previously managed in Management Identity are replaced by authorizations managed in the Orchestration Cluster. |
| Resource-based authorizations     | Not supported in 8.7 by Management Identity but will be in 8.8. No migration is planned.                                                    |

#### Camunda 8 Self-Managed - Basic Authentication

If you are using built-in user management (Basic Authentication), Tasklist and Operate specific built-in user management (using ES/OS as storage) is no longer supported.

- Administrators must migrate their users manually into the Orchestration Cluster.
- You must ensure that **usernames are identical**, otherwise users will not be able to see their assigned tasks.

In a Basic Authentication setup, the Orchestration Cluster provides full functionality:

| Entity type    | Managed via                                   |
| :------------- | :-------------------------------------------- |
| Users          | Orchestration Cluster                         |
| Clients        | n/a (not applicable for Basic Authentication) |
| Roles          | Orchestration Cluster                         |
| Groups         | Orchestration Cluster                         |
| Authorizations | Orchestration Cluster                         |
| Tenants        | Orchestration Cluster                         |
| Mapping Rules  | n/a (not applicable for Basic Authentication) |

### Benefits

Orchestration Cluster Identity provides several advantages:

- **Simplified identity management:** The split between Orchestration Cluster Identity and Management Identity provides a clearer separation of concerns, making it easier to manage access for runtime versus platform components.
- **Unified access management:** All identity and authorization features for runtime components are now contained within the Orchestration Cluster, eliminating any runtime dependency on Management Identity.
- **Simplified deployment and improved availability:** Removing the dependency on Management Identity streamlines deployment and increases availability by reducing potential points of failure.
- **Consistent authorization model:** The new model offers a unified approach to managing permissions across all Orchestration Cluster resources.
- **Enhanced security:** Granular access controls improve the overall security posture for cluster resources.
- **Improved performance:** Authorization checks are handled internally, reducing latency and improving performance.
- **Flexible IdP integration:** Keycloak is now treated as a standard OIDC provider, making it easier to integrate with other IdP and increasing flexibility for users.

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
