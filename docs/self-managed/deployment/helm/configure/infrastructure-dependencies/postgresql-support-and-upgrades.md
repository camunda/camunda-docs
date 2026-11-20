---
id: postgresql-support-and-upgrades
sidebar_label: PostgreSQL
title: PostgreSQL support and upgrades
description: Learn who is responsible for PostgreSQL, which versions Camunda supports, and what to check before a PostgreSQL upgrade.
---

Learn who is responsible for PostgreSQL, which versions Camunda supports, and what to check before you upgrade. This page applies to every PostgreSQL database that you use with Camunda 8 Self-Managed, whatever the deployment method.

:::caution Draft: pending product management review
<!-- TODO(PM): Review this page. Open questions are marked below. -->

Product management has not yet approved the policy statements about image patching and vulnerability handling on this page.
:::

## Understand the support scope

PostgreSQL is an open-source project and an external dependency of Camunda 8 Self-Managed. You are responsible for operating, upgrading, patching, and securing PostgreSQL, regardless of how you deploy it. Camunda supports the integration and configuration of PostgreSQL with Camunda 8.

For operational support, contact the project team or your managed service provider. For the CloudNativePG operator, use the [CloudNativePG](https://cloudnative-pg.io/) community channels.

PostgreSQL is used by:

- Management Identity and Camunda Hub. See [use external PostgreSQL](/self-managed/deployment/helm/configure/database/using-existing-postgres.md).
- Keycloak. See [Keycloak support, security fixes, and upgrades](/self-managed/deployment/helm/configure/authentication-and-authorization/keycloak-support-and-upgrades.md).
- The Orchestration Cluster, when you use an RDBMS as secondary storage. See [RDBMS configuration](/self-managed/concepts/databases/relational-db/configuration.md).

## Check supported versions

For the PostgreSQL versions that Camunda supports for each component, see [supported environments](/reference/supported-environments.md#component-requirements) and the [RDBMS support policy](/self-managed/concepts/databases/relational-db/rdbms-support-policy.md).

The RDBMS support policy sets these rules:

- Camunda supports the LTS versions that the vendor still supports.
- Camunda deprecates a version when vendor support has ended or ends within six months. Camunda can remove a deprecated version in a later minor release.
- Camunda announces deprecations and removals in the release notes.

## Choose a deployment method

| Method                     | Who operates it              | Notes                                                                                                                                                                                                                                                                                                                                                                                |
| -------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Managed PostgreSQL service | You and the service provider | Camunda supports PostgreSQL as a database engine, not individual managed service implementations. A managed service is supported when it is fully compatible with the supported PostgreSQL versions and the provider guarantees this compatibility. Provider-specific operational behavior is the responsibility of the provider. Camunda tests Amazon Aurora PostgreSQL explicitly. |
| CloudNativePG operator     | You                          | The [reference deployment](/self-managed/deployment/helm/configure/operator-based-infrastructure.md#postgresql-deployment) uses the `ghcr.io/cloudnative-pg/postgresql` image from the CloudNativePG project.                                                                                                                                                                        |

:::caution
<!-- TODO(PM): State who patches the PostgreSQL container image, which service-level agreement applies (if any), and how Camunda handles CVE reports about the PostgreSQL image. -->

This page does not state an SLA, an image patching commitment, or a vulnerability handling process for PostgreSQL images. Product management has not defined them yet.
:::

## Prepare a PostgreSQL upgrade

These steps are your responsibility. Camunda does not run or upgrade PostgreSQL for you.

1. Check that [supported environments](/reference/supported-environments.md#component-requirements) lists the target PostgreSQL version for each Camunda component that uses the database.
1. Back up the databases with the tools of your database vendor or service provider. The [Camunda backup guides](/self-managed/operational-guides/backup-restore/backup-and-restore.md) do not cover the Management Identity and Keycloak databases.
1. Read the upgrade documentation of your deployment method. For the CloudNativePG operator, see [PostgreSQL major version upgrades](https://cloudnative-pg.io/docs/1.30/postgres_upgrades/) and [rolling updates](https://cloudnative-pg.io/docs/1.30/rolling_update/).
1. Plan for a short interruption of database connections when the primary instance restarts.
1. Test the upgrade in a non-production environment first. After the upgrade, check that the Camunda components that use the database are healthy.
