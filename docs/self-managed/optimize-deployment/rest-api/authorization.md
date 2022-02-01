---
id: authorization
title: "Authorization"
---

Most requests of the Public REST API need to include an authorization token 
either as an [`Authorization`](https://tools.ietf.org/html/rfc7235#section-4.2) request header or as a URI Query Parameter named `access_token`.

Given a valid token `mySecret` the header would need to be set in one of the following ways:
```
Authorization: mySecret
```
```
Authorization: Bearer mySecret
```
For sending the token as a query parameter the HTTP Query would look like the following:
```
DELETE /api/public/dashboard/{dashboard-ID}?access_token=mySecret
```

The token to be used to access the Optimize API is a configurable shared secret.
Please refer to [Public API Configuration](../../setup/configuration/#public-api) 
for the particular configuration key to set this token.

The following is an example configuration with a token value of `mySecret`:

      api:
        accessToken: mySecret