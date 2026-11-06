---
id: keycloak-support-and-upgrades
sidebar_label: Support and upgrades
title: Keycloak support, security fixes, and upgrades
description: Learn who is responsible for Keycloak, how Keycloak delivers security fixes, and what to check before a Keycloak upgrade.
---

Learn who is responsible for Keycloak, how Keycloak delivers security fixes, and what to check before you upgrade. This page applies to every Keycloak instance that you use with Camunda 8 Self-Managed, whatever the deployment method.

## Understand the support scope

Keycloak is an open-source project and an external dependency of Camunda 8 Self-Managed. You are responsible for operating, upgrading, patching, and securing Keycloak, regardless of how you deploy it. Camunda supports the integration and configuration of Keycloak with Camunda 8.

The Keycloak community project does not give long-term support for a specific version. If you need support for Keycloak itself or backported fixes for a specific version, use a commercial Keycloak distribution, for example the [Red Hat build of Keycloak](https://access.redhat.com/products/red-hat-build-keycloak/).

For the Keycloak versions that Camunda supports, see [supported environments](/reference/supported-environments.md).

## Understand Keycloak security fixes

The Keycloak project fixes vulnerabilities only in the current `major.minor` release. For lower-severity vulnerabilities, the fix can come in the next `major.minor` release. The Keycloak project does not usually issue CVE fixes for experimental features. For details, see the [Keycloak security policy](https://github.com/keycloak/keycloak/blob/main/SECURITY.md#supported-versions).

As a result:

- Only the latest Keycloak patch release contains all available security fixes.
- Older Keycloak `major.minor` lines do not receive new fixes.
- A vulnerability scanner can report a CVE in your Keycloak image until you update to a Keycloak release that contains the fix.

To get security fixes, update Keycloak regularly to the latest patch release of the current Keycloak line. Do not enable experimental Keycloak features in production.

## Choose a Camunda Keycloak image

Camunda provides Keycloak images that add Camunda-specific content, such as the Camunda Identity login theme and the AWS JDBC wrapper. The source is in the [camunda/keycloak](https://github.com/camunda/keycloak/blob/main/README.md) repository, which lists all tags.

| Image                                         | Base image                        | Tags                                                 |
| --------------------------------------------- | --------------------------------- | ---------------------------------------------------- |
| `docker.io/camunda/keycloak`                  | Official Keycloak image (Quay.io) | `quay-*`, `quay-optimized-*`, `latest`               |
| `registry.camunda.cloud/keycloak-ee/keycloak` | Bitnami Premium image             | `bitnami-ee-*`, and the same tags without the prefix |

The `registry.camunda.cloud/keycloak-ee/keycloak` image is available to enterprise customers. Availability of an image does not imply support for Keycloak itself.

These images depend on the Keycloak releases that the base image vendors publish. Bitnami only packages the Keycloak releases of the Keycloak community project. The vendors give no service-level agreement (SLA) and do not guarantee a fix for any vulnerability.

Camunda handles these images as follows:

| Camunda does                                                                             | Camunda does not                                                                             |
| ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Rebuild the images on a best-effort basis when the base image vendor publishes a release | Provide an SLA or patch guarantee for the images                                             |
| Rebuild only the latest release of each Keycloak major version                           | Patch Keycloak or its dependencies                                                           |
| Keep tags for older Keycloak releases available                                          | Update older tags or take responsibility for vulnerabilities in Keycloak or its dependencies |

### Bitnami-based public images

The public Bitnami-based `docker.io/camunda/keycloak` images receive no updates, including security fixes. These images use the `bitnami-*` tags, `latest-bitnami`, and the tags without a prefix, such as `26.3.3` and the `26.3.3-*` rebuild tags. `26.3.3` was the default image of the bundled `identityKeycloak` subchart in Camunda 8.7 to 8.9. For details, see [Notice 67](/reference/notices.md#notice-67).

To move to a maintained Keycloak, deploy it with the [Keycloak Operator](/self-managed/deployment/helm/configure/operator-based-infrastructure.md#keycloak-deployment). If you still use the bundled `identityKeycloak` subchart, see [migrate from Bitnami subcharts](/self-managed/deployment/helm/operational-tasks/migration-from-bitnami/index.md).

## Prepare a Keycloak upgrade

These steps are your responsibility. Camunda does not run or upgrade Keycloak for you.

A Keycloak upgrade changes the database schema. Keycloak does not support a database rollback. Prepare the upgrade with the following steps:

1. Read the [Keycloak upgrading guide](https://www.keycloak.org/docs/latest/upgrading/) and the release notes for each version between your current version and the target version.
1. Check that [supported environments](/reference/supported-environments.md) lists the target Keycloak version for your Camunda version.
1. Back up the Keycloak database. To roll back, you must restore the old Keycloak version and this database backup.
1. Back up your Keycloak configuration, custom themes, and custom providers.
1. Plan downtime for minor and major upgrades. You must stop all Keycloak nodes before Keycloak migrates the database.
1. For patch releases, use rolling updates if you run Keycloak 26.6.0 or later. For details, see [Keycloak rolling updates](https://www.keycloak.org/server/update-compatibility).
1. Plan enough time for the database migration on large databases, as described in the same upgrading guide.
1. If you use custom themes or providers, check that they work with the target Keycloak version.
1. Test the upgrade in a non-production environment first. After the upgrade, check that users can log in to the Camunda web applications and that Camunda components can get tokens from Keycloak.

If you deploy Keycloak with the Keycloak Operator, also follow the [Keycloak Operator documentation](https://www.keycloak.org/operator/installation) to upgrade the operator.
