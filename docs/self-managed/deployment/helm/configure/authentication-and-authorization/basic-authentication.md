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

## Default users

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

## Enable additional components

The following components do not support basic authentication and require Management Identity with an OIDC provider:

- Console
- Web Modeler
- Optimize

You can still enable these components alongside a basic auth Orchestration Cluster by using a hybrid authentication setup:

- **Orchestration Cluster and Connectors** use basic authentication
- **Console, Web Modeler, Optimize, and Management Identity** use OIDC

This guide shows how to configure hybrid authentication with internal Keycloak. You can also apply this approach with other OIDC setups, such as [external Keycloak](./external-keycloak.md) or an [external OIDC provider](./external-oidc-provider.md)

When deploying process models from Web Modeler to a basic auth Orchestration Cluster, you will be prompted to enter credentials in the deployment dialog.

### Configuration steps

Follow the [internal Keycloak guide](./internal-keycloak.md) with these modifications:

1. **Simplify the secret**: Omit the `identity-connectors-client-token` and `identity-orchestration-client-token` keys—they are not needed when using basic auth. See [Create a secret](./internal-keycloak.md#create-a-secret).

2. **Set basic auth for the Orchestration Cluster and Connectors**:

```yaml
orchestration:
  security:
    authentication:
      method: basic

connectors:
  security:
    authentication:
      method: basic
```

3. **Skip the OIDC sections** for the [Orchestration Cluster](./internal-keycloak.md#configure-orchestration-cluster) and [Connectors](./internal-keycloak.md#configure-connectors) in the internal Keycloak guide.

## Full configuration example

The following example shows the complete configuration for hybrid authentication with internal Keycloak:

```yaml
global:
  identity:
    auth:
      enabled: true
      optimize:
        secret:
          existingSecret: "camunda-credentials"
          existingSecretKey: "identity-optimize-client-token"

identity:
  enabled: true
  firstUser:
    secret:
      existingSecret: "camunda-credentials"
      existingSecretKey: "identity-firstuser-password"

identityKeycloak:
  enabled: true
  auth:
    existingSecret: "camunda-credentials"
    passwordSecretKey: "identity-keycloak-admin-password"
  postgresql:
    auth:
      existingSecret: "camunda-credentials"
      secretKeys:
        adminPasswordKey: "identity-keycloak-postgresql-admin-password"
        userPasswordKey: "identity-keycloak-postgresql-user-password"

optimize:
  enabled: true

connectors:
  security:
    authentication:
      method: basic

webModeler:
  enabled: true
  restapi:
    mail:
      fromAddress: noreply@example.com

webModelerPostgresql:
  enabled: true
  auth:
    existingSecret: "camunda-credentials"
    secretKeys:
      adminPasswordKey: "webmodeler-postgresql-admin-password"
      userPasswordKey: "webmodeler-postgresql-user-password"

orchestration:
  security:
    authentication:
      method: basic

console:
  enabled: true
```

For secret creation and component access details, see the [internal Keycloak guide](./internal-keycloak.md).

## Next steps

- To enable centralized OIDC authentication for all components, see [Internal Keycloak](./internal-keycloak.md).
- To integrate with an external identity provider, see [External OIDC provider](./external-oidc-provider.md).
