---
id: starting-configuration
title: "Starting configuration"
sidebar_label: "Starting configuration"
---

The Identity component requires a set of base configurations to operate correctly. The configuration created when Identity starts is:

| Name                             | Type        | Purpose                                                                                            |
| -------------------------------- | ----------- | -------------------------------------------------------------------------------------------------- |
| Identity                         | Application | To allow the Identity component to authenticate                                                    |
| Camunda Identity Resource Server | API         | To store the permissions related to the Identity component                                         |
| camunda-identity                 | Scope       | To augment access tokens requested for Camunda applications with email, full name, and permissions |
| Identity                         | Role        | To contain permissions for the Identity client allowing users access to the UI                     |

:::tip Connecting Identity to an existing Keycloak realm?
If you are connecting Identity to an existing Keycloak realm, the configuration listed above is created alongside your existing setup.
:::
