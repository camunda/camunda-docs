---
id: migrate-to-89
title: "Camunda 8.9 APIs & Tools migration guide"
sidebar_label: "Upgrade to Camunda 8.9"
description: "Learn how to migrate your API integrations, SDKs, and generated clients to Camunda 8.9."
toc_max_heading_level: 2
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import PageDescription from '@site/src/components/PageDescription';

<PageDescription />

## About

This guide details the API and SDK changes introduced in Camunda 8.9 that require customer action, including breaking changes, deprecations, and step-by-step migration actions.

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

If you did not already migrate to the following APIs and SDKs during your 8.8 upgrade, Camunda recommends you perform these migrations before you upgrade to 8.9, as this must be performed before 8.10.

If you already performed these migrations during your 8.8 upgrade, proceed to [Camunda 8.9 breaking changes, deprecations, and supported environment changes](#camunda-89-breaking-changes-deprecations-and-supported-environment-changes).

| 8.9 status                                                 | Component/Use                                                                                                           | Migrate to                  | Migrate by          |
| :--------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------- | :-------------------------- | :------------------ |
| <span className="label-highlight yellow">Deprecated</span> | [V1 component APIs](../migration-manuals/migrate-to-camunda-api.md)                                                     | Orchestration Cluster API   | Before Camunda 8.10 |
| <span className="label-highlight yellow">Deprecated</span> | [ZeebeClient](/versioned_docs/version-8.8/apis-tools/migration-manuals/migrate-to-camunda-java-client.md)               | Camunda Java Client         | Before Camunda 8.10 |
| <span className="label-highlight yellow">Deprecated</span> | [Spring Zeebe SDK](/versioned_docs/version-8.8/apis-tools/migration-manuals/migrate-to-camunda-process-test.md)         | Camunda Spring Boot Starter | Before Camunda 8.10 |
| <span className="label-highlight yellow">Deprecated</span> | [Zeebe Process Test (ZPT)](/versioned_docs/version-8.8/apis-tools/migration-manuals/migrate-to-camunda-process-test.md) | Camunda Process Test (CPT)  | Before Camunda 8.10 |
| <span className="label-highlight yellow">Deprecated</span> | [Job-based user tasks](/versioned_docs/version-8.8/apis-tools/migration-manuals/migrate-to-camunda-user-tasks.md)       | Camunda user tasks          | Before Camunda 8.10 |

:::tip
Learn more about API changes in the blog post [Upcoming API Changes in Camunda 8: A Unified and Streamlined Experience](https://camunda.com/blog/2024/12/api-changes-in-camunda-8-a-unified-and-streamlined-experience/).
:::

### Camunda 8.9 breaking changes, deprecations, and supported environment changes

Review the actions required for the following 8.9 changes:

| Type                                                         | Change                                                                                                              |
| :----------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------ |
| <span className="label-highlight red">Breaking change</span> | [Bug fix: `FormResult.schema` type corrected from object to string](#form-schema-type)                              |
| <span className="label-highlight red">Breaking change</span> | [Document API response schemas now have explicit required and nullable annotations](#request-response-schema-split) |
| <span className="label-highlight red">Breaking change</span> | [MCP Client and MCP Remote Client connectors](#mcp)                                                                 |
| <span className="label-highlight red">Breaking change</span> | [OpenAPI enum extensions](#enum-extensions)                                                                         |
| <span className="label-highlight red">Breaking change</span> | [OpenAPI type-safety enhancements](#type-safety-enhancements)                                                       |
| <span className="label-highlight red">Breaking change</span> | [Resource deletion endpoint now returns a response body](#resource-deletion)                                        |
| <span className="label-highlight red">Breaking change</span> | [Search filter validation errors now return structured error collections](#search-filter-validation-errors)         |
| <span className="label-highlight red">Breaking change</span> | [Spring Boot 4.0 default for Camunda Spring Boot Starter](#spring-boot)                                             |
| <span className="label-highlight red">Breaking change</span> | [Type-safe pagination model in the Camunda Java client](#type-safe-pagination)                                      |
| <span className="label-highlight red">Breaking change</span> | [`versionTag` returns `null` instead of empty string when absent](#version-tag-null)                                |
| <span className="label-highlight yellow">Deprecated</span>   | [Deprecated: enum literals in Orchestration Cluster API v2](#deprecated-enum)                                       |

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

### MCP Client and MCP Remote Client connectors {#mcp}

#### Change

Breaking changes were introduced in alpha 2 to the element templates and runtime configuration of the MCP Client.

#### Why

This improves the stability and configuration model of the MCP connectors.

#### Action

Update both the MCP Client and MCP Remote Client connectors to use element template version 1. See the [MCP documentation](/components/connectors/out-of-the-box-connectors/agentic-ai-mcp-client.md) for details.

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

### Spring Boot 4.0 default for Camunda Spring Boot Starter {#spring-boot}

#### Change

Starting with 8.9.0, the default [Camunda Spring Boot Starter](/apis-tools/camunda-spring-boot-starter/getting-started.md) (`camunda-spring-boot-starter`) is bundled with and requires Spring Boot 4.0.x. A dedicated `camunda-spring-boot-3-starter` module is available for applications that are not yet ready to upgrade.

#### Action

- Migrate your application to Spring Boot 4.0.x and continue using `camunda-spring-boot-starter`.
- If you cannot migrate yet, switch your dependency to `camunda-spring-boot-3-starter`, which is bundled with Spring Boot 3.5.x. Note that OSS support for Spring Boot 3.5.x ends in June 2026, so plan your migration accordingly.
- See the [Spring Boot support timeline](https://spring.io/projects/spring-boot#support) for details.
- See the [dedicated Spring Boot 3 and 4 modules](/apis-tools/camunda-spring-boot-starter/getting-started.md#dedicated-spring-boot-3-and-4-modules) documentation for more information.

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

### Search filter validation errors now return structured error collections {#search-filter-validation-errors}

#### Change

REST API search endpoints now collect all filter validation errors and return them together in a single `400 Bad Request` response. Previously, only the first conversion error was returned.

#### Why

This is a bug fix that improves error handling consistency across the REST API. Collecting all validation errors in a single response makes debugging easier.

#### Impact

Search filter validation error responses now contain a list of all validation issues instead of stopping at the first error. The error detail format has changed:

| Aspect                 | Before                                   | After                                                                                                    | Breaking?                              |
| :--------------------- | :--------------------------------------- | :------------------------------------------------------------------------------------------------------- | :------------------------------------- |
| HTTP status code       | `400`                                    | `400`                                                                                                    | No                                     |
| ProblemDetail `title`  | `"Bad Request"`                          | `"INVALID_ARGUMENT"`                                                                                     | Yes                                    |
| ProblemDetail `detail` | `"Failed to parse date-time: [invalid]"` | `"The provided evaluationDate 'invalid' cannot be parsed as a date according to RFC 3339, section 5.6."` | Yes                                    |
| Error collection       | Fails on first error                     | Collects all validation errors                                                                           | Yes (response may contain more errors) |

Affected search endpoints include all endpoints that accept advanced search filters with key fields (such as `processInstanceKey`, `processDefinitionKey`, `scopeKey`) or date fields (such as `startDate`, `endDate`, `creationDate`).

**Who is affected?**

- Customers parsing error response bodies (specifically `title` or `detail` fields) for validation errors → **affected**.
- Customers only checking HTTP status codes → **not affected**.
- Customers sending valid requests → **not affected** (happy path is unchanged).

#### Action

If your code parses error response bodies from search endpoints for specific validation error messages, update it to handle:

- The `title` field value changed from `"Bad Request"` to `"INVALID_ARGUMENT"`.
- The `detail` field now contains more descriptive, structured messages.
- A collection of validation errors in the response body (instead of a single error message).

### Type-safe pagination model in the Camunda Java client {#type-safe-pagination}

#### Change

The Camunda Java client now uses type-safe pagination interfaces (`AnyPage`, `OffsetPage`, `CursorForwardPage`, `CursorBackwardPage`) instead of the previous `SearchRequestPage` class. Each search or statistics endpoint exposes only the pagination methods it actually supports.

Direction methods on `AnyPage` now return style-specific interfaces: `from()` returns `OffsetPage`, `after()` returns `CursorForwardPage`, and `before()` returns `CursorBackwardPage`. This prevents mixing incompatible pagination styles at compile time.

#### Why

The previous API allowed mixing incompatible pagination styles (for example, `.page(p -> p.from(10).after("cursor"))`), which always resulted in a `400 Bad Request` at runtime. This change surfaces that restriction at compile time. The pattern mirrors the existing sort polymorphism design (`TypedSortableRequest`).

#### Impact

This change is **not binary-compatible**. Code compiled against the previous API will fail at runtime without recompilation, because the method signature changed from `page(Consumer<SearchRequestPage>)` to `page(Consumer<AnyPage>)`. All users must recompile their applications.

Additionally, `TypedSearchRequest` now has 4 generic type parameters (previously 3) and `TypedPageableRequest` now has 2 (previously 1), which is a source-breaking change for custom implementations of these interfaces.

#### Migration reference

| Before (8.8)                                       | After (8.9)                                                 |
| :------------------------------------------------- | :---------------------------------------------------------- |
| `import ...search.request.SearchRequestPage`       | `import ...search.page.AnyPage`                             |
| `import ...search.request.SearchRequestOffsetPage` | `import ...search.page.OffsetPage`                          |
| `Consumer<SearchRequestPage>`                      | `Consumer<AnyPage>`                                         |
| `Consumer<SearchRequestOffsetPage>`                | `Consumer<OffsetPage>`                                      |
| `SearchRequestBuilders.searchRequestPage(fn)`      | `SearchRequestBuilders.anyPage(fn)` (old method deprecated) |
| `implements TypedSearchRequest<F, S, Self>`        | `implements TypedSearchRequest<F, S, AnyPage, Self>`        |
| `implements TypedPageableRequest<Self>`            | `implements TypedPageableRequest<AnyPage, Self>`            |
| `SearchRequestPage r = p.from(10)`                 | `OffsetPage r = p.from(10)`                                 |
| `SearchRequestPage r = p.after("c")`               | `CursorForwardPage r = p.after("c")`                        |

#### Action

Update to the latest Java client version and **recompile your application**. If you use inline lambdas with valid pagination patterns (for example, `.page(p -> p.from(5).limit(10))`), your source code does not require changes — but recompilation is mandatory.

If you have explicit references to `SearchRequestPage`, replace them with `AnyPage`. If you store the return value of direction methods (for example, `SearchRequestPage r = p.from(10)`), update the variable type to `OffsetPage`, `CursorForwardPage`, or `CursorBackwardPage` as appropriate.

:::note
This change is specific to the Camunda Java client. Generated clients and custom REST API integrations are not affected.
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

## Next steps

Once you have completed the [upgrade steps](#upgrade-steps) in this guide, you should:

1. Re-compile and run your test suite against the 8.9 API.
1. Review [8.9 release announcements](/reference/announcements-release-notes/890/890-announcements.md) for additional context on each change.
