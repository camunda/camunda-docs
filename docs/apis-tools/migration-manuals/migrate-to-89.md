---
id: migrate-to-89
title: "Camunda 8.9 API migration guide"
sidebar_label: "Upgrade to Camunda 8.9"
description: "Migrate your API integrations, SDKs, and generated clients to Camunda 8.9. Covers breaking changes, deprecations, and step-by-step migration actions."
toc_max_heading_level: 2
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Migrate your API integrations, SDKs, and generated clients to Camunda 8.9.

## About this guide

This guide details the API and SDK changes introduced in Camunda 8.9 that require customer action.

Details are provided for each integration type, including what changed, why, and what action you must take.

| Integration type       | Description                                               |
| :--------------------- | :-------------------------------------------------------- |
| Official SDK users     | Java client, TypeScript SDK, Python SDK, C# SDK.          |
| Generated-client users | Clients generated from the Camunda OpenAPI specification. |
| Custom integrations    | Custom code that calls the Camunda REST API directly.     |

:::info
For a full list of changes, see the [8.9 release announcements](/reference/announcements-release-notes/890/890-announcements.md) and [release notes](/reference/announcements-release-notes/890/890-release-notes.md).
:::

## Upgrade steps

Complete the following steps in this guide:

1. Upgrade to the latest official Camunda SDK versions.
1. If you generate clients from OpenAPI, regenerate them from the 8.9 specification.
1. Re-run compilation/type checks and address any errors.
1. Review and apply fixes for the breaking changes, deprecations, and supported environment changes below.

### API and SDK changes to migrate before Camunda 8.10

If you did not already migrate to the following APIs and SDKs during your 8.8 upgrade, Camunda recommends you perform these migrations before you upgrade to 8.9.

| Component/Use                                                                                                           | 8.9 status | Migrate to                  | Migrate by          |
| :---------------------------------------------------------------------------------------------------------------------- | :--------- | :-------------------------- | :------------------ |
| [V1 component APIs](/versioned_docs/version-8.8/apis-tools/migration-manuals/migrate-component-apis.md)                 | Deprecated | Orchestration Cluster API   | Before Camunda 8.10 |
| [ZeebeClient](/versioned_docs/version-8.8/apis-tools/migration-manuals/migrate-to-camunda-java-client.md)               | Deprecated | Camunda Java Client         | Before Camunda 8.10 |
| [Spring Zeebe SDK](/versioned_docs/version-8.8/apis-tools/migration-manuals/migrate-to-camunda-process-test.md)         | Deprecated | Camunda Spring Boot Starter | Before Camunda 8.10 |
| [Zeebe Process Test (ZPT)](/versioned_docs/version-8.8/apis-tools/migration-manuals/migrate-to-camunda-process-test.md) | Deprecated | Camunda Process Test (CPT)  | Before Camunda 8.10 |
| [Job-based user tasks](/versioned_docs/version-8.8/apis-tools/migration-manuals/migrate-to-camunda-user-tasks.md)       | Deprecated | Camunda user tasks          | Before Camunda 8.10 |

:::tip

