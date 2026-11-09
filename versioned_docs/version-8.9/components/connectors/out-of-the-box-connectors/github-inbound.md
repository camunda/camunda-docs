---
id: github-inbound
title: GitHub Webhook connector
sidebar_label: GitHub inbound
description: Start or continue a BPMN process when a GitHub event occurs.
---

import InboundConnectorBasics from '../../../components/react-components/\_connector-inbound-basics.md'
import ErrorHandling from '../../../components/react-components/\_connector-error-handling.md'

Use the GitHub Webhook connector to start a process instance, or continue a running one, when a [GitHub event](https://docs.github.com/en/developers/webhooks-and-events/webhooks/about-webhooks) occurs.

## About this connector

The **GitHub Webhook connector** is an inbound connector that receives events from GitHub through a webhook. It exposes a webhook URL that you register in the settings of a GitHub repository, and it can start or continue a process when an event arrives. For example, use it to start a review process when someone opens a pull request.

You can use the connector with a **Start Event**, **Message Start Event**, **Intermediate Catch Event**, **Boundary Event**, or **Receive Task**. To manage GitHub resources from a process, use the [GitHub outbound connector](./github-outbound.md).

## Prerequisites

To use the **GitHub Webhook connector**, you need administrator rights for the GitHub repository where you want to enable a webhook. GitHub must be able to reach the URL of the connector runtime.

<InboundConnectorBasics />

## Configuration

### Webhook configuration

| Property      | Type   | Required | Description                                                                                                                                                                                                                                                                                                                                            | Example |
| :------------ | :----- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------ |
| Webhook ID    | String | Yes      | The ID of the webhook. It becomes part of the webhook URL. See [activate the connector](#activate-the-connector).                                                                                                                                                                                                                                      |         |
| GitHub secret | String | Yes      | A shared secret key that you define in both your BPMN diagram and the webhook settings in GitHub. The connector uses it to validate the HMAC signature (SHA-256) that GitHub sends in the `X-Hub-Signature-256` header. The validation is always on and you can't turn it off, so the connector rejects every incoming request if the secret is empty. |         |

### Activation

| Property  | Type   | Required | Description                                                                                                                                                                                                                       | Example                             |
| :-------- | :----- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------- |
| Condition | String | No       | A FEEL condition that defines when an event triggers the connector. Leave it empty to trigger the connector for every event. Learn more about [activation conditions](/components/connectors/use-connectors/index.md#activation). | `=(request.body.action = "opened")` |

For example, when GitHub triggers the webhook with a new pull request payload `{"action": "opened", "pull_request": ...}`, the condition `=(request.body.action = "opened")` triggers the connector only when a pull request is opened.

### Correlation

The **Correlation** section configures message correlation. It isn't available for the plain **Start Event** template, because plain start events are triggered by process instance creation and don't rely on message correlation.

| Property                  | Type     | Required | Description                                                                                                                                                                                                                                                                                                                | Example                         |
| :------------------------ | :------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------ |
| Correlation required      | Dropdown | Yes      | Whether correlation is required: **Correlation not required** or **Correlation required**. Only shown for the **Message Start Event**, where it is needed for event-based subprocesses. The default is **Correlation not required**.                                                                                       |                                 |
| Correlation key (process) | String   | Yes      | A FEEL expression that defines the correlation key of the subscription. It corresponds to the **Correlation key** of a regular message catch event. For the **Message Start Event**, it is required only if **Correlation required** is **Correlation required**.                                                          | `=pullRequestId`                |
| Correlation key (payload) | String   | Yes      | A FEEL expression that extracts the correlation key from the incoming message. For the **Message Start Event**, it is required only if **Correlation required** is **Correlation required**.                                                                                                                               | `=request.body.pull_request.id` |
| Message ID expression     | String   | No       | A FEEL expression that extracts the message ID from the incoming message. The message ID is a unique identifier that Zeebe uses for message correlation and deduplication. In most cases, you don't need to set it. Learn more about [message correlation](/components/concepts/messages.md#message-correlation-overview). | `=request.body.pull_request.id` |

For example, if your process defines the correlation key in the `pullRequestId` process variable, and the request body contains `{"pull_request": {"id": 123}}`, set the following values:

- **Correlation key (process)**: `=pullRequestId`
- **Correlation key (payload)**: `=request.body.pull_request.id`

Learn more about correlation keys in the [messages guide](/components/concepts/messages.md) and in [correlation](/components/connectors/use-connectors/index.md#correlation).

## Activate the connector

When you deploy your diagram, the **GitHub Webhook connector** is activated and publicly available. The URL of the connector follows this pattern:

`http(s)://<base URL>/inbound/<webhook ID>`

- `<base URL>` is the URL of the connectors component deployment. In Camunda 8 SaaS, it typically contains your **region ID** and **cluster ID**, which you find in your client credentials on the **API** tab of your cluster.
- `<webhook ID>` is the **Webhook ID** you configured in the connector properties.

If you change the connector configuration, redeploy the BPMN diagram for the changes to take effect.

When you select an element with the **GitHub Webhook connector** applied, a **Webhooks** tab appears in the properties panel. It shows the connector URL for every cluster where you deployed the diagram.

:::note
The **Webhooks** tab is only supported in Web Modeler as part of the Camunda 8 SaaS offering.
You can still use the GitHub Webhook connector in Desktop Modeler or with Camunda 8 Self-Managed.
In that case, Modeler doesn't display the connector deployments and URLs.
:::

## Configure GitHub

1. Make sure you have administrator rights for the repository where you want to enable a webhook.
2. Open the repository in your web browser and select **Settings**.
3. Select **Webhooks**, and then select **Add webhook**.
4. Fill out the required fields:
   1. **Payload URL**: The URL of your webhook.
   2. **Content type**: Select `application/json`.
   3. **Secret**: The shared secret between GitHub and your BPMN diagram.
5. Select **Add webhook**.

Refer to the [GitHub documentation](https://docs.github.com/en/rest/webhooks) for more details.

## Output

The connector returns the incoming HTTP request. Use **Result variable** to store the request in a process variable, for example `myResultVariable`. Use **Result expression** to map specific fields into process variables with [FEEL](/components/modeler/feel/what-is-feel.md).

The request contains the following fields:

- `request.body`: The payload of the GitHub event.
- `request.headers`: The HTTP headers of the request.
- `request.params`: The query parameters of the request.

For example, when the webhook is triggered with the body `{"pull_request": {"id": 123}}`, the following **Result expression** extracts the pull request ID as the `pullRequestId` process variable:

```feel
= {
  pullRequestId: request.body.pull_request.id
}
```

<ErrorHandling />

## Further resources

- [About GitHub webhooks](https://docs.github.com/en/developers/webhooks-and-events/webhooks/about-webhooks)
- [GitHub webhooks REST API](https://docs.github.com/en/rest/webhooks)
- [GitHub outbound connector](./github-outbound.md)
