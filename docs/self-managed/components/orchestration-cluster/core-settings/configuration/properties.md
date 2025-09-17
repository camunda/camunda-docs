---
id: properties
title: "All properties"
description: "Learn about the Identity configuration properties available in your Orchestration Cluster."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

As a Spring Boot application, the Orchestration Cluster supports standard
[Spring configuration](https://docs.spring.io/spring-boot/reference/features/external-config.html) methods.

The following configurations apply to all components within the Orchestration Cluster.

## Authentication

<!-- Updates must be made to ALL tables below. Tables are sorted alphabetically by property name. -->
<Tabs>
  <TabItem value="env" label="Environment variables" default>
  
| Environment variable                                            | Description                                                                                                                                                                                                                                                                                                              | Default value         |
|-----------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| --------------------- |
| `CAMUNDA_SECURITY_AUTHENTICATION_METHOD`                        | The authentication method to use. Options: `basic`, `oidc`.                                                                                                                                                                                                                                                              | `basic`               |
| `CAMUNDA_SECURITY_AUTHENTICATION_AUTHENTICATIONREFRESHINTERVAL` | The interval at which the memberships (groups, roles, tenants, component authorizations) are refreshed for logged in users. Find more details in [webserver and security](/self-managed/components/orchestration-cluster/core-settings/configuration/webserver.md#propagation-of-membership-changes-to-active-sessions). | `PT30S`               |
| `CAMUNDA_SECURITY_AUTHENTICATION_UNPROTECTEDAPI`                | If the API can be used without authentication.                                                                                                                                                                                                                                                                           | `false`               |
| `CAMUNDA_SECURITY_AUTHORIZATIONS_ENABLED`                       | If authorizations are enabled.                                                                                                                                                                                                                                                                                           | `true`                |
| `CAMUNDA_SECURITY_IDVALIDATIONPATTERN`                          | A Java regular expression that validates the user-defined identifiers of Identity-related entities.                                                                                                                                                                                                                      | `^[a-zA-Z0-9_~@.+-]+$`|
| `CAMUNDA_PERSISTENT_SESSIONS_ENABLED`                           | Stores session data in secondary storage so users stay logged in across cluster nodes.                                                                                                                                                                                                                                   | `true`                |
| `SPRING_PROFILES_ACTIVE`                                        | **Note:** This property will be deprecated as additional authentication methods become available.                                                                                                                                                                                                                        | `consolidated-auth`   |

  </TabItem>
  <TabItem value="application.yaml" label="application.yaml">

| Application.yaml property                                         | Description                                                                                                                                                                                                                                                                                                              | Default value         |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------- |
| `camunda.security.authentication.method`                          | The authentication method to use. Options: `basic`, `oidc`.                                                                                                                                                                                                                                                              | `basic`               |
| `camunda.security.authentication.authentication-refresh-interval` | The interval at which the memberships (groups, roles, tenants, component authorizations) are refreshed for logged in users. Find more details in [webserver and security](/self-managed/components/orchestration-cluster/core-settings/configuration/webserver.md#propagation-of-membership-changes-to-active-sessions). | `PT30S`               |
| `camunda.security.authentication.unprotected-api`                 | If the API can be used without authentication.                                                                                                                                                                                                                                                                           | `false`               |
| `camunda.security.authorizations.enabled`                         | If authorizations are enabled.                                                                                                                                                                                                                                                                                           | `true`                |
| `camunda.security.id-validation-pattern`                          | A Java regular expression that validates the user-defined identifiers of Identity-related entities.                                                                                                                                                                                                                      | `^[a-zA-Z0-9_@.+-]+$` |
| `camunda.persistent.sessions.enabled`                             | Stores session data in secondary storage so users stay logged in across cluster nodes.                                                                                                                                                                                                                                   | `true`                |
| `spring.profiles.active`                                          | **Note:** This property will be deprecated as additional authentication methods become available.                                                                                                                                                                                                                        | `consolidated-auth`   |

  </TabItem>
  <TabItem value="helm" label="Helm values">

| Helm value key                                                        | Description                                                                                                                                                                                                                                                                                                              | Default value |
| --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| `orchestration.security.authentication.method`                        | The authentication method to use. Options: `basic`, `oidc`.                                                                                                                                                                                                                                                              | `basic`       |
| `orchestration.security.authentication.authenticationRefreshInterval` | The interval at which the memberships (groups, roles, tenants, component authorizations) are refreshed for logged in users. Find more details in [webserver and security](/self-managed/components/orchestration-cluster/core-settings/configuration/webserver.md#propagation-of-membership-changes-to-active-sessions). | `PT30S`       |
| `orchestration.security.authentication.unprotectedApi`                | If the API can be used without authentication.                                                                                                                                                                                                                                                                           | `false`       |
| `orchestration.security.authorizations.enabled`                       | If authorizations are enabled.                                                                                                                                                                                                                                                                                           | `true`        |
| `global.persistent.sessions.enabled`                                  | Stores session data in secondary storage so users stay logged in across cluster nodes.                                                                                                                                                                                                                                   | `true`        |

  </TabItem>
</Tabs>

## Multi-Tenancy

<Tabs>
  <TabItem value="env" label="Environment variables" default>
  
| Environment variable                                            | Description                                                                    | Default value |
|-----------------------------------------------------------------|------------------------------------------------------------------------------- | ------------- |
| `CAMUNDA_SECURITY_MULTITENANCY_CHECKSENABLED`                   | Enables multi-tenancy checks. This requires the API to be protected.           | `false`       |
| `CAMUNDA_SECURITY_MULTITENANCY_APIENABLED`                      | Enables the multi-tenancy API and UI independently from multi-tenancy checks.  | `true`        |

  </TabItem>
  <TabItem value="application.yaml" label="application.yaml">

| Application.yaml property                       | Description                                                                   | Default value |
| ----------------------------------------------- | ----------------------------------------------------------------------------- | ------------- |
| `camunda.security.multi-tenancy.checks-enabled` | Enables multi-tenancy checks. This requires the API to be protected.          | `false`       |
| `camunda.security.multi-tenancy.api-enabled`    | Enables the multi-tenancy API and UI independently from multi-tenancy checks. | `true`        |

  </TabItem>
  <TabItem value="helm" label="Helm values">

| Helm value key                                      | Description                                                                   | Default value |
| --------------------------------------------------- | ----------------------------------------------------------------------------- | ------------- |
| `orchestration.security.multiTenancy.checksEnabled` | Enables multi-tenancy checks. This requires the API to be protected.          | `false`       |
| `orchestration.security.multiTenancy.apiEnabled`    | Enables the multi-tenancy API and UI independently from multi-tenancy checks. | `true`        |

  </TabItem>
</Tabs>

## Initialization

The following variables are used to set the identifier pattern of Identity-related entities and initialize users and mapping rules.

<Tabs>
  <TabItem value="init-env" label="Environment variables" default>

| Environment variable                                                  | Description                                  | Default value |
| --------------------------------------------------------------------- | -------------------------------------------- | ------------- |
| `CAMUNDA_SECURITY_INITIALIZATION_USERS[0]_USERNAME`                   | The username of the first user.              |               |
| `CAMUNDA_SECURITY_INITIALIZATION_USERS[0]_PASSWORD`                   | The password of the first user.              |               |
| `CAMUNDA_SECURITY_INITIALIZATION_USERS[0]_NAME`                       | The name of the first user.                  |               |
| `CAMUNDA_SECURITY_INITIALIZATION_USERS[0]_EMAIL`                      | The email address of the first user.         |               |
| `CAMUNDA_SECURITY_INITIALIZATION_MAPPINGRULES[0]_MAPPINGRULEID`       | The id of the first mapping rule.            |               |
| `CAMUNDA_SECURITY_INITIALIZATION_MAPPINGRULES[0]_CLAIMNAME`           | The claim of the first mapping rule.         |               |
| `CAMUNDA_SECURITY_INITIALIZATION_MAPPINGRULES[0]_CLAIMVALUE`          | The claim's value of the first mapping rule. |               |
| `CAMUNDA_SECURITY_INITIALIZATION_DEFAULTROLES_<role>_USERS[0]`        | Users assigned to the `<role>` role.         |               |
| `CAMUNDA_SECURITY_INITIALIZATION_DEFAULTROLES_<role>_GROUPS[0]`       | Groups assigned to the `<role>` role.        |               |
| `CAMUNDA_SECURITY_INITIALIZATION_DEFAULTROLES_<role>_CLIENTS[0]`      | Clients assigned to the `<role>` role.       |               |
| `CAMUNDA_SECURITY_INITIALIZATION_DEFAULTROLES_<role>_MAPPINGRULES[0]` | Mapping rules assigned to the `<role>` role. |               |

  </TabItem>
  <TabItem value="init-yaml" label="application.yaml">

| Application.yaml property                                              | Description                                  | Default value |
| ---------------------------------------------------------------------- | -------------------------------------------- | ------------- |
| `camunda.security.initialization.users[0].username`                    | The username of the first user.              |               |
| `camunda.security.initialization.users[0].password`                    | The password of the first user.              |               |
| `camunda.security.initialization.users[0].name`                        | The name of the first user.                  |               |
| `camunda.security.initialization.users[0].email`                       | The email address of the first user.         |               |
| `camunda.security.initialization.mappingrules[0].mapping-rule-id`      | The id of the first mapping rule.            |               |
| `camunda.security.initialization.mappingrules[0].claim-name`           | The claim of the first mapping rule.         |               |
| `camunda.security.initialization.mappingrules[0].claim-value`          | The claim's value of the first mapping rule. |               |
| `camunda.security.initialization.default-roles.<role>.users[0]`        | Users assigned to the `<role>` role.         |               |
| `camunda.security.initialization.default-roles.<role>.groups[0]`       | Groups assigned to the `<role>` role.        |               |
| `camunda.security.initialization.default-roles.<role>.clients[0]`      | Clients assigned to the `<role>` role.       |               |
| `camunda.security.initialization.default-roles.<role>.mappingrules[0]` | Mapping rules assigned to the `<role>` role. |               |

  </TabItem>
  <TabItem value="init-helm" label="Helm values">

| Helm value key                                       | Description                                                                          | Default value |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------ | ------------- |
| `orchestration.security.initialization.users`        | List of users to initialize (each with username, password, name, email).             |               |
| `orchestration.security.initialization.mappingRules` | List of mapping rule to initialize (each with mappingRuleId, claimName, claimValue). |               |

  </TabItem>
</Tabs>

## OIDC Configuration

The following variables are used when `oidc` is selected as the authentication method.

<Tabs>
  <TabItem value="oidc-env" label="Environment variables" default>

| Environment variable                                    | Description                                                      | Default value                        |
| ------------------------------------------------------- | ---------------------------------------------------------------- | ------------------------------------ |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_CLIENTID`         | The client ID for OIDC authentication.                           |                                      |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_CLIENTSECRET`     | The client secret for OIDC authentication.                       |                                      |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_ISSUERURI`        | The issuer URI for OIDC authentication.                          |                                      |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_REDIRECTURI`      | The redirect URI for OIDC authentication.                        | `http://localhost:8080/sso-callback` |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_USERNAMECLAIM`    | The claim to use for the username in OIDC authentication.        | `sub`                                |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_GROUPSCLAIM`      | The claim to use for groups in OIDC authentication.              |                                      |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_CLIENTIDCLAIM`    | The claim to use for clients in OIDC authentication.             |                                      |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_AUDIENCES`        | Comma-separated list of audiences to validate in the OIDC token. |                                      |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_SCOPE`            | Comma-separated list of scopes to request in the OIDC token.     | `openid, profile`                    |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_JWKSETURI`        | The authorization server’s JWK Set Uri can be configured.        |                                      |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_AUTHORIZATIONURI` | The authorization server’s Authorization Uri can be configured.  |                                      |
| `CAMUNDA_SECURITY_AUTHENTICATION_OIDC_TOKENURI`         | The authorization server’s Token Uri can be configured.          |                                      |

  </TabItem>
  <TabItem value="oidc-yaml" label="application.yaml">

| Application.yaml property                                | Description                                                      | Default value                        |
| -------------------------------------------------------- | ---------------------------------------------------------------- | ------------------------------------ |
| `camunda.security.authentication.oidc.client-id`         | The client ID for OIDC authentication.                           |                                      |
| `camunda.security.authentication.oidc.client-secret`     | The client secret for OIDC authentication.                       |                                      |
| `camunda.security.authentication.oidc.issuer-uri`        | The issuer URI for OIDC authentication.                          |                                      |
| `camunda.security.authentication.oidc.redirect-uri`      | The redirect URI for OIDC authentication.                        | `http://localhost:8080/sso-callback` |
| `camunda.security.authentication.oidc.username-claim`    | The claim to use for the username in OIDC authentication.        | `sub`                                |
| `camunda.security.authentication.oidc.groups-claim`      | The claim to use for groups in OIDC authentication.              |                                      |
| `camunda.security.authentication.oidc.client-id-claim`   | The claim to use for clients in OIDC authentication.             |                                      |
| `camunda.security.authentication.oidc.audiences`         | Comma-separated list of audiences to validate in the OIDC token. |                                      |
| `camunda.security.authentication.oidc.scope`             | Comma-separated list of scopes to request in the OIDC token.     | `openid, profile`                    |
| `camunda.security.authentication.oidc.jwk-set-uri`       | The authorization server’s JWK Set Uri.                          |                                      |
| `camunda.security.authentication.oidc.authorization-uri` | The authorization server’s Authorization Uri.                    |                                      |
| `camunda.security.authentication.oidc.token-uri`         | The authorization server’s Token Uri.                            |                                      |

  </TabItem>
  <TabItem value="oidc-helm" label="Helm values">

| Helm value key                                             | Description                                                      | Default value                        |
| ---------------------------------------------------------- | ---------------------------------------------------------------- | ------------------------------------ |
| `orchestration.security.authentication.oidc.clientId`      | The client ID for OIDC authentication.                           |                                      |
| `orchestration.security.authentication.oidc.clientSecret`  | The client secret for OIDC authentication.                       |                                      |
| `orchestration.security.authentication.oidc.issuerUri`     | The issuer URI for OIDC authentication.                          |                                      |
| `orchestration.security.authentication.oidc.redirectUri`   | The redirect URI for OIDC authentication.                        | `http://localhost:8080/sso-callback` |
| `orchestration.security.authentication.oidc.userNameClaim` | The claim to use for the username in OIDC authentication.        | `sub`                                |
| `orchestration.security.authentication.oidc.groupsClaim`   | The claim to use for groups in OIDC authentication.              |                                      |
| `orchestration.security.authentication.oidc.audiences`     | Comma-separated list of audiences to validate in the OIDC token. |                                      |

  </TabItem>
</Tabs>

## HTTP Security Headers

The HTTP security headers mechanism allows you to add response headers that enable browser-side protections against common web vulnerabilities. Each header addresses a specific security concern and can be configured independently.

<Tabs>
  <TabItem value="headers-env" label="Environment variables" default>

| Environment variable                                                      | Description                                                                                                                                                      | Related Header                                                                                                                                                                                                                                           | Default value                     |
| ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| `CAMUNDA_SECURITY_HTTP_HEADERS_CACHE_CONTROL_ENABLED`                     | Enables or disables cache prevention headers. Default values: `Cache-Control: no-cache, no-store, max-age=0, must-revalidate`, `Pragma: no-cache`, `Expires: 0`. | [`Cache-Control`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control), [`Pragma`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Pragma), [`Expires`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Expires) | `true`                            |
| `CAMUNDA_SECURITY_HTTP_HEADERS_CONTENT_SECURITY_POLICY_ENABLED`           | Enables or disables CSP headers.                                                                                                                                 | [`Content-Security-Policy`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy)                                                                                                                                           | `true`                            |
| `CAMUNDA_SECURITY_HTTP_HEADERS_CONTENT_SECURITY_POLICY_POLICY_DIRECTIVES` | Custom CSP directives. If not set, [default values applied](#default-content-security-policy). If set, overrides default CSP policies.                           | [`Content-Security-Policy`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy)                                                                                                                                           |                                   |
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

  </TabItem>
  <TabItem value="headers-yaml" label="application.yaml">

| Application.yaml property                                                 | Description                                                                                                                                                      | Related Header                                                                                                                                                                                                                                           | Default value                     |
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

  </TabItem>
  <TabItem value="headers-helm" label="Helm values">

| Helm value key                                                              | Description                                                                                                                                                      | Related Header                                                                                                                                                                                                                                           | Default value                     |
| --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| `orchestration.security.httpHeaders.cacheControl.enabled`                   | Enables or disables cache prevention headers. Default values: `Cache-Control: no-cache, no-store, max-age=0, must-revalidate`, `Pragma: no-cache`, `Expires: 0`. | [`Cache-Control`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control), [`Pragma`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Pragma), [`Expires`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Expires) | `true`                            |
| `orchestration.security.httpHeaders.contentSecurityPolicy.enabled`          | Enables or disables CSP headers.                                                                                                                                 | [`Content-Security-Policy`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy)                                                                                                                                           | `true`                            |
| `orchestration.security.httpHeaders.contentSecurityPolicy.policyDirectives` | Custom CSP directives. If not set, [default values applied](#default-content-security-policy). If set, overrides default CSP policies.                           | [`Content-Security-Policy`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy)                                                                                                                                           |                                   |
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

  </TabItem>
</Tabs>

### Default Content Security Policy

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

## CSRF Protection

The following variables are used to configure [Cross-Site Request Forgery (CSRF)](/self-managed/components/orchestration-cluster/core-settings/configuration/csrf-protection.md) protection.
The CSRF protection only applies in the context of a session-based authentication. You don't need to provide
CSRF tokens when using OIDC or Basic authentication methods.

<Tabs>
  <TabItem value="csrf-env" label="Environment variables" default>

| Environment variable            | Description                          | Default value |
| ------------------------------- | ------------------------------------ | ------------- |
| `CAMUNDA_SECURITY_CSRF_ENABLED` | Enables or disables CSRF protection. | `true`        |

  </TabItem>
  <TabItem value="csrf-yaml" label="application.yaml">

| Application.yaml property       | Description                          | Default value |
| ------------------------------- | ------------------------------------ | ------------- |
| `camunda.security.csrf.enabled` | Enables or disables CSRF protection. | `true`        |

  </TabItem>
  <TabItem value="csrf-helm" label="Helm values">

| Helm value key                        | Description                          | Default value |
| ------------------------------------- | ------------------------------------ | ------------- |
| `orchestration.security.csrf.enabled` | Enables or disables CSRF protection. | `true`        |

  </TabItem>
</Tabs>

:::caution
Disabling CSRF protection is not recommended for production environments as it leaves your application vulnerable to cross-site request forgery attacks.
:::
