---
id: identity-first-steps
title: "Get started with Identity"
sidebar_label: "Get started"
description: "Learn more about starting Identity, accessing the UI, default users, the home screen, and more."
---

import IdentityLoginImg from './img/identity-login-page.png';

Get started with Identity in Self-Managed by learning how to open and log in to the Identity interface.

:::note
Identity is included in the [Docker-Compose](/versioned_docs/version-8.7/self-managed/setup/deploy/local/docker-compose.md) and [Helm](/versioned_docs/version-8.7/self-managed/installation-methods/helm/install.md) based deployment of Camunda 8 Self-Managed. With the default configuration, Identity uses an included Keycloak container/pod.
:::

## Log in to Identity

Once Identity has successfully started, you can open the **Log in** page and log in to Identity.

<img src={IdentityLoginImg} alt="Identity log in page" class="img-600"/>

If you are running the default configuration, you can access the Identity interface via the following URLs:

- [Docker-Compose](/versioned_docs/version-8.7/self-managed/setup/deploy/local/docker-compose.md): `http://localhost:8084/`
- [Helm](/versioned_docs/version-8.7/self-managed/installation-methods/helm/install.md): Follow your [`port-forward` or Ingress configuration](/self-managed/installation-methods/helm/configure/accessing-components-without-ingress.md)

## Default user

In the default configuration, Identity creates a default example user during installation.

You can log in with this example user account using the following credentials:

```text
Username: demo
Password: demo
```

:::tip Want to create more users?
Identity uses the users managed in Keycloak. To create a user, refer to [Keycloak's documentation on creating a user](https://www.keycloak.org/docs/latest/server_admin/#proc-creating-user_server_administration_guide) for your version of Keycloak.
:::

## Identity home page

You are directed to the home page once you have successfully logged in.

![identity-landing-page](./img/identity-landing-page.png)

## Next steps

Once you are able to log in to Identity, you can start managing authentication, access, and authorization for your Camunda 8 users, resources, and the Orchestration cluster API.

- [Manage users, groups, roles, and applications](application-user-group-role-management/identity-application-user-group-role-management-overview.md)
- [Manage access and permissions](access-management/access-management-overview.md)
- [Manage tenants](managing-tenants.md)

:::info
Learn more about how to [configure Identity](configuration/identity-configuration-overview.md) and [authentication](authentication.md).
:::
