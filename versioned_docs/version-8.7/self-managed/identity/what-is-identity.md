---
id: what-is-identity
title: "What is Identity?"
sidebar_label: "What is Identity?"
description: "Identity is the component within the Camunda 8 self-managed stack responsible for authentication and authorization."
---

Identity is the component within the Camunda 8 self-managed stack responsible for authentication and authorization. It offers the following capabilities:

- Authentication: authenticate via KeyCloak or your own OIDC Identity Provider
- Organize your **Users** in **Groups**, or **Roles**
- Manage Access to Camunda 8 via...
  - **Permissions**, that grant access to Camunda 8 components either via **Roles** and **Groups**, or directly granted to **Users**
    - Optionally, grant more fine-grined access control to Camunda 8 ressources to **Users** or **Groups** using **resource authorizations**
  - **Permissions** that grant access to Camunda 8 APIs to your custom **Application** (e.g., job worker)
- Isolate data access for your custom **Applications** or **Users** using **Tenants**

## Next steps

If you're new to Identity, we suggest reviewing our [getting started guide](./getting-started/install-identity.md).

You can use Identity for authentication with Keycloak. The following guidance can be used during platform installation and deployment:

- [Use existing Keycloak](/self-managed/setup/guides/using-existing-keycloak.md)
- [Connect to an OIDC provider](/self-managed/setup/guides/connect-to-an-oidc-provider.md)
