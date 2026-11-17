---
id: graphql
title: GraphQL connector
sidebar_label: GraphQL
description: Execute a GraphQL query or mutation from your BPMN process.
---

The **GraphQL connector** is an outbound protocol connector that allows you to execute a GraphQL query or mutation from your BPMN process.

## Prerequisites

The GraphQL connector allows you to connect to a GraphQL API endpoint. To use the GraphQL connector, you need to know the GraphQL endpoint URL, authentication, and available API methods.

## Create a GraphQL connector task

import ConnectorTask from '../../../components/react-components/connector-task.md'

<ConnectorTask/>

## Make your GraphQL connector executable

To make the **GraphQL connector** executable, fill out the mandatory fields highlighted in red in the properties panel on the right side of the screen.

:::note
All the mandatory and non-mandatory fields are covered in the upcoming sections. Depending on the authentication selection you make, more fields might be required; this is covered in the next section.
:::

### Authentication

You can choose among the available authentication types according to your authentication requirements using the **Authentication** section.

#### Use a reusable authentication credential

Instead of configuring authentication on the task, you can select a reusable authentication credential in the **Authentication credential** field. When you select a credential, the authentication fields described below are hidden. The **URL** field then overrides the URL carried by the credential, and is required if the credential doesn't carry a URL. Learn more about [using credentials](/components/connectors/use-connectors/index.md#using-credentials).

### None

Click **None** in the **Authentication** section. No extra authentication configuration is required.

### API key

