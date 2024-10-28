---
id: webhooks
title: "Webhooks"
description: "Read about how to configure alert notification webhooks for alerts on custom systems."
---

<span class="badge badge--platform">Camunda 7 only</span>

In addition to email notifications, you can configure webhooks in Optimize to receive alert notifications on custom systems. This page describes how to set up your webhook configurations using the example of a simple Slack app.

## The alert webhook configuration

You can configure a list of webhooks in the Optimize configuration, see [Alert Notification Webhooks](./system-configuration.md#alert-notification-webhooks) for available configuration properties.

### Alert webhook payload placeholders

The webhook request body can be customized to integrate with any string encoded HTTP endpoint to your needs.
In order to make use of certain properties of an alert, you can make use of placeholders within the payload string.

| Placeholder              | Sample Value                                                                                                                                                                                                                                                                           | Description                                                                                                                                                                                                                                                                                            |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ALERT_MESSAGE            | Camunda Optimize - Report Status<br />Alert name: Too many incidents<br />Report name: Count of incidents<br />Status: Given threshold [60.0] was exceeded. Current value: 186.0. Please check your Optimize report for more information!<br />http://optimize.myorg:8090/#/report/id/ | This is the full alert message that is also used in the email alert content.                                                                                                                                                                                                                           |
| ALERT_NAME               | Some Alert                                                                                                                                                                                                                                                                             | The name given to the alert when it was created.                                                                                                                                                                                                                                                       |
| ALERT_REPORT_LINK        | http://optimize.myorg/#/report/id/                                                                                                                                                                                                                                                     | The direct link to the report the alert is based on.                                                                                                                                                                                                                                                   |
| ALERT_CURRENT_VALUE      | 186.0                                                                                                                                                                                                                                                                                  | The current value of the number report the alert is based on.                                                                                                                                                                                                                                          |
| ALERT_THRESHOLD_VALUE    | 60.0                                                                                                                                                                                                                                                                                   | The configured alert threshold value.                                                                                                                                                                                                                                                                  |
| ALERT_THRESHOLD_OPERATOR | >                                                                                                                                                                                                                                                                                      | The threshold operator configured for the aler                                                                                                                                                                                                                                                         |
| ALERT_TYPE               | new                                                                                                                                                                                                                                                                                    | The type of the alert notification. Can be one of:<br />`new` - the threshold was just exceeded and the alert was triggered<br />`reminder` - the threshold was exceeded previously already and this is a reminder notification<br />`resolved` - the threshold is met again and the alert is resolved |
| ALERT_INTERVAL           | 5                                                                                                                                                                                                                                                                                      | The configured interval at which the alert condition is checked.                                                                                                                                                                                                                                       |
| ALERT_INTERVAL_UNIT      | seconds                                                                                                                                                                                                                                                                                | The unit for the configured alert interval. Can be one of: seconds, minutes, hours, days, weeks, months                                                                                                                                                                                                |

The placeholders can be used within the `defaultPayload` property of each webhook configuration:

```yaml
webhookAlerting:
  webhooks:
   'myWebhook':
     ...
     defaultPayload: 'The alert {{ALERT_NAME}} with the threshold of `{{ALERT_THRESHOLD_OPERATOR}}{{ALERT_THRESHOLD_VALUE}}` was triggered as *{{ALERT_TYPE}}*.'
```

### Example Webhook - Slack

If your organization uses Slack, you can set up Optimize so that it can use a webhook to send alert notifications to a Slack channel of your choice.

To configure the webhook in Optimize's `environment-config`, you first need to create a new Slack app for your organization's Slack workspace, as described in [Slack's own documentation here](https://api.slack.com/messaging/webhooks). You only need to follow the steps until you have your webhook URL - no need to write any code to use the webhook to post any messages, Optimize will take care of this for you. Once you have followed these steps, you can copy the Webhook URL from Slack's "Webhook URLs for Your Workspace" section into the configuration as follows:

```bash
webhookAlerting:
  webhooks:
    # Name of the webhook, must be unique.
   'mySlackWebhook':
     # URL of the webhook which can receive alerts from Optimize
     url: 'https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX'
     # Map of the headers of the request to the sent to the webhook URL
     headers:
       'Content-type': 'application/json'
     # HTTP Method for the webhook request
     httpMethod: 'POST'
     # The default payload structure with the alertMessagePlaceholder {{ALERT_MESSAGE}} for the alert text.
     # Optimize will replace this placeholder with the content of the alert message.
     defaultPayload: '{"text": "The alert *{{ALERT_NAME}}* was triggered as *{{ALERT_TYPE}}*, you can view the report <{{ALERT_REPORT_LINK}}|here>."}'
```

All configuration parameters are described in the [Alert Notification Webhooks Configuration Section](./system-configuration.md#alert-notification-webhooks).

With this configuration, when you create an alert for a report in Optimize, `mySlackWebhook` will appear in the targets selection dropdown in the alert creation modal. Once you have selected the webhook from the dropdown and saved the alert, Optimize will send a message to the channel you have selected when creating your Slack app whenever an alert notification is triggered. The content of the message is the same as the content of the alert email notifications. One alert may send either or both email and webhook notifications.
