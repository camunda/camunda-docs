---
title: "Camunda 8.8 APIs & tools update guide"
description: "Plan and execute an update from Camunda 8.7 to 8.8. Includes architectural highlights, prerequisites, and breaking changes relevant for developers."
---

:::warning
This documentation is a work in progress and may contain incomplete, placeholder, or evolving content. While the core concepts introduced in Camunda 8.8 are stable, specific details are actively being refined.

See the [release announcements](/reference/announcements-release-notes/880/880-announcements.md), [release notes](/reference/announcements-release-notes/880/880-release-notes.md), and the [quality board](https://github.com/orgs/camunda/projects/187/views/15) for more information about what’s included in Camunda 8.8.
:::

This guide helps you plan and execute an upgrade from Camunda 8.7 to 8.8, focusing on API and SDK transitions.

:::note Who should read this?
Application developers maintaining Camunda-based solutions in Self-Managed Kubernetes or VM environments.
:::

## What's new in Camunda 8.8

Camunda 8.8 introduces a significant architectural evolution that impacts both infrastructure deployment and application integration. Key updates include:

- The new **orchestration cluster architecture**
- Unified APIs for a more consistent developer experience
- Updated authentication models
- Deprecation of several legacy components

## Why this update matters

Camunda 8.8 lays the foundation for future releases. Upgrading ensures compatibility and access to improved features.

<!-- _Coming soon: Link to “What’s new in Camunda 8.8”._ -->


## API and SDK status

| Component / Use          | Status in 8.8  | Migrate to                 | Migrate by                |
|--------------------------|----------------|----------------------------|---------------------------|
| V1 component APIs        | **Deprecated** | Orchestration Cluster API  | Before Camunda 8.10       |
| Spring Zeebe SDK         | **Deprecated** | Camunda Spring SDK         | Before Camunda 8.10       |
| Zeebe Process Test (ZPT) | **Deprecated** | Camunda Process Test (CPT) | Before Camunda 8.10       |
| Job-based user tasks     | **Deprecated** | Camunda User Tasks         | Before Camunda 8.10       |

:::note
Start migration early to reduce upgrade risk beyond 8.8.
:::

For more information, see [Upcoming API Changes in Camunda 8: A Unified and Streamlined Experience](https://camunda.com/blog/2024/12/api-changes-in-camunda-8-a-unified-and-streamlined-experience/).

## Next steps

1. **Coordinate platform and development teams**  
   Ensure that the orchestration cluster is updated to 8.8 before upgrading application clients.
2. **Review migration guides**  
   👉 _Coming soon: Links to detailed guides on each component migration._

---
