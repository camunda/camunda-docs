---
id: inbound
title: Using inbound Connectors
description: Learn how to use inbound Connectors
---

[Inbound Connectors](/components/connectors/connector-types.md#inbound-connectors) enable workflows to receive data or messages from external systems or services.

### Creating the BPMN start event

:::note
Inbound Connectors are currently supported only in [Camunda Platform 8 Self-Managed](/self-managed/about-self-managed.md).
To use an Inbound Connector, [install](/components/modeler/desktop-modeler/element-templates/configuring-templates.md) a related element template (for example, [generic webhook](https://github.com/camunda/connectors-bundle/tree/main/connectors/webhook-connector/element-templates) or [GitHub webhook](https://github.com/camunda/connectors-bundle/tree/main/connectors/github/element-templates)) first.
:::

1. Start building your BPMN diagram with a **Start Event** building block.
2. Change its template to an Inbound Webhook of your choice (e.g., generic webhook or GitHub).
3. Fill in all required properties.
4. Complete your BPMN diagram.
5. Deploy it to your Camunda Platform 8 instance.

When you **deploy** such a BPMN diagram with a webhook, it becomes ready to receive calls on the webhook endpoint (see [Webhook docs](/components/connectors/protocol/http-webhook.md) for details).

:::note
You can still start instances of that process manually via the modeler, which is sometimes useful during testing.
:::

### Configuring the Inbound Connector

To deploy and use an inbound webhook, you would need to fill in several fields.

1. **Webhook ID** - a context path for your inbound webhook. This is used to build a URL endpoint of your webhook. For example, given the `Webhook ID` value is `myWebhookPath`, the complete webhook URL endpoint will be `http(s)://<base URL>/inbound/myWebhookPath`.
2. **HMAC Authentication Enabled** - if an external caller uses HMAC as a means of request validation and authentication, you can `enable` this property. In that case, you'll need to specify additional field values. Read more about the [generic HTTP webhook configuration](/components/connectors/protocol/http-webhook.md).
3. **Activation Condition** - a FEEL expression that assesses trigger conditions. For example, given external caller triggers a webhook endpoint with body `{"id": 1, "status": "OK"}`, the **Activation Condition** value might look like `=(request.body.status = "OK")`. Leave this field empty to trigger your webhook every time.
4. **Variable Mapping** - is a FEEL expression that transforms incoming body into BPMN process variables. For example, given external caller triggers a webhook endpoint with body `{"id": 1, "status": "OK"}` and you would like to extract `id` as a process variable `myDocumentId`. In that case, the **Variable Mapping** might look as `={myDocumentId: request.body.id}`.

See a list of [available Inbound Connectors](/components/connectors/out-of-the-box-connectors/available-connectors-overview.md) and their respective specific configuration instructions.
