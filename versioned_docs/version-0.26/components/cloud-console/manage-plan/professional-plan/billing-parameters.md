---
id: billing-parameters
title: Billing parameters
---

:::note
The terms under which the Professional Plan is available might change in the future.
:::

The Professional Plan has a fixed monthly subscription fee (_"Base Fee"_) as well as a variable, pay as you go component which depends on the amount of [cluster reservations](../../../manage-organization/update-billing-reservations/#managing-reservations) (_"Reservations Billing"_).

Reservations billing works as follows: for each day (GMT+2), the _daily total_ is calculated. To obtain the daily total, all reservations that were active on that day are recorded and for each such reservation, the daily price of the cluster type corresponding to that reservation is added. (Note: The daily price of a cluster type is obtained by dividing the monthly price of the cluster type by the numbers of days in the month). At the end of the month, the daily totals are added up to obtain the _monthly total_.

## Example

:::caution
Example values are used to better understand calculation. These are not actual prices in Camunda Cloud.
:::

### Given

- Cluster Type A: 300 Euro
- Cluster Type B: 900 Euro

### Reservation updates

| Day of the month             | Number of reservations for A | Number of reservations for B |
| ---------------------------- | ---------------------------- | ---------------------------- |
| reservations from last month | 2                            | 1                            |
| 11, 10:00                    | 3                            | 2                            |
| 11, 17:00                    | 5                            | 2                            |
| 21, 09:00                    | 4                            | 3                            |

### Daily Totals

| Day of month | Price A | Price B | Daily Total |
| ------------ | ------- | ------- | ----------- |
| 1            | 20      | 30      | 50          |
| ...          | 20      | 30      | 50          |
| 10           | 20      | 30      | 50          |
| 11           | 50      | 60      | 110         |
| ...          | 50      | 60      | 110         |
| 20           | 50      | 60      | 110         |
| 21           | 40      | 90      | 130         |
| 30           | 40      | 90      | 130         |

### Monthly Total

| Position  | Value         |
| --------- | ------------- |
| Basic Fee | 1000 Euro     |
| A         | 1100 Euro     |
| B         | 1800 Euro     |
| **Sum**   | **3900 Euro** |
