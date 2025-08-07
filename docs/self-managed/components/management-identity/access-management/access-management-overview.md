---
id: access-management-overview
title: "Manage access and permissions"
sidebar_label: "Access and permissions"
description: "Access Management and Permissions overview"
---

Manage and control access to Orchestration Cluster REST APIs and custom applications using permissions and roles.

## About permissions

When using and managing permissions, it is important to understand the following key concepts:

- APIs represent the different Camunda 8 components, such as Operate, Tasklist, and so on.
- Each [API defines its own set of permissions](#permissions) that to control API access.
- Permissions are [organized using roles](./manage-permissions.md#manage-permissions-for-roles) that can be assigned to users either directly or via Groups.
- You can also [assign permissions to your custom application](./manage-permissions.md#manage-application-permissions), such as a job worker for example.

:::note
In the Orchestration Cluster you can use [authorizations](/components/concepts/access-control/authorizations.md) to grant more fine-grained access control to Orchestration Cluster resources.
:::

## Permissions

Each API (representing a component) defines its own set of permissions to control API access.

The following permissions are available:

| Component   | API                                | Permissions available                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| :---------- | :--------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Identity    | `Camunda Identity Resource Server` | <p><ul><li>`read`: Read access to entire UI</li><li><p>`read:users`: Access only the Users UI and related subpages.</p></li><li><p>`write`: Write access entire UI.</p></li></ul></p>                                                                                                                                                                                                                                                                       |
| Operate     | `Operate API`                      | <p><ul><li>`read:*`: _(Read access to APIs is not controlled by permissions)_. Read access to the UI.</li><li><p>`write:*`: Write access to the UI and API.</p></li></ul></p>                                                                                                                                                                                                                                                                               |
| Optimize    | `Optimize API`                     | <p><ul><li>`write:*`: Read and Write access to entire UI and all APIs.</li></ul></p>                                                                                                                                                                                                                                                                                                                                                                        |
| Tasklist    | `Tasklist API`                     | <p><ul><li>`read:*`: _(Read access to APIs is not controlled by permissions)_. Read access to the UI.</li><li><p>`write:*`: Write access to the UI and API.</p></li></ul></p>                                                                                                                                                                                                                                                                               |
| Web Modeler | `Web Modeler Internal API`         | <p><ul><li>`write:*`: Access to the UI, further managed by [project permissions](/components/modeler/web-modeler/collaboration.md#access-rights-and-permissions).</li><li><p>`admin:*`: Elevated access to the UI (see [super-user mode](/components/modeler/web-modeler/collaboration.md#super-user-mode) and [publishing connector templates](/components/connectors/manage-connector-templates.md#publish-a-connector-template)).</p></li></ul></p>      |
| Web Modeler | `Web Modeler API`                  | <p><ul><li>`create:*`: Access to `POST` endpoints of the [API](/apis-tools/web-modeler-api/index.md).</li><li><p>`read:*`: Access to `GET` endpoints of the [API](/apis-tools/web-modeler-api/index.md).</p></li><li><p>`update:*`: Access to `PATCH` and `PUT` endpoints of the [API](/apis-tools/web-modeler-api/index.md).</p></li><li><p>`delete:*`: Access to `DELETE` endpoints of the [API](/apis-tools/web-modeler-api/index.md).</p></li></ul></p> |

:::note
Permissions granted to a user or M2M application are added to the `permissions.{audience}` claim of the access token.
:::
