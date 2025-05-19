---
id: identity-first-steps
title: "First steps"
sidebar_label: "First steps"
description: "Learn more about starting Identity, accessing the UI, default users, the home screen, and more."
---

Identity is included in the [Docker-Compose](/versioned_docs/version-8.7/self-managed/setup/deploy/local/docker-compose.md) and [HELM](/versioned_docs/version-8.7/self-managed/setup/install.md) based deployment of Camunda 8 Self-Managed. With the default configuration, Identity uses an included Keycloak container/pod.

## Accessing the UI

As soon as Identity is started, you can access the login page and log in to the Identity application. When running the default configuration, the Identity UI is accessible via the following URLs:

- [Docker-Compose](/versioned_docs/version-8.7/self-managed/setup/deploy/local/docker-compose.md): `http://localhost:8084/`
- [HELM](/versioned_docs/version-8.7/self-managed/setup/install.md): following your [`port-forward` or Ingress configuration](/self-managed/setup/guides/accessing-components-without-ingress.md)

![identity-login-page](./img/identity-login-page.png)

## Default user

In the default configuration, Identity creates an example user during installation; use this account to log in:

```text
Username: demo
Password: demo
```

:::note Want to create more users?
Identity uses the users managed in Keycloak. To create a user, refer to [Keycloak's documentation on creating a user](https://www.keycloak.org/docs/latest/server_admin/#proc-creating-user_server_administration_guide) for your version of Keycloak.
:::

## Home screen

You are directed to the home page once logged in successfully.

![identity-landing-page](./img/identity-landing-page.png)

You are not ready to work with Identity. Explore the features by starting from [our overview](/versioned_docs/version-8.7/self-managed/identity/what-is-identity.md).
