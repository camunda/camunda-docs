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
Please refer to the [update guide](../../../../guides/update-guide/connectors/060-to-070) for more details.
:::

## Create a GitHub Webhook Connector task

1. Start building your BPMN diagram with a **Start Event** building block.
2. Change its template to a GitHub Webhook.
3. Fill in all required properties.
4. Complete your BPMN diagram.
5. Deploy the diagram to activate the webhook.
6. Navigate to the **Webhooks** tab in the properties panel to see the webhook URL.

## Make your GitHub Webhook Connector for receiving messages executable

![GitHub Webhook Connector](../img/use-github-connector-template.png)

![GitHub Webhook](../img/use-inbound-connector-template-filled-gh.png)

1. In the **Webhook Configuration** section, configure the **Webhook ID**. By default, **Webhook ID** is pre-filled with a random value. This value will be part of the Webhook URL. You will find more details about GitHub Webhook URLs [below](#activate-the-github-webhook-connector-by-deploying-your-diagram).
2. Set the **GitHub secret**. This is a shared secret key that has to be defined in both your BPMN and GitHub webhook configuration page. The value is used to calculate HMAC authentication signature.
3. Configure **Activation Condition**. For example, given GitHub triggers a webhook endpoint with a new PR payload `{"action": "opened", "pull_request": ...}`, the **Activation Condition** value might look like as `=(request.body.action = "opened")`. Leave this field empty to trigger your webhook every time.
4. Configure **Variable Mapping**. For example, GitHub triggers a webhook endpoint with a new PR payload `{"action": "opened", "pull_request": { "url: "https://...", ... }}` and you would like to extract a PR URL as a process variable `prUrl`. In that case, the **Variable Mapping** might look like `={prUrl: request.body.pull_request.url}`.

## Activate the GitHub Webhook Connector by deploying your diagram

Once you click the **Deploy** button, your GitHub Webhook will be activated and publicly available.

URLs of the exposed GitHub Webhooks adhere to the following pattern:

`http(s)://<base URL>/inbound/<webhook ID>>`

- `<base URL>` is the URL of Connectors component deployment. When using the Camunda Platform 8 SaaS offering, this will typically contain your cluster region and cluster ID.
- `<webhook ID>` is the ID (path) you configured in the properties of your GitHub Webhook Connector.

If you make changes to your GitHub Webhook Connector configuration, you need to redeploy the BPMN diagram for the changes to take effect.

When you click on the event with GitHub Webhook Connector applied to it, a new **Webhooks** tab will appear in the properties panel.
This tab displays the URL of the GitHub Webhook Connector for every cluster where you have deployed your BPMN diagram.

![HTTP Webhook tab](../img/use-inbound-connector-webhooks-tab.png)

:::note
The **Webhooks** tab is only supported in Web Modeler as part of the Camunda Platform 8 SaaS offering.
You can still use GitHub Webhook Connector in Desktop Modeler, or with your Camunda Platform 8 Self-Managed.
In that case, GitHub Webhook Connector deployments and URLs will not be displayed in Modeler.
:::

## Next steps

- Learn more about [GitHub webhooks](https://docs.github.com/en/developers/webhooks-and-events/webhooks/about-webhooks).
