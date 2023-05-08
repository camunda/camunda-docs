---
id: available-connectors-overview
title: Overview
description: Take a closer look at the Connectors available in Camunda Platform 8.
---

Out-of-the-box (OOTB) Connectors accelerate solution implementation by providing pre-built, ready-to-use connectors to popular external systems.

All Connectors are available for Camunda Platform 8 SaaS and [Self Managed](../../../self-managed/connectors-deployment/install-and-start.md).

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

<Tabs groupId="ootb" defaultValue="outbound" queryString values={
[
{label: 'Outbound', value: 'outbound', },
{label: 'Inbound', value: 'inbound', },
{label: 'Protocol', value: 'protocol', },
]
}>

<TabItem value='outbound'>

## Outbound Connectors

- [Amazon DynamoDB Connector](/components/connectors/out-of-the-box-connectors/outbound/aws-dynamodb.md) - Interact with [Amazon DynamoDB NoSQL database service](https://aws.amazon.com/dynamodb/) within your BPMN process, enabling you to store and retrieve data from tables, as well as perform queries and scans.
- [Amazon SNS Connector](/components/connectors/out-of-the-box-connectors/outbound/aws-sns.md) - Send messages to [Amazon Simple Notification Service](https://aws.amazon.com/sns/) from your BPMN process.
- [Amazon SQS Connector](/components/connectors/out-of-the-box-connectors/outbound/aws-sqs.md) - Send messages to [Amazon Simple Queue Service](https://aws.amazon.com/sqs/) from your BPMN process.
- [Asana Connector](/components/connectors/out-of-the-box-connectors/outbound/asana.md) - Manage [Asana](https://asana.com/) projects and tasks from your BPMN process.
- [Automation Anywhere Connector](/components/connectors/out-of-the-box-connectors/outbound/automation-anywhere.md) - Orchestrate your [Automation Anywhere](https://www.automationanywhere.com/) queue from your BPMN process.
- [AWS Lambda Connector](/components/connectors/out-of-the-box-connectors/outbound/aws-lambda.md) - Invoke [AWS Lambda Functions](https://aws.amazon.com/lambda/) from your BPMN process.
- [Camunda Operate Connector](/components/connectors/out-of-the-box-connectors/outbound/operate.md) - Fetch process execution data from [Camunda Operate](https://camunda.com/platform/operate/).
- [Easy Post Connector](/components/connectors/out-of-the-box-connectors/outbound/aws-lambda.md) - Create addresses, parcels, and shipments, as well as purchase and verify shipments with [EasyPost](https://www.easypost.com/) from your BPMN process.
- [GitHub Connector](/components/connectors/out-of-the-box-connectors/outbound/github.md) - Manage [GitHub](https://github.com/) issues and releases from your BPMN process.
- [GitLab Connector](/components/connectors/out-of-the-box-connectors/outbound/gitlab.md) - Manage [GitLab](https://about.gitlab.com/) issues and releases from your BPMN process.
- [Google Drive Connector](/components/connectors/out-of-the-box-connectors/outbound/googledrive.md) - Create folders or files from a [Google Drive](https://www.google.com/drive/) template from your BPMN process.
- [Google Maps Platform Connector](/components/connectors/out-of-the-box-connectors/outbound/google-maps-platform.md) - Validate addresses, retrieve postal addresses, and calculate distances with [Google Maps Platform Service](https://mapsplatform.google.com/) from your BPMN process
- [Kafka Producer Connector](/components/connectors/out-of-the-box-connectors/outbound/kafka.md) - Produce messages to [Kafka](https://kafka.apache.org/) from your BPMN process.
- [Microsoft Teams Connector](/components/connectors/out-of-the-box-connectors/outbound/microsoft-teams.md) - Interactions with [Microsoft Teams](https://www.microsoft.com/microsoft-teams/) from your BPMN process.
- [OpenAI Connector](/components/connectors/out-of-the-box-connectors/outbound/openai.md) - Interact with [ChatGPT](https://chat.openai.com/) and [OpenAI Moderation API](https://platform.openai.com/docs/guides/moderation/overview).
- [Power Automate Connector](/components/connectors/out-of-the-box-connectors/outbound/power-automate.md) - Orchestrate your [Power Automate](https://powerautomate.microsoft.com) Flows with Camunda.
- [RabbitMQ Connector](/components/connectors/out-of-the-box-connectors/outbound/rabbitmq.md) - Send messages to [RabbitMQ](https://www.rabbitmq.com/) from your BPMN process.
- [SendGrid Connector](/components/connectors/out-of-the-box-connectors/outbound/sendgrid.md) - Quickly send emails from your BPMN processes.
- [Slack Connector](/components/connectors/out-of-the-box-connectors/outbound/slack.md) - Send messages to channels or users in your [Slack](https://slack.com) workspace from your BPMN process.
- [Twilio Connector](twilio.md) - Send and get SMS messages with [Twilio](https://www.twilio.com) service from your BPMN process.
- [UiPath Connector](/components/connectors/out-of-the-box-connectors/outbound/uipath.md) - Orchestrate your [UiPath](https://cloud.uipath.com) Bots with Camunda.

</TabItem>

<TabItem value='inbound'>

## Inbound Connectors

- [HTTP Webhook Connector](/components/connectors/out-of-the-box-connectors/inbound/http-webhook.md) - Start a process instance with your custom webhook configuration.
- [GitHub Webhook Connector](/components/connectors/out-of-the-box-connectors/inbound/github-webhook.md) - Start a process instance triggered by a [GitHub event](https://docs.github.com/en/developers/webhooks-and-events/webhooks/about-webhooks).

</TabItem>

<TabItem value='protocol'>

## Protcol Connectors

- [GraphQL Connector](/components/connectors/out-of-the-box-connectors/protocol/graphql.md) - Execute a [GraphQL](https://graphql.org/) query or mutation from your BPMN process.
- [REST Connector](/components/connectors/out-of-the-box-connectors/protocol/rest.md) - Make a request to a REST API and use the response in the next steps of your process.

</TabItem>

</Tabs>

In addition to this section on Connectors, we recommend reviewing [Connector secrets](/components/console/manage-clusters/manage-secrets.md).

If you want to build **custom Connectors**, head over to our [Connector SDK guide](/components/connectors/custom-built-connectors/connector-sdk.md).
