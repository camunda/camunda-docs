---
id: manage-users
title: Manage users of your organization
---

## General rights concept

When a user signs up for Camunda Cloud, they receive a personal organization. Clusters the user creates in this organization are assigned to this organization.

If several users need access to the same Zeebe cluster, all users can be assigned to the same organization.

## Users

Under this setting, members of the current organization can be managed. A user can have one of the following roles:

- **Owner**: Owner of the organization (currently limited to one user and cannot be changed by the user.)
- **Admin**: Restricted rights for user management.
- **Member**: Can manage Zeebe Clusters, Client, and use Operate.

The following table illustrates the rights of each role:

|                              | Owner | Admin | Member |
| ---------------------------- | ----- | ----- | ------ |
| Manage Zeebe clusters        | X     | X     | X      |
| Manage clients               | X     | X     | X      |
| Use Operate                  | X     | X     | X      |
| Users: Manage members        | X     | X     |        |
| Billing: Manage reservations | X     | X     |        |
| Billing: Request paid plan   | X     | X     |        |
| Users: Manage admins         | X     |       |        |

Users are invited to a Camunda Cloud organization via their email address, which must be accepted by the user. As long as the invitation has not been accepted, the user remains in the `Pending` state.

People can also be invited to an organization that does not yet have a Camunda Cloud account. In this case, the invited individual must first create a Camunda Cloud account, and can then gain access to the organization.

[//]:# (Are we trying to say above that people can be invited to an organization with a Camunda Cloud account even if the invited person doesn't have an account? If this is the case, I'd say "People who do not yet have a Camunda Cloud account can also be invited to an organization.")