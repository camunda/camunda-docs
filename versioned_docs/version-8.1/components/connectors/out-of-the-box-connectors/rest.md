---
id: rest
title: REST Connector
description: Make a request to a REST API and use the response in the next steps of your process.
---

:::caution
If you use the REST Connector, ensure you do not have any instance variable named in the list below:

- body, url, method, headers, authentication, queryParameters, connectionTimeoutInSeconds

:::

The **REST Connector** allows you to make a request to a REST API and use the response in the next steps of your process.

## Create a REST Connector task

To use a **REST Connector** in your process, either change the type of existing task using the wrench-shaped **Change type** context menu, or create a new Connector task by using the **Append Connector** context menu. Follow [our guide on using Connectors](../use-connectors.md) to learn more.

## Make your REST Connector executable

To make the **REST Connector** executable, choose the required authentication type and fill out the mandatory fields highlighted in red in the properties panel:

![rest Connector red properties](../img/connectors-rest-red-properties.png)

:::note
All the mandatory and non-mandatory fields will be covered in the upcoming sections. Depending on the authentication selection you make, more fields might be required. We will also cover this in the next section.
:::

### Authentication

You can choose among the available authentication type according to your authentication requirements.

### REST Connector (None)

Click **None** in the **Authentication** section.
No extra authentication configuration is required; you can jump to the [next section](#request).

### REST Connector (Basic)

##### Create a new Connector secret

We advise you to keep your **Password** safe and avoid exposing it in the BPMN `xml` file by creating a secret:

1. Follow our [guide for creating secrets](../../console/manage-clusters/manage-secrets.md).
2. Name your secret (i.e `REST_BASIC_SECRET`) so you can reference it later in the Connector.

### Configure Basic Authentication

Select the **REST Connector** and fill out the following properties under the **Authentication** section:

1. Click **Basic** in the **Authentication** section.
2. Set **Username** (i.e. `secrets.YOUR_USERNAME`).
3. Set **Password** to the secret you created (i.e. `secrets.REST_BASIC_SECRET`).

![rest Connector basic](../img/connectors-rest-basic.png)

### REST Connector (Bearer Token)

#### Create a new Connector secret

We advise you to keep your **Bearer Token** safe and avoid exposing it in the BPMN `xml` file by creating a secret:

1. Follow our [guide for creating secrets](../../console/manage-clusters/manage-secrets.md).
2. Name your secret (i.e `REST_BEARER_TOKEN`) so you can reference it later in the Connector.

#### Configure the Bearer Token

Select the **REST Connector** and fill out the following properties under the **Authentication** section:

1. Click **Bearer Token** in the **Authentication** section.
2. Set **Bearer** to the secret you created (i.e. `secrets.REST_BEARER_TOKEN`).

![rest Connector bearer token](../img/connectors-rest-bearer-token.png)

### REST Connector (OAuth token)

#### Create a new Connector secret

We advise you to keep your **OAUTH_TOKEN_ENDPOINT** safe and avoid exposing it in the BPMN `xml` file by creating a secret:

1. Follow our [guide for creating secrets](../../console/manage-clusters/manage-secrets.md).
2. Name your secret (i.e `OAUTH_TOKEN_ENDPOINT`) so you can reference it later in the Connector.

#### Configure the OAuth Token

Select the **REST Connector** and fill out the following properties under the **Authentication** section:

1. Click **OAuth 2.0** in the **Authentication** section.
2. Set **OAuth Token Endpoint** to the secret you created (i.e. `secrets.OAUTH_TOKEN_ENDPOINT`).
3. Set **Client ID** to the secret you created (i.e. `secrets.CLIENT_ID`).
4. Set **Client secret** to the secret you created (i.e. `secrets.CLIENT_SECRET`).
5. (Optional) Set **Scopes** (i.e. `read:clients`). Depending on the OAuth provider you're using, this may or may not be required.
6. Set **Audience** to the secret you created (i.e. `secrets.AUDIENCE`). It is an optional field. Depending on the OAuth provider you're using, you should fill this field or not.
7. Choose **Client Authentication** from the dropdown menu (i.e. `Send client credentials in body`).

![rest Connector oauth token](../img/connectors-rest-oauth-token.png)

Find more information about the OAuth client credentials flow at the [RFC reference](https://www.rfc-editor.org/rfc/rfc6749#section-4.4).

## Request

Under the **HTTP Endpoint** section, select the desired **Method** and fill the **URL** with your desired REST API.

![rest Connector method and url](../img/connectors-rest-http-method-url.png)

### Query Parameters

The **Query Parameters** field can be configured using the ![feel-icon](../img/feel-icon.png) [FEEL Map](https://camunda.github.io/feel-scala/docs/reference/language-guide/feel-data-types/#context) data type.

```text
= {
    q: "Berlin",
    appid: "secrets.OPEN_WEATHER_MAP_API_KEY",
    units: "metric",
    lang:"en"
}
```

:::note
Secrets are not like regular variables and must be wrapped in double quotes (`"`) when used in an expression.
:::

![rest connector query parameters](../img/connectors-rest-query-param.png)

### Http Headers

Similarly to the Query Parameters, the **Http Headers** can be specified using the ![feel-icon](../img/feel-icon.png) [FEEL Map](https://camunda.github.io/feel-scala/docs/reference/language-guide/feel-data-types/#context) data type.

```text
= {
    Origin: "https://modeler.cloud.camunda.io/"
}
```

![rest connector http headers](../img/connectors-rest-http-headers.png)

### Request Body

When you are making a PUT, POST, or PATCH request, you might need to provide a body.
You can provide a body for your request under the **Payload** section in the **Request Body** field.

Be aware that **REST Connector** is supporting only JSON payload.

:::note
Secrets are currently not supported in the body of a REST Connector.
:::

```json
= {
     "temp": 25,
     "pressure": 1013,
     "humidity": 44,
     "temp_min": 16,
     "temp_max": 30
}
```

![rest connector http request body](../img/connectors-rest-http-request-body.png)

### Connection timeout

To set connection timeout in your request, set it in seconds in the **Connection Timeout** section.
This is not a required field, with a default value of 20 seconds. To set an infinite timeout, set this value to `0`.

![rest connector http request body](../img/connectors-rest-http-connection-timeout.png)

## Response

The HTTP response will be available in a temporary local `response` variable. This variable can be mapped to the process by specifying the **Result Variable**.

The following fields are available in the `response` variable:

- **status**: Response status
- **body**: Response body of your request
- **headers**: Response headers

Additionally, you can choose to unpack the content of your `response` into multiple process variables using the ![feel-icon](../img/feel-icon.png) **Result Expression**, which is a [FEEL Context Expression](/components/modeler/feel/language-guide/feel-context-expressions.md).

```text
= {
    actual_temp: response.body.main.temp,
    feel_temp: response.body.main.feels_like,
    weather: response.body.weather[1].main
}
```

![rest connector http response mapping](../img/connectors-rest-http-response-mapping.png)

The next steps in your process will have access to the `currentWeather` variable that will contain the full response and the mapped variables from the result expression: `actual_temp`, `feel_temp`, and `weather`.
