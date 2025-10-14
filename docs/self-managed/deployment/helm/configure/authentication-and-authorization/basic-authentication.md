---
id: basic-authentication
sidebar_label: Basic authentication
title: Helm chart basic authentication setup
description: Learn how to configure and manage basic authentication for Camunda 8 Self-Managed deployments using Helm chart.
---

By default, Camunda 8 Self-Managed uses basic authentication for all components deployed through the Helm chart. This method requires no additional configuration and is ideal for local or development environments.

:::note
Because basic authentication is enabled by default, components that depend on Management Identity (implementing only OIDC/OAuth authentication) are disabled by default, which are:

- Management Identity
- Console
- Web Modeler
- Keycloak
- Optimize

Nevertheless, you can choose to enable them, which requires adding OIDC-specific properties, see TODO (guides here).
:::

### Default users

Two users are created by default:

| Username    | Password    | Role         | Description                                                                  |
| ----------- | ----------- | ------------ | ---------------------------------------------------------------------------- |
| `demo`      | `demo`      | `admin`      | Your initial administrative user                                             |
| `connector` | `connector` | `connectors` | Used by the Connectors component to connect to the Orchestration Cluster API |

See the [documentation on Orchestration Cluster Identity initialization](/self-managed/components/orchestration-cluster/identity/overview.md#option-3-configuration) for how to configure the initial users and their roles.

:::note Helm arrays
In Helm, arrays must be overwritten in full. If you change these configuration settings, keep in mind that the default array must be configured in your custom `values.yaml` if you want to keep those users and role assignments. For example, when adding the user `foo` or assigning roles to `foo`, keep also the values for the demo and connectors user.
:::

## Next steps

- To enable centralized authentication, see [Internal Keycloak](./internal-keycloak.md).
- To integrate with an external identity provider, see [External Keycloak](./using-external-keycloak.md) or [OIDC setup](./connect-to-an-oidc-provider.md).
