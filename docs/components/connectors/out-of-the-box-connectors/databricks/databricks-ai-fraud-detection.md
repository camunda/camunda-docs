---
id: databricks-ai-fraud-detection
title: Trigger a process from Databricks with a webhook
sidebar_label: Fraud detection webhook example
description: Trigger a Camunda process from a Databricks notebook with a webhook, route high-risk transactions for manual review, and draft a follow-up email with the OpenAI and SendGrid connectors.
---

Trigger a Camunda process directly from a Databricks notebook with the [HTTP Webhook connector](/components/connectors/protocol/http-webhook.md), using fraud detection as the example scenario.

## Scenario

A Databricks job scores a transaction and sends the result to Camunda through a webhook. Camunda starts a process instance, drafts a review email with the OpenAI connector, and routes the transaction based on its risk score:

- A risk score of 0.75 or higher goes to a user task for manual review.
- A risk score below 0.75 is logged and closed automatically.

This scenario fits a webhook integration well because Databricks, not Camunda, controls when the process starts, and the payload maps directly onto a small set of process variables.

## Prerequisites

- A Camunda 8 SaaS or Self-Managed 8.7 or later cluster.
- [Web Modeler](/components/hub/workspace/modeler/index.md) access to build the process, plus permission to deploy it and manage cluster secrets.
- A Databricks workspace with Python notebooks enabled and outbound HTTPS access to your Camunda webhook endpoint.
- An [OpenAI](https://platform.openai.com/api-keys) API key and a [SendGrid](https://app.sendgrid.com) API key. The process uses these to draft and send a review email for flagged transactions.

## Step 1: Create the BPMN diagram

1. Log in to [Camunda Console](https://console.camunda.io) and open **Web Modeler**.
2. Click **Create new diagram**, name it `Fraud Detection`, and select **BPMN**.
3. Click **Create**.

Web Modeler opens a blank diagram with a default start event.

## Step 2: Convert the start event to a webhook

The default start event starts a process instance manually. Change it to start the process from an incoming webhook call instead.

1. Click the start event, then click the wrench icon that appears.
2. Search for `webhook` and select **Webhook Start Event Connector**.

The start event now shows a webhook icon. Configure it in the properties panel:

| Field         | Value                     | Notes                                                                                                                                        |
| :------------ | :------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------- |
| Webhook ID    | `fraud-detection-trigger` | Becomes part of the webhook URL.                                                                                                             |
| Authorization | API Key                   | Create a connector secret with a unique value, for example `fraud-webhook-test-abc123xyz`. This secret authenticates incoming webhook calls. |

In **Output mapping**, set **Result expression** to map the incoming JSON body onto process variables:

```feel
{
  caseId: request.body.caseId,
  customerId: request.body.customerId,
  transactionAmount: request.body.transactionAmount,
  riskScore: request.body.riskScore,
  modelVersion: request.body.modelVersion,
  timestamp: request.body.timestamp
}
```

## Step 3: Assess the risk and draft a review email

Add a service task after the start event named `Assess Fraud Risk`. Leave it as a generic, unconfigured service task. It represents the point where you can plug in your own risk-scoring logic later.

### Draft a follow-up email with OpenAI

Add a service task named `Generate Email Inquiry` after `Assess Fraud Risk`, and change its type to the [OpenAI connector](/components/connectors/out-of-the-box-connectors/openai.md).

| Setting      | Value                                                    |
| :----------- | :------------------------------------------------------- |
| Auth type    | Bearer                                                   |
| Bearer token | A secret named `OpenAI`, containing your OpenAI API key. |
| Operation    | Chat                                                     |
| Model        | `gpt-3.5-turbo`                                          |

Set the prompt to reference the incoming process variables, for example:

```
Review this transaction for possible fraud and draft a short customer email if follow-up is needed. Amount: {{transactionAmount}}, customer ID: {{customerId}}, ML risk score: {{riskScore}}.
```

Map the response to a variable with a result expression:

```feel
{emailBody: response.body.choices[0].message.content}
```

### Send the email with SendGrid

Add a service task named `Send Email` after the OpenAI task, and change its type to the [SendGrid connector](/components/connectors/out-of-the-box-connectors/sendgrid.md).

| Setting      | Value                                                        |
| :----------- | :----------------------------------------------------------- |
| API key      | A secret named `SendGrid`, containing your SendGrid API key. |
| From email   | Your sender address, for example `community@camunda.com`.    |
| To email     | `=emailAddress`, or a fixed test address.                    |
| Subject      | `Need more information about your transaction`               |
| Content type | `text/plain`                                                 |
| Content      | `=emailBody`                                                 |

## Step 4: Route on the risk score

Add an [exclusive gateway](/components/modeler/bpmn/exclusive-gateways/exclusive-gateways.md) named `Is Fraud Detected?` after the last task, with two outgoing paths:

| Path      | Condition            | Next step                                                                                                                                       |
| :-------- | :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------- |
| High risk | `=riskScore >= 0.75` | A [user task](/components/modeler/bpmn/user-tasks/user-tasks.md) named `Review Flagged Transaction`, then an end event named `Fraud Escalated`. |
| Low risk  | `=riskScore < 0.75`  | An end event named `No Fraud Detected`.                                                                                                         |

## Step 5: Store your API credentials as secrets

Store the OpenAI and SendGrid API keys as cluster [secrets](/components/hub/organization/manage-clusters/manage-secrets.md) before you deploy the process:

1. In Camunda Console, select your cluster and open the **Cluster secrets** tab.
2. Click **Create new secret**, set **Key** to `OpenAI`, and paste your OpenAI API key as the value.
3. Click **Create new secret** again, set **Key** to `SendGrid`, and paste your SendGrid API key as the value.

Secrets are encrypted and never appear in the BPMN diagram. Reference them from a connector task as `{{secrets.OpenAI}}` or `{{secrets.SendGrid}}`.

## Step 6: Deploy the process and copy the webhook URL

1. Click **Deploy**, select your cluster, and confirm.
2. After deployment, click the start event, open the **Webhook** tab in the properties panel, and copy the webhook URL.

Save the webhook URL and the connector secret value from [Step 2](#step-2-convert-the-start-event-to-a-webhook). You need both to call the webhook from Databricks.

## Step 7: Trigger the process from a Databricks notebook

### Create the notebook

1. In Databricks, open **Workspace**, then **Create > Notebook**.
2. Name it `Fraud_Detection_Trigger` and set the language to Python.

### Add the trigger code

Paste the following into the first cell. In production, `transaction` would come from your ML model or a data pipeline; this example uses a hardcoded sample transaction so you can test the integration end to end.

```python
import requests
from datetime import datetime, timezone

CAMUNDA_WEBHOOK_URL = "https://example-webhook-url.com/"
CAMUNDA_WEBHOOK_SECRET = "fraud-webhook-test-abc123xyz"

transaction = {
    "caseId": "FRAUD-2026-001",
    "customerId": "CUST-98765",
    "transactionAmount": 15000.00,
    "riskScore": 0.87,
    "modelVersion": "fraud-detection-v2",
    "timestamp": datetime.now(timezone.utc).isoformat(),
}

headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {CAMUNDA_WEBHOOK_SECRET}",
}

response = requests.post(
    CAMUNDA_WEBHOOK_URL, json=transaction, headers=headers, timeout=30
)

if response.status_code in (200, 201):
    print(f"Process instance started (status {response.status_code}).")
else:
    print(f"Webhook call failed (status {response.status_code}): {response.text}")
```

Replace `CAMUNDA_WEBHOOK_URL` and `CAMUNDA_WEBHOOK_SECRET` with the values you copied in [Step 6](#step-6-deploy-the-process-and-copy-the-webhook-url).

## Step 8: Run the notebook and confirm the process started

1. Click the code cell and press `Ctrl+Enter` to run it.
2. Confirm the cell prints `Process instance started`.
3. Open [Operate](/components/operate/operate-introduction.md), find the `Fraud Detection` process, and open the running instance.

In Operate, you can see the process variables from the webhook payload (`caseId`, `riskScore`, and so on), the current execution state, and any incidents, such as a missing secret.

:::tip
If the webhook call fails with a `401` status, check that `CAMUNDA_WEBHOOK_SECRET` matches the connector secret you created in [Step 2](#step-2-convert-the-start-event-to-a-webhook).
:::

## Next steps

- Replace the hardcoded sample transaction with your actual model output to trigger the process from a production Databricks job.
- Add [inbound connector deduplication](/components/connectors/advanced-topics/deduplication.md) if your Databricks job might send the same transaction more than once.
- Read the [Databricks connector](databricks.md) reference if you also want Camunda to call Databricks directly, for example to look up additional transaction history before routing.
