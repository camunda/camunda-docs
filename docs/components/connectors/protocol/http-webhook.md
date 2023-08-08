---
id: http-webhook
title: HTTP Webhook Connector
sidebar_label: HTTP Webhook Connector
description: Start a process instance with your custom webhook configuration, triggered by an external HTTP call.
---

The **HTTP Webhook Connector** is an inbound Connector that allows you to start a BPMN process instance triggered by external HTTP call.

:::note
If you have used the HTTP Webhook Connector with a self-managed Camunda 8 configuration before the
Connector SDK [0.7.0 release](https://github.com/camunda/connector-sdk/releases/tag/0.7.0), you might need to manually replace the element template.
Please refer to the [update guide](/guides/update-guide/connectors/060-to-070.md) for more details.
:::

## Create an HTTP Webhook Connector event

1. Start building your BPMN diagram. You can use HTTP Webhook Connector with either **Start Event** or **Intermediate Catch Event** building blocks.
2. Select the applicable element and change its template to an HTTP Webhook.
3. Fill in all required properties.
4. Complete your BPMN diagram.
5. Deploy the diagram to activate the webhook.
6. Navigate to the **Webhooks** tab in the properties panel to see the webhook URL.

## Make your HTTP Webhook Connector executable

![HTTP Webhook prefilled](../img/use-inbound-connector-template-filled.png)

1. In the **Webhook Configuration** section, configure the **Webhook ID**. By default, **Webhook ID** is pre-filled with a random value. This value will be part of the Webhook URL. You will find more details about HTTP Webhook URLs [below](#activate-the-http-webhook-connector-by-deploying-your-diagram).
2. Configure [HMAC authentication](https://en.wikipedia.org/wiki/HMAC) if required in the **Authentication** section.

- Set the HMAC shared secret key which is used to calculate the message hash. The value is defined by a webhook administrator.
- Set the HMAC header whose value contains an encrypted hash message. The exact value is provided by the external caller.
- Select HMAC hash algorithm. The exact value is provided by the external caller.

3. Configure authorization if required in the **Authorization** section. The HTTP Webhook Connector supports the following authorization methods:

- **Basic** - The incoming requests must contain an `Authorization` header that contains the word `Basic` followed by a space and a base64-encoded string username:password.

  - Set the **Username** and **Password** properties which will be used to validate the incoming requests.
  - Provide the values in plain text, not base64-encoded.

- **API Key** - The API key can be provided anywhere in the request, for example, in the `Authorization` header or in the request body.

  - Set the **API Key** property to the expected value of the API key.
  - Set the **API Key locator** property that will be evaluated against the incoming request to extract the API key. [See the example](#how-to-configure-api-key-authorization).

- **[JWT authorization](https://jwt.io/)** - The token should be in the _Authorization_ header of the request in the format of Bearer {JWT_TOKEN}.

  - Set JWK URL which is used as a well-known public URL to fetch the [JWKs](https://auth0.com/docs/secure/tokens/json-web-tokens/json-web-key-sets).
  - Set JWT role property expression which will be evaluated against the content of the JWT to extract the list of roles. See more details on extracting roles from JWT data [here](#how-to-extract-roles-from-jwt-data).
  - Set the required roles which will be used to validate if the JWT contains all required roles. See more details on extracting roles from JWT data [here](#how-to-extract-roles-from-jwt-data).

4. Configure **Activation Condition**. For example, given external caller triggers a webhook endpoint with the body `{"id": 1, "status": "OK"}`, the **Activation Condition** value might look like `=(request.body.status = "OK")`. Leave this field empty to trigger your webhook every time.
5. Use **Variable Mapping** to map specific fields from the request into process variables using [FEEL](/components/modeler/feel/what-is-feel.md).
   For example, given the external caller triggers a webhook endpoint with the body `{"id": 1, "status": "OK"}` and you would like to extract `id` as a process variable `myDocumentId`, the **Result Expression** might look like this:

```
= {
  myDocumentId: request.body.id
}
```

6. If you are using the HTTP Webhook Connector with an **Intermediate Catch Event**, fill in the **Correlation key (process)** and **Correlation key (payload)**.

- **Correlation key (process)** is a FEEL expression that defines the correlation key for the subscription. This corresponds to the **Correlation key** property of a regular **Message Intermediate Catch Event**.
- **Correlation key (payload)** is a FEEL expression used to extract the correlation key from the incoming message. This expression is evaluated in the Connector Runtime and the result is used to correlate the message.

For example, given that your correlation key is defined with `orderId` process variable, and the request body contains `{"orderId": "123"}`, your correlation key settings will look like this:

- **Correlation key (process)**: `=orderId`
- **Correlation key (payload)**: `=request.body.orderId`

Learn more about correlation keys in the [messages guide](../../../concepts/messages).

## Activate the HTTP Webhook Connector by deploying your diagram

Once you click the **Deploy** button, your HTTP Webhook will be activated and publicly available.
You can trigger it by making a POST request to the generated URL.

:::note
HTTP Webhook Connector currently supports only POST requests.
:::

URLs of the exposed HTTP Webhooks adhere to the following pattern:

`http(s)://<base URL>/inbound/<webhook ID>>`

- `<base URL>` is the URL of Connectors component deployment. When using the Camunda Platform 8 SaaS offering, this will typically contain your cluster region and cluster ID.
- `<webhook ID>` is the ID (path) you configured in the properties of your HTTP Webhook Connector.

If you make changes to your HTTP Webhook Connector configuration, you need to redeploy the BPMN diagram for the changes to take effect.

When you click on the event with HTTP Webhook Connector applied to it, a new **Webhooks** tab will appear in the properties panel.
This tab displays the URL of the HTTP Webhook Connector for every cluster where you have deployed your BPMN diagram.

![HTTP Webhook tab](../img/use-inbound-connector-webhooks-tab.png)

:::note
The **Webhooks** tab is only supported in Web Modeler as part of the Camunda Platform 8 SaaS offering.
You can still use HTTP Webhook Connector in Desktop Modeler, or with your Camunda Platform 8 Self-Managed.
In that case, HTTP Webhook Connector deployments and URLs will not be displayed in Modeler.
:::

### Example

![GitHub webhook](../img/use-inbound-connector-template-filled-gh.png)

Give a use-case when you need to configure a GitHub webhook with an **HTTP Webhook Connector** in such a way that: (1) your BPMN process starts on every opened PR, and (2) the PR URL is exposed as a process variable.
Let's say you choose `mySecretKey` as a shared secret passphrase. GitHub [declares](https://docs.github.com/en/developers/webhooks-and-events/webhooks/securing-your-webhooks) that they use `X-Hub-Signature-256` header for `SHA-256` HMAC.
Therefore, you would need to set the following:

1. **Webhook ID**: any unique to your cluster webhook ID. This will generate a URL to trigger your webhook. In example, `myWebhookPath`.
2. **HMAC Authentication**: `enabled`.
3. **HMAC Secret Key**: `mySecretKey` or `secrets.MY_GH_SECRET`.
4. **HMAC Header**: `X-Hub-Signature-256`.
5. **HMAC Algorithm**: `SHA-256`.
6. **Activation Condition**: `=(request.body.action = "opened")`.
7. **Variable Mapping**: `={prUrl: request.body.pull_request.url}`.
8. Click `Deploy`.

### How to configure API key authorization

External callers can provide an API key anywhere in the requests. Some webhook providers use an `Authorization` header, while others pass the API key in the request body.
To support any scenario, you can configure the HTTP Webhook Connector to extract the API key from the request.

Use the **API Key locator** field to provide a FEEL expression that will be evaluated against the request to extract the API key.
The result of this expression will be used as the API key and compared against the expected API key value.

Use the **API Key** field to provide the expected API key value.

#### API key locator examples

Suppose an external caller triggers a webhook endpoint with the following request body:

```json
{
  "id": 1,
  "status": "OK",
  "secret": "my_secret"
}
```

You want to extract the `secret` field and use it as the API key to authorize the webhook request.
In this case, you can set the **API Key locator** to:

```feel
=request.body.secret
```

The expression above will be evaluated to `my_secret`, which will be used as the API key.

Alternatively, you can use the **API Key locator** to extract the API key from the `Authorization` header:

```feel
=request.headers.authorization
```

If your `Authorization` header contains the **Bearer** prefix, you can use the [`split`](https://camunda.github.io/feel-scala/docs/reference/builtin-functions/feel-built-in-functions-string/#splitstring-delimiter) function to remove it:

```feel
=split(request.headers.authorization, " ")[2]
```

### How to extract roles from JWT data

To extract roles from the JWT payload, specify the **JWT role property expression** using the FEEL expression syntax.

:::note
This expression will be evaluated only against the JWT payload, therefore you cannot access process variables or secrets here.
:::

#### JWT payload and role property expression example

Let's observe a typical JWT payload example below:

```json
{
  "iss": "https://idp.local",
  "aud": "api1",
  "sub": "5be86359073c434bad2da3932222dabe",
  "client_id": "my_client_app",
  "exp": 1786822616,
  "iat": 1686819016,
  "jti": "114f8c84c53703ac2120d302611e358c",
  "roles": ["admin", "superadmin"],
  "admin": true
}
```

To extract the roles you can set the **JWT role property expression** to:

```feel
if admin = true then ["admin"] else roles
```

Note: the result of this expression should always be an array.

In this particular case, the if statement is evaluated to true, the extracted roles will be:

```feel
["admin"]
```

If you provide _["admin"]_ for **Required roles**, the message _can be correlated_.

If you provide _["superadmin"]_ or _["admin","superadmin"]_, for **Required roles**, for example, the message _can NOT be correlated_ and the connector will throw an exception.

:::note
For GitHub, there is a simplified [GitHub Webhook Connector](/components/connectors/out-of-the-box-connectors/github-webhook.md).
:::
