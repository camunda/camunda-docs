---
id: making-identity-production-ready
title: "Prepare Identity for production"
sidebar_label: "Prepare Identity for production"
description: "Consider the following topics when moving Identity into a production environment."
---

When moving Identity to a production environment, you should consider the following.

## Keycloak dependency

As Keycloak is an external-based dependency of Identity, Camunda recommends looking at [Keycloak's documentation on production configuration](https://www.keycloak.org/server/configuration-production) to ensure your Keycloak instance is production-ready.

### Backing up

To ensure recovery is possible, Camunda recommends regularly backing up the database that supports Keycloak.

#### Helm deployment

If you deployed Camunda 8 using Camunda [Helm charts](/self-managed/setup/overview.md), by default there will be a Postgres database deployed with it. In this case, Camunda recommends reading the [Postgres documentation](https://www.postgresql.org/docs/current/backup.html) for guidance on backing up.

#### Alternative deployment

If your Keycloak service uses a different database provider than Postgres, Camunda recommends referencing the backup section of the documentation for your chosen provider and version.

## Enable TLS

A safe and healthy exchange of secure data requires Transport Layer Security (TLS).

- TLS support for Identity can be enabled by setting configuration values. Refer to [Spring - Configure SSL](https://docs.spring.io/spring-boot/docs/current/reference/html/howto.html#howto.webserver.configure-ssl) for more information.
- To enable TLS alongside Keycloak, refer to the Keycloak documentation regarding [TLS enablement](https://www.keycloak.org/server/enabletls).

## Setting Identity URL

To ensure authentication flows are successful, the `IDENTITY_URL` should be set to the URL of the Identity service.
