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

1. **Webhook method** - HTTP method for your inbound webhook. You can either set a specific one or choose `Any` if all methods need to be supported.
2. **Webhook ID** - Context path for your inbound webhook. This is used to build a URL endpoint for your webhook. For example, given the `Webhook ID` value is `myWebhookPath`, the complete webhook URL endpoint will be `http(s)://<base URL>/inbound/myWebhookPath`.
3. **HMAC authentication** - If an external caller uses HMAC as a means of request validation and authentication, you can `enable` this property. In that case, you'll need to specify additional field values. Read more about the [generic HTTP webhook configuration](/components/connectors/protocol/http-webhook.md).
4. **Authorization** - Authorization method of the webhook.
5. **Activation condition** - FEEL expression that assesses trigger conditions. For example, given external caller triggers a webhook endpoint with body `{"id": 1, "status": "OK"}`, the **Activation Condition** value might look like `=(request.body.status = "OK")`. Leave this field empty to trigger your webhook every time.
6. **Variable mapping** - FEEL expression that transforms incoming body into BPMN process variables. For example, given external caller triggers a webhook endpoint with body `{"id": 1, "status": "OK"}` and you would like to extract `id` as a process variable `myDocumentId`. In that case, the **Variable mapping** might look as `={myDocumentId: request.body.id}`.
7. **Response body expression** - FEEL expression that forces a webhook to return a specific response.
   This might be useful for one-time challenge verification, or acknowledgement response.
   Given your webhook triggered with body `{"id": 1, "status": "OK"}`, if you wish to return acknowledgement, you can specify the following expression `={message: "received document ID " + string(request.body.id)}` which will produce `{"message":"received document ID 123"}` as a response.
   Another example, when you wish to return a one-time subscription challenge. Given your webhook triggered with body `{"event": "subscribe", "challenge":"myRandomChallenge"}`. You can return challenge back with the following expression `=if request.body.event = "subscribe" then request.body.challenge else null` which will produce a plain string `"myRandomChallenge"` as a response.
   There is also a special keyword `correlation`, which when used in response body expression can return a Zeebe correlation result. Given a response body expression `=correlation`, a webhook execution will return `{"activated":true,"errorData":null,"type":"START_EVENT","correlationPointId":"2251799813687968","responseData":{"processInstanceKey":2251799813688006,"bpmnProcessId":"Process_1rxisne","processDefinitionKey":2251799813687968,"version":7}}`.

### Working with request context

A user can access request context in the **Activation condition**, **Result expression**, and **Response body expression**.

Let's consider the following cURL query: `curl -X POST -H "Content-Type: application/json" -H "MyHeader: myValue" -d '{"status": "OK", "id": 123}' "http://<YOUR_HOST>/inbound/myWebhook?param1=val1"`.

A webhook Connector context data will arrive as follows:

```json
{
  "request": {
    "body": {
      "status": "OK",
      "id": 123
    },
    "headers": {
      "host": "YOUR_HOST",
      "user-agent": "curl/7.88.1",
      "accept": "*/*",
      "content-type": "application/json",
      "myheader": "myValue",
      "content-length": "27"
    },
    "params": {
      "param1": "val1"
    }
  },
  "connectorData": {}
}
```

This means in scope of the fields **Activation condition**, **Result expression**, and **Response body expression**,
you can use not only `request.body.<property>` but also access headers via `request.headers.myheader` or params `request.params.param1`.

There is also a Connector-specific special case of `connectorData` that is usually empty and used in rare cases, when body has to be crafted in a special way, but a Connectors user might still want access context data.

See a list of [available inbound Connectors](/components/connectors/out-of-the-box-connectors/available-connectors-overview.md) and their respective specific configuration instructions.
