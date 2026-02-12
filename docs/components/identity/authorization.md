---
id: authorization
title: Authorizations
description: "Learn how to manage authorizations to an Orchestration Cluster."
---

import AuthImg from './img/create-authorization-tab.png';

Use authorizations to control access to resources in your Orchestration Cluster.

## About authorizations

An authorization grants an owner access to a resource and defines the specific permissions they have.

- Owner: The entity that receives permissions, such as a [user](user.md), [group](group.md), [role](role.md), [client](client.md), or [mapping rule](mapping-rules.md).
  - In SaaS deployments, the username is the user's email address.
  - In Self-Managed deployments, the username must match [the value of the claim configured as `username-claim`](/self-managed/components/orchestration-cluster/identity/connect-external-identity-provider.md#step-4-configure-the-oidc-connection-details).
- Resource: The object that the permissions apply to, such as a process definition, decision definition, or system. See the full list of [available resources](/components/concepts/access-control/authorizations.md#available-resources).

Each authorization specifies which permissions the owner has for the resource (for example, `READ`, `UPDATE`, `DELETE`).

For an authorization to apply, [enable it in your cluster configuration](/components/concepts/access-control/authorizations.md#configuration).

To learn more, see [Orchestration Cluster authorizations](/components/concepts/access-control/authorizations.md).

## Create an authorization in Identity

To create a new authorization:

1. Log in to Identity, and select the **Authorizations** tab.
2. Select a resource type from the list on the left, and select **Create authorization**.
3. Enter the following information:
   - **Owner type**: The entity to which you want to assign permissions, such as a user, group, role, client, or mapping rule.
   - **Owner ID**: The ID of the owner.
   - **Resource type**: The selected resource type.
   - **Resource scope**: Choose how this authorization is scoped:
     - By **Resource ID**, or
     - For `USER_TASK`, by **Resource property name** with the `PROPERTY` matcher.
   - **Resource ID**: The ID of the resource within the selected resource type. Use `*` to grant permissions for all resources of that type.
   - **Resource property name** _(USER_TASK only)_: The task property used when scoping access with the `PROPERTY` matcher. Supported values are:
     - `assignee`
     - `candidateUsers`
     - `candidateGroups`

   Only one of **Resource ID** or **Resource property name** can be specified.
   If you use a resource property, set the matcher to `PROPERTY`.

4. Select the permissions you want to grant.
5. Click **Create authorization**.

The authorization is created, and the owner is granted the specified permissions.

<img src={AuthImg} alt="Create authorization tab" class="img-700"/>

## User task authorizations

To support fine-grained access to user tasks in Tasklist and the Orchestration Cluster REST API, Identity provides a **USER_TASK** resource type with the following permissions:

- `READ`: View the task and its properties.
- `UPDATE`: Perform updates on the task (for example, change assignment, due dates, or candidate users or groups).
- `CLAIM`: Claim a task from a pool of candidate users or groups.
- `COMPLETE`: Complete the task, with or without variables.

### Configure property-based user task authorizations

With property-based user task authorizations, you can grant permissions based on task assignment rather than a specific task ID. A user is authorized when their username or group membership matches a corresponding task property.

To create a property-based user task authorization:

1. Log in to Identity, and select the **Authorizations** tab.
2. Create a new authorization for the `USER_TASK` resource type.
3. Specify the **Owner type** and **Owner ID** (for example, a role that represents task workers).
4. Set the matcher to `PROPERTY`.
5. Select the task property used to scope access:
   - `assignee`
   - `candidateUsers`
   - `candidateGroups`
6. Select the permissions to grant (for example `READ`, `CLAIM`, and `COMPLETE`).
7. Create the authorization.

You can't combine multiple task properties in a single authorization. To cover all three properties (`assignee`, `candidateUsers`, `candidateGroups`), create one authorization per property.

### Authorization for user tasks

You can control access to user tasks using a combination of process-level and task-level permissions:

- Process-level permissions on the `Process Definition` resource, such as `READ_USER_TASK` and `UPDATE_USER_TASK`.
- Task-level permissions on the `USER_TASK` resource, such as `READ`, `UPDATE`, `CLAIM`, and `COMPLETE`, which are typically scoped using property-based access control on task properties such as `assignee`, `candidateUsers`, and `candidateGroups`.

When both process-level and task-level permissions exist, process-level permissions take precedence.
If a user already has the required `Process Definition` permission for an operation (for example, `UPDATE_USER_TASK`), the system does not evaluate `USER_TASK` permissions for that operation. Task-level `USER_TASK` permissions are evaluated only when no effective process-level permission exists for that user and process definition.

For Tasklist-specific behavior and practical authorization patterns, see [User task authorization in Tasklist](../tasklist/user-task-authorization.md).

### Authorization examples

#### Supervisor: broad process-level access

To allow a supervisor to see and manage all user tasks for one or more processes:

- Resource type: `PROCESS_DEFINITION`
- Resource scope: by **Resource ID**
- Resource ID: `*` (or a specific BPMN process ID)
- Permissions: `READ_USER_TASK`, `UPDATE_USER_TASK`

This grants broad visibility and control over all user tasks for the selected processes, without needing task-level authorizations.

#### Task worker: property-based access

The default task worker role is created with property-based user task authorizations:

- Role ID: `task-worker`
- Resource type: `USER_TASK`
- Resource scope: by **Resource property name** (`PROPERTY` matcher)
- Property name: `assignee`, `candidateUsers`, or `candidateGroups`
- Permissions: `READ`, `CLAIM`, `COMPLETE`

This ensures that task workers can only see, claim, and complete tasks where they are the assignee, a candidate user, or in a candidate group.

:::note
Default roles, including task worker, are recreated each time the cluster starts and are not customizable.
To adjust permissions, create and manage custom roles instead.
:::

## Change an existing authorization

:::tip
Partial wildcard matching, for example `my-resource*`, is not supported.
:::

## Update an authorization

Authorizations cannot be updated after they are created.

To edit an authorization, [delete](#delete-an-authorization) the existing one, and create a new authorization with the updated permissions.

## Delete an authorization

Delete an authorization by completing the following steps:

1. Log in to Identity, and select the **Authorizations** tab.
2. Select the resource type of the authorization you want to delete.
3. In the list, find the authorization you want to remove and click **Delete**.
4. Confirm the deletion by clicking **Delete** in the confirmation dialog.

The authorization is deleted, and the owner no longer has the permissions granted by it.

:::caution
Deleting an authorization is permanent and can't be undone.
:::
