---
id: manage-users
title: Manage Users of your Organization
---

## General Rights concept

When a user signs up to Camunda Cloud, they receive a personal organization. Clusters that the user creates in this organization are assigned to this organization.

If several users need access to the same Zeebe cluster, all users can be assigned to the same organization.

## Users

Under this setting members of the current organization can be managed. A user can have one of the following roles:

- Owner: Owner of the organization (currently limited to one user, cannot be changed by the user)
- Admin: Restricted rights for user management
- Member: Can manage Zeebe Clusters and Client and use Operate

The following table illustrates the rights of each role:

|                              | Owner | Admin | Member |
| ---------------------------- | ----- | ----- | ------ |
| Manage Zeebe Clusters        | X     | X     | X      |
| Manage Clients               | X     | X     | X      |
| Use Operate                  | X     | X     | X      |
| Users: Manage Members        | X     | X     |        |
| Billing: Manage Reservations | X     | X     |        |
| Billing: Request Paid Plan   | X     | X     |        |
| Users: Manage Admins         | X     |       |        |

Users are invited to a Camunda cloud organization via their email address, which must be accepted by the user. As long as the invitation has not been accepted, the user remains in the Pending state.

People can also be invited to an organization that does not yet have a Camunda cloud account. In this case the invited person must first create a Camunda Cloud account and then has access to the organization.
