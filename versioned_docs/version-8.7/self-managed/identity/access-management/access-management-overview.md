---
id: access-management-overview
title: Access Management Overview
sidebar_label: "Overview"
description: "Access Management and Permissions overview"
---

With Identity you can manage the access to Camunda 8 using the following concepts:

- APIs represent the different Camunda 8 components (e.g., Operate, Tasklist). Each [APIs defines for itself a set of permissions](#available-permissions) that can be used to control access to it
- Permissions are [organized in Roles](./manage-permissions.md#managing-permissions-for-roles), which can be assigned to Users either directly or via Groups. Additonally, permissions can be [assigned to your custom Application](./manage-permissions.md#managing-permissions-for-applications) (e.g., job worker)
- Optionally, you can grant more fine-grined access control to Camunda 8 resources to Users or Groups using [resource authorizations](./resource-authorizations.md)

## Available Permissions

Each API (representing a component) defines for itself a set of permissions that can be used to control access to it. The following permissions are available:

| Component   | API                                | Permissions                                                 | Descriptions                                                                                                                                                                                                                                                                                                                                                                                                          |
| ----------- | ---------------------------------- | ----------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Identity    | `Camunda Identity Resource Server` | `read` <br/> `read:users` <br/> `write`                     | Read access to entire UI <br/> Access only the Users UI and related subpages <br/> Write access entire UI                                                                                                                                                                                                                                                                                                             |
| Operate     | `Operate API`                      | <br/>`read:*` <br/> `write:*`                               | _(Read access to APIs is not controlled by permissions)_ <br/>Read access to UI<br/>Write access to UI and API                                                                                                                                                                                                                                                                                                        |
| Optimize    | `Optimize API`                     | `write:*`                                                   | Read and Write access to entire UI and all APIs                                                                                                                                                                                                                                                                                                                                                                       |
| Tasklist    | `Tasklist API`                     | <br/>`read:*` <br/> `write:*`                               | _(Read access to APIs is not controlled by permissions)_ <br/>Read access to UI<br/>Write access to UI and API                                                                                                                                                                                                                                                                                                        |
| Web Modeler | `Web Modeler Internal API`         | `write:*` <br/> `admin:*`                                   | Access to UI, further managed by [project permissions](../../../../components/modeler/web-modeler/collaboration.md#access-rights-and-permissions) <br/> Elevated access to UI (see [super-user mode](../../../../components/modeler/web-modeler/collaboration.md#super-user-mode) and [publishing Connector templates](../../../../components/connectors/manage-connector-templates.md#publish-a-connector-template)) |
| Web Modeler | `Web Modeler API`                  | `create:*` <br/> `read:*` <br/> `update:*` <br/> `delete:*` | Access to `POST` endpoints of the [API](../../../../apis-tools/web-modeler-api/index.md) <br/> Access to `GET` endpoints of the [API](../../../../apis-tools/web-modeler-api/index.md) <br/> Access to `PATCH` and `PUT` endpoints of the [API](../../../../apis-tools/web-modeler-api/index.md) <br/> Access to `DELETE` endpoints of the [API](../../../../apis-tools/web-modeler-api/index.md)                     |

:::note
Permissions granted to a user or M2M application are added to the `permissions.{audience}` claim of the access token.
:::
