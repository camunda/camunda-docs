---
id: client-authorization
title: "Client authorization"
description: "Learn how the Zeebe Gateway supports Camunda Identity-based auth token validation."
---

The Zeebe Gateway supports [Camunda Identity](../../identity/what-is-identity.md)-based auth token validation.
In the Camunda Platform 8 Self-Managed Helm chart, the authentication is enabled by default via Camunda Identity like for all other applications.

### Camunda Identity authorization

[Camunda Identity](../../identity/what-is-identity.md)-based OAuth token validation can be enabled by setting `security.authentication.mode` to `identity` and providing the corresponding `security.authentication.identity.*` properties. You can find more details about these in the [Gateway config documentation](../configuration/gateway.md#zeebegatewayclustersecurityauthenticationidentity).

In the Camunda Platform 8 Self-Managed Helm chart it is already fully preconfigured by default.

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

With authentication enabled, every gRPC request to the Gateway requires a valid auth token in the `Authorization` header, granting access to the configured `security.authentication.identity.audience`, issued by the configured `security.authentication.identity.issuerBackendUrl`. The `zeebe-api` audience is already pre-configured in Camunda Identity.

The authentication could be disabled by setting `security.authentication.mode: none` in the Gateway configuration file or via `ZEEBE_GATEWAY_SECURITY_AUTHENTICATION_MODE=none` as environment variable.

## Client

Zeebe clients also provide a way for users to modify gRPC call headers, namely to contain access tokens.

Users can modify gRPC headers using Zeebe's built-in `OAuthCredentialsProvider`, which uses user-specified credentials to contact an OAuth authorization server. The authorization server should return an access token that is then appended to each gRPC request.

Although, by default `OAuthCredentialsProvider` is configured with to use a Camunda Platform 8 authorization server, it can be configured to use any user-defined server. Users can also write a custom [CredentialsProvider](https://github.com/camunda-cloud/zeebe/blob/develop/clients/java/src/main/java/io/camunda/zeebe/client/CredentialsProvider.java). In the following sections, we'll describe the usage of the default `OAuthCredentialsProvider` as well as the `CredentialsProvider` interface that can be extended for implementing a custom provider.

### OAuthCredentialsProvider

The `OAuthCredentialsProvider` requires the specification of a client ID and a client secret. These are then used to request an access token from an OAuth 2.0 authorization server through a [client credentials flow](https://tools.ietf.org/html/rfc6749#section-4.4).

By default, the authorization server is the one used by Camunda Platform 8, but any other can be used. Using the access token returned by the authorization server, the `OAuthCredentialsProvider` adds it to the gRPC headers of each request as a bearer token. Requests which fail with an `UNAUTHENTICATED` gRPC code are seamlessly retried only if a new access token can be obtained.

#### Java

To use the Zeebe client with Camunda Platform 8, first an `OAuthCredentialsProvider` must be created and configured with the appropriate client credentials. The `audience` should be equivalent to the cluster endpoint without a port number.

```java
public class AuthorizedClient {
    public void main(String[] args) {
        final OAuthCredentialsProvider provider =
          new OAuthCredentialsProviderBuilder()
              .clientId("clientId")
              .clientSecret("clientSecret")
              .audience("cluster.endpoint.com")
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

For security reasons, client secrets should not be hard coded. Therefore, it's recommended to use environment variables to pass client secrets into Zeebe. Although several variables are supported, the ones required to set up a minimal client are `ZEEBE_CLIENT_ID` and `ZEEBE_CLIENT_SECRET`. After setting these variables to the correct values, the following would be equivalent to the previous code:

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
Zeebe's Java client will not prevent you from adding credentials to gRPC calls while using an insecure connection, but you should be aware that doing so will expose your access token by transmitting it in plaintext.
:::

#### Go

```go
package main

import (
    "context"
    "fmt"
    "github.com/camunda-cloud/zeebe/clients/go/pkg/zbc"
)

func main() {
    credsProvider, err := zbc.NewOAuthCredentialsProvider(&zbc.OAuthProviderConfig{
        ClientID:     "clientId",
        ClientSecret: "clientSecret",
        Audience:     "cluster.endpoint.com",
    })
    if err != nil {
        panic(err)
    }

    client, err := zbc.NewClient(&zbc.ClientConfig{
        GatewayAddress:      "cluster.endpoint.com:443",
        CredentialsProvider: credsProvider,
    })
    if err != nil {
        panic(err)
    }


    ctx := context.Background()
    response, err := client.NewTopologyCommand().Send(ctx)
    if err != nil {
        panic(err)
    }

    fmt.Println(response.String())
}
```

As was the case with the Java client, it's possible to make use of the `ZEEBE_CLIENT_ID` and `ZEEBE_CLIENT_SECRET` environment variables to simplify the client configuration:

```go
package main

import (
    "context"
    "fmt"
    "github.com/camunda-cloud/zeebe/clients/go/pkg/zbc"
)

func main() {
    client, err := zbc.NewClient(&zbc.ClientConfig{
        GatewayAddress: "cluster.endpoint.com:443",
    })
    if err != nil {
        panic(err)
    }

    ctx := context.Background()
    response, err := client.NewTopologyCommand().Send(ctx)
    if err != nil {
        panic(err)
    }

    fmt.Println(response.String())
}
```

:::note
Like the Java client, the Go client will not prevent you from adding credentials to gRPC calls while using an insecure connection, but doing so will expose your access token.
:::

#### Environment variables

Since there are several environment variables that can be used to configure an `OAuthCredentialsProvider`, we list them here along with their uses:

- `ZEEBE_CLIENT_ID` - The client ID used to request an access token from the authorization server
- `ZEEBE_CLIENT_SECRET` - The client secret used to request an access token from the authorization server
- `ZEEBE_TOKEN_AUDIENCE` - The audience for which the token should be valid
- `ZEEBE_AUTHORIZATION_SERVER_URL` - The URL of the authorization server from which the access token will be requested (by default, configured for Camunda Platform 8)
- `ZEEBE_CLIENT_CONFIG_PATH` - The path to a cache file where the access tokens will be stored (by default, it's `$HOME/.camunda/credentials`)

### Custom Credentials provider

As previously mentioned, the `CredentialProvider`'s purpose is to modify the gRPC headers with an authorization method so a reverse proxy sitting in front of the gateway can validate them.

The interface consists of an `applyCredentials` method and a `shouldRetryRequest` method. The first method is called for each gRPC call and takes a map of headers to which it should add credentials. The second method is called whenever a gRPC call fails and takes in the error that caused the failure which is then used to decide if the request should be retried.

The following sections implement custom provider in Java and Go:

#### Java

```java
public class MyCredentialsProvider implements CredentialsProvider {
    /**
     * Adds a token to the Authorization header of a gRPC call.
    */
    @Override
    public void applyCredentials(final Metadata headers) {
      final Key<String> authHeaderkey = Key.of("Authorization", Metadata.ASCII_STRING_MARSHALLER);
      headers.put(authHeaderKey, "Bearer someToken");
    }

    /**
    * Retries request if it failed with a timeout.
    */
    @Override
    public boolean shouldRetryRequest(final Throwable throwable) {
      return ((StatusRuntimeException) throwable).getStatus() == Status.DEADLINE_EXCEEDED;
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

#### Go

```go
package main

import (
    "context"
    "fmt"
    "google.golang.org/grpc/status"
    "google.golang.org/grpc/codes"
    "github.com/camunda-cloud/zeebe/clients/go/pkg/zbc"
)

type MyCredentialsProvider struct {
}

// ApplyCredentials adds a token to the Authorization header of a gRPC call.
func (p *MyCredentialsProvider) ApplyCredentials(ctx context.Context, headers map[string]string) error {
    headers["Authorization"] = "someToken"
    return nil
}

// ShouldRetryRequest returns true if the call failed with a deadline exceed error.
func (p *MyCredentialsProvider) ShouldRetryRequest(ctx context.Context, err error) bool {
    return status.Code(err) == codes.DeadlineExceeded
}

func main() {
    client, err := zbc.NewClient(&zbc.ClientConfig{
    	CredentialsProvider:  &MyCredentialsProvider{},
    })
    if err != nil {
      panic(err)
    }

    ctx := context.Background()
    response, err := client.NewTopologyCommand().Send(ctx)
    if err != nil {
      panic(err)
    }

    fmt.Println(response.String())
}
```
