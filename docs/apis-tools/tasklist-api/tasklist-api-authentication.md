---
id: tasklist-api-authentication
title: Authentication
slug: /apis-tools/tasklist-api/tasklist-api-authentication
sidebar_position: 2
description: "Build apps powered by BPMN that require human interaction, and make requests."
---

Authenticate to access the Tasklist API.

## Authentication in the cloud

To access the API endpoint, you need an access token.

Your client must send a header in each request:

`Authorization: Bearer <Token>`

For example, send a request using _curl_:

```shell
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer <TOKEN>" -d '{"query": "{tasks(query:{}){name}}"}' http://localhost:8080/graphql
```

### How to obtain the access token

You must obtain a token to use the Tasklist API. When you create a Tasklist [client](/guides/setup-client-connection-credentials.md), you get all the information needed to connect to Tasklist.

Refer to our guide on [building your own client](/apis-tools/build-your-own-client.md).

The following settings are needed:

| Name                     | Description                                     | Default value         |
| ------------------------ | ----------------------------------------------- | --------------------- |
| client id                | Name of your registered client                  | -                     |
| client secret            | Password for your registered client             | -                     |
| audience                 | Permission name; if not given use default value | `tasklist.camunda.io` |
| authorization server url | Token issuer server                             | -                     |

Send a token issue _POST_ request to the authorization server with the following content:

```json
{
  "client_id": "<client-id>",
  "client_secret": "<client-secret>",
  "audience": "<audience>",
  "grant_type": "client_credentials"
}
```

Refer to the following example with _curl_:

```shell
curl -X POST --header 'content-type: application/json' --data '{"client_id": "<client-id>", "client_secret":"<client-secret>","audience":"<audience>","grant_type":"client_credentials"}' https://<authorization server url>
```

If the authentication is successful, the authorization server sends back the access token, when it expires, scope, and type:

```json
{
  "access_token": "ey...",
  "scope": "...",
  "expires_in": 86400,
  "token_type": "Bearer"
}
```

## Authentication for Self-Managed cluster

### Authentication via Identity JWT access token

The authentication is described in [Tasklist Configuration - Authentication](/self-managed/tasklist-deployment/tasklist-authentication.md#identity).

### Authentication via cookie

:::note
When authenticating via cookie, note that Cross-Site Request Forgery (CSRF) protection must be disabled to allow this method of authentication. In a Camunda Self-Managed cluster, set the configuration property `camunda.tasklist.csrfPreventionEnabled` to `false`.
:::

Another way to access the Tasklist API in a Self-Managed cluster is to send cookie headers in each request. The cookie can be obtained by using the API endpoint `/api/login`. Take the following steps:

1. Log in as user 'demo' and store the cookie in the file `cookie.txt`:

```shell
curl -c cookie.txt -X POST 'http://localhost:8080/api/login?username=demo&password=demo'
```

2. Send the cookie (as a header) in each API request. In this case, request all process definitions:

```shell
curl -b cookie.txt -X POST 'http://localhost:8080/v1/process-definitions/search' -H 'Content-Type: application/json' -d '{}'
```
