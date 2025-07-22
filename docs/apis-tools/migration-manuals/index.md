---
title: "Camunda 8.8 APIs & tools Update Guide"
description: "Plan and execute an update from Camunda 8.7 to 8.8. Includes architectural highlights, prerequisites, breaking changes relevant for developers."
---

# Camunda 8.8 APIs & tools Update Guide

:::warning
This documentation page is a work in progress and may contain incomplete, placeholder, or evolving content. While the core concepts introduced in Camunda 8.8 are stable, details and sections here are actively being refined.

See [release announcements](/reference/announcements-release-notes/880/880-announcements.md), [release notes](/reference/announcements-release-notes/880/880-release-notes.md), and the [quality board](https://github.com/orgs/camunda/projects/187/views/15) for more detail on what's included in Camunda 8.8.
:::

This section helps you plan and run an update from using Camunda 8.7 APIs and SDK artifacts to Camunda 8.8.

> **Who should read this?**  
> Application developers maintaining Camunda-based solutions in self-managed Kubernetes or VM environments.

## Camunda 8.8 is a latest release

Camunda 8.8 represents a significant architectural evolution that affects both infrastructure deployment and application integration. This update introduces the new **Orchestration cluster architecture**, unified APIs, and new authentication models while deprecating several legacy components.

## Why this update matters

TODO: Link to "What's new in Camunda 8.8."

---

### API & SDK status

| Component / Use          | Status in 8.8  | Migrate To                 | Migrate By (no later than) |
| ------------------------ | -------------- | -------------------------- | -------------------------- |
| V1 component APIs        | **Deprecated** | Orchestration Cluster API  | Before Camunda 8.10        |
| Spring Zeebe SDK         | **Deprecated** | Camunda Spring SDK         | Before Camunda 8.10        |
| Zeebe Process Test (ZPT) | **Deprecated** | Camunda Process Test (CPT) | Before Camunda 8.10        |
| Job-based User Tasks     | **Deprecated** | Camunda User Tasks         | Before Camunda 8.10        |

> Start migration now to reduce risk when upgrading beyond 8.8.

For More information see [Upcoming API Changes in Camunda 8: A Unified and Streamlined Experience](https://camunda.com/blog/2024/12/api-changes-in-camunda-8-a-unified-and-streamlined-experience/)

## Next steps

1. **Coordinate between platform and development teams** - you can only update to newest clients when the Orchestration Cluster was updated to 8.8
2. TODO checkout the detailed guides on the topics:

---
