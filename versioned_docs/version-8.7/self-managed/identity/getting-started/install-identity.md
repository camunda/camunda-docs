---
id: install-identity
title: "Installation and first steps"
sidebar_label: "Installation and first steps"
description: "Learn more about installing Identity, accessing the UI, default users, the home screen, and more."
---

To use Identity, install it locally via Docker or Kubernetes.

Follow the [installation guide](/self-managed/setup/overview.md) for more details on this process.

## Accessing the UI

As soon as Identity is started, you can access the login page and log in to the Identity application.

Navigate to [localhost:8080](http://localhost:8080) to see the UI exposed by Identity.

![identity-login-page](./img/identity-login-page.png)

## Default user

The configuration in this guide creates an example user during installation; use this account to log in:

```text
Username: demo
Password: demo
```

:::note Want to create more users?
Creating a user in Identity is not currently supported. To create a user, refer to [Keycloak's documentation on creating a user](https://www.keycloak.org/docs/latest/server_admin/#proc-creating-user_server_administration_guide) for your version of Keycloak.
:::

## Home screen

You are directed to the home page once logged in successfully.

![identity-landing-page](./img/identity-landing-page.png)
