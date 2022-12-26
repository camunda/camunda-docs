---
id: http-webhook
title: HTTP Webhook
sidebar_label: HTTP Webhook
description: Start a process instance with your custom webhook configuration.
---

The **HTTP Webhook Connector** allows you to start a BPMN process instance triggered by external HTTP call.

:::note
Inbound Connectors are currently supported only in [Camunda Platform 8 Self-Managed](../../../self-managed/about-self-managed.md).
:::

## Prerequisites (Self-Managed Camunda 8 Platform)

To use the **HTTP Webhook Connector**, you need to [download](https://github.com/camunda/connectors-bundle/tree/main/connectors/webhook-connector/element-templates) and [install](https://docs.camunda.io/docs/next/components/modeler/desktop-modeler/element-templates/configuring-templates/) the latest element template with your Modeler.
You would also need to make sure there is a network connectivity between a caller and your Camunda Connectors Runtime configured to receive HTTP POST requests.

## Create a HTTP Webhook Connector task

1. Start building your BPMN diagram with a **Start Event** building block.
2. Change its template to a HTTP Webhook.
3. Fill in all required properties.
4. Complete your BPMN diagram.
5. Deploy it to your Camunda 8 instance.

## Make your HTTP Webhook Connector for receiving messages executable

![HTTP Webhook prefilled](../img/use-inbound-connector-template-filled.png)

To make your **HTTP Webhook Connector** for publishing messages executable, take the following steps:

1. In the **Webhook Configuration** section, set the **Webhook ID**. This value is used to build an URL endpoint of your webhook. For example, given the `Webhook ID` value is `myWebhookPath`, then the complete webhook URL endpoint will be `http(s)://<base URL>/inbound/myWebhookPath`.
2. (Optional) Configure [HMAC authentication](https://en.wikipedia.org/wiki/HMAC) if required. **Not recommended:** leave it `disabled` to ignore HMAC verification if your use case doesn't require verification or your use case is not yet supported.

- Set the HMAC shared secret key which is used to calculate message hash. The value is defined by a webhook administrator.
- Set the HMAC header whose value contains encrypted hash message. The exact value is provided by the external caller.
- Select HMAC hash algorithm. The exact value is provided by the external caller.

3. Configure **Activation Condition**. For example, given external caller triggers a webhook endpoint with body `{"id": 1, "status": "OK"}`, the **Activation Condition** value might look like as `=(request.body.status = "OK")`. Leave this field empty to trigger your webhook everytime.
4. Configure **Variable Mapping**. For example, given external caller triggers a webhook endpoint with body `{"id": 1, "status": "OK"}` and you would like to extract `id` as a process variable `myDocumentId`. In that case, the **Variable Mapping** might look as `={myDocumentId: request.body.id}`.

### Example

![GitHub webhook](../img/use-inbound-connector-template-filled-gh.png)

Give a use-case when you need to configure a GitHub webhook with a **HTTP Webhook Connector** in such a way that: (1) your BPMN process starts on every opened PR, and (2) the PR URL is exposed as a process variable.
Let's say, you choose `mySecretKey` as a shared secret passphrase. GitHub [declares](https://docs.github.com/en/developers/webhooks-and-events/webhooks/securing-your-webhooks) that they use `X-Hub-Signature-256` header for `SHA-256` HMAC.
Therefore, you would need to set the following:

1. **Webhook ID**: any unique to your cluster webhook ID. This will generate an URL to trigger your webhook. In example, `myWebhookPath`.
2. **HMAC Authentication**: `enabled`.
3. **HMAC Secret Key**: `mySecretKey` or `secrets.MY_GH_SECRET`.
4. **HMAC Header**: `X-Hub-Signature-256`.
5. **HMAC Algorithm**: `SHA-256`.
6. **Activation Condition**: `=(request.body.action = "opened")`.
7. **Variable Mapping**: `={prUrl: request.body.pull_request.url}`.
8. Click `Deploy`.

Please note, that for GitHub there is a simplified [GitHub Webhook Connector](github-webhook.md).
