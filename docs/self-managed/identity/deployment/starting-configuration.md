---
id: starting-configuration
title: "Starting configuration"
sidebar_label: "Starting configuration"
---

The Identity component requires a set of base configurations to operate correctly. When Identity is started it will
create or update the following entities in Keycloak:

### Clients

| Name                             | ID                               | Access Type  | Service Accounts | Service Account Roles                                                 | Condition                                                             |
| -------------------------------- | -------------------------------- | ------------ | ---------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Identity                         | camunda-identity                 | confidential | enabled          | - Client ID: realm-management<br/>&nbsp;&nbsp;&nbsp;Role: realm-admin | Always created or updated                                             |
| Camunda Identity Resource Server | camunda-identity-resource-server | confidential | enabled          |                                                                       | Always created or updated                                             |
| Operate                          | operate                          | confidential | enabled          |                                                                       | Only when `KEYCLOAK_INIT_OPERATE...` environment variables are set    |
| Operate API                      | operate-api                      | confidential | enabled          |                                                                       | Only when `KEYCLOAK_INIT_OPERATE...` environment variables are set    |
| Optimize                         | optimize                         | confidentail | enabled          |                                                                       | Only when `KEYCLOAK_INIT_OPTIMIZE...` environment variables are set   |
| Optimize API                     | optimize-api                     | confidential | enabled          |                                                                       | Only when `KEYCLOAK_INIT_OPTIMIZE...` environment variables are set   |
| Tasklist                         | tasklist                         | confidential | enabled          |                                                                       | Only when `KEYCLOAK_INIT_TASKLIST...` environment variables are set   |
| Tasklist API                     | tasklist-api                     | confidential | enabled          |                                                                       | Only when `KEYCLOAK_INIT_TASKLIST...` environment variables are set   |
| Web Modeler                      | web-modeler                      | public       | false            |                                                                       | Only when `KEYCLOAK_INIT_WEBMODELER...` environment variables are set |
| Web Modeler API                  | web-modeler-api                  | confidential | enabled          |                                                                       | Only when `KEYCLOAK_INIT_WEBMODELER...` environment variables are set |

### Roles

| Name        | Composite | Composite Roles                                                                                                                                                               | Condition                                                           |
| ----------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| Identity    | true      | - Client ID: camunda-identity-resource-server<br/>&nbsp;&nbsp;&nbsp;Role Name: read<br/> - Client ID: camunda-identity-resource-server<br/>&nbsp;&nbsp;&nbsp;Role Name: write | Always created or updated                                           |
| Operate     | true      | - Client ID: operate-api<br/>&nbsp;&nbsp;&nbsp;Role Name: read:\* <br/> - Client ID: operate-api<br/>&nbsp;&nbsp;&nbsp;Role Name: write:\*                                    | Only when `KEYCLOAK_INIT_OPERATE...` environment variables are set  |
| Optimize    | true      | - Client ID: optimize-api<br/>&nbsp;&nbsp;&nbsp;Role Name: write:\*                                                                                                           | Only when `KEYCLOAK_INIT_OPTIMIZE...` environment variables are set |
| Tasklist    | true      | - Client ID: tasklist-api<br/>&nbsp;&nbsp;&nbsp;Role Name: read:\* <br/> - Client ID: tasklist-api<br/>&nbsp;&nbsp;&nbsp;Role Name: write:\*                                  | Only when `KEYCLOAK_INIT_TASKLIST...` environment variables are set |
| Web Modeler | true      | - Client ID: web-modeler-api<br/>&nbsp;&nbsp;&nbsp;Role Name: write:\* <br/> - Client ID: camunda-identity-resource-server<br/>&nbsp;&nbsp;&nbsp;Role Name: read:users        | Only when `KEYCLOAK_INIT_OPERATE...` environment variables are set  |

### Client Scopes

| Name             | Protocol       | Attributes                                                                 | Mappers                                                  |
| ---------------- | -------------- | -------------------------------------------------------------------------- | -------------------------------------------------------- |
| camunda-identity | openid-connect | - include.in.token.scope = false <br/> - display.on.consent.screen = false | email<br/>full name<br/>permissions<br/>audience resolve |

### Mappers

| Name             | Protocol Mapper                   | Config                                                                                                                                |
| ---------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| email            | oidc-usermodel-property-mapper    | userinfo.token.claim = true<br/>user.attribute = email<br/>id.token.claim = true<br/>access.token.claim = true<br/>claim.name = email |
| full name        | oidc-full-name-mapper             | id.token.claim = true<br/>access.token.claim = true<br/>userinfo.token.claim = true                                                   |
| permissions      | oidc-usermodel-client-role-mapper | access.token.claim = true<br/>claim.name = permissions.${client_id}<br/>                                                              |
| audience resolve | oidc-audience-resolve-mapper      |                                                                                                                                       |
