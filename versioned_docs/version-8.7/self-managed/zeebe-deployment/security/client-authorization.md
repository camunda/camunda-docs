---
id: client-authorization
title: "Client authorization"
description: "Learn how the Zeebe Gateway supports Camunda Identity-based auth token validation."
---

The Zeebe Gateway supports [Camunda Identity](../../identity/what-is-identity.md)-based auth token validation.

In the Camunda 8 Self-Managed Helm chart, authentication is enabled by default via Camunda Identity.

### Camunda Identity authorization

[Camunda Identity](../../identity/what-is-identity.md)-based OAuth token validation can be enabled by setting `security.authentication.mode` to `identity` and providing the corresponding `camunda.identity.*` properties. You can find more details about these in the [Camunda Identity documentation](../../identity/deployment/configuration-variables.md#core-configuration).

The Camunda 8 Self-Managed Helm chart is already fully preconfigured by default.

#### YAML snippet

```yaml
security:
  authentication:
    mode: identity
    identity:
      issuerBackendUrl: http://keycloak:8080/auth/realms/camunda-platform
      audience: zeebe-api
      type: keycloak
```

With authentication enabled, every request to the Gateway requires a valid auth token in the `Authorization` header, granting access to the configured `security.authentication.identity.audience`, issued by the configured `security.authentication.identity.issuerBackendUrl`. The `zeebe-api` audience is already pre-configured in Camunda Identity.

The authentication could be disabled by setting `security.authentication.mode: none` in the Gateway configuration file or via `ZEEBE_GATEWAY_SECURITY_AUTHENTICATION_MODE=none` as environment variable.

## Client

Zeebe clients also provide a way for users to modify request headers, namely to contain access tokens.

Users can modify request headers using Zeebe's built-in `OAuthCredentialsProvider`, which uses user-specified credentials to contact an OAuth authorization server. The authorization server should return an access token that is then appended to each request.

Although, by default `OAuthCredentialsProvider` is configured with to use a Camunda 8 authorization server, it can be configured to use any user-defined server. Users can also write a custom [CredentialsProvider](https://github.com/camunda/camunda/blob/main/clients/java/src/main/java/io/camunda/zeebe/client/CredentialsProvider.java). In the following sections, we'll describe the usage of the default `OAuthCredentialsProvider` as well as the `CredentialsProvider` interface that can be extended for implementing a custom provider.

### OAuthCredentialsProvider

The `OAuthCredentialsProvider` requires the specification of a client ID and a client secret. These are then used to request an access token from an OAuth 2.0 authorization server through a [client credentials flow](https://tools.ietf.org/html/rfc6749#section-4.4).

By default, the authorization server is the one used by Camunda 8, but any other can be used. Using the access token returned by the authorization server, the `OAuthCredentialsProvider` adds it to the gRPC headers of each request as a bearer token. Requests which fail with due to authentication errors (i.e. HTTP 401 or `UNAUTHENTICATED` gRPC code) are seamlessly retried only if a new access token can be obtained.

#### Java

To use the Zeebe client with Camunda 8, first an `OAuthCredentialsProvider` must be created and configured with the appropriate client credentials. The `audience` should be equivalent to the cluster endpoint without a port number.

```java
public class AuthorizedClient {
    public void main(String[] args) {
        final OAuthCredentialsProvider provider =
          new OAuthCredentialsProviderBuilder()
              .clientId("clientId")
              .clientSecret("clientSecret")
              .audience("cluster.endpoint.com")
              // optional
              .scope("scope")
              .build();

        final ZeebeClient client =
            new ZeebeClientBuilderImpl()
                .gatewayAddress("cluster.endpoint.com:443")
                .credentialsProvider(provider)
                .build();

        System.out.println(client.newTopologyRequest().send().join().toString());
    }
}
```

For security reasons, client secrets should not be hard coded. Therefore, it's recommended to use environment variables to pass client secrets into Zeebe. See [`ZEEBE_*` environment variables](#environment-variables) for the supported variable names. After setting the environment variables corresponding to the properties set on `OAuthCredentialsProviderBuilder` to the correct values, the following would be equivalent to the previous code:

```java
public class AuthorizedClient {
    public void main(final String[] args) {
        final ZeebeClient client =
            new ZeebeClientBuilderImpl()
                .gatewayAddress("cluster.endpoint.com:443")
                .build();

        System.out.println(client.newTopologyRequest().send().join().toString());
    }
}
```

The client creates an `OAuthCredentialProvider` with the credentials specified through the environment variables and the audience is extracted from the address specified through the `ZeebeClientBuilder`.

:::note
Zeebe's Java client will not prevent you from adding credentials to requests while using an insecure connection, but you should be aware that doing so will expose your access token by transmitting it in plaintext.
:::

#### Environment variables

Since there are several environment variables that can be used to configure an `OAuthCredentialsProvider`, we list them here along with their uses:

- `ZEEBE_CLIENT_ID` - The client ID used to request an access token from the authorization server.
- `ZEEBE_CLIENT_SECRET` - The client secret used to request an access token from the authorization server.
- `ZEEBE_TOKEN_AUDIENCE` - The audience for which the token should be valid.
- `ZEEBE_TOKEN_SCOPE` - The [OAuth scope](https://oauth.net/2/scope/) which can be set optionally, not sent if left unset.
- `ZEEBE_AUTHORIZATION_SERVER_URL` - The URL of the authorization server from which the access token will be requested (by default, configured for Camunda 8).
- `ZEEBE_CLIENT_CONFIG_PATH` - The path to a cache file where the access tokens will be stored (by default, it's `$HOME/.camunda/credentials`).

### Custom Credentials provider

As previously mentioned, the `CredentialProvider`'s purpose is to modify the HTTP headers with an authorization method.

The interface consists of an `applyCredentials(CredentialsApplier)` method and a `shouldRetryRequest(StatusCode)` method.

- `applyCredentials(CredentialsApplier)`: Called on every request (both REST and gRPC). The applier lets you add any headers to the request before it's sent.
- `shouldRetryRequest(StatusCode)`: Called every time a request completed with a non-successful status code. The `StatusCode` argument lets you inspect the raw HTTP or gRPC code, and provides a convenient method to check the request had wrong credentials (`StatusCode#isUnauthorized`).

The following sections implement custom provider in Java:

#### Java

```java
public class MyCredentialsProvider implements CredentialsProvider {
    /**
     * Logs in as demo:demo
     */
    @Override
    public void applyCredentials(final CredentialsApplier applier) {
      applier.put("Authorization", "Basic ZGVtbzpkZW1vCg==");
    }

    @Override
    public boolean shouldRetryRequest(final StatusCode status) {
      return status.isUnauthorized();
    }
}
```

After implementing the `CredentialsProvider`, we can provide it when building a client:

```java
public class SecureClient {
    public static void main(final String[] args) {
      final ZeebeClient client = ZeebeClient.newClientBuilder().credentialsProvider(new MyCredentialsProvider()).build();

      // continue...
    }
}
```
