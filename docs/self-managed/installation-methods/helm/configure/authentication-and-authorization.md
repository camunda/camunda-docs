---
id: authentication-and-authorization
sidebar_label: Authentication and authorization
title: Configure authentication and authorization in Helm charts
description: Learn how to configure authentication and authorization for Camunda Helm charts.
---

## Basic authentication

Camunda Helm charts use basic authentication by default. No additional configuration is required.

:::note
Because basic authentication is enabled by default, components that depend on Management Identity are disabled by default:

- Management Identity
- Console
- Web Modeler
- Keycloak
- Optimize
  :::

### Default users

Two users are created by default:

- demo
- connectors

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
