---
id: 870-announcements
title: "Release announcements"
description: "Supported environment changes and breaking changes or deprecations for the Camunda 8.7 release."
toc_max_heading_level: 3
---

import DeployDiagramImg from '../../img/deploy-diagram-modal.png';

Supported environment changes and breaking changes or deprecations for the Camunda 8.7 release are summarized below.

This release focuses primarily on consolidation and deprecation work to simplify APIs, align clients and SDKs, and prepare for upcoming features in 8.8 and later releases. While there are fewer net-new features in this release, these changes reduce long-term maintenance and improve consistency across Camunda components.

| Scheduled release date | Scheduled end of maintenance | Release notes                                                                        | Blog                                                                            |
| :--------------------- | :--------------------------- | :----------------------------------------------------------------------------------- | :------------------------------------------------------------------------------ |
| 8 April 2025           | 13 October 2026              | [8.7 release notes](/reference/announcements-release-notes/870/870-release-notes.md) | [Announcing Camunda 8.7](https://camunda.com/blog/2025/04/camunda-8-7-release/) |

:::tip Release notes and quality board

- See [release notes](/reference/announcements-release-notes/870/870-release-notes.md) to learn more about new features and enhancements.
- Refer to the [quality board](https://github.com/orgs/camunda/projects/187/views/16) for an overview of known bugs by component and severity.

:::

<!--- [Ad-hoc subprocesses](#)
- [Document handling](#)
- [RPA](#)
  - [Fetch RPA resource API](#)
  - [deployResourceAPI for RPA](#) -->

## Changes in supported environments

### Identity Keycloak now requires v25 or v26 <span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span>

Identity 8.7 now requires Keycloak v25 or v26, and Keycloak versions must be updated to match. This update also includes changes to the Camunda Helm chart. For more information on configuration changes, see the Self-Managed [update guide](/versioned_docs/version-8.7/self-managed/operational-guides/update-guide/860-to-870.md#identity).

### Spring Zeebe SDK now requires Spring Boot 3.4.x <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span>

The Spring Zeebe SDK 8.7 now requires Spring Boot 3.4.x. For more information on compatibility, see the Spring Zeebe SDK [version compatibility matrix](/apis-tools/camunda-spring-boot-starter/getting-started.md#version-compatibility).

### Desktop Modeler no longer supports macOS 12

Following the end-of-life of macOS 12, support for Desktop Modeler on macOS 12 has been removed.

## Key changes

Collectively, these changes consolidate overlapping functionality, align configuration and client behavior across components, and establish clearer upgrade paths for upcoming releases.

### 8.7.x patch releases

The following key changes were also released as part of an 8.7.x patch release.

| Patch release                                                    | Type            | Key change                                                                                                       |
| :--------------------------------------------------------------- | :-------------- | :--------------------------------------------------------------------------------------------------------------- |
| [8.7.28](https://github.com/camunda/camunda/releases/tag/8.7.28) | Regression      | [Multi-instance sub-process output mapping variable scope regression](#multi-instance-output-mapping-regression) |
| [8.7.28](https://github.com/camunda/camunda/releases/tag/8.7.28) | Regression      | [Output mapping behavior change for composite variables](#output-mapping-behavior-change)                        |
| [8.7.27](https://github.com/camunda/camunda/releases/tag/8.7.27) | Breaking change | [`getMessageKeys()` removed from the exporter record](#getmessagekeys-removed-from-the-exporter-record)          |

### `getMessageKeys()` removed from the exporter record {#getmessagekeys-removed-from-the-exporter-record}

Camunda 8.7.27 unintentionally removed the `getMessageKeys()` method (and the underlying `messageKeys` field) from the public `MessageBatchRecordValue` exporter record. Custom exporters that call `getMessageKeys()` on message batch records fail to compile against, or throw a `NoSuchMethodError` at runtime with, the updated `zeebe-protocol` dependency after upgrading to 8.7.27 or any later 8.7.x patch. The built-in Elasticsearch and OpenSearch exporters are unaffected.

A fix that restores the method (now deprecated, returning an empty list for records produced by newer versions) is tracked in [camunda/camunda#54823](https://github.com/camunda/camunda/issues/54823) and is available in 8.7.33.

**Action:** If you maintain a custom exporter that reads message batch records, avoid calling `getMessageKeys()` until you upgrade to a patch that includes the fix.

### Multi-instance sub-process output mapping variable scope regression {#multi-instance-output-mapping-regression}

Camunda 8.7.28 introduced a regression in which output mappings inside a multi-instance sub-process that also defines an output collection cause local variables to propagate to the parent scope.

You're affected if your process contains a multi-instance sub-process that meets both of the following conditions:

1. The sub-process defines an output collection.
2. One or more elements inside the sub-process define output mappings.

Under these conditions:

- Local variables from inside the sub-process appear in the parent scope and are visible in Operate.
- If any leaked variable shares a name with a variable on the parent scope, the parent scope value is overwritten.

**Workaround:** Ensure all variable names used inside the multi-instance sub-process are unique and do not reuse names that exist on the parent scope.

**Fix:** A fix is available in 8.7.33. The fix reverts the input/output mapping changes that introduced this regression. As a side effect, two previously resolved bugs are reintroduced:

- [camunda/camunda#11789](https://github.com/camunda/camunda/issues/11789): FEEL expressions used as mapping sources may not evaluate correctly due to ordering.
- [camunda/camunda#35251](https://github.com/camunda/camunda/issues/35251): When one value from a nested variable is listed as an output mapping, all values in the nested variable are merged into the parent scope. Workaround: map the full nested variable instead of individual values.

**Action:**

- Before the fix is available: ensure all variable names inside the multi-instance sub-process are unique and do not reuse names that exist on the parent scope.
- After upgrading to the fixed patch: bugs #11789 and #35251 are reintroduced by the fix. If you previously had adaptations in place to work around these bugs and removed them, reapply those adaptations.

### Output mapping behavior change for composite variables {#output-mapping-behavior-change}

**Affected versions:** 8.7.28–8.7.32. Fixed in 8.7.33.

Patches 8.7.28–8.7.32 changed how output mappings behave when writing to composite (object) variables. Upgrading to 8.7.33+ reverts this change, which can alter the behavior of your running processes.

**What changed**

Before 8.7.28 and from 8.7.33+, assigning an object literal to a variable replaces the variable entirely. In 8.7.28–8.7.32, the behavior changed to _merge_: existing keys in the variable are preserved and new keys are added.

Example: task A sets `result.a = 1`, then task B sets `result = {b: 2}`:

- _Replace_ (before 8.7.28 and 8.7.33+): `result = {"b": 2}` — task A's value is overwritten.
- _Merge_ (8.7.28–8.7.32): `result = {"a": 1, "b": 2}` — task A's value is preserved.

Replace is the intended long-term behavior. The merge behavior in the affected patches was an unintended regression.

**Action**

- **Running 8.7.28–8.7.32:** your processes use merge behavior. Review any process that writes to composite variables from multiple tasks.
- **Upgrading to 8.7.33+:** output mappings revert to replace behavior. Test affected processes before upgrading to production.

### Deprecation of Self-Managed AWS Marketplace offering

As of **October 2025**, the **Self-Managed AWS Marketplace** offering will be **deprecated** and no longer publicly available.  
Existing customers may continue to use the product until their contracts expire.

For future use, refer to our [new AWS Marketplace listing](https://aws.amazon.com/marketplace/pp/prodview-6y664fcnydiqg?sr=0-1&ref_=beagle&applicationId=AWSMPContessa) for more information.

### Deploy diagram change <span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span> {#web-modeler-deploy-diagram-change}

With this version, we ship a breaking change to how Web Modeler **Deploy diagram** modals work. Clusters must now be proactively [configured](/self-managed/components/modeler/web-modeler/configuration/configuration.md#clusters) to be able to deploy from Web Modeler.

<img src={DeployDiagramImg} alt="New 8.7 deploy diagram modal" width="600px" style={{border: '0', paddingTop: '0', marginTop: '0'}} />

- In 8.6, you could still configure cluster details on the **Deploy diagram** modal when deploying.
- In 8.7, you can no longer configure cluster details on the **Deploy diagram** modal. You must [configure the cluster](/self-managed/components/modeler/web-modeler/configuration/configuration.md#clusters) to be able to deploy from this modal.
- Note that you must also be assigned the `Zeebe` [Identity role](/self-managed/components/management-identity/application-user-group-role-management/manage-roles.md) to be able to deploy (if `BEARER_TOKEN` is used as authentication).

### Deprecated: Web Modeler cluster authentication `OAUTH` and `CLIENT_CREDENTIALS` <span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span>

The following authentication methods for a [configured cluster in Web Modeler](/self-managed/components/modeler/web-modeler/configuration/configuration.md#clusters) are now being deprecated and will no longer be supported in version 8.8:

- `OAUTH`: This method was replaced by `BEARER_TOKEN`.
- `CLIENT_CREDENTIALS`: This method was introduced as a temporary solution to support deployments from Web Modeler when using [Microsoft Entra ID or a generic OIDC provider](/self-managed/deployment/helm/configure/authentication-and-authorization/external-oidc-provider.md).
  It is marked for removal in 8.8 as the `BEARER_TOKEN` authentication will be supported for Entra ID and generic providers as well.

### Breaking changes in Camunda Process Test

In version 8.6, the element assertions use names to identify the BPMN elements. Starting with version 8.7, the [element assertions](/apis-tools/testing/assertions.md#with-bpmn-element-id) use BPMN element IDs instead of names. This change eases the migration of previous testing frameworks and aligns with other APIs.

If you prefer to stay with element names, you can use the new [element selector](/apis-tools/testing/assertions.md#with-element-selector) `io.camunda.process.test.api.assertions.ElementSelectors#byName`.

To migrate all your test cases at once, change the [default element selector](/apis-tools/testing/assertions.md#element-selector) in the configuration.

### Deprecated: OpenAPI entities with `integer (int64)` key attributes

OpenAPI entities containing keys of type `integer (int64)` are now being deprecated.
This is part of a transition where API entity keys change from type `integer (int64)` to `string`.

See the [overview about API Key Attributes][camunda8-api-overview] for more details.

[camunda8-api-overview]: /versioned_docs/version-8.7/apis-tools/camunda-api-rest/camunda-api-rest-overview.md#api-key-attributes

### Zeebe Java client

Starting with 8.8, the Zeebe Java client will become the new Camunda Java client. This transition brings a new Java client structure designed to enhance the user experience and introduce new features while maintaining compatibility with existing codebases.

The primary goal of those changes is to enable users to interact with Camunda clusters with one consolidated client rather than multiple. The `CamundaClient` will replace the `ZeebeClient`, offering the same functionality and adding new capabilities.

If you need to continue using the old `ZeebeClient`, you can use the new version 8.8 `CamundaClient` artifact without issues as it still contains the related `ZeebeClient` classes. Those classes are marked as deprecated, so you can easily spot code you need to adjust to the `CamundaClient`.

The old `zeebe-client-java` artifact will be relocation-only, so your build system is redirected to the new `camunda-client-java` artifact. We will discontinue the old artifact in version 8.10 and recommend using the new one.

:::note
The Zeebe Java client will not be developed further and will only receive bug fixes for as long as version 8.9 is officially supported. This client is scheduled for removal in version 8.10.
:::

### Spring Zeebe SDK

Starting with 8.8, the Spring Zeebe SDK will become the new Camunda Spring Boot Starter. The SDK will rely on the new Camunda Java client, designed to enhance the user experience and introduce new features while maintaining compatibility with existing codebases.

:::note
The Spring Zeebe SDK will not be developed further and will only receive bug fixes for as long as version 8.9 is officially supported. This SDK is scheduled for removal in version 8.10.
:::

### Camunda 8 Self-Managed

#### Helm

##### Separated Ingress deprecation

The separated Ingress Helm configuration for Camunda 8 Self-Managed has been deprecated in 8.6, and will be removed from the Helm chart in 8.8. Only the combined Ingress configuration is officially supported. See the [Ingress guide](/self-managed/deployment/helm/configure/ingress/ingress-setup.md) for more information on configuring a combined Ingress setup.

#### Helm chart: Custom users and clients for Identity

You can now configure custom users and OAuth2 clients for Management Identity during Helm installation.

See [adding users and clients](/self-managed/deployment/helm/configure/authentication-and-authorization/custom-users-and-clients.md) for details on setting up custom users and clients on Management Identity during initial Helm install.

:::caution
If your deployment currently defines custom users or clients using environment variables (for example, `KEYCLOAK_CLIENTS_2_PERMISSIONS_0_RESOURCE_SERVER_ID`), additional upgrade steps are required. Remove any environment variables that reference users or clients and migrate to the configuration method described in the guide linked above.
:::

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

##### Bitnami Docker repository migration

The Camunda Helm charts have been updated to use the new Bitnami Docker repository.
See [Bitnami Docker repository migration](/self-managed/upgrade/helm/index.md#bitnami-docker-repository-migration) for migration details.

##### Helm chart: Bitnami subcharts bundled

The Bitnami subcharts (PostgreSQL, Keycloak, Elasticsearch, and Common) are bundled directly within the Camunda Helm chart instead of being fetched from external Bitnami repositories at install time.

This change reduces the risk of unexpected breaking changes from upstream Bitnami chart updates and gives Camunda full control over the lifecycle of these subcharts. No action is required — existing deployments will continue to work as before when applying the next patch release.

#### Adjustments

- **New package structure**:
  - Package `io.camunda.client`: This package contains the new `CamundaClient` and all the features slated for release in version 8.8.
- **Properties and environment variables refactoring**:
  - All old Java client property names will be refactored to more general ones. For instance, `zeebe.client.tenantId` will become `camunda.client.tenantId`.
  - Similarly, environment variables will be renamed following the same concept: `ZEEBE_REST_ADDRESS` will become `CAMUNDA_REST_ADDRESS`.
- **Artifact ID change**:
  - The `artifactId` will change from `zeebe-client-java` to `camunda-client-java`.

### Connectors

Starting with 8.7, the connector runtime will stop using the deprecated community [Spring Zeebe library](https://github.com/camunda-community-hub/spring-zeebe) to communicate with the core APIs of Camunda. The new [Spring Zeebe SDK](/apis-tools/camunda-spring-boot-starter/getting-started.md) will be used instead.

Although the official SDK is largely compatible with the community library, some changes might be required in the configuration of Self-Managed connector deployments.

We recommend updating the configuration to match the new property format of the [Spring Zeebe SDK](/apis-tools/camunda-spring-boot-starter/getting-started.md) to avoid any issues. The old properties will be removed in a future release.

For more information, see the [update guide](/versioned_docs/version-8.7/self-managed/operational-guides/update-guide/860-to-870.md#connectors) and the [connectors configuration guide](/self-managed/components/connectors/connectors-configuration.md).
