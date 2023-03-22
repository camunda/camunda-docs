---
id: optimize-api-authorization
title: "Authorization"
description: "Connect business process-related event data and variable data held in external systems from third-party systems to Optimize, and more."
---

Most requests of the Public REST API need to include an authorization token
as an [`Authorization`](https://tools.ietf.org/html/rfc7235#section-4.2) request header.

Given a valid token `mySecret`, the header would need to be set as follows:

```
Authorization: Bearer mySecret
```

The token used to access the Optimize API can be a configurable shared secret (except in Camunda Platform 8 SaaS mode) or a JWT compliant with the OAuth2 Protocol (all modes).

Refer to [Public API Configuration](../../self-managed/optimize-deployment/configuration/system-configuration.md#public-api) for the particular configuration to access the public API using a token.

### How to obtain the access token for C8 SaaS (Cloud) usage

You must obtain a token to use the Optimize API. When you create an Optimize [client](https://docs.camunda.io/docs/guides/setup-client-connection-credentials/), you get all the information needed to connect to Optimize.

See our guide on [building your own client]($docs$/apis-tools/build-your-own-client/).

The following settings are needed:

| Name                     | Description                                     | Default value         |
| ------------------------ | ----------------------------------------------- | --------------------- |
| client id                | Name of your registered client                  | -                     |
| client secret            | Password for your registered client             | -                     |
| audience                 | Permission name; if not given use default value | `optimize.camunda.io` |
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

See the following example with _curl_:

```shell
curl -X POST --header 'content-type: application/json' --data '{"client_id": "<client-id>", "client_secret":"<client-secret>","audience":"<audience>","grant_type":"client_credentials"}' https://<authorization server url>
```

If the authorization is successful, the authorization server sends back the access token, when it expires, scope, and type:

```json
{
  "access_token": "ey...",
  "scope": "...",
  "expires_in": 86400,
  "token_type": "Bearer"
}
```
