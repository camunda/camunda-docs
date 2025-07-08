---
id: 860-announcements
title: "Release announcements"
description: "Supported environment changes and breaking changes or deprecations for the Camunda 8.6 release."
toc_max_heading_level: 3
---

Supported environment changes and breaking changes or deprecations for the Camunda 8.6 release are summarized below.

| Release date   | End of maintenance | Release notes                                                                        |
| :------------- | :----------------- | :----------------------------------------------------------------------------------- |
| 8 October 2024 | 14 April 2026      | [8.6 release notes](/reference/announcements-release-notes/860/860-release-notes.md) |

:::tip Release notes and quality board

- See [release notes](/reference/announcements-release-notes/860/860-release-notes.md) to learn more about new features and enhancements.
- Refer to the [quality board](https://github.com/orgs/camunda/projects/187/views/17) for an overview of known bugs by component and severity.

:::

## Changes in supported environments

### Zeebe, Operate, and Tasklist must run on exact same minor and patch levels

From version `8.6.0` forward, the core components Zeebe, Operate, and Tasklist must run the exact same `minor` and `patch` level to ensure compatibility. See the [component version matrix](/reference/supported-environments.md#component-version-matrix) for an overview of components.

### License key changes

With the 8.6 release, Camunda 8 Self-Managed requires a license key for production usage. For additional details, review the [blog post on licensing updates for Camunda 8 Self-Managed](https://camunda.com/blog/2024/04/licensing-update-camunda-8-self-managed/).

Review the following documentation for your components for more information on how to provide the license key to each component as an environment variable:

- [Console](/self-managed/console-deployment/configuration/configuration.md#environment-variables)
- [Zeebe](/self-managed/zeebe-deployment/configuration/configuration.md#licensing)
- [Operate](/self-managed/operate-deployment/operate-configuration.md#licensing)
- [Tasklist](/self-managed/tasklist-deployment/tasklist-configuration.md#licensing)
- [Optimize](/self-managed/optimize-deployment/configuration/system-configuration-platform-8.md#licensing)
- [Identity](/self-managed/identity/miscellaneous/configuration-variables.md#license-configuration)
- [Modeler](/self-managed/modeler/web-modeler/configuration/configuration.md#licensing)

To configure with Helm, visit the [Self Managed installation documentation](/self-managed/setup/install.md).

:::note
Camunda 8 components without a valid license may display **Non-Production License** in the navigation bar and issue warnings in the logs. These warnings have no impact on startup or functionality, with the exception that Web Modeler has a limitation of five users. To obtain a license, visit the [Camunda Enterprise page](https://camunda.com/platform/camunda-platform-enterprise-contact/).
:::

### OpenJDK, Elasticsearch, Amazon OpenSearch

Version changes are made to supported environments:

- OpenJDK minimum version raised to 21+ in Operate
- Elasticsearch minimum version raised to 8.13+
- Amazon OpenSearch minimum version raised to 2.9+

To learn more about supported environments, see [supported environments](/reference/supported-environments.md).

### Camunda Optimize artifact and Docker tag separation

Starting with Camunda 8.6, the Camunda Optimize artifact has been split into two distinct versions, and versioning between Camunda 7 and Camunda 8 is no longer interchangeable:

- **Before Camunda 8.6**: Versions like `8.x` and `3.x` (used for Camunda 7) could sometimes be used interchangeably.
- **From Camunda 8.6 onwards**: `8.6 != 3.14`. Each version corresponds strictly to its platform:
  - **Camunda 7**: Uses the `3.x` versioning scheme and the `latest` Docker tag.
  - **Camunda 8**: Uses the `8.x` versioning scheme and the `8-latest` Docker tag.

#### Action required

- **Camunda 7 Users**: Continue using `3.x` versions and the `latest` Docker tag.
- **Camunda 8 Users**: If you haven't already done so, update your configurations to use `8.x` versions and the `8-latest` Docker tag.

Make sure to update your Docker configurations accordingly to ensure compatibility.

## Key changes

### Deprecation: Zeebe Go client & CLI client (zbctl)

The Zeebe Go Client and CLI client (zbctl) will be [officially deprecated](https://camunda.com/blog/2024/09/deprecating-zbctl-and-go-clients/) with the 8.6 release as part of our efforts to streamline the Camunda 8 API experience. This client and CLI utility will not be released starting with Camunda 8.6, will no longer receive new features, and will be transitioned to a community-maintained status.

The documentation of the Zeebe Go Client and CLI client (zbctl) moved to the [community clients section](/apis-tools/community-clients/index.md).

### Camunda 8 SaaS - Required cluster update

:::caution
By **August 30th, 2024** all automation clusters in Camunda 8 SaaS must be [updated](/components/console/manage-clusters/manage-cluster.md#update-a-cluster) to the following versions at a **minimum**:

- **8.2+gen27**
- **8.3+gen11**
- **8.4+gen7**
- **8.5+gen2**

:::

auth0 announced an End-Of-Life for one of the functionalities that is being utilized by previous automation clusters. The new versions are not using this functionality anymore. This update ensures your cluster will work seamlessly after auth0 deactivates the feature in production.

You minimally need to take the following [update](/components/console/manage-clusters/manage-cluster.md#update-a-cluster) path:

- 8.0.x -> 8.2+gen27
- 8.1.x -> 8.2+gen27
- 8.2.x -> 8.2+gen27
- 8.3.x -> 8.3+gen11
- 8.4.x -> 8.4+gen7
- 8.5.x -> 8.5+gen2

If you do not update the cluster by August 30th 2024, we will update the cluster for you. **Without an update, you would lose access to your cluster.**

Camunda 8 Self-Managed clusters are not affected by this.

### Deprecation: None start event element templates for Kafka, RabbitMQ, Amazon SQS, and Amazon SNS inbound connectors

The [none start event](/components/modeler/bpmn/none-events/none-events.md#none-start-events) element templates for the out-of-the-box Kafka, RabbitMQ, Amazon SQS, and Amazon SNS inbound connectors have been deprecated in Camunda Modeler.

Users can no longer select these templates when creating a new none start event element in Camunda Modeler. Existing none start event elements with these templates will continue to work as expected, but users are encouraged to migrate to the [message start event](/components/modeler/bpmn/message-events/message-events.md#message-start-events) element templates for these connectors.

Message start event element templates are better suited for the message-based communication these connectors provide, and offer more flexibility and features compared to the none start event element templates, such as the ability to define a message ID and a correlation key for idempotency. Read more in the [inbound connectors documentation](/components/connectors/use-connectors/inbound.md) and the [messaging concepts documentation](/components/concepts/messages.md#message-uniqueness).

If one of your endpoints returns multiple Set-Cookie headers and you need to capture all of them, set `groupSetCookieHeaders` to `true` in the element template XML. This aggregates the headers into a list. This feature is available since version 8.6.7. The grouping is enabled by default since version 8.6.10.

If one of your endpoints requires pre-encoded URL elements, this behavior will change in version 8.6.0. Since 8.6.10, the element template includes the skipEncoding property, which can be set to "true". This disables the automatic decoding and re-encoding process, ensuring the URL is sent to the server exactly as provided.

### Breaking changes in the connector SDK

The `void correlate(Object variables)` method in the `InboundConnectorContext` interface has been removed, following the deprecation in 8.4.0. Use the `CorrelationResult correlateWithResult(Object variables)` method instead.

The `CorrelationResult` record has been changed compared to the previous versions:

- `CorrelationResult.Success` now contains a `ProcessElementContext` that represents the element that was correlated. Compared to the previous version, where the correlated element was returned directly, this change allows accessing element properties after correlation for user-controlled post-correlation actions.
- `CorrelationResult.Failure` now provides the `CorrelationFailureHandlingStrategy` that defines how the failure should be handled.

An example of how to use the new `CorrelationResult` can be found in the [Connector SDK documentation](/components/connectors/custom-built-connectors/connector-sdk.md#inbound-connector-runtime-logic).

### Camunda 8 Self-Managed

#### Deprecation of Self-Managed AWS Marketplace offering

As of **October 2025**, the **Self-Managed AWS Marketplace** offering will be **deprecated** and no longer publicly available.  
Existing customers may continue to use the product until their contracts expire.

For future use, refer to our [new AWS Marketplace listing](https://aws.amazon.com/marketplace/pp/prodview-6y664fcnydiqg?sr=0-1&ref_=beagle&applicationId=AWSMPContessa) for more information.

#### Helm

##### Separated Ingress deprecation

The separated Ingress Helm configuration for Camunda 8 Self-Managed has been deprecated in 8.6, and will be removed from the Helm chart in 8.8. Only the combined Ingress configuration is officially supported. See the [Ingress guide](/self-managed/setup/guides/ingress-setup.md) for more information on configuring a combined Ingress setup.

##### `global.multiregion.installationType` deprecation

The `global.multiregion.installationType` option is used in failover and failback scenarios. This option in the Helm chart has been deprecated in 8.6, and will be removed from the Helm chart in 8.7. `global.multiregion.installationType` was replaced with a set of API endpoints called while following the ([dual-region operational procedure](/self-managed/operational-guides/multi-region/dual-region-ops.md))

##### Elasticsearch nodes number

The default value of Elasticsearch deployment pods has changed from 2 to 3, and an affinity setting has been added to avoid scheduling Elasticsearch pods on the same Kubernetes worker.

##### extraVolumeClaimTemplates

You can now add custom `extraVolumeClaimTemplates` to the Zeebe/Core StatefulSet by supplying an array of templates in your Helm values file. This allows you to attach additional persistent volumes to each Zeebe/Core pod for use cases such as custom storage or log directories.

**Important:**  
Kubernetes does not allow you to change the `volumeClaimTemplates` of an existing StatefulSet. If you add, remove, or modify `extraVolumeClaimTemplates` after initial deployment, you must delete and recreate the StatefulSet (which will also delete the pods) for the changes to take effect. This may require additional planning and data migration steps to avoid data loss.

##### Common labels for Camunda resources

A new `commonLabels` value is now available and integrates with `camundaPlatform.labels`. This allows you to define mutable labels that are automatically applied to all Camunda resources. By setting `commonLabels`, you can ensure consistent labeling across deployments, making it easier to manage, organize, and identify resources within your Camunda environment.

##### Configure Web Modeler replicas

The number of replicas for the Web Modeler REST API and web app deployments can be set with new configuration properties: `webModeler.restapi.replicas` and `webModeler.webapp.replicas`, respectively.

### New base path for Operate and Tasklist web applications

We are introducing a new base path for both the Operate and Tasklist **web applications**. This change applies to both Self-Managed and SaaS environments.

#### For Self-Managed

- The new base path for Operate is `/operate`, and for Tasklist, it is `/tasklist`.
- For a [Separated Ingress](/self-managed/setup/guides/ingress-setup.md?ingress=separated) configuration:
  - for Operate, the full URL will be `{operate-host}/operate`. Any calls to `{operate-host}` will automatically be redirected to `{operate-host}/operate`
  - for Tasklist, the full URL will be `{tasklist-host}/tasklist`. Any calls to `{tasklist-host}` will automatically be redirected to `{tasklist-host}/tasklist`.
- For a [Combined Ingress](/self-managed/setup/guides/ingress-setup.md?ingress=combined) configuration:
  - for Operate, the full URL will be `{common-host}/{operate-contextPath}/operate`. Any calls to `{common-host}/{operate-contextPath}` will be automatically redirected to `{common-host}/{operate-contextPath}/operate`.
  - for Tasklist, the full URL will be `{common-host}/{tasklist-contextPath}/tasklist`. Any calls to `{common-host}/{tasklist-contextPath}` will be automatically redirected to `{common-host}/{tasklist-contextPath}/tasklist`.

#### For SaaS

- The full URL for Operate is now structured as `https://{region}.operate.camunda.io/{clusterId}/operate`.
- The full URL for Tasklist is now structured as `https://{region}.tasklist.camunda.io/{clusterId}/tasklist`.
- Any calls to `https://{region}.operate.camunda.io/{clusterId}` will be redirected to `https://{region}.operate.camunda.io/{clusterId}/operate`.
- Any calls to `https://{region}.tasklist.camunda.io/{clusterId}` will be redirected to `https://{region}.tasklist.camunda.io/{clusterId}/tasklist`.

:::note
**API URLs** for both Operate and Tasklist remain **unchanged**.
:::

### Zeebe, Operate, Tasklist, and Optimize released from single repository

To harmonize and simplify, and also to prepare for the [streamlined Orchestration Cluster Architecture](https://camunda.com/blog/2024/04/simplified-deployment-options-accelerated-getting-started-experience/), `Zeebe`, `Operate`, `Tasklist`, and `Optimize` are developed and released from a single repository going forward: https://github.com/camunda/camunda. This prepares for `Zeebe`, `Operate`, `Tasklist`, and a new, Orchestration Cluster level Identity forming the [Orchestration Cluster](/self-managed/reference-architecture/reference-architecture.md#orchestration-cluster) application starting with Camunda 8.8.

This change has the following implications:

- Feature-focused release notes continue to be published in the [release notes](./860-release-notes.md).
- Changelogs are linked from the [release notes](./860-release-notes.md). They are **not** consolidated in https://github.com/camunda/camunda-platform anymore, but can be directly found on https://github.com/camunda/camunda/releases.
- **SaaS**: Generations in Camunda SaaS continue to be versionined using a `8.<minor>+gen<N>` schema, which is described in [`SaaS - Generation Names`](../../../reference/announcements-release-notes/release-policy.md#generation-names). This schema continues to be relevant because while `Zeebe`, `Operate`, and `Tasklist` must run on the exact same patch-version, the patch level of `Optimize` and `Connectors` might diverge (see the [related announcement](#zeebe-operate-and-tasklist-must-run-on-exact-same-minor-and-patch-levels)).
- **Self-Managed**: The [Helm chart version matrix](../../supported-environments.md#helm-version-matrix) is used to map Helm chart versions to the respective supported Camunda application versions.
