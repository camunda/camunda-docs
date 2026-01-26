---
title: Orchestration Cluster authorization
description: Learn how to control access to components and APIs in Camunda 8's Orchestration Cluster using the built-in authorization system.
keywords:
  [
    camunda 8,
    orchestration cluster,
    zeebe,
    operate,
    tasklist,
    authorization,
    access control,
    permissions,
  ]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Camunda 8's Orchestration Cluster provides a fine-grained authorization system for controlling access to web components and APIs.

## About Orchestration Cluster authorization

This system only applies to the following Orchestration Cluster components:

- [Zeebe](../../zeebe/zeebe-overview.md)
- [Identity](../../identity/identity-introduction.md)
- [Operate](../../operate/operate-introduction.md)
- [Tasklist](../../tasklist/introduction-to-tasklist.md)
- [Orchestration Cluster APIs](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-overview.md)

:::note
These authorizations do not apply to other Camunda services, such as Web Modeler or Optimize.
:::

## How authorization works

The authorization system is built on the principle of **least privilege**.

- When enabled, no access is granted by default, and all permissions must be explicitly assigned.
- There are no "deny" rules – if a permission is not explicitly granted, access is denied.

This model is enforced across both web components and API requests.

### Owners, resources, and permissions

At its core, an authorization grants an **owner** specific **permissions** on a **resource**. For example:

- User `john.doe` can be authorized to create new users.
- Group `devOps` can be authorized to delete the group `sales`.
- Role `processOwner` can be authorized to deploy and run all processes.

#### Owners

An **owner** is an entity that receives permissions. An authorization can be assigned to any of the following owner types:

- User
- Group
- Role
- Client
- Mapping rule

#### Resources

A **resource** is an object that users interact with and that needs to be secured. Each resource has a unique set of permissions that can be granted.

Examples of resources:

- Process definition
- Decision definition
- System
- User

#### Permissions

A **permission** is a specific action that an owner is allowed to perform on a resource. Permissions are unique to each resource type.

For example, a `Process Definition` resource has a `CREATE_PROCESS_INSTANCE` permission, while a `User` resource has a `DELETE` permission.

## Available resources

The following table lists all resources that support authorization in the **Orchestration Cluster** (Zeebe, Operate, Tasklist, **Orchestration Cluster** APIs), as well as the available permissions per resource.

