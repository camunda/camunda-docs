---
id: rest
title: REST Connector
description: Make a request to a REST API and use the response in the next steps of your process.
---

:::caution
If you use the REST Connector, ensure you do not have any instance variable named in the list below:

- `body`, `url`, `method`, `headers`, `authentication`, `queryParameters`, `connectionTimeoutInSeconds`, `readTimeoutInSeconds`, `writeTimeoutInSeconds`

:::

The **REST Connector** is an outbound protocol Connector that allows you to make a request to a REST API and use the response in the next steps of your process.

## Create a REST Connector task

To use a **REST Connector** in your process, either change the type of existing task using the wrench-shaped **Change type** context menu, or create a new Connector task by using the **Append Connector** context menu. Follow [our guide on using Connectors](/components/connectors/use-connectors/index.md) to learn more.

## Make your REST Connector executable

To make the **REST Connector** executable, choose the required authentication type and fill out the mandatory fields highlighted in red in the properties panel:

:::note
All the mandatory and non-mandatory fields will be covered in the upcoming sections. Depending on the authentication selection you make, more fields might be required. We will also cover this in the next section.
:::

### Authentication

You can choose among the available authentication type according to your authentication requirements.

### REST Connector (None)

Click **None** in the **Authentication** section.
No extra authentication configuration is required; you can jump to the [next section](#request).

### REST Connector (API key)

For services that require an API key for authentication, you can configure the REST Connector to include your API key in the request.

#### Create a new Connector secret

We advise you to keep your **API key** safe and avoid exposing it in the BPMN `xml` file by creating a secret:

1. Follow our [guide for creating secrets](/components/console/manage-clusters/manage-secrets.md).
2. Name your secret (i.e `REST_API_KEY_SECRET`) so you can reference it later in the Connector.

### Configure API key authentication

Select the **REST Connector** and fill out the following properties under the **Authentication** section:

1. In the **Authentication** section, select **API key**.
2. Choose the location where the API key should be included:
   - **Query parameters**: The API key will be added to the URL as a query string.
   - **Headers**: The API key will be included in the request headers.
3. Specify your API key details:
   - **API key name**: Enter the parameter name expected by the API (e.g., apiKey).
   - **API key value**: Reference the secret you created for your API key (e.g., `{{secrets.REST_API_KEY_SECRET}}`).

### REST Connector (Basic)

##### Create a new Connector secret

We advise you to keep your **Password** safe and avoid exposing it in the BPMN `xml` file by creating a secret:

1. Follow our [guide for creating secrets](/components/console/manage-clusters/manage-secrets.md).
2. Name your secret (i.e `REST_BASIC_SECRET`) so you can reference it later in the Connector.

### Configure Basic Authentication

Select the **REST Connector** and fill out the following properties under the **Authentication** section:

1. Click **Basic** in the **Authentication** section.
2. Set **Username** (i.e. `{{secrets.YOUR_USERNAME}}`).
3. Set **Password** to the secret you created (i.e. `{{secrets.REST_BASIC_SECRET}}`).

### REST Connector (Bearer Token)

#### Create a new Connector secret

We advise you to keep your **Bearer token** safe and avoid exposing it in the BPMN `xml` file by creating a secret:

1. Follow our [guide for creating secrets](/components/console/manage-clusters/manage-secrets.md).
2. Name your secret (i.e `REST_BEARER_TOKEN`) so you can reference it later in the Connector.

#### Configure the Bearer token

Select the **REST Connector** and fill out the following properties under the **Authentication** section:

1. Click **Bearer token** in the **Authentication** section.
2. Set **Bearer** to the secret you created (i.e. `{{secrets.REST_BEARER_TOKEN}}`).

### REST Connector (OAuth token)

#### Create a new Connector secret

We advise you to keep your **OAUTH_TOKEN_ENDPOINT** safe and avoid exposing it in the BPMN `xml` file by creating a secret:

1. Follow our [guide for creating secrets](/components/console/manage-clusters/manage-secrets.md).
2. Name your secret (i.e `OAUTH_TOKEN_ENDPOINT`) so you can reference it later in the Connector.

#### Configure the OAuth token

Select the **REST Connector** and fill out the following properties under the **Authentication** section:

1. Click **OAuth 2.0** in the **Authentication** section.
2. Set **OAuth token endpoint** to the secret you created (i.e. `{{secrets.OAUTH_TOKEN_ENDPOINT}}`).
3. Set **Client ID** to the secret you created (i.e. `{{secrets.CLIENT_ID}}`).
4. Set **Client secret** to the secret you created (i.e. `{{secrets.CLIENT_SECRET}}`).
5. (Optional) Set **Scopes** (i.e. `read:clients`). Depending on the OAuth provider you're using, this may or may not be required.
6. Set **Audience** to the secret you created (i.e. `{{secrets.AUDIENCE}}`). It is an optional field. Depending on the OAuth provider you're using, you should fill this field or not.
7. Choose **Client authentication** from the dropdown menu (i.e. `Send client credentials in body`).

Find more information about the OAuth client credentials flow at the [RFC reference](https://www.rfc-editor.org/rfc/rfc6749#section-4.4).

## Request

Under the **HTTP Endpoint** section, select the desired **Method** and fill the **URL** with your desired REST API.

### Query parameters

The **Query parameters** field can be configured using the [FEEL Map](/components/modeler/feel/language-guide/feel-data-types.md#context) data type.

```text
= {
    q: "Berlin",
    appid: "{{secrets.OPEN_WEATHER_MAP_API_KEY}}",
    units: "metric",
    lang:"en"
}
```

:::note
Secrets are not like regular variables and must be wrapped in double quotes (`"`) when used in an expression.
:::

### HTTP Headers

Similarly to the Query Parameters, the **HTTP headers** can be specified using the [FEEL Map](/components/modeler/feel/language-guide/feel-data-types.md#context) data type.

```
= {
    Origin: "https://modeler.camunda.io/"
}
```

:::note
If you do not set the `Content-Type` header in your HTTP headers, the Connector will automatically set the `Content-Type` to `application/json`.
:::

### Request body

When you are making a PUT, POST, or PATCH request, you might need to provide a body.
You can provide a body for your request under the **Payload** section in the **Request body** field.

:::note
Secrets are currently not supported in the body of a **REST Connector**.
:::

```
= {
     "temp": 25,
     "pressure": 1013,
     "humidity": 44,
     "temp_min": 16,
     "temp_max": 30
}
```

### Network communication timeouts

- **Connection timeout in seconds** determines the time frame in which the client will try to establish a connection with the server. If you do not specify a value, the system uses the default of 20 seconds. For cases where you need to wait indefinitely, set this value to 0.

- **Read timeout in seconds** is the amount of time the client will wait to read data from the server after the connection has been made. The default is also set to 20 seconds. To allow an unlimited wait time for slow responses, set this to 0.

- **Write timeout in seconds** controls how long the client will wait to successfully send data to the server. The default setting for this is 0, indicating that there is no limit and the client will wait indefinitely for the operation to complete.

## Response

The HTTP response will be available in a temporary local `response` variable. This variable can be mapped to the process by specifying the **Result variable**.

The following fields are available in the `response` variable:

- **status**: Response status
- **body**: Response body of your request
- **headers**: Response headers

## Output mapping

### Result variable

You can export a complete response from an HTTP REST call into a dedicated variable accessible anywhere in a process.
To do so, just input a variable name in the **Result variable** field. We recommend using a unique name to avoid
variables being overwritten, for example `currentWeather`.

## Result expression

Additionally, you can choose to unpack the content of your `response` into multiple process variables using the **Result expression**, which is a [FEEL Context Expression](/components/modeler/feel/language-guide/feel-context-expressions.md).

```
= {
    actual_temp: response.body.main.temp,
    feel_temp: response.body.main.feels_like,
    weather: response.body.weather[1].main
}
```

## OData support

The **REST Connector** supports JSON-based [OData protocol](https://www.odata.org/).

### Requesting resources

Requesting resources works the same way regular REST requests work:

1. Under the **HTTP Endpoint** section, select the desired **Method**.
2. Fill in the **URL** with your desired REST API.
3. Depending on your provider, you may also need to set `OData-Version` and `OData-MaxVersion` headers.

### Requesting an individual resource

Similar to requesting resources, to request an individual resource you need to have a process variable. Use a FEEL string concatenation function
when building **URL**, e.g. `="https://my.odata.service/v4/Service/Resource('" + resourceId + "')"`.

### Queries

Additionally, if your provider supports OData queries, such as `$top`, you can use these when defined in the **Query parameters** field, e.g. `={"$top": 3, "$select": "FirstName, LastName"}`.
