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

The Orchestration Cluster in Camunda 8 provides a fine-grained authorization system for controlling access to web components and APIs.

## Orchestration Cluster authorization overview

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

The authorization system is built on the principle of least privilege.

- When enabled, no access is granted by default, and all permissions must be explicitly assigned.
- There are no "deny" rules – if a permission is not explicitly granted, access is denied.

This model is enforced across both web components and API requests.

### Owners, resources, and permissions

At its core, an authorization grants an owner specific permissions on a resource. For example:

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

A resource is an object that users interact with and that needs to be secured. Each resource has a unique set of permissions that can be granted.

Examples of resources:

- Process Definition
- Decision Definition
- System
- User

#### Permissions

A permission is a specific action that an owner is allowed to perform on a resource. Permissions are unique to each resource type.

For example, a `Process Definition` resource has a `CREATE_PROCESS_INSTANCE` permission, while a `User` resource has a `DELETE` permission.

## Available resources

The following table lists all resources that support authorization in the Orchestration Cluster (Zeebe, Operate, Tasklist, Orchestration Cluster APIs), as well as the available permissions per resource.

| Resource type                    | Resource key example                   | Resource key type                    | Supported permissions                                                                                                                                                                                                                                                                                                                                                                                                                      |
| :------------------------------- | :------------------------------------- | :----------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Authorization                    | `*`                                    | All authorizations                   | `CREATE`, `READ`, `UPDATE`, `DELETE`                                                                                                                                                                                                                                                                                                                                                                                                       |
| Batch                            | `*`                                    | All batches                          | `CREATE`, `CREATE_BATCH_OPERATION_CANCEL_PROCESS_INSTANCE`, `CREATE_BATCH_OPERATION_DELETE_PROCESS_INSTANCE`, `CREATE_BATCH_OPERATION_MIGRATE_PROCESS_INSTANCE`, `CREATE_BATCH_OPERATION_MODIFY_PROCESS_INSTANCE`, `CREATE_BATCH_OPERATION_RESOLVE_INCIDENT`, `CREATE_BATCH_OPERATION_DELETE_DECISION_INSTANCE`, `CREATE_BATCH_OPERATION_DELETE_DECISION_DEFINITION`, `CREATE_BATCH_OPERATION_DELETE_PROCESS_DEFINITION`, `READ`, `UPDATE` |
| Component                        | `*`, `operate`, `tasklist`, `identity` | All components, component name       | `ACCESS`                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Decision Definition              | `*`, `order_decision`                  | All decisions / Decision ID          | `CREATE_DECISION_INSTANCE`, `READ_DECISION_DEFINITION`, `READ_DECISION_INSTANCE`, `DELETE_DECISION_INSTANCE`                                                                                                                                                                                                                                                                                                                               |
| Decision Requirements Definition | `*`, `order_decision`                  | All DRDs / DRD ID                    | `READ`                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Document                         | `*`                                    | All Documents                        | `CREATE`, `READ`, `DELETE`                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Group                            | `*`, `accounting`                      | All groups / Group ID                | `CREATE`, `READ`, `UPDATE`, `DELETE`                                                                                                                                                                                                                                                                                                                                                                                                       |
| Mapping Rule                     | `*`, `my_mapping`                      | All mappings / Mapping ID            | `CREATE`, `READ`, `UPDATE`, `DELETE`                                                                                                                                                                                                                                                                                                                                                                                                       |
| Message                          | `*`                                    | All messages                         | `CREATE`, `READ`                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Process Definition               | `*`, `order_process`                   | All processes / BPMN Process ID      | `CREATE_PROCESS_INSTANCE`, `READ_PROCESS_DEFINITION`, `READ_PROCESS_INSTANCE`, `READ_USER_TASK`, `UPDATE_PROCESS_INSTANCE`, `UPDATE_USER_TASK`, `MODIFY_PROCESS_INSTANCE`, `CANCEL_PROCESS_INSTANCE`, `DELETE_PROCESS_INSTANCE`                                                                                                                                                                                                            |
| Resource                         | `*`, `my_form`, `order_process`        | All resources / Form ID / Process ID | `CREATE (* resource id only)`, `READ`, `DELETE_DRD`, `DELETE_FORM`, `DELETE_PROCESS`, `DELETE_RESOURCE`                                                                                                                                                                                                                                                                                                                                    |
| Role                             | `*`, `myrole`                          | All roles / Role ID                  | `CREATE`, `READ`, `UPDATE`, `DELETE`                                                                                                                                                                                                                                                                                                                                                                                                       |
| System                           | `*`                                    | All system operations                | `READ`, `READ_USAGE_METRIC`, `UPDATE`                                                                                                                                                                                                                                                                                                                                                                                                      |
| Tenant                           | `*`, `tenantA`                         | All tenants / Tenant ID              | `CREATE`, `READ`, `UPDATE`, `DELETE`                                                                                                                                                                                                                                                                                                                                                                                                       |
| User                             | `*`, `felix.mueller`                   | All users / Username                 | `CREATE`, `READ`, `UPDATE`, `DELETE`                                                                                                                                                                                                                                                                                                                                                                                                       |
| User Task                        | `*`                                    | All user tasks                       | `READ`, `UPDATE`, `COMPLETE`, `CLAIM`                                                                                                                                                                                                                                                                                                                                                                                                      |

