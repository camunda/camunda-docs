---
id: operate-api-authentication
title: Authentication
description: "Learn about authentication options to access the Operate REST API."
---

All Operate REST API requests require authentication.

## Authentication for SaaS

### Authentication via JWT access token

You must pass an access token as a header in each request to the SaaS Operate API. When you create an Operate [client](/guides/setup-client-connection-credentials.md), you get all the information needed to connect to Operate.

The following settings are needed to request a token:

| Name                     | Description                                     | Default value        |
| ------------------------ | ----------------------------------------------- | -------------------- |
| client id                | Name of your registered client                  | -                    |
| client secret            | Password for your registered client             | -                    |
| audience                 | Permission name; if not given use default value | `operate.camunda.io` |
| authorization server url | Token issuer server                             | -                    |

:::note
For more information on how to get these values for Camunda 8, read [manage API clients](/components/console/manage-clusters/manage-api-clients.md).
:::

Send a token issue _POST_ request to the authorization server with the required settings:

```shell
curl -X POST -H 'content-type: application/json' -d '{"client_id": "RgVdPv...", "client_secret":"eDS1~Hg...","audience":"operate.camunda.io","grant_type":"client_credentials"}' https://login.cloud.camunda.io/oauth/token
```

You will get something like the following:

```json
{
  "access_token": "eyJhbG...",
  "scope": "f408ca38-....",
  "expires_in": 58847,
  "token_type": "Bearer"
}
```

Capture the `access_token` value from the response object. In each request to the Operate API, include it as an authorization header:

```
Authorization: Bearer eyJHb...
```

## Authentication for Self-Managed cluster

### Authentication via Identity JWT access token

This authentication method is described in [Operate Configuration - Authentication](/self-managed/operate-deployment/operate-authentication.md#identity).

### Authentication via cookie

Another way to access the Operate API in a Self-Managed cluster is to send cookie headers in each request. The cookie can be obtained by using the API endpoint `/api/login`. Take the steps in the following example:

**Example:**

1. Log in as user 'demo' and store the cookie in the file `cookie.txt`.

```shell
curl -c cookie.txt -X POST 'http://localhost:8080/api/login?username=demo&password=demo'
```

2. Send the cookie (as a header) in each API request. In this case, request all process definitions.

```shell
curl -b cookie.txt -X POST 'http://localhost:8080/v1/process-definitions/search' -H 'Content-Type: application/json' -d '{}'
```
