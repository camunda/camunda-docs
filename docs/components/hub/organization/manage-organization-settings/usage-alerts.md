---
id: usage-alerts
title: View usage alerts
description: "As an organization owner or admin, set up alerts for process instances, decision instances and task users."
---

Set up alerts for process instances, decision instances and task users.

## About usage alerts

In Camunda Hub, organization owners and admins can set up alerts for process instances, decision instances and task users. Usage is calculated daily. When the threshold for an alert is met, all organization owners and admins are alerted via email and in-app notification.

:::note
Usage alerts apply **only to production clusters** and are visible only to owners and admins in **Starter** and **Enterprise** organizations.
:::

## Manage usage alert

To manage a usage alert, take the following steps:

1. In the left navigation under **Console**, click **Organization**.
2. On the **Billing** tab, select **Edit alert** next to the metric you want to configure the usage alert for. For example, process instances.
3. In the modal, define the percentage threshold, for example 80 for 80%, turn on the alert, and click **Save**. The threshold can be between 1% and 4999%.

:::note
The threshold set is calculated on a percentage ratio between your consumption and the amounts included in your plan.
For example, when a threshold is set at 50% for a plan that includes 200 process instances, an alert is sent when 100 process instances are reached.
:::

Usage is calculated daily. When the threshold for an alert is met, all org owners and admins are alerted via email and in-app notification.

## Viewing an alert change log

Users can track changes in the usage alerts under the logs of the **Activity** tab:

1. In the left navigation under **Console**, click **Organization**.
2. Click the **Activity** tab.
