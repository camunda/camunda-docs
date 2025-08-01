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

:::note
Start migration early to reduce upgrade risk beyond 8.8.
:::

For more information, see [Upcoming API Changes in Camunda 8: A Unified and Streamlined Experience](https://camunda.com/blog/2024/12/api-changes-in-camunda-8-a-unified-and-streamlined-experience/).

| Component / Use          | Status in 8.8  | Migrate to                 | Migrate by          |
| ------------------------ | -------------- | -------------------------- | ------------------- |
| V1 component APIs        | **Deprecated** | Orchestration Cluster API  | Before Camunda 8.10 |
| Spring Zeebe SDK         | **Deprecated** | Camunda Spring SDK         | Before Camunda 8.10 |
| Zeebe Process Test (ZPT) | **Deprecated** | Camunda Process Test (CPT) | Before Camunda 8.10 |
| Job-based user tasks     | **Deprecated** | Camunda User Tasks         | Before Camunda 8.10 |
| ZeebeClient              | **Deprecated** | Camunda Java Client        | Before Camunda 8.10 |
| Tasklist GraphQL API     | **Removed**    | Orchestration Cluster API  | 8.8                 |

### Orchestration Cluster API

The Orchestration Cluster API replaces the legacy V1 component APIs, providing a unified interface for managing and interacting with the orchestration cluster. This API is designed to be more consistent and easier to use, aligning with the new architecture introduced in Camunda 8.8.
The V1 APIs will remain available until version 8.10. This allows users time to migrate to the newer Orchestration Cluster API.

For more information, see the [update guide](migrate-to-camunda-api.md)

### Camunda Spring SDK

The transition from Zeebe Spring SDK to Camunda Spring SDK indicates significant architectural changes in Camunda 8.8. The Camunda Spring SDK serves as a drop-in replacement for the Zeebe Spring SDK while still supporting the ZeebeClient.
The Camunda Spring SDK continues to provide support for the ZeebeClient, ensuring that existing applications using the Zeebe Spring SDK can transition smoothly without major changes.
There is a grace period during which the old Zeebe client will still be available until version 8.10. This allows users to adapt to the new SDK and make necessary changes incrementally.

For more information, see the update guide <!-- _Link to the update guide._ -->

### Camunda Process Test (CPT)

The Camunda Process Test (CPT) framework is the successor to Zeebe Process Test (ZPT). It provides a more streamlined and efficient way to test process models in Camunda 8.8.
It is designed to work seamlessly with the new orchestration cluster architecture and offers improved performance and usability.
ZPT is officially deprecated in Camunda 8.8, and users are encouraged to migrate to CPT.

Timeline:

- **8.8 release:** Introduction of Camunda Process Test (CPT) as the successor to Zeebe Process Test (ZPT).
- **8.9 release:** Continued support for both ZPT and CPT.
- **8.10 release:** ZPT will be removed completely; customers must have migrated their tests to CPT by this time.

For more information, see the update guide <!-- _Link to the update guide._ -->

### Camunda User Tasks

The Camunda User Tasks feature replaces the legacy job-based user tasks in Camunda 8.8. This new feature provides a more robust and flexible way to handle user tasks within process models.
It is designed to work seamlessly with the new orchestration cluster architecture and offers improved performance and usability.
Job-based user tasks are deprecated in Camunda 8.8, and users are encouraged to migrate to the new Camunda User Tasks feature.

For more information, see the [update guide](migrate-to-camunda-user-tasks.md)

### Camunda Java Client

The Camunda Java Client is set to supersede the Zeebe Java Client, and there is a grace period for the Zeebe Client that will extend until version 8.10.
This means that while the Zeebe Client is deprecated, it will still be available for use until that version. In this way users can transition to the Camunda Java Client without immediate pressure, allowing for a smoother migration process.

For more information, see the update guide <!-- _Link to the update guide._ -->

### Tasklist GraphQL API

The Tasklist GraphQL API has been removed in Camunda 8.8. This change is part of the broader architectural evolution towards the Orchestration Cluster API, which provides a more unified and consistent interface for managing tasks and workflows.

Check the User Task API documentation for more information on how to manage user tasks in Camunda 8.8.

## Next steps

1. **Coordinate platform and development teams**  
   Ensure that the orchestration cluster is updated to 8.8 before upgrading application clients.
2. **Review migration guides**  
   👉 _Coming soon: Links to detailed guides on each component migration._

---
