---
id: 890-announcements
title: "8.9 Release announcements"
sidebar_label: Release announcements
description: "Supported environment changes and breaking changes or deprecations for the Camunda 8.9 release."
toc_max_heading_level: 3
---

import DeployDiagramImg from '../../img/deploy-diagram-modal.png';

Supported environment changes and breaking changes or deprecations for the Camunda 8.9 release.

| Minor release date | Scheduled end of maintenance | Release notes                                                                        | Upgrade guides |
| ------------------ | ---------------------------- | ------------------------------------------------------------------------------------ | -------------- |
| 14 April 2026      | 13 October 2028              | [8.9 release notes](/reference/announcements-release-notes/890/890-release-notes.md) | -              |

:::info 8.9 resources

- See [release notes](/reference/announcements-release-notes/890/890-release-notes.md) to learn more about new features and enhancements.
- Refer to the [quality board](https://github.com/orgs/camunda/projects/187/views/21) for an overview of known bugs by component and severity.
  :::

## Supported environments

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--change">Change</span>
</div>
<div className="release-announcement-content">

#### Elasticsearch minimum version raised to 8.19+

The minimum supported Elasticsearch version for the Orchestration cluster and Optimize is now 8.19 (previously 8.16+).

- This aligns with the Elasticsearch 8 versions maintained by Elastic as of April 2025.
- The default Elasticsearch version used by Camunda 8 Run, Docker Compose, and Helm templates has been updated to `8.19.9+` accordingly.
- Upgrade your Elasticsearch clusters before moving to Camunda 8.9 to avoid compatibility issues.
- For best results, Camunda recommends upgrading to the latest supported Elasticsearch 9.2+ to take advantage of new features and improvements.

<p className="link-arrow">[OpenSearch and Elasticsearch support](/reference/supported-environments.md#opensearch-and-elasticsearch-support)</p>

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--change">Change</span>
</div>
<div className="release-announcement-content">

#### OpenSearch minimum version raised to 2.19+

The minimum supported OpenSearch version for the Orchestration cluster and Optimize is now 2.19+ (previously 2.17+).

- This aligns with the OpenSearch versions maintained as of April 2025.
- Upgrade your OpenSearch clusters before moving to Camunda 8.9 to avoid compatibility issues.
- For best results, Camunda recommends upgrading to the latest supported OpenSearch 3.4+ to take advantage of new features and improvements.

<p className="link-arrow">[Supported environments](/reference/supported-environments.md)</p>

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--new">New</span>
</div>
<div className="release-announcement-content">

#### AWS regions added

Camunda 8.9 adds support for the following new regions in Camunda 8 SaaS.

- Paris, Europe (eu-west-3)
- North America, Ohio (us-east-2)

<p className="link-arrow">[Supported AWS regions](/components/saas/regions.md#amazon-web-services-aws-regions)</p>

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--new">New</span>
</div>
<div className="release-announcement-content">

#### OpenJDK 25 support

Camunda 8.9 adds certification for OpenJDK 25 across the Orchestration Cluster, Connectors, Optimize, and supporting tooling. You can now run Self-Managed deployments on OpenJDK 21–25 without additional configuration changes.

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--new">New</span>
</div>
<div className="release-announcement-content">

#### Support for latest Elasticsearch and OpenSearch versions

Camunda 8.9 now supports Elasticsearch 9.2+ and OpenSearch 3.4+, allowing you to take advantage of the latest database features and releases.

<p className="link-arrow">[OpenSearch and Elasticsearch support](/reference/supported-environments.md#opensearch-and-elasticsearch-support)</p>

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--change">Change</span>
</div>
<div className="release-announcement-content">

#### Keycloak 25.x no longer supported

Camunda 8.9 drops support for Keycloak 25.x. Only Keycloak 26.x is now supported for Management Identity.

- Keycloak 25.x has reached end of life and is no longer maintained by the Keycloak project.
- This aligns with [Keycloak's updated release strategy](https://www.keycloak.org/2024/10/release-updates), which moved to quarterly minor releases.
- Upgrade your Keycloak instance to 26.x before moving to Camunda 8.9.

<p className="link-arrow">[Supported environments](/reference/supported-environments.md)</p>

</div>
</div>

## Key changes

### Agentic orchestration

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--breaking-change">Breaking change</span>
</div>
<div className="release-announcement-content">

#### MCP Client and MCP Remote Client connectors

Breaking changes are [introduced in alpha 2](/reference/announcements-release-notes/890/890-release-notes.md#890-alpha2) to the element templates and the runtime configuration of the MCP Client.

To resolve this, you must update both the MCP Client and MCP Remote Client connectors to use the element template version 1.

:::info
To learn more, see the [MCP](/components/early-access/alpha/mcp-client/mcp-client.md) documentation.
:::

</div>
</div>

### APIs & tools

:::note API upgrade checklist for 8.9

- Update to the latest official Camunda SDK versions.
- If you generate clients from OpenAPI, regenerate from the 8.9 specification.
- Re-run compilation/type checks and address enum-handling or type-mapping updates.
- Review message subscription filter payload construction for `processDefinitionKey`.

:::

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--breaking-change">Breaking change</span>
</div>
<div className="release-announcement-content">

#### Camunda Spring Boot Starter now requires Spring Boot 4.0.x

Starting with 8.9.0-alpha3, the [Camunda Spring Boot Starter](../../../apis-tools/camunda-spring-boot-starter/getting-started.md) requires Spring Boot 4.0.x.

To remain compatible, migrate your application to Spring Boot 4.0.x.

This change aligns with the Spring Boot support policy, as OSS support for Spring Boot 3.x ends in June 2026. See the [Spring Boot support timeline](https://spring.io/projects/spring-boot#support).

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--breaking-change">Breaking change</span>
</div>
<div className="release-announcement-content">
#### Resource deletion endpoint now has response body
Starting with 8.9.0-alpha4, the resource deletion endpoint `POST /resources/{resourceKey}/deletion` in the [Orchestration Cluster API](../../../apis-tools/orchestration-cluster-api-rest/specifications/delete-resource.api.mdx) returns a response body.

This provides explicit deletion feedback, making client-side confirmation, auditing, and follow-up workflow logic more reliable.

If you use an SDK, update to the latest version for compiler and model support.

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--breaking-change">Breaking change</span>
</div>
<div className="release-announcement-content">

#### OpenAPI type-safety enhancements for request and schema types

Starting with 8.9.0, parts of the OpenAPI contract use stronger domain types and one schema rename to improve semantic correctness in client applications.

This increases compile-time safety and helps prevent semantic substitution errors in typed integrations.

Affected contract updates include:

- `CreateDeploymentData.body.tenantId`: `string` → `TenantId`
- `CreateDocumentData.query.documentId`: `string` → `DocumentId`
- `SearchCorrelatedMessageSubscriptionsData.body.filter.processDefinitionKey.$eq`: `string` → `ProcessDefinitionKey`
- `CorrelatedMessageSubscriptionFilter.processDefinitionKey`: `string` → `ProcessDefinitionKeyFilterProperty | undefined`
- `CorrelatedMessageSubscriptionSearchQuery.filter.processDefinitionKey.$eq`: `string` → `ProcessDefinitionKey`
- `ProcessInstanceIncidentSearchQuery` renamed to `IncidentSearchQuery`

Example request payload update for message subscription filtering:

- Before: `"processDefinitionKey": "2251799813685251"`
- After (for example): `"processDefinitionKey": { "$eq": "2251799813685251" }`

What to do:

- Official SDK users: update to the latest SDK version.
- Generated-client users: regenerate clients and update type mappings/imports.
- Handwritten integrations: update request payload construction and affected typed helpers.

<p className="link-arrow">[8.9 API migration guide](../../../apis-tools/migration-manuals/migrate-to-89.md#type-safety-enhancements)</p>

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--breaking-change">Breaking change</span>
</div>
<div className="release-announcement-content">

#### OpenAPI enum extensions for new 8.9 capabilities

Starting with 8.9.0, new enum literals were added to support expanded functionality.

This improves feature coverage, but typed or exhaustive enum-handling code paths may require updates to preserve full completeness checks.

Added literals include:

- `BatchOperationTypeEnum` / `BatchOperationTypeFilterProperty`: `DELETE_DECISION_INSTANCE`
- `ResourceTypeEnum`: `USER_TASK`
- `PermissionTypeEnum`: `COMPLETE`

What to do:

- Official SDK users: update to the latest SDK version.
- Generated-client users: regenerate and add fallback/default handling for enum parsing and matching.
- Handwritten integrations: review enum branches (for example exhaustive `switch`/pattern matches) and add handling for new values.

<p className="link-arrow">[8.9 API migration guide](../../../apis-tools/migration-manuals/migrate-to-89.md#enum-extensions)</p>

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--breaking-change">Breaking change</span>
</div>
<div className="release-announcement-content">

#### Bug fix: `FormResult.schema` type corrected from object to string

The `schema` property in the `FormResult` response was incorrectly specified as `type: object` in the OpenAPI contract, but the server has always returned it as a JSON `string`. This specification bug is now fixed.

This is a bug fix that aligns the OpenAPI contract with actual server behavior, improving correctness for typed client integrations. Applications already handling the runtime `string` value are unaffected.

The Camunda Java client is also affected: `io.camunda.client.api.search.response.Form::getSchema()` now returns `String` instead of `Object`. If your Java code casts or processes the return value as `Object`, update it to use `String`.

What to do:

- Official SDK users: update to the latest SDK version.
- Java client users: update calls to `Form::getSchema()` to handle the `String` return type instead of `Object`.
- Generated-client users: regenerate your client. If your generated code relied on the incorrect `object` typing, update it to handle `string`.
- Handwritten integrations: no change needed if you were already handling the actual `string` response.

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--breaking-change">Breaking change</span>
</div>
<div className="release-announcement-content">

#### `versionTag` now returns `null` instead of empty string when absent

Starting with 8.9.0, API response fields for `versionTag` return `null` instead of an empty string `""` when no version tag is set. This properly indicates absence rather than leaking an internal default.

Previously, customers had to handle both empty string and absent/null to determine whether a version tag was set. This change simplifies that logic by using `null` consistently to signal absence, aligning with how other optional fields like `businessId` are handled.

What to do:

- If your code checks for an empty string (`""`) to detect a missing version tag, update it to check for `null` instead.
- Official SDK users: update to the latest SDK version.
- Generated-client users: regenerate your client to pick up the updated nullable annotation.

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--breaking-change">Breaking change</span>
</div>
<div className="release-announcement-content">

#### Document API response schemas now have explicit required and nullable annotations

Starting with 8.9.0, the OpenAPI specification uses distinct schemas for document request and response payloads, and adds explicit `required` / `nullable` annotations to document response types.

Previously, a shared `DocumentMetadata` schema was used for both creating and reading documents. Because response fields like `customProperties` are always populated by the server, but optional in requests, a single schema could not accurately express both contracts. This caused incorrect required/optional behavior in generated clients.

What changed:

- **`DocumentMetadata`**: now request-only. `customProperties` is no longer marked as required (it was previously required even in requests).
- **`DocumentMetadataResponse`** (new): response schema with `fileName`, `expiresAt`, `size`, `contentType`, `customProperties`, `processDefinitionId`, and `processInstanceKey` all marked as required. `expiresAt`, `processDefinitionId`, and `processInstanceKey` are nullable.
- **`DocumentReference`**: `metadata` now references `DocumentMetadataResponse`. Fields `camunda.document.type`, `storeId`, `documentId`, `contentHash`, and `metadata` are now explicitly required. `contentHash` is nullable.
- **`DocumentLink`**: `url` and `expiresAt` are now explicitly required.
- **`candidateGroups` (user task / job API)**: now explicitly marked as a required field in response schemas (`UserTaskResult`, `UserTaskProperties`).

What to do:

- Official SDK users: update to the latest SDK version.
- Generated-client users: regenerate your client. Update any code that references `DocumentMetadata` in response handling — it is now `DocumentMetadataResponse`. Review nullable annotations on `DocumentReference.contentHash` and `DocumentMetadataResponse` fields.
- Handwritten integrations: no request-side changes needed. Response fields listed above are now guaranteed to be present (though some may be `null`).

<p className="link-arrow">[8.9 API migration guide](../../../apis-tools/migration-manuals/migrate-to-89.md#request-response-schema-split)</p>

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--new">New</span>
</div>
<div className="release-announcement-content">

#### Task permission management and new task-worker role

With task permission management, you can assign restricted permissions for user task operations.

Camunda 8.9 introduces a new built-in Identity role, `task-worker`. Use this role to grant users limited access to work on tasks without assigning broader permissions.

<p className="link-arrow">[Task permission management](../../../../components/tasklist/user-task-authorization)</p>

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--deprecated">Deprecated</span>
</div>
<div className="release-announcement-content">

#### Deprecated enum literals in Orchestration Cluster API v2

The following enum literals in the V2 Orchestration Cluster API are now marked as deprecated:

- `UNSPECIFIED` in `DecisionDefinitionTypeEnum`
- `UNKNOWN` in `DecisionInstanceStateFilterProperty`
- `UNKNOWN` in `DecisionInstanceStateEnum`

These values were reintroduced and are now explicitly deprecated to preserve backward compatibility while signaling planned cleanup.

Avoid these values in new integrations. They are planned for removal in a future release, where removal will be a breaking change.

<p className="link-arrow">[Orchestration Cluster API reference](../../../apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md)</p>

</div>
</div>

### Connectors

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--deprecated">Deprecated</span>
</div>
<div className="release-announcement-content">

#### Deprecated: Operate Connector

The Operate Connector is deprecated, following the deprecation of the Operate API in Camunda 8.9 (see [Deprecated: Operate and Tasklist v1 REST APIs](/reference/announcements-release-notes/880/880-announcements.md#deprecated-operate-and-tasklist-v1-rest-apis)).

Going forward, you can use the [Orchestration Cluster REST API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md) via the [REST Connector](/components/connectors/protocol/rest.md).

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--change">Change</span>
</div>
<div className="release-announcement-content">

#### Inbound connectors now support older process versions

Starting with Camunda 8.9, inbound connectors are activated not only for the latest process version, but also for older process versions that have active instances waiting on message subscriptions.

Inbound connectors now remain active for any process version that has instances waiting on message subscriptions. This ensures that running process instances can continue to receive messages through inbound connectors, even after a newer version of the process is deployed.

This change improves the reliability of long-running processes that depend on inbound connectors to receive external events.

<p className="link-arrow">[Inbound connector lifecycle](/components/connectors/advanced-topics/inbound-lifecycle.md)</p>

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--new">New</span>
</div>
<div className="release-announcement-content">

#### Virtual threads support

Camunda 8.9 provides support for virtual threads in the connector runtime. Virtual threads are enabled by default for outbound connectors.

See [connector runtime performance](/self-managed/components/connectors/performance.md) for more information on optimizing connector performance with virtual threads.

:::info
To learn more, see the [8.9.0-alpha2 release notes](/reference/announcements-release-notes/890/890-release-notes.md).
:::

</div>
</div>

### Data

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--change">Change</span>
</div>
<div className="release-announcement-content">

#### Hierarchy-aware retention for process instance data

Starting with Camunda 8.9, retention of process instance data in Elasticsearch/OpenSearch secondary storage becomes hierarchy-aware, meaning child process instances are retained as long as their root process instance is retained.

You can control the retention behavior via the process instance retention mode configuration.

<p className="link-arrow">[Hierarchy-aware retention](/self-managed/components/orchestration-cluster/core-settings/concepts/data-retention.md#hierarchy-aware-retention)</p>

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--breaking-change">Breaking change</span>
</div>
<div className="release-announcement-content">

#### Camunda 8 Run with H2 as the default secondary data storage

Camunda 8 Run now uses H2 as the default secondary data storage, instead of Elasticsearch.

When running with H2 (or any other RDBMS) as secondary storage, Camunda is only compatible with the V2 API. As a result, some features are not available in Operate and Tasklist. See [Migrate to the V2 Orchestration Cluster API](/apis-tools/migration-manuals/migrate-to-camunda-api.md) for more details.

To continue using features exclusive to the V1 API, you must run Camunda with Elasticsearch and switch back to V1 mode.

:::info
To learn more, see the [8.9.0-alpha3 release notes](/reference/announcements-release-notes/890/890-release-notes.md#use-h2-for-data-storage).
:::

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--new">New</span>
</div>
<div className="release-announcement-content">

#### Amazon Aurora secondary storage

Camunda 8.9 introduces Amazon Aurora as a secondary data store for orchestration clusters.

:::info
To learn more, see the [8.9.0-alpha3 release notes](/reference/announcements-release-notes/890/890-release-notes.md#use-amazon-aurora-for-secondary-storage).
:::

</div>
</div>

### Deployment

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--breaking-change">Breaking change</span>
</div>
<div className="release-announcement-content">

#### Helm chart: `extraConfiguration` format changed from map to ordered list

The `<componentName>.extraConfiguration` Helm value has changed from a **map** (key-value pairs) to an **ordered list** of `file`/`content` entries. This ensures configuration entries are always applied in the order you define them, since maps in Go templates do not guarantee iteration order.

The old map format is **not supported** in Camunda 8.9. If you upgrade without converting to the new list format, Helm will fail during template rendering.

**Before (8.8 — map):**

```yaml
identity:
  extraConfiguration:
    custom-logging.yaml: |
      logging:
        level:
          ROOT: DEBUG
```

**After (8.9 — ordered list):**

```yaml
identity:
  extraConfiguration:
    - file: custom-logging.yaml
      content: |
        logging:
          level:
            ROOT: DEBUG
```

See [Migrate extraConfiguration from 8.8 to 8.9](/self-managed/deployment/helm/configure/application-configs.md#migrate-extraconfiguration-from-88-to-89) for detailed migration steps.

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--breaking-change">Breaking change</span>
</div>
<div className="release-announcement-content">

#### Helm chart: Helm CLI v4 does not support duplicate environment variable names

Helm v4 enforces that environment variables in a rendered kubernetes manifest must be unique. If your `values.yaml` overrides an environment variable also set by the chart, you might encounter an error. Read more about it in [Helm v4](/self-managed/deployment/helm/operational-tasks/helm-v4.md)

</div>
</div>


<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--breaking-change">Breaking change</span>
</div>
<div className="release-announcement-content">

#### Elasticsearch subchart no longer enabled by default

Previously, the Elasticsearch subchart was enabled by default. To use OpenSearch, you would need to disable Elasticsearch and enable OpenSearch.

With the inclusion of RDBMS as a secondary storage option and the [deprecation of Bitnami subcharts](#helm-chart-bitnami-subcharts-deprecated) (including the bundled Elasticsearch subchart), there is no longer a default secondary storage type.

- Camunda recommends setting `orchestration.data.secondaryStorage.type` explicitly in your `values.yaml`.
- The chart can auto-detect the type from `global.elasticsearch.enabled` or `global.opensearch.enabled`, but Helm will fail with a validation error if no secondary storage is configured at all.
- Alternatively, set `global.noSecondaryStorage: true` to run in engine-only mode without secondary storage.

:::note
To continue using Elasticsearch provided as a subchart, you must add `global.elasticsearch.enabled: true`, `elasticsearch.enabled: true`, and `orchestration.data.secondaryStorage.type: elasticsearch` to your `values.yaml`.
:::

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--new">New</span>
</div>
<div className="release-announcement-content">

#### Secure connectivity (AWS PrivateLink) for SaaS

Camunda 8.9 introduces Secure connectivity for AWS-hosted Orchestration clusters in Camunda 8 SaaS.

Secure connectivity enables private inbound access from your AWS VPC to your cluster using AWS PrivateLink, without routing traffic over the public internet.

- Applies per cluster.
- Supports inbound connectivity only.
- Public connectivity remains enabled.

<p className="link-arrow">[Secure connectivity (AWS PrivateLink)](../../../components/saas/secure-connectivity/index.md)</p>

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--new">New</span>
</div>
<div className="release-announcement-content">

#### Cluster variables supported

Camunda 8.9 introduces cluster variables, letting you centrally manage configuration across your cluster.

:::info
To learn more, see the [8.9.0-alpha3 release notes](/reference/announcements-release-notes/890/890-release-notes.md#manage-configuration-with-cluster-variables).
:::

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--new">New</span>
</div>
<div className="release-announcement-content">

#### Helm chart `values.yaml` options for RDBMS

Camunda 8.9 adds RDBMS configuration options to the Helm chart's `values.yaml` file, providing a first-class alternative to Elasticsearch and OpenSearch. Configure database connections directly under `orchestration.data.secondaryStorage.rdbms`, including JDBC URL and authentication. See [Configure RDBMS in Helm charts](/self-managed/deployment/helm/configure/database/rdbms.md).

- Supports all databases in the [RDBMS support policy](/self-managed/concepts/databases/relational-db/rdbms-support-policy.md): PostgreSQL, Oracle, MariaDB, MySQL, Microsoft SQL Server, H2, and Amazon Aurora.
- Advanced authentication and custom JDBC drivers can be configured via init containers or mounted volumes.

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--new">New</span>
</div>
<div className="release-announcement-content">

#### Standardized JDBC driver management for RDBMS

Camunda 8.9 adds a standardized JDBC driver management system for manual installations.

- A new `/driver-lib` directory separates Camunda-bundled drivers from customer-supplied ones.
- Customers can add and configure their own drivers (for example, Oracle JDBC), while maintaining full compliance and version control.

:::info
To learn more, see the [8.9.0-alpha1 release notes](/reference/announcements-release-notes/890/890-release-notes.md#jdbc-driver-management-for-rdbms-integrations).
:::

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--breaking-change">Breaking change</span>
</div>
<div className="release-announcement-content">

#### Helm chart: Deprecated secret keys removed

Secret configuration keys that were deprecated in Camunda 8.8 are now removed in 8.9. Using any of the removed keys in your `values.yaml` will cause a hard failure during `helm install` or `helm upgrade`.

Affected keys by component:

| Component             | Keys removed in 8.9                                                                                                             |
| :-------------------- | :------------------------------------------------------------------------------------------------------------------------------ |
| License               | `global.license.key`, `global.license.existingSecret`, `global.license.existingSecretKey`                                       |
| Elasticsearch auth    | `global.elasticsearch.auth.password`, `global.elasticsearch.auth.existingSecret`, `global.elasticsearch.auth.existingSecretKey` |
| OpenSearch auth       | `global.opensearch.auth.password`, `global.opensearch.auth.existingSecret`, `global.opensearch.auth.existingSecretKey`          |
| Identity auth         | `global.identity.auth.{admin,identity,optimize}.existingSecret` and `.existingSecretKey`                                        |
| Document Store        | `global.documentStore.type.{aws,gcp}.existingSecret` and related keys                                                           |
| Identity              | `identity.firstUser.password`, `identity.externalDatabase.password`, and their `existingSecret`/`existingSecretKey` variants    |
| Connectors            | `connectors.security.authentication.oidc.existingSecret`, `.existingSecretKey`                                                  |
| Orchestration Cluster | `orchestration.security.authentication.oidc.existingSecret`, `.existingSecretKey`                                               |
| Web Modeler           | `webModeler.restapi.externalDatabase.password`, `webModeler.restapi.mail.smtpPassword`, and their `existingSecret` variants     |

Migrate to the new secret configuration pattern using `*.secret.existingSecret` and `*.secret.existingSecretKey`, or `*.secret.inlineSecret` for non-production environments.

<p className="link-arrow">[Secret management](/self-managed/deployment/helm/configure/secret-management.md)</p>

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--breaking-change">Breaking change</span>
</div>
<div className="release-announcement-content">

#### Helm chart: Secret auto-generation removed

The Helm chart no longer automatically generates secrets.

The configuration keys `global.secrets.autoGenerated`, `global.secrets.name`, and `global.secrets.annotations` are removed in 8.9.

All secrets must now be explicitly provided via Kubernetes Secrets referenced in your `values.yaml`.

<p className="link-arrow">[Secret management](/self-managed/deployment/helm/configure/secret-management.md)</p>

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--breaking-change">Breaking change</span>
</div>
<div className="release-announcement-content">

#### Helm chart: Default REST port unified to 8080

The Orchestration component's default HTTP port has changed from 8090 to 8080 (`orchestration.service.httpPort`).

This aligns the Helm chart with the Orchestration Cluster's default configuration.

If you have hardcoded port 8090 in network policies, Ingress rules, health check probes, or service mesh configuration, update these references to 8080 or explicitly set `orchestration.service.httpPort: 8090` in your `values.yaml`.

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--deprecated">Deprecated</span>
</div>
<div className="release-announcement-content">

#### Helm chart: TLS secret configuration pattern

The legacy TLS secret configuration using `*.tls.existingSecret` is deprecated.

You should migrate to the new pattern using `*.tls.secret.existingSecret`.

Affected paths:

- `global.elasticsearch.tls.existingSecret` changes to `global.elasticsearch.tls.secret.existingSecret`
- `global.opensearch.tls.existingSecret` changes to `global.opensearch.tls.secret.existingSecret`
- `console.tls.existingSecret` changes to `console.tls.secret.existingSecret`

Legacy keys continue to work in Camunda 8.9 but will cause deprecation warnings and will be removed in a future version. See [Secret management](/self-managed/deployment/helm/configure/secret-management.md).

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--deprecated">Deprecated</span>
</div>
<div className="release-announcement-content">

#### Helm chart: Bitnami subcharts deprecated

The four Bitnami-based subcharts (`identityPostgresql`, `identityKeycloak`, `webModelerPostgresql`, `elasticsearch`) are deprecated in Camunda 8.9 and will be removed in Camunda 8.10.

If any of these subcharts are enabled, Helm prints a deprecation warning during installation or upgrade.

You should migrate to externally managed services before upgrading to Camunda 8.10.

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--deprecated">Deprecated</span>
</div>
<div className="release-announcement-content">

#### Helm chart: `global.elasticsearch` and `global.opensearch` deprecated

The `global.elasticsearch.*` and `global.opensearch.*` configuration trees are deprecated in Camunda 8.9 and will be removed in Camunda 8.10.

These options are not truly global, as only the Orchestration and Optimize components use them.

You should migrate to the new component-specific configuration:

- **Orchestration:** `orchestration.data.secondaryStorage.elasticsearch.*` / `orchestration.data.secondaryStorage.opensearch.*`
- **Optimize:** `optimize.database.elasticsearch.*` / `optimize.database.opensearch.*`

Legacy keys continue to work in Camunda 8.9 with deprecation warnings. Existing deployments will continue to function without changes.

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--deprecated">Deprecated</span>
</div>
<div className="release-announcement-content">

#### Helm chart: Identity profile renamed to admin

The orchestration profile `orchestration.profiles.identity` is deprecated and renamed to `orchestration.profiles.admin`.

If your `values.yaml` uses the `identity` profile key, the chart automatically migrates it to `admin` and prints a deprecation warning.

You should update your values file to use `orchestration.profiles.admin`.

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--new">New</span>
</div>
<div className="release-announcement-content">

#### Helm chart: Authorization, role, and group initialization

Camunda 8.9 adds Helm chart support for initializing authorization rules, roles, and groups directly through `values.yaml`.

This allows administrators to configure platform access control as part of the initial deployment, reducing manual post-installation setup.

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--new">New</span>
</div>
<div className="release-announcement-content">

#### Helm chart: Custom users and clients

You can now define Identity users and OAuth2 clients directly in `values.yaml`.

This simplifies initial deployment setup and enables reproducible, version-controlled Identity configurations.

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--new">New</span>
</div>
<div className="release-announcement-content">

#### Helm chart: Engine-only mode without secondary storage

Camunda 8.9 introduces `global.noSecondaryStorage` mode to allow running the Orchestration engine without any secondary storage (Elasticsearch, OpenSearch, or RDBMS). This is useful for lightweight testing or scenarios where only the core engine is needed.

When enabled, Elasticsearch and OpenSearch subcharts must be disabled, and basic authentication is not supported.

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--new">New</span>
</div>
<div className="release-announcement-content">

#### MySQL and Microsoft SQL Server secondary storage

Camunda 8.9 extends RDBMS secondary storage to include MySQL and Microsoft SQL Server as additional options for the Orchestration cluster.

:::info
To learn more, see the [8.9.0-alpha1 release notes](/reference/announcements-release-notes/890/890-release-notes.md#mysql-and-microsoft-sql-server-secondary-storage).
:::

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--new">New</span>
</div>
<div className="release-announcement-content">

#### RDBMS secondary storage

Camunda 8.9 introduces optional RDBMS secondary storage as an alternative to Elasticsearch or OpenSearch.

This enables teams to use relational databases such as H2, PostgreSQL, Oracle, or MariaDB for storing and querying process data, reducing operational complexity for non-high-performance use cases.

:::info
To learn more, see the [8.9.0-alpha1 release notes](/reference/announcements-release-notes/890/890-release-notes.md#rdbms-secondary-storage-h2-postgresql-oracle-mariadb).
:::

</div>
</div>

### Modeler

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--breaking-change">Breaking change</span>
</div>
<div className="release-announcement-content">

#### Web Modeler: Default logging format changed

By default, Web Modeler's `restapi` component now logs in a simple, readable format to the console instead of `JSON`.

This change aligns with the current Orchestration Cluster logging default as defined in its [logging configuration](/self-managed/components/orchestration-cluster/core-settings/configuration/logging.md#pattern-layout-format).

:::info
To learn more, see the [8.9.0-alpha2 release notes](/reference/announcements-release-notes/890/890-release-notes.md#web-modeler-logging-framework-changes-from-logback-to-log4j2).
:::

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--breaking-change">Breaking change</span>
</div>
<div className="release-announcement-content">

#### Web Modeler: Embedded web server changed from Undertow to Tomcat

Web Modeler now uses [Apache Tomcat](https://tomcat.apache.org/) as an embedded web server instead of [Undertow](https://undertow.io/). This aligns with the Orchestration Cluster.

This enhancement ensures consistency across environments and simplifies setup for administrators.

:::info
To learn more, see the [8.9.0-alpha2 release notes](/reference/announcements-release-notes/890/890-release-notes.md).
:::

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--breaking-change">Breaking change</span>
</div>
<div className="release-announcement-content">

#### Web Modeler: Invite collaborators who haven't logged in before

The behavior across OIDC providers is now aligned. Invitation suggestions only include users who have logged in at least once. This is a breaking change for Web Modeler installations using Keycloak as the OIDC provider. Before 8.9, Keycloak returned all organization users, including those who had never logged in.

You can now invite users who have not yet logged in to Web Modeler by entering their email address. They will appear as “invited” in the collaborators panel. After their first log in, they will be added to the project automatically.

Inviting the entire organization only applies to users who have logged in at least once.

:::info
To learn more, see the [8.9.0-alpha3 release notes](/reference/announcements-release-notes/890/890-release-notes.md).
:::

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--breaking-change">Breaking change</span>
</div>
<div className="release-announcement-content">

#### Web Modeler: JSON format changes

When using JSON as the output for the logs the structure has slightly changed:

- `logger`: This field is now renamed to `loggerName`.
- `thread`: Previously represented the name of the thread. Now we have an object named `threadContext` with a field `name` that has this value.

See [Logging documentation](/self-managed/components/modeler/web-modeler/configuration/logging.md#json-structure) for more information.

:::info
To learn more, see the [8.9.0-alpha2 release notes](/reference/announcements-release-notes/890/890-release-notes.md).
:::

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--breaking-change">Breaking change</span>
</div>
<div className="release-announcement-content">

#### Web Modeler: Logging framework changed from Logback to Apache Log4j 2

Web Modeler now uses [Apache Log4j 2](https://logging.apache.org/log4j/2.x/) for logging, in alignment with what the Orchestration Cluster uses.

This enhancement ensures consistency across environments and simplifies setup for administrators.

:::info
To learn more, see the [8.9.0-alpha2 release notes](/reference/announcements-release-notes/890/890-release-notes.md#web-modeler-logging-framework-changes-from-logback-to-log4j2).
:::

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--new">New</span>
</div>
<div className="release-announcement-content">

#### Web Modeler: RDBMS support (H2, MariaDB, MySQL)

Camunda 8.9 adds support for H2, MariaDB, and MySQL as relational databases for Web Modeler.

This enhancement aligns Web Modeler's database configuration with the Orchestration cluster, ensuring consistent setup and improved integration across environments.

:::info
To learn more, see the [8.9.0-alpha1 release notes](/reference/announcements-release-notes/890/890-release-notes.md#web-modeler-rdbms-support-h2-mariadb-mysql).
:::

</div>
</div>
