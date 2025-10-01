---
title: Special OIDC configuration cases
sidebar_label: Special OIDC configuration cases
description: Learn how to configure OIDC for advanced or unusual scenarios.
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

This page provides guidance for less common OIDC configuration scenarios.

## Using separate OIDC provider URIs for browser and backend

In some cases, both the Orchestration Cluster backend and the user’s browser need to communicate with the OIDC provider using different URLs.

For example, during the [OIDC authorization code flow](https://auth0.com/docs/get-started/authentication-and-authorization-flow/authorization-code-flow), the user’s browser is redirected to the OIDC provider to prompt for login. Once the user grants consent, the Orchestration Cluster backend exchanges the authorization code for an ID/access token pair by calling the provider’s token endpoint.

In typical setups—such as production environments or centrally managed OIDC providers—both the backend and browser can use the same URL. In these cases, you only need to configure the [OIDC issuer property](../core-settings/configuration/properties.md#oidc-configuration) `camunda.security.authentication.oidc.issuer-uri`. The Orchestration Cluster will then request the provider’s well-known endpoint and resolve the required URIs (for example, the authorization and token endpoints).

However, in some environments (for example, Docker Compose development), the backend and browser may need different URLs.

- The Orchestration Cluster backend might access the OIDC provider using a domain name only valid inside the Docker network.
- The user’s browser may need to use `localhost` with a port mapped from the container.

In these scenarios, omit the `camunda.security.authentication.oidc.issuer-uri` property and configure the individual endpoints explicitly instead. For example:

<Tabs groupId="optionsType" defaultValue="env" queryString values={[{label: 'Application.yaml', value: 'yaml' }, {label: 'Environment variables', value: 'env' }]}>
<TabItem value="yaml">

```yaml
camunda.security:
  authentication:
    oidc:
      ...
      authorization-uri: http://localhost:18080/protocol/openid-connect/auth
      token-uri: http://<Docker network domain name>:18080/protocol/openid-connect/token
      jwk-set-uri: http://<Docker network domain name>:18080/protocol/openid-connect/certs
```

</TabItem>
<TabItem value="env">
```
CAMUNDA_SECURITY_AUTHENTICATION_OIDC_AUTHORIZATIONURI=http://localhost:18080/protocol/openid-connect/auth
CAMUNDA_SECURITY_AUTHENTICATION_OIDC_TOKENURI=http://<Docker network domain name>:18080/protocol/openid-connect/token
CAMUNDA_SECURITY_AUTHENTICATION_OIDC_JWKSETURI=http://<Docker network domain name>:18080/protocol/openid-connect/certs
```
</TabItem>
</Tabs>

The exact property values you need to use depend on your OIDC provider.
