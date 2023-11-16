---
id: tasklist-api-rest-authentication
title: "Authentication"
sidebar_position: 2
description: "Describes authentication options that can be used to access Tasklist REST API."
---

## Authentication in the cloud

To access the API endpoint, you need an access token.

Your client must send a header in each request:

`Authorization: Bearer <Token>`

For example, send a request using _curl_:

```shell
curl -X POST -H -H :accept: application/json" -H "Authorization: Bearer <TOKEN>" -d '' http://localhost:8080/v1/tasks/search
```

### How to obtain the access token

You must obtain a token to use the Tasklist API. When you create a Tasklist [client](/guides/setup-client-connection-credentials.md), you get all the information needed to connect to Tasklist.

Refer to our guide on [building your own client](../build-your-own-client.md).

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

The authentication is described in [Tasklist Configuration - Authentication](../../self-managed/tasklist-deployment/tasklist-authentication.md/#identity).
