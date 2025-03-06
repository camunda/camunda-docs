---
id: 880-announcements
title: "Announcements"
description: "Supported environment changes and breaking changes or deprecations for the Camunda 8.8 release."
toc_max_heading_level: 2
---

import DeployDiagramImg from '../../img/deploy-diagram-modal.png';

Supported environment changes and breaking changes or deprecations for the Camunda 8.8 release are summarized below.

| Scheduled release date | Scheduled end of maintenance | Release notes | Blog |
| :--------------------- | :--------------------------- | :------------ | :--- |
| 14 October 2025        | 13 April 2027                | -             | -    |

- [Supported environment changes](#supported-environment-changes)
  - [Zeebe, Operate, Tasklist, and Identity must run on exact same minor and patch levels](#zeebe-operate-tasklist-and-identity-must-run-on-exact-same-minor-and-patch-levels)
  - [Installation and deployment updates Self-Managed](#installation-and-deployment-updates-self-managed)
    - [Helm charts](#helm-charts)
- [Breaking changes](#breaking-changes)
  - [API updates SaaSSelf-Managed](#api-updates-saasself-managed)
    - [Deprecated: Operate and Tasklist v1 REST APIs](#deprecated-operate-and-tasklist-v1-rest-apis)
    - [Deprecated: Job-based user tasks querying](#deprecated-job-based-user-tasks-querying)
    - [Deprecated: Zeebe gRPC API endpoints](#deprecated-zeebe-grpc-api-endpoints)
    - [Removed: Tasklist GraphQL API](#removed-tasklist-graphql-api)
    - [Removed: Deprecated OpenAPI objects](#removed-deprecated-openapi-objects)
  - [Camunda Java client and Camunda Spring SDK](#camunda-java-client-and-camunda-spring-sdk)
    - [Key changes](#key-changes)

## Supported environment changes

### Zeebe, Operate, Tasklist, and Identity must run on exact same minor and patch levels

From version `8.8.0` forward, the following core [Orchestration cluster](/self-managed/reference-architecture/reference-architecture.md#orchestration-cluster) components must run on the exact same `minor`and `patch` level to ensure compatibility: Zeebe, Operate, Tasklist, and Identity. See the [component version matrix](/reference/supported-environments.md#component-version-matrix) or the [Self-Managed reference architecture](/self-managed/reference-architecture/reference-architecture.md#orchestration-cluster) for an overview of components.

### Installation and deployment updates <span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span>

Camunda 8.8 introduces a streamlined architecture, consolidating core components such as Zeebe, Operate, Tasklist, Optimize, and Connectors into a single deployable unit. Enhanced deployment options are also included, such as new Kubernetes Helm guides, [deployment reference architectures](/self-managed/reference-architecture/reference-architecture.md), and improved support for local development with [Camunda 8 Run](/self-managed/setup/deploy/local/c8run.md).

You can download the alpha release of the unified package from the Camunda GitHub repository, either as an executable Java application (Camunda Orchestration Core) or a Docker image.

#### Helm charts

If you are using the recommended Camunda 8 deployment option ([Helm charts](/self-managed/setup/install.md)), the upgrade path from version 8.7 to 8.8 will be straightforward by changing the values file to the new syntax.

New migration guides will also be provided to support you when migrating from a previous Camunda version.

:::caution
Additional upgrade considerations are necessary for deployments that use custom scripts, such as Docker containers, manual installations, or custom-developed Kubernetes deployments. For these deployments, customers can either continue to deploy with their original 8.7 topology and upgrade each component independently, or adopt our Helm chart approach for the upgrade, which allows for unifying the deployment into a single JAR or container executable.
:::

## Breaking changes

### API updates <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span>

The 8.8 release includes API updates to support the move to a [Camunda 8 REST API](/apis-tools/camunda-api-rest/camunda-api-rest-overview.md) unified experience. See more details in the [release notes](/reference/announcements-release-notes/880/880-release-notes.md#api-updates).

#### Deprecated: Operate and Tasklist v1 REST APIs

The deprecation process for the [Operate](/apis-tools/operate-api/overview.md) and [Tasklist](/apis-tools/tasklist-api-rest/tasklist-api-rest-overview.md) REST APIs starts with the 8.8 release. You can begin migrating to the [Camunda 8 REST API](/apis-tools/camunda-api-rest/camunda-api-rest-overview.md) for querying to prepare for this change.

- Version 8.9: These APIs are still available but deprecated, and so not recommended for new implementations.
- Version 8.10: These APIs will be removed.

#### Deprecated: Job-based user tasks querying

With the 8.8 release, the deprecation process for **job-based** user tasks starts. As job-based user tasks will not be supported for querying and task management with Camunda 8.10, Camunda recommends using **Camunda user task** type (formerly known as **Zeebe user task**) in your process definitions. Note that you may still see references to **Zeebe user task** in your XML, but this is the same thing as Camunda user task.

- Version 8.9: **Job-based** user tasks are available for querying, but Camunda Modeler automatically applies the **Camunda user task** and shows a warning message for each job-based user task.
- Version 8.10: With the removal of the Tasklist REST API, **job-based** user tasks will no longer be supported for querying and task management. With Camunda 8.9+, customers can still use the **job-based** user tasks as standard jobs with headers to enable open architecture and composable solutions. For customers who require task lifecycle support and task querying, we recommend using the Camunda User Task type.

#### Deprecated: Zeebe gRPC API endpoints

With the 8.8 release, Camunda announces the deprecation of several [Zeebe gRPC](/apis-tools/zeebe-api/grpc.md) endpoints for removal in 8.9.

- Key gRPC endpoints necessary for high-throughput and low-latency applications will remain available in the product to ensure peak performance for specific use cases
- The final list of retained gRPC endpoints will be confirmed with the 8.8 release.
- Selected endpoints will remain active, with others scheduled for removal in the 8.10 release.

#### Removed: Tasklist GraphQL API

With the 8.8 release, the deprecated Tasklist GraphQL API will be removed from the product.

<!-- :::info
Learn more about these updates in Upcoming API Changes in Camunda 8.
::: -->

#### Removed: Deprecated OpenAPI objects

:::warning
With the Camunda 8.8 release, deprecated API objects containing number keys have been removed, including the
corresponding `application/vnd.camunda.api.keys.number+json` content type header.
:::

In previous releases, entity keys were transitioned from `integer (int64)` to `string` types, and deprecated
`integer (int64)` keys were still supported. As of the 8.8 release, support for `integer (int64)` keys has been removed.

To update to Camunda 8.8, API objects using `integer (int64)` keys must be updated to use `string` keys and the
`application/json` header.

For more information about the key attribute type change, see
the [8.7 API key attributes overview][camunda8-api-overview].

[camunda8-api-overview]: /versioned_docs/version-8.7/apis-tools/camunda-api-rest/camunda-api-rest-overview.md#api-key-attributes

### Camunda Java client and Camunda Spring SDK

With the Camunda 8.8 release, Camunda Java Client and Camunda Spring SDK replace the Zeebe Java client and Spring Zeebe SDK. This allows you to use a single consolidated client to interact with Camunda orchestration clusters.

The `CamundaClient` replaces the `ZeebeClient`, offering the same functionality and adding new capabilities.

:::note

- If you need to continue using the old `ZeebeClient`, you can use the version 8.6 artifact without any issues with newer cluster versions as the client is forward-compatible.
- The Zeebe Java client will not be developed further and only receives bug fixes while version 8.7 is officially supported.

:::

#### Key changes

| Change                                          | Description                                                                                                                                                                                                                                                                                                        |
| :---------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| New package structure                           | Package `io.camunda.client`: Contains the new `CamundaClient` and all 8.7 features.                                                                                                                                                                                                                                |
| Refactored properties and environment variables | <p><ul><li><p>All old Java client property names are refactored to more general ones. For example, `zeebe.client.tenantId` to `camunda.client.tenantId`.</p></li><li><p>Similarly, environment variables are renamed following the same concept: `ZEEBE_REST_ADDRESS` to `CAMUNDA_REST_ADDRESS`.</p></li></ul></p> |
| Artifact ID change                              | The `artifactId` changes from `zeebe-client-java` to `camunda-client-java`.                                                                                                                                                                                                                                        |
