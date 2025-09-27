---
title: Debugging the authentication flow
sidebar_label: Debugging the authentication flow
description: Learn how to understand unepxected authentication and authorization failures.
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

This page describes techniques how you can understand problems in the authentication and authorization flow of the Orchestration Cluster. You can use them to understand problems such as:

- Why can I not log into the web applications?
- Why does my search request return an empty result?

Conceptually, the authentication and authorization flow in the Orchestration Cluster consists of three steps:

1. Request authentication
   - Input: HTTP request
   - Output: Spring `Authentication` object that carries the user's identity
   - Layer: Spring Security
2. Establish Orchestration Cluster user context
   - Input: Spring `Authentication`
   - Output: `CamundaAuthentication` object that carries the user's groups/roles/tenant memberships etc
   - Layer: Orchestration Cluster authentication
3. Apply authorizations
   - Input: `CamundaAuthentication`
   - Output: Application data, based on applying authorizations according to the users memberships
   - Layer: Orchestration Cluster search layer and workflow engine

Each of these steps may either reject the user request or not grant access to the desired data. For example, if you use basic authentication and provide an incorrect username/password combination, then the request will fail in step 1. If your user cannot see data because they are not a member of the right role, the cause is in step 2. If your has all the right memberships but you haven't set the right authorizations yet, then the cause is in step 3.

You can use the following resources to understand where a request may fail:

- [Logs](#reviewing-logs)
- [Authorization-related data](#reviewing-data)
- [Configuration](#reviewing-configuration)

## Reviewing logs

To obtain debug logs for request authentication and authorization, set logging levels as follows:

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

With this, you can follow along how requests are handled and how the Spring Security filter chains determine if a request is authenticated or not.

## Reviewing data

To review the assignment of users and clients to roles/groups/tenants, as well as to check which authorizations are in place, you can use the [Identity UI](/components/identity/identity-introduction.md). If you do not have access to the API, you can also check the same data in the following Elasticsearch/Opensearch indexes:

- camunda-authorization
- camunda-group
- camunda-mapping-rule
- camunda-role
- camunda-tenant
- camunda-user
- camunda-web-session

## Reviewing configuration

To review the effective configuration of your Orchestration Cluster, you can call the [Spring Boot Actuator endpoint](https://docs.spring.io/spring-boot/reference/actuator/endpoints.html#actuator.endpoints) `<server>:<port>/actuator/configprops`. For example, with a Camunda 8 Run installation, this endpoint is accessible at `http://localhost:9600/actuator/configprops`. Note that the actuator port is different from the port of the Orchestration Cluster API and depending on your deployment setup may not be readily accessible for you.

Here is an excerpt of the result from an example installation:

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
    },
  ...
}
```

In the response, you can review the settings of the `camunda.security` section, compare them to our [configuration reference](../core-settings/configuration/properties.md#authentication), and check if they have the intended values. This can be useful if you are applying the configuration as Helm values or environment variables and you want to doublecheck that your configuration was applied correctly.