### User task authorizations and precedence

User task access in the Orchestration Cluster can be controlled at two levels:

- Process-level permissions on the `Process Definition` resource, for example:
  - `READ_USER_TASK`: Read all user tasks of that process definition.
  - `UPDATE_USER_TASK`: Update, claim, and complete all user tasks of that process definition.
  - Where configured, `CLAIM_USER_TASK` and `COMPLETE_USER_TASK`.

- Task-level permissions on the `User Task` resource type (`USER_TASK` in the API):
  - `READ`, `UPDATE`, `COMPLETE`, `CLAIM` on user tasks, typically scoped using property-based access control on task attributes.

These two levels are evaluated with clear precedence:

- If a user has the required process‑level permission (for example, `READ_USER_TASK` or `UPDATE_USER_TASK` on `Process Definition`), that permission takes precedence.
- In that case, the engine does not perform additional checks against `User Task` authorizations for the same operation.
- If the user does not have sufficient process‑level permissions, the engine evaluates `User Task` permissions instead (including property‑based authorizations described below).

This allows you to:

- Give task workers narrow, task‑level permissions so they only see and work on tasks that are relevant to them.
- Give managers or administrators broader, process‑level permissions when they need to oversee or manage all tasks for a process definition.

### Property-based access control for user tasks

Task-level `USER_TASK` permissions are usually applied using property-based access control rather than per-task configuration.

Instead of granting permissions for specific task IDs, you can grant permissions based on the following user task properties:

- `assignee`
- `candidateUsers`
- `candidateGroups`

At runtime, when a user or client tries to read or modify a user task, the engine:

1. Collects the principal’s username and group memberships.
2. Determines which of the above properties match the user task (for example, the user is the assignee, appears in `candidateUsers`, or belongs to one of the `candidateGroups`).
3. Checks for `User Task` authorizations that:
   - Use a `PROPERTY` matcher with a matching property name, and
   - Include the required permission (for example, `READ`, `CLAIM`, or `COMPLETE`).

If at least one matching authorization is found, the user is authorized for that operation on the task.

Property‑based access control enables common scenarios where:

- Task workers only see, claim, and complete tasks where they are the assignee, a candidate user, or a member of a candidate group.
- Task managers rely on process‑level permissions for broader oversight when needed.

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

- System
- User
- Group
- Role
- Mapping rule
- Tenant

These permissions should be strictly limited to trusted system administrators who are responsible for managing user access control.

### No validation of owner and resource IDs

When you create an authorization, the Orchestration Cluster does not validate if the owner or the resource exists at that point in time.

- This behavior lets you create authorizations for entities outside of the system (for example OIDC users) or for entities that will be created in the future (for example creating process definition authorizations before the process is deployed).

- However, you should keep this in mind when setting up new users, groups, roles, and so on, and verify that the ID of the new entity does not accidentally match an existing authorization.

### Process-level vs. task-level task permissions

When configuring access to user tasks, keep the following in mind:

- Granting `READ_USER_TASK` or `UPDATE_USER_TASK` on `Process Definition` gives broad access to all user tasks for that process definition.
- These process‑level permissions override task‑level checks: if a user has the required process‑level permission, the engine does not evaluate `User Task` authorizations for the same operation.

For most scenarios:

- Assign process‑level task permissions only to trusted roles such as task managers or administrators.
- Use `User Task` property‑based authorizations (and the default Task Worker role) to limit regular task workers to tasks where they are assignee, candidate user, or in a candidate group.

