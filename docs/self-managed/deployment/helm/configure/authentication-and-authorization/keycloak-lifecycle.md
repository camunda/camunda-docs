---
id: keycloak-lifecycle
sidebar_label: Keycloak lifecycle
title: Manage the Keycloak lifecycle
description: Understand the Keycloak support scope, how the Keycloak project delivers security fixes, and what to check before you upgrade Keycloak.
---

Keycloak is an open-source project and an external dependency of Camunda 8 Self-Managed. Use this page to plan Keycloak updates and to understand who provides security fixes and support.

## Support scope

Keycloak is not a Camunda product. Camunda supports the **integration and configuration** of Keycloak with Camunda 8. Camunda does not provide operational support for Keycloak itself, and does not backport fixes to older Keycloak versions.

The Keycloak community project gives no long-term support for a specific version. If you need support for Keycloak itself or backported fixes for a specific version, use the [Red Hat build of Keycloak](https://access.redhat.com/products/red-hat-build-keycloak/). For its support periods, see the [Red Hat build of Keycloak life cycle](https://access.redhat.com/support/policy/updates/red_hat_build_of_keycloak_notes).

For the Keycloak versions that Camunda supports, see [supported environments](/reference/supported-environments.md).

## Security fixes

The Keycloak project fixes vulnerabilities only in the current `major.minor` release. For lower-severity vulnerabilities, the fix can come in the next `major.minor` release. The Keycloak project does not usually issue CVE fixes for experimental features. For details, see the [Keycloak security policy](https://github.com/keycloak/keycloak/blob/main/SECURITY.md#supported-versions).

As a result:

- Only the latest Keycloak patch release contains all available security fixes.
- Older Keycloak `major.minor` lines do not receive new fixes.
- A vulnerability scanner can report a CVE in your Keycloak image until you update to a Keycloak release that contains the fix.

To get security fixes, update Keycloak regularly to the latest patch release of the current Keycloak line.

### Camunda Keycloak images

Camunda provides Keycloak images that add Camunda-specific content, such as the Camunda Identity login theme and the AWS JDBC wrapper. The source is in the [camunda/keycloak](https://github.com/camunda/keycloak) repository.

- `docker.io/camunda/keycloak:quay-*` and `docker.io/camunda/keycloak:quay-optimized-*` use the official Keycloak image on Quay.io as their base.
- `registry.camunda.cloud/keycloak-ee/keycloak` uses the Bitnami Premium image as its base. This image is available to enterprise customers.

Camunda does not patch Keycloak or its dependencies. Camunda rebuilds these images when the base image publishes a new Keycloak release. For each Keycloak major version, Camunda rebuilds only the latest release. Tags for older Keycloak releases stay available, but do not receive updates.

:::warning Bitnami-based public images
The public Bitnami-based images (`docker.io/camunda/keycloak:bitnami-*` and the tags without a prefix, such as `26.3.3`) receive no updates, including security fixes. Migrate to a maintained image.
:::

Do not enable experimental Keycloak features in production. The Keycloak project does not usually issue CVE fixes for them.

## Before you upgrade Keycloak

A Keycloak upgrade changes the database schema. Keycloak does not support a database rollback. Prepare the upgrade with the following steps:

1. Read the [Keycloak upgrading guide](https://www.keycloak.org/docs/latest/upgrading/) and the release notes for each version between your current version and the target version.
1. Check that [supported environments](/reference/supported-environments.md) lists the target Keycloak version for your Camunda version.
1. Back up the Keycloak database. To roll back, you must restore the old Keycloak version and this database backup.
1. Back up your Keycloak configuration, custom themes, and custom providers.
1. Plan downtime for minor and major upgrades. You must stop all Keycloak nodes before Keycloak migrates the database. From Keycloak 26.6.0, rolling updates are possible for patch releases only. For details, see [Keycloak rolling updates](https://www.keycloak.org/server/update-compatibility).
1. Plan enough time for the database migration on large databases. For details, see the database migration section of the [Keycloak upgrading guide](https://www.keycloak.org/docs/latest/upgrading/).
1. If you use custom themes or providers, check that they work with the target Keycloak version.
1. Test the upgrade in a non-production environment first. After the upgrade, check that users can log in to the Camunda web applications and that Camunda components can get tokens from Keycloak.

If you deploy Keycloak with the Keycloak Operator, also follow the [Keycloak Operator documentation](https://www.keycloak.org/operator/installation) to upgrade the operator.
