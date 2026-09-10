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
  - In Self-Managed deployments, the username must match [the value of the claim configured as `username-claim`](/self-managed/components/orchestration-cluster/admin/connect-external-identity-provider.md#step-4-configure-the-oidc-connection-details).
- Resource: The object that the permissions apply to, such as a process definition, decision definition, or system. See the full list of [available resources](/components/concepts/access-control/authorizations.md#available-resources).

Each authorization specifies which permissions the owner has for the resource (for example, `READ`, `UPDATE`, `DELETE`).

For an authorization to apply, [enable it in your cluster configuration](/components/concepts/access-control/authorizations.md#configuration).

To learn more, see [Orchestration Cluster authorizations](/components/concepts/access-control/authorizations.md).

## Create an authorization in Admin

To create a new authorization:

1. Log in to Admin, and select the **Authorizations** tab.
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

To support fine-grained access to user tasks in Tasklist and the Orchestration Cluster REST API, Admin provides a **USER_TASK** resource type with the following permissions:

- `READ`: View the task and its properties.
- `UPDATE`: Perform updates on the task (for example, change assignment, due dates, or candidate users or groups).
- `CLAIM`: Claim a task from a pool of candidate users or groups.
- `COMPLETE`: Complete the task, with or without variables.

### Configure property-based user task authorizations

With property-based user task authorizations, you can grant permissions based on task assignment rather than a specific task ID. A user is authorized when their username or group membership matches a corresponding task property.

To create a property-based user task authorization:

1. Log in to Admin, and select the **Authorizations** tab.
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

- Process-level permissions on the `Process Definition` resource, such as `READ_USER_TASK`, `CLAIM_USER_TASK`, `COMPLETE_USER_TASK`, and `UPDATE_USER_TASK`.
- Task-level permissions on the `USER_TASK` resource, such as `READ`, `UPDATE`, `CLAIM`, and `COMPLETE`, which are typically scoped using property-based access control on task properties such as `assignee`, `candidateUsers`, and `candidateGroups`.

When both process-level and task-level permissions exist, process-level permissions take precedence.
If a user already has the required `Process Definition` permission for an operation (for example, `READ_USER_TASK`, `CLAIM_USER_TASK`, `COMPLETE_USER_TASK`, or `UPDATE_USER_TASK`), the system does not evaluate `USER_TASK` permissions for that operation.
Task-level `USER_TASK` permissions are evaluated only when no effective process‑level permission exists for that user and process definition.

For Tasklist-specific behavior and practical authorization patterns, see [User task authorization in Tasklist](../tasklist/user-task-authorization.md).

### Authorization examples

#### Supervisor: broad process-level access

To allow a supervisor to see and manage all user tasks for one or more processes:

- Resource type: `PROCESS_DEFINITION`
- Resource scope: by **Resource ID**
- Resource ID: `*` (or a specific BPMN process ID)
- Permissions: `READ_USER_TASK`, `UPDATE_USER_TASK`, `CLAIM_USER_TASK`, `COMPLETE_USER_TASK`

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

## Secret authorizations

Use authorizations on the `SECRET` resource to control which owners can see that a secret reference exists, and which owners can resolve it to its actual value. For background on the `camunda.secrets.<name>` reference syntax, see [secret resolution](/components/concepts/secret-resolution.md).

:::note
Secret resolution is an [alpha feature](/components/early-access/alpha/alpha-features.md) and may change in future releases.
:::

A `SECRET` authorization grants one of two permissions:

- `READ`: Lets the owner see that a secret reference exists, for example in a `POST /v2/secrets/list` response.
- `REVEAL`: Lets the owner resolve a reference to its actual value, for example with `POST /v2/secrets/resolve`.

`REVEAL` is never implied by `READ`, and it is never granted automatically alongside it. Grant `REVEAL` only to trusted owners, since it exposes secret values. See [the REVEAL permission for the Secret](/components/concepts/access-control/authorizations.md#reveal-permission-for-the-secret) for why the two permissions are kept separate.

The **Resource ID** you choose determines the scope of the grant:

- `*` grants the permission for every secret reference in the cluster.
- `camunda.secrets.<name>` scopes the permission to one secret reference, for example `camunda.secrets.demoApiToken`.

### Grant secret access to an owner

To grant an owner access to secrets:

1. Log in to Admin, and select the **Authorizations** tab.
2. Click **Create authorization**.
3. Set the **Owner type** to the entity you want to grant access to, such as `Client`, `User`, `Group`, `Role`, or `Mapping rule`.
4. In the **Owner ID** field, enter the owner's ID. For a client, use its **Client ID**.
5. Set the **Resource type** to `SECRET`.
6. In the **Resource ID** field, enter `*` for every secret, or `camunda.secrets.<name>` for one secret.
7. Select **READ** to let the owner see the reference exists, **REVEAL** to let the owner resolve it to its value, or both.
8. Click **Create authorization**.

An owner that resolves a reference without `REVEAL` receives an `ACCESS_DENIED` error instead of the secret value. See [Secrets](/apis-tools/orchestration-cluster-api-rest/orchestration-cluster-api-rest-secrets.md#review-per-reference-errors) for the full list of resolve and list errors.

### Secret authorization examples

#### Full secret access for a client

To let a client list and resolve every secret in the cluster:

- Owner type: `Client`
- Resource type: `SECRET`
- Resource ID: `*`
- Permissions: `READ`, `REVEAL`

Grant this only to trusted clients, since it exposes every secret value in the cluster.

#### Access to one secret

To scope a client to a single secret reference:

- Owner type: `Client`
- Resource type: `SECRET`
- Resource ID: `camunda.secrets.demoApiToken`
- Permissions: `READ`, `REVEAL`

Create one authorization per secret reference the client needs. Resource IDs don't support partial wildcard matching, so `camunda.secrets.demo*` isn't valid.

## Change an existing authorization

:::tip
Partial wildcard matching, for example `my-resource*`, is not supported.
:::

## Update an authorization

Authorizations cannot be updated after they are created.

To edit an authorization, [delete](#delete-an-authorization) the existing one, and create a new authorization with the updated permissions.

## Delete an authorization

Delete an authorization by completing the following steps:

1. Log in to Admin, and select the **Authorizations** tab.
2. Select the resource type of the authorization you want to delete.
3. In the list, find the authorization you want to remove and click **Delete**.
4. Confirm the deletion by clicking **Delete** in the confirmation dialog.

The authorization is deleted, and the owner no longer has the permissions granted by it.

:::caution
Deleting an authorization is permanent and can't be undone.
:::
