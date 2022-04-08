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

The token used to access the Optimize API can be a configurable shared secret (except in Camunda Platform 8 SaaS mode) or a JWT compliant with the OAuth2 Protocol (all modes).

Refer to [Public API Configuration](../../setup/configuration/#public-api) for the particular configuration to access the public API using a token.
