---
id: available-connectors-overview
title: Overview
description: Take a closer look at the Connectors available in Camunda Platform 8.
---

This section gives an overview of the **out-of-the-box Connectors** available in Camunda Platform 8. All Connectors are available for Camunda Platform 8 SaaS and [Self Managed](../../../self-managed/connectors-deployment/install-and-start.md).

## Outbound Connectors

- [Amazon SNS Connector](aws-sns.md) - Send messages to [Amazon Simple Notification Service](https://aws.amazon.com/sns/) from your BPMN process.
- [Amazon SQS Connector](aws-sqs.md) - Send messages to [Amazon Simple Queue Service](https://aws.amazon.com/sqs/) from your BPMN process.
- [AWS Lambda Connector](aws-lambda.md) - Invoke [AWS Lambda Functions](https://aws.amazon.com/lambda/) from your BPMN process.
- [Google Drive Connector](googledrive.md) - Create folders or files from a [Google Drive](https://www.google.com/drive/) template from your BPMN process.
- [Kafka Producer Connector](kafka.md) - Produce messages to [Kafka](https://kafka.apache.org/) from your BPMN process.
- [Microsoft Teams Connector](microsoft-teams.md) - Interactions with [Microsoft Teams](https://www.microsoft.com/microsoft-teams/) from your BPMN process.
- [RabbitMQ Connector](rabbitmq.md) - Send messages to [RabbitMQ](https://www.rabbitmq.com/) from your BPMN process.
- [REST Connector](rest.md) - Make a request to a REST API and use the response in the next steps of your process.
- [SendGrid Connector](sendgrid.md) - Quickly send emails from your BPMN processes.
- [Slack Connector](slack.md) - Send messages to channels or users in your [Slack](https://slack.com) workspace from your BPMN process.
- [UIPath Connector](uipath.md) - Orchestrate your [UIPath](https://cloud.uipath.com) Bots with Camunda.

## Inbound Connectors

- [HTTP Webhook Connector](http-webhook.md) - Start a process instance with your custom webhook configuration.
- [GitHub Webhook Connector](github-webhook.md) - Start a process instance triggered by a [GitHub event](https://docs.github.com/en/developers/webhooks-and-events/webhooks/about-webhooks).

In addition to this section on Connectors, we recommend reviewing [Connector secrets](../../console/manage-clusters/manage-secrets.md).

If you want to build **custom Connectors**, head over to our [Connector SDK guide](../custom-built-connectors/connector-sdk.md).