## Default roles

Camunda provides predefined roles to simplify access management:

| Role ID              | Purpose                                                               | Typical authorizations                                                                                                                                                                                                                                   |
| :------------------- | :-------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **admin**            | Full control over all Orchestration Cluster resources and components. | All permissions for all resources: `READ`, `CREATE`, `UPDATE`, `DELETE`, including `ACCESS` to all web components.                                                                                                                                       |
| **app-integrations** | Technical role for executing app integration calls.                   | `READ_PROCESS_DEFINITION` on Process Definition (`*`), `CREATE_PROCESS_INSTANCE`, `READ_PROCESS_INSTANCE`, `UPDATE_PROCESS_INSTANCE` on Process Definition (`*`), `READ_USER_TASK`, `UPDATE_USER_TASK` on Process Definition (`*`), `CREATE` on Document |
| **connectors**       | Technical role for executing connector calls.                         | `READ_PROCESS_DEFINITION` on Process Definition (`*`), `UPDATE_PROCESS_INSTANCE` on Process Definition (`*`), `CREATE` on Message (`*`), `CREATE`, `READ`, and `DELETE` on Document                                                                      |
| **readonly-admin**   | Audit-focused users who need read-only access across the cluster.     | `READ` for all resources, including `READ_PROCESS_DEFINITION`, `READ_PROCESS_INSTANCE`, `READ_USER_TASK`, etc.                                                                                                                                           |
| **rpa**              | Role for RPA workers.                                                 | `READ` on Resource (`*`), `UPDATE_PROCESS_INSTANCE` on Process Definition (`*`)                                                                                                                                                                          |
| **task-worker**      | Default role for task workers to handle their own user tasks.         | Property-based `User Task` authorizations on properties `assignee`, `candidateUsers`, `candidateGroups` with permissions `READ`, `CLAIM`, `COMPLETE` (one authorization per property).                                                                   |

### Role assignment in SaaS

- **admin**: Automatically assigned to organization owner and admin.
- **connectors**: Automatically assigned to Connector Runtime in cluster deployment.
- **app-integrations**: Automatically assigned to app integration clients in cluster deployment.
- **readonly-admin**: Automatically assigned to Camunda Support agents for support cases.

## Common use cases

### Web component access

Users need specific permissions to access Orchestration Cluster web components:

- UI access: Resource type `Component` and Resource Key is one of the components Operate, Tasklist, Identity
  - Example: `operate` for Operate access
  - Example: `tasklist` for Tasklist access
  - Example: `identity` for Identity access
  - Example: `*` for access to all components
- Without these permissions, users cannot log in to the components

#### Tasklist V1 and Tasklist V2

Tasklist uses different mechanisms to control user task visibility, depending on the API version:

- Tasklist V1: Uses user task access restrictions based on BPMN assignee, candidate users, and candidate groups. These restrictions are configured separately and apply only to Tasklist V1.
- Tasklist V2 and the Orchestration Cluster REST API: Use the Orchestration Cluster authorization model described on this page, including process‑level permissions on `Process Definition` and task‑level authorizations on `User Task` (with property‑based access control).

After switching from Tasklist V1 to Tasklist V2, user task access restrictions no longer apply. To restrict who can see, claim, and complete tasks in Tasklist V2, configure the appropriate `Process Definition` and `User Task` authorizations instead.

### Resource-level access

This section describes access to authorization resources, such as process definitions and decisions, not UI components or APIs. Users need additional permissions to access specific resources within web components:

- Process-related: Resource type `Process Definition`
  - `READ_PROCESS_DEFINITION` to view process models
  - `CREATE_PROCESS_INSTANCE` to start new processes
  - `UPDATE_PROCESS_INSTANCE` to update running instances
  - `MODIFY_PROCESS_INSTANCE` to modify running instances
  - `CANCEL_PROCESS_INSTANCE` to cancel running instances
  - `DELETE_PROCESS_INSTANCE` to delete completed instances

- Decision-related: Resource type `Decision Definition`
  - `READ_DECISION_DEFINITION` to view DMN models
  - `CREATE_DECISION_INSTANCE` to execute decisions

### API access

When implementing your own integrations (for example, using a Camunda client), you should consider the following:

- Job workers: Resource type `Process Definition`
  - `UPDATE_PROCESS_INSTANCE` to activate or complete jobs for the specific process definitions
