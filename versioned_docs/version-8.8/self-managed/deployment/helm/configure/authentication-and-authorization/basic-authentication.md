---
id: basic-authentication
sidebar_label: Basic authentication
title: Helm chart basic authentication setup
description: Learn how to configure and manage basic authentication for Camunda 8 Self-Managed deployments using Helm chart.
---

By default, Camunda 8 Self-Managed uses basic authentication for all components deployed through the Helm chart. This method requires no additional configuration and is ideal for local or development environments.

:::note
Because basic authentication is enabled by default, components that depend on Management Identity (which implements OIDC/OAuth authentication) are disabled by default. These components include:

- Management Identity
- Console
- Web Modeler
- Keycloak
- Optimize
  :::

### Default users

Two users are created by default:

| Username    | Password    | Role         | Description                                                                         |
| ----------- | ----------- | ------------ | ----------------------------------------------------------------------------------- |
| `demo`      | `demo`      | `admin`      | Initial administrative user                                                         |
| `connector` | `connector` | `connectors` | Used by the Connectors component to authenticate with the Orchestration Cluster API |

For details on configuring initial users and their roles, see  
[Orchestration Cluster Identity initialization](/self-managed/components/orchestration-cluster/identity/overview.md#option-3-configuration).

:::note Helm arrays
In Helm, arrays must be overwritten in full. If you change these configuration settings, keep in mind that the default array must be configured in your custom `values.yaml` if you want to keep those users and role assignments. For example, when adding the user `foo` or assigning roles to `foo`, keep also the values for the demo and connectors user.
:::

## Next steps

- To enable centralized authentication, see [Internal Keycloak](./internal-keycloak.md).
- To integrate with an external identity provider, see [External OIDC provider](./external-oidc-provider.md).
