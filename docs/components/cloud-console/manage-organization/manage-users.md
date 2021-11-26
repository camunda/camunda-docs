---
id: manage-users
title: Manage users of your organization
description: "Let's take a closer look at the rights and responsibilities of users in your organization."
---

## General rights concept

When a user signs up for Camunda Cloud, they receive a personal organization. Clusters the user creates in this organization are assigned to this organization.

If several users need access to the same Zeebe cluster, all users can be assigned to the same organization.

## Users

The first user in an organization is the owner of the organization. An owner has all rights in an organization and can manage all settings accordingly. An organization cannot have more than one owner.

If the owner of the organization has to be changed for a certain reason, this can be done in the user administration. The current owner selects another member of the organization and chooses **Assign as Owner** from the menu. In the dialog that appears, you can select which new roles are to be assigned to the current owner.

### Roles and Permissions

In addition to the Owner, the **Admin** role is available as a second role with comprehensive rights. The Admin role has the same rights as the Owner, with the difference that an Admin cannot manage other Admins.

The following roles are additionally available, providing dedicated rights for specific elements in Camunda Cloud.

- **Operations Engineer**: Full access to Console and Operate, except Cluster deletion privileges
- **Analyst**: Full access to Optimize and read-only access to Clusters
- **Task User**: Full access to Tasklist and read-only access to Clusters
- **Developer**: Full access to Console, except deletion privileges. Full access to Operate, and Tasklist
- **Visitor**: Read-only access

Users can be assigned multiple roles. For example, a user can have the role of _Operations Engineer_ and _Task User_, which gives them access to the _Operate_ and _Tasklist_.

Users are invited to a Camunda Cloud organization via their email address, which must be accepted by the user. As long as the invitation has not been accepted, the user remains in the `Pending` state.

People who do not yet have a Camunda Cloud account can also be invited to an organization. To access the organization, however, the invited individual must first create a Camunda Cloud account by following the instructions in the invitation email.
