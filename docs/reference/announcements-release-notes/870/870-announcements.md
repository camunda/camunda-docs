---
id: 870-announcements
title: "Announcements"
description: "Supported environment changes and breaking changes or deprecations for the Camunda 8.7 release."
toc_max_heading_level: 2
---

import DeployDiagramImg from '../../img/deploy-diagram-modal.png';

Supported environment changes and breaking changes or deprecations for the Camunda 8.7 release are summarized below.

| Scheduled release date | Scheduled end of maintenance | Release notes                                                                        | Blog                                                                                            |
| :--------------------- | :--------------------------- | :----------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------- |
| 8 April 2025           | 13 October 2026              | [8.7 release notes](/reference/announcements-release-notes/870/870-release-notes.md) | [Announcing Camunda 8.7](https://camunda.com/blog/2024/11/camunda-8-7-releasing-february-2025/) |

<!--- [Ad-hoc subprocesses](#)
- [Document handling](#)
- [RPA](#)
  - [Fetch RPA resource API](#)
  - [deployResourceAPI for RPA](#) -->

- [Supported environment changes](#supported-environment-changes)
  - [Identity Keycloak now requires v25 or v26 Self-Managed](#identity-keycloak-now-requires-v25-or-v26-self-managed)
- [Breaking changes](#breaking-changes)
  - [Deploy diagram change Self-Managed](#web-modeler-deploy-diagram-change)
  - [Breaking changes in Camunda Process Test](#breaking-changes-in-camunda-process-test)
  - [Deprecated: OpenAPI entities with `integer (int64)` key attributes](#deprecated-openapi-entities-with-integer-int64-key-attributes)

## Supported environment changes

### Identity Keycloak now requires v25 or v26 <span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span>

Identity 8.7 now requires Keycloak v25 or v26, and Keycloak versions must be updated to match. This update also includes changes to the Camunda Helm chart. For more information on configuration changes, see the Self-Managed [update guide](/self-managed/operational-guides/update-guide/860-to-870.md#identity).

## Breaking changes

### Deploy diagram change <span class="badge badge--long" title="This feature affects Self-Managed">Self-Managed</span> {#web-modeler-deploy-diagram-change}

With this version, we ship a breaking change to how Web Modeler **Deploy diagram** modals work. Clusters must now be proactively [configured](/self-managed/modeler/web-modeler/configuration/configuration.md#clusters) to be able to deploy from Web Modeler.

<img src={DeployDiagramImg} alt="New 8.7 deploy diagram modal" width="600px" style={{border: '0', paddingTop: '0', marginTop: '0'}} />

- In 8.6, you could still configure cluster details on the **Deploy diagram** modal when deploying.
- In 8.7, you can no longer configure cluster details on the **Deploy diagram** modal. You must [configure the cluster](/self-managed/modeler/web-modeler/configuration/configuration.md#clusters) to be able to deploy from this modal.
- Note that you must also be assigned the `Zeebe` [Identity role](/self-managed/identity/user-guide/roles/add-assign-role.md) to be able to deploy.

### Breaking changes in Camunda Process Test

In version 8.6, the element assertions use names to identify the BPMN elements. Starting with version 8.7, the [element assertions](/apis-tools/testing/assertions.md#with-bpmn-element-id) use BPMN element IDs instead of names. This change eases the migration of previous testing frameworks and aligns with other APIs.

If you prefer to stay with element names, you can use the new [element selector](/apis-tools/testing/assertions.md#with-element-selector) `io.camunda.process.test.api.assertions.ElementSelectors#byName`.

To migrate all your test cases at once, change the [default element selector](/apis-tools/testing/assertions.md#element-selector) in the configuration.

### Deprecated: OpenAPI entities with `integer (int64)` key attributes

OpenAPI entities containing keys of type `integer (int64)` are now being deprecated.
This is part of a transition where API entity keys change from type `integer (int64)` to `string`.

See the [overview about API Key Attributes][camunda8-api-overview] for more details.

[camunda8-api-overview]: /versioned_docs/version-8.7/apis-tools/camunda-api-rest/camunda-api-rest-overview.md#api-key-attributes
