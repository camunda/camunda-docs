---
id: 880-announcements
title: "Release announcements"
description: "Supported environment changes and breaking changes or deprecations for the Camunda 8.8 release."
toc_max_heading_level: 3
---

import DeployDiagramImg from '../../img/deploy-diagram-modal.png';

Supported environment changes and breaking changes or deprecations for the Camunda 8.8 release are summarized below.

| Scheduled release date | Scheduled end of maintenance | Release notes | Blog |
| :--------------------- | :--------------------------- | :------------ | :--- |
| 14 October 2025        | 13 April 2027                | -             | -    |

:::tip Release notes and quality board

- See [release notes](/reference/announcements-release-notes/880/880-release-notes.md) to learn more about new features and enhancements.
- Refer to the [quality board](https://github.com/orgs/camunda/projects/187/views/15) for an overview of known bugs by component and severity.

:::

## Changes in supported environments

### Zeebe, Operate, Tasklist, and Identity must run on exact same minor and patch levels

From version `8.8.0` forward, the following core [Orchestration cluster](/self-managed/reference-architecture/reference-architecture.md#orchestration-cluster) components must run on the exact same `minor`and `patch` level to ensure compatibility: Zeebe, Operate, Tasklist, and Identity. See the [component version matrix](/reference/supported-environments.md#component-version-matrix) or the [Self-Managed reference architecture](/self-managed/reference-architecture/reference-architecture.md#orchestration-cluster) for an overview of components.

### Installation and deployment updates <span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span>

Camunda 8.8 introduces a streamlined architecture, consolidating core components such as Zeebe, Operate, Tasklist, Optimize, and connectors into a single deployable unit. Enhanced deployment options are also included, such as new Kubernetes Helm guides, [deployment reference architectures](/self-managed/reference-architecture/reference-architecture.md), and improved support for local development with [Camunda 8 Run](/self-managed/setup/deploy/local/c8run.md).

You can download the alpha release of the unified package from the Camunda GitHub repository, either as an executable Java application (Camunda Orchestration Core) or a Docker image.

#### Identity and authentication limitations in 8.8.0-alpha2

The 13.0.0-alpha2 Helm chart released with Camunda 8.8.0-alpha2 establishes a new default setup to support 8.8 [Identity management updates](#identity-management-updates-saasself-managed). Currently, this setup is limited to the following components:

- The Orchestration core (Zeebe, Operate, Tasklist, and Orchestration cluster Identity)
- Connectors

This temporary limitation will be resolved in subsequent alpha releases.

#### Helm charts

##### Deprecation of Self-Managed AWS Marketplace offering

As of **October 2025**, the **Self-Managed AWS Marketplace** offering will be **deprecated** and no longer publicly available.  
Existing customers may continue to use the product until their contracts expire.

For future use, refer to our [new AWS Marketplace listing](https://aws.amazon.com/marketplace/pp/prodview-6y664fcnydiqg?sr=0-1&ref_=beagle&applicationId=AWSMPContessa) for more information.

#### Separated Ingress deprecation

The separated Ingress Helm configuration for Camunda 8 Self-Managed has been deprecated in 8.6, and will be removed from the Helm chart in 8.8. Only the combined Ingress configuration is officially supported. See the [Ingress guide](/self-managed/setup/guides/ingress-setup.md) for more information on configuring a combined Ingress setup.

If you are using the recommended Camunda 8 deployment option ([Helm charts](/self-managed/setup/install.md)), the upgrade path from version 8.7 to 8.8 will be straightforward by changing the values file to the new syntax.

New migration guides will also be provided to support you when migrating from a previous Camunda version.

:::caution
Additional upgrade considerations are necessary for deployments that use custom scripts, such as Docker containers, manual installations, or custom-developed Kubernetes deployments. For these deployments, customers can either continue to deploy with their original 8.7 topology and upgrade each component independently, or adopt our Helm chart approach for the upgrade, which allows for unifying the deployment into a single JAR or container executable.
:::

#### Single Elasticsearch/OpenSearch instance

Using more than one isolated Elasticsearch/OpenSearch instance for exported Zeebe, Operate, and Tasklist data is no longer supported. If your environment uses multiple Elasticsearch/OpenSearch instances, you must manually migrate the data from each to a single Elasticsearch/OpenSearch cluster before updating to Camunda 8.8. The migration should target Zeebe, Operate, and Tasklist indices, index templates, aliases, and ILM policies.

### Versioning changes in Elasticsearch

As of the 8.8 release, Camunda is compatible with Elasticsearch 8.16+ and no longer supports older Elasticsearch versions. See [supported environments](/reference/supported-environments.md).

## Key changes

### API updates <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span>

The 8.8 release includes API updates to support the move to a [Orchestration cluster REST API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md) unified experience. See more details in the [release notes](/reference/announcements-release-notes/880/880-release-notes.md#api-updates).

#### Deprecated: Operate and Tasklist v1 REST APIs

The deprecation process for the [Operate](/apis-tools/operate-api/overview.md) and [Tasklist](/apis-tools/tasklist-api-rest/tasklist-api-rest-overview.md) REST APIs starts with the 8.8 release. You can begin migrating to the [Orchestration cluster REST API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md) for querying to prepare for this change.

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

#### Deprecated: Zeebe Client job worker metrics

With the **8.8 release**, Camunda announces the **deprecation of Zeebe client job worker metrics**.

These metrics are **scheduled for removal in the 8.10 release**.

For more information, refer to:

- [Zeebe client job worker](/apis-tools/java-client/job-worker.md)
- [Zeebe client job worker concept](/components/concepts/job-workers.md)

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

### Camunda Exporter <span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span>

Camunda web applications used importers and archivers to consume, aggregate, and archive historical data provided by the Elasticsearch (ES) or OpenSearch (OS) exporters.

![87-orchestration-cluster-state](../../img/87-orchestration-cluster-state.png)

With the Camunda 8.8 release, a new Camunda Exporter is introduced. That brings the importing and archiving logic of web components (Tasklist and Operate) closer to the distributed platform (Zeebe). This simplifies the installation, enables scalability for the web applications, reduces latency when showing runtime and historical data, and reduces data duplication (resource consumption).

![brown-field-without-optimize](../../img/brown-field-orchestration-cluster-without-optimize.png)

The new Camunda Exporter helps us achieve a more streamlined architecture, better performance, and improved stability (especially concerning ES/OS).
For more details about this project, see the related [blog post](https://camunda.com/blog/2025/02/one-exporter-to-rule-them-all-exploring-camunda-exporter/).

### Harmonized index schema

The existing data schema in the secondary storage has been harmonized, to be used by all Camunda components.

- This removes unnecessary duplications over multiple indices due to the previous architecture.
- With this change, several Operate indices can and will be used by Tasklist.
- New indices have been created to integrate Identity into the system.

![Harmonized indices schema](../../img/harmonized-indices-schema.png)

<!-- :::info
Learn more about these updates in Streamlined Deployment with 8.7.
::: -->

### Camunda Java client and Camunda Spring Boot SDK

With the Camunda 8.8 release, Camunda Java Client and Camunda Spring Boot SDK replace the Zeebe Java client and Spring Zeebe SDK. This allows you to use a single consolidated client to interact with Camunda orchestration clusters.

The `CamundaClient` replaces the `ZeebeClient`, offering the same functionality and adding new capabilities.

:::note

- If you need to continue using the old `ZeebeClient`, you can use the new version 8.8 `CamundaClient` artifact without issues as it still contains the related `ZeebeClient` classes. Those classes are marked as deprecated, so you can easily spot code you need to adjust to the `CamundaClient`.
- The old `zeebe-client-java` artifact is now relocation-only, so your build system is redirected to the new `camunda-client-java` artifact. We will discontinue the old artifact with a future release and recommend using the new one.
- The Zeebe Java client will not be developed further and only receives bug fixes while version 8.7 is officially supported.

:::

### Camunda 8 Self-Managed

#### Helm

##### ExtraVolumeClaimTemplates

You can now add custom `extraVolumeClaimTemplates` to the Zeebe/Core StatefulSet by supplying an array of templates in your Helm values file. This allows you to attach additional persistent volumes to each Zeebe/Core pod for use cases such as custom storage or log directories.

**Important:**  
Kubernetes does not allow you to change the `volumeClaimTemplates` of an existing StatefulSet. If you add, remove, or modify `extraVolumeClaimTemplates` after initial deployment, you must delete and recreate the StatefulSet (which will also delete the pods) for the changes to take effect. This may require additional planning and data migration steps to avoid data loss.

##### Common labels for Camunda resources

A new `commonLabels` value is now available and integrates with `camundaPlatform.labels`. This allows you to define mutable labels that are automatically applied to all Camunda resources. By setting `commonLabels`, you can ensure consistent labeling across deployments, making it easier to manage, organize, and identify resources within your Camunda environment.

##### Configure Web Modeler replicas

The number of replicas for the Web Modeler REST API and web app deployments can be set with new configuration properties: `webModeler.restapi.replicas` and `webModeler.webapp.replicas`, respectively.

##### External database for Web Modeler REST API

The configuration for the external database used by the Web Modeler REST API has been updated to align with the Identity component's database configuration. A new value, `webModeler.restapi.externalDatabase`, is now available and mirrors the structure of `identity.externalDatabase`. To ensure backward compatibility, the existing `webModeler.restapi.externalDatabase.url` field is retained and will take precedence if set.

#### Adjustments

| Change                                          | Description                                                                                                                                                                                                                                                                                                        |
| :---------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| New package structure                           | Package `io.camunda.client`: Contains the new `CamundaClient` and all 8.7 features.                                                                                                                                                                                                                                |
| Refactored properties and environment variables | <p><ul><li><p>All old Java client property names are refactored to more general ones. For example, `zeebe.client.tenantId` to `camunda.client.tenantId`.</p></li><li><p>Similarly, environment variables are renamed following the same concept: `ZEEBE_REST_ADDRESS` to `CAMUNDA_REST_ADDRESS`.</p></li></ul></p> |
| Artifact ID change                              | The `artifactId` changes from `zeebe-client-java` to `camunda-client-java`.                                                                                                                                                                                                                                        |
| Command changes                                 | The method `newUserCreateCommand()` is changed to `newCreateUserCommand()` in `CamundaClient`.                                                                                                                                                                                                                     |
