---
title: Special OIDC configuration cases
sidebar_label: Special OIDC configuration cases
description: In-depth topics for unusual OIDC configuration cases.
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

This page provides guidance for unusual OIDC configuration cases.

## Using separate OIDC provider URIs for browser and backend

During the various OIDC and OAuth flows, both the Orchestration Cluster backend as well as the user’s browser need to interact with the OIDC provider. For example, during the [OIDC authorization code flow](https://auth0.com/docs/get-started/authentication-and-authorization-flow/authorization-code-flow), the user’s browser is redirected to the OIDC provider to prompt the user to log in. Once the user has consented to grant the application access, the Orchestration Cluster backend exchanges the so-called authorization code for an ID/access token pair by making a call to the provider’s token endpoint.

When the OIDC provider is accessible through a stable domain (typically the case for production setups or if your OIDC provider is centrally managed), then both backend and browser can reach the provider using the same URLs. In that situation it is sufficient to configure the [configuration property](../core-settings/configuration/properties.md#oidc-configuration) `camunda.security.authentication.oidc.issuer-uri`. The Orchestration Cluster will request the provider’s well-known endpoint and use the individual URIs from the response (for example the authorization endpoint and the token endpoint).

However, sometimes the user’s browser and the Orchestration Cluster backend need to use different URLs to access the OIDC provider. For example, this can be the case in a Docker Compose development environment in which the OIDC provider runs as a Docker container. The Orchestration Cluster backend will use a domain name that is only valid within the Docker network. In contrast, the user’s browser needs to call localhost at a port that was mapped out of the container. To make such a scenario work, you need to omit the property `camunda.security.authentication.oidc.issuer-uri` and instead configure the individual URIs separately. For example:

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
