---
id: update-billing-reservations
title: Update Billing Reservations
---

This setting is only visible in the Professional Plan for Owners and Admins. More about it under [Professional Plan](../manage-plan/professional-plan/overview.md).

## Managing Reservations

Once signed up for the professional plan, you have access to the Cluster Reservations Page.

Cluster Reservations control how many clusters you can deploy. Increasing the number of reservations allows you to deploy more clusters, decreasing the number of reservations does the opposite.

You can access the Cluster Reservations page by selecting the menu entry "Organization Settings" from the Camunda Cloud Console navigation bar.

### Inspect active Reservations

The page lists available cluster types along with their specification. A cluster type has the following parameters:

- **Type**: Name of the cluster type
- **Current Usage**: Number of clusters currently deployed for a given cluster type
- **Reserved**: Number of clusters currently reserved. This value is important for billing. Users in your organization cannot deploy more clusters per cluster configuration than specified by this value
- **Partitions**: The Number of partitions specified in the cluster configuration
- **Monthly price per unit**: The monthly price of this this cluster type. Indicates the price of this cluster in dollars if used for a full month

![reserved-clusters-overview](./img/early-access-reserved-clusters-overview.png)

### Edit Reservations

The number of reserved clusters can be changed with the Edit button. The number of reserved clusters cannot exceed the maximum limit and cannot go below what is currently in use.

![reserved-clusters-overview](./img/early-access-reserved-clusters-edit.png)
