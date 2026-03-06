---
id: migrate-to-89
title: "Camunda 8.9 API migration guide"
sidebar_label: "Upgrade to Camunda 8.9"
description: "Migrate your API integrations, SDKs, and generated clients to Camunda 8.9. Covers breaking changes, deprecations, and step-by-step migration actions."
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

Migrate your API integrations, SDKs, and generated clients to Camunda 8.9.

## About this guide

This guide covers API and SDK changes introduced in Camunda 8.9 that require customer action. It is organized by the type of integration you maintain:

- **Official SDK users** (Java client, TypeScript SDK, Python SDK, C# SDK)
- **Generated-client users** (clients generated from the Camunda OpenAPI specification)
- **Handwritten integrations** (custom code that calls the Camunda REST API directly)

Each section explains what changed, why, and exactly what you need to do.

:::info
For the full list of changes, see the [8.9 release announcements](/reference/announcements-release-notes/890/890-announcements.md) and [release notes](/reference/announcements-release-notes/890/890-release-notes.md).
:::

## Quick upgrade checklist

Before diving into individual changes, complete the following:

1. Update to the latest official Camunda SDK versions.
2. If you generate clients from OpenAPI, regenerate from the 8.9 specification.
3. Re-run compilation/type checks and address any errors.
4. Review the breaking changes below and apply targeted fixes.

## Breaking changes

### Spring Boot 4.0 required for Camunda Spring Boot Starter

**What changed**: Starting with 8.9.0, the [Camunda Spring Boot Starter](/apis-tools/camunda-spring-boot-starter/getting-started.md) requires Spring Boot 4.0.x.

**Why**: OSS support for Spring Boot 3.x ends in June 2026. This change keeps Camunda aligned with the Spring Boot support policy.

**What to do**:

- Migrate your application to Spring Boot 4.0.x before upgrading to Camunda 8.9.
- See the [Spring Boot support timeline](https://spring.io/projects/spring-boot#support) for details.

### Resource deletion endpoint now returns a response body

**What changed**: The resource deletion endpoint `POST /resources/{resourceKey}/deletion` now returns a response body instead of an empty response.

**Why**: This provides explicit deletion feedback, making client-side confirmation, auditing, and follow-up workflow logic more reliable.

**What to do**:

<Tabs groupId="audience" defaultValue="sdk" queryString values={[
{label: 'Official SDK users', value: 'sdk'},
{label: 'Generated-client users', value: 'generated'},
{label: 'Handwritten integrations', value: 'handwritten'},
]}>

<TabItem value='sdk'>

Update to the latest SDK version. The updated response model is included automatically.

</TabItem>
<TabItem value='generated'>

Regenerate your client from the 8.9 OpenAPI specification. Update any code that previously expected an empty `204` response to handle the new response body.

</TabItem>
<TabItem value='handwritten'>

Update your HTTP client code to parse the new JSON response body from the deletion endpoint, rather than treating it as a `204 No Content`.

</TabItem>
</Tabs>

### OpenAPI type-safety enhancements {#type-safety-enhancements}

**What changed**: Several request properties in the OpenAPI contract now use stronger domain types instead of plain `string`, and one schema type was renamed. This completes the type-safety work that began in 8.8.

**Why**: This increases compile-time safety and helps prevent semantic substitution errors — for example, accidentally passing a `tenantId` where a `documentId` is expected. Compilers can now reason about semantic correctness in addition to structural correctness for these fields.

**Affected fields and types**:

| Field                                                                           | Old type | New type                                          |
| :------------------------------------------------------------------------------ | :------- | :------------------------------------------------ |
| `CreateDeploymentData.body.tenantId`                                            | `string` | `TenantId`                                        |
| `CreateDocumentData.query.documentId`                                           | `string` | `DocumentId`                                      |
| `SearchCorrelatedMessageSubscriptionsData.body.filter.processDefinitionKey.$eq` | `string` | `ProcessDefinitionKey`                            |
| `CorrelatedMessageSubscriptionFilter.processDefinitionKey`                      | `string` | `ProcessDefinitionKeyFilterProperty \| undefined` |
| `CorrelatedMessageSubscriptionSearchQuery.filter.processDefinitionKey.$eq`      | `string` | `ProcessDefinitionKey`                            |

**Schema rename**:

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

**What to do**:

<Tabs groupId="audience" defaultValue="sdk" queryString values={[
{label: 'Official SDK users', value: 'sdk'},
{label: 'Generated-client users', value: 'generated'},
{label: 'Handwritten integrations', value: 'handwritten'},
]}>

<TabItem value='sdk'>

Update to the latest SDK version. The wire-type of these fields does not change, so most SDK users will not need code changes. Re-compile your application to verify.

</TabItem>
<TabItem value='generated'>

1. Regenerate your client from the 8.9 OpenAPI specification.
2. Update type imports and references — in particular, rename `ProcessInstanceIncidentSearchQuery` to `IncidentSearchQuery`.
3. Update request payload construction for `processDefinitionKey` fields to use the new filter property type.

</TabItem>
<TabItem value='handwritten'>

1. Update request payload construction for `processDefinitionKey` to use the filter object format.
2. Update any references to `ProcessInstanceIncidentSearchQuery` in your code.

</TabItem>
</Tabs>

### OpenAPI enum extensions {#enum-extensions}

**What changed**: New enum literals were added to support expanded 8.9 functionality.

**Why**: These additions enable new features such as decision instance deletion and user task authorization.

**Added enum members**:

| Enum                                                          | New value                  |
| :------------------------------------------------------------ | :------------------------- |
| `BatchOperationTypeEnum` / `BatchOperationTypeFilterProperty` | `DELETE_DECISION_INSTANCE` |
| `ResourceTypeEnum`                                            | `USER_TASK`                |
| `PermissionTypeEnum`                                          | `COMPLETE`                 |

**What to do**:

<Tabs groupId="audience" defaultValue="sdk" queryString values={[
{label: 'Official SDK users', value: 'sdk'},
{label: 'Generated-client users', value: 'generated'},
{label: 'Handwritten integrations', value: 'handwritten'},
]}>

<TabItem value='sdk'>

Update to the latest SDK version for full enum support. Re-compile your application — the compiler will signal any exhaustive match issues.

</TabItem>
<TabItem value='generated'>

1. Regenerate your client from the 8.9 OpenAPI specification.
2. Add fallback/default handling in enum parsing and deserialization.
3. Ensure exhaustive `switch` or pattern matches include a `default` branch.

</TabItem>
<TabItem value='handwritten'>

Review all code paths that handle these enum values. Add handling for the new values and ensure you have a fallback for unknown values in `switch`/`if-else` chains.

:::note
In Java, the compiler does not signal incomplete enum handling at compile time. Search your codebase for references to `BatchOperationTypeEnum`, `ResourceTypeEnum`, and `PermissionTypeEnum` and verify coverage manually.
:::

</TabItem>
</Tabs>

### Bug fix: `FormResult.schema` type corrected from object to string {#form-schema-type}

**What changed**: The `schema` property in `FormResult` was incorrectly specified as `type: object` in the OpenAPI contract. The server has always returned it as a JSON `string`. The specification is now corrected.

**Why**: This is a bug fix. The original specification was inaccurate and caused incorrect typing in generated clients.

**Java client impact**: `io.camunda.client.api.search.response.Form::getSchema()` now returns `String` instead of `Object`.

**What to do**:

<Tabs groupId="audience" defaultValue="sdk" queryString values={[
{label: 'Official SDK users', value: 'sdk'},
{label: 'Generated-client users', value: 'generated'},
{label: 'Handwritten integrations', value: 'handwritten'},
]}>

<TabItem value='sdk'>

Update to the latest SDK version. If you are a Java client user, update any calls to `Form::getSchema()` that cast or process the return value as `Object` — it is now `String`.

</TabItem>
<TabItem value='generated'>

Regenerate your client. If your generated code relied on the incorrect `object` typing for `FormResult.schema`, update it to handle `string`.

</TabItem>
<TabItem value='handwritten'>

No change needed if your code was already handling the actual `string` response from the server.

</TabItem>
</Tabs>

### `versionTag` returns `null` instead of empty string when absent {#version-tag-null}

**What changed**: API response fields for `versionTag` now return `null` instead of an empty string `""` when no version tag is set.

**Why**: This properly signals absence instead of leaking an internal empty-string default. It aligns `versionTag` with how other optional fields like `businessId` are handled, simplifying absence-detection logic.

**What to do**:

<Tabs groupId="audience" defaultValue="sdk" queryString values={[
{label: 'Official SDK users', value: 'sdk'},
{label: 'Generated-client users', value: 'generated'},
{label: 'Handwritten integrations', value: 'handwritten'},
]}>

<TabItem value='sdk'>

Update to the latest SDK version. Review any code that checks for an empty string (`""`) to detect a missing version tag, and update it to check for `null`.

</TabItem>
<TabItem value='generated'>

Regenerate your client to pick up the updated nullable annotation. Update absence-detection logic from empty-string checks to null checks.

</TabItem>
<TabItem value='handwritten'>

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

### MCP Client and MCP Remote Client connectors

**What changed**: Breaking changes were introduced in alpha 2 to the element templates and runtime configuration of the MCP Client.

**Why**: This improves the stability and configuration model of the MCP connectors.

**What to do**: Update both the MCP Client and MCP Remote Client connectors to use element template version 1. See the [MCP documentation](/components/early-access/alpha/mcp-client/mcp-client.md) for details.

### Camunda 8 Run defaults to H2 secondary storage

**What changed**: Camunda 8 Run now uses H2 as the default secondary data storage instead of Elasticsearch.

**Why**: This reduces operational complexity for development and non-high-performance environments.

**What to do**:

- When running with H2 (or any other RDBMS), Camunda is only compatible with the V2 API. Some features are not available in Operate and Tasklist.
- To continue using features exclusive to the V1 API, run Camunda with Elasticsearch and switch back to V1 mode.
- See [Migrate to the V2 Orchestration Cluster API](/apis-tools/migration-manuals/migrate-to-camunda-api.md) for more details.

### Elasticsearch subchart no longer enabled by default

**What changed**: The Elasticsearch Helm subchart is no longer enabled by default.

**Why**: With the addition of RDBMS secondary storage options, you must now explicitly specify which secondary storage to use.

**What to do**: To continue using Elasticsearch as a subchart, add the following to your `values.yaml`:

```yaml
global:
  elasticsearch:
    enabled: true
elasticsearch:
  enabled: true
```

### Web Modeler changes

The following breaking changes affect Web Modeler Self-Managed installations:

| Change                                                       | What to do                                                                                                                            |
| :----------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| **Logging framework changed from Logback to Apache Log4j 2** | Migrate custom Logback configurations to Log4j 2 format.                                                                              |
| **Default logging format changed**                           | If you relied on JSON-formatted console output, explicitly configure JSON logging.                                                    |
| **Embedded web server changed from Undertow to Tomcat**      | Update any Undertow-specific configuration (thread pools, buffers) to Tomcat equivalents.                                             |
| **JSON log structure changed**                               | Update log parsers: `logger` → `loggerName`, `thread` → `threadContext.name`.                                                         |
| **Collaborator invitation behavior aligned**                 | Invitation suggestions now only include users who have logged in at least once. Users who have not logged in can be invited by email. |

See the [8.9 release announcements](/reference/announcements-release-notes/890/890-announcements.md) for full details on each change.

## Deprecations

### Deprecated enum literals in Orchestration Cluster API v2

The following enum literals are now marked as deprecated:

- `UNSPECIFIED` in `DecisionDefinitionTypeEnum`
- `UNKNOWN` in `DecisionInstanceStateFilterProperty`
- `UNKNOWN` in `DecisionInstanceStateEnum`

These values were reintroduced to preserve backward compatibility but are planned for removal in a future release. Removal will be signaled as a breaking change at that time.

**What to do**: Avoid using these values in new integrations. If your code references them, plan to remove those references before the next minor release.

### Deprecated: Operate Connector

The Operate Connector is deprecated following the deprecation of the Operate API. Use the [Orchestration Cluster REST API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md) via the [REST Connector](/components/connectors/protocol/rest.md) going forward.

## Supported environment changes

Review the following environment changes before upgrading:

| Change                                                       | Action                                               |
| :----------------------------------------------------------- | :--------------------------------------------------- |
| Elasticsearch minimum version raised to **8.19+**            | Upgrade Elasticsearch clusters before moving to 8.9. |
| OpenSearch minimum version raised to **2.19+**               | Upgrade OpenSearch clusters before moving to 8.9.    |
| Elasticsearch **9.2+** and OpenSearch **3.4+** now supported | Consider upgrading for latest features.              |
| **OpenJDK 25** certified                                     | No action needed — OpenJDK 21–25 are all supported.  |

## Next steps

1. Complete the [quick upgrade checklist](#quick-upgrade-checklist) at the top of this guide.
2. Work through each breaking change section relevant to your integration type.
3. Re-compile and run your test suite against the 8.9 API.
4. Review [8.9 release announcements](/reference/announcements-release-notes/890/890-announcements.md) for additional context on each change.
