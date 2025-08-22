---
id: api-versions
title: "Tasklist API versions"
sidebar_label: "API versions"
description: "Learn about the differences between Tasklist based on v1 and v2 API, and how to migrate."
---

Tasklist can be used in two modes: v1 (legacy) and v2:

- Tasklist v1 is based on the deprecated [Tasklist API](../../apis-tools/tasklist-api-rest/tasklist-api-rest-overview.md).
- Tasklist v2 is based on the new [Orchestration Cluster API](../../apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md).

We recommend using v2 for all new projects and migrating existing applications from v1.

## Tasklist based on v2 API

Tasklist v2 API integrates with the Orchestration Cluster API, providing a more robust and performant experience.

Key benefits of using v2 include:

- **Improved performance:** The v2 API is optimized for faster performance and response times.
- **Recommented user task implementation:** It uses the [Camunda user task implementation type](components/modeler/bpmn/user-tasks/user-tasks.md#camunda-user-tasks), which is the successor of the deprecated [Job worker-based user tasks](components/modeler/bpmn/user-tasks/user-tasks.md#job-worker-implementation).
- **Unified API:** It aligns with the Orchestration Cluster API for a consistent development experience and fine-grained [access control](components/concepts/access-control/access-control-overview.md).

## Migration from v1 to v2

Before migrating to Tasklist v2 API, review the features exclusive to the deprecated v1 API.

:::caution Features unavailable in v2
The following features are only available in Tasklist API v1 and are not supported in v2:

- Job worker-based user tasks
- Draft variables
- Public start forms

Ensure your application does not rely on these features before upgrading to the v2 API.
:::

### User task access restrictions

[User task access restrictions](./user-task-access-restrictions.md) are only supported when using the Tasklist v1 API. This feature is not yet available with the v2 (Orchestration Cluster) API.
