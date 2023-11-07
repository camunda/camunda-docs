---
id: update-billing-reservations
title: Update billing reservations
description: "Let's manage our hardware packages and edit reservations."
---

:::note
This setting is only visible in the **Starter plan** and **Enterprise plan** for owners and admins.
:::

## Managing hardware packages

Once signed up for the **Starter plan** or **Enterprise plan**, you have access to the **Billing** page.

- The created process instances from the current period are displayed at the top of the page.
- Find a history of the metrics on a monthly basis at the bottom of the page.
- View how many hardware packages are included on the right side of the page.
  - **Starter plan**: Change the reservations for additional hardware packages.

Reservations control how many clusters you can deploy. Increasing the number of reservations allows you to deploy more clusters, while decreasing the number of reservations allows you to deploy fewer clusters.

You can access the **Billing** page by selecting **Organization management** in the Camunda Console navigation bar.

![billing-overview](./img/billing-overview.png)

### Edit reservations (Starter plan only)

Use the **Edit** button to change the number of reserved clusters. The number of reserved clusters cannot exceed the maximum limit and cannot go below what is currently in use.

### Edit development cluster reservations (Starter plan only)

To use a **development cluster**, reservations must be available, as with hardware packages. To update reservations, scroll to the **Development cluster** section and click the **Edit** button to increase or decrease the reservations. The number of reserved development clusters cannot exceed the maximum limit and cannot go below what is currently in use.

As soon as a reservation has been made, a development cluster can be set up via the [create cluster dialog](../manage-clusters/create-cluster-include.md).
