---
id: basic-authentication
sidebar_label: Basic authentication
title: Helm chart basic authentication setup
description: Learn how to configure and manage basic authentication for Camunda 8 Self-Managed deployments using Helm chart.
---

By default, Camunda 8 Self-Managed uses basic authentication for all components deployed through the Helm chart. This method requires no additional configuration and is ideal for local or development environments.

:::note
Because basic authentication is enabled by default, components that depend on Management Identity are disabled by default, which are:

- Management Identity
- Console
- Web Modeler
- Keycloak
- Optimize
  :::

### Default users

Two users are created by default:

| Username    | Password    | Description             |
| ----------- | ----------- | ----------------------- |
| `demo`      | `demo`      | Default demo user       |
| `connector` | `connector` | Default Connectors user |

### Add users

To add a user, for example user `foo`, update your configuration:

```yaml
orchestration:
  security:
    initialization:
      users:
        - username: demo
          password: demo
          name: Demo User
          email: demo@demo.com
        - username: connector
          password: connector
          name: Connector User
          email: connector@demo.com
        - username: foo
          password: foo
          name: Foo User
          email: foo@foo.com
```

### Assign roles

To assign default roles to a user, add them to `defaultRoles`. For example, to assign the `admin` role to `foo`:

```yaml
orchestration:
  security:
    initialization:
      defaultRoles:
        admin:
          users:
            - demo
            - foo
```

:::note Helm arrays
In Helm, arrays must be overwritten in full. The default array must be configured in your custom `values.yaml`. For example, when adding the user `foo` or assigning roles to `foo`, include the default array values.
:::

## Next steps

- To enable centralized authentication, see [Internal Keycloak](./internal-keycloak.md).
- To integrate with an external identity provider, see [External Keycloak](./using-external-keycloak.md) or [OIDC setup](./connect-to-an-oidc-provider.md).
