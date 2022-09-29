---
id: starting-configuration
title: "Starting configuration"
sidebar_label: "Starting configuration"
---

The Identity component requires a set of base configurations to operate correctly. When Identity is started it will
create or update the following entities in Keycloak:

### Clients

| Name                             | ID                               | Access Type  | Service Accounts | Service Account Roles                                                 |
| -------------------------------- | -------------------------------- | ------------ | ---------------- | --------------------------------------------------------------------- |
| Identity                         | camunda-identity                 | confidential | enabled          | - Client ID: realm-management<br/>&nbsp;&nbsp;&nbsp;Role: realm-admin |
| Camunda Identity Resource Server | camunda-identity-resource-server | confidential | enabled          |                                                                       |

### Roles

| Name     | Composite | Composite Roles                                                                                                                                                               |
| -------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Identity | true      | - Client ID: camunda-identity-resource-server<br/>&nbsp;&nbsp;&nbsp;Role Name: read<br/> - Client ID: camunda-identity-resource-server<br/>&nbsp;&nbsp;&nbsp;Role Name: write |

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
