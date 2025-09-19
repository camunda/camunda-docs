---
title: "Camunda 8.8 APIs & tools migration guide"
description: "Plan and execute an update from Camunda 8.7 to 8.8. Includes architectural highlights, prerequisites, and breaking changes relevant for developers."
---

Learn about important API & tools changes in Camunda 8.8 to consider when planning your upgrade from Camunda 8.7.

:::warning
This documentation is a work in progress and may contain incomplete, placeholder, or evolving content. While the core concepts introduced in Camunda 8.8 are stable, specific details are actively being refined.
:::

## About this guide

This guide focuses on the API and SDK transitions required in an upgrade from Camunda 8.7 to Camunda 8.8.

Camunda 8.8 introduces a significant architectural evolution that impacts both infrastructure deployment and application integration:

- A new [Orchestration Cluster](/reference/announcements-release-notes/880/whats-new-in-88.md#orchestration-cluster) architecture.
- Unified APIs for a more consistent developer experience.
- Updated authentication models.
- Deprecation of several legacy components.

Camunda 8.8 lays the foundation for future releases. Upgrading ensures compatibility and access to improved features.

:::tip
Plan and start your migration early to reduce upgrade risk beyond 8.8.
:::

:::info
See [what's new in Camunda 8.8](/reference/announcements-release-notes/880/whats-new-in-88.md), [release announcements](/reference/announcements-release-notes/880/880-announcements.md), [release notes](/reference/announcements-release-notes/880/880-release-notes.md), and the [quality board](https://github.com/orgs/camunda/projects/187/views/15) for more detail on what's included in Camunda 8.8.
:::

## Who is this guide for?

- Application developers maintaining Camunda-based solutions in Self-Managed Kubernetes or VM environments.
- Developers using Camunda APIs and SDKs.

## API and SDK changes and status

Camunda 8.8 API and SDK changes and statuses are summarized as follows:

| Component/Use            | 8.8 status     | Migrate to                  | Migrate by          |
| :----------------------- | :------------- | :-------------------------- | :------------------ |
| V1 component APIs        | **Deprecated** | Orchestration Cluster API   | Before Camunda 8.10 |
| ZeebeClient              | **Deprecated** | Camunda Java Client         | Before Camunda 8.10 |
| Spring Zeebe SDK         | **Deprecated** | Camunda Spring Boot Starter | Before Camunda 8.10 |
| Zeebe Process Test (ZPT) | **Deprecated** | Camunda Process Test (CPT)  | Before Camunda 8.10 |
| Job-based user tasks     | **Deprecated** | Camunda user tasks          | Before Camunda 8.10 |
| Tasklist GraphQL API     | **Removed**    | Orchestration Cluster API   | 8.8                 |

:::info
For more information, see the blog post [Upcoming API Changes in Camunda 8: A Unified and Streamlined Experience](https://camunda.com/blog/2024/12/api-changes-in-camunda-8-a-unified-and-streamlined-experience/).
:::

### Orchestration Cluster API

The [Orchestration Cluster API](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md) replaces the deprecated V1 component APIs, providing a unified interface for managing and interacting with the Orchestration Cluster.

- This API is more powerful and easier to use, aligning with the new architecture introduced in Camunda 8.8.
- The V1 APIs remain available until version 8.10 to allow you time to migrate to the new Orchestration Cluster API.
- The Orchestration Cluster API becomes the new default instead of the Zeebe gRPC API (which is still [retained for high performance use cases](https://camunda.com/blog/2025/07/retaining-grpc-support/)).

:::info
For more information on upgrading and migrating, see the following upgrade guides:

- [Migrate from V1 APIs to the Orchestration Cluster API](migrate-to-camunda-api.md)
- [Migrate from gRPC API to the Orchestration Cluster API](migrate-from-grpc-to-orchestration-cluster-api.md)

:::

### Camunda Java Client

The [Camunda Java Client](/apis-tools/java-client/getting-started.md) is now the official Java library for connecting to Camunda 8 clusters, automating processes, and implementing job workers. It is designed for Java developers who want to interact programmatically with Camunda 8 via REST or gRPC, and is the successor to the Zeebe Java client.

- The Camunda Java Client is a drop-in replacement for Zeebe Java Client, however, Zeebe Java Client is still available.
- Zeebe Java Client is deprecated with 8.8 and will be removed with 8.10. This allows you to plan and transition to the Camunda Java Client without immediate pressure, allowing for a smoother migration process.

:::info
For more information on upgrading and migrating, see [migrate to Camunda Java Client](migrate-to-camunda-java-client.md).
:::

### Camunda Spring Boot Starter

The [Camunda Spring Boot Starter](/apis-tools/camunda-spring-boot-starter/getting-started.md) replaces the Spring Zeebe SDK. The SDK relies on the Camunda Java client, designed to enhance the user experience and introduce new features while maintaining compatibility with existing codebases.

The transition from Zeebe Spring SDK to Camunda Spring Boot Starter indicates significant architectural changes in Camunda 8.8.

- The Camunda Spring Boot Starter is a drop-in replacement for the Zeebe Spring SDK while still supporting the ZeebeClient.
- The Camunda Spring Boot Starter continues to provide support for the ZeebeClient, so existing applications using the Zeebe Spring SDK can transition smoothly without major changes.
- There is a grace period during which the old Zeebe client is still available until version 8.10. This allows you to adapt to the new SDK and make the required changes incrementally.

:::info
For more information on upgrading and migrating, see [migrate to Camunda Spring Boot Starter](migrate-to-camunda-java-client.md).
:::

### Camunda Process Test (CPT)

[Camunda Process Test (CPT)](/apis-tools/testing/getting-started.md) is a Java library to test your BPMN processes and your process application. CPT is the successor to Zeebe Process Test (ZPT), providing a more streamlined and efficient way to test process models in Camunda 8.8.

- CPT works seamlessly with the new Orchestration Cluster architecture, offering improved performance and usability.
- ZPT is officially deprecated in Camunda 8.8. You are encouraged to migrate to CPT.

| Release | Status                                                                                 |
| :------ | :------------------------------------------------------------------------------------- |
| 8.8     | Introduction of CPT as the successor to ZPT.                                           |
| 8.9     | Continued support for both ZPT and CPT.                                                |
| 8.10    | ZPT will be removed completely. You must have migrated your tests to CPT by this time. |

:::info
For more information on upgrading and migrating,
see [migrate to Camunda Process Test](migrate-to-camunda-process-test.md).
:::

### Camunda user tasks

[Camunda user tasks](/components/modeler/bpmn/user-tasks/user-tasks.md#camunda-user-tasks) replace the deprecated job-based user tasks in Camunda 8.8, providing a more robust and flexible way to handle user tasks within process models.

- Camunda user tasks work seamlessly with the new Orchestration Cluster architecture, offering improved performance and usability.
- Job-based user tasks are deprecated in Camunda 8.8. You are encouraged to migrate to the new Camunda user uasks feature. The search functionality for job-based user tasks will be removed with 8.10.
- From 8.8, new functionality is only added only for the Camunda user task type.

:::info
For more information on upgrading and migrating, see [migrate to Camunda user tasks](migrate-to-camunda-user-tasks.md).
:::

### Tasklist GraphQL API

The previously deprecated Tasklist GraphQL API is removed in Camunda 8.8. This change is part of the broader architectural evolution towards the Orchestration Cluster API, which provides a more unified and consistent interface for managing tasks and workflows.

Check the Orchestration Cluster API on User Tasks for more information on how to manage user tasks in Camunda 8.8.

## Next steps

Ready to upgrade and migrate? Complete the following steps:

1. **Coordinate your platform and development teams**: Ensure your Orchestration Cluster is upgraded to 8.8 before upgrading your application clients.

2. **Review migration guides**: Coming soon: Links to detailed guides on each component migration.
