---
id: identity
title: "Authentication"
description: "Configure how Camunda Hub authenticates users, and connect Camunda Hub to an OIDC provider other than Keycloak."
---

Camunda Hub authenticates users with OpenID Connect (OIDC).

## Authentication and user management

Camunda Hub authenticates users with its own properties (see [Identity / Keycloak](./properties.md#identity--keycloak)), while Management Identity keeps managing users and their access. For how the responsibilities are split, see [management and modeling component authentication](/self-managed/concepts/authentication/authentication-to-management-components.md#authentication-and-user-management).

Management Identity is still required for Camunda Hub in 8.10. For more information, see [manage access and permissions](/self-managed/components/management-identity/access-management/access-management-overview.md).

## Configure OIDC authentication

Configure Camunda Hub's OIDC authentication with the properties documented under [Identity / Keycloak](./properties.md#identity--keycloak), not with the Orchestration Cluster's `camunda.security.authentication.oidc.*` settings. For the one exception, the username claim, see the same section.

## Use a different OIDC provider than Keycloak

By default, Camunda Hub uses Keycloak as its identity provider. With Helm, you deploy Keycloak with the [Keycloak operator](/self-managed/deployment/helm/configure/operator-based-infrastructure.md#keycloak-deployment). To use a different OIDC provider, follow the steps in the [OIDC connection guide](/self-managed/components/management-identity/configuration/connect-to-an-oidc-provider.md).
