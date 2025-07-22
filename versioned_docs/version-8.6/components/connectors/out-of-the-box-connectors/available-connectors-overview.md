---
id: available-connectors-overview
title: Overview
description: Take a closer look at the Connectors available in Camunda 8.
---

Out-of-the-box (OOTB) Connectors accelerate solution implementation by providing pre-built, ready-to-use Connectors to popular external systems. Learn more about [Connector types](/components/connectors/connector-types.md)

Each Connector has a dedicated page with relevant configuration.

All Connectors are available for Camunda 8 SaaS and [Self-Managed](/self-managed/connectors-deployment/install-and-start.md).

Beginners to Connectors may want to get familiar with Connectors using a [guide to configuring out-of-the-box Connectors](/guides/configuring-out-of-the-box-connector.md).

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

- [Amazon Bedrock Connector](/components/connectors/out-of-the-box-connectors/amazon-bedrock.md) - Interact with [Amazon Bedrock](https://aws.amazon.com/bedrock/) from your BPMN process to experiment with and evaluate foundation models (FMs) from leading AI companies.
- [Amazon DynamoDB Connector](/components/connectors/out-of-the-box-connectors/amazon-dynamodb.md) - Interact with [Amazon DynamoDB NoSQL database service](https://aws.amazon.com/dynamodb/) within your BPMN process, enabling you to store and retrieve data from tables, as well as perform queries and scans.
- [Amazon EventBridge Service Connector](/components/connectors/out-of-the-box-connectors/amazon-eventbridge.md) - Send events using [Amazon EventBridge service](https://aws.amazon.com/eventbridge/) within your BPMN process.
- [Amazon SageMaker Connector](/components/connectors/out-of-the-box-connectors/amazon-eventbridge.md) - Interact with the [Amazon SageMaker service](https://aws.amazon.com/sagemaker/) from your BPMN process.
- [Amazon SNS Outbound Connector](/components/connectors/out-of-the-box-connectors/amazon-sns.md) - Send messages to [Amazon Simple Notification Service](https://aws.amazon.com/sns/) from your BPMN process.
- [Amazon SQS Connector](/components/connectors/out-of-the-box-connectors/amazon-sqs.md) - Send messages to [Amazon Simple Queue Service](https://aws.amazon.com/sqs/) from your BPMN process.
- [Amazon Textract Connector](components/connectors/out-of-the-box-connectors/amazon-textract.md) - Interact with the [Amazon Textract Service](https://aws.amazon.com/textract/) from your BPMN process.
- [Asana Connector](/components/connectors/out-of-the-box-connectors/asana.md) - Manage [Asana](https://asana.com/) projects and tasks from your BPMN process.
- [Automation Anywhere Connector](/components/connectors/out-of-the-box-connectors/automation-anywhere.md) - Orchestrate your [Automation Anywhere](https://www.automationanywhere.com/) queue from your BPMN process.
- [AWS Lambda Connector](/components/connectors/out-of-the-box-connectors/aws-lambda.md) - Invoke [AWS Lambda Functions](https://aws.amazon.com/lambda/) from your BPMN process.
- [Azure OpenAI](/components/connectors/out-of-the-box-connectors/azure-open-ai.md) - Interact with [Azure OpenAI](https://azure.microsoft.com/en-us/products/ai-services/openai-service) from your BPMN process.
- [Blue Prism](/components/connectors/out-of-the-box-connectors/blueprism.md) - Orchestrate your [Blue Prism](https://www.blueprism.com/) queue items from your BPMN process.
- [Camunda Operate Connector](/components/connectors/out-of-the-box-connectors/operate.md) - Fetch process execution data from [Camunda Operate](https://camunda.com/platform/operate/).
- [Easy Post Connector](/components/connectors/out-of-the-box-connectors/aws-lambda.md) - Create addresses, parcels, and shipments, as well as purchase and verify shipments with [EasyPost](https://www.easypost.com/) from your BPMN process.
- [GitHub Connector](/components/connectors/out-of-the-box-connectors/github.md) - Manage [GitHub](https://github.com/) issues and releases from your BPMN process.
- [GitLab Connector](/components/connectors/out-of-the-box-connectors/gitlab.md) - Manage [GitLab](https://about.gitlab.com/) issues and releases from your BPMN process.
- [Google Drive Connector](/components/connectors/out-of-the-box-connectors/googledrive.md) - Create folders or files from a [Google Drive](https://www.google.com/drive/) template from your BPMN process.
- [Google Maps Platform Connector](/components/connectors/out-of-the-box-connectors/google-maps-platform.md) - Validate addresses, retrieve postal addresses, and calculate distances with [Google Maps Platform Service](https://mapsplatform.google.com/) from your BPMN process
- [Google Sheets Connector](/components/connectors/out-of-the-box-connectors/google-sheets.md) - Allows you to work with an existing or new empty spreadsheet on [Google Drive](https://drive.google.com/) from your BPMN process.
- [Hugging Face Connector](/components/connectors/out-of-the-box-connectors/hugging-face.md) - Interact with [Hugging Face](https://huggingface.co/) models from your BPMN process.
- [Kafka producer Connector](/components/connectors/out-of-the-box-connectors/kafka.md) - Produce messages to [Kafka](https://kafka.apache.org/) from your BPMN process.
- [Microsoft Teams Connector](/components/connectors/out-of-the-box-connectors/microsoft-teams.md) - Interactions with [Microsoft Teams](https://www.microsoft.com/microsoft-teams/) from your BPMN process.
- [Microsoft 365 Connector](/components/connectors/out-of-the-box-connectors/microsoft-o365-mail.md) - Interactions with [Microsoft 365](https://outlook.office.com/mail/) mail from your BPMN process.
- [OpenAI Connector](/components/connectors/out-of-the-box-connectors/openai.md) - Interact with [ChatGPT](https://chat.openai.com/) and [OpenAI Moderation API](https://platform.openai.com/docs/guides/moderation/overview).
- [RabbitMQ Producer Connector](/components/connectors/out-of-the-box-connectors/rabbitmq-outbound.md) - Send messages to [RabbitMQ](https://www.rabbitmq.com/) from your BPMN process.
- [Salesforce Connector](/components/connectors/out-of-the-box-connectors/salesforce.md) - Manage your Salesforce instance from your BPMN process.
- [SendGrid Connector](/components/connectors/out-of-the-box-connectors/sendgrid.md) - Quickly send emails from your BPMN processes.
- [Slack outbound Connector](/components/connectors/out-of-the-box-connectors/slack.md) - Send messages to channels or users in your [Slack](https://slack.com) workspace from your BPMN process.
- [SQL Connector](/components/connectors/out-of-the-box-connectors/sql.md) - Connect your BPMN process with SQL databases (Microsoft SQL Server, PostgreSQL, MySQL).
- [Twilio Connector](/components/connectors/out-of-the-box-connectors/twilio.md) - Send and get SMS messages with [Twilio](https://www.twilio.com) service from your BPMN process.
- [UiPath Connector](/components/connectors/out-of-the-box-connectors/uipath.md) - Orchestrate your [UiPath](https://cloud.uipath.com) Bots with Camunda.
- [WhatsApp Connector](/components/connectors/out-of-the-box-connectors/whatsapp.md) - Send messages with [WhatsApp Business](https://business.whatsapp.com/) from your BPMN process.

</TabItem>

<TabItem value='inbound'>

## Inbound Connectors

- [Amazon EventBridge Webhook Connector](/components/connectors/out-of-the-box-connectors/amazon-eventbridge.md) - Start a BPMN process instance triggered by an [Amazon EventBridge service event](https://aws.amazon.com/eventbridge/).
- [Amazon SNS inbound Connector](/components/connectors/out-of-the-box-connectors/amazon-sns.md) - Trigger your BPMN process with an [Amazon Simple Notification Service](https://aws.amazon.com/sns/) notification via HTTPS.
- [Amazon SQS Connector](/components/connectors/out-of-the-box-connectors/amazon-sqs.md) - Receive messages from [Amazon Simple Queue Service (SQS)](https://aws.amazon.com/sqs/) in your BPMN process.
- [GitHub Webhook Connector](/components/connectors/out-of-the-box-connectors/github.md) - Start a process instance triggered by a [GitHub event](https://docs.github.com/en/developers/webhooks-and-events/webhooks/about-webhooks).
- [Kafka consumer Connector](/components/connectors/out-of-the-box-connectors/kafka.md) - Consume messages from [Kafka](https://kafka.apache.org/) from your BPMN process.
- [RabbitMQ Consumer Connector](/components/connectors/out-of-the-box-connectors/rabbitmq-outbound.md) - Receive messages from [RabbitMQ](https://www.rabbitmq.com/) in your BPMN process.
- [Slack inbound Connector](/components/connectors/out-of-the-box-connectors/slack.md) - Trigger a [Slack](https://slack.com) bot to start a BPMN process with an event or a slash command
- [Twilio Webhook Connector](/components/connectors/out-of-the-box-connectors/twilio.md) - Start a process instance triggered by a [Twilio webhook](https://www.twilio.com/docs/usage/webhooks). Can be used as an intermediate Connector in existing processes.

</TabItem>

<TabItem value='protocol'>

## Protocol Connectors

- [GraphQL Connector](/components/connectors/protocol/graphql.md) - Execute a [GraphQL](https://graphql.org/) query or mutation from your BPMN process.
- [HTTP Webhook Connector](/components/connectors/protocol/http-webhook.md) - Start a process instance with your custom webhook configuration.
- [Polling Connector](/components/connectors/protocol/polling.md) - The HTTP Polling Connector polls an endpoint at regular intervals, enabling periodic data fetching as an intermediate step in your BPMN processes.
- [REST Connector](/components/connectors/protocol/rest.md) - Make a request to a REST API and use the response in the next steps of your process.
- [SOAP Connector](/components/connectors/protocol/soap.md) - Connect your BPMN process with Simple Object Access Protocol ([SOAP](https://en.wikipedia.org/wiki/SOAP)) services and interact with SOAP service endpoints.

</TabItem>

</Tabs>

In addition to this section on Connectors, we recommend reviewing [Connector secrets](/components/console/manage-clusters/manage-secrets.md).

If you want to build **custom Connectors**, head over to our [Connector SDK guide](/components/connectors/custom-built-connectors/connector-sdk.md).
