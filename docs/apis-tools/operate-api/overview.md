---
id: operate-api-overview
title: Migrate from the removed Operate API
slug: /apis-tools/operate-api/overview
description: "The Operate API was removed in Camunda 8.10. Use the Orchestration Cluster REST API instead."
---

:::warning
The Operate API was removed in Camunda 8.10 and is no longer part of the current documentation set.
:::

For the release-level summary of this removal, see the [8.10 release announcement](/reference/announcements-release-notes/8100/8100-announcements.md#removal-of-legacy-apis-tasklist-v1-dependent-features-and-zeebe-process-test).

Use the [Orchestration Cluster REST API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md) for current integrations, and review [migrating to the Orchestration Cluster REST API](/apis-tools/migration-manuals/migrate-to-camunda-api.md) if you still have clients that call the removed Operate API.

If you need legacy Operate API behavior as migration context, use the migration manuals in the current docs rather than building new integrations against the removed endpoints.
