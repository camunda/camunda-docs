---
id: authorization
title: "Authorization"
---

Most requests of the Public REST API need to include an authorization token 
as an [`Authorization`](https://tools.ietf.org/html/rfc7235#section-4.2) request header.

Given a valid token `mySecret`, the header would need to be set as follows:

```
Authorization: Bearer mySecret
```

The token to be used to access the Optimize API can be a configurable shared secret (except in Cloud SaaS mode) or a JWT Token compliant with the OAuth2 Protocol (all modes).

Please refer to [Public API Configuration](../../setup/configuration/#public-api) 
for the particular configuration to be able to access the public API using a token.
        