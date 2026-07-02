---
id: 8100-announcements
title: "8.10 Release announcements"
sidebar_label: Release announcements
description: "Supported environment changes, breaking changes, and deprecations in Camunda 8.10."
toc_max_heading_level: 3
---

import PageDescription from '@site/src/components/PageDescription';

<PageDescription />

| Minor release date | Scheduled end of maintenance | Release notes                                                                           | Upgrade guides                                                                                        |
| ------------------ | ---------------------------- | --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| 13 October 2026    | 11 April 2028                | [8.10 release notes](/reference/announcements-release-notes/8100/8100-release-notes.md) | [8.10 upgrade guides](/reference/announcements-release-notes/8100/whats-new-in-810.md#upgrade-guides) |

:::info 8.10 resources

- See [release notes](/reference/announcements-release-notes/8100/8100-release-notes.md) to learn more about new features and enhancements.
- Refer to the [quality board](https://github.com/orgs/camunda/projects/187/views/23) for an overview of known bugs by component and severity.
  :::

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

#### Oracle 23ai rebranded as Oracle 26ai

Oracle has rebranded Oracle Database 23ai as Oracle AI Database 26ai, effective with the October 2025 Release Update (RU 23.26). The internal version continues to use the 23.x code line; the transition requires no database upgrade or application recertification. Camunda 8.10's supported Oracle versions are 19c and 26ai.

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

#### Elasticsearch 9.2 no longer supported

Camunda 8.10 raises the minimum supported Elasticsearch 9.x version to 9.3. Supported Elasticsearch versions are now 8.19+ and 9.3+.

- Upgrade Elasticsearch 9.2 clusters to 9.3 or later before moving to Camunda 8.10.

<p className="link-arrow">[Supported environments](/reference/supported-environments.md)</p>

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--change">Change</span>
</div>
<div className="release-announcement-content">

#### OpenSearch 3.4 no longer supported

Camunda 8.10 raises the minimum supported OpenSearch 3.x version to 3.5. Supported OpenSearch versions are now 2.19+ and 3.5+.

- Upgrade OpenSearch 3.4 clusters to 3.5 or later before moving to Camunda 8.10.

<p className="link-arrow">[Supported environments](/reference/supported-environments.md)</p>

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

:::note
Changes for 8.10 will be added here as the 8.10 documentation is updated.
:::

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

<p className="link-arrow">[Migrate to the Orchestration Cluster REST API](/apis-tools/migration-manuals/migrate-to-camunda-api.md)</p>
<p className="link-arrow">[Migrate from Zeebe Process Test](/apis-tools/migration-manuals/migrate-to-camunda-process-test.md)</p>
<p className="link-arrow">[Migrate to Camunda user tasks](/apis-tools/migration-manuals/migrate-to-camunda-user-tasks.md)</p>

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

## Connectors

:::note
Changes for 8.10 will be added here as the 8.10 documentation is updated.
:::

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

#### Default RocksDB memory allocation strategy changed to `FRACTION` {#rocksdb-memory-allocation-strategy}

Starting with Camunda 8.10, the default RocksDB memory allocation strategy changes from `PARTITION` to `FRACTION`. With `FRACTION`, RocksDB memory is allocated as a fraction of total available memory (default `0.1`, or 10%) instead of scaling with the number of partitions per broker. This may result in a different amount of memory being allocated to RocksDB after upgrading.

**Action:** Review your broker memory sizing before upgrading. To keep the previous behavior, explicitly set `camunda.data.primary-storage.rocksdb.memory-allocation-strategy` to `PARTITION` (environment variable `CAMUNDA_DATA_PRIMARYSTORAGE_ROCKSDB_MEMORYALLOCATIONSTRATEGY=PARTITION`). To adopt the new default, test the `FRACTION` strategy first to find the right `memory-fraction` value for your deployment.

<p className="link-arrow">[Zeebe memory allocation](/self-managed/components/orchestration-cluster/zeebe/operations/resource-planning.md#memory)</p>

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

Starting with Camunda 8.10 and Camunda 8.9.12, the following individual component Docker images will no longer be produced:

- [camunda/zeebe](https://hub.docker.com/r/camunda/zeebe)
- [camunda/operate](https://hub.docker.com/r/camunda/operate)
- [camunda/tasklist](https://hub.docker.com/r/camunda/tasklist)

**Action:** Switch to the unified [camunda/camunda](https://hub.docker.com/r/camunda/camunda) Docker image before upgrading to Camunda 8.10 or Camunda 8.9.12+.

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

:::note
Changes for 8.10 will be added here as the 8.10 documentation is updated.
:::

<!-- <div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--change">Change</span>
</div>
<div className="release-announcement-content">

#### Identity change 1

Identity change 1 description.

</div>
</div> -->

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
