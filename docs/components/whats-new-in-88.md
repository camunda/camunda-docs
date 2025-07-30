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
    <td>The Orchestration Cluster is now the core Camunda 8 component.</td>
</tr>
<tr>
    <td>[Identity, authentication, and authorization](#identity)</td>
    <td>Changes are made to Identity and how you manage authentication and authorization.</td>
</tr>
<tr>
    <td>[APIs and SDKs](#apis-and-sdks)</td>
    <td>New and changed APIs and SDKs are introduced in Camunda 8.8.</td>
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

Camunda 8.8 includes changes to how you manage authentication and authorization with Identity.

### Identity

The Identity service is now fully integrated into the Orchestration Cluster.

- Instead of relying on a separate PostgreSQL database, Identity now uses Zeebe’s persistence storage. This reinforces consistency and reduces the need to manage additional databases.
- Identity is decoupled from Keycloak. While Keycloak remains supported, Camunda 8.8 now allows direct integration of any OpenID Connect (OIDC) compatible identity provider, increasing flexibility for authentication.

### Access control and authorization management

Groups and roles that were previously managed via the Console are now maintained directly within Orchestration Cluster Identity.
Console-based changes to groups/roles are no longer effective for 8.8 clusters after upgrade.

### Summary of Identity changes

The following table provides a summary of the main Identity changes.

| Feature/area               | Camunda 8.7 and earlier                | Camunda 8.8                 |
| :------------------------- | :------------------------------------- | :-------------------------- |
| Identity storage           | Separate PostgreSQL database           | Zeebe internal storage      |
| Administration location    | Console/Keycloak/external              | Identity (internal)         |
| Supported Providers        | Primarily Keycloak (OIDC support)      | Any OIDC-compliant provider |
| Groups/roles configuration | Managed in Console, sometimes external | Managed in Identity         |

## APIs and SDKs {#apis-and-sdks}

The following table provides a summary of the main 8.8 API and SDK changes.

| What's new/changed                                                                                                              | Description                                                                                                                                                                                                                                                                                                 |
| :------------------------------------------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Camunda Java Client](apis-tools/java-client/index.md)                                                                          | The Camunda Java Client is now the official Java library for connecting to Camunda 8 clusters, automating processes, and implementing job workers. It is designed for Java developers who want to interact programmatically with Camunda 8 via REST or gRPC, and is the successor to the Zeebe Java client. |
| [Camunda Spring SDK](/apis-tools/spring-zeebe-sdk/getting-started/)                                                             | The Camunda Spring Boot SDK replaces the Spring Zeebe SDK. The SDK relies on the Camunda Java client, designed to enhance the user experience and introduce new features while maintaining compatibility with existing codebases.                                                                           |
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

The following guides provide detailed information on how to upgrade to Camunda 8.8.

| Guide                                                                                   | Description                                                                                                             | Who is this guide for?                                                                                                                                                             |
| :-------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Self-Managed upgrade guide](/self-managed/update/administrators/prepare-for-update.md) | Evaluate your infrastructure, understand operational changes, and choose the best update strategy for your environment. | Operations and platform administrators of Self-Managed installations.                                                                                                              |
| [API and SDK upgrade guide](../apis-tools/migration-manuals/index.md)                   | <p>Plan and execute an upgrade from Camunda 8.7 to 8.8, focusing on API and SDK transitions.</p>                        | <p><ul><li>Application developers maintaining Camunda-based solutions in Self-Managed Kubernetes or VM environments.</li><li>Developers using Camunda APIs and SDKs.</li></ul></p> |
