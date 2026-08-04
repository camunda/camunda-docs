---
id: publish-public-processes
title: Public start forms were removed
description: "Public start forms were removed in Camunda 8.10 and are no longer available in the current docs."
---

Public start forms were removed in Camunda 8.10 together with Tasklist V1.

For the release-level summary of this removal, see the [8.10 release announcement](/reference/announcements-release-notes/8100/8100-announcements.md#removal-of-legacy-apis-tasklist-v1-dependent-features-and-zeebe-process-test).

## Current alternatives

- For authenticated users inside your organization, link a Camunda Form to a start event and start the process directly [in Tasklist](/components/tasklist/userguide/starting-processes.md).
- For public-facing use cases, build your own application with [Camunda Forms](/components/modeler/forms/utilizing-forms.md) and the [Orchestration Cluster REST API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md).

## If you are migrating from an older version

Remove dependencies on public start form links before moving to 8.10. If you used this feature in older versions, replace it with either authenticated Tasklist starts or a custom public application.
