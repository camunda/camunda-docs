---
id: starting-configuration-for-identity
title: "Starting configuration for Identity"
sidebar_label: "Starting configuration"
description: "Understand the set of base configurations to operate Identity correctly."
---

Identity requires a set of base configurations to operate correctly. When Identity is started, it will
create or update the following entities in Keycloak:

## Clients

| Name                             | Client ID                        | Service accounts | Created/updated with component |
| -------------------------------- | -------------------------------- | ---------------- | ------------------------------ |
| Identity                         | camunda-identity                 | enabled          | All                            |
| Camunda Identity Resource Server | camunda-identity-resource-server | enabled          | All                            |
| Operate                          | operate                          | enabled          | Operate                        |
| Operate API                      | operate-api                      | enabled          | Operate                        |
| Optimize                         | optimize                         | enabled          | Optimize                       |
| Optimize API                     | optimize-api                     | enabled          | Optimize                       |
| Tasklist                         | tasklist                         | enabled          | Tasklist                       |
| Tasklist API                     | tasklist-api                     | enabled          | Tasklist                       |
| Web Modeler                      | web-modeler                      | disabled         | Web Modeler                    |
| Web Modeler API                  | web-modeler-api                  | enabled          | Web Modeler                    |

## Roles

| Name        | Created/updated with component |
| ----------- | ------------------------------ |
| Identity    | All                            |
| Operate     | Operate                        |
| Optimize    | Optimize                       |
| Tasklist    | Tasklist                       |
| Web Modeler | Web Modeler                    |

## Client scopes

| Name             | Protocol       | Description                                                                                                                                                                                            |
| ---------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| camunda-identity | openid-connect | A default client scope that contains mappers to augment the token generated with information required by the components of Camunda. Contains the mappers described in the [mappers](#mappers) section. |

## Mappers

| Name             | Protocol Mapper                   | Description                                                                                               |
| ---------------- | --------------------------------- | --------------------------------------------------------------------------------------------------------- |
| email            | oidc-usermodel-property-mapper    | Adds the email user attribute to the `access`, `ID`, and `user info` tokens using the claim name `email`. |
| full name        | oidc-full-name-mapper             | Adds the user's full name to the `access`, `ID`, and `user info` tokens.                                  |
| permissions      | oidc-usermodel-client-role-mapper | Adds the user's client roles to the `access` token with the claim name `permissions.${client_id}`.        |
| audience resolve | oidc-audience-resolve-mapper      | Adds the audiences the user has access to in the `audience` claim.                                        |
