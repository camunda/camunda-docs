---
id: webhooks
title: "Webhooks"
description: "Read about how to configure alert notification webhooks for alerts on custom systems."
---

Additionally to email notifications, you can configure webhooks in Optimize to receive alert notifications on custom systems. This page describes how to setup your webhook configurations using the example of a simple Slack app.


## Example Webhook - Slack

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
     defaultPayload: '{"text": "{{ALERT_MESSAGE}}"}'
```

All configuration parameters are described in the [Alert Notification Webhooks Configuration Section](./configuration.md/#alert-notification-webhooks).
With this configuration, when you create an alert for a report in Optimize, `mySlackWebhook` will appear in the targets selection dropdown in the alert creation modal. Once you have selected the webhook from the dropdown and saved the alert, Optimize will send a message to the channel you have selected when creating your Slack app whenever an alert notification is triggered. The content of the message is the same as the content of the alert email notifications. One alert may send either or both email and webhook notifications.