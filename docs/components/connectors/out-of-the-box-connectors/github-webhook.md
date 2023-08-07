---
id: github-webhook
title: GitHub Webhook Connector
sidebar_label: GitHub Webhook Connector
description: Learn how the GitHub Webhook Connector allows you to start a BPMN process instance triggered by a GitHub event.
---

The **GitHub Webhook Connector** is an inbound Connector that allows you to start a BPMN process instance triggered by a [GitHub event](https://docs.github.com/en/developers/webhooks-and-events/webhooks/about-webhooks).

:::note
If you have used the GitHub Webhook Connector with a self-managed Camunda 8 configuration before the
Connector SDK [0.7.0 release](https://github.com/camunda/connector-sdk/releases/tag/0.7.0), you might need to manually replace the element template.
Please refer to the [update guide](/guides/update-guide/connectors/060-to-070.md) for more details.
:::

## Create a GitHub Webhook Connector task

1. Start building your BPMN diagram. You can use GitHub Webhook Connector with either **Start Event** or **Intermediate Catch Event** building blocks.
2. Select the applicable element and change its template to a GitHub Webhook.
3. Fill in all required properties.
4. Complete your BPMN diagram.
5. Deploy the diagram to activate the webhook.
6. Navigate to the **Webhooks** tab in the properties panel to see the webhook URL.

## Make your GitHub Webhook Connector for receiving messages executable

1. In the **Webhook Configuration** section, configure the **Webhook ID**. By default, **Webhook ID** is pre-filled with a random value. This value will be part of the Webhook URL. You will find more details about GitHub Webhook URLs [below](#activate-the-github-webhook-connector-by-deploying-your-diagram).
2. Set the **GitHub secret**. This is a shared secret key that has to be defined in both your BPMN and GitHub webhook configuration page. The value is used to calculate HMAC authentication signature.
3. Configure **Activation Condition**. For example, given GitHub triggers a webhook endpoint with a new PR payload `{"action": "opened", "pull_request": ...}`, the **Activation Condition** value might look like as `=(request.body.action = "opened")`. Leave this field empty to trigger your webhook every time.
4. Use **Result Variable** to store the response in a process variable. For example, `myResultVariable`.
5. Use **Result Expression** to map specific fields from the response into process variables using [FEEL](/components/modeler/feel/what-is-feel.md).
   For example, given that the GitHub webhook is triggered with the body `{"pull_request": {"id": 123}}` and you would like to extract the pull request `id` as a process variable `pullRequestId`, the **Result Expression** might look like this:

```
= {
  pullRequestId: request.body.pull_request.id
}
```

6. If you are using the GitHub Webhook Connector with an **Intermediate Catch Event**, fill in the **Correlation key (process)** and **Correlation key (payload)**.

- **Correlation key (process)** is a FEEL expression that defines the correlation key for the subscription. This corresponds to the **Correlation key** property of a regular **Message Intermediate Catch Event**.
- **Correlation key (payload)** is a FEEL expression used to extract the correlation key from the incoming message. This expression is evaluated in the Connector Runtime and the result is used to correlate the message.

For example, given that your correlation key is defined with `pullRequestId` process variable, and the request body contains `{"pull_request": {"id": 123}}`, your correlation key settings will look like this:

- **Correlation key (process)**: `=pullRequestId`
- **Correlation key (payload)**: `=request.body.pull_request.id`

Learn more about correlation keys in the [messages guide](../../../concepts/messages).

## Activate the GitHub Webhook Connector by deploying your diagram

Once you click the **Deploy** button, your GitHub Webhook will be activated and publicly available.

URLs of the exposed GitHub Webhooks adhere to the following pattern:

`http(s)://<base URL>/inbound/<webhook ID>>`

- `<base URL>` is the URL of Connectors component deployment. When using the Camunda Platform 8 SaaS offering, this will typically contain your cluster region and cluster ID.
- `<webhook ID>` is the ID (path) you configured in the properties of your GitHub Webhook Connector.

If you make changes to your GitHub Webhook Connector configuration, you need to redeploy the BPMN diagram for the changes to take effect.

When you click on the event with GitHub Webhook Connector applied to it, a new **Webhooks** tab will appear in the properties panel.
This tab displays the URL of the GitHub Webhook Connector for every cluster where you have deployed your BPMN diagram.

:::note
The **Webhooks** tab is only supported in Web Modeler as part of the Camunda Platform 8 SaaS offering.
You can still use GitHub Webhook Connector in Desktop Modeler, or with your Camunda Platform 8 Self-Managed.
In that case, GitHub Webhook Connector deployments and URLs will not be displayed in Modeler.
:::

## Configure GitHub

1. Ensure you have administrator rights for the repository where you wish to enable a webhook.
2. Open a repository in your web browser and navigate to the **Settings** page.
3. Click **Webhooks > Add webhook**.
4. Fill the required fields.
   5.1. **Payload URL** - a URL of your webhook.
   5.2. **Content type** - choose `application/json`.
   5.3. **Secret** - is a shared secret between GitHub and your BPMN diagram.
5. Confirm by clicking **Add webhook**.

Refer to the [GitHub documentation](https://docs.github.com/en/rest/webhooks) for more details.

## Next steps

- Learn more about [GitHub webhooks](https://docs.github.com/en/developers/webhooks-and-events/webhooks/about-webhooks).
