---
id: configure-auth
sidebar_label: Authentication and Authorization
title: Helm Authentication and Authorization
description: "Learn how to set up Authentication and Authorization"
---

## Basic Auth

Basic auth is enabled by default on the Camunda Helm chart. There is no need to add any extra configuration.

:::note
Since basic auth is the default, this means that all Management Identity dependant components will be disabled by default:

- Management Identity
- Console
- Web Modeler
- Keycloak
- Optimize

  :::

There are 2 users created by default:

- demo
- connectors

If you would like to add further users, for example user `foo`, then you can do so with the following configuration:

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

You can also assign default roles to the user `foo`. For example you can assign the admin role with the following configuration:

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
Arrays in Helm can only be overwritten in their entirety. Therefore, the default array must be configured in your custom values.yaml when, for example adding the user `foo`, or assigning roles to the user `foo`, as show in the above configs.
:::
