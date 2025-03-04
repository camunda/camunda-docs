---
id: authentication
title: "Authentication"
sidebar_label: "Authentication"
description: "Authenticating the Java client."
keywords: ["authentication", "username", "password", "basic", "oauth", "x509"]
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

There are different ways to authenticate to your cluster. The following sections describe how to authenticate using the Java client.

<Tabs groupId="authenticationMethods" defaultValue="basic" queryString values={[{label: 'Basic', value: 'basic' },{label: 'OIDC', value: 'oidc' },{label: 'X.509', value: 'x509' }]}>

<TabItem value="basic">

In Java code, create a `BasicAuthCredentialsProvider` and provide it with your username and password:

```java
final var credentialsProvider =
  new BasicAuthCredentialsProviderBuilder()
    .username(username)
    .password(password)
    .build();
```

Next, provide the credentials provider to the client builder:

```java
final var client = CamundaClient.newClientBuilder()
   // other configuration
  .credentialsProvider(credentialsProvider)
  .build();
```

The client will now add an `Authorization` header to each request with the value `Basic username:password`. `username:password`
is base64 encoded.

</TabItem>

<TabItem value="oidc">

In Java code, create an `OAuthCredentialsProvider` and provide it with the connection properties:

```java
private static final String audience = "[Zeebe Token Audience, e.g., zeebe.camunda.io]";
private static final String clientId = "[Client ID, e.g., FmT7K8gVv_FcwiUhc8U-fAJ9wph0Kn~P]";
private static final String clientSecret = "[Client Secret]";
private static final String authorizationServer = "[OAuth API, e.g., https://login.cloud.camunda.io/oauth/token]";

final var credentialsProvider =
  new OAuthCredentialsProviderBuilder()
    .authorizationServerUrl(authorizationServer)
    .audience(audience)
    .clientId(clientId)
    .clientSecret(clientSecret)
    .build();
```

Next, provide the credentials provider to the client builder:

```java
final var client = CamundaClient.newClientBuilder()
   // other configuration
  .credentialsProvider(credentialsProvider)
  .build();
```

The client will now add an `Authorization` header to each request with the value `Bearer <token>`. The token is obtained by making a request to the authorization server.

Note that the token is cached to not make unnecessary requests to the authorization server. The token is lazily refreshed once expired.

</TabItem>

<TabItem value="x509">

Several identity providers, such as Keycloak, support client X.509 authorizers as an alternative to client credentials flow.

As a prerequisite, ensure you have proper KeyStore and TrustStore configured, so that:

- Both the Spring Camunda application and identity provider share the same CA trust certificates.
- Both the Spring Camunda and identity provider own certificates signed by trusted CA.
- Your Spring Camunda application own certificate has proper `Distinguished Name` (DN), e.g.
  `CN=My Camunda Client, OU=Camunda Users, O=Best Company, C=DE`.
- Your application DN registered in the identity provider client authorization details.

In that case, an example `OAuthCredentialsProvider` configuration might look like:

```java
private static final String audience = "[Zeebe Token Audience, e.g., zeebe.camunda.io]";
private static final String clientId = "[Client ID, e.g., FmT7K8gVv_FcwiUhc8U-fAJ9wph0Kn~P]";
private static final String clientSecret = "[Client Secret]";
private static final String authorizationServer = "[OAuth API, e.g., https://login.cloud.camunda.io/oauth/token]";
private static final Path keystorePath = Paths.get("/path/to/keystore.p12");
private static final String keystorePassword = "password";
private static final String keystoreKeyPassword = "password";
private static final Path truststorePath = Paths.get("/path/to/truststore.jks");
private static final String truststorePassword = "password";

final OAuthCredentialsProvider provider =
  new OAuthCredentialsProviderBuilder()
    .authorizationServerUrl(authorizationServer)
    .audience(audience)
    .clientId(clientId)
    .clientSecret(clientSecret)
    .keystorePath(keystorePath)
    .keystorePassword(keystorePassword)
    .keystoreKeyPassword(keystoreKeyPassword)
    .truststorePath(truststorePath)
    .truststorePassword(truststorePassword)
    .build();
```

</TabItem>
</Tabs>

### Environment Variables

<Tabs groupId="authenticationMethods" className="tabs-hidden" defaultValue="basic" queryString values={[{label: 'Basic', value: 'basic' },{label: 'OIDC', value: 'oidc' },{label: 'X.509', value: 'x509' }]}>

<TabItem value="basic">
You can also use environment variables to provide the username and password. The following environment variables are supported:

```bash
export CAMUNDA_BASIC_AUTH_USERNAME='username'
export CAMUNDA_BASIC_AUTH_PASSWORD='password'
```

When using environment variables you don't have to provide the username and password to the `CredentialsProvider`.

Environment variables will by default override any values provided in Java code. You can enforce that Java code values have precedence via the `.applyEnvironmentOverrides(false)` API on the `BasicAuthCredentialsProviderBuilder`.
</TabItem>

<TabItem value="oidc">
You can also use environment variables to provide the properties. The following environment variables are supported:

```bash
export CAMUNDA_AUTHORIZATION_SERVER_URL='[OAuth API, e.g., https://login.cloud.camunda.io/oauth/token]'
export CAMUNDA_TOKEN_AUDIENCE='[Zeebe Token Audience, e.g., zeebe.camunda.io]'
export CAMUNDA_CLIENT_ID='[Client ID, e.g., FmT7K8gVv_FcwiUhc8U-fAJ9wph0Kn~P]'
export CAMUNDA_CLIENT_SECRET='[Client Secret]'
```

When using environment variables you don't have to provide the username and password to the `CredentialsProvider`.

Environment variables will by default override any values provided in Java code. You can enforce that Java code values have precedence via the `.applyEnvironmentOverrides(false)` API on the `OAuthCredentialsProviderBuilder`.
</TabItem>

<TabItem value="x509">

You can also use environment variables to provide the properties. The following environment variables are supported:

```bash
export CAMUNDA_CLIENT_ID='[Client ID]'
export CAMUNDA_CLIENT_SECRET='[Client Secret]'
export CAMUNDA_AUTHORIZATION_SERVER_URL='[OAuth API]'
export CAMUNDA_SSL_CLIENT_KEYSTORE_PATH='[Keystore path]'
export CAMUNDA_SSL_CLIENT_KEYSTORE_SECRET='[Keystore password]'
export CAMUNDA_SSL_CLIENT_KEYSTORE_KEY_SECRET='[Keystore material password]'
export CAMUNDA_SSL_CLIENT_TRUSTSTORE_PATH='[Truststore path]'
export CAMUNDA_SSL_CLIENT_TRUSTSTORE_SECRET='[Truststore password]'
```

Refer to your identity provider documentation on how to configure X.509 authentication. For example, [Keycloak](https://www.keycloak.org/server/mutual-tls).

</TabItem>
</Tabs>
