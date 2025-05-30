---
id: 870-announcements
title: "Release announcements"
description: "Supported environment changes and breaking changes or deprecations for the Camunda 8.7 release."
toc_max_heading_level: 3
---

import DeployDiagramImg from '../../img/deploy-diagram-modal.png';

Supported environment changes and breaking changes or deprecations for the Camunda 8.7 release are summarized below.

| Scheduled release date | Scheduled end of maintenance | Release notes                                                                        | Blog                                                                            |
| :--------------------- | :--------------------------- | :----------------------------------------------------------------------------------- | :------------------------------------------------------------------------------ |
| 8 April 2025           | 13 October 2026              | [8.7 release notes](/reference/announcements-release-notes/870/870-release-notes.md) | [Announcing Camunda 8.7](https://camunda.com/blog/2025/04/camunda-8-7-release/) |

<!--- [Ad-hoc subprocesses](#)
- [Document handling](#)
- [RPA](#)
  - [Fetch RPA resource API](#)
  - [deployResourceAPI for RPA](#) -->

## Changes in supported environments

### Identity Keycloak now requires v25 or v26 <span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span>

Identity 8.7 now requires Keycloak v25 or v26, and Keycloak versions must be updated to match. This update also includes changes to the Camunda Helm chart. For more information on configuration changes, see the Self-Managed [update guide](/self-managed/operational-guides/update-guide/860-to-870.md#identity).

### Camunda Spring Boot SDK now requires Spring Boot 3.4.x <span class="badge badge--long" title="This feature affects SaaS">SaaS</span><span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span>

Camunda Spring Boot SDK 8.7 now requires Spring Boot 3.4.x. For more information on compatibility, see the Camunda Spring Boot SDK [version compatibility matrix](/apis-tools/spring-zeebe-sdk/getting-started.md#version-compatibility).

### Desktop Modeler no longer supports macOS 12

Following the end-of-life of macOS 12, support for Desktop Modeler on macOS 12 has been removed.

## Key changes

### Deploy diagram change <span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span> {#web-modeler-deploy-diagram-change}

With this version, we ship a breaking change to how Web Modeler **Deploy diagram** modals work. Clusters must now be proactively [configured](/self-managed/modeler/web-modeler/configuration/configuration.md#clusters) to be able to deploy from Web Modeler.

<img src={DeployDiagramImg} alt="New 8.7 deploy diagram modal" width="600px" style={{border: '0', paddingTop: '0', marginTop: '0'}} />

- In 8.6, you could still configure cluster details on the **Deploy diagram** modal when deploying.
- In 8.7, you can no longer configure cluster details on the **Deploy diagram** modal. You must [configure the cluster](/self-managed/modeler/web-modeler/configuration/configuration.md#clusters) to be able to deploy from this modal.
- Note that you must also be assigned the `Zeebe` [Identity role](/self-managed/identity/user-guide/roles/manage-roles.md) to be able to deploy (if `BEARER_TOKEN` is used as authentication).

### Deprecated: Web Modeler cluster authentication `OAUTH` and `CLIENT_CREDENTIALS` <span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span>

The following authentication methods for a [configured cluster in Web Modeler](/self-managed/modeler/web-modeler/configuration/configuration.md#clusters) are now being deprecated and will no longer be supported in version 8.8:

- `OAUTH`: This method was replaced by `BEARER_TOKEN`.
- `CLIENT_CREDENTIALS`: This method was introduced as a temporary solution to support deployments from Web Modeler when using [Microsoft Entra ID or a generic OIDC provider](/self-managed/setup/guides/connect-to-an-oidc-provider.md).
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

The old `zeebe-client-java` artifact will be relocation-only, so your build system is redirected to the new `camunda-client-java` artifact. We will discontinue the old artifact with a future release and recommend using the new one.

:::note
The Zeebe Java client will not be developed further and will only receive bug fixes for as long as version 8.7 is officially supported.
:::

#### Adjustments

- **New package structure**:
  - Package `io.camunda.client`: This package contains the new `CamundaClient` and all the features slated for release in version 8.8.
- **Properties and environment variables refactoring**:
  - All old Java client property names will be refactored to more general ones. For instance, `zeebe.client.tenantId` will become `camunda.client.tenantId`.
  - Similarly, environment variables will be renamed following the same concept: `ZEEBE_REST_ADDRESS` will become `CAMUNDA_REST_ADDRESS`.
- **Artifact ID change**:
  - The `artifactId` will change from `zeebe-client-java` to `camunda-client-java`.

### Connectors

Starting with 8.7, the connector runtime will stop using the deprecated community [Spring Zeebe library](https://github.com/camunda-community-hub/spring-zeebe) to communicate with the core APIs of Camunda. The new [Camunda Spring Boot SDK](/apis-tools/spring-zeebe-sdk/getting-started.md) will be used instead.

Although the official SDK is largely compatible with the community library, some changes might be required in the configuration of Self-Managed connector deployments.

We recommend updating the configuration to match the new property format of the [Camunda Spring Boot SDK](/apis-tools/spring-zeebe-sdk/getting-started.md) to avoid any issues. The old properties will be removed in a future release.

For more information, see the [update guide](/self-managed/operational-guides/update-guide/860-to-870.md#connectors) and the [connectors configuration guide](/self-managed/connectors-deployment/connectors-configuration.md).