- You can access these individual component migration guides in the [Camunda 8.8 APIs & tools migration guide](/versioned_docs/version-8.8/apis-tools/migration-manuals/index.md).
- For more information about API changes, see the blog post [Upcoming API Changes in Camunda 8: A Unified and Streamlined Experience](https://camunda.com/blog/2024/12/api-changes-in-camunda-8-a-unified-and-streamlined-experience/).

:::

### Camunda 8.9 breaking changes, deprecations, and supported environment changes

Review the actions required for the following 8.9 changes:

| Type                   | Change                                                                                                              |
| :--------------------- | :------------------------------------------------------------------------------------------------------------------ |
| Breaking change        | [Bug fix: `FormResult.schema` type corrected from object to string](#form-schema-type)                              |
| Breaking change        | [Camunda 8 Run defaults to H2 secondary storage](#h2)                                                               |
| Breaking change        | [Document API response schemas now have explicit required and nullable annotations](#request-response-schema-split) |
| Breaking change        | [Elasticsearch subchart no longer enabled by default](#es-subchart)                                                 |
| Breaking change        | [MCP Client and MCP Remote Client connectors](#mcp)                                                                 |
| Breaking change        | [OpenAPI enum extensions](#enum-extensions)                                                                         |
| Breaking change        | [OpenAPI type-safety enhancements](#type-safety-enhancements)                                                       |
| Breaking change        | [Resource deletion endpoint now returns a response body](#resource-deletion)                                        |
| Breaking change        | [Spring Boot 4.0 default for Camunda Spring Boot Starter](#spring-boot-default)                                     |
| Breaking change        | [Spring Boot 4.0 required for Camunda Spring Boot Starter](#spring-boot)                                            |
| Breaking change        | [`versionTag` returns `null` instead of empty string when absent](#version-tag-null)                                |
| Breaking change        | [Web Modeler changes](#web-modeler)                                                                                 |
| Deprecated             | [Deprecated: enum literals in Orchestration Cluster API v2](#deprecated-enum)                                       |
| Deprecated             | [Deprecated: Operate Connector](#deprecated-operate)                                                                |
| Supported environments | [Supported environment changes](#supported-env)                                                                     |

## Breaking changes

Review actions required for the following breaking changes:

### Bug fix: `FormResult.schema` type corrected from object to string {#form-schema-type}

#### Change

The `schema` property in `FormResult` was incorrectly specified as `type: object` in the OpenAPI contract. The server has always returned it as a JSON `string`. The specification is now corrected.

#### Why

This is a bug fix. The original specification was inaccurate and caused incorrect typing in generated clients.

#### Impact

This impacts the Java client as `io.camunda.client.api.search.response.Form::getSchema()` now returns `String` instead of `Object`.

#### Action

<Tabs groupId="audience" defaultValue="sdk" queryString values={[
{label: 'Official SDK users', value: 'sdk'},
{label: 'Generated-client users', value: 'generated'},
{label: 'Custom integrations', value: 'custom'},
]}>

<TabItem value='sdk'>

Update to the latest SDK version. If you are a Java client user, update any calls to `Form::getSchema()` that cast or process the return value as `Object` — it is now `String`.

</TabItem>
<TabItem value='generated'>

Regenerate your client. If your generated code relied on the incorrect `object` typing for `FormResult.schema`, update it to handle `string`.

</TabItem>
<TabItem value='custom'>

No change needed if your code was already handling the actual `string` response from the server.

</TabItem>
</Tabs>

### Camunda 8 Run defaults to H2 secondary storage {#h2}

#### Change

Camunda 8 Run now uses H2 as the default secondary data storage instead of Elasticsearch.

#### Why

This reduces operational complexity for development and non-high-performance environments.

#### Action

- When running with H2 (or any other RDBMS), Camunda is only compatible with the V2 API. Some features are not available in Operate and Tasklist.
- To continue using features exclusive to the V1 API, run Camunda with Elasticsearch and switch back to V1 mode.
- See [Migrate to the V2 Orchestration Cluster API](/versioned_docs/version-8.8/apis-tools/migration-manuals/migrate-to-camunda-api.md) for more details.

### Document API response schemas now have explicit required and nullable annotations {#request-response-schema-split}

#### Change

The OpenAPI specification now uses distinct schemas for document request and response payloads, and adds explicit `required` / `nullable` annotations to document response types.

#### Why

A shared `DocumentMetadata` schema was used for both creating and reading documents. Because response fields like `customProperties` are always populated by the server but optional in requests, a single schema could not accurately express both contracts. This caused incorrect required/optional behavior in generated clients.

#### Affected schemas

| Schema                               | Change                                                                                                                                                                                                                            |
| :----------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DocumentMetadata`                   | Now request-only. Removed `required: [customProperties]` — `customProperties` is now optional in requests.                                                                                                                        |
| `DocumentMetadataResponse` (new)     | Response schema with required fields: `fileName`, `expiresAt`, `size`, `contentType`, `customProperties`, `processDefinitionId`, `processInstanceKey`. `expiresAt`, `processDefinitionId`, and `processInstanceKey` are nullable. |
| `DocumentReference`                  | `metadata` now references `DocumentMetadataResponse`. Added `required`: `camunda.document.type`, `storeId`, `documentId`, `contentHash`, `metadata`. `contentHash` is now nullable.                                               |
| `DocumentLink`                       | `url` and `expiresAt` are now explicitly required.                                                                                                                                                                                |
| `UserTaskResult.candidateGroups`     | Now marked as required in the response schema.                                                                                                                                                                                    |
| `UserTaskProperties.candidateGroups` | Now marked as required in the response schema.                                                                                                                                                                                    |

#### Impact

The Java client is impacted as `DocumentMetadataImpl` (both `io.camunda.client` and the deprecated `io.camunda.zeebe.client`) now uses `DocumentMetadataResponse` instead of `DocumentMetadata` internally.

#### Action

<Tabs groupId="audience" defaultValue="sdk" queryString values={[
{label: 'Official SDK users', value: 'sdk'},
{label: 'Generated-client users', value: 'generated'},
{label: 'Custom integrations', value: 'custom'},
]}>

<TabItem value='sdk'>

Update to the latest SDK version. The updated response models are included automatically. Re-compile your application to verify.

</TabItem>
<TabItem value='generated'>

1. Regenerate your client from the 8.9 OpenAPI specification.
2. Update any code that references `DocumentMetadata` in response handling — the response type is now `DocumentMetadataResponse`.
3. Review nullable annotations: `DocumentReference.contentHash`, `DocumentMetadataResponse.expiresAt`, `.processDefinitionId`, and `.processInstanceKey` can be `null`.
4. Code that reads `candidateGroups` from user task or job responses can now rely on the field being present without null checks.

</TabItem>
<TabItem value='custom'>

No request-side changes are needed. Response fields listed above are now guaranteed to be present (though some may be `null`). If your code reads document metadata responses and checks for `customProperties` or `candidateGroups` presence, those fields are now always included.

</TabItem>
</Tabs>

### Elasticsearch subchart no longer enabled by default {#es-subchart}

#### Change

The Elasticsearch Helm subchart is no longer enabled by default.

#### Why

With the addition of RDBMS secondary storage options, you must now explicitly specify which secondary storage to use.

#### Action

To continue using Elasticsearch as a subchart, add the following to your `values.yaml`:

```yaml
global:
  elasticsearch:
    enabled: true
elasticsearch:
  enabled: true
```

### MCP Client and MCP Remote Client connectors {#mcp}

#### Change

Breaking changes were introduced in alpha 2 to the element templates and runtime configuration of the MCP Client.

#### Why

This improves the stability and configuration model of the MCP connectors.

#### Action

Update both the MCP Client and MCP Remote Client connectors to use element template version 1. See the [MCP documentation](/components/early-access/alpha/mcp-client/mcp-client.md) for details.

### OpenAPI enum extensions {#enum-extensions}

#### Change

New enum literals were added to support expanded 8.9 functionality.

#### Why

These additions enable new features such as decision instance deletion and user task authorization.

#### Enum members added

| Enum                                                          | New value                  |
| :------------------------------------------------------------ | :------------------------- |
| `BatchOperationTypeEnum` / `BatchOperationTypeFilterProperty` | `DELETE_DECISION_INSTANCE` |
| `ResourceTypeEnum`                                            | `USER_TASK`                |
| `PermissionTypeEnum`                                          | `COMPLETE`                 |

#### Action

<Tabs groupId="audience" defaultValue="sdk" queryString values={[
{label: 'Official SDK users', value: 'sdk'},
{label: 'Generated-client users', value: 'generated'},
{label: 'Custom integrations', value: 'custom'},
]}>

<TabItem value='sdk'>

Update to the latest SDK version for full enum support. Re-compile your application — the compiler will signal any exhaustive match issues.

</TabItem>
<TabItem value='generated'>

1. Regenerate your client from the 8.9 OpenAPI specification.
2. Add fallback/default handling in enum parsing and deserialization.
3. Ensure exhaustive `switch` or pattern matches include a `default` branch.

</TabItem>
<TabItem value='custom'>

Review all code paths that handle these enum values. Add handling for the new values and ensure you have a fallback for unknown values in `switch`/`if-else` chains.

:::note
In Java, the compiler does not signal incomplete enum handling at compile time. Search your codebase for references to `BatchOperationTypeEnum`, `ResourceTypeEnum`, and `PermissionTypeEnum` and verify coverage manually.
:::

</TabItem>
</Tabs>

### OpenAPI type-safety enhancements {#type-safety-enhancements}

#### Change

Several request properties in the OpenAPI contract now use stronger domain types instead of plain `string`, and one schema type was renamed. This completes the type-safety work that began in 8.8.

#### Why

This increases compile-time safety and helps prevent semantic substitution errors — for example, accidentally passing a `tenantId` where a `documentId` is expected. Compilers can now reason about semantic correctness in addition to structural correctness for these fields.

#### Affected fields and types

| Field                                                                           | Old type | New type                                          |
| :------------------------------------------------------------------------------ | :------- | :------------------------------------------------ |
| `CreateDeploymentData.body.tenantId`                                            | `string` | `TenantId`                                        |
| `CreateDocumentData.query.documentId`                                           | `string` | `DocumentId`                                      |
| `SearchCorrelatedMessageSubscriptionsData.body.filter.processDefinitionKey.$eq` | `string` | `ProcessDefinitionKey`                            |
| `CorrelatedMessageSubscriptionFilter.processDefinitionKey`                      | `string` | `ProcessDefinitionKeyFilterProperty \| undefined` |
| `CorrelatedMessageSubscriptionSearchQuery.filter.processDefinitionKey.$eq`      | `string` | `ProcessDefinitionKey`                            |

#### Schema rename

| Old name                             | New name              |
| :----------------------------------- | :-------------------- |
| `ProcessInstanceIncidentSearchQuery` | `IncidentSearchQuery` |

**Example — message subscription filter payload**:

```json title="Before"
{
  "processDefinitionKey": "2251799813685251"
}
```

```json title="After (for example, using $eq)"
{
  "processDefinitionKey": { "$eq": "2251799813685251" }
}
```

#### Action

<Tabs groupId="audience" defaultValue="sdk" queryString values={[
{label: 'Official SDK users', value: 'sdk'},
{label: 'Generated-client users', value: 'generated'},
{label: 'Custom integrations', value: 'custom'},
]}>

<TabItem value='sdk'>

Update to the latest SDK version. The wire-type of these fields does not change, so most SDK users will not need code changes. Re-compile your application to verify.

</TabItem>
<TabItem value='generated'>

1. Regenerate your client from the 8.9 OpenAPI specification.
2. Update type imports and references — in particular, rename `ProcessInstanceIncidentSearchQuery` to `IncidentSearchQuery`.
3. Update request payload construction for `processDefinitionKey` fields to use the new filter property type.

</TabItem>
<TabItem value='custom'>

1. Update request payload construction for `processDefinitionKey` to use the filter object format.
2. Update any references to `ProcessInstanceIncidentSearchQuery` in your code.

</TabItem>
</Tabs>

### Resource deletion endpoint now returns a response body {#resource-deletion}

#### Change

The resource deletion endpoint `POST /resources/{resourceKey}/deletion` now returns a response body instead of an empty response.

#### Why

This provides explicit deletion feedback, making client-side confirmation, auditing, and follow-up workflow logic more reliable.

#### Action

<Tabs groupId="audience" defaultValue="sdk" queryString values={[
{label: 'Official SDK users', value: 'sdk'},
{label: 'Generated-client users', value: 'generated'},
{label: 'Custom integrations', value: 'custom'},
]}>

<TabItem value='sdk'>

Update to the latest SDK version. The updated response model is included automatically.

</TabItem>
<TabItem value='generated'>

Regenerate your client from the 8.9 OpenAPI specification. Update any code that previously expected an empty `204` response to handle the new response body.

</TabItem>
<TabItem value='custom'>

Update your HTTP client code to parse the new JSON response body from the deletion endpoint, rather than treating it as a `204 No Content`.

</TabItem>
</Tabs>

### Spring Boot 4.0 default for Camunda Spring Boot Starter {#spring-boot-default}

#### Change

Starting with 8.9.0, the default [Camunda Spring Boot Starter](/apis-tools/camunda-spring-boot-starter/getting-started.md) (`camunda-spring-boot-starter`) is bundled with Spring Boot 4.0.x. A dedicated `camunda-spring-boot-3-starter` module is available for applications that are not yet ready to upgrade.

#### Action

- Migrate your application to Spring Boot 4.0.x and continue using `camunda-spring-boot-starter`.
- If you cannot migrate yet, switch your dependency to `camunda-spring-boot-3-starter`, which is bundled with Spring Boot 3.5.x. Note that OSS support for Spring Boot 3.5.x ends in June 2026, so plan your migration accordingly.
- See the [Spring Boot support timeline](https://spring.io/projects/spring-boot#support) for details.
- See the [dedicated Spring Boot 3 and 4 modules](/apis-tools/camunda-spring-boot-starter/getting-started.md#dedicated-spring-boot-3-and-4-modules) documentation for more information.

### Spring Boot 4.0 required for Camunda Spring Boot Starter {#spring-boot}

#### Change

Starting with 8.9.0, the [Camunda Spring Boot Starter](/apis-tools/camunda-spring-boot-starter/getting-started.md) requires Spring Boot 4.0.x.

#### Why

OSS support for Spring Boot 3.x ends in June 2026. This change keeps Camunda aligned with the Spring Boot support policy.

#### Action

- Migrate your application to Spring Boot 4.0.x before upgrading to Camunda 8.9.
- See the [Spring Boot support timeline](https://spring.io/projects/spring-boot#support) for details.

### `versionTag` returns `null` instead of empty string when absent {#version-tag-null}

#### Change

API response fields for `versionTag` now return `null` instead of an empty string `""` when no version tag is set.

#### Why

This properly signals absence instead of leaking an internal empty-string default. It aligns `versionTag` with how other optional fields like `businessId` are handled, simplifying absence-detection logic.

#### Action

<Tabs groupId="audience" defaultValue="sdk" queryString values={[
{label: 'Official SDK users', value: 'sdk'},
{label: 'Generated-client users', value: 'generated'},
{label: 'Custom integrations', value: 'custom'},
]}>

<TabItem value='sdk'>

Update to the latest SDK version. Review any code that checks for an empty string (`""`) to detect a missing version tag, and update it to check for `null`.

</TabItem>
<TabItem value='generated'>

Regenerate your client to pick up the updated nullable annotation. Update absence-detection logic from empty-string checks to null checks.

</TabItem>
<TabItem value='custom'>

Update your response-handling code:

```java title="Before"
if (versionTag != null && !versionTag.isEmpty()) {
    // version tag is present
}
```

```java title="After"
if (versionTag != null) {
    // version tag is present
}
```

</TabItem>
</Tabs>

### Web Modeler changes {#web-modeler}

Review the following breaking changes that affect Web Modeler Self-Managed installations, and take action if required:

| Change                                                   | Action required do                                                                                                                    |
| :------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| Logging framework changed from Logback to Apache Log4j 2 | Migrate custom Logback configurations to Log4j 2 format.                                                                              |
| Default logging format changed                           | If you relied on JSON-formatted console output, explicitly configure JSON logging.                                                    |
| Embedded web server changed from Undertow to Tomcat      | Update any Undertow-specific configuration (thread pools, buffers) to Tomcat equivalents.                                             |
| JSON log structure changed                               | Update log parsers: `logger` → `loggerName`, `thread` → `threadContext.name`.                                                         |
| Collaborator invitation behavior aligned                 | Invitation suggestions now only include users who have logged in at least once. Users who have not logged in can be invited by email. |

:::info
See the [8.9 release announcements](/reference/announcements-release-notes/890/890-announcements.md) for more information about these changes.
:::

## Deprecations

Review the actions required for the following deprecations:

### Deprecated: enum literals in Orchestration Cluster API v2 {#deprecated-enum}

The following enum literals are now marked as deprecated:

- `UNSPECIFIED` in `DecisionDefinitionTypeEnum`
- `UNKNOWN` in `DecisionInstanceStateFilterProperty`
- `UNKNOWN` in `DecisionInstanceStateEnum`

These values were reintroduced to preserve backward compatibility but are planned for removal in a future release. Removal will be signaled as a breaking change at that time.

#### Action

Avoid using these values in new integrations. If your code references them, plan to remove these references before the 8.10 release.

### Deprecated: Operate Connector {#deprecated-operate}

The Operate Connector is deprecated following the deprecation of the Operate API.

#### Action

Use the [Orchestration Cluster REST API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md) via the [REST Connector](/components/connectors/protocol/rest.md) going forward.

## Supported environment changes {#supported-env}

Review the following supported environment changes and take action if required:

| Change                                                       | Action required                                      |
| :----------------------------------------------------------- | :--------------------------------------------------- |
| Elasticsearch minimum version raised to **8.19+**            | Upgrade Elasticsearch clusters before moving to 8.9. |
| OpenSearch minimum version raised to **2.19+**               | Upgrade OpenSearch clusters before moving to 8.9.    |
| Elasticsearch **9.2+** and OpenSearch **3.4+** now supported | Consider upgrading for latest features.              |
| **OpenJDK 25** certified                                     | No action needed as OpenJDK 21–25 remain supported.  |

:::info
Learn more about Camunda 8 [supported environments](/reference/supported-environments.md).
:::

## Next steps

Once you have completed the [upgrade steps](#upgrade-steps) in this guide, you should:

1. Re-compile and run your test suite against the 8.9 API.
1. Review [8.9 release announcements](/reference/announcements-release-notes/890/890-announcements.md) for additional context on each change.
