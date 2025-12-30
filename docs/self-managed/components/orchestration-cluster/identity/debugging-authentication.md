---
title: Debugging the authentication flow
sidebar_label: Debugging the authentication flow
description: "Learn how to troubleshoot unexpected authentication and authorization failures in the Orchestration Cluster. This guide explains how to debug issues in the a..."
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

- Step 1: Invalid credentials (for example, failed basic authentication).
- Step 2: Missing role or group memberships.
- Step 3: Authorizations not yet configured or missing.

To isolate the issue, use:

- [Reviewing logs](#reviewing-logs)
- [Reviewing data](#reviewing-data)
- [Reviewing configuration](#reviewing-configuration)

## Reviewing logs

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

## Reviewing data

To review the assignment of users and clients to roles, groups, or tenants—as well as which authorizations are in place—you can use the [Identity UI](/components/identity/identity-introduction.md).

If you do not have access to the API, you can also check the same data in the following Elasticsearch/OpenSearch indexes:

- `camunda-authorization`
- `camunda-group`
- `camunda-mapping-rule`
- `camunda-role`
- `camunda-tenant`
- `camunda-user`
- `camunda-web-session`

## Reviewing configuration

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
