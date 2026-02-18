---
id: keycloak-compatibility
sidebar_label: Keycloak compatibility
title: Keycloak compatibility considerations for Camunda
description: Review Keycloak upgrade considerations and compatibility requirements when used with Camunda.
---

When upgrading Keycloak in a Camunda Self-Managed environment, follow the official [Keycloak upgrade guide](https://www.keycloak.org/docs/latest/upgrading/index.html).

Before upgrading, review the Camunda [supported environments](reference/supported-environments.md#camunda-8-self-managed) to ensure the Keycloak version you plan to use is compatible with your Camunda release.

Keycloak upgrades can affect how users and permissions are resolved in Camunda components such as Optimize and Web Modeler. Review the following constraint carefully before proceeding.

:::danger Preserve the existing Keycloak database
When upgrading Keycloak, ensure that you reuse the existing Keycloak database.

**Do not** upgrade by creating a new Keycloak instance and re-importing users from external identity providers (for example, LDAP).

Doing so will generate new internal Keycloak IDs, which can prevent users from accessing existing data such as Optimize collections and [Web Modeler projects](self-managed/components/modeler/web-modeler/troubleshooting/troubleshoot-missing-data.md).
:::
