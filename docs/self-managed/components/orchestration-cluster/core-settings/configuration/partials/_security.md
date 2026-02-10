import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Security

<Tabs>
<TabItem value="conf" label="Application properties" default>

### `camunda.security`

| Property                                 | Description                                                                                         | Default value         |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------- | --------------------- |
| `camunda.security.id-validation-pattern` | A Java regular expression that validates the user-defined identifiers of Identity-related entities. | `^[a-zA-Z0-9_@.+-]+$` |

### `camunda.security.authentication`

| Property                                                          | Description                                                                                                                                                                                                                                                                                                              | Default value |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| `camunda.security.authentication.authentication-refresh-interval` | The interval at which the memberships (groups, roles, tenants, component authorizations) are refreshed for logged in users. Find more details in [webserver and security](/self-managed/components/orchestration-cluster/core-settings/configuration/webserver.md#propagation-of-membership-changes-to-active-sessions). | `PT30S`       |
| `camunda.security.authorizations.enabled`                         | If authorizations are enabled.                                                                                                                                                                                                                                                                                           | `true`        |
| `camunda.security.authentication.method`                          | The authentication method to use. Options: `basic`, `oidc`.                                                                                                                                                                                                                                                              | `basic`       |
| `camunda.security.authentication.unprotected-api`                 | If the API can be used without authentication.                                                                                                                                                                                                                                                                           | `false`       |

### `camunda.security.csrf`

| Property                        | Description                                                                                                                                                                                   | Default value |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `camunda.security.csrf.enabled` | Enables or disables CSRF protection. Disabling CSRF protection is not recommended for production environments as it leaves your application vulnerable to cross-site request forgery attacks. | `true`        |

### `camunda.security.http-headers`

| Property                                                                  | Description                                                                                                                                                      | Related Header                                                                                                                                                                                                                                           | Default value                     |
| ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| `camunda.security.http-headers.cache-control.enabled`                     | Enables or disables cache prevention headers. Default values: `Cache-Control: no-cache, no-store, max-age=0, must-revalidate`, `Pragma: no-cache`, `Expires: 0`. | [`Cache-Control`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control), [`Pragma`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Pragma), [`Expires`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Expires) | `true`                            |
| `camunda.security.http-headers.content-security-policy.enabled`           | Enables or disables CSP headers.                                                                                                                                 | [`Content-Security-Policy`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy)                                                                                                                                           | `true`                            |
| `camunda.security.http-headers.content-security-policy.policy-directives` | Custom CSP directives. If not set, [default values applied](#default-content-security-policy). If set, overrides default CSP policies.                           | [`Content-Security-Policy`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy)                                                                                                                                           |                                   |
| `camunda.security.http-headers.content-security-policy.report-only`       | Enables reporting mode without enforcing policies.                                                                                                               | [`Content-Security-Policy-Report-Only`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy-Report-Only)                                                                                                                   | `false`                           |
| `camunda.security.http-headers.content-type-options.enabled`              | Enables or disables `X-Content-Type-Options` header with `nosniff` value.                                                                                        | [`X-Content-Type-Options`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options)                                                                                                                                             | `true`                            |
| `camunda.security.http-headers.cross-origin-embedder-policy.value`        | Restricts embedded cross-origin resources. Options: `REQUIRE_CORP`, `UNSAFE_NONE`.                                                                               | [`Cross-Origin-Embedder-Policy`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Embedder-Policy)                                                                                                                                 | `UNSAFE_NONE`                     |
| `camunda.security.http-headers.cross-origin-opener-policy.value`          | Isolates windows from cross-origin openers. Options: `UNSAFE_NONE`, `SAME_ORIGIN_ALLOW_POPUPS`, `SAME_ORIGIN`.                                                   | [`Cross-Origin-Opener-Policy`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Opener-Policy)                                                                                                                                     | `SAME_ORIGIN_ALLOW_POPUPS`        |
| `camunda.security.http-headers.cross-origin-resource-policy.value`        | Declares whether resources can be loaded cross-origin. Options: `SAME_ORIGIN`, `SAME_SITE`, `CROSS_ORIGIN`.                                                      | [`Cross-Origin-Resource-Policy`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Resource-Policy)                                                                                                                                 | `SAME_SITE`                       |
| `camunda.security.http-headers.frame-options.enabled`                     | Enables or disables `X-Frame-Options` header. Default value is `SAMEORIGIN`.                                                                                     | [`X-Frame-Options`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options)                                                                                                                                                           | `true`                            |
| `camunda.security.http-headers.frame-options.mode`                        | Frame options mode. Options: `DENY`, `SAMEORIGIN`.                                                                                                               | [`X-Frame-Options`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options)                                                                                                                                                           | `SAMEORIGIN`                      |
| `camunda.security.http-headers.hsts.enabled`                              | Enables or disables `Strict-Transport-Security` header.                                                                                                          | [`Strict-Transport-Security`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security)                                                                                                                                       | `true`                            |
| `camunda.security.http-headers.hsts.include-subdomains`                   | Applies HSTS to all subdomains.                                                                                                                                  | [`Strict-Transport-Security`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security)                                                                                                                                       | `false`                           |
| `camunda.security.http-headers.hsts.max-age-in-seconds`                   | HSTS max age in seconds.                                                                                                                                         | [`Strict-Transport-Security`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security)                                                                                                                                       | `31536000`                        |
| `camunda.security.http-headers.hsts.preload`                              | Enables HSTS preloading.                                                                                                                                         | [`Strict-Transport-Security`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security)                                                                                                                                       | `false`                           |
| `camunda.security.http-headers.permissions-policy.value`                  | Restricts access to browser capabilities.                                                                                                                        | [`Permissions-Policy`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy)                                                                                                                                                     | Disables all features by default  |
| `camunda.security.http-headers.referrer-policy.value`                     | Controls referrer information sharing. See available values below.                                                                                               | [`Referrer-Policy`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy)                                                                                                                                                           | `STRICT_ORIGIN_WHEN_CROSS_ORIGIN` |

#### Default Content Security Policy

This is default value of the Content Security Policy when enabled:

```
default-src 'self';
base-uri 'self';
script-src 'self' https: *.chargebee.com *.mixpanel.com ajax.cloudflare.com static.cloudflareinsights.com;
script-src-elem 'self' cdn.jsdelivr.net ;
connect-src 'self' https: *.mixpanel.com cloudflareinsights.com *.appcues.net wss://api.appcues.net cdn.jsdelivr.net;
style-src 'self' https: 'unsafe-inline' cdn.jsdelivr.net *.googleapis.com *.chargebee.com;
img-src data: 'self';
form-action 'self';
frame-ancestors 'self';
frame-src 'self' https: *.chargebee.com blob: ;
object-src 'self' blob:;
font-src 'self' data: fonts.camunda.io cdn.jsdelivr.net;
worker-src 'self' blob:;
child-src;
script-src-attr 'none'.
```

### `camunda.security.authentication.oidc`

| Property                                                            | Description                                                                                                                                                                                                                                                                                                                                                                     | Default value                        |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `camunda.security.authentication.oidc.client-id`                    | The client ID for OIDC authentication.                                                                                                                                                                                                                                                                                                                                          |                                      |
| `camunda.security.authentication.oidc.client-secret`                | The client secret for OIDC authentication. Only takes effect if `camunda.security.authentication.oidc.client-authentication-method` is set to `client_secret_basic` or left default.                                                                                                                                                                                            |                                      |
| `camunda.security.authentication.oidc.issuer-uri`                   | The issuer URI for OIDC authentication. If set, the individual endpoints of your OIDC provider will be fetched from its [well-known configuration endpoint](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderConfig). In this case, any individually configured token, authorization, and JWKS URIs do not take effect.                                       |                                      |
| `camunda.security.authentication.oidc.redirect-uri`                 | The URI for redirects from the OIDC provider to the Orchestration Cluster after user login.                                                                                                                                                                                                                                                                                     | `http://localhost:8080/sso-callback` |
| `camunda.security.authentication.oidc.username-claim`               | The JWT claim that identifies a user. Extracted from a token, this claim value becomes the user's username. This setting is evaluated on any token-based access, regardless of the underlying OIDC/OAuth flow.                                                                                                                                                                   | `sub`                                |
| `camunda.security.authentication.oidc.groups-claim`                 | The JWT claim that contains a user's or client's groups. Expects an array of String values. If not set, groups can be managed in the Orchestration Cluster through its REST APIs.                                                                                                                                                                                               |                                      |
| `camunda.security.authentication.oidc.client-id-claim`              | The JWT claim that identifies a client. Extracted from a token, this claim value becomes the client ID. This setting is evaluated on any token-based access, regardless of the underlying OIDC/OAuth flow.                                                                                                                                                                       |                                      |
| `camunda.security.authentication.oidc.prefer-username-claim`        | Determines if a token that contains both, the configured username claim and the configured client id claim, is treated as a user or a client. If set to true, it is treated as a user. If set to false, it is treated as a client.                                                                                                                                              | `false`                              |
| `camunda.security.authentication.oidc.audiences`                    | Comma-separated list of audiences to validate in the OIDC token.                                                                                                                                                                                                                                                                                                                |                                      |
| `camunda.security.authentication.oidc.scope`                        | Comma-separated list of scopes to request in the OIDC token.                                                                                                                                                                                                                                                                                                                    | `openid, profile`                    |
| `camunda.security.authentication.oidc.jwk-set-uri`                  | Sets the OIDC provider's JWK Set URI explicitly. Only takes effect if `camunda.security.authentication.oidc.issuer-uri` is not set.                                                                                                                                                                                                                                             |                                      |
| `camunda.security.authentication.oidc.authorization-uri`            | Sets the OIDC provider's authorization URI explicitly. Only takes effect if `camunda.security.authentication.oidc.issuer-uri` is not set.                                                                                                                                                                                                                                       |                                      |
| `camunda.security.authentication.oidc.token-uri`                    | Sets the OIDC provider's token URI explicitly. Only takes effect if `camunda.security.authentication.oidc.issuer-uri` is not set.                                                                                                                                                                                                                                               |                                      |
| `camunda.security.authentication.oidc.client-authentication-method` | Sets the client authentication method to use. Options: `client_secret_basic`, `private_key_jwt`.                                                                                                                                                                                                                                                                                | `client_secret_basic`                |
| `camunda.security.authentication.oidc.user-info-enabled`            | If enabled, will enrich the access token with information from the `/userinfo` endpoint. [See section 5.3 of the OIDC specification.](https://openid.net/specs/openid-connect-core-1_0.html#UserInfo). Generally safe to leave `true`, but can be safely disabled if you do not need additional claims from this endpoint (e.g. in case you are rate-limited by your provider). | `true`                               |

### `camunda.security.authentication.oidc.assertion`

Configuration options for the client assertion used in Bearer JWT client authentication.

:::note
These properties apply only when `camunda.security.authentication.oidc.client-authentication-method` is set to `private_key_jwt`.
The `key` value refers to the private key ID used to sign the client assertion JWT.
:::

| Property                                                              | Description                                                                | Default value |
| --------------------------------------------------------------------- | -------------------------------------------------------------------------- | ------------- |
| `camunda.security.authentication.oidc.assertion.kid-source`           | Source for generating the key ID. Options: `CERTIFICATE`, `PUBLIC_KEY`.    | `PUBLIC_KEY`  |
| `camunda.security.authentication.oidc.assertion.kid-digest-algorithm` | Hash algorithm used to generate the key ID. Options: `SHA256`, `SHA1`.     | `SHA256`      |
| `camunda.security.authentication.oidc.assertion.kid-encoding`         | Key ID encoding. Options: `BASE64URL`, `HEX`.                              | `BASE64URL`   |
| `camunda.security.authentication.oidc.assertion.kid-case`             | Key ID case. Only applicable to `HEX` encoding. Options: `UPPER`, `LOWER`. |               |

### `camunda.security.authentication.oidc.assertion.keystore`

Configuration of the keystore used to build the client assertion for Bearer JWT client authentication.

:::note
These properties apply only when `camunda.security.authentication.oidc.client-authentication-method` is set to `private_key_jwt`.
:::

| Property                                                               | Description                                                       | Default value |
| ---------------------------------------------------------------------- | ----------------------------------------------------------------- | ------------- |
| `camunda.security.authentication.oidc.assertion.keystore.path`         | Path to the `PKCS12` keystore.                                    |               |
| `camunda.security.authentication.oidc.assertion.keystore.password`     | Keystore password.                                                |               |
| `camunda.security.authentication.oidc.assertion.keystore.key-alias`    | Alias of the private key to be used to sign the client assertion. |               |
| `camunda.security.authentication.oidc.assertion.keystore.key-password` | Password of the private key.                                      |               |

### `camunda.security.initialization.default-roles`

| Property                                                                | Description                                  | Default value |
| ----------------------------------------------------------------------- | -------------------------------------------- | ------------- |
| `camunda.security.initialization.default-roles.<role>.clients.[0]`      | Clients assigned to the `<role>` role.       |               |
| `camunda.security.initialization.default-roles.<role>.groups.[0]`       | Groups assigned to the `<role>` role.        |               |
| `camunda.security.initialization.default-roles.<role>.mappingrules.[0]` | Mapping rules assigned to the `<role>` role. |               |
| `camunda.security.initialization.default-roles.<role>.users.[0]`        | Users assigned to the `<role>` role.         |               |

### `camunda.security.initialization.users`

| Property                                             | Description                          | Default value |
| ---------------------------------------------------- | ------------------------------------ | ------------- |
| `camunda.security.initialization.users.[0].email`    | The email address of the first user. |               |
| `camunda.security.initialization.users.[0].name`     | The name of the first user.          |               |
| `camunda.security.initialization.users.[0].password` | The password of the first user.      |               |
| `camunda.security.initialization.users.[0].username` | The username of the first user.      |               |

### `camunda.security.initialization.mappingrules`

| Property                                                           | Description                                  | Default value |
| ------------------------------------------------------------------ | -------------------------------------------- | ------------- |
| `camunda.security.initialization.mappingrules.[0].claim-name`      | The claim of the first mapping rule.         |               |
| `camunda.security.initialization.mappingrules.[0].claim-value`     | The claim's value of the first mapping rule. |               |
| `camunda.security.initialization.mappingrules.[0].mapping-rule-id` | The id of the first mapping rule.            |               |

### `camunda.security.multi-tenancy`

| Property                                        | Description                                                                   | Default value |
| ----------------------------------------------- | ----------------------------------------------------------------------------- | ------------- |
| `camunda.security.multi-tenancy.api-enabled`    | Enables the multi-tenancy API and UI independently from multi-tenancy checks. | `true`        |
| `camunda.security.multi-tenancy.checks-enabled` | Enables multi-tenancy checks. This requires the API to be protected.          | `false`       |

### `camunda.security.transport-layer-security.cluster`

| Property                                                                         | Description                                                                                                                           | Default value             |
| :------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ | :------------------------ |
| `camunda.security.transport-layer-security.cluster.enabled`                      | <p>Enables TLS authentication for internal cluster (broker-to-broker) communication.</p>                                              | `false`                   |
| `camunda.security.transport-layer-security.cluster.certificate-chain-path`       | <p>Sets the path to the certificate chain file.</p>                                                                                   |                           |
| `camunda.security.transport-layer-security.cluster.certificate-private-key-path` | <p>Sets the path to the private key file location.</p>                                                                                |                           |
| `camunda.security.transport-layer-security.cluster.key-store.file-path`          | <p>Configures the keystore file containing both the certificate chain and the private key. Currently only supports PKCS12 format.</p> | `'./cluster.jks'`         |
| `camunda.security.transport-layer-security.cluster.key-store.password`           | <p>Configures the keystore password.</p>                                                                                              | `${CLUSTER_KEY_STORE_PW}` |

### `camunda.persistent.sessions`

| Property                              | Description                                                                            | Default value |
| ------------------------------------- | -------------------------------------------------------------------------------------- | ------------- |
| `camunda.persistent.sessions.enabled` | Stores session data in secondary storage so users stay logged in across cluster nodes. | `false`       |

### `spring.profiles`

| Property                 | Description                                                                                       | Default value       |
| ------------------------ | ------------------------------------------------------------------------------------------------- | ------------------- |
| `spring.profiles.active` | **Note:** This property will be deprecated as additional authentication methods become available. | `consolidated-auth` |

</TabItem>
<TabItem value="env" label="Environment variables">

### `CAMUNDA_SECURITY`

| Property                               | Description                                                                                         | Default value         |
| -------------------------------------- | --------------------------------------------------------------------------------------------------- | --------------------- |
| `CAMUNDA_SECURITY_IDVALIDATIONPATTERN` | A Java regular expression that validates the user-defined identifiers of Identity-related entities. | `^[a-zA-Z0-9_@.+-]+$` |

### `CAMUNDA_SECURITY_AUTHENTICATION`

| Property                                                        | Description                                                                                                                                                                                                                                                                                                              | Default value |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| `CAMUNDA_SECURITY_AUTHENTICATION_AUTHENTICATIONREFRESHINTERVAL` | The interval at which the memberships (groups, roles, tenants, component authorizations) are refreshed for logged in users. Find more details in [webserver and security](/self-managed/components/orchestration-cluster/core-settings/configuration/webserver.md#propagation-of-membership-changes-to-active-sessions). | `PT30S`       |
| `CAMUNDA_SECURITY_AUTHORIZATIONS_ENABLED`                       | If authorizations are enabled.                                                                                                                                                                                                                                                                                           | `true`        |
| `CAMUNDA_SECURITY_AUTHENTICATION_METHOD`                        | The authentication method to use. Options: `basic`, `oidc`.                                                                                                                                                                                                                                                              | `basic`       |
| `CAMUNDA_SECURITY_AUTHENTICATION_UNPROTECTEDAPI`                | If the API can be used without authentication.                                                                                                                                                                                                                                                                           | `false`       |

### `CAMUNDA_SECURITY_AUTHENTICATION_OIDC`

| Property                                                          | Description                                                                                                                                                                                                                                                                                                                                                                     | Default value                        |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_CLIENTID`                   | The client ID for OIDC authentication.                                                                                                                                                                                                                                                                                                                                          |                                      |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_CLIENTSECRET`               | The client secret for OIDC authentication. Only takes effect if `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_CLIENTAUTHENTICATIONMETHOD` is set to `client_secret_basic` or left default.                                                                                                                                                                                              |                                      |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_ISSUERURI`                  | The issuer URI for OIDC authentication. If set, the individual endpoints of your OIDC provider will be fetched from its [well-known configuration endpoint](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderConfig). In this case, any individually configured token, authorization, and JWKS URIs do not take effect.                                       |                                      |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_REDIRECTURI`                | The URI for redirects from the OIDC provider to the Orchestration Cluster after user login.                                                                                                                                                                                                                                                                                     | `http://localhost:8080/sso-callback` |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_USERNAMECLAIM`              | The JWT claim that identifies a user. Extracted from a token, this claim value becomes the user's username. This setting is evaluated on any token-based access, regardless of the underlying OIDC/OAuth flow.                                                                                                                                                                   | `sub`                                |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_GROUPSCLAIM`                | The JWT claim that contains a user's or client's groups. Expects an array of String values. If not set, groups can be managed in the Orchestration Cluster through its REST APIs.                                                                                                                                                                                               |                                      |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_CLIENTIDCLAIM`              | The JWT claim that identifies a client. Extracted from a token, this claim value becomes the client ID. This setting is evaluated on any token-based access, regardless of the underlying OIDC/OAuth flow.                                                                                                                                                                       |                                      |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_PREFERUSERNAMECLAIM`        | Determines if a token that contains both, the configured username claim and the configured client id claim, is treated as a user or a client. If set to true, it is treated as a user. If set to false, it is treated as a client.                                                                                                                                              | `false`                              |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_AUDIENCES`                  | Comma-separated list of audiences to validate in the OIDC token.                                                                                                                                                                                                                                                                                                                |                                      |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_SCOPE`                      | Comma-separated list of scopes to request in the OIDC token.                                                                                                                                                                                                                                                                                                                    | `openid, profile`                    |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_JWKSETURI`                  | Sets the OIDC provider's JWK Set URI explicitly. Only takes effect if `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_ISSUERURI` is not set.                                                                                                                                                                                                                                              |                                      |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_AUTHORIZATIONURI`           | Sets the OIDC provider's authorization URI explicitly. Only takes effect if `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_ISSUERURI` is not set.                                                                                                                                                                                                                                        |                                      |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_TOKENURI`                   | Sets the OIDC provider's token URI explicitly. Only takes effect if `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_ISSUERURI` is not set.                                                                                                                                                                                                                                                |                                      |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_CLIENTAUTHENTICATIONMETHOD` | Sets the client authentication method to use. Options: `client_secret_basic`, `private_key_jwt`.                                                                                                                                                                                                                                                                                | `client_secret_basic`                |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_USERINFOENABLED`            | If enabled, will enrich the access token with information from the `/userinfo` endpoint. [See section 5.3 of the OIDC specification.](https://openid.net/specs/openid-connect-core-1_0.html#UserInfo). Generally safe to leave `true`, but can be safely disabled if you do not need additional claims from this endpoint (e.g. in case you are rate-limited by your provider). | `true`                               |

### `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_ASSERTION`

Configuration options for the client assertion used in Bearer JWT client authentication.

:::note
These properties apply only when `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_CLIENTAUTHENTICATIONMETHOD` is set to `private_key_jwt`.
The `key` value refers to the private key ID used to sign the client assertion JWT.
:::

| Property                                                            | Description                                                                | Default value |
| ------------------------------------------------------------------- | -------------------------------------------------------------------------- | ------------- |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_ASSERTION_KIDSOURCE`          | Source for generating the key ID. Options: `CERTIFICATE`, `PUBLIC_KEY`.    | `PUBLIC_KEY`  |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_ASSERTION_KIDDIGESTALGORITHM` | Hash algorithm used to generate the key ID. Options: `SHA256`, `SHA1`.     | `SHA256`      |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_ASSERTION_KIDENCODING`        | Key ID encoding. Options: `BASE64URL`, `HEX`.                              | `BASE64URL`   |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_ASSERTION_KIDCASE`            | Key ID case. Only applicable to `HEX` encoding. Options: `UPPER`, `LOWER`. |               |

### `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_ASSERTION_KEYSTORE`

Configuration of the keystore used to build the client assertion for Bearer JWT client authentication.

:::note
These properties apply only when `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_CLIENTAUTHENTICATIONMETHOD` is set to `private_key_jwt`.
:::

| Property                                                              | Description                                                       | Default value |
| --------------------------------------------------------------------- | ----------------------------------------------------------------- | ------------- |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_ASSERTION_KEYSTORE_PATH`        | Path to the `PKCS12` keystore.                                    |               |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_ASSERTION_KEYSTORE_PASSWORD`    | Keystore password.                                                |               |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_ASSERTION_KEYSTORE_KEYALIAS`    | Alias of the private key to be used to sign the client assertion. |               |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_ASSERTION_KEYSTORE_KEYPASSWORD` | Password of the private key.                                      |               |

### `CAMUNDA_SECURITY_CSRF`

| Property                        | Description                                                                                                                                                                                   | Default value |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `CAMUNDA_SECURITY_CSRF_ENABLED` | Enables or disables CSRF protection. Disabling CSRF protection is not recommended for production environments as it leaves your application vulnerable to cross-site request forgery attacks. | `true`        |

### `CAMUNDA_SECURITY_HTTPHEADERS`

| Property                                                              | Description                                                                                                                                                      | Related Header                                                                                                                                                                                                                                           | Default value                     |
| --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| `CAMUNDA_SECURITY_HTTPHEADERS_CACHECONTROL_ENABLED`                   | Enables or disables cache prevention headers. Default values: `Cache-Control: no-cache, no-store, max-age=0, must-revalidate`, `Pragma: no-cache`, `Expires: 0`. | [`Cache-Control`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control), [`Pragma`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Pragma), [`Expires`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Expires) | `true`                            |
| `CAMUNDA_SECURITY_HTTPHEADERS_CONTENTSECURITYPOLICY_ENABLED`          | Enables or disables CSP headers.                                                                                                                                 | [`Content-Security-Policy`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy)                                                                                                                                           | `true`                            |
| `CAMUNDA_SECURITY_HTTPHEADERS_CONTENTSECURITYPOLICY_POLICYDIRECTIVES` | Custom CSP directives. If not set, [default values applied](#default-content-security-policy-1). If set, overrides default CSP policies.                         | [`Content-Security-Policy`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy)                                                                                                                                           |                                   |
| `CAMUNDA_SECURITY_HTTPHEADERS_CONTENTSECURITYPOLICY_REPORTONLY`       | Enables reporting mode without enforcing policies.                                                                                                               | [`Content-Security-Policy-Report-Only`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy-Report-Only)                                                                                                                   | `false`                           |
| `CAMUNDA_SECURITY_HTTPHEADERS_CONTENTTYPEOPTIONS_ENABLED`             | Enables or disables `X-Content-Type-Options` header with `nosniff` value.                                                                                        | [`X-Content-Type-Options`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options)                                                                                                                                             | `true`                            |
| `CAMUNDA_SECURITY_HTTPHEADERS_CROSSORIGINEMBEDDERPOLICY_VALUE`        | Restricts embedded cross-origin resources. Options: `REQUIRE_CORP`, `UNSAFE_NONE`.                                                                               | [`Cross-Origin-Embedder-Policy`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Embedder-Policy)                                                                                                                                 | `UNSAFE_NONE`                     |
| `CAMUNDA_SECURITY_HTTPHEADERS_CROSSORIGINOPENERPOLICY_VALUE`          | Isolates windows from cross-origin openers. Options: `UNSAFE_NONE`, `SAME_ORIGIN_ALLOW_POPUPS`, `SAME_ORIGIN`.                                                   | [`Cross-Origin-Opener-Policy`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Opener-Policy)                                                                                                                                     | `SAME_ORIGIN_ALLOW_POPUPS`        |
| `CAMUNDA_SECURITY_HTTPHEADERS_CROSSORIGINRESOURCEPOLICY_VALUE`        | Declares whether resources can be loaded cross-origin. Options: `SAME_ORIGIN`, `SAME_SITE`, `CROSS_ORIGIN`.                                                      | [`Cross-Origin-Resource-Policy`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Resource-Policy)                                                                                                                                 | `SAME_SITE`                       |
| `CAMUNDA_SECURITY_HTTPHEADERS_FRAMEOPTIONS_ENABLED`                   | Enables or disables `X-Frame-Options` header. Default value is `SAMEORIGIN`.                                                                                     | [`X-Frame-Options`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options)                                                                                                                                                           | `true`                            |
| `CAMUNDA_SECURITY_HTTPHEADERS_FRAMEOPTIONS_MODE`                      | Frame options mode. Options: `DENY`, `SAMEORIGIN`.                                                                                                               | [`X-Frame-Options`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options)                                                                                                                                                           | `SAMEORIGIN`                      |
| `CAMUNDA_SECURITY_HTTPHEADERS_HSTS_ENABLED`                           | Enables or disables `Strict-Transport-Security` header.                                                                                                          | [`Strict-Transport-Security`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security)                                                                                                                                       | `true`                            |
| `CAMUNDA_SECURITY_HTTPHEADERS_HSTS_INCLUDESUBDOMAINS`                 | Applies HSTS to all subdomains.                                                                                                                                  | [`Strict-Transport-Security`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security)                                                                                                                                       | `false`                           |
| `CAMUNDA_SECURITY_HTTPHEADERS_HSTS_MAXAGEINSECONDS`                   | HSTS max age in seconds.                                                                                                                                         | [`Strict-Transport-Security`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security)                                                                                                                                       | `31536000`                        |
| `CAMUNDA_SECURITY_HTTPHEADERS_HSTS_PRELOAD`                           | Enables HSTS preloading.                                                                                                                                         | [`Strict-Transport-Security`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security)                                                                                                                                       | `false`                           |
| `CAMUNDA_SECURITY_HTTPHEADERS_PERMISSIONSPOLICY_VALUE`                | Restricts access to browser capabilities.                                                                                                                        | [`Permissions-Policy`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy)                                                                                                                                                     | Disables all features by default  |
| `CAMUNDA_SECURITY_HTTPHEADERS_REFERRERPOLICY_VALUE`                   | Controls referrer information sharing. See available values below.                                                                                               | [`Referrer-Policy`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy)                                                                                                                                                           | `STRICT_ORIGIN_WHEN_CROSS_ORIGIN` |

#### Default Content Security Policy

This is default value of the Content Security Policy when enabled:

```
default-src 'self';
base-uri 'self';
script-src 'self' https: *.chargebee.com *.mixpanel.com ajax.cloudflare.com static.cloudflareinsights.com;
script-src-elem 'self' cdn.jsdelivr.net ;
connect-src 'self' https: *.mixpanel.com cloudflareinsights.com *.appcues.net wss://api.appcues.net cdn.jsdelivr.net;
style-src 'self' https: 'unsafe-inline' cdn.jsdelivr.net *.googleapis.com *.chargebee.com;
img-src data: 'self';
form-action 'self';
frame-ancestors 'self';
frame-src 'self' https: *.chargebee.com blob: ;
object-src 'self' blob:;
font-src 'self' data: fonts.camunda.io cdn.jsdelivr.net;
worker-src 'self' blob:;
child-src;
script-src-attr 'none'.
```

### `CAMUNDA_SECURITY_INITIALIZATION_DEFAULTROLES`

| Property                                                             | Description                                  | Default value |
| -------------------------------------------------------------------- | -------------------------------------------- | ------------- |
| `CAMUNDA_SECURITY_INITIALIZATION_DEFAULTROLES_<ROLE>_CLIENTS_0`      | Clients assigned to the `<role>` role.       |               |
| `CAMUNDA_SECURITY_INITIALIZATION_DEFAULTROLES_<ROLE>_GROUPS_0`       | Groups assigned to the `<role>` role.        |               |
| `CAMUNDA_SECURITY_INITIALIZATION_DEFAULTROLES_<ROLE>_MAPPINGRULES_0` | Mapping rules assigned to the `<role>` role. |               |
| `CAMUNDA_SECURITY_INITIALIZATION_DEFAULTROLES_<ROLE>_USERS_0`        | Users assigned to the `<role>` role.         |               |

### `CAMUNDA_SECURITY_INITIALIZATION_MAPPINGRULES`

| Property                                                       | Description                                  | Default value |
| -------------------------------------------------------------- | -------------------------------------------- | ------------- |
| `CAMUNDA_SECURITY_INITIALIZATION_MAPPINGRULES_0_CLAIMNAME`     | The claim of the first mapping rule.         |               |
| `CAMUNDA_SECURITY_INITIALIZATION_MAPPINGRULES_0_CLAIMVALUE`    | The claim's value of the first mapping rule. |               |
| `CAMUNDA_SECURITY_INITIALIZATION_MAPPINGRULES_0_MAPPINGRULEID` | The id of the first mapping rule.            |               |

### `CAMUNDA_SECURITY_INITIALIZATION_USERS`

| Property                                           | Description                          | Default value |
| -------------------------------------------------- | ------------------------------------ | ------------- |
| `CAMUNDA_SECURITY_INITIALIZATION_USERS_0_EMAIL`    | The email address of the first user. |               |
| `CAMUNDA_SECURITY_INITIALIZATION_USERS_0_NAME`     | The name of the first user.          |               |
| `CAMUNDA_SECURITY_INITIALIZATION_USERS_0_PASSWORD` | The password of the first user.      |               |
| `CAMUNDA_SECURITY_INITIALIZATION_USERS_0_USERNAME` | The username of the first user.      |               |

### `CAMUNDA_SECURITY_MULTITENANCY`

| Property                                      | Description                                                                   | Default value |
| --------------------------------------------- | ----------------------------------------------------------------------------- | ------------- |
| `CAMUNDA_SECURITY_MULTITENANCY_APIENABLED`    | Enables the multi-tenancy API and UI independently from multi-tenancy checks. | `true`        |
| `CAMUNDA_SECURITY_MULTITENANCY_CHECKSENABLED` | Enables multi-tenancy checks. This requires the API to be protected.          | `false`       |

### `CAMUNDA_SECURITY_TRANSPORTLAYERSECURITY_CLUSTER`

| Property                                                                    | Description                                                                                                                           | Default value             |
| :-------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ | :------------------------ |
| `CAMUNDA_SECURITY_TRANSPORTLAYERSECURITY_CLUSTER_ENABLED`                   | <p>Enables TLS authentication for internal cluster (broker-to-broker) communication.</p>                                              | `false`                   |
| `CAMUNDA_SECURITY_TRANSPORTLAYERSECURITY_CLUSTER_CERTIFICATECHAINPATH`      | <p>Sets the path to the certificate chain file.</p>                                                                                   |                           |
| `CAMUNDA_SECURITY_TRANSPORTLAYERSECURITY_CLUSTER_CERTIFICATEPRIVATEKEYPATH` | <p>Sets the path to the private key file location.</p>                                                                                |                           |
| `CAMUNDA_SECURITY_TRANSPORTLAYERSECURITY_CLUSTER_KEYSTORE_FILEPATH`         | <p>Configures the keystore file containing both the certificate chain and the private key. Currently only supports PKCS12 format.</p> | `'./cluster.jks'`         |
| `CAMUNDA_SECURITY_TRANSPORTLAYERSECURITY_CLUSTER_KEYSTORE_PASSWORD`         | <p>Configures the keystore password.</p>                                                                                              | `${CLUSTER_KEY_STORE_PW}` |

### `CAMUNDA_PERSISTENT_SESSIONS`

| Property                              | Description                                                                            | Default value |
| ------------------------------------- | -------------------------------------------------------------------------------------- | ------------- |
| `CAMUNDA_PERSISTENT_SESSIONS_ENABLED` | Stores session data in secondary storage so users stay logged in across cluster nodes. | `false`       |

### `SPRING_PROFILES`

| Property                 | Description                                                                                       | Default value       |
| ------------------------ | ------------------------------------------------------------------------------------------------- | ------------------- |
| `SPRING_PROFILES_ACTIVE` | **Note:** This property will be deprecated as additional authentication methods become available. | `consolidated-auth` |

</TabItem>
<TabItem value="helm" label="Helm values">

### `orchestration.security.authentication`

| Property                                                              | Description                                                                                                                                                                                                                                                                                                              | Default value |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| `orchestration.security.authentication.method`                        | The authentication method to use. Options: `basic`, `oidc`.                                                                                                                                                                                                                                                              | `basic`       |
| `orchestration.security.authentication.authenticationRefreshInterval` | The interval at which the memberships (groups, roles, tenants, component authorizations) are refreshed for logged in users. Find more details in [webserver and security](/self-managed/components/orchestration-cluster/core-settings/configuration/webserver.md#propagation-of-membership-changes-to-active-sessions). | `PT30S`       |
| `orchestration.security.authentication.unprotectedApi`                | If the API can be used without authentication.                                                                                                                                                                                                                                                                           | `false`       |

### `orchestration.security.authentication.oidc`

| Property                                                   | Description                                                                                                                                                                                                   | Default value                        |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `orchestration.security.authentication.oidc.clientId`      | The client ID for OIDC authentication.                                                                                                                                                                        |                                      |
| `orchestration.security.authentication.oidc.clientSecret`  | The client secret for OIDC authentication.                                                                                                                                                                    |                                      |
| `orchestration.security.authentication.oidc.issuer`        | Sets the OIDC provider's authorization URI explicitly.                                                                                                                                                        |                                      |
| `orchestration.security.authentication.oidc.jwksUrl`       | Sets the OIDC provider's JWK Set URI explicitly.                                                                                                                                                              |                                      |
| `orchestration.security.authentication.oidc.tokenUrl`      | Sets the OIDC provider's token URI explicitly.                                                                                                                                                                |                                      |
| `orchestration.security.authentication.oidc.redirectUrl`   | The URI for redirects from the OIDC provider to the Orchestration Cluster after user login                                                                                                                    | `http://localhost:8080/sso-callback` |
| `orchestration.security.authentication.oidc.userNameClaim` | The JWT claim that identifies a user. Extracted from a token, this claim value becomes the user's username. This setting is evaluated on any token-based access, regardless of the underying OIDC/OAuth flow. | `sub`                                |
| `orchestration.security.authentication.oidc.clientIdClaim` | The JWT claim that identifies a client. Extracted from a token, this claim value becomes the client ID. This setting is evaluated on any token-based access, regardless of the underying OIDC/OAuth flow.     | `sub`                                |
| `orchestration.security.authentication.oidc.groupsClaim`   | The JWT claim that contains a user's or client's groups. Expects an array of String values. If not set, groups can be managed in the Orchestration Cluster through its REST APIs.                             |                                      |
| `orchestration.security.authentication.oidc.audiences`     | Comma-separated list of audiences to validate in the OIDC token.                                                                                                                                              |                                      |

### `orchestration.security.authorizations`

| Property                                        | Description                    | Default value |
| ----------------------------------------------- | ------------------------------ | ------------- |
| `orchestration.security.authorizations.enabled` | If authorizations are enabled. | `true`        |

### `orchestration.security.csrf`

| Property                              | Description                                                                                                                                                                                   | Default value |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `orchestration.security.csrf.enabled` | Enables or disables CSRF protection. Disabling CSRF protection is not recommended for production environments as it leaves your application vulnerable to cross-site request forgery attacks. | `true`        |

### `orchestration.security.httpHeaders`

| Property                                                                    | Description                                                                                                                                                      | Related Header                                                                                                                                                                                                                                           | Default value                     |
| --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| `orchestration.security.httpHeaders.cacheControl.enabled`                   | Enables or disables cache prevention headers. Default values: `Cache-Control: no-cache, no-store, max-age=0, must-revalidate`, `Pragma: no-cache`, `Expires: 0`. | [`Cache-Control`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control), [`Pragma`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Pragma), [`Expires`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Expires) | `true`                            |
| `orchestration.security.httpHeaders.contentSecurityPolicy.enabled`          | Enables or disables CSP headers.                                                                                                                                 | [`Content-Security-Policy`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy)                                                                                                                                           | `true`                            |
| `orchestration.security.httpHeaders.contentSecurityPolicy.policyDirectives` | Custom CSP directives. If not set, [default values applied](#default-content-security-policy-2). If set, overrides default CSP policies.                         | [`Content-Security-Policy`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy)                                                                                                                                           |                                   |
| `orchestration.security.httpHeaders.contentSecurityPolicy.reportOnly`       | Enables reporting mode without enforcing policies.                                                                                                               | [`Content-Security-Policy-Report-Only`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy-Report-Only)                                                                                                                   | `false`                           |
| `orchestration.security.httpHeaders.contentTypeOptions.enabled`             | Enables or disables `X-Content-Type-Options` header with `nosniff` value.                                                                                        | [`X-Content-Type-Options`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options)                                                                                                                                             | `true`                            |
| `orchestration.security.httpHeaders.crossOriginEmbedderPolicy.value`        | Restricts embedded cross-origin resources. Options: `REQUIRE_CORP`, `UNSAFE_NONE`.                                                                               | [`Cross-Origin-Embedder-Policy`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Embedder-Policy)                                                                                                                                 | `UNSAFE_NONE`                     |
| `orchestration.security.httpHeaders.crossOriginOpenerPolicy.value`          | Isolates windows from cross-origin openers. Options: `UNSAFE_NONE`, `SAME_ORIGIN_ALLOW_POPUPS`, `SAME_ORIGIN`.                                                   | [`Cross-Origin-Opener-Policy`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Opener-Policy)                                                                                                                                     | `SAME_ORIGIN_ALLOW_POPUPS`        |
| `orchestration.security.httpHeaders.crossOriginResourcePolicy.value`        | Declares whether resources can be loaded cross-origin. Options: `SAME_ORIGIN`, `SAME_SITE`, `CROSS_ORIGIN`.                                                      | [`Cross-Origin-Resource-Policy`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Resource-Policy)                                                                                                                                 | `SAME_SITE`                       |
| `orchestration.security.httpHeaders.frameOptions.enabled`                   | Enables or disables `X-Frame-Options` header. Default value is `SAMEORIGIN`.                                                                                     | [`X-Frame-Options`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options)                                                                                                                                                           | `true`                            |
| `orchestration.security.httpHeaders.frameOptions.mode`                      | Frame options mode. Options: `DENY`, `SAMEORIGIN`.                                                                                                               | [`X-Frame-Options`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options)                                                                                                                                                           | `SAMEORIGIN`                      |
| `orchestration.security.httpHeaders.hsts.enabled`                           | Enables or disables `Strict-Transport-Security` header.                                                                                                          | [`Strict-Transport-Security`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security)                                                                                                                                       | `true`                            |
| `orchestration.security.httpHeaders.hsts.includeSubdomains`                 | Applies HSTS to all subdomains.                                                                                                                                  | [`Strict-Transport-Security`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security)                                                                                                                                       | `false`                           |
| `orchestration.security.httpHeaders.hsts.maxAgeInSeconds`                   | HSTS max age in seconds.                                                                                                                                         | [`Strict-Transport-Security`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security)                                                                                                                                       | `31536000`                        |
| `orchestration.security.httpHeaders.hsts.preload`                           | Enables HSTS preloading.                                                                                                                                         | [`Strict-Transport-Security`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security)                                                                                                                                       | `false`                           |
| `orchestration.security.httpHeaders.permissionsPolicy.value`                | Restricts access to browser capabilities.                                                                                                                        | [`Permissions-Policy`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy)                                                                                                                                                     | Disables all features by default  |
| `orchestration.security.httpHeaders.referrerPolicy.value`                   | Controls referrer information sharing. See available values below.                                                                                               | [`Referrer-Policy`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy)                                                                                                                                                           | `STRICT_ORIGIN_WHEN_CROSS_ORIGIN` |

#### Default Content Security Policy

This is default value of the Content Security Policy when enabled:

```
default-src 'self';
base-uri 'self';
script-src 'self' https: *.chargebee.com *.mixpanel.com ajax.cloudflare.com static.cloudflareinsights.com;
script-src-elem 'self' cdn.jsdelivr.net ;
connect-src 'self' https: *.mixpanel.com cloudflareinsights.com *.appcues.net wss://api.appcues.net cdn.jsdelivr.net;
style-src 'self' https: 'unsafe-inline' cdn.jsdelivr.net *.googleapis.com *.chargebee.com;
img-src data: 'self';
form-action 'self';
frame-ancestors 'self';
frame-src 'self' https: *.chargebee.com blob: ;
object-src 'self' blob:;
font-src 'self' data: fonts.camunda.io cdn.jsdelivr.net;
worker-src 'self' blob:;
child-src;
script-src-attr 'none'.
```

### `orchestration.security.initialization`

| Property                                      | Description                                                              | Default value |
| --------------------------------------------- | ------------------------------------------------------------------------ | ------------- |
| `orchestration.security.initialization.users` | List of users to initialize (each with username, password, name, email). |               |

### `orchestration.security.multiTenancy`

| Property                                            | Description                                                                   | Default value |
| --------------------------------------------------- | ----------------------------------------------------------------------------- | ------------- |
| `orchestration.security.multiTenancy.checksEnabled` | Enables multi-tenancy checks. This requires the API to be protected.          | `false`       |
| `orchestration.security.multiTenancy.apiEnabled`    | Enables the multi-tenancy API and UI independently from multi-tenancy checks. | `true`        |

</TabItem>
</Tabs>

:::caution
Disabling CSRF protection is not recommended for production environments as it leaves your application vulnerable to cross-site request forgery attacks.
:::

<!-- Leaving this content in temporarily in case anything is missed -->
<!-- # New content

### `camunda.security`

| Property                                 | Description                                                                                         | Default value         |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------- | --------------------- |
| `camunda.security.id-validation-pattern` | A Java regular expression that validates the user-defined identifiers of Identity-related entities. | `^[a-zA-Z0-9_@.+-]+$` |

### `camunda.security.authentication`

| Property                                                          | Description                                                                                                                                                                                                                                                                                                              | Default value |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| `camunda.security.authentication.authentication-refresh-interval` | The interval at which the memberships (groups, roles, tenants, component authorizations) are refreshed for logged in users. Find more details in [webserver and security](/self-managed/components/orchestration-cluster/core-settings/configuration/webserver.md#propagation-of-membership-changes-to-active-sessions). | `PT30S`       |
| `camunda.security.authorizations.enabled`                         | If authorizations are enabled.                                                                                                                                                                                                                                                                                           | `true`        |
| `camunda.security.authentication.method`                          | The authentication method to use. Options: `basic`, `oidc`.                                                                                                                                                                                                                                                              | `basic`       |
| `camunda.security.authentication.unprotected-api`                 | If the API can be used without authentication.                                                                                                                                                                                                                                                                           | `false`       |

### `camunda.security.csrf`

| Property                        | Description                                                                                                                                                                                   | Default value |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `camunda.security.csrf.enabled` | Enables or disables CSRF protection. Disabling CSRF protection is not recommended for production environments as it leaves your application vulnerable to cross-site request forgery attacks. | `true`        |

:::caution
Disabling CSRF protection is not recommended for production environments as it leaves your application vulnerable to cross-site request forgery attacks.
:::

### `camunda.security.http-headers`

| Property                                                                  | Description                                                                                                                                                      | Related Header                                                                                                                                                                                                                                           | Default value                     |
| ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| `camunda.security.http-headers.cache-control.enabled`                     | Enables or disables cache prevention headers. Default values: `Cache-Control: no-cache, no-store, max-age=0, must-revalidate`, `Pragma: no-cache`, `Expires: 0`. | [`Cache-Control`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control), [`Pragma`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Pragma), [`Expires`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Expires) | `true`                            |
| `camunda.security.http-headers.content-security-policy.enabled`           | Enables or disables CSP headers.                                                                                                                                 | [`Content-Security-Policy`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy)                                                                                                                                           | `true`                            |
| `camunda.security.http-headers.content-security-policy.policy-directives` | Custom CSP directives. If not set, [default values applied](#default-content-security-policy). If set, overrides default CSP policies.                           | [`Content-Security-Policy`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy)                                                                                                                                           |                                   |
| `camunda.security.http-headers.content-security-policy.report-only`       | Enables reporting mode without enforcing policies.                                                                                                               | [`Content-Security-Policy-Report-Only`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy-Report-Only)                                                                                                                   | `false`                           |
| `camunda.security.http-headers.content-type-options.enabled`              | Enables or disables `X-Content-Type-Options` header with `nosniff` value.                                                                                        | [`X-Content-Type-Options`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options)                                                                                                                                             | `true`                            |
| `camunda.security.http-headers.cross-origin-embedder-policy.value`        | Restricts embedded cross-origin resources. Options: `REQUIRE_CORP`, `UNSAFE_NONE`.                                                                               | [`Cross-Origin-Embedder-Policy`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Embedder-Policy)                                                                                                                                 | `UNSAFE_NONE`                     |
| `camunda.security.http-headers.cross-origin-opener-policy.value`          | Isolates windows from cross-origin openers. Options: `UNSAFE_NONE`, `SAME_ORIGIN_ALLOW_POPUPS`, `SAME_ORIGIN`.                                                   | [`Cross-Origin-Opener-Policy`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Opener-Policy)                                                                                                                                     | `SAME_ORIGIN_ALLOW_POPUPS`        |
| `camunda.security.http-headers.cross-origin-resource-policy.value`        | Declares whether resources can be loaded cross-origin. Options: `SAME_ORIGIN`, `SAME_SITE`, `CROSS_ORIGIN`.                                                      | [`Cross-Origin-Resource-Policy`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Resource-Policy)                                                                                                                                 | `SAME_SITE`                       |
| `camunda.security.http-headers.frame-options.enabled`                     | Enables or disables `X-Frame-Options` header. Default value is `SAMEORIGIN`.                                                                                     | [`X-Frame-Options`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options)                                                                                                                                                           | `true`                            |
| `camunda.security.http-headers.frame-options.mode`                        | Frame options mode. Options: `DENY`, `SAMEORIGIN`.                                                                                                               | [`X-Frame-Options`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options)                                                                                                                                                           | `SAMEORIGIN`                      |
| `camunda.security.http-headers.hsts.enabled`                              | Enables or disables `Strict-Transport-Security` header.                                                                                                          | [`Strict-Transport-Security`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security)                                                                                                                                       | `true`                            |
| `camunda.security.http-headers.hsts.include-subdomains`                   | Applies HSTS to all subdomains.                                                                                                                                  | [`Strict-Transport-Security`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security)                                                                                                                                       | `false`                           |
| `camunda.security.http-headers.hsts.max-age-in-seconds`                   | HSTS max age in seconds.                                                                                                                                         | [`Strict-Transport-Security`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security)                                                                                                                                       | `31536000`                        |
| `camunda.security.http-headers.hsts.preload`                              | Enables HSTS preloading.                                                                                                                                         | [`Strict-Transport-Security`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security)                                                                                                                                       | `false`                           |
| `camunda.security.http-headers.permissions-policy.value`                  | Restricts access to browser capabilities.                                                                                                                        | [`Permissions-Policy`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy)                                                                                                                                                     | Disables all features by default  |
| `camunda.security.http-headers.referrer-policy.value`                     | Controls referrer information sharing. See available values below.                                                                                               | [`Referrer-Policy`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy)                                                                                                                                                           | `STRICT_ORIGIN_WHEN_CROSS_ORIGIN` |

#### Default Content Security Policy

This is default value of the Content Security Policy when enabled:

```
default-src 'self';
base-uri 'self';
script-src 'self' https: *.chargebee.com *.mixpanel.com ajax.cloudflare.com static.cloudflareinsights.com;
script-src-elem 'self' cdn.jsdelivr.net ;
connect-src 'self' https: *.mixpanel.com cloudflareinsights.com *.appcues.net wss://api.appcues.net cdn.jsdelivr.net;
style-src 'self' https: 'unsafe-inline' cdn.jsdelivr.net *.googleapis.com *.chargebee.com;
img-src data: 'self';
form-action 'self';
frame-ancestors 'self';
frame-src 'self' https: *.chargebee.com blob: ;
object-src 'self' blob:;
font-src 'self' data: fonts.camunda.io cdn.jsdelivr.net;
worker-src 'self' blob:;
child-src;
script-src-attr 'none'.
```

### `camunda.security.authentication.oidc`

Configuration options to connect to an identity providers.

| Property                                                            | Description                                                                                                                                                                                                                             | Default value                        |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `camunda.security.authentication.oidc.client-id`                    | The client ID for OIDC authentication.                                                                                                                                                                                                  |                                      |
| `camunda.security.authentication.oidc.client-secret`                | The client secret for OIDC authentication. Only takes effect if `camunda.security.authentication.oidc.client-authentication-method` is set to `client_secret_basic` or left default.                                                    |                                      |
| `camunda.security.authentication.oidc.issuer-uri`                   | The issuer URI for OIDC authentication. If set, the individual endpoints of your OIDC provider will be fetched from its [well-known configuration endpoint](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderConfig). |                                      |
| `camunda.security.authentication.oidc.redirect-uri`                 | The URI for redirects from the OIDC provider to the Orchestration Cluster after user login.                                                                                                                                             | `http://localhost:8080/sso-callback` |
| `camunda.security.authentication.oidc.username-claim`               | The JWT claim that identifies a user. Extracted from a token, this claim value becomes the user's username. This setting is evaluated on any token-based access, regardless of the underying OIDC/OAuth flow.                           | `sub`                                |
| `camunda.security.authentication.oidc.groups-claim`                 | The JWT claim that contains a user's or client's groups. Expects an array of String values. If not set, groups can be managed in the Orchestration Cluster through its REST APIs.                                                       |                                      |
| `camunda.security.authentication.oidc.client-id-claim`              | The JWT claim that identifies a client. Extracted from a token, this claim value becomes the clients's ID. This setting is evaluated on any token-based access, regardless of the underying OIDC/OAuth flow.                            |                                      |
| `camunda.security.authentication.oidc.prefer-username-claim`        | Determines if a token that contains both, the configured username claim and the configured client id claim, is treated as a user or a client. If set to true, it is treated as a user. If set to false, it is treated as a client.      | `false`                              |
| `camunda.security.authentication.oidc.audiences`                    | Comma-separated list of audiences to validate in the OIDC token.                                                                                                                                                                        |                                      |
| `camunda.security.authentication.oidc.scope`                        | Comma-separated list of scopes to request in the OIDC token.                                                                                                                                                                            | `openid, profile`                    |
| `camunda.security.authentication.oidc.jwk-set-uri`                  | Sets the OIDC provider's JWK Set URI explicitly. This will override the well-known configuration's value.                                                                                                                               |                                      |
| `camunda.security.authentication.oidc.authorization-uri`            | Sets the OIDC provider's authorization URI explicitly. This will override the well-known configuration's value.                                                                                                                         |                                      |
| `camunda.security.authentication.oidc.token-uri`                    | Sets the OIDC provider's token URI explicitly. This will override the well-known configuration's value.                                                                                                                                 |                                      |
| `camunda.security.authentication.oidc.client-authentication-method` | Sets the client authentication method to use. Options: `client_secret_basic`, `private_key_jwt`.                                                                                                                                        | `client_secret_basic`                |
| `camunda.security.authentication.oidc.clock-skew`                   | Sets the allowed clock skew when validating JWT issuance and expiration. Format: ISO 8601 duration (`PnDTnHnMn.nS`).                                                                                                                    | `60S`                                |
| `camunda.security.authentication.oidc.id-token-algorithm`           | Sets the ID token signature algorithm.                                                                                                                                                                                                  | `RS256`                              |

### `camunda.security.authentication.oidc.assertion`

Configuration options for the client assertion used in Bearer JWT client authentication.

:::note
These properties apply only when `camunda.security.authentication.oidc.client-authentication-method` is set to `private_key_jwt`.
The `key` value refers to the private key ID used to sign the client assertion JWT.
:::

| Property                                                              | Description                                                                | Default value |
| --------------------------------------------------------------------- | -------------------------------------------------------------------------- | ------------- |
| `camunda.security.authentication.oidc.assertion.kid-source`           | Source for generating the key ID. Options: `CERTIFICATE`, `PUBLIC_KEY`.    | `PUBLIC_KEY`  |
| `camunda.security.authentication.oidc.assertion.kid-digest-algorithm` | Hash algorithm used to generate the key ID. Options: `SHA256`, `SHA1`.     | `SHA256`      |
| `camunda.security.authentication.oidc.assertion.kid-encoding`         | Key ID encoding. Options: `BASE64URL`, `HEX`.                              | `BASE64URL`   |
| `camunda.security.authentication.oidc.assertion.kid-case`             | Key ID case. Only applicable to `HEX` encoding. Options: `UPPER`, `LOWER`. |               |

### `camunda.security.authentication.oidc.assertion.keystore`

Configuration of the keystore used to build the client assertion for Bearer JWT client authentication.

:::note
These properties apply only when `camunda.security.authentication.oidc.client-authentication-method` is set to `private_key_jwt`.
:::

| Property                                                               | Description                                                       | Default value |
| ---------------------------------------------------------------------- | ----------------------------------------------------------------- | ------------- |
| `camunda.security.authentication.oidc.assertion.keystore.path`         | Path to the `PKCS12` keystore.                                    |               |
| `camunda.security.authentication.oidc.assertion.keystore.password`     | Keystore password.                                                |               |
| `camunda.security.authentication.oidc.assertion.keystore.key-alias`    | Alias of the private key to be used to sign the client assertion. |               |
| `camunda.security.authentication.oidc.assertion.keystore.key-password` | Password of the private key.                                      |               |

### `camunda.security.authentication.providers.oidc`

Configuration options to connect to multiple identity providers.

:::note
`<provider-id>` is a unique, user-defined identifier. All properties that share the same `<provider-id>` belong to the same identity provider configuration.
:::

| Property                                                                                    | Description                                                                                                                                                                                                                                                                                                                            | Default value                        |
| ------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `camunda.security.authentication.providers.oidc.<provider-id>.client-name`                  | The client name for OIDC authentication.                                                                                                                                                                                                                                                                                               |                                      |
| `camunda.security.authentication.providers.oidc.<provider-id>.client-id`                    | The client ID for OIDC authentication.                                                                                                                                                                                                                                                                                                 |                                      |
| `camunda.security.authentication.providers.oidc.<provider-id>.client-secret`                | The client secret for OIDC authentication. Only takes effect if `camunda.security.authentication.providers.oidc.[provider-id].client-authentication-method` is set to `client_secret_basic` or left default.                                                                                                                           |                                      |
| `camunda.security.authentication.providers.oidc.<provider-id>.issuer-uri`                   | The issuer URI for OIDC authentication, it is required and identifies the identity provider that issues tokens for this configuration. If set, the individual endpoints of your OIDC provider will be fetched from its [well-known configuration endpoint](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderConfig). |                                      |
| `camunda.security.authentication.providers.oidc.<provider-id>.redirect-uri`                 | The URI for redirects from the OIDC provider to the Orchestration Cluster after user login.                                                                                                                                                                                                                                            | `http://localhost:8080/sso-callback` |
| `camunda.security.authentication.providers.oidc.<provider-id>.audiences`                    | Comma-separated list of audiences to validate in the OIDC token.                                                                                                                                                                                                                                                                       |                                      |
| `camunda.security.authentication.providers.oidc.<provider-id>.scope`                        | Comma-separated list of scopes to request in the OIDC token.                                                                                                                                                                                                                                                                           | `openid, profile`                    |
| `camunda.security.authentication.providers.oidc.<provider-id>.jwk-set-uri`                  | Sets the OIDC provider's JWK Set URI explicitly. This will override the well-known configuration's value.                                                                                                                                                                                                                              |                                      |
| `camunda.security.authentication.providers.oidc.<provider-id>.authorization-uri`            | Sets the OIDC provider's authorization URI explicitly. This will override the well-known configuration's value.                                                                                                                                                                                                                        |                                      |
| `camunda.security.authentication.providers.oidc.<provider-id>.token-uri`                    | Sets the OIDC provider's token URI explicitly. This will override the well-known configuration's value.                                                                                                                                                                                                                                |                                      |
| `camunda.security.authentication.providers.oidc.<provider-id>.client-authentication-method` | Sets the client authentication method to use. Options: `client_secret_basic`, `private_key_jwt`.                                                                                                                                                                                                                                       | `client_secret_basic`                |

Client assertion settings are configured per identity provider. Each provider supports the same client assertion properties described in [Client assertion configuration](#camundasecurityauthenticationoidcassertion) and [Keystore Client assertion configuration](#camundasecurityauthenticationoidcassertionkeystore), applied within the scope of the corresponding `<provider-id>`.

### `camunda.security.initialization.default-roles`

| Property                                                                | Description                                  | Default value |
| ----------------------------------------------------------------------- | -------------------------------------------- | ------------- |
| `camunda.security.initialization.default-roles.<role>.clients.[0]`      | Clients assigned to the `<role>` role.       |               |
| `camunda.security.initialization.default-roles.<role>.groups.[0]`       | Groups assigned to the `<role>` role.        |               |
| `camunda.security.initialization.default-roles.<role>.mappingrules.[0]` | Mapping rules assigned to the `<role>` role. |               |
| `camunda.security.initialization.default-roles.<role>.users.[0]`        | Users assigned to the `<role>` role.         |               |

### `camunda.security.initialization.users`

| Property                                             | Description                          | Default value |
| ---------------------------------------------------- | ------------------------------------ | ------------- |
| `camunda.security.initialization.users.[0].email`    | The email address of the first user. |               |
| `camunda.security.initialization.users.[0].name`     | The name of the first user.          |               |
| `camunda.security.initialization.users.[0].password` | The password of the first user.      |               |
| `camunda.security.initialization.users.[0].username` | The username of the first user.      |               |

### `camunda.security.initialization.mappingrules`

| Property                                                           | Description                                  | Default value |
| ------------------------------------------------------------------ | -------------------------------------------- | ------------- |
| `camunda.security.initialization.mappingrules.[0].claim-name`      | The claim of the first mapping rule.         |               |
| `camunda.security.initialization.mappingrules.[0].claim-value`     | The claim's value of the first mapping rule. |               |
| `camunda.security.initialization.mappingrules.[0].mapping-rule-id` | The id of the first mapping rule.            |               |

### `camunda.security.multi-tenancy`

| Property                                        | Description                                                                   | Default value |
| ----------------------------------------------- | ----------------------------------------------------------------------------- | ------------- |
| `camunda.security.multi-tenancy.api-enabled`    | Enables the multi-tenancy API and UI independently from multi-tenancy checks. | `true`        |
| `camunda.security.multi-tenancy.checks-enabled` | Enables multi-tenancy checks. This requires the API to be protected.          | `false`       |

### `camunda.persistent.sessions`

| Property                              | Description                                                                            | Default value |
| ------------------------------------- | -------------------------------------------------------------------------------------- | ------------- |
| `camunda.persistent.sessions.enabled` | Stores session data in secondary storage so users stay logged in across cluster nodes. | `false`       |

### `spring.profiles`

| Property                 | Description                                                                                       | Default value       |
| ------------------------ | ------------------------------------------------------------------------------------------------- | ------------------- |
| `spring.profiles.active` | **Note:** This property will be deprecated as additional authentication methods become available. | `consolidated-auth` |

### `CAMUNDA_SECURITY`

| Property                               | Description                                                                                         | Default value         |
| -------------------------------------- | --------------------------------------------------------------------------------------------------- | --------------------- |
| `CAMUNDA_SECURITY_IDVALIDATIONPATTERN` | A Java regular expression that validates the user-defined identifiers of Identity-related entities. | `^[a-zA-Z0-9_@.+-]+$` |

### `CAMUNDA_SECURITY_AUTHENTICATION`

| Property                                                        | Description                                                                                                                                                                                                                                                                                                              | Default value |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| `CAMUNDA_SECURITY_AUTHENTICATION_AUTHENTICATIONREFRESHINTERVAL` | The interval at which the memberships (groups, roles, tenants, component authorizations) are refreshed for logged in users. Find more details in [webserver and security](/self-managed/components/orchestration-cluster/core-settings/configuration/webserver.md#propagation-of-membership-changes-to-active-sessions). | `PT30S`       |
| `CAMUNDA_SECURITY_AUTHORIZATIONS_ENABLED`                       | If authorizations are enabled.                                                                                                                                                                                                                                                                                           | `true`        |
| `CAMUNDA_SECURITY_AUTHENTICATION_METHOD`                        | The authentication method to use. Options: `basic`, `oidc`.                                                                                                                                                                                                                                                              | `basic`       |
| `CAMUNDA_SECURITY_AUTHENTICATION_UNPROTECTEDAPI`                | If the API can be used without authentication.                                                                                                                                                                                                                                                                           | `false`       |

### `CAMUNDA_SECURITY_AUTHENTICATION_OIDC`

Configuration options to connect to an identity providers.

| Property                                                            | Description                                                                                                                                                                                                                             | Default value                        |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_CLIENTID`                     | The client ID for OIDC authentication.                                                                                                                                                                                                  |                                      |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_CLIENTSECRET`                 | The client secret for OIDC authentication. Only takes effect if `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_CLIENT_AUTHENTICATION_METHOD` is set to `client_secret_basic` or left default.                                                    |                                      |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_ISSUERURI`                    | The issuer URI for OIDC authentication. If set, the individual endpoints of your OIDC provider will be fetched from its [well-known configuration endpoint](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderConfig). |                                      |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_REDIRECTURI`                  | The URI for redirects from the OIDC provider to the Orchestration Cluster after user login.                                                                                                                                             | `http://localhost:8080/sso-callback` |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_USERNAMECLAIM`                | The JWT claim that identifies a user. Extracted from a token, this claim value becomes the user's username. This setting is evaluated on any token-based access, regardless of the underying OIDC/OAuth flow.                           | `sub`                                |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_GROUPSCLAIM`                  | The JWT claim that contains a user's or client's groups. Expects an array of String values. If not set, groups can be managed in the Orchestration Cluster through its REST APIs.                                                       |                                      |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_CLIENTIDCLAIM`                | The JWT claim that identifies a client. Extracted from a token, this claim value becomes the clients's id. This setting is evaluated on any token-based access, regardless of the underying OIDC/OAuth flow.                            |                                      |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_PREFERUSERNAMECLAIM`          | Determines if a token that contains both, the configured username claim and the configured client id claim, is treated as a user or a client. If set to true, it is treated as a user. If set to false, it is treated as a client.      | `false`                              |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_AUDIENCES`                    | Comma-separated list of audiences to validate in the OIDC token.                                                                                                                                                                        |                                      |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_SCOPE`                        | Comma-separated list of scopes to request in the OIDC token.                                                                                                                                                                            | `openid, profile`                    |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_JWKSETURI`                    | Sets the OIDC provider's JWK Set URI explicitly. This will override the well-known configuration's value.                                                                                                                               |                                      |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_AUTHORIZATIONURI`             | Sets the OIDC provider's authorization URI explicitly. This will override the well-known configuration's value.                                                                                                                         |                                      |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_TOKENURI`                     | Sets the OIDC provider's token URI explicitly. This will override the well-known configuration's value.                                                                                                                                 |                                      |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_CLIENT_AUTHENTICATION_METHOD` | Sets the client authentication method to use. Options: `client_secret_basic`, `private_key_jwt`.                                                                                                                                        | `client_secret_basic`                |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_CLOCK_SKEW`                   | Sets the allowed clock skew when validating JWT issuance and expiration. Format: ISO 8601 duration (`PnDTnHnMn.nS`).                                                                                                                    | `60S`                                |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_ID_TOKEN_ALGORITHM`           | Sets the ID token signature algorithm.                                                                                                                                                                                                  | `RS256`                              |

### `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_ASSERTION`

Configuration options for the client assertion used in Bearer JWT client authentication.

:::note
These properties apply only when `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_CLIENT_AUTHENTICATION_METHOD` is set to `private_key_jwt`.
The `key` value refers to the private key ID used to sign the client assertion JWT.
:::

| Property                                                              | Description                                                                | Default value |
| --------------------------------------------------------------------- | -------------------------------------------------------------------------- | ------------- |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_ASSERTION_KID_SOURCE`           | Source for generating the key ID. Options: `CERTIFICATE`, `PUBLIC_KEY`.    | `PUBLIC_KEY`  |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_ASSERTION_KID_DIGEST_ALGORITHM` | Hash algorithm used to generate the key ID. Options: `SHA256`, `SHA1`.     | `SHA256`      |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_ASSERTION_KID_ENCODING`         | Key ID encoding. Options: `BASE64URL`, `HEX`.                              | `BASE64URL`   |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_ASSERTION_KID_CASE`             | Key ID case. Only applicable to `HEX` encoding. Options: `UPPER`, `LOWER`. |               |

### `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_ASSERTION_KEYSTORE`

Configuration of the keystore used to build the client assertion for Bearer JWT client authentication.

:::note
These properties apply only when `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_CLIENT_AUTHENTICATION_METHOD` is set to `private_key_jwt`.
:::

| Property                                                               | Description                                                       | Default value |
| ---------------------------------------------------------------------- | ----------------------------------------------------------------- | ------------- |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_ASSERTION_KEYSTORE_PATH`         | Path to the `PKCS12` keystore.                                    |               |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_ASSERTION_KEYSTORE_PASSWORD`     | Keystore password.                                                |               |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_ASSERTION_KEYSTORE_KEY_ALIAS`    | Alias of the private key to be used to sign the client assertion. |               |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_ASSERTION_KEYSTORE_KEY_PASSWORD` | Password of the private key.                                      |               |

### `CAMUNDA_SECURITY_AUTHENTICATION_PROVIDERS_OIDC`

Configuration options to connect to multiple identity providers.

:::note
`<provider-id>` is a unique, user-defined identifier. All properties that share the same `<provider-id>` belong to the same identity provider configuration.
:::

| Property                                                                                    | Description                                                                                                                                                                                                                                                                                                                            | Default value                        |
| ------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| `CAMUNDA_SECURITY_AUTHENTICATION_PROVIDERS_OIDC_<provider-id>_CLIENTNAME`                   | The client name for OIDC authentication.                                                                                                                                                                                                                                                                                               |                                      |
| `CAMUNDA_SECURITY_AUTHENTICATION_PROVIDERS_OIDC_<provider-id>_CLIENTID`                     | The client ID for OIDC authentication.                                                                                                                                                                                                                                                                                                 |                                      |
| `CAMUNDA_SECURITY_AUTHENTICATION_PROVIDERS_OIDC_<provider-id>_CLIENTSECRET`                 | The client secret for OIDC authentication. Only takes effect if `CAMUNDA_SECURITY_AUTHENTICATION_PROVIDERS_OIDC_<provider-id>_CLIENT_AUTHENTICATION_METHOD` is set to `client_secret_basic` or left default.                                                                                                                           |                                      |
| `CAMUNDA_SECURITY_AUTHENTICATION_PROVIDERS_OIDC_<provider-id>_ISSUERURI`                    | The issuer URI for OIDC authentication, it is required and identifies the identity provider that issues tokens for this configuration. If set, the individual endpoints of your OIDC provider will be fetched from its [well-known configuration endpoint](https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderConfig). |                                      |
| `CAMUNDA_SECURITY_AUTHENTICATION_PROVIDERS_OIDC_<provider-id>_REDIRECTURI`                  | The URI for redirects from the OIDC provider to the Orchestration Cluster after user login.                                                                                                                                                                                                                                            | `http://localhost:8080/sso-callback` |
| `CAMUNDA_SECURITY_AUTHENTICATION_PROVIDERS_OIDC_<provider-id>_AUDIENCES`                    | Comma-separated list of audiences to validate in the OIDC token.                                                                                                                                                                                                                                                                       |                                      |
| `CAMUNDA_SECURITY_AUTHENTICATION_PROVIDERS_OIDC_<provider-id>_SCOPE`                        | Comma-separated list of scopes to request in the OIDC token.                                                                                                                                                                                                                                                                           | `openid, profile`                    |
| `CAMUNDA_SECURITY_AUTHENTICATION_PROVIDERS_OIDC_<provider-id>_JWKSETURI`                    | Sets the OIDC provider's JWK Set URI explicitly. This will override the well-known configuration's value.                                                                                                                                                                                                                              |                                      |
| `CAMUNDA_SECURITY_AUTHENTICATION_PROVIDERS_OIDC_<provider-id>_AUTHORIZATIONURI`             | Sets the OIDC provider's authorization URI explicitly. This will override the well-known configuration's value.                                                                                                                                                                                                                        |                                      |
| `CAMUNDA_SECURITY_AUTHENTICATION_PROVIDERS_OIDC_<provider-id>_TOKENURI`                     | Sets the OIDC provider's token URI explicitly. This will override the well-known configuration's value.                                                                                                                                                                                                                                |                                      |
| `CAMUNDA_SECURITY_AUTHENTICATION_PROVIDERS_OIDC_<provider-id>_CLIENT_AUTHENTICATION_METHOD` | Sets the client authentication method to use. Options: `client_secret_basic`, `private_key_jwt`.                                                                                                                                                                                                                                       | `client_secret_basic`                |

Client assertion settings are configured per identity provider. Each provider supports the same client assertion properties described in [Client assertion configuration](#camunda_security_authentication_oidc_assertion) and [Keystore Client assertion configuration](#camunda_security_authentication_oidc_assertion_keystore), applied within the scope of the corresponding `<provider-id>`.

### `CAMUNDA_SECURITY_CSRF`

| Property                        | Description                                                                                                                                                                                   | Default value |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `CAMUNDA_SECURITY_CSRF_ENABLED` | Enables or disables CSRF protection. Disabling CSRF protection is not recommended for production environments as it leaves your application vulnerable to cross-site request forgery attacks. | `true`        |

### `CAMUNDA_SECURITY_HTTP_HEADERS`

| Property                                                                  | Description                                                                                                                                                      | Related Header                                                                                                                                                                                                                                           | Default value                     |
| ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| `CAMUNDA_SECURITY_HTTP_HEADERS_CACHE_CONTROL_ENABLED`                     | Enables or disables cache prevention headers. Default values: `Cache-Control: no-cache, no-store, max-age=0, must-revalidate`, `Pragma: no-cache`, `Expires: 0`. | [`Cache-Control`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control), [`Pragma`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Pragma), [`Expires`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Expires) | `true`                            |
| `CAMUNDA_SECURITY_HTTP_HEADERS_CONTENT_SECURITY_POLICY_ENABLED`           | Enables or disables CSP headers.                                                                                                                                 | [`Content-Security-Policy`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy)                                                                                                                                           | `true`                            |
| `CAMUNDA_SECURITY_HTTP_HEADERS_CONTENT_SECURITY_POLICY_POLICY_DIRECTIVES` | Custom CSP directives. If not set, [default values applied](#default-content-security-policy-1). If set, overrides default CSP policies.                         | [`Content-Security-Policy`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy)                                                                                                                                           |                                   |
| `CAMUNDA_SECURITY_HTTP_HEADERS_CONTENT_SECURITY_POLICY_REPORT_ONLY`       | Enables reporting mode without enforcing policies.                                                                                                               | [`Content-Security-Policy-Report-Only`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy-Report-Only)                                                                                                                   | `false`                           |
| `CAMUNDA_SECURITY_HTTP_HEADERS_CONTENT_TYPE_OPTIONS_ENABLED`              | Enables or disables `X-Content-Type-Options` header with `nosniff` value.                                                                                        | [`X-Content-Type-Options`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options)                                                                                                                                             | `true`                            |
| `CAMUNDA_SECURITY_HTTP_HEADERS_CROSS_ORIGIN_EMBEDDER_POLICY_VALUE`        | Restricts embedded cross-origin resources. Options: `REQUIRE_CORP`, `UNSAFE_NONE`.                                                                               | [`Cross-Origin-Embedder-Policy`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Embedder-Policy)                                                                                                                                 | `UNSAFE_NONE`                     |
| `CAMUNDA_SECURITY_HTTP_HEADERS_CROSS_ORIGIN_OPENER_POLICY_VALUE`          | Isolates windows from cross-origin openers. Options: `UNSAFE_NONE`, `SAME_ORIGIN_ALLOW_POPUPS`, `SAME_ORIGIN`.                                                   | [`Cross-Origin-Opener-Policy`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Opener-Policy)                                                                                                                                     | `SAME_ORIGIN_ALLOW_POPUPS`        |
| `CAMUNDA_SECURITY_HTTP_HEADERS_CROSS_ORIGIN_RESOURCE_POLICY_VALUE`        | Declares whether resources can be loaded cross-origin. Options: `SAME_ORIGIN`, `SAME_SITE`, `CROSS_ORIGIN`.                                                      | [`Cross-Origin-Resource-Policy`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Resource-Policy)                                                                                                                                 | `SAME_SITE`                       |
| `CAMUNDA_SECURITY_HTTP_HEADERS_FRAME_OPTIONS_ENABLED`                     | Enables or disables `X-Frame-Options` header. Default value is `SAMEORIGIN`.                                                                                     | [`X-Frame-Options`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options)                                                                                                                                                           | `true`                            |
| `CAMUNDA_SECURITY_HTTP_HEADERS_FRAME_OPTIONS_MODE`                        | Frame options mode. Options: `DENY`, `SAMEORIGIN`.                                                                                                               | [`X-Frame-Options`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options)                                                                                                                                                           | `SAMEORIGIN`                      |
| `CAMUNDA_SECURITY_HTTP_HEADERS_HSTS_ENABLED`                              | Enables or disables `Strict-Transport-Security` header.                                                                                                          | [`Strict-Transport-Security`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security)                                                                                                                                       | `true`                            |
| `CAMUNDA_SECURITY_HTTP_HEADERS_HSTS_INCLUDE_SUBDOMAINS`                   | Applies HSTS to all subdomains.                                                                                                                                  | [`Strict-Transport-Security`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security)                                                                                                                                       | `false`                           |
| `CAMUNDA_SECURITY_HTTP_HEADERS_HSTS_MAX_AGE_IN_SECONDS`                   | HSTS max age in seconds.                                                                                                                                         | [`Strict-Transport-Security`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security)                                                                                                                                       | `31536000`                        |
| `CAMUNDA_SECURITY_HTTP_HEADERS_HSTS_PRELOAD`                              | Enables HSTS preloading.                                                                                                                                         | [`Strict-Transport-Security`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security)                                                                                                                                       | `false`                           |
| `CAMUNDA_SECURITY_HTTP_HEADERS_PERMISSIONS_POLICY_VALUE`                  | Restricts access to browser capabilities.                                                                                                                        | [`Permissions-Policy`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy)                                                                                                                                                     | Disables all features by default  |
| `CAMUNDA_SECURITY_HTTP_HEADERS_REFERRER_POLICY_VALUE`                     | Controls referrer information sharing. See available values below.                                                                                               | [`Referrer-Policy`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy)                                                                                                                                                           | `STRICT_ORIGIN_WHEN_CROSS_ORIGIN` |

#### Default Content Security Policy

This is default value of the Content Security Policy when enabled:

```
default-src 'self';
base-uri 'self';
script-src 'self' https: *.chargebee.com *.mixpanel.com ajax.cloudflare.com static.cloudflareinsights.com;
script-src-elem 'self' cdn.jsdelivr.net ;
connect-src 'self' https: *.mixpanel.com cloudflareinsights.com *.appcues.net wss://api.appcues.net cdn.jsdelivr.net;
style-src 'self' https: 'unsafe-inline' cdn.jsdelivr.net *.googleapis.com *.chargebee.com;
img-src data: 'self';
form-action 'self';
frame-ancestors 'self';
frame-src 'self' https: *.chargebee.com blob: ;
object-src 'self' blob:;
font-src 'self' data: fonts.camunda.io cdn.jsdelivr.net;
worker-src 'self' blob:;
child-src;
script-src-attr 'none'.
```

### `CAMUNDA_SECURITY_INITIALIZATION_AUTHORIZATIONS`

| Property                                                         | Description                                                                                                                        | Default value |
| ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `CAMUNDA_SECURITY_INITIALIZATION_AUTHORIZATIONS_0_OWNER_TYPE`    | The owner type to assign to this authorization.                                                                                    |               |
| `CAMUNDA_SECURITY_INITIALIZATION_AUTHORIZATIONS_0_OWNER_ID`      | The owner ID to assign to this authorization.                                                                                      |               |
| `CAMUNDA_SECURITY_INITIALIZATION_AUTHORIZATIONS_0_RESOURCE_TYPE` | The [resource type](/components/concepts/access-control/authorizations.md#available-resources) that this authorization applies to. |               |
| `CAMUNDA_SECURITY_INITIALIZATION_AUTHORIZATIONS_0_RESOURCE_ID`   | The resource ID that this authorization applies to.                                                                                |               |
| `CAMUNDA_SECURITY_INITIALIZATION_AUTHORIZATIONS_0_PERMISSIONS`   | Permissions to assign to this authorization. The available permissions vary by resource type.                                      |               |

### `CAMUNDA_SECURITY_INITIALIZATION_DEFAULTROLES`

| Property                                                             | Description                                  | Default value |
| -------------------------------------------------------------------- | -------------------------------------------- | ------------- |
| `CAMUNDA_SECURITY_INITIALIZATION_DEFAULTROLES_<ROLE>_CLIENTS_0`      | Clients assigned to the `<role>` role.       |               |
| `CAMUNDA_SECURITY_INITIALIZATION_DEFAULTROLES_<ROLE>_GROUPS_0`       | Groups assigned to the `<role>` role.        |               |
| `CAMUNDA_SECURITY_INITIALIZATION_DEFAULTROLES_<ROLE>_MAPPINGRULES_0` | Mapping rules assigned to the `<role>` role. |               |
| `CAMUNDA_SECURITY_INITIALIZATION_DEFAULTROLES_<ROLE>_USERS_0`        | Users assigned to the `<role>` role.         |               |

### `CAMUNDA_SECURITY_INITIALIZATION_MAPPINGRULES`

| Property                                                       | Description                                  | Default value |
| -------------------------------------------------------------- | -------------------------------------------- | ------------- |
| `CAMUNDA_SECURITY_INITIALIZATION_MAPPINGRULES_0_CLAIMNAME`     | The claim of the first mapping rule.         |               |
| `CAMUNDA_SECURITY_INITIALIZATION_MAPPINGRULES_0_CLAIMVALUE`    | The claim's value of the first mapping rule. |               |
| `CAMUNDA_SECURITY_INITIALIZATION_MAPPINGRULES_0_MAPPINGRULEID` | The id of the first mapping rule.            |               |

### `CAMUNDA_SECURITY_INITIALIZATION_USERS`

| Property                                           | Description                          | Default value |
| -------------------------------------------------- | ------------------------------------ | ------------- |
| `CAMUNDA_SECURITY_INITIALIZATION_USERS_0_EMAIL`    | The email address of the first user. |               |
| `CAMUNDA_SECURITY_INITIALIZATION_USERS_0_NAME`     | The name of the first user.          |               |
| `CAMUNDA_SECURITY_INITIALIZATION_USERS_0_PASSWORD` | The password of the first user.      |               |
| `CAMUNDA_SECURITY_INITIALIZATION_USERS_0_USERNAME` | The username of the first user.      |               |

### `CAMUNDA_SECURITY_MULTITENANCY`

| Property                                      | Description                                                                   | Default value |
| --------------------------------------------- | ----------------------------------------------------------------------------- | ------------- |
| `CAMUNDA_SECURITY_MULTITENANCY_APIENABLED`    | Enables the multi-tenancy API and UI independently from multi-tenancy checks. | `true`        |
| `CAMUNDA_SECURITY_MULTITENANCY_CHECKSENABLED` | Enables multi-tenancy checks. This requires the API to be protected.          | `false`       |

### `CAMUNDA_PERSISTENT_SESSIONS`

| Property                              | Description                                                                            | Default value |
| ------------------------------------- | -------------------------------------------------------------------------------------- | ------------- |
| `CAMUNDA_PERSISTENT_SESSIONS_ENABLED` | Stores session data in secondary storage so users stay logged in across cluster nodes. | `false`       |

### `SPRING_PROFILES`

| Property                 | Description                                                                                       | Default value       |
| ------------------------ | ------------------------------------------------------------------------------------------------- | ------------------- |
| `SPRING_PROFILES_ACTIVE` | **Note:** This property will be deprecated as additional authentication methods become available. | `consolidated-auth` | -->
