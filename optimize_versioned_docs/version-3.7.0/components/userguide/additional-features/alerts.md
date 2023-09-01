---
id: alerts
title: Alerts
description: Get a notification as soon as your system is behaving in an unexpected manner.
---

:::note
You must configure the email service to receive notifications. See the [technical guide](../../../self-managed/optimize-deployment/setup/installation.md) for which properties need to be defined.
:::

Optimize's alerting functionality can be used to notify you when your report hits a predefined critical value. You can create alerts for any number reports that exist within a collection. Inside the collection, navigate to the **Alerts** tab to create and view all alerts defined for reports in this collection. You can manage an alert by moving the mouse over the alert entry and clicking the **Edit** or **Delete** buttons in the context menu on the right side of the page.

![Alert overview](./img/alerts-overview.png)

Click **Create New Alert** to create a new alert. You will then see the following modal:

![Alert modal overview](./img/alert-modal-description.png)

To give the alert a name, select the report and define a target webhook or email address of the person who will receive the alert.

:::note
Alerts can only be created for reports which are visualized as a single number and are in the same collection as the alert. Visit the [report section](../creating-reports.md) on how to define single number reports.
:::

Additionally, set a threshold which defines when an alert should be triggered. A notification will be sent to the configured email address or webhook as soon as a report value hits the threshold.

If reminder notifications are enabled, the alert will continue to send notifications for as long as the value is above (or below, as defined) the threshold. Finally, you'll get a resolve notification as soon as the report value is within a typical range.

For example, say you defined an alert which should be triggered when the report value becomes greater than 50.
You also enabled reminder notifications to be sent each hour. Here's what that would look like:

![Notifications graph](./img/alert-notifications-graph.png)

## Send alerts to external systems

It's possible to configure Optimize to send alerts to an external system when needed. For details on how to configure and add target systems, visit the [technical guide](../../../self-managed/optimize-deployment/setup/installation.md). Once at least one target system is configured, alerts will have a new input option to select one of the configured systems.
