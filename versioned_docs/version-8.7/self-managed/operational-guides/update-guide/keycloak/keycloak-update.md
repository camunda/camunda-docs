---
id: keycloak-update
title: Update Keycloak
description: "Review what has to be taken into account when updating Keycloak."
---

When updating Keycloak, follow the [Keycloak upgrade guide](https://www.keycloak.org/docs/latest/upgrading/index.html) and refer to the [supported environments](reference/supported-environments.md#camunda-8-self-managed) to ensure compatibility with tested Keycloak versions.

:::danger
When updating Keycloak, ensure that you carry along its existing database.
**Do not** update by creating a new Keycloak instance and re-importing your users from external sources (e.g. LDAP) as this will result in new Keycloak-internal ids.
Otherwise, users may not be able to access their data (e.g. Optimize collections and [Web Modeler projects](self-managed/modeler/web-modeler/troubleshooting/troubleshoot-missing-data.md)).
:::
