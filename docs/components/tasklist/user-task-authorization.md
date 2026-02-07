---
id: user-task-authorization
title: "User task authorization"
sidebar_label: "User task authorization"
description: Configure authorization for user tasks in Tasklist using process-level and task-level permissions.
---

This page explains the recommended way to configure authorization for user tasks in Tasklist when authorization is enabled.

It focuses on how authorization affects Tasklist behavior and which permissions are required to perform common user task operations.

## When you need to configure user task authorization

Configure user task authorization if all of the following apply:

- Authorization is enabled in your cluster
- You use Tasklist V2
- You want to control which users can view, claim, update, or complete user tasks

If authorization is disabled, Tasklist does not enforce permission checks for user task operations.

## Recommended authorization model

For Tasklist, the recommended authorization model combines:

- Process-level permissions to grant broad access to user tasks that belong to a process
- Task-level permissions for fine-grained access control on individual user tasks
- The default task worker role for common user task operations

This approach allows you to grant general access where appropriate while restricting access to specific tasks based on task properties, such as assignee or candidate groups.

## Authorization resources used by Tasklist

Tasklist evaluates user task authorization using the following authorization resources:

- `PROCESS_DEFINITION`: Controls access to user tasks that belong to a specific process definition.
- `USER_TASK`: Controls access to individual user tasks using property-based access control.

For details about authorization resources, permission evaluation, and configuration, see
[Authorization concepts](../concepts/access-control/authorizations.md).

## Default task worker role

On new installations and upgrades, Camunda Identity automatically creates a default `task-worker` role.

This role grants property-based `USER_TASK` permissions:

- Permissions: `READ`, `CLAIM`, `COMPLETE`
- Scoped by:
  - `assignee`
  - `candidateUsers`
  - `candidateGroups`

This lets typical task workers see, claim, and complete only the tasks they are responsible for.

You can use this role as-is or create custom roles with similar property-based authorizations.

## User task operations and required permissions

The following table shows which permissions are required to perform common user task operations in Tasklist.

The table reflects currently implemented permissions that are enforced by Tasklist.

| Operation                                 | `USER_TASK` permission | `PROCESS_DEFINITION` permission |
| ----------------------------------------- | ---------------------- | ------------------------------- |
| Get user task (by key)                    | `READ`                 | `READ_USER_TASK`                |
| Search user tasks                         | `READ`                 | `READ_USER_TASK`                |
| Get user task form                        | `READ`                 | `READ_USER_TASK`                |
| Claim task                                | `CLAIM`                | `UPDATE_USER_TASK`              |
| Unassign task                             | `UPDATE`               | `UPDATE_USER_TASK`              |
| Assign task (override assignee)           | `UPDATE`               | `UPDATE_USER_TASK`              |
| Complete task (with or without variables) | `COMPLETE`             | `UPDATE_USER_TASK`              |
| Update user task                          | `UPDATE`               | `UPDATE_USER_TASK`              |

## How Tasklist evaluates permissions

Tasklist relies on the Orchestration Cluster authorization model to control access to user tasks. Permissions are evaluated in two layers:

1. Process-level permissions on the `Process Definition` resource (for example, `READ_USER_TASK`, `UPDATE_USER_TASK`).
2. Task-level permissions on the `USER_TASK` resource (for example, `READ`, `UPDATE`, `CLAIM`, `COMPLETE`), often combined with property-based access control on `assignee`, `candidateUsers`, and `candidateGroups`.

When both layers are configured, process-level permissions take precedence:

- If a user already has the required process-level permission (for example, `READ_USER_TASK` or `UPDATE_USER_TASK` on `Process Definition`), Tasklist does not require or evaluate additional `USER_TASK` permissions for that operation.
- If the user does not have sufficient process-level permissions, Tasklist evaluates `USER_TASK` permissions instead, including property-based authorizations based on task properties.

## Example: claim and complete group tasks

To allow users to work on tasks that are assigned to their group:

1. Grant the READ_USER_TASK permission on the `PROCESS_DEFINITION` resource for the relevant process.
2. Grant the CLAIM and COMPLETE permissions on the `USER_TASK` resource using the `candidateGroups` property.

This configuration allows users to see tasks for the process and claim or complete only those tasks for which they are listed as a candidate group member.

## Learn more

- [Authorization concepts](../concepts/access-control/authorizations.md)