| Resource type                        | Resource key example                   | Resource key type                    | Supported permissions                                                                                                                                                                                                                                                                                                                                                                                                                      |
| :----------------------------------- | :------------------------------------- | :----------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Authorization**                    | `*`                                    | All authorizations                   | `CREATE`, `READ`, `UPDATE`, `DELETE`                                                                                                                                                                                                                                                                                                                                                                                                       |
| **Batch**                            | `*`                                    | All batches                          | `CREATE`, `CREATE_BATCH_OPERATION_CANCEL_PROCESS_INSTANCE`, `CREATE_BATCH_OPERATION_DELETE_PROCESS_INSTANCE`, `CREATE_BATCH_OPERATION_MIGRATE_PROCESS_INSTANCE`, `CREATE_BATCH_OPERATION_MODIFY_PROCESS_INSTANCE`, `CREATE_BATCH_OPERATION_RESOLVE_INCIDENT`, `CREATE_BATCH_OPERATION_DELETE_DECISION_INSTANCE`, `CREATE_BATCH_OPERATION_DELETE_DECISION_DEFINITION`, `CREATE_BATCH_OPERATION_DELETE_PROCESS_DEFINITION`, `READ`, `UPDATE` |
| **Component**                        | `*`, `operate`, `tasklist`, `identity` | All components, component name       | `ACCESS`                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| **Decision Definition**              | `*`, `order_decision`                  | All decisions / Decision ID          | `CREATE_DECISION_INSTANCE`, `READ_DECISION_DEFINITION`, `READ_DECISION_INSTANCE`, `DELETE_DECISION_INSTANCE`                                                                                                                                                                                                                                                                                                                               |
| **Decision Requirements Definition** | `*`, `order_decision`                  | All DRDs / DRD ID                    | `READ`                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| **Document**                         | `*`                                    | All Documents                        | `CREATE`, `READ`, `DELETE`                                                                                                                                                                                                                                                                                                                                                                                                                 |
| **Group**                            | `*`, `accounting`                      | All groups / Group ID                | `CREATE`, `READ`, `UPDATE`, `DELETE`                                                                                                                                                                                                                                                                                                                                                                                                       |
| **Mapping Rule**                     | `*`, `my_mapping`                      | All mappings / Mapping ID            | `CREATE`, `READ`, `UPDATE`, `DELETE`                                                                                                                                                                                                                                                                                                                                                                                                       |
| **Message**                          | `*`                                    | All messages                         | `CREATE`, `READ`                                                                                                                                                                                                                                                                                                                                                                                                                           |
| **Process Definition**               | `*`, `order_process`                   | All processes / BPMN Process ID      | `CREATE_PROCESS_INSTANCE`, `READ_PROCESS_DEFINITION`, `READ_PROCESS_INSTANCE`, `READ_USER_TASK`, `UPDATE_PROCESS_INSTANCE`, `UPDATE_USER_TASK`, `MODIFY_PROCESS_INSTANCE`, `CANCEL_PROCESS_INSTANCE`, `DELETE_PROCESS_INSTANCE`                                                                                                                                                                                                            |
| **Resource**                         | `*`, `my_form`, `order_process`        | All resources / Form ID / Process ID | `CREATE (* resource id only)`, `READ`, `DELETE_DRD`, `DELETE_FORM`, `DELETE_PROCESS`, `DELETE_RESOURCE`                                                                                                                                                                                                                                                                                                                                    |
| **Role**                             | `*`, `myrole`                          | All roles / Role ID                  | `CREATE`, `READ`, `UPDATE`, `DELETE`                                                                                                                                                                                                                                                                                                                                                                                                       |
| **System**                           | `*`                                    | All system operations                | `READ`, `READ_USAGE_METRIC`, `UPDATE`                                                                                                                                                                                                                                                                                                                                                                                                      |
| **Tenant**                           | `*`, `tenantA`                         | All tenants / Tenant ID              | `CREATE`, `READ`, `UPDATE`, `DELETE`                                                                                                                                                                                                                                                                                                                                                                                                       |
| **User**                             | `*`, `felix.mueller`                   | All users / Username                 | `CREATE`, `READ`, `UPDATE`, `DELETE`                                                                                                                                                                                                                                                                                                                                                                                                       |

## Configuration

### SaaS configuration

In Camunda 8 SaaS, authorizations can be enabled or disabled per cluster. This setting can be changed by:

- Organization admins
- Organization owners

### Self-Managed configuration

In Self-Managed deployments, you can enable the authorization system using:

<Tabs>
  <TabItem value="yaml" label="application.yaml" default>
```yaml
camunda.security.authorizations.enabled: true
```
  </TabItem>
  <TabItem value="env" label="Environment variables">
```yaml
CAMUNDA_SECURITY_AUTHORIZATIONS_ENABLED=true
```
  </TabItem>
  <TabItem value="helm" label="Helm values">
```yaml
orchestration.security.authorizations.enabled=true
```
  </TabItem>
</Tabs>

## Security considerations

Certain permissions grant powerful capabilities and should be assigned with caution. It is critical to ensure that only trusted users and clients are granted these permissions to maintain the security and integrity of your system.

### `CREATE` permission for the Resource (deployment)

Granting `CREATE` permission on the **Resource** is equivalent to allowing remote code execution. When a user deploys a BPMN model, it can contain executable code in script tasks, service tasks, or listeners that will be run by the process engine.

Only grant this permission to users and clients who are fully trusted to deploy and execute code in your environment.

### `CREATE`/`UPDATE` permissions for the User

The `CREATE` and `UPDATE` permissions for the **User** resource are highly sensitive. When a user's password is set or changed via Identity, there are no security controls enforced, such as password complexity policies.

This permission should only be assigned to trusted administrators.

### System access permissions

Permissions that control system access are particularly security-sensitive.
This includes CRUD operations to the following resources:

- **System**
- **User**
- **Group**
- **Role**
- **Mapping rule**
- **Tenant**

