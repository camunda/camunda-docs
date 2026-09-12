---
id: 8100-announcements
title: "8.10 Release announcements"
sidebar_label: Release announcements
description: "Supported environment changes, breaking changes, and deprecations in Camunda 8.10."
toc_max_heading_level: 3
---

import PageDescription from '@site/src/components/PageDescription';

<PageDescription />

| Minor release date | End of standard maintenance | Release notes                                                                           | Upgrade guides                                                                                        |
| ------------------ | --------------------------- | --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| 13 October 2026    | 11 April 2028               | [8.10 release notes](/reference/announcements-release-notes/8100/8100-release-notes.md) | [8.10 upgrade guides](/reference/announcements-release-notes/8100/whats-new-in-810.md#upgrade-guides) |

:::info 8.10 resources

- See [release notes](/reference/announcements-release-notes/8100/8100-release-notes.md) to learn more about new features and enhancements.
- Refer to the [quality board](https://github.com/orgs/camunda/projects/187/views/23) for an overview of known bugs by component and severity.

:::

## Supported environments

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--change">Change</span>
</div>
<div className="release-announcement-content">

#### Amazon Aurora PostgreSQL 14 removed, 18 added

Camunda 8.10 drops support for Amazon Aurora PostgreSQL 14 and adds support for version 18. Supported versions are now 15, 16, 17, and 18.

- Aurora PostgreSQL 14 has reached the end of standard support on AWS.
- Migrate your Aurora cluster to a supported version before moving to Camunda 8.10.

<p className="link-arrow">[RDBMS version support policy](/self-managed/concepts/databases/relational-db/rdbms-support-policy.md)</p>

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--change">Change</span>
</div>
<div className="release-announcement-content">

#### Elasticsearch 9.2 and 9.3 no longer supported

Camunda 8.10 raises the minimum supported Elasticsearch 9.x version to 9.4. Supported Elasticsearch versions are now 8.19+ and 9.4+.

- Upgrade Elasticsearch 9.2 or 9.3 clusters to 9.4 or later before moving to Camunda 8.10.

<p className="link-arrow">[Supported environments](/reference/supported-environments.md)</p>

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--change">Change</span>
</div>
<div className="release-announcement-content">

#### H2 2.3 no longer supported

Camunda 8.10 drops support for H2 2.3. Only H2 2.4 is now supported.

- The bundled H2 driver in Camunda images is on the 2.4 line.
- H2 remains supported for development, testing, and evaluation only. Production use is not recommended.

<p className="link-arrow">[RDBMS version support policy](/self-managed/concepts/databases/relational-db/rdbms-support-policy.md)</p>

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--change">Change</span>
</div>
<div className="release-announcement-content">

#### Microsoft SQL Server 2019 no longer supported

Camunda 8.10 drops support for Microsoft SQL Server 2019. Supported versions are now 2022 and 2025.

- SQL Server 2019 has reached the end of mainstream support from Microsoft.
- Upgrade your SQL Server instance to a supported version before moving to Camunda 8.10.

<p className="link-arrow">[RDBMS version support policy](/self-managed/concepts/databases/relational-db/rdbms-support-policy.md)</p>

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--change">Change</span>
</div>
<div className="release-announcement-content">

#### OpenSearch 3.4 and 3.5 no longer supported

Camunda 8.10 raises the minimum supported OpenSearch 3.x version to 3.6. Supported OpenSearch versions are now 2.19+ and 3.6+.

- Upgrade OpenSearch 3.4 or 3.5 clusters to 3.6 or later before moving to Camunda 8.10.

<p className="link-arrow">[Supported environments](/reference/supported-environments.md)</p>

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--change">Change</span>
</div>
<div className="release-announcement-content">

#### Oracle 23ai rebranded as Oracle 26ai

Oracle has rebranded Oracle Database 23ai as Oracle AI Database 26ai, effective with the October 2025 Release Update (RU 23.26). The internal version continues to use the 23.x code line; the transition requires no database upgrade or application recertification. Camunda 8.10's supported Oracle versions are 19c and 26ai.

<p className="link-arrow">[RDBMS version support policy](/self-managed/concepts/databases/relational-db/rdbms-support-policy.md)</p>

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--change">Change</span>
</div>
<div className="release-announcement-content">

#### PostgreSQL 14 no longer supported

Camunda 8.10 drops support for PostgreSQL 14. Supported versions are now 15, 16, 17, and 18.

- PostgreSQL 14 reached the end of its standard support window.
- Upgrade your PostgreSQL instance to a supported version before moving to Camunda 8.10.

<p className="link-arrow">[RDBMS version support policy](/self-managed/concepts/databases/relational-db/rdbms-support-policy.md)</p>

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--new">New</span>
</div>
<div className="release-announcement-content">

#### MariaDB 12.3 now supported

Camunda 8.10 adds support for MariaDB 12.3 LTS. Supported versions are now 10.11, 11.4, 11.8, and 12.3.

<p className="link-arrow">[RDBMS version support policy](/self-managed/concepts/databases/relational-db/rdbms-support-policy.md)</p>

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--new">New</span>
</div>
<div className="release-announcement-content">

#### MySQL 9.7 now supported

Camunda 8.10 adds support for MySQL 9.7 LTS. Supported versions are now 8.4 and 9.7.

<p className="link-arrow">[RDBMS version support policy](/self-managed/concepts/databases/relational-db/rdbms-support-policy.md)</p>

</div>
</div>

## Agentic orchestration

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--breaking-change">Breaking change</span>
</div>
<div className="release-announcement-content">

#### AI Agent connector: Conversation storage SPI redesign

[Camunda 8.10.0-alpha1](/reference/announcements-release-notes/8100/8100-release-notes.md#8100-alpha1) redesigns the conversation storage SPI used by [custom AI Agent storage backends](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-customization.md#custom-conversation-storage). Built-in stores (in-process, Camunda Document, AWS AgentCore) are migrated transparently; only custom `ConversationStore` implementations are affected.

**Action:** If you maintain a custom `ConversationStore`, migrate to the new SPI. See the updated [AI Agent connector customization guide](/components/connectors/out-of-the-box-connectors/agentic-ai-aiagent-customization.md#custom-conversation-storage) for the new shape, and the [migration guide on GitHub](https://github.com/camunda/connectors/blob/main/connectors/agentic-ai/docs/breaking-changes.md) for a step-by-step walkthrough.

</div>
</div>

## APIs & tools

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--breaking-change">Breaking change</span>
</div>
<div className="release-announcement-content">

#### Removal of legacy APIs, Tasklist V1-dependent features, and Zeebe Process Test

Starting with Camunda 8.10.0-alpha2, Camunda removes the legacy component APIs and related features that were deprecated in 8.8.

The following items are removed:

- The [Operate API (8.9 documentation)](/versioned_docs/version-8.9/apis-tools/operate-api/overview.md)
- The [Tasklist API (8.9 documentation)](/versioned_docs/version-8.9/apis-tools/tasklist-api-rest/tasklist-api-rest-overview.md) and Tasklist V1 mode
- Tasklist V1-dependent features such as [user task access restrictions (8.9 documentation)](/versioned_docs/version-8.9/components/tasklist/user-task-access-restrictions.md) and [public start forms](/components/tasklist/userguide/starting-processes.md#public-start-forms)
- [Zeebe Process Test](/apis-tools/testing/zeebe-process-test.md)

**Action:** Migrate integrations and testing workflows to the current replacements:

- Use the [Orchestration Cluster REST API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md) instead of the removed Operate API and Tasklist API.
- Use [user task authorization](/components/tasklist/user-task-authorization.md) and [authorization-based access control](/components/concepts/access-control/authorizations.md) instead of user task access restrictions.
- Use authenticated Tasklist starts or build your own application with [Camunda Forms](/components/modeler/forms/utilizing-forms.md) and the Orchestration Cluster REST API instead of public start forms.
- Use [Camunda Process Test](/apis-tools/testing/getting-started.md) instead of Zeebe Process Test.

<p><span className="link-arrow">[Migrate to the Orchestration Cluster REST API](/apis-tools/migration-manuals/migrate-to-camunda-api.md)</span></p>
<p><span className="link-arrow">[Migrate from Zeebe Process Test](/apis-tools/migration-manuals/migrate-to-camunda-process-test.md)</span></p>
<p><span className="link-arrow">[Migrate to Camunda user tasks](/apis-tools/migration-manuals/migrate-to-camunda-user-tasks.md)</span></p>

</div>
</div>

<!-- :::info 8.10 APIs & Tools migration guide
Migrate your API integrations, SDKs, and generated clients to Camunda 8.10 using the [8.10 APIs & Tools migration guide](/).
:::

:::tip Client and API compatibility
Camunda clients (Java client, Spring SDK, Node.js SDK) and Camunda Process Test are **forward-compatible** with the Orchestration Cluster, meaning you can upgrade the cluster and clients independently. For example, you can run a client on 8.8 against a cluster on 8.10, see [Client and API compatibility](/reference/public-api.md#client-and-api-compatibility).
:::
<br/>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--breaking-change">Breaking change</span>
</div>
<div className="release-announcement-content">

#### `POST /v2/message-subscriptions/search` now returns start event subscriptions

Starting with 8.10, the `POST /v2/message-subscriptions/search` endpoint returns both start event and intermediate event message subscriptions. Previously, only intermediate event subscriptions were returned.

A new `messageSubscriptionType` enum field is included in each result. Existing (legacy) data has `NULL` for this field.

**Action:** If your integration expects the endpoint to return only intermediate event subscriptions, add the following filter to restore the previous behavior:

```json
{
  "filter": {
    "messageSubscriptionType": { "$neq": "START_EVENT" }
  }
}
```

<p className="link-arrow">[8.10 APIs & Tools migration guide](/apis-tools/migration-manuals/migrate-to-810.md#message-subscription-type)</p>

</div>
</div> -->

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--breaking-change">Breaking change</span>
</div>
<div className="release-announcement-content">

#### `GET /decision-instances/{decisionEvaluationInstanceKey}` now validates the key format

The [Get decision instance](/apis-tools/orchestration-cluster-api-rest/specifications/get-decision-instance.api.mdx) endpoint previously returned `404 Not Found` when the `decisionEvaluationInstanceKey` path parameter contained invalid characters that did not match the required pattern `^[0-9]+-[0-9]+$`. The endpoint now correctly returns `400 Bad Request` in this case, while `404 Not Found` is reserved for well-formed keys that do not exist.

**Action:** Update any client code or error handling that relied on receiving `404 Not Found` for malformed keys to also handle `400 Bad Request`.

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--breaking-change">Breaking change</span>
</div>
<div className="release-announcement-content">

#### `JobIntent.COMPLETED` follow-up event no longer carries variables by default

Starting with 8.10, the `JobIntent.COMPLETED` follow-up event is emitted without variables by default. This prevents `ExceededBatchRecordSizeException` when a job completes with very large variables. Without this setting, the `JobIntent.COMPLETE` command could be rejected and the job could time out.

**Action:** If your exporter or integration reads completion variables from the `JobIntent.COMPLETED` event, read them instead from the `JobIntent.COMPLETE` command record or the follow-up `ProcessEvent.TRIGGERING` event, both of which always carry the variables. To restore the pre-8.10 behavior where `JobIntent.COMPLETED` events carry variables, set `camunda.processing.engine.job.include-variables-in-job-completed-event` to `true`.

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--change">Change</span>
</div>
<div className="release-announcement-content">

#### Camunda Spring Boot Starter now bundles Spring Boot 4.1.x

Starting with Camunda 8.10, the default [Camunda Spring Boot Starter](/apis-tools/camunda-spring-boot-starter/getting-started.md) (`camunda-spring-boot-starter` & `camunda-spring-boot-4-starter`) is bundled with Spring Boot 4.1.x (up from 4.0.x in 8.9).

**Action:** Migrate your application to Spring Boot 4.1.x. See the [version compatibility table](/apis-tools/camunda-spring-boot-starter/getting-started.md#version-compatibility) for details.

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--deprecated">Deprecated</span>
</div>
<div className="release-announcement-content">

#### Console SM and Web Modeler APIs deprecated

With Camunda 8.10, the Console Self-Managed API and the Web Modeler API are deprecated in favor of the new [public Camunda Hub API](/reference/announcements-release-notes/8100/8100-release-notes.md#public-camunda-hub-api). The legacy endpoints remain available for at least two minor versions and are scheduled for removal in 8.12.

**Action:** Plan to migrate integrations from the Console Self-Managed and Web Modeler APIs to the public Camunda Hub API before 8.12.

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--breaking-change">Breaking change</span>
</div>
<div className="release-announcement-content">

#### Optimize `GET /api/readyz` no longer rejects requests that carry an `Authorization` header

Starting with Camunda 8.10.0-alpha5, the Optimize [health readiness endpoint](/apis-tools/optimize-api/health-readiness.md) (`GET /api/readyz`) ignores an `Authorization` header instead of rejecting the request. Previously, a request that included the header was rejected with a client error status code. It now returns the readiness status (`200` or `503`), as it does for a request without the header.

This aligns the endpoint with the other public endpoints of the Orchestration Cluster, which also accept and ignore a superfluous `Authorization` header.

**Action:** No action is required for Kubernetes readiness and liveness probes, as these do not send an `Authorization` header. If you have a client or monitoring check that relies on the endpoint rejecting requests that carry an `Authorization` header, update it to expect the readiness status instead.

</div>
</div>

## Connectors

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--change">Change</span>
</div>
<div className="release-announcement-content">

#### Connectors with a single operation are renamed after the operation

Connectors that provide a single operation are renamed in Modeler so their name describes the action they perform instead of the product they connect to. For example, the **REST Outbound Connector** is now named **Send REST Request**. Connectors with several operations keep their names and expose their operations as searchable entries instead.

Only the name shown in Modeler changed. Template IDs, versions, connector types, and runtime behavior are unchanged, so existing process models continue to run and do not need to be remodeled or redeployed.

**Action:** Search for the new name when you add one of these connectors to a process, and update your own documentation, templates, and training material that refer to the previous names.

**Renamed connectors:**

| Previous name                                   | New name                                           |
| :---------------------------------------------- | :------------------------------------------------- |
| Amazon EventBridge Outbound Connector           | Send Event to AWS EventBridge                      |
| Amazon SNS Outbound connector                   | Publish Message to AWS SNS                         |
| Amazon SQS Outbound Connector                   | Send Message to AWS SQS                            |
| AWS Bedrock AgentCore Runtime                   | Invoke Agent in AWS Bedrock AgentCore Runtime      |
| AWS Bedrock Code Interpreter Outbound Connector | Run Code with AWS Bedrock Code Interpreter         |
| AWS Bedrock Knowledge Base Outbound Connector   | Retrieve Documents from AWS Bedrock Knowledge Base |
| AWS Lambda Outbound Connector                   | Invoke AWS Lambda Function                         |
| AWS SageMaker Outbound Connector                | Run Inference with AWS SageMaker                   |
| AWS Textract Outbound Connector                 | Extract Text from Document with AWS Textract       |
| Google Gemini Outbound Connector                | Generate Content with Google Gemini                |
| GraphQL Outbound Connector                      | Send GraphQL Request                               |
| Hugging Face Outbound Connector                 | Run Inference on Hugging Face                      |
| Kafka Outbound Connector                        | Publish Message to Kafka                           |
| RabbitMQ Outbound Connector                     | Publish Message to RabbitMQ                        |
| REST Outbound Connector                         | Send REST Request                                  |
| RPA Connector                                   | Run RPA Script                                     |
| SendGrid Outbound Connector                     | Send Email with SendGrid                           |
| SOAP Connector                                  | Send SOAP Request                                  |
| SQL Database Connector                          | Execute SQL Statement on Database                  |

Inbound connectors are not renamed. For Kafka and RabbitMQ, only the outbound connector is renamed.

<p className="link-arrow">[Available connectors](/components/connectors/out-of-the-box-connectors/available-connectors-overview.md)</p>

</div>
</div>

<!-- <div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--breaking-change">Breaking change</span>
</div>
<div className="release-announcement-content">

#### Connectors change 1

Connectors change 1 description.

**Action:** Description.

</div>
</div> -->

## Data

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--breaking-change">Breaking change</span>
</div>
<div className="release-announcement-content">

#### Elasticsearch and OpenSearch exporter defaults changed for Optimize mode and job records

Starting with Camunda 8.10, the Elasticsearch and OpenSearch exporters ship with two updated defaults:

- `index.optimizeModeEnabled` is now `true` (previously `false`). The exporter restricts exported record value types to those consumed by Optimize and drops other record value types.
- `index.job` is now `false` (previously `true`). When `index.optimizeModeEnabled` is `true`, Optimize mode controls which record value types are exported, so the individual `job` flag has no effect.

**Action:** Review your exporter configuration before upgrading. If your deployment relies on record value types that Optimize mode does not cover, set `index.optimizeModeEnabled: false` and explicitly configure the record value types you need.

<p className="link-arrow">[Elasticsearch exporter configuration](/self-managed/components/orchestration-cluster/zeebe/exporters/elasticsearch-exporter.md#configuration)</p>
<p className="link-arrow">[OpenSearch exporter configuration](/self-managed/components/orchestration-cluster/zeebe/exporters/opensearch-exporter.md#configuration)</p>

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--breaking-change">Breaking change</span>
</div>
<div className="release-announcement-content">

#### Default RocksDB memory allocation strategy changed to `FRACTION` {#rocksdb-memory-allocation-strategy}

Starting with Camunda 8.10, the default RocksDB memory allocation strategy changes from `PARTITION` to `FRACTION`. With `FRACTION`, RocksDB memory is allocated as a fraction of total available memory (default `0.1`, or 10%) instead of scaling with the number of partitions per broker. This may result in a different amount of memory being allocated to RocksDB after upgrading.

**Action:** Review your broker memory sizing before upgrading. To keep the previous behavior, explicitly set `camunda.data.primary-storage.rocksdb.memory-allocation-strategy` to `PARTITION` (environment variable `CAMUNDA_DATA_PRIMARYSTORAGE_ROCKSDB_MEMORYALLOCATIONSTRATEGY=PARTITION`). To adopt the new default, test the `FRACTION` strategy first to find the right `memory-fraction` value for your deployment.

<p className="link-arrow">[Zeebe memory allocation](/components/best-practices/architecture/sizing-self-managed.md#memory)</p>

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--change">Change</span>
</div>
<div className="release-announcement-content">

#### New SaaS clusters default to `business_` variable include filter for Optimize

Starting with Camunda 8.10, new SaaS clusters include a default `business_` variable include filter in Optimize data filter settings. Only variables whose names start with `business_` are exported to Optimize. Variables not matching this prefix are permanently excluded from Optimize.

This default does not apply to existing clusters. Existing clusters show data filters disabled with a one-click opt-in — no automatic migration occurs.

**Action:** If your Optimize reports or dashboards on new SaaS clusters rely on variables not prefixed with `business_`, update the variable include filter in Console cluster settings before creating the cluster or immediately after.

<p className="link-arrow">[Configure Optimize data filters](/components/hub/organization/manage-clusters/settings.md#data-filters)</p>

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--breaking-change">Breaking change</span>
</div>
<div className="release-announcement-content">

#### Optimize Self-Managed no longer flattens object variables by default

Starting with Camunda 8.10, Self-Managed Optimize no longer imports object variable values by default. Object variables are no longer flattened into per-property fields, and their raw values are no longer stored. This significantly reduces Optimize storage and CPU usage, and aligns Self-Managed with the default Camunda 8 SaaS has used for years.

This change is **Self-Managed only**; SaaS is unaffected, as it already runs with this behavior disabled.

- Object-heavy processes previously measured 5.9-48.8x more Optimize variable storage on Self-Managed than SaaS for identical workloads.
- If you rely on object variable properties in reports, filters, or Raw Data Reports, opt in by setting `zeebe.includeObjectVariableValue: true` (environment variable `CAMUNDA_OPTIMIZE_ZEEBE_INCLUDE_OBJECT_VARIABLE=true`).
- Optimize logs a `WARN` on startup whenever object variable values are not being imported. The message includes the opt-in setting.

**Action:** Decide whether your Self-Managed deployment needs flattened object variables. If it does, set `zeebe.includeObjectVariableValue: true` before upgrading to 8.10.

<p className="link-arrow">[Object variables configuration](/self-managed/components/optimize/configuration/object-variables.md)</p>

</div>
</div>

## Deployment

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--breaking-change">Breaking change</span>
</div>
<div className="release-announcement-content">

#### Helm v4 required for Camunda 8.10

Camunda 8.10 (chart 15.x) supports the Helm CLI v4 only. Camunda 8.9 (chart 14.x) is the last minor that supports the Helm v3 CLI. The Helm chart adds a CLI version check and fails fast if Helm v3 is used to install or upgrade chart 15.x.

**Action:** Install the Helm v4 CLI before you upgrade to 8.10. No release-state migration is required; Helm is client-side only and both CLIs read and write the same release-storage format. See [Move from the Helm v3 CLI to v4](/self-managed/deployment/helm/operational-tasks/moving-helm-v3-to-v4.md) and [Helm 4](/self-managed/deployment/helm/operational-tasks/helm-v4.md).

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--breaking-change">Breaking change</span>
</div>
<div className="release-announcement-content">

#### Individual component Docker images no longer produced

Camunda no longer produces the following individual component Docker images in Camunda 8.10 and later, or in Camunda 8.9 from patch release 8.9.12:

- [camunda/zeebe](https://hub.docker.com/r/camunda/zeebe)
- [camunda/operate](https://hub.docker.com/r/camunda/operate)
- [camunda/tasklist](https://hub.docker.com/r/camunda/tasklist)

**Action:** Before upgrading to Camunda 8.10 or updating to Camunda 8.9.12 or later, switch to the unified [camunda/camunda](https://hub.docker.com/r/camunda/camunda) Docker image.

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--breaking-change">Breaking change</span>
</div>
<div className="release-announcement-content">

#### Operate and Tasklist health indicators replaced by a unified schema readiness check

Camunda 8.10 removes the Operate- and Tasklist-specific Elasticsearch/OpenSearch health indicators (`indicesCheck` and `searchEngineCheck`). A single `schemaReadinessCheck` now backs the gateways readiness probe; it is set once at startup, after the schema is initialized and the cluster reports green or yellow. `searchEngineStatus` reflects the current health status of Elasticsearch/OpenSearch and can be fetched via `/actuator/health` (it is not part of the readiness probe group).

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--breaking-change">Breaking change</span>
</div>
<div className="release-announcement-content">

#### Unused PVC in Optimize is unmounted

An unused volume mounted at `/camunda` in Optimize has been removed from the Helm chart. Optimize did not use this volume.

By default, this mount used an `emptyDir`, so no PVC cleanup is required. However, if you set `optimize.persistence.enabled=true` in `values.yaml`, the PVC may still exist in your Kubernetes cluster even though Optimize no longer mounts it.

**Action:** If you previously enabled `optimize.persistence.enabled=true`, delete the leftover PVC to reclaim storage quota. The claim name is `<releaseName>-camunda-platform-optimize-data`.

</div>
</div>

<!-- <div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--breaking-change">Breaking change</span>
</div>
<div className="release-announcement-content">

#### Deployment change 1

Deployment change 1 description.

**Action:** Description.

</div>
</div> -->

## Identity

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--change">Change</span>
</div>
<div className="release-announcement-content">

#### Unified authentication for the Orchestration Cluster, Camunda Hub, and Optimize

With Camunda 8.10, the Orchestration Cluster, Camunda Hub, and Optimize authenticate through the [Camunda Security Library](/reference/glossary.md#camunda-security-library-csl), a shared implementation that replaces their separate identity stacks. All three components accept the same `camunda.security.authentication.*` settings. Nothing changes for the Orchestration Cluster, which already used these settings in 8.9.

Camunda Hub and Optimize accept their existing authentication settings in 8.10 and translate the recognized properties to their new equivalents at startup, but those legacy properties are deprecated and are removed in 8.11. Camunda Hub requires no configuration change to upgrade to 8.10. User, group, role, tenant, and permission management for both components is unchanged and is still handled by Management Identity.

**Action:** Migrate Camunda Hub and Optimize to the `camunda.security.*` settings before upgrading to 8.11, when their legacy authentication properties are removed.

<p className="link-arrow">[Camunda Hub authentication configuration](/self-managed/upgrade/components/890-to-8100.md#authentication-configuration)</p>

<p className="link-arrow">[Optimize legacy configuration keys](/self-managed/upgrade/components/890-to-8100.md#legacy-security-configuration-keys-are-deprecated)</p>

<p className="link-arrow">[Orchestration Cluster security properties](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#security)</p>

<p className="link-arrow">[Optimize authentication in Self-Managed](/self-managed/concepts/authentication/authentication-to-optimize.md)</p>

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--deprecated">Deprecated</span>
</div>
<div className="release-announcement-content">

#### Legacy Camunda Hub and Optimize authentication properties deprecated

The authentication properties Camunda Hub and Optimize used through 8.9 are deprecated in favor of `camunda.security.*`. Both components still accept them in 8.10 and translate the recognized properties to their new equivalents at startup, and both remove them in 8.11.

**Action:** Migrate to the `camunda.security.*` settings before upgrading to 8.11.

<p className="link-arrow">[Camunda Hub authentication mapping](/self-managed/upgrade/components/890-to-8100.md#authentication-configuration)</p>

<p className="link-arrow">[Optimize legacy configuration keys](/self-managed/upgrade/components/890-to-8100.md#legacy-security-configuration-keys-are-deprecated)</p>

<p className="link-arrow">[Optimize authentication in Self-Managed](/self-managed/concepts/authentication/authentication-to-optimize.md)</p>

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--change">Change</span>
</div>
<div className="release-announcement-content">

#### Console and Web Modeler Admin roles gain new Hub cluster access on Self-Managed

Starting with Camunda 8.10, Camunda Hub replaces Console and Web Modeler. Management Identity only adds roles, applications, and permissions on startup and never removes them, so two existing Self-Managed roles automatically gain access they didn't have in 8.9 — with no role reassignment or opt-in required:

- Existing `Console` role holders gain management access to Hub's cluster pages through a new `admin:clusters` permission. `DevOps` is the new name for the same access.
- Existing `Web Modeler Admin` role holders gain full access to Hub's cluster pages too, through their existing `admin:*` permission, which now additionally reaches Hub's cluster pages — a broader grant than the Console role's management-only access. `Hub Admin` is the new name for the same access.

A new `Analyst` role is also introduced: Hub modeling access, management access to the catalog's usage and adoption data, and full access to Optimize, without modeler-admin or people/org management access — the Self-Managed equivalent of the SaaS Analyst role.

**Action:** If you rely on least-privilege access to cluster management, review who holds the `Console` and `Web Modeler Admin` / `Hub Admin` roles before upgrading.

<p className="link-arrow">[Management Identity roles and permissions in the 8.9 to 8.10 upgrade guide](/self-managed/upgrade/components/890-to-8100.md#management-identity-roles-and-permissions)</p>
<br />
<p className="link-arrow">[Manage roles](/self-managed/components/management-identity/application-user-group-role-management/manage-roles.md)</p>

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--change">Change</span>
</div>
<div className="release-announcement-content">

#### SaaS organization roles renamed and Catalog access levels introduced

Starting with Camunda 8.10, SaaS organization roles are renamed to align with Camunda Hub, and Catalog access is split into two levels. These are display renames and a new access split; existing role holders keep the same effective access, with no reassignment required:

- `Owner` → `Organization Owner`
- `Admin` → `Organization Admin`
- `Modeler` → `Member` (Member additionally gains organization and cluster read access)
- `Analyst` stays `Analyst`.
- `Operations Engineer` → `DevOps`, with no permission change.
- Catalog access is now split into **Read** (Member, DevOps) and **Manage** (Analyst, Organization Admin, Organization Owner, who additionally see usage statistics and adoption data).

`Developer`, `Support agent`, `Task user`, and `Visitor` are unaffected by this rename; see [manage users](/components/hub/organization/manage-users/manage-users.md#roles-and-permissions) for their status.

<p className="link-arrow">[Manage users in your organization](/components/hub/organization/manage-users/manage-users.md#roles-and-permissions)</p>

</div>
</div>

## Modeler

:::note
Changes for 8.10 will be added here as the 8.10 documentation is updated.
:::

<!-- <div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--breaking-change">Breaking change</span>
</div>
<div className="release-announcement-content">

#### Web Modeler change 1

Web Modeler change 1 description.

</div>
</div> -->

## Optimize

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--breaking-change">Breaking change</span>
</div>
<div className="release-announcement-content">

#### Optimize authentication moves to the Camunda Security Library

Starting with Camunda 8.10, Optimize authenticates through the [Camunda Security Library](/reference/glossary.md#camunda-security-library-csl) (CSL), adopting the same authentication and session handling as the Orchestration Cluster components.

**Action:** Confirm `camunda.security.authentication.oidc.issuer-uri` and `camunda.security.authentication.oidc.audiences` match what your IdP puts in the `id_token`. See [Optimize authentication in Self-Managed](/self-managed/concepts/authentication/authentication-to-optimize.md) for the Optimize authentication configuration.

<p className="link-arrow">[Optimize authentication in Self-Managed](/self-managed/concepts/authentication/authentication-to-optimize.md)</p>

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--deprecated">Deprecated</span>
</div>
<div className="release-announcement-content">

#### Legacy Optimize security configuration keys deprecated

With the move to the [Camunda Security Library](/reference/glossary.md#camunda-security-library-csl) (CSL), the Optimize login and API security keys used through 8.9 are deprecated in favor of `camunda.security.*`. Optimize maps recognized legacy keys automatically and logs a deprecation warning naming the replacement. The legacy keys are removed in Camunda 8.11.

Keep `CAMUNDA_OPTIMIZE_IDENTITY_BASE_URL` set. It is not deprecated, and Optimize still uses it to look up users, for example when adding users to a collection.

**Action:** Migrate to the `camunda.security.*` keys before upgrading to 8.11. See [legacy configuration keys](/self-managed/upgrade/components/890-to-8100.md#legacy-security-configuration-keys-are-deprecated) for the full mapping and the precedence rules.

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--deprecated">Deprecated</span>
</div>
<div className="release-announcement-content">

#### `optimize.security.csl.enabled=false` fallback is temporary

If the [Camunda Security Library](/reference/glossary.md#camunda-security-library-csl) (CSL) causes a regression in your 8.10 deployment, `optimize.security.csl.enabled=false` temporarily restores the 8.9 security stack. This fallback, the legacy security stack it restores, and the legacy configuration keys are all removed in Camunda 8.11.

**Action:** Treat this as a temporary escape hatch, not a supported long-term mode. If you rely on it in 8.10, migrate to CSL before upgrading to 8.11.

<p className="link-arrow">[Optimize authentication in Self-Managed](/self-managed/concepts/authentication/authentication-to-optimize.md#fall-back-to-the-89-security-stack)</p>

</div>
</div>
