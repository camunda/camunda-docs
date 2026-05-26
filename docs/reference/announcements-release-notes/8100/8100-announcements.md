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

## Supported environments

:::note
Changes for 8.10 will be added here as the 8.10 documentation is updated.
:::

<!-- <div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--change">Change</span>
</div>
<div className="release-announcement-content">

#### Supported environments change 1

Supported environments change 1 description.

<p className="link-arrow">Placeholder link</p>

</div>
</div>

<div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--new">New</span>
</div>
<div className="release-announcement-content">

#### Supported environments change 2

Supported environments change 2 description.

<p className="link-arrow">Placeholder link</p>

</div>
</div> -->

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

- The [Operate API](/apis-tools/operate-api/overview.md)
- The [Tasklist API](/apis-tools/tasklist-api-rest/tasklist-api-rest-overview.md) and Tasklist V1 mode
- Tasklist V1-dependent features such as [user task access restrictions](/components/tasklist/user-task-access-restrictions.md) and [public start forms](/components/hub/workspace/modeler/modeling/advanced-modeling/publish-public-processes.md)
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

:::note
Changes for 8.10 will be added here as the 8.10 documentation is updated.
:::

<!-- <div className="release-announcement-row">
<div className="release-announcement-badge">
<span className="badge badge--breaking-change">Breaking change</span>
</div>
<div className="release-announcement-content">

#### Data change 1

Data change 1 description.

**Action:** Description.

</div>
</div> -->

## Deployment

:::note
Changes for 8.10 will be added here as the 8.10 documentation is updated.
:::

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
