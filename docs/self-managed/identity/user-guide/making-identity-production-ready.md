---
id: making-identity-production-ready
title: "Making Identity production ready"
sidebar_label: "Making Identity production ready"
---

We recommend considering the following topics when moving Identity into a production environment.

## Keycloak dependency

As Keycloak is an external based dependency of the Identity application, we recommend looking at
[Keycloak - Production configuration](https://www.keycloak.org/server/configuration-production) to
make sure your Keycloak instance is production ready.

## Enabling TLS

A safe and healthy exchange of secure data requires Transport Layer Security (TLS).

TLS support for Identity can be enabled by setting configuration values,
visit [Spring - Configure SSL](https://docs.spring.io/spring-boot/docs/current/reference/html/howto.html#howto.webserver.configure-ssl)
for advice.

To enable TLS alongside Keycloak, visit the Keycloak documentation regarding [TLS enablement](https://www.keycloak.org/server/enabletls).
