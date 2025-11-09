---
title: Special OIDC configuration cases
sidebar_label: Special OIDC configuration cases
description: Learn how to configure OIDC for advanced or unusual scenarios.
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

This page provides guidance for less common OIDC configuration scenarios.

## Using separate OIDC provider URIs for browser and backend

In some cases, the Orchestration Cluster backend and the user’s browser may need to communicate with the OIDC provider using different URLs.

For example, during the [OIDC authorization code flow](https://auth0.com/docs/get-started/authentication-and-authorization-flow/authorization-code-flow):

- The browser is redirected to the OIDC provider for login.
- Once the user grants consent, the Orchestration Cluster backend exchanges the authorization code for an ID/access token by calling the provider’s token endpoint.

In most environments—such as production or centrally managed OIDC providers—both backend and browser can use the same URL. In that case, configure only the [OIDC issuer property](../core-settings/configuration/properties.md#camundasecurityauthenticationoidc) `camunda.security.authentication.oidc.issuer-uri`.  
The Orchestration Cluster will then request the provider’s well-known endpoint and resolve the required URIs (e.g., authorization and token endpoints).

However, in some development environments (for example, Docker Compose), the backend and browser may need different URLs:

- The Orchestration Cluster backend might access the OIDC provider through a domain name valid only inside the Docker network.
- The browser may need to use `localhost` with a mapped port.

In these cases, omit the `camunda.security.authentication.oidc.issuer-uri` property and configure the endpoints explicitly.

<Tabs groupId="optionsType" defaultValue="env" queryString values={[{label: 'Application.yaml', value: 'yaml' }, {label: 'Environment variables', value: 'env' }]}>
<TabItem value="yaml">

```yaml
camunda.security:
  authentication:
    oidc:
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

The exact property values depend on your OIDC provider and environment.

## Using the Bearer JWT client authentication method (_private key JWT_)

In environments where extra security is required, the Orchestration Cluster backend can be configured to use the Bearer JWT client authentication method (_private key JWT_) instead of the standard _client id_ and _client secret_ (_client secret basic_) method.
With this method the client secret will not be used as a credential, rather a client assertion JWT will be built and signed by the client's certificate.
To learn more about the private key JWT authentication method, please refer to the [OAuth 2.0 Private Key JWT page](https://oauth.net/private-key-jwt/).

The OIDC client credentials flow will work as expected, only the client credentials used to authenticate with the IdP will change.
Refer to your IdP documentation for setting up private key JWT. For example, here is the [Keycloak documentation page](https://www.keycloak.org/securing-apps/authz-client#_client_authentication_with_signed_jwt).

This is the minimal needed configuration of client credentials when using the _private key JWT_ method. Please note the absence of `clientSecret`.

```yaml
camunda:
  security:
    authentication:
      oidc:
        clientId: <YOUR_CLIENTID>
        clientAuthenticationMethod: private_key_jwt
        assertion:
          keystore:
            path: <YOUR_KEYSTORE_LOCATION>
            password: <YOUR_KEYSTORE_LOCATION>
            keyAlias: <YOUR_PRIVATE_KEY_ALIAS>
            keyPassword: <YOUR_PRIVATE_KEY_PASSWORD>
```

A comprehensive list of possible configuration properties can be found at [the oidc configuration reference](/self-managed/components/orchestration-cluster/core-settings/configuration/properties.md#camundasecurityauthenticationoidc).
