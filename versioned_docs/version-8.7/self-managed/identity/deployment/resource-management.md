---
id: resource-management
title: "Resource management"
sidebar_label: "Resource management"
description: "Identity manages resources like users, groups, roles, and tenants. But where are they saved?"
---

Identity manages resources like users, groups, roles, and tenants. But where are they saved and how are they referenced?

| Identity resource             | Keycloak resource (and how it is filtered)      |
| ----------------------------- | ----------------------------------------------- |
| Application                   | Client (without authorization)                  |
| Application/permissions       | Client/Service Account roles                    |
| API                           | Client (with authorization)                     |
| API/permissions               | Client/Roles                                    |
| Role                          | Realm role (with attribute `camunda_role=true`) |
| Role/permissions              | Realm role/Associated role                      |
| Group                         | Group                                           |
| Group/Member                  | Group/Member                                    |
| Group/Authorization\*         | (not saved to Keycloak)                         |
| Group/Roles                   | Group/Role mapping                              |
| User                          | User                                            |
| User/Assigned role            | User/Role mapping                               |
| User/Authorization\*          | (not saved to Keycloak)                         |
| Tenant\*                      | (not saved to Keycloak)                         |
| Tenant/Assigned user\*        | (not saved to Keycloak)                         |
| Tenant/Assigned group\*       | (not saved to Keycloak)                         |
| Tenant/Assigned application\* | (not saved to Keycloak)                         |

\* This resource is only activated with the according feature flag.