These permissions should be strictly limited to trusted system administrators who are responsible for managing user access control.

### No validation of owner and resource IDs

When you create an authorization, the Orchestration Cluster validates the owner depending on the `ownerType`. For `USER`, `ROLE`, `GROUP`, and `MAPPING_RULE`, the owner must exist in Identity. For `CLIENT`, the owner is not validated.

The Orchestration Cluster does not validate whether the resource exists when creating an authorization.

- This behavior provides flexibility to create authorizations for entities outside of the system (for example OIDC users) or for entities that will be created in the future (for example creating process definition authorizations before the process is deployed).

- However, you should keep this in mind when setting up new users, groups, roles, and so on, and verify that the ID of the new entity does not accidentally match an existing authorization.

## Default roles

Camunda provides predefined roles to simplify access management:

| Role ID            | Purpose                                                                             | Typical authorizations                                                                                                                                                                                                                                                  |
| ------------------ | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `admin`            | Full control over all **Orchestration Cluster** resources and components.           | All permissions for all resources: `READ`, `CREATE`, `UPDATE`, `DELETE`, including `ACCESS` to all web components.                                                                                                                                                      |
| `app-integrations` | Technical role for executing app integration calls.                                 | `READ_PROCESS_DEFINITION` on **Process Definition** (`*`), `CREATE_PROCESS_INSTANCE`, `READ_PROCESS_INSTANCE`, `UPDATE_PROCESS_INSTANCE` on **Process Definition** (`*`), `READ_USER_TASK`, `UPDATE_USER_TASK` on **Process Definition** (`*`) `CREATE` on **Document** |
| `connectors`       | Technical role for executing connector calls.                                       | `READ_PROCESS_DEFINITION` on **Process Definition** (`*`), `UPDATE_PROCESS_INSTANCE` on **Process Definition** (`*`), `CREATE` on **Message** (`*`), `CREATE`, `READ`, and `DELETE` on **Document**                                                                     |
| `readonly-admin`   | Audit-focused users who need read-only access across the **Orchestration Cluster**. | `READ` for all resources, including `READ_PROCESS_DEFINITION`, `READ_PROCESS_INSTANCE`, `READ_USER_TASK`, etc.                                                                                                                                                          |
| `rpa`              | Role for RPA workers.                                                               | `READ` on **Resource** (`*`), `UPDATE_PROCESS_INSTANCE` on **Process Definition** (`*`)                                                                                                                                                                                 |

### Role assignment in SaaS

- **admin**: Automatically assigned to organization owner and admin.
- **connectors**: Automatically assigned to Connector Runtime in cluster deployment.
- **app-integrations**: Automatically assigned to app integration clients in cluster deployment.
- **readonly-admin**: Automatically assigned to Camunda Support agents for support cases.

## Common use cases

### Web component access

Users need specific permissions to access **Orchestration Cluster** web components:

- **UI access**: Resource type `Component` and Resource Key is one of the components Operate, Tasklist, Identity
  - Example: `operate` for Operate access
  - Example: `tasklist` for Tasklist access
  - Example: `identity` for Identity access
  - Example: `*` for access to all components
- Without these permissions, users cannot log in to the components

### Resource access

Within components, users need additional permissions for specific resources, for example:

- **Process related**: Resource type `processDefinition`
  - `READ_PROCESS_DEFINITION` to view process models
  - `CREATE_PROCESS_INSTANCE` to start new processes
  - `UPDATE_PROCESS_INSTANCE` to update running instances
  - `MODIFY_PROCESS_INSTANCE` to modify running instances
  - `CANCEL_PROCESS_INSTANCE` to cancel running instances
  - `DELETE_PROCESS_INSTANCE` to delete completed instances

- **Decision related**: Resource type `decisionDefinition`
  - `READ_DECISION_DEFINITION` to view DMN models
  - `CREATE_DECISION_INSTANCE` to execute decisions

### API access

When implementing your own integrations (for example, using a Camunda client), you should consider the following:

- **Job workers**: Resource type `processDefinition`
  - `UPDATE_PROCESS_INSTANCE` to activate or complete jobs for the specific process definitions
