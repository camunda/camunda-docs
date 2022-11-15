---
id: install-and-start
title: Installation
description: "Let's get started with Connectors by installing and running them."
---

The concept of a [Connector](/components/connectors/introduction.md) consists of two parts:

- The business logic is implemented by a [Connector function](/components/connectors/custom-built-connectors/connector-sdk.md#runtime-logic)
  and executed by a [Connector runtime environment](/components/connectors/custom-built-connectors/connector-sdk.md#runtime-environments).
- The user interface during modeling is provided using a [Connector template](/components/connectors/custom-built-connectors/connector-templates.md).

## Connector runtime and function

The Connector runtime environment can be installed using the supported [deployment options](/self-managed/platform-deployment/platform-8-deployment.md#deployment-options).

Currently, we only support an installation of Connectors with Docker, Docker Compose, and the Manual setup. Refer to the [installation guide](/self-managed/platform-deployment/platform-8-deployment.md) for more details.

## Connector templates

Fot the modeling interface, you need to [provide Connector templates](/components/connectors/custom-built-connectors/connector-templates.md#providing-and-using-connector-templates).

For the [out-of-the-box Connectors](/components/connectors/out-of-the-box-connectors/available-connectors-overview.md) provided by Camunda,
the Connectors Bundle project provides a set of all Connector templates related to one [release version](https://github.com/camunda/connectors-bundle/releases).
If you use the [Docker Compose](/self-managed/platform-deployment/docker.md#docker-compose) installation, you can thus fetch all Connector templates that match the versions of the Connectors used in the backend.

Alternatively, you can fetch the JSON templates from the respective Connector's releases:

- [Amazon SQS Connector](https://github.com/camunda/connector-sqs/releases)
- [AWS Lambda Connector](https://github.com/camunda/connector-aws-lambda/releases)
- [Google Drive Connector](https://github.com/camunda/connector-google-drive/releases)
- [RabbitMQ](https://github.com/camunda/rabbitmq/releases)
- [REST Connector](https://github.com/camunda/connector-http-json/releases)
- [SendGrid Connector](https://github.com/camunda/connector-sendgrid/releases)
- [Slack Connector](https://github.com/camunda/connector-slack/releases)

You can use the Connector templates as provided or modify them to your needs as described in our [Connector templates guide](/components/connectors/custom-built-connectors/connector-templates.md).
