---
id: available-connectors-overview
title: Overview
description: Take a closer look at the Connectors available in Camunda Platform 8.
---

Out-of-the-box (OOTB) Connectors accelerate solution implementation by providing pre-built, ready-to-use connectors to popular external systems.

Each Connector has a dedicated page with relevant configuration.

All Connectors are available for Camunda Platform 8 SaaS and [Self-Managed](../../../self-managed/connectors-deployment/install-and-start.md).

Beginners to Connectors may want to get familiar with Connectors using a [guide](/guides/configuring-out-of-the-box-connector.md).

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

<Tabs groupId="ootb" defaultValue="outbound" queryString values={
[
{label: 'Outbound', value: 'outbound', },
{label: 'Protocol', value: 'protocol', },
]
}>

<TabItem value='outbound'>

## Outbound Connectors

- [Amazon DynamoDB Connector](/components/connectors/out-of-the-box-connectors/amazon-dynamodb.md) - Interact with [Amazon DynamoDB NoSQL database service](https://aws.amazon.com/dynamodb/) within your BPMN process, enabling you to store and retrieve data from tables, as well as perform queries and scans.
- [Amazon EventBridge Service Connector](/components/connectors/out-of-the-box-connectors/amazon-eventbridge.md) - Send events using [Amazon EventBridge service](https://aws.amazon.com/eventbridge/) within your BPMN process.
- [Amazon SNS Connector](/components/connectors/out-of-the-box-connectors/amazon-sns.md) - Send messages to [Amazon Simple Notification Service](https://aws.amazon.com/sns/) from your BPMN process.
- [Amazon SQS Connector](/components/connectors/out-of-the-box-connectors/aws-sqs.md) - Send messages to [Amazon Simple Queue Service](https://aws.amazon.com/sqs/) from your BPMN process.
- [Asana Connector](/components/connectors/out-of-the-box-connectors/asana.md) - Manage [Asana](https://asana.com/) projects and tasks from your BPMN process.
- [Automation Anywhere Connector](/components/connectors/out-of-the-box-connectors/automation-anywhere.md) - Orchestrate your [Automation Anywhere](https://www.automationanywhere.com/) queue from your BPMN process.
- [AWS Lambda Connector](/components/connectors/out-of-the-box-connectors/aws-lambda.md) - Invoke [AWS Lambda Functions](https://aws.amazon.com/lambda/) from your BPMN process.
- [Blue Prism](/components/connectors/out-of-the-box-connectors/blueprism.md) - Orchestrate your [Blue Prism](https://www.blueprism.com/) queue items from your BPMN process.
- [Camunda Operate Connector](/components/connectors/out-of-the-box-connectors/operate.md) - Fetch process execution data from [Camunda Operate](https://camunda.com/platform/operate/).
- [Easy Post Connector](/components/connectors/out-of-the-box-connectors/aws-lambda.md) - Create addresses, parcels, and shipments, as well as purchase and verify shipments with [EasyPost](https://www.easypost.com/) from your BPMN process.
- [GitHub Connector](/components/connectors/out-of-the-box-connectors/github.md) - Manage [GitHub](https://github.com/) issues and releases from your BPMN process.
- [GitLab Connector](/components/connectors/out-of-the-box-connectors/gitlab.md) - Manage [GitLab](https://about.gitlab.com/) issues and releases from your BPMN process.
- [Google Drive Connector](/components/connectors/out-of-the-box-connectors/googledrive.md) - Create folders or files from a [Google Drive](https://www.google.com/drive/) template from your BPMN process.
- [Google Maps Platform Connector](/components/connectors/out-of-the-box-connectors/google-maps-platform.md) - Validate addresses, retrieve postal addresses, and calculate distances with [Google Maps Platform Service](https://mapsplatform.google.com/) from your BPMN process
- [Google Sheets Connector](/components/connectors/out-of-the-box-connectors/google-sheets.md) - Allows you to work with an existing or new empty spreadsheet on [Google Drive](https://drive.google.com/) from your BPMN process.
- [Kafka Producer Connector](/components/connectors/out-of-the-box-connectors/kafka.md) - Produce messages to [Kafka](https://kafka.apache.org/) from your BPMN process.
- [Microsoft Teams Connector](/components/connectors/out-of-the-box-connectors/microsoft-teams.md) - Interactions with [Microsoft Teams](https://www.microsoft.com/microsoft-teams/) from your BPMN process.
- [OpenAI Connector](/components/connectors/out-of-the-box-connectors/openai.md) - Interact with [ChatGPT](https://chat.openai.com/) and [OpenAI Moderation API](https://platform.openai.com/docs/guides/moderation/overview).
- [Power Automate Connector](/components/connectors/out-of-the-box-connectors/power-automate.md) - Orchestrate your [Power Automate](https://powerautomate.microsoft.com) Flows with Camunda.
- [RabbitMQ Connector](/components/connectors/out-of-the-box-connectors/rabbitmq-outbound.md) - Send messages to [RabbitMQ](https://www.rabbitmq.com/) from your BPMN process.
- [SendGrid Connector](/components/connectors/out-of-the-box-connectors/sendgrid.md) - Quickly send emails from your BPMN processes.
- [Slack Connector](/components/connectors/out-of-the-box-connectors/slack.md) - Send messages to channels or users in your [Slack](https://slack.com) workspace from your BPMN process.
- [Twilio Connector](/components/connectors/out-of-the-box-connectors/twilio.md) - Send and get SMS messages with [Twilio](https://www.twilio.com) service from your BPMN process.
- [UiPath Connector](/components/connectors/out-of-the-box-connectors/uipath.md) - Orchestrate your [UiPath](https://cloud.uipath.com) Bots with Camunda.
- [WhatsApp Connector](/components/connectors/out-of-the-box-connectors/whatsapp.md) - Send messages with [WhatsApp Business](https://business.whatsapp.com/) from your BPMN process.

</TabItem>

<TabItem value='protocol'>

## Protocol Connectors

- [GraphQL Connector](/components/connectors/protocol/graphql.md) - Execute a [GraphQL](https://graphql.org/) query or mutation from your BPMN process.
- [REST Connector](/components/connectors/protocol/rest.md) - Make a request to a REST API and use the response in the next steps of your process.

</TabItem>

</Tabs>

In addition to this section on Connectors, we recommend reviewing [Connector secrets](/components/console/manage-clusters/manage-secrets.md).

If you want to build **custom Connectors**, head over to our [Connector SDK guide](/components/connectors/custom-built-connectors/connector-sdk.md).
