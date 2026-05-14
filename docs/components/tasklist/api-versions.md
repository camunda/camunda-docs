---
id: api-versions
title: "Tasklist API changes"
sidebar_label: "API versions"
description: "Learn how Tasklist changed in Camunda 8.10 after the removal of the legacy Tasklist V1 API."
---

Tasklist in Camunda 8.10 and later uses only the [Orchestration Cluster REST API](../../apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md).

The legacy Tasklist V1 API and the Tasklist V1 UI mode were removed in 8.10.

For the release-level summary of these removals, see the [8.10 release announcement](/reference/announcements-release-notes/8100/8100-announcements.md#removal-of-legacy-apis-tasklist-v1-dependent-features-and-zeebe-process-test).

## What changed in 8.10

- Tasklist always uses the Orchestration Cluster REST API.
- The Tasklist V1 mode toggle is no longer available in SaaS or Self-Managed clusters.
- Features that depended on Tasklist V1 are no longer available in the current version.

## Removed legacy behavior

The following behavior was tied to Tasklist V1 and is no longer available in 8.10 and later:

- Job worker-based user tasks
- Draft variables
- User task access restrictions
- Public start forms
- Advanced process filtering that depended on Tasklist V1
- Task context description and context variables
- The Tasklist-specific permission and visibility model from V1

## Recommended replacements

- Use the [Orchestration Cluster REST API](../../apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md) for task, form, and process interactions.
- Use [user task authorization](./user-task-authorization.md) for current Tasklist access control.
- Use the [migration guide for Camunda user tasks](../../apis-tools/migration-manuals/migrate-to-camunda-user-tasks.md) if you still have job worker-based user tasks.
- Use [migrating to the Orchestration Cluster REST API](../../apis-tools/migration-manuals/migrate-to-camunda-api.md) if you still have integrations that call the removed Tasklist API.

## Historical timeline

| Version      | Status                                                                                                      |
| :----------- | :---------------------------------------------------------------------------------------------------------- |
| Camunda 8.8  | V2 API is the default and recommended option. V1 API is deprecated but remains available via configuration. |
| Camunda 8.9  | V1 API remains deprecated and is not recommended for new implementations.                                   |
| Camunda 8.10 | V1 API is removed. V2 API is the only available option.                                                     |