Use **API key** for services that expect an API key in a header or query parameter. We advise you to store the API key as a [secret](/components/connectors/use-connectors/index.md#using-secrets).

1. Click **API key** in the **Authentication** section.
2. In **Api key location**, choose where to include the API key:
   - **Headers**: The API key is included in the request headers.
   - **Query parameters**: The API key is added to the URL as a query parameter.
3. Set **API key name** to the parameter name expected by the API.
4. Set **API key value** to the API key (for example, `{{secrets.GRAPHQL_API_KEY}}`).

### Basic

#### Create a new connector secret

We advise you to keep your **Password** safe and avoid exposing it in the BPMN `xml` file by creating a secret:

1. Follow our [guide for creating secrets](/components/saas/clusters/manage-secrets.md).
2. Name your secret (i.e `GRAPHQL_PASSWORD`) so you can reference it later in the connector.

### Configure Basic Authentication

Select the **GraphQL connector** and fill out the following properties under the **Authentication** section:

1. Click **Basic** in the **Authentication** section.
2. Set **Username** (i.e. `{{secrets.GRAPHQL_USERNAME}}`).
3. Set **Password** to the secret you created (i.e. `{{secrets.GRAPHQL_PASSWORD}}`).

### Bearer Token

#### Create a new connector secret

We advise you to keep your **Bearer token** safe and avoid exposing it in the BPMN `xml` file by creating a secret:

1. Follow our [guide for creating secrets](/components/saas/clusters/manage-secrets.md).
2. Name your secret (i.e `GRAPHQL_BEARER_TOKEN`) so you can reference it later in the connector.

#### Configure the Bearer Token

Select the **GraphQL connector** and fill out the following properties under the **Authentication** section:

1. Click **Bearer token** in the **Authentication** section.
2. Set **Bearer token** to the secret you created (i.e. `{{secrets.GRAPHQL_BEARER_TOKEN}}`).

### OAuth token

#### Create a new connector secret

We advise you to keep your **OAUTH_TOKEN_ENDPOINT** safe and avoid exposing it in the BPMN `xml` file by creating a secret:

1. Follow our [guide for creating secrets](/components/saas/clusters/manage-secrets.md).
2. Name your secret (i.e `OAUTH_TOKEN_ENDPOINT`) so you can reference it later in the connector.

#### Configure the OAuth Token

Select the **GraphQL connector** and fill out the following properties under the **Authentication** section:

1. Click **OAuth 2.0** in the **Authentication** section.
2. Set **OAuth 2.0 token endpoint** to the secret you created (i.e. `{{secrets.OAUTH_TOKEN_ENDPOINT}}`).
3. Set **Client ID** to the secret you created (i.e. `{{secrets.CLIENT_ID}}`).
4. Set **Client secret** to the secret you created (i.e. `{{secrets.CLIENT_SECRET}}`).
5. (Optional) Set **Scopes** (i.e. `read:clients`). Depending on the OAuth provider you're using, this may or may not be required.
6. Set **Audience** to the secret you created (i.e. `{{secrets.AUDIENCE}}`). This is an optional field depending on the OAuth provider you're using.
7. Choose **Client authentication** from the dropdown menu (i.e. `Send client credentials in body`).

Find more information about the OAuth client credentials flow in the [RFC reference](https://www.rfc-editor.org/rfc/rfc6749#section-4.4).

### OAuth 2.0 refresh token

Use **OAuth 2.0 Refresh Token** to obtain a new access token from a refresh token. We advise you to store the client secret and refresh token as [secrets](/components/saas/clusters/manage-secrets.md).

Select the **GraphQL connector** and fill out the following properties under the **Authentication** section:

1. Click **OAuth 2.0 Refresh Token** in the **Authentication** section.
2. Set **OAuth 2.0 token endpoint**.
3. Set **Client ID** to your application's client ID from the OAuth client.
4. (Optional) Set **Client secret** to your application's client secret from the OAuth client.
5. Set **Refresh token** to the refresh token used to obtain a new access token.
6. (Optional) Set **Scopes** to the scopes to request authorization for, separated by spaces.

Find more information about refreshing an access token in the [RFC reference](https://www.rfc-editor.org/rfc/rfc6749#section-6).

## HTTP endpoint

Under the **HTTP Endpoint** section, fill in the **URL** with your desired endpoint and select the desired **Method**.

## GraphQL query

### Query/Mutation

Insert your query or mutation you wish to execute here. This must be a syntactically valid instruction. For more details, see [the official documentation](https://graphql.org/learn/queries/).

You can use [arguments](https://graphql.org/learn/queries/#arguments), [aliases](https://graphql.org/learn/queries/#aliases), [directives](https://graphql.org/learn/queries/#directives), and [fragments](https://graphql.org/learn/queries/#fragments) as well.
For example:

```text
query Root($id: ID) {
 person (id: $id) {
  id
  name
 }
}
```

:::note
Secrets are currently not supported in the **Query/Mutation** of a GraphQL connector.
:::

:::note
You can test your queries on publicly available GraphQL API [here](https://studio.apollographql.com/public/star-wars-swapi/home?variant=current).
:::

#### Example

```text
query Query {
  allFilms {
    films {
      title
      director
      releaseDate
      speciesConnection {
        species {
          name
          classification
        }
      }
    }
  }
}
```

### Variables

You can specify [variables](https://graphql.org/learn/queries/#variables) to your queries/mutations.

The **Variables** field can be configured using the [FEEL Map](/components/modeler/feel/language-guide/feel-data-types.md#context) data type.

```text
= {
    "id": "{{secrets.GRAPHQL_ENTITY_ID}}",
    "includeDroids": false,
}
```

:::note
Secrets are not like regular variables and must be wrapped in double quotes (`"`) when used in an expression.
:::

#### Example

Query:

```text
query Root($id: ID, $includeGender: Boolean!) {
  person (id: $id) {
    name,
    height,
    gender @include(if: $includeGender)
  }
}
```

Variables:

```text
{
  "id": "cGVvcGxlOjI=",
  "includeGender": false
}
```

### Network communication timeouts

- **Connection timeout in seconds** determines the time frame in which the client will try to establish a connection with the server. If you do not specify a value, the system uses the default of 20 seconds. For cases where you need to wait indefinitely, set this value to 0.

- **Read timeout in seconds** is the amount of time the client will wait to read data from the server after the connection has been made. The default is also set to 20 seconds. To allow an unlimited wait time for slow responses, set this to 0.

## Response mapping

The HTTP response will be available in a temporary local `response` variable. This variable can be mapped to the process by specifying the **Result Variable**.

The following fields are available in the `response` variable:

- **status**: Response status
- **body**: Response body of your request. Populated when the **Response format** is **as text** or **as JSON**.
- **headers**: Response headers
- **document**: Populated when the **Response format** is **Document reference**; a reference to the response stored in the Camunda document store.

### Response format

Choose how the response body is returned with the **Response format** dropdown, a [return format](/components/document-handling/send-document-to-external-system.md#return-formats):

- **as JSON** (default): the body is parsed as JSON and returned in `body`.
- **as text**: the body is decoded as a string (with an optional encoding, default UTF-8) and returned in `body`.
- **Document reference**: the body is streamed to the Camunda document store and a reference is returned in `document`.

:::note
The **as JSON** default fails the job when the response body is not valid JSON. Use **as text** for non-JSON responses. Both **as text** and **as JSON** are subject to a size guard (approximately 1.5 MiB); use **Document reference** for large responses.
:::

Additionally, you can choose to unpack the content of your `response` into multiple process variables using the **Result Expression**, which is a [FEEL Context Expression](/components/modeler/feel/language-guide/feel-context-expressions.md).

```text
= {
    person: response.body.data.person
}
```

The next steps in your process will have access to the `graphqlQueryResponse` variable that contain the full response and the mapped variable from the result expression: `person`.
