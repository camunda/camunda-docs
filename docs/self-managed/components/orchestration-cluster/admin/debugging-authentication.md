---
title: Debugging the authentication flow
sidebar_label: Debugging the authentication flow
description: Learn how to troubleshoot unexpected authentication and authorization failures in the Orchestration Cluster.
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

This guide explains how to debug issues in the **authentication and authorization flow** of the Orchestration Cluster.  
These techniques help identify where and why access may be denied or restricted.

Common questions you can answer with these steps:

- Why can’t I log into the web applications?
- Why does my search request return empty results?

The flow consists of three key steps:

1. **Request authentication**
   - **Input:** HTTP request
   - **Output:** Spring `Authentication` object with user identity
   - **Layer:** Spring Security

2. **Establish Orchestration Cluster user context**
   - **Input:** Spring `Authentication`
   - **Output:** `CamundaAuthentication` object with roles, groups, and tenant memberships
   - **Layer:** Orchestration Cluster authentication

3. **Apply authorizations**
   - **Input:** `CamundaAuthentication`
   - **Output:** Application data, filtered by authorizations
   - **Layer:** Orchestration Cluster search and workflow engine

Typical failure points:

- Step 1: Invalid credentials (for example, failed Basic authentication).
- Step 2: Missing role or group memberships.
- Step 3: Authorizations not yet configured or missing.

To isolate the issue, use:

- [Review logs](#review-logs)
- [Review data](#review-data)
- [Review configuration](#review-configuration)
- [Inspect the JWT](#inspect-the-jwt)
- [Test the IdP directly](#test-the-idp-directly)

## Review logs

Enable detailed logging to trace authentication decisions:

<Tabs groupId="optionsType" defaultValue="env" queryString values={[{label: 'Application.yaml', value: 'yaml' }, {label: 'Environment variables', value: 'env' }]}>
<TabItem value="yaml">

```yaml
logging.level:
  org.springframework.security: TRACE
  io.camunda:
    authentication: DEBUG
    security: DEBUG
```

</TabItem>

<TabItem value="env">

```
LOGGING_LEVEL_ORG_SPRINGFRAMEWORK_SECURITY=TRACE
LOGGING_LEVEL_IO_CAMUNDA_AUTHENTICATION=DEBUG
LOGGING_LEVEL_IO_CAMUNDA_SECURITY=DEBUG
```

</TabItem>

</Tabs>

With these settings, you can trace request handling and how Spring Security filter chains determine authentication outcomes.

## Review data

To review the assignment of users and clients to roles, groups, or tenants—as well as which authorizations are in place—you can use the [Admin UI](/components/admin/admin-introduction.md).

If you do not have access to the API, you can also check the same data in the following Elasticsearch/OpenSearch indexes:

- `camunda-authorization`
- `camunda-group`
- `camunda-mapping-rule`
- `camunda-role`
- `camunda-tenant`
- `camunda-user`
- `camunda-web-session`

## Review configuration

To review the effective configuration of your Orchestration Cluster, you can call the [Spring Boot Actuator endpoint](https://docs.spring.io/spring-boot/reference/actuator/endpoints.html#actuator.endpoints) at:

```
<server>:<port>/actuator/configprops
```

For example, with a Camunda 8 Run installation, this endpoint is available at `http://localhost:9600/actuator/configprops`.

In other setups, replace `http://localhost:9600` with the URL to your Orchestration Cluster's actuator port and endpoint. Note that the actuator port differs from the Orchestration Cluster API port and may not always be accessible, depending on your deployment setup.

Here is an excerpt from an example installation:

```json
{
  ...
  "camunda.security-io.camunda.application.commons.security.CamundaSecurityConfiguration$CamundaSecurityProperties": {
    "prefix": "camunda.security",
    "properties": {
      ...
      "authentication": {
        "method": "OIDC",
        "authenticationRefreshInterval": "PT30S",
        "unprotectedApi": false,
        "oidc": {
          "issuerUri": "https://myoidcprovider.example.com",
          "clientId": "my-oidc-client",
          "clientSecret": "******",
          "grantType": "authorization_code",
          "redirectUri": "http://localhost:8080/sso-callback",
          "scope": [
            "openid",
            "profile"
          ],
          "usernameClaim": "preferred_username",
          "clientIdClaim": "oid",
          "authorizeRequest": {}
        }
      }
      ...
    }
  }
}
```

In the response, review the settings in the `camunda.security` section, compare them against the [configuration reference](../core-settings/configuration/properties.md#authentication), and confirm they match your intended values.

This is especially useful if you are applying the configuration via Helm values or environment variables and want to double-check that your configuration was applied correctly.

## Inspect the JWT

Most "insufficient permissions" or "empty results" issues at step 2 or 3 of the flow trace back to a mismatch between what's in the access token and what Camunda expects.

Decode the token presented to the Orchestration Cluster and check:

- Confirm the claim configured as `usernameClaim` or `clientIdClaim` is present and has the value you expect.
- Compare any claims your mapping rules match against with the claim name and value configured on each [mapping rule](/components/admin/mapping-rules.md). A wrong claim name, unexpected casing, or incorrect operator for an array claim can prevent a mapping rule from granting the expected role, group, or tenant.
- Confirm the `aud` claim matches the `audience` configured for that client.

## Test the IdP directly

To determine whether a failure originates at your identity provider or within Camunda, request a token directly from the IdP, bypassing Camunda entirely:

```bash
curl -X POST '<token-endpoint>' \
  -d 'client_id=<client-id>' \
  -d 'client_secret=<client-secret>' \
  -d 'grant_type=client_credentials' \
  -d 'scope=openid'
```

- If the request fails or returns an error, investigate the IdP configuration, grant type, network, or firewall. The problem isn't specific to Camunda.
- If the request succeeds, decode the returned token as described in [inspect the JWT](#inspect-the-jwt) and confirm it contains the claims Camunda expects. If the token contains the expected claims but Camunda still rejects the request, check Camunda's authorization configuration, including mapping rules, roles, and authorizations.

For interactive browser logins, complete the login flow directly on your IdP's hosted login page before troubleshooting Camunda. This confirms whether the user can authenticate with the IdP.
