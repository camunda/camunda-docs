---
id: making-identity-production-ready
title: "Making Identity production ready"
sidebar_label: "Making Identity production ready"
description: "Consider the following topics when moving Identity into a production environment."
---

We recommend considering the following topics when moving Identity into a production environment.

## Keycloak dependency

As Keycloak is an external-based dependency of Identity, we recommend looking at
[Keycloak's documentation on production configuration](https://www.keycloak.org/server/configuration-production) to
ensure your Keycloak instance is production-ready.

### Backing up

To ensure recovery is possible, we recommend regularly backing up the database supporting Keycloak.

#### Helm deployment

If you deployed Camunda 8 using our [Helm charts](/self-managed/setup/overview.md),
by default there will be a Postgres database deployed with it. In this instance, we recommend reading the
[Postgres documentation](https://www.postgresql.org/docs/current/backup.html) for guidance on backing up.

#### Alternative deployment

If your Keycloak service uses a different database provider than Postgres, we recommend
referencing the backup section of the documentation for your chosen provider and version.

## Enabling TLS

A safe and healthy exchange of secure data requires Transport Layer Security (TLS).

TLS support for Identity can be enabled by setting configuration values.
Visit [Spring - Configure SSL](https://docs.spring.io/spring-boot/docs/current/reference/html/howto.html#howto.webserver.configure-ssl)
for more information.

To enable TLS alongside Keycloak, visit the Keycloak documentation regarding [TLS enablement](https://www.keycloak.org/server/enabletls).

## Setting Identity URL

To ensure the authentication flows are successful, the `IDENTITY_URL` should be set to the URL of the Identity service.
