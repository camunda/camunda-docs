---
id: usage-alerts
title: Usage Alerts
description: "Set up alerts to monitor your usage."
---

:::note
Usage alerts are visible only to owners and admins in **Professional** and **Enterprise** organizations.
:::

Under the **Billing** tab, the organization owners and admins can set up alerts for **Process Instances** and **Decision Instances**.
Usage is calculated daily and when the threshold for an alert is met, all org owners and admins will be alerted via email and in-app notification.

## Creating Usage Alert

To create a usage alert, take the following steps:

1 - From the Console, click Organization > Billing.

2 - Under the billing page, select **Edit alert** next to the metric you want to configure the usage alert for (e.g. Process Instances).

![Edit Usage Alert](./img/edit_usage_alert.png)

3 - In the modal, define the percentage threshold (e.g. 80%), turn on the alert and click Save. Please note that the threshold can be between 1% and 4999%.

![Set Alert](./img/set_up_usage_alert.png)

:::note
The threshold set is calculated on a percentage ratio between your consumption and the amounts included in your plan.
For example, when a threshold is set at 50% for a plan that includes 200 process instances, an alert will be sent when 100 process instances have been reached.
:::

5 - Usage is calculated daily and when the threshold for an alert is met, all org owners and admins will be alerted via email and in-app notification (examples below).

![Set Alert](./img/email_usage_alert.png)

![Set Alert](./img/notification_usage_alert.png)

## Editing Usage Alert

Usage alerts can be edited and turned on/off anytime by selecting **Edit alert** and updating the toggle.

![Turn Off Alert](./img/turn_off_usage_alert.png)

## Viewing Alert Change Log

Users can track changes in the usage alerts under the logs of the **Activity** tab.

![Usage Alert Logs](./img/usage_alert_logs.png)
