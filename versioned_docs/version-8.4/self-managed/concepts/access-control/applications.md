---
id: applications
title: "Applications"
sidebar_label: "Applications"
---

To use [Identity](/self-managed/identity/what-is-identity.md) for authentication,
each deployed component requires an application to be created.

When an application is created in the Identity UI, a client ID and client secret are generated and can be
used in the component configuration to allow authentication flows to happen.

:::tip Want to learn how to add an application in [Identity](/self-managed/identity/what-is-identity.md)?
See our documentation on [adding an application](/self-managed/identity/user-guide/additional-features/incorporate-applications.md) for more help.
:::

## Types of applications

There are three types of applications in Identity:

- Confidential
- Machine-to-machine
- Public

A type is selected when [creating the application](/self-managed/identity/user-guide/additional-features/incorporate-applications.md) based on
its ability to securely store and use secrets, as well as the mode of authentication it uses.

| Type         | Secret | User login flow | M2M authentication |
| ------------ | ------ | --------------- | ------------------ |
| Confidential | Yes    | Yes             | Yes                |
| M2M          | Yes    | No              | Yes                |
| Public       | No     | Yes             | No                 |

:::note
See more details on OAuth client types [here](https://oauth.net/2/client-types/), and more information specifically on confidential and public applications [here](https://auth0.com/docs/get-started/applications/confidential-and-public-applications).
:::

## Permissions

Access to the components within the stack can be controlled by the permissions assigned to an application.

:::tip Want to learn how to assign a permission to an application in [Identity](/self-managed/identity/what-is-identity.md)?
See our user guide on [assigning a permission to an application](/self-managed/identity/user-guide/additional-features/incorporate-applications.md) for more help.
:::
