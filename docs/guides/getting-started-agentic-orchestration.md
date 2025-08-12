---
id: getting-started-agentic-orchestration
title: "Run your first AI Agent"
sidebar_label: Run your first AI Agent
description: "For developers using Camunda 8 Self-Managed, step through an example project with Spring Boot or Node.js."
keywords: [java, spring, spring camunda, getting started, user guide, tutorial]
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

<span class="badge badge--beginner">Beginner</span>
<span class="badge badge--medium">1 hour</span>

Have you heard about agentic orchestration, but don't know where to start? This guide is tailored for those who want to implement their first agent running on Camunda 8.

## What to expect

You will:

- Use Camunda 8 either
  - in a local development environment using **Camunda 8 Run** or
  - use the **SaaS** version where you can model and deploy your processes in the cloud.
- Use the **Camunda Modeler** to deploy and start a business process.
- Use the **AI Agent** connector, as the brain for the agent
- Use an ad-hoc subprocess, as the building block for the agent's behavior

## Prerequisites

- To run an agent with Camunda 8, you need a running environment.
  - Have a Camunda 8 environment up and running, described in [Run your first local project](../getting-started-example)
  - Or [sign up for a free SaaS Trial Account](https://accounts.cloud.camunda.io/signup)
- AWS IAM user with permissions: `bedrock:InvokeModel` (Claude 3 Sonnet/Haiku) and `aoss:*` for your OpenSearch index
- Email account (SMTP/IMAP) & credentials (App Password for Gmail, or provider-specific credentials)
- Outbound internet access for connectors to reach email server, Bedrock, and OpenSearch endpoints

## Concept

### Deterministic and dynamic workflows

Traditionally people modeled their business processes as a **deterministic sequence** of steps, where each step is predefined and follows a strict order. This approach works well for simple, repetitive tasks but struggles to adapt to more complex, dynamic scenarios.

With agentic orchestration we use the concept of **dynamic workflows**, where the process can adapt and change based on real-time information and AI-driven insights. Your job is to create the tools available to the agent, and the agent can dynamically run any of the tasks available, based on the current need.

You can build guardrails by defining boundaries and constraints within which the AI agent operates, ensuring it stays aligned with business goals and compliance requirements.

### AI Agent and the ad-hoc subprocess

Ad-hoc subprocesses are a key building block for agentic orchestration. They allow the AI agent to dynamically run tasks available to it, based on the current context and requirements. It can perform tasks in parallel, handle exceptions, and make decisions on the fly. It can be instructed to use the available tasks until its goal is met.

In the following example you can see an AI agent

![Agentic Orchestration Concept](img/ai-agent-concept.png)

## Build your agent

### Start from our blueprint

The fastest way to get started is to use our blueprint process model. This model includes all the necessary elements to run a simple AI agent.
Visit [its marketplace page](https://marketplace.camunda.com/en-US/apps/522492/ai-email-support-agent) and choose the option you prefer. We recommend using the SaaS version as it needs the least amount of setup.

**SaaS**

- If you have a SaaS account, choose [For SAAS](<https://modeler.cloud.camunda.io/import/processes?source=https://raw.githubusercontent.com/bastiankoerber/Camunda_Agent_Blueprint/refs/heads/main/Agent%20Blueprint%20(Long%20Term%20Memory).bpmn,https://raw.githubusercontent.com/bastiankoerber/Camunda_Agent_Blueprint/refs/heads/main/Escalate%20to%20human%20form.form,https://raw.githubusercontent.com/bastiankoerber/Camunda_Agent_Blueprint/refs/heads/main/Review%20case%20resolution.form>)
- If you haven't signed up or is not logged in, first you need to take care of that
- After that you need to select which project you want the blueprint to be saved in, or create a new project
- The modeler will open with the blueprint and you immediately have a working AI agent modeled

**Self managed**

- If you don't have a SaaS account, choose [For SM](https://github.com/bastiankoerber/Camunda_Agent_Blueprint/tree/main)
- Download the blueprint files from the repository
- Import the .bpmn and .form files into your Camunda Modeler

## Set up necessary configurations

Create the following secrets in your Camunda cluster or set them up locally with the `connector-secrets.txt` file and restart `c8run`. Use the set secrets with the `{{secrets.SECRET_NAME}}` syntax.

- `CAMUNDA_SAMPLE_AGENT_EMAIL_PASSWORD`: Email account password (App Password or SMTP token)
- `CAMUNDA_SAMPLE_AGENT_EMAIL_USERNAME`: Email account username (e.g. your-address@example.com)
- `CAMUNDAAGENT_AWS_ACCESS_KEY`: AWS Access Key ID
- `CAMUNDAAGENT_AWS_SECRET_KEY`: AWS Secret Access Key

Configure the connectors:

1. **Email connectors (Inbound & Send):**
   - Username: your email address
   - IMAP/SMTP host & port: according to your provider (Gmail, Outlook, etc.)
2. **Vector Database connectors (Retrieve & Write):**
   - Region: your AWS region (e.g. `eu-central-1`)
   - Endpoint: `https://<your-opensearch-domain>`
3. **Agent connector:**
   - Model ID: default is `anthropic.claude-3.7-sonnet-20240229-v1:0` (change as needed)

## Run your agent

Deploy your process and send an email to the email address you set. Open **Operate** to see the process running. You have deployed your first AI agent.

## Next steps

Read more on the [documentation page for Agentic Orchestration](../../components/agentic-orchestration/) can do for you and get to know about its advanced features.
