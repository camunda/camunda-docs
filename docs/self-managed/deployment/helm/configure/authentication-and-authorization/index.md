---
sidebar_label: Authentication and authorization
title: Helm chart authentication and authorization configuration
description: Learn how to configure authentication and authorization for Camunda 8 Self-Managed deployments using Helm chart.
---

Camunda 8 Self-Managed supports multiple authentication methods for securing access to components deployed with Helm charts. This section provides an overview of available authentication options and links to configuration guides for each method.

## Overview

By default, Camunda uses basic authentication with predefined demo users. For production or multi-user environments, you can configure Keycloak-based authentication, either through an internal Keycloak instance deployed with Camunda or an external OpenID Connect (OIDC) provider.

### Authentication options

| Method                                                   | Description                                                                                         | Recommended for                             |
| -------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| [Basic authentication](./basic-authentication.md)        | Default authentication with preconfigured demo users. No external identity provider (IdP) required. | Local development and testing               |
| [Internal Keycloak](./internal-keycloak.md)              | Deploys a managed Keycloak instance within the Helm release, preconfigured by Management Identity.  | Small teams or self-contained environments  |
| [External Keycloak](./using-external-keycloak.md)        | Connects Camunda to a separately deployed Keycloak instance for centralized identity management.    | Enterprise or production setups             |
| [Other OIDC providers](./connect-to-an-oidc-provider.md) | Integrates Camunda with external IdPs such as Microsoft Entra ID or Okta via OpenID Connect.        | Existing enterprise identity infrastructure |
